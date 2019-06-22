/* eslint-disable react/no-multi-comp */
import { PluginInstance, PluginClass } from "./Plugin"
import { WindowInstance, WindowClass, WindowContainer } from "./Window"

export class PluginContext {
  pluginClasses: { [key:string]: PluginClass } = {}
  plugins: { [key:string]: PluginInstance } = {}
  windows: { [key:string]: WindowInstance } = {}
  docks: { [key:string]: Array<WindowInstance> } = {}
  focused: WindowInstance = null
  frame: Frame = null
  application: Object = null

  displayLayout: Object
  windowLoaded: boolean = false
  uidGenerator: number = 0

  constructor(application) {
    this.application = application
    PluginInstance.prototype.layout = this
    PluginInstance.prototype.application = application
    WindowInstance.prototype.layout = this
    WindowInstance.prototype.application = application
    WindowContainer.prototype.layout = this
    WindowContainer.prototype.application = application
    window.addEventListener("beforeunload", this.unmountPlugins)
  }
  registerFrame(frame: Frame) {
    this.frame = frame
    frame && Object.keys(this.windows).forEach(key => {
      const wnd = this.windows[key]
      frame.attachWindow(wnd, wnd.dockId)
      wnd.render()
    })
  }
  mountPlugins = () => {
    this.windowLoaded = true
    const pluginNames = Object.keys(this.pluginClasses)

    // Connect plugins
    pluginNames.forEach(name => {
      this.pluginClasses[name].willMount()
    })

    // Finalize plugins mount
    pluginNames.forEach(name => {
      this.pluginClasses[name].didMount()
    })
  }
  unmountPlugins = () => {
    Object.keys(this.plugins).forEach(name => {
      const plugin = this.plugins[name]
      plugin.pluginWillUnmount()
    })
  }
  configureLayout(description: Object) {
    this.splashComponent = description.splashComponent
    this.displayLayout = description.displayLayout
  }
  mapPlugin(name) {
    let pluginClass = this.pluginClasses[name]
    if (!pluginClass) {
      pluginClass = new PluginClass(name, this)
      this.pluginClasses[name] = pluginClass
    }
    return pluginClass
  }
  installPlugin(description: Object, parameters: Object): PluginClass {
    const pluginClass = this.mapPlugin(description.name)
    pluginClass.setup(description, parameters)
    pluginClass.mount()
    return pluginClass
  }
  declarePlugin(description: Object, parameters: Object): PluginClass {
    const pluginClass = this.mapPlugin(description.name)
    pluginClass.setup(description, parameters)
    return pluginClass
  }
  mountPlugin(name: Object): PluginClass {
    const pluginClass = this.pluginClasses[name]
    pluginClass && pluginClass.mount()
    return pluginClass
  }
  dockWindow(wnd: WindowInstance, dockId: DockID, foreground: boolean) {
    this.frame && this.frame.attachWindow(wnd, dockId, foreground)
  }
  dettachWindow(wnd: WindowInstance) {
    this.frame && this.frame.dettachWindow(wnd)
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
  getWindowInstance(windowId: WindowID) {
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
  findAllWindowsByClass(windowClass: WindowClass): Array<WindowInstance> {
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
      return this.windows.values()
    }
  }
}
