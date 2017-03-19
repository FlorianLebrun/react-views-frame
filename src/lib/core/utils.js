
export function isInheritedOf(What, Of) {
    while (What) {
        What = Object.getPrototypeOf(What)
        if (What === Of) return true
    }
    return false
}

export function promiseResolvedOf(x) {
  return new Promise((resolve) => resolve(x))
}

export function promiseRejectedOf(x) {
  return new Promise((resolve, reject) => reject(x))
}

export function clone(x) {
  if (Array.isArray(x)) return x.slice()
  else return { ...x }
}

export function duplicateAtKeys(keys, keysCount, data) {

  // Init i
  let i = 0
  if (!keys[0]) i++

  // Create the root
  let root
  if (data) {
    root = (Array.isArray(data)) ? data.slice() : { ...data }
  }
  else if (i < keysCount) {
    const nextKey = keys[i]
    if (nextKey !== "" && isNaN(nextKey)) root = {}
    else root = []
  }

  // Clone each level existing in old data
  let oldData = data
  let newData = root
  if (oldData) {
    while (i < keysCount && oldData) {
      const key = keys[i++]
      const oldValue = oldData[key]
      if (oldValue) {
        const newValue = (Array.isArray(oldValue)) ? oldValue.slice() : { ...oldValue }
        newData[key] = newValue
        oldData = oldValue
        newData = newValue
      }
      else {
        i--
        break
      }
    }
  }

  // Create new level based in path key type
  while (i < keysCount) {
    const key = keys[i++]
    if (key) {
      const nextKey = keys[i]
      const newValue = (nextKey !== "" && isNaN(nextKey)) ? {} : []
      newData[key] = newValue
      newData = newValue
    }
  }
  return { root, oldData, newData }
}

console.log("Test1: ", setDataAtPath("/v1/v2/v3/5/8/v6", null, "hello"))

export function getDataAtPath(path: string, data: Object): any {
  if (path) {
    const items = path && path.split("/")
    items.forEach(key => {
      if (key !== "") data = data && data[key]
    })
  }
  return data
}

export function setDataAtPath(path: string, data: Object, value: any): any {
  const keys = path && path.split("/")
  const keysCount = keys.length - 1
  const result = duplicateAtKeys(keys, keysCount, data)
  result.newData[keys[keysCount]] = value
  return result.root
}

export function patchDataAtPath(path: string, data: Object, value: any): any {
  const keys = path && path.split("/")
  const keysCount = keys.length
  const result = duplicateAtKeys(keys, keysCount, data)
  if (result.newData) {
    for (const key in value) {
      if (key !== "") result.newData[key] = value[key]
    }
  }
  return result.root
}

export function insertDataAtPath(path: string, data: Object, value: any): any {
  const keys = path && path.split("/")
  const keysCount = keys.length - 1
  const result = duplicateAtKeys(keys, keysCount, data)
  if (keys[keysCount] === "") {
    result.newData.push(value)
  }
  else {
    result.newData.splice(keys[keysCount], 0, value)
  }
  return result.root
}

export function removeDataAtPath(path: string, data: Object): any {
  const keys = path && path.split("/")
  const keysCount = keys.length - 1
  const result = duplicateAtKeys(keys, keysCount, data)
  if (Array.isArray(result.newData)) {
    result.newData.splice(keys[keysCount], 1)
  }
  else {
    delete result.newData[keys[keysCount]]
  }
  return result.root
}

export function displaceDataAtPath(path: string, data: Object/* , originPath: string*/): any {
  /* const keys = path && path.split("/")
  const originKeys = originPath && originPath.split("/")
*/
  return data
}

export function keepEach(obj, callback) {
  let result = null
  obj.forEach(x => {
    const y = callback(x)
    if (y) {
      if (!result) result = [ y ]
      else result.push(y)
    }
  })
  return result
}
