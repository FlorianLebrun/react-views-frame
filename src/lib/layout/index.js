
import { WindowInstance, WindowComponent, WindowContainer } from "./Window"
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
    declarePlugin: layout.declarePlugin.bind(layout),
    mountPlugin: layout.mountPlugin.bind(layout),
  })
}

export {
  WindowInstance,
  WindowComponent,
  WindowContainer,
  PluginInstance,
  PluginContext,
}