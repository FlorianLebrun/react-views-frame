import React from "react"
import { PluginInstance } from "../layout"

export default {
  name: "envs",
  component: class extends PluginInstance {
    pluginWillMount() {
      this.application.envs = this
      this.application.listenEnv = listenEnv.bind(this.application)
      this.application.filterEnv = filterEnv.bind(this.application)
      this.application.connectEnv = connectEnv.bind(this.application)

      const update_location = updateWindowLocation.bind(this.application)
      window.addEventListener("hashchange", update_location)
      update_location()
    }
  },
}

function listenEnv(name: string, callback: Function) {
  //TODO //TODO
}

function filterEnv(name: string, callback: Function) {
  //TODO
}

function listenEnvStream(name: string, callback: Function) {
  //TODO
}

function unlistenEnvStream(name: string, callback: Function) {
  //TODO
}

function connectEnv(mapping: Function | Array<string> | { [string]: string }, ConnectedComponent) {
  return function (props) {
    return (<ConnectedComponent {...props} />)
  }
}

function filterWindowLocation(location) {
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
  return { "location": location }
}

function updateWindowLocation() {
  this.envs.setState(filterWindowLocation(window.location.hash))
}
