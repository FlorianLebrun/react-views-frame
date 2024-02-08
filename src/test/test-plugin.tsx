import React from "react"
import "font-awesome/css/font-awesome.min.css"
import Views, { FeatureInstance, WindowComponent } from "../lib"
import LinearContainer from "../lib/components/LinearContainer"
import "./icons-fontawesome"
import "./icons-vscode"


export class ToolboxX extends WindowComponent {
  state = {
    layout: [
      { size: 2 },
      { size: 1 }
    ]
  }
  handleMenu = (e) => {
    /*openContextualMenu(this as any, e.currentTarget, (f) => {
      return <div style={{ width: 200, height: 200 }}>{"hello"}</div>
    })*/
  }
  render() {
    const content = []
    for (let i = 0; i < 100; i++) {
      content.push(<div key={i} onMouseDown={this.handleMenu}>{"01234567890123456789012345678901234567890123456789"}</div>)
    }
    return (<LinearContainer
      vertical
      style={{ height: "100vh" }}
      value={this.state.layout}
      onChange={layout => this.setState({ layout })}
    >
      {() => {
        return {
          header: "hello",
          content,
        }
      }}
    </LinearContainer >)
  }
}

export class ToolboxY extends WindowComponent {
  state = { counter: 0 }
  handleClick = () => {
    //Application.addNotification("error", "hello")
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

export class DevText extends FeatureInstance<DevText> {

  featureDidMount() {
    this.openWindow("toolbox-x")
    this.openWindow("toolbox-y")
  }
}

Views.declareFeature({
  name: "test",
  title: "Test Plugin",
  component: DevText,
  windows: {
    "toolbox-x": {
      userOpenable: true,
      defaultTitle: "Tool Box 1 - Tool Box 1",
      defaultIcon: "code:symbol/element",
      defaultDockId: "left",
      component: ToolboxX,
    },
    "toolbox-y": {
      defaultTitle: "Web Page - Web Page",
      defaultIcon: "fa:globe",
      defaultDockId: "center",
      component: ToolboxY,
    },
  },
})