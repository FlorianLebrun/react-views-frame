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
  valueListeners: Array<ValueListener>
  streamListeners: Array<StreamListener>
  pendingStatus: number

  constructor(name: string, value: any) {
    this.name = name
    this.value = value
    this.valueListeners = null
    this.streamListeners = null
    this.pendingStatus = 0
  }
  set(value: any) {
    if (this.value !== value) this.pendingStatus = 1
    else if (this.pendingStatus === 0) this.pendingStatus = -1
    this.value = value
    this.streamListeners && this.streamListeners.forEach(l => l.values.push(value))
  }
  addValueListener(callback: Function) {
    if (callback instanceof Function) {
      if (!this.valueListeners) this.valueListeners = []
      this.valueListeners.push(callback)
    }
    else throw "EnvVar::addValueListener expects a not null function"
  }
  addStreamListener(callback: Function) {
    if (callback instanceof Function) {
      if (!this.streamListeners) this.streamListeners = []
      this.streamListeners.push(new StreamListener(callback))
    }
    else throw "EnvVar::addStreamListener expects a not null function"
  }
  removeListener(callback: Function) {
    if (callback instanceof Function) {
      if (this.valueListeners) {
        const i = this.valueListeners.indexOf(callback)
        if (i != -1) this.valueListeners.splice(i, 1)
      }
      if (this.streamListeners) {
        const i = this.streamListeners.findIndex(l => l.callback === callback)
        if (i != -1) this.streamListeners.splice(i, 1)
      }
    }
    else throw "EnvVar::removeListener expects a not null function"
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
  else {
    if (envv.pendingStatus === 0) {
      if (envPendings.length === 0) {
        setTimeout(processPendingEnvVars, 0)
      }
      envPendings.push(envv)
    }
    envv.set(value)
  }
  return envv.value
}

export function unlistenEnv(name: string, callback: Function) {
  const envv = envVars[name]
  envv && envv.removeListener(callback)
}

export function listenEnv(name: string, callback: Function) {
  let envv = envVars[name]
  if (!envv) {
    envv = new EnvVar(name)
    envVars[name] = envv
  }
  envv.addValueListener(callback)
  return envv.value
}

export function listenEnvStream(name: string, callback: Function) {
  let envv = envVars[name]
  if (!envv) {
    envv = new EnvVar(name)
    envVars[name] = envv
  }
  envv.addStreamListener(callback)
}
