import $notfound from "./dark/error.svg"
import action_gripper from "./dark/gripper.svg"
import action_close from "./dark/close.svg"
import action_refresh from "./dark/refresh.svg"
import action_config from "./dark/gear.svg"
import action_open from "./dark/folder-opened.svg"
import action_load from "./dark/cloud-download.svg"
import action_save from "./dark/save.svg"
import action_undo from "./dark/arrow-left.svg"
import action_redo from "./dark/arrow-right.svg"
import action_display from "./dark/multiple-windows.svg"
import action_edit from "./dark/edit.svg"
import action_add from "./dark/add.svg"
import action_remove from "./dark/remove.svg"
import action_ok from "./dark/check.svg"
import action_cancel from "./dark/close.svg"
import action_goto from "./dark/link-external.svg"
import action_destroy from "./dark/trash.svg"

import symbol_none from "./dark/circle-slash.svg"
import symbol_literal from "./dark/symbol-key.svg"
import symbol_constant from "./dark/symbol-constant.svg"
import symbol_element from "./dark/symbol-misc.svg"
import symbol_object from "./dark/symbol-namespace.svg"
import symbol_list from "./dark/symbol-array.svg"
import symbol_property from "./dark/symbol-interface.svg"
import symbol_state from "./dark/symbol-variable.svg"
import symbol_operator from "./dark/symbol-operator.svg"
import symbol_function from "./dark/symbol-method.svg"
import symbol_field from "./dark/symbol-field.svg"
import symbol_link from "./dark/link.svg"
import symbol_plug from "./dark/plug.svg"
import symbol_event from "./dark/symbol-event.svg"
import symbol_numeric from "./dark/symbol-numeric.svg"
import symbol_schema from "./dark/symbol-ruler.svg"
import symbol_layer from "./dark/editor-layout.svg"
import symbol_view from "./dark/eye.svg"
import symbol_render from "./dark/screen-full.svg"
import symbol_request from "./dark/remote.svg"

import status_loop from "./dark/refresh.svg"
import status_pending from "./dark/refresh.svg"
import status_outdated from "./dark/refresh.svg"

import tree_openable from "./dark/triangle-right.svg"
import tree_closable from "./dark/triangle-down.svg"

import _editor from "./dark/edit.svg"
import _code from "./dark/code.svg"
import _home from "./dark/home.svg"
import _export from "./dark/export.svg"

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
      "action/destroy": action_destroy,

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
      "symbol/render": symbol_render,
      "symbol/request": symbol_request,

      "status/loop": status_loop,
      "status/pending": status_pending,
      "status/outdated": status_outdated,

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