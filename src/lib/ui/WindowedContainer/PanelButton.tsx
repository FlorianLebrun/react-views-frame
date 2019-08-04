import React, { Component } from "react"
import { DragDropZone } from "../DragAndDrop"
import { stopEvent } from "../event.utils"
import { Application } from "../../application"
import { WindowInstance } from "../../layout"
import WindowedContainer from "../WindowedContainer"

export type PanelProps = {
  id: string,
  type: string,
  size: number,
  current: WindowInstance,
  items: WindowInstance[],
  menu: boolean,
  child: string,
}

const CSS_panel_button_animation = {
  "danger": " WND_panel_button_danger",
  "warning": " WND_panel_button_warning",
}

type PropsType = {
  panel: PanelProps,
  frame: WindowedContainer,
  item: WindowInstance,
  css: any,
}

export default class PanelButton extends Component {
  props: PropsType
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
