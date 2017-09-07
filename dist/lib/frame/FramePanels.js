"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CenterPanelTop = exports.SidePanelRight = exports.SidePanelLeft = exports.SidePanelBottom = exports.SidePanelTop = exports.PanelResizer = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _DragAndDrop = require("../ui-modules/DragAndDrop");

var _event = require("../ui-modules/event.utils");

var _application = require("../application");

var _FramePopup = require("./FramePopup");

var _FrameMenu = require("./FrameMenu");

var _FrameMenu2 = _interopRequireDefault(_FrameMenu);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /* eslint-disable react/no-multi-comp */
/* eslint-disable import/no-namespace */
/* eslint-disable react/no-string-refs */


/** ******************************
*** Panel Bar - Button
*********************************/

var PanelButton = function (_Component) {
  _inherits(PanelButton, _Component);

  function PanelButton() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, PanelButton);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = PanelButton.__proto__ || Object.getPrototypeOf(PanelButton)).call.apply(_ref, [this].concat(args))), _this), _this.handleClick = function () {
      var _this$props = _this.props,
          item = _this$props.item,
          panel = _this$props.panel,
          frame = _this$props.frame;

      if (item === panel.current) frame.hideWindow(item.id);else frame.showWindow(item.id);
    }, _this.handleDragWindow = function () {
      return {
        "window": {
          id: _this.props.item.id
        }
      };
    }, _this.handleDragOver = function (e) {
      var _this$props2 = _this.props,
          item = _this$props2.item,
          panel = _this$props2.panel;

      if (e.dataTransfer && e.dataTransfer.types.find(function (x) {
        return x === "window";
      })) {
        return true;
      } else {
        if (panel.current !== item) {
          _this.handleClick();
        }
        return false;
      }
    }, _this.handleClose = function (e) {
      if (e.button === 1) {
        (0, _event.stopEvent)(e);
        var _item = _this.props.item;
        _application.Application.removeWindow(_item.id);
      }
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(PanelButton, [{
    key: "render",
    value: function render() {
      var _props = this.props,
          item = _props.item,
          panel = _props.panel;

      return _react2.default.createElement(
        _DragAndDrop.DragZone,
        {
          className: panel.current === item ? "label current" : "label",
          onDragStart: this.handleDragWindow,
          onDragOver: this.handleDragOver,
          onClick: this.handleClick,
          onMouseDown: this.handleClose
        },
        _react2.default.createElement(
          "div",
          null,
          item.icon && _react2.default.createElement("span", { className: "padding-right fa fa-" + item.icon }),
          item.title
        )
      );
    }
  }]);

  return PanelButton;
}(_react.Component);

/** ******************************
*** Panel Bar
*********************************/

var PanelBar = function (_Component2) {
  _inherits(PanelBar, _Component2);

  function PanelBar() {
    var _ref2;

    var _temp2, _this2, _ret2;

    _classCallCheck(this, PanelBar);

    for (var _len2 = arguments.length, args = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
      args[_key2] = arguments[_key2];
    }

    return _ret2 = (_temp2 = (_this2 = _possibleConstructorReturn(this, (_ref2 = PanelBar.__proto__ || Object.getPrototypeOf(PanelBar)).call.apply(_ref2, [this].concat(args))), _this2), _this2.handleDropWindow = function (data) {
      if (data["window"]) {
        var wnd = _application.Application.layout.getWindowInstance(data.window.id);
        wnd && _application.Application.layout.dockWindow(wnd, _this2.props.panel.id, true);
      }
    }, _temp2), _possibleConstructorReturn(_this2, _ret2);
  }

  _createClass(PanelBar, [{
    key: "shouldComponentUpdate",
    value: function shouldComponentUpdate(nextProps) {
      var curProps = this.props;
      if (curProps.panel !== nextProps.panel) {
        if (curProps.panel.items !== nextProps.panel.items || curProps.panel.current !== nextProps.panel.current) return true;
      }
      return curProps.frame !== nextProps.frame || curProps.vertical !== nextProps.vertical;
    }
  }, {
    key: "renderMenu",
    value: function renderMenu(close) {
      return _react2.default.createElement(_FrameMenu2.default, { close: close });
    }
  }, {
    key: "render",
    value: function render() {
      var _props2 = this.props,
          panel = _props2.panel,
          frame = _props2.frame,
          vertical = _props2.vertical;

      var barClassName = vertical ? "WND_panel_bar V" : "WND_panel_bar H";

      // Bar render
      return _react2.default.createElement(
        _DragAndDrop.DropZone,
        { onDrop: this.handleDropWindow, className: barClassName },
        panel.menu && _react2.default.createElement(_FramePopup.ButtonPopup, {
          className: "menu_btn fa fa-caret-down",
          render: this.renderMenu
        }),
        panel.items.map(function (item, i) {
          return _react2.default.createElement(PanelButton, {
            key: i,
            item: item,
            panel: panel,
            frame: frame
          });
        })
      );
    }
  }]);

  return PanelBar;
}(_react.Component);

/** ******************************
*** Panel Resizer
*********************************/

var PanelResizer = exports.PanelResizer = function (_Component3) {
  _inherits(PanelResizer, _Component3);

  function PanelResizer() {
    var _ref3;

    var _temp3, _this3, _ret3;

    _classCallCheck(this, PanelResizer);

    for (var _len3 = arguments.length, args = Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
      args[_key3] = arguments[_key3];
    }

    return _ret3 = (_temp3 = (_this3 = _possibleConstructorReturn(this, (_ref3 = PanelResizer.__proto__ || Object.getPrototypeOf(PanelResizer)).call.apply(_ref3, [this].concat(args))), _this3), _this3.handleMouseDown = function (e) {
      new _event.HtmlGrabReaction(e.target, e, _this3.handleMouseGrab);
    }, _this3.handleMouseGrab = function (e) {
      _this3.props.onResize(_this3.props.transformDelta(e));
    }, _temp3), _possibleConstructorReturn(_this3, _ret3);
  }

  _createClass(PanelResizer, [{
    key: "render",
    value: function render() {
      var rszClassName = this.props.vertical ? "WND_panel_resizer V" : "WND_panel_resizer H";
      return _react2.default.createElement("div", {
        className: rszClassName,
        onMouseDown: this.handleMouseDown
      });
    }
  }]);

  return PanelResizer;
}(_react.Component);

/** ******************************
*** Side Panel Container
*********************************/

