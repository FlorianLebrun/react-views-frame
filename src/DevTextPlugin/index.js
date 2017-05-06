import React, { Component } from "react"
import Application from '../Application'

export class ToolboxX extends Application.WindowInstance {
  handleClick = () => {
    Application.addNotification({ level: "error", message: "hello" })
  }
  render() {
    return (<div style={{ backgroundColor: "red", width: 300, height: 300 }}>
      {"Do something"}<br />
      <button onClick={this.handleClick}>
        {"Notify"}
      </button>
    </div>)
  }
}

export class WebPageWindow extends Application.WindowInstance {
  getWindowOverflow(): string {
    return "hidden"
  }
  render() {
    return (<iframe
      src={this.parameters.url}
      style={{ width: "100%", height: "100%" }}
    />)
  }
}

export class DevTextPlugin extends Application.PluginInstance {
  console: DevConsolePlugin

  pluginDidMount() {
    console.log("DevTextPlugin")
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
      component: WebPageWindow,
    },
  },
})