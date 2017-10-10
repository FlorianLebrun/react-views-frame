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
      _reactDom2.default.unmountComponentAtNode(this.node);
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
      this.plugin.application.setEnv("console.debug", message);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9saWIvbGF5b3V0L1dpbmRvdy5qcyJdLCJuYW1lcyI6WyJXaW5kb3dDbGFzcyIsIm5hbWUiLCJkZXNjIiwicGx1Z2luQ2xhc3MiLCJ3aW5kb3dzIiwiT2JqZWN0Iiwia2V5cyIsImZvckVhY2giLCJrZXkiLCJvdmVyZmxvdyIsImNvbnNvbGUiLCJhc3NlcnQiLCJjb21wb25lbnQiLCJXaW5kb3dDb21wb25lbnQiLCJsaW5rIiwibGlua3MiLCJwdXNoIiwiaW5zdGFuY2UiLCJwYXJhbXMiLCJkZWZhdWx0UGFyYW1ldGVycyIsImxrIiwicGFyYW0iLCJwYXRoIiwib25DaGFuZ2UiLCJoYW5kbGVDaGFuZ2UiLCJXaW5kb3dJbnN0YW5jZSIsIndpbmRvd0lkIiwid2luZG93Q2xhc3MiLCJwYXJlbnQiLCJwbHVnaW4iLCJvcHRpb25zIiwicGFyYW1ldGVycyIsInVwZGF0ZU9wdGlvbnMiLCJpZCIsIm5vZGUiLCJkb2N1bWVudCIsImNyZWF0ZUVsZW1lbnQiLCJjbGFzc05hbWUiLCJsYXlvdXQiLCJ0aXRsZSIsImRlZmF1bHRUaXRsZSIsImljb24iLCJkZWZhdWx0SWNvbiIsImRvY2tJZCIsImRlZmF1bHREb2NrSWQiLCJjcmVhdGVEZWZhdWx0UGFyYW1ldGVycyIsInJlbmRlciIsIndpbmRvd0NsYXNzSUQiLCJvcGVuU3ViV2luZG93Iiwid2luZG93SUQiLCJzaG93U3ViV2luZG93IiwidW5tb3VudENvbXBvbmVudEF0Tm9kZSIsIldpbmRvd0NvbnRhaW5lciIsInN0YXRlIiwid2luZG93IiwibW91bnRXaW5kb3ciLCJwcm9wcyIsImN1cnJlbnQiLCJuZXh0UHJvcHMiLCJ1bm1vdW50V2luZG93IiwicmVmcyIsInJvb3QiLCJjbGllbnRXaWR0aCIsImNsaWVudEhlaWdodCIsImFwcGVuZENoaWxkIiwiY29udGFpbmVyIiwic2V0U3RhdGUiLCJyZW1vdmVDaGlsZCIsInN0eWxlIiwic2V2ZXJpdHkiLCJtZXNzYWdlIiwiZnJvbSIsImNvbnRlbnQiLCJhcmd1bWVudHMiLCJsZW5ndGgiLCJBcnJheSIsInByb3RvdHlwZSIsInNsaWNlIiwiY2FsbCIsImVycm9yIiwibG9nIiwiYXBwbGljYXRpb24iLCJzZXRFbnYiLCJvcGVuV2luZG93IiwiYXBwbHkiLCJjbG9zZVdpbmRvdyJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O3FqQkFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUFDQTs7OztBQUNBOzs7O0FBRUE7Ozs7Ozs7Ozs7OztJQVdhQSxXLFdBQUFBLFc7QUFZWCx1QkFBWUMsSUFBWixFQUEwQkMsSUFBMUIsRUFBd0NDLFdBQXhDLEVBQWtFO0FBQUE7O0FBQUE7O0FBQUEsU0FIbEVDLE9BR2tFLEdBSHRCLEVBR3NCOztBQUNoRUYsWUFBUUcsT0FBT0MsSUFBUCxDQUFZSixJQUFaLEVBQWtCSyxPQUFsQixDQUEwQjtBQUFBLGFBQU8sTUFBS0MsR0FBTCxJQUFZTixLQUFLTSxHQUFMLENBQW5CO0FBQUEsS0FBMUIsQ0FBUjtBQUNBLFNBQUtQLElBQUwsR0FBWUEsSUFBWjtBQUNBLFNBQUtRLFFBQUwsR0FBZ0IsS0FBS0EsUUFBTCxJQUFpQixNQUFqQztBQUNBLFNBQUtOLFdBQUwsR0FBbUJBLFdBQW5CO0FBQ0FPLFlBQVFDLE1BQVIsQ0FBZSwwQkFBYyxLQUFLQyxTQUFuQixFQUE4QkMsZUFBOUIsQ0FBZixFQUNFLFVBREYsRUFDYyxLQUFLWixJQURuQixFQUN5QixxQ0FEekI7QUFFRCxHLENBZm9DOzs7Ozs0QkFnQjdCYSxJLEVBQWM7QUFDcEIsVUFBSSxDQUFDLEtBQUtDLEtBQVYsRUFBaUIsS0FBS0EsS0FBTCxHQUFhLENBQUVELElBQUYsQ0FBYixDQUFqQixLQUNLLEtBQUtDLEtBQUwsQ0FBV0MsSUFBWCxDQUFnQkYsSUFBaEI7QUFDTjs7OzRDQUN1QkcsUSxFQUFrQztBQUN4RCxVQUFNQyxzQkFBYyxLQUFLQyxpQkFBbkIsQ0FBTjtBQUNBLFdBQUtKLEtBQUwsSUFBYyxLQUFLQSxLQUFMLENBQVdSLE9BQVgsQ0FBbUIsY0FBTTtBQUNyQ1cs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QUFPK0IsV0FBUCxDQUFtQkQsS0FBbkIsQ0FBeUI5QixNQUF6QixFQUFpQ21CLFNBQWpDO0FBQ0QiLCJmaWxlIjoiV2luZG93LmpzIiwic291cmNlc0NvbnRlbnQiOlsiLyogZXNsaW50LWRpc2FibGUgbm8tdXNlLWJlZm9yZS1kZWZpbmUgKi9cclxuLyogZXNsaW50LWRpc2FibGUgcmVhY3Qvbm8tbXVsdGktY29tcCAqL1xyXG4vKiBlc2xpbnQtZGlzYWJsZSByZWFjdC9wcm9wLXR5cGVzICovXHJcbi8qIGVzbGludC1kaXNhYmxlIHJlYWN0L25vLXN0cmluZy1yZWZzICovXHJcbi8qIGVzbGludC1kaXNhYmxlIHJlYWN0L3NvcnQtY29tcCAqL1xyXG5pbXBvcnQgUmVhY3QsIHsgQ29tcG9uZW50IH0gZnJvbSBcInJlYWN0XCJcclxuaW1wb3J0IFJlYWN0RE9NIGZyb20gXCJyZWFjdC1kb21cIlxyXG5cclxuaW1wb3J0IHsgaXNJbmhlcml0ZWRPZiB9IGZyb20gXCIuLi91dGlsc1wiXHJcblxyXG5leHBvcnQgdHlwZSBXaW5kb3dJRCA9IHN0cmluZ1xyXG5leHBvcnQgdHlwZSBXaW5kb3dDbGFzc0lEID0gc3RyaW5nXHJcblxyXG5leHBvcnQgdHlwZSBXaW5kb3dPcHRpb25zID0ge1xyXG4gIHRpdGxlOiBzdHJpbmcsXHJcbiAgZG9ja0lkOiBEb2NrSUQsXHJcbiAgcGFyYW1ldGVyczogeyBbc3RyaW5nXTogYW55IH0sXHJcbn1cclxuXHJcbmV4cG9ydCBjbGFzcyBXaW5kb3dDbGFzcyB7XHJcbiAgbmFtZTogc3RyaW5nXHJcbiAgb3ZlcmZsb3c6IHN0cmluZ1xyXG4gIGtlZXBBbGl2ZTogYm9vbGVhblxyXG4gIGNvbXBvbmVudDogRnVuY3Rpb248V2luZG93Q29tcG9uZW50PiAvLyBjb25zdHJ1Y3RvciBvZiBXaW5kb3dDb21wb25lbnRcclxuICBkZWZhdWx0VGl0bGU6IHN0cmluZ1xyXG4gIGRlZmF1bHREb2NrSWQ6IERvY2tJRFxyXG4gIGRlZmF1bHRQYXJhbWV0ZXJzOiBPYmplY3RcclxuXHJcbiAgd2luZG93czogeyBbV2luZG93Q2xhc3NJRF06IFdpbmRvd0NsYXNzIH0gPSB7fVxyXG4gIGxpbmtzOiBBcnJheTxQYXJhbWV0ZXJMaW5rPlxyXG5cclxuICBjb25zdHJ1Y3RvcihuYW1lOiBzdHJpbmcsIGRlc2M6IE9iamVjdCwgcGx1Z2luQ2xhc3M6IFBsdWdpbkNsYXNzKSB7XHJcbiAgICBkZXNjICYmIE9iamVjdC5rZXlzKGRlc2MpLmZvckVhY2goa2V5ID0+IHRoaXNba2V5XSA9IGRlc2Nba2V5XSlcclxuICAgIHRoaXMubmFtZSA9IG5hbWVcclxuICAgIHRoaXMub3ZlcmZsb3cgPSB0aGlzLm92ZXJmbG93IHx8IFwiYXV0b1wiXHJcbiAgICB0aGlzLnBsdWdpbkNsYXNzID0gcGx1Z2luQ2xhc3NcclxuICAgIGNvbnNvbGUuYXNzZXJ0KGlzSW5oZXJpdGVkT2YodGhpcy5jb21wb25lbnQsIFdpbmRvd0NvbXBvbmVudCksXHJcbiAgICAgIFwiV2luZG93ICdcIiwgdGhpcy5uYW1lLCBcIicgc2hhbGwgYmUgYmFzZWQgb24gV2luZG93Q29tcG9uZW50XCIpXHJcbiAgfVxyXG4gIGFkZExpbmsobGluazogT2JqZWN0KSB7XHJcbiAgICBpZiAoIXRoaXMubGlua3MpIHRoaXMubGlua3MgPSBbIGxpbmsgXVxyXG4gICAgZWxzZSB0aGlzLmxpbmtzLnB1c2gobGluaylcclxuICB9XHJcbiAgY3JlYXRlRGVmYXVsdFBhcmFtZXRlcnMoaW5zdGFuY2U6IFdpbmRvd0luc3RhbmNlKTogT2JqZWN0IHtcclxuICAgIGNvbnN0IHBhcmFtcyA9IHsgLi4udGhpcy5kZWZhdWx0UGFyYW1ldGVycyB9XHJcbiAgICB0aGlzLmxpbmtzICYmIHRoaXMubGlua3MuZm9yRWFjaChsayA9PiB7XHJcbiAgICAgIHBhcmFtc1tsay5wYXJhbV0gPSBsay5wbHVnaW5DbGFzcy5pbnN0YW5jZVtsay5wYXRoXVxyXG4gICAgfSlcclxuICAgIHBhcmFtcy5pbnN0YW5jZSA9IGluc3RhbmNlXHJcbiAgICBwYXJhbXMub25DaGFuZ2UgPSBpbnN0YW5jZS5oYW5kbGVDaGFuZ2VcclxuICAgIHJldHVybiBwYXJhbXNcclxuICB9XHJcbn1cclxuXHJcbmV4cG9ydCBjbGFzcyBXaW5kb3dJbnN0YW5jZSB7XHJcbiAgLy8gRGVmaW5pdGlvblxyXG4gIGlkOiBXaW5kb3dJRFxyXG4gIHdpbmRvd0NsYXNzOiBXaW5kb3dDbGFzc1xyXG4gIHBhcmVudDogV2luZG93SW5zdGFuY2VcclxuICBwbHVnaW46IFBsdWdpbkNvbXBvbmVudFxyXG4gIGNvbXBvbmVudDogV2luZG93Q29tcG9uZW50XHJcbiAgY29udGFpbmVyOiBXaW5kb3dDb250YWluZXJcclxuICBub2RlOiBIdG1sRWxlbWVudFxyXG5cclxuICAvLyBPcHRpb25zXHJcbiAgZG9ja0lkOiBEb2NrSURcclxuICB0aXRsZTogc3RyaW5nXHJcbiAgaWNvbjogc3RyaW5nXHJcbiAgcGFyYW1ldGVyczogeyBbc3RyaW5nXTogYW55IH1cclxuXHJcbiAgY29uc3RydWN0b3Iod2luZG93SWQ6IFdpbmRvd0lELCB3aW5kb3dDbGFzczogV2luZG93Q2xhc3MsXHJcbiAgICBwYXJlbnQ6IFdpbmRvd0luc3RhbmNlLCBwbHVnaW46IFdpbmRvd0luc3RhbmNlLCBvcHRpb25zOiBXaW5kb3dPcHRpb25zXHJcbiAgKSB7XHJcbiAgICB0aGlzLmlkID0gd2luZG93SWRcclxuICAgIHRoaXMud2luZG93Q2xhc3MgPSB3aW5kb3dDbGFzc1xyXG4gICAgdGhpcy5wYXJlbnQgPSBwYXJlbnRcclxuICAgIHRoaXMucGx1Z2luID0gcGx1Z2luXHJcbiAgICB0aGlzLmNvbXBvbmVudCA9IHdpbmRvd0NsYXNzLmNvbXBvbmVudFxyXG4gICAgdGhpcy5ub2RlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKVxyXG4gICAgdGhpcy5ub2RlLmNsYXNzTmFtZSA9IFwicG9zaXRpb24tcmVsYXRpdmUgd2lkdGgtMTAwIGhlaWdodC0xMDAgb3ZlcmZsb3ctXCIrd2luZG93Q2xhc3Mub3ZlcmZsb3dcclxuICAgIHRoaXMubGF5b3V0LndpbmRvd3Nbd2luZG93SWRdID0gdGhpc1xyXG4gICAgdGhpcy50aXRsZSA9IHdpbmRvd0NsYXNzLmRlZmF1bHRUaXRsZVxyXG4gICAgdGhpcy5pY29uID0gd2luZG93Q2xhc3MuZGVmYXVsdEljb25cclxuICAgIHRoaXMuZG9ja0lkID0gd2luZG93Q2xhc3MuZGVmYXVsdERvY2tJZFxyXG4gICAgdGhpcy5wYXJhbWV0ZXJzID0gd2luZG93Q2xhc3MuY3JlYXRlRGVmYXVsdFBhcmFtZXRlcnModGhpcylcclxuICAgIHRoaXMudXBkYXRlT3B0aW9ucyhvcHRpb25zKVxyXG4gIH1cclxuICB1cGRhdGVPcHRpb25zKG9wdGlvbnM6IFdpbmRvd09wdGlvbnMpIHtcclxuICAgIGlmIChvcHRpb25zKSB7XHJcbiAgICAgIGlmIChvcHRpb25zLnRpdGxlKSB0aGlzLnRpdGxlID0gb3B0aW9ucy50aXRsZVxyXG4gICAgICBpZiAob3B0aW9ucy5pY29uKSB0aGlzLmljb24gPSBvcHRpb25zLmljb25cclxuICAgICAgaWYgKG9wdGlvbnMuZG9ja0lkKSB0aGlzLmRvY2tJZCA9IG9wdGlvbnMuZG9ja0lkXHJcbiAgICAgIGlmIChvcHRpb25zLnBhcmFtZXRlcnMpIHtcclxuICAgICAgICB0aGlzLnBhcmFtZXRlcnMgPSB7XHJcbiAgICAgICAgICAuLi50aGlzLnBhcmFtZXRlcnMsXHJcbiAgICAgICAgICAuLi5vcHRpb25zLnBhcmFtZXRlcnMsXHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgICB0aGlzLnJlbmRlcigpXHJcbiAgfVxyXG4gIG9wZW5XaW5kb3cod2luZG93Q2xhc3NJRDogV2luZG93Q2xhc3NJRCwgb3B0aW9uczogV2luZG93T3B0aW9ucykge1xyXG4gICAgdGhpcy5sYXlvdXQub3BlblN1YldpbmRvdyh0aGlzLndpbmRvd0NsYXNzLndpbmRvd3Nbd2luZG93Q2xhc3NJRF0sIHRoaXMsIG9wdGlvbnMpXHJcbiAgfVxyXG4gIHNob3dXaW5kb3cod2luZG93SUQ6IFdpbmRvd0lELCBvcHRpb25zOiBXaW5kb3dPcHRpb25zKTogV2luZG93SUQge1xyXG4gICAgdGhpcy5sYXlvdXQuc2hvd1N1YldpbmRvdyh0aGlzLndpbmRvd3Nbd2luZG93SURdLCB0aGlzLCBvcHRpb25zKVxyXG4gIH1cclxuICBjbG9zZSgpIHtcclxuICAgIFJlYWN0RE9NLnVubW91bnRDb21wb25lbnRBdE5vZGUodGhpcy5ub2RlKVxyXG4gIH1cclxuICBoYW5kbGVDaGFuZ2UgPSAocGFyYW1ldGVycykgPT4ge1xyXG4gICAgdGhpcy51cGRhdGVPcHRpb25zKHsgcGFyYW1ldGVycyB9KVxyXG4gIH1cclxuICByZW5kZXIoKSB7XHJcbiAgICBSZWFjdERPTS5yZW5kZXIoUmVhY3QuY3JlYXRlRWxlbWVudCh0aGlzLmNvbXBvbmVudCwgdGhpcy5wYXJhbWV0ZXJzKSwgdGhpcy5ub2RlKVxyXG4gIH1cclxufVxyXG5cclxuZXhwb3J0IHR5cGUgUHJvcHNUeXBlID0ge1xyXG4gIGN1cnJlbnQ6IFdpbmRvd0luc3RhbmNlLFxyXG4gIGNsYXNzTmFtZTogc3RyaW5nLFxyXG4gIHN0eWxlOiBhbnksXHJcbn1cclxuXHJcbmV4cG9ydCB0eXBlIFN0YXRlVHlwZSA9IHtcclxuICB3aW5kb3c6IFdpbmRvd0luc3RhbmNlLFxyXG59XHJcblxyXG5leHBvcnQgY2xhc3MgV2luZG93Q29udGFpbmVyIGV4dGVuZHMgQ29tcG9uZW50PHZvaWQsIFByb3BzVHlwZSwgU3RhdGVUeXBlPiB7XHJcbiAgcHJvcHM6IFByb3BzVHlwZVxyXG4gIHN0YXRlOiBTdGF0ZVR5cGUgPSB7IHdpbmRvdzogbnVsbCB9XHJcblxyXG4gIGNvbXBvbmVudERpZE1vdW50KCkge1xyXG4gICAgdGhpcy5tb3VudFdpbmRvdyh0aGlzLnByb3BzLmN1cnJlbnQpXHJcbiAgfVxyXG4gIGNvbXBvbmVudFdpbGxSZWNlaXZlUHJvcHMobmV4dFByb3BzKSB7XHJcbiAgICBpZiAodGhpcy5wcm9wcy5jdXJyZW50ICE9PSBuZXh0UHJvcHMuY3VycmVudCkge1xyXG4gICAgICB0aGlzLnVubW91bnRXaW5kb3coKVxyXG4gICAgICB0aGlzLm1vdW50V2luZG93KG5leHRQcm9wcy5jdXJyZW50KVxyXG4gICAgfVxyXG4gIH1cclxuICBjb21wb25lbnRXaWxsVW5tb3VudCgpIHtcclxuICAgIHRoaXMudW5tb3VudFdpbmRvdygpXHJcbiAgfVxyXG4gIHdpZHRoKCkge1xyXG4gICAgcmV0dXJuIHRoaXMucmVmcy5yb290ICYmIHRoaXMucmVmcy5yb290LmNsaWVudFdpZHRoXHJcbiAgfVxyXG4gIGhlaWdodCgpIHtcclxuICAgIHJldHVybiB0aGlzLnJlZnMucm9vdCAmJiB0aGlzLnJlZnMucm9vdC5jbGllbnRIZWlnaHRcclxuICB9XHJcbiAgbW91bnRXaW5kb3cod2luZG93KSB7XHJcbiAgICBpZiAod2luZG93KSB7XHJcbiAgICAgIHRoaXMucmVmcy5yb290LmFwcGVuZENoaWxkKHdpbmRvdy5ub2RlKVxyXG4gICAgICB3aW5kb3cuY29udGFpbmVyID0gdGhpc1xyXG4gICAgICB0aGlzLnNldFN0YXRlKHsgd2luZG93OiB3aW5kb3cgfSlcclxuICAgIH1cclxuICAgIGVsc2Uge1xyXG4gICAgICB0aGlzLnNldFN0YXRlKHsgd2luZG93OiBudWxsIH0pXHJcbiAgICB9XHJcbiAgfVxyXG4gIHVubW91bnRXaW5kb3coKSB7XHJcbiAgICBjb25zdCB7IHdpbmRvdyB9ID0gdGhpcy5zdGF0ZVxyXG4gICAgaWYgKHdpbmRvdyAmJiB3aW5kb3cuY29udGFpbmVyID09PSB0aGlzKSB7XHJcbiAgICAgIHRoaXMucmVmcy5yb290LnJlbW92ZUNoaWxkKHdpbmRvdy5ub2RlKVxyXG4gICAgICB3aW5kb3cuY29udGFpbmVyID0gbnVsbFxyXG4gICAgfVxyXG4gIH1cclxuICByZW5kZXIoKSB7XHJcbiAgICBjb25zdCB7IGNsYXNzTmFtZSwgc3R5bGUgfSA9IHRoaXMucHJvcHNcclxuICAgIHJldHVybiAoPGRpdiByZWY9XCJyb290XCIgY2xhc3NOYW1lPXsgY2xhc3NOYW1lIH0gc3R5bGU9eyBzdHlsZSB9IC8+KVxyXG4gIH1cclxufVxyXG5cclxuZXhwb3J0IGNsYXNzIFdpbmRvd0NvbXBvbmVudDxEZWZhdWx0UHJvcHMsIFByb3BzLCBTdGF0ZT5cclxuICBleHRlbmRzIENvbXBvbmVudDxEZWZhdWx0UHJvcHMsIFByb3BzLCBTdGF0ZT5cclxue1xyXG4gIGluc3RhbmNlOiBXaW5kb3dJbnN0YW5jZVxyXG4gIHBsdWdpbjogUGx1Z2luQ29tcG9uZW50XHJcblxyXG4gIGNvbnN0cnVjdG9yKHByb3BzKSB7XHJcbiAgICBzdXBlcihwcm9wcylcclxuICAgIHRoaXMuaW5zdGFuY2UgPSBwcm9wcy5pbnN0YW5jZVxyXG4gICAgdGhpcy5wbHVnaW4gPSBwcm9wcy5pbnN0YW5jZS5wbHVnaW5cclxuICB9XHJcbiAgaXNXaW5kb3coKSB7XHJcbiAgICByZXR1cm4gdHJ1ZVxyXG4gIH1cclxuICBsb2coc2V2ZXJpdHkpIHtcclxuICAgIGNvbnN0IG1lc3NhZ2UgPSB7XHJcbiAgICAgIHNldmVyaXR5OiBzZXZlcml0eSxcclxuICAgICAgZnJvbTogdGhpcy5wcm9wcyAmJiB0aGlzLnByb3BzLndpbmRvdyAmJiB0aGlzLnByb3BzLndpbmRvdy50aXRsZSxcclxuICAgICAgY29udGVudDogYXJndW1lbnRzWzFdLFxyXG4gICAgfVxyXG4gICAgaWYgKGFyZ3VtZW50cy5sZW5ndGggPiAxKSB7XHJcbiAgICAgIG1lc3NhZ2UuY29udGVudCA9IEFycmF5LnByb3RvdHlwZS5zbGljZS5jYWxsKGFyZ3VtZW50cywgMSlcclxuICAgIH1cclxuICAgIGlmIChzZXZlcml0eSA9PT0gXCJlcnJvclwiKSBjb25zb2xlLmVycm9yKC4uLm1lc3NhZ2UuY29udGVudClcclxuICAgIGVsc2UgY29uc29sZS5sb2coLi4ubWVzc2FnZS5jb250ZW50KVxyXG4gICAgdGhpcy5wbHVnaW4uYXBwbGljYXRpb24uc2V0RW52KFwiY29uc29sZS5kZWJ1Z1wiLCBtZXNzYWdlKVxyXG4gIH1cclxuICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tdW51c2VkLXZhcnNcclxuICBvcGVuV2luZG93KHdpbmRvd0NsYXNzSUQ6IFdpbmRvd0NsYXNzSUQsIG9wdGlvbnM6IFdpbmRvd09wdGlvbnMpIHtcclxuICAgIGNvbnN0IHdpbmRvdyA9IHRoaXMucHJvcHMud2luZG93XHJcbiAgICB3aW5kb3cub3BlbldpbmRvdy5hcHBseSh3aW5kb3csIGFyZ3VtZW50cylcclxuICB9XHJcbiAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXVudXNlZC12YXJzXHJcbiAgY2xvc2VXaW5kb3cod2luZG93SWQ6IFdpbmRvd0lEKSB7XHJcbiAgICBjb25zdCB3aW5kb3cgPSB0aGlzLnByb3BzLndpbmRvd1xyXG4gICAgd2luZG93LmNsb3NlV2luZG93LmFwcGx5KHdpbmRvdywgYXJndW1lbnRzKVxyXG4gIH1cclxufVxyXG4iXX0=