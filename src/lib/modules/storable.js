import Listenable from "./listenable"

export default class Storable extends Listenable {
  $$storeUid: string
  $$storeDirectory: Array

  constructor(uid: string) {
    super()
    this.$$storeUid = uid
    const data = this.readStorageData()
    if (data) this.storableShouldRestore(data)
    else this.storableShouldInitiate()
  }
  storableShouldInitiate() {

  }
  storableShouldRestore(data: Object) {

  }
  storableShouldSave(): Object {

  }
  storableWillUnmount() {

  }
  readStorageData(): Object {
    try {
      const bytes = window.localStorage.getItem(this.$$storeUid)
      if (bytes) return JSON.parse(bytes)
    }
    catch (e) {
      window.localStorage.removeItem(this.$$storeUid)
    }
    return null
  }
  writeStorageData(data: Object): boolean {
    try {
      const bytes = JSON.stringify(data)
      window.localStorage.setItem(this.$$storeUid, bytes)
      return true
    }
    catch (e) { }
    return false
  }
  setStorageData(value: Object) {
    const data = this.readStorageData()
    let hasChange = false
    if (arguments.length === 1) {
      for (let key in value) {
        if (data[key] !== value[key]) {
          data[key] = value[key]
          hasChange = true
        }
      }
    }
    else if (arguments.length === 2) {
      if (data[value] !== arguments[1]) {
        data[value] = arguments[1]
        hasChange = true
      }
    }
    hasChange && this.writeStorageData(data)
  }
  forceRestore() {
    const data = this.readStorageData()
    if (data) this.storableShouldRestore(data)
  }
  forceSave() {
    const data = this.storableShouldSave()
    if (data) this.writeStorageData(data)
  }
  terminateState() {
    super.terminateState()
    this.storableShouldSave()
    this.storableWillUnmount()
  }
  deleteState() {
    this.terminateState()
    this.storableWillUnmount()
    window.localStorage.removeItem(this.$$storeUid)
  }
}
