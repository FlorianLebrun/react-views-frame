"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ButtonPopup = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

exports.openPopup = openPopup;

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _reactDom = require("react-dom");

var _reactDom2 = _interopRequireDefault(_reactDom);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var popupRoot = null;

var ButtonPopup = exports.ButtonPopup = function (_Component) {
  _inherits(ButtonPopup, _Component);

  function ButtonPopup() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, ButtonPopup);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = ButtonPopup.__proto__ || Object.getPrototypeOf(ButtonPopup)).call.apply(_ref, [this].concat(args))), _this), _this.handleClick = function () {
      openPopup(_this.props.render, _this);
      _this.props.onClick && _this.props.onClick();
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(ButtonPopup, [{
    key: "render",
    value: function render() {
      var _props = this.props,
          className = _props.className,
          style = _props.style,
          children = _props.children;

      return _react2.default.createElement(
        "div",
        { className: className, style: style, onClick: this.handleClick },
        children
      );
    }
  }]);

  return ButtonPopup;
}(_react.Component);

function openPopup(render, marker) {
  if (!popupRoot) {
    var htmlRoot = document.createElement("div");
    htmlRoot.style.position = "absolute";
    htmlRoot.style.left = "0px";
    htmlRoot.style.top = "0px";
    document.body.appendChild(htmlRoot);
    popupRoot = _reactDom2.default.render(_react2.default.createElement(FramePopupDock, null), htmlRoot);
  }
  popupRoot.updatePopup(render, marker);
}

