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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9BcHBsaWNhdGlvbi9sYXlvdXQvV2luZG93LmpzIl0sIm5hbWVzIjpbIldpbmRvd0NsYXNzIiwibmFtZSIsImRlc2MiLCJwbHVnaW5DbGFzcyIsIndpbmRvd3MiLCJPYmplY3QiLCJrZXlzIiwiZm9yRWFjaCIsImtleSIsIm92ZXJmbG93IiwiY29uc29sZSIsImFzc2VydCIsImNvbXBvbmVudCIsIldpbmRvd0NvbXBvbmVudCIsImxpbmsiLCJsaW5rcyIsInB1c2giLCJpbnN0YW5jZSIsInBhcmFtcyIsImRlZmF1bHRQYXJhbWV0ZXJzIiwibGsiLCJwYXJhbSIsInBhdGgiLCJvbkNoYW5nZSIsImhhbmRsZUNoYW5nZSIsIldpbmRvd0luc3RhbmNlIiwid2luZG93SWQiLCJ3aW5kb3dDbGFzcyIsInBhcmVudCIsInBsdWdpbiIsIm9wdGlvbnMiLCJwYXJhbWV0ZXJzIiwidXBkYXRlT3B0aW9ucyIsImlkIiwibm9kZSIsImRvY3VtZW50IiwiY3JlYXRlRWxlbWVudCIsImNsYXNzTmFtZSIsImxheW91dCIsInRpdGxlIiwiZGVmYXVsdFRpdGxlIiwiaWNvbiIsImRlZmF1bHRJY29uIiwiZG9ja0lkIiwiZGVmYXVsdERvY2tJZCIsImNyZWF0ZURlZmF1bHRQYXJhbWV0ZXJzIiwicmVuZGVyIiwid2luZG93Q2xhc3NJRCIsIm9wZW5TdWJXaW5kb3ciLCJ3aW5kb3dJRCIsInNob3dTdWJXaW5kb3ciLCJXaW5kb3dDb250YWluZXIiLCJzdGF0ZSIsIndpbmRvdyIsIm1vdW50V2luZG93IiwicHJvcHMiLCJjdXJyZW50IiwibmV4dFByb3BzIiwidW5tb3VudFdpbmRvdyIsInJlZnMiLCJyb290IiwiY2xpZW50V2lkdGgiLCJjbGllbnRIZWlnaHQiLCJhcHBlbmRDaGlsZCIsImNvbnRhaW5lciIsInNldFN0YXRlIiwicmVtb3ZlQ2hpbGQiLCJzdHlsZSIsInNldmVyaXR5IiwibWVzc2FnZSIsImZyb20iLCJjb250ZW50IiwiYXJndW1lbnRzIiwibGVuZ3RoIiwiQXJyYXkiLCJwcm90b3R5cGUiLCJzbGljZSIsImNhbGwiLCJlcnJvciIsImxvZyIsInNldEVudiIsIm9wZW5XaW5kb3ciLCJhcHBseSIsImNsb3NlV2luZG93Il0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7cWpCQUFBO0FBQ0E7QUFDQTtBQUNBOzs7QUFDQTs7OztBQUNBOzs7O0FBRUE7O0FBQ0E7Ozs7Ozs7Ozs7OztJQVdhQSxXLFdBQUFBLFc7QUFZWCx1QkFBWUMsSUFBWixFQUEwQkMsSUFBMUIsRUFBd0NDLFdBQXhDLEVBQWtFO0FBQUE7O0FBQUE7O0FBQUEsU0FIbEVDLE9BR2tFLEdBSHRCLEVBR3NCOztBQUNoRUYsWUFBUUcsT0FBT0MsSUFBUCxDQUFZSixJQUFaLEVBQWtCSyxPQUFsQixDQUEwQjtBQUFBLGFBQU8sTUFBS0MsR0FBTCxJQUFZTixLQUFLTSxHQUFMLENBQW5CO0FBQUEsS0FBMUIsQ0FBUjtBQUNBLFNBQUtQLElBQUwsR0FBWUEsSUFBWjtBQUNBLFNBQUtRLFFBQUwsR0FBZ0IsS0FBS0EsUUFBTCxJQUFpQixNQUFqQztBQUNBLFNBQUtOLFdBQUwsR0FBbUJBLFdBQW5CO0FBQ0FPLFlBQVFDLE1BQVIsQ0FBZSwwQkFBYyxLQUFLQyxTQUFuQixFQUE4QkMsZUFBOUIsQ0FBZixFQUNFLFVBREYsRUFDYyxLQUFLWixJQURuQixFQUN5QixxQ0FEekI7QUFFRCxHLENBZm9DOzs7Ozs0QkFnQjdCYSxJLEVBQWM7QUFDcEIsVUFBSSxDQUFDLEtBQUtDLEtBQVYsRUFBaUIsS0FBS0EsS0FBTCxHQUFhLENBQUVELElBQUYsQ0FBYixDQUFqQixLQUNLLEtBQUtDLEtBQUwsQ0FBV0MsSUFBWCxDQUFnQkYsSUFBaEI7QUFDTjs7OzRDQUN1QkcsUSxFQUFrQztBQUN4RCxVQUFNQyxzQkFBYyxLQUFLQyxpQkFBbkIsQ0FBTjtBQUNBLFdBQUtKLEtBQUwsSUFBYyxLQUFLQSxLQUFMLENBQVdSLE9BQVgsQ0FBbUIsY0FBTTtBQUNyQ1csZUFBT0UsR0FBR0MsS0FBVixJQUFtQkQsR0FBR2pC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bnRlbnQiOlsiLyogZXNsaW50LWRpc2FibGUgbm8tdXNlLWJlZm9yZS1kZWZpbmUgKi9cclxuLyogZXNsaW50LWRpc2FibGUgcmVhY3Qvbm8tbXVsdGktY29tcCAqL1xyXG4vKiBlc2xpbnQtZGlzYWJsZSByZWFjdC9wcm9wLXR5cGVzICovXHJcbi8qIGVzbGludC1kaXNhYmxlIHJlYWN0L25vLXN0cmluZy1yZWZzICovXHJcbmltcG9ydCBSZWFjdCwgeyBDb21wb25lbnQgfSBmcm9tIFwicmVhY3RcIlxyXG5pbXBvcnQgUmVhY3RET00gZnJvbSBcInJlYWN0LWRvbVwiXHJcblxyXG5pbXBvcnQgeyBpc0luaGVyaXRlZE9mIH0gZnJvbSBcIi4uL3V0aWxzXCJcclxuaW1wb3J0IHsgQXBwbGljYXRpb24gfSBmcm9tIFwiLi4vYXBwbGljYXRpb25cIlxyXG5cclxuZXhwb3J0IHR5cGUgV2luZG93SUQgPSBzdHJpbmdcclxuZXhwb3J0IHR5cGUgV2luZG93Q2xhc3NJRCA9IHN0cmluZ1xyXG5cclxuZXhwb3J0IHR5cGUgV2luZG93T3B0aW9ucyA9IHtcclxuICB0aXRsZTogc3RyaW5nLFxyXG4gIGRvY2tJZDogRG9ja0lELFxyXG4gIHBhcmFtZXRlcnM6IHsgW3N0cmluZ106IGFueSB9LFxyXG59XHJcblxyXG5leHBvcnQgY2xhc3MgV2luZG93Q2xhc3Mge1xyXG4gIG5hbWU6IHN0cmluZ1xyXG4gIG92ZXJmbG93OiBzdHJpbmdcclxuICBrZWVwQWxpdmU6IGJvb2xlYW5cclxuICBjb21wb25lbnQ6IEZ1bmN0aW9uPFdpbmRvd0NvbXBvbmVudD4gLy8gY29uc3RydWN0b3Igb2YgV2luZG93Q29tcG9uZW50XHJcbiAgZGVmYXVsdFRpdGxlOiBzdHJpbmdcclxuICBkZWZhdWx0RG9ja0lkOiBEb2NrSURcclxuICBkZWZhdWx0UGFyYW1ldGVyczogT2JqZWN0XHJcblxyXG4gIHdpbmRvd3M6IHsgW1dpbmRvd0NsYXNzSURdOiBXaW5kb3dDbGFzcyB9ID0ge31cclxuICBsaW5rczogQXJyYXk8UGFyYW1ldGVyTGluaz5cclxuXHJcbiAgY29uc3RydWN0b3IobmFtZTogc3RyaW5nLCBkZXNjOiBPYmplY3QsIHBsdWdpbkNsYXNzOiBQbHVnaW5DbGFzcykge1xyXG4gICAgZGVzYyAmJiBPYmplY3Qua2V5cyhkZXNjKS5mb3JFYWNoKGtleSA9PiB0aGlzW2tleV0gPSBkZXNjW2tleV0pXHJcbiAgICB0aGlzLm5hbWUgPSBuYW1lXHJcbiAgICB0aGlzLm92ZXJmbG93ID0gdGhpcy5vdmVyZmxvdyB8fCBcImF1dG9cIlxyXG4gICAgdGhpcy5wbHVnaW5DbGFzcyA9IHBsdWdpbkNsYXNzXHJcbiAgICBjb25zb2xlLmFzc2VydChpc0luaGVyaXRlZE9mKHRoaXMuY29tcG9uZW50LCBXaW5kb3dDb21wb25lbnQpLFxyXG4gICAgICBcIldpbmRvdyAnXCIsIHRoaXMubmFtZSwgXCInIHNoYWxsIGJlIGJhc2VkIG9uIFdpbmRvd0NvbXBvbmVudFwiKVxyXG4gIH1cclxuICBhZGRMaW5rKGxpbms6IE9iamVjdCkge1xyXG4gICAgaWYgKCF0aGlzLmxpbmtzKSB0aGlzLmxpbmtzID0gWyBsaW5rIF1cclxuICAgIGVsc2UgdGhpcy5saW5rcy5wdXNoKGxpbmspXHJcbiAgfVxyXG4gIGNyZWF0ZURlZmF1bHRQYXJhbWV0ZXJzKGluc3RhbmNlOiBXaW5kb3dJbnN0YW5jZSk6IE9iamVjdCB7XHJcbiAgICBjb25zdCBwYXJhbXMgPSB7IC4uLnRoaXMuZGVmYXVsdFBhcmFtZXRlcnMgfVxyXG4gICAgdGhpcy5saW5rcyAmJiB0aGlzLmxpbmtzLmZvckVhY2gobGsgPT4ge1xyXG4gICAgICBwYXJhbXNbbGsucGFyYW1dID0gbGsucGx1Z2luQ2xhc3MuaW5zdGFuY2VbbGsucGF0aF1cclxuICAgIH0pXHJcbiAgICBwYXJhbXMuaW5zdGFuY2UgPSBpbnN0YW5jZVxyXG4gICAgcGFyYW1zLm9uQ2hhbmdlID0gaW5zdGFuY2UuaGFuZGxlQ2hhbmdlXHJcbiAgICByZXR1cm4gcGFyYW1zXHJcbiAgfVxyXG59XHJcblxyXG5leHBvcnQgY2xhc3MgV2luZG93SW5zdGFuY2Uge1xyXG4gIC8vIERlZmluaXRpb25cclxuICBpZDogV2luZG93SURcclxuICB3aW5kb3dDbGFzczogV2luZG93Q2xhc3NcclxuICBwYXJlbnQ6IFdpbmRvd0luc3RhbmNlXHJcbiAgcGx1Z2luOiBQbHVnaW5JbnN0YW5jZVxyXG4gIGNvbXBvbmVudDogV2luZG93Q29tcG9uZW50XHJcbiAgY29udGFpbmVyOiBXaW5kb3dDb250YWluZXJcclxuICBub2RlOiBIdG1sRWxlbWVudFxyXG5cclxuICAvLyBPcHRpb25zXHJcbiAgZG9ja0lkOiBEb2NrSURcclxuICB0aXRsZTogc3RyaW5nXHJcbiAgaWNvbjogc3RyaW5nXHJcbiAgcGFyYW1ldGVyczogeyBbc3RyaW5nXTogYW55IH1cclxuXHJcbiAgY29uc3RydWN0b3Iod2luZG93SWQ6IFdpbmRvd0lELCB3aW5kb3dDbGFzczogV2luZG93Q2xhc3MsXHJcbiAgICBwYXJlbnQ6IFdpbmRvd0luc3RhbmNlLCBwbHVnaW46IFdpbmRvd0luc3RhbmNlLCBvcHRpb25zOiBXaW5kb3dPcHRpb25zXHJcbiAgKSB7XHJcbiAgICB0aGlzLmlkID0gd2luZG93SWRcclxuICAgIHRoaXMud2luZG93Q2xhc3MgPSB3aW5kb3dDbGFzc1xyXG4gICAgdGhpcy5wYXJlbnQgPSBwYXJlbnRcclxuICAgIHRoaXMucGx1Z2luID0gcGx1Z2luXHJcbiAgICB0aGlzLmNvbXBvbmVudCA9IHdpbmRvd0NsYXNzLmNvbXBvbmVudFxyXG4gICAgdGhpcy5ub2RlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKVxyXG4gICAgdGhpcy5ub2RlLmNsYXNzTmFtZSA9IFwicG9zaXRpb24tcmVsYXRpdmUgd2lkdGgtMTAwIGhlaWdodC0xMDAgb3ZlcmZsb3ctXCIrd2luZG93Q2xhc3Mub3ZlcmZsb3dcclxuICAgIHRoaXMubGF5b3V0LndpbmRvd3Nbd2luZG93SWRdID0gdGhpc1xyXG4gICAgdGhpcy50aXRsZSA9IHdpbmRvd0NsYXNzLmRlZmF1bHRUaXRsZVxyXG4gICAgdGhpcy5pY29uID0gd2luZG93Q2xhc3MuZGVmYXVsdEljb25cclxuICAgIHRoaXMuZG9ja0lkID0gd2luZG93Q2xhc3MuZGVmYXVsdERvY2tJZFxyXG4gICAgdGhpcy5wYXJhbWV0ZXJzID0gd2luZG93Q2xhc3MuY3JlYXRlRGVmYXVsdFBhcmFtZXRlcnModGhpcylcclxuICAgIHRoaXMudXBkYXRlT3B0aW9ucyhvcHRpb25zKVxyXG4gIH1cclxuICB1cGRhdGVPcHRpb25zKG9wdGlvbnM6IFdpbmRvd09wdGlvbnMpIHtcclxuICAgIGlmIChvcHRpb25zKSB7XHJcbiAgICAgIGlmIChvcHRpb25zLnRpdGxlKSB0aGlzLnRpdGxlID0gb3B0aW9ucy50aXRsZVxyXG4gICAgICBpZiAob3B0aW9ucy5pY29uKSB0aGlzLmljb24gPSBvcHRpb25zLmljb25cclxuICAgICAgaWYgKG9wdGlvbnMuZG9ja0lkKSB0aGlzLmRvY2tJZCA9IG9wdGlvbnMuZG9ja0lkXHJcbiAgICAgIGlmIChvcHRpb25zLnBhcmFtZXRlcnMpIHtcclxuICAgICAgICB0aGlzLnBhcmFtZXRlcnMgPSB7XHJcbiAgICAgICAgICAuLi50aGlzLnBhcmFtZXRlcnMsXHJcbiAgICAgICAgICAuLi5vcHRpb25zLnBhcmFtZXRlcnMsXHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgICB0aGlzLnJlbmRlcigpXHJcbiAgfVxyXG4gIG9wZW5XaW5kb3cod2luZG93Q2xhc3NJRDogV2luZG93Q2xhc3NJRCwgb3B0aW9uczogV2luZG93T3B0aW9ucykge1xyXG4gICAgdGhpcy5sYXlvdXQub3BlblN1YldpbmRvdyh0aGlzLndpbmRvd0NsYXNzLndpbmRvd3Nbd2luZG93Q2xhc3NJRF0sIHRoaXMsIG9wdGlvbnMpXHJcbiAgfVxyXG4gIHNob3dXaW5kb3cod2luZG93SUQ6IFdpbmRvd0lELCBvcHRpb25zOiBXaW5kb3dPcHRpb25zKTogV2luZG93SUQge1xyXG4gICAgdGhpcy5sYXlvdXQuc2hvd1N1YldpbmRvdyh0aGlzLndpbmRvd3Nbd2luZG93SURdLCB0aGlzLCBvcHRpb25zKVxyXG4gIH1cclxuICBjbG9zZSgpIHtcclxuICAgIC8vIFRPRE9cclxuICB9XHJcbiAgaGFuZGxlQ2hhbmdlID0gKHBhcmFtZXRlcnMpID0+IHtcclxuICAgIHRoaXMudXBkYXRlT3B0aW9ucyh7IHBhcmFtZXRlcnMgfSlcclxuICB9XHJcbiAgcmVuZGVyKCkge1xyXG4gICAgUmVhY3RET00ucmVuZGVyKFJlYWN0LmNyZWF0ZUVsZW1lbnQodGhpcy5jb21wb25lbnQsIHRoaXMucGFyYW1ldGVycyksIHRoaXMubm9kZSlcclxuICB9XHJcbn1cclxuXHJcbmV4cG9ydCB0eXBlIFByb3BzVHlwZSA9IHtcclxuICBjdXJyZW50OiBXaW5kb3dJbnN0YW5jZSxcclxuICBjbGFzc05hbWU6IHN0cmluZyxcclxuICBzdHlsZTogYW55LFxyXG59XHJcblxyXG5leHBvcnQgdHlwZSBTdGF0ZVR5cGUgPSB7XHJcbiAgd2luZG93OiBXaW5kb3dJbnN0YW5jZSxcclxufVxyXG5cclxuZXhwb3J0IGNsYXNzIFdpbmRvd0NvbnRhaW5lciBleHRlbmRzIENvbXBvbmVudDx2b2lkLCBQcm9wc1R5cGUsIFN0YXRlVHlwZT4ge1xyXG4gIHByb3BzOiBQcm9wc1R5cGVcclxuICBzdGF0ZTogU3RhdGVUeXBlID0geyB3aW5kb3c6IG51bGwgfVxyXG5cclxuICBjb21wb25lbnREaWRNb3VudCgpIHtcclxuICAgIHRoaXMubW91bnRXaW5kb3codGhpcy5wcm9wcy5jdXJyZW50KVxyXG4gIH1cclxuICBjb21wb25lbnRXaWxsUmVjZWl2ZVByb3BzKG5leHRQcm9wcykge1xyXG4gICAgaWYgKHRoaXMucHJvcHMuY3VycmVudCAhPT0gbmV4dFByb3BzLmN1cnJlbnQpIHtcclxuICAgICAgdGhpcy51bm1vdW50V2luZG93KClcclxuICAgICAgdGhpcy5tb3VudFdpbmRvdyhuZXh0UHJvcHMuY3VycmVudClcclxuICAgIH1cclxuICB9XHJcbiAgY29tcG9uZW50V2lsbFVubW91bnQoKSB7XHJcbiAgICB0aGlzLnVubW91bnRXaW5kb3coKVxyXG4gIH1cclxuICB3aWR0aCgpIHtcclxuICAgIHJldHVybiB0aGlzLnJlZnMucm9vdCAmJiB0aGlzLnJlZnMucm9vdC5jbGllbnRXaWR0aFxyXG4gIH1cclxuICBoZWlnaHQoKSB7XHJcbiAgICByZXR1cm4gdGhpcy5yZWZzLnJvb3QgJiYgdGhpcy5yZWZzLnJvb3QuY2xpZW50SGVpZ2h0XHJcbiAgfVxyXG4gIG1vdW50V2luZG93KHdpbmRvdykge1xyXG4gICAgaWYgKHdpbmRvdykge1xyXG4gICAgICB0aGlzLnJlZnMucm9vdC5hcHBlbmRDaGlsZCh3aW5kb3cubm9kZSlcclxuICAgICAgd2luZG93LmNvbnRhaW5lciA9IHRoaXNcclxuICAgICAgdGhpcy5zZXRTdGF0ZSh7IHdpbmRvdzogd2luZG93IH0pXHJcbiAgICB9XHJcbiAgICBlbHNlIHtcclxuICAgICAgdGhpcy5zZXRTdGF0ZSh7IHdpbmRvdzogbnVsbCB9KVxyXG4gICAgfVxyXG4gIH1cclxuICB1bm1vdW50V2luZG93KCkge1xyXG4gICAgY29uc3QgeyB3aW5kb3cgfSA9IHRoaXMuc3RhdGVcclxuICAgIGlmICh3aW5kb3cgJiYgd2luZG93LmNvbnRhaW5lciA9PT0gdGhpcykge1xyXG4gICAgICB0aGlzLnJlZnMucm9vdC5yZW1vdmVDaGlsZCh3aW5kb3cubm9kZSlcclxuICAgICAgd2luZG93LmNvbnRhaW5lciA9IG51bGxcclxuICAgIH1cclxuICB9XHJcbiAgcmVuZGVyKCkge1xyXG4gICAgY29uc3QgeyBjbGFzc05hbWUsIHN0eWxlIH0gPSB0aGlzLnByb3BzXHJcbiAgICByZXR1cm4gKDxkaXYgcmVmPVwicm9vdFwiIGNsYXNzTmFtZT17IGNsYXNzTmFtZSB9IHN0eWxlPXsgc3R5bGUgfSAvPilcclxuICB9XHJcbn1cclxuXHJcbmV4cG9ydCBjbGFzcyBXaW5kb3dDb21wb25lbnQ8RGVmYXVsdFByb3BzLCBQcm9wcywgU3RhdGU+XHJcbiAgZXh0ZW5kcyBDb21wb25lbnQ8RGVmYXVsdFByb3BzLCBQcm9wcywgU3RhdGU+XHJcbntcclxuICBjb25zdHJ1Y3Rvcihwcm9wcykge1xyXG4gICAgc3VwZXIocHJvcHMpXHJcbiAgICB0aGlzLmluc3RhbmNlID0gcHJvcHMuaW5zdGFuY2VcclxuICAgIHRoaXMucGx1Z2luID0gcHJvcHMuaW5zdGFuY2UucGx1Z2luXHJcbiAgfVxyXG5cclxuICBpbnN0YW5jZTogV2luZG93SW5zdGFuY2VcclxuICBwbHVnaW46IFBsdWdpbkluc3RhbmNlXHJcblxyXG4gIGlzV2luZG93KCkge1xyXG4gICAgcmV0dXJuIHRydWVcclxuICB9XHJcbiAgbG9nKHNldmVyaXR5KSB7XHJcbiAgICBjb25zdCBtZXNzYWdlID0ge1xyXG4gICAgICBzZXZlcml0eTogc2V2ZXJpdHksXHJcbiAgICAgIGZyb206IHRoaXMucHJvcHMgJiYgdGhpcy5wcm9wcy53aW5kb3cgJiYgdGhpcy5wcm9wcy53aW5kb3cudGl0bGUsXHJcbiAgICAgIGNvbnRlbnQ6IGFyZ3VtZW50c1sxXSxcclxuICAgIH1cclxuICAgIGlmIChhcmd1bWVudHMubGVuZ3RoID4gMSkge1xyXG4gICAgICBtZXNzYWdlLmNvbnRlbnQgPSBBcnJheS5wcm90b3R5cGUuc2xpY2UuY2FsbChhcmd1bWVudHMsIDEpXHJcbiAgICB9XHJcbiAgICBpZiAoc2V2ZXJpdHkgPT09IFwiZXJyb3JcIikgY29uc29sZS5lcnJvciguLi5tZXNzYWdlLmNvbnRlbnQpXHJcbiAgICBlbHNlIGNvbnNvbGUubG9nKC4uLm1lc3NhZ2UuY29udGVudClcclxuICAgIEFwcGxpY2F0aW9uLnNldEVudihcImNvbnNvbGUuZGVidWdcIiwgbWVzc2FnZSlcclxuICB9XHJcbiAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXVudXNlZC12YXJzXHJcbiAgb3BlbldpbmRvdyh3aW5kb3dDbGFzc0lEOiBXaW5kb3dDbGFzc0lELCBvcHRpb25zOiBXaW5kb3dPcHRpb25zKSB7XHJcbiAgICBjb25zdCB3aW5kb3cgPSB0aGlzLnByb3BzLndpbmRvd1xyXG4gICAgd2luZG93Lm9wZW5XaW5kb3cuYXBwbHkod2luZG93LCBhcmd1bWVudHMpXHJcbiAgfVxyXG4gIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby11bnVzZWQtdmFyc1xyXG4gIGNsb3NlV2luZG93KHdpbmRvd0lkOiBXaW5kb3dJRCkge1xyXG4gICAgY29uc3Qgd2luZG93ID0gdGhpcy5wcm9wcy53aW5kb3dcclxuICAgIHdpbmRvdy5jbG9zZVdpbmRvdy5hcHBseSh3aW5kb3csIGFyZ3VtZW50cylcclxuICB9XHJcbn1cclxuIl19