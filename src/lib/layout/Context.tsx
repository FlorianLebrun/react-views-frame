import React from "react"
import { FeatureInstance, FeatureClass, FeatureDescriptor } from "./Feature"
import { WindowInstance, WindowClass, WindowOptions } from "./Window"

const windowsDocks_Key = "[react-application-frame]#windows-docks"

export interface IApplicationFrame {
   attachWindow(wnd: WindowInstance, dockId: string, foreground?: boolean): void
   dettachWindow(wnd: WindowInstance): void
   getFrameComponent(): React.Component
}

export class FeatureContext {
   featureClasses: { [key: string]: FeatureClass } = {}
   features: { [key: string]: FeatureInstance } = {}
   windowsDocks: { [windowClassId: string]: string } = {}
   windows: { [key: string]: WindowInstance } = {}
   docks: { [key: string]: Array<WindowInstance> } = {}
   focused: WindowInstance = null
   frame: IApplicationFrame = null

   uidGenerator: number = 0

   constructor() {
      try {
         const windowsDocks = JSON.parse(localStorage.getItem(windowsDocks_Key))
         if (windowsDocks && typeof windowsDocks === "object") this.windowsDocks = windowsDocks
      } catch (e) { }
      window.addEventListener("beforeunload", this.unmountFeatures)
   }
   registerFrameComponent = (frame) => {
      this.frame = frame
      if (frame) {
         for (const key in this.windows) {
            const wnd = this.windows[key]
            frame.attachWindow(wnd, wnd.dockId)
            wnd.render()
         }
      }
   }
   mountFeatures = () => {
      const featureNames = Object.keys(this.featureClasses)

      // Connect features
      featureNames.forEach(name => {
         this.featureClasses[name].mount()
      })

      // Finalize features mount
      featureNames.forEach(name => {
         this.featureClasses[name].didMount()
      })
   }
   unmountFeatures = () => {
      localStorage.setItem(windowsDocks_Key, JSON.stringify(this.windowsDocks))
      Object.keys(this.features).forEach(name => {
         const feature = this.features[name]
         feature.featureWillUnmount()
      })
   }
   mapFeature(name) {
      let featureClass = this.featureClasses[name]
      if (!featureClass) {
         featureClass = new FeatureClass(name)
         this.featureClasses[name] = featureClass
      }
      return featureClass
   }
   installFeature(description: FeatureDescriptor, parameters: any): FeatureClass {
      const featureClass = this.mapFeature(description.name)
      featureClass.setup(description, parameters)
      featureClass.mount()
      return featureClass
   }
   declareFeature(description: FeatureDescriptor, parameters?: any): FeatureClass {
      const featureClass = this.mapFeature(description.name)
      featureClass.setup(description, parameters)
      return featureClass
   }
   mountFeature(name: string): FeatureClass {
      const featureClass = this.featureClasses[name]
      featureClass && featureClass.mount()
      return featureClass
   }
   dockWindow(wnd: WindowInstance, dockId: string, foreground: boolean) {
      this.frame && this.frame.attachWindow(wnd, dockId, foreground)
   }
   dettachWindow(wnd: WindowInstance) {
      this.frame && this.frame.dettachWindow(wnd)
   }
   attachWindow(wnd: WindowInstance, dockId: string, foreground?: boolean): void {
      this.frame && this.frame.attachWindow.apply(this.frame, arguments)
   }
   removeWindow(wnd: WindowInstance) {
      this.dettachWindow(wnd)
      delete this.windows[wnd.id]
      wnd.close()
   }
   openSubWindow(windowClass: WindowClass, parent: WindowInstance, options: WindowOptions) {
      if (windowClass && parent) {
         let wnd = (options && options.openNew) ? null : this.findOneWindowByClass(windowClass)
         if (!wnd) {
            wnd = new WindowInstance("#" + (this.uidGenerator++), windowClass, parent, parent.feature, options)
         }
         else {
            options && wnd.updateOptions(options)
         }
         this.dockWindow(wnd, wnd.dockId, true)
      }
   }
   openFeatureWindow(windowClass: WindowClass, feature: FeatureInstance, options: WindowOptions) {
      if (windowClass) {
         let wnd = (options && options.openNew) ? null : this.findOneWindowByClass(windowClass)
         if (!wnd) {
            wnd = new WindowInstance("#" + (this.uidGenerator++), windowClass, null, feature, options)
         }
         else {
            options && wnd.updateOptions(options)
         }
         this.dockWindow(wnd, wnd.dockId, true)
      }
   }
   closeFeatureWindows(windowClass: WindowClass, feature: FeatureInstance) {
      let windows
      if (windowClass) windows = this.findAllWindowsByClass(windowClass)
      else windows = this.findAllWindowsByFeature(feature)
      windows.forEach(wnd => this.removeWindow(wnd))
   }
   getWindowInstance(windowId: string) {
      return this.windows[windowId]
   }
   findOneWindowByClass(windowClass: WindowClass): WindowInstance {
      let windowId
      for (windowId in this.windows) {
         if (this.windows[windowId].windowClass === windowClass) {
            return this.windows[windowId]
         }
      }
      return null
   }
   findAllWindowsByFeature(feature: FeatureInstance): Array<WindowInstance> {
      const windows = []
      if (feature) {
         let windowId
         for (windowId in this.windows) {
            if (this.windows[windowId].feature === feature) {
               windows.push(this.windows[windowId])
            }
         }
      }
      return windows
   }
   findAllWindowsByClass(windowClass: WindowClass): WindowInstance[] {
      if (windowClass) {
         let windowId
         const windows = []
         for (windowId in this.windows) {
            if (this.windows[windowId].windowClass === windowClass) {
               windows.push(this.windows[windowId])
            }
         }
         return windows
      }
      else {
         return (this.windows as any).values()
      }
   }
}

export default new FeatureContext()
