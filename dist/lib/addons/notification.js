"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _reactDom = require("react-dom");

var _reactDom2 = _interopRequireDefault(_reactDom);

var _reactNotificationSystem = require("react-notification-system");

var _reactNotificationSystem2 = _interopRequireDefault(_reactNotificationSystem);

var _layout = require("../layout");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

exports.default = {
  name: "notification-addon",
  component: function (_PluginInstance) {
    _inherits(component, _PluginInstance);

    function component() {
      var _ref;

      var _temp, _this, _ret;

      _classCallCheck(this, component);

      for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = component.__proto__ || Object.getPrototypeOf(component)).call.apply(_ref, [this].concat(args))), _this), _this.notificationNode = null, _this.notificationSystem = null, _this.modalStack = [], _temp), _possibleConstructorReturn(_this, _ret);
    }

    _createClass(component, [{
      key: "pluginWillMount",
      value: function pluginWillMount() {
        this.notificationNode = document.createElement("div");
        document.body.appendChild(this.notificationNode);

        this.notificationSystem = _reactDom2.default.render(_react2.default.createElement(_reactNotificationSystem2.default), this.notificationNode);

        this.application.addNotification = this.addNotification.bind(this);
      }
    }, {
      key: "addNotification",
      value: function addNotification(notification) {
        if ((typeof notification === "undefined" ? "undefined" : _typeof(notification)) !== "object") {
          notification = {
            level: arguments[0],
            message: Array.prototype.slice.call(arguments, 1).join()
          };
        }
        this.notificationSystem.addNotification(notification);
      }
    }]);

    return component;
  }(_layout.PluginInstance)
};
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9saWIvYWRkb25zL25vdGlmaWNhdGlvbi5qcyJdLCJuYW1lcyI6WyJuYW1lIiwiY29tcG9uZW50Iiwibm90aWZpY2F0aW9uTm9kZSIsIm5vdGlmaWNhdGlvblN5c3RlbSIsIm1vZGFsU3RhY2siLCJkb2N1bWVudCIsImNyZWF0ZUVsZW1lbnQiLCJib2R5IiwiYXBwZW5kQ2hpbGQiLCJyZW5kZXIiLCJhcHBsaWNhdGlvbiIsImFkZE5vdGlmaWNhdGlvbiIsImJpbmQiLCJub3RpZmljYXRpb24iLCJsZXZlbCIsImFyZ3VtZW50cyIsIm1lc3NhZ2UiLCJBcnJheSIsInByb3RvdHlwZSIsInNsaWNlIiwiY2FsbCIsImpvaW4iXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFBQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFFQTs7Ozs7Ozs7OztrQkFXZTtBQUNiQSxRQUFNLG9CQURPO0FBRWJDO0FBQUE7O0FBQUE7QUFBQTs7QUFBQTs7QUFBQTs7QUFBQTtBQUFBO0FBQUE7O0FBQUEsOExBQ0VDLGdCQURGLEdBQ2tDLElBRGxDLFFBRUVDLGtCQUZGLEdBRTJDLElBRjNDLFFBR0VDLFVBSEYsR0FHZSxFQUhmO0FBQUE7O0FBQUE7QUFBQTtBQUFBLHdDQUlvQjtBQUNoQixhQUFLRixnQkFBTCxHQUF3QkcsU0FBU0MsYUFBVCxDQUF1QixLQUF2QixDQUF4QjtBQUNBRCxpQkFBU0UsSUFBVCxDQUFjQyxXQUFkLENBQTBCLEtBQUtOLGdCQUEvQjs7QUFFQSxhQUFLQyxrQkFBTCxHQUEwQixtQkFBU00sTUFBVCxDQUN4QixnQkFBTUgsYUFBTixtQ0FEd0IsRUFFeEIsS0FBS0osZ0JBRm1CLENBQTFCOztBQUtBLGFBQUtRLFdBQUwsQ0FBaUJDLGVBQWpCLEdBQW1DLEtBQUtBLGVBQUwsQ0FBcUJDLElBQXJCLENBQTBCLElBQTFCLENBQW5DO0FBQ0Q7QUFkSDtBQUFBO0FBQUEsc0NBZWtCQyxZQWZsQixFQWVrRDtBQUM5QyxZQUFJLFFBQU9BLFlBQVAseUNBQU9BLFlBQVAsT0FBd0IsUUFBNUIsRUFBc0M7QUFDcENBLHlCQUFlO0FBQ2JDLG1CQUFPQyxVQUFVLENBQVYsQ0FETTtBQUViQyxxQkFBU0MsTUFBTUMsU0FBTixDQUFnQkMsS0FBaEIsQ0FBc0JDLElBQXRCLENBQTJCTCxTQUEzQixFQUFzQyxDQUF0QyxFQUF5Q00sSUFBekM7QUFGSSxXQUFmO0FBSUQ7QUFDRCxhQUFLbEIsa0JBQUwsQ0FBd0JRLGVBQXhCLENBQXdDRSxZQUF4QztBQUNEO0FBdkJIOztBQUFBO0FBQUE7QUFGYSxDIiwiZmlsZSI6Im5vdGlmaWNhdGlvbi5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBSZWFjdCBmcm9tIFwicmVhY3RcIlxyXG5pbXBvcnQgUmVhY3RET00gZnJvbSBcInJlYWN0LWRvbVwiXHJcbmltcG9ydCBOb3RpZmljYXRpb25TeXN0ZW0gZnJvbSBcInJlYWN0LW5vdGlmaWNhdGlvbi1zeXN0ZW1cIlxyXG5cclxuaW1wb3J0IHsgUGx1Z2luSW5zdGFuY2UgfSBmcm9tIFwiLi4vbGF5b3V0XCJcclxuXHJcbnR5cGUgTm90aWZpY2F0aW9uVHlwZSA9IHtcclxuICB1aWQ6IG51bWJlcixcclxuICB0aXRsZTogc3RyaW5nLFxyXG4gIG1lc3NhZ2U6IHN0cmluZyxcclxuICBwb3NpdGlvbjogc3RyaW5nLFxyXG4gIGF1dG9EaXNtaXNzOiBudW1iZXIsXHJcbiAgbGV2ZWw6IHN0cmluZyxcclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQge1xyXG4gIG5hbWU6IFwibm90aWZpY2F0aW9uLWFkZG9uXCIsXHJcbiAgY29tcG9uZW50OiBjbGFzcyBleHRlbmRzIFBsdWdpbkluc3RhbmNlIHtcclxuICAgIG5vdGlmaWNhdGlvbk5vZGU6IEhUTUxFbGVtZW50ID0gbnVsbFxyXG4gICAgbm90aWZpY2F0aW9uU3lzdGVtOiBOb3RpZmljYXRpb25TeXN0ZW0gPSBudWxsXHJcbiAgICBtb2RhbFN0YWNrID0gW11cclxuICAgIHBsdWdpbldpbGxNb3VudCgpIHtcclxuICAgICAgdGhpcy5ub3RpZmljYXRpb25Ob2RlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKVxyXG4gICAgICBkb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKHRoaXMubm90aWZpY2F0aW9uTm9kZSlcclxuXHJcbiAgICAgIHRoaXMubm90aWZpY2F0aW9uU3lzdGVtID0gUmVhY3RET00ucmVuZGVyKFxyXG4gICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoTm90aWZpY2F0aW9uU3lzdGVtKSxcclxuICAgICAgICB0aGlzLm5vdGlmaWNhdGlvbk5vZGVcclxuICAgICAgKVxyXG4gICAgICBcclxuICAgICAgdGhpcy5hcHBsaWNhdGlvbi5hZGROb3RpZmljYXRpb24gPSB0aGlzLmFkZE5vdGlmaWNhdGlvbi5iaW5kKHRoaXMpXHJcbiAgICB9XHJcbiAgICBhZGROb3RpZmljYXRpb24obm90aWZpY2F0aW9uOiBOb3RpZmljYXRpb25UeXBlKSB7XHJcbiAgICAgIGlmICh0eXBlb2Ygbm90aWZpY2F0aW9uICE9PSBcIm9iamVjdFwiKSB7XHJcbiAgICAgICAgbm90aWZpY2F0aW9uID0ge1xyXG4gICAgICAgICAgbGV2ZWw6IGFyZ3VtZW50c1swXSxcclxuICAgICAgICAgIG1lc3NhZ2U6IEFycmF5LnByb3RvdHlwZS5zbGljZS5jYWxsKGFyZ3VtZW50cywgMSkuam9pbigpLFxyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgICB0aGlzLm5vdGlmaWNhdGlvblN5c3RlbS5hZGROb3RpZmljYXRpb24obm90aWZpY2F0aW9uKVxyXG4gICAgfVxyXG4gIH0sXHJcbn1cclxuIl19