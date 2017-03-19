/* eslint-disable no-use-before-define */
import ReactDOM from "react-dom"
import React, { Component } from "react"
import { Frame } from "./ui-frame"
import { isInheritedOf } from "./core/utils"

let appIdGenerator: number = 0

/************************************************** */
/************************************************** */
/*** Application Display */
/************************************************** */
/************************************************** */
let appFrame: Frame = null
let appWindows: { [string]: WindowHandle } = {}

export type WindowID = string

export type WindowDesc = {
  title: string,
  component: WindowComponent,
  props: any,
  needStorage: boolean,
  keepAlive: boolean,
}

export class WindowComponent extends Component {
}

export class WindowHandle {
  id: WindowID
  dockId: DockID
  component: WindowComponent
  props: any
  storage: any
  title: string
  keepAlive: boolean
  constructor(windowId: WindowID, desc: WindowDesc) {
    this.id = windowId
    this.dockId = null
    this.title = desc.title
    this.component = desc.component
    this.props = desc.props
    this.storage = desc.needStorage ? createStorage(this.id) : null
    this.keepAlive = desc.keepAlive
    console.assert(isInheritedOf(desc.component, WindowComponent), "Window '", desc.title, "' shall be based on WindowComponent")
  }
  update(desc: WindowDesc) {
    this.title = desc.title
    this.component = desc.component
    this.props = desc.props
    this.storage = desc.needStorage ? createStorage(this.id) : null
    this.keepAlive = desc.keepAlive
    console.assert(isInheritedOf(desc.component, WindowComponent), "Window '", desc.title, "' shall be based on WindowComponent")
  }
  close() {
  }
  onChange = (props) => {
    this.props = { ...this.props, ...props }
  }
  render() {
    return (<this.component {...this.props} storage={this.storage} onChange={this.onChange} />)
  }
}
export function showWindow(windowId: WindowID, dockId: DockID, desc: WindowDesc) {
  let wnd = appWindows[windowId]
  if (!wnd) {
    const wnd = new WindowHandle(windowId, desc)
    appWindows[windowId] = wnd
  }
  else {
    wnd.update(desc)
  }
  attachWindow(windowId, dockId)
}

export function createWindow(desc: WindowDesc): WindowID {
  const wnd = new WindowHandle("w" + (appIdGenerator++), desc)
  appWindows[wnd.id] = wnd
  return wnd.id
}

export function getWindowHandle(windowId: WindowID): WindowHandle {
  return appWindows[windowId]
}

export function attachWindow(windowId: WindowID, dockId: DockID, dockRank: number) {
  appFrame && appFrame.attachWindow(windowId, dockId, dockRank)
}

export function dettachWindow(windowId: WindowID) {
  appFrame && appFrame.dettachWindow(windowId)
}

export function removeWindow(windowId: WindowID) {
  dettachWindow(windowId)
  delete appWindows[windowId]
}

export function createDisplayFrame(htmlElement: HtmlElement, displayLayout) {
  const handleFrameRegister = (frame) => {
    appFrame = frame
  }
  const handleFrameUnregister = (frame) => {
    appFrame = null
  }
  ReactDOM.render(
    <Frame displayLayout={displayLayout} onFrameRegister={handleFrameRegister} onFrameUnregister={handleFrameUnregister} />,
    document.getElementById("root")
  )
}

/************************************************** */
/************************************************** */
/*** Application Storage */
/************************************************** */
/************************************************** */
export class Storage {
}

let appStorages: { [string]: Storage } = {}

export function createStorage(id: string) {
  if (!id) id = "st" + (appIdGenerator++)
  appStorages[id] = new Storage()
}

export function deleteStorage(id: string) {
  delete appStorages[id]
}