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
  component: function (_PluginComponent) {
    _inherits(component, _PluginComponent);

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
  }(_layout.PluginComponent)
};
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9saWIvYWRkb25zL25vdGlmaWNhdGlvbi5qcyJdLCJuYW1lcyI6WyJuYW1lIiwiY29tcG9uZW50Iiwibm90aWZpY2F0aW9uTm9kZSIsIm5vdGlmaWNhdGlvblN5c3RlbSIsIm1vZGFsU3RhY2siLCJkb2N1bWVudCIsImNyZWF0ZUVsZW1lbnQiLCJib2R5IiwiYXBwZW5kQ2hpbGQiLCJyZW5kZXIiLCJhcHBsaWNhdGlvbiIsImFkZE5vdGlmaWNhdGlvbiIsImJpbmQiLCJub3RpZmljYXRpb24iLCJsZXZlbCIsImFyZ3VtZW50cyIsIm1lc3NhZ2UiLCJBcnJheSIsInByb3RvdHlwZSIsInNsaWNlIiwiY2FsbCIsImpvaW4iXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFBQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFFQTs7Ozs7Ozs7OztrQkFXZTtBQUNiQSxRQUFNLG9CQURPO0FBRWJDO0FBQUE7O0FBQUE7QUFBQTs7QUFBQTs7QUFBQTs7QUFBQTtBQUFBO0FBQUE7O0FBQUEsOExBQ0VDLGdCQURGLEdBQ2tDLElBRGxDLFFBRUVDLGtCQUZGLEdBRTJDLElBRjNDLFFBR0VDLFVBSEYsR0FHZSxFQUhmO0FBQUE7O0FBQUE7QUFBQTtBQUFBLHdDQUlvQjtBQUNoQixhQUFLRixnQkFBTCxHQUF3QkcsU0FBU0MsYUFBVCxDQUF1QixLQUF2QixDQUF4QjtBQUNBRCxpQkFBU0UsSUFBVCxDQUFjQyxXQUFkLENBQTBCLEtBQUtOLGdCQUEvQjs7QUFFQSxhQUFLQyxrQkFBTCxHQUEwQixtQkFBU00sTUFBVCxDQUN4QixnQkFBTUgsYUFBTixtQ0FEd0IsRUFFeEIsS0FBS0osZ0JBRm1CLENBQTFCOztBQUtBLGFBQUtRLFdBQUwsQ0FBaUJDLGVBQWpCLEdBQW1DLEtBQUtBLGVBQUwsQ0FBcUJDLElBQXJCLENBQTBCLElBQTFCLENBQW5DO0FBQ0Q7QUFkSDtBQUFBO0FBQUEsc0NBZWtCQyxZQWZsQixFQWVrRDtBQUM5QyxZQUFJLFFBQU9BLFlBQVAseUNBQU9BLFlBQVAsT0FBd0IsUUFBNUIsRUFBc0M7QUFDcENBLHlCQUFlO0FBQ2JDLG1CQUFPQyxVQUFVLENBQVYsQ0FETTtBQUViQyxxQkFBU0MsTUFBTUMsU0FBTixDQUFnQkMsS0FBaEIsQ0FBc0JDLElBQXRCLENBQTJCTCxTQUEzQixFQUFzQyxDQUF0QyxFQUF5Q00sSUFBekM7QUFGSSxXQUFmO0FBSUQ7QUFDRCxhQUFLbEIsa0JBQUwsQ0FBd0JRLGVBQXhCLENBQXdDRSxZQUF4QztBQUNEO0FBdkJIOztBQUFBO0FBQUE7QUFGYSxDIiwiZmlsZSI6Im5vdGlmaWNhdGlvbi5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBSZWFjdCBmcm9tIFwicmVhY3RcIlxyXG5pbXBvcnQgUmVhY3RET00gZnJvbSBcInJlYWN0LWRvbVwiXHJcbmltcG9ydCBOb3RpZmljYXRpb25TeXN0ZW0gZnJvbSBcInJlYWN0LW5vdGlmaWNhdGlvbi1zeXN0ZW1cIlxyXG5cclxuaW1wb3J0IHsgUGx1Z2luQ29tcG9uZW50IH0gZnJvbSBcIi4uL2xheW91dFwiXHJcblxyXG50eXBlIE5vdGlmaWNhdGlvblR5cGUgPSB7XHJcbiAgdWlkOiBudW1iZXIsXHJcbiAgdGl0bGU6IHN0cmluZyxcclxuICBtZXNzYWdlOiBzdHJpbmcsXHJcbiAgcG9zaXRpb246IHN0cmluZyxcclxuICBhdXRvRGlzbWlzczogbnVtYmVyLFxyXG4gIGxldmVsOiBzdHJpbmcsXHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IHtcclxuICBuYW1lOiBcIm5vdGlmaWNhdGlvbi1hZGRvblwiLFxyXG4gIGNvbXBvbmVudDogY2xhc3MgZXh0ZW5kcyBQbHVnaW5Db21wb25lbnQge1xyXG4gICAgbm90aWZpY2F0aW9uTm9kZTogSFRNTEVsZW1lbnQgPSBudWxsXHJcbiAgICBub3RpZmljYXRpb25TeXN0ZW06IE5vdGlmaWNhdGlvblN5c3RlbSA9IG51bGxcclxuICAgIG1vZGFsU3RhY2sgPSBbXVxyXG4gICAgcGx1Z2luV2lsbE1vdW50KCkge1xyXG4gICAgICB0aGlzLm5vdGlmaWNhdGlvbk5vZGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpXHJcbiAgICAgIGRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQodGhpcy5ub3RpZmljYXRpb25Ob2RlKVxyXG5cclxuICAgICAgdGhpcy5ub3RpZmljYXRpb25TeXN0ZW0gPSBSZWFjdERPTS5yZW5kZXIoXHJcbiAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChOb3RpZmljYXRpb25TeXN0ZW0pLFxyXG4gICAgICAgIHRoaXMubm90aWZpY2F0aW9uTm9kZVxyXG4gICAgICApXHJcbiAgICAgIFxyXG4gICAgICB0aGlzLmFwcGxpY2F0aW9uLmFkZE5vdGlmaWNhdGlvbiA9IHRoaXMuYWRkTm90aWZpY2F0aW9uLmJpbmQodGhpcylcclxuICAgIH1cclxuICAgIGFkZE5vdGlmaWNhdGlvbihub3RpZmljYXRpb246IE5vdGlmaWNhdGlvblR5cGUpIHtcclxuICAgICAgaWYgKHR5cGVvZiBub3RpZmljYXRpb24gIT09IFwib2JqZWN0XCIpIHtcclxuICAgICAgICBub3RpZmljYXRpb24gPSB7XHJcbiAgICAgICAgICBsZXZlbDogYXJndW1lbnRzWzBdLFxyXG4gICAgICAgICAgbWVzc2FnZTogQXJyYXkucHJvdG90eXBlLnNsaWNlLmNhbGwoYXJndW1lbnRzLCAxKS5qb2luKCksXHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICAgIHRoaXMubm90aWZpY2F0aW9uU3lzdGVtLmFkZE5vdGlmaWNhdGlvbihub3RpZmljYXRpb24pXHJcbiAgICB9XHJcbiAgfSxcclxufVxyXG4iXX0=