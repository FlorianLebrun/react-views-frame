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
    value: function showWindow(wnd) {
      var panels = this.state.panels;
      if (!wnd) return null;

      var origin = panels[wnd.dockId];
      if (origin) {
        panels[wnd.dockId] = _extends({}, origin, {
          current: wnd
        });
        this.setState({ panels: panels });
      }
    }
  }, {
    key: "hideWindow",
    value: function hideWindow(wnd) {
      var panels = this.state.panels;
      if (!wnd) return null;

      var origin = panels[wnd.dockId];
      if (origin && origin.current === wnd) {
        panels[wnd.dockId] = _extends({}, origin, {
          current: null
        });
        this.setState({ panels: panels });
      }
    }
  }, {
    key: "dettachWindow",
    value: function dettachWindow(wnd) {
      var panels = this.state.panels;
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
      }

      wnd.dockId = null;
    }
  }, {
    key: "attachWindow",
    value: function attachWindow(wnd, dockId, foreground) {
      var panels = this.state.panels;
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
    }
  }, {
    key: "notifyPanelResize",
    value: function notifyPanelResize(panel, size) {
      var panels = this.state.panels;
      panels[panel.id] = _extends({}, panel, { size: size });
      this.setState({ panels: panels });
    }
  }, {
    key: "notifyFocusChange",
    value: function notifyFocusChange(focused, prev_focused) {
      var panels = this.state.panels;

      if (prev_focused) {
        var origin = panels[prev_focused.dockId];
        if (origin) {
          panels[prev_focused.dockId] = _extends({}, origin, {
            focused: false
          });
        }
      }
      if (focused) {
        var _origin = panels[focused.dockId];
        if (_origin) {
          panels[focused.dockId] = _extends({}, _origin, {
            focused: true
          });
        }
      }
      this.setState({ panels: panels });
      this.forceUpdate();
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9saWIvYWRkb25zL3dpbmRvd3MtZnJhbWUvRnJhbWUuanMiXSwibmFtZXMiOlsiRnJhbWUiLCJsb2FkRGlzcGxheUxheW91dCIsImRpc3BsYXlMYXlvdXQiLCJwYW5lbHMiLCJkb2NrSWQiLCJwYW5lbERlc2MiLCJwYW5lbCIsImlkIiwiY3VycmVudCIsImxheW91dCIsImdldFdpbmRvd0luc3RhbmNlIiwiaXRlbXMiLCJmb3JFYWNoIiwid25kIiwid2lkIiwicHVzaCIsInNldFN0YXRlIiwicmVnaXN0ZXJGcmFtZSIsInN0YXRlIiwib3JpZ2luIiwiZmlsdGVyIiwieCIsImZvcmVncm91bmQiLCJpbmRleE9mIiwic2l6ZSIsImZvY3VzZWQiLCJwcmV2X2ZvY3VzZWQiLCJmb3JjZVVwZGF0ZSIsInByb3BzIiwiZnJhbWUiLCJjaGlsZHJlbiIsImNoaWxkIiwicmVuZGVyUGFuZWwiLCJ0eXBlIiwic3R5bGVzIiwicm9vdCIsImNyZWF0ZUVsZW1lbnQiLCJoZWlnaHQiLCJ3aWR0aCJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7QUFDQTs7OztBQUVBOztBQUVBOzs7Ozs7Ozs7OytlQUxBOzs7SUFlYUEsSyxXQUFBQSxLOzs7Ozs7Ozs7Ozs7OztvTEFZWEMsaUIsR0FBb0IsVUFBQ0MsYUFBRCxFQUFtQjtBQUNyQyxVQUFNQyxTQUFTLEVBQWY7O0FBRHFDLGlDQUUxQkMsTUFGMEI7QUFHbkMsWUFBTUMsWUFBWUgsY0FBY0UsTUFBZCxDQUFsQjtBQUNBLFlBQU1FLHFCQUNERCxTQURDO0FBRUpFLGNBQUlILE1BRkE7QUFHSkksbUJBQVMseUJBQVlDLE1BQVosQ0FBbUJDLGlCQUFuQixDQUFxQ0wsVUFBVUcsT0FBL0MsQ0FITDtBQUlKRyxpQkFBTztBQUpILFVBQU47QUFNQU4sa0JBQVVNLEtBQVYsSUFBbUJOLFVBQVVNLEtBQVYsQ0FBZ0JDLE9BQWhCLENBQXdCLGVBQU87QUFDaEQsY0FBTUMsTUFBTSx5QkFBWUosTUFBWixDQUFtQkMs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QU8sS0FBS0ksV0FBTCxDQUFpQixHQUFqQixDQUFQO0FBQ0Q7Ozs7OztBQUdILElBQU1FLFNBQVM7QUFDYkMsUUFBTSxFQUFFRSxRQUFRLE1BQVYsRUFBa0JDLE9BQU8sTUFBekI7QUFETyxDQUFmIiwiZmlsZSI6IkZyYW1lLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLyogZXNsaW50LWRpc2FibGUgZ3VhcmQtZm9yLWluICovXHJcbmltcG9ydCBSZWFjdCwgeyBDb21wb25lbnQgfSBmcm9tIFwicmVhY3RcIlxyXG5cclxuaW1wb3J0IHsgQXBwbGljYXRpb24gfSBmcm9tIFwiLi4vLi4vYXBwbGljYXRpb25cIlxyXG5cclxuaW1wb3J0IHsgUGFuZWxQcm9wcywgU2lkZVBhbmVsVG9wLCBTaWRlUGFuZWxMZWZ0LCBTaWRlUGFuZWxSaWdodCwgU2lkZVBhbmVsQm90dG9tLCBDZW50ZXJQYW5lbFRvcCB9IGZyb20gXCIuL0ZyYW1lUGFuZWxzXCJcclxuXHJcbnR5cGUgUHJvcHNUeXBlID0ge1xyXG4gIGRpc3BsYXlMYXlvdXQ6IGFueSxcclxufVxyXG5cclxudHlwZSBTdGF0ZVR5cGUgPSB7XHJcbiAgcGFuZWxzOiB7IFtzdHJpbmddOiBQYW5lbFByb3BzIH0sXHJcbn1cclxuXHJcbmV4cG9ydCBjbGFzcyBGcmFtZSBleHRlbmRzIENvbXBvbmVudDx2b2lkLCBQcm9wc1R5cGUsIFN0YXRlVHlwZT4ge1xyXG4gIHByb3BzOiBQcm9wc1R5cGVcclxuICBzdGF0ZTogU3RhdGVUeXBlXHJcbiAgY29tcG9uZW50V2lsbE1vdW50KCkge1xyXG4gICAgdGhpcy5sb2FkRGlzcGxheUxheW91dChBcHBsaWNhdGlvbi5sYXlvdXQuZGlzcGxheUxheW91dClcclxuICB9XHJcbiAgY29tcG9uZW50RGlkTW91bnQoKSB7XHJcbiAgICBBcHBsaWNhdGlvbi5sYXlvdXQucmVnaXN0ZXJGcmFtZSh0aGlzKVxyXG4gIH1cclxuICBjb21wb25lbnRXaWxsVW5tb3VudCgpIHtcclxuICAgIEFwcGxpY2F0aW9uLmxheW91dC5yZWdpc3RlckZyYW1lKClcclxuICB9XHJcbiAgbG9hZERpc3BsYXlMYXlvdXQgPSAoZGlzcGxheUxheW91dCkgPT4ge1xyXG4gICAgY29uc3QgcGFuZWxzID0ge31cclxuICAgIGZvciAoY29uc3QgZG9ja0lkIGluIGRpc3BsYXlMYXlvdXQpIHtcclxuICAgICAgY29uc3QgcGFuZWxEZXNjID0gZGlzcGxheUxheW91dFtkb2NrSWRdXHJcbiAgICAgIGNvbnN0IHBhbmVsOiBQYW5lbFByb3BzID0ge1xyXG4gICAgICAgIC4uLnBhbmVsRGVzYyxcclxuICAgICAgICBpZDogZG9ja0lkLFxyXG4gICAgICAgIGN1cnJlbnQ6IEFwcGxpY2F0aW9uLmxheW91dC5nZXRXaW5kb3dJbnN0YW5jZShwYW5lbERlc2MuY3VycmVudCksXHJcbiAgICAgICAgaXRlbXM6IFtdLFxyXG4gICAgICB9XHJcbiAgICAgIHBhbmVsRGVzYy5pdGVtcyAmJiBwYW5lbERlc2MuaXRlbXMuZm9yRWFjaCh3aWQgPT4ge1xyXG4gICAgICAgIGNvbnN0IHduZCA9IEFwcGxpY2F0aW9uLmxheW91dC5nZXRXaW5kb3dJbnN0YW5jZSh3aWQpXHJcbiAgICAgICAgaWYgKHduZCkge1xyXG4gICAgICAgICAgd25kLmRvY2tJZCA9IGRvY2tJZFxyXG4gICAgICAgICAgcGFuZWwuaXRlbXMucHVzaCh3bmQpXHJcbiAgICAgICAgfVxyXG4gICAgICB9KVxyXG4gICAgICBwYW5lbHNbZG9ja0lkXSA9IHBhbmVsXHJcbiAgICB9XHJcbiAgICB0aGlzLnNldFN0YXRlKHsgcGFuZWxzIH0pXHJcbiAgfVxyXG4gIHNob3dXaW5kb3cod25kOiBXaW5kb3dJbnN0YW5jZSkge1xyXG4gICAgY29uc3QgcGFuZWxzID0gdGhpcy5zdGF0ZS5wYW5lbHNcclxuICAgIGlmICghd25kKSByZXR1cm4gbnVsbFxyXG5cclxuICAgIGNvbnN0IG9yaWdpbiA9IHBhbmVsc1t3bmQuZG9ja0lkXVxyXG4gICAgaWYgKG9yaWdpbikge1xyXG4gICAgICBwYW5lbHNbd25kLmRvY2tJZF0gPSB7XHJcbiAgICAgICAgLi4ub3JpZ2luLFxyXG4gICAgICAgIGN1cnJlbnQ6IHduZCxcclxuICAgICAgfVxyXG4gICAgICB0aGlzLnNldFN0YXRlKHsgcGFuZWxzIH0pXHJcbiAgICB9XHJcbiAgfVxyXG4gIGhpZGVXaW5kb3cod25kOiBXaW5kb3dJbnN0YW5jZSkge1xyXG4gICAgY29uc3QgcGFuZWxzID0gdGhpcy5zdGF0ZS5wYW5lbHNcclxuICAgIGlmICghd25kKSByZXR1cm4gbnVsbFxyXG5cclxuICAgIGNvbnN0IG9yaWdpbiA9IHBhbmVsc1t3bmQuZG9ja0lkXVxyXG4gICAgaWYgKG9yaWdpbiAmJiBvcmlnaW4uY3VycmVudCA9PT0gd25kKSB7XHJcbiAgICAgIHBhbmVsc1t3bmQuZG9ja0lkXSA9IHtcclxuICAgICAgICAuLi5vcmlnaW4sXHJcbiAgICAgICAgY3VycmVudDogbnVsbCxcclxuICAgICAgfVxyXG4gICAgICB0aGlzLnNldFN0YXRlKHsgcGFuZWxzIH0pXHJcbiAgICB9XHJcbiAgfVxyXG4gIGRldHRhY2hXaW5kb3cod25kOiBXaW5kb3dJbnN0YW5jZSkge1xyXG4gICAgY29uc3QgcGFuZWxzID0gdGhpcy5zdGF0ZS5wYW5lbHNcclxuICAgIGlmICghd25kKSByZXR1cm4gbnVsbFxyXG5cclxuICAgIGxldCBvcmlnaW4gPSBwYW5lbHNbd25kLmRvY2tJZF1cclxuICAgIGlmIChvcmlnaW4pIHtcclxuICAgICAgb3JpZ2luID0ge1xyXG4gICAgICAgIC4uLm9yaWdpbixcclxuICAgICAgICBpdGVtczogb3JpZ2luLml0ZW1zLmZpbHRlcih4ID0+IHggIT09IHduZCksXHJcbiAgICAgIH1cclxuICAgICAgaWYgKG9yaWdpbi5jdXJyZW50ID09PSB3bmQpIG9yaWdpbi5jdXJyZW50ID0gb3JpZ2luLml0ZW1zWzBdXHJcbiAgICAgIHBhbmVsc1t3bmQuZG9ja0lkXSA9IG9yaWdpblxyXG4gICAgICB0aGlzLnNldFN0YXRlKHsgcGFuZWxzIH0pXHJcbiAgICB9XHJcblxyXG4gICAgd25kLmRvY2tJZCA9IG51bGxcclxuICB9XHJcbiAgYXR0YWNoV2luZG93KHduZDogV2luZG93SW5zdGFuY2UsIGRvY2tJZDogRG9ja0lELCBmb3JlZ3JvdW5kOiBib29sZWFuKSB7XHJcbiAgICBjb25zdCBwYW5lbHMgPSB0aGlzLnN0YXRlLnBhbmVsc1xyXG4gICAgaWYgKCF3bmQpIHJldHVybiBudWxsXHJcblxyXG4gICAgLy8gRGV0YWNoIGZyb20gb3JpZ2luIHBhbmVsXHJcbiAgICBpZiAod25kLmRvY2tJZCAhPT0gZG9ja0lkKSB7XHJcbiAgICAgIGxldCBvcmlnaW4gPSBwYW5lbHNbd25kLmRvY2tJZF1cclxuICAgICAgaWYgKG9yaWdpbiAmJiBvcmlnaW4uaXRlbXMuaW5kZXhPZih3bmQpID49IDApIHtcclxuICAgICAgICBvcmlnaW4gPSB7XHJcbiAgICAgICAgICAuLi5vcmlnaW4sXHJcbiAgICAgICAgICBpdGVtczogb3JpZ2luLml0ZW1zLmZpbHRlcih4ID0+IHggIT09IHduZCksXHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmIChvcmlnaW4uY3VycmVudCA9PT0gd25kKSBvcmlnaW4uY3VycmVudCA9IG9yaWdpbi5pdGVtc1swXVxyXG4gICAgICAgIHBhbmVsc1t3bmQuZG9ja0lkXSA9IG9yaWdpblxyXG4gICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLy8gQXR0YWNoIHRvIHRhcmdldCBwYW5lbFxyXG4gICAgbGV0IHBhbmVsID0gcGFuZWxzW2RvY2tJZF1cclxuICAgIGlmIChwYW5lbCkge1xyXG4gICAgICBwYW5lbCA9IHsgLi4ucGFuZWwgfVxyXG4gICAgICBpZiAocGFuZWwuaXRlbXMuaW5kZXhPZih3bmQpIDwgMCkge1xyXG4gICAgICAgIHBhbmVsLml0ZW1zID0gWyAuLi5wYW5lbC5pdGVtcywgd25kIF1cclxuICAgICAgfVxyXG4gICAgICBwYW5lbC5jdXJyZW50ID0gZm9yZWdyb3VuZCA/ICh3bmQgfHwgcGFuZWwuY3VycmVudCkgOiAocGFuZWwuY3VycmVudCB8fCB3bmQpXHJcbiAgICAgIHBhbmVsc1tkb2NrSWRdID0gcGFuZWxcclxuICAgIH1cclxuXHJcbiAgICB3bmQuZG9ja0lkID0gZG9ja0lkXHJcbiAgICB0aGlzLnNldFN0YXRlKHsgcGFuZWxzIH0pXHJcbiAgfVxyXG4gIG5vdGlmeVBhbmVsUmVzaXplKHBhbmVsOiBQYW5lbFByb3BzLCBzaXplOiBudW1iZXIpIHtcclxuICAgIGNvbnN0IHBhbmVscyA9IHRoaXMuc3RhdGUucGFuZWxzXHJcbiAgICBwYW5lbHNbcGFuZWwuaWRdID0geyAuLi5wYW5lbCwgc2l6ZSB9XHJcbiAgICB0aGlzLnNldFN0YXRlKHsgcGFuZWxzIH0pXHJcbiAgfVxyXG4gIG5vdGlmeUZvY3VzQ2hhbmdlKGZvY3VzZWQ6IFdpbmRvd0luc3RhbmNlLCBwcmV2X2ZvY3VzZWQ6IFdpbmRvd0luc3RhbmNlKSB7XHJcbiAgICBjb25zdCBwYW5lbHMgPSB0aGlzLnN0YXRlLnBhbmVsc1xyXG4gICAgXHJcbiAgICBpZihwcmV2X2ZvY3VzZWQpIHtcclxuICAgICAgY29uc3Qgb3JpZ2luID0gcGFuZWxzW3ByZXZfZm9jdXNlZC5kb2NrSWRdXHJcbiAgICAgIGlmIChvcmlnaW4pIHtcclxuICAgICAgICBwYW5lbHNbcHJldl9mb2N1c2VkLmRvY2tJZF0gPSB7XHJcbiAgICAgICAgICAuLi5vcmlnaW4sXHJcbiAgICAgICAgICBmb2N1c2VkOmZhbHNlLFxyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgfVxyXG4gICAgaWYoZm9jdXNlZCkge1xyXG4gICAgICBjb25zdCBvcmlnaW4gPSBwYW5lbHNbZm9jdXNlZC5kb2NrSWRdXHJcbiAgICAgIGlmIChvcmlnaW4pIHtcclxuICAgICAgICBwYW5lbHNbZm9jdXNlZC5kb2NrSWRdID0ge1xyXG4gICAgICAgICAgLi4ub3JpZ2luLFxyXG4gICAgICAgICAgZm9jdXNlZDp0cnVlLFxyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgfVxyXG4gICAgdGhpcy5zZXRTdGF0ZSh7IHBhbmVscyB9KVxyXG4gICAgdGhpcy5mb3JjZVVwZGF0ZSgpXHJcbiAgfVxyXG4gIHJlbmRlclBhbmVsKGlkOiBzdHJpbmcpIHtcclxuICAgIGNvbnN0IHBhbmVsID0gdGhpcy5zdGF0ZS5wYW5lbHNbaWRdXHJcbiAgICBjb25zdCBwcm9wcyA9IHtcclxuICAgICAgaWQ6IGlkLFxyXG4gICAgICBmcmFtZTogdGhpcyxcclxuICAgICAgcGFuZWw6IHBhbmVsLFxyXG4gICAgICBjaGlsZHJlbjogcGFuZWwuY2hpbGQgJiYgdGhpcy5yZW5kZXJQYW5lbChwYW5lbC5jaGlsZCksXHJcbiAgICB9XHJcbiAgICBzd2l0Y2ggKHBhbmVsLnR5cGUpIHtcclxuICAgIGNhc2UgXCIjXCI6XHJcbiAgICAgIHJldHVybiAoPGRpdiBzdHlsZT17IHN0eWxlcy5yb290IH0+IHtwcm9wcy5jaGlsZHJlbn0gPC9kaXY+KVxyXG4gICAgY2FzZSBcInNpZGUtbGVmdFwiOlxyXG4gICAgICByZXR1cm4gUmVhY3QuY3JlYXRlRWxlbWVudChTaWRlUGFuZWxMZWZ0LCBwcm9wcylcclxuICAgIGNhc2UgXCJzaWRlLXRvcFwiOlxyXG4gICAgICByZXR1cm4gUmVhY3QuY3JlYXRlRWxlbWVudChTaWRlUGFuZWxUb3AsIHByb3BzKVxyXG4gICAgY2FzZSBcInNpZGUtcmlnaHRcIjpcclxuICAgICAgcmV0dXJuIFJlYWN0LmNyZWF0ZUVsZW1lbnQoU2lkZVBhbmVsUmlnaHQsIHByb3BzKVxyXG4gICAgY2FzZSBcInNpZGUtYm90dG9tXCI6XHJcbiAgICAgIHJldHVybiBSZWFjdC5jcmVhdGVFbGVtZW50KFNpZGVQYW5lbEJvdHRvbSwgcHJvcHMpXHJcbiAgICBjYXNlIFwiY2VudGVyLXRvcFwiOlxyXG4gICAgICByZXR1cm4gUmVhY3QuY3JlYXRlRWxlbWVudChDZW50ZXJQYW5lbFRvcCwgcHJvcHMpXHJcbiAgICBkZWZhdWx0OlxyXG4gICAgICByZXR1cm4gbnVsbFxyXG4gICAgfVxyXG4gIH1cclxuICByZW5kZXIoKSB7XHJcbiAgICByZXR1cm4gdGhpcy5yZW5kZXJQYW5lbChcIiNcIilcclxuICB9XHJcbn1cclxuXHJcbmNvbnN0IHN0eWxlcyA9IHtcclxuICByb290OiB7IGhlaWdodDogXCIxMDAlXCIsIHdpZHRoOiBcIjEwMCVcIiB9LFxyXG59Il19