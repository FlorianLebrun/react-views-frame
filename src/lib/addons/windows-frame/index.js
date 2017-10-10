import React from "react"

import { PluginComponent } from "../../layout"

import { Frame } from "./Frame"

export default {
  name: "windows-frame",
  component: class extends PluginComponent {
    pluginWillMount() {
      this.application.renderDisplayFrame = function() {
        return (<Frame />)
      }
    }
  },
}