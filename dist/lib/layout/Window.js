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
      if (this.container) throw new Error("a window shall be dettached before closing");
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9saWIvbGF5b3V0L1dpbmRvdy5qcyJdLCJuYW1lcyI6WyJXaW5kb3dDbGFzcyIsIm5hbWUiLCJkZXNjIiwicGx1Z2luQ2xhc3MiLCJ3aW5kb3dzIiwiT2JqZWN0Iiwia2V5cyIsImZvckVhY2giLCJrZXkiLCJvdmVyZmxvdyIsImNvbnNvbGUiLCJhc3NlcnQiLCJjb21wb25lbnQiLCJXaW5kb3dDb21wb25lbnQiLCJsaW5rIiwibGlua3MiLCJwdXNoIiwiaW5zdGFuY2UiLCJwYXJhbXMiLCJkZWZhdWx0UGFyYW1ldGVycyIsImxrIiwicGFyYW0iLCJwYXRoIiwib25DaGFuZ2UiLCJoYW5kbGVDaGFuZ2UiLCJXaW5kb3dJbnN0YW5jZSIsIndpbmRvd0lkIiwid2luZG93Q2xhc3MiLCJwYXJlbnQiLCJwbHVnaW4iLCJvcHRpb25zIiwicGFyYW1ldGVycyIsInVwZGF0ZU9wdGlvbnMiLCJpZCIsIm5vZGUiLCJkb2N1bWVudCIsImNyZWF0ZUVsZW1lbnQiLCJjbGFzc05hbWUiLCJsYXlvdXQiLCJ0aXRsZSIsImRlZmF1bHRUaXRsZSIsImljb24iLCJkZWZhdWx0SWNvbiIsImRvY2tJZCIsImRlZmF1bHREb2NrSWQiLCJjcmVhdGVEZWZhdWx0UGFyYW1ldGVycyIsInJlbmRlciIsIndpbmRvd0NsYXNzSUQiLCJvcGVuU3ViV2luZG93Iiwid2luZG93SUQiLCJzaG93U3ViV2luZG93IiwiY29udGFpbmVyIiwiRXJyb3IiLCJ1bm1vdW50Q29tcG9uZW50QXROb2RlIiwiV2luZG93Q29udGFpbmVyIiwic3RhdGUiLCJ3aW5kb3ciLCJtb3VudFdpbmRvdyIsInByb3BzIiwiY3VycmVudCIsIm5leHRQcm9wcyIsInVubW91bnRXaW5kb3ciLCJyZWZzIiwicm9vdCIsImNsaWVudFdpZHRoIiwiY2xpZW50SGVpZ2h0IiwiYXBwZW5kQ2hpbGQiLCJzZXRTdGF0ZSIsInJlbW92ZUNoaWxkIiwic3R5bGUiLCJzZXZlcml0eSIsIm1lc3NhZ2UiLCJmcm9tIiwiY29udGVudCIsImFyZ3VtZW50cyIsImxlbmd0aCIsIkFycmF5IiwicHJvdG90eXBlIiwic2xpY2UiLCJjYWxsIiwiZXJyb3IiLCJsb2ciLCJhcHBsaWNhdGlvbiIsInNldEVudiIsIm9wZW5XaW5kb3ciLCJhcHBseSIsImNsb3NlV2luZG93Il0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7cWpCQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQUNBOzs7O0FBQ0E7Ozs7QUFFQTs7Ozs7Ozs7Ozs7O0lBV2FBLFcsV0FBQUEsVztBQVlYLHVCQUFZQyxJQUFaLEVBQTBCQyxJQUExQixFQUF3Q0MsV0FBeEMsRUFBa0U7QUFBQTs7QUFBQTs7QUFBQSxTQUhsRUMsT0FHa0UsR0FIdEIsRUFHc0I7O0FBQ2hFRixZQUFRRyxPQUFPQyxJQUFQLENBQVlKLElBQVosRUFBa0JLLE9BQWxCLENBQTBCO0FBQUEsYUFBTyxNQUFLQyxHQUFMLElBQVlOLEtBQUtNLEdBQUwsQ0FBbkI7QUFBQSxLQUExQixDQUFSO0FBQ0EsU0FBS1AsSUFBTCxHQUFZQSxJQUFaO0FBQ0EsU0FBS1EsUUFBTCxHQUFnQixLQUFLQSxRQUFMLElBQWlCLE1BQWpDO0FBQ0EsU0FBS04sV0FBTCxHQUFtQkEsV0FBbkI7QUFDQU8sWUFBUUMsTUFBUixDQUFlLDBCQUFjLEtBQUtDLFNBQW5CLEVBQThCQyxlQUE5QixDQUFmLEVBQ0UsVUFERixFQUNjLEtBQUtaLElBRG5CLEVBQ3lCLHFDQUR6QjtBQUVELEcsQ0Fmb0M7Ozs7OzRCQWdCN0JhLEksRUFBYztBQUNwQixVQUFJLENBQUMsS0FBS0MsS0FBVixFQUFpQixLQUFLQSxLQUFMLEdBQWEsQ0FBRUQsSUFBRixDQUFiLENBQWpCLEtBQ0ssS0FBS0MsS0FBTCxDQUFXQyxJQUFYLENBQWdCRixJQUFoQjtBQUNOOzs7NENBQ3VCRyxRLEVBQWtDO0FBQ3hELFVBQU1DLHNCQUFjLEtBQUtDLGlCQUFuQixDQUFOO0FBQ0EsV0FBS0osS0FBTCxJQUFjLEtBQUtBLEtBQUwsQ0FBV1IsT0FBWCxDQUFtQixjQUFN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Q0Q7Ozs7Z0NBQ1loRCxRLEVBQW9CO0FBQzlCLFVBQU04QixTQUFTLEtBQUtFLEtBQUwsQ0FBV0YsTUFBMUI7QUFDQUEsYUFBTzhCLFdBQVAsQ0FBbUJELEtBQW5CLENBQXlCN0IsTUFBekIsRUFBaUNrQixTQUFqQztBQUNEIiwiZmlsZSI6IldpbmRvdy5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8qIGVzbGludC1kaXNhYmxlIG5vLXVzZS1iZWZvcmUtZGVmaW5lICovXHJcbi8qIGVzbGludC1kaXNhYmxlIHJlYWN0L25vLW11bHRpLWNvbXAgKi9cclxuLyogZXNsaW50LWRpc2FibGUgcmVhY3QvcHJvcC10eXBlcyAqL1xyXG4vKiBlc2xpbnQtZGlzYWJsZSByZWFjdC9uby1zdHJpbmctcmVmcyAqL1xyXG4vKiBlc2xpbnQtZGlzYWJsZSByZWFjdC9zb3J0LWNvbXAgKi9cclxuaW1wb3J0IFJlYWN0LCB7IENvbXBvbmVudCB9IGZyb20gXCJyZWFjdFwiXHJcbmltcG9ydCBSZWFjdERPTSBmcm9tIFwicmVhY3QtZG9tXCJcclxuXHJcbmltcG9ydCB7IGlzSW5oZXJpdGVkT2YgfSBmcm9tIFwiLi4vdXRpbHNcIlxyXG5cclxuZXhwb3J0IHR5cGUgV2luZG93SUQgPSBzdHJpbmdcclxuZXhwb3J0IHR5cGUgV2luZG93Q2xhc3NJRCA9IHN0cmluZ1xyXG5cclxuZXhwb3J0IHR5cGUgV2luZG93T3B0aW9ucyA9IHtcclxuICB0aXRsZTogc3RyaW5nLFxyXG4gIGRvY2tJZDogRG9ja0lELFxyXG4gIHBhcmFtZXRlcnM6IHsgW3N0cmluZ106IGFueSB9LFxyXG59XHJcblxyXG5leHBvcnQgY2xhc3MgV2luZG93Q2xhc3Mge1xyXG4gIG5hbWU6IHN0cmluZ1xyXG4gIG92ZXJmbG93OiBzdHJpbmdcclxuICBrZWVwQWxpdmU6IGJvb2xlYW5cclxuICBjb21wb25lbnQ6IEZ1bmN0aW9uPFdpbmRvd0NvbXBvbmVudD4gLy8gY29uc3RydWN0b3Igb2YgV2luZG93Q29tcG9uZW50XHJcbiAgZGVmYXVsdFRpdGxlOiBzdHJpbmdcclxuICBkZWZhdWx0RG9ja0lkOiBEb2NrSURcclxuICBkZWZhdWx0UGFyYW1ldGVyczogT2JqZWN0XHJcblxyXG4gIHdpbmRvd3M6IHsgW1dpbmRvd0NsYXNzSURdOiBXaW5kb3dDbGFzcyB9ID0ge31cclxuICBsaW5rczogQXJyYXk8UGFyYW1ldGVyTGluaz5cclxuXHJcbiAgY29uc3RydWN0b3IobmFtZTogc3RyaW5nLCBkZXNjOiBPYmplY3QsIHBsdWdpbkNsYXNzOiBQbHVnaW5DbGFzcykge1xyXG4gICAgZGVzYyAmJiBPYmplY3Qua2V5cyhkZXNjKS5mb3JFYWNoKGtleSA9PiB0aGlzW2tleV0gPSBkZXNjW2tleV0pXHJcbiAgICB0aGlzLm5hbWUgPSBuYW1lXHJcbiAgICB0aGlzLm92ZXJmbG93ID0gdGhpcy5vdmVyZmxvdyB8fCBcImF1dG9cIlxyXG4gICAgdGhpcy5wbHVnaW5DbGFzcyA9IHBsdWdpbkNsYXNzXHJcbiAgICBjb25zb2xlLmFzc2VydChpc0luaGVyaXRlZE9mKHRoaXMuY29tcG9uZW50LCBXaW5kb3dDb21wb25lbnQpLFxyXG4gICAgICBcIldpbmRvdyAnXCIsIHRoaXMubmFtZSwgXCInIHNoYWxsIGJlIGJhc2VkIG9uIFdpbmRvd0NvbXBvbmVudFwiKVxyXG4gIH1cclxuICBhZGRMaW5rKGxpbms6IE9iamVjdCkge1xyXG4gICAgaWYgKCF0aGlzLmxpbmtzKSB0aGlzLmxpbmtzID0gWyBsaW5rIF1cclxuICAgIGVsc2UgdGhpcy5saW5rcy5wdXNoKGxpbmspXHJcbiAgfVxyXG4gIGNyZWF0ZURlZmF1bHRQYXJhbWV0ZXJzKGluc3RhbmNlOiBXaW5kb3dJbnN0YW5jZSk6IE9iamVjdCB7XHJcbiAgICBjb25zdCBwYXJhbXMgPSB7IC4uLnRoaXMuZGVmYXVsdFBhcmFtZXRlcnMgfVxyXG4gICAgdGhpcy5saW5rcyAmJiB0aGlzLmxpbmtzLmZvckVhY2gobGsgPT4ge1xyXG4gICAgICBwYXJhbXNbbGsucGFyYW1dID0gbGsucGx1Z2luQ2xhc3MuaW5zdGFuY2VbbGsucGF0aF1cclxuICAgIH0pXHJcbiAgICBwYXJhbXMuaW5zdGFuY2UgPSBpbnN0YW5jZVxyXG4gICAgcGFyYW1zLm9uQ2hhbmdlID0gaW5zdGFuY2UuaGFuZGxlQ2hhbmdlXHJcbiAgICByZXR1cm4gcGFyYW1zXHJcbiAgfVxyXG59XHJcblxyXG5leHBvcnQgY2xhc3MgV2luZG93SW5zdGFuY2Uge1xyXG4gIC8vIERlZmluaXRpb25cclxuICBpZDogV2luZG93SURcclxuICB3aW5kb3dDbGFzczogV2luZG93Q2xhc3NcclxuICBwYXJlbnQ6IFdpbmRvd0luc3RhbmNlXHJcbiAgcGx1Z2luOiBQbHVnaW5JbnN0YW5jZVxyXG4gIGNvbXBvbmVudDogV2luZG93Q29tcG9uZW50XHJcbiAgY29udGFpbmVyOiBXaW5kb3dDb250YWluZXJcclxuICBub2RlOiBIdG1sRWxlbWVudFxyXG5cclxuICAvLyBPcHRpb25zXHJcbiAgZG9ja0lkOiBEb2NrSURcclxuICB0aXRsZTogc3RyaW5nXHJcbiAgaWNvbjogc3RyaW5nXHJcbiAgcGFyYW1ldGVyczogeyBbc3RyaW5nXTogYW55IH1cclxuXHJcbiAgY29uc3RydWN0b3Iod2luZG93SWQ6IFdpbmRvd0lELCB3aW5kb3dDbGFzczogV2luZG93Q2xhc3MsXHJcbiAgICBwYXJlbnQ6IFdpbmRvd0luc3RhbmNlLCBwbHVnaW46IFdpbmRvd0luc3RhbmNlLCBvcHRpb25zOiBXaW5kb3dPcHRpb25zXHJcbiAgKSB7XHJcbiAgICB0aGlzLmlkID0gd2luZG93SWRcclxuICAgIHRoaXMud2luZG93Q2xhc3MgPSB3aW5kb3dDbGFzc1xyXG4gICAgdGhpcy5wYXJlbnQgPSBwYXJlbnRcclxuICAgIHRoaXMucGx1Z2luID0gcGx1Z2luXHJcbiAgICB0aGlzLmNvbXBvbmVudCA9IHdpbmRvd0NsYXNzLmNvbXBvbmVudFxyXG4gICAgdGhpcy5ub2RlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKVxyXG4gICAgdGhpcy5ub2RlLmNsYXNzTmFtZSA9IFwicG9zaXRpb24tcmVsYXRpdmUgd2lkdGgtMTAwIGhlaWdodC0xMDAgb3ZlcmZsb3ctXCIrd2luZG93Q2xhc3Mub3ZlcmZsb3dcclxuICAgIHRoaXMubGF5b3V0LndpbmRvd3Nbd2luZG93SWRdID0gdGhpc1xyXG4gICAgdGhpcy50aXRsZSA9IHdpbmRvd0NsYXNzLmRlZmF1bHRUaXRsZVxyXG4gICAgdGhpcy5pY29uID0gd2luZG93Q2xhc3MuZGVmYXVsdEljb25cclxuICAgIHRoaXMuZG9ja0lkID0gd2luZG93Q2xhc3MuZGVmYXVsdERvY2tJZFxyXG4gICAgdGhpcy5wYXJhbWV0ZXJzID0gd2luZG93Q2xhc3MuY3JlYXRlRGVmYXVsdFBhcmFtZXRlcnModGhpcylcclxuICAgIHRoaXMudXBkYXRlT3B0aW9ucyhvcHRpb25zKVxyXG4gIH1cclxuICB1cGRhdGVPcHRpb25zKG9wdGlvbnM6IFdpbmRvd09wdGlvbnMpIHtcclxuICAgIGlmIChvcHRpb25zKSB7XHJcbiAgICAgIGlmIChvcHRpb25zLnRpdGxlKSB0aGlzLnRpdGxlID0gb3B0aW9ucy50aXRsZVxyXG4gICAgICBpZiAob3B0aW9ucy5pY29uKSB0aGlzLmljb24gPSBvcHRpb25zLmljb25cclxuICAgICAgaWYgKG9wdGlvbnMuZG9ja0lkKSB0aGlzLmRvY2tJZCA9IG9wdGlvbnMuZG9ja0lkXHJcbiAgICAgIGlmIChvcHRpb25zLnBhcmFtZXRlcnMpIHtcclxuICAgICAgICB0aGlzLnBhcmFtZXRlcnMgPSB7XHJcbiAgICAgICAgICAuLi50aGlzLnBhcmFtZXRlcnMsXHJcbiAgICAgICAgICAuLi5vcHRpb25zLnBhcmFtZXRlcnMsXHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgICB0aGlzLnJlbmRlcigpXHJcbiAgfVxyXG4gIG9wZW5XaW5kb3cod2luZG93Q2xhc3NJRDogV2luZG93Q2xhc3NJRCwgb3B0aW9uczogV2luZG93T3B0aW9ucykge1xyXG4gICAgdGhpcy5sYXlvdXQub3BlblN1YldpbmRvdyh0aGlzLndpbmRvd0NsYXNzLndpbmRvd3Nbd2luZG93Q2xhc3NJRF0sIHRoaXMsIG9wdGlvbnMpXHJcbiAgfVxyXG4gIHNob3dXaW5kb3cod2luZG93SUQ6IFdpbmRvd0lELCBvcHRpb25zOiBXaW5kb3dPcHRpb25zKTogV2luZG93SUQge1xyXG4gICAgdGhpcy5sYXlvdXQuc2hvd1N1YldpbmRvdyh0aGlzLndpbmRvd3Nbd2luZG93SURdLCB0aGlzLCBvcHRpb25zKVxyXG4gIH1cclxuICBjbG9zZSgpIHtcclxuICAgIGlmICh0aGlzLmNvbnRhaW5lcikgdGhyb3cgbmV3IEVycm9yKFwiYSB3aW5kb3cgc2hhbGwgYmUgZGV0dGFjaGVkIGJlZm9yZSBjbG9zaW5nXCIpXHJcbiAgICBSZWFjdERPTS51bm1vdW50Q29tcG9uZW50QXROb2RlKHRoaXMubm9kZSlcclxuICB9XHJcbiAgaGFuZGxlQ2hhbmdlID0gKHBhcmFtZXRlcnMpID0+IHtcclxuICAgIHRoaXMudXBkYXRlT3B0aW9ucyh7IHBhcmFtZXRlcnMgfSlcclxuICB9XHJcbiAgcmVuZGVyKCkge1xyXG4gICAgUmVhY3RET00ucmVuZGVyKFJlYWN0LmNyZWF0ZUVsZW1lbnQodGhpcy5jb21wb25lbnQsIHRoaXMucGFyYW1ldGVycyksIHRoaXMubm9kZSlcclxuICB9XHJcbn1cclxuXHJcbmV4cG9ydCB0eXBlIFByb3BzVHlwZSA9IHtcclxuICBjdXJyZW50OiBXaW5kb3dJbnN0YW5jZSxcclxuICBjbGFzc05hbWU6IHN0cmluZyxcclxuICBzdHlsZTogYW55LFxyXG59XHJcblxyXG5leHBvcnQgdHlwZSBTdGF0ZVR5cGUgPSB7XHJcbiAgd2luZG93OiBXaW5kb3dJbnN0YW5jZSxcclxufVxyXG5cclxuZXhwb3J0IGNsYXNzIFdpbmRvd0NvbnRhaW5lciBleHRlbmRzIENvbXBvbmVudDx2b2lkLCBQcm9wc1R5cGUsIFN0YXRlVHlwZT4ge1xyXG4gIHByb3BzOiBQcm9wc1R5cGVcclxuICBzdGF0ZTogU3RhdGVUeXBlID0geyB3aW5kb3c6IG51bGwgfVxyXG5cclxuICBjb21wb25lbnREaWRNb3VudCgpIHtcclxuICAgIHRoaXMubW91bnRXaW5kb3codGhpcy5wcm9wcy5jdXJyZW50KVxyXG4gIH1cclxuICBjb21wb25lbnRXaWxsUmVjZWl2ZVByb3BzKG5leHRQcm9wcykge1xyXG4gICAgaWYgKHRoaXMucHJvcHMuY3VycmVudCAhPT0gbmV4dFByb3BzLmN1cnJlbnQpIHtcclxuICAgICAgdGhpcy51bm1vdW50V2luZG93KClcclxuICAgICAgdGhpcy5tb3VudFdpbmRvdyhuZXh0UHJvcHMuY3VycmVudClcclxuICAgIH1cclxuICB9XHJcbiAgY29tcG9uZW50V2lsbFVubW91bnQoKSB7XHJcbiAgICB0aGlzLnVubW91bnRXaW5kb3coKVxyXG4gIH1cclxuICB3aWR0aCgpIHtcclxuICAgIHJldHVybiB0aGlzLnJlZnMucm9vdCAmJiB0aGlzLnJlZnMucm9vdC5jbGllbnRXaWR0aFxyXG4gIH1cclxuICBoZWlnaHQoKSB7XHJcbiAgICByZXR1cm4gdGhpcy5yZWZzLnJvb3QgJiYgdGhpcy5yZWZzLnJvb3QuY2xpZW50SGVpZ2h0XHJcbiAgfVxyXG4gIG1vdW50V2luZG93KHdpbmRvdykge1xyXG4gICAgaWYgKHdpbmRvdykge1xyXG4gICAgICB0aGlzLnJlZnMucm9vdC5hcHBlbmRDaGlsZCh3aW5kb3cubm9kZSlcclxuICAgICAgd2luZG93LmNvbnRhaW5lciA9IHRoaXNcclxuICAgICAgdGhpcy5zZXRTdGF0ZSh7IHdpbmRvdzogd2luZG93IH0pXHJcbiAgICB9XHJcbiAgICBlbHNlIHtcclxuICAgICAgdGhpcy5zZXRTdGF0ZSh7IHdpbmRvdzogbnVsbCB9KVxyXG4gICAgfVxyXG4gIH1cclxuICB1bm1vdW50V2luZG93KCkge1xyXG4gICAgY29uc3QgeyB3aW5kb3cgfSA9IHRoaXMuc3RhdGVcclxuICAgIGlmICh3aW5kb3cgJiYgd2luZG93LmNvbnRhaW5lciA9PT0gdGhpcykge1xyXG4gICAgICB0aGlzLnJlZnMucm9vdC5yZW1vdmVDaGlsZCh3aW5kb3cubm9kZSlcclxuICAgICAgd2luZG93LmNvbnRhaW5lciA9IG51bGxcclxuICAgIH1cclxuICB9XHJcbiAgcmVuZGVyKCkge1xyXG4gICAgY29uc3QgeyBjbGFzc05hbWUsIHN0eWxlIH0gPSB0aGlzLnByb3BzXHJcbiAgICByZXR1cm4gKDxkaXYgcmVmPVwicm9vdFwiIGNsYXNzTmFtZT17IGNsYXNzTmFtZSB9IHN0eWxlPXsgc3R5bGUgfSAvPilcclxuICB9XHJcbn1cclxuXHJcbmV4cG9ydCBjbGFzcyBXaW5kb3dDb21wb25lbnQ8RGVmYXVsdFByb3BzLCBQcm9wcywgU3RhdGU+XHJcbiAgZXh0ZW5kcyBDb21wb25lbnQ8RGVmYXVsdFByb3BzLCBQcm9wcywgU3RhdGU+XHJcbntcclxuICBpbnN0YW5jZTogV2luZG93SW5zdGFuY2VcclxuICBwbHVnaW46IFBsdWdpbkluc3RhbmNlXHJcblxyXG4gIGNvbnN0cnVjdG9yKHByb3BzKSB7XHJcbiAgICBzdXBlcihwcm9wcylcclxuICAgIHRoaXMuaW5zdGFuY2UgPSBwcm9wcy5pbnN0YW5jZVxyXG4gICAgdGhpcy5wbHVnaW4gPSBwcm9wcy5pbnN0YW5jZS5wbHVnaW5cclxuICB9XHJcbiAgaXNXaW5kb3coKSB7XHJcbiAgICByZXR1cm4gdHJ1ZVxyXG4gIH1cclxuICBsb2coc2V2ZXJpdHkpIHtcclxuICAgIGNvbnN0IG1lc3NhZ2UgPSB7XHJcbiAgICAgIHNldmVyaXR5OiBzZXZlcml0eSxcclxuICAgICAgZnJvbTogdGhpcy5wcm9wcyAmJiB0aGlzLnByb3BzLndpbmRvdyAmJiB0aGlzLnByb3BzLndpbmRvdy50aXRsZSxcclxuICAgICAgY29udGVudDogYXJndW1lbnRzWzFdLFxyXG4gICAgfVxyXG4gICAgaWYgKGFyZ3VtZW50cy5sZW5ndGggPiAxKSB7XHJcbiAgICAgIG1lc3NhZ2UuY29udGVudCA9IEFycmF5LnByb3RvdHlwZS5zbGljZS5jYWxsKGFyZ3VtZW50cywgMSlcclxuICAgIH1cclxuICAgIGlmIChzZXZlcml0eSA9PT0gXCJlcnJvclwiKSBjb25zb2xlLmVycm9yKC4uLm1lc3NhZ2UuY29udGVudClcclxuICAgIGVsc2UgY29uc29sZS5sb2coLi4ubWVzc2FnZS5jb250ZW50KVxyXG4gICAgdGhpcy5wbHVnaW4uYXBwbGljYXRpb24uc2V0RW52KFwiY29uc29sZS5kZWJ1Z1wiLCBtZXNzYWdlKVxyXG4gIH1cclxuICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tdW51c2VkLXZhcnNcclxuICBvcGVuV2luZG93KHdpbmRvd0NsYXNzSUQ6IFdpbmRvd0NsYXNzSUQsIG9wdGlvbnM6IFdpbmRvd09wdGlvbnMpIHtcclxuICAgIGNvbnN0IHdpbmRvdyA9IHRoaXMucHJvcHMud2luZG93XHJcbiAgICB3aW5kb3cub3BlbldpbmRvdy5hcHBseSh3aW5kb3csIGFyZ3VtZW50cylcclxuICB9XHJcbiAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXVudXNlZC12YXJzXHJcbiAgY2xvc2VXaW5kb3cod2luZG93SWQ6IFdpbmRvd0lEKSB7XHJcbiAgICBjb25zdCB3aW5kb3cgPSB0aGlzLnByb3BzLndpbmRvd1xyXG4gICAgd2luZG93LmNsb3NlV2luZG93LmFwcGx5KHdpbmRvdywgYXJndW1lbnRzKVxyXG4gIH1cclxufVxyXG4iXX0=