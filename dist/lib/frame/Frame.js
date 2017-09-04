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
            { style: { height: "100%", width: "100%" } },
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9BcHBsaWNhdGlvbi9mcmFtZS9GcmFtZS5qcyJdLCJuYW1lcyI6WyJGcmFtZSIsImxvYWREaXNwbGF5TGF5b3V0IiwiZGlzcGxheUxheW91dCIsInBhbmVscyIsImRvY2tJZCIsInBhbmVsRGVzYyIsInBhbmVsIiwiaWQiLCJjdXJyZW50IiwiZ2V0V2luZG93SGFuZGxlIiwiaXRlbXMiLCJmb3JFYWNoIiwid25kIiwid2lkIiwicHVzaCIsInNldFN0YXRlIiwiZm9yY2VVcGRhdGUiLCJsYXlvdXQiLCJyZWdpc3RlckZyYW1lIiwid2luZG93SWQiLCJzdGF0ZSIsIm9yaWdpbiIsImZpbHRlciIsIngiLCJmb3JlZ3JvdW5kIiwic2l6ZSIsInByb3BzIiwiZnJhbWUiLCJjaGlsZHJlbiIsImNoaWxkIiwicmVuZGVyUGFuZWwiLCJ0eXBlIiwiaGVpZ2h0Iiwid2lkdGgiLCJjcmVhdGVFbGVtZW50Il0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7OztBQUdBOzs7O0FBRUE7O0FBRUE7Ozs7Ozs7Ozs7K2VBUEE7QUFDQTtBQUNBOzs7SUFlYUEsSyxXQUFBQSxLOzs7Ozs7Ozs7Ozs7OztvTEFZWEMsaUIsR0FBb0IsVUFBQ0MsYUFBRCxFQUFtQjtBQUNyQyxVQUFNQyxTQUFTLEVBQWY7O0FBRHFDLGlDQUUxQkMsTUFGMEI7QUFHbkMsWUFBTUMsWUFBWUgsY0FBY0UsTUFBZCxDQUFsQjtBQUNBLFlBQU1FLHFCQUNERCxTQURDO0FBRUpFLGNBQUlILE1BRkE7QUFHSkksbUJBQVMseUJBQVlDLGVBQVosQ0FBNEJKLFVBQVVHLE9BQXRDLENBSEw7QUFJSkUsaUJBQU87QUFKSCxVQUFOO0FBTUFMLGtCQUFVSyxLQUFWLElBQW1CTCxVQUFVSyxLQUFWLENBQWdCQyxPQUFoQixDQUF3QixlQUFPO0FBQ2hELGNBQU1DLE1BQU0seUJBQVlILGVBQVosQ0FBNEJJLEdBQTVCLENBQVo7QUFDQSxjQUFJRCxHQUFKLEVBQVM7QUFDUEEsZ0JBQUlSLE1BQUosR0FBYUEs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TCxDQUFpQnhCLE1BQU11QixLQUF2QjtBQUpiLE9BQWQ7QUFNQSxjQUFRdkIsTUFBTXlCLElBQWQ7QUFDQSxhQUFLLEdBQUw7QUFDRSxpQkFBUTtBQUFBO0FBQUEsY0FBSyxPQUFPLEVBQUVDLFFBQVEsTUFBVixFQUFrQkMsT0FBTyxNQUF6QixFQUFaO0FBQUE7QUFBaURQLGtCQUFNRSxRQUF2RDtBQUFBO0FBQUEsV0FBUjtBQUNGLGFBQUssV0FBTDtBQUNFLGlCQUFPLGdCQUFNTSxhQUFOLDZCQUFtQ1IsS0FBbkMsQ0FBUDtBQUNGLGFBQUssVUFBTDtBQUNFLGlCQUFPLGdCQUFNUSxhQUFOLDRCQUFrQ1IsS0FBbEMsQ0FBUDtBQUNGLGFBQUssWUFBTDtBQUNFLGlCQUFPLGdCQUFNUSxhQUFOLDhCQUFvQ1IsS0FBcEMsQ0FBUDtBQUNGLGFBQUssYUFBTDtBQUNFLGlCQUFPLGdCQUFNUSxhQUFOLCtCQUFxQ1IsS0FBckMsQ0FBUDtBQUNGLGFBQUssWUFBTDtBQUNFLGlCQUFPLGdCQUFNUSxhQUFOLDhCQUFvQ1IsS0FBcEMsQ0FBUDtBQUNGO0FBQ0UsaUJBQU8sSUFBUDtBQWRGO0FBZ0JEOzs7NkJBQ1E7QUFDUCxhQUFPLEtBQUtJLFdBQUwsQ0FBaUIsR0FBakIsQ0FBUDtBQUNEIiwiZmlsZSI6IkZyYW1lLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLyogZXNsaW50LWRpc2FibGUgZ3VhcmQtZm9yLWluICovXHJcbi8qIGVzbGludC1kaXNhYmxlIGltcG9ydC9uby1uYW1lc3BhY2UgKi9cclxuLyogZXNsaW50LWRpc2FibGUgcmVhY3QtbmF0aXZlL25vLWlubGluZS1zdHlsZXMgKi9cclxuaW1wb3J0IFJlYWN0LCB7IENvbXBvbmVudCB9IGZyb20gXCJyZWFjdFwiXHJcblxyXG5pbXBvcnQgeyBBcHBsaWNhdGlvbiB9IGZyb20gXCIuLi9hcHBsaWNhdGlvblwiXHJcblxyXG5pbXBvcnQgeyBQYW5lbFByb3BzLCBTaWRlUGFuZWxUb3AsIFNpZGVQYW5lbExlZnQsIFNpZGVQYW5lbFJpZ2h0LCBTaWRlUGFuZWxCb3R0b20sIENlbnRlclBhbmVsVG9wIH0gZnJvbSBcIi4vRnJhbWVQYW5lbHNcIlxyXG5cclxudHlwZSBQcm9wc1R5cGUgPSB7XHJcbiAgZGlzcGxheUxheW91dDogYW55LFxyXG59XHJcblxyXG50eXBlIFN0YXRlVHlwZSA9IHtcclxuICBwYW5lbHM6IHsgW3N0cmluZ106IFBhbmVsUHJvcHMgfSxcclxufVxyXG5cclxuZXhwb3J0IGNsYXNzIEZyYW1lIGV4dGVuZHMgQ29tcG9uZW50PHZvaWQsIFByb3BzVHlwZSwgU3RhdGVUeXBlPiB7XHJcbiAgcHJvcHM6IFByb3BzVHlwZVxyXG4gIHN0YXRlOiBTdGF0ZVR5cGVcclxuICBjb21wb25lbnRXaWxsTW91bnQoKSB7XHJcbiAgICB0aGlzLmxvYWREaXNwbGF5TGF5b3V0KEFwcGxpY2F0aW9uLmxheW91dC5kaXNwbGF5TGF5b3V0KVxyXG4gIH1cclxuICBjb21wb25lbnREaWRNb3VudCgpIHtcclxuICAgIEFwcGxpY2F0aW9uLmxheW91dC5yZWdpc3RlckZyYW1lKHRoaXMpXHJcbiAgfVxyXG4gIGNvbXBvbmVudFdpbGxVbm1vdW50KCkge1xyXG4gICAgQXBwbGljYXRpb24ubGF5b3V0LnJlZ2lzdGVyRnJhbWUoKVxyXG4gIH1cclxuICBsb2FkRGlzcGxheUxheW91dCA9IChkaXNwbGF5TGF5b3V0KSA9PiB7XHJcbiAgICBjb25zdCBwYW5lbHMgPSB7fVxyXG4gICAgZm9yIChjb25zdCBkb2NrSWQgaW4gZGlzcGxheUxheW91dCkge1xyXG4gICAgICBjb25zdCBwYW5lbERlc2MgPSBkaXNwbGF5TGF5b3V0W2RvY2tJZF1cclxuICAgICAgY29uc3QgcGFuZWw6IFBhbmVsUHJvcHMgPSB7XHJcbiAgICAgICAgLi4ucGFuZWxEZXNjLFxyXG4gICAgICAgIGlkOiBkb2NrSWQsXHJcbiAgICAgICAgY3VycmVudDogQXBwbGljYXRpb24uZ2V0V2luZG93SGFuZGxlKHBhbmVsRGVzYy5jdXJyZW50KSxcclxuICAgICAgICBpdGVtczogW10sXHJcbiAgICAgIH1cclxuICAgICAgcGFuZWxEZXNjLml0ZW1zICYmIHBhbmVsRGVzYy5pdGVtcy5mb3JFYWNoKHdpZCA9PiB7XHJcbiAgICAgICAgY29uc3Qgd25kID0gQXBwbGljYXRpb24uZ2V0V2luZG93SGFuZGxlKHdpZClcclxuICAgICAgICBpZiAod25kKSB7XHJcbiAgICAgICAgICB3bmQuZG9ja0lkID0gZG9ja0lkXHJcbiAgICAgICAgICBwYW5lbC5pdGVtcy5wdXNoKHduZClcclxuICAgICAgICB9XHJcbiAgICAgIH0pXHJcbiAgICAgIHBhbmVsc1tkb2NrSWRdID0gcGFuZWxcclxuICAgIH1cclxuICAgIHRoaXMuc2V0U3RhdGUoeyBwYW5lbHMgfSlcclxuICAgIHRoaXMuZm9yY2VVcGRhdGUoKVxyXG4gIH1cclxuICBzaG93V2luZG93KHdpbmRvd0lkOiBXaW5kb3dJRCkge1xyXG4gICAgY29uc3QgcGFuZWxzID0gdGhpcy5zdGF0ZS5wYW5lbHNcclxuICAgIGNvbnN0IHduZCA9IEFwcGxpY2F0aW9uLmdldFdpbmRvd0hhbmRsZSh3aW5kb3dJZClcclxuICAgIGlmICghd25kKSByZXR1cm4gbnVsbFxyXG5cclxuICAgIGNvbnN0IG9yaWdpbiA9IHBhbmVsc1t3bmQuZG9ja0lkXVxyXG4gICAgaWYgKG9yaWdpbikge1xyXG4gICAgICBwYW5lbHNbd25kLmRvY2tJZF0gPSB7XHJcbiAgICAgICAgLi4ub3JpZ2luLFxyXG4gICAgICAgIGN1cnJlbnQ6IHduZCxcclxuICAgICAgfVxyXG4gICAgICB0aGlzLnNldFN0YXRlKHsgcGFuZWxzIH0pXHJcbiAgICAgIHRoaXMuZm9yY2VVcGRhdGUoKVxyXG4gICAgfVxyXG4gIH1cclxuICBoaWRlV2luZG93KHdpbmRvd0lkOiBXaW5kb3dJRCkge1xyXG4gICAgY29uc3QgcGFuZWxzID0gdGhpcy5zdGF0ZS5wYW5lbHNcclxuICAgIGNvbnN0IHduZCA9IEFwcGxpY2F0aW9uLmdldFdpbmRvd0hhbmRsZSh3aW5kb3dJZClcclxuICAgIGlmICghd25kKSByZXR1cm4gbnVsbFxyXG5cclxuICAgIGNvbnN0IG9yaWdpbiA9IHBhbmVsc1t3bmQuZG9ja0lkXVxyXG4gICAgaWYgKG9yaWdpbiAmJiBvcmlnaW4uY3VycmVudCA9PT0gd25kKSB7XHJcbiAgICAgIHBhbmVsc1t3bmQuZG9ja0lkXSA9IHtcclxuICAgICAgICAuLi5vcmlnaW4sXHJcbiAgICAgICAgY3VycmVudDogbnVsbCxcclxuICAgICAgfVxyXG4gICAgICB0aGlzLnNldFN0YXRlKHsgcGFuZWxzIH0pXHJcbiAgICAgIHRoaXMuZm9yY2VVcGRhdGUoKVxyXG4gICAgfVxyXG4gIH1cclxuICBkZXR0YWNoV2luZG93KHdpbmRvd0lkOiBXaW5kb3dJRCkge1xyXG4gICAgY29uc3QgcGFuZWxzID0gdGhpcy5zdGF0ZS5wYW5lbHNcclxuICAgIGNvbnN0IHduZCA9IEFwcGxpY2F0aW9uLmdldFdpbmRvd0hhbmRsZSh3aW5kb3dJZClcclxuICAgIGlmICghd25kKSByZXR1cm4gbnVsbFxyXG5cclxuICAgIGxldCBvcmlnaW4gPSBwYW5lbHNbd25kLmRvY2tJZF1cclxuICAgIGlmIChvcmlnaW4pIHtcclxuICAgICAgb3JpZ2luID0ge1xyXG4gICAgICAgIC4uLm9yaWdpbixcclxuICAgICAgICBpdGVtczogb3JpZ2luLml0ZW1zLmZpbHRlcih4ID0+IHggIT09IHduZCksXHJcbiAgICAgIH1cclxuICAgICAgaWYgKG9yaWdpbi5jdXJyZW50ID09PSB3bmQpIG9yaWdpbi5jdXJyZW50ID0gb3JpZ2luLml0ZW1zWzBdXHJcbiAgICAgIHBhbmVsc1t3bmQuZG9ja0lkXSA9IG9yaWdpblxyXG4gICAgICB0aGlzLnNldFN0YXRlKHsgcGFuZWxzIH0pXHJcbiAgICAgIHRoaXMuZm9yY2VVcGRhdGUoKVxyXG4gICAgfVxyXG5cclxuICAgIHduZC5kb2NrSWQgPSBudWxsXHJcbiAgfVxyXG4gIGF0dGFjaFdpbmRvdyh3aW5kb3dJZDogV2luZG93SUQsIGRvY2tJZDogRG9ja0lELCBmb3JlZ3JvdW5kOiBib29sZWFuKSB7XHJcbiAgICBjb25zdCBwYW5lbHMgPSB0aGlzLnN0YXRlLnBhbmVsc1xyXG4gICAgY29uc3Qgd25kID0gQXBwbGljYXRpb24uZ2V0V2luZG93SGFuZGxlKHdpbmRvd0lkKVxyXG4gICAgaWYgKCF3bmQpIHJldHVybiBudWxsXHJcblxyXG4gICAgbGV0IG9yaWdpbiA9IHBhbmVsc1t3bmQuZG9ja0lkXVxyXG4gICAgaWYgKG9yaWdpbikge1xyXG4gICAgICBvcmlnaW4gPSB7XHJcbiAgICAgICAgLi4ub3JpZ2luLFxyXG4gICAgICAgIGl0ZW1zOiBvcmlnaW4uaXRlbXMuZmlsdGVyKHggPT4geCAhPT0gd25kKSxcclxuICAgICAgfVxyXG4gICAgICBpZiAob3JpZ2luLmN1cnJlbnQgPT09IHduZCkgb3JpZ2luLmN1cnJlbnQgPSBvcmlnaW4uaXRlbXNbMF1cclxuICAgICAgcGFuZWxzW3duZC5kb2NrSWRdID0gb3JpZ2luXHJcbiAgICB9XHJcblxyXG4gICAgbGV0IHBhbmVsID0gcGFuZWxzW2RvY2tJZF1cclxuICAgIGlmIChwYW5lbCkge1xyXG4gICAgICBwYW5lbCA9IHtcclxuICAgICAgICAuLi5wYW5lbCxcclxuICAgICAgICBjdXJyZW50OiBmb3JlZ3JvdW5kID8gKHduZCB8fCBwYW5lbC5jdXJyZW50KSA6IChwYW5lbC5jdXJyZW50IHx8IHduZCksXHJcbiAgICAgICAgaXRlbXM6IFsgLi4ucGFuZWwuaXRlbXMsIHduZCBdLFxyXG4gICAgICB9XHJcbiAgICAgIHBhbmVsc1tkb2NrSWRdID0gcGFuZWxcclxuICAgIH1cclxuXHJcbiAgICB3bmQuZG9ja0lkID0gZG9ja0lkXHJcbiAgICB0aGlzLnNldFN0YXRlKHsgcGFuZWxzIH0pXHJcbiAgICB0aGlzLmZvcmNlVXBkYXRlKClcclxuICB9XHJcbiAgbm90aWZ5UGFuZWxSZXNpemUocGFuZWw6IFBhbmVsUHJvcHMsIHNpemU6IG51bWJlcikge1xyXG4gICAgY29uc3QgcGFuZWxzID0gdGhpcy5zdGF0ZS5wYW5lbHNcclxuICAgIHBhbmVsc1twYW5lbC5pZF0gPSB7IC4uLnBhbmVsLCBzaXplIH1cclxuICAgIHRoaXMuc2V0U3RhdGUoeyBwYW5lbHMgfSlcclxuICB9XHJcbiAgcmVuZGVyUGFuZWwoaWQ6IHN0cmluZykge1xyXG4gICAgY29uc3QgcGFuZWwgPSB0aGlzLnN0YXRlLnBhbmVsc1tpZF1cclxuICAgIGNvbnN0IHByb3BzID0ge1xyXG4gICAgICBpZDogaWQsXHJcbiAgICAgIGZyYW1lOiB0aGlzLFxyXG4gICAgICBwYW5lbDogcGFuZWwsXHJcbiAgICAgIGNoaWxkcmVuOiBwYW5lbC5jaGlsZCAmJiB0aGlzLnJlbmRlclBhbmVsKHBhbmVsLmNoaWxkKSxcclxuICAgIH1cclxuICAgIHN3aXRjaCAocGFuZWwudHlwZSkge1xyXG4gICAgY2FzZSBcIiNcIjpcclxuICAgICAgcmV0dXJuICg8ZGl2IHN0eWxlPXt7IGhlaWdodDogXCIxMDAlXCIsIHdpZHRoOiBcIjEwMCVcIiB9fT4ge3Byb3BzLmNoaWxkcmVufSA8L2Rpdj4pXHJcbiAgICBjYXNlIFwic2lkZS1sZWZ0XCI6XHJcbiAgICAgIHJldHVybiBSZWFjdC5jcmVhdGVFbGVtZW50KFNpZGVQYW5lbExlZnQsIHByb3BzKVxyXG4gICAgY2FzZSBcInNpZGUtdG9wXCI6XHJcbiAgICAgIHJldHVybiBSZWFjdC5jcmVhdGVFbGVtZW50KFNpZGVQYW5lbFRvcCwgcHJvcHMpXHJcbiAgICBjYXNlIFwic2lkZS1yaWdodFwiOlxyXG4gICAgICByZXR1cm4gUmVhY3QuY3JlYXRlRWxlbWVudChTaWRlUGFuZWxSaWdodCwgcHJvcHMpXHJcbiAgICBjYXNlIFwic2lkZS1ib3R0b21cIjpcclxuICAgICAgcmV0dXJuIFJlYWN0LmNyZWF0ZUVsZW1lbnQoU2lkZVBhbmVsQm90dG9tLCBwcm9wcylcclxuICAgIGNhc2UgXCJjZW50ZXItdG9wXCI6XHJcbiAgICAgIHJldHVybiBSZWFjdC5jcmVhdGVFbGVtZW50KENlbnRlclBhbmVsVG9wLCBwcm9wcylcclxuICAgIGRlZmF1bHQ6XHJcbiAgICAgIHJldHVybiBudWxsXHJcbiAgICB9XHJcbiAgfVxyXG4gIHJlbmRlcigpIHtcclxuICAgIHJldHVybiB0aGlzLnJlbmRlclBhbmVsKFwiI1wiKVxyXG4gIH1cclxufVxyXG4iXX0=