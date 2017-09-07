import React from "react"
import Application from '../../lib'

export class ToolboxX extends Application.WindowComponent {
  state = { counter: 0 }
  handleClick = () => {
    this.setState({ counter: this.state.counter + 1 })
    //Application.addNotification({ level: "error", message: "hello" })
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

export class WebPageWindow extends Application.WindowComponent {
  render() {
    return (<iframe
      src={"http://www.qwant.com/"}
      style={{ width: "100%", height: "100%" }}
    />)
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
      defaultTitle: "Tool Box 1",
      defaultIcon: "bug",
      defaultDockId: "left",
      component: ToolboxX,
    },
    "web-page": {
      defaultTitle: "Web Page",
      defaultIcon: "globe",
      defaultDockId: "center",
      overflow: "hidden",
      component: WebPageWindow,
    },
  },
})