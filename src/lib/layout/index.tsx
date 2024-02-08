import React from "react"
import ReactDOM from "react-dom/client"
import WindowedContainer from "../components/WindowedContainer"
import context from "./Context"
import "./index.scss"

const defaultDisplayLayout = {
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

export function installFeatures(features: { [key: string]: any }, onlyFunction?: boolean) {
   Object.keys(features).forEach(key => {
      if (!onlyFunction || (features[key] instanceof Function)) {
         this[key] = features[key]
      }
   })
}

export function renderFrameComponent(displayLayout) {
   return (<WindowedContainer ref={context.registerFrameComponent} displayLayout={displayLayout} />)
}

export function mountDocumentViewsFrame(displayLayout?: any) {
   const { body } = window.document
   const element = window.document.createElement("div")
   element.className = "theme-dark"
   element.style.flex = "1"

   const root = ReactDOM.createRoot(element)
   root.render(renderFrameComponent(displayLayout || defaultDisplayLayout))

   body.className = "WND_frame_body"
   body.appendChild(element)
}

export * from "./Window"
export * from "./Feature"
export * from "./Context"
export default context
