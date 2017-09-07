"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.WindowTabsBar = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /* eslint-disable guard-for-in */
/* eslint-disable import/no-namespace */
/* eslint-disable react/no-multi-comp */
/* eslint-disable react-native/no-inline-styles */


var WindowTabsBar = exports.WindowTabsBar = function (_Component) {
  _inherits(WindowTabsBar, _Component);

  function WindowTabsBar() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, WindowTabsBar);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = WindowTabsBar.__proto__ || Object.getPrototypeOf(WindowTabsBar)).call.apply(_ref, [this].concat(args))), _this), _this.handlePress = function (index) {
      return function () {
        _this.props.onChange && _this.props.onChange(index);
      };
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(WindowTabsBar, [{
    key: "render",
    value: function render() {
      var _this2 = this;

      var _props = this.props,
          items = _props.items,
          current = _props.current;

      return _react2.default.createElement(
        "div",
        { style: styles.titleBand },
        items && items.map(function (item, index) {
          return _react2.default.createElement(
            "span",
            {
              key: index,
              className: current === index ? "" : "btn-primary",
              style: current === index ? styles.activeTitle : styles.inactiveTitle,
              onClick: _this2.handlePress(index)
            },
            item.icon && _react2.default.createElement("span", { className: "padding fa fa-" + item.icon }),
            item.title
          );
        })
      );
    }
  }]);

  return WindowTabsBar;
}(_react.Component);

var WindowTabs = function (_Component2) {
  _inherits(WindowTabs, _Component2);

  function WindowTabs() {
    var _ref2;

    var _temp2, _this3, _ret2;

    _classCallCheck(this, WindowTabs);

    for (var _len2 = arguments.length, args = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
      args[_key2] = arguments[_key2];
    }

    return _ret2 = (_temp2 = (_this3 = _possibleConstructorReturn(this, (_ref2 = WindowTabs.__proto__ || Object.getPrototypeOf(WindowTabs)).call.apply(_ref2, [this].concat(args))), _this3), _this3.state = {
      current: 0,
      alreadyDisplayed: [true]
    }, _this3.handleTitlePress = function (index) {
      var alreadyDisplayed = [].concat(_toConsumableArray(_this3.state.alreadyDisplayed));
      alreadyDisplayed[index] = true;
      _this3.setState({
        current: index,
        alreadyDisplayed: alreadyDisplayed
      });
    }, _temp2), _possibleConstructorReturn(_this3, _ret2);
  }

  _createClass(WindowTabs, [{
    key: "render",
    value: function render() {
      var _this4 = this;

      var current = this.state.current;
      var items = this.props.items;

      if (!items || !Array.isArray(items)) {
        console.error("Empty Collapsible Window is useless.");
        return null;
      }
      return _react2.default.createElement(
        "div",
        { style: { display: "flex", flexDirection: "column", width: "100%", height: "100%" } },
        _react2.default.createElement(WindowTabsBar, { items: items, current: current, onChange: this.handleTitlePress }),
        items.map(function (item, index) {
          if (_this4.state.alreadyDisplayed[index]) {
            return _react2.default.createElement(
              "div",
              { key: index, style: { display: index != current && "none", flex: "1 1 auto" } },
              item.content
            );
          } else {
            return _react2.default.createElement("div", { key: index, style: { display: "none" } });
          }
        })
      );
    }
  }]);

  return WindowTabs;
}(_react.Component);

exports.default = WindowTabs;


