import "../css"

import installApplicationLayout from "./layout"
import { Application, extendApplication } from "./application"
import { DragZone, DropZone, DragDropZone } from "./ui-modules/DragAndDrop"
import Split from "./ui-modules/Split"
import Popup from "./addons/popup"
import Fetch from "./addons/fetch"
import Notification from "./addons/notification"
import WindowsFrame from "./addons/windows-frame"

installApplicationLayout(Application)

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
  WindowsFrame,
}

export { extendApplication }
export default Application
