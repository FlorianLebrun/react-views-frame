import EventEmitter from "./event-emitter"

export default class Listenable extends EventEmitter {
  ".status": string = "changed" // Current data status

  setState() {
    EventEmitter.setState.apply(this, arguments)
    if (this[".events"] && this[".events"][0]) {
      this[".status"] = "changed"
    }
  }
  isTerminateState() {
    return this[".status"] === "released"
  }
  terminateState() {
    this[".status"] = "released"
    this.dispatchEvent("terminate")
  }
}

Listenable.prototype.addEventListener = EventEmitter.addEventListener
Listenable.prototype.removeEventListener = EventEmitter.removeEventListener
Listenable.prototype.dispatchEvent = EventEmitter.dispatchEvent
