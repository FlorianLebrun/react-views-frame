import React from "react"

import { stopPropagation } from "./event.utils"

let draggedZone: DragZone = null
let dropSuggested: DropZone = null
const dropRegistry: DropZone[] = []

function SelectDropSuggested(zone: DropZone) {
  if (dropSuggested) {
    dropSuggested.unselect()
  }
  zone.select()
  dropSuggested = zone
}

function UnselectDropSuggested(zone: DropZone) {
  zone.unselect()
  if (dropSuggested === zone) {
    dropSuggested = null
  }
}

function RegisterDropZone(zone: DropZone) {
  zone.zoneId = dropRegistry.length
  dropRegistry.push(zone)
}

function UnregisterDropZone(zone: DropZone) {
  const lzone = dropRegistry[dropRegistry.length - 1]
  lzone.zoneId = zone.zoneId
  zone.zoneId = undefined
  dropRegistry[lzone.zoneId] = lzone
  dropRegistry.pop()
}

function FocusDropZone(data: any) {
  dropRegistry.forEach(x => x.activate(data))
}

function BlurDropZone() {
  dropRegistry.forEach(x => x.deactivate())
}

type DragPropsType = {
  onDragStart: Function,
  onDragEnd: Function,
  style?: any,
}

function objectToDataTransfert(obj: { [key: string]: any }, dataTransfer: DataTransfer) {
  Object.keys(obj).forEach(key => {
    if (key !== "dragImage") {
      dataTransfer.setData(key, JSON.stringify(obj[key]))
    }
  })
  if (obj.dragImage) {
    dataTransfer.setDragImage(obj.dragImage.element, obj.dragImage.left || 0, obj.dragImage.top || 0)
  }
}

function dataTransfertToObject(dataTransfer: DataTransfer): any {
  const obj: any = {}
  dataTransfer.types.forEach((key) => {
    try {
      obj[key] = JSON.parse(dataTransfer.getData(key))
    }
    catch (e) {
      // Nothing
    }
  })
  obj.files = dataTransfer.files
  return obj
}

export class DragZone extends React.Component {
  props: DragPropsType

  handleDragStart = (evt) => {
    const bag = this.props.onDragStart && this.props.onDragStart(evt)
    if (bag) {
      draggedZone = this
      evt.stopPropagation()
      objectToDataTransfert(bag, evt.dataTransfer)
      FocusDropZone(bag)
    }
  }
  handleDragEnd = (evt) => {
    evt.stopPropagation()
    this.dragComplete()
    BlurDropZone()
  }
  dragComplete(data?: any) {
    if (draggedZone === this) {
      this.props.onDragEnd && this.props.onDragEnd(data || {})
    }
    draggedZone = null
  }
  render() {
    const { onDragStart, onDragEnd, ...otherProps } = this.props
    return (
      <div
        draggable
        onMouseDown={stopPropagation}
        onDragStart={this.handleDragStart}
        onDragEnd={this.handleDragEnd}
        {...otherProps}
      />)
  }
}

type DropPropsType = {
  // Event when mouse enter and exit the zone
  onSelect?: Function,
  onUnselect?: Function,

  // Event for drop validation
  isDroppable?: Function,
  onDrop?: Function,
  onDropMatch?: Function,

  // Styling
  className?: string,
  selectedClassName?: string,
  highlightClassName?: string,
  [key: string]: any,
}

export class DropZone extends React.Component {
  props: DropPropsType

  zoneId: number = undefined
  active: boolean = false

  componentWillMount = () => {
    RegisterDropZone(this)
  }
  componentWillUnmount = () => {
    UnregisterDropZone(this)
  }

