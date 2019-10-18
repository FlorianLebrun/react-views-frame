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

let defaultClassName = ""

let defaultStyle: StyleType = {
  border: "1px solid #abc",
  backgroundColor: "#fff",
  overflow: "auto",
}

export const Menu = {
  Item(props: ItemPropsType) {
    const { icon, title, children, onClick } = props
    let onMouseEnter
    if (children) {
      onMouseEnter = (e) => {
        openContextualMenu(this, e.currentTarget, (f) => {
          return children
        })
      }
    }
    return <div className="raf-menu-item" onClick={onClick} onMouseEnter={onMouseEnter}>
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

export default function openContextualMenu(parent: React.Component, target: HTMLElement, renderer: Function, position?: PositionType, className?: string, style?: StyleType) {
  console.assert(renderer instanceof Function)
  var resolve = null

  // Purge top of stack popup
  var stackIndex = 0
  while (stackIndex < stack.length) {
    if (!stack[stackIndex].node.contains(target)) {
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
      computeEdgeBoxDOM(position, node, target)
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
  computeEdgeBoxDOM(position, node, target, document.body)
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

