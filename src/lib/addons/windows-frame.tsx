import React from "react"
import { Application } from "../application"
import { PluginInstance, WindowInstance } from "../layout"
import { IApplicationFrame } from "../layout/Context";
import { Frame } from "../ui-modules/WindowedContainer"

export default {
  name: "windows-frame",
  component: class extends PluginInstance implements IApplicationFrame {
    frame: Frame
    displayLayout: any

    pluginWillMount(options) {
      this.displayLayout = options.displayLayout
      Application.layout.frame = this
    }
    registerFrameComponent = (frame) => {
      this.frame = frame
      if (frame) {
        const { windows } = Application.layout
        for (const key in windows) {
          const wnd = windows[key]
          frame.attachWindow(wnd, wnd.dockId)
          wnd.render()
        }
      }
    }
    renderFrameComponent() {
      return (<Frame ref={this.registerFrameComponent} displayLayout={this.displayLayout} />)
    }
    getFrameComponent(): React.Component {
      return this.frame
    }
    attachWindow(wnd: WindowInstance, dockId: string, foreground?: boolean): void {
      this.frame && this.frame.attachWindow.apply(this.frame, arguments)
    }
    dettachWindow(wnd: WindowInstance): void {
      this.frame && this.frame.dettachWindow.apply(this.frame, arguments)
    }
  }
}
