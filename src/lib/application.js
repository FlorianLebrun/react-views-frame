
export class ApplicationInstance {
  installFeatures(features: { [string]: any }, onlyFunction: boolean) {
    Object.keys(features).forEach(key => {
      if (!onlyFunction || (features[key] instanceof Function)) {
        this[key] = features[key]
      }
    })
  }
  injectAsProperty(clazz) {
    Object.defineProperty(clazz.prototype, "application", {
      value: Application,
      writable: false,
      enumerable: false,
      configurable: false,
    })
  }
  redirect(url: string) {
    if (window.parent && window.parent !== window) {
      window.parent.postMessage(JSON.stringify({
        redirect: url,
      }), '*')
    }
    else {
      window.location = url
    }
  }
  openWindow(url: string) {
    if (window.parent && window.parent !== window) {
      window.parent.postMessage(JSON.stringify({
        open: url,
      }), '*')
    }
    else {
      window.open(url)
    }
  }
  setWindowTitle(name: string, icon: string) {
    if (window.parent && window.parent !== window) {
      window.parent.postMessage(JSON.stringify({
        title: { name, icon }
      }), '*')
    }
    else {
      window.title = name
    }
  }
  setWindowMenu(menu) {
    if (window.parent && window.parent !== window) {
      window.parent.postMessage(JSON.stringify({
        menu,
      }), '*')
    }
  }
}

window.addEventListener("message", (e) => {
  //alert("child receive", JSON.stringify(e))
  console.log("child receive", e)
})

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

export const Application = new ApplicationInstance()