  activate(data) {
    const props = this.props
    if (!props.isDroppable || props.isDroppable(data)) {
      this.active = true
    }
    else {
      this.active = false
    }
    const dom: any = this.refs.zone
    if (this.active && props.highlightClassName) {
      dom.className = props.className + " " + props.highlightClassName
    }
    else {
      dom.className = props.className
    }
  }
  deactivate() {
    if (this.active) {
      const dom: any = this.refs.zone
      dom.className = this.props.className
      this.active = false
    }
  }
  select() {
    const props = this.props
    const dom: any = this.refs.zone
    if (this.active && props.selectedClassName) {
      if (props.highlightClassName) {
        dom.className = props.className + " " + props.highlightClassName + " " + props.selectedClassName
      }
      else {
        dom.className = props.className + " " + props.selectedClassName
      }
    }
    else {
      dom.className = props.className
    }
    props.onSelect && props.onSelect()
  }
  unselect() {
    const props = this.props
    const dom: any = this.refs.zone
    if (this.active && props.highlightClassName) {
      dom.className = props.className + " " + props.highlightClassName
    }
    else {
      dom.className = props.className
    }
    props.onUnselect && props.onUnselect()
  }
  handleDrop = (evt) => {
    if (dropSuggested === this) {
      evt.stopPropagation()
      evt.preventDefault()
      UnselectDropSuggested(this)
      const rect = evt.currentTarget.getBoundingClientRect()
      const x = evt.clientX - rect.left
      const y = evt.clientY - rect.top
      const bag = dataTransfertToObject(evt.dataTransfer)
      try {
        const acknowledgment = this.props.onDrop && this.props.onDrop(bag, x, y, evt)
        draggedZone && draggedZone.dragComplete(acknowledgment)
      }
      catch (e) {
        console.error(e)
      }
    }
  }
  handleDragOver = (evt) => {
    if (dropSuggested === this || !this.props.onDropMatch || this.props.onDropMatch(evt.dataTransfer.types)) {
      evt.preventDefault()
      evt.stopPropagation()
      SelectDropSuggested(this)
    }
  }
  handleDragEnter = (evt) => {
    if (dropSuggested === this || !this.props.onDropMatch || this.props.onDropMatch(evt.dataTransfer.types)) {
      evt.preventDefault()
      evt.stopPropagation()
      if (evt.currentTarget === this.refs.zone) {
        SelectDropSuggested(this)
      }
    }
  }
  handleDragLeave = (evt) => {
    if (dropSuggested === this) {
      evt.preventDefault()
      evt.stopPropagation()
      UnselectDropSuggested(this)
    }
  }
  render() {
    const {
      onSelect, onUnselect, onDrop, onDropMatch, selectedClassName,
      highlightClassName, isDroppable, ...otherProps } = this.props
    return (
      <div
        ref={"zone"}
        className={this.props.className}
        onDrop={this.handleDrop}
        onDragOver={this.handleDragOver}
        onDragEnter={this.handleDragEnter}
        onDragLeave={this.handleDragLeave}
        {...otherProps}
      />)
  }
}

export class DragDropZone extends DropZone {
  props: DropPropsType

  handleDragStart = (evt) => {
    const bag = this.props.onDragStart && this.props.onDragStart(evt)
    if (bag) {
      evt.stopPropagation()
      objectToDataTransfert(bag, evt.dataTransfer)
      FocusDropZone(bag)
    }
  }
  handleDragEnd = (evt) => {
    evt.stopPropagation()
    this.props.onDragEnd && this.props.onDragEnd(evt)
    BlurDropZone()
  }
  render() {
    const {
      onSelect, onUnselect, onDrop, onDropMatch, selectedClassName,
      highlightClassName, isDroppable, onDragStart, onDragEnd,
      ...otherProps
    } = this.props
    return (
      <div
        ref={"zone"}
        draggable
        className={this.props.className}
        onMouseDown={stopPropagation}
        onDragStart={this.handleDragStart}
        onDragEnd={this.handleDragEnd}
        onDrop={this.handleDrop}
        onDragOver={this.handleDragOver}
        onDragEnter={this.handleDragEnter}
        onDragLeave={this.handleDragLeave}
        {...otherProps}
      />)
  }
}
