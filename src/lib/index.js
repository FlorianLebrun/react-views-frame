import installApplicationLayout from "./layout"
import { renderDisplayFrame } from "./frame"
import { Application, extendApplication } from "./application"
import "../css"

import { DragZone, DropZone, DragDropZone } from "./ui-modules/DragAndDrop"
import Split from "./ui-modules/Split"

import Popup from "./addons/popup"
import Fetch from "./addons/fetch"
import Notification from "./addons/notification"

installApplicationLayout(Application)
Application.renderDisplayFrame = renderDisplayFrame

export const UI = {
  DragZone,
  DropZone,
  DragDropZone,
  Split,
}

export const Addons = {
  Popup,
  Fetch,
  Notification,
}

export { extendApplication }
export default Application
