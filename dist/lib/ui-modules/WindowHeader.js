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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9BcHBsaWNhdGlvbi91aS1tb2R1bGVzL1dpbmRvd0hlYWRlci5qcyJdLCJuYW1lcyI6WyJXaW5kb3dIZWFkZXIiLCJoYW5kbGVDbGljayIsInByb3BzIiwiZSIsIm9uQ2xpY2siLCJ0aXRsZSIsImNoaWxkcmVuIiwicHJpbWFyeSIsImRhbmdlciIsIndhcm5pbmciLCJzdWNjZXNzIiwiaW5mbyIsImFkZG9uIiwic3VmZml4Il0sIm1hcHBpbmdzIjoiOzs7OztrQkFxQndCQSxZOztBQW5CeEI7Ozs7OztBQWNBLElBQU1DLGNBQWMsU0FBZEEsV0FBYyxDQUFDQyxLQUFEO0FBQUEsU0FBc0IsVUFBQ0MsQ0FBRCxFQUF1QjtBQUFBLFFBQ3ZEQyxPQUR1RCxHQUMzQ0YsS0FEMkMsQ0FDdkRFLE9BRHVEOztBQUUvREEsZUFBV0EsUUFBUUQsQ0FBUixDQUFYO0FBQ0QsR0FIbUI7QUFBQSxDQUFwQjs7QUFLZSxTQUFTSCxZQUFULENBQXNCRSxLQUF0QixFQUF3QztBQUFBLE1BQzdDRyxLQUQ2QyxHQUN1QkgsS0FEdkIsQ0FDN0NHLEtBRDZDO0FBQUEsTUFDdENDLFFBRHNDLEdBQ3VCSixLQUR2QixDQUN0Q0ksUUFEc0M7QUFBQSxNQUM1QkMsT0FENEIsR0FDdUJMLEtBRHZCLENBQzVCSyxPQUQ0QjtBQUFBLE1BQ25CQyxNQURtQixHQUN1Qk4sS0FEdkIsQ0FDbkJNLE1BRG1CO0FBQUEsTUFDWEMsT0FEVyxHQUN1QlAsS0FEdkIsQ0FDWE8sT0FEVztBQUFBLE1BQ0ZDLE9BREUsR0FDdUJSLEtBRHZCLENBQ0ZRLE9BREU7QUFBQSxNQUNPQyxJQURQLEdBQ3VCVCxLQUR2QixDQUNPUyxJQURQO0FBQUEsTUFDYUMsS0FEYixHQUN1QlYsS0FEdkIsQ0FDYVUsS0FEYjs7O0FBR3JELE1BQU1DLFNBQ0ZOLFdBQVcsVUFBWCxJQUNDQyxVQUFVLGdCQURYLElBRUNDLFdBQVcsVUFGWixJQUdDQyxXQUFXLFVBSFosSUFJQ0MsUUFBUSxPQUpULElBS0MsVUFOTDs7QUFRQSxTQUFRO0FBQUE7QUFBQTtBQUNOO0FBQUE7QUFBQSxRQUFLLFdBQVkseUJBQXlCRSxNQUExQztBQUNFO0FBQUE7QUFBQSxVQUFLLFdBQVkscUJBQWpCLEVBQXlDLFNBQVVaLFlBQVlDLEtBQVosQ0FBbkQ7QUFBeUVHO0FBQXpFLE9BREY7QUFFSU8sZUFDQTtBQUFBO0FBQUEsVUFBSyxXQUFZLHNCQUFqQjtBQUEyQ0E7QUFBM0M7QUFISixLQURNO0FBT047QUFBQTtBQUFBLFFBQUssV0FBVSxRQUFmO0FBQ0dOO0FBREg7QUFQTSxHQUFSO0FBV0QiLCJmaWxlIjoiV2luZG93SGVhZGVyLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLy8gQGZsb3dcclxuXHJcbmltcG9ydCBSZWFjdCBmcm9tIFwicmVhY3RcIlxyXG5cclxudHlwZSBQcm9wc1R5cGUgPSB7XHJcbiAgdGl0bGU6IGFueSxcclxuICBwcmltYXJ5PzogYm9vbGVhbixcclxuICBkYW5nZXI/OiBib29sZWFuLFxyXG4gIHdhcm5pbmc/OiBib29sZWFuLFxyXG4gIHN1Y2Nlc3M/OiBib29sZWFuLFxyXG4gIGluZm8/OiBib29sZWFuLFxyXG4gIGNoaWxkcmVuPzogYW55LFxyXG4gIG9uQ2xpY2s/OiBGdW5jdGlvbixcclxuICBhZGRvbj86IGFueSxcclxufVxyXG5cclxuY29uc3QgaGFuZGxlQ2xpY2sgPSAocHJvcHM6IFByb3BzVHlwZSkgPT4gKGU6IFN5bnRoZXRpY0V2ZW50KSA9PiB7XHJcbiAgY29uc3QgeyBvbkNsaWNrIH0gPSBwcm9wc1xyXG4gIG9uQ2xpY2sgJiYgb25DbGljayhlKVxyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBXaW5kb3dIZWFkZXIocHJvcHM6IFByb3BzVHlwZSkge1xyXG4gIGNvbnN0IHsgdGl0bGUsIGNoaWxkcmVuLCBwcmltYXJ5LCBkYW5nZXIsIHdhcm5pbmcsIHN1Y2Nlc3MsIGluZm8sIGFkZG9uIH0gPSBwcm9wc1xyXG5cclxuICBjb25zdCBzdWZmaXhcclxuICAgID0gcHJpbWFyeSAmJiBcIi1wcmltYXJ5XCJcclxuICAgIHx8IGRhbmdlciAmJiBcIi1wcmRhbmdlcmltYXJ5XCJcclxuICAgIHx8IHdhcm5pbmcgJiYgXCItd2FybmluZ1wiXHJcbiAgICB8fCBzdWNjZXNzICYmIFwiLXN1Y2Nlc3NcIlxyXG4gICAgfHwgaW5mbyAmJiBcIi1pbmZvXCJcclxuICAgIHx8IFwiLWRlZmF1bHRcIlxyXG5cclxuICByZXR1cm4gKDxkaXY+XHJcbiAgICA8ZGl2IGNsYXNzTmFtZT17IFwiZmxleC1yb3cgcGFkZGluZyBidG5cIiArIHN1ZmZpeCB9PlxyXG4gICAgICA8ZGl2IGNsYXNzTmFtZT17IFwiZmxleC0xIHBhZGRpbmctbGVmdFwiIH0gb25DbGljaz17IGhhbmRsZUNsaWNrKHByb3BzKSB9Pnt0aXRsZX08L2Rpdj5cclxuICAgICAgeyBhZGRvbiAmJlxyXG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPXsgXCJmbGV4LTAgcGFkZGluZy1yaWdodFwiIH0+e2FkZG9ufTwvZGl2PlxyXG4gICAgICB9XHJcbiAgICA8L2Rpdj5cclxuICAgIDxkaXYgY2xhc3NOYW1lPVwibWFyZ2luXCIgPlxyXG4gICAgICB7Y2hpbGRyZW59XHJcbiAgICA8L2Rpdj5cclxuICA8L2Rpdj4pXHJcbn1cclxuXHJcbiJdfQ==