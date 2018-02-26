
export default class Listenable {
  $$status: string = "changed"
  $$prevState: Object
  $$listeners: Array<Array<Function | string>>

  listenState(listener: Function | Array) {
    if (!Array.isArray(listener)) {
      listener = [listener]
      if (Array.isArray(arguments[1])) listener = listener.concat(arguments[1])
    }
    if (!(listener[0] instanceof Function)) {
      throw new Error("listenState expects a callback function")
    }
    if (!this.$$listeners) this.$$listeners = []
    this.$$listeners.push(listener)
    return this
  }
  unlistenState(callback: Function) {
    let i
    if (this.$$listeners) {
      for (i = 0; i < this.$$listeners.length; i++) {
        if (this.$$listeners[i][0] === callback) {
          this.$$listeners.splice(i, 1)
          return true
        }
      }
    }
    return false
  }
  setState(value) {
    this.$$status = "changed"
    if (arguments.length === 2) {
      value = { [value]: arguments[1] }
    }
    for (let key in value) {
      if (this[key] !== value[key]) {
        if (!this.$$prevState) {
          this.$$prevState = {}
          setTimeout(dispatchState.bind(this), 0)
        }
        if (!this.$$prevState.hasOwnProperty(key)) {
          this.$$prevState[key] = this[key]
        }
        this[key] = value[key]
      }
    }
  }
  terminate() {
    this.$$status = "released"
    this.dispatchState()
  }
}

function dispatchState() {
  let k, i
  const count = this.$$listeners ? this.$$listeners.length : 0
  for (i = 0; i < count; i++) {
    const listener = this.$$listeners[i]
    if (listener.length > 1) {
      for (k = 1; k < listener.length; k++) {
        if (this.$$prevState.hasOwnProperty(listener[k])) {
          try {
            listener[0](this, this.$$prevState)
          }
          catch (e) {
            console.error(e)
          }
          break
        }
      }
    }
    else {
      try {
        listener[0](this, this.$$prevState)
      }
      catch (e) {
        console.error(e)
      }
    }
  }
  this.$$prevState = 0
}