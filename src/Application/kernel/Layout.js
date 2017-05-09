/* eslint-disable no-use-before-define */
/* eslint-disable react/no-multi-comp */
/* eslint-disable react/prop-types */
import React, { Component } from "react"
import { Application } from "../application"

export type WindowID = string
export type WindowClassID = string

export type WindowOptionsType = {
  title: string,
  dockId: DockID,
  parameters: { [string]: any },
}

export class WindowClass {
  name: string
  component: Function<WindowInstance>
  defaultTitle: string
  defaultDockId: DockID
  windows: { [WindowClassID]: WindowClass } = {}
  constructor(name: string, desc: Object) {
    this.name = name
    desc && Object.keys(desc).forEach(key => this[key] = desc[key])
    console.assert(Application.isInheritedOf(this.component, WindowInstance),
      "Window '", this.name, "' shall be based on WindowInstance")
  }
}

export class PluginClass {
  name: string
  component: Function<PluginInstance>
  windows: { [WindowClassID]: WindowClass } = {}
  constructor(desc: Object) {
    desc && Object.keys(desc).forEach(key => this[key] = desc[key])
    this.component = this.component || PluginInstance
    this.windows = {}
    Object.keys(desc.windows).forEach(name => {
      this.windows[name] = new WindowClass(name, desc.windows[name])
    })

  }
  create(): PluginInstance {
    return new this.component(this)
  }
}


export class WindowInstance {
  // Definition
  id: WindowID
  windowClass: WindowClass
  parent: WindowInstance
  plugin: PluginInstance
  component: WindowInstance
  container: WindowContainer
  keepAlive: boolean

  // Options
  dockId: DockID
  title: string
  icon: string
  parameters: { [string]: any }

  constructor(windowId: WindowID, windowClass: WindowClass,
    parent: WindowInstance, plugin: WindowInstance, options: WindowOptionsType
  ) {
    this.id = windowId
    this.windowClass = windowClass
    this.parent = parent
    this.plugin = plugin
    this.component = windowClass.component
    this.keepAlive = windowClass.keepAlive
    this.kernel.windows[windowId] = this

    this.title = options.title || windowClass.defaultTitle
    this.icon = options.icon || windowClass.defaultIcon
    this.parameters = windowClass.defaultParameters || options.parameters || {}
    this.kernel.dockWindow(this, options.dockId || windowClass.defaultDockId)
  }
  log(severity) {
    const message = {
      severity: severity,
      from: this.props && this.props.handle && this.props.handle.title,
      content: arguments[1],
    }
    if (arguments.length > 1) {
      message.content = Array.prototype.slice.call(arguments, 1)
    }
    if (severity === "error") console.error(...message.content)
    else console.log(...message.content)
    Application.setEnv("WSCore.debug", message)
  }
  updateOptions(options: WindowOptionsType) {
    this.title = options.title || this.title
    this.icon = options.icon || this.icon
    this.dockId = options.dockId || this.dockId
  }
  windowOverflow(): string {
    return "auto"
  }
  openWindow(windowClassID: WindowClassID, options: WindowOptionsType) {
    this.kernel.openSubWindow(this.windowClass.windows[windowClassID], this, options)
  }
  showWindow(windowID: WindowID, options: WindowOptionsType): WindowID {
    this.kernel.showSubWindow(this.windows[windowID], this, options)
  }
  close() {
    // TODO
  }
  handleChange = (parameters) => {
    this.parameters = { ...this.parameters, ...parameters }
    this.container && this.container.updateHandle()
  }
  render() {
    return null
  }
}

export class PluginInstance {
  pluginClass: PluginClass

  // Life Cycle management functions
  pluginWillMount() { }
  pluginDidMount() { }
  pluginWillUnmount() { }

  constructor(pluginClass: PluginClass) {
    this.pluginClass = pluginClass
  }
  openWindow(windowName: string, options: Object) {
    this.kernel.openPluginWindow(this.pluginClass.windows[windowName], this, options)
  }
  closeAllWindow() {
    console.log("closeAllWindow NOT IMPLEMENTED")
  }
}

export type PropsType = {
  current: WindowInstance,
}

export type StateType = {
  handle: WindowInstance,
  props: Object,
}

export class WindowContainer extends Component {
  props: PropsType
  state: StateType

  componentWillMount() {
    this.mountHandle(this.props.current)
  }
  componentWillReceiveProps(nextProps) {
    if (this.props.current !== nextProps.current) {
      this.unmountHandle()
      this.mountHandle(nextProps.current)
    }
  }
  shouldComponentUpdate(nextProps, nextState) {
    return this.state.handle !== nextState.handle ||
      this.state.props !== nextState.props
  }
  componentWillUnmount() {
    this.unmountHandle()
  }

  updateHandle() {
    const { handle, props } = this.state
    if (handle && handle.props !== props) {
      this.setState({ handle: handle, props: handle.props })
    }
  }
  mountHandle(handle) {
    if (handle) {
      handle.container = this
      this.setState({ handle: handle, props: handle.props })
    }
    else {
      this.setState({ handle: null, props: null })
    }
  }
  unmountHandle() {
    const { handle } = this.state
    if (handle && handle.container === this) {
      handle.container = null
    }
  }
  render() {
    const { handle } = this.state
    return handle ? handle.render() : null
  }
}
