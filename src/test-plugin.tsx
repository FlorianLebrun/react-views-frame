import React from "react"
import Application from './lib'
import "font-awesome/css/font-awesome.min.css"


export class ToolboxX extends Application.WindowComponent {
  handleClick = () => {
    //Application.redirect("https://www.qwant.com/?q=js+postMessage&client=opensearch")
    Application.openWindow("https://www.qwant.com/?q=js+postMessage&client=opensearch")
  }
  render() {
    return (<div>
      <button onClick={this.handleClick}>
        {"Message"}
      </button>
    </div>)
  }
}


export class ToolboxY extends Application.WindowComponent {
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

  pluginDidMount() {
    this.openWindow("toolbox-x")
    this.openWindow("toolbox-y")
    Application.setWindowMenu([
      {
        "icon": "save",
        "title": "Save current state",
        "action": "save",
      },
      {
        "icon": "cog",
        "title": "Show menu",
        "action": "menu",
      },
    ])
  }
}

Application.declarePlugin({
  name: "test",
  title: "Test Plugin",
  component: DevTextPlugin,
  importPlugins: { console: "dev-console" },
  windows: {
    "toolbox-x": {
      defaultTitle: "Tool Box 1 - Tool Box 1",
      defaultIcon: "bug",
      defaultDockId: "left",
      component: ToolboxX,
    },
    "toolbox-y": {
      defaultTitle: "Web Page - Web Page",
      defaultIcon: "globe",
      defaultDockId: "center",
      overflow: "hidden",
      component: ToolboxY,
    },
  },
})