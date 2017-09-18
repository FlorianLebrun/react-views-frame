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
  installPlugin(description: Object, parameters:Object): PluginClass {
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
    this.frame.attachWindow(wnd.id, dockId, foreground)
  }
  openSubWindow(windowClass: WindowClass, parent: WindowInstance, options: WindowOptions) {
    if (windowClass && parent) {
      let wnd = (options && options.openNew) ? null : this.getWindowInstanceFromClass(windowClass)
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
    if (windowClass && parent) {
      let wnd = (options && options.openNew) ? null : this.getWindowInstanceFromClass(windowClass)
      if (!wnd) {
        wnd = new WindowInstance("#" + (this.uidGenerator++), windowClass, null, plugin, options || {})
      }
      else {
        options && wnd.updateOptions(options)
      }
      this.dockWindow(wnd, wnd.dockId, true)
    }
  }
  getWindowInstance(windowId: WindowID) {
    return this.windows[windowId]
  }
  getWindowInstanceFromClass(windowClass: WindowClass) {
    const windowId = Object.keys(this.windows).find(key => {
      return (this.windows[key].windowClass === windowClass) ? this.windows[key] : null
    })
    return windowId && this.windows[windowId]
  }
}
