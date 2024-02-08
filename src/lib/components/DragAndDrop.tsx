import React from "react"
import { MapLike } from "./types"
import { stopPropagation } from "./event.utils"

export type DragPropsType = {
   onDragStart?: (evt: React.DragEvent<HTMLDivElement>) => MapLike<any>
   onDragEnd?: (data: MapLike<any>) => MapLike<any>

   otherProps?: MapLike<any>
   children?: React.ReactNode
}

export class DragZone extends React.Component {
   props: DragPropsType

   dragComplete(data?: MapLike<any>) {
      if (draggedZone === this) {
         const { props } = this
         props.onDragEnd && props.onDragEnd(data)
      }
      draggedZone = null
   }
   protected onDragStart = (evt: React.DragEvent<HTMLDivElement>) => {
      const { props } = this
      const bag = props.onDragStart && props.onDragStart(evt)
      if (bag) {
         draggedZone = this
         evt.stopPropagation()
         objectToDataTransfert(bag, evt.dataTransfer)
         FocusDropZone(bag)
      }
   }
   protected onDragEnd = (evt: React.DragEvent<HTMLDivElement>) => {
      evt.stopPropagation()
      this.dragComplete()
      BlurDropZone()
   }
   protected onMouseDown = (evt: React.MouseEvent<HTMLDivElement>) => {
      if (evt.button === 0) {
         evt.stopPropagation()
      }
   }
   render() {
      return (<div
         draggable
         onMouseDown={this.onMouseDown}
         onDragStart={this.onDragStart}
         onDragEnd={this.onDragEnd}
         {...this.props.otherProps}
      >
         {this.props.children}
      </div>)
   }
}

type DragReaction = string | boolean | null

export type DropPropsType = {
   // Event when mouse enter and exit the zone
   onDragEnter?: (evt: React.DragEvent<HTMLDivElement>) => DragReaction
   onDragExit?: () => void

   // Event for drop validation
   onDroppable?: (data: MapLike<any>) => boolean
   onDrop?: (data: MapLike<any>, evt: React.DragEvent<HTMLDivElement>) => MapLike<any> | void
   onDropMatch?: (types: readonly string[], evt: React.DragEvent<HTMLDivElement>) => boolean

   // Styling
   className?: string
   highlightClassName?: string
   selectedClassName?: string

   otherProps?: MapLike<any>
   children?: React.ReactNode
}

export class DropZone extends React.Component {
   props: DropPropsType

   zoneId: number = undefined
   active: boolean = false
   zone: HTMLElement = null

   componentDidMount() {
      RegisterDropZone(this)
   }
   componentWillUnmount() {
      UnregisterDropZone(this)
   }

