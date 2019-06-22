import React from "react"
import { Application } from "../../application"
import { PluginInstance } from "../../layout"
import { Frame } from "./Frame"
import "./frame.css"

export default {
  name: "windows-frame",
  component: class extends PluginInstance {
    pluginWillMount() {
      Application.renderDisplayFrame = function() {
        return (<Frame />)
      }
    }
  },
}