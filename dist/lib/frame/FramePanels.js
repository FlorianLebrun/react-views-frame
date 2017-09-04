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
*********************************
*** Panel Bar
*********************************
*********************************/

var CSS_panel_bar_horizontal = {
  bar: "WND_panel_bar WND_panel_bar_H",
  menu_btn: "WND_panel_menu_btn WND_panel_menu_btn_H WND_center_vertical",
  item_button: "WND_panel_button WND_panel_button_H",
  item_button_CURRENT: "WND_panel_button WND_panel_button_H WND_panel_button-current",
  item_button_transform: "rotate(0deg)"
};

var CSS_panel_bar_vertical = {
  bar: "WND_panel_bar WND_panel_bar_V",
  menu_btn: "WND_panel_menu_btn WND_panel_menu_btn_V WND_center_horizontal",
  item_button: "WND_panel_button WND_panel_button_V",
  item_button_CURRENT: "WND_panel_button WND_panel_button_V WND_panel_button-current",
  item_button_transform: "rotate(-90deg)"
};

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
          panel = _props.panel,
          css = _props.css;

      return _react2.default.createElement(
        _DragAndDrop.DragZone,
        {
          className: panel.current === item ? css.item_button_CURRENT : css.item_button,
          onDragStart: this.handleDragWindow,
          onDragOver: this.handleDragOver,
          onClick: this.handleClick,
          onMouseDown: this.handleClose
        },
        _react2.default.createElement(
          "div",
          { style: { transform: css.item_button_transform } },
          item.icon && _react2.default.createElement("span", { className: "padding-right fa fa-" + item.icon }),
          item.title
        )
      );
    }
  }]);

  return PanelButton;
}(_react.Component);

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

      var css = vertical ? CSS_panel_bar_vertical : CSS_panel_bar_horizontal;

      // Bar render
      return _react2.default.createElement(
        _DragAndDrop.DropZone,
        { onDrop: this.handleDropWindow, className: css.bar },
        panel.menu && _react2.default.createElement(_FramePopup.ButtonPopup, { className: css.menu_btn + " fa fa-caret-down", render: this.renderMenu }),
        panel.items.map(function (item, i) {
          return _react2.default.createElement(PanelButton, { key: i, css: css, item: item, panel: panel, frame: frame });
        })
      );
    }
  }]);

  return PanelBar;
}(_react.Component);

/** ******************************
*********************************
*** Panel Resizer
*********************************
*********************************/

var CSS_panel_resizer_vertical = "WND_panel_resizer WND_panel_resizer_V";
var CSS_panel_resizer_horizontal = "WND_panel_resizer WND_panel_resizer_H";

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
      return _react2.default.createElement("div", {
        className: this.props.vertical ? CSS_panel_resizer_vertical : CSS_panel_resizer_horizontal,
        onMouseDown: this.handleMouseDown
      });
    }
  }]);

  return PanelResizer;
}(_react.Component);

/** ******************************
*********************************
*** Panel Container
*********************************
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
*********************************
*** Panels
*********************************
*********************************/

