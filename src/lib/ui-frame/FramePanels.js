/* eslint-disable react/no-multi-comp */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable import/no-namespace */
import React, { Component } from "react"

import { DropZone, DragZone } from "../ui-modules/DragAndDrop"
import { HtmlGrabReaction, stopEvent } from "../ui-modules/event.utils"

import * as UIFrame from "."

export type PanelProps = {
  id: DockID,
  size: number,
  current: WindowHandle,
  items: Array<WindowHandle>,
}

/** ******************************
*********************************
*** Panel Bar
*********************************
*********************************/

const CSS_panel_bar_horizontal = {
  bar: "WND_panel_bar WND_panel_bar_H",
  menu_btn: "WND_panel_menu_btn WND_center_vertical",
  item_button: "WND_panel_button WND_panel_button_H",
  item_button_CURRENT: "WND_panel_button WND_panel_button_H WND_panel_button-current",
  item_button_transform: "rotate(0deg)",
}

const CSS_panel_bar_vertical = {
  bar: "WND_panel_bar WND_panel_bar_V",
  menu_btn: "WND_panel_menu_btn WND_center_horizontal",
  item_button: "WND_panel_button WND_panel_button_V",
  item_button_CURRENT: "WND_panel_button WND_panel_button_V WND_panel_button-current",
  item_button_transform: "rotate(-90deg)",
}

type PanelButtonPropsType = {
  panel: PanelProps,
  frame: Frame,
  item: WindowHandle,
  css: any,
}

class PanelButton extends Component {
  props: PanelButtonPropsType
  handleClick = () => {
    const { item, panel, frame } = this.props
    if (item === panel.current) frame.hideWindow(item.id)
    else frame.showWindow(item.id)
  }
  handleDragWindow = () => {
    return {
      "window": {
        id: this.props.item.id,
      },
    }
  }
  handleDragOver = (e) => {
    const { item, panel } = this.props
    if (e.dataTransfer && e.dataTransfer.types.find(x => x === "window")) {
      return true
    }
    else {
      if (panel.current !== item) {
        this.handleClick()
      }
      return false
    }
  }
  handleClose = (e) => {
    if (e.button === 1) {
      stopEvent(e)
      const item = this.props.item
      UIFrame.removeWindow(item.id)
    }
  }
  render() {
    const { item, panel, css } = this.props
    return (
      <DragZone
        className={ panel.current === item ? css.item_button_CURRENT : css.item_button }
        onDragStart={ this.handleDragWindow }
        onDragOver={ this.handleDragOver }
        onClick={ this.handleClick }
        onMouseDown={ this.handleClose }
      >
        <div style={{ transform: css.item_button_transform }}>
          {item.title}
        </div>
      </DragZone>)
  }
}

type PanelBarPropsType = {
  panel: PanelProps,
  frame: Frame,
  vertical: boolean,
}

