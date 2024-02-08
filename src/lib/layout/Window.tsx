/* eslint-disable no-use-before-define */
import React, { Component } from "react"
import ReactDOMClient from "react-dom/client"
import Listenable from "../components/Events/listenable"
import Icon from "../components/Icon"
import { FeatureClass, FeatureInstance } from "./Feature"
import { ErrorBoundary } from "../components/ErrorBoundary"
import context from "./Context"

export type WindowDescriptor = {
   layouting?: LayoutingType
   keepAlive?: boolean
   userOpenable?: boolean
   parameters?: { [key: string]: boolean | string } | string[]
   defaultTitle?: string
   defaultDockId?: string
   defaultParameters?: { [key: string]: any }
   defaultIcon?: WindowIconType
}

export type WindowOptions = {
   title?: string
   icon?: WindowIconType
   dockId?: string
   parameters?: { [key: string]: any }
   openNew?: boolean
}

export type ParameterLink = {
   [key: string]: string, // key -> path
}

export type LayoutingType
   = "fitted" // First element is forced to the window size, other are ejected
   | "flexible" // Elements are set in a flex column dipslay
   | "boxed" // Elements are set in a unsized box with scrollbar
   | "undefined" // !Error

export type WindowComponentType = new () => WindowComponent

export type WindowIconType = string

export type WindowAnimationType = {
   mode: string
   duration: number
   timer?: any
}

export class WindowClass {
   classId: string
   name: string
   featureClass: FeatureClass
   component: WindowComponentType // constructor of WindowComponent
   descriptor: WindowDescriptor

   parameters: { [key: string]: string }
   windows: { [key: string]: WindowClass }
   links: { [key: string]: ParameterLink }

   constructor(name: string, desc: WindowDescriptor, component: WindowComponentType, featureClass: FeatureClass) {
      this.classId = featureClass.name + ":" + name
      this.name = name
      this.component = component
      this.descriptor = {
         layouting: "undefined",
         ...component['Descriptor'],
         ...desc,
      }
      this.parameters = this.descriptor.parameters as any
      this.featureClass = featureClass
      console.assert(isDerivedFrom(this.component, WindowComponent),
         "Window '", this.name, "' shall be based on WindowComponent")
   }
   getDefaultDockId() {
      const { windowsDocks } = context
      return windowsDocks[this.classId] || this.descriptor.defaultDockId
   }
   setDefaultDockId(defaultDockId) {
      const { windowsDocks } = context
      if (this.descriptor.defaultDockId !== defaultDockId) {
         windowsDocks[this.classId] = defaultDockId
      }
      else {
         delete windowsDocks[this.classId]
      }
   }
   addLink(featureName: string, key: string, path: string) {
      if (!this.links) this.links = {}
      if (!this.links[featureName]) this.links[featureName] = {}
      this.links[featureName][key] = path
   }
   updateParametersFor(instance, featureName, bind: boolean = false) {
      const { features } = context
      const featInstance = features[featureName]
      if (featInstance) {
         const featLinks = this.links[featureName]
         bind && featInstance.addEventListener(Object.keys(featLinks), instance.updateParams)
         for (const key in featLinks) {
            const path = featLinks[key]
            instance.parameters[key] = featInstance[path]
         }
      }
   }
   connectParameters(instance: WindowInstance) {
      if (this.links) {
         for (const featureName in this.links) {
            this.updateParametersFor(instance, featureName, true)
         }
      }
   }
   disconnectParameters(instance: WindowInstance) {
      if (this.links) {
         const { features } = context
         for (const featureName in this.links) {
            const featInstance = features[featureName]
            featInstance && featInstance.removeEventListener(instance.updateParams)
         }
      }
   }
}

export class WindowInstance extends Listenable {

   // Definition
   id: string = null
   windowClass: WindowClass = null
   window: WindowComponent = null

   // Hierarchy
   parent: WindowInstance = null
   feature: FeatureInstance = null
   container: WindowContainer = null
   element: HTMLElement = null
   root: ReactDOMClient.Root = null

   // Options
   dockId: string = null
   title: string = null
   icon: WindowIconType = null
   parameters: { [key: string]: any } = null
   animation: WindowAnimationType = null
   keepAlive: boolean = false
   style: string = null
   lastError: Error = null

