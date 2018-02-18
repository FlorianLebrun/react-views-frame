import "../css"

import installApplicationLayout from "./layout"
import { Application, extendApplication } from "./application"
import { DragZone, DropZone, DragDropZone } from "./ui-modules/DragAndDrop"
import Split from "./ui-modules/Split"
import Listener from "./ui-modules/Listener"
import Waitable from "./modules/waitable"
import Listenable from "./modules/listenable"
import Storable from "./modules/storable"
import CallChain, { CallSite } from "./modules/callchain"
import Popup from "./addons/popup"
import Fetch from "./addons/fetch"
import Notification from "./addons/notification"
import WindowsFrame from "./addons/windows-frame"
import createApplication from "./sandbox/createApplication"
import { SandBox } from "./sandbox/SandBox"

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
  SandBox,
  Waitable,
  Storable,
  Listenable,
  CallChain,
  CallSite,
}

export { extendApplication, createApplication }
export default Application
