import React from "react"
import { HtmlGrabReaction } from "../event.utils"
import "./index.scss"

type PropsType = {
   transformDelta?: Function,
   vertical?: boolean,
   onResize?: Function,
   onRelease?: Function,
}

export class ResizableBorder extends React.Component {
   props: PropsType
   element: HTMLDivElement = null
   handleMouseDown = (e) => {
      const { vertical } = this.props
      this.element.className = vertical ? "rvframe-resizer-border vertical selected" : "rvframe-resizer-border horizontal selected"
      new HtmlGrabReaction(e.target, e, this.handleMouseGrab, this.handleMouseRelease)
   }
   handleMouseGrab = (e) => {
      const { onResize, transformDelta, vertical } = this.props
      onResize && onResize(transformDelta ? transformDelta(e) : (vertical ? e.deltaX : e.deltaY))
   }
   handleMouseRelease = (e) => {
      const { onRelease, transformDelta, vertical } = this.props
      onRelease && onRelease(transformDelta ? transformDelta(e) : (vertical ? e.deltaX : e.deltaY))
      this.element.className = vertical ? "rvframe-resizer-border vertical" : "rvframe-resizer-border horizontal"
   }
   useElement = (element: HTMLDivElement) => {
      this.element = element
   }
   render() {
      const { vertical } = this.props
      return (<div
         ref={this.useElement}
         className={vertical ? "rvframe-resizer-border vertical" : "rvframe-resizer-border horizontal"}
         onMouseDown={this.handleMouseDown}
      >
         <div />
      </div>)
   }
}