   constructor(windowId: string, windowClass: WindowClass,
      parent: WindowInstance, feature: FeatureInstance, options: WindowOptions
   ) {
      super()
      const { descriptor } = windowClass
      this.id = windowId
      this.windowClass = windowClass
      this.parent = parent
      this.feature = feature
      this.keepAlive = descriptor.keepAlive || false
      this.style = "WND_frame_window " + descriptor.layouting
      this.element = document.createElement("div")
      this.element.className = this.style
      this.root = ReactDOMClient.createRoot(this.element)
      context.windows[windowId] = this
      this.title = descriptor.defaultTitle
      this.icon = descriptor.defaultIcon
      this.dockId = windowClass.getDefaultDockId()
      this.parameters = {
         instance: this,
         onChange: (parameters) => this.updateOptions({ parameters }),
      }
      this.windowClass.connectParameters(this)
      this.updateOptions(options)
   }
   get hasFocus() {
      return context.focused === this
   }
   componentDidCatch(error: Error) {
      this.lastError = error
      this.render()
   }
   setWindow(window: WindowComponent) {
      this.window = window
      this.executeEvent("update")
   }
   updateParams = (feature, prevState) => {
      this.windowClass.updateParametersFor(this, feature[".class"].name)
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
   updateTitle(animation?: WindowAnimationType) {

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
      this.root.unmount()
      if (this.element.parentElement) {
         this.element.parentElement.removeChild(this.element)
      }
   }
   render() {
      const { frame } = context
      const parentComponent = frame && frame.getFrameComponent()
      if (parentComponent) {
         this.root.render(<ErrorBoundary>
            {React.createElement(this.windowClass.component, this.parameters)}
         </ErrorBoundary>)
      }
   }
}

export type PropsType = {
   current: WindowInstance,
   className: string,
   style?: any,
}

export class WindowContainer extends React.Component {
   props: PropsType
   instance: WindowInstance
   root: HTMLElement

   componentDidMount() {
      this.mountWindow(this.props.current)
   }
   UNSAFE_componentWillReceiveProps(nextProps) {
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
         if (instance.element.parentElement !== this.root) {
            this.root.appendChild(instance.element)
         }
         instance.element.className = instance.style
         instance.container = this
      }
   }
   unmountWindow() {
      if (this.instance && this.instance.container === this) {
         if (this.instance.keepAlive) {
            this.instance.element.className = this.instance.style + ' hide'
         }
         else {
            this.root.removeChild(this.instance.element)
         }
         this.instance.container = null
      }
   }
   width() {
      return this.root && this.root.clientWidth
   }
   height() {
      return this.root && this.root.clientHeight
   }
   focus = (e) => {
      const prev_focused = context.focused
      if (prev_focused !== this.instance) {
         context.focused = this.instance
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
   useRoot = (root: HTMLElement) => {
      this.root = root
   }
   render() {
      const { className, style } = this.props
      return (<div
         ref={this.useRoot}
         tabIndex={1}
         className={className}
         style={style}
         onKeyDown={this.handle("keydown")}
         onKeyUp={this.handle("keyup")}
         onFocus={this.focus}
      />)
   }
}

export class WindowComponent<TFeatureInstance extends FeatureInstance = FeatureInstance> extends Component {
   static Descriptor: WindowDescriptor
   instance: WindowInstance
   feature: TFeatureInstance

   constructor(props) {
      super(props)
      this.instance = props.instance
      this.feature = props.instance.feature
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
      context.openSubWindow(windowClass.windows[windowClassID], this.instance, options)
   }
   closeWindow() {
      context.removeWindow(this.instance)
   }
   updateWindowTitle(animation: WindowAnimationType) {
      this.instance.updateTitle(animation)
   }
   renderWindowIcon() {
      const { icon } = this.instance
      if (icon) return <Icon name={icon} />
      else return null
   }
   renderWindowTitle() {
      return <React.Fragment>
         {this.renderWindowIcon()}
         {this.instance.title}
      </React.Fragment>
   }
}

function isDerivedFrom(derived, base) {
   while (derived) {
      derived = Object.getPrototypeOf(derived)
      if (derived === base) return true
   }
   return false
}
