import React, { Component } from "react"
import { ResizableBorder } from "../ResizableBorder"
import WindowedContainer from "."
import { PanelProps } from "./PanelButton"
import { CenterPanelContainer, SidePanelContainer, ToolbarPanelContainer } from "./PanelContainers"
import PanelBar from "./PanelBar"

const CSS_side_panel_vertical = "WND_side_panel WND_side_panel_V"
const CSS_side_panel_horizontal = "WND_side_panel WND_side_panel_H"

type PropsType = {
   panel: PanelProps,
   frame: WindowedContainer,
   children: any,
}

class SidePanel extends Component {
   props: PropsType
   container: SidePanelContainer
   shouldComponentUpdate(nextProps) {
      const curProps = this.props
      return curProps.panel !== nextProps.panel
         || curProps.frame !== nextProps.frame
         || curProps.children !== nextProps.children
   }
   handleResize = (delta) => {
      const csize = this.container.getSize()
      if (csize !== undefined) {
         let size = this.props.panel.size
         size += Math.max(size, 1) * delta / Math.max(csize, 1)
         size = Math.min(Math.max(size, 0), 100)
         this.props.frame.notifyPanelResize(this.props.panel, size)
      }
   }
   useContainer = (container: SidePanelContainer) => {
      this.container = container
   }
}

export class ToolbarPanel extends Component {
   props: PropsType
   container: ToolbarPanelContainer
   shouldComponentUpdate(nextProps) {
      const curProps = this.props
      return curProps.panel !== nextProps.panel
         || curProps.frame !== nextProps.frame
         || curProps.children !== nextProps.children
   }
   useContainer = (container: ToolbarPanelContainer) => {
      this.container = container
   }
   render() {
      const { panel } = this.props
      return (<div className={CSS_side_panel_horizontal}>
         <ToolbarPanelContainer ref={this.useContainer} current={panel.current} size={0} />
         <div className="WND_panel_container_center">{this.props.children}</div>
      </div>)
   }
}

export class SidePanelTop extends SidePanel {
   transformDelta(e) {
      return e.deltaY
   }
   render() {
      const { panel, frame } = this.props
      const size = panel.current ? panel.size : 0
      return (<div className={CSS_side_panel_horizontal}>
         <PanelBar panel={panel} frame={frame} />
         <SidePanelContainer ref={this.useContainer} current={panel.current} size={size} />
         <ResizableBorder onResize={this.handleResize} transformDelta={this.transformDelta} />
         <div className="WND_panel_container_center">{this.props.children}</div>
      </div>)
   }
}

export class SidePanelBottom extends SidePanel {
   transformDelta(e) {
      return -e.deltaY
   }
   render() {
      const { panel, frame } = this.props
      const size = panel.current ? panel.size : 0
      return (<div className={CSS_side_panel_horizontal}>
         <div className="WND_panel_container_center">{this.props.children}</div>
         <ResizableBorder onResize={this.handleResize} transformDelta={this.transformDelta} />
         <PanelBar panel={panel} frame={frame} />
         <SidePanelContainer ref={this.useContainer} current={panel.current} size={size} />
      </div>)
   }
}

export class SidePanelLeft extends SidePanel {
   transformDelta(e) {
      return e.deltaX
   }
   render() {
      const { panel, frame } = this.props
      const size = panel.current ? panel.size : 0
      return (<div className={CSS_side_panel_vertical}>
         <PanelBar vertical panel={panel} frame={frame} />
         <SidePanelContainer ref={this.useContainer} vertical current={panel.current} size={size} />
         <ResizableBorder vertical onResize={this.handleResize} transformDelta={this.transformDelta} />
         <div className="WND_panel_container_center">{this.props.children}</div>
      </div>)
   }
}

export class SidePanelRight extends SidePanel {
   transformDelta(e) {
      return -e.deltaX
   }
   render() {
      const { panel, frame } = this.props
      const size = panel.current ? panel.size : 0
      return (<div className={CSS_side_panel_vertical}>
         <div className="WND_panel_container_center">{this.props.children}</div>
         <ResizableBorder vertical onResize={this.handleResize} transformDelta={this.transformDelta} />
         <SidePanelContainer ref={this.useContainer} vertical current={panel.current} size={size} />
         <PanelBar vertical panel={panel} frame={frame} />
      </div>)
   }
}

export class CenterPanelTop extends SidePanelTop {
   render() {
      const { panel, frame } = this.props
      return (<div className={CSS_side_panel_horizontal}>
         <PanelBar panel={panel} frame={frame} />
         <CenterPanelContainer ref={this.useContainer} current={panel.current} />
      </div>)
   }
}

export function RootPanel(props) {
   return (<div className="WND_root_panel" onContextMenu={preventContextMenu}> {props.children} </div>)
}

function preventContextMenu(e) {
   if (e.target.readOnly !== false) {
      e.preventDefault()
   }
   return true
}

export default {
   "#": RootPanel,
   "toolbar": ToolbarPanel,
   "side-left": SidePanelLeft,
   "side-top": SidePanelTop,
   "side-right": SidePanelRight,
   "side-bottom": SidePanelBottom,
   "center-top": CenterPanelTop,
}
