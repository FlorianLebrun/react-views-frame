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

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /* eslint-disable react/no-multi-comp */
/* eslint-disable react/no-string-refs */
/* eslint-disable react/no-find-dom-node */


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
        if (_position2.left + popupWidth > screen.width) {
          popup.style.left = _position2.right - popupWidth + "px";
        } else {
          popup.style.left = _position2.left + "px";
        }
        if (_position2.bottom + popupHeight > screen.height) {
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9BcHBsaWNhdGlvbi9mcmFtZS9GcmFtZVBvcHVwLmpzIl0sIm5hbWVzIjpbIm9wZW5Qb3B1cCIsInBvcHVwUm9vdCIsIkJ1dHRvblBvcHVwIiwiaGFuZGxlQ2xpY2siLCJwcm9wcyIsInJlbmRlciIsIm9uQ2xpY2siLCJjbGFzc05hbWUiLCJzdHlsZSIsImNoaWxkcmVuIiwibWFya2VyIiwiaHRtbFJvb3QiLCJkb2N1bWVudCIsImNyZWF0ZUVsZW1lbnQiLCJwb3NpdGlvbiIsImxlZnQiLCJ0b3AiLCJib2R5IiwiYXBwZW5kQ2hpbGQiLCJ1cGRhdGVQb3B1cCIsIkZyYW1lUG9wdXBEb2NrIiwic3RhdGUiLCJoYW5kbGVNb3VzZURvd24iLCJib3R0b20iLCJ6SW5kZXgiLCJiYWNrZ3JvdW5kQ29sb3IiLCJib3hTaGFkb3ciLCJib3JkZXIiLCJib3JkZXJSYWRpdXMiLCJwYWRkaW5nIiwicG9wdXAiLCJyZWZzIiwicG9wdXBIZWlnaHQiLCJjbGllbnRIZWlnaHQiLCJwb3B1cFdpZHRoIiwiY2xpZW50V2lkdGgiLCJzY3JlZW4iLCJ3aWR0aCIsInJpZ2h0IiwiaGVpZ2h0Iiwib25DbG9zZSIsIndpbmRvdyIsInJlbW92ZUV2ZW50TGlzdGVuZXIiLCJlbGVtbnQiLCJmaW5kRE9NTm9kZSIsInJlY3QiLCJnZXRCb3VuZGluZ0NsaWVudFJlY3QiLCJjb25zb2xlIiwibG9nIiwiYWRkRXZlbnRMaXN0ZW5lciIsInNldFN0YXRlIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7UUE0QmdCQSxTLEdBQUFBLFM7O0FBekJoQjs7OztBQUNBOzs7Ozs7Ozs7OytlQUpBO0FBQ0E7QUFDQTs7O0FBSUEsSUFBSUMsWUFBNEIsSUFBaEM7O0lBVWFDLFcsV0FBQUEsVzs7Ozs7Ozs7Ozs7Ozs7Z01BRVhDLFcsR0FBYyxZQUFNO0FBQ2xCSCxnQkFBVSxNQUFLSSxLQUFMLENBQVdDLE1BQXJCO0FBQ0EsWUFBS0QsS0FBTCxDQUFXRSxPQUFYLElBQXNCLE1BQUtGLEtB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QUtGLEtBQUwsQ0FBV2hCLE1BQVgsSUFBcUIsSUFBNUI7QUFDRDs7O2dDQUlXQSxNLEVBQWtCSyxNLEVBQW1COEIsTyxFQUFvQjtBQUNuRSxVQUFJLEtBQUtuQixLQUFMLENBQVdoQixNQUFmLEVBQXVCO0FBQ3JCLGFBQUtnQixLQUFMLENBQVdtQixPQUFYLElBQXNCLEtBQUtuQixLQUFMLENBQVdtQixPQUFYLEVBQXRCO0FBQ0FDLGVBQU9DLG1CQUFQLENBQTJCLFdBQTNCLEVBQXdDLEtBQUtwQixlQUE3QztBQUNEO0FBQ0QsVUFBSWpCLFVBQVVLLE1BQWQsRUFBc0I7QUFDcEIsWUFBTWlDLFNBQXNCLG1CQUFTQyxXQUFULENBQXFCbEMsTUFBckIsQ0FBNUI7QUFDQSxZQUFNbUMsT0FBT0YsT0FBT0cscUJBQVAsRUFBYjtBQUNBLFlBQU1oQyxhQUFXO0FBQ2ZDLGdCQUFNOEIsS0FBSzlCLElBREk7QUFFZkMsZUFBSzZCLEtBQUs3QixHQUZLO0FBR2ZzQixpQkFBT08sS0FBSzlCLElBQUwsR0FBWTRCLE9BQU9SLFdBSFg7QUFJZlosa0JBQVFzQixLQUFLN0IsR0FBTCxHQUFXMkIsT0FBT1Y7QUFKWCxTQUFqQjtBQU1BYyxnQkFBUUMsR0FBUixDQUFZbEMsVUFBWjtBQUNBMkIsZUFBT1EsZ0JBQVAsQ0FBd0IsV0FBeEIsRUFBcUMsS0FBSzNCLGVBQTFDO0FBQ0EsYUFBSzRCLFFBQUwsQ0FBYyxFQUFFN0MsY0FBRixFQUFVSyxjQUFWLEVBQWtCSSxvQkFBbEIsRUFBNEIwQixnQkFBNUIsRUFBZDtBQUNELE9BWkQsTUFhSztBQUNILGFBQUtVLFFBQUwsQ0FBYyxFQUFFN0MsUUFBUSxJQUFWLEVBQWdCSyxRQUFRLElBQXhCLEVBQThCSSxVQUFVLElBQXhDLEVBQThDMEIsU0FBUyxJQUF2RCxFQUFkO0FBQ0Q7QUFDRiIsImZpbGUiOiJGcmFtZVBvcHVwLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLyogZXNsaW50LWRpc2FibGUgcmVhY3Qvbm8tbXVsdGktY29tcCAqL1xyXG4vKiBlc2xpbnQtZGlzYWJsZSByZWFjdC9uby1zdHJpbmctcmVmcyAqL1xyXG4vKiBlc2xpbnQtZGlzYWJsZSByZWFjdC9uby1maW5kLWRvbS1ub2RlICovXHJcbmltcG9ydCBSZWFjdCwgeyBDb21wb25lbnQgfSBmcm9tIFwicmVhY3RcIlxyXG5pbXBvcnQgUmVhY3RET00gZnJvbSBcInJlYWN0LWRvbVwiXHJcblxyXG5sZXQgcG9wdXBSb290OiBGcmFtZVBvcHVwRG9jayA9IG51bGxcclxuXHJcbnR5cGUgUHJvcHNUeXBlID0ge1xyXG4gIHJlbmRlcj86IEZ1bmN0aW9uLFxyXG4gIGNsYXNzTmFtZT86IHN0cmluZyxcclxuICBzdHlsZT86IGFueSxcclxuICBjaGlsZHJlbj86IGFueSxcclxuICBvbkNsaWNrOj9GdW5jdGlvbixcclxufVxyXG5cclxuZXhwb3J0IGNsYXNzIEJ1dHRvblBvcHVwIGV4dGVuZHMgQ29tcG9uZW50PHZvaWQsIFByb3BzVHlwZSwgdm9pZD4ge1xyXG4gIHByb3BzOiBQcm9wc1R5cGVcclxuICBoYW5kbGVDbGljayA9ICgpID0+IHtcclxuICAgIG9wZW5Qb3B1cCh0aGlzLnByb3BzLnJlbmRlciwgdGhpcylcclxuICAgIHRoaXMucHJvcHMub25DbGljayAmJiB0aGlzLnByb3BzLm9uQ2xpY2soKVxyXG4gIH1cclxuICByZW5kZXIoKSB7XHJcbiAgICBjb25zdCB7IGNsYXNzTmFtZSwgc3R5bGUsIGNoaWxkcmVuIH0gPSB0aGlzLnByb3BzXHJcbiAgICByZXR1cm4gKDxkaXYgY2xhc3NOYW1lPXsgY2xhc3NOYW1lIH0gc3R5bGU9eyBzdHlsZSB9IG9uQ2xpY2s9eyB0aGlzLmhhbmRsZUNsaWNrIH0+e2NoaWxkcmVufTwvZGl2PilcclxuICB9XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBvcGVuUG9wdXAocmVuZGVyOiBGdW5jdGlvbiwgbWFya2VyOiBDb21wb25lbnQpIHtcclxuICBpZiAoIXBvcHVwUm9vdCkge1xyXG4gICAgY29uc3QgaHRtbFJvb3QgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpXHJcbiAgICBodG1sUm9vdC5zdHlsZS5wb3NpdGlvbiA9IFwiYWJzb2x1dGVcIlxyXG4gICAgaHRtbFJvb3Quc3R5bGUubGVmdCA9IFwiMHB4XCJcclxuICAgIGh0bWxSb290LnN0eWxlLnRvcCA9IFwiMHB4XCJcclxuICAgIGRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQoaHRtbFJvb3QpXHJcbiAgICBwb3B1cFJvb3QgPSBSZWFjdERPTS5yZW5kZXIoKDxGcmFtZVBvcHVwRG9jayAvPiksIGh0bWxSb290KVxyXG4gIH1cclxuICBwb3B1cFJvb3QudXBkYXRlUG9wdXAocmVuZGVyLCBtYXJrZXIpXHJcbn1cclxuXHJcbnR5cGUgRG9ja1N0YXRlVHlwZSA9IHtcclxuICByZW5kZXI6IEZ1bmN0aW9uLFxyXG4gIG1hcmtlcjogQ29tcG9uZW50LFxyXG4gIHBvc2l0aW9uOiBhbnksXHJcbiAgb25DbG9zZT86IEZ1bmN0aW9uLFxyXG59XHJcblxyXG5jbGFzcyBGcmFtZVBvcHVwRG9jayBleHRlbmRzIENvbXBvbmVudDx2b2lkLCB2b2lkLCBEb2NrU3RhdGVUeXBlPiB7XHJcbiAgc3RhdGU6IERvY2tTdGF0ZVR5cGUgPSB7fVxyXG5cclxuICBjb21wb25lbnREaWRVcGRhdGUoKSB7XHJcbiAgICBjb25zdCBwb3B1cCA9IHRoaXMucmVmcy5wb3B1cFxyXG4gICAgaWYgKHBvcHVwKSB7XHJcbiAgICAgIGNvbnN0IHBvc2l0aW9uID0gdGhpcy5zdGF0ZS5wb3NpdGlvblxyXG4gICAgICBjb25zdCBwb3B1cEhlaWdodCA9IHBvcHVwLmNsaWVudEhlaWdodFxyXG4gICAgICBjb25zdCBwb3B1cFdpZHRoID0gcG9wdXAuY2xpZW50V2lkdGhcclxuICAgICAgaWYgKHBvc2l0aW9uLmxlZnQgKyBwb3B1cFdpZHRoID4gc2NyZWVuLndpZHRoKSB7XHJcbiAgICAgICAgcG9wdXAuc3R5bGUubGVmdCA9IHBvc2l0aW9uLnJpZ2h0IC0gcG9wdXBXaWR0aCArIFwicHhcIlxyXG4gICAgICB9XHJcbiAgICAgIGVsc2Uge1xyXG4gICAgICAgIHBvcHVwLnN0eWxlLmxlZnQgPSBwb3NpdGlvbi5sZWZ0ICsgXCJweFwiXHJcbiAgICAgIH1cclxuICAgICAgaWYgKHBvc2l0aW9uLmJvdHRvbSArIHBvcHVwSGVpZ2h0ID4gc2NyZWVuLmhlaWdodCkge1xyXG4gICAgICAgIHBvcHVwLnN0eWxlLnRvcCA9IHBvc2l0aW9uLnRvcCAtIHBvcHVwSGVpZ2h0ICsgXCJweFwiXHJcbiAgICAgIH1cclxuICAgICAgZWxzZSB7XHJcbiAgICAgICAgcG9wdXAuc3R5bGUudG9wID0gcG9zaXRpb24uYm90dG9tICsgXCJweFwiXHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9XHJcbiAgaXNPcGVuKCkge1xyXG4gICAgcmV0dXJuIHRoaXMuc3RhdGUucmVuZGVyICE9IG51bGxcclxuICB9XHJcbiAgaGFuZGxlTW91c2VEb3duID0gKCkgPT4ge1xyXG4gICAgdGhpcy51cGRhdGVQb3B1cCgpXHJcbiAgfVxyXG4gIHVwZGF0ZVBvcHVwKHJlbmRlcjogRnVuY3Rpb24sIG1hcmtlcjogQ29tcG9uZW50LCBvbkNsb3NlPzogRnVuY3Rpb24pIHtcclxuICAgIGlmICh0aGlzLnN0YXRlLnJlbmRlcikge1xyXG4gICAgICB0aGlzLnN0YXRlLm9uQ2xvc2UgJiYgdGhpcy5zdGF0ZS5vbkNsb3NlKClcclxuICAgICAgd2luZG93LnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJtb3VzZWRvd25cIiwgdGhpcy5oYW5kbGVNb3VzZURvd24pXHJcbiAgICB9XHJcbiAgICBpZiAocmVuZGVyICYmIG1hcmtlcikge1xyXG4gICAgICBjb25zdCBlbGVtbnQ6IEhUTUxFbGVtZW50ID0gUmVhY3RET00uZmluZERPTU5vZGUobWFya2VyKVxyXG4gICAgICBjb25zdCByZWN0ID0gZWxlbW50LmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpXHJcbiAgICAgIGNvbnN0IHBvc2l0aW9uID0ge1xyXG4gICAgICAgIGxlZnQ6IHJlY3QubGVmdCxcclxuICAgICAgICB0b3A6IHJlY3QudG9wLFxyXG4gICAgICAgIHJpZ2h0OiByZWN0LmxlZnQgKyBlbGVtbnQuY2xpZW50V2lkdGgsXHJcbiAgICAgICAgYm90dG9tOiByZWN0LnRvcCArIGVsZW1udC5jbGllbnRIZWlnaHQsXHJcbiAgICAgIH1cclxuICAgICAgY29uc29sZS5sb2cocG9zaXRpb24pXHJcbiAgICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKFwibW91c2Vkb3duXCIsIHRoaXMuaGFuZGxlTW91c2VEb3duKVxyXG4gICAgICB0aGlzLnNldFN0YXRlKHsgcmVuZGVyLCBtYXJrZXIsIHBvc2l0aW9uLCBvbkNsb3NlIH0pXHJcbiAgICB9XHJcbiAgICBlbHNlIHtcclxuICAgICAgdGhpcy5zZXRTdGF0ZSh7IHJlbmRlcjogbnVsbCwgbWFya2VyOiBudWxsLCBwb3NpdGlvbjogbnVsbCwgb25DbG9zZTogbnVsbCB9KVxyXG4gICAgfVxyXG4gIH1cclxuICByZW5kZXIgPSAoKSA9PiB7XHJcbiAgICBpZiAodGhpcy5zdGF0ZS5yZW5kZXIpIHtcclxuICAgICAgY29uc3QgeyByZW5kZXIsIHBvc2l0aW9uIH0gPSB0aGlzLnN0YXRlXHJcbiAgICAgIGNvbnN0IHN0eWxlID0ge1xyXG4gICAgICAgIHBvc2l0aW9uOiBcImFic29sdXRlXCIsXHJcbiAgICAgICAgbGVmdDogcG9zaXRpb24ubGVmdCxcclxuICAgICAgICB0b3A6IHBvc2l0aW9uLmJvdHRvbSxcclxuICAgICAgICB6SW5kZXg6IDEwMDAwMCxcclxuICAgICAgICBiYWNrZ3JvdW5kQ29sb3I6IFwid2hpdGVcIixcclxuICAgICAgICBib3hTaGFkb3c6IFwiMCA1cHggMTVweCByZ2JhKDAsMCwwLC41KVwiLFxyXG4gICAgICAgIGJvcmRlcjogXCIxcHggc29saWQgcmdiYSgwLDAsMCwuMilcIixcclxuICAgICAgICBib3JkZXJSYWRpdXM6IDIsXHJcbiAgICAgICAgcGFkZGluZzogMixcclxuICAgICAgfVxyXG4gICAgICByZXR1cm4gKDxkaXYgc3R5bGU9eyBzdHlsZSB9PlxyXG4gICAgICAgIHtyZW5kZXIodGhpcy5oYW5kbGVNb3VzZURvd24pfVxyXG4gICAgICA8L2Rpdj4pXHJcbiAgICB9XHJcbiAgICByZXR1cm4gbnVsbFxyXG4gIH1cclxufVxyXG4iXX0=