var FramePopupDock = function (_Component2) {
  _inherits(FramePopupDock, _Component2);

  function FramePopupDock() {
    var _ref2;

    var _temp2, _this2, _ret2;

    _classCallCheck(this, FramePopupDock);

    for (var _len2 = arguments.length, args = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
      args[_key2] = arguments[_key2];
    }

    return _ret2 = (_temp2 = (_this2 = _possibleConstructorReturn(this, (_ref2 = FramePopupDock.__proto__ || Object.getPrototypeOf(FramePopupDock)).call.apply(_ref2, [this].concat(args))), _this2), _this2.state = {}, _this2.handleMouseDown = function () {
      _this2.updatePopup();
    }, _this2.render = function () {
      if (_this2.state.render) {
        var _this2$state = _this2.state,
            _render = _this2$state.render,
            _position = _this2$state.position;

        var _style = {
          position: "absolute",
          left: _position.left,
          top: _position.bottom,
          zIndex: 100000,
          backgroundColor: "white",
          boxShadow: "0 5px 15px rgba(0,0,0,.5)",
          border: "1px solid rgba(0,0,0,.2)",
          borderRadius: 2,
          padding: 2
        };
        return _react2.default.createElement(
          "div",
          { style: _style },
          _render(_this2.handleMouseDown)
        );
      }
      return null;
    }, _temp2), _possibleConstructorReturn(_this2, _ret2);
  }

  _createClass(FramePopupDock, [{
    key: "componentDidUpdate",
    value: function componentDidUpdate() {
      var popup = this.refs.popup;
      if (popup) {
        var _position2 = this.state.position;
        var popupHeight = popup.clientHeight;
        var popupWidth = popup.clientWidth;
        if (_position2.left + popupWidth > window.screen.width) {
          popup.style.left = _position2.right - popupWidth + "px";
        } else {
          popup.style.left = _position2.left + "px";
        }
        if (_position2.bottom + popupHeight > window.screen.height) {
          popup.style.top = _position2.top - popupHeight + "px";
        } else {
          popup.style.top = _position2.bottom + "px";
        }
      }
    }
  }, {
    key: "isOpen",
    value: function isOpen() {
      return this.state.render != null;
    }
  }, {
    key: "updatePopup",
    value: function updatePopup(render, marker, onClose) {
      if (this.state.render) {
        this.state.onClose && this.state.onClose();
        window.removeEventListener("mousedown", this.handleMouseDown);
      }
      if (render && marker) {
        var elemnt = _reactDom2.default.findDOMNode(marker);
        var rect = elemnt.getBoundingClientRect();
        var _position3 = {
          left: rect.left,
          top: rect.top,
          right: rect.left + elemnt.clientWidth,
          bottom: rect.top + elemnt.clientHeight
        };
        console.log(_position3);
        window.addEventListener("mousedown", this.handleMouseDown);
        this.setState({ render: render, marker: marker, position: _position3, onClose: onClose });
      } else {
        this.setState({ render: null, marker: null, position: null, onClose: null });
      }
    }
  }]);

  return FramePopupDock;
}(_react.Component);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9saWIvYWRkb25zL3dpbmRvd3MtZnJhbWUvRnJhbWVQb3B1cC5qcyJdLCJuYW1lcyI6WyJvcGVuUG9wdXAiLCJwb3B1cFJvb3QiLCJCdXR0b25Qb3B1cCIsImhhbmRsZUNsaWNrIiwicHJvcHMiLCJyZW5kZXIiLCJvbkNsaWNrIiwiY2xhc3NOYW1lIiwic3R5bGUiLCJjaGlsZHJlbiIsIm1hcmtlciIsImh0bWxSb290IiwiZG9jdW1lbnQiLCJjcmVhdGVFbGVtZW50IiwicG9zaXRpb24iLCJsZWZ0IiwidG9wIiwiYm9keSIsImFwcGVuZENoaWxkIiwidXBkYXRlUG9wdXAiLCJGcmFtZVBvcHVwRG9jayIsInN0YXRlIiwiaGFuZGxlTW91c2VEb3duIiwiYm90dG9tIiwiekluZGV4IiwiYmFja2dyb3VuZENvbG9yIiwiYm94U2hhZG93IiwiYm9yZGVyIiwiYm9yZGVyUmFkaXVzIiwicGFkZGluZyIsInBvcHVwIiwicmVmcyIsInBvcHVwSGVpZ2h0IiwiY2xpZW50SGVpZ2h0IiwicG9wdXBXaWR0aCIsImNsaWVudFdpZHRoIiwid2luZG93Iiwic2NyZWVuIiwid2lkdGgiLCJyaWdodCIsImhlaWdodCIsIm9uQ2xvc2UiLCJyZW1vdmVFdmVudExpc3RlbmVyIiwiZWxlbW50IiwiZmluZERPTU5vZGUiLCJyZWN0IiwiZ2V0Qm91bmRpbmdDbGllbnRSZWN0IiwiY29uc29sZSIsImxvZyIsImFkZEV2ZW50TGlzdGVuZXIiLCJzZXRTdGF0ZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O1FBMEJnQkEsUyxHQUFBQSxTOztBQTFCaEI7Ozs7QUFDQTs7Ozs7Ozs7Ozs7O0FBRUEsSUFBSUMsWUFBWSxJQUFoQjs7SUFVYUMsVyxXQUFBQSxXOzs7Ozs7Ozs7Ozs7OztnTUFHWEMsVyxHQUFjLFlBQU07QUFDbEJILGdCQUFVLE1BQUtJLEtBQUwsQ0FBV0MsTUFBckI7QUFDQSxZQUFLRCxLQUFMLENBQVdFLE9BQVgsSUFBc0IsTUFBS0YsS0FBTCxDQUFX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Q1E7QUFDUCxhQUFPLEtBQUtGLEtBQUwsQ0FBV2hCLE1BQVgsSUFBcUIsSUFBNUI7QUFDRDs7O2dDQUlXQSxNLEVBQWtCSyxNLEVBQW1CK0IsTyxFQUFvQjtBQUNuRSxVQUFJLEtBQUtwQixLQUFMLENBQVdoQixNQUFmLEVBQXVCO0FBQ3JCLGFBQUtnQixLQUFMLENBQVdvQixPQUFYLElBQXNCLEtBQUtwQixLQUFMLENBQVdvQixPQUFYLEVBQXRCO0FBQ0FMLGVBQU9NLG1CQUFQLENBQTJCLFdBQTNCLEVBQXdDLEtBQUtwQixlQUE3QztBQUNEO0FBQ0QsVUFBSWpCLFVBQVVLLE1BQWQsRUFBc0I7QUFDcEIsWUFBTWlDLFNBQXNCLG1CQUFTQyxXQUFULENBQXFCbEMsTUFBckIsQ0FBNUI7QUFDQSxZQUFNbUMsT0FBT0YsT0FBT0cscUJBQVAsRUFBYjtBQUNBLFlBQU1oQyxhQUFXO0FBQ2ZDLGdCQUFNOEIsS0FBSzlCLElBREk7QUFFZkMsZUFBSzZCLEtBQUs3QixHQUZLO0FBR2Z1QixpQkFBT00sS0FBSzlCLElBQUwsR0FBWTRCLE9BQU9SLFdBSFg7QUFJZlosa0JBQVFzQixLQUFLN0IsR0FBTCxHQUFXMkIsT0FBT1Y7QUFKWCxTQUFqQjtBQU1BYyxnQkFBUUMsR0FBUixDQUFZbEMsVUFBWjtBQUNBc0IsZUFBT2EsZ0JBQVAsQ0FBd0IsV0FBeEIsRUFBcUMsS0FBSzNCLGVBQTFDO0FBQ0EsYUFBSzRCLFFBQUwsQ0FBYyxFQUFFN0MsY0FBRixFQUFVSyxjQUFWLEVBQWtCSSxvQkFBbEIsRUFBNEIyQixnQkFBNUIsRUFBZDtBQUNELE9BWkQsTUFhSztBQUNILGFBQUtTLFFBQUwsQ0FBYyxFQUFFN0MsUUFBUSxJQUFWLEVBQWdCSyxRQUFRLElBQXhCLEVBQThCSSxVQUFVLElBQXhDLEVBQThDMkIsU0FBUyxJQUF2RCxFQUFkO0FBQ0Q7QUFDRiIsImZpbGUiOiJGcmFtZVBvcHVwLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFJlYWN0LCB7IENvbXBvbmVudCB9IGZyb20gXCJyZWFjdFwiXHJcbmltcG9ydCBSZWFjdERPTSBmcm9tIFwicmVhY3QtZG9tXCJcclxuXHJcbmxldCBwb3B1cFJvb3QgPSBudWxsXHJcblxyXG50eXBlIFByb3BzVHlwZSA9IHtcclxuICByZW5kZXI/OiBGdW5jdGlvbixcclxuICBjbGFzc05hbWU/OiBzdHJpbmcsXHJcbiAgc3R5bGU/OiBhbnksXHJcbiAgY2hpbGRyZW4/OiBhbnksXHJcbiAgb25DbGljazo/RnVuY3Rpb24sXHJcbn1cclxuXHJcbmV4cG9ydCBjbGFzcyBCdXR0b25Qb3B1cCBleHRlbmRzIENvbXBvbmVudDx2b2lkLCBQcm9wc1R5cGUsIHZvaWQ+IHtcclxuICBwcm9wczogUHJvcHNUeXBlXHJcblxyXG4gIGhhbmRsZUNsaWNrID0gKCkgPT4ge1xyXG4gICAgb3BlblBvcHVwKHRoaXMucHJvcHMucmVuZGVyLCB0aGlzKVxyXG4gICAgdGhpcy5wcm9wcy5vbkNsaWNrICYmIHRoaXMucHJvcHMub25DbGljaygpXHJcbiAgfVxyXG4gIHJlbmRlcigpIHtcclxuICAgIGNvbnN0IHsgY2xhc3NOYW1lLCBzdHlsZSwgY2hpbGRyZW4gfSA9IHRoaXMucHJvcHNcclxuICAgIHJldHVybiAoPGRpdiBjbGFzc05hbWU9eyBjbGFzc05hbWUgfSBzdHlsZT17IHN0eWxlIH0gb25DbGljaz17IHRoaXMuaGFuZGxlQ2xpY2sgfT57Y2hpbGRyZW59PC9kaXY+KVxyXG4gIH1cclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIG9wZW5Qb3B1cChyZW5kZXI6IEZ1bmN0aW9uLCBtYXJrZXI6IENvbXBvbmVudCkge1xyXG4gIGlmICghcG9wdXBSb290KSB7XHJcbiAgICBjb25zdCBodG1sUm9vdCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIilcclxuICAgIGh0bWxSb290LnN0eWxlLnBvc2l0aW9uID0gXCJhYnNvbHV0ZVwiXHJcbiAgICBodG1sUm9vdC5zdHlsZS5sZWZ0ID0gXCIwcHhcIlxyXG4gICAgaHRtbFJvb3Quc3R5bGUudG9wID0gXCIwcHhcIlxyXG4gICAgZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZChodG1sUm9vdClcclxuICAgIHBvcHVwUm9vdCA9IFJlYWN0RE9NLnJlbmRlcigoPEZyYW1lUG9wdXBEb2NrIC8+KSwgaHRtbFJvb3QpXHJcbiAgfVxyXG4gIHBvcHVwUm9vdC51cGRhdGVQb3B1cChyZW5kZXIsIG1hcmtlcilcclxufVxyXG5cclxudHlwZSBEb2NrU3RhdGVUeXBlID0ge1xyXG4gIHJlbmRlcjogRnVuY3Rpb24sXHJcbiAgbWFya2VyOiBDb21wb25lbnQsXHJcbiAgcG9zaXRpb246IGFueSxcclxuICBvbkNsb3NlPzogRnVuY3Rpb24sXHJcbn1cclxuXHJcbmNsYXNzIEZyYW1lUG9wdXBEb2NrIGV4dGVuZHMgQ29tcG9uZW50PHZvaWQsIHZvaWQsIERvY2tTdGF0ZVR5cGU+IHtcclxuICBzdGF0ZTogRG9ja1N0YXRlVHlwZSA9IHt9XHJcblxyXG4gIGNvbXBvbmVudERpZFVwZGF0ZSgpIHtcclxuICAgIGNvbnN0IHBvcHVwID0gdGhpcy5yZWZzLnBvcHVwXHJcbiAgICBpZiAocG9wdXApIHtcclxuICAgICAgY29uc3QgcG9zaXRpb24gPSB0aGlzLnN0YXRlLnBvc2l0aW9uXHJcbiAgICAgIGNvbnN0IHBvcHVwSGVpZ2h0ID0gcG9wdXAuY2xpZW50SGVpZ2h0XHJcbiAgICAgIGNvbnN0IHBvcHVwV2lkdGggPSBwb3B1cC5jbGllbnRXaWR0aFxyXG4gICAgICBpZiAocG9zaXRpb24ubGVmdCArIHBvcHVwV2lkdGggPiB3aW5kb3cuc2NyZWVuLndpZHRoKSB7XHJcbiAgICAgICAgcG9wdXAuc3R5bGUubGVmdCA9IHBvc2l0aW9uLnJpZ2h0IC0gcG9wdXBXaWR0aCArIFwicHhcIlxyXG4gICAgICB9XHJcbiAgICAgIGVsc2Uge1xyXG4gICAgICAgIHBvcHVwLnN0eWxlLmxlZnQgPSBwb3NpdGlvbi5sZWZ0ICsgXCJweFwiXHJcbiAgICAgIH1cclxuICAgICAgaWYgKHBvc2l0aW9uLmJvdHRvbSArIHBvcHVwSGVpZ2h0ID4gd2luZG93LnNjcmVlbi5oZWlnaHQpIHtcclxuICAgICAgICBwb3B1cC5zdHlsZS50b3AgPSBwb3NpdGlvbi50b3AgLSBwb3B1cEhlaWdodCArIFwicHhcIlxyXG4gICAgICB9XHJcbiAgICAgIGVsc2Uge1xyXG4gICAgICAgIHBvcHVwLnN0eWxlLnRvcCA9IHBvc2l0aW9uLmJvdHRvbSArIFwicHhcIlxyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfVxyXG4gIGlzT3BlbigpIHtcclxuICAgIHJldHVybiB0aGlzLnN0YXRlLnJlbmRlciAhPSBudWxsXHJcbiAgfVxyXG4gIGhhbmRsZU1vdXNlRG93biA9ICgpID0+IHtcclxuICAgIHRoaXMudXBkYXRlUG9wdXAoKVxyXG4gIH1cclxuICB1cGRhdGVQb3B1cChyZW5kZXI6IEZ1bmN0aW9uLCBtYXJrZXI6IENvbXBvbmVudCwgb25DbG9zZT86IEZ1bmN0aW9uKSB7XHJcbiAgICBpZiAodGhpcy5zdGF0ZS5yZW5kZXIpIHtcclxuICAgICAgdGhpcy5zdGF0ZS5vbkNsb3NlICYmIHRoaXMuc3RhdGUub25DbG9zZSgpXHJcbiAgICAgIHdpbmRvdy5yZW1vdmVFdmVudExpc3RlbmVyKFwibW91c2Vkb3duXCIsIHRoaXMuaGFuZGxlTW91c2VEb3duKVxyXG4gICAgfVxyXG4gICAgaWYgKHJlbmRlciAmJiBtYXJrZXIpIHtcclxuICAgICAgY29uc3QgZWxlbW50OiBIVE1MRWxlbWVudCA9IFJlYWN0RE9NLmZpbmRET01Ob2RlKG1hcmtlcilcclxuICAgICAgY29uc3QgcmVjdCA9IGVsZW1udC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKVxyXG4gICAgICBjb25zdCBwb3NpdGlvbiA9IHtcclxuICAgICAgICBsZWZ0OiByZWN0LmxlZnQsXHJcbiAgICAgICAgdG9wOiByZWN0LnRvcCxcclxuICAgICAgICByaWdodDogcmVjdC5sZWZ0ICsgZWxlbW50LmNsaWVudFdpZHRoLFxyXG4gICAgICAgIGJvdHRvbTogcmVjdC50b3AgKyBlbGVtbnQuY2xpZW50SGVpZ2h0LFxyXG4gICAgICB9XHJcbiAgICAgIGNvbnNvbGUubG9nKHBvc2l0aW9uKVxyXG4gICAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcihcIm1vdXNlZG93blwiLCB0aGlzLmhhbmRsZU1vdXNlRG93bilcclxuICAgICAgdGhpcy5zZXRTdGF0ZSh7IHJlbmRlciwgbWFya2VyLCBwb3NpdGlvbiwgb25DbG9zZSB9KVxyXG4gICAgfVxyXG4gICAgZWxzZSB7XHJcbiAgICAgIHRoaXMuc2V0U3RhdGUoeyByZW5kZXI6IG51bGwsIG1hcmtlcjogbnVsbCwgcG9zaXRpb246IG51bGwsIG9uQ2xvc2U6IG51bGwgfSlcclxuICAgIH1cclxuICB9XHJcbiAgcmVuZGVyID0gKCkgPT4ge1xyXG4gICAgaWYgKHRoaXMuc3RhdGUucmVuZGVyKSB7XHJcbiAgICAgIGNvbnN0IHsgcmVuZGVyLCBwb3NpdGlvbiB9ID0gdGhpcy5zdGF0ZVxyXG4gICAgICBjb25zdCBzdHlsZSA9IHtcclxuICAgICAgICBwb3NpdGlvbjogXCJhYnNvbHV0ZVwiLFxyXG4gICAgICAgIGxlZnQ6IHBvc2l0aW9uLmxlZnQsXHJcbiAgICAgICAgdG9wOiBwb3NpdGlvbi5ib3R0b20sXHJcbiAgICAgICAgekluZGV4OiAxMDAwMDAsXHJcbiAgICAgICAgYmFja2dyb3VuZENvbG9yOiBcIndoaXRlXCIsXHJcbiAgICAgICAgYm94U2hhZG93OiBcIjAgNXB4IDE1cHggcmdiYSgwLDAsMCwuNSlcIixcclxuICAgICAgICBib3JkZXI6IFwiMXB4IHNvbGlkIHJnYmEoMCwwLDAsLjIpXCIsXHJcbiAgICAgICAgYm9yZGVyUmFkaXVzOiAyLFxyXG4gICAgICAgIHBhZGRpbmc6IDIsXHJcbiAgICAgIH1cclxuICAgICAgcmV0dXJuICg8ZGl2IHN0eWxlPXsgc3R5bGUgfT5cclxuICAgICAgICB7cmVuZGVyKHRoaXMuaGFuZGxlTW91c2VEb3duKX1cclxuICAgICAgPC9kaXY+KVxyXG4gICAgfVxyXG4gICAgcmV0dXJuIG51bGxcclxuICB9XHJcbn1cclxuIl19