"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.extendApplication = exports.Addons = exports.UI = undefined;

var _layout = require("./layout");

var _layout2 = _interopRequireDefault(_layout);

var _frame = require("./frame");

var _application = require("./application");

require("../css");

var _DragAndDrop = require("./ui-modules/DragAndDrop");

var _Split = require("./ui-modules/Split");

var _Split2 = _interopRequireDefault(_Split);

var _popup = require("./addons/popup");

var _popup2 = _interopRequireDefault(_popup);

var _fetch = require("./addons/fetch");

var _fetch2 = _interopRequireDefault(_fetch);

var _notification = require("./addons/notification");

var _notification2 = _interopRequireDefault(_notification);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(0, _layout2.default)(_application.Application);
_application.Application.renderDisplayFrame = _frame.renderDisplayFrame;

var UI = exports.UI = {
  DragZone: _DragAndDrop.DragZone,
  DropZone: _DragAndDrop.DropZone,
  DragDropZone: _DragAndDrop.DragDropZone,
  Split: _Split2.default
};

var Addons = exports.Addons = {
  Popup: _popup2.default,
  Fetch: _fetch2.default,
  Notification: _notification2.default
};

exports.extendApplication = _application.extendApplication;
exports.default = _application.Application;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9saWIvaW5kZXguanMiXSwibmFtZXMiOlsicmVuZGVyRGlzcGxheUZyYW1lIiwiVUkiLCJEcmFnWm9uZSIsIkRyb3Bab25lIiwiRHJhZ0Ryb3Bab25lIiwiU3BsaXQiLCJBZGRvbnMiLCJQb3B1cCIsIkZldGNoIiwiTm90aWZpY2F0aW9uIiwiZXh0ZW5kQXBwbGljYXRpb24iXSwibWFwcGluZ3MiOiI7Ozs7Ozs7QUFBQTs7OztBQUNBOztBQUNBOztBQUNBOztBQUVBOztBQUNBOzs7O0FBRUE7Ozs7QUFDQTs7OztBQUNBOzs7Ozs7QUFFQTtBQUNBLHlCQUFZQSxrQkFBWjs7QUFFTyxJQUFNQyxrQkFBSztBQUNoQkMsaUNBRGdCO0FBRWhCQyxpQ0FGZ0I7QUFHaEJDLHlDQUhnQjtBQUloQkM7QUFKZ0IsQ0FBWDs7QUFPQSxJQUFNQywwQkFBUztBQUNwQkMsd0JBRG9CO0FBRXBCQyx3QkFGb0I7QUFHcEJDO0FBSG9CLENBQWY7O1FBTUVDLGlCIiwiZmlsZSI6ImluZGV4LmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IGluc3RhbGxBcHBsaWNhdGlvbkxheW91dCBmcm9tIFwiLi9sYXlvdXRcIlxyXG5pbXBvcnQgeyByZW5kZXJEaXNwbGF5RnJhbWUgfSBmcm9tIFwiLi9mcmFtZVwiXHJcbmltcG9ydCB7IEFwcGxpY2F0aW9uLCBleHRlbmRBcHBsaWNhdGlvbiB9IGZyb20gXCIuL2FwcGxpY2F0aW9uXCJcclxuaW1wb3J0IFwiLi4vY3NzXCJcclxuXHJcbmltcG9ydCB7IERyYWdab25lLCBEcm9wWm9uZSwgRHJhZ0Ryb3Bab25lIH0gZnJvbSBcIi4vdWktbW9kdWxlcy9EcmFnQW5kRHJvcFwiXHJcbmltcG9ydCBTcGxpdCBmcm9tIFwiLi91aS1tb2R1bGVzL1NwbGl0XCJcclxuXHJcbmltcG9ydCBQb3B1cCBmcm9tIFwiLi9hZGRvbnMvcG9wdXBcIlxyXG5pbXBvcnQgRmV0Y2ggZnJvbSBcIi4vYWRkb25zL2ZldGNoXCJcclxuaW1wb3J0IE5vdGlmaWNhdGlvbiBmcm9tIFwiLi9hZGRvbnMvbm90aWZpY2F0aW9uXCJcclxuXHJcbmluc3RhbGxBcHBsaWNhdGlvbkxheW91dChBcHBsaWNhdGlvbilcclxuQXBwbGljYXRpb24ucmVuZGVyRGlzcGxheUZyYW1lID0gcmVuZGVyRGlzcGxheUZyYW1lXHJcblxyXG5leHBvcnQgY29uc3QgVUkgPSB7XHJcbiAgRHJhZ1pvbmUsXHJcbiAgRHJvcFpvbmUsXHJcbiAgRHJhZ0Ryb3Bab25lLFxyXG4gIFNwbGl0LFxyXG59XHJcblxyXG5leHBvcnQgY29uc3QgQWRkb25zID0ge1xyXG4gIFBvcHVwLFxyXG4gIEZldGNoLFxyXG4gIE5vdGlmaWNhdGlvbixcclxufVxyXG5cclxuZXhwb3J0IHsgZXh0ZW5kQXBwbGljYXRpb24gfVxyXG5leHBvcnQgZGVmYXVsdCBBcHBsaWNhdGlvblxyXG4iXX0=