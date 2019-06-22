import React from "react"
import { PluginInstance } from "../../layout"
import { Frame } from "./Frame"
import "./frame.css"

export default {
  name: "windows-frame",
  component: class extends PluginInstance {
    pluginWillMount() {
      this.application.renderDisplayFrame = function() {
        return (<Frame />)
      }
    }
  },
}