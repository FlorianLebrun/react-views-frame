/* eslint-disable guard-for-in */
/* eslint-disable import/no-namespace */
/* eslint-disable react-native/no-inline-styles */
import React, { Component } from "react"

import { Application } from "../application"

import { PanelProps, SidePanelTop, SidePanelLeft, SidePanelRight, SidePanelBottom, CenterPanelTop } from "./FramePanels"

type PropsType = {
  displayLayout: any,
}

type StateType = {
  panels: { [string]: PanelProps },
}

export class Frame extends Component<void, PropsType, StateType> {
  props: PropsType
  state: StateType
  componentWillMount() {
    this.loadDisplayLayout(Application.layout.displayLayout)
  }
  componentDidMount() {
    Application.layout.registerFrame(this)
  }
  componentWillUnmount() {
    Application.layout.registerFrame()
  }
  loadDisplayLayout = (displayLayout) => {
    const panels = {}
    for (const dockId in displayLayout) {
      const panelDesc = displayLayout[dockId]
      const panel: PanelProps = {
        ...panelDesc,
        id: dockId,
        current: Application.layout.getWindowInstance(panelDesc.current),
        items: [],
      }
      panelDesc.items && panelDesc.items.forEach(wid => {
        const wnd = Application.layout.getWindowInstance(wid)
        if (wnd) {
          wnd.dockId = dockId
          panel.items.push(wnd)
        }
      })
      panels[dockId] = panel
    }
    this.setState({ panels })
    this.forceUpdate()
  }
  showWindow(windowId: WindowID) {
    const panels = this.state.panels
    const wnd = Application.layout.getWindowInstance(windowId)
    if (!wnd) return null

    const origin = panels[wnd.dockId]
    if (origin) {
      panels[wnd.dockId] = {
        ...origin,
        current: wnd,
      }
      this.setState({ panels })
      this.forceUpdate()
    }
  }
  hideWindow(windowId: WindowID) {
    const panels = this.state.panels
    const wnd = Application.layout.getWindowInstance(windowId)
    if (!wnd) return null

    const origin = panels[wnd.dockId]
    if (origin && origin.current === wnd) {
      panels[wnd.dockId] = {
        ...origin,
        current: null,
      }
      this.setState({ panels })
      this.forceUpdate()
    }
  }
  dettachWindow(windowId: WindowID) {
    const panels = this.state.panels
    const wnd = Application.layout.getWindowInstance(windowId)
    if (!wnd) return null

    let origin = panels[wnd.dockId]
    if (origin) {
      origin = {
        ...origin,
        items: origin.items.filter(x => x !== wnd),
      }
      if (origin.current === wnd) origin.current = origin.items[0]
      panels[wnd.dockId] = origin
      this.setState({ panels })
      this.forceUpdate()
    }

    wnd.dockId = null
  }
  attachWindow(windowId: WindowID, dockId: DockID, foreground: boolean) {
    const panels = this.state.panels
    const wnd = Application.layout.getWindowInstance(windowId)
    if (!wnd) return null

    // Detach from origin panel
    if (wnd.dockId !== dockId) {
      let origin = panels[wnd.dockId]
      if (origin && origin.items.indexOf(wnd) >= 0) {
        origin = {
          ...origin,
          items: origin.items.filter(x => x !== wnd),
        }
        if (origin.current === wnd) origin.current = origin.items[0]
        panels[wnd.dockId] = origin
      }
    }

    // Attach to target panel
    let panel = panels[dockId]
    if (panel) {
      panel = { ...panel }
      if (panel.items.indexOf(wnd) < 0) {
        panel.items = [ ...panel.items, wnd ]
      }
      panel.current = foreground ? (wnd || panel.current) : (panel.current || wnd)
      panels[dockId] = panel
    }

    wnd.dockId = dockId
    this.setState({ panels })
    this.forceUpdate()
  }
  notifyPanelResize(panel: PanelProps, size: number) {
    const panels = this.state.panels
    panels[panel.id] = { ...panel, size }
    this.setState({ panels })
  }
  renderPanel(id: string) {
    const panel = this.state.panels[id]
    const props = {
      id: id,
      frame: this,
      panel: panel,
      children: panel.child && this.renderPanel(panel.child),
    }
    switch (panel.type) {
    case "#":
      return (<div style={{ height: "100%", width: "100%" }}> {props.children} </div>)
    case "side-left":
      return React.createElement(SidePanelLeft, props)
    case "side-top":
      return React.createElement(SidePanelTop, props)
    case "side-right":
      return React.createElement(SidePanelRight, props)
    case "side-bottom":
      return React.createElement(SidePanelBottom, props)
    case "center-top":
      return React.createElement(CenterPanelTop, props)
    default:
      return null
    }
  }
  render() {
    return this.renderPanel("#")
  }
}
