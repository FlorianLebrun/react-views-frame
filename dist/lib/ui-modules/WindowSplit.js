"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _FramePanels = require("../frame/FramePanels");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /* eslint-disable react/no-string-refs */
/* eslint-disable react-native/no-inline-styles */


/** ******************************
*********************************
*** Window Split
*********************************
*********************************/

var WindowSplit = function (_Component) {
  _inherits(WindowSplit, _Component);

  function WindowSplit() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, WindowSplit);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = WindowSplit.__proto__ || Object.getPrototypeOf(WindowSplit)).call.apply(_ref, [this].concat(args))), _this), _this.state = {}, _this.handleResize = function (index) {
      return function (delta) {
        var sizes = _this.state.sizes.slice();
        var csize = _this.refs[index].clientHeight;

        // Update sizes
        var size = sizes[index];
        delta = Math.max(size, 1) * delta / Math.max(csize, 1);
        sizes[index] += delta;
        sizes[index + 1] -= delta;

        _this.setSizes(sizes);
      };
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(WindowSplit, [{
    key: "componentWillMount",
    value: function componentWillMount() {
      var items = this.props.items;

      this.setSizes(items.map(function (item) {
        return item.size || 100;
      }));
    }
  }, {
    key: "transformDelta",
    value: function transformDelta(e) {
      return e.deltaY;
    }
  }, {
    key: "setSizes",
    value: function setSizes(sizes) {
      // Normalize sizes
      var len = sizes.reduce(function (prev, sz) {
        return prev + sz;
      }, 0);
      var factor = 100 / len;
      sizes.forEach(function (sz, i) {
        return sizes[i] *= factor;
      });

      // Update state
      this.setState({ sizes: sizes });
    }
  }, {
    key: "render",
    value: function render() {
      var items = this.props.items;
      var sizes = this.state.sizes;

      var contents = [];
      var index = 0;

      if (!items || !Array.isArray(items)) {
        console.error("Empty Collapsible Window is useless.");
        return null;
      }

      while (index < items.length - 1) {
        var _item = items[index];
        contents.push(_react2.default.createElement(
          "div",
          {
            key: contents.length,
            ref: index,
            style: { overflow: _item.overflow || "auto", height: sizes[index] + "%" }
          },
          _item.content
        ));
        contents.push(_react2.default.createElement(_FramePanels.PanelResizer, {
          key: contents.length,
          onResize: this.handleResize(index),
          transformDelta: this.transformDelta
        }));
        index++;
      }

      var item = items[index];

      contents.push(_react2.default.createElement(
        "div",
        {
          key: contents.length,
          ref: index,
          style: { overflow: item.overflow || "auto", height: sizes[index] + "%" }
        },
        item.content
      ));

      return _react2.default.createElement(
        "div",
        { className: "WND_side_panel WND_side_panel_H width-100 height-100" },
        contents
      );
    }
  }]);

  return WindowSplit;
}(_react.Component);

