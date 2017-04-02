import React from "react"

import { Frame } from "./Frame"
import { WindowHandle, WindowComponent, WindowID } from "./FrameWindow"
import "./index.css"

export { WindowHandle, WindowComponent, WindowID }

let windowIdGenerator: number = 0
let frame: Frame = null
const windows: { [string]: WindowHandle } = {}

export function showWindow(windowId: WindowID, dockId: DockID, desc: WindowDesc) {
  let wnd = windows[windowId]
  if (!wnd) {
    wnd = new WindowHandle(windowId, desc)
    windows[windowId] = wnd
  }
  else {
    wnd.update(desc)
  }
  attachWindow(windowId, dockId)
}

export function createWindow(desc: WindowDesc): WindowID {
  const wnd = new WindowHandle("w" + (windowIdGenerator++), desc)
  windows[wnd.id] = wnd
  return wnd.id
}

export function getWindowHandle(windowId: WindowID): WindowHandle {
  return windows[windowId]
}

export function attachWindow(windowId: WindowID, dockId: DockID, dockRank: number) {
  frame && frame.attachWindow(windowId, dockId, dockRank)
}

export function dettachWindow(windowId: WindowID) {
  frame && frame.dettachWindow(windowId)
}

export function removeWindow(windowId: WindowID) {
  dettachWindow(windowId)
  delete windows[windowId]
}

export function renderDisplayFrame(displayLayout) {
  const handleFrameRegister = (instance) => {
    frame = instance
  }
  const handleFrameUnregister = () => {
    frame = null
  }
  return (
    <Frame
      displayLayout={ displayLayout }
      onFrameRegister={ handleFrameRegister }
      onFrameUnregister={ handleFrameUnregister }
    />)
}
