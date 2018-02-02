"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.WindowComponent = exports.WindowContainer = exports.WindowInstance = exports.WindowClass = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }(); /* eslint-disable no-use-before-define */
/* eslint-disable react/no-multi-comp */
/* eslint-disable react/prop-types */
/* eslint-disable react/no-string-refs */
/* eslint-disable react/sort-comp */


var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _reactDom = require("react-dom");

var _reactDom2 = _interopRequireDefault(_reactDom);

var _utils = require("../utils");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var WindowClass = exports.WindowClass = function () {
  function WindowClass(name, desc, pluginClass) {
    var _this = this;

    _classCallCheck(this, WindowClass);

    this.windows = {};

    desc && Object.keys(desc).forEach(function (key) {
      return _this[key] = desc[key];
    });
    this.name = name;
    this.overflow = this.overflow || "auto";
    this.pluginClass = pluginClass;
    console.assert((0, _utils.isInheritedOf)(this.component, WindowComponent), "Window '", this.name, "' shall be based on WindowComponent");
  } // constructor of WindowComponent


  _createClass(WindowClass, [{
    key: "addLink",
    value: function addLink(link) {
      if (!this.links) this.links = [link];else this.links.push(link);
    }
  }, {
    key: "createDefaultParameters",
    value: function createDefaultParameters(instance) {
      var params = _extends({}, this.defaultParameters);
      this.links && this.links.forEach(function (lk) {
        params[lk.param] = lk.pluginClass.instance[lk.path];
      });
      params.instance = instance;
      params.onChange = instance.notifyChange;
      return params;
    }
  }]);

  return WindowClass;
}();

var WindowInstance = exports.WindowInstance = function () {

  // Options
  function WindowInstance(windowId, windowClass, parent, plugin, options) {
    var _this2 = this;

    _classCallCheck(this, WindowInstance);

    this.notifyChange = function (parameters) {
      _this2.updateOptions({ parameters: parameters });
    };

    this.id = windowId;
    this.windowClass = windowClass;
    this.parent = parent;
    this.plugin = plugin;
    this.component = windowClass.component;
    this.node = document.createElement("div");
    this.node.className = "position-relative width-100 height-100 overflow-" + windowClass.overflow;
    this.layout.windows[windowId] = this;
    this.title = windowClass.defaultTitle;
    this.icon = windowClass.defaultIcon;
    this.dockId = windowClass.defaultDockId;
    this.parameters = windowClass.createDefaultParameters(this);
    this.updateOptions(options);
  }
  // Definition


  _createClass(WindowInstance, [{
    key: "updateOptions",
    value: function updateOptions(options) {
      if (options) {
        if (options.title) this.title = options.title;
        if (options.icon) this.icon = options.icon;
        if (options.dockId) this.dockId = options.dockId;
        if (options.parameters) {
          this.parameters = _extends({}, this.parameters, options.parameters);
        }
      }
      this.render();
    }
  }, {
    key: "close",
    value: function close() {
      _reactDom2.default.unmountComponentAtNode(this.node);
    }
  }, {
    key: "notifyFocus",
    value: function notifyFocus() {}
  }, {
    key: "notifyBlur",
    value: function notifyBlur() {}
  }, {
    key: "render",
    value: function render() {
      _reactDom2.default.render(_react2.default.createElement(this.component, this.parameters), this.node);
    }
  }]);

  return WindowInstance;
}();