var styles = {
  activeTitle: {
    flexDirection: "row",
    flex: 1,
    padding: 5,
    userSelect: "none",
    cursor: "default"
  },
  inactiveTitle: {
    flexDirection: "row",
    flex: 1,
    padding: 5,
    userSelect: "none",
    cursor: "pointer"
  },
  titleBand: {
    flex: "0 0 auto",
    display: "flex",
    flexDirection: "row"
  },
  icon: {
    marginLeft: 5,
    marginRight: 5,
    width: 18
  }
};
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9saWIvdWktbW9kdWxlcy9XaW5kb3dUYWJzLmpzIl0sIm5hbWVzIjpbIldpbmRvd1RhYnNCYXIiLCJoYW5kbGVQcmVzcyIsImluZGV4IiwicHJvcHMiLCJvbkNoYW5nZSIsIml0ZW1zIiwiY3VycmVudCIsInN0eWxlcyIsInRpdGxlQmFuZCIsIm1hcCIsIml0ZW0iLCJhY3RpdmVUaXRsZSIsImluYWN0aXZlVGl0bGUiLCJpY29uIiwidGl0bGUiLCJXaW5kb3dUYWJzIiwic3RhdGUiLCJhbHJlYWR5RGlzcGxheWVkIiwiaGFuZGxlVGl0bGVQcmVzcyIsInNldFN0YXRlIiwiQXJyYXkiLCJpc0FycmF5IiwiY29uc29sZSIsImVycm9yIiwiZGlzcGxheSIsImZsZXhEaXJlY3Rpb24iLCJ3aWR0aCIsImhlaWdodCIsImZsZXgiLCJjb250ZW50IiwicGFkZGluZyIsInVzZXJTZWxlY3QiLCJjdXJzb3IiLCJtYXJnaW5MZWZ0IiwibWFyZ2luUmlnaHQiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUlBOzs7Ozs7Ozs7Ozs7K2VBSkE7QUFDQTtBQUNBO0FBQ0E7OztJQTBCYUEsYSxXQUFBQSxhOzs7Ozs7Ozs7Ozs7OztvTUFFWEMsVyxHQUFjLFVBQUNDLEtBQUQ7QUFBQSxhQUFtQixZQUFNO0FBQ3JDLGNBQUtDLEtBQUwsQ0FBV0MsUUFBWCxJQUF1QixNQUFLRCxLQUFMLENBQVdDLFFBQVgsQ0FBb0JGLEtBQXBCLENBQXZCO0FBQ0QsT0FGYTtBQUFBLEs7Ozs7OzZCQUdMO0FBQUE7O0FBQUEsbUJBQ29CLEtBQUtDLEtBRHpCO0FBQUEsVUFDQ0UsS0FERCxVQUNDQSxLQUREO0FBQUEsVUFDUUMsT0FEUixVQUNRQSxPQURSOztBQUVQLGFBQVE7QUFBQTtBQUFBLFVBQUssT0FBUUMsT0FBT0MsU0FBcEI7QUFDTEgsaUJBQVNBLE1BQU1JLEdBQU4sQ0FBVSxVQUFDQyxJQUFELEVBQU9SLEtBQVAsRUFBaUI7QUFDbkMsaUJBQ0U7QUFBQTtBQUFBO0FBQ0UsbUJBQU1BLEtBRFI7QUFFRSx5QkFBWUksWUFBWUosS0FBWixHQUFvQixFQUFwQixHQUF5QixhQUZ2QztBQUdFLHFCQUFRSSxZQUFZSixLQUFaLEdBQW9CSyxPQUFPSSxXQUEzQixHQUF5Q0osT0FBT0ssYUFIMUQ7QUFJRSx1QkFBVSxPQUFLWCxXQUFMLENBQWlCQyxLQUFqQjtBQUpaO0FBTUdRLGlCQUFLRyxJQUFMLElBQWEsd0NBQU0sV0FBWSxtQkFBbUJILEtBQUtHLElBQTFDLEdBTmhCO0FBT0dILGlCQUFLSTtBQVBSLFdBREY7QUFXRCxTQVpTO0FBREosT0FBUjtBQWVEOzs7Ozs7SUFHa0JDLFU7Ozs7Ozs7Ozs7Ozs7O3FNQUVuQkMsSyxHQUFtQjtBQUNqQlYsZUFBUyxDQURRO0FBRWpCVyx3QkFBa0IsQ0FBRSxJQUFGO0FBRkQsSyxTQUluQkMsZ0IsR0FBbUIsVUFBQ2hCLEtBQUQsRUFBbUI7QUFDcEMsVUFBTWUsZ0RBQXdCLE9BQUtELEtBQUwsQ0FBV0MsZ0JBQW5DLEVBQU47QUFDQUEsdUJBQWlCZixLQUFqQixJQUEwQixJQUExQjtBQUNBLGFBQUtpQixRQUFMLENBQWM7QUFDWmIsaUJBQVNKLEtBREc7QUFFWmU7QUFGWSxPQUFkO0FBSUQsSzs7Ozs7NkJBQ1E7QUFBQTs7QUFBQSxVQUNDWCxPQURELEdBQ2EsS0FBS1UsS0FEbEIsQ0FDQ1YsT0FERDtBQUFBLFVBRUNELEtBRkQsR0FFVyxLQUFLRixLQUZoQixDQUVDRSxLQUZEOztBQUdQLFVBQUksQ0FBQ0EsS0FBRCxJQUFVLENBQUNlLE1BQU1DLE9BQU4sQ0FBY2hCLEtBQWQsQ0FBZixFQUFxQztBQUNuQ2lCLGdCQUFRQyxLQUFSLENBQWMsc0NBQWQ7QUFDQSxlQUFPLElBQVA7QUFDRDtBQUNELGFBQVE7QUFBQTtBQUFBLFVBQUssT0FBTyxFQUFFQyxTQUFTLE1BQVgsRUFBbUJDLGVBQWUsUUFBbEMsRUFBNENDLE9BQU8sTUFBbkQsRUFBMkRDLFFBQVEsTUFBbkUsRUFBWjtBQUNOLHNDQUFDLGFBQUQsSUFBZSxPQUFRdEIsS0FBdkIsRUFBK0IsU0FBVUMsT0FBekMsRUFBbUQsVUFBVyxLQUFLWSxnQkFBbkUsR0FETTtBQUVMYixjQUFNSSxHQUFOLENBQVUsVUFBQ0MsSUFBRCxFQUFPUixLQUFQLEVBQWlCO0FBQzFCLGNBQUksT0FBS2MsS0FBTCxDQUFXQyxnQkFBWCxDQUE0QmYsS0FBNUIsQ0FBSixFQUF3QztBQUN0QyxtQkFBUTtBQUFBO0FBQUEsZ0JBQUssS0FBTUEsS0FBWCxFQUFtQixPQUFPLEVBQUVzQixTQUFVdEIsU0FBU0ksT0FBVixJQUFzQixNQUFqQyxFQUF5Q3NCLE1BQU0sVUFBL0MsRUFBMUI7QUFDTGxCLG1CQUFLbUI7QUFEQSxhQUFSO0FBR0QsV0FKRCxNQUtLO0FBQ0gsbUJBQU8sdUNBQUssS0FBTTNCLEtBQVgsRUFBbUIsT0FBTyxFQUFFc0IsU0FBUyxNQUFYLEVBQTFCLEdBQVA7QUFDRDtBQUNGLFNBVEE7QUFGSyxPQUFSO0FBYUQ7Ozs7OztrQkFsQ2tCVCxVOzs7QUFxQ3JCLElBQU1SLFNBQVM7QUFDYkksZUFBYTtBQUNYYyxtQkFBZSxLQURKO0FBRVhHLFVBQU0sQ0FGSztBQUdYRSxhQUFTLENBSEU7QUFJWEMsZ0JBQVksTUFKRDtBQUtYQyxZQUFRO0FBTEcsR0FEQTtBQVFicEIsaUJBQWU7QUFDYmEsbUJBQWUsS0FERjtBQUViRyxVQUFNLENBRk87QUFHYkUsYUFBUyxDQUhJO0FBSWJDLGdCQUFZLE1BSkM7QUFLYkMsWUFBUTtBQUxLLEdBUkY7QUFlYnhCLGFBQVc7QUFDVG9CLFVBQU0sVUFERztBQUVUSixhQUFTLE1BRkE7QUFHVEMsbUJBQWU7QUFITixHQWZFO0FBb0JiWixRQUFNO0FBQ0pvQixnQkFBWSxDQURSO0FBRUpDLGlCQUFhLENBRlQ7QUFHSlIsV0FBTztBQUhIO0FBcEJPLENBQWYiLCJmaWxlIjoiV2luZG93VGFicy5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8qIGVzbGludC1kaXNhYmxlIGd1YXJkLWZvci1pbiAqL1xyXG4vKiBlc2xpbnQtZGlzYWJsZSBpbXBvcnQvbm8tbmFtZXNwYWNlICovXHJcbi8qIGVzbGludC1kaXNhYmxlIHJlYWN0L25vLW11bHRpLWNvbXAgKi9cclxuLyogZXNsaW50LWRpc2FibGUgcmVhY3QtbmF0aXZlL25vLWlubGluZS1zdHlsZXMgKi9cclxuaW1wb3J0IFJlYWN0LCB7IENvbXBvbmVudCB9IGZyb20gXCJyZWFjdFwiXHJcblxyXG5leHBvcnQgdHlwZSBJdGVtVGFiVHlwZSA9IHtcclxuICBpY29uPzogc3RyaW5nLFxyXG4gIHRpdGxlOiBzdHJpbmcsXHJcbiAgY29udGVudDogUmVhY3QkRWxlbWVudDxhbnk+LFxyXG4gIG9uQ2xpY2s/OiBGdW5jdGlvbixcclxufVxyXG5cclxudHlwZSBQcm9wc1R5cGUgPSB7XHJcbiAgaXRlbXM/OiBBcnJheTxJdGVtVGFiVHlwZT4sXHJcbiAgc3R5bGU/OiBPYmplY3QgfCBBcnJheTxhbnk+LFxyXG59XHJcblxyXG50eXBlIFN0YXRlVHlwZSA9IHtcclxuICBjdXJyZW50OiBudW1iZXIsXHJcbiAgYWxyZWFkeURpc3BsYXllZDogYm9vbGVhbltdLFxyXG59XHJcblxyXG50eXBlIEJhclByb3BzVHlwZSA9IHtcclxuICBpdGVtcz86IEFycmF5PEl0ZW1UYWJUeXBlPixcclxuICBjdXJyZW50OiBudW1iZXIsXHJcbiAgb25DaGFuZ2U/OiBGdW5jdGlvbixcclxufVxyXG5cclxuZXhwb3J0IGNsYXNzIFdpbmRvd1RhYnNCYXIgZXh0ZW5kcyBDb21wb25lbnQ8dm9pZCwgQmFyUHJvcHNUeXBlLCB2b2lkPiB7XHJcbiAgcHJvcHM6IEJhclByb3BzVHlwZVxyXG4gIGhhbmRsZVByZXNzID0gKGluZGV4OiBudW1iZXIpID0+ICgpID0+IHtcclxuICAgIHRoaXMucHJvcHMub25DaGFuZ2UgJiYgdGhpcy5wcm9wcy5vbkNoYW5nZShpbmRleClcclxuICB9XHJcbiAgcmVuZGVyKCkge1xyXG4gICAgY29uc3QgeyBpdGVtcywgY3VycmVudCB9ID0gdGhpcy5wcm9wc1xyXG4gICAgcmV0dXJuICg8ZGl2IHN0eWxlPXsgc3R5bGVzLnRpdGxlQmFuZCB9ID5cclxuICAgICAge2l0ZW1zICYmIGl0ZW1zLm1hcCgoaXRlbSwgaW5kZXgpID0+IHtcclxuICAgICAgICByZXR1cm4gKFxyXG4gICAgICAgICAgPHNwYW5cclxuICAgICAgICAgICAga2V5PXsgaW5kZXggfVxyXG4gICAgICAgICAgICBjbGFzc05hbWU9eyBjdXJyZW50ID09PSBpbmRleCA/IFwiXCIgOiBcImJ0bi1wcmltYXJ5XCIgfVxyXG4gICAgICAgICAgICBzdHlsZT17IGN1cnJlbnQgPT09IGluZGV4ID8gc3R5bGVzLmFjdGl2ZVRpdGxlIDogc3R5bGVzLmluYWN0aXZlVGl0bGUgfVxyXG4gICAgICAgICAgICBvbkNsaWNrPXsgdGhpcy5oYW5kbGVQcmVzcyhpbmRleCkgfVxyXG4gICAgICAgICAgPlxyXG4gICAgICAgICAgICB7aXRlbS5pY29uICYmIDxzcGFuIGNsYXNzTmFtZT17IFwicGFkZGluZyBmYSBmYS1cIiArIGl0ZW0uaWNvbiB9IC8+fVxyXG4gICAgICAgICAgICB7aXRlbS50aXRsZX1cclxuICAgICAgICAgIDwvc3Bhbj5cclxuICAgICAgICApXHJcbiAgICAgIH0pfVxyXG4gICAgPC9kaXY+KVxyXG4gIH1cclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgV2luZG93VGFicyBleHRlbmRzIENvbXBvbmVudDx2b2lkLCBQcm9wc1R5cGUsIFN0YXRlVHlwZT4ge1xyXG4gIHByb3BzOiBQcm9wc1R5cGVcclxuICBzdGF0ZTogU3RhdGVUeXBlID0ge1xyXG4gICAgY3VycmVudDogMCxcclxuICAgIGFscmVhZHlEaXNwbGF5ZWQ6IFsgdHJ1ZSBdLFxyXG4gIH1cclxuICBoYW5kbGVUaXRsZVByZXNzID0gKGluZGV4OiBudW1iZXIpID0+IHtcclxuICAgIGNvbnN0IGFscmVhZHlEaXNwbGF5ZWQgPSBbIC4uLnRoaXMuc3RhdGUuYWxyZWFkeURpc3BsYXllZCBdXHJcbiAgICBhbHJlYWR5RGlzcGxheWVkW2luZGV4XSA9IHRydWVcclxuICAgIHRoaXMuc2V0U3RhdGUoe1xyXG4gICAgICBjdXJyZW50OiBpbmRleCxcclxuICAgICAgYWxyZWFkeURpc3BsYXllZCxcclxuICAgIH0pXHJcbiAgfVxyXG4gIHJlbmRlcigpIHtcclxuICAgIGNvbnN0IHsgY3VycmVudCB9ID0gdGhpcy5zdGF0ZVxyXG4gICAgY29uc3QgeyBpdGVtcyB9ID0gdGhpcy5wcm9wc1xyXG4gICAgaWYgKCFpdGVtcyB8fCAhQXJyYXkuaXNBcnJheShpdGVtcykpIHtcclxuICAgICAgY29uc29sZS5lcnJvcihcIkVtcHR5IENvbGxhcHNpYmxlIFdpbmRvdyBpcyB1c2VsZXNzLlwiKVxyXG4gICAgICByZXR1cm4gbnVsbFxyXG4gICAgfVxyXG4gICAgcmV0dXJuICg8ZGl2IHN0eWxlPXt7IGRpc3BsYXk6IFwiZmxleFwiLCBmbGV4RGlyZWN0aW9uOiBcImNvbHVtblwiLCB3aWR0aDogXCIxMDAlXCIsIGhlaWdodDogXCIxMDAlXCIgfX0+XHJcbiAgICAgIDxXaW5kb3dUYWJzQmFyIGl0ZW1zPXsgaXRlbXMgfSBjdXJyZW50PXsgY3VycmVudCB9IG9uQ2hhbmdlPXsgdGhpcy5oYW5kbGVUaXRsZVByZXNzIH0gLz5cclxuICAgICAge2l0ZW1zLm1hcCgoaXRlbSwgaW5kZXgpID0+IHtcclxuICAgICAgICBpZiAodGhpcy5zdGF0ZS5hbHJlYWR5RGlzcGxheWVkW2luZGV4XSkge1xyXG4gICAgICAgICAgcmV0dXJuICg8ZGl2IGtleT17IGluZGV4IH0gc3R5bGU9e3sgZGlzcGxheTogKGluZGV4ICE9IGN1cnJlbnQpICYmIFwibm9uZVwiLCBmbGV4OiBcIjEgMSBhdXRvXCIgfX0gPlxyXG4gICAgICAgICAgICB7aXRlbS5jb250ZW50fVxyXG4gICAgICAgICAgPC9kaXY+KVxyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIHtcclxuICAgICAgICAgIHJldHVybiA8ZGl2IGtleT17IGluZGV4IH0gc3R5bGU9e3sgZGlzcGxheTogXCJub25lXCIgfX0gLz5cclxuICAgICAgICB9XHJcbiAgICAgIH0pfVxyXG4gICAgPC9kaXY+KVxyXG4gIH1cclxufVxyXG5cclxuY29uc3Qgc3R5bGVzID0ge1xyXG4gIGFjdGl2ZVRpdGxlOiB7XHJcbiAgICBmbGV4RGlyZWN0aW9uOiBcInJvd1wiLFxyXG4gICAgZmxleDogMSxcclxuICAgIHBhZGRpbmc6IDUsXHJcbiAgICB1c2VyU2VsZWN0OiBcIm5vbmVcIixcclxuICAgIGN1cnNvcjogXCJkZWZhdWx0XCIsXHJcbiAgfSxcclxuICBpbmFjdGl2ZVRpdGxlOiB7XHJcbiAgICBmbGV4RGlyZWN0aW9uOiBcInJvd1wiLFxyXG4gICAgZmxleDogMSxcclxuICAgIHBhZGRpbmc6IDUsXHJcbiAgICB1c2VyU2VsZWN0OiBcIm5vbmVcIixcclxuICAgIGN1cnNvcjogXCJwb2ludGVyXCIsXHJcbiAgfSxcclxuICB0aXRsZUJhbmQ6IHtcclxuICAgIGZsZXg6IFwiMCAwIGF1dG9cIixcclxuICAgIGRpc3BsYXk6IFwiZmxleFwiLFxyXG4gICAgZmxleERpcmVjdGlvbjogXCJyb3dcIixcclxuICB9LFxyXG4gIGljb246IHtcclxuICAgIG1hcmdpbkxlZnQ6IDUsXHJcbiAgICBtYXJnaW5SaWdodDogNSxcclxuICAgIHdpZHRoOiAxOCxcclxuICB9LFxyXG59XHJcbiJdfQ==