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


var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _reactDom = require("react-dom");

var _reactDom2 = _interopRequireDefault(_reactDom);

var _utils = require("../utils");

var _application = require("../application");

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
      params.onChange = instance.handleChange;
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

    this.handleChange = function (parameters) {
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
    key: "openWindow",
    value: function openWindow(windowClassID, options) {
      this.layout.openSubWindow(this.windowClass.windows[windowClassID], this, options);
    }
  }, {
    key: "showWindow",
    value: function showWindow(windowID, options) {
      this.layout.showSubWindow(this.windows[windowID], this, options);
    }
  }, {
    key: "close",
    value: function close() {
      // TODO
    }
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

    return _ret = (_temp = (_this3 = _possibleConstructorReturn(this, (_ref = WindowContainer.__proto__ || Object.getPrototypeOf(WindowContainer)).call.apply(_ref, [this].concat(args))), _this3), _this3.state = { window: null }, _temp), _possibleConstructorReturn(_this3, _ret);
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
    key: "mountWindow",
    value: function mountWindow(window) {
      if (window) {
        this.refs.root.appendChild(window.node);
        window.container = this;
        this.setState({ window: window });
      } else {
        this.setState({ window: null });
      }
    }
  }, {
    key: "unmountWindow",
    value: function unmountWindow() {
      var window = this.state.window;

      if (window && window.container === this) {
        this.refs.root.removeChild(window.node);
        window.container = null;
      }
    }
  }, {
    key: "render",
    value: function render() {
      var _props = this.props,
          className = _props.className,
          style = _props.style;

      return _react2.default.createElement("div", { ref: "root", className: className, style: style });
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
      _application.Application.setEnv("console.debug", message);
    }
    // eslint-disable-next-line no-unused-vars

  }, {
    key: "openWindow",
    value: function openWindow(windowClassID, options) {
      var window = this.props.window;
      window.openWindow.apply(window, arguments);
    }
    // eslint-disable-next-line no-unused-vars

  }, {
    key: "closeWindow",
    value: function closeWindow(windowId) {
      var window = this.props.window;
      window.closeWindow.apply(window, arguments);
    }
  }]);

  return WindowComponent;
}(_react.Component);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9saWIvbGF5b3V0L1dpbmRvdy5qcyJdLCJuYW1lcyI6WyJXaW5kb3dDbGFzcyIsIm5hbWUiLCJkZXNjIiwicGx1Z2luQ2xhc3MiLCJ3aW5kb3dzIiwiT2JqZWN0Iiwia2V5cyIsImZvckVhY2giLCJrZXkiLCJvdmVyZmxvdyIsImNvbnNvbGUiLCJhc3NlcnQiLCJjb21wb25lbnQiLCJXaW5kb3dDb21wb25lbnQiLCJsaW5rIiwibGlua3MiLCJwdXNoIiwiaW5zdGFuY2UiLCJwYXJhbXMiLCJkZWZhdWx0UGFyYW1ldGVycyIsImxrIiwicGFyYW0iLCJwYXRoIiwib25DaGFuZ2UiLCJoYW5kbGVDaGFuZ2UiLCJXaW5kb3dJbnN0YW5jZSIsIndpbmRvd0lkIiwid2luZG93Q2xhc3MiLCJwYXJlbnQiLCJwbHVnaW4iLCJvcHRpb25zIiwicGFyYW1ldGVycyIsInVwZGF0ZU9wdGlvbnMiLCJpZCIsIm5vZGUiLCJkb2N1bWVudCIsImNyZWF0ZUVsZW1lbnQiLCJjbGFzc05hbWUiLCJsYXlvdXQiLCJ0aXRsZSIsImRlZmF1bHRUaXRsZSIsImljb24iLCJkZWZhdWx0SWNvbiIsImRvY2tJZCIsImRlZmF1bHREb2NrSWQiLCJjcmVhdGVEZWZhdWx0UGFyYW1ldGVycyIsInJlbmRlciIsIndpbmRvd0NsYXNzSUQiLCJvcGVuU3ViV2luZG93Iiwid2luZG93SUQiLCJzaG93U3ViV2luZG93IiwiV2luZG93Q29udGFpbmVyIiwic3RhdGUiLCJ3aW5kb3ciLCJtb3VudFdpbmRvdyIsInByb3BzIiwiY3VycmVudCIsIm5leHRQcm9wcyIsInVubW91bnRXaW5kb3ciLCJyZWZzIiwicm9vdCIsImNsaWVudFdpZHRoIiwiY2xpZW50SGVpZ2h0IiwiYXBwZW5kQ2hpbGQiLCJjb250YWluZXIiLCJzZXRTdGF0ZSIsInJlbW92ZUNoaWxkIiwic3R5bGUiLCJzZXZlcml0eSIsIm1lc3NhZ2UiLCJmcm9tIiwiY29udGVudCIsImFyZ3VtZW50cyIsImxlbmd0aCIsIkFycmF5IiwicHJvdG90eXBlIiwic2xpY2UiLCJjYWxsIiwiZXJyb3IiLCJsb2ciLCJzZXRFbnYiLCJvcGVuV2luZG93IiwiYXBwbHkiLCJjbG9zZVdpbmRvdyJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O3FqQkFBQTtBQUNBO0FBQ0E7QUFDQTs7O0FBQ0E7Ozs7QUFDQTs7OztBQUVBOztBQUNBOzs7Ozs7Ozs7Ozs7SUFXYUEsVyxXQUFBQSxXO0FBWVgsdUJBQVlDLElBQVosRUFBMEJDLElBQTFCLEVBQXdDQyxXQUF4QyxFQUFrRTtBQUFBOztBQUFBOztBQUFBLFNBSGxFQyxPQUdrRSxHQUh0QixFQUdzQjs7QUFDaEVGLFlBQVFHLE9BQU9DLElBQVAsQ0FBWUosSUFBWixFQUFrQkssT0FBbEIsQ0FBMEI7QUFBQSxhQUFPLE1BQUtDLEdBQUwsSUFBWU4sS0FBS00sR0FBTCxDQUFuQjtBQUFBLEtBQTFCLENBQVI7QUFDQSxTQUFLUCxJQUFMLEdBQVlBLElBQVo7QUFDQSxTQUFLUSxRQUFMLEdBQWdCLEtBQUtBLFFBQUwsSUFBaUIsTUFBakM7QUFDQSxTQUFLTixXQUFMLEdBQW1CQSxXQUFuQjtBQUNBTyxZQUFRQyxNQUFSLENBQWUsMEJBQWMsS0FBS0MsU0FBbkIsRUFBOEJDLGVBQTlCLENBQWYsRUFDRSxVQURGLEVBQ2MsS0FBS1osSUFEbkIsRUFDeUIscUNBRHpCO0FBRUQsRyxDQWZvQzs7Ozs7NEJBZ0I3QmEsSSxFQUFjO0FBQ3BCLFVBQUksQ0FBQyxLQUFLQyxLQUFWLEVBQWlCLEtBQUtBLEtBQUwsR0FBYSxDQUFFRCxJQUFGLENBQWIsQ0FBakIsS0FDSyxLQUFLQyxLQUFMLENBQVdDLElBQVgsQ0FBZ0JGLElBQWhCO0FBQ047Ozs0Q0FDdUJHLFEsRUFBa0M7QUFDeEQsVUFBTUMsc0JBQWMsS0FBS0MsaUJBQW5CLENBQU47QUFDQSxXQUFLSixLQUFMLElBQWMsS0FBS0EsS0FBTCxDQUFXUixPQUFYLENBQW1CLGNBQU07QUFDckNXLGVBQU9FLEdBQUdDLEtBQVYsSUFBbUJELEdBQUdqQixXQUFILENB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Ii8qIGVzbGludC1kaXNhYmxlIG5vLXVzZS1iZWZvcmUtZGVmaW5lICovXHJcbi8qIGVzbGludC1kaXNhYmxlIHJlYWN0L25vLW11bHRpLWNvbXAgKi9cclxuLyogZXNsaW50LWRpc2FibGUgcmVhY3QvcHJvcC10eXBlcyAqL1xyXG4vKiBlc2xpbnQtZGlzYWJsZSByZWFjdC9uby1zdHJpbmctcmVmcyAqL1xyXG5pbXBvcnQgUmVhY3QsIHsgQ29tcG9uZW50IH0gZnJvbSBcInJlYWN0XCJcclxuaW1wb3J0IFJlYWN0RE9NIGZyb20gXCJyZWFjdC1kb21cIlxyXG5cclxuaW1wb3J0IHsgaXNJbmhlcml0ZWRPZiB9IGZyb20gXCIuLi91dGlsc1wiXHJcbmltcG9ydCB7IEFwcGxpY2F0aW9uIH0gZnJvbSBcIi4uL2FwcGxpY2F0aW9uXCJcclxuXHJcbmV4cG9ydCB0eXBlIFdpbmRvd0lEID0gc3RyaW5nXHJcbmV4cG9ydCB0eXBlIFdpbmRvd0NsYXNzSUQgPSBzdHJpbmdcclxuXHJcbmV4cG9ydCB0eXBlIFdpbmRvd09wdGlvbnMgPSB7XHJcbiAgdGl0bGU6IHN0cmluZyxcclxuICBkb2NrSWQ6IERvY2tJRCxcclxuICBwYXJhbWV0ZXJzOiB7IFtzdHJpbmddOiBhbnkgfSxcclxufVxyXG5cclxuZXhwb3J0IGNsYXNzIFdpbmRvd0NsYXNzIHtcclxuICBuYW1lOiBzdHJpbmdcclxuICBvdmVyZmxvdzogc3RyaW5nXHJcbiAga2VlcEFsaXZlOiBib29sZWFuXHJcbiAgY29tcG9uZW50OiBGdW5jdGlvbjxXaW5kb3dDb21wb25lbnQ+IC8vIGNvbnN0cnVjdG9yIG9mIFdpbmRvd0NvbXBvbmVudFxyXG4gIGRlZmF1bHRUaXRsZTogc3RyaW5nXHJcbiAgZGVmYXVsdERvY2tJZDogRG9ja0lEXHJcbiAgZGVmYXVsdFBhcmFtZXRlcnM6IE9iamVjdFxyXG5cclxuICB3aW5kb3dzOiB7IFtXaW5kb3dDbGFzc0lEXTogV2luZG93Q2xhc3MgfSA9IHt9XHJcbiAgbGlua3M6IEFycmF5PFBhcmFtZXRlckxpbms+XHJcblxyXG4gIGNvbnN0cnVjdG9yKG5hbWU6IHN0cmluZywgZGVzYzogT2JqZWN0LCBwbHVnaW5DbGFzczogUGx1Z2luQ2xhc3MpIHtcclxuICAgIGRlc2MgJiYgT2JqZWN0LmtleXMoZGVzYykuZm9yRWFjaChrZXkgPT4gdGhpc1trZXldID0gZGVzY1trZXldKVxyXG4gICAgdGhpcy5uYW1lID0gbmFtZVxyXG4gICAgdGhpcy5vdmVyZmxvdyA9IHRoaXMub3ZlcmZsb3cgfHwgXCJhdXRvXCJcclxuICAgIHRoaXMucGx1Z2luQ2xhc3MgPSBwbHVnaW5DbGFzc1xyXG4gICAgY29uc29sZS5hc3NlcnQoaXNJbmhlcml0ZWRPZih0aGlzLmNvbXBvbmVudCwgV2luZG93Q29tcG9uZW50KSxcclxuICAgICAgXCJXaW5kb3cgJ1wiLCB0aGlzLm5hbWUsIFwiJyBzaGFsbCBiZSBiYXNlZCBvbiBXaW5kb3dDb21wb25lbnRcIilcclxuICB9XHJcbiAgYWRkTGluayhsaW5rOiBPYmplY3QpIHtcclxuICAgIGlmICghdGhpcy5saW5rcykgdGhpcy5saW5rcyA9IFsgbGluayBdXHJcbiAgICBlbHNlIHRoaXMubGlua3MucHVzaChsaW5rKVxyXG4gIH1cclxuICBjcmVhdGVEZWZhdWx0UGFyYW1ldGVycyhpbnN0YW5jZTogV2luZG93SW5zdGFuY2UpOiBPYmplY3Qge1xyXG4gICAgY29uc3QgcGFyYW1zID0geyAuLi50aGlzLmRlZmF1bHRQYXJhbWV0ZXJzIH1cclxuICAgIHRoaXMubGlua3MgJiYgdGhpcy5saW5rcy5mb3JFYWNoKGxrID0+IHtcclxuICAgICAgcGFyYW1zW2xrLnBhcmFtXSA9IGxrLnBsdWdpbkNsYXNzLmluc3RhbmNlW2xrLnBhdGhdXHJcbiAgICB9KVxyXG4gICAgcGFyYW1zLmluc3RhbmNlID0gaW5zdGFuY2VcclxuICAgIHBhcmFtcy5vbkNoYW5nZSA9IGluc3RhbmNlLmhhbmRsZUNoYW5nZVxyXG4gICAgcmV0dXJuIHBhcmFtc1xyXG4gIH1cclxufVxyXG5cclxuZXhwb3J0IGNsYXNzIFdpbmRvd0luc3RhbmNlIHtcclxuICAvLyBEZWZpbml0aW9uXHJcbiAgaWQ6IFdpbmRvd0lEXHJcbiAgd2luZG93Q2xhc3M6IFdpbmRvd0NsYXNzXHJcbiAgcGFyZW50OiBXaW5kb3dJbnN0YW5jZVxyXG4gIHBsdWdpbjogUGx1Z2luSW5zdGFuY2VcclxuICBjb21wb25lbnQ6IFdpbmRvd0NvbXBvbmVudFxyXG4gIGNvbnRhaW5lcjogV2luZG93Q29udGFpbmVyXHJcbiAgbm9kZTogSHRtbEVsZW1lbnRcclxuXHJcbiAgLy8gT3B0aW9uc1xyXG4gIGRvY2tJZDogRG9ja0lEXHJcbiAgdGl0bGU6IHN0cmluZ1xyXG4gIGljb246IHN0cmluZ1xyXG4gIHBhcmFtZXRlcnM6IHsgW3N0cmluZ106IGFueSB9XHJcblxyXG4gIGNvbnN0cnVjdG9yKHdpbmRvd0lkOiBXaW5kb3dJRCwgd2luZG93Q2xhc3M6IFdpbmRvd0NsYXNzLFxyXG4gICAgcGFyZW50OiBXaW5kb3dJbnN0YW5jZSwgcGx1Z2luOiBXaW5kb3dJbnN0YW5jZSwgb3B0aW9uczogV2luZG93T3B0aW9uc1xyXG4gICkge1xyXG4gICAgdGhpcy5pZCA9IHdpbmRvd0lkXHJcbiAgICB0aGlzLndpbmRvd0NsYXNzID0gd2luZG93Q2xhc3NcclxuICAgIHRoaXMucGFyZW50ID0gcGFyZW50XHJcbiAgICB0aGlzLnBsdWdpbiA9IHBsdWdpblxyXG4gICAgdGhpcy5jb21wb25lbnQgPSB3aW5kb3dDbGFzcy5jb21wb25lbnRcclxuICAgIHRoaXMubm9kZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIilcclxuICAgIHRoaXMubm9kZS5jbGFzc05hbWUgPSBcInBvc2l0aW9uLXJlbGF0aXZlIHdpZHRoLTEwMCBoZWlnaHQtMTAwIG92ZXJmbG93LVwiK3dpbmRvd0NsYXNzLm92ZXJmbG93XHJcbiAgICB0aGlzLmxheW91dC53aW5kb3dzW3dpbmRvd0lkXSA9IHRoaXNcclxuICAgIHRoaXMudGl0bGUgPSB3aW5kb3dDbGFzcy5kZWZhdWx0VGl0bGVcclxuICAgIHRoaXMuaWNvbiA9IHdpbmRvd0NsYXNzLmRlZmF1bHRJY29uXHJcbiAgICB0aGlzLmRvY2tJZCA9IHdpbmRvd0NsYXNzLmRlZmF1bHREb2NrSWRcclxuICAgIHRoaXMucGFyYW1ldGVycyA9IHdpbmRvd0NsYXNzLmNyZWF0ZURlZmF1bHRQYXJhbWV0ZXJzKHRoaXMpXHJcbiAgICB0aGlzLnVwZGF0ZU9wdGlvbnMob3B0aW9ucylcclxuICB9XHJcbiAgdXBkYXRlT3B0aW9ucyhvcHRpb25zOiBXaW5kb3dPcHRpb25zKSB7XHJcbiAgICBpZiAob3B0aW9ucykge1xyXG4gICAgICBpZiAob3B0aW9ucy50aXRsZSkgdGhpcy50aXRsZSA9IG9wdGlvbnMudGl0bGVcclxuICAgICAgaWYgKG9wdGlvbnMuaWNvbikgdGhpcy5pY29uID0gb3B0aW9ucy5pY29uXHJcbiAgICAgIGlmIChvcHRpb25zLmRvY2tJZCkgdGhpcy5kb2NrSWQgPSBvcHRpb25zLmRvY2tJZFxyXG4gICAgICBpZiAob3B0aW9ucy5wYXJhbWV0ZXJzKSB7XHJcbiAgICAgICAgdGhpcy5wYXJhbWV0ZXJzID0ge1xyXG4gICAgICAgICAgLi4udGhpcy5wYXJhbWV0ZXJzLFxyXG4gICAgICAgICAgLi4ub3B0aW9ucy5wYXJhbWV0ZXJzLFxyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgfVxyXG4gICAgdGhpcy5yZW5kZXIoKVxyXG4gIH1cclxuICBvcGVuV2luZG93KHdpbmRvd0NsYXNzSUQ6IFdpbmRvd0NsYXNzSUQsIG9wdGlvbnM6IFdpbmRvd09wdGlvbnMpIHtcclxuICAgIHRoaXMubGF5b3V0Lm9wZW5TdWJXaW5kb3codGhpcy53aW5kb3dDbGFzcy53aW5kb3dzW3dpbmRvd0NsYXNzSURdLCB0aGlzLCBvcHRpb25zKVxyXG4gIH1cclxuICBzaG93V2luZG93KHdpbmRvd0lEOiBXaW5kb3dJRCwgb3B0aW9uczogV2luZG93T3B0aW9ucyk6IFdpbmRvd0lEIHtcclxuICAgIHRoaXMubGF5b3V0LnNob3dTdWJXaW5kb3codGhpcy53aW5kb3dzW3dpbmRvd0lEXSwgdGhpcywgb3B0aW9ucylcclxuICB9XHJcbiAgY2xvc2UoKSB7XHJcbiAgICAvLyBUT0RPXHJcbiAgfVxyXG4gIGhhbmRsZUNoYW5nZSA9IChwYXJhbWV0ZXJzKSA9PiB7XHJcbiAgICB0aGlzLnVwZGF0ZU9wdGlvbnMoeyBwYXJhbWV0ZXJzIH0pXHJcbiAgfVxyXG4gIHJlbmRlcigpIHtcclxuICAgIFJlYWN0RE9NLnJlbmRlcihSZWFjdC5jcmVhdGVFbGVtZW50KHRoaXMuY29tcG9uZW50LCB0aGlzLnBhcmFtZXRlcnMpLCB0aGlzLm5vZGUpXHJcbiAgfVxyXG59XHJcblxyXG5leHBvcnQgdHlwZSBQcm9wc1R5cGUgPSB7XHJcbiAgY3VycmVudDogV2luZG93SW5zdGFuY2UsXHJcbiAgY2xhc3NOYW1lOiBzdHJpbmcsXHJcbiAgc3R5bGU6IGFueSxcclxufVxyXG5cclxuZXhwb3J0IHR5cGUgU3RhdGVUeXBlID0ge1xyXG4gIHdpbmRvdzogV2luZG93SW5zdGFuY2UsXHJcbn1cclxuXHJcbmV4cG9ydCBjbGFzcyBXaW5kb3dDb250YWluZXIgZXh0ZW5kcyBDb21wb25lbnQ8dm9pZCwgUHJvcHNUeXBlLCBTdGF0ZVR5cGU+IHtcclxuICBwcm9wczogUHJvcHNUeXBlXHJcbiAgc3RhdGU6IFN0YXRlVHlwZSA9IHsgd2luZG93OiBudWxsIH1cclxuXHJcbiAgY29tcG9uZW50RGlkTW91bnQoKSB7XHJcbiAgICB0aGlzLm1vdW50V2luZG93KHRoaXMucHJvcHMuY3VycmVudClcclxuICB9XHJcbiAgY29tcG9uZW50V2lsbFJlY2VpdmVQcm9wcyhuZXh0UHJvcHMpIHtcclxuICAgIGlmICh0aGlzLnByb3BzLmN1cnJlbnQgIT09IG5leHRQcm9wcy5jdXJyZW50KSB7XHJcbiAgICAgIHRoaXMudW5tb3VudFdpbmRvdygpXHJcbiAgICAgIHRoaXMubW91bnRXaW5kb3cobmV4dFByb3BzLmN1cnJlbnQpXHJcbiAgICB9XHJcbiAgfVxyXG4gIGNvbXBvbmVudFdpbGxVbm1vdW50KCkge1xyXG4gICAgdGhpcy51bm1vdW50V2luZG93KClcclxuICB9XHJcbiAgd2lkdGgoKSB7XHJcbiAgICByZXR1cm4gdGhpcy5yZWZzLnJvb3QgJiYgdGhpcy5yZWZzLnJvb3QuY2xpZW50V2lkdGhcclxuICB9XHJcbiAgaGVpZ2h0KCkge1xyXG4gICAgcmV0dXJuIHRoaXMucmVmcy5yb290ICYmIHRoaXMucmVmcy5yb290LmNsaWVudEhlaWdodFxyXG4gIH1cclxuICBtb3VudFdpbmRvdyh3aW5kb3cpIHtcclxuICAgIGlmICh3aW5kb3cpIHtcclxuICAgICAgdGhpcy5yZWZzLnJvb3QuYXBwZW5kQ2hpbGQod2luZG93Lm5vZGUpXHJcbiAgICAgIHdpbmRvdy5jb250YWluZXIgPSB0aGlzXHJcbiAgICAgIHRoaXMuc2V0U3RhdGUoeyB3aW5kb3c6IHdpbmRvdyB9KVxyXG4gICAgfVxyXG4gICAgZWxzZSB7XHJcbiAgICAgIHRoaXMuc2V0U3RhdGUoeyB3aW5kb3c6IG51bGwgfSlcclxuICAgIH1cclxuICB9XHJcbiAgdW5tb3VudFdpbmRvdygpIHtcclxuICAgIGNvbnN0IHsgd2luZG93IH0gPSB0aGlzLnN0YXRlXHJcbiAgICBpZiAod2luZG93ICYmIHdpbmRvdy5jb250YWluZXIgPT09IHRoaXMpIHtcclxuICAgICAgdGhpcy5yZWZzLnJvb3QucmVtb3ZlQ2hpbGQod2luZG93Lm5vZGUpXHJcbiAgICAgIHdpbmRvdy5jb250YWluZXIgPSBudWxsXHJcbiAgICB9XHJcbiAgfVxyXG4gIHJlbmRlcigpIHtcclxuICAgIGNvbnN0IHsgY2xhc3NOYW1lLCBzdHlsZSB9ID0gdGhpcy5wcm9wc1xyXG4gICAgcmV0dXJuICg8ZGl2IHJlZj1cInJvb3RcIiBjbGFzc05hbWU9eyBjbGFzc05hbWUgfSBzdHlsZT17IHN0eWxlIH0gLz4pXHJcbiAgfVxyXG59XHJcblxyXG5leHBvcnQgY2xhc3MgV2luZG93Q29tcG9uZW50PERlZmF1bHRQcm9wcywgUHJvcHMsIFN0YXRlPlxyXG4gIGV4dGVuZHMgQ29tcG9uZW50PERlZmF1bHRQcm9wcywgUHJvcHMsIFN0YXRlPlxyXG57XHJcbiAgY29uc3RydWN0b3IocHJvcHMpIHtcclxuICAgIHN1cGVyKHByb3BzKVxyXG4gICAgdGhpcy5pbnN0YW5jZSA9IHByb3BzLmluc3RhbmNlXHJcbiAgICB0aGlzLnBsdWdpbiA9IHByb3BzLmluc3RhbmNlLnBsdWdpblxyXG4gIH1cclxuXHJcbiAgaW5zdGFuY2U6IFdpbmRvd0luc3RhbmNlXHJcbiAgcGx1Z2luOiBQbHVnaW5JbnN0YW5jZVxyXG5cclxuICBpc1dpbmRvdygpIHtcclxuICAgIHJldHVybiB0cnVlXHJcbiAgfVxyXG4gIGxvZyhzZXZlcml0eSkge1xyXG4gICAgY29uc3QgbWVzc2FnZSA9IHtcclxuICAgICAgc2V2ZXJpdHk6IHNldmVyaXR5LFxyXG4gICAgICBmcm9tOiB0aGlzLnByb3BzICYmIHRoaXMucHJvcHMud2luZG93ICYmIHRoaXMucHJvcHMud2luZG93LnRpdGxlLFxyXG4gICAgICBjb250ZW50OiBhcmd1bWVudHNbMV0sXHJcbiAgICB9XHJcbiAgICBpZiAoYXJndW1lbnRzLmxlbmd0aCA+IDEpIHtcclxuICAgICAgbWVzc2FnZS5jb250ZW50ID0gQXJyYXkucHJvdG90eXBlLnNsaWNlLmNhbGwoYXJndW1lbnRzLCAxKVxyXG4gICAgfVxyXG4gICAgaWYgKHNldmVyaXR5ID09PSBcImVycm9yXCIpIGNvbnNvbGUuZXJyb3IoLi4ubWVzc2FnZS5jb250ZW50KVxyXG4gICAgZWxzZSBjb25zb2xlLmxvZyguLi5tZXNzYWdlLmNvbnRlbnQpXHJcbiAgICBBcHBsaWNhdGlvbi5zZXRFbnYoXCJjb25zb2xlLmRlYnVnXCIsIG1lc3NhZ2UpXHJcbiAgfVxyXG4gIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby11bnVzZWQtdmFyc1xyXG4gIG9wZW5XaW5kb3cod2luZG93Q2xhc3NJRDogV2luZG93Q2xhc3NJRCwgb3B0aW9uczogV2luZG93T3B0aW9ucykge1xyXG4gICAgY29uc3Qgd2luZG93ID0gdGhpcy5wcm9wcy53aW5kb3dcclxuICAgIHdpbmRvdy5vcGVuV2luZG93LmFwcGx5KHdpbmRvdywgYXJndW1lbnRzKVxyXG4gIH1cclxuICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tdW51c2VkLXZhcnNcclxuICBjbG9zZVdpbmRvdyh3aW5kb3dJZDogV2luZG93SUQpIHtcclxuICAgIGNvbnN0IHdpbmRvdyA9IHRoaXMucHJvcHMud2luZG93XHJcbiAgICB3aW5kb3cuY2xvc2VXaW5kb3cuYXBwbHkod2luZG93LCBhcmd1bWVudHMpXHJcbiAgfVxyXG59XHJcbiJdfQ==