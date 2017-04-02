import React, { Component } from "react"
import ReactDOM from "react-dom"
import Application from './lib'

class ToolboxX extends Application.WindowComponent {
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

class ToolboxY extends Application.WindowComponent {
  handleClick = () => {
    Application.addNotification({ level: "error", message: "hello" })
  }
  handleFrameLoad = () => {
    const ifrm = this.refs.ifrm
    ifrm.style.height = ifrm.contentWindow.document.body.scrollHeight + "px"
  }
  render() {
    return (<iframe
      ref={"ifrm"}
      src={"http://fr.lipsum.com/feed/html"}
      onLoad={this.handleFrameLoad}
      style={{ backgroundColor: "red", width: "100%", height: "100%" }}
    />)
  }
}

const displayLayout = {
  "#": {
    type: "#",
    child: "left",
  },
  "left": {
    type: "side-left",
    child: "bottom",
    size: 100,
  },
  "bottom": {
    type: "side-bottom",
    child: "right",
    size: 100,
  },
  "right": {
    type: "side-right",
    child: "center",
    size: 100,
  },
  "center": {
    type: "center-top",
  },
}


ReactDOM.render(Application.renderDisplayFrame(displayLayout),
  document.getElementById("root"))

Application.attachWindow(
  Application.createWindow({
    id: "toolbox1",
    title: "Tool Box 1",
    component: ToolboxX,
  }), "left")

Application.attachWindow(
  Application.createWindow({
    id: "toolbox2",
    title: "Tool Box 2",
    component: ToolboxX,
  }), "right")

Application.attachWindow(
  Application.createWindow({
    id: "toolbox3",
    title: "Tool Box 3",
    component: ToolboxY,
  }), "bottom")

Application.attachWindow(
  Application.createWindow({
    id: "toolbox4",
    title: "Tool Box 4",
    component: ToolboxY,
  }), "center")
