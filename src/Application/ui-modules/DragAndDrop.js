/* eslint-disable react/no-string-refs */
/* eslint-disable react/no-multi-comp */
/* eslint-disable no-use-before-define */
import React, { Component } from "react"

import { stopPropagation } from "./event.utils"

let draggedZone: DragZone = null
let dropHighlight: boolean = false
let dropSuggested: DropZone = null
const dropRegistry: Array<DropZone | number> = []

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
  dropRegistry[zone.zoneId] = lzone
  dropRegistry.pop()
}

function FocusDropZone(data: any) {
  dropHighlight = true
  dropRegistry.forEach(x => x.isDroppable(data) && x.light())
}

function BlurDropZone() {
  dropHighlight = false
  dropRegistry.forEach(x => x.light())
}

type DragPropsType = {
  onDragStart: Function,
  onDragEnd: Function,
  style?: any,
}

function objectToDataTransfert(obj: Object, dataTransfer: Object) {
  Object.keys(obj).forEach(key => {
    dataTransfer.setData(key, JSON.stringify(obj[key]))
  })
  if (!obj["text/plain"]) {
    dataTransfer.setData("text/plain", JSON.stringify(obj))
  }
}

function dataTransfertToObject(dataTransfer: Object): Object {
  const obj = {}
  dataTransfer.types.forEach((key) => {
    try {
      obj[key] = JSON.parse(dataTransfer.getData(key))
    }
    catch (e) {
      console.error(e)
    }
  })
  return obj
}

export class DragZone extends Component {
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
  dragComplete(data: any) {
    if (draggedZone === this) {
      this.props.onDragEnd && this.props.onDragEnd(data || {})
    }
    draggedZone = null
  }
  render(): React$Element<any> {
    // eslint-disable-next-line no-unused-vars
    const { onDragStart, onDragEnd, ...otherProps } = this.props
    return (
      <div
        style={ this.props.style }
        draggable
        onMouseDown={ stopPropagation }
        onDragStart={ this.handleDragStart }
        onDragEnd={ this.handleDragEnd }
        { ...otherProps }
      />)
  }
}

type DropPropsType = {
  onDrop: Function,
  onDropMatch: Function,
  onDropHightlight: Function,
  className: string,
  selectedClassName: string,
  highlightClassName: string,
  isDroppable?: Function
}

export class DropZone extends Component {
  props: DropPropsType

  componentWillMount = () => {
    RegisterDropZone(this)
  }
  componentWillUnmount = () => {
    UnregisterDropZone(this)
  }

  zoneId: number

  isDroppable = (data: any) => {
    return !this.props.isDroppable || this.props.isDroppable(data)
  }
  light() {
    const dom = this.refs.zone
    if (dropHighlight && this.props.highlightClassName) {
      dom.className = this.props.className + " " + this.props.highlightClassName
    }
    else {
      dom.className = this.props.className
    }
  }
  select() {
    const dom = this.refs.zone
    if (dropHighlight && this.props.highlightClassName) {
      dom.className = this.props.className + " " + this.props.highlightClassName + " " + this.props.selectedClassName
    }
    else {
      dom.className = this.props.className + " " + this.props.selectedClassName
    }
  }
  unselect() {
    const dom = this.refs.zone
    if (dropHighlight && this.props.highlightClassName) {
      dom.className = this.props.className + " " + this.props.highlightClassName
    }
    else {
      dom.className = this.props.className
    }
  }
  handleDrop = (evt) => {
    if (dropSuggested === this) {
      evt.stopPropagation()
      evt.preventDefault()
      UnselectDropSuggested(this)
      const x = evt.clientX - evt.currentTarget.offsetLeft
      const y = evt.clientY - evt.currentTarget.offsetTop
      const bag = dataTransfertToObject(evt.dataTransfer)
      try {
        const acknowledgment = this.props.onDrop && this.props.onDrop(bag, x, y)
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
  render(): React$Element<any> {
    const {
      // eslint-disable-next-line no-unused-vars
      onDrop, onDropMatch, onDropHightlight, selectedClassName,
      // eslint-disable-next-line no-unused-vars
      highlightClassName, isDroppable, ...otherProps } = this.props
    return (
      <div
        ref={ "zone" }
        className={ this.props.className }
        onDrop={ this.handleDrop }
        onDragOver={ this.handleDragOver }
        onDragEnter={ this.handleDragEnter }
        onDragLeave={ this.handleDragLeave }
        { ...otherProps }
      />)
  }
}

export class DragDropZone extends DropZone {

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
  render(): React$Element<any> {
    const {
      // eslint-disable-next-line no-unused-vars
      onDrop, onDropMatch, onDropHightlight, selectedClassName,
      // eslint-disable-next-line no-unused-vars
      highlightClassName, isDroppable, onDragStart, onDragEnd,
      ...otherProps,
    } = this.props
    return (
      <div
        ref={ "zone" }
        draggable
        className={ this.props.className }
        onMouseDown={ stopPropagation }
        onDragStart={ this.handleDragStart }
        onDragEnd={ this.handleDragEnd }
        onDrop={ this.handleDrop }
        onDragOver={ this.handleDragOver }
        onDragEnter={ this.handleDragEnter }
        onDragLeave={ this.handleDragLeave }
        { ...otherProps }
      />)
  }
}