/* eslint-disable no-unused-vars */
import React from "react"

import { Application } from "../application"

import {
  WindowInstance, WindowContainer,
  WindowID, PluginInstance, PluginClass,
} from "./Layout"
import { Frame } from "./Frame"
import "./index.css"

export class ApplicationKernel {
  pluginClasses: { [string]: PluginClass } = {}
  plugins: { [string]: PluginInstance } = {}
  windows: { [string]: WindowInstance } = {}
  docks: { [string]: Array<WindowInstance> } = {}
  frame: Frame = null
  splashComponent: Function<Component>

  windowLoaded: boolean = false
  uidGenerator: number = 0

  constructor() {
    // window.addEventListener("DOMContentLoaded", this.mountPlugins)
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
    Object.keys(this.pluginClasses).forEach(name => {
      const pluginClass = this.pluginClasses[name]
      const plugin = pluginClass.create()
      this.plugins[pluginClass.name] = plugin
      plugin.pluginWillMount()
    })
    Object.keys(this.plugins).forEach(name => {
      this.plugins[name].pluginDidMount()
    })
  }
  unmountPlugins = () => {
    Object.keys(this.plugins).forEach(name => {
      const plugin = this.plugins[name]
      plugin.pluginWillUnmount()
    })
  }

  configureKernel(description: Object): PluginClass {
    this.splashComponent = description.splashComponent
    this.layout = description.layout
    return this
  }

  installPlugin(description: Object): PluginClass {
    const pluginClass = new PluginClass(description)
    this.pluginClasses[description.name] = pluginClass
    if (this.windowLoaded) {
      const plugin = pluginClass.create()
      this.plugins[pluginClass.name] = plugin
      plugin.pluginWillMount()
      plugin.pluginDidMount()
    }
    return pluginClass
  }
  dockWindow(wnd: WindowInstance, dockId: DockID, foreground: boolean) {
    this.frame.attachWindow(wnd.id, dockId, foreground)
  }
  openSubWindow(windowClass: WindowClass, parent: WindowInstance, options: WindowOptionsType) {
    if (windowClass && parent) {
      return new (windowClass.component)("#" + (this.uidGenerator++), windowClass, parent, parent.plugin, options || {})
    }
  }
  openPluginWindow(windowClass: WindowClass, plugin: PluginInstance, options: WindowOptionsType) {
    if (windowClass && plugin) {
      return new (windowClass.component)("#" + (this.uidGenerator++), windowClass, null, plugin, options || {})
    }
  }
  getWindow(windowId: WindowID) {
    return this.windows[windowId]
  }
}
export const kernel: ApplicationKernel = new ApplicationKernel()

export function configureKernel(description: Object): PluginClass {
  return kernel.configureKernel.apply(kernel, arguments)
}

export function installPlugin(description: Object): PluginClass {
  return kernel.installPlugin.apply(kernel, arguments)
}

export function dettachWindow(windowId: WindowID) {
  kernel.frame && kernel.frame.dettachWindow(windowId)
}

export function removeWindow(windowId: WindowID) {
  dettachWindow(windowId)
  delete kernel.windows[windowId]
}

export function getWindowHandle(windowId: WindowID): WindowInstance {
  return kernel.getWindow.apply(kernel, arguments)
}

export function renderDisplayFrame(displayLayout) {
  return (<Frame />)
}

Application.injectConstantsInto([PluginInstance, WindowInstance, Frame], { kernel })
export { WindowInstance, WindowContainer, WindowID, PluginInstance }

