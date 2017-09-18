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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9saWIvZnJhbWUvRnJhbWUuanMiXSwibmFtZXMiOlsiRnJhbWUiLCJsb2FkRGlzcGxheUxheW91dCIsImRpc3BsYXlMYXlvdXQiLCJwYW5lbHMiLCJkb2NrSWQiLCJwYW5lbERlc2MiLCJwYW5lbCIsImlkIiwiY3VycmVudCIsImdldFdpbmRvd0hhbmRsZSIsIml0ZW1zIiwiZm9yRWFjaCIsInduZCIsIndpZCIsInB1c2giLCJzZXRTdGF0ZSIsImZvcmNlVXBkYXRlIiwibGF5b3V0IiwicmVnaXN0ZXJGcmFtZSIsIndpbmRvd0lkIiwic3RhdGUiLCJvcmlnaW4iLCJmaWx0ZXIiLCJ4IiwiZm9yZWdyb3VuZCIsInNpemUiLCJwcm9wcyIsImZyYW1lIiwiY2hpbGRyZW4iLCJjaGlsZCIsInJlbmRlclBhbmVsIiwidHlwZSIsImhlaWdodCIsIndpZHRoIiwiY3JlYXRlRWxlbWVudCJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7QUFHQTs7OztBQUVBOztBQUVBOzs7Ozs7Ozs7OytlQVBBO0FBQ0E7QUFDQTs7O0lBZWFBLEssV0FBQUEsSzs7Ozs7Ozs7Ozs7Ozs7b0xBWVhDLGlCLEdBQW9CLFVBQUNDLGFBQUQsRUFBbUI7QUFDckMsVUFBTUMsU0FBUyxFQUFmOztBQURxQyxpQ0FFMUJDLE1BRjBCO0FBR25DLFlBQU1DLFlBQVlILGNBQWNFLE1BQWQsQ0FBbEI7QUFDQSxZQUFNRSxxQkFDREQsU0FEQztBQUVKRSxjQUFJSCxNQUZBO0FBR0pJLG1CQUFTLHlCQUFZQyxlQUFaLENBQTRCSixVQUFVRyxPQUF0QyxDQUhMO0FBSUpFLGlCQUFPO0FBSkgsVUFBTjtBQU1BTCxrQkFBVUssS0FBVixJQUFtQkwsVUFBVUssS0FBVixDQUFnQkMsT0FBaEIsQ0FBd0IsZUFBTztBQUNoRCxjQUFNQyxNQUFNLHlCQUFZSCxlQUFaLENBQTRCSSxHQUE1QixDQUFaO0FBQ0EsY0FBSUQsR0FBSixFQUFTO0FBQ1BBLGdCQUFJUixNQUFKLEdBQWFBLE1BQWI7QUFD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QixNQUFNdUIsS0FBdkI7QUFKYixPQUFkO0FBTUEsY0FBUXZCLE1BQU15QixJQUFkO0FBQ0EsYUFBSyxHQUFMO0FBQ0UsaUJBQVE7QUFBQTtBQUFBLGNBQUssT0FBTyxFQUFFQyxRQUFRLE1BQVYsRUFBa0JDLE9BQU8sTUFBekIsRUFBWjtBQUFBO0FBQWlEUCxrQkFBTUUsUUFBdkQ7QUFBQTtBQUFBLFdBQVI7QUFDRixhQUFLLFdBQUw7QUFDRSxpQkFBTyxnQkFBTU0sYUFBTiw2QkFBbUNSLEtBQW5DLENBQVA7QUFDRixhQUFLLFVBQUw7QUFDRSxpQkFBTyxnQkFBTVEsYUFBTiw0QkFBa0NSLEtBQWxDLENBQVA7QUFDRixhQUFLLFlBQUw7QUFDRSxpQkFBTyxnQkFBTVEsYUFBTiw4QkFBb0NSLEtBQXBDLENBQVA7QUFDRixhQUFLLGFBQUw7QUFDRSxpQkFBTyxnQkFBTVEsYUFBTiwrQkFBcUNSLEtBQXJDLENBQVA7QUFDRixhQUFLLFlBQUw7QUFDRSxpQkFBTyxnQkFBTVEsYUFBTiw4QkFBb0NSLEtBQXBDLENBQVA7QUFDRjtBQUNFLGlCQUFPLElBQVA7QUFkRjtBQWdCRDs7OzZCQUNRO0FBQ1AsYUFBTyxLQUFLSSxXQUFMLENBQWlCLEdBQWpCLENBQVA7QUFDRCIsImZpbGUiOiJGcmFtZS5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8qIGVzbGludC1kaXNhYmxlIGd1YXJkLWZvci1pbiAqL1xyXG4vKiBlc2xpbnQtZGlzYWJsZSBpbXBvcnQvbm8tbmFtZXNwYWNlICovXHJcbi8qIGVzbGludC1kaXNhYmxlIHJlYWN0LW5hdGl2ZS9uby1pbmxpbmUtc3R5bGVzICovXHJcbmltcG9ydCBSZWFjdCwgeyBDb21wb25lbnQgfSBmcm9tIFwicmVhY3RcIlxyXG5cclxuaW1wb3J0IHsgQXBwbGljYXRpb24gfSBmcm9tIFwiLi4vYXBwbGljYXRpb25cIlxyXG5cclxuaW1wb3J0IHsgUGFuZWxQcm9wcywgU2lkZVBhbmVsVG9wLCBTaWRlUGFuZWxMZWZ0LCBTaWRlUGFuZWxSaWdodCwgU2lkZVBhbmVsQm90dG9tLCBDZW50ZXJQYW5lbFRvcCB9IGZyb20gXCIuL0ZyYW1lUGFuZWxzXCJcclxuXHJcbnR5cGUgUHJvcHNUeXBlID0ge1xyXG4gIGRpc3BsYXlMYXlvdXQ6IGFueSxcclxufVxyXG5cclxudHlwZSBTdGF0ZVR5cGUgPSB7XHJcbiAgcGFuZWxzOiB7IFtzdHJpbmddOiBQYW5lbFByb3BzIH0sXHJcbn1cclxuXHJcbmV4cG9ydCBjbGFzcyBGcmFtZSBleHRlbmRzIENvbXBvbmVudDx2b2lkLCBQcm9wc1R5cGUsIFN0YXRlVHlwZT4ge1xyXG4gIHByb3BzOiBQcm9wc1R5cGVcclxuICBzdGF0ZTogU3RhdGVUeXBlXHJcbiAgY29tcG9uZW50V2lsbE1vdW50KCkge1xyXG4gICAgdGhpcy5sb2FkRGlzcGxheUxheW91dChBcHBsaWNhdGlvbi5sYXlvdXQuZGlzcGxheUxheW91dClcclxuICB9XHJcbiAgY29tcG9uZW50RGlkTW91bnQoKSB7XHJcbiAgICBBcHBsaWNhdGlvbi5sYXlvdXQucmVnaXN0ZXJGcmFtZSh0aGlzKVxyXG4gIH1cclxuICBjb21wb25lbnRXaWxsVW5tb3VudCgpIHtcclxuICAgIEFwcGxpY2F0aW9uLmxheW91dC5yZWdpc3RlckZyYW1lKClcclxuICB9XHJcbiAgbG9hZERpc3BsYXlMYXlvdXQgPSAoZGlzcGxheUxheW91dCkgPT4ge1xyXG4gICAgY29uc3QgcGFuZWxzID0ge31cclxuICAgIGZvciAoY29uc3QgZG9ja0lkIGluIGRpc3BsYXlMYXlvdXQpIHtcclxuICAgICAgY29uc3QgcGFuZWxEZXNjID0gZGlzcGxheUxheW91dFtkb2NrSWRdXHJcbiAgICAgIGNvbnN0IHBhbmVsOiBQYW5lbFByb3BzID0ge1xyXG4gICAgICAgIC4uLnBhbmVsRGVzYyxcclxuICAgICAgICBpZDogZG9ja0lkLFxyXG4gICAgICAgIGN1cnJlbnQ6IEFwcGxpY2F0aW9uLmdldFdpbmRvd0hhbmRsZShwYW5lbERlc2MuY3VycmVudCksXHJcbiAgICAgICAgaXRlbXM6IFtdLFxyXG4gICAgICB9XHJcbiAgICAgIHBhbmVsRGVzYy5pdGVtcyAmJiBwYW5lbERlc2MuaXRlbXMuZm9yRWFjaCh3aWQgPT4ge1xyXG4gICAgICAgIGNvbnN0IHduZCA9IEFwcGxpY2F0aW9uLmdldFdpbmRvd0hhbmRsZSh3aWQpXHJcbiAgICAgICAgaWYgKHduZCkge1xyXG4gICAgICAgICAgd25kLmRvY2tJZCA9IGRvY2tJZFxyXG4gICAgICAgICAgcGFuZWwuaXRlbXMucHVzaCh3bmQpXHJcbiAgICAgICAgfVxyXG4gICAgICB9KVxyXG4gICAgICBwYW5lbHNbZG9ja0lkXSA9IHBhbmVsXHJcbiAgICB9XHJcbiAgICB0aGlzLnNldFN0YXRlKHsgcGFuZWxzIH0pXHJcbiAgICB0aGlzLmZvcmNlVXBkYXRlKClcclxuICB9XHJcbiAgc2hvd1dpbmRvdyh3aW5kb3dJZDogV2luZG93SUQpIHtcclxuICAgIGNvbnN0IHBhbmVscyA9IHRoaXMuc3RhdGUucGFuZWxzXHJcbiAgICBjb25zdCB3bmQgPSBBcHBsaWNhdGlvbi5nZXRXaW5kb3dIYW5kbGUod2luZG93SWQpXHJcbiAgICBpZiAoIXduZCkgcmV0dXJuIG51bGxcclxuXHJcbiAgICBjb25zdCBvcmlnaW4gPSBwYW5lbHNbd25kLmRvY2tJZF1cclxuICAgIGlmIChvcmlnaW4pIHtcclxuICAgICAgcGFuZWxzW3duZC5kb2NrSWRdID0ge1xyXG4gICAgICAgIC4uLm9yaWdpbixcclxuICAgICAgICBjdXJyZW50OiB3bmQsXHJcbiAgICAgIH1cclxuICAgICAgdGhpcy5zZXRTdGF0ZSh7IHBhbmVscyB9KVxyXG4gICAgICB0aGlzLmZvcmNlVXBkYXRlKClcclxuICAgIH1cclxuICB9XHJcbiAgaGlkZVdpbmRvdyh3aW5kb3dJZDogV2luZG93SUQpIHtcclxuICAgIGNvbnN0IHBhbmVscyA9IHRoaXMuc3RhdGUucGFuZWxzXHJcbiAgICBjb25zdCB3bmQgPSBBcHBsaWNhdGlvbi5nZXRXaW5kb3dIYW5kbGUod2luZG93SWQpXHJcbiAgICBpZiAoIXduZCkgcmV0dXJuIG51bGxcclxuXHJcbiAgICBjb25zdCBvcmlnaW4gPSBwYW5lbHNbd25kLmRvY2tJZF1cclxuICAgIGlmIChvcmlnaW4gJiYgb3JpZ2luLmN1cnJlbnQgPT09IHduZCkge1xyXG4gICAgICBwYW5lbHNbd25kLmRvY2tJZF0gPSB7XHJcbiAgICAgICAgLi4ub3JpZ2luLFxyXG4gICAgICAgIGN1cnJlbnQ6IG51bGwsXHJcbiAgICAgIH1cclxuICAgICAgdGhpcy5zZXRTdGF0ZSh7IHBhbmVscyB9KVxyXG4gICAgICB0aGlzLmZvcmNlVXBkYXRlKClcclxuICAgIH1cclxuICB9XHJcbiAgZGV0dGFjaFdpbmRvdyh3aW5kb3dJZDogV2luZG93SUQpIHtcclxuICAgIGNvbnN0IHBhbmVscyA9IHRoaXMuc3RhdGUucGFuZWxzXHJcbiAgICBjb25zdCB3bmQgPSBBcHBsaWNhdGlvbi5nZXRXaW5kb3dIYW5kbGUod2luZG93SWQpXHJcbiAgICBpZiAoIXduZCkgcmV0dXJuIG51bGxcclxuXHJcbiAgICBsZXQgb3JpZ2luID0gcGFuZWxzW3duZC5kb2NrSWRdXHJcbiAgICBpZiAob3JpZ2luKSB7XHJcbiAgICAgIG9yaWdpbiA9IHtcclxuICAgICAgICAuLi5vcmlnaW4sXHJcbiAgICAgICAgaXRlbXM6IG9yaWdpbi5pdGVtcy5maWx0ZXIoeCA9PiB4ICE9PSB3bmQpLFxyXG4gICAgICB9XHJcbiAgICAgIGlmIChvcmlnaW4uY3VycmVudCA9PT0gd25kKSBvcmlnaW4uY3VycmVudCA9IG9yaWdpbi5pdGVtc1swXVxyXG4gICAgICBwYW5lbHNbd25kLmRvY2tJZF0gPSBvcmlnaW5cclxuICAgICAgdGhpcy5zZXRTdGF0ZSh7IHBhbmVscyB9KVxyXG4gICAgICB0aGlzLmZvcmNlVXBkYXRlKClcclxuICAgIH1cclxuXHJcbiAgICB3bmQuZG9ja0lkID0gbnVsbFxyXG4gIH1cclxuICBhdHRhY2hXaW5kb3cod2luZG93SWQ6IFdpbmRvd0lELCBkb2NrSWQ6IERvY2tJRCwgZm9yZWdyb3VuZDogYm9vbGVhbikge1xyXG4gICAgY29uc3QgcGFuZWxzID0gdGhpcy5zdGF0ZS5wYW5lbHNcclxuICAgIGNvbnN0IHduZCA9IEFwcGxpY2F0aW9uLmdldFdpbmRvd0hhbmRsZSh3aW5kb3dJZClcclxuICAgIGlmICghd25kKSByZXR1cm4gbnVsbFxyXG5cclxuICAgIGxldCBvcmlnaW4gPSBwYW5lbHNbd25kLmRvY2tJZF1cclxuICAgIGlmIChvcmlnaW4pIHtcclxuICAgICAgb3JpZ2luID0ge1xyXG4gICAgICAgIC4uLm9yaWdpbixcclxuICAgICAgICBpdGVtczogb3JpZ2luLml0ZW1zLmZpbHRlcih4ID0+IHggIT09IHduZCksXHJcbiAgICAgIH1cclxuICAgICAgaWYgKG9yaWdpbi5jdXJyZW50ID09PSB3bmQpIG9yaWdpbi5jdXJyZW50ID0gb3JpZ2luLml0ZW1zWzBdXHJcbiAgICAgIHBhbmVsc1t3bmQuZG9ja0lkXSA9IG9yaWdpblxyXG4gICAgfVxyXG5cclxuICAgIGxldCBwYW5lbCA9IHBhbmVsc1tkb2NrSWRdXHJcbiAgICBpZiAocGFuZWwpIHtcclxuICAgICAgcGFuZWwgPSB7XHJcbiAgICAgICAgLi4ucGFuZWwsXHJcbiAgICAgICAgY3VycmVudDogZm9yZWdyb3VuZCA/ICh3bmQgfHwgcGFuZWwuY3VycmVudCkgOiAocGFuZWwuY3VycmVudCB8fCB3bmQpLFxyXG4gICAgICAgIGl0ZW1zOiBbIC4uLnBhbmVsLml0ZW1zLCB3bmQgXSxcclxuICAgICAgfVxyXG4gICAgICBwYW5lbHNbZG9ja0lkXSA9IHBhbmVsXHJcbiAgICB9XHJcblxyXG4gICAgd25kLmRvY2tJZCA9IGRvY2tJZFxyXG4gICAgdGhpcy5zZXRTdGF0ZSh7IHBhbmVscyB9KVxyXG4gICAgdGhpcy5mb3JjZVVwZGF0ZSgpXHJcbiAgfVxyXG4gIG5vdGlmeVBhbmVsUmVzaXplKHBhbmVsOiBQYW5lbFByb3BzLCBzaXplOiBudW1iZXIpIHtcclxuICAgIGNvbnN0IHBhbmVscyA9IHRoaXMuc3RhdGUucGFuZWxzXHJcbiAgICBwYW5lbHNbcGFuZWwuaWRdID0geyAuLi5wYW5lbCwgc2l6ZSB9XHJcbiAgICB0aGlzLnNldFN0YXRlKHsgcGFuZWxzIH0pXHJcbiAgfVxyXG4gIHJlbmRlclBhbmVsKGlkOiBzdHJpbmcpIHtcclxuICAgIGNvbnN0IHBhbmVsID0gdGhpcy5zdGF0ZS5wYW5lbHNbaWRdXHJcbiAgICBjb25zdCBwcm9wcyA9IHtcclxuICAgICAgaWQ6IGlkLFxyXG4gICAgICBmcmFtZTogdGhpcyxcclxuICAgICAgcGFuZWw6IHBhbmVsLFxyXG4gICAgICBjaGlsZHJlbjogcGFuZWwuY2hpbGQgJiYgdGhpcy5yZW5kZXJQYW5lbChwYW5lbC5jaGlsZCksXHJcbiAgICB9XHJcbiAgICBzd2l0Y2ggKHBhbmVsLnR5cGUpIHtcclxuICAgIGNhc2UgXCIjXCI6XHJcbiAgICAgIHJldHVybiAoPGRpdiBzdHlsZT17eyBoZWlnaHQ6IFwiMTAwJVwiLCB3aWR0aDogXCIxMDAlXCIgfX0+IHtwcm9wcy5jaGlsZHJlbn0gPC9kaXY+KVxyXG4gICAgY2FzZSBcInNpZGUtbGVmdFwiOlxyXG4gICAgICByZXR1cm4gUmVhY3QuY3JlYXRlRWxlbWVudChTaWRlUGFuZWxMZWZ0LCBwcm9wcylcclxuICAgIGNhc2UgXCJzaWRlLXRvcFwiOlxyXG4gICAgICByZXR1cm4gUmVhY3QuY3JlYXRlRWxlbWVudChTaWRlUGFuZWxUb3AsIHByb3BzKVxyXG4gICAgY2FzZSBcInNpZGUtcmlnaHRcIjpcclxuICAgICAgcmV0dXJuIFJlYWN0LmNyZWF0ZUVsZW1lbnQoU2lkZVBhbmVsUmlnaHQsIHByb3BzKVxyXG4gICAgY2FzZSBcInNpZGUtYm90dG9tXCI6XHJcbiAgICAgIHJldHVybiBSZWFjdC5jcmVhdGVFbGVtZW50KFNpZGVQYW5lbEJvdHRvbSwgcHJvcHMpXHJcbiAgICBjYXNlIFwiY2VudGVyLXRvcFwiOlxyXG4gICAgICByZXR1cm4gUmVhY3QuY3JlYXRlRWxlbWVudChDZW50ZXJQYW5lbFRvcCwgcHJvcHMpXHJcbiAgICBkZWZhdWx0OlxyXG4gICAgICByZXR1cm4gbnVsbFxyXG4gICAgfVxyXG4gIH1cclxuICByZW5kZXIoKSB7XHJcbiAgICByZXR1cm4gdGhpcy5yZW5kZXJQYW5lbChcIiNcIilcclxuICB9XHJcbn1cclxuIl19