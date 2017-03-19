/* eslint-disable guard-for-in */
import React, { Component } from 'react'
import { PanelProps, SidePanelTop, SidePanelLeft, SidePanelRight, SidePanelBottom, CenterPanelTop } from './FramePanels'
import * as Application from '../application'

type PropsType = {
  displayLayout: any,
}

export class Frame extends Component {
  props: PropsType
  panels: { [string]: PanelProps }
  windows: { [string]: WindowHandle }

  componentWillMount() {
    this.props.onFrameRegister(this)
    this.loadDisplayLayout(this.props.displayLayout)
  }
  componentWillUnmount() {
    this.props.onFrameUnregister(this)
  }
  loadDisplayLayout = (displayLayout) => {
    this.panels = {}
    this.windows = {}
    for (const dockId in displayLayout) {
      const panelDesc = displayLayout[dockId]
      const panel: PanelProps = {
        ...panelDesc,
        id: dockId,
        current: Application.getWindowHandle(panelDesc.current),
        items: [],
      }
      panelDesc.items && panelDesc.items.forEach(wid => {
        const wnd = Application.getWindowHandle(panelDesc.current)
        if (wnd) {
          wnd.dockId = dockId
          panel.items.push(wnd)
          this.windows[wid] = wnd
        }
      })
      this.panels[dockId] = panel
    }
  }
  showWindow(windowId: WindowID) {
    const wnd = Application.getWindowHandle(windowId)
    if (!wnd) return null

    const origin = this.panels[wnd.dockId]
    if (origin) {
      this.panels[wnd.dockId] = {
        ...origin,
        current: wnd,
      }
      this.forceUpdate()
    }
  }
  hideWindow(windowId: WindowID) {
    const wnd = Application.getWindowHandle(windowId)
    if (!wnd) return null

    const origin = this.panels[wnd.dockId]
    if (origin && origin.current === wnd) {
      this.panels[wnd.dockId] = {
        ...origin,
        current: null,
      }
      this.forceUpdate()
    }
  }
  dettachWindow(windowId: WindowID) {
    const wnd = Application.getWindowHandle(windowId)
    if (!wnd) return null

    let origin = this.panels[wnd.dockId]
    if (origin) {
      origin = {
        ...origin,
        items: origin.items.filter(x => x !== wnd),
      }
      if (origin.current === wnd) origin.current = origin.items[0]
      this.panels[wnd.dockId] = origin
      this.forceUpdate()
    }

    wnd.dockId = null
  }
  attachWindow(windowId: WindowID, dockId: DockID, dockRank: number) {
    const wnd = Application.getWindowHandle(windowId)
    if (!wnd) return null

    let origin = this.panels[wnd.dockId]
    if (origin) {
      origin = {
        ...origin,
        items: origin.items.filter(x => x !== wnd),
      }
      if (origin.current === wnd) origin.current = origin.items[0]
      this.panels[wnd.dockId] = origin
    }

    let panel = this.panels[dockId]
    if (panel) {
      panel = {
        ...panel,
        current: panel.current || wnd,
        items: [...panel.items, wnd],
      }
      this.panels[dockId] = panel
    }

    wnd.dockId = dockId
    this.forceUpdate()
  }
  notifyPanelResize(panel: PanelProps, size: number) {
    this.panels[panel.id] = { ...panel, size }
    this.forceUpdate()
  }
  renderPanel(id: string) {
    const panel = this.panels[id]
    const props = {
      id: id,
      frame: this,
      panel: panel,
      children: panel.child && this.renderPanel(panel.child)
    }
    switch (panel.type) {
      case '#':
        return (<div style={{ height: '100%', width: '100%' }}> {props.children} </div>)
      case 'side-left':
        return React.createElement(SidePanelLeft, props)
      case 'side-top':
        return React.createElement(SidePanelTop, props)
      case 'side-right':
        return React.createElement(SidePanelRight, props)
      case 'side-bottom':
        return React.createElement(SidePanelBottom, props)
      case 'center-top':
        return React.createElement(CenterPanelTop, props)
      default:
        return null
    }
  }
  render() {
    return this.renderPanel('#')
  }
}
