import React from "react"
import ReactDOM from "react-dom"
import NotificationSystem from "react-notification-system"
import { PluginInstance } from "../layout"

type NotificationType = {
  uid: number,
  title: string,
  message: string,
  position: string,
  autoDismiss: number,
  level: string,
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

      this.application.addNotification = this.addNotification.bind(this)
    }
    addNotification(notification: NotificationType) {
      if (typeof notification !== "object") {
        notification = {
          position: "tc",
          level: arguments[0],
          message: Array.prototype.slice.call(arguments, 1).join(),
        }
      }
      this.notificationSystem.addNotification(notification)
    }
  },
}
