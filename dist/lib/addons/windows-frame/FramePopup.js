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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9saWIvYWRkb25zL3dpbmRvd3MtZnJhbWUvRnJhbWVQb3B1cC5qcyJdLCJuYW1lcyI6WyJvcGVuUG9wdXAiLCJwb3B1cFJvb3QiLCJCdXR0b25Qb3B1cCIsImhhbmRsZUNsaWNrIiwicHJvcHMiLCJyZW5kZXIiLCJvbkNsaWNrIiwiY2xhc3NOYW1lIiwic3R5bGUiLCJjaGlsZHJlbiIsIm1hcmtlciIsImh0bWxSb290IiwiZG9jdW1lbnQiLCJjcmVhdGVFbGVtZW50IiwicG9zaXRpb24iLCJsZWZ0IiwidG9wIiwiYm9keSIsImFwcGVuZENoaWxkIiwidXBkYXRlUG9wdXAiLCJGcmFtZVBvcHVwRG9jayIsInN0YXRlIiwiaGFuZGxlTW91c2VEb3duIiwiYm90dG9tIiwiekluZGV4IiwiYmFja2dyb3VuZENvbG9yIiwiYm94U2hhZG93IiwiYm9yZGVyIiwiYm9yZGVyUmFkaXVzIiwicGFkZGluZyIsInBvcHVwIiwicmVmcyIsInBvcHVwSGVpZ2h0IiwiY2xpZW50SGVpZ2h0IiwicG9wdXBXaWR0aCIsImNsaWVudFdpZHRoIiwic2NyZWVuIiwid2lkdGgiLCJyaWdodCIsImhlaWdodCIsIm9uQ2xvc2UiLCJ3aW5kb3ciLCJyZW1vdmVFdmVudExpc3RlbmVyIiwiZWxlbW50IiwiZmluZERPTU5vZGUiLCJyZWN0IiwiZ2V0Qm91bmRpbmdDbGllbnRSZWN0IiwiY29uc29sZSIsImxvZyIsImFkZEV2ZW50TGlzdGVuZXIiLCJzZXRTdGF0ZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O1FBNEJnQkEsUyxHQUFBQSxTOztBQXpCaEI7Ozs7QUFDQTs7Ozs7Ozs7OzsrZUFKQTtBQUNBO0FBQ0E7OztBQUlBLElBQUlDLFlBQTRCLElBQWhDOztJQVVhQyxXLFdBQUFBLFc7Ozs7Ozs7Ozs7Ozs7O2dNQUVYQyxXLEdBQWMsWUFBTTtBQUNsQkgsZ0JBQVUsTUFBS0ksS0FBTCxDQUFXQyxNQUFyQjtBQUNBLFlBQUtELEtBQUwsQ0FBV0UsT0FBWCxJQUFz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Q1AsYUFBTyxLQUFLRixLQUFMLENBQVdoQixNQUFYLElBQXFCLElBQTVCO0FBQ0Q7OztnQ0FJV0EsTSxFQUFrQkssTSxFQUFtQjhCLE8sRUFBb0I7QUFDbkUsVUFBSSxLQUFLbkIsS0FBTCxDQUFXaEIsTUFBZixFQUF1QjtBQUNyQixhQUFLZ0IsS0FBTCxDQUFXbUIsT0FBWCxJQUFzQixLQUFLbkIsS0FBTCxDQUFXbUIsT0FBWCxFQUF0QjtBQUNBQyxlQUFPQyxtQkFBUCxDQUEyQixXQUEzQixFQUF3QyxLQUFLcEIsZUFBN0M7QUFDRDtBQUNELFVBQUlqQixVQUFVSyxNQUFkLEVBQXNCO0FBQ3BCLFlBQU1pQyxTQUFzQixtQkFBU0MsV0FBVCxDQUFxQmxDLE1BQXJCLENBQTVCO0FBQ0EsWUFBTW1DLE9BQU9GLE9BQU9HLHFCQUFQLEVBQWI7QUFDQSxZQUFNaEMsYUFBVztBQUNmQyxnQkFBTThCLEtBQUs5QixJQURJO0FBRWZDLGVBQUs2QixLQUFLN0IsR0FGSztBQUdmc0IsaUJBQU9PLEtBQUs5QixJQUFMLEdBQVk0QixPQUFPUixXQUhYO0FBSWZaLGtCQUFRc0IsS0FBSzdCLEdBQUwsR0FBVzJCLE9BQU9WO0FBSlgsU0FBakI7QUFNQWMsZ0JBQVFDLEdBQVIsQ0FBWWxDLFVBQVo7QUFDQTJCLGVBQU9RLGdCQUFQLENBQXdCLFdBQXhCLEVBQXFDLEtBQUszQixlQUExQztBQUNBLGFBQUs0QixRQUFMLENBQWMsRUFBRTdDLGNBQUYsRUFBVUssY0FBVixFQUFrQkksb0JBQWxCLEVBQTRCMEIsZ0JBQTVCLEVBQWQ7QUFDRCxPQVpELE1BYUs7QUFDSCxhQUFLVSxRQUFMLENBQWMsRUFBRTdDLFFBQVEsSUFBVixFQUFnQkssUUFBUSxJQUF4QixFQUE4QkksVUFBVSxJQUF4QyxFQUE4QzBCLFNBQVMsSUFBdkQsRUFBZDtBQUNEO0FBQ0YiLCJmaWxlIjoiRnJhbWVQb3B1cC5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8qIGVzbGludC1kaXNhYmxlIHJlYWN0L25vLW11bHRpLWNvbXAgKi9cclxuLyogZXNsaW50LWRpc2FibGUgcmVhY3Qvbm8tc3RyaW5nLXJlZnMgKi9cclxuLyogZXNsaW50LWRpc2FibGUgcmVhY3Qvbm8tZmluZC1kb20tbm9kZSAqL1xyXG5pbXBvcnQgUmVhY3QsIHsgQ29tcG9uZW50IH0gZnJvbSBcInJlYWN0XCJcclxuaW1wb3J0IFJlYWN0RE9NIGZyb20gXCJyZWFjdC1kb21cIlxyXG5cclxubGV0IHBvcHVwUm9vdDogRnJhbWVQb3B1cERvY2sgPSBudWxsXHJcblxyXG50eXBlIFByb3BzVHlwZSA9IHtcclxuICByZW5kZXI/OiBGdW5jdGlvbixcclxuICBjbGFzc05hbWU/OiBzdHJpbmcsXHJcbiAgc3R5bGU/OiBhbnksXHJcbiAgY2hpbGRyZW4/OiBhbnksXHJcbiAgb25DbGljazo/RnVuY3Rpb24sXHJcbn1cclxuXHJcbmV4cG9ydCBjbGFzcyBCdXR0b25Qb3B1cCBleHRlbmRzIENvbXBvbmVudDx2b2lkLCBQcm9wc1R5cGUsIHZvaWQ+IHtcclxuICBwcm9wczogUHJvcHNUeXBlXHJcbiAgaGFuZGxlQ2xpY2sgPSAoKSA9PiB7XHJcbiAgICBvcGVuUG9wdXAodGhpcy5wcm9wcy5yZW5kZXIsIHRoaXMpXHJcbiAgICB0aGlzLnByb3BzLm9uQ2xpY2sgJiYgdGhpcy5wcm9wcy5vbkNsaWNrKClcclxuICB9XHJcbiAgcmVuZGVyKCkge1xyXG4gICAgY29uc3QgeyBjbGFzc05hbWUsIHN0eWxlLCBjaGlsZHJlbiB9ID0gdGhpcy5wcm9wc1xyXG4gICAgcmV0dXJuICg8ZGl2IGNsYXNzTmFtZT17IGNsYXNzTmFtZSB9IHN0eWxlPXsgc3R5bGUgfSBvbkNsaWNrPXsgdGhpcy5oYW5kbGVDbGljayB9PntjaGlsZHJlbn08L2Rpdj4pXHJcbiAgfVxyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gb3BlblBvcHVwKHJlbmRlcjogRnVuY3Rpb24sIG1hcmtlcjogQ29tcG9uZW50KSB7XHJcbiAgaWYgKCFwb3B1cFJvb3QpIHtcclxuICAgIGNvbnN0IGh0bWxSb290ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKVxyXG4gICAgaHRtbFJvb3Quc3R5bGUucG9zaXRpb24gPSBcImFic29sdXRlXCJcclxuICAgIGh0bWxSb290LnN0eWxlLmxlZnQgPSBcIjBweFwiXHJcbiAgICBodG1sUm9vdC5zdHlsZS50b3AgPSBcIjBweFwiXHJcbiAgICBkb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKGh0bWxSb290KVxyXG4gICAgcG9wdXBSb290ID0gUmVhY3RET00ucmVuZGVyKCg8RnJhbWVQb3B1cERvY2sgLz4pLCBodG1sUm9vdClcclxuICB9XHJcbiAgcG9wdXBSb290LnVwZGF0ZVBvcHVwKHJlbmRlciwgbWFya2VyKVxyXG59XHJcblxyXG50eXBlIERvY2tTdGF0ZVR5cGUgPSB7XHJcbiAgcmVuZGVyOiBGdW5jdGlvbixcclxuICBtYXJrZXI6IENvbXBvbmVudCxcclxuICBwb3NpdGlvbjogYW55LFxyXG4gIG9uQ2xvc2U/OiBGdW5jdGlvbixcclxufVxyXG5cclxuY2xhc3MgRnJhbWVQb3B1cERvY2sgZXh0ZW5kcyBDb21wb25lbnQ8dm9pZCwgdm9pZCwgRG9ja1N0YXRlVHlwZT4ge1xyXG4gIHN0YXRlOiBEb2NrU3RhdGVUeXBlID0ge31cclxuXHJcbiAgY29tcG9uZW50RGlkVXBkYXRlKCkge1xyXG4gICAgY29uc3QgcG9wdXAgPSB0aGlzLnJlZnMucG9wdXBcclxuICAgIGlmIChwb3B1cCkge1xyXG4gICAgICBjb25zdCBwb3NpdGlvbiA9IHRoaXMuc3RhdGUucG9zaXRpb25cclxuICAgICAgY29uc3QgcG9wdXBIZWlnaHQgPSBwb3B1cC5jbGllbnRIZWlnaHRcclxuICAgICAgY29uc3QgcG9wdXBXaWR0aCA9IHBvcHVwLmNsaWVudFdpZHRoXHJcbiAgICAgIGlmIChwb3NpdGlvbi5sZWZ0ICsgcG9wdXBXaWR0aCA+IHNjcmVlbi53aWR0aCkge1xyXG4gICAgICAgIHBvcHVwLnN0eWxlLmxlZnQgPSBwb3NpdGlvbi5yaWdodCAtIHBvcHVwV2lkdGggKyBcInB4XCJcclxuICAgICAgfVxyXG4gICAgICBlbHNlIHtcclxuICAgICAgICBwb3B1cC5zdHlsZS5sZWZ0ID0gcG9zaXRpb24ubGVmdCArIFwicHhcIlxyXG4gICAgICB9XHJcbiAgICAgIGlmIChwb3NpdGlvbi5ib3R0b20gKyBwb3B1cEhlaWdodCA+IHNjcmVlbi5oZWlnaHQpIHtcclxuICAgICAgICBwb3B1cC5zdHlsZS50b3AgPSBwb3NpdGlvbi50b3AgLSBwb3B1cEhlaWdodCArIFwicHhcIlxyXG4gICAgICB9XHJcbiAgICAgIGVsc2Uge1xyXG4gICAgICAgIHBvcHVwLnN0eWxlLnRvcCA9IHBvc2l0aW9uLmJvdHRvbSArIFwicHhcIlxyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfVxyXG4gIGlzT3BlbigpIHtcclxuICAgIHJldHVybiB0aGlzLnN0YXRlLnJlbmRlciAhPSBudWxsXHJcbiAgfVxyXG4gIGhhbmRsZU1vdXNlRG93biA9ICgpID0+IHtcclxuICAgIHRoaXMudXBkYXRlUG9wdXAoKVxyXG4gIH1cclxuICB1cGRhdGVQb3B1cChyZW5kZXI6IEZ1bmN0aW9uLCBtYXJrZXI6IENvbXBvbmVudCwgb25DbG9zZT86IEZ1bmN0aW9uKSB7XHJcbiAgICBpZiAodGhpcy5zdGF0ZS5yZW5kZXIpIHtcclxuICAgICAgdGhpcy5zdGF0ZS5vbkNsb3NlICYmIHRoaXMuc3RhdGUub25DbG9zZSgpXHJcbiAgICAgIHdpbmRvdy5yZW1vdmVFdmVudExpc3RlbmVyKFwibW91c2Vkb3duXCIsIHRoaXMuaGFuZGxlTW91c2VEb3duKVxyXG4gICAgfVxyXG4gICAgaWYgKHJlbmRlciAmJiBtYXJrZXIpIHtcclxuICAgICAgY29uc3QgZWxlbW50OiBIVE1MRWxlbWVudCA9IFJlYWN0RE9NLmZpbmRET01Ob2RlKG1hcmtlcilcclxuICAgICAgY29uc3QgcmVjdCA9IGVsZW1udC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKVxyXG4gICAgICBjb25zdCBwb3NpdGlvbiA9IHtcclxuICAgICAgICBsZWZ0OiByZWN0LmxlZnQsXHJcbiAgICAgICAgdG9wOiByZWN0LnRvcCxcclxuICAgICAgICByaWdodDogcmVjdC5sZWZ0ICsgZWxlbW50LmNsaWVudFdpZHRoLFxyXG4gICAgICAgIGJvdHRvbTogcmVjdC50b3AgKyBlbGVtbnQuY2xpZW50SGVpZ2h0LFxyXG4gICAgICB9XHJcbiAgICAgIGNvbnNvbGUubG9nKHBvc2l0aW9uKVxyXG4gICAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcihcIm1vdXNlZG93blwiLCB0aGlzLmhhbmRsZU1vdXNlRG93bilcclxuICAgICAgdGhpcy5zZXRTdGF0ZSh7IHJlbmRlciwgbWFya2VyLCBwb3NpdGlvbiwgb25DbG9zZSB9KVxyXG4gICAgfVxyXG4gICAgZWxzZSB7XHJcbiAgICAgIHRoaXMuc2V0U3RhdGUoeyByZW5kZXI6IG51bGwsIG1hcmtlcjogbnVsbCwgcG9zaXRpb246IG51bGwsIG9uQ2xvc2U6IG51bGwgfSlcclxuICAgIH1cclxuICB9XHJcbiAgcmVuZGVyID0gKCkgPT4ge1xyXG4gICAgaWYgKHRoaXMuc3RhdGUucmVuZGVyKSB7XHJcbiAgICAgIGNvbnN0IHsgcmVuZGVyLCBwb3NpdGlvbiB9ID0gdGhpcy5zdGF0ZVxyXG4gICAgICBjb25zdCBzdHlsZSA9IHtcclxuICAgICAgICBwb3NpdGlvbjogXCJhYnNvbHV0ZVwiLFxyXG4gICAgICAgIGxlZnQ6IHBvc2l0aW9uLmxlZnQsXHJcbiAgICAgICAgdG9wOiBwb3NpdGlvbi5ib3R0b20sXHJcbiAgICAgICAgekluZGV4OiAxMDAwMDAsXHJcbiAgICAgICAgYmFja2dyb3VuZENvbG9yOiBcIndoaXRlXCIsXHJcbiAgICAgICAgYm94U2hhZG93OiBcIjAgNXB4IDE1cHggcmdiYSgwLDAsMCwuNSlcIixcclxuICAgICAgICBib3JkZXI6IFwiMXB4IHNvbGlkIHJnYmEoMCwwLDAsLjIpXCIsXHJcbiAgICAgICAgYm9yZGVyUmFkaXVzOiAyLFxyXG4gICAgICAgIHBhZGRpbmc6IDIsXHJcbiAgICAgIH1cclxuICAgICAgcmV0dXJuICg8ZGl2IHN0eWxlPXsgc3R5bGUgfT5cclxuICAgICAgICB7cmVuZGVyKHRoaXMuaGFuZGxlTW91c2VEb3duKX1cclxuICAgICAgPC9kaXY+KVxyXG4gICAgfVxyXG4gICAgcmV0dXJuIG51bGxcclxuICB9XHJcbn1cclxuIl19