exports.default = WindowSplit;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9BcHBsaWNhdGlvbi91aS1tb2R1bGVzL1dpbmRvd1NwbGl0LmpzIl0sIm5hbWVzIjpbIldpbmRvd1NwbGl0Iiwic3RhdGUiLCJoYW5kbGVSZXNpemUiLCJpbmRleCIsImRlbHRhIiwic2l6ZXMiLCJzbGljZSIsImNzaXplIiwicmVmcyIsImNsaWVudEhlaWdodCIsInNpemUiLCJNYXRoIiwibWF4Iiwic2V0U2l6ZXMiLCJpdGVtcyIsInByb3BzIiwibWFwIiwiaXRlbSIsImUiLCJkZWx0YVkiLCJsZW4iLCJyZWR1Y2UiLCJwcmV2Iiwic3oiLCJmYWN0b3IiLCJmb3JFYWNoIiwiaSIsInNldFN0YXRlIiwiY29udGVudHMiLCJBcnJheSIsImlzQXJyYXkiLCJjb25zb2xlIiwiZXJyb3IiLCJsZW5ndGgiLCJwdXNoIiwib3ZlcmZsb3ciLCJoZWlnaHQiLCJjb250ZW50IiwidHJhbnNmb3JtRGVsdGEiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7O0FBRUE7Ozs7QUFFQTs7Ozs7Ozs7K2VBSkE7QUFDQTs7O0FBS0E7Ozs7OztJQXFCcUJBLFc7Ozs7Ozs7Ozs7Ozs7O2dNQUVuQkMsSyxHQUFhLEUsUUFTYkMsWSxHQUFlLFVBQUNDLEtBQUQ7QUFBQSxhQUFXLFVBQUNDLEtBQUQsRUFBVztBQUNuQyxZQUFNQyxRQUFRLE1BQUtKLEtBQUwsQ0FBV0ksS0FBWCxDQUFpQkMsS0FBakIsRUFBZDtBQUNBLFlBQU1DLFFBQVEsTUFBS0MsSUFBTCxDQUFVTCxLQUFWLEVBQWlCTSxZQUEvQjs7QUFFQTtBQUNBLFlBQU1DLE9BQU9MLE1BQU1GLEtBQU4sQ0FBYjtBQUNBQyxnQkFBUU8sS0FBS0MsR0FBTCxDQUFTRixJQUFULEVBQWUsQ0FBZixJQUFvQk4sS0FBcEIsR0FBNEJPLEtBQUtDLEdBQUwsQ0FBU0wsS0FBVCxFQUFnQixDQUFoQixDQUFwQztBQUNBRixjQUFNRixLQUFOLEtBQWdCQyxLQUFoQjtBQUNBQyxjQUFNRixRQUFRLENBQWQsS0FBb0JDLEtBQXBCOztBQUVBLGNBQUtTLFFBQUwsQ0FBY1IsS0FBZDtBQUNELE9BWGM7QUFBQSxLOzs7Ozt5Q0FQTTtBQUFBLFVBQ1hTLEtBRFcsR0FDRCxLQUFLQyxLQURKLENBQ1hELEtBRFc7O0FBRW5CLFdBQUtELFFBQUwsQ0FBY0MsTUFBTUUsR0FBTixDQUFVLFVBQUNDLElBQUQ7QUFBQSxlQUFVQSxLQUFLUCxJQUFMLElBQWEsR0FBdkI7QUFBQSxPQUFWLENBQWQ7QUFDRDs7O21DQUNjUSxDLEVBQUc7QUFDaEIsYUFBT0EsRUFBRUMsTUFBVDtBQUNEOzs7NkJBYVFkLEssRUFBTztBQUNkO0FBQ0EsVUFBTWUsTUFBTWYsTUFBTWdCLE1BQU4sQ0FBYSxVQUFDQyxJQUFELEVBQU9DLEVBQVA7QUFBQSxlQUFjRCxPQUFPQyxFQUFyQjtBQUFBLE9BQWIsRUFBc0MsQ0FBdEMsQ0FBWjtBQUNBLFVBQU1DLFNBQVMsTUFBTUosR0FBckI7QUFDQWYsWUFBTW9CLE9BQU4sQ0FBYyxVQUFDRixFQUFELEVBQUtHLENBQUw7QUFBQSxlQUFXckIsTUFBTXFCLENBQU4sS0FBWUYsTUFBdkI7QUFBQSxPQUFkOztBQUVBO0FBQ0EsV0FBS0csUUFBTCxDQUFjLEVBQUV0QixZQUFGLEVBQWQ7QUFDRDs7OzZCQUNRO0FBQUEsVUFDQ1MsS0FERCxHQUNXLEtBQUtDLEtBRGhCLENBQ0NELEtBREQ7QUFBQSxVQUVDVCxLQUZELEdBRVcsS0FBS0osS0FGaEIsQ0FFQ0ksS0FGRDs7QUFHUCxVQUFNdUIsV0FBVyxFQUFqQjtBQUNBLFVBQUl6QixRQUFRLENBQVo7O0FBRUEsVUFBSSxDQUFDVyxLQUFELElBQVUsQ0FBQ2UsTUFBTUMsT0FBTixDQUFjaEIsS0FBZCxDQUFmLEVBQXFDO0FBQ25DaUIsZ0JBQVFDLEtBQVIsQ0FBYyxzQ0FBZDtBQUNBLGVBQU8sSUFBUDtBQUNEOztBQUVELGFBQU83QixRQUFRVyxNQUFNbUIsTUFBTixHQUFlLENBQTlCLEVBQWlDO0FBQy9CLFlBQU1oQixRQUFPSCxNQUFNWCxLQUFOLENBQWI7QUFDQXlCLGlCQUFTTSxJQUFULENBQWM7QUFBQTtBQUFBO0FBQ1osaUJBQU1OLFNBQVNLLE1BREg7QUFFWixpQkFBTTlCLEtBRk07QUFHWixtQkFBTyxFQUFFZ0MsVUFBVWxCLE1BQUtrQixRQUFMLElBQWlCLE1BQTdCLEVBQXFDQyxRQUFRL0IsTUFBTUYsS0FBTixJQUFlLEdBQTVEO0FBSEs7QUFLWGMsZ0JBQUtvQjtBQUxNLFNBQWQ7QUFPQVQsaUJBQVNNLElBQVQsQ0FBYztBQUNaLGVBQU1OLFNBQVNLLE1BREg7QUFFWixvQkFBVyxLQUFLL0IsWUFBTCxDQUFrQkMsS0FBbEIsQ0FGQztBQUdaLDBCQUFpQixLQUFLbUM7QUFIVixVQUFkO0FBS0FuQztBQUNEOztBQUVELFVBQU1jLE9BQU9ILE1BQU1YLEtBQU4sQ0FBYjs7QUFFQXlCLGVBQVNNLElBQVQsQ0FBYztBQUFBO0FBQUE7QUFDWixlQUFNTixTQUFTSyxNQURIO0FBRVosZUFBTTlCLEtBRk07QUFHWixpQkFBTyxFQUFFZ0MsVUFBVWxCLEtBQUtrQixRQUFMLElBQWlCLE1BQTdCLEVBQXFDQyxRQUFRL0IsTUFBTUYsS0FBTixJQUFlLEdBQTVEO0FBSEs7QUFLWGMsYUFBS29CO0FBTE0sT0FBZDs7QUFRQSxhQUFRO0FBQUE7QUFBQSxVQUFLLFdBQVUsc0RBQWY7QUFDTFQ7QUFESyxPQUFSO0FBR0Q7Ozs7OztrQkF6RWtCNUIsVyIsImZpbGUiOiJXaW5kb3dTcGxpdC5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8qIGVzbGludC1kaXNhYmxlIHJlYWN0L25vLXN0cmluZy1yZWZzICovXHJcbi8qIGVzbGludC1kaXNhYmxlIHJlYWN0LW5hdGl2ZS9uby1pbmxpbmUtc3R5bGVzICovXHJcbmltcG9ydCBSZWFjdCwgeyBDb21wb25lbnQgfSBmcm9tIFwicmVhY3RcIlxyXG5cclxuaW1wb3J0IHsgUGFuZWxSZXNpemVyIH0gZnJvbSBcIi4uL2ZyYW1lL0ZyYW1lUGFuZWxzXCJcclxuXHJcbi8qKiAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcclxuKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXHJcbioqKiBXaW5kb3cgU3BsaXRcclxuKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXHJcbioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKi9cclxuXHJcbmV4cG9ydCB0eXBlIEl0ZW1TcGxpdFR5cGUgPSB7XHJcbiAgY29udGVudDogUmVhY3QkRWxlbWVudDxhbnk+LFxyXG4gIHNpemU6IG51bWJlcixcclxuICBvdmVyZmxvdzogc3RyaW5nLFxyXG59XHJcblxyXG50eXBlIFByb3BzVHlwZSA9IHtcclxuICBpdGVtcz86IEFycmF5PEl0ZW1TcGxpdFR5cGU+LFxyXG4gIHN0eWxlPzogT2JqZWN0IHwgQXJyYXk8YW55PixcclxufVxyXG5cclxudHlwZSBTdGF0ZVR5cGUgPSB7XHJcbiAgc2l6ZXM/OiBBcnJheTxudW1iZXI+LFxyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBXaW5kb3dTcGxpdCBleHRlbmRzIENvbXBvbmVudDx2b2lkLCBQcm9wc1R5cGUsIFN0YXRlVHlwZT4ge1xyXG4gIHByb3BzOiBQcm9wc1R5cGVcclxuICBzdGF0ZTogYW55ID0ge31cclxuXHJcbiAgY29tcG9uZW50V2lsbE1vdW50KCkge1xyXG4gICAgY29uc3QgeyBpdGVtcyB9ID0gdGhpcy5wcm9wc1xyXG4gICAgdGhpcy5zZXRTaXplcyhpdGVtcy5tYXAoKGl0ZW0pID0+IGl0ZW0uc2l6ZSB8fCAxMDApKVxyXG4gIH1cclxuICB0cmFuc2Zvcm1EZWx0YShlKSB7XHJcbiAgICByZXR1cm4gZS5kZWx0YVlcclxuICB9XHJcbiAgaGFuZGxlUmVzaXplID0gKGluZGV4KSA9PiAoZGVsdGEpID0+IHtcclxuICAgIGNvbnN0IHNpemVzID0gdGhpcy5zdGF0ZS5zaXplcy5zbGljZSgpXHJcbiAgICBjb25zdCBjc2l6ZSA9IHRoaXMucmVmc1tpbmRleF0uY2xpZW50SGVpZ2h0XHJcblxyXG4gICAgLy8gVXBkYXRlIHNpemVzXHJcbiAgICBjb25zdCBzaXplID0gc2l6ZXNbaW5kZXhdXHJcbiAgICBkZWx0YSA9IE1hdGgubWF4KHNpemUsIDEpICogZGVsdGEgLyBNYXRoLm1heChjc2l6ZSwgMSlcclxuICAgIHNpemVzW2luZGV4XSArPSBkZWx0YVxyXG4gICAgc2l6ZXNbaW5kZXggKyAxXSAtPSBkZWx0YVxyXG5cclxuICAgIHRoaXMuc2V0U2l6ZXMoc2l6ZXMpXHJcbiAgfVxyXG4gIHNldFNpemVzKHNpemVzKSB7XHJcbiAgICAvLyBOb3JtYWxpemUgc2l6ZXNcclxuICAgIGNvbnN0IGxlbiA9IHNpemVzLnJlZHVjZSgocHJldiwgc3opID0+IHByZXYgKyBzeiwgMClcclxuICAgIGNvbnN0IGZhY3RvciA9IDEwMCAvIGxlblxyXG4gICAgc2l6ZXMuZm9yRWFjaCgoc3osIGkpID0+IHNpemVzW2ldICo9IGZhY3RvcilcclxuXHJcbiAgICAvLyBVcGRhdGUgc3RhdGVcclxuICAgIHRoaXMuc2V0U3RhdGUoeyBzaXplcyB9KVxyXG4gIH1cclxuICByZW5kZXIoKSB7XHJcbiAgICBjb25zdCB7IGl0ZW1zIH0gPSB0aGlzLnByb3BzXHJcbiAgICBjb25zdCB7IHNpemVzIH0gPSB0aGlzLnN0YXRlXHJcbiAgICBjb25zdCBjb250ZW50cyA9IFtdXHJcbiAgICBsZXQgaW5kZXggPSAwXHJcblxyXG4gICAgaWYgKCFpdGVtcyB8fCAhQXJyYXkuaXNBcnJheShpdGVtcykpIHtcclxuICAgICAgY29uc29sZS5lcnJvcihcIkVtcHR5IENvbGxhcHNpYmxlIFdpbmRvdyBpcyB1c2VsZXNzLlwiKVxyXG4gICAgICByZXR1cm4gbnVsbFxyXG4gICAgfVxyXG5cclxuICAgIHdoaWxlIChpbmRleCA8IGl0ZW1zLmxlbmd0aCAtIDEpIHtcclxuICAgICAgY29uc3QgaXRlbSA9IGl0ZW1zW2luZGV4XVxyXG4gICAgICBjb250ZW50cy5wdXNoKDxkaXZcclxuICAgICAgICBrZXk9eyBjb250ZW50cy5sZW5ndGggfVxyXG4gICAgICAgIHJlZj17IGluZGV4IH1cclxuICAgICAgICBzdHlsZT17eyBvdmVyZmxvdzogaXRlbS5vdmVyZmxvdyB8fCBcImF1dG9cIiwgaGVpZ2h0OiBzaXplc1tpbmRleF0gKyBcIiVcIiB9fVxyXG4gICAgICAgICAgICAgICAgICAgID5cclxuICAgICAgICB7aXRlbS5jb250ZW50fVxyXG4gICAgICA8L2Rpdj4pXHJcbiAgICAgIGNvbnRlbnRzLnB1c2goPFBhbmVsUmVzaXplclxyXG4gICAgICAgIGtleT17IGNvbnRlbnRzLmxlbmd0aCB9XHJcbiAgICAgICAgb25SZXNpemU9eyB0aGlzLmhhbmRsZVJlc2l6ZShpbmRleCkgfVxyXG4gICAgICAgIHRyYW5zZm9ybURlbHRhPXsgdGhpcy50cmFuc2Zvcm1EZWx0YSB9XHJcbiAgICAgICAgICAgICAgICAgICAgLz4pXHJcbiAgICAgIGluZGV4KytcclxuICAgIH1cclxuXHJcbiAgICBjb25zdCBpdGVtID0gaXRlbXNbaW5kZXhdXHJcblxyXG4gICAgY29udGVudHMucHVzaCg8ZGl2XHJcbiAgICAgIGtleT17IGNvbnRlbnRzLmxlbmd0aCB9XHJcbiAgICAgIHJlZj17IGluZGV4IH1cclxuICAgICAgc3R5bGU9e3sgb3ZlcmZsb3c6IGl0ZW0ub3ZlcmZsb3cgfHwgXCJhdXRvXCIsIGhlaWdodDogc2l6ZXNbaW5kZXhdICsgXCIlXCIgfX1cclxuICAgICAgICAgICAgICAgICAgPlxyXG4gICAgICB7aXRlbS5jb250ZW50fVxyXG4gICAgPC9kaXY+KVxyXG5cclxuICAgIHJldHVybiAoPGRpdiBjbGFzc05hbWU9XCJXTkRfc2lkZV9wYW5lbCBXTkRfc2lkZV9wYW5lbF9IIHdpZHRoLTEwMCBoZWlnaHQtMTAwXCI+XHJcbiAgICAgIHtjb250ZW50c31cclxuICAgIDwvZGl2PilcclxuICB9XHJcbn1cclxuIl19