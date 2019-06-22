import React from "react"
import { Application } from "../application"
import { PluginInstance } from "../layout"

export default {
  name: "envs",
  component: class extends PluginInstance {
    pluginWillMount() {
      Application.envs = this
      Application.connectEnv = connectEnv.bind(Application)

      window.addEventListener("hashchange", this.updateLocation)
      this.updateLocation()
    }
    updateLocation = () => {
      this.setState("location", parseLocation(window.location.hash))
    }
  },
}

function connectEnv(mapping: Function | Array<string> | { [key:string]: string }, ConnectedComponent) {
  return function (props) {
    return (<ConnectedComponent {...props} />)
  }
}

function parseLocation(location): Object {
  if (typeof location === "string") {
    const locParts = location.split("?")
    location = {}
    location.url = locParts[0]
    location.params = {}
    if (locParts[1]) {
      locParts[1].split("&").forEach((param) => {
        const parts = param.split("=")
        location.params[parts[0]] = parts[1]
      })
    }
  }
  else if (location) {
    let hash = location.url
    let isFirst = true
    if (location.params) {
      hash += "?"
      Object.keys(location.params).forEach(key => {
        const param = location.params[key]
        if (isFirst) isFirst = false
        else hash += "&"
        hash += key + "=" + param
      })
    }
    window.location.hash = hash
  }
  return location
}
