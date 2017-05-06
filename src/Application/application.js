import * as Utils from "./utils"

export class ApplicationInstance {

  installFeatures(features: { [string]: any }, onlyFunction: boolean) {
    Object.keys(features).forEach(key => {
      if (!onlyFunction || (features[key] instanceof Function)) {
        this[key] = features[key]
      }
    })
  }
}

export function extendApplication(features: { [string]: any }) {
  Object.keys(features).forEach(key => {
    Object.defineProperty(ApplicationInstance.prototype, key, {
      value: features[key],
      writable: false,
      enumerable: false,
      configurable: false,
    })
  })
}

extendApplication(Utils)

export const Application = new ApplicationInstance()
