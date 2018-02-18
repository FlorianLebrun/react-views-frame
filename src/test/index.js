import React from "react"
import Application from '../lib'

export class ToolboxX extends Application.WindowComponent {
  state = { counter: 0 }
  handleClick = () => {
    Application.addNotification("error", "hello")
    this.setState({ counter: this.state.counter + 1 })
  }
  render() {
    return (<div style={{ backgroundColor: "red", width: 300, height: 300 }}>
      {"Counter: "}{this.state.counter}<br />
      <button onClick={this.handleClick}>
        {"Notify"}
      </button>
    </div>)
  }
}


export class DevTextPlugin extends Application.PluginInstance {
  console: DevConsolePlugin

  pluginDidMount() {
    console.log("DevTextPlugin")
    this.openWindow("toolbox1")
    this.openWindow("web-page", {
      dockId: "center",
      parameters: {
        url: "http://www.qwant.com/",
      }
    })
  }
}

Application.installPlugin({
  name: "ewam",
  title: "Gold IDE",
  component: DevTextPlugin,
  importPlugins: { console: "dev-console" },
  windows: {
    "toolbox1": {
      defaultTitle: "Tool Box 1 - Tool Box 1",
      defaultIcon: "bug",
      defaultDockId: "left",
      component: ToolboxX,
    },
    "web-page": {
      defaultTitle: "Web Page - Web Page",
      defaultIcon: "globe",
      defaultDockId: "center",
      overflow: "hidden",
      component: ToolboxX,
    },
  },
})