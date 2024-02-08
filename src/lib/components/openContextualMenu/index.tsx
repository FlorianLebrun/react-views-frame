import React from "react"
import ReactDOMClient from 'react-dom/client'
import ReactDOM from 'react-dom'
import { computeEdgeBoxDOM, PositionType } from "../computeEdgeBox"
import "./style.scss"
import Icon from "../Icon"

type ItemPropsType = {
   icon?: string
   title?: any
   children?: any
   onClick?: (event: React.SyntheticEvent) => void
}

type StyleType = { [key: string]: string }

const stack = []

const stopableEvents = ["click", "dbclick", "contextmenu"]

let defaultClassName = "cub8-openContextualMenu"
let defaultStyle: StyleType = {}

export const Menu = {
   Item(props: ItemPropsType) {
      let { icon, title, children, onClick } = props
      let onMouseEnter, onMouseLeave
      if (children) {
         let closeCallback
         onMouseEnter = (e) => {
            openContextualMenu(e.currentTarget, (f) => {
               closeCallback = f
               return children
            })
         }
         onMouseLeave = () => {
            closeCallback && closeCallback()
         }
         if (!onClick) {
            onClick = (e) => {
               openContextualMenu(e.currentTarget as HTMLElement, () => children)
            }
         }
      }
      return <div className="cub8-menu-item" onClick={onClick} onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave}>
         <div>{icon ? <Icon name={icon} /> : undefined}</div>
         <div>{title}</div>
      </div>
   },
   Separator() {
      return <div className="cub8-menu-separator" />
   },
   Section(props: { title?: string, children?: React.ReactNode }) {
      return <>
         <div className="cub8-menu-separator">
            {props.title}
         </div>
         {props.children}
      </>
   },
}

export function setDefaultMenuStyle(className?: string, style?: StyleType) {
   defaultStyle = style || defaultStyle
   defaultClassName = `${className || ""} cub8-openContextualMenu`
}

export default function openContextualMenu<T>(
   target: Element | UIEvent | React.Component,
   renderer: (close: (value?: T) => void) => React.ReactNode,
   position?: PositionType,
   className?: string,
   style?: StyleType
): Promise<T> {
   console.assert(renderer instanceof Function)
   var resolve = null

   // Determine tracked element
   var tracked: Element
   if (target instanceof Object) {
      if (target instanceof Element) {
         tracked = target
      }
      else if (target["currentTarget"] instanceof Element) {
         if (stopableEvents.indexOf(target["type"]) >= 0) {
            if (target["stopPropagation"] instanceof Function) target["stopPropagation"]()
            if (target["preventDefault"] instanceof Function) target["preventDefault"]()
         }
         tracked = target["currentTarget"]
      }
      else {
         tracked = ReactDOM.findDOMNode(target as any) as Element
      }
   }
   else {
      throw new Error("target is required")
   }

   // Purge top of stack popup
   var stackIndex = 0
   while (stackIndex < stack.length) {
      if (!stack[stackIndex].node.contains(tracked)) {
         stack[stackIndex].close()
         break
      }
      stackIndex++
   }

   // Create popup node
   var node = document.createElement("div")
   node.className = className || defaultClassName
   Object.assign(node.style, style || defaultStyle)
   node.style.visibility = "hidden"
   node.style.position = "fixed"
   node.style.zIndex = ((stackIndex + 1) * 1000 + 10000000).toString()

   function clickOutside(e) {
      if (node) {
         for (let i = stackIndex; i < stack.length; i++) {
            if (stack[i].node.contains(e.target)) return
         }
         close()
      }
   }

   function updatePosition() {
      if (node) {
         computeEdgeBoxDOM(position, node, tracked)
         node.style.visibility = "visible"
         setTimeout(updatePosition, 25)
      }
   }

   function close(value?: any) {
      if (node) {

         // Remove popup
         document.body.removeEventListener("mousedown", clickOutside)
         document.body.removeChild(node)
         root.unmount()
         node = null

         // Close sub popup when not the top of stack
         if (stackIndex < stack.length - 1) {
            stack[stackIndex + 1].close()
         }
         stack.pop()

         // Resolve promise
         resolve && resolve(value)
      }
   }

   // Append popup in document on top of stack
   document.body.appendChild(node)
   document.body.addEventListener("mousedown", clickOutside)
   computeEdgeBoxDOM(position, node, tracked, document.body)
   stack.push({ node, close })

   // Render popup on node
   const root = ReactDOMClient.createRoot(node)
   root.render(renderer(close))
   updatePosition()

   // Make the promise
   const promise = new Promise<T>((_resolve) => {
      if (node) resolve = _resolve
      else resolve()
   })
   promise["close"] = close
   return promise
}

