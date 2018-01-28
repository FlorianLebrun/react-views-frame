import "../css"

import installApplicationLayout from "./layout"
import { Application, extendApplication } from "./application"
import { DragZone, DropZone, DragDropZone } from "./ui-modules/DragAndDrop"
import Split from "./ui-modules/Split"
import Listener from "./ui-modules/Listener"
import Listenable from "./modules/listenable"
import Storable from "./modules/storable"
import CallChain, { CallSite } from "./modules/callchain"
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
  Listener,
}

export const Addons = {
  Popup,
  Fetch,
  Notification,
  WindowsFrame,
}

export const Modules = {
  Storable,
  Listenable,
  CallChain,
  CallSite,
}

export { extendApplication }
export default Application
