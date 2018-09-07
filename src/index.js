import React from "react"
import ReactDOM from "react-dom"
import "babel-polyfill"
import Application, { extendApplication, createApplication, Addons, UI, Modules } from "./lib"
import "bootstrap/dist/css/bootstrap.min.css"

Application.installPlugin(Addons.Notification)
Application.installPlugin(Addons.Popup)
Application.installPlugin(Addons.WindowsFrame)
Application.installPlugin(Addons.Fetch, {
  endpoints: [
    {
      pattern: /^app:.*/,
      prepare: function (url, data): string {
        data.mode = "cors"
        return "http://localhost:9988/api" + url.substr(4)
      },
    },
    {
      pattern: /^.*/,
      prepare: function (url, data): string {
        data.mode = "cors"
        return url
      },
    },
  ],
})

Application.configureLayout({
  displayLayout: {
    "#": {
      type: "#",
      child: "left",
    },
    "left": {
      type: "side-left",
      child: "bottom",
      size: 30,
    },
    "bottom": {
      type: "side-bottom",
      child: "right",
      size: 30,
    },
    "right": {
      type: "side-right",
      child: "center",
      size: 30,
    },
    "center": {
      type: "center-top",
      menu: true,
    },
  },
})

/*createApplication("test-app", "test", {
  "react": require("react"),
  "react-dom": require("react-dom"),
  "prop-types": require("prop-types"),
  "react-application-frame": require("./app"),
}, function (Component) {
  ReactDOM.render(<Component.default />, document.getElementById("root"))
})*/

/*createApplication("test-app", "myIcon", {
  "react": require("react"),
  "react-dom": require("react-dom"),
  "prop-types": require("prop-types"),
  "react-application-frame": require("./app"),
}, function (Component) {
  ReactDOM.render(<Component.default name="user" />, document.getElementById("root"))
})*/

const applicationModuleId = window.location.hash.split("/")[1]
if (applicationModuleId) {
  console.log(`load application with module '${applicationModuleId}'`)
  createApplication("test-app", applicationModuleId, {
    "react": require("react"),
    "react-dom": require("react-dom"),
    "react-intl": require("react-intl"),
    "prop-types": require("prop-types"),
    "react-application-frame": require("./lib"),
  }, function (cmodule) {
    switch (cmodule[".type"]) {
      case "plugin": {
        ReactDOM.render(Application.renderDisplayFrame(), document.getElementById("root"))
        break
      }
      case "component": {
        ReactDOM.render(<cmodule.default />, document.getElementById("root"))
        break
      }
    }
  })
}
else {
  ReactDOM.render(Application.renderDisplayFrame(), document.getElementById("root"))
  //ReactDOM.render(<span>No application</span>, document.getElementById("root"))
}
