"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Frame = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _application = require("../application");

var _FramePanels = require("./FramePanels");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /* eslint-disable guard-for-in */
/* eslint-disable import/no-namespace */
/* eslint-disable react-native/no-inline-styles */


var Frame = exports.Frame = function (_Component) {
  _inherits(Frame, _Component);

  function Frame() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, Frame);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = Frame.__proto__ || Object.getPrototypeOf(Frame)).call.apply(_ref, [this].concat(args))), _this), _this.loadDisplayLayout = function (displayLayout) {
      var panels = {};

      var _loop = function _loop(dockId) {
        var panelDesc = displayLayout[dockId];
        var panel = _extends({}, panelDesc, {
          id: dockId,
          current: _application.Application.getWindowHandle(panelDesc.current),
          items: []
        });
        panelDesc.items && panelDesc.items.forEach(function (wid) {
          var wnd = _application.Application.getWindowHandle(wid);
          if (wnd) {
            wnd.dockId = dockId;
            panel.items.push(wnd);
          }
        });
        panels[dockId] = panel;
      };

      for (var dockId in displayLayout) {
        _loop(dockId);
      }
      _this.setState({ panels: panels });
      _this.forceUpdate();
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(Frame, [{
    key: "componentWillMount",
    value: function componentWillMount() {
      this.loadDisplayLayout(_application.Application.layout.displayLayout);
    }
  }, {
    key: "componentDidMount",
    value: function componentDidMount() {
      _application.Application.layout.registerFrame(this);
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      _application.Application.layout.registerFrame();
    }
  }, {
    key: "showWindow",
    value: function showWindow(windowId) {
      var panels = this.state.panels;
      var wnd = _application.Application.getWindowHandle(windowId);
      if (!wnd) return null;

      var origin = panels[wnd.dockId];
      if (origin) {
        panels[wnd.dockId] = _extends({}, origin, {
          current: wnd
        });
        this.setState({ panels: panels });
        this.forceUpdate();
      }
    }
  }, {
    key: "hideWindow",
    value: function hideWindow(windowId) {
      var panels = this.state.panels;
      var wnd = _application.Application.getWindowHandle(windowId);
      if (!wnd) return null;

      var origin = panels[wnd.dockId];
      if (origin && origin.current === wnd) {
        panels[wnd.dockId] = _extends({}, origin, {
          current: null
        });
        this.setState({ panels: panels });
        this.forceUpdate();
      }
    }
  }, {
    key: "dettachWindow",
    value: function dettachWindow(windowId) {
      var panels = this.state.panels;
      var wnd = _application.Application.getWindowHandle(windowId);
      if (!wnd) return null;

      var origin = panels[wnd.dockId];
      if (origin) {
        origin = _extends({}, origin, {
          items: origin.items.filter(function (x) {
            return x !== wnd;
          })
        });
        if (origin.current === wnd) origin.current = origin.items[0];
        panels[wnd.dockId] = origin;
        this.setState({ panels: panels });
        this.forceUpdate();
      }

      wnd.dockId = null;
    }
  }, {
    key: "attachWindow",
    value: function attachWindow(windowId, dockId, foreground) {
      var panels = this.state.panels;
      var wnd = _application.Application.getWindowHandle(windowId);
      if (!wnd) return null;

      var origin = panels[wnd.dockId];
      if (origin) {
        origin = _extends({}, origin, {
          items: origin.items.filter(function (x) {
            return x !== wnd;
          })
        });
        if (origin.current === wnd) origin.current = origin.items[0];
        panels[wnd.dockId] = origin;
      }

      var panel = panels[dockId];
      if (panel) {
        panel = _extends({}, panel, {
          current: foreground ? wnd || panel.current : panel.current || wnd,
          items: [].concat(_toConsumableArray(panel.items), [wnd])
        });
        panels[dockId] = panel;
      }

      wnd.dockId = dockId;
      this.setState({ panels: panels });
      this.forceUpdate();
    }
  }, {
    key: "notifyPanelResize",
    value: function notifyPanelResize(panel, size) {
      var panels = this.state.panels;
      panels[panel.id] = _extends({}, panel, { size: size });
      this.setState({ panels: panels });
    }
  }, {
    key: "renderPanel",
    value: function renderPanel(id) {
      var panel = this.state.panels[id];
      var props = {
        id: id,
        frame: this,
        panel: panel,
        children: panel.child && this.renderPanel(panel.child)
      };
      switch (panel.type) {
        case "#":
          return _react2.default.createElement(
            "div",
            { className: "width-100 height-100" },
            " ",
            props.children,
            " "
          );
        case "side-left":
          return _react2.default.createElement(_FramePanels.SidePanelLeft, props);
        case "side-top":
          return _react2.default.createElement(_FramePanels.SidePanelTop, props);
        case "side-right":
          return _react2.default.createElement(_FramePanels.SidePanelRight, props);
        case "side-bottom":
          return _react2.default.createElement(_FramePanels.SidePanelBottom, props);
        case "center-top":
          return _react2.default.createElement(_FramePanels.CenterPanelTop, props);
        default:
          return null;
      }
    }
  }, {
    key: "render",
    value: function render() {
      return this.renderPanel("#");
    }
  }]);

  return Frame;
}(_react.Component);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9saWIvZnJhbWUvRnJhbWUuanMiXSwibmFtZXMiOlsiRnJhbWUiLCJsb2FkRGlzcGxheUxheW91dCIsImRpc3BsYXlMYXlvdXQiLCJwYW5lbHMiLCJkb2NrSWQiLCJwYW5lbERlc2MiLCJwYW5lbCIsImlkIiwiY3VycmVudCIsImdldFdpbmRvd0hhbmRsZSIsIml0ZW1zIiwiZm9yRWFjaCIsInduZCIsIndpZCIsInB1c2giLCJzZXRTdGF0ZSIsImZvcmNlVXBkYXRlIiwibGF5b3V0IiwicmVnaXN0ZXJGcmFtZSIsIndpbmRvd0lkIiwic3RhdGUiLCJvcmlnaW4iLCJmaWx0ZXIiLCJ4IiwiZm9yZWdyb3VuZCIsInNpemUiLCJwcm9wcyIsImZyYW1lIiwiY2hpbGRyZW4iLCJjaGlsZCIsInJlbmRlclBhbmVsIiwidHlwZSIsImNyZWF0ZUVsZW1lbnQiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7O0FBR0E7Ozs7QUFFQTs7QUFFQTs7Ozs7Ozs7OzsrZUFQQTtBQUNBO0FBQ0E7OztJQWVhQSxLLFdBQUFBLEs7Ozs7Ozs7Ozs7Ozs7O29MQVlYQyxpQixHQUFvQixVQUFDQyxhQUFELEVBQW1CO0FBQ3JDLFVBQU1DLFNBQVMsRUFBZjs7QUFEcUMsaUNBRTFCQyxNQUYwQjtBQUduQyxZQUFNQyxZQUFZSCxjQUFjRSxNQUFkLENBQWxCO0FBQ0EsWUFBTUUscUJBQ0RELFNBREM7QUFFSkUsY0FBSUgsTUFGQTtBQUdKSSxtQkFBUyx5QkFBWUMsZUFBWixDQUE0QkosVUFBVUcsT0FBdEMsQ0FITDtBQUlKRSxpQkFBTztBQUpILFVBQU47QUFNQUwsa0JBQVVLLEtBQVYsSUFBbUJMLFVBQVVLLEtBQVYsQ0FBZ0JDLE9BQWhCLENBQXdCLGVBQU87QUFDaEQsY0FBTUMsTUFBTSx5QkFBWUgsZUFBWixDQUE0QkksR0FBNUIsQ0FBWjtBQUNBLGNBQUlELEdBQUosRUFBUztBQUNQQSxnQkFBSVIsTUFBSixHQUFhQSxNQUFiO0FBQ0FFLGtCQUFNSSxLQUFOLENB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SmIsT0FBZDtBQU1BLGNBQVF2QixNQUFNeUIsSUFBZDtBQUNBLGFBQUssR0FBTDtBQUNFLGlCQUFRO0FBQUE7QUFBQSxjQUFLLFdBQVUsc0JBQWY7QUFBQTtBQUF3Q0wsa0JBQU1FLFFBQTlDO0FBQUE7QUFBQSxXQUFSO0FBQ0YsYUFBSyxXQUFMO0FBQ0UsaUJBQU8sZ0JBQU1JLGFBQU4sNkJBQW1DTixLQUFuQyxDQUFQO0FBQ0YsYUFBSyxVQUFMO0FBQ0UsaUJBQU8sZ0JBQU1NLGFBQU4sNEJBQWtDTixLQUFsQyxDQUFQO0FBQ0YsYUFBSyxZQUFMO0FBQ0UsaUJBQU8sZ0JBQU1NLGFBQU4sOEJBQW9DTixLQUFwQyxDQUFQO0FBQ0YsYUFBSyxhQUFMO0FBQ0UsaUJBQU8sZ0JBQU1NLGFBQU4sK0JBQXFDTixLQUFyQyxDQUFQO0FBQ0YsYUFBSyxZQUFMO0FBQ0UsaUJBQU8sZ0JBQU1NLGFBQU4sOEJBQW9DTixLQUFwQyxDQUFQO0FBQ0Y7QUFDRSxpQkFBTyxJQUFQO0FBZEY7QUFnQkQ7Ozs2QkFDUTtBQUNQLGFBQU8sS0FBS0ksV0FBTCxDQUFpQixHQUFqQixDQUFQO0FBQ0QiLCJmaWxlIjoiRnJhbWUuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvKiBlc2xpbnQtZGlzYWJsZSBndWFyZC1mb3ItaW4gKi9cclxuLyogZXNsaW50LWRpc2FibGUgaW1wb3J0L25vLW5hbWVzcGFjZSAqL1xyXG4vKiBlc2xpbnQtZGlzYWJsZSByZWFjdC1uYXRpdmUvbm8taW5saW5lLXN0eWxlcyAqL1xyXG5pbXBvcnQgUmVhY3QsIHsgQ29tcG9uZW50IH0gZnJvbSBcInJlYWN0XCJcclxuXHJcbmltcG9ydCB7IEFwcGxpY2F0aW9uIH0gZnJvbSBcIi4uL2FwcGxpY2F0aW9uXCJcclxuXHJcbmltcG9ydCB7IFBhbmVsUHJvcHMsIFNpZGVQYW5lbFRvcCwgU2lkZVBhbmVsTGVmdCwgU2lkZVBhbmVsUmlnaHQsIFNpZGVQYW5lbEJvdHRvbSwgQ2VudGVyUGFuZWxUb3AgfSBmcm9tIFwiLi9GcmFtZVBhbmVsc1wiXHJcblxyXG50eXBlIFByb3BzVHlwZSA9IHtcclxuICBkaXNwbGF5TGF5b3V0OiBhbnksXHJcbn1cclxuXHJcbnR5cGUgU3RhdGVUeXBlID0ge1xyXG4gIHBhbmVsczogeyBbc3RyaW5nXTogUGFuZWxQcm9wcyB9LFxyXG59XHJcblxyXG5leHBvcnQgY2xhc3MgRnJhbWUgZXh0ZW5kcyBDb21wb25lbnQ8dm9pZCwgUHJvcHNUeXBlLCBTdGF0ZVR5cGU+IHtcclxuICBwcm9wczogUHJvcHNUeXBlXHJcbiAgc3RhdGU6IFN0YXRlVHlwZVxyXG4gIGNvbXBvbmVudFdpbGxNb3VudCgpIHtcclxuICAgIHRoaXMubG9hZERpc3BsYXlMYXlvdXQoQXBwbGljYXRpb24ubGF5b3V0LmRpc3BsYXlMYXlvdXQpXHJcbiAgfVxyXG4gIGNvbXBvbmVudERpZE1vdW50KCkge1xyXG4gICAgQXBwbGljYXRpb24ubGF5b3V0LnJlZ2lzdGVyRnJhbWUodGhpcylcclxuICB9XHJcbiAgY29tcG9uZW50V2lsbFVubW91bnQoKSB7XHJcbiAgICBBcHBsaWNhdGlvbi5sYXlvdXQucmVnaXN0ZXJGcmFtZSgpXHJcbiAgfVxyXG4gIGxvYWREaXNwbGF5TGF5b3V0ID0gKGRpc3BsYXlMYXlvdXQpID0+IHtcclxuICAgIGNvbnN0IHBhbmVscyA9IHt9XHJcbiAgICBmb3IgKGNvbnN0IGRvY2tJZCBpbiBkaXNwbGF5TGF5b3V0KSB7XHJcbiAgICAgIGNvbnN0IHBhbmVsRGVzYyA9IGRpc3BsYXlMYXlvdXRbZG9ja0lkXVxyXG4gICAgICBjb25zdCBwYW5lbDogUGFuZWxQcm9wcyA9IHtcclxuICAgICAgICAuLi5wYW5lbERlc2MsXHJcbiAgICAgICAgaWQ6IGRvY2tJZCxcclxuICAgICAgICBjdXJyZW50OiBBcHBsaWNhdGlvbi5nZXRXaW5kb3dIYW5kbGUocGFuZWxEZXNjLmN1cnJlbnQpLFxyXG4gICAgICAgIGl0ZW1zOiBbXSxcclxuICAgICAgfVxyXG4gICAgICBwYW5lbERlc2MuaXRlbXMgJiYgcGFuZWxEZXNjLml0ZW1zLmZvckVhY2god2lkID0+IHtcclxuICAgICAgICBjb25zdCB3bmQgPSBBcHBsaWNhdGlvbi5nZXRXaW5kb3dIYW5kbGUod2lkKVxyXG4gICAgICAgIGlmICh3bmQpIHtcclxuICAgICAgICAgIHduZC5kb2NrSWQgPSBkb2NrSWRcclxuICAgICAgICAgIHBhbmVsLml0ZW1zLnB1c2god25kKVxyXG4gICAgICAgIH1cclxuICAgICAgfSlcclxuICAgICAgcGFuZWxzW2RvY2tJZF0gPSBwYW5lbFxyXG4gICAgfVxyXG4gICAgdGhpcy5zZXRTdGF0ZSh7IHBhbmVscyB9KVxyXG4gICAgdGhpcy5mb3JjZVVwZGF0ZSgpXHJcbiAgfVxyXG4gIHNob3dXaW5kb3cod2luZG93SWQ6IFdpbmRvd0lEKSB7XHJcbiAgICBjb25zdCBwYW5lbHMgPSB0aGlzLnN0YXRlLnBhbmVsc1xyXG4gICAgY29uc3Qgd25kID0gQXBwbGljYXRpb24uZ2V0V2luZG93SGFuZGxlKHdpbmRvd0lkKVxyXG4gICAgaWYgKCF3bmQpIHJldHVybiBudWxsXHJcblxyXG4gICAgY29uc3Qgb3JpZ2luID0gcGFuZWxzW3duZC5kb2NrSWRdXHJcbiAgICBpZiAob3JpZ2luKSB7XHJcbiAgICAgIHBhbmVsc1t3bmQuZG9ja0lkXSA9IHtcclxuICAgICAgICAuLi5vcmlnaW4sXHJcbiAgICAgICAgY3VycmVudDogd25kLFxyXG4gICAgICB9XHJcbiAgICAgIHRoaXMuc2V0U3RhdGUoeyBwYW5lbHMgfSlcclxuICAgICAgdGhpcy5mb3JjZVVwZGF0ZSgpXHJcbiAgICB9XHJcbiAgfVxyXG4gIGhpZGVXaW5kb3cod2luZG93SWQ6IFdpbmRvd0lEKSB7XHJcbiAgICBjb25zdCBwYW5lbHMgPSB0aGlzLnN0YXRlLnBhbmVsc1xyXG4gICAgY29uc3Qgd25kID0gQXBwbGljYXRpb24uZ2V0V2luZG93SGFuZGxlKHdpbmRvd0lkKVxyXG4gICAgaWYgKCF3bmQpIHJldHVybiBudWxsXHJcblxyXG4gICAgY29uc3Qgb3JpZ2luID0gcGFuZWxzW3duZC5kb2NrSWRdXHJcbiAgICBpZiAob3JpZ2luICYmIG9yaWdpbi5jdXJyZW50ID09PSB3bmQpIHtcclxuICAgICAgcGFuZWxzW3duZC5kb2NrSWRdID0ge1xyXG4gICAgICAgIC4uLm9yaWdpbixcclxuICAgICAgICBjdXJyZW50OiBudWxsLFxyXG4gICAgICB9XHJcbiAgICAgIHRoaXMuc2V0U3RhdGUoeyBwYW5lbHMgfSlcclxuICAgICAgdGhpcy5mb3JjZVVwZGF0ZSgpXHJcbiAgICB9XHJcbiAgfVxyXG4gIGRldHRhY2hXaW5kb3cod2luZG93SWQ6IFdpbmRvd0lEKSB7XHJcbiAgICBjb25zdCBwYW5lbHMgPSB0aGlzLnN0YXRlLnBhbmVsc1xyXG4gICAgY29uc3Qgd25kID0gQXBwbGljYXRpb24uZ2V0V2luZG93SGFuZGxlKHdpbmRvd0lkKVxyXG4gICAgaWYgKCF3bmQpIHJldHVybiBudWxsXHJcblxyXG4gICAgbGV0IG9yaWdpbiA9IHBhbmVsc1t3bmQuZG9ja0lkXVxyXG4gICAgaWYgKG9yaWdpbikge1xyXG4gICAgICBvcmlnaW4gPSB7XHJcbiAgICAgICAgLi4ub3JpZ2luLFxyXG4gICAgICAgIGl0ZW1zOiBvcmlnaW4uaXRlbXMuZmlsdGVyKHggPT4geCAhPT0gd25kKSxcclxuICAgICAgfVxyXG4gICAgICBpZiAob3JpZ2luLmN1cnJlbnQgPT09IHduZCkgb3JpZ2luLmN1cnJlbnQgPSBvcmlnaW4uaXRlbXNbMF1cclxuICAgICAgcGFuZWxzW3duZC5kb2NrSWRdID0gb3JpZ2luXHJcbiAgICAgIHRoaXMuc2V0U3RhdGUoeyBwYW5lbHMgfSlcclxuICAgICAgdGhpcy5mb3JjZVVwZGF0ZSgpXHJcbiAgICB9XHJcblxyXG4gICAgd25kLmRvY2tJZCA9IG51bGxcclxuICB9XHJcbiAgYXR0YWNoV2luZG93KHdpbmRvd0lkOiBXaW5kb3dJRCwgZG9ja0lkOiBEb2NrSUQsIGZvcmVncm91bmQ6IGJvb2xlYW4pIHtcclxuICAgIGNvbnN0IHBhbmVscyA9IHRoaXMuc3RhdGUucGFuZWxzXHJcbiAgICBjb25zdCB3bmQgPSBBcHBsaWNhdGlvbi5nZXRXaW5kb3dIYW5kbGUod2luZG93SWQpXHJcbiAgICBpZiAoIXduZCkgcmV0dXJuIG51bGxcclxuXHJcbiAgICBsZXQgb3JpZ2luID0gcGFuZWxzW3duZC5kb2NrSWRdXHJcbiAgICBpZiAob3JpZ2luKSB7XHJcbiAgICAgIG9yaWdpbiA9IHtcclxuICAgICAgICAuLi5vcmlnaW4sXHJcbiAgICAgICAgaXRlbXM6IG9yaWdpbi5pdGVtcy5maWx0ZXIoeCA9PiB4ICE9PSB3bmQpLFxyXG4gICAgICB9XHJcbiAgICAgIGlmIChvcmlnaW4uY3VycmVudCA9PT0gd25kKSBvcmlnaW4uY3VycmVudCA9IG9yaWdpbi5pdGVtc1swXVxyXG4gICAgICBwYW5lbHNbd25kLmRvY2tJZF0gPSBvcmlnaW5cclxuICAgIH1cclxuXHJcbiAgICBsZXQgcGFuZWwgPSBwYW5lbHNbZG9ja0lkXVxyXG4gICAgaWYgKHBhbmVsKSB7XHJcbiAgICAgIHBhbmVsID0ge1xyXG4gICAgICAgIC4uLnBhbmVsLFxyXG4gICAgICAgIGN1cnJlbnQ6IGZvcmVncm91bmQgPyAod25kIHx8IHBhbmVsLmN1cnJlbnQpIDogKHBhbmVsLmN1cnJlbnQgfHwgd25kKSxcclxuICAgICAgICBpdGVtczogWyAuLi5wYW5lbC5pdGVtcywgd25kIF0sXHJcbiAgICAgIH1cclxuICAgICAgcGFuZWxzW2RvY2tJZF0gPSBwYW5lbFxyXG4gICAgfVxyXG5cclxuICAgIHduZC5kb2NrSWQgPSBkb2NrSWRcclxuICAgIHRoaXMuc2V0U3RhdGUoeyBwYW5lbHMgfSlcclxuICAgIHRoaXMuZm9yY2VVcGRhdGUoKVxyXG4gIH1cclxuICBub3RpZnlQYW5lbFJlc2l6ZShwYW5lbDogUGFuZWxQcm9wcywgc2l6ZTogbnVtYmVyKSB7XHJcbiAgICBjb25zdCBwYW5lbHMgPSB0aGlzLnN0YXRlLnBhbmVsc1xyXG4gICAgcGFuZWxzW3BhbmVsLmlkXSA9IHsgLi4ucGFuZWwsIHNpemUgfVxyXG4gICAgdGhpcy5zZXRTdGF0ZSh7IHBhbmVscyB9KVxyXG4gIH1cclxuICByZW5kZXJQYW5lbChpZDogc3RyaW5nKSB7XHJcbiAgICBjb25zdCBwYW5lbCA9IHRoaXMuc3RhdGUucGFuZWxzW2lkXVxyXG4gICAgY29uc3QgcHJvcHMgPSB7XHJcbiAgICAgIGlkOiBpZCxcclxuICAgICAgZnJhbWU6IHRoaXMsXHJcbiAgICAgIHBhbmVsOiBwYW5lbCxcclxuICAgICAgY2hpbGRyZW46IHBhbmVsLmNoaWxkICYmIHRoaXMucmVuZGVyUGFuZWwocGFuZWwuY2hpbGQpLFxyXG4gICAgfVxyXG4gICAgc3dpdGNoIChwYW5lbC50eXBlKSB7XHJcbiAgICBjYXNlIFwiI1wiOlxyXG4gICAgICByZXR1cm4gKDxkaXYgY2xhc3NOYW1lPVwid2lkdGgtMTAwIGhlaWdodC0xMDBcIj4ge3Byb3BzLmNoaWxkcmVufSA8L2Rpdj4pXHJcbiAgICBjYXNlIFwic2lkZS1sZWZ0XCI6XHJcbiAgICAgIHJldHVybiBSZWFjdC5jcmVhdGVFbGVtZW50KFNpZGVQYW5lbExlZnQsIHByb3BzKVxyXG4gICAgY2FzZSBcInNpZGUtdG9wXCI6XHJcbiAgICAgIHJldHVybiBSZWFjdC5jcmVhdGVFbGVtZW50KFNpZGVQYW5lbFRvcCwgcHJvcHMpXHJcbiAgICBjYXNlIFwic2lkZS1yaWdodFwiOlxyXG4gICAgICByZXR1cm4gUmVhY3QuY3JlYXRlRWxlbWVudChTaWRlUGFuZWxSaWdodCwgcHJvcHMpXHJcbiAgICBjYXNlIFwic2lkZS1ib3R0b21cIjpcclxuICAgICAgcmV0dXJuIFJlYWN0LmNyZWF0ZUVsZW1lbnQoU2lkZVBhbmVsQm90dG9tLCBwcm9wcylcclxuICAgIGNhc2UgXCJjZW50ZXItdG9wXCI6XHJcbiAgICAgIHJldHVybiBSZWFjdC5jcmVhdGVFbGVtZW50KENlbnRlclBhbmVsVG9wLCBwcm9wcylcclxuICAgIGRlZmF1bHQ6XHJcbiAgICAgIHJldHVybiBudWxsXHJcbiAgICB9XHJcbiAgfVxyXG4gIHJlbmRlcigpIHtcclxuICAgIHJldHVybiB0aGlzLnJlbmRlclBhbmVsKFwiI1wiKVxyXG4gIH1cclxufVxyXG4iXX0=