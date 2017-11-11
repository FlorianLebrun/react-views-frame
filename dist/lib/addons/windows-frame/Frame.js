"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Frame = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _application = require("../../application");

var _FramePanels = require("./FramePanels");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /* eslint-disable guard-for-in */


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
          current: _application.Application.layout.getWindowInstance(panelDesc.current),
          items: []
        });
        panelDesc.items && panelDesc.items.forEach(function (wid) {
          var wnd = _application.Application.layout.getWindowInstance(wid);
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
      var wnd = _application.Application.layout.getWindowInstance(windowId);
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
      var wnd = _application.Application.layout.getWindowInstance(windowId);
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
      var wnd = _application.Application.layout.getWindowInstance(windowId);
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
      var wnd = _application.Application.layout.getWindowInstance(windowId);
      if (!wnd) return null;

      // Detach from origin panel
      if (wnd.dockId !== dockId) {
        var origin = panels[wnd.dockId];
        if (origin && origin.items.indexOf(wnd) >= 0) {
          origin = _extends({}, origin, {
            items: origin.items.filter(function (x) {
              return x !== wnd;
            })
          });
          if (origin.current === wnd) origin.current = origin.items[0];
          panels[wnd.dockId] = origin;
        }
      }

      // Attach to target panel
      var panel = panels[dockId];
      if (panel) {
        panel = _extends({}, panel);
        if (panel.items.indexOf(wnd) < 0) {
          panel.items = [].concat(_toConsumableArray(panel.items), [wnd]);
        }
        panel.current = foreground ? wnd || panel.current : panel.current || wnd;
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
            { style: styles.root },
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

var styles = {
  root: { height: "100%", width: "100%" }
};
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9saWIvYWRkb25zL3dpbmRvd3MtZnJhbWUvRnJhbWUuanMiXSwibmFtZXMiOlsiRnJhbWUiLCJsb2FkRGlzcGxheUxheW91dCIsImRpc3BsYXlMYXlvdXQiLCJwYW5lbHMiLCJkb2NrSWQiLCJwYW5lbERlc2MiLCJwYW5lbCIsImlkIiwiY3VycmVudCIsImxheW91dCIsImdldFdpbmRvd0luc3RhbmNlIiwiaXRlbXMiLCJmb3JFYWNoIiwid25kIiwid2lkIiwicHVzaCIsInNldFN0YXRlIiwiZm9yY2VVcGRhdGUiLCJyZWdpc3RlckZyYW1lIiwid2luZG93SWQiLCJzdGF0ZSIsIm9yaWdpbiIsImZpbHRlciIsIngiLCJmb3JlZ3JvdW5kIiwiaW5kZXhPZiIsInNpemUiLCJwcm9wcyIsImZyYW1lIiwiY2hpbGRyZW4iLCJjaGlsZCIsInJlbmRlclBhbmVsIiwidHlwZSIsInN0eWxlcyIsInJvb3QiLCJjcmVhdGVFbGVtZW50IiwiaGVpZ2h0Iiwid2lkdGgiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7O0FBQ0E7Ozs7QUFFQTs7QUFFQTs7Ozs7Ozs7OzsrZUFMQTs7O0lBZWFBLEssV0FBQUEsSzs7Ozs7Ozs7Ozs7Ozs7b0xBWVhDLGlCLEdBQW9CLFVBQUNDLGFBQUQsRUFBbUI7QUFDckMsVUFBTUMsU0FBUyxFQUFmOztBQURxQyxpQ0FFMUJDLE1BRjBCO0FBR25DLFlBQU1DLFlBQVlILGNBQWNFLE1BQWQsQ0FBbEI7QUFDQSxZQUFNRSxxQkFDREQsU0FEQztBQUVKRSxjQUFJSCxNQUZBO0FBR0pJLG1CQUFTLHlCQUFZQyxNQUFaLENBQW1CQyxpQkFBbkIsQ0FBcUNMLFVBQVVHLE9BQS9DLENBSEw7QUFJSkcsaUJBQU87QUFKSCxVQUFOO0FBTUFOLGtCQUFVTSxLQUFWLElBQW1CTixVQUFVTSxLQUFWLENBQWdCQyxPQUFoQixDQUF3QixlQUFPO0FBQ2hELGNBQU1DLE1BQU0seUJBQVlKLE1BQVosQ0FBbUJDLGlCQUFuQixDQUFxQ0ks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QURPLENBQWYiLCJmaWxlIjoiRnJhbWUuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvKiBlc2xpbnQtZGlzYWJsZSBndWFyZC1mb3ItaW4gKi9cclxuaW1wb3J0IFJlYWN0LCB7IENvbXBvbmVudCB9IGZyb20gXCJyZWFjdFwiXHJcblxyXG5pbXBvcnQgeyBBcHBsaWNhdGlvbiB9IGZyb20gXCIuLi8uLi9hcHBsaWNhdGlvblwiXHJcblxyXG5pbXBvcnQgeyBQYW5lbFByb3BzLCBTaWRlUGFuZWxUb3AsIFNpZGVQYW5lbExlZnQsIFNpZGVQYW5lbFJpZ2h0LCBTaWRlUGFuZWxCb3R0b20sIENlbnRlclBhbmVsVG9wIH0gZnJvbSBcIi4vRnJhbWVQYW5lbHNcIlxyXG5cclxudHlwZSBQcm9wc1R5cGUgPSB7XHJcbiAgZGlzcGxheUxheW91dDogYW55LFxyXG59XHJcblxyXG50eXBlIFN0YXRlVHlwZSA9IHtcclxuICBwYW5lbHM6IHsgW3N0cmluZ106IFBhbmVsUHJvcHMgfSxcclxufVxyXG5cclxuZXhwb3J0IGNsYXNzIEZyYW1lIGV4dGVuZHMgQ29tcG9uZW50PHZvaWQsIFByb3BzVHlwZSwgU3RhdGVUeXBlPiB7XHJcbiAgcHJvcHM6IFByb3BzVHlwZVxyXG4gIHN0YXRlOiBTdGF0ZVR5cGVcclxuICBjb21wb25lbnRXaWxsTW91bnQoKSB7XHJcbiAgICB0aGlzLmxvYWREaXNwbGF5TGF5b3V0KEFwcGxpY2F0aW9uLmxheW91dC5kaXNwbGF5TGF5b3V0KVxyXG4gIH1cclxuICBjb21wb25lbnREaWRNb3VudCgpIHtcclxuICAgIEFwcGxpY2F0aW9uLmxheW91dC5yZWdpc3RlckZyYW1lKHRoaXMpXHJcbiAgfVxyXG4gIGNvbXBvbmVudFdpbGxVbm1vdW50KCkge1xyXG4gICAgQXBwbGljYXRpb24ubGF5b3V0LnJlZ2lzdGVyRnJhbWUoKVxyXG4gIH1cclxuICBsb2FkRGlzcGxheUxheW91dCA9IChkaXNwbGF5TGF5b3V0KSA9PiB7XHJcbiAgICBjb25zdCBwYW5lbHMgPSB7fVxyXG4gICAgZm9yIChjb25zdCBkb2NrSWQgaW4gZGlzcGxheUxheW91dCkge1xyXG4gICAgICBjb25zdCBwYW5lbERlc2MgPSBkaXNwbGF5TGF5b3V0W2RvY2tJZF1cclxuICAgICAgY29uc3QgcGFuZWw6IFBhbmVsUHJvcHMgPSB7XHJcbiAgICAgICAgLi4ucGFuZWxEZXNjLFxyXG4gICAgICAgIGlkOiBkb2NrSWQsXHJcbiAgICAgICAgY3VycmVudDogQXBwbGljYXRpb24ubGF5b3V0LmdldFdpbmRvd0luc3RhbmNlKHBhbmVsRGVzYy5jdXJyZW50KSxcclxuICAgICAgICBpdGVtczogW10sXHJcbiAgICAgIH1cclxuICAgICAgcGFuZWxEZXNjLml0ZW1zICYmIHBhbmVsRGVzYy5pdGVtcy5mb3JFYWNoKHdpZCA9PiB7XHJcbiAgICAgICAgY29uc3Qgd25kID0gQXBwbGljYXRpb24ubGF5b3V0LmdldFdpbmRvd0luc3RhbmNlKHdpZClcclxuICAgICAgICBpZiAod25kKSB7XHJcbiAgICAgICAgICB3bmQuZG9ja0lkID0gZG9ja0lkXHJcbiAgICAgICAgICBwYW5lbC5pdGVtcy5wdXNoKHduZClcclxuICAgICAgICB9XHJcbiAgICAgIH0pXHJcbiAgICAgIHBhbmVsc1tkb2NrSWRdID0gcGFuZWxcclxuICAgIH1cclxuICAgIHRoaXMuc2V0U3RhdGUoeyBwYW5lbHMgfSlcclxuICAgIHRoaXMuZm9yY2VVcGRhdGUoKVxyXG4gIH1cclxuICBzaG93V2luZG93KHdpbmRvd0lkOiBXaW5kb3dJRCkge1xyXG4gICAgY29uc3QgcGFuZWxzID0gdGhpcy5zdGF0ZS5wYW5lbHNcclxuICAgIGNvbnN0IHduZCA9IEFwcGxpY2F0aW9uLmxheW91dC5nZXRXaW5kb3dJbnN0YW5jZSh3aW5kb3dJZClcclxuICAgIGlmICghd25kKSByZXR1cm4gbnVsbFxyXG5cclxuICAgIGNvbnN0IG9yaWdpbiA9IHBhbmVsc1t3bmQuZG9ja0lkXVxyXG4gICAgaWYgKG9yaWdpbikge1xyXG4gICAgICBwYW5lbHNbd25kLmRvY2tJZF0gPSB7XHJcbiAgICAgICAgLi4ub3JpZ2luLFxyXG4gICAgICAgIGN1cnJlbnQ6IHduZCxcclxuICAgICAgfVxyXG4gICAgICB0aGlzLnNldFN0YXRlKHsgcGFuZWxzIH0pXHJcbiAgICAgIHRoaXMuZm9yY2VVcGRhdGUoKVxyXG4gICAgfVxyXG4gIH1cclxuICBoaWRlV2luZG93KHdpbmRvd0lkOiBXaW5kb3dJRCkge1xyXG4gICAgY29uc3QgcGFuZWxzID0gdGhpcy5zdGF0ZS5wYW5lbHNcclxuICAgIGNvbnN0IHduZCA9IEFwcGxpY2F0aW9uLmxheW91dC5nZXRXaW5kb3dJbnN0YW5jZSh3aW5kb3dJZClcclxuICAgIGlmICghd25kKSByZXR1cm4gbnVsbFxyXG5cclxuICAgIGNvbnN0IG9yaWdpbiA9IHBhbmVsc1t3bmQuZG9ja0lkXVxyXG4gICAgaWYgKG9yaWdpbiAmJiBvcmlnaW4uY3VycmVudCA9PT0gd25kKSB7XHJcbiAgICAgIHBhbmVsc1t3bmQuZG9ja0lkXSA9IHtcclxuICAgICAgICAuLi5vcmlnaW4sXHJcbiAgICAgICAgY3VycmVudDogbnVsbCxcclxuICAgICAgfVxyXG4gICAgICB0aGlzLnNldFN0YXRlKHsgcGFuZWxzIH0pXHJcbiAgICAgIHRoaXMuZm9yY2VVcGRhdGUoKVxyXG4gICAgfVxyXG4gIH1cclxuICBkZXR0YWNoV2luZG93KHdpbmRvd0lkOiBXaW5kb3dJRCkge1xyXG4gICAgY29uc3QgcGFuZWxzID0gdGhpcy5zdGF0ZS5wYW5lbHNcclxuICAgIGNvbnN0IHduZCA9IEFwcGxpY2F0aW9uLmxheW91dC5nZXRXaW5kb3dJbnN0YW5jZSh3aW5kb3dJZClcclxuICAgIGlmICghd25kKSByZXR1cm4gbnVsbFxyXG5cclxuICAgIGxldCBvcmlnaW4gPSBwYW5lbHNbd25kLmRvY2tJZF1cclxuICAgIGlmIChvcmlnaW4pIHtcclxuICAgICAgb3JpZ2luID0ge1xyXG4gICAgICAgIC4uLm9yaWdpbixcclxuICAgICAgICBpdGVtczogb3JpZ2luLml0ZW1zLmZpbHRlcih4ID0+IHggIT09IHduZCksXHJcbiAgICAgIH1cclxuICAgICAgaWYgKG9yaWdpbi5jdXJyZW50ID09PSB3bmQpIG9yaWdpbi5jdXJyZW50ID0gb3JpZ2luLml0ZW1zWzBdXHJcbiAgICAgIHBhbmVsc1t3bmQuZG9ja0lkXSA9IG9yaWdpblxyXG4gICAgICB0aGlzLnNldFN0YXRlKHsgcGFuZWxzIH0pXHJcbiAgICAgIHRoaXMuZm9yY2VVcGRhdGUoKVxyXG4gICAgfVxyXG5cclxuICAgIHduZC5kb2NrSWQgPSBudWxsXHJcbiAgfVxyXG4gIGF0dGFjaFdpbmRvdyh3aW5kb3dJZDogV2luZG93SUQsIGRvY2tJZDogRG9ja0lELCBmb3JlZ3JvdW5kOiBib29sZWFuKSB7XHJcbiAgICBjb25zdCBwYW5lbHMgPSB0aGlzLnN0YXRlLnBhbmVsc1xyXG4gICAgY29uc3Qgd25kID0gQXBwbGljYXRpb24ubGF5b3V0LmdldFdpbmRvd0luc3RhbmNlKHdpbmRvd0lkKVxyXG4gICAgaWYgKCF3bmQpIHJldHVybiBudWxsXHJcblxyXG4gICAgLy8gRGV0YWNoIGZyb20gb3JpZ2luIHBhbmVsXHJcbiAgICBpZiAod25kLmRvY2tJZCAhPT0gZG9ja0lkKSB7XHJcbiAgICAgIGxldCBvcmlnaW4gPSBwYW5lbHNbd25kLmRvY2tJZF1cclxuICAgICAgaWYgKG9yaWdpbiAmJiBvcmlnaW4uaXRlbXMuaW5kZXhPZih3bmQpID49IDApIHtcclxuICAgICAgICBvcmlnaW4gPSB7XHJcbiAgICAgICAgICAuLi5vcmlnaW4sXHJcbiAgICAgICAgICBpdGVtczogb3JpZ2luLml0ZW1zLmZpbHRlcih4ID0+IHggIT09IHduZCksXHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmIChvcmlnaW4uY3VycmVudCA9PT0gd25kKSBvcmlnaW4uY3VycmVudCA9IG9yaWdpbi5pdGVtc1swXVxyXG4gICAgICAgIHBhbmVsc1t3bmQuZG9ja0lkXSA9IG9yaWdpblxyXG4gICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLy8gQXR0YWNoIHRvIHRhcmdldCBwYW5lbFxyXG4gICAgbGV0IHBhbmVsID0gcGFuZWxzW2RvY2tJZF1cclxuICAgIGlmIChwYW5lbCkge1xyXG4gICAgICBwYW5lbCA9IHsgLi4ucGFuZWwgfVxyXG4gICAgICBpZiAocGFuZWwuaXRlbXMuaW5kZXhPZih3bmQpIDwgMCkge1xyXG4gICAgICAgIHBhbmVsLml0ZW1zID0gWyAuLi5wYW5lbC5pdGVtcywgd25kIF1cclxuICAgICAgfVxyXG4gICAgICBwYW5lbC5jdXJyZW50ID0gZm9yZWdyb3VuZCA/ICh3bmQgfHwgcGFuZWwuY3VycmVudCkgOiAocGFuZWwuY3VycmVudCB8fCB3bmQpXHJcbiAgICAgIHBhbmVsc1tkb2NrSWRdID0gcGFuZWxcclxuICAgIH1cclxuXHJcbiAgICB3bmQuZG9ja0lkID0gZG9ja0lkXHJcbiAgICB0aGlzLnNldFN0YXRlKHsgcGFuZWxzIH0pXHJcbiAgICB0aGlzLmZvcmNlVXBkYXRlKClcclxuICB9XHJcbiAgbm90aWZ5UGFuZWxSZXNpemUocGFuZWw6IFBhbmVsUHJvcHMsIHNpemU6IG51bWJlcikge1xyXG4gICAgY29uc3QgcGFuZWxzID0gdGhpcy5zdGF0ZS5wYW5lbHNcclxuICAgIHBhbmVsc1twYW5lbC5pZF0gPSB7IC4uLnBhbmVsLCBzaXplIH1cclxuICAgIHRoaXMuc2V0U3RhdGUoeyBwYW5lbHMgfSlcclxuICB9XHJcbiAgcmVuZGVyUGFuZWwoaWQ6IHN0cmluZykge1xyXG4gICAgY29uc3QgcGFuZWwgPSB0aGlzLnN0YXRlLnBhbmVsc1tpZF1cclxuICAgIGNvbnN0IHByb3BzID0ge1xyXG4gICAgICBpZDogaWQsXHJcbiAgICAgIGZyYW1lOiB0aGlzLFxyXG4gICAgICBwYW5lbDogcGFuZWwsXHJcbiAgICAgIGNoaWxkcmVuOiBwYW5lbC5jaGlsZCAmJiB0aGlzLnJlbmRlclBhbmVsKHBhbmVsLmNoaWxkKSxcclxuICAgIH1cclxuICAgIHN3aXRjaCAocGFuZWwudHlwZSkge1xyXG4gICAgY2FzZSBcIiNcIjpcclxuICAgICAgcmV0dXJuICg8ZGl2IHN0eWxlPXsgc3R5bGVzLnJvb3QgfT4ge3Byb3BzLmNoaWxkcmVufSA8L2Rpdj4pXHJcbiAgICBjYXNlIFwic2lkZS1sZWZ0XCI6XHJcbiAgICAgIHJldHVybiBSZWFjdC5jcmVhdGVFbGVtZW50KFNpZGVQYW5lbExlZnQsIHByb3BzKVxyXG4gICAgY2FzZSBcInNpZGUtdG9wXCI6XHJcbiAgICAgIHJldHVybiBSZWFjdC5jcmVhdGVFbGVtZW50KFNpZGVQYW5lbFRvcCwgcHJvcHMpXHJcbiAgICBjYXNlIFwic2lkZS1yaWdodFwiOlxyXG4gICAgICByZXR1cm4gUmVhY3QuY3JlYXRlRWxlbWVudChTaWRlUGFuZWxSaWdodCwgcHJvcHMpXHJcbiAgICBjYXNlIFwic2lkZS1ib3R0b21cIjpcclxuICAgICAgcmV0dXJuIFJlYWN0LmNyZWF0ZUVsZW1lbnQoU2lkZVBhbmVsQm90dG9tLCBwcm9wcylcclxuICAgIGNhc2UgXCJjZW50ZXItdG9wXCI6XHJcbiAgICAgIHJldHVybiBSZWFjdC5jcmVhdGVFbGVtZW50KENlbnRlclBhbmVsVG9wLCBwcm9wcylcclxuICAgIGRlZmF1bHQ6XHJcbiAgICAgIHJldHVybiBudWxsXHJcbiAgICB9XHJcbiAgfVxyXG4gIHJlbmRlcigpIHtcclxuICAgIHJldHVybiB0aGlzLnJlbmRlclBhbmVsKFwiI1wiKVxyXG4gIH1cclxufVxyXG5cclxuY29uc3Qgc3R5bGVzID0ge1xyXG4gIHJvb3Q6IHsgaGVpZ2h0OiBcIjEwMCVcIiwgd2lkdGg6IFwiMTAwJVwiIH0sXHJcbn0iXX0=