"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _frame = require("./frame");

var Frame = _interopRequireWildcard(_frame);

var _environment = require("./environment");

var Environment = _interopRequireWildcard(_environment);

var _storage = require("./storage");

var Storage = _interopRequireWildcard(_storage);

var _notification = require("./notification");

var Notification = _interopRequireWildcard(_notification);

var _layout = require("./layout");

var Layout = _interopRequireWildcard(_layout);

var _application = require("./application");

require("../css");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

(0, _application.extendApplication)(Environment); /* eslint-disable import/no-namespace */

(0, _application.extendApplication)(Storage);
(0, _application.extendApplication)(Notification);

_application.Application.installFeatures(Layout, true);
_application.Application.layout = Layout.applicationLayout;
_application.Application.renderDisplayFrame = Frame.renderDisplayFrame;

exports.default = _application.Application;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9saWIvaW5kZXguanMiXSwibmFtZXMiOlsiRnJhbWUiLCJFbnZpcm9ubWVudCIsIlN0b3JhZ2UiLCJOb3RpZmljYXRpb24iLCJMYXlvdXQiLCJpbnN0YWxsRmVhdHVyZXMiLCJsYXlvdXQiLCJhcHBsaWNhdGlvbkxheW91dCIsInJlbmRlckRpc3BsYXlGcmFtZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQ0E7O0lBQVlBLEs7O0FBQ1o7O0lBQVlDLFc7O0FBQ1o7O0lBQVlDLE87O0FBQ1o7O0lBQVlDLFk7O0FBQ1o7O0lBQVlDLE07O0FBQ1o7O0FBQ0E7Ozs7QUFFQSxvQ0FBa0JILFdBQWxCLEUsQ0FUQTs7QUFVQSxvQ0FBa0JDLE9BQWxCO0FBQ0Esb0NBQWtCQyxZQUFsQjs7QUFFQSx5QkFBWUUsZUFBWixDQUE0QkQsTUFBNUIsRUFBb0MsSUFBcEM7QUFDQSx5QkFBWUUsTUFBWixHQUFxQkYsT0FBT0csaUJBQTVCO0FBQ0EseUJBQVlDLGtCQUFaLEdBQWlDUixNQUFNUSxrQkFBdkMiLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VzQ29udGVudCI6WyIvKiBlc2xpbnQtZGlzYWJsZSBpbXBvcnQvbm8tbmFtZXNwYWNlICovXHJcbmltcG9ydCAqIGFzIEZyYW1lIGZyb20gXCIuL2ZyYW1lXCJcclxuaW1wb3J0ICogYXMgRW52aXJvbm1lbnQgZnJvbSBcIi4vZW52aXJvbm1lbnRcIlxyXG5pbXBvcnQgKiBhcyBTdG9yYWdlIGZyb20gXCIuL3N0b3JhZ2VcIlxyXG5pbXBvcnQgKiBhcyBOb3RpZmljYXRpb24gZnJvbSBcIi4vbm90aWZpY2F0aW9uXCJcclxuaW1wb3J0ICogYXMgTGF5b3V0IGZyb20gXCIuL2xheW91dFwiXHJcbmltcG9ydCB7IEFwcGxpY2F0aW9uLCBleHRlbmRBcHBsaWNhdGlvbiB9IGZyb20gXCIuL2FwcGxpY2F0aW9uXCJcclxuaW1wb3J0IFwiLi4vY3NzXCJcclxuXHJcbmV4dGVuZEFwcGxpY2F0aW9uKEVudmlyb25tZW50KVxyXG5leHRlbmRBcHBsaWNhdGlvbihTdG9yYWdlKVxyXG5leHRlbmRBcHBsaWNhdGlvbihOb3RpZmljYXRpb24pXHJcblxyXG5BcHBsaWNhdGlvbi5pbnN0YWxsRmVhdHVyZXMoTGF5b3V0LCB0cnVlKVxyXG5BcHBsaWNhdGlvbi5sYXlvdXQgPSBMYXlvdXQuYXBwbGljYXRpb25MYXlvdXRcclxuQXBwbGljYXRpb24ucmVuZGVyRGlzcGxheUZyYW1lID0gRnJhbWUucmVuZGVyRGlzcGxheUZyYW1lXHJcblxyXG5leHBvcnQgZGVmYXVsdCBBcHBsaWNhdGlvbiJdfQ==