/* eslint-disable no-use-before-define */
/* eslint-disable react/no-multi-comp */

// Listener based last value reading
type ValueListener = Function

// Listener based streaming
class StreamListener {
  values: Array<any>
  callback: Function
  constructor(callback: Function) {
    this.callback = callback
    this.values = []
  }
  forEach() {
    const result = this.values.forEach(...arguments)
    this.values.length = 0
    return result
  }
  map() {
    const result = this.map.forEach(...arguments)
    this.values.length = 0
    return result
  }
  shift(): any {
    if (this.values.length) {
      return this.values.shift()
    }
    return undefined
  }
}

class EnvVar {
  name: string
  value: any
  filters: Array<Function>
  valueListeners: Array<ValueListener>
  streamListeners: Array<StreamListener>
  pendingStatus: number

  constructor(name: string, value: any) {
    this.name = name
    this.value = value
    this.filters = null
    this.valueListeners = null
    this.streamListeners = null
    this.pendingStatus = 0
  }
  write(value: any) {
    if (this.pendingStatus === 0) {
      if (envPendings.length === 0) {
        setTimeout(processPendingEnvVars, 0)
      }
      envPendings.push(this)
    }
    if (this.value !== value) this.pendingStatus = 1
    else if (this.pendingStatus === 0) this.pendingStatus = -1
    this.value = value
    this.streamListeners && this.streamListeners.forEach(l => l.values.push(value))
  }
  set(value: any) {
    if (this.filters) {
      filterEnvVariables(this, value)
    }
    else {
      this.write(value)
    }
  }
  addValueFilter(callback: Function) {
    if (callback instanceof Function) {
      if (!this.filters) this.filters = []
      this.filters.push(callback)
    }
    else throw new Error("EnvVar::addValueFilter expects a not null function")
  }
  addValueListener(callback: Function) {
    if (callback instanceof Function) {
      if (!this.valueListeners) this.valueListeners = []
      this.valueListeners.push(callback)
    }
    else throw new Error("EnvVar::addValueListener expects a not null function")
  }
  addStreamListener(callback: Function) {
    if (callback instanceof Function) {
      if (!this.streamListeners) this.streamListeners = []
      this.streamListeners.push(new StreamListener(callback))
    }
    else throw new Error("EnvVar::addStreamListener expects a not null function")
  }
  removeListener(callback: Function) {
    if (callback instanceof Function) {
      if (this.valueListeners) {
        const i = this.valueListeners.indexOf(callback)
        if (i !== -1) this.valueListeners.splice(i, 1)
      }
      if (this.streamListeners) {
        const i = this.streamListeners.findIndex(l => l.callback === callback)
        if (i !== -1) this.streamListeners.splice(i, 1)
      }
    }
    else throw new Error("EnvVar::removeListener expects a not null function")
  }
  dispatch() {
    const pendingStatus = this.pendingStatus
    this.pendingStatus = 0
    if (pendingStatus > 0) {
      const value = this.value
      this.valueListeners && this.valueListeners.forEach(l => {
        try {
          l(value, this)
        }
        catch (e) {
          console.error(e)
        }
      })
    }
    this.streamListeners && this.streamListeners.forEach(l => {
      try {
        l.callback(l, this)
      }
      catch (e) {
        console.error(e)
      }
    })

  }
}

const envVars: { [string]: EnvVar } = {}
const envPendings: Array<EnvVar> = []

function processPendingEnvVars() {
  let i
  for (i = 0; i < envPendings.length; i++) {
    envPendings[i].dispatch()
  }
  envPendings.length = 0
}

function createEnvVariable(name: string): EnvVar {
  let envv = envVars[name]
  if (!envv) {
    envv = new EnvVar(name)
    envVars[name] = envv
  }
  return envv
}

function filterEnvVariables(envv: EnvVar, value: any) {
  const dones = {}
  let values = { [envv.name]: value }
  let changing = true
  while (changing) {
    changing = false
    Object.keys(values).forEach(envname => {
      if (!dones[envname]) {
        envv = createEnvVariable(envname)
        if (envv.filters) {
          envv.filters.forEach(f => values = { ...values, ...f(values[envname]) })
        }
        changing = true
        dones[envname] = envv
      }
    })
  }
  Object.keys(dones).forEach(envname => {
    dones[envname].write(values[envname])
  })
}

export function getEnv(name: string): any {
  const envv = envVars[name]
  return envv ? envv.value : undefined
}

export function setEnv(name: string, value: any) {
  let envv: EnvVar = envVars[name]
  if (!envv) {
    envv = new EnvVar(name, value)
    envVars[name] = envv
  }
  envv.set(value)
  return envv.value
}

export function unlistenEnv(name: string, callback: Function) {
  const envv = envVars[name]
  envv && envv.removeListener(callback)
}

export function listenEnv(name: string, callback: Function) {
  const envv = createEnvVariable(name)
  envv.addValueListener(callback)
  return envv.value
}

export function filterEnv(name: string, callback: Function) {
  const envv = createEnvVariable(name)
  envv.addValueFilter(callback)
  return envv.value
}

export function listenEnvStream(name: string, callback: Function) {
  const envv = createEnvVariable(name)
  envv.addStreamListener(callback)
}

export function unlistenEnvStream(name: string, callback: Function) {
  unlistenEnv(name, callback)
}