var CSS_side_panel_vertical = "WND_side_panel WND_side_panel_V";
var CSS_side_panel_horizontal = "WND_side_panel WND_side_panel_H";

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
        { className: CSS_side_panel_horizontal },
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
        { className: CSS_side_panel_horizontal },
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
        { className: CSS_side_panel_vertical },
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
        { className: CSS_side_panel_vertical },
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
        { className: CSS_side_panel_horizontal },
        _react2.default.createElement(PanelBar, { panel: panel, frame: frame }),
        _react2.default.createElement(CenterPanelContainer, { ref: "container", current: panel.current })
      );
    }
  }]);

  return CenterPanelTop;
}(SidePanelTop);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9BcHBsaWNhdGlvbi9mcmFtZS9GcmFtZVBhbmVscy5qcyJdLCJuYW1lcyI6WyJDU1NfcGFuZWxfYmFyX2hvcml6b250YWwiLCJiYXIiLCJtZW51X2J0biIsIml0ZW1fYnV0dG9uIiwiaXRlbV9idXR0b25fQ1VSUkVOVCIsIml0ZW1fYnV0dG9uX3RyYW5zZm9ybSIsIkNTU19wYW5lbF9iYXJfdmVydGljYWwiLCJQYW5lbEJ1dHRvbiIsImhhbmRsZUNsaWNrIiwicHJvcHMiLCJpdGVtIiwicGFuZWwiLCJmcmFtZSIsImN1cnJlbnQiLCJoaWRlV2luZG93IiwiaWQiLCJzaG93V2luZG93IiwiaGFuZGxlRHJhZ1dpbmRvdyIsImhhbmRsZURyYWdPdmVyIiwiZSIsImRhdGFUcmFuc2ZlciIsInR5cGVzIiwiZmluZCIsIngiLCJoYW5kbGVDbG9zZSIsImJ1dHRvbiIsInJlbW92ZVdpbmRvdyIsImNzcyIsInRyYW5zZm9ybSIsImljb24iLCJ0aXRsZSIsIlBhbmVsQmFyIiwiaGFuZGxlRHJvcFdpbmRvdyIsImRhdGEiLCJ3bmQiLCJsYXlvdXQiLCJnZXRXaW5kb3dJbnN0YW5jZSIsIndpbmRvdyIsImRvY2tXaW5kb3ciLCJuZXh0UHJvcHMiLCJjdXJQcm9wcyIsIml0ZW1zIiwidmVydGljYWwiLCJjbG9zZSIsIm1lbnUiLCJyZW5kZXJNZW51IiwibWFwIiwiaSIsIkNTU19wYW5lbF9yZXNpemVyX3ZlcnRpY2FsIiwiQ1NTX3BhbmVsX3Jlc2l6ZXJfaG9yaXpvbnRhbCIsIlBhbmVsUmVzaXplciIsImhhbmRsZU1vdXNlRG93biIsInRhcmdldCIsImhhbmRsZU1vdXNlR3JhYiIsIm9uUmVzaXplIiwidHJhbnNmb3JtRGVsdGEiLCJTaWRlUGFuZWxDb250YWluZXIiLCJzaXplIiwiY29udGFpbmVyIiwicmVmcyIsIndpZHRoIiwiaGVpZ2h0Iiwic3R5bGUiLCJDZW50ZXJQYW5lbENvbnRhaW5lciIsInNwbGFzaENvbXBvbmVudCIsInJlbmRlckJhY2tTY3JlZW4iLCJDU1Nfc2lkZV9wYW5lbF92ZXJ0aWNhbCIsIkNTU19zaWRlX3BhbmVsX2hvcml6b250YWwiLCJTaWRlUGFuZWwiLCJoYW5kbGVSZXNpemUiLCJkZWx0YSIsImNzaXplIiwiZ2V0U2l6ZSIsInVuZGVmaW5lZCIsIk1hdGgiLCJtYXgiLCJtaW4iLCJub3RpZnlQYW5lbFJlc2l6ZSIsImNoaWxkcmVuIiwiU2lkZVBhbmVsVG9wIiwiZGVsdGFZIiwiU2lkZVBhbmVsQm90dG9tIiwiU2lkZVBhbmVsTGVmdCIsImRlbHRhWCIsIlNpZGVQYW5lbFJpZ2h0IiwiQ2VudGVyUGFuZWxUb3AiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7O0FBR0E7Ozs7QUFFQTs7QUFDQTs7QUFDQTs7QUFFQTs7QUFDQTs7Ozs7Ozs7OzsrZUFWQTtBQUNBO0FBQ0E7OztBQWlCQTs7Ozs7O0FBTUEsSUFBTUEsMkJBQTJCO0FBQy9CQyxPQUFLLCtCQUQwQjtBQUUvQkMsWUFBVSw2REFGcUI7QUFHL0JDLGVBQWEscUNBSGtCO0FBSS9CQyx1QkFBcUIsOERBSlU7QUFLL0JDLHlCQUF1QjtBQUxRLENBQWpDOztBQVFBLElBQU1DLHlCQUF5QjtBQUM3QkwsT0FBSywrQkFEd0I7QUFFN0JDLFlBQVUsK0RBRm1CO0FBRzdCQyxlQUFhLHFDQUhnQjtBQUk3QkMsdUJBQXFCLDhEQUpRO0FBSzdCQyx5QkFBdUI7QUFMTSxDQUEvQjs7SUFlTUUsVzs7Ozs7Ozs7Ozs7Ozs7Z01BRUpDLFcsR0FBYyxZQUFNO0FBQUEsd0JBQ2EsTUFBS0MsS0FEbEI7QUFBQSxVQUNWQyxJQURVLGVBQ1ZBLElBRFU7QUFBQSxVQUNKQyxLQURJLGVBQ0pBLEtBREk7QUFBQSxVQUNHQyxLQURILGVBQ0dBLEtBREg7O0FBRWxCLFVBQUlGLFNBQVNDLE1BQU1FLE9BQW5CLEVBQTRCRCxNQUFNRSxVQUFOLENBQWlCSixLQUFLSyxFQUF0QixFQUE1QixLQUNLSCxNQUFNSSxVQUFOLENBQWlCTixLQUFLSyxFQUF0QjtBQUNOLEssUUFDREUsZ0IsR0FBbUIsWUFB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bEMsR0FETTtBQUVOLHNDQUFDLG9CQUFELElBQXNCLEtBQU0sV0FBNUIsRUFBMEMsU0FBVUQsTUFBTUUsT0FBMUQ7QUFGTSxPQUFSO0FBSUQ7Ozs7RUFQaUNrRSxZIiwiZmlsZSI6IkZyYW1lUGFuZWxzLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLyogZXNsaW50LWRpc2FibGUgcmVhY3Qvbm8tbXVsdGktY29tcCAqL1xyXG4vKiBlc2xpbnQtZGlzYWJsZSBpbXBvcnQvbm8tbmFtZXNwYWNlICovXHJcbi8qIGVzbGludC1kaXNhYmxlIHJlYWN0L25vLXN0cmluZy1yZWZzICovXHJcbmltcG9ydCBSZWFjdCwgeyBDb21wb25lbnQgfSBmcm9tIFwicmVhY3RcIlxyXG5cclxuaW1wb3J0IHsgRHJvcFpvbmUsIERyYWdab25lIH0gZnJvbSBcIi4uL3VpLW1vZHVsZXMvRHJhZ0FuZERyb3BcIlxyXG5pbXBvcnQgeyBIdG1sR3JhYlJlYWN0aW9uLCBzdG9wRXZlbnQgfSBmcm9tIFwiLi4vdWktbW9kdWxlcy9ldmVudC51dGlsc1wiXHJcbmltcG9ydCB7IEFwcGxpY2F0aW9uIH0gZnJvbSBcIi4uL2FwcGxpY2F0aW9uXCJcclxuXHJcbmltcG9ydCB7IEJ1dHRvblBvcHVwIH0gZnJvbSBcIi4vRnJhbWVQb3B1cFwiXHJcbmltcG9ydCBGcmFtZU1lbnUgZnJvbSBcIi4vRnJhbWVNZW51XCJcclxuXHJcbmV4cG9ydCB0eXBlIFBhbmVsUHJvcHMgPSB7XHJcbiAgaWQ6IERvY2tJRCxcclxuICBzaXplOiBudW1iZXIsXHJcbiAgY3VycmVudDogV2luZG93SW5zdGFuY2UsXHJcbiAgaXRlbXM6IEFycmF5PFdpbmRvd0luc3RhbmNlPixcclxufVxyXG5cclxuLyoqICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxyXG4qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcclxuKioqIFBhbmVsIEJhclxyXG4qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcclxuKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqL1xyXG5cclxuY29uc3QgQ1NTX3BhbmVsX2Jhcl9ob3Jpem9udGFsID0ge1xyXG4gIGJhcjogXCJXTkRfcGFuZWxfYmFyIFdORF9wYW5lbF9iYXJfSFwiLFxyXG4gIG1lbnVfYnRuOiBcIldORF9wYW5lbF9tZW51X2J0biBXTkRfcGFuZWxfbWVudV9idG5fSCBXTkRfY2VudGVyX3ZlcnRpY2FsXCIsXHJcbiAgaXRlbV9idXR0b246IFwiV05EX3BhbmVsX2J1dHRvbiBXTkRfcGFuZWxfYnV0dG9uX0hcIixcclxuICBpdGVtX2J1dHRvbl9DVVJSRU5UOiBcIldORF9wYW5lbF9idXR0b24gV05EX3BhbmVsX2J1dHRvbl9IIFdORF9wYW5lbF9idXR0b24tY3VycmVudFwiLFxyXG4gIGl0ZW1fYnV0dG9uX3RyYW5zZm9ybTogXCJyb3RhdGUoMGRlZylcIixcclxufVxyXG5cclxuY29uc3QgQ1NTX3BhbmVsX2Jhcl92ZXJ0aWNhbCA9IHtcclxuICBiYXI6IFwiV05EX3BhbmVsX2JhciBXTkRfcGFuZWxfYmFyX1ZcIixcclxuICBtZW51X2J0bjogXCJXTkRfcGFuZWxfbWVudV9idG4gV05EX3BhbmVsX21lbnVfYnRuX1YgV05EX2NlbnRlcl9ob3Jpem9udGFsXCIsXHJcbiAgaXRlbV9idXR0b246IFwiV05EX3BhbmVsX2J1dHRvbiBXTkRfcGFuZWxfYnV0dG9uX1ZcIixcclxuICBpdGVtX2J1dHRvbl9DVVJSRU5UOiBcIldORF9wYW5lbF9idXR0b24gV05EX3BhbmVsX2J1dHRvbl9WIFdORF9wYW5lbF9idXR0b24tY3VycmVudFwiLFxyXG4gIGl0ZW1fYnV0dG9uX3RyYW5zZm9ybTogXCJyb3RhdGUoLTkwZGVnKVwiLFxyXG59XHJcblxyXG50eXBlIFBhbmVsQnV0dG9uUHJvcHNUeXBlID0ge1xyXG4gIHBhbmVsOiBQYW5lbFByb3BzLFxyXG4gIGZyYW1lOiBGcmFtZSxcclxuICBpdGVtOiBXaW5kb3dJbnN0YW5jZSxcclxuICBjc3M6IGFueSxcclxufVxyXG5cclxuY2xhc3MgUGFuZWxCdXR0b24gZXh0ZW5kcyBDb21wb25lbnQge1xyXG4gIHByb3BzOiBQYW5lbEJ1dHRvblByb3BzVHlwZVxyXG4gIGhhbmRsZUNsaWNrID0gKCkgPT4ge1xyXG4gICAgY29uc3QgeyBpdGVtLCBwYW5lbCwgZnJhbWUgfSA9IHRoaXMucHJvcHNcclxuICAgIGlmIChpdGVtID09PSBwYW5lbC5jdXJyZW50KSBmcmFtZS5oaWRlV2luZG93KGl0ZW0uaWQpXHJcbiAgICBlbHNlIGZyYW1lLnNob3dXaW5kb3coaXRlbS5pZClcclxuICB9XHJcbiAgaGFuZGxlRHJhZ1dpbmRvdyA9ICgpID0+IHtcclxuICAgIHJldHVybiB7XHJcbiAgICAgIFwid2luZG93XCI6IHtcclxuICAgICAgICBpZDogdGhpcy5wcm9wcy5pdGVtLmlkLFxyXG4gICAgICB9LFxyXG4gICAgfVxyXG4gIH1cclxuICBoYW5kbGVEcmFnT3ZlciA9IChlKSA9PiB7XHJcbiAgICBjb25zdCB7IGl0ZW0sIHBhbmVsIH0gPSB0aGlzLnByb3BzXHJcbiAgICBpZiAoZS5kYXRhVHJhbnNmZXIgJiYgZS5kYXRhVHJhbnNmZXIudHlwZXMuZmluZCh4ID0+IHggPT09IFwid2luZG93XCIpKSB7XHJcbiAgICAgIHJldHVybiB0cnVlXHJcbiAgICB9XHJcbiAgICBlbHNlIHtcclxuICAgICAgaWYgKHBhbmVsLmN1cnJlbnQgIT09IGl0ZW0pIHtcclxuICAgICAgICB0aGlzLmhhbmRsZUNsaWNrKClcclxuICAgICAgfVxyXG4gICAgICByZXR1cm4gZmFsc2VcclxuICAgIH1cclxuICB9XHJcbiAgaGFuZGxlQ2xvc2UgPSAoZSkgPT4ge1xyXG4gICAgaWYgKGUuYnV0dG9uID09PSAxKSB7XHJcbiAgICAgIHN0b3BFdmVudChlKVxyXG4gICAgICBjb25zdCBpdGVtID0gdGhpcy5wcm9wcy5pdGVtXHJcbiAgICAgIEFwcGxpY2F0aW9uLnJlbW92ZVdpbmRvdyhpdGVtLmlkKVxyXG4gICAgfVxyXG4gIH1cclxuICByZW5kZXIoKSB7XHJcbiAgICBjb25zdCB7IGl0ZW0sIHBhbmVsLCBjc3MgfSA9IHRoaXMucHJvcHNcclxuICAgIHJldHVybiAoXHJcbiAgICAgIDxEcmFnWm9uZVxyXG4gICAgICAgIGNsYXNzTmFtZT17IHBhbmVsLmN1cnJlbnQgPT09IGl0ZW0gPyBjc3MuaXRlbV9idXR0b25fQ1VSUkVOVCA6IGNzcy5pdGVtX2J1dHRvbiB9XHJcbiAgICAgICAgb25EcmFnU3RhcnQ9eyB0aGlzLmhhbmRsZURyYWdXaW5kb3cgfVxyXG4gICAgICAgIG9uRHJhZ092ZXI9eyB0aGlzLmhhbmRsZURyYWdPdmVyIH1cclxuICAgICAgICBvbkNsaWNrPXsgdGhpcy5oYW5kbGVDbGljayB9XHJcbiAgICAgICAgb25Nb3VzZURvd249eyB0aGlzLmhhbmRsZUNsb3NlIH1cclxuICAgICAgPlxyXG4gICAgICAgIDxkaXYgc3R5bGU9e3sgdHJhbnNmb3JtOiBjc3MuaXRlbV9idXR0b25fdHJhbnNmb3JtIH19PlxyXG4gICAgICAgICAge2l0ZW0uaWNvbiAmJiA8c3BhbiBjbGFzc05hbWU9eyBcInBhZGRpbmctcmlnaHQgZmEgZmEtXCIgKyBpdGVtLmljb24gfSAvPn1cclxuICAgICAgICAgIHtpdGVtLnRpdGxlfVxyXG4gICAgICAgIDwvZGl2PlxyXG4gICAgICA8L0RyYWdab25lPilcclxuICB9XHJcbn1cclxuXHJcbnR5cGUgUGFuZWxCYXJQcm9wc1R5cGUgPSB7XHJcbiAgcGFuZWw6IFBhbmVsUHJvcHMsXHJcbiAgZnJhbWU6IEZyYW1lLFxyXG4gIHZlcnRpY2FsOiBib29sZWFuLFxyXG59XHJcblxyXG5jbGFzcyBQYW5lbEJhciBleHRlbmRzIENvbXBvbmVudCB7XHJcbiAgcHJvcHM6IFBhbmVsQmFyUHJvcHNUeXBlXHJcbiAgc2hvdWxkQ29tcG9uZW50VXBkYXRlKG5leHRQcm9wcykge1xyXG4gICAgY29uc3QgY3VyUHJvcHMgPSB0aGlzLnByb3BzXHJcbiAgICBpZiAoY3VyUHJvcHMucGFuZWwgIT09IG5leHRQcm9wcy5wYW5lbCkge1xyXG4gICAgICBpZiAoY3VyUHJvcHMucGFuZWwuaXRlbXMgIT09IG5leHRQcm9wcy5wYW5lbC5pdGVtc1xyXG4gICAgICAgIHx8IGN1clByb3BzLnBhbmVsLmN1cnJlbnQgIT09IG5leHRQcm9wcy5wYW5lbC5jdXJyZW50KVxyXG4gICAgICAgIHJldHVybiB0cnVlXHJcbiAgICB9XHJcbiAgICByZXR1cm4gY3VyUHJvcHMuZnJhbWUgIT09IG5leHRQcm9wcy5mcmFtZVxyXG4gICAgICB8fCBjdXJQcm9wcy52ZXJ0aWNhbCAhPT0gbmV4dFByb3BzLnZlcnRpY2FsXHJcbiAgfVxyXG4gIGhhbmRsZURyb3BXaW5kb3cgPSAoZGF0YSkgPT4ge1xyXG4gICAgaWYgKGRhdGFbXCJ3aW5kb3dcIl0pIHtcclxuICAgICAgY29uc3Qgd25kID0gQXBwbGljYXRpb24ubGF5b3V0LmdldFdpbmRvd0luc3RhbmNlKGRhdGEud2luZG93LmlkKVxyXG4gICAgICB3bmQgJiYgQXBwbGljYXRpb24ubGF5b3V0LmRvY2tXaW5kb3cod25kLCB0aGlzLnByb3BzLnBhbmVsLmlkLCB0cnVlKVxyXG4gICAgfVxyXG4gIH1cclxuICByZW5kZXJNZW51KGNsb3NlKSB7XHJcbiAgICByZXR1cm4gKDxGcmFtZU1lbnUgY2xvc2U9eyBjbG9zZSB9IC8+KVxyXG4gIH1cclxuICByZW5kZXIoKSB7XHJcbiAgICBjb25zdCB7IHBhbmVsLCBmcmFtZSwgdmVydGljYWwgfSA9IHRoaXMucHJvcHNcclxuICAgIGNvbnN0IGNzcyA9IHZlcnRpY2FsID8gQ1NTX3BhbmVsX2Jhcl92ZXJ0aWNhbCA6IENTU19wYW5lbF9iYXJfaG9yaXpvbnRhbFxyXG5cclxuICAgIC8vIEJhciByZW5kZXJcclxuICAgIHJldHVybiAoPERyb3Bab25lIG9uRHJvcD17IHRoaXMuaGFuZGxlRHJvcFdpbmRvdyB9IGNsYXNzTmFtZT17IGNzcy5iYXIgfT5cclxuICAgICAge3BhbmVsLm1lbnUgJiYgPEJ1dHRvblBvcHVwIGNsYXNzTmFtZT17IGNzcy5tZW51X2J0biArIFwiIGZhIGZhLWNhcmV0LWRvd25cIiB9IHJlbmRlcj17IHRoaXMucmVuZGVyTWVudSB9IC8+fVxyXG4gICAgICB7cGFuZWwuaXRlbXMubWFwKChpdGVtLCBpKSA9PiB7XHJcbiAgICAgICAgcmV0dXJuICg8UGFuZWxCdXR0b24ga2V5PXsgaSB9IGNzcz17IGNzcyB9IGl0ZW09eyBpdGVtIH0gcGFuZWw9eyBwYW5lbCB9IGZyYW1lPXsgZnJhbWUgfSAvPilcclxuICAgICAgfSl9XHJcbiAgICA8L0Ryb3Bab25lPilcclxuICB9XHJcbn1cclxuXHJcbi8qKiAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcclxuKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXHJcbioqKiBQYW5lbCBSZXNpemVyXHJcbioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxyXG4qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiovXHJcblxyXG5jb25zdCBDU1NfcGFuZWxfcmVzaXplcl92ZXJ0aWNhbCA9IFwiV05EX3BhbmVsX3Jlc2l6ZXIgV05EX3BhbmVsX3Jlc2l6ZXJfVlwiXHJcbmNvbnN0IENTU19wYW5lbF9yZXNpemVyX2hvcml6b250YWwgPSBcIldORF9wYW5lbF9yZXNpemVyIFdORF9wYW5lbF9yZXNpemVyX0hcIlxyXG5cclxuZXhwb3J0IHR5cGUgUGFuZWxSZXNpemVyUHJvcHNUeXBlID0ge1xyXG4gIHZlcnRpY2FsOiBib29sZWFuLFxyXG4gIHRyYW5zZm9ybURlbHRhOiBGdW5jdGlvbixcclxuICBvblJlc2l6ZTogRnVuY3Rpb24sXHJcbn1cclxuXHJcbmV4cG9ydCBjbGFzcyBQYW5lbFJlc2l6ZXIgZXh0ZW5kcyBDb21wb25lbnQge1xyXG4gIHByb3BzOiBQYW5lbFJlc2l6ZXJQcm9wc1R5cGVcclxuICBoYW5kbGVNb3VzZURvd24gPSAoZSkgPT4ge1xyXG4gICAgbmV3IEh0bWxHcmFiUmVhY3Rpb24oZS50YXJnZXQsIGUsIHRoaXMuaGFuZGxlTW91c2VHcmFiKVxyXG4gIH1cclxuICBoYW5kbGVNb3VzZUdyYWIgPSAoZSkgPT4ge1xyXG4gICAgdGhpcy5wcm9wcy5vblJlc2l6ZSh0aGlzLnByb3BzLnRyYW5zZm9ybURlbHRhKGUpKVxyXG4gIH1cclxuICByZW5kZXIoKSB7XHJcbiAgICByZXR1cm4gKDxkaXZcclxuICAgICAgY2xhc3NOYW1lPXsgdGhpcy5wcm9wcy52ZXJ0aWNhbCA/IENTU19wYW5lbF9yZXNpemVyX3ZlcnRpY2FsIDogQ1NTX3BhbmVsX3Jlc2l6ZXJfaG9yaXpvbnRhbCB9XHJcbiAgICAgIG9uTW91c2VEb3duPXsgdGhpcy5oYW5kbGVNb3VzZURvd24gfVxyXG4gICAgICAgICAgICAvPilcclxuICB9XHJcbn1cclxuXHJcbi8qKiAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcclxuKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXHJcbioqKiBQYW5lbCBDb250YWluZXJcclxuKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXHJcbioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKi9cclxuXHJcbnR5cGUgU2lkZVBhbmVsQ29udGFpbmVyUHJvcHNUeXBlID0ge1xyXG4gIGN1cnJlbnQ6IFdpbmRvd0luc3RhbmNlLFxyXG4gIHZlcnRpY2FsOiBib29sZWFuLFxyXG4gIHNpemU6IG51bWJlcixcclxufVxyXG5cclxuY2xhc3MgU2lkZVBhbmVsQ29udGFpbmVyIGV4dGVuZHMgQ29tcG9uZW50IHtcclxuICBwcm9wczogU2lkZVBhbmVsQ29udGFpbmVyUHJvcHNUeXBlXHJcbiAgY29tcG9uZW50V2lsbE1vdW50KCkge1xyXG4gIH1cclxuICBzaG91bGRDb21wb25lbnRVcGRhdGUobmV4dFByb3BzKSB7XHJcbiAgICBjb25zdCBjdXJQcm9wcyA9IHRoaXMucHJvcHNcclxuICAgIHJldHVybiBjdXJQcm9wcy5jdXJyZW50ICE9PSBuZXh0UHJvcHMuY3VycmVudFxyXG4gICAgICB8fCBjdXJQcm9wcy52ZXJ0aWNhbCAhPT0gbmV4dFByb3BzLnZlcnRpY2FsXHJcbiAgICAgIHx8IGN1clByb3BzLnNpemUgIT09IG5leHRQcm9wcy5zaXplXHJcbiAgfVxyXG4gIGdldFNpemUoKSB7XHJcbiAgICBjb25zdCBjb250YWluZXIgPSB0aGlzLnJlZnMuY29udGFpbmVyXHJcbiAgICBpZiAoY29udGFpbmVyKSB7XHJcbiAgICAgIHJldHVybiB0aGlzLnByb3BzLnZlcnRpY2FsID8gY29udGFpbmVyLndpZHRoKCkgOiBjb250YWluZXIuaGVpZ2h0KClcclxuICAgIH1cclxuICB9XHJcbiAgcmVuZGVyKCkge1xyXG4gICAgY29uc3QgeyBjdXJyZW50LCB2ZXJ0aWNhbCwgc2l6ZSB9ID0gdGhpcy5wcm9wc1xyXG4gICAgY29uc3Qgc3R5bGUgPSB7XHJcbiAgICAgIC4uLmN1cnJlbnQgJiYgY3VycmVudC5zdHlsZSxcclxuICAgICAgd2lkdGg6IHZlcnRpY2FsID8gKHNpemUgKyBcIiVcIikgOiBcImF1dG9cIixcclxuICAgICAgaGVpZ2h0OiB2ZXJ0aWNhbCA/IFwiYXV0b1wiIDogKHNpemUgKyBcIiVcIiksXHJcbiAgICB9XHJcblxyXG4gICAgaWYgKGN1cnJlbnQpIHtcclxuICAgICAgcmV0dXJuICg8QXBwbGljYXRpb24uV2luZG93Q29udGFpbmVyXHJcbiAgICAgICAgcmVmPVwiY29udGFpbmVyXCJcclxuICAgICAgICBjbGFzc05hbWU9XCJXTkRfcGFuZWxfY29udGFpbmVyX3NpZGVcIlxyXG4gICAgICAgIHN0eWxlPXsgc3R5bGUgfVxyXG4gICAgICAgIGN1cnJlbnQ9eyBjdXJyZW50IH1cclxuICAgICAgICAgICAgICAvPilcclxuICAgIH1cclxuICAgIGVsc2Uge1xyXG4gICAgICByZXR1cm4gbnVsbFxyXG4gICAgfVxyXG4gIH1cclxufVxyXG5cclxudHlwZSBDZW50ZXJQYW5lbENvbnRhaW5lclByb3BzVHlwZSA9IHtcclxuICBjdXJyZW50OiBXaW5kb3dJbnN0YW5jZSxcclxufVxyXG5cclxuY2xhc3MgQ2VudGVyUGFuZWxDb250YWluZXIgZXh0ZW5kcyBDb21wb25lbnQge1xyXG4gIHByb3BzOiBDZW50ZXJQYW5lbENvbnRhaW5lclByb3BzVHlwZVxyXG4gIGNvbXBvbmVudFdpbGxNb3VudCgpIHtcclxuICB9XHJcbiAgc2hvdWxkQ29tcG9uZW50VXBkYXRlKG5leHRQcm9wcykge1xyXG4gICAgY29uc3QgY3VyUHJvcHMgPSB0aGlzLnByb3BzXHJcbiAgICByZXR1cm4gY3VyUHJvcHMuY3VycmVudCAhPT0gbmV4dFByb3BzLmN1cnJlbnRcclxuICB9XHJcbiAgcmVuZGVyQmFja1NjcmVlbigpIHtcclxuICAgIGNvbnN0IGxheW91dCA9IEFwcGxpY2F0aW9uLmxheW91dFxyXG4gICAgcmV0dXJuICg8ZGl2IGNsYXNzTmFtZT1cIldORF9wYW5lbF9jb250YWluZXJfY2VudGVyIG92ZXJmbG93LWF1dG9cIj5cclxuICAgICAge2xheW91dC5zcGxhc2hDb21wb25lbnQgJiYgPGxheW91dC5zcGxhc2hDb21wb25lbnQgLz59XHJcbiAgICA8L2Rpdj4pXHJcbiAgfVxyXG4gIHJlbmRlcigpIHtcclxuICAgIGNvbnN0IGN1cnJlbnQgPSB0aGlzLnByb3BzLmN1cnJlbnRcclxuICAgIGlmIChjdXJyZW50KSB7XHJcbiAgICAgIHJldHVybiAoPEFwcGxpY2F0aW9uLldpbmRvd0NvbnRhaW5lclxyXG4gICAgICAgIGN1cnJlbnQ9eyBjdXJyZW50IH1cclxuICAgICAgICBjbGFzc05hbWU9XCJXTkRfcGFuZWxfY29udGFpbmVyX2NlbnRlclwiXHJcbiAgICAgICAgICAgICAgLz4pXHJcbiAgICB9XHJcbiAgICBlbHNlIHtcclxuICAgICAgcmV0dXJuIHRoaXMucmVuZGVyQmFja1NjcmVlbigpXHJcbiAgICB9XHJcbiAgfVxyXG59XHJcblxyXG4vKiogKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXHJcbioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxyXG4qKiogUGFuZWxzXHJcbioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxyXG4qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiovXHJcblxyXG5jb25zdCBDU1Nfc2lkZV9wYW5lbF92ZXJ0aWNhbCA9IFwiV05EX3NpZGVfcGFuZWwgV05EX3NpZGVfcGFuZWxfVlwiXHJcbmNvbnN0IENTU19zaWRlX3BhbmVsX2hvcml6b250YWwgPSBcIldORF9zaWRlX3BhbmVsIFdORF9zaWRlX3BhbmVsX0hcIlxyXG5cclxudHlwZSBQcm9wc1R5cGUgPSB7XHJcbiAgcGFuZWw6IFBhbmVsUHJvcHMsXHJcbiAgZnJhbWU6IEZyYW1lLFxyXG4gIGNoaWxkcmVuOiBhbnksXHJcbn1cclxuXHJcbmNsYXNzIFNpZGVQYW5lbCBleHRlbmRzIENvbXBvbmVudCB7XHJcbiAgcHJvcHM6IFByb3BzVHlwZVxyXG4gIHNob3VsZENvbXBvbmVudFVwZGF0ZShuZXh0UHJvcHMpIHtcclxuICAgIGNvbnN0IGN1clByb3BzID0gdGhpcy5wcm9wc1xyXG4gICAgcmV0dXJuIGN1clByb3BzLnBhbmVsICE9PSBuZXh0UHJvcHMucGFuZWxcclxuICAgICAgfHwgY3VyUHJvcHMuZnJhbWUgIT09IG5leHRQcm9wcy5mcmFtZVxyXG4gICAgICB8fCBjdXJQcm9wcy5jaGlsZHJlbiAhPT0gbmV4dFByb3BzLmNoaWxkcmVuXHJcbiAgfVxyXG4gIGhhbmRsZVJlc2l6ZSA9IChkZWx0YSkgPT4ge1xyXG4gICAgY29uc3QgY3NpemUgPSB0aGlzLnJlZnMuY29udGFpbmVyLmdldFNpemUoKVxyXG4gICAgaWYgKGNzaXplICE9PSB1bmRlZmluZWQpIHtcclxuICAgICAgbGV0IHNpemUgPSB0aGlzLnByb3BzLnBhbmVsLnNpemVcclxuICAgICAgc2l6ZSArPSBNYXRoLm1heChzaXplLCAxKSAqIGRlbHRhIC8gTWF0aC5tYXgoY3NpemUsIDEpXHJcbiAgICAgIHNpemUgPSBNYXRoLm1pbihNYXRoLm1heChzaXplLCAwKSwgMTAwKVxyXG4gICAgICB0aGlzLnByb3BzLmZyYW1lLm5vdGlmeVBhbmVsUmVzaXplKHRoaXMucHJvcHMucGFuZWwsIHNpemUpXHJcbiAgICB9XHJcbiAgfVxyXG59XHJcblxyXG5leHBvcnQgY2xhc3MgU2lkZVBhbmVsVG9wIGV4dGVuZHMgU2lkZVBhbmVsIHtcclxuICB0cmFuc2Zvcm1EZWx0YShlKSB7XHJcbiAgICByZXR1cm4gZS5kZWx0YVlcclxuICB9XHJcbiAgcmVuZGVyKCkge1xyXG4gICAgY29uc3QgeyBwYW5lbCwgZnJhbWUgfSA9IHRoaXMucHJvcHNcclxuICAgIGNvbnN0IHNpemUgPSBwYW5lbC5jdXJyZW50ID8gcGFuZWwuc2l6ZSA6IDBcclxuICAgIHJldHVybiAoPGRpdiBjbGFzc05hbWU9eyBDU1Nfc2lkZV9wYW5lbF9ob3Jpem9udGFsIH0+XHJcbiAgICAgIDxQYW5lbEJhciBwYW5lbD17IHBhbmVsIH0gZnJhbWU9eyBmcmFtZSB9IC8+XHJcbiAgICAgIDxTaWRlUGFuZWxDb250YWluZXIgcmVmPXsgXCJjb250YWluZXJcIiB9IGN1cnJlbnQ9eyBwYW5lbC5jdXJyZW50IH0gc2l6ZT17IHNpemUgfSAvPlxyXG4gICAgICA8UGFuZWxSZXNpemVyIG9uUmVzaXplPXsgdGhpcy5oYW5kbGVSZXNpemUgfSB0cmFuc2Zvcm1EZWx0YT17IHRoaXMudHJhbnNmb3JtRGVsdGEgfSAvPlxyXG4gICAgICA8ZGl2IGNsYXNzTmFtZT1cImZsZXgtaGVpZ2h0LTEwMFwiPnt0aGlzLnByb3BzLmNoaWxkcmVufTwvZGl2PlxyXG4gICAgPC9kaXY+KVxyXG4gIH1cclxufVxyXG5cclxuZXhwb3J0IGNsYXNzIFNpZGVQYW5lbEJvdHRvbSBleHRlbmRzIFNpZGVQYW5lbCB7XHJcbiAgdHJhbnNmb3JtRGVsdGEoZSkge1xyXG4gICAgcmV0dXJuIC1lLmRlbHRhWVxyXG4gIH1cclxuICByZW5kZXIoKSB7XHJcbiAgICBjb25zdCB7IHBhbmVsLCBmcmFtZSB9ID0gdGhpcy5wcm9wc1xyXG4gICAgY29uc3Qgc2l6ZSA9IHBhbmVsLmN1cnJlbnQgPyBwYW5lbC5zaXplIDogMFxyXG4gICAgcmV0dXJuICg8ZGl2IGNsYXNzTmFtZT17IENTU19zaWRlX3BhbmVsX2hvcml6b250YWwgfT5cclxuICAgICAgPGRpdiBjbGFzc05hbWU9XCJmbGV4LWhlaWdodC0xMDBcIj57dGhpcy5wcm9wcy5jaGlsZHJlbn08L2Rpdj5cclxuICAgICAgPFBhbmVsUmVzaXplciBvblJlc2l6ZT17IHRoaXMuaGFuZGxlUmVzaXplIH0gdHJhbnNmb3JtRGVsdGE9eyB0aGlzLnRyYW5zZm9ybURlbHRhIH0gLz5cclxuICAgICAgPFBhbmVsQmFyIHBhbmVsPXsgcGFuZWwgfSBmcmFtZT17IGZyYW1lIH0gLz5cclxuICAgICAgPFNpZGVQYW5lbENvbnRhaW5lciByZWY9eyBcImNvbnRhaW5lclwiIH0gY3VycmVudD17IHBhbmVsLmN1cnJlbnQgfSBzaXplPXsgc2l6ZSB9IC8+XHJcbiAgICA8L2Rpdj4pXHJcbiAgfVxyXG59XHJcblxyXG5leHBvcnQgY2xhc3MgU2lkZVBhbmVsTGVmdCBleHRlbmRzIFNpZGVQYW5lbCB7XHJcbiAgdHJhbnNmb3JtRGVsdGEoZSkge1xyXG4gICAgcmV0dXJuIGUuZGVsdGFYXHJcbiAgfVxyXG4gIHJlbmRlcigpIHtcclxuICAgIGNvbnN0IHsgcGFuZWwsIGZyYW1lIH0gPSB0aGlzLnByb3BzXHJcbiAgICBjb25zdCBzaXplID0gcGFuZWwuY3VycmVudCA/IHBhbmVsLnNpemUgOiAwXHJcbiAgICByZXR1cm4gKDxkaXYgY2xhc3NOYW1lPXsgQ1NTX3NpZGVfcGFuZWxfdmVydGljYWwgfT5cclxuICAgICAgPFBhbmVsQmFyIHZlcnRpY2FsIHBhbmVsPXsgcGFuZWwgfSBmcmFtZT17IGZyYW1lIH0gLz5cclxuICAgICAgPFNpZGVQYW5lbENvbnRhaW5lciByZWY9eyBcImNvbnRhaW5lclwiIH0gdmVydGljYWwgY3VycmVudD17IHBhbmVsLmN1cnJlbnQgfSBzaXplPXsgc2l6ZSB9IC8+XHJcbiAgICAgIDxQYW5lbFJlc2l6ZXIgdmVydGljYWwgb25SZXNpemU9eyB0aGlzLmhhbmRsZVJlc2l6ZSB9IHRyYW5zZm9ybURlbHRhPXsgdGhpcy50cmFuc2Zvcm1EZWx0YSB9IC8+XHJcbiAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmxleC0xXCI+e3RoaXMucHJvcHMuY2hpbGRyZW59PC9kaXY+XHJcbiAgICA8L2Rpdj4pXHJcbiAgfVxyXG59XHJcblxyXG5leHBvcnQgY2xhc3MgU2lkZVBhbmVsUmlnaHQgZXh0ZW5kcyBTaWRlUGFuZWwge1xyXG4gIHRyYW5zZm9ybURlbHRhKGUpIHtcclxuICAgIHJldHVybiAtZS5kZWx0YVhcclxuICB9XHJcbiAgcmVuZGVyKCkge1xyXG4gICAgY29uc3QgeyBwYW5lbCwgZnJhbWUgfSA9IHRoaXMucHJvcHNcclxuICAgIGNvbnN0IHNpemUgPSBwYW5lbC5jdXJyZW50ID8gcGFuZWwuc2l6ZSA6IDBcclxuICAgIHJldHVybiAoPGRpdiBjbGFzc05hbWU9eyBDU1Nfc2lkZV9wYW5lbF92ZXJ0aWNhbCB9PlxyXG4gICAgICA8ZGl2IGNsYXNzTmFtZT1cImZsZXgtd2lkdGgtMTAwXCI+e3RoaXMucHJvcHMuY2hpbGRyZW59PC9kaXY+XHJcbiAgICAgIDxQYW5lbFJlc2l6ZXIgdmVydGljYWwgb25SZXNpemU9eyB0aGlzLmhhbmRsZVJlc2l6ZSB9IHRyYW5zZm9ybURlbHRhPXsgdGhpcy50cmFuc2Zvcm1EZWx0YSB9IC8+XHJcbiAgICAgIDxTaWRlUGFuZWxDb250YWluZXIgcmVmPXsgXCJjb250YWluZXJcIiB9IHZlcnRpY2FsIGN1cnJlbnQ9eyBwYW5lbC5jdXJyZW50IH0gc2l6ZT17IHNpemUgfSAvPlxyXG4gICAgICA8UGFuZWxCYXIgdmVydGljYWwgcGFuZWw9eyBwYW5lbCB9IGZyYW1lPXsgZnJhbWUgfSAvPlxyXG4gICAgPC9kaXY+KVxyXG4gIH1cclxufVxyXG5cclxuZXhwb3J0IGNsYXNzIENlbnRlclBhbmVsVG9wIGV4dGVuZHMgU2lkZVBhbmVsVG9wIHtcclxuICByZW5kZXIoKSB7XHJcbiAgICBjb25zdCB7IHBhbmVsLCBmcmFtZSB9ID0gdGhpcy5wcm9wc1xyXG4gICAgcmV0dXJuICg8ZGl2IGNsYXNzTmFtZT17IENTU19zaWRlX3BhbmVsX2hvcml6b250YWwgfT5cclxuICAgICAgPFBhbmVsQmFyIHBhbmVsPXsgcGFuZWwgfSBmcmFtZT17IGZyYW1lIH0gLz5cclxuICAgICAgPENlbnRlclBhbmVsQ29udGFpbmVyIHJlZj17IFwiY29udGFpbmVyXCIgfSBjdXJyZW50PXsgcGFuZWwuY3VycmVudCB9IC8+XHJcbiAgICA8L2Rpdj4pXHJcbiAgfVxyXG59XHJcbiJdfQ==