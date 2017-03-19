import React, { Component } from 'react'
import { DropZone, DragZone } from '../ui-modules/DragAndDrop'
import { HtmlGrabReaction, stopEvent } from '../ui-modules/event.utils'
import * as Application from '../application'


type PanelProps = {
  id: DockID,
  current: WindowHandle,
  items: Array<WindowHandle>,
}

type PropsType = {
  panel: PanelProps,
  frame: Frame,
}

/********************************
*********************************
*** Panel Bar
*********************************
*********************************/

const CSS_panel_bar_horizontal = {
  bar: "WND_panel_bar WND_panel_bar_H",
  menu_btn: "WND_panel_menu_btn WND_center_vertical",
  item_button: "WND_panel_button WND_panel_button_H",
  item_button_CURRENT: "WND_panel_button WND_panel_button_H WND_panel_button-current",
  item_button_transform: 'rotate(0deg)'
}

const CSS_panel_bar_vertical = {
  bar: "WND_panel_bar WND_panel_bar_V",
  menu_btn: "WND_panel_menu_btn WND_center_horizontal",
  item_button: "WND_panel_button WND_panel_button_V",
  item_button_CURRENT: "WND_panel_button WND_panel_button_V WND_panel_button-current",
  item_button_transform: 'rotate(-90deg)'
}

class PanelButton extends Component {
  props: PropsType & { item: WindowHandle }
  handleClick = () => {
    const { item, panel, frame } = this.props
    if (item === panel.current) frame.hideWindow(item.id)
    else frame.showWindow(item.id)
  }
  handleDragWindow = () => {
    return {
      "window": {
        id: this.props.item.id
      }
    }
  }
  handleClose = (e) => {
    if (e.button === 1) {
      stopEvent(e)
      const item = this.props.item
      Application.removeWindow(item.id)
    }
  }
  render() {
    const item = this.props.item
    return (<DragZone onDragStart={this.handleDragWindow} onClick={this.handleClick} onMouseDown={this.handleClose}>{item.title}</DragZone>)
  }
}

class PanelBar extends Component {
  props: PropsType
  handleDropWindow = (data) => {
    if (data['window']) {
      Application.attachWindow(data.window.id, this.props.id, 0)
    }
  }
  renderBar(frame, panel, css) {

    // Item button render
    const renderButton = (item, i) => {
      return (<DropZone
        key={i}
        className={panel.current === item ? css.item_button_CURRENT : css.item_button}
        onDrop={this.handleDropWindow}>
        <div style={{ transform: css.item_button_transform }}>
          <PanelButton item={item} panel={panel} frame={frame} />
        </div>
      </DropZone>)
    }

    // Bar render
    return (<DropZone onDrop={this.handleDropWindow} className={css.bar}>
      <div className={css.menu_btn} />
      {panel.items.map((item, i) => renderButton(item, i))}
    </DropZone>)
  }
  render() {
    return this.renderBar(this.props.frame, this.props.panel, this.props.vertical ? CSS_panel_bar_vertical : CSS_panel_bar_horizontal)
  }
}

/********************************
*********************************
*** Panel Resizer
*********************************
*********************************/

const CSS_panel_resizer_vertical = "WND_panel_resizer WND_panel_resizer_V"
const CSS_panel_resizer_horizontal = "WND_panel_resizer WND_panel_resizer_H"

class PanelResizer extends Component {
  props: { onResize: Function }
  handleMouseDown = (e) => {
    new HtmlGrabReaction(e.target, e, this.handleMouseGrab)
  }
  handleMouseGrab = (e) => {
    this.props.onResize(this.props.transformDelta(e))
  }
  render() {
    return (<div className={this.props.vertical ? CSS_panel_resizer_vertical : CSS_panel_resizer_horizontal} onMouseDown={this.handleMouseDown} />)
  }
}

/********************************
*********************************
*** Panel Container
*********************************
*********************************/

const CSS_panel_container_side = "WND_panel_container WND_panel_container_side"
const CSS_panel_container_center = "WND_panel_container WND_panel_container_center"

class SidePanelContainer extends Component {
  props: { current: WindowInstance }
  render() {
    const current = this.props.current
    return (<div className={CSS_panel_container_side} style={{
      width: this.props.width,
      height: this.props.height,
    }}>
      {current && current.render()}
    </div>)
  }
}

class CenterPanelContainer extends Component {
  props: { current: WindowInstance }
  render() {
    const current = this.props.current
    return (<div className={CSS_panel_container_center}>
      {current && current.render()}
    </div>)
  }
}

/********************************
*********************************
*** Panels
*********************************
*********************************/

const CSS_side_panel_vertical = "WND_side_panel WND_side_panel_V"
const CSS_side_panel_horizontal = "WND_side_panel WND_side_panel_H"

class SidePanel extends Component {
  props: PropsType
  handleResize = (delta) => {
    const size = Math.max(this.props.panel.size + delta, 0)
    this.props.frame.notifyPanelResize(this.props.panel, size)
  }
}

export class SidePanelTop extends SidePanel {
  render() {
    const panel = this.props.panel
    const size = panel.current ? panel.size : 0
    return (<div className={CSS_side_panel_horizontal}>
      <PanelBar {...this.props} />
      <SidePanelContainer current={panel.current} height={size} width={'auto'} />
      <PanelResizer onResize={this.handleResize} transformDelta={(e) => e.deltaY} />
      <div style={{ flex: '1 1 auto', minHeight: '0px', height: '100%' }}>{this.props.children}</div>
    </div>)
  }
}

export class SidePanelBottom extends SidePanel {
  render() {
    const panel = this.props.panel
    const size = panel.current ? panel.size : 0
    return (<div className={CSS_side_panel_horizontal}>
      <div style={{ flex: '1 1 auto', minHeight: '0px', height: '100%' }}>{this.props.children}</div>
      <PanelResizer onResize={this.handleResize} transformDelta={(e) => -e.deltaY} />
      <PanelBar {...this.props} />
      <SidePanelContainer current={panel.current} height={size} width={'auto'} />
    </div>)
  }
}

export class SidePanelLeft extends SidePanel {
  render() {
    const panel = this.props.panel
    const size = panel.current ? panel.size : 0
    return (<div className={CSS_side_panel_vertical}>
      <PanelBar vertical={true} {...this.props} />
      <SidePanelContainer current={panel.current} width={size} height={'auto'} />
      <PanelResizer vertical={true} onResize={this.handleResize} transformDelta={(e) => e.deltaX} />
      <div style={{ flex: '1 1 auto', minWidth: '0px' }}>{this.props.children}</div>
    </div>)
  }
}


export class SidePanelRight extends SidePanel {
  render() {
    const panel = this.props.panel
    const size = panel.current ? panel.size : 0
    return (<div className={CSS_side_panel_vertical}>
      <div style={{ flex: '1 1 auto', minWidth: '0px' }}>{this.props.children}</div>
      <PanelResizer vertical={true} onResize={this.handleResize} transformDelta={(e) => -e.deltaX} />
      <SidePanelContainer current={panel.current} width={size} height={'auto'} />
      <PanelBar vertical={true} {...this.props} />
    </div>)
  }
}

export class CenterPanelTop extends SidePanelTop {
  render() {
    const panel = this.props.panel
    return (<div className={CSS_side_panel_horizontal}>
      <PanelBar {...this.props} />
      <CenterPanelContainer current={panel.current} />
    </div>)
  }
}
