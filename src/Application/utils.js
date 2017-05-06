
export function injectConstantsInto(clazz, constants) {
  if (!Array.isArray(clazz)) clazz = [clazz]
  Object.keys(constants).forEach((key) => {
    clazz.forEach(cls => {
      Object.defineProperty(cls.prototype, key, {
        value: constants[key],
        writable: false,
        enumerable: false,
        configurable: false,
      })
    })
  })
}

export function isInheritedOf(What, Of) {
  while (What) {
    What = Object.getPrototypeOf(What)
    if (What === Of) return true
  }
  return false
}
