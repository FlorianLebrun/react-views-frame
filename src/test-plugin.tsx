import React from "react"
import Application from './lib'
import "font-awesome/css/font-awesome.min.css"
import LinearContainer from "./lib/ui/LinearContainer";


export class ToolboxX extends Application.WindowComponent {
  render() {
    return (<LinearContainer value={[{ size: 2 }, { size: 1 }]} style={{ height: "100vh" }}>
      {() => {
        return {
          header: "hello",
          content: "world",
        }
      }}
    </LinearContainer>)
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