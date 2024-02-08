import React from "react"
import { IconCollection, IconProps } from "."

export class IconSVGCollection implements IconCollection {
   lights: { [name: string]: string } = {}
   darks: { [name: string]: string } = {}
   constructor(public defaultIcon: string) {
   }
   addIcon(name: string, light_icon: URL, dark_icon: URL) {
      this.lights[name] = `url(${light_icon})`
      this.darks[name] = `url(${dark_icon})`
   }
   drawLight(props: IconProps) {
      const { name, title, className, onClick } = props
      const icon = this.lights[name] || this.lights[this.defaultIcon]
      return <div
         className={className || ""}
         title={title}
         style={{ backgroundImage: icon, ...styles }}
         onClick={onClick}
      />
   }
   drawDark(props: IconProps) {
      const { name, title, className, onClick } = props
      const icon = this.darks[name] || this.darks[this.defaultIcon]
      return <div
         className={className || ""}
         title={title}
         style={{ backgroundImage: icon, ...styles }}
         onClick={onClick}
      />
   }
}

const styles = {
   height: 16,
   width: 16,
   minHeight: 16,
   minWidth: 16,
   backgroundRepeat: "no-repeat",
   backgroundPosition: "center",
}
