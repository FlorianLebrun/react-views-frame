import Listenable from "./listenable"

export default class Storable extends Listenable {
  uid: string
  data: Object

  constructor(uid: string) {
    super()
    this.uid = uid
  }
  load(): Object {
    try {
      const json = window.localStorage.getItem(this.uid)
      this.data = json ? JSON.parse(json) : this.defaultData()
    }
    catch (e) { this.data = this.defaultData() }
    this.$status = "stored"
    this.dispatchData(this.data)
    return this.data
  }
  save(): Object {
    this.data = this.updateData()
    const new_json = JSON.stringify(this.data)
    const prev_json = window.localStorage.getItem(this.uid)
    if (new_json !== prev_json) {
      window.localStorage.setItem(this.uid, new_json)
    }
    this.$status = "stored"
    return this.data
  }
  delete() {
    this.terminate()
    window.localStorage.removeItem(this.uid)
  }
  defaultData() {
    return {}
  }
  dispatchData(data: Object) {
  }
  updateData(): Object {
    return this.data
  }
}
