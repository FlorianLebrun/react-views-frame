import ReactDOM from "react-dom/client"
import Application from "../lib"
import "./test-plugin"
import "./index.css"

const displayLayout = {
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
}

Application.layout.mountPlugin("test")

const root = window.document.createElement("div")
root.id = "root"
window.document.body.appendChild(root)
ReactDOM.createRoot(root).render(Application.renderFrameComponent(displayLayout))

