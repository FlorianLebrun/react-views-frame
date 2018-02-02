"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CenterPanelTop = exports.SidePanelRight = exports.SidePanelLeft = exports.SidePanelBottom = exports.SidePanelTop = exports.PanelResizer = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _DragAndDrop = require("../../ui-modules/DragAndDrop");

var _event = require("../../ui-modules/event.utils");

var _application = require("../../application");

var _FramePopup = require("./FramePopup");

var _FrameMenu = require("./FrameMenu");

var _FrameMenu2 = _interopRequireDefault(_FrameMenu);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /* eslint-disable react/no-multi-comp */
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
  item_button_CURRENT: "WND_panel_button WND_panel_button_H current",
  item_button_FOCUSED: "WND_panel_button WND_panel_button_H focused",
  item_button_transform: "rotate(0deg)"
};

var CSS_panel_bar_vertical = {
  bar: "WND_panel_bar WND_panel_bar_V",
  menu_btn: "WND_panel_menu_btn WND_panel_menu_btn_V WND_center_horizontal",
  item_button: "WND_panel_button WND_panel_button_V",
  item_button_CURRENT: "WND_panel_button WND_panel_button_V current",
  item_button_FOCUSED: "WND_panel_button WND_panel_button_V focused",
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

      if (item === panel.current) frame.hideWindow(item);else frame.showWindow(item);
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
        _application.Application.layout.removeWindow(_item);
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

      var className = panel.current !== item ? css.item_button : panel.focused ? css.item_button_FOCUSED : css.item_button_CURRENT;
      return _react2.default.createElement(
        _DragAndDrop.DragZone,
        {
          className: className,
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
      return curProps.panel !== nextProps.panel || curProps.vertical !== nextProps.vertical;
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
          className: "WND_panel_container_side WND_panel_container",
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
    key: "render",
    value: function render() {
      var current = this.props.current;
      if (current) {
        return _react2.default.createElement(_application.Application.WindowContainer, {
          current: current,
          className: "WND_panel_container_center WND_panel_container"
        });
      } else {
        var SplashComponent = _application.Application.layout.splashComponent;
        return _react2.default.createElement(
          "div",
          { className: "WND_panel_container_center WND_panel_container_splash" },
          SplashComponent && _react2.default.createElement(SplashComponent, null)
        );
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
          { className: "WND_panel_container_center" },
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
          { className: "WND_panel_container_center" },
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
          { className: "WND_panel_container_center" },
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
          { className: "WND_panel_container_center" },
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9saWIvYWRkb25zL3dpbmRvd3MtZnJhbWUvRnJhbWVQYW5lbHMuanMiXSwibmFtZXMiOlsiQ1NTX3BhbmVsX2Jhcl9ob3Jpem9udGFsIiwiYmFyIiwibWVudV9idG4iLCJpdGVtX2J1dHRvbiIsIml0ZW1fYnV0dG9uX0NVUlJFTlQiLCJpdGVtX2J1dHRvbl9GT0NVU0VEIiwiaXRlbV9idXR0b25fdHJhbnNmb3JtIiwiQ1NTX3BhbmVsX2Jhcl92ZXJ0aWNhbCIsIlBhbmVsQnV0dG9uIiwiaGFuZGxlQ2xpY2siLCJwcm9wcyIsIml0ZW0iLCJwYW5lbCIsImZyYW1lIiwiY3VycmVudCIsImhpZGVXaW5kb3ciLCJzaG93V2luZG93IiwiaGFuZGxlRHJhZ1dpbmRvdyIsImlkIiwiaGFuZGxlRHJhZ092ZXIiLCJlIiwiZGF0YVRyYW5zZmVyIiwidHlwZXMiLCJmaW5kIiwieCIsImhhbmRsZUNsb3NlIiwiYnV0dG9uIiwibGF5b3V0IiwicmVtb3ZlV2luZG93IiwiY3NzIiwiY2xhc3NOYW1lIiwiZm9jdXNlZCIsInRyYW5zZm9ybSIsImljb24iLCJ0aXRsZSIsIlBhbmVsQmFyIiwiaGFuZGxlRHJvcFdpbmRvdyIsImRhdGEiLCJ3bmQiLCJnZXRXaW5kb3dJbnN0YW5jZSIsIndpbmRvdyIsImRvY2tXaW5kb3ciLCJuZXh0UHJvcHMiLCJjdXJQcm9wcyIsInZlcnRpY2FsIiwiY2xvc2UiLCJtZW51IiwicmVuZGVyTWVudSIsIml0ZW1zIiwibWFwIiwiaSIsIkNTU19wYW5lbF9yZXNpemVyX3ZlcnRpY2FsIiwiQ1NTX3BhbmVsX3Jlc2l6ZXJfaG9yaXpvbnRhbCIsIlBhbmVsUmVzaXplciIsImhhbmRsZU1vdXNlRG93biIsInRhcmdldCIsImhhbmRsZU1vdXNlR3JhYiIsIm9uUmVzaXplIiwidHJhbnNmb3JtRGVsdGEiLCJTaWRlUGFuZWxDb250YWluZXIiLCJzaXplIiwiY29udGFpbmVyIiwicmVmcyIsIndpZHRoIiwiaGVpZ2h0Iiwic3R5bGUiLCJDZW50ZXJQYW5lbENvbnRhaW5lciIsIlNwbGFzaENvbXBvbmVudCIsInNwbGFzaENvbXBvbmVudCIsIkNTU19zaWRlX3BhbmVsX3ZlcnRpY2FsIiwiQ1NTX3NpZGVfcGFuZWxfaG9yaXpvbnRhbCIsIlNpZGVQYW5lbCIsImhhbmRsZVJlc2l6ZSIsImRlbHRhIiwiY3NpemUiLCJnZXRTaXplIiwidW5kZWZpbmVkIiwiTWF0aCIsIm1heCIsIm1pbiIsIm5vdGlmeVBhbmVsUmVzaXplIiwiY2hpbGRyZW4iLCJTaWRlUGFuZWxUb3AiLCJkZWx0YVkiLCJTaWRlUGFuZWxCb3R0b20iLCJTaWRlUGFuZWxMZWZ0IiwiZGVsdGFYIiwiU2lkZVBhbmVsUmlnaHQiLCJDZW50ZXJQYW5lbFRvcCJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7QUFFQTs7OztBQUVBOztBQUNBOztBQUNBOztBQUVBOztBQUNBOzs7Ozs7Ozs7OytlQVRBO0FBQ0E7OztBQWlCQTs7Ozs7O0FBTUEsSUFBTUEsMkJBQTJCO0FBQy9CQyxPQUFLLCtCQUQwQjtBQUUvQkMsWUFBVSw2REFGcUI7QUFHL0JDLGVBQWEscUNBSGtCO0FBSS9CQyx1QkFBcUIsNkNBSlU7QUFLL0JDLHVCQUFxQiw2Q0FMVTtBQU0vQkMseUJBQXVCO0FBTlEsQ0FBakM7O0FBU0EsSUFBTUMseUJBQXlCO0FBQzdCTixPQUFLLCtCQUR3QjtBQUU3QkMsWUFBVSwrREFGbUI7QUFHN0JDLGVBQWEscUNBSGdCO0FBSTdCQyx1QkFBcUIsNkNBSlE7QUFLN0JDLHVCQUFxQiw2Q0FMUTtBQU03QkMseUJBQXVCO0FBTk0sQ0FBL0I7O0lBZ0JNRSxXOzs7Ozs7Ozs7Ozs7OztnTUFFSkMsVyxHQUFjLFlBQU07QUFBQSx3QkFDYSxNQUFLQyxLQURsQjtBQUFBLFVBQ1ZDLElBRFUsZUFDVkEsSUFEVTtBQUFBLFVBQ0pDLEtBREksZUFDSkEsS0FESTtBQUFBLFVBQ0dDLEtBREgsZUFDR0EsS0FESDs7QUFFbEIsVUFBSUYsU0FBU0MsTUFBTUUsT0FBbkIsRUFBNEJELE1BQU1FLFVB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YW5lbHMuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvKiBlc2xpbnQtZGlzYWJsZSByZWFjdC9uby1tdWx0aS1jb21wICovXHJcbi8qIGVzbGludC1kaXNhYmxlIHJlYWN0L25vLXN0cmluZy1yZWZzICovXHJcbmltcG9ydCBSZWFjdCwgeyBDb21wb25lbnQgfSBmcm9tIFwicmVhY3RcIlxyXG5cclxuaW1wb3J0IHsgRHJvcFpvbmUsIERyYWdab25lIH0gZnJvbSBcIi4uLy4uL3VpLW1vZHVsZXMvRHJhZ0FuZERyb3BcIlxyXG5pbXBvcnQgeyBIdG1sR3JhYlJlYWN0aW9uLCBzdG9wRXZlbnQgfSBmcm9tIFwiLi4vLi4vdWktbW9kdWxlcy9ldmVudC51dGlsc1wiXHJcbmltcG9ydCB7IEFwcGxpY2F0aW9uIH0gZnJvbSBcIi4uLy4uL2FwcGxpY2F0aW9uXCJcclxuXHJcbmltcG9ydCB7IEJ1dHRvblBvcHVwIH0gZnJvbSBcIi4vRnJhbWVQb3B1cFwiXHJcbmltcG9ydCBGcmFtZU1lbnUgZnJvbSBcIi4vRnJhbWVNZW51XCJcclxuXHJcbmV4cG9ydCB0eXBlIFBhbmVsUHJvcHMgPSB7XHJcbiAgaWQ6IERvY2tJRCxcclxuICBzaXplOiBudW1iZXIsXHJcbiAgY3VycmVudDogV2luZG93SW5zdGFuY2UsXHJcbiAgaXRlbXM6IEFycmF5PFdpbmRvd0luc3RhbmNlPixcclxufVxyXG5cclxuLyoqICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxyXG4qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcclxuKioqIFBhbmVsIEJhclxyXG4qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcclxuKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqL1xyXG5cclxuY29uc3QgQ1NTX3BhbmVsX2Jhcl9ob3Jpem9udGFsID0ge1xyXG4gIGJhcjogXCJXTkRfcGFuZWxfYmFyIFdORF9wYW5lbF9iYXJfSFwiLFxyXG4gIG1lbnVfYnRuOiBcIldORF9wYW5lbF9tZW51X2J0biBXTkRfcGFuZWxfbWVudV9idG5fSCBXTkRfY2VudGVyX3ZlcnRpY2FsXCIsXHJcbiAgaXRlbV9idXR0b246IFwiV05EX3BhbmVsX2J1dHRvbiBXTkRfcGFuZWxfYnV0dG9uX0hcIixcclxuICBpdGVtX2J1dHRvbl9DVVJSRU5UOiBcIldORF9wYW5lbF9idXR0b24gV05EX3BhbmVsX2J1dHRvbl9IIGN1cnJlbnRcIixcclxuICBpdGVtX2J1dHRvbl9GT0NVU0VEOiBcIldORF9wYW5lbF9idXR0b24gV05EX3BhbmVsX2J1dHRvbl9IIGZvY3VzZWRcIixcclxuICBpdGVtX2J1dHRvbl90cmFuc2Zvcm06IFwicm90YXRlKDBkZWcpXCIsXHJcbn1cclxuXHJcbmNvbnN0IENTU19wYW5lbF9iYXJfdmVydGljYWwgPSB7XHJcbiAgYmFyOiBcIldORF9wYW5lbF9iYXIgV05EX3BhbmVsX2Jhcl9WXCIsXHJcbiAgbWVudV9idG46IFwiV05EX3BhbmVsX21lbnVfYnRuIFdORF9wYW5lbF9tZW51X2J0bl9WIFdORF9jZW50ZXJfaG9yaXpvbnRhbFwiLFxyXG4gIGl0ZW1fYnV0dG9uOiBcIldORF9wYW5lbF9idXR0b24gV05EX3BhbmVsX2J1dHRvbl9WXCIsXHJcbiAgaXRlbV9idXR0b25fQ1VSUkVOVDogXCJXTkRfcGFuZWxfYnV0dG9uIFdORF9wYW5lbF9idXR0b25fViBjdXJyZW50XCIsXHJcbiAgaXRlbV9idXR0b25fRk9DVVNFRDogXCJXTkRfcGFuZWxfYnV0dG9uIFdORF9wYW5lbF9idXR0b25fViBmb2N1c2VkXCIsXHJcbiAgaXRlbV9idXR0b25fdHJhbnNmb3JtOiBcInJvdGF0ZSgtOTBkZWcpXCIsXHJcbn1cclxuXHJcbnR5cGUgUGFuZWxCdXR0b25Qcm9wc1R5cGUgPSB7XHJcbiAgcGFuZWw6IFBhbmVsUHJvcHMsXHJcbiAgZnJhbWU6IEZyYW1lLFxyXG4gIGl0ZW06IFdpbmRvd0luc3RhbmNlLFxyXG4gIGNzczogYW55LFxyXG59XHJcblxyXG5jbGFzcyBQYW5lbEJ1dHRvbiBleHRlbmRzIENvbXBvbmVudCB7XHJcbiAgcHJvcHM6IFBhbmVsQnV0dG9uUHJvcHNUeXBlXHJcbiAgaGFuZGxlQ2xpY2sgPSAoKSA9PiB7XHJcbiAgICBjb25zdCB7IGl0ZW0sIHBhbmVsLCBmcmFtZSB9ID0gdGhpcy5wcm9wc1xyXG4gICAgaWYgKGl0ZW0gPT09IHBhbmVsLmN1cnJlbnQpIGZyYW1lLmhpZGVXaW5kb3coaXRlbSlcclxuICAgIGVsc2UgZnJhbWUuc2hvd1dpbmRvdyhpdGVtKVxyXG4gIH1cclxuICBoYW5kbGVEcmFnV2luZG93ID0gKCkgPT4ge1xyXG4gICAgcmV0dXJuIHtcclxuICAgICAgXCJ3aW5kb3dcIjoge1xyXG4gICAgICAgIGlkOiB0aGlzLnByb3BzLml0ZW0uaWQsXHJcbiAgICAgIH0sXHJcbiAgICB9XHJcbiAgfVxyXG4gIGhhbmRsZURyYWdPdmVyID0gKGUpID0+IHtcclxuICAgIGNvbnN0IHsgaXRlbSwgcGFuZWwgfSA9IHRoaXMucHJvcHNcclxuICAgIGlmIChlLmRhdGFUcmFuc2ZlciAmJiBlLmRhdGFUcmFuc2Zlci50eXBlcy5maW5kKHggPT4geCA9PT0gXCJ3aW5kb3dcIikpIHtcclxuICAgICAgcmV0dXJuIHRydWVcclxuICAgIH1cclxuICAgIGVsc2Uge1xyXG4gICAgICBpZiAocGFuZWwuY3VycmVudCAhPT0gaXRlbSkge1xyXG4gICAgICAgIHRoaXMuaGFuZGxlQ2xpY2soKVxyXG4gICAgICB9XHJcbiAgICAgIHJldHVybiBmYWxzZVxyXG4gICAgfVxyXG4gIH1cclxuICBoYW5kbGVDbG9zZSA9IChlKSA9PiB7XHJcbiAgICBpZiAoZS5idXR0b24gPT09IDEpIHtcclxuICAgICAgc3RvcEV2ZW50KGUpXHJcbiAgICAgIGNvbnN0IGl0ZW0gPSB0aGlzLnByb3BzLml0ZW1cclxuICAgICAgQXBwbGljYXRpb24ubGF5b3V0LnJlbW92ZVdpbmRvdyhpdGVtKVxyXG4gICAgfVxyXG4gIH1cclxuICByZW5kZXIoKSB7XHJcbiAgICBjb25zdCB7IGl0ZW0sIHBhbmVsLCBjc3MgfSA9IHRoaXMucHJvcHNcclxuICAgIGNvbnN0IGNsYXNzTmFtZSA9IChwYW5lbC5jdXJyZW50ICE9PSBpdGVtKVxyXG4gICAgICA/IGNzcy5pdGVtX2J1dHRvblxyXG4gICAgICA6IChwYW5lbC5mb2N1c2VkXHJcbiAgICAgICAgPyBjc3MuaXRlbV9idXR0b25fRk9DVVNFRFxyXG4gICAgICAgIDogY3NzLml0ZW1fYnV0dG9uX0NVUlJFTlQpXHJcbiAgICByZXR1cm4gKFxyXG4gICAgICA8RHJhZ1pvbmVcclxuICAgICAgICBjbGFzc05hbWU9e2NsYXNzTmFtZX1cclxuICAgICAgICBvbkRyYWdTdGFydD17dGhpcy5oYW5kbGVEcmFnV2luZG93fVxyXG4gICAgICAgIG9uRHJhZ092ZXI9e3RoaXMuaGFuZGxlRHJhZ092ZXJ9XHJcbiAgICAgICAgb25DbGljaz17dGhpcy5oYW5kbGVDbGlja31cclxuICAgICAgICBvbk1vdXNlRG93bj17dGhpcy5oYW5kbGVDbG9zZX1cclxuICAgICAgPlxyXG4gICAgICAgIDxkaXYgc3R5bGU9e3sgdHJhbnNmb3JtOiBjc3MuaXRlbV9idXR0b25fdHJhbnNmb3JtIH19PlxyXG4gICAgICAgICAge2l0ZW0uaWNvbiAmJiA8c3BhbiBjbGFzc05hbWU9e1wicGFkZGluZy1yaWdodCBmYSBmYS1cIiArIGl0ZW0uaWNvbn0gLz59XHJcbiAgICAgICAgICB7aXRlbS50aXRsZX1cclxuICAgICAgICA8L2Rpdj5cclxuICAgICAgPC9EcmFnWm9uZT4pXHJcbiAgfVxyXG59XHJcblxyXG50eXBlIFBhbmVsQmFyUHJvcHNUeXBlID0ge1xyXG4gIHBhbmVsOiBQYW5lbFByb3BzLFxyXG4gIGZyYW1lOiBGcmFtZSxcclxuICB2ZXJ0aWNhbDogYm9vbGVhbixcclxufVxyXG5cclxuY2xhc3MgUGFuZWxCYXIgZXh0ZW5kcyBDb21wb25lbnQge1xyXG4gIHByb3BzOiBQYW5lbEJhclByb3BzVHlwZVxyXG4gIHNob3VsZENvbXBvbmVudFVwZGF0ZShuZXh0UHJvcHMpIHtcclxuICAgIGNvbnN0IGN1clByb3BzID0gdGhpcy5wcm9wc1xyXG4gICAgcmV0dXJuIGN1clByb3BzLnBhbmVsICE9PSBuZXh0UHJvcHMucGFuZWxcclxuICAgICAgfHwgY3VyUHJvcHMudmVydGljYWwgIT09IG5leHRQcm9wcy52ZXJ0aWNhbFxyXG4gIH1cclxuICBoYW5kbGVEcm9wV2luZG93ID0gKGRhdGEpID0+IHtcclxuICAgIGlmIChkYXRhW1wid2luZG93XCJdKSB7XHJcbiAgICAgIGNvbnN0IHduZCA9IEFwcGxpY2F0aW9uLmxheW91dC5nZXRXaW5kb3dJbnN0YW5jZShkYXRhLndpbmRvdy5pZClcclxuICAgICAgd25kICYmIEFwcGxpY2F0aW9uLmxheW91dC5kb2NrV2luZG93KHduZCwgdGhpcy5wcm9wcy5wYW5lbC5pZCwgdHJ1ZSlcclxuICAgIH1cclxuICB9XHJcbiAgcmVuZGVyTWVudShjbG9zZSkge1xyXG4gICAgcmV0dXJuICg8RnJhbWVNZW51IGNsb3NlPXtjbG9zZX0gLz4pXHJcbiAgfVxyXG4gIHJlbmRlcigpIHtcclxuICAgIGNvbnN0IHsgcGFuZWwsIGZyYW1lLCB2ZXJ0aWNhbCB9ID0gdGhpcy5wcm9wc1xyXG4gICAgY29uc3QgY3NzID0gdmVydGljYWwgPyBDU1NfcGFuZWxfYmFyX3ZlcnRpY2FsIDogQ1NTX3BhbmVsX2Jhcl9ob3Jpem9udGFsXHJcblxyXG4gICAgLy8gQmFyIHJlbmRlclxyXG4gICAgcmV0dXJuICg8RHJvcFpvbmUgb25Ecm9wPXt0aGlzLmhhbmRsZURyb3BXaW5kb3d9IGNsYXNzTmFtZT17Y3NzLmJhcn0+XHJcbiAgICAgIHtwYW5lbC5tZW51ICYmIDxCdXR0b25Qb3B1cCBjbGFzc05hbWU9e2Nzcy5tZW51X2J0biArIFwiIGZhIGZhLWNhcmV0LWRvd25cIn0gcmVuZGVyPXt0aGlzLnJlbmRlck1lbnV9IC8+fVxyXG4gICAgICB7cGFuZWwuaXRlbXMubWFwKChpdGVtLCBpKSA9PiB7XHJcbiAgICAgICAgcmV0dXJuICg8UGFuZWxCdXR0b24ga2V5PXtpfSBjc3M9e2Nzc30gaXRlbT17aXRlbX0gcGFuZWw9e3BhbmVsfSBmcmFtZT17ZnJhbWV9IC8+KVxyXG4gICAgICB9KX1cclxuICAgIDwvRHJvcFpvbmU+KVxyXG4gIH1cclxufVxyXG5cclxuLyoqICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxyXG4qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcclxuKioqIFBhbmVsIFJlc2l6ZXJcclxuKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXHJcbioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKi9cclxuXHJcbmNvbnN0IENTU19wYW5lbF9yZXNpemVyX3ZlcnRpY2FsID0gXCJXTkRfcGFuZWxfcmVzaXplciBXTkRfcGFuZWxfcmVzaXplcl9WXCJcclxuY29uc3QgQ1NTX3BhbmVsX3Jlc2l6ZXJfaG9yaXpvbnRhbCA9IFwiV05EX3BhbmVsX3Jlc2l6ZXIgV05EX3BhbmVsX3Jlc2l6ZXJfSFwiXHJcblxyXG5leHBvcnQgdHlwZSBQYW5lbFJlc2l6ZXJQcm9wc1R5cGUgPSB7XHJcbiAgdmVydGljYWw6IGJvb2xlYW4sXHJcbiAgdHJhbnNmb3JtRGVsdGE6IEZ1bmN0aW9uLFxyXG4gIG9uUmVzaXplOiBGdW5jdGlvbixcclxufVxyXG5cclxuZXhwb3J0IGNsYXNzIFBhbmVsUmVzaXplciBleHRlbmRzIENvbXBvbmVudCB7XHJcbiAgcHJvcHM6IFBhbmVsUmVzaXplclByb3BzVHlwZVxyXG4gIGhhbmRsZU1vdXNlRG93biA9IChlKSA9PiB7XHJcbiAgICBuZXcgSHRtbEdyYWJSZWFjdGlvbihlLnRhcmdldCwgZSwgdGhpcy5oYW5kbGVNb3VzZUdyYWIpXHJcbiAgfVxyXG4gIGhhbmRsZU1vdXNlR3JhYiA9IChlKSA9PiB7XHJcbiAgICB0aGlzLnByb3BzLm9uUmVzaXplKHRoaXMucHJvcHMudHJhbnNmb3JtRGVsdGEoZSkpXHJcbiAgfVxyXG4gIHJlbmRlcigpIHtcclxuICAgIHJldHVybiAoPGRpdlxyXG4gICAgICBjbGFzc05hbWU9e3RoaXMucHJvcHMudmVydGljYWwgPyBDU1NfcGFuZWxfcmVzaXplcl92ZXJ0aWNhbCA6IENTU19wYW5lbF9yZXNpemVyX2hvcml6b250YWx9XHJcbiAgICAgIG9uTW91c2VEb3duPXt0aGlzLmhhbmRsZU1vdXNlRG93bn1cclxuICAgIC8+KVxyXG4gIH1cclxufVxyXG5cclxuLyoqICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxyXG4qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcclxuKioqIFBhbmVsIENvbnRhaW5lclxyXG4qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcclxuKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqL1xyXG5cclxudHlwZSBTaWRlUGFuZWxDb250YWluZXJQcm9wc1R5cGUgPSB7XHJcbiAgY3VycmVudDogV2luZG93SW5zdGFuY2UsXHJcbiAgdmVydGljYWw6IGJvb2xlYW4sXHJcbiAgc2l6ZTogbnVtYmVyLFxyXG59XHJcblxyXG5jbGFzcyBTaWRlUGFuZWxDb250YWluZXIgZXh0ZW5kcyBDb21wb25lbnQge1xyXG4gIHByb3BzOiBTaWRlUGFuZWxDb250YWluZXJQcm9wc1R5cGVcclxuICBjb21wb25lbnRXaWxsTW91bnQoKSB7XHJcbiAgfVxyXG4gIHNob3VsZENvbXBvbmVudFVwZGF0ZShuZXh0UHJvcHMpIHtcclxuICAgIGNvbnN0IGN1clByb3BzID0gdGhpcy5wcm9wc1xyXG4gICAgcmV0dXJuIGN1clByb3BzLmN1cnJlbnQgIT09IG5leHRQcm9wcy5jdXJyZW50XHJcbiAgICAgIHx8IGN1clByb3BzLnZlcnRpY2FsICE9PSBuZXh0UHJvcHMudmVydGljYWxcclxuICAgICAgfHwgY3VyUHJvcHMuc2l6ZSAhPT0gbmV4dFByb3BzLnNpemVcclxuICB9XHJcbiAgZ2V0U2l6ZSgpIHtcclxuICAgIGNvbnN0IGNvbnRhaW5lciA9IHRoaXMucmVmcy5jb250YWluZXJcclxuICAgIGlmIChjb250YWluZXIpIHtcclxuICAgICAgcmV0dXJuIHRoaXMucHJvcHMudmVydGljYWwgPyBjb250YWluZXIud2lkdGgoKSA6IGNvbnRhaW5lci5oZWlnaHQoKVxyXG4gICAgfVxyXG4gIH1cclxuICByZW5kZXIoKSB7XHJcbiAgICBjb25zdCB7IGN1cnJlbnQsIHZlcnRpY2FsLCBzaXplIH0gPSB0aGlzLnByb3BzXHJcbiAgICBjb25zdCBzdHlsZSA9IHtcclxuICAgICAgLi4uY3VycmVudCAmJiBjdXJyZW50LnN0eWxlLFxyXG4gICAgICB3aWR0aDogdmVydGljYWwgPyAoc2l6ZSArIFwiJVwiKSA6IFwiYXV0b1wiLFxyXG4gICAgICBoZWlnaHQ6IHZlcnRpY2FsID8gXCJhdXRvXCIgOiAoc2l6ZSArIFwiJVwiKSxcclxuICAgIH1cclxuXHJcbiAgICBpZiAoY3VycmVudCkge1xyXG4gICAgICByZXR1cm4gKDxBcHBsaWNhdGlvbi5XaW5kb3dDb250YWluZXJcclxuICAgICAgICByZWY9XCJjb250YWluZXJcIlxyXG4gICAgICAgIGNsYXNzTmFtZT1cIldORF9wYW5lbF9jb250YWluZXJfc2lkZSBXTkRfcGFuZWxfY29udGFpbmVyXCJcclxuICAgICAgICBzdHlsZT17c3R5bGV9XHJcbiAgICAgICAgY3VycmVudD17Y3VycmVudH1cclxuICAgICAgLz4pXHJcbiAgICB9XHJcbiAgICBlbHNlIHtcclxuICAgICAgcmV0dXJuIG51bGxcclxuICAgIH1cclxuICB9XHJcbn1cclxuXHJcbnR5cGUgQ2VudGVyUGFuZWxDb250YWluZXJQcm9wc1R5cGUgPSB7XHJcbiAgY3VycmVudDogV2luZG93SW5zdGFuY2UsXHJcbn1cclxuXHJcbmNsYXNzIENlbnRlclBhbmVsQ29udGFpbmVyIGV4dGVuZHMgQ29tcG9uZW50IHtcclxuICBwcm9wczogQ2VudGVyUGFuZWxDb250YWluZXJQcm9wc1R5cGVcclxuICBjb21wb25lbnRXaWxsTW91bnQoKSB7XHJcbiAgfVxyXG4gIHNob3VsZENvbXBvbmVudFVwZGF0ZShuZXh0UHJvcHMpIHtcclxuICAgIGNvbnN0IGN1clByb3BzID0gdGhpcy5wcm9wc1xyXG4gICAgcmV0dXJuIGN1clByb3BzLmN1cnJlbnQgIT09IG5leHRQcm9wcy5jdXJyZW50XHJcbiAgfVxyXG4gIHJlbmRlcigpIHtcclxuICAgIGNvbnN0IGN1cnJlbnQgPSB0aGlzLnByb3BzLmN1cnJlbnRcclxuICAgIGlmIChjdXJyZW50KSB7XHJcbiAgICAgIHJldHVybiAoPEFwcGxpY2F0aW9uLldpbmRvd0NvbnRhaW5lclxyXG4gICAgICAgIGN1cnJlbnQ9e2N1cnJlbnR9XHJcbiAgICAgICAgY2xhc3NOYW1lPVwiV05EX3BhbmVsX2NvbnRhaW5lcl9jZW50ZXIgV05EX3BhbmVsX2NvbnRhaW5lclwiXHJcbiAgICAgIC8+KVxyXG4gICAgfVxyXG4gICAgZWxzZSB7XHJcbiAgICAgIGNvbnN0IFNwbGFzaENvbXBvbmVudCA9IEFwcGxpY2F0aW9uLmxheW91dC5zcGxhc2hDb21wb25lbnRcclxuICAgICAgcmV0dXJuICg8ZGl2IGNsYXNzTmFtZT1cIldORF9wYW5lbF9jb250YWluZXJfY2VudGVyIFdORF9wYW5lbF9jb250YWluZXJfc3BsYXNoXCI+XHJcbiAgICAgICAge1NwbGFzaENvbXBvbmVudCAmJiA8U3BsYXNoQ29tcG9uZW50IC8+fVxyXG4gICAgICA8L2Rpdj4pXHJcbiAgICB9XHJcbiAgfVxyXG59XHJcblxyXG4vKiogKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXHJcbioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxyXG4qKiogUGFuZWxzXHJcbioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxyXG4qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiovXHJcblxyXG5jb25zdCBDU1Nfc2lkZV9wYW5lbF92ZXJ0aWNhbCA9IFwiV05EX3NpZGVfcGFuZWwgV05EX3NpZGVfcGFuZWxfVlwiXHJcbmNvbnN0IENTU19zaWRlX3BhbmVsX2hvcml6b250YWwgPSBcIldORF9zaWRlX3BhbmVsIFdORF9zaWRlX3BhbmVsX0hcIlxyXG5cclxudHlwZSBQcm9wc1R5cGUgPSB7XHJcbiAgcGFuZWw6IFBhbmVsUHJvcHMsXHJcbiAgZnJhbWU6IEZyYW1lLFxyXG4gIGNoaWxkcmVuOiBhbnksXHJcbn1cclxuXHJcbmNsYXNzIFNpZGVQYW5lbCBleHRlbmRzIENvbXBvbmVudCB7XHJcbiAgcHJvcHM6IFByb3BzVHlwZVxyXG4gIHNob3VsZENvbXBvbmVudFVwZGF0ZShuZXh0UHJvcHMpIHtcclxuICAgIGNvbnN0IGN1clByb3BzID0gdGhpcy5wcm9wc1xyXG4gICAgcmV0dXJuIGN1clByb3BzLnBhbmVsICE9PSBuZXh0UHJvcHMucGFuZWxcclxuICAgICAgfHwgY3VyUHJvcHMuZnJhbWUgIT09IG5leHRQcm9wcy5mcmFtZVxyXG4gICAgICB8fCBjdXJQcm9wcy5jaGlsZHJlbiAhPT0gbmV4dFByb3BzLmNoaWxkcmVuXHJcbiAgfVxyXG4gIGhhbmRsZVJlc2l6ZSA9IChkZWx0YSkgPT4ge1xyXG4gICAgY29uc3QgY3NpemUgPSB0aGlzLnJlZnMuY29udGFpbmVyLmdldFNpemUoKVxyXG4gICAgaWYgKGNzaXplICE9PSB1bmRlZmluZWQpIHtcclxuICAgICAgbGV0IHNpemUgPSB0aGlzLnByb3BzLnBhbmVsLnNpemVcclxuICAgICAgc2l6ZSArPSBNYXRoLm1heChzaXplLCAxKSAqIGRlbHRhIC8gTWF0aC5tYXgoY3NpemUsIDEpXHJcbiAgICAgIHNpemUgPSBNYXRoLm1pbihNYXRoLm1heChzaXplLCAwKSwgMTAwKVxyXG4gICAgICB0aGlzLnByb3BzLmZyYW1lLm5vdGlmeVBhbmVsUmVzaXplKHRoaXMucHJvcHMucGFuZWwsIHNpemUpXHJcbiAgICB9XHJcbiAgfVxyXG59XHJcblxyXG5leHBvcnQgY2xhc3MgU2lkZVBhbmVsVG9wIGV4dGVuZHMgU2lkZVBhbmVsIHtcclxuICB0cmFuc2Zvcm1EZWx0YShlKSB7XHJcbiAgICByZXR1cm4gZS5kZWx0YVlcclxuICB9XHJcbiAgcmVuZGVyKCkge1xyXG4gICAgY29uc3QgeyBwYW5lbCwgZnJhbWUgfSA9IHRoaXMucHJvcHNcclxuICAgIGNvbnN0IHNpemUgPSBwYW5lbC5jdXJyZW50ID8gcGFuZWwuc2l6ZSA6IDBcclxuICAgIHJldHVybiAoPGRpdiBjbGFzc05hbWU9e0NTU19zaWRlX3BhbmVsX2hvcml6b250YWx9PlxyXG4gICAgICA8UGFuZWxCYXIgcGFuZWw9e3BhbmVsfSBmcmFtZT17ZnJhbWV9IC8+XHJcbiAgICAgIDxTaWRlUGFuZWxDb250YWluZXIgcmVmPXtcImNvbnRhaW5lclwifSBjdXJyZW50PXtwYW5lbC5jdXJyZW50fSBzaXplPXtzaXplfSAvPlxyXG4gICAgICA8UGFuZWxSZXNpemVyIG9uUmVzaXplPXt0aGlzLmhhbmRsZVJlc2l6ZX0gdHJhbnNmb3JtRGVsdGE9e3RoaXMudHJhbnNmb3JtRGVsdGF9IC8+XHJcbiAgICAgIDxkaXYgY2xhc3NOYW1lPVwiV05EX3BhbmVsX2NvbnRhaW5lcl9jZW50ZXJcIj57dGhpcy5wcm9wcy5jaGlsZHJlbn08L2Rpdj5cclxuICAgIDwvZGl2PilcclxuICB9XHJcbn1cclxuXHJcbmV4cG9ydCBjbGFzcyBTaWRlUGFuZWxCb3R0b20gZXh0ZW5kcyBTaWRlUGFuZWwge1xyXG4gIHRyYW5zZm9ybURlbHRhKGUpIHtcclxuICAgIHJldHVybiAtZS5kZWx0YVlcclxuICB9XHJcbiAgcmVuZGVyKCkge1xyXG4gICAgY29uc3QgeyBwYW5lbCwgZnJhbWUgfSA9IHRoaXMucHJvcHNcclxuICAgIGNvbnN0IHNpemUgPSBwYW5lbC5jdXJyZW50ID8gcGFuZWwuc2l6ZSA6IDBcclxuICAgIHJldHVybiAoPGRpdiBjbGFzc05hbWU9e0NTU19zaWRlX3BhbmVsX2hvcml6b250YWx9PlxyXG4gICAgICA8ZGl2IGNsYXNzTmFtZT1cIldORF9wYW5lbF9jb250YWluZXJfY2VudGVyXCI+e3RoaXMucHJvcHMuY2hpbGRyZW59PC9kaXY+XHJcbiAgICAgIDxQYW5lbFJlc2l6ZXIgb25SZXNpemU9e3RoaXMuaGFuZGxlUmVzaXplfSB0cmFuc2Zvcm1EZWx0YT17dGhpcy50cmFuc2Zvcm1EZWx0YX0gLz5cclxuICAgICAgPFBhbmVsQmFyIHBhbmVsPXtwYW5lbH0gZnJhbWU9e2ZyYW1lfSAvPlxyXG4gICAgICA8U2lkZVBhbmVsQ29udGFpbmVyIHJlZj17XCJjb250YWluZXJcIn0gY3VycmVudD17cGFuZWwuY3VycmVudH0gc2l6ZT17c2l6ZX0gLz5cclxuICAgIDwvZGl2PilcclxuICB9XHJcbn1cclxuXHJcbmV4cG9ydCBjbGFzcyBTaWRlUGFuZWxMZWZ0IGV4dGVuZHMgU2lkZVBhbmVsIHtcclxuICB0cmFuc2Zvcm1EZWx0YShlKSB7XHJcbiAgICByZXR1cm4gZS5kZWx0YVhcclxuICB9XHJcbiAgcmVuZGVyKCkge1xyXG4gICAgY29uc3QgeyBwYW5lbCwgZnJhbWUgfSA9IHRoaXMucHJvcHNcclxuICAgIGNvbnN0IHNpemUgPSBwYW5lbC5jdXJyZW50ID8gcGFuZWwuc2l6ZSA6IDBcclxuICAgIHJldHVybiAoPGRpdiBjbGFzc05hbWU9e0NTU19zaWRlX3BhbmVsX3ZlcnRpY2FsfT5cclxuICAgICAgPFBhbmVsQmFyIHZlcnRpY2FsIHBhbmVsPXtwYW5lbH0gZnJhbWU9e2ZyYW1lfSAvPlxyXG4gICAgICA8U2lkZVBhbmVsQ29udGFpbmVyIHJlZj17XCJjb250YWluZXJcIn0gdmVydGljYWwgY3VycmVudD17cGFuZWwuY3VycmVudH0gc2l6ZT17c2l6ZX0gLz5cclxuICAgICAgPFBhbmVsUmVzaXplciB2ZXJ0aWNhbCBvblJlc2l6ZT17dGhpcy5oYW5kbGVSZXNpemV9IHRyYW5zZm9ybURlbHRhPXt0aGlzLnRyYW5zZm9ybURlbHRhfSAvPlxyXG4gICAgICA8ZGl2IGNsYXNzTmFtZT1cIldORF9wYW5lbF9jb250YWluZXJfY2VudGVyXCI+e3RoaXMucHJvcHMuY2hpbGRyZW59PC9kaXY+XHJcbiAgICA8L2Rpdj4pXHJcbiAgfVxyXG59XHJcblxyXG5leHBvcnQgY2xhc3MgU2lkZVBhbmVsUmlnaHQgZXh0ZW5kcyBTaWRlUGFuZWwge1xyXG4gIHRyYW5zZm9ybURlbHRhKGUpIHtcclxuICAgIHJldHVybiAtZS5kZWx0YVhcclxuICB9XHJcbiAgcmVuZGVyKCkge1xyXG4gICAgY29uc3QgeyBwYW5lbCwgZnJhbWUgfSA9IHRoaXMucHJvcHNcclxuICAgIGNvbnN0IHNpemUgPSBwYW5lbC5jdXJyZW50ID8gcGFuZWwuc2l6ZSA6IDBcclxuICAgIHJldHVybiAoPGRpdiBjbGFzc05hbWU9e0NTU19zaWRlX3BhbmVsX3ZlcnRpY2FsfT5cclxuICAgICAgPGRpdiBjbGFzc05hbWU9XCJXTkRfcGFuZWxfY29udGFpbmVyX2NlbnRlclwiPnt0aGlzLnByb3BzLmNoaWxkcmVufTwvZGl2PlxyXG4gICAgICA8UGFuZWxSZXNpemVyIHZlcnRpY2FsIG9uUmVzaXplPXt0aGlzLmhhbmRsZVJlc2l6ZX0gdHJhbnNmb3JtRGVsdGE9e3RoaXMudHJhbnNmb3JtRGVsdGF9IC8+XHJcbiAgICAgIDxTaWRlUGFuZWxDb250YWluZXIgcmVmPXtcImNvbnRhaW5lclwifSB2ZXJ0aWNhbCBjdXJyZW50PXtwYW5lbC5jdXJyZW50fSBzaXplPXtzaXplfSAvPlxyXG4gICAgICA8UGFuZWxCYXIgdmVydGljYWwgcGFuZWw9e3BhbmVsfSBmcmFtZT17ZnJhbWV9IC8+XHJcbiAgICA8L2Rpdj4pXHJcbiAgfVxyXG59XHJcblxyXG5leHBvcnQgY2xhc3MgQ2VudGVyUGFuZWxUb3AgZXh0ZW5kcyBTaWRlUGFuZWxUb3Age1xyXG4gIHJlbmRlcigpIHtcclxuICAgIGNvbnN0IHsgcGFuZWwsIGZyYW1lIH0gPSB0aGlzLnByb3BzXHJcbiAgICByZXR1cm4gKDxkaXYgY2xhc3NOYW1lPXtDU1Nfc2lkZV9wYW5lbF9ob3Jpem9udGFsfT5cclxuICAgICAgPFBhbmVsQmFyIHBhbmVsPXtwYW5lbH0gZnJhbWU9e2ZyYW1lfSAvPlxyXG4gICAgICA8Q2VudGVyUGFuZWxDb250YWluZXIgcmVmPXtcImNvbnRhaW5lclwifSBjdXJyZW50PXtwYW5lbC5jdXJyZW50fSAvPlxyXG4gICAgPC9kaXY+KVxyXG4gIH1cclxufVxyXG4iXX0=