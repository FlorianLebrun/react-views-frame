/* eslint-disable react/no-multi-comp */
/* eslint-disable react/no-string-refs */
import React, { Component } from "react"
import { DropZone, DragDropZone } from "../../ui-modules/DragAndDrop"
import { HtmlGrabReaction, stopEvent } from "../../ui-modules/event.utils"
import { Application } from "../../application"
import { WindowInstance } from "../../layout"
import { openFrameMenu } from "./FrameMenu"
import { Frame } from "./Frame"

export type PanelProps = {
  id: string,
  type: string,
  size: number,
  current: WindowInstance,
  items: Array<WindowInstance>,
  menu: boolean,
  child: string,
}

/** ******************************
*********************************
*** Panel Bar
*********************************
*********************************/

const CSS_panel_bar_horizontal = {
  bar: "WND_panel_bar WND_panel_bar_H",
  menu_btn: "WND_panel_menu_btn WND_panel_menu_btn_H WND_center_vertical",
  item_button: "WND_panel_button WND_panel_button_H",
  item_button_CURRENT: "WND_panel_button WND_panel_button_H current",
  item_button_FOCUSED: "WND_panel_button WND_panel_button_H current focused",
  item_button_transform: "rotate(0deg)",
}

const CSS_panel_bar_vertical = {
  bar: "WND_panel_bar WND_panel_bar_V",
  menu_btn: "WND_panel_menu_btn WND_panel_menu_btn_V WND_center_horizontal",
  item_button: "WND_panel_button WND_panel_button_V",
  item_button_CURRENT: "WND_panel_button WND_panel_button_V current",
  item_button_FOCUSED: "WND_panel_button WND_panel_button_V current focused",
  item_button_transform: "rotate(-90deg)",
}
const CSS_panel_button_animation = {
  "danger": " WND_panel_button_danger",
  "warning": " WND_panel_button_warning",
}

type PanelButtonPropsType = {
  panel: PanelProps,
  frame: Frame,
  item: WindowInstance,
  css: any,
}

class PanelButton extends Component {
  props: PanelButtonPropsType
  componentWillMount() {
    this.props.item.addEventListener("update", this.handleEvent)
  }
  componentWillUnmount() {
    this.props.item.removeEventListener(this.handleEvent)
  }
  handleEvent = () => {
    this.forceUpdate()
  }
  handleClick = () => {
    const { item, panel, frame } = this.props
    if (item === panel.current) {
      frame.hideWindow(item)
    }
    else {
      if (item.animation) item.updateTitle()
      frame.showWindow(item)
    }
  }
  handleDragWindow = () => {
    return {
      "window": { id: this.props.item.id }
    }
  }
  handleDragMatch = (types) => {
    if (types.find(x => x === "window")) {
      return true
    }
    const { item, panel } = this.props
    if (panel.current !== item) this.handleClick()
    return false
  }
  handleClose = (e) => {
    if (e.button === 1) {
      stopEvent(e)
      const item = this.props.item
      Application.layout.removeWindow(item)
    }
  }
  render() {
    const { item, panel, css } = this.props
    let className = (panel.current !== item)
      ? css.item_button
      : (item.hasFocus
        ? css.item_button_FOCUSED
        : css.item_button_CURRENT)
    if (item.animation) {
      className += CSS_panel_button_animation[item.animation.mode] || ""
    }
    return (
      <DragDropZone
        className={className}
        title={item.title}
        onDragStart={this.handleDragWindow}
        onDropMatch={this.handleDragMatch}
        onClick={this.handleClick}
        onMouseDown={this.handleClose}
      >
        {item.window &&
          <div style={{ transform: css.item_button_transform }}>
            {item.window.renderWindowTitle()}
          </div>
        }
      </DragDropZone>)
  }
}

type PanelBarPropsType = {
  panel: PanelProps,
  frame: Frame,
  vertical?: boolean,
}

class PanelBar extends Component {
  props: PanelBarPropsType
  shouldComponentUpdate(nextProps) {
    const curProps = this.props
    return curProps.panel !== nextProps.panel
      || curProps.vertical !== nextProps.vertical
  }
  handleDropWindow = (data) => {
    if (data["window"]) {
      const wnd = Application.layout.getWindowInstance(data.window.id)
      wnd && Application.layout.dockWindow(wnd, this.props.panel.id, true)
    }
  }
  render() {
    const { panel, frame, vertical } = this.props
    const css = vertical ? CSS_panel_bar_vertical : CSS_panel_bar_horizontal

    // Bar render
    return (<DropZone onDrop={this.handleDropWindow} className={css.bar}>
      {panel.menu &&
        <div className={css.menu_btn + " fa fa-caret-down"} onClick={openFrameMenu} />
      }
      {panel.items.map((item, i) => {
        return (<PanelButton key={i} css={css} item={item} panel={panel} frame={frame} />)
      })}
    </DropZone>)
  }
}

/** ******************************
*********************************
*** Panel Resizer
*********************************
*********************************/

const CSS_panel_resizer_vertical = "WND_panel_resizer WND_panel_resizer_V"
const CSS_panel_resizer_horizontal = "WND_panel_resizer WND_panel_resizer_H"

export type PanelResizerPropsType = {
  transformDelta: Function,
  onResize: Function,
  vertical?: boolean,
}

export class PanelResizer extends Component {
  props: PanelResizerPropsType
  handleMouseDown = (e) => {
    new HtmlGrabReaction(e.target, e, this.handleMouseGrab)
  }
  handleMouseGrab = (e) => {
    this.props.onResize(this.props.transformDelta(e))
  }
  render() {
    return (<div
      className={this.props.vertical ? CSS_panel_resizer_vertical : CSS_panel_resizer_horizontal}
      onMouseDown={this.handleMouseDown}
    />)
  }
}

