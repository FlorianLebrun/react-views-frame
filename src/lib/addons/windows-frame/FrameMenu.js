import React, { Component } from "react"
import openContextualMenu from "../../ui-modules/openContextualMenu"
import { Application } from "../../application"
const classItem = "hoverbox hoverbox-highlight cursor-pointer"

class FrameMenu extends Component<void, void, void> {
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
  render() {
    const plugins = Application.layout.plugins
    return (<div className="text-bold">
      {Object.keys(plugins).map((name) => {
        const plugin = plugins[name]
        const menu = plugin[".class"].menu
        return menu && menu.component && <menu.component key={name} plugin={plugin} onClose={this.props.close} />
      })}
      <div className={classItem} onClick={this.handleMenu}>
        <i className="margin-left margin-right fa fa-fw fa-window-restore" />
        {"Windows"}
        <i className="fa fa-fw fa-caret-right margin-left" />
      </div>
    </div>)
  }
}

export function openFrameMenu(e) {
  const open = Application.openContextualMenu || openContextualMenu
  open(this, e.target, (f) => {
    return <FrameMenu close={f} />
  })
}
