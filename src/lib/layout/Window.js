/* eslint-disable no-use-before-define */
/* eslint-disable react/no-multi-comp */
/* eslint-disable react/prop-types */
/* eslint-disable react/no-string-refs */
/* eslint-disable react/sort-comp */
import React, { Component } from "react"
import ReactDOM from "react-dom"

import { isInheritedOf } from "../utils"

export type WindowOptions = {
  title: string,
  dockId: DockID,
  parameters: { [string]: any },
}

export class WindowClass {
  name: string
  overflow: string
  keepAlive: boolean
  component: Function<WindowComponent> // constructor of WindowComponent
  defaultTitle: string
  defaultDockId: DockID
  defaultParameters: Object

  windows: { [string]: WindowClass } = {}
  links: Array<ParameterLink>

  constructor(name: string, desc: Object, pluginClass: PluginClass) {
    desc && Object.keys(desc).forEach(key => this[key] = desc[key])
    this.name = name
    this.overflow = this.overflow || "auto"
    this.pluginClass = pluginClass
    console.assert(isInheritedOf(this.component, WindowComponent),
      "Window '", this.name, "' shall be based on WindowComponent")
  }
  addLink(link: Object) {
    if (!this.links) this.links = [link]
    else this.links.push(link)
  }
  createDefaultParameters(instance: WindowInstance): Object {
    const params = { ...this.defaultParameters }
    this.links && this.links.forEach(lk => {
      params[lk.param] = lk.pluginClass.instance[lk.path]
    })
    params.instance = instance
    params.onChange = instance.notifyChange
    return params
  }
}

export class WindowInstance {
  // Definition
  id: string
  windowClass: WindowClass
  parent: WindowInstance
  plugin: PluginComponent
  component: WindowComponent
  container: WindowContainer
  node: HtmlElement

  // Options
  dockId: DockID
  title: string
  icon: string
  parameters: { [string]: any }

  constructor(windowId: string, windowClass: WindowClass,
    parent: WindowInstance, plugin: WindowInstance, options: WindowOptions
  ) {
    this.id = windowId
    this.windowClass = windowClass
    this.parent = parent
    this.plugin = plugin
    this.component = windowClass.component
    this.node = document.createElement("div")
    this.node.className = "position-relative width-100 height-100 overflow-" + windowClass.overflow
    this.layout.windows[windowId] = this
    this.title = windowClass.defaultTitle
    this.icon = windowClass.defaultIcon
    this.dockId = windowClass.defaultDockId
    this.parameters = windowClass.createDefaultParameters(this)
    this.updateOptions(options)
  }
  updateOptions(options: WindowOptions) {
    if (options) {
      if (options.title) this.title = options.title
      if (options.icon) this.icon = options.icon
      if (options.dockId) this.dockId = options.dockId
      if (options.parameters) {
        this.parameters = {
          ...this.parameters,
          ...options.parameters,
        }
      }
    }
    this.render()
  }
  close() {
    ReactDOM.unmountComponentAtNode(this.node)
  }
  notifyFocus() {
  }
  notifyBlur() {
  }
  notifyChange = (parameters) => {
    this.updateOptions({ parameters })
  }
  render() {
    ReactDOM.render(React.createElement(this.component, this.parameters), this.node)
  }
}

export type PropsType = {
  current: WindowInstance,
  className: string,
  style: any,
}

export class WindowContainer extends Component<void, PropsType, StateType> {
  props: PropsType
  window: WindowInstance

  componentDidMount() {
    this.mountWindow(this.props.current)
  }
  componentWillReceiveProps(nextProps) {
    if (this.props.current !== nextProps.current) {
      this.unmountWindow()
      this.mountWindow(nextProps.current)
    }
  }
  componentWillUnmount() {
    this.unmountWindow()
  }
  mountWindow(window) {
    this.window = window
    if (window) {
      this.refs.root.appendChild(window.node)
      window.container = this
    }
  }
  unmountWindow() {
    if (this.window && this.window.container === this) {
      this.refs.root.removeChild(this.window.node)
      this.window.container = null
    }
  }
  width() {
    return this.refs.root && this.refs.root.clientWidth
  }
  height() {
    return this.refs.root && this.refs.root.clientHeight
  }
  handleFocus = () => {
    this.layout.focusOnWindow(this.window)
  }
  render() {
    const { className, style } = this.props
    return (<div
      ref="root"
      tabIndex={1}
      className={className}
      style={style}
      onFocus={this.handleFocus}
    />)
  }
}

export class WindowComponent<DefaultProps, Props, State>
  extends Component<DefaultProps, Props, State>
{
  instance: WindowInstance
  plugin: PluginComponent

  constructor(props) {
    super(props)
    this.instance = props.instance
    this.plugin = props.instance.plugin
  }
  isWindow() {
    return true
  }
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
    this.plugin.application.setEnv("console.debug", message)
  }
  openWindow(windowClassID: string, options: WindowOptions) {
    const { layout } = this.instance
    layout.openSubWindow(this.windowClass.windows[windowClassID], this, options)
  }
  closeWindow(windowClassID: string) {
    const { layout } = this.instance
    if (windowClassID) {
      layout.closeSubWindow(this.windowClass.windows[windowClassID], this)
    }
    else {
      layout.removeWindow(this.instance)
    }
  }
}
