import React, { Component } from "react"
import { WindowContainer, WindowInstance } from "../../layout"

type CenterPropsType = {
  current: WindowInstance,
}

type SidePropsType = {
  current: WindowInstance,
  size: number,
  vertical?: boolean,
}

export class CenterPanelContainer extends Component {
  props: CenterPropsType
  componentWillMount() {
  }
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

export class SidePanelContainer extends Component {
  props: SidePropsType
  componentWillMount() {
  }
  shouldComponentUpdate(nextProps) {
    const curProps = this.props
    return curProps.current !== nextProps.current
      || curProps.vertical !== nextProps.vertical
      || curProps.size !== nextProps.size
  }
  getSize() {
    const container: any = this.refs.container
    if (container) {
      return this.props.vertical ? container.width() : container.height()
    }
  }
  render() {
    const { current, vertical, size } = this.props
    const style = {
      width: vertical ? (size + "%") : "auto",
      height: vertical ? "auto" : (size + "%"),
    }

    if (current) {
      return (<WindowContainer
        ref="container"
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
