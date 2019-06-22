import installApplicationLayout from "./layout"
import { Application, extendApplication } from "./application"
import "./css"

import { DragZone, DropZone, DragDropZone } from "./ui-modules/DragAndDrop"
import Split from "./ui-modules/Split"
import Listener from "./ui-modules/Listener"
import openContextualMenu from "./ui-modules/openContextualMenu"

import Envs from "./addons/envs"
import Popup from "./addons/popup"
import Fetch from "./addons/fetch"
import Notification from "./addons/notification"
import WindowsFrame from "./addons/windows-frame"

import Waitable from "./modules/waitable"
import EventEmitter from "./modules/event-emitter"
import Listenable from "./modules/listenable"
import Storable, { getAllStorable, saveAllStorable } from "./modules/storable"
import CallChain, { CallSite } from "./modules/callchain"
//import createApplication from "./sandbox/createApplication"
//import { SandBox } from "./sandbox/SandBox"

installApplicationLayout(Application)

export const UI = {
  DragZone,
  DropZone,
  DragDropZone,
  Split,
  Listener,
  openContextualMenu,
}

export const Addons = {
  Envs,
  Popup,
  Fetch,
  Notification,
  WindowsFrame,
}

export const Modules = {
  Waitable,
  Storable,
  getAllStorable,
  saveAllStorable,
  EventEmitter,
  Listenable,
  CallChain,
  CallSite,
}

export { extendApplication }
export default Application
