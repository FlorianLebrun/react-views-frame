/* eslint-disable no-use-before-define */
/* eslint-disable react/no-multi-comp */
import React, { Component } from "react"

import Application from "../application"
import { isInheritedOf } from "../core/utils"

export type WindowID = string

export type WindowDesc = {
  title: string,
  component: WindowComponent,
  props: any,
  needStorage: boolean,
  keepAlive: boolean,
}

export class WindowComponent extends Component {
  isWindow() {
    return true
  }
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
    // this.storage = desc.needStorage ? createStorage(this.id) : null
    this.keepAlive = desc.keepAlive
    console.assert(isInheritedOf(desc.component, WindowComponent),
      "Window '", desc.title, "' shall be based on WindowComponent")
  }
  update(desc: WindowDesc) {
    this.title = desc.title
    this.component = desc.component
    this.props = desc.props
    // this.storage = desc.needStorage ? createStorage(this.id) : null
    this.keepAlive = desc.keepAlive
    console.assert(isInheritedOf(desc.component, WindowComponent),
      "Window '", desc.title, "' shall be based on WindowComponent")
  }
  close() {
  }
  handleChange = (props) => {
    this.props = { ...this.props, ...props }
  }
  render() {
    return (<this.component { ...this.props } storage={ this.storage } onChange={ this.handleChange } />)
  }
}

Application.injectAsProperty(WindowComponent)
