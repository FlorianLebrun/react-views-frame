import React from "react"
import ReactDOM from "react-dom"
import { computeEdgeBoxDOM, PositionType } from "../computeEdgeBox"
import "./style.css"

type ItemPropsType = {
  icon?: any
  title?: any
  children?: any
  onClick?: (event: React.SyntheticEvent) => void
}

type StyleType = { [key: string]: string }

const stack = []

const stopableEvents = ["click", "dbclick", "contextmenu"]

let defaultClassName = ""

let defaultStyle: StyleType = {
  border: "1px solid #abc",
  backgroundColor: "#fff",
  padding: "5px 0 5px 0",
  minWidth: "150px",
  overflow: "auto",
}

export const Menu = {
  Item(props: ItemPropsType) {
    let { icon, title, children, onClick } = props
    let onMouseEnter, onMouseLeave
    if (children) {
      let closeCallback
      onMouseEnter = (e) => {
        openContextualMenu(this, e.currentTarget, (f) => {
          closeCallback = f
          return children
        })
      }
      onMouseLeave = () => {
        closeCallback && closeCallback()
      }
      if (!onClick) {
        onClick = (e) => {
          openContextualMenu(this, e.currentTarget as HTMLElement, () => children)
        }
      }
    }
    return <div className="raf-menu-item" onClick={onClick} onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave}>
      <div>{icon}</div>
      <div>{title}</div>
    </div>
  },
  Separator() {
    return <div className="raf-menu-separator" />
  },
}

export function setDefaultMenuStyle(className?: string, style?: StyleType) {
  defaultStyle = style || defaultStyle
  defaultClassName = className || defaultClassName
}

export default function openContextualMenu(parent: React.Component, target: Element | UIEvent | React.Component, renderer: Function, position?: PositionType, className?: string, style?: StyleType) {
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
  node.style.zIndex = ((stackIndex + 1) * 100).toString()

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
      ReactDOM.unmountComponentAtNode(node)
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
  ReactDOM.render(renderer(close), node, updatePosition)

  // Make the promise
  const promise = new Promise((_resolve) => {
    if (node) resolve = _resolve
    else resolve()
  })
  promise["close"] = close
  return promise
}

