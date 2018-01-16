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
        layout.removeWindow(this.instance.id);
      }
    }
  }]);

  return WindowComponent;
}(_react.Component);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9saWIvbGF5b3V0L1dpbmRvdy5qcyJdLCJuYW1lcyI6WyJXaW5kb3dDbGFzcyIsIm5hbWUiLCJkZXNjIiwicGx1Z2luQ2xhc3MiLCJ3aW5kb3dzIiwiT2JqZWN0Iiwia2V5cyIsImZvckVhY2giLCJrZXkiLCJvdmVyZmxvdyIsImNvbnNvbGUiLCJhc3NlcnQiLCJjb21wb25lbnQiLCJXaW5kb3dDb21wb25lbnQiLCJsaW5rIiwibGlua3MiLCJwdXNoIiwiaW5zdGFuY2UiLCJwYXJhbXMiLCJkZWZhdWx0UGFyYW1ldGVycyIsImxrIiwicGFyYW0iLCJwYXRoIiwib25DaGFuZ2UiLCJub3RpZnlDaGFuZ2UiLCJXaW5kb3dJbnN0YW5jZSIsIndpbmRvd0lkIiwid2luZG93Q2xhc3MiLCJwYXJlbnQiLCJwbHVnaW4iLCJvcHRpb25zIiwicGFyYW1ldGVycyIsInVwZGF0ZU9wdGlvbnMiLCJpZCIsIm5vZGUiLCJkb2N1bWVudCIsImNyZWF0ZUVsZW1lbnQiLCJjbGFzc05hbWUiLCJsYXlvdXQiLCJ0aXRsZSIsImRlZmF1bHRUaXRsZSIsImljb24iLCJkZWZhdWx0SWNvbiIsImRvY2tJZCIsImRlZmF1bHREb2NrSWQiLCJjcmVhdGVEZWZhdWx0UGFyYW1ldGVycyIsInJlbmRlciIsInVubW91bnRDb21wb25lbnRBdE5vZGUiLCJXaW5kb3dDb250YWluZXIiLCJoYW5kbGVGb2N1cyIsImZvY3VzT25XaW5kb3ciLCJ3aW5kb3ciLCJtb3VudFdpbmRvdyIsInByb3BzIiwiY3VycmVudCIsIm5leHRQcm9wcyIsInVubW91bnRXaW5kb3ciLCJyZWZzIiwicm9vdCIsImFwcGVuZENoaWxkIiwiY29udGFpbmVyIiwicmVtb3ZlQ2hpbGQiLCJjbGllbnRXaWR0aCIsImNsaWVudEhlaWdodCIsInN0eWxlIiwic2V2ZXJpdHkiLCJtZXNzYWdlIiwiZnJvbSIsImNvbnRlbnQiLCJhcmd1bWVudHMiLCJsZW5ndGgiLCJBcnJheSIsInByb3RvdHlwZSIsInNsaWNlIiwiY2FsbCIsImVycm9yIiwibG9nIiwiYXBwbGljYXRpb24iLCJzZXRFbnYiLCJ3aW5kb3dDbGFzc0lEIiwib3BlblN1YldpbmRvdyIsImNsb3NlU3ViV2luZG93IiwicmVtb3ZlV2luZG93Il0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7cWpCQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQUNBOzs7O0FBQ0E7Ozs7QUFFQTs7Ozs7Ozs7Ozs7O0lBV2FBLFcsV0FBQUEsVztBQVlYLHVCQUFZQyxJQUFaLEVBQTBCQyxJQUExQixFQUF3Q0MsV0FBeEMsRUFBa0U7QUFBQTs7QUFBQTs7QUFBQSxTQUhsRUMsT0FHa0UsR0FIdEIsRUFHc0I7O0FBQ2hFRixZQUFRRyxPQUFPQyxJQUFQLENBQVlKLElBQVosRUFBa0JLLE9BQWxCLENBQTBCO0FBQUEsYUFBTyxNQUFLQyxHQUFMLElBQVlOLEtBQUtNLEdBQUwsQ0FBbkI7QUFBQSxLQUExQixDQUFSO0FBQ0EsU0FBS1AsSUFBTCxHQUFZQSxJQUFaO0FBQ0EsU0FBS1EsUUFBTCxHQUFnQixLQUFLQSxRQUFMLElBQWlCLE1BQWpDO0FBQ0EsU0FBS04sV0FBTCxHQUFtQkEsV0FBbkI7QUFDQU8sWUFBUUMsTUFBUixDQUFlLDBCQUFjLEtBQUtDLFNBQW5CLEVBQThCQyxlQUE5QixDQUFmLEVBQ0UsVUFERixFQUNjLEtBQUtaLElBRG5CLEVBQ3lCLHFDQUR6QjtBQUVELEcsQ0Fmb0M7Ozs7OzRCQWdCN0JhLEksRUFBYztBQUNwQixVQUFJLENBQUMsS0FBS0MsS0FBVixFQUFpQixLQUFLQSxLQUFMLEdBQWEsQ0FBQ0QsSUFBRCxDQUFiLENBQWpCLEtBQ0ssS0FBS0MsS0FBTCxDQUFXQyxJQUFYLENBQWdCRixJQUFoQjtBQUNOOzs7NENBQ3VCRyxRLEVBQWtDO0FBQ3hELFVBQU1DLHNCQUFjLEtBQUtDLGlCQUFuQixDQUFOO0FBQ0EsV0FBS0osS0FBTCxJQUFjLEtBQUtBLEtBQUwsQ0FBV1IsT0FBWCxDQUFtQixjQUFNO0FBQ3JDVyxlQUFPRSxHQUFHQyxLQUFWLElB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dCI6WyIvKiBlc2xpbnQtZGlzYWJsZSBuby11c2UtYmVmb3JlLWRlZmluZSAqL1xyXG4vKiBlc2xpbnQtZGlzYWJsZSByZWFjdC9uby1tdWx0aS1jb21wICovXHJcbi8qIGVzbGludC1kaXNhYmxlIHJlYWN0L3Byb3AtdHlwZXMgKi9cclxuLyogZXNsaW50LWRpc2FibGUgcmVhY3Qvbm8tc3RyaW5nLXJlZnMgKi9cclxuLyogZXNsaW50LWRpc2FibGUgcmVhY3Qvc29ydC1jb21wICovXHJcbmltcG9ydCBSZWFjdCwgeyBDb21wb25lbnQgfSBmcm9tIFwicmVhY3RcIlxyXG5pbXBvcnQgUmVhY3RET00gZnJvbSBcInJlYWN0LWRvbVwiXHJcblxyXG5pbXBvcnQgeyBpc0luaGVyaXRlZE9mIH0gZnJvbSBcIi4uL3V0aWxzXCJcclxuXHJcbmV4cG9ydCB0eXBlIFdpbmRvd0lEID0gc3RyaW5nXHJcbmV4cG9ydCB0eXBlIFdpbmRvd0NsYXNzSUQgPSBzdHJpbmdcclxuXHJcbmV4cG9ydCB0eXBlIFdpbmRvd09wdGlvbnMgPSB7XHJcbiAgdGl0bGU6IHN0cmluZyxcclxuICBkb2NrSWQ6IERvY2tJRCxcclxuICBwYXJhbWV0ZXJzOiB7IFtzdHJpbmddOiBhbnkgfSxcclxufVxyXG5cclxuZXhwb3J0IGNsYXNzIFdpbmRvd0NsYXNzIHtcclxuICBuYW1lOiBzdHJpbmdcclxuICBvdmVyZmxvdzogc3RyaW5nXHJcbiAga2VlcEFsaXZlOiBib29sZWFuXHJcbiAgY29tcG9uZW50OiBGdW5jdGlvbjxXaW5kb3dDb21wb25lbnQ+IC8vIGNvbnN0cnVjdG9yIG9mIFdpbmRvd0NvbXBvbmVudFxyXG4gIGRlZmF1bHRUaXRsZTogc3RyaW5nXHJcbiAgZGVmYXVsdERvY2tJZDogRG9ja0lEXHJcbiAgZGVmYXVsdFBhcmFtZXRlcnM6IE9iamVjdFxyXG5cclxuICB3aW5kb3dzOiB7IFtXaW5kb3dDbGFzc0lEXTogV2luZG93Q2xhc3MgfSA9IHt9XHJcbiAgbGlua3M6IEFycmF5PFBhcmFtZXRlckxpbms+XHJcblxyXG4gIGNvbnN0cnVjdG9yKG5hbWU6IHN0cmluZywgZGVzYzogT2JqZWN0LCBwbHVnaW5DbGFzczogUGx1Z2luQ2xhc3MpIHtcclxuICAgIGRlc2MgJiYgT2JqZWN0LmtleXMoZGVzYykuZm9yRWFjaChrZXkgPT4gdGhpc1trZXldID0gZGVzY1trZXldKVxyXG4gICAgdGhpcy5uYW1lID0gbmFtZVxyXG4gICAgdGhpcy5vdmVyZmxvdyA9IHRoaXMub3ZlcmZsb3cgfHwgXCJhdXRvXCJcclxuICAgIHRoaXMucGx1Z2luQ2xhc3MgPSBwbHVnaW5DbGFzc1xyXG4gICAgY29uc29sZS5hc3NlcnQoaXNJbmhlcml0ZWRPZih0aGlzLmNvbXBvbmVudCwgV2luZG93Q29tcG9uZW50KSxcclxuICAgICAgXCJXaW5kb3cgJ1wiLCB0aGlzLm5hbWUsIFwiJyBzaGFsbCBiZSBiYXNlZCBvbiBXaW5kb3dDb21wb25lbnRcIilcclxuICB9XHJcbiAgYWRkTGluayhsaW5rOiBPYmplY3QpIHtcclxuICAgIGlmICghdGhpcy5saW5rcykgdGhpcy5saW5rcyA9IFtsaW5rXVxyXG4gICAgZWxzZSB0aGlzLmxpbmtzLnB1c2gobGluaylcclxuICB9XHJcbiAgY3JlYXRlRGVmYXVsdFBhcmFtZXRlcnMoaW5zdGFuY2U6IFdpbmRvd0luc3RhbmNlKTogT2JqZWN0IHtcclxuICAgIGNvbnN0IHBhcmFtcyA9IHsgLi4udGhpcy5kZWZhdWx0UGFyYW1ldGVycyB9XHJcbiAgICB0aGlzLmxpbmtzICYmIHRoaXMubGlua3MuZm9yRWFjaChsayA9PiB7XHJcbiAgICAgIHBhcmFtc1tsay5wYXJhbV0gPSBsay5wbHVnaW5DbGFzcy5pbnN0YW5jZVtsay5wYXRoXVxyXG4gICAgfSlcclxuICAgIHBhcmFtcy5pbnN0YW5jZSA9IGluc3RhbmNlXHJcbiAgICBwYXJhbXMub25DaGFuZ2UgPSBpbnN0YW5jZS5ub3RpZnlDaGFuZ2VcclxuICAgIHJldHVybiBwYXJhbXNcclxuICB9XHJcbn1cclxuXHJcbmV4cG9ydCBjbGFzcyBXaW5kb3dJbnN0YW5jZSB7XHJcbiAgLy8gRGVmaW5pdGlvblxyXG4gIGlkOiBXaW5kb3dJRFxyXG4gIHdpbmRvd0NsYXNzOiBXaW5kb3dDbGFzc1xyXG4gIHBhcmVudDogV2luZG93SW5zdGFuY2VcclxuICBwbHVnaW46IFBsdWdpbkNvbXBvbmVudFxyXG4gIGNvbXBvbmVudDogV2luZG93Q29tcG9uZW50XHJcbiAgY29udGFpbmVyOiBXaW5kb3dDb250YWluZXJcclxuICBub2RlOiBIdG1sRWxlbWVudFxyXG5cclxuICAvLyBPcHRpb25zXHJcbiAgZG9ja0lkOiBEb2NrSURcclxuICB0aXRsZTogc3RyaW5nXHJcbiAgaWNvbjogc3RyaW5nXHJcbiAgcGFyYW1ldGVyczogeyBbc3RyaW5nXTogYW55IH1cclxuXHJcbiAgY29uc3RydWN0b3Iod2luZG93SWQ6IFdpbmRvd0lELCB3aW5kb3dDbGFzczogV2luZG93Q2xhc3MsXHJcbiAgICBwYXJlbnQ6IFdpbmRvd0luc3RhbmNlLCBwbHVnaW46IFdpbmRvd0luc3RhbmNlLCBvcHRpb25zOiBXaW5kb3dPcHRpb25zXHJcbiAgKSB7XHJcbiAgICB0aGlzLmlkID0gd2luZG93SWRcclxuICAgIHRoaXMud2luZG93Q2xhc3MgPSB3aW5kb3dDbGFzc1xyXG4gICAgdGhpcy5wYXJlbnQgPSBwYXJlbnRcclxuICAgIHRoaXMucGx1Z2luID0gcGx1Z2luXHJcbiAgICB0aGlzLmNvbXBvbmVudCA9IHdpbmRvd0NsYXNzLmNvbXBvbmVudFxyXG4gICAgdGhpcy5ub2RlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKVxyXG4gICAgdGhpcy5ub2RlLmNsYXNzTmFtZSA9IFwicG9zaXRpb24tcmVsYXRpdmUgd2lkdGgtMTAwIGhlaWdodC0xMDAgb3ZlcmZsb3ctXCIgKyB3aW5kb3dDbGFzcy5vdmVyZmxvd1xyXG4gICAgdGhpcy5sYXlvdXQud2luZG93c1t3aW5kb3dJZF0gPSB0aGlzXHJcbiAgICB0aGlzLnRpdGxlID0gd2luZG93Q2xhc3MuZGVmYXVsdFRpdGxlXHJcbiAgICB0aGlzLmljb24gPSB3aW5kb3dDbGFzcy5kZWZhdWx0SWNvblxyXG4gICAgdGhpcy5kb2NrSWQgPSB3aW5kb3dDbGFzcy5kZWZhdWx0RG9ja0lkXHJcbiAgICB0aGlzLnBhcmFtZXRlcnMgPSB3aW5kb3dDbGFzcy5jcmVhdGVEZWZhdWx0UGFyYW1ldGVycyh0aGlzKVxyXG4gICAgdGhpcy51cGRhdGVPcHRpb25zKG9wdGlvbnMpXHJcbiAgfVxyXG4gIHVwZGF0ZU9wdGlvbnMob3B0aW9uczogV2luZG93T3B0aW9ucykge1xyXG4gICAgaWYgKG9wdGlvbnMpIHtcclxuICAgICAgaWYgKG9wdGlvbnMudGl0bGUpIHRoaXMudGl0bGUgPSBvcHRpb25zLnRpdGxlXHJcbiAgICAgIGlmIChvcHRpb25zLmljb24pIHRoaXMuaWNvbiA9IG9wdGlvbnMuaWNvblxyXG4gICAgICBpZiAob3B0aW9ucy5kb2NrSWQpIHRoaXMuZG9ja0lkID0gb3B0aW9ucy5kb2NrSWRcclxuICAgICAgaWYgKG9wdGlvbnMucGFyYW1ldGVycykge1xyXG4gICAgICAgIHRoaXMucGFyYW1ldGVycyA9IHtcclxuICAgICAgICAgIC4uLnRoaXMucGFyYW1ldGVycyxcclxuICAgICAgICAgIC4uLm9wdGlvbnMucGFyYW1ldGVycyxcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgIH1cclxuICAgIHRoaXMucmVuZGVyKClcclxuICB9XHJcbiAgY2xvc2UoKSB7XHJcbiAgICBSZWFjdERPTS51bm1vdW50Q29tcG9uZW50QXROb2RlKHRoaXMubm9kZSlcclxuICB9XHJcbiAgbm90aWZ5Rm9jdXMoKSB7XHJcbiAgfVxyXG4gIG5vdGlmeUJsdXIoKSB7XHJcbiAgfVxyXG4gIG5vdGlmeUNoYW5nZSA9IChwYXJhbWV0ZXJzKSA9PiB7XHJcbiAgICB0aGlzLnVwZGF0ZU9wdGlvbnMoeyBwYXJhbWV0ZXJzIH0pXHJcbiAgfVxyXG4gIHJlbmRlcigpIHtcclxuICAgIFJlYWN0RE9NLnJlbmRlcihSZWFjdC5jcmVhdGVFbGVtZW50KHRoaXMuY29tcG9uZW50LCB0aGlzLnBhcmFtZXRlcnMpLCB0aGlzLm5vZGUpXHJcbiAgfVxyXG59XHJcblxyXG5leHBvcnQgdHlwZSBQcm9wc1R5cGUgPSB7XHJcbiAgY3VycmVudDogV2luZG93SW5zdGFuY2UsXHJcbiAgY2xhc3NOYW1lOiBzdHJpbmcsXHJcbiAgc3R5bGU6IGFueSxcclxufVxyXG5cclxuZXhwb3J0IGNsYXNzIFdpbmRvd0NvbnRhaW5lciBleHRlbmRzIENvbXBvbmVudDx2b2lkLCBQcm9wc1R5cGUsIFN0YXRlVHlwZT4ge1xyXG4gIHByb3BzOiBQcm9wc1R5cGVcclxuICB3aW5kb3c6IFdpbmRvd0luc3RhbmNlXHJcblxyXG4gIGNvbXBvbmVudERpZE1vdW50KCkge1xyXG4gICAgdGhpcy5tb3VudFdpbmRvdyh0aGlzLnByb3BzLmN1cnJlbnQpXHJcbiAgfVxyXG4gIGNvbXBvbmVudFdpbGxSZWNlaXZlUHJvcHMobmV4dFByb3BzKSB7XHJcbiAgICBpZiAodGhpcy5wcm9wcy5jdXJyZW50ICE9PSBuZXh0UHJvcHMuY3VycmVudCkge1xyXG4gICAgICB0aGlzLnVubW91bnRXaW5kb3coKVxyXG4gICAgICB0aGlzLm1vdW50V2luZG93KG5leHRQcm9wcy5jdXJyZW50KVxyXG4gICAgfVxyXG4gIH1cclxuICBjb21wb25lbnRXaWxsVW5tb3VudCgpIHtcclxuICAgIHRoaXMudW5tb3VudFdpbmRvdygpXHJcbiAgfVxyXG4gIG1vdW50V2luZG93KHdpbmRvdykge1xyXG4gICAgdGhpcy53aW5kb3cgPSB3aW5kb3dcclxuICAgIGlmICh3aW5kb3cpIHtcclxuICAgICAgdGhpcy5yZWZzLnJvb3QuYXBwZW5kQ2hpbGQod2luZG93Lm5vZGUpXHJcbiAgICAgIHdpbmRvdy5jb250YWluZXIgPSB0aGlzXHJcbiAgICB9XHJcbiAgfVxyXG4gIHVubW91bnRXaW5kb3coKSB7XHJcbiAgICBpZiAodGhpcy53aW5kb3cgJiYgdGhpcy53aW5kb3cuY29udGFpbmVyID09PSB0aGlzKSB7XHJcbiAgICAgIHRoaXMucmVmcy5yb290LnJlbW92ZUNoaWxkKHRoaXMud2luZG93Lm5vZGUpXHJcbiAgICAgIHRoaXMud2luZG93LmNvbnRhaW5lciA9IG51bGxcclxuICAgIH1cclxuICB9XHJcbiAgd2lkdGgoKSB7XHJcbiAgICByZXR1cm4gdGhpcy5yZWZzLnJvb3QgJiYgdGhpcy5yZWZzLnJvb3QuY2xpZW50V2lkdGhcclxuICB9XHJcbiAgaGVpZ2h0KCkge1xyXG4gICAgcmV0dXJuIHRoaXMucmVmcy5yb290ICYmIHRoaXMucmVmcy5yb290LmNsaWVudEhlaWdodFxyXG4gIH1cclxuICBoYW5kbGVGb2N1cyA9ICgpID0+IHtcclxuICAgIHRoaXMubGF5b3V0LmZvY3VzT25XaW5kb3codGhpcy53aW5kb3cpXHJcbiAgfVxyXG4gIHJlbmRlcigpIHtcclxuICAgIGNvbnN0IHsgY2xhc3NOYW1lLCBzdHlsZSB9ID0gdGhpcy5wcm9wc1xyXG4gICAgcmV0dXJuICg8ZGl2XHJcbiAgICAgIHJlZj1cInJvb3RcIlxyXG4gICAgICB0YWJJbmRleD17MX1cclxuICAgICAgY2xhc3NOYW1lPXtjbGFzc05hbWV9XHJcbiAgICAgIHN0eWxlPXtzdHlsZX1cclxuICAgICAgb25Gb2N1cz17dGhpcy5oYW5kbGVGb2N1c31cclxuICAgIC8+KVxyXG4gIH1cclxufVxyXG5cclxuZXhwb3J0IGNsYXNzIFdpbmRvd0NvbXBvbmVudDxEZWZhdWx0UHJvcHMsIFByb3BzLCBTdGF0ZT5cclxuICBleHRlbmRzIENvbXBvbmVudDxEZWZhdWx0UHJvcHMsIFByb3BzLCBTdGF0ZT5cclxue1xyXG4gIGluc3RhbmNlOiBXaW5kb3dJbnN0YW5jZVxyXG4gIHBsdWdpbjogUGx1Z2luQ29tcG9uZW50XHJcblxyXG4gIGNvbnN0cnVjdG9yKHByb3BzKSB7XHJcbiAgICBzdXBlcihwcm9wcylcclxuICAgIHRoaXMuaW5zdGFuY2UgPSBwcm9wcy5pbnN0YW5jZVxyXG4gICAgdGhpcy5wbHVnaW4gPSBwcm9wcy5pbnN0YW5jZS5wbHVnaW5cclxuICB9XHJcbiAgaXNXaW5kb3coKSB7XHJcbiAgICByZXR1cm4gdHJ1ZVxyXG4gIH1cclxuICBsb2coc2V2ZXJpdHkpIHtcclxuICAgIGNvbnN0IG1lc3NhZ2UgPSB7XHJcbiAgICAgIHNldmVyaXR5OiBzZXZlcml0eSxcclxuICAgICAgZnJvbTogdGhpcy5wcm9wcyAmJiB0aGlzLnByb3BzLndpbmRvdyAmJiB0aGlzLnByb3BzLndpbmRvdy50aXRsZSxcclxuICAgICAgY29udGVudDogYXJndW1lbnRzWzFdLFxyXG4gICAgfVxyXG4gICAgaWYgKGFyZ3VtZW50cy5sZW5ndGggPiAxKSB7XHJcbiAgICAgIG1lc3NhZ2UuY29udGVudCA9IEFycmF5LnByb3RvdHlwZS5zbGljZS5jYWxsKGFyZ3VtZW50cywgMSlcclxuICAgIH1cclxuICAgIGlmIChzZXZlcml0eSA9PT0gXCJlcnJvclwiKSBjb25zb2xlLmVycm9yKC4uLm1lc3NhZ2UuY29udGVudClcclxuICAgIGVsc2UgY29uc29sZS5sb2coLi4ubWVzc2FnZS5jb250ZW50KVxyXG4gICAgdGhpcy5wbHVnaW4uYXBwbGljYXRpb24uc2V0RW52KFwiY29uc29sZS5kZWJ1Z1wiLCBtZXNzYWdlKVxyXG4gIH1cclxuICBvcGVuV2luZG93KHdpbmRvd0NsYXNzSUQ6IFdpbmRvd0NsYXNzSUQsIG9wdGlvbnM6IFdpbmRvd09wdGlvbnMpIHtcclxuICAgIGNvbnN0IHsgbGF5b3V0IH0gPSB0aGlzLmluc3RhbmNlXHJcbiAgICBsYXlvdXQub3BlblN1YldpbmRvdyh0aGlzLndpbmRvd0NsYXNzLndpbmRvd3Nbd2luZG93Q2xhc3NJRF0sIHRoaXMsIG9wdGlvbnMpXHJcbiAgfVxyXG4gIGNsb3NlV2luZG93KHdpbmRvd0NsYXNzSUQ6IFdpbmRvd0NsYXNzSUQpIHtcclxuICAgIGNvbnN0IHsgbGF5b3V0IH0gPSB0aGlzLmluc3RhbmNlXHJcbiAgICBpZiAod2luZG93Q2xhc3NJRCkge1xyXG4gICAgICBsYXlvdXQuY2xvc2VTdWJXaW5kb3codGhpcy53aW5kb3dDbGFzcy53aW5kb3dzW3dpbmRvd0NsYXNzSURdLCB0aGlzKVxyXG4gICAgfVxyXG4gICAgZWxzZSB7XHJcbiAgICAgIGxheW91dC5yZW1vdmVXaW5kb3codGhpcy5pbnN0YW5jZS5pZClcclxuICAgIH1cclxuICB9XHJcbn1cclxuIl19