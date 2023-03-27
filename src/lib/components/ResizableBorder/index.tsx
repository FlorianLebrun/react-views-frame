import React from "react"
import { HtmlGrabReaction } from "../event.utils"
import "./index.css"

type PropsType = {
  transformDelta?: Function,
  vertical?: boolean,
  onResize?: Function,
  onRelease?: Function,
}

export class ResizableBorder extends React.Component {
  props: PropsType
  handleMouseDown = (e) => {
    new HtmlGrabReaction(e.target, e, this.handleMouseGrab, this.handleMouseRelease)
  }
  handleMouseGrab = (e) => {
    const { onResize, transformDelta, vertical } = this.props
    onResize && onResize(transformDelta ? transformDelta(e) : (vertical ? e.deltaX : e.deltaY))
  }
  handleMouseRelease = (e) => {
    const { onRelease, transformDelta, vertical } = this.props
    onRelease && onRelease(transformDelta ? transformDelta(e) : (vertical ? e.deltaX : e.deltaY))
  }
  render() {
    const { vertical } = this.props
    return (<div
      className={vertical ? "wfs-resizer-border vertical" : "wfs-resizer-border horizontal"}
      onMouseDown={this.handleMouseDown}
    >
      <div />
    </div>)
  }
}
