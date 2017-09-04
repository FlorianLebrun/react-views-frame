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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9BcHBsaWNhdGlvbi91aS1tb2R1bGVzL1dpbmRvd1RhYnMuanMiXSwibmFtZXMiOlsiV2luZG93VGFic0JhciIsImhhbmRsZVByZXNzIiwiaW5kZXgiLCJwcm9wcyIsIm9uQ2hhbmdlIiwiaXRlbXMiLCJjdXJyZW50Iiwic3R5bGVzIiwidGl0bGVCYW5kIiwibWFwIiwiaXRlbSIsImFjdGl2ZVRpdGxlIiwiaW5hY3RpdmVUaXRsZSIsImljb24iLCJ0aXRsZSIsIldpbmRvd1RhYnMiLCJzdGF0ZSIsImFscmVhZHlEaXNwbGF5ZWQiLCJoYW5kbGVUaXRsZVByZXNzIiwic2V0U3RhdGUiLCJBcnJheSIsImlzQXJyYXkiLCJjb25zb2xlIiwiZXJyb3IiLCJkaXNwbGF5IiwiZmxleERpcmVjdGlvbiIsIndpZHRoIiwiaGVpZ2h0IiwiZmxleCIsImNvbnRlbnQiLCJwYWRkaW5nIiwidXNlclNlbGVjdCIsImN1cnNvciIsIm1hcmdpbkxlZnQiLCJtYXJnaW5SaWdodCJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBSUE7Ozs7Ozs7Ozs7OzsrZUFKQTtBQUNBO0FBQ0E7QUFDQTs7O0lBMEJhQSxhLFdBQUFBLGE7Ozs7Ozs7Ozs7Ozs7O29NQUVYQyxXLEdBQWMsVUFBQ0MsS0FBRDtBQUFBLGFBQW1CLFlBQU07QUFDckMsY0FBS0MsS0FBTCxDQUFXQyxRQUFYLElBQXVCLE1BQUtELEtBQUwsQ0FBV0MsUUFBWCxDQUFvQkYsS0FBcEIsQ0FBdkI7QUFDRCxPQUZhO0FBQUEsSzs7Ozs7NkJBR0w7QUFBQTs7QUFBQSxtQkFDb0IsS0FBS0MsS0FEekI7QUFBQSxVQUNDRSxLQURELFVBQ0NBLEtBREQ7QUFBQSxVQUNRQyxPQURSLFVBQ1FBLE9BRFI7O0FBRVAsYUFBUTtBQUFBO0FBQUEsVUFBSyxPQUFRQyxPQUFPQyxTQUFwQjtBQUNMSCxpQkFBU0EsTUFBTUksR0FBTixDQUFVLFVBQUNDLElBQUQsRUFBT1IsS0FBUCxFQUFpQjtBQUNuQyxpQkFDRTtBQUFBO0FBQUE7QUFDRSxtQkFBTUEsS0FEUjtBQUVFLHlCQUFZSSxZQUFZSixLQUFaLEdBQW9CLEVBQXBCLEdBQXlCLGFBRnZDO0FBR0UscUJBQVFJLFlBQVlKLEtBQVosR0FBb0JLLE9BQU9JLFdBQTNCLEdBQXlDSixPQUFPSyxhQUgxRDtBQUlFLHVCQUFVLE9BQUtYLFdBQUwsQ0FBaUJDLEtBQWpCO0FBSlo7QUFNR1EsaUJBQUtHLElBQUwsSUFBYSx3Q0FBTSxXQUFZLG1CQUFtQkgsS0FBS0csSUFBMUMsR0FOaEI7QUFPR0gsaUJBQUtJO0FBUFIsV0FERjtBQVdELFNBWlM7QUFESixPQUFSO0FBZUQ7Ozs7OztJQUdrQkMsVTs7Ozs7Ozs7Ozs7Ozs7cU1BRW5CQyxLLEdBQW1CO0FBQ2pCVixlQUFTLENBRFE7QUFFakJXLHdCQUFrQixDQUFFLElBQUY7QUFGRCxLLFNBSW5CQyxnQixHQUFtQixVQUFDaEIsS0FBRCxFQUFtQjtBQUNwQyxVQUFNZSxnREFBd0IsT0FBS0QsS0FBTCxDQUFXQyxnQkFBbkMsRUFBTjtBQUNBQSx1QkFBaUJmLEtBQWpCLElBQTBCLElBQTFCO0FBQ0EsYUFBS2lCLFFBQUwsQ0FBYztBQUNaYixpQkFBU0osS0FERztBQUVaZTtBQUZZLE9BQWQ7QUFJRCxLOzs7Ozs2QkFDUTtBQUFBOztBQUFBLFVBQ0NYLE9BREQsR0FDYSxLQUFLVSxLQURsQixDQUNDVixPQUREO0FBQUEsVUFFQ0QsS0FGRCxHQUVXLEtBQUtGLEtBRmhCLENBRUNFLEtBRkQ7O0FBR1AsVUFBSSxDQUFDQSxLQUFELElBQVUsQ0FBQ2UsTUFBTUMsT0FBTixDQUFjaEIsS0FBZCxDQUFmLEVBQXFDO0FBQ25DaUIsZ0JBQVFDLEtBQVIsQ0FBYyxzQ0FBZDtBQUNBLGVBQU8sSUFBUDtBQUNEO0FBQ0QsYUFBUTtBQUFBO0FBQUEsVUFBSyxPQUFPLEVBQUVDLFNBQVMsTUFBWCxFQUFtQkMsZUFBZSxRQUFsQyxFQUE0Q0MsT0FBTyxNQUFuRCxFQUEyREMsUUFBUSxNQUFuRSxFQUFaO0FBQ04sc0NBQUMsYUFBRCxJQUFlLE9BQVF0QixLQUF2QixFQUErQixTQUFVQyxPQUF6QyxFQUFtRCxVQUFXLEtBQUtZLGdCQUFuRSxHQURNO0FBRUxiLGNBQU1JLEdBQU4sQ0FBVSxVQUFDQyxJQUFELEVBQU9SLEtBQVAsRUFBaUI7QUFDMUIsY0FBSSxPQUFLYyxLQUFMLENBQVdDLGdCQUFYLENBQTRCZixLQUE1QixDQUFKLEVBQXdDO0FBQ3RDLG1CQUFRO0FBQUE7QUFBQSxnQkFBSyxLQUFNQSxLQUFYLEVBQW1CLE9BQU8sRUFBRXNCLFNBQVV0QixTQUFTSSxPQUFWLElBQXNCLE1BQWpDLEVBQXlDc0IsTUFBTSxVQUEvQyxFQUExQjtBQUNMbEIsbUJBQUttQjtBQURBLGFBQVI7QUFHRCxXQUpELE1BS0s7QUFDSCxtQkFBTyx1Q0FBSyxLQUFNM0IsS0FBWCxFQUFtQixPQUFPLEVBQUVzQixTQUFTLE1BQVgsRUFBMUIsR0FBUDtBQUNEO0FBQ0YsU0FUQTtBQUZLLE9BQVI7QUFhRDs7Ozs7O2tCQWxDa0JULFU7OztBQXFDckIsSUFBTVIsU0FBUztBQUNiSSxlQUFhO0FBQ1hjLG1CQUFlLEtBREo7QUFFWEcsVUFBTSxDQUZLO0FBR1hFLGFBQVMsQ0FIRTtBQUlYQyxnQkFBWSxNQUpEO0FBS1hDLFlBQVE7QUFMRyxHQURBO0FBUWJwQixpQkFBZTtBQUNiYSxtQkFBZSxLQURGO0FBRWJHLFVBQU0sQ0FGTztBQUdiRSxhQUFTLENBSEk7QUFJYkMsZ0JBQVksTUFKQztBQUtiQyxZQUFRO0FBTEssR0FSRjtBQWVieEIsYUFBVztBQUNUb0IsVUFBTSxVQURHO0FBRVRKLGFBQVMsTUFGQTtBQUdUQyxtQkFBZTtBQUhOLEdBZkU7QUFvQmJaLFFBQU07QUFDSm9CLGdCQUFZLENBRFI7QUFFSkMsaUJBQWEsQ0FGVDtBQUdKUixXQUFPO0FBSEg7QUFwQk8sQ0FBZiIsImZpbGUiOiJXaW5kb3dUYWJzLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLyogZXNsaW50LWRpc2FibGUgZ3VhcmQtZm9yLWluICovXHJcbi8qIGVzbGludC1kaXNhYmxlIGltcG9ydC9uby1uYW1lc3BhY2UgKi9cclxuLyogZXNsaW50LWRpc2FibGUgcmVhY3Qvbm8tbXVsdGktY29tcCAqL1xyXG4vKiBlc2xpbnQtZGlzYWJsZSByZWFjdC1uYXRpdmUvbm8taW5saW5lLXN0eWxlcyAqL1xyXG5pbXBvcnQgUmVhY3QsIHsgQ29tcG9uZW50IH0gZnJvbSBcInJlYWN0XCJcclxuXHJcbmV4cG9ydCB0eXBlIEl0ZW1UYWJUeXBlID0ge1xyXG4gIGljb24/OiBzdHJpbmcsXHJcbiAgdGl0bGU6IHN0cmluZyxcclxuICBjb250ZW50OiBSZWFjdCRFbGVtZW50PGFueT4sXHJcbiAgb25DbGljaz86IEZ1bmN0aW9uLFxyXG59XHJcblxyXG50eXBlIFByb3BzVHlwZSA9IHtcclxuICBpdGVtcz86IEFycmF5PEl0ZW1UYWJUeXBlPixcclxuICBzdHlsZT86IE9iamVjdCB8IEFycmF5PGFueT4sXHJcbn1cclxuXHJcbnR5cGUgU3RhdGVUeXBlID0ge1xyXG4gIGN1cnJlbnQ6IG51bWJlcixcclxuICBhbHJlYWR5RGlzcGxheWVkOiBib29sZWFuW10sXHJcbn1cclxuXHJcbnR5cGUgQmFyUHJvcHNUeXBlID0ge1xyXG4gIGl0ZW1zPzogQXJyYXk8SXRlbVRhYlR5cGU+LFxyXG4gIGN1cnJlbnQ6IG51bWJlcixcclxuICBvbkNoYW5nZT86IEZ1bmN0aW9uLFxyXG59XHJcblxyXG5leHBvcnQgY2xhc3MgV2luZG93VGFic0JhciBleHRlbmRzIENvbXBvbmVudDx2b2lkLCBCYXJQcm9wc1R5cGUsIHZvaWQ+IHtcclxuICBwcm9wczogQmFyUHJvcHNUeXBlXHJcbiAgaGFuZGxlUHJlc3MgPSAoaW5kZXg6IG51bWJlcikgPT4gKCkgPT4ge1xyXG4gICAgdGhpcy5wcm9wcy5vbkNoYW5nZSAmJiB0aGlzLnByb3BzLm9uQ2hhbmdlKGluZGV4KVxyXG4gIH1cclxuICByZW5kZXIoKSB7XHJcbiAgICBjb25zdCB7IGl0ZW1zLCBjdXJyZW50IH0gPSB0aGlzLnByb3BzXHJcbiAgICByZXR1cm4gKDxkaXYgc3R5bGU9eyBzdHlsZXMudGl0bGVCYW5kIH0gPlxyXG4gICAgICB7aXRlbXMgJiYgaXRlbXMubWFwKChpdGVtLCBpbmRleCkgPT4ge1xyXG4gICAgICAgIHJldHVybiAoXHJcbiAgICAgICAgICA8c3BhblxyXG4gICAgICAgICAgICBrZXk9eyBpbmRleCB9XHJcbiAgICAgICAgICAgIGNsYXNzTmFtZT17IGN1cnJlbnQgPT09IGluZGV4ID8gXCJcIiA6IFwiYnRuLXByaW1hcnlcIiB9XHJcbiAgICAgICAgICAgIHN0eWxlPXsgY3VycmVudCA9PT0gaW5kZXggPyBzdHlsZXMuYWN0aXZlVGl0bGUgOiBzdHlsZXMuaW5hY3RpdmVUaXRsZSB9XHJcbiAgICAgICAgICAgIG9uQ2xpY2s9eyB0aGlzLmhhbmRsZVByZXNzKGluZGV4KSB9XHJcbiAgICAgICAgICA+XHJcbiAgICAgICAgICAgIHtpdGVtLmljb24gJiYgPHNwYW4gY2xhc3NOYW1lPXsgXCJwYWRkaW5nIGZhIGZhLVwiICsgaXRlbS5pY29uIH0gLz59XHJcbiAgICAgICAgICAgIHtpdGVtLnRpdGxlfVxyXG4gICAgICAgICAgPC9zcGFuPlxyXG4gICAgICAgIClcclxuICAgICAgfSl9XHJcbiAgICA8L2Rpdj4pXHJcbiAgfVxyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBXaW5kb3dUYWJzIGV4dGVuZHMgQ29tcG9uZW50PHZvaWQsIFByb3BzVHlwZSwgU3RhdGVUeXBlPiB7XHJcbiAgcHJvcHM6IFByb3BzVHlwZVxyXG4gIHN0YXRlOiBTdGF0ZVR5cGUgPSB7XHJcbiAgICBjdXJyZW50OiAwLFxyXG4gICAgYWxyZWFkeURpc3BsYXllZDogWyB0cnVlIF0sXHJcbiAgfVxyXG4gIGhhbmRsZVRpdGxlUHJlc3MgPSAoaW5kZXg6IG51bWJlcikgPT4ge1xyXG4gICAgY29uc3QgYWxyZWFkeURpc3BsYXllZCA9IFsgLi4udGhpcy5zdGF0ZS5hbHJlYWR5RGlzcGxheWVkIF1cclxuICAgIGFscmVhZHlEaXNwbGF5ZWRbaW5kZXhdID0gdHJ1ZVxyXG4gICAgdGhpcy5zZXRTdGF0ZSh7XHJcbiAgICAgIGN1cnJlbnQ6IGluZGV4LFxyXG4gICAgICBhbHJlYWR5RGlzcGxheWVkLFxyXG4gICAgfSlcclxuICB9XHJcbiAgcmVuZGVyKCkge1xyXG4gICAgY29uc3QgeyBjdXJyZW50IH0gPSB0aGlzLnN0YXRlXHJcbiAgICBjb25zdCB7IGl0ZW1zIH0gPSB0aGlzLnByb3BzXHJcbiAgICBpZiAoIWl0ZW1zIHx8ICFBcnJheS5pc0FycmF5KGl0ZW1zKSkge1xyXG4gICAgICBjb25zb2xlLmVycm9yKFwiRW1wdHkgQ29sbGFwc2libGUgV2luZG93IGlzIHVzZWxlc3MuXCIpXHJcbiAgICAgIHJldHVybiBudWxsXHJcbiAgICB9XHJcbiAgICByZXR1cm4gKDxkaXYgc3R5bGU9e3sgZGlzcGxheTogXCJmbGV4XCIsIGZsZXhEaXJlY3Rpb246IFwiY29sdW1uXCIsIHdpZHRoOiBcIjEwMCVcIiwgaGVpZ2h0OiBcIjEwMCVcIiB9fT5cclxuICAgICAgPFdpbmRvd1RhYnNCYXIgaXRlbXM9eyBpdGVtcyB9IGN1cnJlbnQ9eyBjdXJyZW50IH0gb25DaGFuZ2U9eyB0aGlzLmhhbmRsZVRpdGxlUHJlc3MgfSAvPlxyXG4gICAgICB7aXRlbXMubWFwKChpdGVtLCBpbmRleCkgPT4ge1xyXG4gICAgICAgIGlmICh0aGlzLnN0YXRlLmFscmVhZHlEaXNwbGF5ZWRbaW5kZXhdKSB7XHJcbiAgICAgICAgICByZXR1cm4gKDxkaXYga2V5PXsgaW5kZXggfSBzdHlsZT17eyBkaXNwbGF5OiAoaW5kZXggIT0gY3VycmVudCkgJiYgXCJub25lXCIsIGZsZXg6IFwiMSAxIGF1dG9cIiB9fSA+XHJcbiAgICAgICAgICAgIHtpdGVtLmNvbnRlbnR9XHJcbiAgICAgICAgICA8L2Rpdj4pXHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgcmV0dXJuIDxkaXYga2V5PXsgaW5kZXggfSBzdHlsZT17eyBkaXNwbGF5OiBcIm5vbmVcIiB9fSAvPlxyXG4gICAgICAgIH1cclxuICAgICAgfSl9XHJcbiAgICA8L2Rpdj4pXHJcbiAgfVxyXG59XHJcblxyXG5jb25zdCBzdHlsZXMgPSB7XHJcbiAgYWN0aXZlVGl0bGU6IHtcclxuICAgIGZsZXhEaXJlY3Rpb246IFwicm93XCIsXHJcbiAgICBmbGV4OiAxLFxyXG4gICAgcGFkZGluZzogNSxcclxuICAgIHVzZXJTZWxlY3Q6IFwibm9uZVwiLFxyXG4gICAgY3Vyc29yOiBcImRlZmF1bHRcIixcclxuICB9LFxyXG4gIGluYWN0aXZlVGl0bGU6IHtcclxuICAgIGZsZXhEaXJlY3Rpb246IFwicm93XCIsXHJcbiAgICBmbGV4OiAxLFxyXG4gICAgcGFkZGluZzogNSxcclxuICAgIHVzZXJTZWxlY3Q6IFwibm9uZVwiLFxyXG4gICAgY3Vyc29yOiBcInBvaW50ZXJcIixcclxuICB9LFxyXG4gIHRpdGxlQmFuZDoge1xyXG4gICAgZmxleDogXCIwIDAgYXV0b1wiLFxyXG4gICAgZGlzcGxheTogXCJmbGV4XCIsXHJcbiAgICBmbGV4RGlyZWN0aW9uOiBcInJvd1wiLFxyXG4gIH0sXHJcbiAgaWNvbjoge1xyXG4gICAgbWFyZ2luTGVmdDogNSxcclxuICAgIG1hcmdpblJpZ2h0OiA1LFxyXG4gICAgd2lkdGg6IDE4LFxyXG4gIH0sXHJcbn1cclxuIl19