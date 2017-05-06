/* eslint-disable react/no-render-return-value */
import React from "react"
import ReactDOM from "react-dom"
import NotificationSystem from "react-notification-system"

type NotificationType = {
  uid: number,
  title: string,
  message: string,
  position: string,
  autoDismiss: number,
  level: string,
}

const notificationNode: HTMLElement = document.createElement("div")
document.body.appendChild(notificationNode)

const notificationSystem: NotificationSystem = ReactDOM.render(
  React.createElement(NotificationSystem),
  notificationNode
)

export function addNotification(notification: NotificationType) {
  notificationSystem.addNotification(notification)
}
