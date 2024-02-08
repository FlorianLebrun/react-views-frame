import React from "react"
import { WindowContainer, WindowInstance } from "../../layout"

export type CenterPropsType = {
   current: WindowInstance,
}

export class CenterPanelContainer extends React.Component {
   props: CenterPropsType
   shouldComponentUpdate(nextProps) {
      const curProps = this.props
      return curProps.current !== nextProps.current
   }
   render() {
      const current = this.props.current
      if (current) {
         return (<WindowContainer
            current={current}
            className="WND_panel_container_center WND_panel_container"
         />)
      }
      else {
         return (<div className="WND_panel_container_center WND_panel_container_splash" />)
      }
   }
}

export type SidePropsType = {
   current: WindowInstance,
   size: number,
   vertical?: boolean,
}

export class SidePanelContainer extends React.Component {
   props: SidePropsType
   container: WindowContainer
   shouldComponentUpdate(nextProps) {
      const curProps = this.props
      return curProps.current !== nextProps.current
         || curProps.vertical !== nextProps.vertical
         || curProps.size !== nextProps.size
   }
   getSize() {
      if (this.container) {
         return this.props.vertical ? this.container.width() : this.container.height()
      }
   }
   useContainer = (container: WindowContainer) => {
      this.container = container
   }
   render() {
      const { current, vertical, size } = this.props
      const style = {
         width: vertical ? (size + "%") : "auto",
         height: vertical ? "auto" : (size + "%"),
      }

      if (current) {
         return (<WindowContainer
            ref={this.useContainer}
            className="WND_panel_container_side WND_panel_container"
            style={style}
            current={current}
         />)
      }
      else {
         return null
      }
   }
}

export type ToolbarPropsType = {
   current: WindowInstance,
   size: number,
}

export class ToolbarPanelContainer extends React.Component {
   props: ToolbarPropsType
   container: WindowContainer
   shouldComponentUpdate(nextProps) {
      const curProps = this.props
      return curProps.current !== nextProps.current
         || curProps.size !== nextProps.size
   }
   useContainer = (container: WindowContainer) => {
      this.container = container
   }
   render() {
      const { current, size } = this.props
      const style = size ? { height: `${size}px` } : undefined

      if (current) {
         return (<WindowContainer
            ref={this.useContainer}
            className="WND_panel_container_toolbar WND_panel_container"
            style={style}
            current={current}
         />)
      }
      else {
         return null
      }
   }
}
