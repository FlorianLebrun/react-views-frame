import React, { Component } from "react"
import  Application from './lib'

class ToolboxX extends Application.WindowComponent {
  render() {
    return (<div style={{ backgroundColor: "red", width: 1800, height: 1800 }}>
      {"toolbox1"}
    </div>)
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

Application.createDisplayFrame(document.getElementById("root"), displayLayout)

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
  }), "left")

Application.attachWindow(
  Application.createWindow({
    id: "toolbox3",
    title: "Tool Box 3",
    component: ToolboxX,
  }), "left")

Application.attachWindow(
  Application.createWindow({
    id: "toolbox4",
    title: "Tool Box 4",
    component: ToolboxX,
  }), "left")
