import React, { Component } from "react"
import openContextualMenu, { Menu } from "../openContextualMenu"
import { Application } from "../../application"

class FrameMenu extends Component {
  props: any
  handleClick = (plugin, windowName) => () => {
    plugin.openWindow(windowName)
    this.props.close()
  }
  handleMenu = (e) => {
    openContextualMenu(this, e, (f) => {
      const plugins = Application.layout.plugins
      const list = []
      for (const pluginName in plugins) {
        const plugin = plugins[pluginName]
        const windows = plugin[".class"].windows
        for (const name in windows) {
          const { userOpenable, defaultIcon, defaultTitle } = windows[name].descriptor
          userOpenable && list.push(<Menu.Item
            key={list.length}
            onClick={this.handleClick(plugin, name)}
            icon={<i className={"fa fa-" + defaultIcon} />}
            title={defaultTitle || name}
          />)
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
        const { userOpenable } = windows[name].descriptor
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
      menuItems.push(<Menu.Item
        key="."
        onClick={this.handleMenu}
        icon={<i className="fa fa-window-restore" />}
        title="Windows"
      />)
    }
    return (<>
      {menuItems.length
        ? menuItems
        : <span style={{ color: "#aaa" }}>{"No Items"}</span>}
    </>)
  }
}

export function openFrameMenu(e) {
  openContextualMenu(this, e, (f) => {
    return (<FrameMenu close={f} />)
  })
}
