"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _layout = require("../../layout");

var _Frame = require("./Frame");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

exports.default = {
  name: "windows-frame",
  component: function (_PluginComponent) {
    _inherits(component, _PluginComponent);

    function component() {
      _classCallCheck(this, component);

      return _possibleConstructorReturn(this, (component.__proto__ || Object.getPrototypeOf(component)).apply(this, arguments));
    }

    _createClass(component, [{
      key: "pluginWillMount",
      value: function pluginWillMount() {
        this.application.renderDisplayFrame = function () {
          return _react2.default.createElement(_Frame.Frame, null);
        };
      }
    }]);

    return component;
  }(_layout.PluginComponent)
};
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9saWIvYWRkb25zL3dpbmRvd3MtZnJhbWUvaW5kZXguanMiXSwibmFtZXMiOlsibmFtZSIsImNvbXBvbmVudCIsImFwcGxpY2F0aW9uIiwicmVuZGVyRGlzcGxheUZyYW1lIl0sIm1hcHBpbmdzIjoiOzs7Ozs7OztBQUFBOzs7O0FBRUE7O0FBRUE7Ozs7Ozs7Ozs7a0JBRWU7QUFDYkEsUUFBTSxlQURPO0FBRWJDO0FBQUE7O0FBQUE7QUFBQTs7QUFBQTtBQUFBOztBQUFBO0FBQUE7QUFBQSx3Q0FDb0I7QUFDaEIsYUFBS0MsV0FBTCxDQUFpQkMsa0JBQWpCLEdBQXNDLFlBQVc7QUFDL0MsaUJBQVEsaURBQVI7QUFDRCxTQUZEO0FBR0Q7QUFMSDs7QUFBQTtBQUFBO0FBRmEsQyIsImZpbGUiOiJpbmRleC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBSZWFjdCBmcm9tIFwicmVhY3RcIlxyXG5cclxuaW1wb3J0IHsgUGx1Z2luQ29tcG9uZW50IH0gZnJvbSBcIi4uLy4uL2xheW91dFwiXHJcblxyXG5pbXBvcnQgeyBGcmFtZSB9IGZyb20gXCIuL0ZyYW1lXCJcclxuXHJcbmV4cG9ydCBkZWZhdWx0IHtcclxuICBuYW1lOiBcIndpbmRvd3MtZnJhbWVcIixcclxuICBjb21wb25lbnQ6IGNsYXNzIGV4dGVuZHMgUGx1Z2luQ29tcG9uZW50IHtcclxuICAgIHBsdWdpbldpbGxNb3VudCgpIHtcclxuICAgICAgdGhpcy5hcHBsaWNhdGlvbi5yZW5kZXJEaXNwbGF5RnJhbWUgPSBmdW5jdGlvbigpIHtcclxuICAgICAgICByZXR1cm4gKDxGcmFtZSAvPilcclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH0sXHJcbn0iXX0=