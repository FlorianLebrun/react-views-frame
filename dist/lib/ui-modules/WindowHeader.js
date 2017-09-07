"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = WindowHeader;

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var handleClick = function handleClick(props) {
  return function (e) {
    var onClick = props.onClick;

    onClick && onClick(e);
  };
};

function WindowHeader(props) {
  var title = props.title,
      children = props.children,
      primary = props.primary,
      danger = props.danger,
      warning = props.warning,
      success = props.success,
      info = props.info,
      addon = props.addon;


  var suffix = primary && "-primary" || danger && "-prdangerimary" || warning && "-warning" || success && "-success" || info && "-info" || "-default";

  return _react2.default.createElement(
    "div",
    null,
    _react2.default.createElement(
      "div",
      { className: "flex-row padding btn" + suffix },
      _react2.default.createElement(
        "div",
        { className: "flex-1 padding-left", onClick: handleClick(props) },
        title
      ),
      addon && _react2.default.createElement(
        "div",
        { className: "flex-0 padding-right" },
        addon
      )
    ),
    _react2.default.createElement(
      "div",
      { className: "margin" },
      children
    )
  );
}
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9saWIvdWktbW9kdWxlcy9XaW5kb3dIZWFkZXIuanMiXSwibmFtZXMiOlsiV2luZG93SGVhZGVyIiwiaGFuZGxlQ2xpY2siLCJwcm9wcyIsImUiLCJvbkNsaWNrIiwidGl0bGUiLCJjaGlsZHJlbiIsInByaW1hcnkiLCJkYW5nZXIiLCJ3YXJuaW5nIiwic3VjY2VzcyIsImluZm8iLCJhZGRvbiIsInN1ZmZpeCJdLCJtYXBwaW5ncyI6Ijs7Ozs7a0JBcUJ3QkEsWTs7QUFuQnhCOzs7Ozs7QUFjQSxJQUFNQyxjQUFjLFNBQWRBLFdBQWMsQ0FBQ0MsS0FBRDtBQUFBLFNBQXNCLFVBQUNDLENBQUQsRUFBdUI7QUFBQSxRQUN2REMsT0FEdUQsR0FDM0NGLEtBRDJDLENBQ3ZERSxPQUR1RDs7QUFFL0RBLGVBQVdBLFFBQVFELENBQVIsQ0FBWDtBQUNELEdBSG1CO0FBQUEsQ0FBcEI7O0FBS2UsU0FBU0gsWUFBVCxDQUFzQkUsS0FBdEIsRUFBd0M7QUFBQSxNQUM3Q0csS0FENkMsR0FDdUJILEtBRHZCLENBQzdDRyxLQUQ2QztBQUFBLE1BQ3RDQyxRQURzQyxHQUN1QkosS0FEdkIsQ0FDdENJLFFBRHNDO0FBQUEsTUFDNUJDLE9BRDRCLEdBQ3VCTCxLQUR2QixDQUM1QkssT0FENEI7QUFBQSxNQUNuQkMsTUFEbUIsR0FDdUJOLEtBRHZCLENBQ25CTSxNQURtQjtBQUFBLE1BQ1hDLE9BRFcsR0FDdUJQLEtBRHZCLENBQ1hPLE9BRFc7QUFBQSxNQUNGQyxPQURFLEdBQ3VCUixLQUR2QixDQUNGUSxPQURFO0FBQUEsTUFDT0MsSUFEUCxHQUN1QlQsS0FEdkIsQ0FDT1MsSUFEUDtBQUFBLE1BQ2FDLEtBRGIsR0FDdUJWLEtBRHZCLENBQ2FVLEtBRGI7OztBQUdyRCxNQUFNQyxTQUNGTixXQUFXLFVBQVgsSUFDQ0MsVUFBVSxnQkFEWCxJQUVDQyxXQUFXLFVBRlosSUFHQ0MsV0FBVyxVQUhaLElBSUNDLFFBQVEsT0FKVCxJQUtDLFVBTkw7O0FBUUEsU0FBUTtBQUFBO0FBQUE7QUFDTjtBQUFBO0FBQUEsUUFBSyxXQUFZLHlCQUF5QkUsTUFBMUM7QUFDRTtBQUFBO0FBQUEsVUFBSyxXQUFZLHFCQUFqQixFQUF5QyxTQUFVWixZQUFZQyxLQUFaLENBQW5EO0FBQXlFRztBQUF6RSxPQURGO0FBRUlPLGVBQ0E7QUFBQTtBQUFBLFVBQUssV0FBWSxzQkFBakI7QUFBMkNBO0FBQTNDO0FBSEosS0FETTtBQU9OO0FBQUE7QUFBQSxRQUFLLFdBQVUsUUFBZjtBQUNHTjtBQURIO0FBUE0sR0FBUjtBQVdEIiwiZmlsZSI6IldpbmRvd0hlYWRlci5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8vIEBmbG93XHJcblxyXG5pbXBvcnQgUmVhY3QgZnJvbSBcInJlYWN0XCJcclxuXHJcbnR5cGUgUHJvcHNUeXBlID0ge1xyXG4gIHRpdGxlOiBhbnksXHJcbiAgcHJpbWFyeT86IGJvb2xlYW4sXHJcbiAgZGFuZ2VyPzogYm9vbGVhbixcclxuICB3YXJuaW5nPzogYm9vbGVhbixcclxuICBzdWNjZXNzPzogYm9vbGVhbixcclxuICBpbmZvPzogYm9vbGVhbixcclxuICBjaGlsZHJlbj86IGFueSxcclxuICBvbkNsaWNrPzogRnVuY3Rpb24sXHJcbiAgYWRkb24/OiBhbnksXHJcbn1cclxuXHJcbmNvbnN0IGhhbmRsZUNsaWNrID0gKHByb3BzOiBQcm9wc1R5cGUpID0+IChlOiBTeW50aGV0aWNFdmVudCkgPT4ge1xyXG4gIGNvbnN0IHsgb25DbGljayB9ID0gcHJvcHNcclxuICBvbkNsaWNrICYmIG9uQ2xpY2soZSlcclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gV2luZG93SGVhZGVyKHByb3BzOiBQcm9wc1R5cGUpIHtcclxuICBjb25zdCB7IHRpdGxlLCBjaGlsZHJlbiwgcHJpbWFyeSwgZGFuZ2VyLCB3YXJuaW5nLCBzdWNjZXNzLCBpbmZvLCBhZGRvbiB9ID0gcHJvcHNcclxuXHJcbiAgY29uc3Qgc3VmZml4XHJcbiAgICA9IHByaW1hcnkgJiYgXCItcHJpbWFyeVwiXHJcbiAgICB8fCBkYW5nZXIgJiYgXCItcHJkYW5nZXJpbWFyeVwiXHJcbiAgICB8fCB3YXJuaW5nICYmIFwiLXdhcm5pbmdcIlxyXG4gICAgfHwgc3VjY2VzcyAmJiBcIi1zdWNjZXNzXCJcclxuICAgIHx8IGluZm8gJiYgXCItaW5mb1wiXHJcbiAgICB8fCBcIi1kZWZhdWx0XCJcclxuXHJcbiAgcmV0dXJuICg8ZGl2PlxyXG4gICAgPGRpdiBjbGFzc05hbWU9eyBcImZsZXgtcm93IHBhZGRpbmcgYnRuXCIgKyBzdWZmaXggfT5cclxuICAgICAgPGRpdiBjbGFzc05hbWU9eyBcImZsZXgtMSBwYWRkaW5nLWxlZnRcIiB9IG9uQ2xpY2s9eyBoYW5kbGVDbGljayhwcm9wcykgfT57dGl0bGV9PC9kaXY+XHJcbiAgICAgIHsgYWRkb24gJiZcclxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT17IFwiZmxleC0wIHBhZGRpbmctcmlnaHRcIiB9PnthZGRvbn08L2Rpdj5cclxuICAgICAgfVxyXG4gICAgPC9kaXY+XHJcbiAgICA8ZGl2IGNsYXNzTmFtZT1cIm1hcmdpblwiID5cclxuICAgICAge2NoaWxkcmVufVxyXG4gICAgPC9kaXY+XHJcbiAgPC9kaXY+KVxyXG59XHJcblxyXG4iXX0=