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

require("./css");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

(0, _application.extendApplication)(Environment); /* eslint-disable import/no-namespace */

(0, _application.extendApplication)(Storage);
(0, _application.extendApplication)(Notification);

_application.Application.installFeatures(Layout, true);
_application.Application.layout = Layout.applicationLayout;
_application.Application.renderDisplayFrame = Frame.renderDisplayFrame;

exports.default = _application.Application;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9BcHBsaWNhdGlvbi9pbmRleC5qcyJdLCJuYW1lcyI6WyJGcmFtZSIsIkVudmlyb25tZW50IiwiU3RvcmFnZSIsIk5vdGlmaWNhdGlvbiIsIkxheW91dCIsImluc3RhbGxGZWF0dXJlcyIsImxheW91dCIsImFwcGxpY2F0aW9uTGF5b3V0IiwicmVuZGVyRGlzcGxheUZyYW1lIl0sIm1hcHBpbmdzIjoiOzs7Ozs7QUFDQTs7SUFBWUEsSzs7QUFDWjs7SUFBWUMsVzs7QUFDWjs7SUFBWUMsTzs7QUFDWjs7SUFBWUMsWTs7QUFDWjs7SUFBWUMsTTs7QUFDWjs7QUFDQTs7OztBQUVBLG9DQUFrQkgsV0FBbEIsRSxDQVRBOztBQVVBLG9DQUFrQkMsT0FBbEI7QUFDQSxvQ0FBa0JDLFlBQWxCOztBQUVBLHlCQUFZRSxlQUFaLENBQTRCRCxNQUE1QixFQUFvQyxJQUFwQztBQUNBLHlCQUFZRSxNQUFaLEdBQXFCRixPQUFPRyxpQkFBNUI7QUFDQSx5QkFBWUMsa0JBQVosR0FBaUNSLE1BQU1RLGtCQUF2QyIsImZpbGUiOiJpbmRleC5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8qIGVzbGludC1kaXNhYmxlIGltcG9ydC9uby1uYW1lc3BhY2UgKi9cclxuaW1wb3J0ICogYXMgRnJhbWUgZnJvbSBcIi4vZnJhbWVcIlxyXG5pbXBvcnQgKiBhcyBFbnZpcm9ubWVudCBmcm9tIFwiLi9lbnZpcm9ubWVudFwiXHJcbmltcG9ydCAqIGFzIFN0b3JhZ2UgZnJvbSBcIi4vc3RvcmFnZVwiXHJcbmltcG9ydCAqIGFzIE5vdGlmaWNhdGlvbiBmcm9tIFwiLi9ub3RpZmljYXRpb25cIlxyXG5pbXBvcnQgKiBhcyBMYXlvdXQgZnJvbSBcIi4vbGF5b3V0XCJcclxuaW1wb3J0IHsgQXBwbGljYXRpb24sIGV4dGVuZEFwcGxpY2F0aW9uIH0gZnJvbSBcIi4vYXBwbGljYXRpb25cIlxyXG5pbXBvcnQgXCIuL2Nzc1wiXHJcblxyXG5leHRlbmRBcHBsaWNhdGlvbihFbnZpcm9ubWVudClcclxuZXh0ZW5kQXBwbGljYXRpb24oU3RvcmFnZSlcclxuZXh0ZW5kQXBwbGljYXRpb24oTm90aWZpY2F0aW9uKVxyXG5cclxuQXBwbGljYXRpb24uaW5zdGFsbEZlYXR1cmVzKExheW91dCwgdHJ1ZSlcclxuQXBwbGljYXRpb24ubGF5b3V0ID0gTGF5b3V0LmFwcGxpY2F0aW9uTGF5b3V0XHJcbkFwcGxpY2F0aW9uLnJlbmRlckRpc3BsYXlGcmFtZSA9IEZyYW1lLnJlbmRlckRpc3BsYXlGcmFtZVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgQXBwbGljYXRpb24iXX0=