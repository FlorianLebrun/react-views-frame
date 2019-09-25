import React, { Component } from "react"
import openContextualMenu from "../openContextualMenu"
import { Application } from "../../application"
const classItem = "hoverbox hoverbox-highlight cursor-pointer"

class FrameMenu extends Component {
  props: any
  handleClick = (plugin, windowName) => () => {
    plugin.openWindow(windowName)
    this.props.close()
  }
  handleMenu = (e) => {
    const open = Application.openContextualMenu || openContextualMenu
    open(this, e.currentTarget, (f) => {
      const plugins = Application.layout.plugins
      const list = []
      for (const pluginName in plugins) {
        const plugin = plugins[pluginName]
        const windows = plugin[".class"].windows
        for (const name in windows) {
          const { userOpenable, defaultIcon, defaultTitle } = windows[name]
          userOpenable && list.push(<div key={list.length} className={classItem} onClick={this.handleClick(plugin, name)}>
            <span className={"text-shade margin-left margin-right fa fa-fw fa-" + defaultIcon} />
            {defaultTitle || name}
          </div>)
        }
      }
      return (<div className="text-bold">
        {list}
      </div >)
    }, "right-down")
  }
  getWindowsCount(): number {
    let count = 0
    const plugins = Application.layout.plugins
    for (const pluginName in plugins) {
      const plugin = plugins[pluginName]
      const windows = plugin[".class"].windows
      for (const name in windows) {
        const { userOpenable } = windows[name]
        if (userOpenable) count++
      }
    }
    return count
  }
  render() {
    const plugins = Application.layout.plugins
    let menuItems = []
    for (const name in plugins) {
      const plugin = plugins[name]
      const menu = plugin[".class"].menu
      if (menu && menu.component) {
        menuItems.push(<menu.component key={name} plugin={plugin} onClose={this.props.close} />)
      }
    }
    if (this.getWindowsCount() > 0) {
      menuItems.push(<div key="." className={classItem} onClick={this.handleMenu}>
        <i className="margin-left margin-right fa fa-fw fa-window-restore" />
        {"Windows"}
        <i className="fa fa-fw fa-caret-right margin-left" />
      </div>)
    }
    return (<div className="text-bold">
      {menuItems.length
        ? menuItems
        : <span style={{ color: "#aaa" }}>{"No Items"}</span>}
    </div>)
  }
}

export function openFrameMenu(e) {
  const open = Application.openContextualMenu || openContextualMenu
  open(this, e.target, (f) => {
    return (<FrameMenu close={f} />)
  })
}
