/* eslint-disable react/no-multi-comp */
import { PluginComponent, PluginClass } from "./Plugin"
import { WindowInstance, WindowClass, WindowID } from "./Window"

export class PluginContext {
  pluginClasses: { [string]: PluginClass } = {}
  plugins: { [string]: PluginComponent } = {}
  windows: { [string]: WindowInstance } = {}
  docks: { [string]: Array<WindowInstance> } = {}
  frame: Frame = null
  application: Object = null

  displayLayout: Object
  windowLoaded: boolean = false
  uidGenerator: number = 0

  constructor(application) {
    this.application = application
    PluginComponent.prototype.layout = this
    PluginComponent.prototype.application = application
    WindowInstance.prototype.layout = this
    WindowInstance.prototype.application = application
    window.addEventListener("beforeunload", this.unmountPlugins)
  }
  registerFrame(frame: Frame) {
    this.frame = frame
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
    return pluginClass
  }
  dockWindow(wnd: WindowInstance, dockId: DockID, foreground: boolean) {
    this.frame && this.frame.attachWindow(wnd.id, dockId, foreground)
  }
  dettachWindow(windowId: WindowID) {
    this.frame && this.frame.dettachWindow(windowId)
  }
  removeWindow(windowId: WindowID) {
    const wnd = this.windows[windowId]
    this.dettachWindow(windowId)
    delete this.windows[windowId]
    wnd.close()
  }
  openSubWindow(windowClass: WindowClass, parent: WindowInstance, options: WindowOptions) {
    if (windowClass && parent) {
      let wnd = (options && options.openNew) ? null : this.findOneWindowByClass(windowClass)
      if (!wnd) {
        wnd = new WindowInstance("#" + (this.uidGenerator++), windowClass, parent, parent.plugin, options || {})
      }
      else {
        options && wnd.updateOptions(options)
      }
      this.dockWindow(wnd, wnd.dockId, true)
    }
  }
  openPluginWindow(windowClass: WindowClass, plugin: PluginComponent, options: WindowOptions) {
    if (windowClass) {
      let wnd = (options && options.openNew) ? null : this.findOneWindowByClass(windowClass)
      if (!wnd) {
        wnd = new WindowInstance("#" + (this.uidGenerator++), windowClass, null, plugin, options || {})
      }
      else {
        options && wnd.updateOptions(options)
      }
      this.dockWindow(wnd, wnd.dockId, true)
    }
  }
  closePluginWindows(windowClass: WindowClass, plugin: PluginComponent) {
    let windows
    if (windowClass) windows = this.findAllWindowsByClass(windowClass)
    else windows = this.findAllWindowsByPlugin(plugin)
    windows.forEach(wnd => this.removeWindow(wnd.id))
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
  findAllWindowsByPlugin(plugin: PluginComponent): Array<WindowInstance> {
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
