/* eslint-disable react/no-string-refs */
/* eslint-disable react/no-multi-comp */
/* eslint-disable no-use-before-define */
import React, { Component } from "react"

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

function FocusDropZone() {
  dropHighlight = true
  dropRegistry.forEach(x => x.light())
}

function BlurDropZone() {
  dropHighlight = false
  dropRegistry.forEach(x => x.light())
}

type DragPropsType = {
  onDragStart: Function,
  onDragEnd: Function,
}

export class DragZone extends Component {
  props: DragPropsType

  handleDragStart = (evt) => {
    const bag = this.props.onDragStart && this.props.onDragStart(evt)
    if (bag) {
      evt.stopPropagation()
      Object.keys(bag).forEach(key => {
        evt.dataTransfer.setData(key, JSON.stringify(bag[key]))
      })
      FocusDropZone()
    }
  }
  handleDragEnd = (evt) => {
    evt.stopPropagation()
    this.props.onDragEnd && this.props.onDragEnd(evt)
    BlurDropZone()
  }
  handleStopPropagation = (evt) => {
    evt.stopPropagation()
  }
  render(): React$Element<any> {
    // eslint-disable-next-line no-unused-vars
    const { onDragStart, onDragEnd, ...otherProps } = this.props
    return (
      <div
        draggable
        onMouseDown={this.handleStopPropagation}
        onDragStart={this.handleDragStart}
        onDragEnd={this.handleDragEnd}
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
      const bag = {}
      const x = evt.clientX - evt.currentTarget.offsetLeft
      const y = evt.clientY - evt.currentTarget.offsetTop
      evt.dataTransfer.types.forEach((key) => {
        try {
          bag[key] = JSON.parse(evt.dataTransfer.getData(key))
        }
        catch (e) {
          console.error(e)
        }
      })
      try {
        this.props.onDrop && this.props.onDrop(bag, x, y)
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
    // eslint-disable-next-line no-unused-vars
    const { onDrop, onDropMatch, onDropHightlight, selectedClassName, highlightClassName, ...otherProps } = this.props
    return (
      <div
        ref={"zone"}
        className={this.props.className}
        onDrop={this.handleDrop}
        onDragOver={this.handleDragOver}
        onDragEnter={this.handleDragEnter}
        onDragLeave={this.handleDragLeave}
        { ...otherProps }
      />)
  }
}
