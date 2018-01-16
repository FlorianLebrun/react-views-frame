
export default class Listenable {
  $status: string = "changed"
  $nextState: Object
  $listeners: Array<Array<Function | string>>

  listenState(callback: Function, keys: Array) {
    if (callback instanceof Function) {
      let listener = [callback]
      keys && listener.concat(keys)
      if (!this.$listeners) this.$listeners = []
      this.$listeners.push(listener)
    }
    else throw new Error("ViewFile::listenContent expects a not null function")
    return this
  }
  unlistenState(callback: Function) {
    let i
    if (this.$listeners) {
      for (i = 0; i < this.$listeners.length; i++) {
        if (this.$listeners[i][0] === callback) {
          this.$listeners.splice(i, 1)
          return true
        }
      }
    }
    return false
  }
  dispatchState = () => {
    let k, i
    const count = this.$listeners?this.$listeners.length:0
    for (i = 0; i < count; i++) {
      const listener = this.$listeners[i]
      if (listener.length > 1) {
        for (k = 1; k < listener.length; k++) {
          if (this.$nextState.hasOwnProperty(listener[k])) {
            try {
              listener[0](this)
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
          listener[0](this)
        }
        catch (e) {
          console.error(e)
        }
      }
    }
    this.$nextState = 0
  }
  setState(value) {
    this.$status = "changed"
    if (this.$nextState) {
      this.$nextState = Object.assign(this.$nextState, value)
    }
    else {
      this.$nextState = Object.assign({}, value)
      setTimeout(this.dispatchState, 0)
    }
    Object.assign(this, value)
  }
  terminate() {
    this.$status = "released"
    this.dispatchState()
  }
}
