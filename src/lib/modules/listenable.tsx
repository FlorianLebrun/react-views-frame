
type ListenersArray = (Function | string)[]

let dispatcheds: ListenersArray = null

export type ListenableContexts = {
  [contextName: string]: any
}

export type ListenableResult = Promise<Listenable> | Listenable | null

export default class Listenable {
  ".events": any[] // Events ready to be dispatched
  ".listeners": ListenersArray

  addEventListener(callback: Function): boolean;
  addEventListener(eventType: string, callback: Function): boolean;
  addEventListener() {

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
      return true
    }
    // function addEventListener(type: string|Array|null, callback: Function)
    //  - object.addEventListener((type: string, data: any) => {})
    else if (arguments.length === 2) {
      if (!arguments[1]) return false
      listeners.push(arguments[1])
      listeners.push(arguments[0])
      return true
    }
  }

  removeEventListener(callback: Function): boolean;
  removeEventListener(eventType: string, callback: Function): boolean;
  removeEventListener() {

    // Prepare listeners array
    let listeners = this[".listeners"]
    if (!listeners) return false
    else if (dispatcheds === listeners) this[".listeners"] = listeners = listeners.slice()

    // Get listener information
    let eventType: string
    let callback: Function
    if (arguments.length === 1) {
      eventType = null
      callback = arguments[0]
    }
    else if (arguments.length === 2) {
      eventType = arguments[0]
      callback = arguments[1]
    }
    else {
      return false
    }

    // Search and remove listener
    let index = 0
    while (true) {
      index = listeners.indexOf(callback, index)
      if (index >= 0) {
        if (listeners[index + 1] === eventType) {
          listeners.splice(index, 2)
          return true
        }
        index++
      }
      else {
        console.warn(`removeEventListener(${eventType}) failed on:`, this)
        return false
      }
    }
  }

  // Add object state listener, which will be called when a 'setState' is applied
  // > When return Promise: 'addStateListener' shall be retry on the future provided listenable
  // > When return Listenable: the truly listened object is returned, and 'removeFieldsListener' shall be applied on this returned object. 
  synchronizeStateInContext(
    contexts: ListenableContexts, // Collection of data, the listenable can access to it environment variable by key
    writable: boolean, // true when a writable listenable is required for the resulting listenable
    fields?: string[] | boolean, // fields required in the resulting listenable
    previousResult?: Listenable // give the previous listenable returned by this method (can help to optimize)
  ): Promise<Listenable> | Listenable {
    return this
  }

  // Add object state listener, which will be called when a 'setState' is applied
  // > When return Promise: 'addStateListener' shall be retry on the future provided listenable
  // > When return Listenable: the truly listened object is returned, and 'removeFieldsListener' shall be applied on this returned object. 
  addStateListener(callback: Function, fields?: string[]): boolean {
    return this.addEventListener("change", callback)
  }

  // Remove object state listener
  removeStateListener(callback: Function): boolean {
    return this.removeEventListener("change", callback)
  }

  // Mutate the object state
  setState(): void;
  setState(key: string, value: any): void;
  setState(values: { [key: string]: any }): void;
  setState() {
    if (arguments.length === 0) {
      if (!this[".events"]) {
        this[".events"] = [{}]
        setTimeout(event_dispatcher.bind(this))
      }
      else if (!this[".events"][0]) this[".events"][0] = {}
    }
    else if (arguments.length === 1) {
      for (let key in arguments[0]) {
        dispatchStateEvent.call(this, key, arguments[0][key])
      }
    }
    else if (arguments.length === 2) {
      dispatchStateEvent.call(this, arguments[0], arguments[1])
    }
  }

  dispatchEvent(type: string, data?: any) {

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

  executeEvent(type: string, data?: any) {
    let listeners = this[".listeners"] as any
    const count = listeners ? listeners.length : 0
    if (!count) return

    // Retain listeners array
    if (dispatcheds === null) dispatcheds = listeners
    else listeners = listeners.slice()

    // Execute listeners
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

  static setState(): void;
  static setState(key: string, value: any): void;
  static setState(values: { [key: string]: any }): void;
  static setState() { }
}

Listenable.setState = Listenable.prototype.setState

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
  for (let i = 2; i < events.length; i += 2) {
    const type = events[i - 1]
    const data = events[i]
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

