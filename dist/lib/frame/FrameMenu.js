"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _application = require("../application");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var FrameMenu = function (_Component) {
  _inherits(FrameMenu, _Component);

  function FrameMenu() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, FrameMenu);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = FrameMenu.__proto__ || Object.getPrototypeOf(FrameMenu)).call.apply(_ref, [this].concat(args))), _this), _this.handleMouseDown = function (e) {
      e.stopPropagation();
    }, _this.handleClick = function (plugin, windowName) {
      return function () {
        plugin.openWindow(windowName);
        _this.props.close();
      };
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(FrameMenu, [{
    key: "render",
    value: function render() {
      var _this2 = this;

      var style = { width: 200 };
      var plugins = _application.Application.layout.plugins;
      return _react2.default.createElement(
        "div",
        { className: "text-bold", style: style },
        Object.keys(plugins).map(function (name, i) {
          var plugin = plugins[name];
          return _react2.default.createElement(
            "div",
            { key: i, className: "padding-top" },
            _react2.default.createElement(
              "span",
              { className: "font-style-italic" },
              plugin.pluginClass.title || name
            ),
            _react2.default.createElement(
              "div",
              null,
              Object.keys(plugin.pluginClass.windows).map(function (name, i) {
                var wnd = plugin.pluginClass.windows[name];
                return _react2.default.createElement(
                  "div",
                  {
                    key: i,
                    className: "margin-left-lg hoverbox hoverbox-highlight cursor-pointer",
                    onClick: _this2.handleClick(plugin, name),
                    onMouseDown: _this2.handleMouseDown
                  },
                  _react2.default.createElement("span", { className: "text-shade fa fa-" + wnd.defaultIcon, style: styles.icon }),
                  wnd.defaultTitle || name
                );
              })
            )
          );
        })
      );
    }
  }]);

  return FrameMenu;
}(_react.Component);

exports.default = FrameMenu;


