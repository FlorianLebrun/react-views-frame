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
        _application.Application.layout.removeWindow(_item.id);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9saWIvZnJhbWUvRnJhbWVQYW5lbHMuanMiXSwibmFtZXMiOlsiQ1NTX3BhbmVsX2Jhcl9ob3Jpem9udGFsIiwiYmFyIiwibWVudV9idG4iLCJpdGVtX2J1dHRvbiIsIml0ZW1fYnV0dG9uX0NVUlJFTlQiLCJpdGVtX2J1dHRvbl90cmFuc2Zvcm0iLCJDU1NfcGFuZWxfYmFyX3ZlcnRpY2FsIiwiUGFuZWxCdXR0b24iLCJoYW5kbGVDbGljayIsInByb3BzIiwiaXRlbSIsInBhbmVsIiwiZnJhbWUiLCJjdXJyZW50IiwiaGlkZVdpbmRvdyIsImlkIiwic2hvd1dpbmRvdyIsImhhbmRsZURyYWdXaW5kb3ciLCJoYW5kbGVEcmFnT3ZlciIsImUiLCJkYXRhVHJhbnNmZXIiLCJ0eXBlcyIsImZpbmQiLCJ4IiwiaGFuZGxlQ2xvc2UiLCJidXR0b24iLCJsYXlvdXQiLCJyZW1vdmVXaW5kb3ciLCJjc3MiLCJ0cmFuc2Zvcm0iLCJpY29uIiwidGl0bGUiLCJQYW5lbEJhciIsImhhbmRsZURyb3BXaW5kb3ciLCJkYXRhIiwid25kIiwiZ2V0V2luZG93SW5zdGFuY2UiLCJ3aW5kb3ciLCJkb2NrV2luZG93IiwibmV4dFByb3BzIiwiY3VyUHJvcHMiLCJpdGVtcyIsInZlcnRpY2FsIiwiY2xvc2UiLCJtZW51IiwicmVuZGVyTWVudSIsIm1hcCIsImkiLCJDU1NfcGFuZWxfcmVzaXplcl92ZXJ0aWNhbCIsIkNTU19wYW5lbF9yZXNpemVyX2hvcml6b250YWwiLCJQYW5lbFJlc2l6ZXIiLCJoYW5kbGVNb3VzZURvd24iLCJ0YXJnZXQiLCJoYW5kbGVNb3VzZUdyYWIiLCJvblJlc2l6ZSIsInRyYW5zZm9ybURlbHRhIiwiU2lkZVBhbmVsQ29udGFpbmVyIiwic2l6ZSIsImNvbnRhaW5lciIsInJlZnMiLCJ3aWR0aCIsImhlaWdodCIsInN0eWxlIiwiQ2VudGVyUGFuZWxDb250YWluZXIiLCJzcGxhc2hDb21wb25lbnQiLCJyZW5kZXJCYWNrU2NyZWVuIiwiQ1NTX3NpZGVfcGFuZWxfdmVydGljYWwiLCJDU1Nfc2lkZV9wYW5lbF9ob3Jpem9udGFsIiwiU2lkZVBhbmVsIiwiaGFuZGxlUmVzaXplIiwiZGVsdGEiLCJjc2l6ZSIsImdldFNpemUiLCJ1bmRlZmluZWQiLCJNYXRoIiwibWF4IiwibWluIiwibm90aWZ5UGFuZWxSZXNpemUiLCJjaGlsZHJlbiIsIlNpZGVQYW5lbFRvcCIsImRlbHRhWSIsIlNpZGVQYW5lbEJvdHRvbSIsIlNpZGVQYW5lbExlZnQiLCJkZWx0YVgiLCJTaWRlUGFuZWxSaWdodCIsIkNlbnRlclBhbmVsVG9wIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7OztBQUdBOzs7O0FBRUE7O0FBQ0E7O0FBQ0E7O0FBRUE7O0FBQ0E7Ozs7Ozs7Ozs7K2VBVkE7QUFDQTtBQUNBOzs7QUFpQkE7Ozs7OztBQU1BLElBQU1BLDJCQUEyQjtBQUMvQkMsT0FBSywrQkFEMEI7QUFFL0JDLFlBQVUsNkRBRnFCO0FBRy9CQyxlQUFhLHFDQUhrQjtBQUkvQkMsdUJBQXFCLDhEQUpVO0FBSy9CQyx5QkFBdUI7QUFMUSxDQUFqQzs7QUFRQSxJQUFNQyx5QkFBeUI7QUFDN0JMLE9BQUssK0JBRHdCO0FBRTdCQyxZQUFVLCtEQUZtQjtBQUc3QkMsZUFBYSxxQ0FIZ0I7QUFJN0JDLHVCQUFxQiw4REFKUTtBQUs3QkMseUJBQXVCO0FBTE0sQ0FBL0I7O0lBZU1FLFc7Ozs7Ozs7Ozs7Ozs7O2dNQUVKQyxXLEdBQWMsWUFBTTtBQUFBLHdCQUNhLE1BQUtDLEtBRGxCO0FBQUEsVUFDVkMsSUFEVSxlQUNWQSxJQURVO0FBQUEsVUFDSkMsS0FESSxlQUNKQSxLQURJO0FBQUEsVUFDR0MsS0FESCxlQUNHQSxLQURIOztBQUVsQixVQUFJRixTQUFTQyxNQUFNRSxPQUFuQixFQUE0QkQsTUFBTUUsVUFBTixDQUFpQkosS0FBS0ssRUFBdEIsRUFBNUIsS0FDS0gsTUFBTUksVUFBTixDQUFpQk4sS0FBS0ssRUFBdEI7QUFDTixLLFFBQ0RFLGdCLEdBQW1CLFlBQU07QUFDdkIs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LEtBQWxDLEdBRE07QUFFTixzQ0FBQyxvQkFBRCxJQUFzQixLQUFNLFdBQTVCLEVBQTBDLFNBQVVELE1BQU1FLE9BQTFEO0FBRk0sT0FBUjtBQUlEOzs7O0VBUGlDa0UsWSIsImZpbGUiOiJGcmFtZVBhbmVscy5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8qIGVzbGludC1kaXNhYmxlIHJlYWN0L25vLW11bHRpLWNvbXAgKi9cclxuLyogZXNsaW50LWRpc2FibGUgaW1wb3J0L25vLW5hbWVzcGFjZSAqL1xyXG4vKiBlc2xpbnQtZGlzYWJsZSByZWFjdC9uby1zdHJpbmctcmVmcyAqL1xyXG5pbXBvcnQgUmVhY3QsIHsgQ29tcG9uZW50IH0gZnJvbSBcInJlYWN0XCJcclxuXHJcbmltcG9ydCB7IERyb3Bab25lLCBEcmFnWm9uZSB9IGZyb20gXCIuLi91aS1tb2R1bGVzL0RyYWdBbmREcm9wXCJcclxuaW1wb3J0IHsgSHRtbEdyYWJSZWFjdGlvbiwgc3RvcEV2ZW50IH0gZnJvbSBcIi4uL3VpLW1vZHVsZXMvZXZlbnQudXRpbHNcIlxyXG5pbXBvcnQgeyBBcHBsaWNhdGlvbiB9IGZyb20gXCIuLi9hcHBsaWNhdGlvblwiXHJcblxyXG5pbXBvcnQgeyBCdXR0b25Qb3B1cCB9IGZyb20gXCIuL0ZyYW1lUG9wdXBcIlxyXG5pbXBvcnQgRnJhbWVNZW51IGZyb20gXCIuL0ZyYW1lTWVudVwiXHJcblxyXG5leHBvcnQgdHlwZSBQYW5lbFByb3BzID0ge1xyXG4gIGlkOiBEb2NrSUQsXHJcbiAgc2l6ZTogbnVtYmVyLFxyXG4gIGN1cnJlbnQ6IFdpbmRvd0luc3RhbmNlLFxyXG4gIGl0ZW1zOiBBcnJheTxXaW5kb3dJbnN0YW5jZT4sXHJcbn1cclxuXHJcbi8qKiAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcclxuKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXHJcbioqKiBQYW5lbCBCYXJcclxuKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXHJcbioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKi9cclxuXHJcbmNvbnN0IENTU19wYW5lbF9iYXJfaG9yaXpvbnRhbCA9IHtcclxuICBiYXI6IFwiV05EX3BhbmVsX2JhciBXTkRfcGFuZWxfYmFyX0hcIixcclxuICBtZW51X2J0bjogXCJXTkRfcGFuZWxfbWVudV9idG4gV05EX3BhbmVsX21lbnVfYnRuX0ggV05EX2NlbnRlcl92ZXJ0aWNhbFwiLFxyXG4gIGl0ZW1fYnV0dG9uOiBcIldORF9wYW5lbF9idXR0b24gV05EX3BhbmVsX2J1dHRvbl9IXCIsXHJcbiAgaXRlbV9idXR0b25fQ1VSUkVOVDogXCJXTkRfcGFuZWxfYnV0dG9uIFdORF9wYW5lbF9idXR0b25fSCBXTkRfcGFuZWxfYnV0dG9uLWN1cnJlbnRcIixcclxuICBpdGVtX2J1dHRvbl90cmFuc2Zvcm06IFwicm90YXRlKDBkZWcpXCIsXHJcbn1cclxuXHJcbmNvbnN0IENTU19wYW5lbF9iYXJfdmVydGljYWwgPSB7XHJcbiAgYmFyOiBcIldORF9wYW5lbF9iYXIgV05EX3BhbmVsX2Jhcl9WXCIsXHJcbiAgbWVudV9idG46IFwiV05EX3BhbmVsX21lbnVfYnRuIFdORF9wYW5lbF9tZW51X2J0bl9WIFdORF9jZW50ZXJfaG9yaXpvbnRhbFwiLFxyXG4gIGl0ZW1fYnV0dG9uOiBcIldORF9wYW5lbF9idXR0b24gV05EX3BhbmVsX2J1dHRvbl9WXCIsXHJcbiAgaXRlbV9idXR0b25fQ1VSUkVOVDogXCJXTkRfcGFuZWxfYnV0dG9uIFdORF9wYW5lbF9idXR0b25fViBXTkRfcGFuZWxfYnV0dG9uLWN1cnJlbnRcIixcclxuICBpdGVtX2J1dHRvbl90cmFuc2Zvcm06IFwicm90YXRlKC05MGRlZylcIixcclxufVxyXG5cclxudHlwZSBQYW5lbEJ1dHRvblByb3BzVHlwZSA9IHtcclxuICBwYW5lbDogUGFuZWxQcm9wcyxcclxuICBmcmFtZTogRnJhbWUsXHJcbiAgaXRlbTogV2luZG93SW5zdGFuY2UsXHJcbiAgY3NzOiBhbnksXHJcbn1cclxuXHJcbmNsYXNzIFBhbmVsQnV0dG9uIGV4dGVuZHMgQ29tcG9uZW50IHtcclxuICBwcm9wczogUGFuZWxCdXR0b25Qcm9wc1R5cGVcclxuICBoYW5kbGVDbGljayA9ICgpID0+IHtcclxuICAgIGNvbnN0IHsgaXRlbSwgcGFuZWwsIGZyYW1lIH0gPSB0aGlzLnByb3BzXHJcbiAgICBpZiAoaXRlbSA9PT0gcGFuZWwuY3VycmVudCkgZnJhbWUuaGlkZVdpbmRvdyhpdGVtLmlkKVxyXG4gICAgZWxzZSBmcmFtZS5zaG93V2luZG93KGl0ZW0uaWQpXHJcbiAgfVxyXG4gIGhhbmRsZURyYWdXaW5kb3cgPSAoKSA9PiB7XHJcbiAgICByZXR1cm4ge1xyXG4gICAgICBcIndpbmRvd1wiOiB7XHJcbiAgICAgICAgaWQ6IHRoaXMucHJvcHMuaXRlbS5pZCxcclxuICAgICAgfSxcclxuICAgIH1cclxuICB9XHJcbiAgaGFuZGxlRHJhZ092ZXIgPSAoZSkgPT4ge1xyXG4gICAgY29uc3QgeyBpdGVtLCBwYW5lbCB9ID0gdGhpcy5wcm9wc1xyXG4gICAgaWYgKGUuZGF0YVRyYW5zZmVyICYmIGUuZGF0YVRyYW5zZmVyLnR5cGVzLmZpbmQoeCA9PiB4ID09PSBcIndpbmRvd1wiKSkge1xyXG4gICAgICByZXR1cm4gdHJ1ZVxyXG4gICAgfVxyXG4gICAgZWxzZSB7XHJcbiAgICAgIGlmIChwYW5lbC5jdXJyZW50ICE9PSBpdGVtKSB7XHJcbiAgICAgICAgdGhpcy5oYW5kbGVDbGljaygpXHJcbiAgICAgIH1cclxuICAgICAgcmV0dXJuIGZhbHNlXHJcbiAgICB9XHJcbiAgfVxyXG4gIGhhbmRsZUNsb3NlID0gKGUpID0+IHtcclxuICAgIGlmIChlLmJ1dHRvbiA9PT0gMSkge1xyXG4gICAgICBzdG9wRXZlbnQoZSlcclxuICAgICAgY29uc3QgaXRlbSA9IHRoaXMucHJvcHMuaXRlbVxyXG4gICAgICBBcHBsaWNhdGlvbi5sYXlvdXQucmVtb3ZlV2luZG93KGl0ZW0uaWQpXHJcbiAgICB9XHJcbiAgfVxyXG4gIHJlbmRlcigpIHtcclxuICAgIGNvbnN0IHsgaXRlbSwgcGFuZWwsIGNzcyB9ID0gdGhpcy5wcm9wc1xyXG4gICAgcmV0dXJuIChcclxuICAgICAgPERyYWdab25lXHJcbiAgICAgICAgY2xhc3NOYW1lPXsgcGFuZWwuY3VycmVudCA9PT0gaXRlbSA/IGNzcy5pdGVtX2J1dHRvbl9DVVJSRU5UIDogY3NzLml0ZW1fYnV0dG9uIH1cclxuICAgICAgICBvbkRyYWdTdGFydD17IHRoaXMuaGFuZGxlRHJhZ1dpbmRvdyB9XHJcbiAgICAgICAgb25EcmFnT3Zlcj17IHRoaXMuaGFuZGxlRHJhZ092ZXIgfVxyXG4gICAgICAgIG9uQ2xpY2s9eyB0aGlzLmhhbmRsZUNsaWNrIH1cclxuICAgICAgICBvbk1vdXNlRG93bj17IHRoaXMuaGFuZGxlQ2xvc2UgfVxyXG4gICAgICA+XHJcbiAgICAgICAgPGRpdiBzdHlsZT17eyB0cmFuc2Zvcm06IGNzcy5pdGVtX2J1dHRvbl90cmFuc2Zvcm0gfX0+XHJcbiAgICAgICAgICB7aXRlbS5pY29uICYmIDxzcGFuIGNsYXNzTmFtZT17IFwicGFkZGluZy1yaWdodCBmYSBmYS1cIiArIGl0ZW0uaWNvbiB9IC8+fVxyXG4gICAgICAgICAge2l0ZW0udGl0bGV9XHJcbiAgICAgICAgPC9kaXY+XHJcbiAgICAgIDwvRHJhZ1pvbmU+KVxyXG4gIH1cclxufVxyXG5cclxudHlwZSBQYW5lbEJhclByb3BzVHlwZSA9IHtcclxuICBwYW5lbDogUGFuZWxQcm9wcyxcclxuICBmcmFtZTogRnJhbWUsXHJcbiAgdmVydGljYWw6IGJvb2xlYW4sXHJcbn1cclxuXHJcbmNsYXNzIFBhbmVsQmFyIGV4dGVuZHMgQ29tcG9uZW50IHtcclxuICBwcm9wczogUGFuZWxCYXJQcm9wc1R5cGVcclxuICBzaG91bGRDb21wb25lbnRVcGRhdGUobmV4dFByb3BzKSB7XHJcbiAgICBjb25zdCBjdXJQcm9wcyA9IHRoaXMucHJvcHNcclxuICAgIGlmIChjdXJQcm9wcy5wYW5lbCAhPT0gbmV4dFByb3BzLnBhbmVsKSB7XHJcbiAgICAgIGlmIChjdXJQcm9wcy5wYW5lbC5pdGVtcyAhPT0gbmV4dFByb3BzLnBhbmVsLml0ZW1zXHJcbiAgICAgICAgfHwgY3VyUHJvcHMucGFuZWwuY3VycmVudCAhPT0gbmV4dFByb3BzLnBhbmVsLmN1cnJlbnQpXHJcbiAgICAgICAgcmV0dXJuIHRydWVcclxuICAgIH1cclxuICAgIHJldHVybiBjdXJQcm9wcy5mcmFtZSAhPT0gbmV4dFByb3BzLmZyYW1lXHJcbiAgICAgIHx8IGN1clByb3BzLnZlcnRpY2FsICE9PSBuZXh0UHJvcHMudmVydGljYWxcclxuICB9XHJcbiAgaGFuZGxlRHJvcFdpbmRvdyA9IChkYXRhKSA9PiB7XHJcbiAgICBpZiAoZGF0YVtcIndpbmRvd1wiXSkge1xyXG4gICAgICBjb25zdCB3bmQgPSBBcHBsaWNhdGlvbi5sYXlvdXQuZ2V0V2luZG93SW5zdGFuY2UoZGF0YS53aW5kb3cuaWQpXHJcbiAgICAgIHduZCAmJiBBcHBsaWNhdGlvbi5sYXlvdXQuZG9ja1dpbmRvdyh3bmQsIHRoaXMucHJvcHMucGFuZWwuaWQsIHRydWUpXHJcbiAgICB9XHJcbiAgfVxyXG4gIHJlbmRlck1lbnUoY2xvc2UpIHtcclxuICAgIHJldHVybiAoPEZyYW1lTWVudSBjbG9zZT17IGNsb3NlIH0gLz4pXHJcbiAgfVxyXG4gIHJlbmRlcigpIHtcclxuICAgIGNvbnN0IHsgcGFuZWwsIGZyYW1lLCB2ZXJ0aWNhbCB9ID0gdGhpcy5wcm9wc1xyXG4gICAgY29uc3QgY3NzID0gdmVydGljYWwgPyBDU1NfcGFuZWxfYmFyX3ZlcnRpY2FsIDogQ1NTX3BhbmVsX2Jhcl9ob3Jpem9udGFsXHJcblxyXG4gICAgLy8gQmFyIHJlbmRlclxyXG4gICAgcmV0dXJuICg8RHJvcFpvbmUgb25Ecm9wPXsgdGhpcy5oYW5kbGVEcm9wV2luZG93IH0gY2xhc3NOYW1lPXsgY3NzLmJhciB9PlxyXG4gICAgICB7cGFuZWwubWVudSAmJiA8QnV0dG9uUG9wdXAgY2xhc3NOYW1lPXsgY3NzLm1lbnVfYnRuICsgXCIgZmEgZmEtY2FyZXQtZG93blwiIH0gcmVuZGVyPXsgdGhpcy5yZW5kZXJNZW51IH0gLz59XHJcbiAgICAgIHtwYW5lbC5pdGVtcy5tYXAoKGl0ZW0sIGkpID0+IHtcclxuICAgICAgICByZXR1cm4gKDxQYW5lbEJ1dHRvbiBrZXk9eyBpIH0gY3NzPXsgY3NzIH0gaXRlbT17IGl0ZW0gfSBwYW5lbD17IHBhbmVsIH0gZnJhbWU9eyBmcmFtZSB9IC8+KVxyXG4gICAgICB9KX1cclxuICAgIDwvRHJvcFpvbmU+KVxyXG4gIH1cclxufVxyXG5cclxuLyoqICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxyXG4qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcclxuKioqIFBhbmVsIFJlc2l6ZXJcclxuKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXHJcbioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKi9cclxuXHJcbmNvbnN0IENTU19wYW5lbF9yZXNpemVyX3ZlcnRpY2FsID0gXCJXTkRfcGFuZWxfcmVzaXplciBXTkRfcGFuZWxfcmVzaXplcl9WXCJcclxuY29uc3QgQ1NTX3BhbmVsX3Jlc2l6ZXJfaG9yaXpvbnRhbCA9IFwiV05EX3BhbmVsX3Jlc2l6ZXIgV05EX3BhbmVsX3Jlc2l6ZXJfSFwiXHJcblxyXG5leHBvcnQgdHlwZSBQYW5lbFJlc2l6ZXJQcm9wc1R5cGUgPSB7XHJcbiAgdmVydGljYWw6IGJvb2xlYW4sXHJcbiAgdHJhbnNmb3JtRGVsdGE6IEZ1bmN0aW9uLFxyXG4gIG9uUmVzaXplOiBGdW5jdGlvbixcclxufVxyXG5cclxuZXhwb3J0IGNsYXNzIFBhbmVsUmVzaXplciBleHRlbmRzIENvbXBvbmVudCB7XHJcbiAgcHJvcHM6IFBhbmVsUmVzaXplclByb3BzVHlwZVxyXG4gIGhhbmRsZU1vdXNlRG93biA9IChlKSA9PiB7XHJcbiAgICBuZXcgSHRtbEdyYWJSZWFjdGlvbihlLnRhcmdldCwgZSwgdGhpcy5oYW5kbGVNb3VzZUdyYWIpXHJcbiAgfVxyXG4gIGhhbmRsZU1vdXNlR3JhYiA9IChlKSA9PiB7XHJcbiAgICB0aGlzLnByb3BzLm9uUmVzaXplKHRoaXMucHJvcHMudHJhbnNmb3JtRGVsdGEoZSkpXHJcbiAgfVxyXG4gIHJlbmRlcigpIHtcclxuICAgIHJldHVybiAoPGRpdlxyXG4gICAgICBjbGFzc05hbWU9eyB0aGlzLnByb3BzLnZlcnRpY2FsID8gQ1NTX3BhbmVsX3Jlc2l6ZXJfdmVydGljYWwgOiBDU1NfcGFuZWxfcmVzaXplcl9ob3Jpem9udGFsIH1cclxuICAgICAgb25Nb3VzZURvd249eyB0aGlzLmhhbmRsZU1vdXNlRG93biB9XHJcbiAgICAgICAgICAgIC8+KVxyXG4gIH1cclxufVxyXG5cclxuLyoqICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxyXG4qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcclxuKioqIFBhbmVsIENvbnRhaW5lclxyXG4qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcclxuKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqL1xyXG5cclxudHlwZSBTaWRlUGFuZWxDb250YWluZXJQcm9wc1R5cGUgPSB7XHJcbiAgY3VycmVudDogV2luZG93SW5zdGFuY2UsXHJcbiAgdmVydGljYWw6IGJvb2xlYW4sXHJcbiAgc2l6ZTogbnVtYmVyLFxyXG59XHJcblxyXG5jbGFzcyBTaWRlUGFuZWxDb250YWluZXIgZXh0ZW5kcyBDb21wb25lbnQge1xyXG4gIHByb3BzOiBTaWRlUGFuZWxDb250YWluZXJQcm9wc1R5cGVcclxuICBjb21wb25lbnRXaWxsTW91bnQoKSB7XHJcbiAgfVxyXG4gIHNob3VsZENvbXBvbmVudFVwZGF0ZShuZXh0UHJvcHMpIHtcclxuICAgIGNvbnN0IGN1clByb3BzID0gdGhpcy5wcm9wc1xyXG4gICAgcmV0dXJuIGN1clByb3BzLmN1cnJlbnQgIT09IG5leHRQcm9wcy5jdXJyZW50XHJcbiAgICAgIHx8IGN1clByb3BzLnZlcnRpY2FsICE9PSBuZXh0UHJvcHMudmVydGljYWxcclxuICAgICAgfHwgY3VyUHJvcHMuc2l6ZSAhPT0gbmV4dFByb3BzLnNpemVcclxuICB9XHJcbiAgZ2V0U2l6ZSgpIHtcclxuICAgIGNvbnN0IGNvbnRhaW5lciA9IHRoaXMucmVmcy5jb250YWluZXJcclxuICAgIGlmIChjb250YWluZXIpIHtcclxuICAgICAgcmV0dXJuIHRoaXMucHJvcHMudmVydGljYWwgPyBjb250YWluZXIud2lkdGgoKSA6IGNvbnRhaW5lci5oZWlnaHQoKVxyXG4gICAgfVxyXG4gIH1cclxuICByZW5kZXIoKSB7XHJcbiAgICBjb25zdCB7IGN1cnJlbnQsIHZlcnRpY2FsLCBzaXplIH0gPSB0aGlzLnByb3BzXHJcbiAgICBjb25zdCBzdHlsZSA9IHtcclxuICAgICAgLi4uY3VycmVudCAmJiBjdXJyZW50LnN0eWxlLFxyXG4gICAgICB3aWR0aDogdmVydGljYWwgPyAoc2l6ZSArIFwiJVwiKSA6IFwiYXV0b1wiLFxyXG4gICAgICBoZWlnaHQ6IHZlcnRpY2FsID8gXCJhdXRvXCIgOiAoc2l6ZSArIFwiJVwiKSxcclxuICAgIH1cclxuXHJcbiAgICBpZiAoY3VycmVudCkge1xyXG4gICAgICByZXR1cm4gKDxBcHBsaWNhdGlvbi5XaW5kb3dDb250YWluZXJcclxuICAgICAgICByZWY9XCJjb250YWluZXJcIlxyXG4gICAgICAgIGNsYXNzTmFtZT1cIldORF9wYW5lbF9jb250YWluZXJfc2lkZVwiXHJcbiAgICAgICAgc3R5bGU9eyBzdHlsZSB9XHJcbiAgICAgICAgY3VycmVudD17IGN1cnJlbnQgfVxyXG4gICAgICAgICAgICAgIC8+KVxyXG4gICAgfVxyXG4gICAgZWxzZSB7XHJcbiAgICAgIHJldHVybiBudWxsXHJcbiAgICB9XHJcbiAgfVxyXG59XHJcblxyXG50eXBlIENlbnRlclBhbmVsQ29udGFpbmVyUHJvcHNUeXBlID0ge1xyXG4gIGN1cnJlbnQ6IFdpbmRvd0luc3RhbmNlLFxyXG59XHJcblxyXG5jbGFzcyBDZW50ZXJQYW5lbENvbnRhaW5lciBleHRlbmRzIENvbXBvbmVudCB7XHJcbiAgcHJvcHM6IENlbnRlclBhbmVsQ29udGFpbmVyUHJvcHNUeXBlXHJcbiAgY29tcG9uZW50V2lsbE1vdW50KCkge1xyXG4gIH1cclxuICBzaG91bGRDb21wb25lbnRVcGRhdGUobmV4dFByb3BzKSB7XHJcbiAgICBjb25zdCBjdXJQcm9wcyA9IHRoaXMucHJvcHNcclxuICAgIHJldHVybiBjdXJQcm9wcy5jdXJyZW50ICE9PSBuZXh0UHJvcHMuY3VycmVudFxyXG4gIH1cclxuICByZW5kZXJCYWNrU2NyZWVuKCkge1xyXG4gICAgY29uc3QgbGF5b3V0ID0gQXBwbGljYXRpb24ubGF5b3V0XHJcbiAgICByZXR1cm4gKDxkaXYgY2xhc3NOYW1lPVwiV05EX3BhbmVsX2NvbnRhaW5lcl9jZW50ZXIgb3ZlcmZsb3ctYXV0b1wiPlxyXG4gICAgICB7bGF5b3V0LnNwbGFzaENvbXBvbmVudCAmJiA8bGF5b3V0LnNwbGFzaENvbXBvbmVudCAvPn1cclxuICAgIDwvZGl2PilcclxuICB9XHJcbiAgcmVuZGVyKCkge1xyXG4gICAgY29uc3QgY3VycmVudCA9IHRoaXMucHJvcHMuY3VycmVudFxyXG4gICAgaWYgKGN1cnJlbnQpIHtcclxuICAgICAgcmV0dXJuICg8QXBwbGljYXRpb24uV2luZG93Q29udGFpbmVyXHJcbiAgICAgICAgY3VycmVudD17IGN1cnJlbnQgfVxyXG4gICAgICAgIGNsYXNzTmFtZT1cIldORF9wYW5lbF9jb250YWluZXJfY2VudGVyXCJcclxuICAgICAgICAgICAgICAvPilcclxuICAgIH1cclxuICAgIGVsc2Uge1xyXG4gICAgICByZXR1cm4gdGhpcy5yZW5kZXJCYWNrU2NyZWVuKClcclxuICAgIH1cclxuICB9XHJcbn1cclxuXHJcbi8qKiAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcclxuKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXHJcbioqKiBQYW5lbHNcclxuKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXHJcbioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKi9cclxuXHJcbmNvbnN0IENTU19zaWRlX3BhbmVsX3ZlcnRpY2FsID0gXCJXTkRfc2lkZV9wYW5lbCBXTkRfc2lkZV9wYW5lbF9WXCJcclxuY29uc3QgQ1NTX3NpZGVfcGFuZWxfaG9yaXpvbnRhbCA9IFwiV05EX3NpZGVfcGFuZWwgV05EX3NpZGVfcGFuZWxfSFwiXHJcblxyXG50eXBlIFByb3BzVHlwZSA9IHtcclxuICBwYW5lbDogUGFuZWxQcm9wcyxcclxuICBmcmFtZTogRnJhbWUsXHJcbiAgY2hpbGRyZW46IGFueSxcclxufVxyXG5cclxuY2xhc3MgU2lkZVBhbmVsIGV4dGVuZHMgQ29tcG9uZW50IHtcclxuICBwcm9wczogUHJvcHNUeXBlXHJcbiAgc2hvdWxkQ29tcG9uZW50VXBkYXRlKG5leHRQcm9wcykge1xyXG4gICAgY29uc3QgY3VyUHJvcHMgPSB0aGlzLnByb3BzXHJcbiAgICByZXR1cm4gY3VyUHJvcHMucGFuZWwgIT09IG5leHRQcm9wcy5wYW5lbFxyXG4gICAgICB8fCBjdXJQcm9wcy5mcmFtZSAhPT0gbmV4dFByb3BzLmZyYW1lXHJcbiAgICAgIHx8IGN1clByb3BzLmNoaWxkcmVuICE9PSBuZXh0UHJvcHMuY2hpbGRyZW5cclxuICB9XHJcbiAgaGFuZGxlUmVzaXplID0gKGRlbHRhKSA9PiB7XHJcbiAgICBjb25zdCBjc2l6ZSA9IHRoaXMucmVmcy5jb250YWluZXIuZ2V0U2l6ZSgpXHJcbiAgICBpZiAoY3NpemUgIT09IHVuZGVmaW5lZCkge1xyXG4gICAgICBsZXQgc2l6ZSA9IHRoaXMucHJvcHMucGFuZWwuc2l6ZVxyXG4gICAgICBzaXplICs9IE1hdGgubWF4KHNpemUsIDEpICogZGVsdGEgLyBNYXRoLm1heChjc2l6ZSwgMSlcclxuICAgICAgc2l6ZSA9IE1hdGgubWluKE1hdGgubWF4KHNpemUsIDApLCAxMDApXHJcbiAgICAgIHRoaXMucHJvcHMuZnJhbWUubm90aWZ5UGFuZWxSZXNpemUodGhpcy5wcm9wcy5wYW5lbCwgc2l6ZSlcclxuICAgIH1cclxuICB9XHJcbn1cclxuXHJcbmV4cG9ydCBjbGFzcyBTaWRlUGFuZWxUb3AgZXh0ZW5kcyBTaWRlUGFuZWwge1xyXG4gIHRyYW5zZm9ybURlbHRhKGUpIHtcclxuICAgIHJldHVybiBlLmRlbHRhWVxyXG4gIH1cclxuICByZW5kZXIoKSB7XHJcbiAgICBjb25zdCB7IHBhbmVsLCBmcmFtZSB9ID0gdGhpcy5wcm9wc1xyXG4gICAgY29uc3Qgc2l6ZSA9IHBhbmVsLmN1cnJlbnQgPyBwYW5lbC5zaXplIDogMFxyXG4gICAgcmV0dXJuICg8ZGl2IGNsYXNzTmFtZT17IENTU19zaWRlX3BhbmVsX2hvcml6b250YWwgfT5cclxuICAgICAgPFBhbmVsQmFyIHBhbmVsPXsgcGFuZWwgfSBmcmFtZT17IGZyYW1lIH0gLz5cclxuICAgICAgPFNpZGVQYW5lbENvbnRhaW5lciByZWY9eyBcImNvbnRhaW5lclwiIH0gY3VycmVudD17IHBhbmVsLmN1cnJlbnQgfSBzaXplPXsgc2l6ZSB9IC8+XHJcbiAgICAgIDxQYW5lbFJlc2l6ZXIgb25SZXNpemU9eyB0aGlzLmhhbmRsZVJlc2l6ZSB9IHRyYW5zZm9ybURlbHRhPXsgdGhpcy50cmFuc2Zvcm1EZWx0YSB9IC8+XHJcbiAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmxleC1oZWlnaHQtMTAwXCI+e3RoaXMucHJvcHMuY2hpbGRyZW59PC9kaXY+XHJcbiAgICA8L2Rpdj4pXHJcbiAgfVxyXG59XHJcblxyXG5leHBvcnQgY2xhc3MgU2lkZVBhbmVsQm90dG9tIGV4dGVuZHMgU2lkZVBhbmVsIHtcclxuICB0cmFuc2Zvcm1EZWx0YShlKSB7XHJcbiAgICByZXR1cm4gLWUuZGVsdGFZXHJcbiAgfVxyXG4gIHJlbmRlcigpIHtcclxuICAgIGNvbnN0IHsgcGFuZWwsIGZyYW1lIH0gPSB0aGlzLnByb3BzXHJcbiAgICBjb25zdCBzaXplID0gcGFuZWwuY3VycmVudCA/IHBhbmVsLnNpemUgOiAwXHJcbiAgICByZXR1cm4gKDxkaXYgY2xhc3NOYW1lPXsgQ1NTX3NpZGVfcGFuZWxfaG9yaXpvbnRhbCB9PlxyXG4gICAgICA8ZGl2IGNsYXNzTmFtZT1cImZsZXgtaGVpZ2h0LTEwMFwiPnt0aGlzLnByb3BzLmNoaWxkcmVufTwvZGl2PlxyXG4gICAgICA8UGFuZWxSZXNpemVyIG9uUmVzaXplPXsgdGhpcy5oYW5kbGVSZXNpemUgfSB0cmFuc2Zvcm1EZWx0YT17IHRoaXMudHJhbnNmb3JtRGVsdGEgfSAvPlxyXG4gICAgICA8UGFuZWxCYXIgcGFuZWw9eyBwYW5lbCB9IGZyYW1lPXsgZnJhbWUgfSAvPlxyXG4gICAgICA8U2lkZVBhbmVsQ29udGFpbmVyIHJlZj17IFwiY29udGFpbmVyXCIgfSBjdXJyZW50PXsgcGFuZWwuY3VycmVudCB9IHNpemU9eyBzaXplIH0gLz5cclxuICAgIDwvZGl2PilcclxuICB9XHJcbn1cclxuXHJcbmV4cG9ydCBjbGFzcyBTaWRlUGFuZWxMZWZ0IGV4dGVuZHMgU2lkZVBhbmVsIHtcclxuICB0cmFuc2Zvcm1EZWx0YShlKSB7XHJcbiAgICByZXR1cm4gZS5kZWx0YVhcclxuICB9XHJcbiAgcmVuZGVyKCkge1xyXG4gICAgY29uc3QgeyBwYW5lbCwgZnJhbWUgfSA9IHRoaXMucHJvcHNcclxuICAgIGNvbnN0IHNpemUgPSBwYW5lbC5jdXJyZW50ID8gcGFuZWwuc2l6ZSA6IDBcclxuICAgIHJldHVybiAoPGRpdiBjbGFzc05hbWU9eyBDU1Nfc2lkZV9wYW5lbF92ZXJ0aWNhbCB9PlxyXG4gICAgICA8UGFuZWxCYXIgdmVydGljYWwgcGFuZWw9eyBwYW5lbCB9IGZyYW1lPXsgZnJhbWUgfSAvPlxyXG4gICAgICA8U2lkZVBhbmVsQ29udGFpbmVyIHJlZj17IFwiY29udGFpbmVyXCIgfSB2ZXJ0aWNhbCBjdXJyZW50PXsgcGFuZWwuY3VycmVudCB9IHNpemU9eyBzaXplIH0gLz5cclxuICAgICAgPFBhbmVsUmVzaXplciB2ZXJ0aWNhbCBvblJlc2l6ZT17IHRoaXMuaGFuZGxlUmVzaXplIH0gdHJhbnNmb3JtRGVsdGE9eyB0aGlzLnRyYW5zZm9ybURlbHRhIH0gLz5cclxuICAgICAgPGRpdiBjbGFzc05hbWU9XCJmbGV4LTFcIj57dGhpcy5wcm9wcy5jaGlsZHJlbn08L2Rpdj5cclxuICAgIDwvZGl2PilcclxuICB9XHJcbn1cclxuXHJcbmV4cG9ydCBjbGFzcyBTaWRlUGFuZWxSaWdodCBleHRlbmRzIFNpZGVQYW5lbCB7XHJcbiAgdHJhbnNmb3JtRGVsdGEoZSkge1xyXG4gICAgcmV0dXJuIC1lLmRlbHRhWFxyXG4gIH1cclxuICByZW5kZXIoKSB7XHJcbiAgICBjb25zdCB7IHBhbmVsLCBmcmFtZSB9ID0gdGhpcy5wcm9wc1xyXG4gICAgY29uc3Qgc2l6ZSA9IHBhbmVsLmN1cnJlbnQgPyBwYW5lbC5zaXplIDogMFxyXG4gICAgcmV0dXJuICg8ZGl2IGNsYXNzTmFtZT17IENTU19zaWRlX3BhbmVsX3ZlcnRpY2FsIH0+XHJcbiAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmxleC13aWR0aC0xMDBcIj57dGhpcy5wcm9wcy5jaGlsZHJlbn08L2Rpdj5cclxuICAgICAgPFBhbmVsUmVzaXplciB2ZXJ0aWNhbCBvblJlc2l6ZT17IHRoaXMuaGFuZGxlUmVzaXplIH0gdHJhbnNmb3JtRGVsdGE9eyB0aGlzLnRyYW5zZm9ybURlbHRhIH0gLz5cclxuICAgICAgPFNpZGVQYW5lbENvbnRhaW5lciByZWY9eyBcImNvbnRhaW5lclwiIH0gdmVydGljYWwgY3VycmVudD17IHBhbmVsLmN1cnJlbnQgfSBzaXplPXsgc2l6ZSB9IC8+XHJcbiAgICAgIDxQYW5lbEJhciB2ZXJ0aWNhbCBwYW5lbD17IHBhbmVsIH0gZnJhbWU9eyBmcmFtZSB9IC8+XHJcbiAgICA8L2Rpdj4pXHJcbiAgfVxyXG59XHJcblxyXG5leHBvcnQgY2xhc3MgQ2VudGVyUGFuZWxUb3AgZXh0ZW5kcyBTaWRlUGFuZWxUb3Age1xyXG4gIHJlbmRlcigpIHtcclxuICAgIGNvbnN0IHsgcGFuZWwsIGZyYW1lIH0gPSB0aGlzLnByb3BzXHJcbiAgICByZXR1cm4gKDxkaXYgY2xhc3NOYW1lPXsgQ1NTX3NpZGVfcGFuZWxfaG9yaXpvbnRhbCB9PlxyXG4gICAgICA8UGFuZWxCYXIgcGFuZWw9eyBwYW5lbCB9IGZyYW1lPXsgZnJhbWUgfSAvPlxyXG4gICAgICA8Q2VudGVyUGFuZWxDb250YWluZXIgcmVmPXsgXCJjb250YWluZXJcIiB9IGN1cnJlbnQ9eyBwYW5lbC5jdXJyZW50IH0gLz5cclxuICAgIDwvZGl2PilcclxuICB9XHJcbn1cclxuIl19