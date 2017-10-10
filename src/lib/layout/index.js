
import { WindowInstance, WindowComponent, WindowContainer, WindowID } from "./Window"
import { PluginComponent } from "./Plugin"
import { PluginContext } from "./Context"

const PluginInstance = PluginComponent

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
  PluginComponent,
  PluginContext,
}