var styles = {
  icon: {
    width: 20
  }
};
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9BcHBsaWNhdGlvbi9mcmFtZS9GcmFtZU1lbnUuanMiXSwibmFtZXMiOlsiRnJhbWVNZW51IiwiaGFuZGxlTW91c2VEb3duIiwiZSIsInN0b3BQcm9wYWdhdGlvbiIsImhhbmRsZUNsaWNrIiwicGx1Z2luIiwid2luZG93TmFtZSIsIm9wZW5XaW5kb3ciLCJwcm9wcyIsImNsb3NlIiwic3R5bGUiLCJ3aWR0aCIsInBsdWdpbnMiLCJsYXlvdXQiLCJPYmplY3QiLCJrZXlzIiwibWFwIiwibmFtZSIsImkiLCJwbHVnaW5DbGFzcyIsInRpdGxlIiwid2luZG93cyIsInduZCIsImRlZmF1bHRJY29uIiwic3R5bGVzIiwiaWNvbiIsImRlZmF1bHRUaXRsZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7QUFBQTs7OztBQUVBOzs7Ozs7Ozs7O0lBRXFCQSxTOzs7Ozs7Ozs7Ozs7Ozs0TEFFbkJDLGUsR0FBa0IsVUFBQ0MsQ0FBRCxFQUFPO0FBQ3ZCQSxRQUFFQyxlQUFGO0FBQ0QsSyxRQUNEQyxXLEdBQWMsVUFBQ0MsTUFBRCxFQUFTQyxVQUFUO0FBQUEsYUFBd0IsWUFBTTtBQUMxQ0QsZUFBT0UsVUFBUCxDQUFrQkQsVUFBbEI7QUFDQSxjQUFLRSxLQUFMLENBQVdDLEtBQVg7QUFDRCxPQUhhO0FBQUEsSzs7Ozs7NkJBSUw7QUFBQTs7QUFDUCxVQUFNQyxRQUFRLEVBQUVDLE9BQU8sR0FBVCxFQUFkO0FBQ0EsVUFBTUMsVUFBVSx5QkFBWUMsTUFBWixDQUFtQkQsT0FBbkM7QUFDQSxhQUFRO0FBQUE7QUFBQSxVQUFLLFdBQVUsV0FBZixFQUEyQixPQUFRRixLQUFuQztBQUNMSSxlQUFPQyxJQUFQLENBQVlILE9BQVosRUFBcUJJLEdBQXJCLENBQXlCLFVBQUNDLElBQUQsRUFBT0MsQ0FBUCxFQUFhO0FBQ3JDLGNBQU1iLFNBQVNPLFFBQVFLLElBQVIsQ0FBZjtBQUNBLGlCQUFRO0FBQUE7QUFBQSxjQUFLLEtBQU1DLENBQVgsRUFBYyxXQUFVLGFBQXhCO0FBQ047QUFBQTtBQUFBLGdCQUFNLFdBQVUsbUJBQWhCO0FBQXFDYixxQkFBT2MsV0FBUCxDQUFtQkMsS0FBbkIsSUFBNEJIO0FBQWpFLGFBRE07QUFFTjtBQUFBO0FBQUE7QUFDR0gscUJBQU9DLElBQVAsQ0FBWVYsT0FBT2MsV0FBUCxDQUFtQkUsT0FBL0IsRUFBd0NMLEdBQXhDLENBQTRDLFVBQUNDLElBQUQsRUFBT0MsQ0FBUCxFQUFhO0FBQ3hELG9CQUFNSSxNQUFNakIsT0FBT2MsV0FBUCxDQUFtQkUsT0FBbkIsQ0FBMkJKLElBQTNCLENBQVo7QUFDQSx1QkFBUTtBQUFBO0FBQUE7QUFDTix5QkFBTUMsQ0FEQTtBQUVOLCtCQUFVLDJEQUZKO0FBR04sNkJBQVUsT0FBS2QsV0FBTCxDQUFpQkMsTUFBakIsRUFBeUJZLElBQXpCLENBSEo7QUFJTixpQ0FBYyxPQUFLaEI7QUFKYjtBQU1OLDBEQUFNLFdBQVksc0JBQXNCcUIsSUFBSUMsV0FBNUMsRUFBMEQsT0FBUUMsT0FBT0MsSUFBekUsR0FOTTtBQU9MSCxzQkFBSUksWUFBSixJQUFvQlQ7QUFQZixpQkFBUjtBQVNELGVBWEE7QUFESDtBQUZNLFdBQVI7QUFpQkQsU0FuQkE7QUFESyxPQUFSO0FBc0JEOzs7Ozs7a0JBbENrQmpCLFM7OztBQXFDckIsSUFBTXdCLFNBQVM7QUFDYkMsUUFBTTtBQUNKZCxXQUFPO0FBREg7QUFETyxDQUFmIiwiZmlsZSI6IkZyYW1lTWVudS5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBSZWFjdCwgeyBDb21wb25lbnQgfSBmcm9tIFwicmVhY3RcIlxyXG5cclxuaW1wb3J0IHsgQXBwbGljYXRpb24gfSBmcm9tIFwiLi4vYXBwbGljYXRpb25cIlxyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgRnJhbWVNZW51IGV4dGVuZHMgQ29tcG9uZW50PHZvaWQsIHZvaWQsIHZvaWQ+IHtcclxuICBwcm9wczogYW55XHJcbiAgaGFuZGxlTW91c2VEb3duID0gKGUpID0+IHtcclxuICAgIGUuc3RvcFByb3BhZ2F0aW9uKClcclxuICB9XHJcbiAgaGFuZGxlQ2xpY2sgPSAocGx1Z2luLCB3aW5kb3dOYW1lKSA9PiAoKSA9PiB7XHJcbiAgICBwbHVnaW4ub3BlbldpbmRvdyh3aW5kb3dOYW1lKVxyXG4gICAgdGhpcy5wcm9wcy5jbG9zZSgpXHJcbiAgfVxyXG4gIHJlbmRlcigpIHtcclxuICAgIGNvbnN0IHN0eWxlID0geyB3aWR0aDogMjAwIH1cclxuICAgIGNvbnN0IHBsdWdpbnMgPSBBcHBsaWNhdGlvbi5sYXlvdXQucGx1Z2luc1xyXG4gICAgcmV0dXJuICg8ZGl2IGNsYXNzTmFtZT1cInRleHQtYm9sZFwiIHN0eWxlPXsgc3R5bGUgfT5cclxuICAgICAge09iamVjdC5rZXlzKHBsdWdpbnMpLm1hcCgobmFtZSwgaSkgPT4ge1xyXG4gICAgICAgIGNvbnN0IHBsdWdpbiA9IHBsdWdpbnNbbmFtZV1cclxuICAgICAgICByZXR1cm4gKDxkaXYga2V5PXsgaSB9Y2xhc3NOYW1lPVwicGFkZGluZy10b3BcIj5cclxuICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cImZvbnQtc3R5bGUtaXRhbGljXCI+e3BsdWdpbi5wbHVnaW5DbGFzcy50aXRsZSB8fCBuYW1lfTwvc3Bhbj5cclxuICAgICAgICAgIDxkaXY+XHJcbiAgICAgICAgICAgIHtPYmplY3Qua2V5cyhwbHVnaW4ucGx1Z2luQ2xhc3Mud2luZG93cykubWFwKChuYW1lLCBpKSA9PiB7XHJcbiAgICAgICAgICAgICAgY29uc3Qgd25kID0gcGx1Z2luLnBsdWdpbkNsYXNzLndpbmRvd3NbbmFtZV1cclxuICAgICAgICAgICAgICByZXR1cm4gKDxkaXZcclxuICAgICAgICAgICAgICAgIGtleT17IGkgfVxyXG4gICAgICAgICAgICAgICAgY2xhc3NOYW1lPVwibWFyZ2luLWxlZnQtbGcgaG92ZXJib3ggaG92ZXJib3gtaGlnaGxpZ2h0IGN1cnNvci1wb2ludGVyXCJcclxuICAgICAgICAgICAgICAgIG9uQ2xpY2s9eyB0aGlzLmhhbmRsZUNsaWNrKHBsdWdpbiwgbmFtZSkgfVxyXG4gICAgICAgICAgICAgICAgb25Nb3VzZURvd249eyB0aGlzLmhhbmRsZU1vdXNlRG93biB9XHJcbiAgICAgICAgICAgICAgICAgICAgICA+XHJcbiAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9eyBcInRleHQtc2hhZGUgZmEgZmEtXCIgKyB3bmQuZGVmYXVsdEljb24gfSBzdHlsZT17IHN0eWxlcy5pY29uIH0gLz5cclxuICAgICAgICAgICAgICAgIHt3bmQuZGVmYXVsdFRpdGxlIHx8IG5hbWV9XHJcbiAgICAgICAgICAgICAgPC9kaXY+KVxyXG4gICAgICAgICAgICB9KX1cclxuICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgIDwvZGl2PilcclxuICAgICAgfSl9XHJcbiAgICA8L2Rpdj4pXHJcbiAgfVxyXG59XHJcblxyXG5jb25zdCBzdHlsZXMgPSB7XHJcbiAgaWNvbjoge1xyXG4gICAgd2lkdGg6IDIwLFxyXG4gIH0sXHJcbn0iXX0=