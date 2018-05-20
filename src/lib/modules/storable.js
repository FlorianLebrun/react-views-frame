import Listenable from "./listenable"

let uidGenerator = window.localStorage.getItem("#uidGenerator") | 0

function generateUid() {
  const uid = "obj#" + (uidGenerator++)
  window.localStorage.setItem("#uidGenerator", uidGenerator)
  return uid
}

export const globalStorage = {}
export const storableClasses = {}

export default class Storable extends Listenable {
  $$storeUid: string
  $$storeDirectory: Array

  storableShouldInitiate(data: Object) {

  }
  storableShouldSerialize(): Object {
    return null
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
    if (!data[".className"])
      throw new Error("Invalid storable record")
    try {
      const bytes = JSON.stringify(data)
      window.localStorage.setItem(this.$$storeUid, bytes)
      return true
    }
    catch (e) { }
    return false
  }
  patchStorageData(data: Object): boolean {
    try {
      const bytes = JSON.stringify(Object.assign(this.readStorageData(), data))
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
  forceSave(): boolean {
    try {
      let data = this.storableShouldSerialize() || {}
      data[".className"] = this.constructor[".className"]
      window.localStorage.setItem(this.$$storeUid, JSON.stringify(data))
      return true
    }
    catch (e) {
      window.localStorage.setItem(this.$$storeUid, e.toString())
      console.error(e)
    }
    return false
  }
  terminateState() {
    super.terminateState()
    this.forceSave()
    this.storableWillUnmount()
    delete globalStorage[this.$$storeUid]
  }
  deleteState() {
    super.terminateState()
    window.localStorage.removeItem(this.$$storeUid)
    this.storableWillUnmount()
    delete globalStorage[this.$$storeUid]
  }
}

Storable.registerClass = function (name: string) {
  if (!name) name = this.name
  this[".className"] = name
  storableClasses[name] = this
  return this
}

Storable.openStorable = function (uid: string) {
  try {
    let obj, data
    if (uid) {
      obj = globalStorage[uid]
      if (obj) return obj
      data = readStorageData(uid)
    }
    else {
      uid = generateUid()
    }

    const className = data ? data[".className"] : this[".className"]
    const StorableClass = storableClasses[className]
    if (StorableClass) {
      obj = new StorableClass(uid)
      obj.$$storeUid = uid
      globalStorage[uid] = obj
      arguments[0] = data
      obj.storableShouldInitiate.apply(obj, arguments)
    }

    if (!(obj instanceof this)) {
      throw new Error("Bad storable className '" + className + "' for class " + this.name)
    }
    return obj
  }
  catch (e) {
    console.error(e)
    return null
  }
}

export function getAllStorable(): { [string]: Storable } {
  return globalStorage
}

export function saveAllStorable() {
  for (const uid in globalStorage) {
    globalStorage[uid].forceSave()
  }
}

function readStorageData(uid: string): Object {
  try {
    const bytes = window.localStorage.getItem(uid)
    if (bytes) {
      const data = JSON.parse(bytes)
      const className = data[".className"]
      if (!className || !storableClasses[className])
        throw new Error("Invalid storable data")
      return data
    }
  }
  catch (e) {
    window.localStorage.removeItem(uid)
  }
  return null
}


//window.addEventListener('beforeunload', saveAllStorable)
window.addEventListener('unload', saveAllStorable)
