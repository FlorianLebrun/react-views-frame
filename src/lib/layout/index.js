
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
    configureLayout: layout.configureLayout.bind(layout),
    installPlugin: layout.installPlugin.bind(layout),
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