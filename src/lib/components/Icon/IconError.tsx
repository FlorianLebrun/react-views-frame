import React from "react"
import { IconCollection, IconProps } from "."

export class IconError implements IconCollection {
   drawLight(props: IconProps) {
      const { name, title, className, onClick } = props
      return <div
         className={className || ""}
         title={`[Bad icon '${name}']${title || ""}`}
         style={styles}
         onClick={onClick}
      />
   }
   drawDark(props: IconProps) {
      const { name, title, className, onClick } = props
      return <div
         className={className || ""}
         title={`[Bad icon '${name}']${title || ""}`}
         style={styles}
         onClick={onClick}
      />
   }
}

const styles = {
   height: 16,
   width: 16,
   minHeight: 16,
   minWidth: 16,
   background: 'repeating-linear-gradient(45deg,#0000,#0000 1px,#f00 2px,#f00 3px)',
}
