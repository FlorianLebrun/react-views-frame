/* eslint-disable no-use-before-define */
/* eslint-disable react/no-multi-comp */
/* eslint-disable react/prop-types */
import React, { Component } from "react"
import ReactDOM from "react-dom"
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
  create(windowId: WindowID, parent: WindowInstance,
    plugin: WindowInstance, options: WindowOptionsType
  ) {
    const node = document.createElement("div")
    const wnd = ReactDOM.render((<WindowInstance
      windowId={windowId} windowClass={this}
      node={node} parent={parent} plugin={plugin} options={options}
    />), node)

    wnd.id = windowId
    wnd.windowClass = this
    wnd.parent = parent
    wnd.plugin = plugin
    wnd.component = this.component
    wnd.keepAlive = this.keepAlive
    wnd.kernel.windows[windowId] = wnd

    wnd.title = options.title || this.defaultTitle
    wnd.icon = options.icon || this.defaultIcon
    wnd.parameters = this.defaultParameters || options.parameters || {}
    wnd.kernel.dockWindow(wnd, options.dockId || this.defaultDockId)
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


export class WindowInstance extends Component {
  // Definition
  id: WindowID
  windowClass: WindowClass
  parent: WindowInstance
  plugin: PluginInstance
  component: WindowInstance
  container: WindowContainer
  keepAlive: boolean
  node: HTMLElement

  // Options
  dockId: DockID
  title: string
  icon: string
  parameters: { [string]: any }

  log(severity) {
    const message = {
      severity: severity,
      from: this.props && this.props.window && this.props.window.title,
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
    this.container && this.container.updateWindow()
  }
  render() {
    const windowClass = this.props.windowClass
    return (<windowClass.component />)
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
  window: WindowInstance,
  props: Object,
}

export class WindowContainer extends Component {
  props: PropsType
  state: StateType = {}

  componentDidMount() {
    this.mountWindow(this.props.current)
  }
  componentWillReceiveProps(nextProps) {
    if (this.props.current !== nextProps.current) {
      this.unmountWindow()
      this.mountWindow(nextProps.current)
    }
  }
  shouldComponentUpdate(nextProps, nextState) {
    return this.state.window !== nextState.window ||
      this.state.props !== nextState.props
  }
  componentWillUnmount() {
    this.unmountWindow()
  }

  updateWindow() {
    const { window, props } = this.state
    if (window && window.props !== props) {
      this.setState({ window: window, props: window.props })
    }
  }
  mountWindow(window) {
    if (window) {
      this.refs.host.appendChild(window.props.node)
      window.container = this
      this.setState({ window: window, props: window.props })
    }
    else {
      this.setState({ window: null, props: null })
    }
  }
  unmountWindow() {
    const { window } = this.state
    if (window && window.container === this) {
      this.refs.host.removeChild(window.props.node)
      window.container = null
    }
  }
  render() {
    const { window } = this.state
    return (<div ref="host" />)
  }
}
