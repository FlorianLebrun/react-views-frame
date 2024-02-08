import $notfound from "./light/error.svg"
import action_gripper from "./light/gripper.svg"
import action_close from "./light/close.svg"
import action_refresh from "./light/refresh.svg"
import action_config from "./light/gear.svg"
import action_open from "./light/folder-opened.svg"
import action_load from "./light/cloud-download.svg"
import action_save from "./light/save.svg"
import action_undo from "./light/arrow-left.svg"
import action_redo from "./light/arrow-right.svg"
import action_display from "./light/multiple-windows.svg"
import action_edit from "./light/edit.svg"
import action_add from "./light/add.svg"
import action_remove from "./light/remove.svg"
import action_ok from "./light/check.svg"
import action_cancel from "./light/close.svg"
import action_goto from "./light/link-external.svg"

import symbol_none from "./light/circle-slash.svg"
import symbol_literal from "./light/symbol-key.svg"
import symbol_constant from "./light/symbol-constant.svg"
import symbol_element from "./light/symbol-misc.svg"
import symbol_object from "./light/symbol-namespace.svg"
import symbol_list from "./light/symbol-array.svg"
import symbol_property from "./light/symbol-interface.svg"
import symbol_state from "./light/symbol-variable.svg"
import symbol_operator from "./light/symbol-operator.svg"
import symbol_function from "./light/symbol-method.svg"
import symbol_field from "./light/symbol-field.svg"
import symbol_link from "./light/link.svg"
import symbol_plug from "./light/plug.svg"
import symbol_event from "./light/symbol-event.svg"
import symbol_numeric from "./light/symbol-numeric.svg"
import symbol_schema from "./light/symbol-ruler.svg"
import symbol_layer from "./light/editor-layout.svg"
import symbol_view from "./light/eye.svg"
import symbol_request from "./light/call-outgoing.svg"

import tree_openable from "./light/triangle-right.svg"
import tree_closable from "./light/triangle-down.svg"

import _editor from "./light/edit.svg"
import _code from "./light/code.svg"
import _home from "./light/home.svg"
import _export from "./light/export.svg"

const _none = "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7"

export default function getIcons() {
   return {
      "$notfound": $notfound,
      "action/gripper": action_gripper,
      "action/close": action_close,
      "action/refresh": action_refresh,
      "action/config": action_config,
      "action/open": action_open,
      "action/save": action_save,
      "action/load": action_load,
      "action/undo": action_undo,
      "action/redo": action_redo,
      "action/display": action_display,
      "action/edit": action_edit,
      "action/add": action_add,
      "action/remove": action_remove,
      "action/cancel": action_cancel,
      "action/ok": action_ok,
      "action/goto": action_goto,

      "symbol/none": symbol_none,
      "symbol/numeric": symbol_numeric,
      "symbol/literal": symbol_literal,
      "symbol/constant": symbol_constant,
      "symbol/element": symbol_element,
      "symbol/object": symbol_object,
      "symbol/list": symbol_list,
      "symbol/link": symbol_link,
      "symbol/plug": symbol_plug,

      "symbol/operator": symbol_operator,
      "symbol/property": symbol_property,
      "symbol/state": symbol_state,
      "symbol/function": symbol_function,
      "symbol/field": symbol_field,
      "symbol/event": symbol_event,
      "symbol/schema": symbol_schema,
      "symbol/layer": symbol_layer,
      "symbol/view": symbol_view,
      "symbol/request": symbol_request,

      "tree/openable": tree_openable,
      "tree/closable": tree_closable,
      "tree/empty": _none,

      "/editor": _editor,
      "/code": _code,
      "/home": _home,
      "/export": _export,
      "none": _none,
   }
}