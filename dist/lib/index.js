"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.extendApplication = exports.Addons = exports.UI = undefined;

require("../css");

var _layout = require("./layout");

var _layout2 = _interopRequireDefault(_layout);

var _application = require("./application");

var _DragAndDrop = require("./ui-modules/DragAndDrop");

var _Split = require("./ui-modules/Split");

var _Split2 = _interopRequireDefault(_Split);

var _popup = require("./addons/popup");

var _popup2 = _interopRequireDefault(_popup);

var _fetch = require("./addons/fetch");

var _fetch2 = _interopRequireDefault(_fetch);

var _notification = require("./addons/notification");

var _notification2 = _interopRequireDefault(_notification);

var _windowsFrame = require("./addons/windows-frame");

var _windowsFrame2 = _interopRequireDefault(_windowsFrame);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(0, _layout2.default)(_application.Application);

var UI = exports.UI = {
  DragZone: _DragAndDrop.DragZone,
  DropZone: _DragAndDrop.DropZone,
  DragDropZone: _DragAndDrop.DragDropZone,
  Split: _Split2.default
};

var Addons = exports.Addons = {
  Popup: _popup2.default,
  Fetch: _fetch2.default,
  Notification: _notification2.default,
  WindowsFrame: _windowsFrame2.default
};

exports.extendApplication = _application.extendApplication;
exports.default = _application.Application;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9saWIvaW5kZXguanMiXSwibmFtZXMiOlsiVUkiLCJEcmFnWm9uZSIsIkRyb3Bab25lIiwiRHJhZ0Ryb3Bab25lIiwiU3BsaXQiLCJBZGRvbnMiLCJQb3B1cCIsIkZldGNoIiwiTm90aWZpY2F0aW9uIiwiV2luZG93c0ZyYW1lIiwiZXh0ZW5kQXBwbGljYXRpb24iXSwibWFwcGluZ3MiOiI7Ozs7Ozs7QUFBQTs7QUFFQTs7OztBQUNBOztBQUNBOztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7OztBQUVBOztBQUVPLElBQU1BLGtCQUFLO0FBQ2hCQyxpQ0FEZ0I7QUFFaEJDLGlDQUZnQjtBQUdoQkMseUNBSGdCO0FBSWhCQztBQUpnQixDQUFYOztBQU9BLElBQU1DLDBCQUFTO0FBQ3BCQyx3QkFEb0I7QUFFcEJDLHdCQUZvQjtBQUdwQkMsc0NBSG9CO0FBSXBCQztBQUpvQixDQUFmOztRQU9FQyxpQiIsImZpbGUiOiJpbmRleC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBcIi4uL2Nzc1wiXHJcblxyXG5pbXBvcnQgaW5zdGFsbEFwcGxpY2F0aW9uTGF5b3V0IGZyb20gXCIuL2xheW91dFwiXHJcbmltcG9ydCB7IEFwcGxpY2F0aW9uLCBleHRlbmRBcHBsaWNhdGlvbiB9IGZyb20gXCIuL2FwcGxpY2F0aW9uXCJcclxuaW1wb3J0IHsgRHJhZ1pvbmUsIERyb3Bab25lLCBEcmFnRHJvcFpvbmUgfSBmcm9tIFwiLi91aS1tb2R1bGVzL0RyYWdBbmREcm9wXCJcclxuaW1wb3J0IFNwbGl0IGZyb20gXCIuL3VpLW1vZHVsZXMvU3BsaXRcIlxyXG5pbXBvcnQgUG9wdXAgZnJvbSBcIi4vYWRkb25zL3BvcHVwXCJcclxuaW1wb3J0IEZldGNoIGZyb20gXCIuL2FkZG9ucy9mZXRjaFwiXHJcbmltcG9ydCBOb3RpZmljYXRpb24gZnJvbSBcIi4vYWRkb25zL25vdGlmaWNhdGlvblwiXHJcbmltcG9ydCBXaW5kb3dzRnJhbWUgZnJvbSBcIi4vYWRkb25zL3dpbmRvd3MtZnJhbWVcIlxyXG5cclxuaW5zdGFsbEFwcGxpY2F0aW9uTGF5b3V0KEFwcGxpY2F0aW9uKVxyXG5cclxuZXhwb3J0IGNvbnN0IFVJID0ge1xyXG4gIERyYWdab25lLFxyXG4gIERyb3Bab25lLFxyXG4gIERyYWdEcm9wWm9uZSxcclxuICBTcGxpdCxcclxufVxyXG5cclxuZXhwb3J0IGNvbnN0IEFkZG9ucyA9IHtcclxuICBQb3B1cCxcclxuICBGZXRjaCxcclxuICBOb3RpZmljYXRpb24sXHJcbiAgV2luZG93c0ZyYW1lLFxyXG59XHJcblxyXG5leHBvcnQgeyBleHRlbmRBcHBsaWNhdGlvbiB9XHJcbmV4cG9ydCBkZWZhdWx0IEFwcGxpY2F0aW9uXHJcbiJdfQ==