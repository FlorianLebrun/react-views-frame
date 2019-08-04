import React from "react"
import { HtmlGrabReaction } from "./event.utils"
import "./ResizableBorder.css"

type PropsType = {
  transformDelta: Function,
  vertical?: boolean,
  onResize: Function,
}

export class ResizableBorder extends React.Component {
  props: PropsType
  handleMouseDown = (e) => {
    new HtmlGrabReaction(e.target, e, this.handleMouseGrab)
  }
  handleMouseGrab = (e) => {
    this.props.onResize(this.props.transformDelta(e))
  }
  render() {
    return (<div
      className={this.props.vertical ? "wfs-resizer-border vertical" : "wfs-resizer-border horizontal"}
      onMouseDown={this.handleMouseDown}
    >
      <div />
    </div>)
  }
}
