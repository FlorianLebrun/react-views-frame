/* eslint-disable react/no-multi-comp */
import { PluginInstance, PluginClass } from "./Plugin"
import { WindowInstance, WindowClass, WindowID } from "./Window"

export class PluginContext {
  pluginClasses: { [string]: PluginClass } = {}
  plugins: { [string]: PluginInstance } = {}
  windows: { [string]: WindowInstance } = {}
  docks: { [string]: Array<WindowInstance> } = {}
  frame: Frame = null
  application: Object = null

  displayLayout: Object
  windowLoaded: boolean = false
  uidGenerator: number = 0

  constructor(application) {
    this.application = application
    PluginInstance.prototype.layout = this
    WindowInstance.prototype.layout = this
    PluginInstance.prototype.application = application
    WindowInstance.prototype.application = application
    window.addEventListener("beforeunload", this.unmountPlugins)
  }
  registerFrame(frame: Frame) {
    const prevFrame = this.frame
    if (!frame && prevFrame) {
      this.unmountPlugins()
    }
    this.frame = frame
    if (frame && !prevFrame) {
      this.mountPlugins()
    }
  }
  mountPlugins = () => {
    this.windowLoaded = true
    const pluginNames = Object.keys(this.pluginClasses)

    // Instancing plugins
    pluginNames.forEach(name => {
      this.plugins[name] = this.pluginClasses[name].createInstance()
    })

    // Connect plugins
    pluginNames.forEach(name => {
      this.pluginClasses[name].mountInstance(this.plugins[name], this)
    })

    // Finalize plugins mount
    pluginNames.forEach(name => {
      this.plugins[name].pluginDidMount()
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
  installPlugin(description: Object, parameters: Object): PluginClass {
    const pluginClass = new PluginClass(description, parameters, this)
    this.pluginClasses[description.name] = pluginClass
    if (this.windowLoaded) {
      const plugin = pluginClass.createInstance()
      this.plugins[pluginClass.name] = plugin
      plugin.pluginWillMount(parameters)
      plugin.pluginDidMount()
    }
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
  openPluginWindow(windowClass: WindowClass, plugin: PluginInstance, options: WindowOptions) {
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
  closePluginWindows(windowClass: WindowClass, plugin: PluginInstance) {
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
