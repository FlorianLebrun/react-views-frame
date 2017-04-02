/* eslint-disable no-use-before-define */
/* eslint-disable react/no-multi-comp */

export class Storage {
}

let storageIdGenerator: number = 0
const storages: { [string]: Storage } = {}

export function createStorage(id: string) {
  if (!id) id = "st" + (storageIdGenerator++)
  storages[id] = new Storage()
}

export function deleteStorage(id: string) {
  delete storages[id]
}