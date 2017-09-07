import React, { Component } from "react"

import { Application } from "../application"

export default class FrameMenu extends Component<void, void, void> {
  props: any
  handleMouseDown = (e) => {
    e.stopPropagation()
  }
  handleClick = (plugin, windowName) => () => {
    plugin.openWindow(windowName)
    this.props.close()
  }
  render() {
    const style = { width: 200 }
    const plugins = Application.layout.plugins
    return (<div className="text-bold" style={ style }>
      {Object.keys(plugins).map((name, i) => {
        const plugin = plugins[name]
        return (<div key={ i }className="padding-top">
          <span className="font-style-italic">{plugin.pluginClass.title || name}</span>
          <div>
            {Object.keys(plugin.pluginClass.windows).map((name, i) => {
              const wnd = plugin.pluginClass.windows[name]
              return (<div
                key={ i }
                className="margin-left-lg hoverbox hoverbox-highlight cursor-pointer"
                onClick={ this.handleClick(plugin, name) }
                onMouseDown={ this.handleMouseDown }
                      >
                <span className={ "text-shade fa fa-" + wnd.defaultIcon } style={ styles.icon } />
                {wnd.defaultTitle || name}
              </div>)
            })}
          </div>
        </div>)
      })}
    </div>)
  }
}

const styles = {
  icon: {
    width: 20,
  },
}