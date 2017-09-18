
import { WindowInstance, WindowComponent, WindowContainer, WindowID } from "./Window"
import { PluginInstance } from "./Plugin"
import { PluginContext } from "./Context"

export default function(app) {
  const layout = new PluginContext(app)
  app.installFeatures({
    layout,
    WindowComponent,
    WindowContainer,
    PluginInstance,
    configureLayout: function(description: Object): PluginClass {
      layout.splashComponent = description.splashComponent
      layout.displayLayout = description.displayLayout
      return this
    },
    installPlugin: function (description: Object): PluginClass { // eslint-disable-line
      return layout.installPlugin.apply(layout, arguments)
    },
    dettachWindow: function(windowId: WindowID) {
      layout.frame && layout.frame.dettachWindow(windowId)
    },
    removeWindow: function(windowId: WindowID) {
      this.dettachWindow(windowId)
      delete layout.windows[windowId]
    },
    getWindowHandle: function (windowId: WindowID): WindowInstance { // eslint-disable-line
      return layout.getWindowInstance.apply(layout, arguments)
    },
  })
}

export {
  WindowInstance,
  WindowComponent,
  WindowContainer,
  WindowID,
  PluginInstance,
  PluginContext,
}