   activate(data: MapLike<any>) {
      const { props } = this
      if (!props.onDroppable || props.onDroppable(data)) {
         this.active = true
      }
      else {
         this.active = false
      }
      if (this.active && props.highlightClassName) {
         this.zone.className = props.className + " " + props.highlightClassName
      }
      else {
         this.zone.className = props.className
      }
   }
   deactivate() {
      if (this.active) {
         const { props } = this
         this.zone.className = props.className
         this.active = false
      }
   }
   select(evt: React.DragEvent<HTMLDivElement>) {
      const { props } = this
      const selected = props.onDragEnter ? props.onDragEnter(evt) : true
      if (this.active && selected) {
         let selectedClassName = (typeof selected === "string") ? selected : props.selectedClassName
         if (!selectedClassName) selectedClassName = ""
         this.zone.className = props.className + " " + selectedClassName
      }
      else {
         this.zone.className = props.className
      }
   }
   unselect() {
      const { props } = this
      if (this.active && props.highlightClassName) {
         this.zone.className = props.className + " " + props.highlightClassName
      }
      else {
         this.zone.className = props.className
      }
      props.onDragExit && props.onDragExit()
   }
   protected onDrop = (evt: React.DragEvent<HTMLDivElement>) => {
      if (dropSuggested === this) {
         const { props } = this
         UnselectDropSuggested(this, evt)
         try {
            const bag = dataTransfertToObject(evt.dataTransfer)
            const acknowledgment = props.onDrop && props.onDrop(bag, evt)
            draggedZone && draggedZone.dragComplete(acknowledgment || {})
         }
         catch (e) {
            console.error(e)
         }
      }
   }
   protected onDragOver = (evt: React.DragEvent<HTMLDivElement>) => {
      const { props } = this
      if (dropSuggested === this || !props.onDropMatch || props.onDropMatch(evt.dataTransfer.types, evt)) {
         SelectDropSuggested(this, evt)
      }
   }
   protected onDragEnter = (evt: React.DragEvent<HTMLDivElement>) => {
      const { props } = this
      if (dropSuggested === this || !props.onDropMatch || props.onDropMatch(evt.dataTransfer.types, evt)) {
         if (evt.currentTarget === this.zone) {
            SelectDropSuggested(this, evt)
         }
      }
   }
   protected onDragLeave = (evt: React.DragEvent<HTMLDivElement>) => {
      if (dropSuggested === this) {
         UnselectDropSuggested(this, evt)
      }
   }
   protected useRef = (elt: HTMLElement) => {
      this.zone = elt
   }
   render() {
      return (<div
         ref={this.useRef}
         onDrop={this.onDrop}
         onDragOver={this.onDragOver}
         onDragEnter={this.onDragEnter}
         onDragLeave={this.onDragLeave}
         className={this.props.className}
         {...this.props.otherProps}
      >
         {this.props.children}
      </div>)
   }
}

export class DragDropZone extends DropZone {
   props: DragPropsType & DropPropsType

   protected onDragStart = (evt) => {
      const { props } = this
      const bag = props.onDragStart && props.onDragStart(evt)
      if (bag) {
         evt.stopPropagation()
         objectToDataTransfert(bag, evt.dataTransfer)
         FocusDropZone(bag)
      }
   }
   protected onDragEnd = (evt) => {
      const { props } = this
      evt.stopPropagation()
      props.onDragEnd && props.onDragEnd(evt)
      BlurDropZone()
   }
   protected useRef = (elt: HTMLElement) => {
      this.zone = elt
   }
   render() {
      return (<div
         draggable
         ref={this.useRef}
         onMouseDown={stopPropagation}
         onDragStart={this.onDragStart}
         onDragEnd={this.onDragEnd}
         onDrop={this.onDrop}
         onDragOver={this.onDragOver}
         onDragEnter={this.onDragEnter}
         onDragLeave={this.onDragLeave}
         className={this.props.className}
         {...this.props.otherProps}
      >
         {this.props.children}
      </div>)
   }
}

let draggedZone: DragZone = null
let dropSuggested: DropZone = null
const dropRegistry: DropZone[] = []

function SelectDropSuggested(zone: DropZone, evt: React.DragEvent<HTMLDivElement>) {
   evt.preventDefault()
   evt.stopPropagation()
   if (dropSuggested) {
      dropSuggested.unselect()
   }
   zone.select(evt)
   dropSuggested = zone
}

function UnselectDropSuggested(zone: DropZone, evt: React.DragEvent<HTMLDivElement>) {
   evt.stopPropagation()
   evt.preventDefault()
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

function objectToDataTransfert(obj: { [key: string]: any }, dataTransfer: DataTransfer) {
   Object.keys(obj).forEach(key => {
      if (key !== "dragImage") {
         const value = JSON.stringify(obj[key])
         dataTransfer.setData(key, value)
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
         const value = dataTransfer.getData(key)
         obj[key] = JSON.parse(value)
      }
      catch (e) {
         // Nothing
      }
   })
   obj.files = dataTransfer.files
   return obj
}

export function getEventInElementPosition(evt: React.DragEvent<HTMLDivElement>): { x: number, y: number, width: number, height: number } {
   const rect = evt.currentTarget.getBoundingClientRect()
   return {
      x: evt.clientX - rect.left,
      y: evt.clientY - rect.top,
      width: rect.width,
      height: rect.height,
   }
}
