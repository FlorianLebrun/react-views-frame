import React from "react"
import { PluginInstance, PluginClass, PluginDescriptor } from "./Plugin"
import { WindowInstance, WindowClass, WindowOptions } from "./Window"

const windowsDocks_Key = "[react-application-frame]#windows-docks"

export interface IApplicationFrame {
  attachWindow(wnd: WindowInstance, dockId: string, foreground?: boolean): void
  dettachWindow(wnd: WindowInstance): void
  getFrameComponent(): React.Component
}

export class PluginContext {
  pluginClasses: { [key: string]: PluginClass } = {}
  plugins: { [key: string]: PluginInstance } = {}
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
    window.addEventListener("beforeunload", this.unmountPlugins)
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
  mountPlugins = () => {
    const pluginNames = Object.keys(this.pluginClasses)

    // Connect plugins
    pluginNames.forEach(name => {
      this.pluginClasses[name].mount()
    })

    // Finalize plugins mount
    pluginNames.forEach(name => {
      this.pluginClasses[name].didMount()
    })
  }
  unmountPlugins = () => {
    localStorage.setItem(windowsDocks_Key, JSON.stringify(this.windowsDocks))
    Object.keys(this.plugins).forEach(name => {
      const plugin = this.plugins[name]
      plugin.pluginWillUnmount()
    })
  }
  mapPlugin(name) {
    let pluginClass = this.pluginClasses[name]
    if (!pluginClass) {
      pluginClass = new PluginClass(name, this)
      this.pluginClasses[name] = pluginClass
    }
    return pluginClass
  }
  installPlugin(description: PluginDescriptor, parameters: any): PluginClass {
    const pluginClass = this.mapPlugin(description.name)
    pluginClass.setup(description, parameters)
    pluginClass.mount()
    return pluginClass
  }
  declarePlugin(description: PluginDescriptor, parameters?: any): PluginClass {
    const pluginClass = this.mapPlugin(description.name)
    pluginClass.setup(description, parameters)
    return pluginClass
  }
  mountPlugin(name: string): PluginClass {
    const pluginClass = this.pluginClasses[name]
    pluginClass && pluginClass.mount()
    return pluginClass
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
        wnd = new WindowInstance("#" + (this.uidGenerator++), windowClass, parent, parent.plugin, options)
      }
      else {
        options && wnd.updateOptions(options)
      }
      this.dockWindow(wnd, wnd.dockId, true)
    }
  }
  openPluginWindow(windowClass: WindowClass, plugin: PluginInstance, options: WindowOptions) {
    if (windowClass) {
      let wnd = (options && options.openNew) ? null : this.findOneWindowByClass(windowClass)
      if (!wnd) {
        wnd = new WindowInstance("#" + (this.uidGenerator++), windowClass, null, plugin, options)
      }
      else {
        options && wnd.updateOptions(options)
      }
      this.dockWindow(wnd, wnd.dockId, true)
    }
  }
  closePluginWindows(windowClass: WindowClass, plugin: PluginInstance) {
    let windows
    if (windowClass) windows = this.findAllWindowsByClass(windowClass)
    else windows = this.findAllWindowsByPlugin(plugin)
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
  findAllWindowsByPlugin(plugin: PluginInstance): Array<WindowInstance> {
    const windows = []
    if (plugin) {
      let windowId
      for (windowId in this.windows) {
        if (this.windows[windowId].plugin === plugin) {
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