/** ******************************
*********************************
*** Panel Container
*********************************
*********************************/

type SidePanelContainerPropsType = {
  current: WindowInstance,
  size: number,
  vertical?: boolean,
}

class SidePanelContainer extends Component {
  props: SidePanelContainerPropsType
  componentWillMount() {
  }
  shouldComponentUpdate(nextProps) {
    const curProps = this.props
    return curProps.current !== nextProps.current
      || curProps.vertical !== nextProps.vertical
      || curProps.size !== nextProps.size
  }
  getSize() {
    const container: any = this.refs.container
    if (container) {
      return this.props.vertical ? container.width() : container.height()
    }
  }
  render() {
    const { current, vertical, size } = this.props
    const style = {
      ...current && current.style,
      width: vertical ? (size + "%") : "auto",
      height: vertical ? "auto" : (size + "%"),
    }

    if (current) {
      return (<Application.WindowContainer
        ref="container"
        className="WND_panel_container_side WND_panel_container"
        style={style}
        current={current}
      />)
    }
    else {
      return null
    }
  }
}

type CenterPanelContainerPropsType = {
  current: WindowInstance,
}

class CenterPanelContainer extends Component {
  props: CenterPanelContainerPropsType
  componentWillMount() {
  }
  shouldComponentUpdate(nextProps) {
    const curProps = this.props
    return curProps.current !== nextProps.current
  }
  render() {
    const current = this.props.current
    if (current) {
      return (<Application.WindowContainer
        current={current}
        className="WND_panel_container_center WND_panel_container"
      />)
    }
    else {
      const SplashComponent = Application.layout.splashComponent
      return (<div className="WND_panel_container_center WND_panel_container_splash">
        {SplashComponent && <SplashComponent />}
      </div>)
    }
  }
}

/** ******************************
*********************************
*** Panels
*********************************
*********************************/

const CSS_side_panel_vertical = "WND_side_panel WND_side_panel_V"
const CSS_side_panel_horizontal = "WND_side_panel WND_side_panel_H"

type PropsType = {
  panel: PanelProps,
  frame: Frame,
  children: any,
}

class SidePanel extends Component {
  props: PropsType
  shouldComponentUpdate(nextProps) {
    const curProps = this.props
    return curProps.panel !== nextProps.panel
      || curProps.frame !== nextProps.frame
      || curProps.children !== nextProps.children
  }
  handleResize = (delta) => {
    const container: any = this.refs.container
    const csize = container.getSize()
    if (csize !== undefined) {
      let size = this.props.panel.size
      size += Math.max(size, 1) * delta / Math.max(csize, 1)
      size = Math.min(Math.max(size, 0), 100)
      this.props.frame.notifyPanelResize(this.props.panel, size)
    }
  }
}

export class SidePanelTop extends SidePanel {
  transformDelta(e) {
    return e.deltaY
  }
  render() {
    const { panel, frame } = this.props
    const size = panel.current ? panel.size : 0
    return (<div className={CSS_side_panel_horizontal}>
      <PanelBar panel={panel} frame={frame} />
      <SidePanelContainer ref={"container"} current={panel.current} size={size} />
      <PanelResizer onResize={this.handleResize} transformDelta={this.transformDelta} />
      <div className="WND_panel_container_center">{this.props.children}</div>
    </div>)
  }
}

export class SidePanelBottom extends SidePanel {
  transformDelta(e) {
    return -e.deltaY
  }
  render() {
    const { panel, frame } = this.props
    const size = panel.current ? panel.size : 0
    return (<div className={CSS_side_panel_horizontal}>
      <div className="WND_panel_container_center">{this.props.children}</div>
      <PanelResizer onResize={this.handleResize} transformDelta={this.transformDelta} />
      <PanelBar panel={panel} frame={frame} />
      <SidePanelContainer ref={"container"} current={panel.current} size={size} />
    </div>)
  }
}

export class SidePanelLeft extends SidePanel {
  transformDelta(e) {
    return e.deltaX
  }
  render() {
    const { panel, frame } = this.props
    const size = panel.current ? panel.size : 0
    return (<div className={CSS_side_panel_vertical}>
      <PanelBar vertical panel={panel} frame={frame} />
      <SidePanelContainer ref={"container"} vertical current={panel.current} size={size} />
      <PanelResizer vertical onResize={this.handleResize} transformDelta={this.transformDelta} />
      <div className="WND_panel_container_center">{this.props.children}</div>
    </div>)
  }
}

export class SidePanelRight extends SidePanel {
  transformDelta(e) {
    return -e.deltaX
  }
  render() {
    const { panel, frame } = this.props
    const size = panel.current ? panel.size : 0
    return (<div className={CSS_side_panel_vertical}>
      <div className="WND_panel_container_center">{this.props.children}</div>
      <PanelResizer vertical onResize={this.handleResize} transformDelta={this.transformDelta} />
      <SidePanelContainer ref={"container"} vertical current={panel.current} size={size} />
      <PanelBar vertical panel={panel} frame={frame} />
    </div>)
  }
}

export class CenterPanelTop extends SidePanelTop {
  render() {
    const { panel, frame } = this.props
    return (<div className={CSS_side_panel_horizontal}>
      <PanelBar panel={panel} frame={frame} />
      <CenterPanelContainer ref={"container"} current={panel.current} />
    </div>)
  }
}

export function RootPanel(props) {
  return (<div className="WND_root_panel"> {props.children} </div>)
}

export default {
  "#": RootPanel,
  "side-left": SidePanelLeft,
  "side-top": SidePanelTop,
  "side-right": SidePanelRight,
  "side-bottom": SidePanelBottom,
  "center-top": CenterPanelTop,
}