var SidePanelContainer = function (_Component4) {
  _inherits(SidePanelContainer, _Component4);

  function SidePanelContainer() {
    _classCallCheck(this, SidePanelContainer);

    return _possibleConstructorReturn(this, (SidePanelContainer.__proto__ || Object.getPrototypeOf(SidePanelContainer)).apply(this, arguments));
  }

  _createClass(SidePanelContainer, [{
    key: "componentWillMount",
    value: function componentWillMount() {}
  }, {
    key: "shouldComponentUpdate",
    value: function shouldComponentUpdate(nextProps) {
      var curProps = this.props;
      return curProps.current !== nextProps.current || curProps.vertical !== nextProps.vertical || curProps.size !== nextProps.size;
    }
  }, {
    key: "getSize",
    value: function getSize() {
      var container = this.refs.container;
      if (container) {
        return this.props.vertical ? container.width() : container.height();
      }
    }
  }, {
    key: "render",
    value: function render() {
      var _props3 = this.props,
          current = _props3.current,
          vertical = _props3.vertical,
          size = _props3.size;

      var style = _extends({}, current && current.style, {
        width: vertical ? size + "%" : "auto",
        height: vertical ? "auto" : size + "%"
      });

      if (current) {
        return _react2.default.createElement(_application.Application.WindowContainer, {
          ref: "container",
          className: "WND_panel_container_side",
          style: style,
          current: current
        });
      } else {
        return null;
      }
    }
  }]);

  return SidePanelContainer;
}(_react.Component);

/** ******************************
*** Center Panel Container
*********************************/

var CenterPanelContainer = function (_Component5) {
  _inherits(CenterPanelContainer, _Component5);

  function CenterPanelContainer() {
    _classCallCheck(this, CenterPanelContainer);

    return _possibleConstructorReturn(this, (CenterPanelContainer.__proto__ || Object.getPrototypeOf(CenterPanelContainer)).apply(this, arguments));
  }

  _createClass(CenterPanelContainer, [{
    key: "componentWillMount",
    value: function componentWillMount() {}
  }, {
    key: "shouldComponentUpdate",
    value: function shouldComponentUpdate(nextProps) {
      var curProps = this.props;
      return curProps.current !== nextProps.current;
    }
  }, {
    key: "renderBackScreen",
    value: function renderBackScreen() {
      var layout = _application.Application.layout;
      return _react2.default.createElement(
        "div",
        { className: "WND_panel_container_center overflow-auto" },
        layout.splashComponent && _react2.default.createElement(layout.splashComponent, null)
      );
    }
  }, {
    key: "render",
    value: function render() {
      var current = this.props.current;
      if (current) {
        return _react2.default.createElement(_application.Application.WindowContainer, {
          current: current,
          className: "WND_panel_container_center"
        });
      } else {
        return this.renderBackScreen();
      }
    }
  }]);

  return CenterPanelContainer;
}(_react.Component);

/** ******************************
*** Panels
*********************************/

var SidePanel = function (_Component6) {
  _inherits(SidePanel, _Component6);

  function SidePanel() {
    var _ref4;

    var _temp4, _this6, _ret4;

    _classCallCheck(this, SidePanel);

    for (var _len4 = arguments.length, args = Array(_len4), _key4 = 0; _key4 < _len4; _key4++) {
      args[_key4] = arguments[_key4];
    }

    return _ret4 = (_temp4 = (_this6 = _possibleConstructorReturn(this, (_ref4 = SidePanel.__proto__ || Object.getPrototypeOf(SidePanel)).call.apply(_ref4, [this].concat(args))), _this6), _this6.handleResize = function (delta) {
      var csize = _this6.refs.container.getSize();
      if (csize !== undefined) {
        var _size = _this6.props.panel.size;
        _size += Math.max(_size, 1) * delta / Math.max(csize, 1);
        _size = Math.min(Math.max(_size, 0), 100);
        _this6.props.frame.notifyPanelResize(_this6.props.panel, _size);
      }
    }, _temp4), _possibleConstructorReturn(_this6, _ret4);
  }

  _createClass(SidePanel, [{
    key: "shouldComponentUpdate",
    value: function shouldComponentUpdate(nextProps) {
      var curProps = this.props;
      return curProps.panel !== nextProps.panel || curProps.frame !== nextProps.frame || curProps.children !== nextProps.children;
    }
  }]);

  return SidePanel;
}(_react.Component);

var SidePanelTop = exports.SidePanelTop = function (_SidePanel) {
  _inherits(SidePanelTop, _SidePanel);

  function SidePanelTop() {
    _classCallCheck(this, SidePanelTop);

    return _possibleConstructorReturn(this, (SidePanelTop.__proto__ || Object.getPrototypeOf(SidePanelTop)).apply(this, arguments));
  }

  _createClass(SidePanelTop, [{
    key: "transformDelta",
    value: function transformDelta(e) {
      return e.deltaY;
    }
  }, {
    key: "render",
    value: function render() {
      var _props4 = this.props,
          panel = _props4.panel,
          frame = _props4.frame;

      var size = panel.current ? panel.size : 0;
      return _react2.default.createElement(
        "div",
        { className: "WND_side_panel H" },
        _react2.default.createElement(PanelBar, { panel: panel, frame: frame }),
        _react2.default.createElement(SidePanelContainer, { ref: "container", current: panel.current, size: size }),
        _react2.default.createElement(PanelResizer, { onResize: this.handleResize, transformDelta: this.transformDelta }),
        _react2.default.createElement(
          "div",
          { className: "flex-height-100" },
          this.props.children
        )
      );
    }
  }]);

  return SidePanelTop;
}(SidePanel);

var SidePanelBottom = exports.SidePanelBottom = function (_SidePanel2) {
  _inherits(SidePanelBottom, _SidePanel2);

  function SidePanelBottom() {
    _classCallCheck(this, SidePanelBottom);

    return _possibleConstructorReturn(this, (SidePanelBottom.__proto__ || Object.getPrototypeOf(SidePanelBottom)).apply(this, arguments));
  }

  _createClass(SidePanelBottom, [{
    key: "transformDelta",
    value: function transformDelta(e) {
      return -e.deltaY;
    }
  }, {
    key: "render",
    value: function render() {
      var _props5 = this.props,
          panel = _props5.panel,
          frame = _props5.frame;

      var size = panel.current ? panel.size : 0;
      return _react2.default.createElement(
        "div",
        { className: "WND_side_panel H" },
        _react2.default.createElement(
          "div",
          { className: "flex-height-100" },
          this.props.children
        ),
        _react2.default.createElement(PanelResizer, { onResize: this.handleResize, transformDelta: this.transformDelta }),
        _react2.default.createElement(PanelBar, { panel: panel, frame: frame }),
        _react2.default.createElement(SidePanelContainer, { ref: "container", current: panel.current, size: size })
      );
    }
  }]);

  return SidePanelBottom;
}(SidePanel);

