import Listenable from "./listenable"

let uidGenerator: number = (window.localStorage.getItem("#uidGenerator") as any) | 0

function generateUid() {
   const uid = "obj#" + (uidGenerator++)
   window.localStorage.setItem("#uidGenerator", uidGenerator.toString())
   return uid
}

export const globalStorage = {}
export const storableClasses = {}

export default class Storable extends Listenable {
   $$storeUid: string
   $$storeDirectory: any[]

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
   setStorageData(value: any) {
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
         let data = this.storableShouldSerialize()
         if (data) {
            data[".className"] = this.constructor[".className"]
            window.localStorage.setItem(this.$$storeUid, JSON.stringify(data))
         }
         return true
      }
      catch (e) {
         window.localStorage.setItem(this.$$storeUid, e.toString())
         console.error(e)
      }
      return false
   }
   terminateState() {
      this[".listeners"] = null
      this.dispatchEvent("terminate")
      this.forceSave()
      this.storableWillUnmount()
      delete globalStorage[this.$$storeUid]
   }
   deleteState() {
      this[".listeners"] = null
      this.dispatchEvent("terminate")
      window.localStorage.removeItem(this.$$storeUid)
      this.storableWillUnmount()
      delete globalStorage[this.$$storeUid]
   }

   static registerClass(name: string) {
      if (!name) name = this.name
      this[".className"] = name
      storableClasses[name] = this
      return this
   }

   static openStorable = function (uid: string, ...args) {
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

         // Create object from stored data
         const dataStorableClass = data ? storableClasses[data[".className"]] : null
         if (dataStorableClass) {
            obj = new dataStorableClass(...args)
            if (!(obj instanceof this)) {
               console.error("Bad stored className '" + data[".className"] + "' for class " + this.name)
               obj = null
            }
         }

         // Create object from this class
         if (!obj) {
            const defaultStorableClass = storableClasses[this[".className"]]
            if (defaultStorableClass) {
               obj = new defaultStorableClass(...args)
               if (!(obj instanceof this)) {
                  console.error("Mis registered storable for class " + this.name)
                  return null
               }
            }
            else {
               return null
            }
         }

         // Initiate object
         obj.$$storeUid = uid
         globalStorage[uid] = obj
         obj.storableShouldInitiate(data, ...args)
         return obj
      }
      catch (e) {
         console.error(e)
      }
      return null
   }
}

export function getAllStorable(): { [key: string]: Storable } {
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