var WindowContainer = exports.WindowContainer = function (_Component) {
  _inherits(WindowContainer, _Component);

  function WindowContainer() {
    var _ref;

    var _temp, _this3, _ret;

    _classCallCheck(this, WindowContainer);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this3 = _possibleConstructorReturn(this, (_ref = WindowContainer.__proto__ || Object.getPrototypeOf(WindowContainer)).call.apply(_ref, [this].concat(args))), _this3), _this3.handleFocus = function () {
      _this3.layout.focusOnWindow(_this3.window);
    }, _temp), _possibleConstructorReturn(_this3, _ret);
  }

  _createClass(WindowContainer, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      this.mountWindow(this.props.current);
    }
  }, {
    key: "componentWillReceiveProps",
    value: function componentWillReceiveProps(nextProps) {
      if (this.props.current !== nextProps.current) {
        this.unmountWindow();
        this.mountWindow(nextProps.current);
      }
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      this.unmountWindow();
    }
  }, {
    key: "mountWindow",
    value: function mountWindow(window) {
      this.window = window;
      if (window) {
        this.refs.root.appendChild(window.node);
        window.container = this;
      }
    }
  }, {
    key: "unmountWindow",
    value: function unmountWindow() {
      if (this.window && this.window.container === this) {
        this.refs.root.removeChild(this.window.node);
        this.window.container = null;
      }
    }
  }, {
    key: "width",
    value: function width() {
      return this.refs.root && this.refs.root.clientWidth;
    }
  }, {
    key: "height",
    value: function height() {
      return this.refs.root && this.refs.root.clientHeight;
    }
  }, {
    key: "render",
    value: function render() {
      var _props = this.props,
          className = _props.className,
          style = _props.style;

      return _react2.default.createElement("div", {
        ref: "root",
        tabIndex: 1,
        className: className,
        style: style,
        onFocus: this.handleFocus
      });
    }
  }]);

  return WindowContainer;
}(_react.Component);