var SidePanelLeft = exports.SidePanelLeft = function (_SidePanel3) {
  _inherits(SidePanelLeft, _SidePanel3);

  function SidePanelLeft() {
    _classCallCheck(this, SidePanelLeft);

    return _possibleConstructorReturn(this, (SidePanelLeft.__proto__ || Object.getPrototypeOf(SidePanelLeft)).apply(this, arguments));
  }

  _createClass(SidePanelLeft, [{
    key: "transformDelta",
    value: function transformDelta(e) {
      return e.deltaX;
    }
  }, {
    key: "render",
    value: function render() {
      var _props6 = this.props,
          panel = _props6.panel,
          frame = _props6.frame;

      var size = panel.current ? panel.size : 0;
      return _react2.default.createElement(
        "div",
        { className: "WND_side_panel V" },
        _react2.default.createElement(PanelBar, { vertical: true, panel: panel, frame: frame }),
        _react2.default.createElement(SidePanelContainer, { ref: "container", vertical: true, current: panel.current, size: size }),
        _react2.default.createElement(PanelResizer, { vertical: true, onResize: this.handleResize, transformDelta: this.transformDelta }),
        _react2.default.createElement(
          "div",
          { className: "flex-1" },
          this.props.children
        )
      );
    }
  }]);

  return SidePanelLeft;
}(SidePanel);

var SidePanelRight = exports.SidePanelRight = function (_SidePanel4) {
  _inherits(SidePanelRight, _SidePanel4);

  function SidePanelRight() {
    _classCallCheck(this, SidePanelRight);

    return _possibleConstructorReturn(this, (SidePanelRight.__proto__ || Object.getPrototypeOf(SidePanelRight)).apply(this, arguments));
  }

  _createClass(SidePanelRight, [{
    key: "transformDelta",
    value: function transformDelta(e) {
      return -e.deltaX;
    }
  }, {
    key: "render",
    value: function render() {
      var _props7 = this.props,
          panel = _props7.panel,
          frame = _props7.frame;

      var size = panel.current ? panel.size : 0;
      return _react2.default.createElement(
        "div",
        { className: "WND_side_panel V" },
        _react2.default.createElement(
          "div",
          { className: "flex-width-100" },
          this.props.children
        ),
        _react2.default.createElement(PanelResizer, { vertical: true, onResize: this.handleResize, transformDelta: this.transformDelta }),
        _react2.default.createElement(SidePanelContainer, { ref: "container", vertical: true, current: panel.current, size: size }),
        _react2.default.createElement(PanelBar, { vertical: true, panel: panel, frame: frame })
      );
    }
  }]);

  return SidePanelRight;
}(SidePanel);

