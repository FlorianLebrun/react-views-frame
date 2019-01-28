import React, { Component } from "react"
import { Application } from "../../application"
import PanelComponents, { PanelProps } from "./FramePanels"

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
  }
  showWindow(wnd: WindowInstance) {
    const panels = this.state.panels
    if (!wnd) return null

    const origin = panels[wnd.dockId]
    if (origin) {
      panels[wnd.dockId] = {
        ...origin,
        current: wnd,
      }
      this.setState({ panels })
    }
  }
  hideWindow(wnd: WindowInstance) {
    const panels = this.state.panels
    if (!wnd) return null

    const origin = panels[wnd.dockId]
    if (origin && origin.current === wnd) {
      panels[wnd.dockId] = {
        ...origin,
        current: null,
      }
      this.setState({ panels })
    }
  }
  dettachWindow(wnd: WindowInstance) {
    const panels = this.state.panels
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
    }

    wnd.dockId = null
  }
  attachWindow(wnd: WindowInstance, dockId: DockID, foreground: boolean) {
    const panels = this.state.panels
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
        panel.items = [...panel.items, wnd]
      }
      panel.current = foreground ? (wnd || panel.current) : (panel.current || wnd)
      panels[dockId] = panel
    }

    wnd.dockId = dockId
    this.setState({ panels })
  }
  notifyPanelResize(panel: PanelProps, size: number) {
    const panels = this.state.panels
    panels[panel.id] = { ...panel, size }
    this.setState({ panels })
  }
  renderPanel(id: string) {
    const panel = this.state.panels[id]
    return React.createElement(PanelComponents[panel.type] || PanelComponents["#"], {
      id: id,
      frame: this,
      panel: panel,
      children: panel.child && this.renderPanel(panel.child),
    })
  }
  render() {
    return this.renderPanel("#")
  }
}
