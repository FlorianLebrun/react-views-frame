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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9saWIvZnJhbWUvRnJhbWVNZW51LmpzIl0sIm5hbWVzIjpbIkZyYW1lTWVudSIsImhhbmRsZU1vdXNlRG93biIsImUiLCJzdG9wUHJvcGFnYXRpb24iLCJoYW5kbGVDbGljayIsInBsdWdpbiIsIndpbmRvd05hbWUiLCJvcGVuV2luZG93IiwicHJvcHMiLCJjbG9zZSIsInN0eWxlIiwid2lkdGgiLCJwbHVnaW5zIiwibGF5b3V0IiwiT2JqZWN0Iiwia2V5cyIsIm1hcCIsIm5hbWUiLCJpIiwicGx1Z2luQ2xhc3MiLCJ0aXRsZSIsIndpbmRvd3MiLCJ3bmQiLCJkZWZhdWx0SWNvbiIsInN0eWxlcyIsImljb24iLCJkZWZhdWx0VGl0bGUiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7O0FBQUE7Ozs7QUFFQTs7Ozs7Ozs7OztJQUVxQkEsUzs7Ozs7Ozs7Ozs7Ozs7NExBRW5CQyxlLEdBQWtCLFVBQUNDLENBQUQsRUFBTztBQUN2QkEsUUFBRUMsZUFBRjtBQUNELEssUUFDREMsVyxHQUFjLFVBQUNDLE1BQUQsRUFBU0MsVUFBVDtBQUFBLGFBQXdCLFlBQU07QUFDMUNELGVBQU9FLFVBQVAsQ0FBa0JELFVBQWxCO0FBQ0EsY0FBS0UsS0FBTCxDQUFXQyxLQUFYO0FBQ0QsT0FIYTtBQUFBLEs7Ozs7OzZCQUlMO0FBQUE7O0FBQ1AsVUFBTUMsUUFBUSxFQUFFQyxPQUFPLEdBQVQsRUFBZDtBQUNBLFVBQU1DLFVBQVUseUJBQVlDLE1BQVosQ0FBbUJELE9BQW5DO0FBQ0EsYUFBUTtBQUFBO0FBQUEsVUFBSyxXQUFVLFdBQWYsRUFBMkIsT0FBUUYsS0FBbkM7QUFDTEksZUFBT0MsSUFBUCxDQUFZSCxPQUFaLEVBQXFCSSxHQUFyQixDQUF5QixVQUFDQyxJQUFELEVBQU9DLENBQVAsRUFBYTtBQUNyQyxjQUFNYixTQUFTTyxRQUFRSyxJQUFSLENBQWY7QUFDQSxpQkFBUTtBQUFBO0FBQUEsY0FBSyxLQUFNQyxDQUFYLEVBQWMsV0FBVSxhQUF4QjtBQUNOO0FBQUE7QUFBQSxnQkFBTSxXQUFVLG1CQUFoQjtBQUFxQ2IscUJBQU9jLFdBQVAsQ0FBbUJDLEtBQW5CLElBQTRCSDtBQUFqRSxhQURNO0FBRU47QUFBQTtBQUFBO0FBQ0dILHFCQUFPQyxJQUFQLENBQVlWLE9BQU9jLFdBQVAsQ0FBbUJFLE9BQS9CLEVBQXdDTCxHQUF4QyxDQUE0QyxVQUFDQyxJQUFELEVBQU9DLENBQVAsRUFBYTtBQUN4RCxvQkFBTUksTUFBTWpCLE9BQU9jLFdBQVAsQ0FBbUJFLE9BQW5CLENBQTJCSixJQUEzQixDQUFaO0FBQ0EsdUJBQVE7QUFBQTtBQUFBO0FBQ04seUJBQU1DLENBREE7QUFFTiwrQkFBVSwyREFGSjtBQUdOLDZCQUFVLE9BQUtkLFdBQUwsQ0FBaUJDLE1BQWpCLEVBQXlCWSxJQUF6QixDQUhKO0FBSU4saUNBQWMsT0FBS2hCO0FBSmI7QUFNTiwwREFBTSxXQUFZLHNCQUFzQnFCLElBQUlDLFdBQTVDLEVBQTBELE9BQVFDLE9BQU9DLElBQXpFLEdBTk07QUFPTEgsc0JBQUlJLFlBQUosSUFBb0JUO0FBUGYsaUJBQVI7QUFTRCxlQVhBO0FBREg7QUFGTSxXQUFSO0FBaUJELFNBbkJBO0FBREssT0FBUjtBQXNCRDs7Ozs7O2tCQWxDa0JqQixTOzs7QUFxQ3JCLElBQU13QixTQUFTO0FBQ2JDLFFBQU07QUFDSmQsV0FBTztBQURIO0FBRE8sQ0FBZiIsImZpbGUiOiJGcmFtZU1lbnUuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgUmVhY3QsIHsgQ29tcG9uZW50IH0gZnJvbSBcInJlYWN0XCJcclxuXHJcbmltcG9ydCB7IEFwcGxpY2F0aW9uIH0gZnJvbSBcIi4uL2FwcGxpY2F0aW9uXCJcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEZyYW1lTWVudSBleHRlbmRzIENvbXBvbmVudDx2b2lkLCB2b2lkLCB2b2lkPiB7XHJcbiAgcHJvcHM6IGFueVxyXG4gIGhhbmRsZU1vdXNlRG93biA9IChlKSA9PiB7XHJcbiAgICBlLnN0b3BQcm9wYWdhdGlvbigpXHJcbiAgfVxyXG4gIGhhbmRsZUNsaWNrID0gKHBsdWdpbiwgd2luZG93TmFtZSkgPT4gKCkgPT4ge1xyXG4gICAgcGx1Z2luLm9wZW5XaW5kb3cod2luZG93TmFtZSlcclxuICAgIHRoaXMucHJvcHMuY2xvc2UoKVxyXG4gIH1cclxuICByZW5kZXIoKSB7XHJcbiAgICBjb25zdCBzdHlsZSA9IHsgd2lkdGg6IDIwMCB9XHJcbiAgICBjb25zdCBwbHVnaW5zID0gQXBwbGljYXRpb24ubGF5b3V0LnBsdWdpbnNcclxuICAgIHJldHVybiAoPGRpdiBjbGFzc05hbWU9XCJ0ZXh0LWJvbGRcIiBzdHlsZT17IHN0eWxlIH0+XHJcbiAgICAgIHtPYmplY3Qua2V5cyhwbHVnaW5zKS5tYXAoKG5hbWUsIGkpID0+IHtcclxuICAgICAgICBjb25zdCBwbHVnaW4gPSBwbHVnaW5zW25hbWVdXHJcbiAgICAgICAgcmV0dXJuICg8ZGl2IGtleT17IGkgfWNsYXNzTmFtZT1cInBhZGRpbmctdG9wXCI+XHJcbiAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJmb250LXN0eWxlLWl0YWxpY1wiPntwbHVnaW4ucGx1Z2luQ2xhc3MudGl0bGUgfHwgbmFtZX08L3NwYW4+XHJcbiAgICAgICAgICA8ZGl2PlxyXG4gICAgICAgICAgICB7T2JqZWN0LmtleXMocGx1Z2luLnBsdWdpbkNsYXNzLndpbmRvd3MpLm1hcCgobmFtZSwgaSkgPT4ge1xyXG4gICAgICAgICAgICAgIGNvbnN0IHduZCA9IHBsdWdpbi5wbHVnaW5DbGFzcy53aW5kb3dzW25hbWVdXHJcbiAgICAgICAgICAgICAgcmV0dXJuICg8ZGl2XHJcbiAgICAgICAgICAgICAgICBrZXk9eyBpIH1cclxuICAgICAgICAgICAgICAgIGNsYXNzTmFtZT1cIm1hcmdpbi1sZWZ0LWxnIGhvdmVyYm94IGhvdmVyYm94LWhpZ2hsaWdodCBjdXJzb3ItcG9pbnRlclwiXHJcbiAgICAgICAgICAgICAgICBvbkNsaWNrPXsgdGhpcy5oYW5kbGVDbGljayhwbHVnaW4sIG5hbWUpIH1cclxuICAgICAgICAgICAgICAgIG9uTW91c2VEb3duPXsgdGhpcy5oYW5kbGVNb3VzZURvd24gfVxyXG4gICAgICAgICAgICAgICAgICAgICAgPlxyXG4gICAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPXsgXCJ0ZXh0LXNoYWRlIGZhIGZhLVwiICsgd25kLmRlZmF1bHRJY29uIH0gc3R5bGU9eyBzdHlsZXMuaWNvbiB9IC8+XHJcbiAgICAgICAgICAgICAgICB7d25kLmRlZmF1bHRUaXRsZSB8fCBuYW1lfVxyXG4gICAgICAgICAgICAgIDwvZGl2PilcclxuICAgICAgICAgICAgfSl9XHJcbiAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICA8L2Rpdj4pXHJcbiAgICAgIH0pfVxyXG4gICAgPC9kaXY+KVxyXG4gIH1cclxufVxyXG5cclxuY29uc3Qgc3R5bGVzID0ge1xyXG4gIGljb246IHtcclxuICAgIHdpZHRoOiAyMCxcclxuICB9LFxyXG59Il19