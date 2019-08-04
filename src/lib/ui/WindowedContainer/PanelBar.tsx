import React, { Component } from "react"
import { DropZone } from "../DragAndDrop"
import { Application } from "../../application"
import { openFrameMenu } from "./Menu"
import PanelButton, { PanelProps } from "./PanelButton"
import WindowedContainer from "../WindowedContainer"

type PropsType = {
  panel: PanelProps,
  frame: WindowedContainer,
  vertical?: boolean,
}

const CSS_panel_bar_horizontal = {
  bar: "WND_panel_bar WND_panel_bar_H",
  menu_btn: "WND_panel_menu_btn WND_panel_menu_btn_H WND_center_vertical",
  item_button: "WND_panel_button WND_panel_button_H",
  item_button_CURRENT: "WND_panel_button WND_panel_button_H current",
  item_button_FOCUSED: "WND_panel_button WND_panel_button_H current focused",
  item_button_transform: "rotate(0deg)",
}

const CSS_panel_bar_vertical = {
  bar: "WND_panel_bar WND_panel_bar_V",
  menu_btn: "WND_panel_menu_btn WND_panel_menu_btn_V WND_center_horizontal",
  item_button: "WND_panel_button WND_panel_button_V",
  item_button_CURRENT: "WND_panel_button WND_panel_button_V current",
  item_button_FOCUSED: "WND_panel_button WND_panel_button_V current focused",
  item_button_transform: "rotate(-90deg)",
}

export default class PanelBar extends Component {
  props: PropsType
  shouldComponentUpdate(nextProps) {
    const curProps = this.props
    return curProps.panel !== nextProps.panel
      || curProps.vertical !== nextProps.vertical
  }
  handleDropWindow = (data) => {
    if (data["window"]) {
      const wnd = Application.layout.getWindowInstance(data.window.id)
      wnd && Application.layout.dockWindow(wnd, this.props.panel.id, true)
    }
  }
  render() {
    const { panel, frame, vertical } = this.props
    const css = vertical ? CSS_panel_bar_vertical : CSS_panel_bar_horizontal

    // Bar render
    return (<DropZone onDrop={this.handleDropWindow} className={css.bar}>
      {panel.menu &&
        <div className={css.menu_btn + " fa fa-caret-down"} onClick={openFrameMenu} />
      }
      {panel.items.map((item, i) => {
        return (<PanelButton key={i} css={css} item={item} panel={panel} frame={frame} />)
      })}
    </DropZone>)
  }
}
