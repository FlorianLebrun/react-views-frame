/* eslint-disable */
import React, { Component } from "react"
import ReactDOM from "react-dom"
import Listenable from "../modules/listenable"
import { Application } from "../application"
import { isInheritedOf } from "../utils"
import { PluginClass, PluginInstance } from "./Plugin"
import { PluginContext } from "./Context"

export type WindowOptions = {
  title?: string,
  icon?: Function,
  dockId?: string,
  parameters?: { [key: string]: any },
  openNew?: boolean,
}

export type ParameterLink = {
  [key: string]: string, // key -> path
}

export class WindowClass {
  name: string
  overflow: string
  keepAlive: boolean
  pluginClass: PluginClass
  component: typeof WindowComponent // constructor of WindowComponent
  parameters: { [key: string]: any }
  defaultTitle: string
  defaultDockId: string
  defaultParameters: Object
  defaultIcon: Function

  windows: { [key: string]: WindowClass }
  links: { [key: string]: ParameterLink }

  constructor(name: string, desc: any, pluginClass: PluginClass) {
    for (const key in desc) this[key] = desc[key]
    this.name = name
    this.overflow = desc.overflow || "auto"
    this.pluginClass = pluginClass
    console.assert(isInheritedOf(this.component, WindowComponent),
      "Window '", this.name, "' shall be based on WindowComponent")
  }
  addLink(pluginName: string, key: string, path: string) {
    if (!this.links) this.links = {}
    if (!this.links[pluginName]) this.links[pluginName] = {}
    this.links[pluginName][key] = path
  }
  updateParametersFor(instance, pluginName, bind: boolean = false) {
    const { plugins } = Application.layout
    const plugInstance = plugins[pluginName]
    if (plugInstance) {
      const plugLinks = this.links[pluginName]
      bind && plugInstance.addEventListener(Object.keys(plugLinks), instance.updateParams)
      for (const key in plugLinks) {
        const path = plugLinks[key]
        instance.parameters[key] = plugInstance[path]
      }
    }
  }
  connectParameters(instance: WindowInstance) {
    if (this.links) {
      for (const pluginName in this.links) {
        this.updateParametersFor(instance, pluginName, true)
      }
    }
  }
  disconnectParameters(instance: WindowInstance) {
    if (this.links) {
      const { plugins } = Application.layout
      for (const pluginName in this.links) {
        const plugInstance = plugins[pluginName]
        plugInstance && plugInstance.removeEventListener(instance.updateParams)
      }
    }
  }
}

export class WindowInstance extends Listenable {

  // Definition
  id: string
  windowClass: WindowClass
  window: WindowComponent

  // Hierarchy
  parent: WindowInstance
  plugin: PluginInstance
  container: WindowContainer
  node: HTMLElement

  // Options
  dockId: string
  title: string
  icon: Function
  parameters: { [key: string]: any }
  animation: any

  constructor(windowId: string, windowClass: WindowClass,
    parent: WindowInstance, plugin: PluginInstance, options: WindowOptions
  ) {
    super()
    this.id = windowId
    this.windowClass = windowClass
    this.parent = parent
    this.plugin = plugin
    this.node = document.createElement("div")
    this.node.className = "position-relative width-100 height-100 overflow-" + windowClass.overflow
    Application.layout.windows[windowId] = this
    this.title = windowClass.defaultTitle
    this.icon = windowClass.defaultIcon
    this.dockId = windowClass.defaultDockId
    this.parameters = {
      ...this.defaultParameters,
      instance: this,
      onChange: (parameters) => this.updateOptions({ parameters }),
    }
    this.windowClass.connectParameters(this)
    this.updateOptions(options)
  }
  get hasFocus() {
    return Application.layout.focused === this
  }
  setWindow(window: WindowComponent) {
    this.window = window
    this.executeEvent("update")
  }
  updateParams = (plugin, prevState) => {
    this.windowClass.updateParametersFor(this, plugin[".class"].name)
    this.render()
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
  updateTitle(animation?: any) {

    // Clear previous animation
    if (this.animation) {
      const { timer } = this.animation
      if (timer) clearTimeout(timer)
      this.animation = undefined
    }

    // Prepare new animation
    if (animation) {
      const { duration } = animation
      if (duration) {
        animation.timer = setTimeout(this.updateTitle.bind(this), duration)
      }
      this.animation = animation
    }

    this.dispatchEvent("update")
  }
  close() {
    this.windowClass.disconnectParameters(this)
    ReactDOM.unmountComponentAtNode(this.node)
  }
  render() {
    const { frame } = Application.layout
    frame && ReactDOM.unstable_renderSubtreeIntoContainer(frame.getComponent(), React.createElement(this.windowClass.component, this.parameters), this.node)
  }
}

export type PropsType = {
  current: WindowInstance,
  className: string,
  style: any,
}

export class WindowContainer extends React.Component {
  props: PropsType
  instance: WindowInstance

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
  mountWindow(instance: WindowInstance) {
    this.instance = instance
    if (instance) {
      (this.refs.root as HTMLElement).appendChild(instance.node)
      instance.container = this
    }
  }
  unmountWindow() {
    if (this.instance && this.instance.container === this) {
      (this.refs.root as HTMLElement).removeChild(this.instance.node)
      this.instance.container = null
    }
  }
  width() {
    return this.refs.root && (this.refs.root as HTMLElement).clientWidth
  }
  height() {
    return this.refs.root && (this.refs.root as HTMLElement).clientHeight
  }
  focus = (e) => {
    const prev_focused = Application.layout.focused
    if (prev_focused !== this.instance) {
      Application.layout.focused = this.instance
      if (prev_focused) {
        prev_focused.executeEvent("blur", e)
        prev_focused.dispatchEvent("update")
      }
      if (this.instance) {
        this.instance.executeEvent("focus", e)
        this.instance.updateTitle()
      }
    }
  }
  handle = (type: string) => (e) => {
    this.instance && this.instance.executeEvent(type, e)
  }
  render() {
    const { className, style } = this.props
    return (<div
      ref="root"
      tabIndex={1}
      className={className}
      style={style}
      onKeyDown={this.handle("keydown")}
      onKeyPress={this.handle("keypress")}
      onKeyUp={this.handle("keyup")}
      onFocus={this.focus}
    />)
  }
}

export class WindowComponent extends Component {
  instance: WindowInstance
  plugin: PluginInstance

  constructor(props) {
    super(props)
    this.instance = props.instance
    this.plugin = props.instance.plugin
    this.instance.setWindow(this)
  }
  isWindow() {
    return true
  }
  addEventListener() {
    this.instance.addEventListener.apply(this.instance, arguments)
  }
  removeEventListener() {
    this.instance.removeEventListener.apply(this.instance, arguments)
  }
  openWindow(windowClassID: string, options: WindowOptions) {
    const { windowClass } = this.instance
    Application.layout.openSubWindow(windowClass.windows[windowClassID], this.instance, options)
  }
  closeWindow() {
    Application.layout.removeWindow(this.instance)
  }
  updateWindowTitle(animation: Object) {
    this.instance.updateTitle(animation)
  }
  renderWindowIcon() {
    const { icon } = this.instance
    if (icon instanceof Function) return icon()
    else if (React.isValidElement(icon)) return icon
    else return null
  }
  renderWindowTitle() {
    return <React.Fragment>
      {this.renderWindowIcon()}
      {this.instance.title}
    </React.Fragment>
  }
}
