

export function isInheritedOf(What, Of) {
  while (What) {
    What = Object.getPrototypeOf(What)
    if (What === Of) return true
  }
  return false
}

