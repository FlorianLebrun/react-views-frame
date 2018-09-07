
type ListenersArray = Array<Array<Function | string>>

export default class EventEmitter {
  ".events": Array // Events ready to be dispatched
  ".listeners": ListenersArray
}

let dispatcheds: ListenersArray = null

EventEmitter.addEventListener = function () {

  // Prepare listeners array
  let listeners = this[".listeners"]
  if (!listeners) this[".listeners"] = listeners = []
  else if (dispatcheds === listeners) this[".listeners"] = listeners = listeners.slice()

  // function addEventListener(callback: Function)
  //  - object.addEventListener(eventName, (data: any) => {})
  //  - object.addEventListener("change", (data: Listenable, prevState: Object) => {})
  //  - object.addEventListener(["field0","field1"], (data: Listenable, prevState: Object) => {})
  if (arguments.length === 1) {
    if (!arguments[0]) return false
    listeners.push(arguments[0])
    listeners.push(null)
    return this
  }
  // function addEventListener(type: string|Array|null, callback: Function)
  //  - object.addEventListener((type: string, data: any) => {})
  else if (arguments.length === 2) {
    if (!arguments[1]) return false
    listeners.push(arguments[1])
    listeners.push(arguments[0])
    return this
  }
}

EventEmitter.removeEventListener = function () {

  // Prepare listeners array
  let listeners = this[".listeners"]
  if (!listeners) return false
  else if (dispatcheds === listeners) this[".listeners"] = listeners = listeners.slice()

  // function removeEventListener(callback: Function)
  //  - remove first matching listener of this callback
  if (arguments.length === 1) {
    let index = 0
    while (true) {
      index = listeners.indexOf(arguments[0], index)
      if (index >= 0) listeners.splice(index, 2)
      else break
    }
  }
  // function removeEventListener(type: string|null, callback: Function)
  //  - remove every listener of this callback
  if (arguments.length === 2) {
    let index = 0
    while (true) {
      index = listeners.indexOf(arguments[1], index)
      if (index < 0 || listeners[index] === arguments[0]) break
      index++
    }
    if (index >= 0) {
      listeners.splice(index, 2)
      return true
    }
  }
  return false
}

EventEmitter.dispatchEvent = function (type: string, data: any) {

  // Prepare events slot
  if (!this[".events"]) {
    this[".events"] = [null]
    setTimeout(event_dispatcher.bind(this))
  }

  // Push event
  if (type === "change") {
    this[".events"][0] = Object.assign(this[".events"][0] || {}, data)
  }
  else {
    this[".events"].push(type)
    this[".events"].push(data)
  }
}

EventEmitter.executeEvent = function (type: string, data: any) {
  let listeners = this[".listeners"]
  const count = listeners ? listeners.length : 0
  if (!count) return

  // Retain listeners array
  if (dispatcheds === null) dispatcheds = listeners
  else listeners = listeners.slice()

  // Execute lsiteners
  let i = 0
  const promises = []
  for (let k = 1; k < count; k += 2) {
    try {
      let result
      const ltype = listeners[k]
      if (!ltype) result = listeners[k - 1](type, data, this)
      else if (ltype === type) result = listeners[k - 1](data, this)
      if (result instanceof Promise) promises.push(result)
    }
    catch (e) { console.error(e) }
  }

  // Release listeners array
  if (dispatcheds === listeners) dispatcheds = null

  return Promise.all(promises)
}

EventEmitter.setState = function (value: Object) {
  if (arguments.length === 0) {
    if (!this[".events"]) {
      this[".events"] = [{}]
      setTimeout(event_dispatcher.bind(this))
    }
    else if (!this[".events"][0]) this[".events"][0] = {}
  }
  else if (arguments.length === 1) {
    for (let key in value) {
      dispatchStateEvent.call(this, key, value[key])
    }
  }
  else if (arguments.length === 2) {
    dispatchStateEvent.call(this, value, arguments[1])
  }
}

function dispatchStateEvent(key, value) {
  if (this[key] !== value) {

    // Prepare events slot
    if (!this[".events"]) {
      this[".events"] = [null]
      setTimeout(event_dispatcher.bind(this))
    }

    // Update change event
    const prevState = this[".events"][0]
    if (!prevState) this[".events"][0] = { [key]: value }
    else if (!prevState.hasOwnProperty(key)) prevState[key] = this[key]

    // Update object
    this[key] = value
  }
}

function event_dispatcher() {
  let listeners = this[".listeners"]
  const events = this[".events"]
  const count = listeners ? listeners.length : 0
  this[".events"] = null
  if (!count) return

  // Retain listeners array
  if (dispatcheds === null) dispatcheds = listeners
  else listeners = listeners.slice()

  // Dispatch change event
  const prevState = events[0]
  if (prevState) {
    for (let k = 1; k < count; k += 2) {
      try {
        const ltype = listeners[k]
        if (!ltype) {
          listeners[k - 1]("change", this, prevState)
        }
        else if (ltype === "change") {
          listeners[k - 1](this, prevState)
        }
        else if (Array.isArray(ltype)) {
          for (const key of ltype) {
            if (prevState.hasOwnProperty(key)) {
              listeners[k - 1](this, prevState)
              break
            }
          }
        }
      }
      catch (e) { console.error(e) }
    }
  }

  // Dispatch other events
  let i = 0
  while (i < events.length) {
    const type = events[++i]
    const data = events[++i]
    for (let k = 1; k < count; k += 2) {
      try {
        const ltype = listeners[k]
        if (!ltype) listeners[k - 1](type, data, this)
        else if (ltype === type) listeners[k - 1](data, this)
      }
      catch (e) { console.error(e) }
    }
  }

  // Release listeners array
  if (dispatcheds === listeners) dispatcheds = null
}
