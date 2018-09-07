import React, { Component } from "react"
import ReactDOM from "react-dom"

let popupRoot = null

type PropsType = {
  render?: Function,
  className?: string,
  style?: any,
  children?: any,
  onClick:?Function,
}

export class ButtonPopup extends Component<void, PropsType, void> {
  props: PropsType

  handleClick = () => {
    openPopup(this.props.render, this)
    this.props.onClick && this.props.onClick()
  }
  render() {
    const { className, style, children } = this.props
    return (<div className={ className } style={ style } onClick={ this.handleClick }>{children}</div>)
  }
}

export function openPopup(render: Function, marker: Component) {
  if (!popupRoot) {
    const htmlRoot = document.createElement("div")
    htmlRoot.style.position = "absolute"
    htmlRoot.style.left = "0px"
    htmlRoot.style.top = "0px"
    document.body.appendChild(htmlRoot)
    popupRoot = ReactDOM.render((<FramePopupDock />), htmlRoot)
  }
  popupRoot.updatePopup(render, marker)
}

type DockStateType = {
  render: Function,
  marker: Component,
  position: any,
  onClose?: Function,
}

class FramePopupDock extends Component<void, void, DockStateType> {
  state: DockStateType = {}

  componentDidUpdate() {
    const popup = this.refs.popup
    if (popup) {
      const position = this.state.position
      const popupHeight = popup.clientHeight
      const popupWidth = popup.clientWidth
      if (position.left + popupWidth > window.screen.width) {
        popup.style.left = position.right - popupWidth + "px"
      }
      else {
        popup.style.left = position.left + "px"
      }
      if (position.bottom + popupHeight > window.screen.height) {
        popup.style.top = position.top - popupHeight + "px"
      }
      else {
        popup.style.top = position.bottom + "px"
      }
    }
  }
  isOpen() {
    return this.state.render != null
  }
  handleMouseDown = () => {
    this.updatePopup()
  }
  updatePopup(render: Function, marker: Component, onClose?: Function) {
    if (this.state.render) {
      this.state.onClose && this.state.onClose()
      window.removeEventListener("mousedown", this.handleMouseDown)
    }
    if (render && marker) {
      const elemnt: HTMLElement = ReactDOM.findDOMNode(marker)
      const rect = elemnt.getBoundingClientRect()
      const position = {
        left: rect.left,
        top: rect.top,
        right: rect.left + elemnt.clientWidth,
        bottom: rect.top + elemnt.clientHeight,
      }
      window.addEventListener("mousedown", this.handleMouseDown)
      this.setState({ render, marker, position, onClose })
    }
    else {
      this.setState({ render: null, marker: null, position: null, onClose: null })
    }
  }
  render = () => {
    if (this.state.render) {
      const { render, position } = this.state
      const style = {
        position: "absolute",
        left: position.left,
        top: position.bottom,
        zIndex: 100000,
        backgroundColor: "white",
        boxShadow: "0 5px 15px rgba(0,0,0,.5)",
        border: "1px solid rgba(0,0,0,.2)",
        borderRadius: 2,
        padding: 2,
      }
      return (<div style={ style }>
        {render(this.handleMouseDown)}
      </div>)
    }
    return null
  }
}
