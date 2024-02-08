import React from "react"
import { IconCollection, IconProps } from "."

export class IconFontCollection implements IconCollection {
   constructor(
      public namePrefix: string,
      public classPrefix: string,
   ) {
   }
   drawLight(props: IconProps) {
      const { name, title, className, onClick } = props
      return <div
         className={className || ""}
         title={title}
         style={styles}
         onClick={onClick}
      >
         <i className={name.replace(this.namePrefix, this.classPrefix)} />
      </div>
   }
   drawDark(props: IconProps) {
      const { name, title, className, onClick } = props
      return <div
         className={className || ""}
         title={title}
         style={styles}
         onClick={onClick}
      >
         <i className={name.replace(this.namePrefix, this.classPrefix)} />
      </div>
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
