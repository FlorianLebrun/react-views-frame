import React from "react"
import ReactDOM from "react-dom"
import NotificationSystem from "react-notification-system"
import { Application } from "../application"
import { PluginInstance } from "../layout"

type NotificationType = {
  level: string,
  message: string,
  position: string,
  uid?: number,
  title?: string,
  autoDismiss?: number,
}

export default {
  name: "notification-addon",
  component: class extends PluginInstance {
    notificationNode: HTMLElement = null
    notificationSystem: NotificationSystem = null
    modalStack = []
    pluginWillMount() {
      this.notificationNode = document.createElement("div")
      document.body.appendChild(this.notificationNode)

      this.notificationSystem = ReactDOM.render(
        React.createElement(NotificationSystem),
        this.notificationNode
      )

      Application.addNotification = this.addNotification.bind(this)
    }
    addNotification(error: string | NotificationType, message?: string) {
      if (typeof error !== "object") {
        error = {
          position: "tc",
          level: arguments[0],
          message: Array.prototype.slice.call(arguments, 1).join(),
        }
      }
      this.notificationSystem.addNotification(error)
    }
  },
}
