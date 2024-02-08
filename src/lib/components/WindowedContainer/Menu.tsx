import React, { Component } from "react"
import openContextualMenu, { Menu } from "../openContextualMenu"
import context from "../../layout"

class FrameMenu extends Component {
   props: any
   handleClick = (feature, windowName) => () => {
      feature.openWindow(windowName)
      this.props.close()
   }
   getWindowsCount(): number {
      let count = 0
      const features = context.features
      for (const featureName in features) {
         const feature = features[featureName]
         const windows = feature[".class"].windows
         for (const name in windows) {
            const { userOpenable } = windows[name].descriptor
            if (userOpenable) count++
         }
      }
      return count
   }
   render() {
      const features = context.features
      let menuItems = []
      for (const name in features) {
         const feature = features[name]
         const menu = feature[".class"].menu
         if (menu && menu.component) {
            menuItems.push(<menu.component key={name} feature={feature} onClose={this.props.close} />)
         }
      }
      if (this.getWindowsCount() > 0) {
         menuItems.push(<Menu.Section key={menuItems.length} title="Windows"/>)
         for (const featureName in features) {
            const feature = features[featureName]
            const windows = feature[".class"].windows
            for (const name in windows) {
               const { userOpenable, defaultIcon, defaultTitle } = windows[name].descriptor
               userOpenable && menuItems.push(<Menu.Item
                  key={menuItems.length}
                  onClick={this.handleClick(feature, name)}
                  title={defaultTitle || name}
               />)
            }
         }
      }
      return (<>
         {menuItems.length
            ? menuItems
            : <span style={{ color: "#aaa" }}>{"No Items"}</span>}
      </>)
   }
}

export function openFrameMenu(e) {
   openContextualMenu(e, (f) => {
      return (<FrameMenu close={f} />)
   })
}
