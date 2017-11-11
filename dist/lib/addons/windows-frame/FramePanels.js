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
    key: "render",
    value: function render() {
      var current = this.props.current;
      if (current) {
        return _react2.default.createElement(_application.Application.WindowContainer, {
          current: current,
          className: "WND_panel_container_center"
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9saWIvYWRkb25zL3dpbmRvd3MtZnJhbWUvRnJhbWVQYW5lbHMuanMiXSwibmFtZXMiOlsiQ1NTX3BhbmVsX2Jhcl9ob3Jpem9udGFsIiwiYmFyIiwibWVudV9idG4iLCJpdGVtX2J1dHRvbiIsIml0ZW1fYnV0dG9uX0NVUlJFTlQiLCJpdGVtX2J1dHRvbl90cmFuc2Zvcm0iLCJDU1NfcGFuZWxfYmFyX3ZlcnRpY2FsIiwiUGFuZWxCdXR0b24iLCJoYW5kbGVDbGljayIsInByb3BzIiwiaXRlbSIsInBhbmVsIiwiZnJhbWUiLCJjdXJyZW50IiwiaGlkZVdpbmRvdyIsImlkIiwic2hvd1dpbmRvdyIsImhhbmRsZURyYWdXaW5kb3ciLCJoYW5kbGVEcmFnT3ZlciIsImUiLCJkYXRhVHJhbnNmZXIiLCJ0eXBlcyIsImZpbmQiLCJ4IiwiaGFuZGxlQ2xvc2UiLCJidXR0b24iLCJsYXlvdXQiLCJyZW1vdmVXaW5kb3ciLCJjc3MiLCJ0cmFuc2Zvcm0iLCJpY29uIiwidGl0bGUiLCJQYW5lbEJhciIsImhhbmRsZURyb3BXaW5kb3ciLCJkYXRhIiwid25kIiwiZ2V0V2luZG93SW5zdGFuY2UiLCJ3aW5kb3ciLCJkb2NrV2luZG93IiwibmV4dFByb3BzIiwiY3VyUHJvcHMiLCJpdGVtcyIsInZlcnRpY2FsIiwiY2xvc2UiLCJtZW51IiwicmVuZGVyTWVudSIsIm1hcCIsImkiLCJDU1NfcGFuZWxfcmVzaXplcl92ZXJ0aWNhbCIsIkNTU19wYW5lbF9yZXNpemVyX2hvcml6b250YWwiLCJQYW5lbFJlc2l6ZXIiLCJoYW5kbGVNb3VzZURvd24iLCJ0YXJnZXQiLCJoYW5kbGVNb3VzZUdyYWIiLCJvblJlc2l6ZSIsInRyYW5zZm9ybURlbHRhIiwiU2lkZVBhbmVsQ29udGFpbmVyIiwic2l6ZSIsImNvbnRhaW5lciIsInJlZnMiLCJ3aWR0aCIsImhlaWdodCIsInN0eWxlIiwiQ2VudGVyUGFuZWxDb250YWluZXIiLCJTcGxhc2hDb21wb25lbnQiLCJzcGxhc2hDb21wb25lbnQiLCJDU1Nfc2lkZV9wYW5lbF92ZXJ0aWNhbCIsIkNTU19zaWRlX3BhbmVsX2hvcml6b250YWwiLCJTaWRlUGFuZWwiLCJoYW5kbGVSZXNpemUiLCJkZWx0YSIsImNzaXplIiwiZ2V0U2l6ZSIsInVuZGVmaW5lZCIsIk1hdGgiLCJtYXgiLCJtaW4iLCJub3RpZnlQYW5lbFJlc2l6ZSIsImNoaWxkcmVuIiwiU2lkZVBhbmVsVG9wIiwiZGVsdGFZIiwiU2lkZVBhbmVsQm90dG9tIiwiU2lkZVBhbmVsTGVmdCIsImRlbHRhWCIsIlNpZGVQYW5lbFJpZ2h0IiwiQ2VudGVyUGFuZWxUb3AiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7O0FBRUE7Ozs7QUFFQTs7QUFDQTs7QUFDQTs7QUFFQTs7QUFDQTs7Ozs7Ozs7OzsrZUFUQTtBQUNBOzs7QUFpQkE7Ozs7OztBQU1BLElBQU1BLDJCQUEyQjtBQUMvQkMsT0FBSywrQkFEMEI7QUFFL0JDLFlBQVUsNkRBRnFCO0FBRy9CQyxlQUFhLHFDQUhrQjtBQUkvQkMsdUJBQXFCLDhEQUpVO0FBSy9CQyx5QkFBdUI7QUFMUSxDQUFqQzs7QUFRQSxJQUFNQyx5QkFBeUI7QUFDN0JMLE9BQUssK0JBRHdCO0FBRTdCQyxZQUFVLCtEQUZtQjtBQUc3QkMsZUFBYSxxQ0FIZ0I7QUFJN0JDLHVCQUFxQiw4REFKUTtBQUs3QkMseUJBQXVCO0FBTE0sQ0FBL0I7O0lBZU1FLFc7Ozs7Ozs7Ozs7Ozs7O2dNQUVKQyxXLEdBQWMsWUFBTTtBQUFBLHdCQUNhLE1BQUtDLEtBRGxCO0FBQUEsVUFDVkMsSUFEVSxlQUNWQSxJQURVO0FBQUEsVUFDSkMsS0FESSxlQUNKQSxLQURJO0FBQUEsVUFDR0MsS0FESCxlQUNHQSxLQURIOztBQUVsQixVQUFJRixTQUFTQyxNQUFNRSxPQUFuQixFQUE0QkQsTUFBTUUsVUFBTixDQUFpQkosS0FBS0ssRUFBdEIsRUFBNUIsS0FDS0gsTUFBTUksVUFBTixDQUFpQk4sS0FBS0ssRUFBdEI7QUFDTixLLFFBQ0RFLGdCLEdBQW1C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QUFNLFdBQTVCLEVBQTBDLFNBQVVELE1BQU1FLE9BQTFEO0FBRk0sT0FBUjtBQUlEOzs7O0VBUGlDa0UsWSIsImZpbGUiOiJGcmFtZVBhbmVscy5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8qIGVzbGludC1kaXNhYmxlIHJlYWN0L25vLW11bHRpLWNvbXAgKi9cclxuLyogZXNsaW50LWRpc2FibGUgcmVhY3Qvbm8tc3RyaW5nLXJlZnMgKi9cclxuaW1wb3J0IFJlYWN0LCB7IENvbXBvbmVudCB9IGZyb20gXCJyZWFjdFwiXHJcblxyXG5pbXBvcnQgeyBEcm9wWm9uZSwgRHJhZ1pvbmUgfSBmcm9tIFwiLi4vLi4vdWktbW9kdWxlcy9EcmFnQW5kRHJvcFwiXHJcbmltcG9ydCB7IEh0bWxHcmFiUmVhY3Rpb24sIHN0b3BFdmVudCB9IGZyb20gXCIuLi8uLi91aS1tb2R1bGVzL2V2ZW50LnV0aWxzXCJcclxuaW1wb3J0IHsgQXBwbGljYXRpb24gfSBmcm9tIFwiLi4vLi4vYXBwbGljYXRpb25cIlxyXG5cclxuaW1wb3J0IHsgQnV0dG9uUG9wdXAgfSBmcm9tIFwiLi9GcmFtZVBvcHVwXCJcclxuaW1wb3J0IEZyYW1lTWVudSBmcm9tIFwiLi9GcmFtZU1lbnVcIlxyXG5cclxuZXhwb3J0IHR5cGUgUGFuZWxQcm9wcyA9IHtcclxuICBpZDogRG9ja0lELFxyXG4gIHNpemU6IG51bWJlcixcclxuICBjdXJyZW50OiBXaW5kb3dJbnN0YW5jZSxcclxuICBpdGVtczogQXJyYXk8V2luZG93SW5zdGFuY2U+LFxyXG59XHJcblxyXG4vKiogKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXHJcbioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxyXG4qKiogUGFuZWwgQmFyXHJcbioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxyXG4qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiovXHJcblxyXG5jb25zdCBDU1NfcGFuZWxfYmFyX2hvcml6b250YWwgPSB7XHJcbiAgYmFyOiBcIldORF9wYW5lbF9iYXIgV05EX3BhbmVsX2Jhcl9IXCIsXHJcbiAgbWVudV9idG46IFwiV05EX3BhbmVsX21lbnVfYnRuIFdORF9wYW5lbF9tZW51X2J0bl9IIFdORF9jZW50ZXJfdmVydGljYWxcIixcclxuICBpdGVtX2J1dHRvbjogXCJXTkRfcGFuZWxfYnV0dG9uIFdORF9wYW5lbF9idXR0b25fSFwiLFxyXG4gIGl0ZW1fYnV0dG9uX0NVUlJFTlQ6IFwiV05EX3BhbmVsX2J1dHRvbiBXTkRfcGFuZWxfYnV0dG9uX0ggV05EX3BhbmVsX2J1dHRvbi1jdXJyZW50XCIsXHJcbiAgaXRlbV9idXR0b25fdHJhbnNmb3JtOiBcInJvdGF0ZSgwZGVnKVwiLFxyXG59XHJcblxyXG5jb25zdCBDU1NfcGFuZWxfYmFyX3ZlcnRpY2FsID0ge1xyXG4gIGJhcjogXCJXTkRfcGFuZWxfYmFyIFdORF9wYW5lbF9iYXJfVlwiLFxyXG4gIG1lbnVfYnRuOiBcIldORF9wYW5lbF9tZW51X2J0biBXTkRfcGFuZWxfbWVudV9idG5fViBXTkRfY2VudGVyX2hvcml6b250YWxcIixcclxuICBpdGVtX2J1dHRvbjogXCJXTkRfcGFuZWxfYnV0dG9uIFdORF9wYW5lbF9idXR0b25fVlwiLFxyXG4gIGl0ZW1fYnV0dG9uX0NVUlJFTlQ6IFwiV05EX3BhbmVsX2J1dHRvbiBXTkRfcGFuZWxfYnV0dG9uX1YgV05EX3BhbmVsX2J1dHRvbi1jdXJyZW50XCIsXHJcbiAgaXRlbV9idXR0b25fdHJhbnNmb3JtOiBcInJvdGF0ZSgtOTBkZWcpXCIsXHJcbn1cclxuXHJcbnR5cGUgUGFuZWxCdXR0b25Qcm9wc1R5cGUgPSB7XHJcbiAgcGFuZWw6IFBhbmVsUHJvcHMsXHJcbiAgZnJhbWU6IEZyYW1lLFxyXG4gIGl0ZW06IFdpbmRvd0luc3RhbmNlLFxyXG4gIGNzczogYW55LFxyXG59XHJcblxyXG5jbGFzcyBQYW5lbEJ1dHRvbiBleHRlbmRzIENvbXBvbmVudCB7XHJcbiAgcHJvcHM6IFBhbmVsQnV0dG9uUHJvcHNUeXBlXHJcbiAgaGFuZGxlQ2xpY2sgPSAoKSA9PiB7XHJcbiAgICBjb25zdCB7IGl0ZW0sIHBhbmVsLCBmcmFtZSB9ID0gdGhpcy5wcm9wc1xyXG4gICAgaWYgKGl0ZW0gPT09IHBhbmVsLmN1cnJlbnQpIGZyYW1lLmhpZGVXaW5kb3coaXRlbS5pZClcclxuICAgIGVsc2UgZnJhbWUuc2hvd1dpbmRvdyhpdGVtLmlkKVxyXG4gIH1cclxuICBoYW5kbGVEcmFnV2luZG93ID0gKCkgPT4ge1xyXG4gICAgcmV0dXJuIHtcclxuICAgICAgXCJ3aW5kb3dcIjoge1xyXG4gICAgICAgIGlkOiB0aGlzLnByb3BzLml0ZW0uaWQsXHJcbiAgICAgIH0sXHJcbiAgICB9XHJcbiAgfVxyXG4gIGhhbmRsZURyYWdPdmVyID0gKGUpID0+IHtcclxuICAgIGNvbnN0IHsgaXRlbSwgcGFuZWwgfSA9IHRoaXMucHJvcHNcclxuICAgIGlmIChlLmRhdGFUcmFuc2ZlciAmJiBlLmRhdGFUcmFuc2Zlci50eXBlcy5maW5kKHggPT4geCA9PT0gXCJ3aW5kb3dcIikpIHtcclxuICAgICAgcmV0dXJuIHRydWVcclxuICAgIH1cclxuICAgIGVsc2Uge1xyXG4gICAgICBpZiAocGFuZWwuY3VycmVudCAhPT0gaXRlbSkge1xyXG4gICAgICAgIHRoaXMuaGFuZGxlQ2xpY2soKVxyXG4gICAgICB9XHJcbiAgICAgIHJldHVybiBmYWxzZVxyXG4gICAgfVxyXG4gIH1cclxuICBoYW5kbGVDbG9zZSA9IChlKSA9PiB7XHJcbiAgICBpZiAoZS5idXR0b24gPT09IDEpIHtcclxuICAgICAgc3RvcEV2ZW50KGUpXHJcbiAgICAgIGNvbnN0IGl0ZW0gPSB0aGlzLnByb3BzLml0ZW1cclxuICAgICAgQXBwbGljYXRpb24ubGF5b3V0LnJlbW92ZVdpbmRvdyhpdGVtLmlkKVxyXG4gICAgfVxyXG4gIH1cclxuICByZW5kZXIoKSB7XHJcbiAgICBjb25zdCB7IGl0ZW0sIHBhbmVsLCBjc3MgfSA9IHRoaXMucHJvcHNcclxuICAgIHJldHVybiAoXHJcbiAgICAgIDxEcmFnWm9uZVxyXG4gICAgICAgIGNsYXNzTmFtZT17IHBhbmVsLmN1cnJlbnQgPT09IGl0ZW0gPyBjc3MuaXRlbV9idXR0b25fQ1VSUkVOVCA6IGNzcy5pdGVtX2J1dHRvbiB9XHJcbiAgICAgICAgb25EcmFnU3RhcnQ9eyB0aGlzLmhhbmRsZURyYWdXaW5kb3cgfVxyXG4gICAgICAgIG9uRHJhZ092ZXI9eyB0aGlzLmhhbmRsZURyYWdPdmVyIH1cclxuICAgICAgICBvbkNsaWNrPXsgdGhpcy5oYW5kbGVDbGljayB9XHJcbiAgICAgICAgb25Nb3VzZURvd249eyB0aGlzLmhhbmRsZUNsb3NlIH1cclxuICAgICAgPlxyXG4gICAgICAgIDxkaXYgc3R5bGU9e3sgdHJhbnNmb3JtOiBjc3MuaXRlbV9idXR0b25fdHJhbnNmb3JtIH19PlxyXG4gICAgICAgICAge2l0ZW0uaWNvbiAmJiA8c3BhbiBjbGFzc05hbWU9eyBcInBhZGRpbmctcmlnaHQgZmEgZmEtXCIgKyBpdGVtLmljb24gfSAvPn1cclxuICAgICAgICAgIHtpdGVtLnRpdGxlfVxyXG4gICAgICAgIDwvZGl2PlxyXG4gICAgICA8L0RyYWdab25lPilcclxuICB9XHJcbn1cclxuXHJcbnR5cGUgUGFuZWxCYXJQcm9wc1R5cGUgPSB7XHJcbiAgcGFuZWw6IFBhbmVsUHJvcHMsXHJcbiAgZnJhbWU6IEZyYW1lLFxyXG4gIHZlcnRpY2FsOiBib29sZWFuLFxyXG59XHJcblxyXG5jbGFzcyBQYW5lbEJhciBleHRlbmRzIENvbXBvbmVudCB7XHJcbiAgcHJvcHM6IFBhbmVsQmFyUHJvcHNUeXBlXHJcbiAgc2hvdWxkQ29tcG9uZW50VXBkYXRlKG5leHRQcm9wcykge1xyXG4gICAgY29uc3QgY3VyUHJvcHMgPSB0aGlzLnByb3BzXHJcbiAgICBpZiAoY3VyUHJvcHMucGFuZWwgIT09IG5leHRQcm9wcy5wYW5lbCkge1xyXG4gICAgICBpZiAoY3VyUHJvcHMucGFuZWwuaXRlbXMgIT09IG5leHRQcm9wcy5wYW5lbC5pdGVtc1xyXG4gICAgICAgIHx8IGN1clByb3BzLnBhbmVsLmN1cnJlbnQgIT09IG5leHRQcm9wcy5wYW5lbC5jdXJyZW50KVxyXG4gICAgICAgIHJldHVybiB0cnVlXHJcbiAgICB9XHJcbiAgICByZXR1cm4gY3VyUHJvcHMuZnJhbWUgIT09IG5leHRQcm9wcy5mcmFtZVxyXG4gICAgICB8fCBjdXJQcm9wcy52ZXJ0aWNhbCAhPT0gbmV4dFByb3BzLnZlcnRpY2FsXHJcbiAgfVxyXG4gIGhhbmRsZURyb3BXaW5kb3cgPSAoZGF0YSkgPT4ge1xyXG4gICAgaWYgKGRhdGFbXCJ3aW5kb3dcIl0pIHtcclxuICAgICAgY29uc3Qgd25kID0gQXBwbGljYXRpb24ubGF5b3V0LmdldFdpbmRvd0luc3RhbmNlKGRhdGEud2luZG93LmlkKVxyXG4gICAgICB3bmQgJiYgQXBwbGljYXRpb24ubGF5b3V0LmRvY2tXaW5kb3cod25kLCB0aGlzLnByb3BzLnBhbmVsLmlkLCB0cnVlKVxyXG4gICAgfVxyXG4gIH1cclxuICByZW5kZXJNZW51KGNsb3NlKSB7XHJcbiAgICByZXR1cm4gKDxGcmFtZU1lbnUgY2xvc2U9eyBjbG9zZSB9IC8+KVxyXG4gIH1cclxuICByZW5kZXIoKSB7XHJcbiAgICBjb25zdCB7IHBhbmVsLCBmcmFtZSwgdmVydGljYWwgfSA9IHRoaXMucHJvcHNcclxuICAgIGNvbnN0IGNzcyA9IHZlcnRpY2FsID8gQ1NTX3BhbmVsX2Jhcl92ZXJ0aWNhbCA6IENTU19wYW5lbF9iYXJfaG9yaXpvbnRhbFxyXG5cclxuICAgIC8vIEJhciByZW5kZXJcclxuICAgIHJldHVybiAoPERyb3Bab25lIG9uRHJvcD17IHRoaXMuaGFuZGxlRHJvcFdpbmRvdyB9IGNsYXNzTmFtZT17IGNzcy5iYXIgfT5cclxuICAgICAge3BhbmVsLm1lbnUgJiYgPEJ1dHRvblBvcHVwIGNsYXNzTmFtZT17IGNzcy5tZW51X2J0biArIFwiIGZhIGZhLWNhcmV0LWRvd25cIiB9IHJlbmRlcj17IHRoaXMucmVuZGVyTWVudSB9IC8+fVxyXG4gICAgICB7cGFuZWwuaXRlbXMubWFwKChpdGVtLCBpKSA9PiB7XHJcbiAgICAgICAgcmV0dXJuICg8UGFuZWxCdXR0b24ga2V5PXsgaSB9IGNzcz17IGNzcyB9IGl0ZW09eyBpdGVtIH0gcGFuZWw9eyBwYW5lbCB9IGZyYW1lPXsgZnJhbWUgfSAvPilcclxuICAgICAgfSl9XHJcbiAgICA8L0Ryb3Bab25lPilcclxuICB9XHJcbn1cclxuXHJcbi8qKiAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcclxuKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXHJcbioqKiBQYW5lbCBSZXNpemVyXHJcbioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxyXG4qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiovXHJcblxyXG5jb25zdCBDU1NfcGFuZWxfcmVzaXplcl92ZXJ0aWNhbCA9IFwiV05EX3BhbmVsX3Jlc2l6ZXIgV05EX3BhbmVsX3Jlc2l6ZXJfVlwiXHJcbmNvbnN0IENTU19wYW5lbF9yZXNpemVyX2hvcml6b250YWwgPSBcIldORF9wYW5lbF9yZXNpemVyIFdORF9wYW5lbF9yZXNpemVyX0hcIlxyXG5cclxuZXhwb3J0IHR5cGUgUGFuZWxSZXNpemVyUHJvcHNUeXBlID0ge1xyXG4gIHZlcnRpY2FsOiBib29sZWFuLFxyXG4gIHRyYW5zZm9ybURlbHRhOiBGdW5jdGlvbixcclxuICBvblJlc2l6ZTogRnVuY3Rpb24sXHJcbn1cclxuXHJcbmV4cG9ydCBjbGFzcyBQYW5lbFJlc2l6ZXIgZXh0ZW5kcyBDb21wb25lbnQge1xyXG4gIHByb3BzOiBQYW5lbFJlc2l6ZXJQcm9wc1R5cGVcclxuICBoYW5kbGVNb3VzZURvd24gPSAoZSkgPT4ge1xyXG4gICAgbmV3IEh0bWxHcmFiUmVhY3Rpb24oZS50YXJnZXQsIGUsIHRoaXMuaGFuZGxlTW91c2VHcmFiKVxyXG4gIH1cclxuICBoYW5kbGVNb3VzZUdyYWIgPSAoZSkgPT4ge1xyXG4gICAgdGhpcy5wcm9wcy5vblJlc2l6ZSh0aGlzLnByb3BzLnRyYW5zZm9ybURlbHRhKGUpKVxyXG4gIH1cclxuICByZW5kZXIoKSB7XHJcbiAgICByZXR1cm4gKDxkaXZcclxuICAgICAgY2xhc3NOYW1lPXsgdGhpcy5wcm9wcy52ZXJ0aWNhbCA/IENTU19wYW5lbF9yZXNpemVyX3ZlcnRpY2FsIDogQ1NTX3BhbmVsX3Jlc2l6ZXJfaG9yaXpvbnRhbCB9XHJcbiAgICAgIG9uTW91c2VEb3duPXsgdGhpcy5oYW5kbGVNb3VzZURvd24gfVxyXG4gICAgICAgICAgICAvPilcclxuICB9XHJcbn1cclxuXHJcbi8qKiAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcclxuKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXHJcbioqKiBQYW5lbCBDb250YWluZXJcclxuKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXHJcbioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKi9cclxuXHJcbnR5cGUgU2lkZVBhbmVsQ29udGFpbmVyUHJvcHNUeXBlID0ge1xyXG4gIGN1cnJlbnQ6IFdpbmRvd0luc3RhbmNlLFxyXG4gIHZlcnRpY2FsOiBib29sZWFuLFxyXG4gIHNpemU6IG51bWJlcixcclxufVxyXG5cclxuY2xhc3MgU2lkZVBhbmVsQ29udGFpbmVyIGV4dGVuZHMgQ29tcG9uZW50IHtcclxuICBwcm9wczogU2lkZVBhbmVsQ29udGFpbmVyUHJvcHNUeXBlXHJcbiAgY29tcG9uZW50V2lsbE1vdW50KCkge1xyXG4gIH1cclxuICBzaG91bGRDb21wb25lbnRVcGRhdGUobmV4dFByb3BzKSB7XHJcbiAgICBjb25zdCBjdXJQcm9wcyA9IHRoaXMucHJvcHNcclxuICAgIHJldHVybiBjdXJQcm9wcy5jdXJyZW50ICE9PSBuZXh0UHJvcHMuY3VycmVudFxyXG4gICAgICB8fCBjdXJQcm9wcy52ZXJ0aWNhbCAhPT0gbmV4dFByb3BzLnZlcnRpY2FsXHJcbiAgICAgIHx8IGN1clByb3BzLnNpemUgIT09IG5leHRQcm9wcy5zaXplXHJcbiAgfVxyXG4gIGdldFNpemUoKSB7XHJcbiAgICBjb25zdCBjb250YWluZXIgPSB0aGlzLnJlZnMuY29udGFpbmVyXHJcbiAgICBpZiAoY29udGFpbmVyKSB7XHJcbiAgICAgIHJldHVybiB0aGlzLnByb3BzLnZlcnRpY2FsID8gY29udGFpbmVyLndpZHRoKCkgOiBjb250YWluZXIuaGVpZ2h0KClcclxuICAgIH1cclxuICB9XHJcbiAgcmVuZGVyKCkge1xyXG4gICAgY29uc3QgeyBjdXJyZW50LCB2ZXJ0aWNhbCwgc2l6ZSB9ID0gdGhpcy5wcm9wc1xyXG4gICAgY29uc3Qgc3R5bGUgPSB7XHJcbiAgICAgIC4uLmN1cnJlbnQgJiYgY3VycmVudC5zdHlsZSxcclxuICAgICAgd2lkdGg6IHZlcnRpY2FsID8gKHNpemUgKyBcIiVcIikgOiBcImF1dG9cIixcclxuICAgICAgaGVpZ2h0OiB2ZXJ0aWNhbCA/IFwiYXV0b1wiIDogKHNpemUgKyBcIiVcIiksXHJcbiAgICB9XHJcblxyXG4gICAgaWYgKGN1cnJlbnQpIHtcclxuICAgICAgcmV0dXJuICg8QXBwbGljYXRpb24uV2luZG93Q29udGFpbmVyXHJcbiAgICAgICAgcmVmPVwiY29udGFpbmVyXCJcclxuICAgICAgICBjbGFzc05hbWU9XCJXTkRfcGFuZWxfY29udGFpbmVyX3NpZGVcIlxyXG4gICAgICAgIHN0eWxlPXsgc3R5bGUgfVxyXG4gICAgICAgIGN1cnJlbnQ9eyBjdXJyZW50IH1cclxuICAgICAgICAgICAgICAvPilcclxuICAgIH1cclxuICAgIGVsc2Uge1xyXG4gICAgICByZXR1cm4gbnVsbFxyXG4gICAgfVxyXG4gIH1cclxufVxyXG5cclxudHlwZSBDZW50ZXJQYW5lbENvbnRhaW5lclByb3BzVHlwZSA9IHtcclxuICBjdXJyZW50OiBXaW5kb3dJbnN0YW5jZSxcclxufVxyXG5cclxuY2xhc3MgQ2VudGVyUGFuZWxDb250YWluZXIgZXh0ZW5kcyBDb21wb25lbnQge1xyXG4gIHByb3BzOiBDZW50ZXJQYW5lbENvbnRhaW5lclByb3BzVHlwZVxyXG4gIGNvbXBvbmVudFdpbGxNb3VudCgpIHtcclxuICB9XHJcbiAgc2hvdWxkQ29tcG9uZW50VXBkYXRlKG5leHRQcm9wcykge1xyXG4gICAgY29uc3QgY3VyUHJvcHMgPSB0aGlzLnByb3BzXHJcbiAgICByZXR1cm4gY3VyUHJvcHMuY3VycmVudCAhPT0gbmV4dFByb3BzLmN1cnJlbnRcclxuICB9XHJcbiAgcmVuZGVyKCkge1xyXG4gICAgY29uc3QgY3VycmVudCA9IHRoaXMucHJvcHMuY3VycmVudFxyXG4gICAgaWYgKGN1cnJlbnQpIHtcclxuICAgICAgcmV0dXJuICg8QXBwbGljYXRpb24uV2luZG93Q29udGFpbmVyXHJcbiAgICAgICAgY3VycmVudD17IGN1cnJlbnQgfVxyXG4gICAgICAgIGNsYXNzTmFtZT1cIldORF9wYW5lbF9jb250YWluZXJfY2VudGVyXCJcclxuICAgICAgICAgICAgICAvPilcclxuICAgIH1cclxuICAgIGVsc2Uge1xyXG4gICAgICBjb25zdCBTcGxhc2hDb21wb25lbnQgPSBBcHBsaWNhdGlvbi5sYXlvdXQuc3BsYXNoQ29tcG9uZW50XHJcbiAgICAgIHJldHVybiAoPGRpdiBjbGFzc05hbWU9XCJXTkRfcGFuZWxfY29udGFpbmVyX2NlbnRlciBXTkRfcGFuZWxfY29udGFpbmVyX3NwbGFzaFwiPlxyXG4gICAgICAgIHtTcGxhc2hDb21wb25lbnQgJiYgPFNwbGFzaENvbXBvbmVudCAvPn1cclxuICAgICAgPC9kaXY+KVxyXG4gICAgfVxyXG4gIH1cclxufVxyXG5cclxuLyoqICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxyXG4qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcclxuKioqIFBhbmVsc1xyXG4qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcclxuKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqL1xyXG5cclxuY29uc3QgQ1NTX3NpZGVfcGFuZWxfdmVydGljYWwgPSBcIldORF9zaWRlX3BhbmVsIFdORF9zaWRlX3BhbmVsX1ZcIlxyXG5jb25zdCBDU1Nfc2lkZV9wYW5lbF9ob3Jpem9udGFsID0gXCJXTkRfc2lkZV9wYW5lbCBXTkRfc2lkZV9wYW5lbF9IXCJcclxuXHJcbnR5cGUgUHJvcHNUeXBlID0ge1xyXG4gIHBhbmVsOiBQYW5lbFByb3BzLFxyXG4gIGZyYW1lOiBGcmFtZSxcclxuICBjaGlsZHJlbjogYW55LFxyXG59XHJcblxyXG5jbGFzcyBTaWRlUGFuZWwgZXh0ZW5kcyBDb21wb25lbnQge1xyXG4gIHByb3BzOiBQcm9wc1R5cGVcclxuICBzaG91bGRDb21wb25lbnRVcGRhdGUobmV4dFByb3BzKSB7XHJcbiAgICBjb25zdCBjdXJQcm9wcyA9IHRoaXMucHJvcHNcclxuICAgIHJldHVybiBjdXJQcm9wcy5wYW5lbCAhPT0gbmV4dFByb3BzLnBhbmVsXHJcbiAgICAgIHx8IGN1clByb3BzLmZyYW1lICE9PSBuZXh0UHJvcHMuZnJhbWVcclxuICAgICAgfHwgY3VyUHJvcHMuY2hpbGRyZW4gIT09IG5leHRQcm9wcy5jaGlsZHJlblxyXG4gIH1cclxuICBoYW5kbGVSZXNpemUgPSAoZGVsdGEpID0+IHtcclxuICAgIGNvbnN0IGNzaXplID0gdGhpcy5yZWZzLmNvbnRhaW5lci5nZXRTaXplKClcclxuICAgIGlmIChjc2l6ZSAhPT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgIGxldCBzaXplID0gdGhpcy5wcm9wcy5wYW5lbC5zaXplXHJcbiAgICAgIHNpemUgKz0gTWF0aC5tYXgoc2l6ZSwgMSkgKiBkZWx0YSAvIE1hdGgubWF4KGNzaXplLCAxKVxyXG4gICAgICBzaXplID0gTWF0aC5taW4oTWF0aC5tYXgoc2l6ZSwgMCksIDEwMClcclxuICAgICAgdGhpcy5wcm9wcy5mcmFtZS5ub3RpZnlQYW5lbFJlc2l6ZSh0aGlzLnByb3BzLnBhbmVsLCBzaXplKVxyXG4gICAgfVxyXG4gIH1cclxufVxyXG5cclxuZXhwb3J0IGNsYXNzIFNpZGVQYW5lbFRvcCBleHRlbmRzIFNpZGVQYW5lbCB7XHJcbiAgdHJhbnNmb3JtRGVsdGEoZSkge1xyXG4gICAgcmV0dXJuIGUuZGVsdGFZXHJcbiAgfVxyXG4gIHJlbmRlcigpIHtcclxuICAgIGNvbnN0IHsgcGFuZWwsIGZyYW1lIH0gPSB0aGlzLnByb3BzXHJcbiAgICBjb25zdCBzaXplID0gcGFuZWwuY3VycmVudCA/IHBhbmVsLnNpemUgOiAwXHJcbiAgICByZXR1cm4gKDxkaXYgY2xhc3NOYW1lPXsgQ1NTX3NpZGVfcGFuZWxfaG9yaXpvbnRhbCB9PlxyXG4gICAgICA8UGFuZWxCYXIgcGFuZWw9eyBwYW5lbCB9IGZyYW1lPXsgZnJhbWUgfSAvPlxyXG4gICAgICA8U2lkZVBhbmVsQ29udGFpbmVyIHJlZj17IFwiY29udGFpbmVyXCIgfSBjdXJyZW50PXsgcGFuZWwuY3VycmVudCB9IHNpemU9eyBzaXplIH0gLz5cclxuICAgICAgPFBhbmVsUmVzaXplciBvblJlc2l6ZT17IHRoaXMuaGFuZGxlUmVzaXplIH0gdHJhbnNmb3JtRGVsdGE9eyB0aGlzLnRyYW5zZm9ybURlbHRhIH0gLz5cclxuICAgICAgPGRpdiBjbGFzc05hbWU9XCJXTkRfcGFuZWxfY29udGFpbmVyX2NlbnRlclwiPnt0aGlzLnByb3BzLmNoaWxkcmVufTwvZGl2PlxyXG4gICAgPC9kaXY+KVxyXG4gIH1cclxufVxyXG5cclxuZXhwb3J0IGNsYXNzIFNpZGVQYW5lbEJvdHRvbSBleHRlbmRzIFNpZGVQYW5lbCB7XHJcbiAgdHJhbnNmb3JtRGVsdGEoZSkge1xyXG4gICAgcmV0dXJuIC1lLmRlbHRhWVxyXG4gIH1cclxuICByZW5kZXIoKSB7XHJcbiAgICBjb25zdCB7IHBhbmVsLCBmcmFtZSB9ID0gdGhpcy5wcm9wc1xyXG4gICAgY29uc3Qgc2l6ZSA9IHBhbmVsLmN1cnJlbnQgPyBwYW5lbC5zaXplIDogMFxyXG4gICAgcmV0dXJuICg8ZGl2IGNsYXNzTmFtZT17IENTU19zaWRlX3BhbmVsX2hvcml6b250YWwgfT5cclxuICAgICAgPGRpdiBjbGFzc05hbWU9XCJXTkRfcGFuZWxfY29udGFpbmVyX2NlbnRlclwiPnt0aGlzLnByb3BzLmNoaWxkcmVufTwvZGl2PlxyXG4gICAgICA8UGFuZWxSZXNpemVyIG9uUmVzaXplPXsgdGhpcy5oYW5kbGVSZXNpemUgfSB0cmFuc2Zvcm1EZWx0YT17IHRoaXMudHJhbnNmb3JtRGVsdGEgfSAvPlxyXG4gICAgICA8UGFuZWxCYXIgcGFuZWw9eyBwYW5lbCB9IGZyYW1lPXsgZnJhbWUgfSAvPlxyXG4gICAgICA8U2lkZVBhbmVsQ29udGFpbmVyIHJlZj17IFwiY29udGFpbmVyXCIgfSBjdXJyZW50PXsgcGFuZWwuY3VycmVudCB9IHNpemU9eyBzaXplIH0gLz5cclxuICAgIDwvZGl2PilcclxuICB9XHJcbn1cclxuXHJcbmV4cG9ydCBjbGFzcyBTaWRlUGFuZWxMZWZ0IGV4dGVuZHMgU2lkZVBhbmVsIHtcclxuICB0cmFuc2Zvcm1EZWx0YShlKSB7XHJcbiAgICByZXR1cm4gZS5kZWx0YVhcclxuICB9XHJcbiAgcmVuZGVyKCkge1xyXG4gICAgY29uc3QgeyBwYW5lbCwgZnJhbWUgfSA9IHRoaXMucHJvcHNcclxuICAgIGNvbnN0IHNpemUgPSBwYW5lbC5jdXJyZW50ID8gcGFuZWwuc2l6ZSA6IDBcclxuICAgIHJldHVybiAoPGRpdiBjbGFzc05hbWU9eyBDU1Nfc2lkZV9wYW5lbF92ZXJ0aWNhbCB9PlxyXG4gICAgICA8UGFuZWxCYXIgdmVydGljYWwgcGFuZWw9eyBwYW5lbCB9IGZyYW1lPXsgZnJhbWUgfSAvPlxyXG4gICAgICA8U2lkZVBhbmVsQ29udGFpbmVyIHJlZj17IFwiY29udGFpbmVyXCIgfSB2ZXJ0aWNhbCBjdXJyZW50PXsgcGFuZWwuY3VycmVudCB9IHNpemU9eyBzaXplIH0gLz5cclxuICAgICAgPFBhbmVsUmVzaXplciB2ZXJ0aWNhbCBvblJlc2l6ZT17IHRoaXMuaGFuZGxlUmVzaXplIH0gdHJhbnNmb3JtRGVsdGE9eyB0aGlzLnRyYW5zZm9ybURlbHRhIH0gLz5cclxuICAgICAgPGRpdiBjbGFzc05hbWU9XCJXTkRfcGFuZWxfY29udGFpbmVyX2NlbnRlclwiPnt0aGlzLnByb3BzLmNoaWxkcmVufTwvZGl2PlxyXG4gICAgPC9kaXY+KVxyXG4gIH1cclxufVxyXG5cclxuZXhwb3J0IGNsYXNzIFNpZGVQYW5lbFJpZ2h0IGV4dGVuZHMgU2lkZVBhbmVsIHtcclxuICB0cmFuc2Zvcm1EZWx0YShlKSB7XHJcbiAgICByZXR1cm4gLWUuZGVsdGFYXHJcbiAgfVxyXG4gIHJlbmRlcigpIHtcclxuICAgIGNvbnN0IHsgcGFuZWwsIGZyYW1lIH0gPSB0aGlzLnByb3BzXHJcbiAgICBjb25zdCBzaXplID0gcGFuZWwuY3VycmVudCA/IHBhbmVsLnNpemUgOiAwXHJcbiAgICByZXR1cm4gKDxkaXYgY2xhc3NOYW1lPXsgQ1NTX3NpZGVfcGFuZWxfdmVydGljYWwgfT5cclxuICAgICAgPGRpdiBjbGFzc05hbWU9XCJXTkRfcGFuZWxfY29udGFpbmVyX2NlbnRlclwiPnt0aGlzLnByb3BzLmNoaWxkcmVufTwvZGl2PlxyXG4gICAgICA8UGFuZWxSZXNpemVyIHZlcnRpY2FsIG9uUmVzaXplPXsgdGhpcy5oYW5kbGVSZXNpemUgfSB0cmFuc2Zvcm1EZWx0YT17IHRoaXMudHJhbnNmb3JtRGVsdGEgfSAvPlxyXG4gICAgICA8U2lkZVBhbmVsQ29udGFpbmVyIHJlZj17IFwiY29udGFpbmVyXCIgfSB2ZXJ0aWNhbCBjdXJyZW50PXsgcGFuZWwuY3VycmVudCB9IHNpemU9eyBzaXplIH0gLz5cclxuICAgICAgPFBhbmVsQmFyIHZlcnRpY2FsIHBhbmVsPXsgcGFuZWwgfSBmcmFtZT17IGZyYW1lIH0gLz5cclxuICAgIDwvZGl2PilcclxuICB9XHJcbn1cclxuXHJcbmV4cG9ydCBjbGFzcyBDZW50ZXJQYW5lbFRvcCBleHRlbmRzIFNpZGVQYW5lbFRvcCB7XHJcbiAgcmVuZGVyKCkge1xyXG4gICAgY29uc3QgeyBwYW5lbCwgZnJhbWUgfSA9IHRoaXMucHJvcHNcclxuICAgIHJldHVybiAoPGRpdiBjbGFzc05hbWU9eyBDU1Nfc2lkZV9wYW5lbF9ob3Jpem9udGFsIH0+XHJcbiAgICAgIDxQYW5lbEJhciBwYW5lbD17IHBhbmVsIH0gZnJhbWU9eyBmcmFtZSB9IC8+XHJcbiAgICAgIDxDZW50ZXJQYW5lbENvbnRhaW5lciByZWY9eyBcImNvbnRhaW5lclwiIH0gY3VycmVudD17IHBhbmVsLmN1cnJlbnQgfSAvPlxyXG4gICAgPC9kaXY+KVxyXG4gIH1cclxufVxyXG4iXX0=