class PanelBar extends Component {
  props: PanelBarPropsType
  shouldComponentUpdate(nextProps) {
    const curProps = this.props
    if (curProps.panel !== nextProps.panel) {
      if (curProps.panel.items !== nextProps.panel.items
        || curProps.panel.current !== nextProps.panel.current)
        return true
    }
    return curProps.frame !== nextProps.frame
      || curProps.vertical !== nextProps.vertical
  }
  handleDropWindow = (data) => {
    if (data["window"]) {
      UIFrame.attachWindow(data.window.id, this.props.panel.id, 0)
    }
  }
  render() {
    const { panel, frame, vertical } = this.props
    const css = vertical ? CSS_panel_bar_vertical : CSS_panel_bar_horizontal

    // Bar render
    return (<DropZone onDrop={ this.handleDropWindow } className={ css.bar }>
      <div className={ css.menu_btn } />
      {panel.items.map((item, i) => {
        return (<PanelButton key={ i } css={ css } item={ item } panel={ panel } frame={ frame } />)
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

type PanelResizerPropsType = {
  vertical: boolean,
  transformDelta: Function,
  onResize: Function,
}

class PanelResizer extends Component {
  props: PanelResizerPropsType
  handleMouseDown = (e) => {
    new HtmlGrabReaction(e.target, e, this.handleMouseGrab)
  }
  handleMouseGrab = (e) => {
    this.props.onResize(this.props.transformDelta(e))
  }
  render() {
    return (<div
      className={ this.props.vertical ? CSS_panel_resizer_vertical : CSS_panel_resizer_horizontal }
      onMouseDown={ this.handleMouseDown }
            />)
  }
}

/** ******************************
*********************************
*** Panel Container
*********************************
*********************************/

const CSS_panel_container_side = "WND_panel_container WND_panel_container_side"
const CSS_panel_container_center = "WND_panel_container WND_panel_container_center"

type WindowContainerPropsType = {
  current: WindowInstance,
}

class WindowContainer extends Component {
  props: WindowContainerPropsType
  shouldComponentUpdate(nextProps) {
    return this.props.current !== nextProps.current
  }
  render() {
    const current = this.props.current
    return current ? current.render() : null
  }
}

type SidePanelContainerPropsType = {
  current: WindowInstance,
  vertical: boolean,
  size: number,
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
  render() {
    const { current, vertical, size } = this.props
    return (<div
      className={ CSS_panel_container_side }
      style={{
        width: vertical ? size : "auto",
        height: vertical ? "auto" : size,
      }}
            >
      <WindowContainer current={ current } />
    </div>)
  }
}

type CenterPanelContainerPropsType = {
  current: WindowInstance,
}

class CenterPanelContainer extends Component {
  props: CenterPanelContainerPropsType
  componentWillMount() {
  }
  render() {
    return (<div className={ CSS_panel_container_center }>
      <WindowContainer current={ this.props.current } />
    </div>)
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
    const size = Math.max(this.props.panel.size + delta, 0)
    this.props.frame.notifyPanelResize(this.props.panel, size)
  }
}

export class SidePanelTop extends SidePanel {
  transformDelta(e) {
    return e.deltaY
  }
  render() {
    const { panel, frame } = this.props
    const size = panel.current ? panel.size : 0
    return (<div className={ CSS_side_panel_horizontal }>
      <PanelBar panel={ panel } frame={ frame } />
      <SidePanelContainer current={ panel.current } size={ size } />
      <PanelResizer onResize={ this.handleResize } transformDelta={ this.transformDelta } />
      <div style={{ flex: "1 1 auto", minHeight: "0px", height: "100%" }}>{this.props.children}</div>
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
    return (<div className={ CSS_side_panel_horizontal }>
      <div style={{ flex: "1 1 auto", minHeight: "0px", height: "100%" }}>{this.props.children}</div>
      <PanelResizer onResize={ this.handleResize } transformDelta={ this.transformDelta } />
      <PanelBar panel={ panel } frame={ frame } />
      <SidePanelContainer current={ panel.current } size={ size } />
    </div>)
  }
}

export class SidePanelLeft extends SidePanel {
  transformDelta(e) {
    return e.deltaX
  } render() {
    const { panel, frame } = this.props
    const size = panel.current ? panel.size : 0
    return (<div className={ CSS_side_panel_vertical }>
      <PanelBar vertical panel={ panel } frame={ frame } />
      <SidePanelContainer vertical current={ panel.current } size={ size } />
      <PanelResizer vertical onResize={ this.handleResize } transformDelta={ this.transformDelta } />
      <div style={{ flex: "1 1 auto", minWidth: "0px" }}>{this.props.children}</div>
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
    return (<div className={ CSS_side_panel_vertical }>
      <div style={{ flex: "1 1 auto", minWidth: "0px" }}>{this.props.children}</div>
      <PanelResizer vertical onResize={ this.handleResize } transformDelta={ this.transformDelta } />
      <SidePanelContainer vertical current={ panel.current } size={ size } />
      <PanelBar vertical panel={ panel } frame={ frame } />
    </div>)
  }
}

export class CenterPanelTop extends SidePanelTop {
  render() {
    const { panel, frame } = this.props
    return (<div className={ CSS_side_panel_horizontal }>
      <PanelBar panel={ panel } frame={ frame } />
      <CenterPanelContainer current={ panel.current } />
    </div>)
  }
}