var WindowComponent = exports.WindowComponent = function (_Component2) {
  _inherits(WindowComponent, _Component2);

  function WindowComponent(props) {
    _classCallCheck(this, WindowComponent);

    var _this4 = _possibleConstructorReturn(this, (WindowComponent.__proto__ || Object.getPrototypeOf(WindowComponent)).call(this, props));

    _this4.instance = props.instance;
    _this4.plugin = props.instance.plugin;
    return _this4;
  }

  _createClass(WindowComponent, [{
    key: "isWindow",
    value: function isWindow() {
      return true;
    }
  }, {
    key: "log",
    value: function log(severity) {
      var _console, _console2;

      var message = {
        severity: severity,
        from: this.props && this.props.window && this.props.window.title,
        content: arguments[1]
      };
      if (arguments.length > 1) {
        message.content = Array.prototype.slice.call(arguments, 1);
      }
      if (severity === "error") (_console = console).error.apply(_console, _toConsumableArray(message.content));else (_console2 = console).log.apply(_console2, _toConsumableArray(message.content));
      this.plugin.application.setEnv("console.debug", message);
    }
  }, {
    key: "openWindow",
    value: function openWindow(windowClassID, options) {
      var layout = this.instance.layout;

      layout.openSubWindow(this.windowClass.windows[windowClassID], this, options);
    }
  }, {
    key: "closeWindow",
    value: function closeWindow(windowClassID) {
      var layout = this.instance.layout;

      if (windowClassID) {
        layout.closeSubWindow(this.windowClass.windows[windowClassID], this);
      } else {
        layout.removeWindow(this.instance);
      }
    }
  }]);

  return WindowComponent;
}(_react.Component);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9saWIvbGF5b3V0L1dpbmRvdy5qcyJdLCJuYW1lcyI6WyJXaW5kb3dDbGFzcyIsIm5hbWUiLCJkZXNjIiwicGx1Z2luQ2xhc3MiLCJ3aW5kb3dzIiwiT2JqZWN0Iiwia2V5cyIsImZvckVhY2giLCJrZXkiLCJvdmVyZmxvdyIsImNvbnNvbGUiLCJhc3NlcnQiLCJjb21wb25lbnQiLCJXaW5kb3dDb21wb25lbnQiLCJsaW5rIiwibGlua3MiLCJwdXNoIiwiaW5zdGFuY2UiLCJwYXJhbXMiLCJkZWZhdWx0UGFyYW1ldGVycyIsImxrIiwicGFyYW0iLCJwYXRoIiwib25DaGFuZ2UiLCJub3RpZnlDaGFuZ2UiLCJXaW5kb3dJbnN0YW5jZSIsIndpbmRvd0lkIiwid2luZG93Q2xhc3MiLCJwYXJlbnQiLCJwbHVnaW4iLCJvcHRpb25zIiwicGFyYW1ldGVycyIsInVwZGF0ZU9wdGlvbnMiLCJpZCIsIm5vZGUiLCJkb2N1bWVudCIsImNyZWF0ZUVsZW1lbnQiLCJjbGFzc05hbWUiLCJsYXlvdXQiLCJ0aXRsZSIsImRlZmF1bHRUaXRsZSIsImljb24iLCJkZWZhdWx0SWNvbiIsImRvY2tJZCIsImRlZmF1bHREb2NrSWQiLCJjcmVhdGVEZWZhdWx0UGFyYW1ldGVycyIsInJlbmRlciIsInVubW91bnRDb21wb25lbnRBdE5vZGUiLCJXaW5kb3dDb250YWluZXIiLCJoYW5kbGVGb2N1cyIsImZvY3VzT25XaW5kb3ciLCJ3aW5kb3ciLCJtb3VudFdpbmRvdyIsInByb3BzIiwiY3VycmVudCIsIm5leHRQcm9wcyIsInVubW91bnRXaW5kb3ciLCJyZWZzIiwicm9vdCIsImFwcGVuZENoaWxkIiwiY29udGFpbmVyIiwicmVtb3ZlQ2hpbGQiLCJjbGllbnRXaWR0aCIsImNsaWVudEhlaWdodCIsInN0eWxlIiwic2V2ZXJpdHkiLCJtZXNzYWdlIiwiZnJvbSIsImNvbnRlbnQiLCJhcmd1bWVudHMiLCJsZW5ndGgiLCJBcnJheSIsInByb3RvdHlwZSIsInNsaWNlIiwiY2FsbCIsImVycm9yIiwibG9nIiwiYXBwbGljYXRpb24iLCJzZXRFbnYiLCJ3aW5kb3dDbGFzc0lEIiwib3BlblN1YldpbmRvdyIsImNsb3NlU3ViV2luZG93IiwicmVtb3ZlV2luZG93Il0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7cWpCQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQUNBOzs7O0FBQ0E7Ozs7QUFFQTs7Ozs7Ozs7Ozs7O0lBUWFBLFcsV0FBQUEsVztBQVlYLHVCQUFZQyxJQUFaLEVBQTBCQyxJQUExQixFQUF3Q0MsV0FBeEMsRUFBa0U7QUFBQTs7QUFBQTs7QUFBQSxTQUhsRUMsT0FHa0UsR0FIN0IsRUFHNkI7O0FBQ2hFRixZQUFRRyxPQUFPQyxJQUFQLENBQVlKLElBQVosRUFBa0JLLE9BQWxCLENBQTBCO0FBQUEsYUFBTyxNQUFLQyxHQUFMLElBQVlOLEtBQUtNLEdBQUwsQ0FBbkI7QUFBQSxLQUExQixDQUFSO0FBQ0EsU0FBS1AsSUFBTCxHQUFZQSxJQUFaO0FBQ0EsU0FBS1EsUUFBTCxHQUFnQixLQUFLQSxRQUFMLElBQWlCLE1BQWpDO0FBQ0EsU0FBS04sV0FBTCxHQUFtQkEsV0FBbkI7QUFDQU8sWUFBUUMsTUFBUixDQUFlLDBCQUFjLEtBQUtDLFNBQW5CLEVBQThCQyxlQUE5QixDQUFmLEVBQ0UsVUFERixFQUNjLEtBQUtaLElBRG5CLEVBQ3lCLHFDQUR6QjtBQUVELEcsQ0Fmb0M7Ozs7OzRCQWdCN0JhLEksRUFBYztBQUNwQixVQUFJLENBQUMsS0FBS0MsS0FBVixFQUFpQixLQUFLQSxLQUFMLEdBQWEsQ0FBQ0QsSUFBRCxDQUFiLENBQWpCLEtBQ0ssS0FBS0MsS0FBTCxDQUFXQyxJQUFYLENBQWdCRixJQUFoQjtBQUNOOzs7NENBQ3VCRyxRLEVBQWtDO0FBQ3hELFVBQU1DLHNCQUFjLEtBQUtDLGlCQUFuQixDQUFOO0FBQ0EsV0FBS0osS0FBTCxJQUFjLEtBQUtBLEtBQUwsQ0FBV1IsT0FBWCxDQUFtQixjQUFNO0FBQ3JDVyxlQUFPRSxHQUFHQyxLQUFWLElB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LWRpc2FibGUgbm8tdXNlLWJlZm9yZS1kZWZpbmUgKi9cclxuLyogZXNsaW50LWRpc2FibGUgcmVhY3Qvbm8tbXVsdGktY29tcCAqL1xyXG4vKiBlc2xpbnQtZGlzYWJsZSByZWFjdC9wcm9wLXR5cGVzICovXHJcbi8qIGVzbGludC1kaXNhYmxlIHJlYWN0L25vLXN0cmluZy1yZWZzICovXHJcbi8qIGVzbGludC1kaXNhYmxlIHJlYWN0L3NvcnQtY29tcCAqL1xyXG5pbXBvcnQgUmVhY3QsIHsgQ29tcG9uZW50IH0gZnJvbSBcInJlYWN0XCJcclxuaW1wb3J0IFJlYWN0RE9NIGZyb20gXCJyZWFjdC1kb21cIlxyXG5cclxuaW1wb3J0IHsgaXNJbmhlcml0ZWRPZiB9IGZyb20gXCIuLi91dGlsc1wiXHJcblxyXG5leHBvcnQgdHlwZSBXaW5kb3dPcHRpb25zID0ge1xyXG4gIHRpdGxlOiBzdHJpbmcsXHJcbiAgZG9ja0lkOiBEb2NrSUQsXHJcbiAgcGFyYW1ldGVyczogeyBbc3RyaW5nXTogYW55IH0sXHJcbn1cclxuXHJcbmV4cG9ydCBjbGFzcyBXaW5kb3dDbGFzcyB7XHJcbiAgbmFtZTogc3RyaW5nXHJcbiAgb3ZlcmZsb3c6IHN0cmluZ1xyXG4gIGtlZXBBbGl2ZTogYm9vbGVhblxyXG4gIGNvbXBvbmVudDogRnVuY3Rpb248V2luZG93Q29tcG9uZW50PiAvLyBjb25zdHJ1Y3RvciBvZiBXaW5kb3dDb21wb25lbnRcclxuICBkZWZhdWx0VGl0bGU6IHN0cmluZ1xyXG4gIGRlZmF1bHREb2NrSWQ6IERvY2tJRFxyXG4gIGRlZmF1bHRQYXJhbWV0ZXJzOiBPYmplY3RcclxuXHJcbiAgd2luZG93czogeyBbc3RyaW5nXTogV2luZG93Q2xhc3MgfSA9IHt9XHJcbiAgbGlua3M6IEFycmF5PFBhcmFtZXRlckxpbms+XHJcblxyXG4gIGNvbnN0cnVjdG9yKG5hbWU6IHN0cmluZywgZGVzYzogT2JqZWN0LCBwbHVnaW5DbGFzczogUGx1Z2luQ2xhc3MpIHtcclxuICAgIGRlc2MgJiYgT2JqZWN0LmtleXMoZGVzYykuZm9yRWFjaChrZXkgPT4gdGhpc1trZXldID0gZGVzY1trZXldKVxyXG4gICAgdGhpcy5uYW1lID0gbmFtZVxyXG4gICAgdGhpcy5vdmVyZmxvdyA9IHRoaXMub3ZlcmZsb3cgfHwgXCJhdXRvXCJcclxuICAgIHRoaXMucGx1Z2luQ2xhc3MgPSBwbHVnaW5DbGFzc1xyXG4gICAgY29uc29sZS5hc3NlcnQoaXNJbmhlcml0ZWRPZih0aGlzLmNvbXBvbmVudCwgV2luZG93Q29tcG9uZW50KSxcclxuICAgICAgXCJXaW5kb3cgJ1wiLCB0aGlzLm5hbWUsIFwiJyBzaGFsbCBiZSBiYXNlZCBvbiBXaW5kb3dDb21wb25lbnRcIilcclxuICB9XHJcbiAgYWRkTGluayhsaW5rOiBPYmplY3QpIHtcclxuICAgIGlmICghdGhpcy5saW5rcykgdGhpcy5saW5rcyA9IFtsaW5rXVxyXG4gICAgZWxzZSB0aGlzLmxpbmtzLnB1c2gobGluaylcclxuICB9XHJcbiAgY3JlYXRlRGVmYXVsdFBhcmFtZXRlcnMoaW5zdGFuY2U6IFdpbmRvd0luc3RhbmNlKTogT2JqZWN0IHtcclxuICAgIGNvbnN0IHBhcmFtcyA9IHsgLi4udGhpcy5kZWZhdWx0UGFyYW1ldGVycyB9XHJcbiAgICB0aGlzLmxpbmtzICYmIHRoaXMubGlua3MuZm9yRWFjaChsayA9PiB7XHJcbiAgICAgIHBhcmFtc1tsay5wYXJhbV0gPSBsay5wbHVnaW5DbGFzcy5pbnN0YW5jZVtsay5wYXRoXVxyXG4gICAgfSlcclxuICAgIHBhcmFtcy5pbnN0YW5jZSA9IGluc3RhbmNlXHJcbiAgICBwYXJhbXMub25DaGFuZ2UgPSBpbnN0YW5jZS5ub3RpZnlDaGFuZ2VcclxuICAgIHJldHVybiBwYXJhbXNcclxuICB9XHJcbn1cclxuXHJcbmV4cG9ydCBjbGFzcyBXaW5kb3dJbnN0YW5jZSB7XHJcbiAgLy8gRGVmaW5pdGlvblxyXG4gIGlkOiBzdHJpbmdcclxuICB3aW5kb3dDbGFzczogV2luZG93Q2xhc3NcclxuICBwYXJlbnQ6IFdpbmRvd0luc3RhbmNlXHJcbiAgcGx1Z2luOiBQbHVnaW5Db21wb25lbnRcclxuICBjb21wb25lbnQ6IFdpbmRvd0NvbXBvbmVudFxyXG4gIGNvbnRhaW5lcjogV2luZG93Q29udGFpbmVyXHJcbiAgbm9kZTogSHRtbEVsZW1lbnRcclxuXHJcbiAgLy8gT3B0aW9uc1xyXG4gIGRvY2tJZDogRG9ja0lEXHJcbiAgdGl0bGU6IHN0cmluZ1xyXG4gIGljb246IHN0cmluZ1xyXG4gIHBhcmFtZXRlcnM6IHsgW3N0cmluZ106IGFueSB9XHJcblxyXG4gIGNvbnN0cnVjdG9yKHdpbmRvd0lkOiBzdHJpbmcsIHdpbmRvd0NsYXNzOiBXaW5kb3dDbGFzcyxcclxuICAgIHBhcmVudDogV2luZG93SW5zdGFuY2UsIHBsdWdpbjogV2luZG93SW5zdGFuY2UsIG9wdGlvbnM6IFdpbmRvd09wdGlvbnNcclxuICApIHtcclxuICAgIHRoaXMuaWQgPSB3aW5kb3dJZFxyXG4gICAgdGhpcy53aW5kb3dDbGFzcyA9IHdpbmRvd0NsYXNzXHJcbiAgICB0aGlzLnBhcmVudCA9IHBhcmVudFxyXG4gICAgdGhpcy5wbHVnaW4gPSBwbHVnaW5cclxuICAgIHRoaXMuY29tcG9uZW50ID0gd2luZG93Q2xhc3MuY29tcG9uZW50XHJcbiAgICB0aGlzLm5vZGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpXHJcbiAgICB0aGlzLm5vZGUuY2xhc3NOYW1lID0gXCJwb3NpdGlvbi1yZWxhdGl2ZSB3aWR0aC0xMDAgaGVpZ2h0LTEwMCBvdmVyZmxvdy1cIiArIHdpbmRvd0NsYXNzLm92ZXJmbG93XHJcbiAgICB0aGlzLmxheW91dC53aW5kb3dzW3dpbmRvd0lkXSA9IHRoaXNcclxuICAgIHRoaXMudGl0bGUgPSB3aW5kb3dDbGFzcy5kZWZhdWx0VGl0bGVcclxuICAgIHRoaXMuaWNvbiA9IHdpbmRvd0NsYXNzLmRlZmF1bHRJY29uXHJcbiAgICB0aGlzLmRvY2tJZCA9IHdpbmRvd0NsYXNzLmRlZmF1bHREb2NrSWRcclxuICAgIHRoaXMucGFyYW1ldGVycyA9IHdpbmRvd0NsYXNzLmNyZWF0ZURlZmF1bHRQYXJhbWV0ZXJzKHRoaXMpXHJcbiAgICB0aGlzLnVwZGF0ZU9wdGlvbnMob3B0aW9ucylcclxuICB9XHJcbiAgdXBkYXRlT3B0aW9ucyhvcHRpb25zOiBXaW5kb3dPcHRpb25zKSB7XHJcbiAgICBpZiAob3B0aW9ucykge1xyXG4gICAgICBpZiAob3B0aW9ucy50aXRsZSkgdGhpcy50aXRsZSA9IG9wdGlvbnMudGl0bGVcclxuICAgICAgaWYgKG9wdGlvbnMuaWNvbikgdGhpcy5pY29uID0gb3B0aW9ucy5pY29uXHJcbiAgICAgIGlmIChvcHRpb25zLmRvY2tJZCkgdGhpcy5kb2NrSWQgPSBvcHRpb25zLmRvY2tJZFxyXG4gICAgICBpZiAob3B0aW9ucy5wYXJhbWV0ZXJzKSB7XHJcbiAgICAgICAgdGhpcy5wYXJhbWV0ZXJzID0ge1xyXG4gICAgICAgICAgLi4udGhpcy5wYXJhbWV0ZXJzLFxyXG4gICAgICAgICAgLi4ub3B0aW9ucy5wYXJhbWV0ZXJzLFxyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgfVxyXG4gICAgdGhpcy5yZW5kZXIoKVxyXG4gIH1cclxuICBjbG9zZSgpIHtcclxuICAgIFJlYWN0RE9NLnVubW91bnRDb21wb25lbnRBdE5vZGUodGhpcy5ub2RlKVxyXG4gIH1cclxuICBub3RpZnlGb2N1cygpIHtcclxuICB9XHJcbiAgbm90aWZ5Qmx1cigpIHtcclxuICB9XHJcbiAgbm90aWZ5Q2hhbmdlID0gKHBhcmFtZXRlcnMpID0+IHtcclxuICAgIHRoaXMudXBkYXRlT3B0aW9ucyh7IHBhcmFtZXRlcnMgfSlcclxuICB9XHJcbiAgcmVuZGVyKCkge1xyXG4gICAgUmVhY3RET00ucmVuZGVyKFJlYWN0LmNyZWF0ZUVsZW1lbnQodGhpcy5jb21wb25lbnQsIHRoaXMucGFyYW1ldGVycyksIHRoaXMubm9kZSlcclxuICB9XHJcbn1cclxuXHJcbmV4cG9ydCB0eXBlIFByb3BzVHlwZSA9IHtcclxuICBjdXJyZW50OiBXaW5kb3dJbnN0YW5jZSxcclxuICBjbGFzc05hbWU6IHN0cmluZyxcclxuICBzdHlsZTogYW55LFxyXG59XHJcblxyXG5leHBvcnQgY2xhc3MgV2luZG93Q29udGFpbmVyIGV4dGVuZHMgQ29tcG9uZW50PHZvaWQsIFByb3BzVHlwZSwgU3RhdGVUeXBlPiB7XHJcbiAgcHJvcHM6IFByb3BzVHlwZVxyXG4gIHdpbmRvdzogV2luZG93SW5zdGFuY2VcclxuXHJcbiAgY29tcG9uZW50RGlkTW91bnQoKSB7XHJcbiAgICB0aGlzLm1vdW50V2luZG93KHRoaXMucHJvcHMuY3VycmVudClcclxuICB9XHJcbiAgY29tcG9uZW50V2lsbFJlY2VpdmVQcm9wcyhuZXh0UHJvcHMpIHtcclxuICAgIGlmICh0aGlzLnByb3BzLmN1cnJlbnQgIT09IG5leHRQcm9wcy5jdXJyZW50KSB7XHJcbiAgICAgIHRoaXMudW5tb3VudFdpbmRvdygpXHJcbiAgICAgIHRoaXMubW91bnRXaW5kb3cobmV4dFByb3BzLmN1cnJlbnQpXHJcbiAgICB9XHJcbiAgfVxyXG4gIGNvbXBvbmVudFdpbGxVbm1vdW50KCkge1xyXG4gICAgdGhpcy51bm1vdW50V2luZG93KClcclxuICB9XHJcbiAgbW91bnRXaW5kb3cod2luZG93KSB7XHJcbiAgICB0aGlzLndpbmRvdyA9IHdpbmRvd1xyXG4gICAgaWYgKHdpbmRvdykge1xyXG4gICAgICB0aGlzLnJlZnMucm9vdC5hcHBlbmRDaGlsZCh3aW5kb3cubm9kZSlcclxuICAgICAgd2luZG93LmNvbnRhaW5lciA9IHRoaXNcclxuICAgIH1cclxuICB9XHJcbiAgdW5tb3VudFdpbmRvdygpIHtcclxuICAgIGlmICh0aGlzLndpbmRvdyAmJiB0aGlzLndpbmRvdy5jb250YWluZXIgPT09IHRoaXMpIHtcclxuICAgICAgdGhpcy5yZWZzLnJvb3QucmVtb3ZlQ2hpbGQodGhpcy53aW5kb3cubm9kZSlcclxuICAgICAgdGhpcy53aW5kb3cuY29udGFpbmVyID0gbnVsbFxyXG4gICAgfVxyXG4gIH1cclxuICB3aWR0aCgpIHtcclxuICAgIHJldHVybiB0aGlzLnJlZnMucm9vdCAmJiB0aGlzLnJlZnMucm9vdC5jbGllbnRXaWR0aFxyXG4gIH1cclxuICBoZWlnaHQoKSB7XHJcbiAgICByZXR1cm4gdGhpcy5yZWZzLnJvb3QgJiYgdGhpcy5yZWZzLnJvb3QuY2xpZW50SGVpZ2h0XHJcbiAgfVxyXG4gIGhhbmRsZUZvY3VzID0gKCkgPT4ge1xyXG4gICAgdGhpcy5sYXlvdXQuZm9jdXNPbldpbmRvdyh0aGlzLndpbmRvdylcclxuICB9XHJcbiAgcmVuZGVyKCkge1xyXG4gICAgY29uc3QgeyBjbGFzc05hbWUsIHN0eWxlIH0gPSB0aGlzLnByb3BzXHJcbiAgICByZXR1cm4gKDxkaXZcclxuICAgICAgcmVmPVwicm9vdFwiXHJcbiAgICAgIHRhYkluZGV4PXsxfVxyXG4gICAgICBjbGFzc05hbWU9e2NsYXNzTmFtZX1cclxuICAgICAgc3R5bGU9e3N0eWxlfVxyXG4gICAgICBvbkZvY3VzPXt0aGlzLmhhbmRsZUZvY3VzfVxyXG4gICAgLz4pXHJcbiAgfVxyXG59XHJcblxyXG5leHBvcnQgY2xhc3MgV2luZG93Q29tcG9uZW50PERlZmF1bHRQcm9wcywgUHJvcHMsIFN0YXRlPlxyXG4gIGV4dGVuZHMgQ29tcG9uZW50PERlZmF1bHRQcm9wcywgUHJvcHMsIFN0YXRlPlxyXG57XHJcbiAgaW5zdGFuY2U6IFdpbmRvd0luc3RhbmNlXHJcbiAgcGx1Z2luOiBQbHVnaW5Db21wb25lbnRcclxuXHJcbiAgY29uc3RydWN0b3IocHJvcHMpIHtcclxuICAgIHN1cGVyKHByb3BzKVxyXG4gICAgdGhpcy5pbnN0YW5jZSA9IHByb3BzLmluc3RhbmNlXHJcbiAgICB0aGlzLnBsdWdpbiA9IHByb3BzLmluc3RhbmNlLnBsdWdpblxyXG4gIH1cclxuICBpc1dpbmRvdygpIHtcclxuICAgIHJldHVybiB0cnVlXHJcbiAgfVxyXG4gIGxvZyhzZXZlcml0eSkge1xyXG4gICAgY29uc3QgbWVzc2FnZSA9IHtcclxuICAgICAgc2V2ZXJpdHk6IHNldmVyaXR5LFxyXG4gICAgICBmcm9tOiB0aGlzLnByb3BzICYmIHRoaXMucHJvcHMud2luZG93ICYmIHRoaXMucHJvcHMud2luZG93LnRpdGxlLFxyXG4gICAgICBjb250ZW50OiBhcmd1bWVudHNbMV0sXHJcbiAgICB9XHJcbiAgICBpZiAoYXJndW1lbnRzLmxlbmd0aCA+IDEpIHtcclxuICAgICAgbWVzc2FnZS5jb250ZW50ID0gQXJyYXkucHJvdG90eXBlLnNsaWNlLmNhbGwoYXJndW1lbnRzLCAxKVxyXG4gICAgfVxyXG4gICAgaWYgKHNldmVyaXR5ID09PSBcImVycm9yXCIpIGNvbnNvbGUuZXJyb3IoLi4ubWVzc2FnZS5jb250ZW50KVxyXG4gICAgZWxzZSBjb25zb2xlLmxvZyguLi5tZXNzYWdlLmNvbnRlbnQpXHJcbiAgICB0aGlzLnBsdWdpbi5hcHBsaWNhdGlvbi5zZXRFbnYoXCJjb25zb2xlLmRlYnVnXCIsIG1lc3NhZ2UpXHJcbiAgfVxyXG4gIG9wZW5XaW5kb3cod2luZG93Q2xhc3NJRDogc3RyaW5nLCBvcHRpb25zOiBXaW5kb3dPcHRpb25zKSB7XHJcbiAgICBjb25zdCB7IGxheW91dCB9ID0gdGhpcy5pbnN0YW5jZVxyXG4gICAgbGF5b3V0Lm9wZW5TdWJXaW5kb3codGhpcy53aW5kb3dDbGFzcy53aW5kb3dzW3dpbmRvd0NsYXNzSURdLCB0aGlzLCBvcHRpb25zKVxyXG4gIH1cclxuICBjbG9zZVdpbmRvdyh3aW5kb3dDbGFzc0lEOiBzdHJpbmcpIHtcclxuICAgIGNvbnN0IHsgbGF5b3V0IH0gPSB0aGlzLmluc3RhbmNlXHJcbiAgICBpZiAod2luZG93Q2xhc3NJRCkge1xyXG4gICAgICBsYXlvdXQuY2xvc2VTdWJXaW5kb3codGhpcy53aW5kb3dDbGFzcy53aW5kb3dzW3dpbmRvd0NsYXNzSURdLCB0aGlzKVxyXG4gICAgfVxyXG4gICAgZWxzZSB7XHJcbiAgICAgIGxheW91dC5yZW1vdmVXaW5kb3codGhpcy5pbnN0YW5jZSlcclxuICAgIH1cclxuICB9XHJcbn1cclxuIl19