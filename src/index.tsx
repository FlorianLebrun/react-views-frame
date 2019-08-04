import ReactDOM from "react-dom"
import "babel-polyfill"
import Application, { Addons } from "./lib"
import "./test-plugin"
import "bootstrap/dist/css/bootstrap.min.css"

Application.installPlugin(Addons.Notification)
Application.installPlugin(Addons.Popup)
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

Application.installPlugin(Addons.WindowsFrame, {
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

Application.mountPlugin("test")

ReactDOM.render(Application.layout.frame.renderFrameComponent(), document.getElementById("root"))