var CenterPanelTop = exports.CenterPanelTop = function (_SidePanelTop) {
  _inherits(CenterPanelTop, _SidePanelTop);

  function CenterPanelTop() {
    _classCallCheck(this, CenterPanelTop);

    return _possibleConstructorReturn(this, (CenterPanelTop.__proto__ || Object.getPrototypeOf(CenterPanelTop)).apply(this, arguments));
  }

  _createClass(CenterPanelTop, [{
    key: "render",
    value: function render() {
      var _props8 = this.props,
          panel = _props8.panel,
          frame = _props8.frame;

      return _react2.default.createElement(
        "div",
        { className: "WND_side_panel H" },
        _react2.default.createElement(PanelBar, { panel: panel, frame: frame }),
        _react2.default.createElement(CenterPanelContainer, { ref: "container", current: panel.current })
      );
    }
  }]);

  return CenterPanelTop;
}(SidePanelTop);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9saWIvZnJhbWUvRnJhbWVQYW5lbHMuanMiXSwibmFtZXMiOlsiUGFuZWxCdXR0b24iLCJoYW5kbGVDbGljayIsInByb3BzIiwiaXRlbSIsInBhbmVsIiwiZnJhbWUiLCJjdXJyZW50IiwiaGlkZVdpbmRvdyIsImlkIiwic2hvd1dpbmRvdyIsImhhbmRsZURyYWdXaW5kb3ciLCJoYW5kbGVEcmFnT3ZlciIsImUiLCJkYXRhVHJhbnNmZXIiLCJ0eXBlcyIsImZpbmQiLCJ4IiwiaGFuZGxlQ2xvc2UiLCJidXR0b24iLCJyZW1vdmVXaW5kb3ciLCJpY29uIiwidGl0bGUiLCJQYW5lbEJhciIsImhhbmRsZURyb3BXaW5kb3ciLCJkYXRhIiwid25kIiwibGF5b3V0IiwiZ2V0V2luZG93SW5zdGFuY2UiLCJ3aW5kb3ciLCJkb2NrV2luZG93IiwibmV4dFByb3BzIiwiY3VyUHJvcHMiLCJpdGVtcyIsInZlcnRpY2FsIiwiY2xvc2UiLCJiYXJDbGFzc05hbWUiLCJtZW51IiwicmVuZGVyTWVudSIsIm1hcCIsImkiLCJQYW5lbFJlc2l6ZXIiLCJoYW5kbGVNb3VzZURvd24iLCJ0YXJnZXQiLCJoYW5kbGVNb3VzZUdyYWIiLCJvblJlc2l6ZSIsInRyYW5zZm9ybURlbHRhIiwicnN6Q2xhc3NOYW1lIiwiU2lkZVBhbmVsQ29udGFpbmVyIiwic2l6ZSIsImNvbnRhaW5lciIsInJlZnMiLCJ3aWR0aCIsImhlaWdodCIsInN0eWxlIiwiQ2VudGVyUGFuZWxDb250YWluZXIiLCJzcGxhc2hDb21wb25lbnQiLCJyZW5kZXJCYWNrU2NyZWVuIiwiU2lkZVBhbmVsIiwiaGFuZGxlUmVzaXplIiwiZGVsdGEiLCJjc2l6ZSIsImdldFNpemUiLCJ1bmRlZmluZWQiLCJNYXRoIiwibWF4IiwibWluIiwibm90aWZ5UGFuZWxSZXNpemUiLCJjaGlsZHJlbiIsIlNpZGVQYW5lbFRvcCIsImRlbHRhWSIsIlNpZGVQYW5lbEJvdHRvbSIsIlNpZGVQYW5lbExlZnQiLCJk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V0FBQUEsYzs7Ozs7Ozs7Ozs7NkJBQ0Y7QUFBQSxvQkFDa0IsS0FBS3hFLEtBRHZCO0FBQUEsVUFDQ0UsS0FERCxXQUNDQSxLQUREO0FBQUEsVUFDUUMsS0FEUixXQUNRQSxLQURSOztBQUVQLGFBQVE7QUFBQTtBQUFBLFVBQUssV0FBVSxrQkFBZjtBQUNOLHNDQUFDLFFBQUQsSUFBVSxPQUFPRCxLQUFqQixFQUF3QixPQUFPQyxLQUEvQixHQURNO0FBRU4sc0NBQUMsb0JBQUQsSUFBc0IsS0FBSSxXQUExQixFQUFzQyxTQUFTRCxNQUFNRSxPQUFyRDtBQUZNLE9BQVI7QUFJRDs7OztFQVBpQzhELFkiLCJmaWxlIjoiRnJhbWVQYW5lbHMuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvKiBlc2xpbnQtZGlzYWJsZSByZWFjdC9uby1tdWx0aS1jb21wICovXHJcbi8qIGVzbGludC1kaXNhYmxlIGltcG9ydC9uby1uYW1lc3BhY2UgKi9cclxuLyogZXNsaW50LWRpc2FibGUgcmVhY3Qvbm8tc3RyaW5nLXJlZnMgKi9cclxuaW1wb3J0IFJlYWN0LCB7IENvbXBvbmVudCB9IGZyb20gXCJyZWFjdFwiXHJcblxyXG5pbXBvcnQgeyBEcm9wWm9uZSwgRHJhZ1pvbmUgfSBmcm9tIFwiLi4vdWktbW9kdWxlcy9EcmFnQW5kRHJvcFwiXHJcbmltcG9ydCB7IEh0bWxHcmFiUmVhY3Rpb24sIHN0b3BFdmVudCB9IGZyb20gXCIuLi91aS1tb2R1bGVzL2V2ZW50LnV0aWxzXCJcclxuaW1wb3J0IHsgQXBwbGljYXRpb24gfSBmcm9tIFwiLi4vYXBwbGljYXRpb25cIlxyXG5cclxuaW1wb3J0IHsgQnV0dG9uUG9wdXAgfSBmcm9tIFwiLi9GcmFtZVBvcHVwXCJcclxuaW1wb3J0IEZyYW1lTWVudSBmcm9tIFwiLi9GcmFtZU1lbnVcIlxyXG5cclxuZXhwb3J0IHR5cGUgUGFuZWxQcm9wcyA9IHtcclxuICBpZDogRG9ja0lELFxyXG4gIHNpemU6IG51bWJlcixcclxuICBjdXJyZW50OiBXaW5kb3dJbnN0YW5jZSxcclxuICBpdGVtczogQXJyYXk8V2luZG93SW5zdGFuY2U+LFxyXG59XHJcblxyXG4vKiogKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXHJcbioqKiBQYW5lbCBCYXIgLSBCdXR0b25cclxuKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqL1xyXG5cclxudHlwZSBQYW5lbEJ1dHRvblByb3BzVHlwZSA9IHtcclxuICBwYW5lbDogUGFuZWxQcm9wcyxcclxuICBmcmFtZTogRnJhbWUsXHJcbiAgaXRlbTogV2luZG93SW5zdGFuY2UsXHJcbn1cclxuXHJcbmNsYXNzIFBhbmVsQnV0dG9uIGV4dGVuZHMgQ29tcG9uZW50IHtcclxuICBwcm9wczogUGFuZWxCdXR0b25Qcm9wc1R5cGVcclxuICBoYW5kbGVDbGljayA9ICgpID0+IHtcclxuICAgIGNvbnN0IHsgaXRlbSwgcGFuZWwsIGZyYW1lIH0gPSB0aGlzLnByb3BzXHJcbiAgICBpZiAoaXRlbSA9PT0gcGFuZWwuY3VycmVudCkgZnJhbWUuaGlkZVdpbmRvdyhpdGVtLmlkKVxyXG4gICAgZWxzZSBmcmFtZS5zaG93V2luZG93KGl0ZW0uaWQpXHJcbiAgfVxyXG4gIGhhbmRsZURyYWdXaW5kb3cgPSAoKSA9PiB7XHJcbiAgICByZXR1cm4ge1xyXG4gICAgICBcIndpbmRvd1wiOiB7XHJcbiAgICAgICAgaWQ6IHRoaXMucHJvcHMuaXRlbS5pZCxcclxuICAgICAgfSxcclxuICAgIH1cclxuICB9XHJcbiAgaGFuZGxlRHJhZ092ZXIgPSAoZSkgPT4ge1xyXG4gICAgY29uc3QgeyBpdGVtLCBwYW5lbCB9ID0gdGhpcy5wcm9wc1xyXG4gICAgaWYgKGUuZGF0YVRyYW5zZmVyICYmIGUuZGF0YVRyYW5zZmVyLnR5cGVzLmZpbmQoeCA9PiB4ID09PSBcIndpbmRvd1wiKSkge1xyXG4gICAgICByZXR1cm4gdHJ1ZVxyXG4gICAgfVxyXG4gICAgZWxzZSB7XHJcbiAgICAgIGlmIChwYW5lbC5jdXJyZW50ICE9PSBpdGVtKSB7XHJcbiAgICAgICAgdGhpcy5oYW5kbGVDbGljaygpXHJcbiAgICAgIH1cclxuICAgICAgcmV0dXJuIGZhbHNlXHJcbiAgICB9XHJcbiAgfVxyXG4gIGhhbmRsZUNsb3NlID0gKGUpID0+IHtcclxuICAgIGlmIChlLmJ1dHRvbiA9PT0gMSkge1xyXG4gICAgICBzdG9wRXZlbnQoZSlcclxuICAgICAgY29uc3QgaXRlbSA9IHRoaXMucHJvcHMuaXRlbVxyXG4gICAgICBBcHBsaWNhdGlvbi5yZW1vdmVXaW5kb3coaXRlbS5pZClcclxuICAgIH1cclxuICB9XHJcbiAgcmVuZGVyKCkge1xyXG4gICAgY29uc3QgeyBpdGVtLCBwYW5lbCB9ID0gdGhpcy5wcm9wc1xyXG4gICAgcmV0dXJuIChcclxuICAgICAgPERyYWdab25lXHJcbiAgICAgICAgY2xhc3NOYW1lPXtwYW5lbC5jdXJyZW50ID09PSBpdGVtID8gXCJsYWJlbCBjdXJyZW50XCIgOiBcImxhYmVsXCJ9XHJcbiAgICAgICAgb25EcmFnU3RhcnQ9e3RoaXMuaGFuZGxlRHJhZ1dpbmRvd31cclxuICAgICAgICBvbkRyYWdPdmVyPXt0aGlzLmhhbmRsZURyYWdPdmVyfVxyXG4gICAgICAgIG9uQ2xpY2s9e3RoaXMuaGFuZGxlQ2xpY2t9XHJcbiAgICAgICAgb25Nb3VzZURvd249e3RoaXMuaGFuZGxlQ2xvc2V9XHJcbiAgICAgID5cclxuICAgICAgICA8ZGl2PlxyXG4gICAgICAgICAge2l0ZW0uaWNvbiAmJiA8c3BhbiBjbGFzc05hbWU9e1wicGFkZGluZy1yaWdodCBmYSBmYS1cIiArIGl0ZW0uaWNvbn0gLz59XHJcbiAgICAgICAgICB7aXRlbS50aXRsZX1cclxuICAgICAgICA8L2Rpdj5cclxuICAgICAgPC9EcmFnWm9uZT4pXHJcbiAgfVxyXG59XHJcblxyXG4vKiogKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXHJcbioqKiBQYW5lbCBCYXJcclxuKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqL1xyXG5cclxudHlwZSBQYW5lbEJhclByb3BzVHlwZSA9IHtcclxuICBwYW5lbDogUGFuZWxQcm9wcyxcclxuICBmcmFtZTogRnJhbWUsXHJcbiAgdmVydGljYWw6IGJvb2xlYW4sXHJcbn1cclxuXHJcbmNsYXNzIFBhbmVsQmFyIGV4dGVuZHMgQ29tcG9uZW50IHtcclxuICBwcm9wczogUGFuZWxCYXJQcm9wc1R5cGVcclxuICBzaG91bGRDb21wb25lbnRVcGRhdGUobmV4dFByb3BzKSB7XHJcbiAgICBjb25zdCBjdXJQcm9wcyA9IHRoaXMucHJvcHNcclxuICAgIGlmIChjdXJQcm9wcy5wYW5lbCAhPT0gbmV4dFByb3BzLnBhbmVsKSB7XHJcbiAgICAgIGlmIChjdXJQcm9wcy5wYW5lbC5pdGVtcyAhPT0gbmV4dFByb3BzLnBhbmVsLml0ZW1zXHJcbiAgICAgICAgfHwgY3VyUHJvcHMucGFuZWwuY3VycmVudCAhPT0gbmV4dFByb3BzLnBhbmVsLmN1cnJlbnQpXHJcbiAgICAgICAgcmV0dXJuIHRydWVcclxuICAgIH1cclxuICAgIHJldHVybiBjdXJQcm9wcy5mcmFtZSAhPT0gbmV4dFByb3BzLmZyYW1lXHJcbiAgICAgIHx8IGN1clByb3BzLnZlcnRpY2FsICE9PSBuZXh0UHJvcHMudmVydGljYWxcclxuICB9XHJcbiAgaGFuZGxlRHJvcFdpbmRvdyA9IChkYXRhKSA9PiB7XHJcbiAgICBpZiAoZGF0YVtcIndpbmRvd1wiXSkge1xyXG4gICAgICBjb25zdCB3bmQgPSBBcHBsaWNhdGlvbi5sYXlvdXQuZ2V0V2luZG93SW5zdGFuY2UoZGF0YS53aW5kb3cuaWQpXHJcbiAgICAgIHduZCAmJiBBcHBsaWNhdGlvbi5sYXlvdXQuZG9ja1dpbmRvdyh3bmQsIHRoaXMucHJvcHMucGFuZWwuaWQsIHRydWUpXHJcbiAgICB9XHJcbiAgfVxyXG4gIHJlbmRlck1lbnUoY2xvc2UpIHtcclxuICAgIHJldHVybiAoPEZyYW1lTWVudSBjbG9zZT17Y2xvc2V9IC8+KVxyXG4gIH1cclxuICByZW5kZXIoKSB7XHJcbiAgICBjb25zdCB7IHBhbmVsLCBmcmFtZSwgdmVydGljYWwgfSA9IHRoaXMucHJvcHNcclxuICAgIGNvbnN0IGJhckNsYXNzTmFtZSA9IHZlcnRpY2FsID8gXCJXTkRfcGFuZWxfYmFyIFZcIiA6IFwiV05EX3BhbmVsX2JhciBIXCJcclxuXHJcbiAgICAvLyBCYXIgcmVuZGVyXHJcbiAgICByZXR1cm4gKDxEcm9wWm9uZSBvbkRyb3A9e3RoaXMuaGFuZGxlRHJvcFdpbmRvd30gY2xhc3NOYW1lPXtiYXJDbGFzc05hbWV9PlxyXG4gICAgICB7cGFuZWwubWVudSAmJiAoPEJ1dHRvblBvcHVwXHJcbiAgICAgICAgY2xhc3NOYW1lPVwibWVudV9idG4gZmEgZmEtY2FyZXQtZG93blwiXHJcbiAgICAgICAgcmVuZGVyPXt0aGlzLnJlbmRlck1lbnV9XHJcbiAgICAgIC8+KX1cclxuICAgICAge3BhbmVsLml0ZW1zLm1hcCgoaXRlbSwgaSkgPT4ge1xyXG4gICAgICAgIHJldHVybiAoPFBhbmVsQnV0dG9uXHJcbiAgICAgICAgICBrZXk9e2l9XHJcbiAgICAgICAgICBpdGVtPXtpdGVtfVxyXG4gICAgICAgICAgcGFuZWw9e3BhbmVsfVxyXG4gICAgICAgICAgZnJhbWU9e2ZyYW1lfVxyXG4gICAgICAgIC8+KVxyXG4gICAgICB9KX1cclxuICAgIDwvRHJvcFpvbmU+KVxyXG4gIH1cclxufVxyXG5cclxuLyoqICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxyXG4qKiogUGFuZWwgUmVzaXplclxyXG4qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiovXHJcblxyXG5leHBvcnQgdHlwZSBQYW5lbFJlc2l6ZXJQcm9wc1R5cGUgPSB7XHJcbiAgdmVydGljYWw6IGJvb2xlYW4sXHJcbiAgdHJhbnNmb3JtRGVsdGE6IEZ1bmN0aW9uLFxyXG4gIG9uUmVzaXplOiBGdW5jdGlvbixcclxufVxyXG5cclxuZXhwb3J0IGNsYXNzIFBhbmVsUmVzaXplciBleHRlbmRzIENvbXBvbmVudCB7XHJcbiAgcHJvcHM6IFBhbmVsUmVzaXplclByb3BzVHlwZVxyXG4gIGhhbmRsZU1vdXNlRG93biA9IChlKSA9PiB7XHJcbiAgICBuZXcgSHRtbEdyYWJSZWFjdGlvbihlLnRhcmdldCwgZSwgdGhpcy5oYW5kbGVNb3VzZUdyYWIpXHJcbiAgfVxyXG4gIGhhbmRsZU1vdXNlR3JhYiA9IChlKSA9PiB7XHJcbiAgICB0aGlzLnByb3BzLm9uUmVzaXplKHRoaXMucHJvcHMudHJhbnNmb3JtRGVsdGEoZSkpXHJcbiAgfVxyXG4gIHJlbmRlcigpIHtcclxuICAgIGNvbnN0IHJzekNsYXNzTmFtZSA9IHRoaXMucHJvcHMudmVydGljYWxcclxuICAgICAgPyBcIldORF9wYW5lbF9yZXNpemVyIFZcIlxyXG4gICAgICA6IFwiV05EX3BhbmVsX3Jlc2l6ZXIgSFwiXHJcbiAgICByZXR1cm4gKDxkaXZcclxuICAgICAgY2xhc3NOYW1lPXtyc3pDbGFzc05hbWV9XHJcbiAgICAgIG9uTW91c2VEb3duPXt0aGlzLmhhbmRsZU1vdXNlRG93bn1cclxuICAgIC8+KVxyXG4gIH1cclxufVxyXG5cclxuLyoqICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxyXG4qKiogU2lkZSBQYW5lbCBDb250YWluZXJcclxuKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqL1xyXG5cclxudHlwZSBTaWRlUGFuZWxDb250YWluZXJQcm9wc1R5cGUgPSB7XHJcbiAgY3VycmVudDogV2luZG93SW5zdGFuY2UsXHJcbiAgdmVydGljYWw6IGJvb2xlYW4sXHJcbiAgc2l6ZTogbnVtYmVyLFxyXG59XHJcblxyXG5jbGFzcyBTaWRlUGFuZWxDb250YWluZXIgZXh0ZW5kcyBDb21wb25lbnQge1xyXG4gIHByb3BzOiBTaWRlUGFuZWxDb250YWluZXJQcm9wc1R5cGVcclxuICBjb21wb25lbnRXaWxsTW91bnQoKSB7XHJcbiAgfVxyXG4gIHNob3VsZENvbXBvbmVudFVwZGF0ZShuZXh0UHJvcHMpIHtcclxuICAgIGNvbnN0IGN1clByb3BzID0gdGhpcy5wcm9wc1xyXG4gICAgcmV0dXJuIGN1clByb3BzLmN1cnJlbnQgIT09IG5leHRQcm9wcy5jdXJyZW50XHJcbiAgICAgIHx8IGN1clByb3BzLnZlcnRpY2FsICE9PSBuZXh0UHJvcHMudmVydGljYWxcclxuICAgICAgfHwgY3VyUHJvcHMuc2l6ZSAhPT0gbmV4dFByb3BzLnNpemVcclxuICB9XHJcbiAgZ2V0U2l6ZSgpIHtcclxuICAgIGNvbnN0IGNvbnRhaW5lciA9IHRoaXMucmVmcy5jb250YWluZXJcclxuICAgIGlmIChjb250YWluZXIpIHtcclxuICAgICAgcmV0dXJuIHRoaXMucHJvcHMudmVydGljYWwgPyBjb250YWluZXIud2lkdGgoKSA6IGNvbnRhaW5lci5oZWlnaHQoKVxyXG4gICAgfVxyXG4gIH1cclxuICByZW5kZXIoKSB7XHJcbiAgICBjb25zdCB7IGN1cnJlbnQsIHZlcnRpY2FsLCBzaXplIH0gPSB0aGlzLnByb3BzXHJcbiAgICBjb25zdCBzdHlsZSA9IHtcclxuICAgICAgLi4uY3VycmVudCAmJiBjdXJyZW50LnN0eWxlLFxyXG4gICAgICB3aWR0aDogdmVydGljYWwgPyAoc2l6ZSArIFwiJVwiKSA6IFwiYXV0b1wiLFxyXG4gICAgICBoZWlnaHQ6IHZlcnRpY2FsID8gXCJhdXRvXCIgOiAoc2l6ZSArIFwiJVwiKSxcclxuICAgIH1cclxuXHJcbiAgICBpZiAoY3VycmVudCkge1xyXG4gICAgICByZXR1cm4gKDxBcHBsaWNhdGlvbi5XaW5kb3dDb250YWluZXJcclxuICAgICAgICByZWY9XCJjb250YWluZXJcIlxyXG4gICAgICAgIGNsYXNzTmFtZT1cIldORF9wYW5lbF9jb250YWluZXJfc2lkZVwiXHJcbiAgICAgICAgc3R5bGU9e3N0eWxlfVxyXG4gICAgICAgIGN1cnJlbnQ9e2N1cnJlbnR9XHJcbiAgICAgIC8+KVxyXG4gICAgfVxyXG4gICAgZWxzZSB7XHJcbiAgICAgIHJldHVybiBudWxsXHJcbiAgICB9XHJcbiAgfVxyXG59XHJcblxyXG4vKiogKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXHJcbioqKiBDZW50ZXIgUGFuZWwgQ29udGFpbmVyXHJcbioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKi9cclxuXHJcbnR5cGUgQ2VudGVyUGFuZWxDb250YWluZXJQcm9wc1R5cGUgPSB7XHJcbiAgY3VycmVudDogV2luZG93SW5zdGFuY2UsXHJcbn1cclxuXHJcbmNsYXNzIENlbnRlclBhbmVsQ29udGFpbmVyIGV4dGVuZHMgQ29tcG9uZW50IHtcclxuICBwcm9wczogQ2VudGVyUGFuZWxDb250YWluZXJQcm9wc1R5cGVcclxuICBjb21wb25lbnRXaWxsTW91bnQoKSB7XHJcbiAgfVxyXG4gIHNob3VsZENvbXBvbmVudFVwZGF0ZShuZXh0UHJvcHMpIHtcclxuICAgIGNvbnN0IGN1clByb3BzID0gdGhpcy5wcm9wc1xyXG4gICAgcmV0dXJuIGN1clByb3BzLmN1cnJlbnQgIT09IG5leHRQcm9wcy5jdXJyZW50XHJcbiAgfVxyXG4gIHJlbmRlckJhY2tTY3JlZW4oKSB7XHJcbiAgICBjb25zdCBsYXlvdXQgPSBBcHBsaWNhdGlvbi5sYXlvdXRcclxuICAgIHJldHVybiAoPGRpdiBjbGFzc05hbWU9XCJXTkRfcGFuZWxfY29udGFpbmVyX2NlbnRlciBvdmVyZmxvdy1hdXRvXCI+XHJcbiAgICAgIHtsYXlvdXQuc3BsYXNoQ29tcG9uZW50ICYmIDxsYXlvdXQuc3BsYXNoQ29tcG9uZW50IC8+fVxyXG4gICAgPC9kaXY+KVxyXG4gIH1cclxuICByZW5kZXIoKSB7XHJcbiAgICBjb25zdCBjdXJyZW50ID0gdGhpcy5wcm9wcy5jdXJyZW50XHJcbiAgICBpZiAoY3VycmVudCkge1xyXG4gICAgICByZXR1cm4gKDxBcHBsaWNhdGlvbi5XaW5kb3dDb250YWluZXJcclxuICAgICAgICBjdXJyZW50PXtjdXJyZW50fVxyXG4gICAgICAgIGNsYXNzTmFtZT1cIldORF9wYW5lbF9jb250YWluZXJfY2VudGVyXCJcclxuICAgICAgLz4pXHJcbiAgICB9XHJcbiAgICBlbHNlIHtcclxuICAgICAgcmV0dXJuIHRoaXMucmVuZGVyQmFja1NjcmVlbigpXHJcbiAgICB9XHJcbiAgfVxyXG59XHJcblxyXG4vKiogKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXHJcbioqKiBQYW5lbHNcclxuKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqL1xyXG5cclxudHlwZSBQcm9wc1R5cGUgPSB7XHJcbiAgcGFuZWw6IFBhbmVsUHJvcHMsXHJcbiAgZnJhbWU6IEZyYW1lLFxyXG4gIGNoaWxkcmVuOiBhbnksXHJcbn1cclxuXHJcbmNsYXNzIFNpZGVQYW5lbCBleHRlbmRzIENvbXBvbmVudCB7XHJcbiAgcHJvcHM6IFByb3BzVHlwZVxyXG4gIHNob3VsZENvbXBvbmVudFVwZGF0ZShuZXh0UHJvcHMpIHtcclxuICAgIGNvbnN0IGN1clByb3BzID0gdGhpcy5wcm9wc1xyXG4gICAgcmV0dXJuIGN1clByb3BzLnBhbmVsICE9PSBuZXh0UHJvcHMucGFuZWxcclxuICAgICAgfHwgY3VyUHJvcHMuZnJhbWUgIT09IG5leHRQcm9wcy5mcmFtZVxyXG4gICAgICB8fCBjdXJQcm9wcy5jaGlsZHJlbiAhPT0gbmV4dFByb3BzLmNoaWxkcmVuXHJcbiAgfVxyXG4gIGhhbmRsZVJlc2l6ZSA9IChkZWx0YSkgPT4ge1xyXG4gICAgY29uc3QgY3NpemUgPSB0aGlzLnJlZnMuY29udGFpbmVyLmdldFNpemUoKVxyXG4gICAgaWYgKGNzaXplICE9PSB1bmRlZmluZWQpIHtcclxuICAgICAgbGV0IHNpemUgPSB0aGlzLnByb3BzLnBhbmVsLnNpemVcclxuICAgICAgc2l6ZSArPSBNYXRoLm1heChzaXplLCAxKSAqIGRlbHRhIC8gTWF0aC5tYXgoY3NpemUsIDEpXHJcbiAgICAgIHNpemUgPSBNYXRoLm1pbihNYXRoLm1heChzaXplLCAwKSwgMTAwKVxyXG4gICAgICB0aGlzLnByb3BzLmZyYW1lLm5vdGlmeVBhbmVsUmVzaXplKHRoaXMucHJvcHMucGFuZWwsIHNpemUpXHJcbiAgICB9XHJcbiAgfVxyXG59XHJcblxyXG5leHBvcnQgY2xhc3MgU2lkZVBhbmVsVG9wIGV4dGVuZHMgU2lkZVBhbmVsIHtcclxuICB0cmFuc2Zvcm1EZWx0YShlKSB7XHJcbiAgICByZXR1cm4gZS5kZWx0YVlcclxuICB9XHJcbiAgcmVuZGVyKCkge1xyXG4gICAgY29uc3QgeyBwYW5lbCwgZnJhbWUgfSA9IHRoaXMucHJvcHNcclxuICAgIGNvbnN0IHNpemUgPSBwYW5lbC5jdXJyZW50ID8gcGFuZWwuc2l6ZSA6IDBcclxuICAgIHJldHVybiAoPGRpdiBjbGFzc05hbWU9XCJXTkRfc2lkZV9wYW5lbCBIXCI+XHJcbiAgICAgIDxQYW5lbEJhciBwYW5lbD17cGFuZWx9IGZyYW1lPXtmcmFtZX0gLz5cclxuICAgICAgPFNpZGVQYW5lbENvbnRhaW5lciByZWY9XCJjb250YWluZXJcIiBjdXJyZW50PXtwYW5lbC5jdXJyZW50fSBzaXplPXtzaXplfSAvPlxyXG4gICAgICA8UGFuZWxSZXNpemVyIG9uUmVzaXplPXt0aGlzLmhhbmRsZVJlc2l6ZX0gdHJhbnNmb3JtRGVsdGE9e3RoaXMudHJhbnNmb3JtRGVsdGF9IC8+XHJcbiAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmxleC1oZWlnaHQtMTAwXCI+e3RoaXMucHJvcHMuY2hpbGRyZW59PC9kaXY+XHJcbiAgICA8L2Rpdj4pXHJcbiAgfVxyXG59XHJcblxyXG5leHBvcnQgY2xhc3MgU2lkZVBhbmVsQm90dG9tIGV4dGVuZHMgU2lkZVBhbmVsIHtcclxuICB0cmFuc2Zvcm1EZWx0YShlKSB7XHJcbiAgICByZXR1cm4gLWUuZGVsdGFZXHJcbiAgfVxyXG4gIHJlbmRlcigpIHtcclxuICAgIGNvbnN0IHsgcGFuZWwsIGZyYW1lIH0gPSB0aGlzLnByb3BzXHJcbiAgICBjb25zdCBzaXplID0gcGFuZWwuY3VycmVudCA/IHBhbmVsLnNpemUgOiAwXHJcbiAgICByZXR1cm4gKDxkaXYgY2xhc3NOYW1lPVwiV05EX3NpZGVfcGFuZWwgSFwiPlxyXG4gICAgICA8ZGl2IGNsYXNzTmFtZT1cImZsZXgtaGVpZ2h0LTEwMFwiPnt0aGlzLnByb3BzLmNoaWxkcmVufTwvZGl2PlxyXG4gICAgICA8UGFuZWxSZXNpemVyIG9uUmVzaXplPXt0aGlzLmhhbmRsZVJlc2l6ZX0gdHJhbnNmb3JtRGVsdGE9e3RoaXMudHJhbnNmb3JtRGVsdGF9IC8+XHJcbiAgICAgIDxQYW5lbEJhciBwYW5lbD17cGFuZWx9IGZyYW1lPXtmcmFtZX0gLz5cclxuICAgICAgPFNpZGVQYW5lbENvbnRhaW5lciByZWY9XCJjb250YWluZXJcIiBjdXJyZW50PXtwYW5lbC5jdXJyZW50fSBzaXplPXtzaXplfSAvPlxyXG4gICAgPC9kaXY+KVxyXG4gIH1cclxufVxyXG5cclxuZXhwb3J0IGNsYXNzIFNpZGVQYW5lbExlZnQgZXh0ZW5kcyBTaWRlUGFuZWwge1xyXG4gIHRyYW5zZm9ybURlbHRhKGUpIHtcclxuICAgIHJldHVybiBlLmRlbHRhWFxyXG4gIH1cclxuICByZW5kZXIoKSB7XHJcbiAgICBjb25zdCB7IHBhbmVsLCBmcmFtZSB9ID0gdGhpcy5wcm9wc1xyXG4gICAgY29uc3Qgc2l6ZSA9IHBhbmVsLmN1cnJlbnQgPyBwYW5lbC5zaXplIDogMFxyXG4gICAgcmV0dXJuICg8ZGl2IGNsYXNzTmFtZT1cIldORF9zaWRlX3BhbmVsIFZcIj5cclxuICAgICAgPFBhbmVsQmFyIHZlcnRpY2FsIHBhbmVsPXtwYW5lbH0gZnJhbWU9e2ZyYW1lfSAvPlxyXG4gICAgICA8U2lkZVBhbmVsQ29udGFpbmVyIHJlZj1cImNvbnRhaW5lclwiIHZlcnRpY2FsIGN1cnJlbnQ9e3BhbmVsLmN1cnJlbnR9IHNpemU9e3NpemV9IC8+XHJcbiAgICAgIDxQYW5lbFJlc2l6ZXIgdmVydGljYWwgb25SZXNpemU9e3RoaXMuaGFuZGxlUmVzaXplfSB0cmFuc2Zvcm1EZWx0YT17dGhpcy50cmFuc2Zvcm1EZWx0YX0gLz5cclxuICAgICAgPGRpdiBjbGFzc05hbWU9XCJmbGV4LTFcIj57dGhpcy5wcm9wcy5jaGlsZHJlbn08L2Rpdj5cclxuICAgIDwvZGl2PilcclxuICB9XHJcbn1cclxuXHJcbmV4cG9ydCBjbGFzcyBTaWRlUGFuZWxSaWdodCBleHRlbmRzIFNpZGVQYW5lbCB7XHJcbiAgdHJhbnNmb3JtRGVsdGEoZSkge1xyXG4gICAgcmV0dXJuIC1lLmRlbHRhWFxyXG4gIH1cclxuICByZW5kZXIoKSB7XHJcbiAgICBjb25zdCB7IHBhbmVsLCBmcmFtZSB9ID0gdGhpcy5wcm9wc1xyXG4gICAgY29uc3Qgc2l6ZSA9IHBhbmVsLmN1cnJlbnQgPyBwYW5lbC5zaXplIDogMFxyXG4gICAgcmV0dXJuICg8ZGl2IGNsYXNzTmFtZT1cIldORF9zaWRlX3BhbmVsIFZcIj5cclxuICAgICAgPGRpdiBjbGFzc05hbWU9XCJmbGV4LXdpZHRoLTEwMFwiPnt0aGlzLnByb3BzLmNoaWxkcmVufTwvZGl2PlxyXG4gICAgICA8UGFuZWxSZXNpemVyIHZlcnRpY2FsIG9uUmVzaXplPXt0aGlzLmhhbmRsZVJlc2l6ZX0gdHJhbnNmb3JtRGVsdGE9e3RoaXMudHJhbnNmb3JtRGVsdGF9IC8+XHJcbiAgICAgIDxTaWRlUGFuZWxDb250YWluZXIgcmVmPVwiY29udGFpbmVyXCIgdmVydGljYWwgY3VycmVudD17cGFuZWwuY3VycmVudH0gc2l6ZT17c2l6ZX0gLz5cclxuICAgICAgPFBhbmVsQmFyIHZlcnRpY2FsIHBhbmVsPXtwYW5lbH0gZnJhbWU9e2ZyYW1lfSAvPlxyXG4gICAgPC9kaXY+KVxyXG4gIH1cclxufVxyXG5cclxuZXhwb3J0IGNsYXNzIENlbnRlclBhbmVsVG9wIGV4dGVuZHMgU2lkZVBhbmVsVG9wIHtcclxuICByZW5kZXIoKSB7XHJcbiAgICBjb25zdCB7IHBhbmVsLCBmcmFtZSB9ID0gdGhpcy5wcm9wc1xyXG4gICAgcmV0dXJuICg8ZGl2IGNsYXNzTmFtZT1cIldORF9zaWRlX3BhbmVsIEhcIj5cclxuICAgICAgPFBhbmVsQmFyIHBhbmVsPXtwYW5lbH0gZnJhbWU9e2ZyYW1lfSAvPlxyXG4gICAgICA8Q2VudGVyUGFuZWxDb250YWluZXIgcmVmPVwiY29udGFpbmVyXCIgY3VycmVudD17cGFuZWwuY3VycmVudH0gLz5cclxuICAgIDwvZGl2PilcclxuICB9XHJcbn1cclxuIl19