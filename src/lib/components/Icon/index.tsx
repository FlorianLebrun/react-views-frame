import React from "react"
import { IconError } from "./IconError"

export interface IconCollection {
   drawLight(props: IconProps): React.ReactElement
   drawDark(props: IconProps): React.ReactElement
}

export type IconProps = {
   name: string
   className?: string
   style?: React.CSSProperties
   inversed?: boolean
   title?: string
   onClick?: (evt) => void
}

const collections: {
   [namespace: string]: IconCollection
} = {
   "default": new IconError()
}

export function registerIconCollection(namespace: string, collection: IconCollection) {
   collections[namespace] = collection
}

export function getIconCollection(name: string) {
   const namespace_end = name.indexOf(":")
   if (namespace_end > 0) {
      const namespace = name.slice(0, namespace_end)
      return collections[namespace] || collections["default"]
   }
   else {
      return collections[name] || collections["default"]
   }
}

export default function Icon(props: {
   name: string
   className?: string
   style?: React.CSSProperties
   inversed?: boolean
   title?: string
   onClick?: (evt) => void
}) {
   const collection = getIconCollection(props.name)
   if (props.inversed) return collection.drawDark(props)
   else return collection.drawLight(props)
}
