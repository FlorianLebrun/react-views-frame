import { WindowInstance, WindowComponent, WindowContainer, WindowID } from "./Window"
import { PluginInstance, PluginClass } from "./Plugin"
import { applicationLayout } from "./Layout"

PluginInstance.prototype.layout = applicationLayout
WindowInstance.prototype.layout = applicationLayout

export {
  WindowInstance,
  WindowComponent,
  WindowContainer,
  WindowID,
  PluginInstance,
  applicationLayout,
}

export function configureLayout(description: Object): PluginClass {
  applicationLayout.splashComponent = description.splashComponent
  applicationLayout.displayLayout = description.displayLayout
  return this
}

export function installPlugin(description: Object): PluginClass { // eslint-disable-line
  return applicationLayout.installPlugin.apply(applicationLayout, arguments)
}

export function dettachWindow(windowId: WindowID) {
  applicationLayout.frame && applicationLayout.frame.dettachWindow(windowId)
}

export function removeWindow(windowId: WindowID) {
  dettachWindow(windowId)
  delete applicationLayout.windows[windowId]
}

export function getWindowHandle(windowId: WindowID): WindowInstance { // eslint-disable-line
  return applicationLayout.getWindowInstance.apply(applicationLayout, arguments)
}
