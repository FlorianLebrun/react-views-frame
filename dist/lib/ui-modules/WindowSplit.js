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
        { className: "WND_side_panel H width-100 height-100" },
        contents
      );
    }
  }]);

  return WindowSplit;
}(_react.Component);

exports.default = WindowSplit;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9saWIvdWktbW9kdWxlcy9XaW5kb3dTcGxpdC5qcyJdLCJuYW1lcyI6WyJXaW5kb3dTcGxpdCIsInN0YXRlIiwiaGFuZGxlUmVzaXplIiwiaW5kZXgiLCJkZWx0YSIsInNpemVzIiwic2xpY2UiLCJjc2l6ZSIsInJlZnMiLCJjbGllbnRIZWlnaHQiLCJzaXplIiwiTWF0aCIsIm1heCIsInNldFNpemVzIiwiaXRlbXMiLCJwcm9wcyIsIm1hcCIsIml0ZW0iLCJlIiwiZGVsdGFZIiwibGVuIiwicmVkdWNlIiwicHJldiIsInN6IiwiZmFjdG9yIiwiZm9yRWFjaCIsImkiLCJzZXRTdGF0ZSIsImNvbnRlbnRzIiwiQXJyYXkiLCJpc0FycmF5IiwiY29uc29sZSIsImVycm9yIiwibGVuZ3RoIiwicHVzaCIsIm92ZXJmbG93IiwiaGVpZ2h0IiwiY29udGVudCIsInRyYW5zZm9ybURlbHRhIl0sIm1hcHBpbmdzIjoiOzs7Ozs7OztBQUVBOzs7O0FBRUE7Ozs7Ozs7OytlQUpBO0FBQ0E7OztBQUtBOzs7Ozs7SUFxQnFCQSxXOzs7Ozs7Ozs7Ozs7OztnTUFFbkJDLEssR0FBYSxFLFFBU2JDLFksR0FBZSxVQUFDQyxLQUFEO0FBQUEsYUFBVyxVQUFDQyxLQUFELEVBQVc7QUFDbkMsWUFBTUMsUUFBUSxNQUFLSixLQUFMLENBQVdJLEtBQVgsQ0FBaUJDLEtBQWpCLEVBQWQ7QUFDQSxZQUFNQyxRQUFRLE1BQUtDLElBQUwsQ0FBVUwsS0FBVixFQUFpQk0sWUFBL0I7O0FBRUE7QUFDQSxZQUFNQyxPQUFPTCxNQUFNRixLQUFOLENBQWI7QUFDQUMsZ0JBQVFPLEtBQUtDLEdBQUwsQ0FBU0YsSUFBVCxFQUFlLENBQWYsSUFBb0JOLEtBQXBCLEdBQTRCTyxLQUFLQyxHQUFMLENBQVNMLEtBQVQsRUFBZ0IsQ0FBaEIsQ0FBcEM7QUFDQUYsY0FBTUYsS0FBTixLQUFnQkMsS0FBaEI7QUFDQUMsY0FBTUYsUUFBUSxDQUFkLEtBQW9CQyxLQUFwQjs7QUFFQSxjQUFLUyxRQUFMLENBQWNSLEtBQWQ7QUFDRCxPQVhjO0FBQUEsSzs7Ozs7eUNBUE07QUFBQSxVQUNYUyxLQURXLEdBQ0QsS0FBS0MsS0FESixDQUNYRCxLQURXOztBQUVuQixXQUFLRCxRQUFMLENBQWNDLE1BQU1FLEdBQU4sQ0FBVSxVQUFDQyxJQUFEO0FBQUEsZUFBVUEsS0FBS1AsSUFBTCxJQUFhLEdBQXZCO0FBQUEsT0FBVixDQUFkO0FBQ0Q7OzttQ0FDY1EsQyxFQUFHO0FBQ2hCLGFBQU9BLEVBQUVDLE1BQVQ7QUFDRDs7OzZCQWFRZCxLLEVBQU87QUFDZDtBQUNBLFVBQU1lLE1BQU1mLE1BQU1nQixNQUFOLENBQWEsVUFBQ0MsSUFBRCxFQUFPQyxFQUFQO0FBQUEsZUFBY0QsT0FBT0MsRUFBckI7QUFBQSxPQUFiLEVBQXNDLENBQXRDLENBQVo7QUFDQSxVQUFNQyxTQUFTLE1BQU1KLEdBQXJCO0FBQ0FmLFlBQU1vQixPQUFOLENBQWMsVUFBQ0YsRUFBRCxFQUFLRyxDQUFMO0FBQUEsZUFBV3JCLE1BQU1xQixDQUFOLEtBQVlGLE1BQXZCO0FBQUEsT0FBZDs7QUFFQTtBQUNBLFdBQUtHLFFBQUwsQ0FBYyxFQUFFdEIsWUFBRixFQUFkO0FBQ0Q7Ozs2QkFDUTtBQUFBLFVBQ0NTLEtBREQsR0FDVyxLQUFLQyxLQURoQixDQUNDRCxLQUREO0FBQUEsVUFFQ1QsS0FGRCxHQUVXLEtBQUtKLEtBRmhCLENBRUNJLEtBRkQ7O0FBR1AsVUFBTXVCLFdBQVcsRUFBakI7QUFDQSxVQUFJekIsUUFBUSxDQUFaOztBQUVBLFVBQUksQ0FBQ1csS0FBRCxJQUFVLENBQUNlLE1BQU1DLE9BQU4sQ0FBY2hCLEtBQWQsQ0FBZixFQUFxQztBQUNuQ2lCLGdCQUFRQyxLQUFSLENBQWMsc0NBQWQ7QUFDQSxlQUFPLElBQVA7QUFDRDs7QUFFRCxhQUFPN0IsUUFBUVcsTUFBTW1CLE1BQU4sR0FBZSxDQUE5QixFQUFpQztBQUMvQixZQUFNaEIsUUFBT0gsTUFBTVgsS0FBTixDQUFiO0FBQ0F5QixpQkFBU00sSUFBVCxDQUFjO0FBQUE7QUFBQTtBQUNaLGlCQUFNTixTQUFTSyxNQURIO0FBRVosaUJBQU05QixLQUZNO0FBR1osbUJBQU8sRUFBRWdDLFVBQVVsQixNQUFLa0IsUUFBTCxJQUFpQixNQUE3QixFQUFxQ0MsUUFBUS9CLE1BQU1GLEtBQU4sSUFBZSxHQUE1RDtBQUhLO0FBS1hjLGdCQUFLb0I7QUFMTSxTQUFkO0FBT0FULGlCQUFTTSxJQUFULENBQWM7QUFDWixlQUFNTixTQUFTSyxNQURIO0FBRVosb0JBQVcsS0FBSy9CLFlBQUwsQ0FBa0JDLEtBQWxCLENBRkM7QUFHWiwwQkFBaUIsS0FBS21DO0FBSFYsVUFBZDtBQUtBbkM7QUFDRDs7QUFFRCxVQUFNYyxPQUFPSCxNQUFNWCxLQUFOLENBQWI7O0FBRUF5QixlQUFTTSxJQUFULENBQWM7QUFBQTtBQUFBO0FBQ1osZUFBTU4sU0FBU0ssTUFESDtBQUVaLGVBQU05QixLQUZNO0FBR1osaUJBQU8sRUFBRWdDLFVBQVVsQixLQUFLa0IsUUFBTCxJQUFpQixNQUE3QixFQUFxQ0MsUUFBUS9CLE1BQU1GLEtBQU4sSUFBZSxHQUE1RDtBQUhLO0FBS1hjLGFBQUtvQjtBQUxNLE9BQWQ7O0FBUUEsYUFBUTtBQUFBO0FBQUEsVUFBSyxXQUFVLHVDQUFmO0FBQ0xUO0FBREssT0FBUjtBQUdEOzs7Ozs7a0JBekVrQjVCLFciLCJmaWxlIjoiV2luZG93U3BsaXQuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvKiBlc2xpbnQtZGlzYWJsZSByZWFjdC9uby1zdHJpbmctcmVmcyAqL1xyXG4vKiBlc2xpbnQtZGlzYWJsZSByZWFjdC1uYXRpdmUvbm8taW5saW5lLXN0eWxlcyAqL1xyXG5pbXBvcnQgUmVhY3QsIHsgQ29tcG9uZW50IH0gZnJvbSBcInJlYWN0XCJcclxuXHJcbmltcG9ydCB7IFBhbmVsUmVzaXplciB9IGZyb20gXCIuLi9mcmFtZS9GcmFtZVBhbmVsc1wiXHJcblxyXG4vKiogKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXHJcbioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxyXG4qKiogV2luZG93IFNwbGl0XHJcbioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxyXG4qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiovXHJcblxyXG5leHBvcnQgdHlwZSBJdGVtU3BsaXRUeXBlID0ge1xyXG4gIGNvbnRlbnQ6IFJlYWN0JEVsZW1lbnQ8YW55PixcclxuICBzaXplOiBudW1iZXIsXHJcbiAgb3ZlcmZsb3c6IHN0cmluZyxcclxufVxyXG5cclxudHlwZSBQcm9wc1R5cGUgPSB7XHJcbiAgaXRlbXM/OiBBcnJheTxJdGVtU3BsaXRUeXBlPixcclxuICBzdHlsZT86IE9iamVjdCB8IEFycmF5PGFueT4sXHJcbn1cclxuXHJcbnR5cGUgU3RhdGVUeXBlID0ge1xyXG4gIHNpemVzPzogQXJyYXk8bnVtYmVyPixcclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgV2luZG93U3BsaXQgZXh0ZW5kcyBDb21wb25lbnQ8dm9pZCwgUHJvcHNUeXBlLCBTdGF0ZVR5cGU+IHtcclxuICBwcm9wczogUHJvcHNUeXBlXHJcbiAgc3RhdGU6IGFueSA9IHt9XHJcblxyXG4gIGNvbXBvbmVudFdpbGxNb3VudCgpIHtcclxuICAgIGNvbnN0IHsgaXRlbXMgfSA9IHRoaXMucHJvcHNcclxuICAgIHRoaXMuc2V0U2l6ZXMoaXRlbXMubWFwKChpdGVtKSA9PiBpdGVtLnNpemUgfHwgMTAwKSlcclxuICB9XHJcbiAgdHJhbnNmb3JtRGVsdGEoZSkge1xyXG4gICAgcmV0dXJuIGUuZGVsdGFZXHJcbiAgfVxyXG4gIGhhbmRsZVJlc2l6ZSA9IChpbmRleCkgPT4gKGRlbHRhKSA9PiB7XHJcbiAgICBjb25zdCBzaXplcyA9IHRoaXMuc3RhdGUuc2l6ZXMuc2xpY2UoKVxyXG4gICAgY29uc3QgY3NpemUgPSB0aGlzLnJlZnNbaW5kZXhdLmNsaWVudEhlaWdodFxyXG5cclxuICAgIC8vIFVwZGF0ZSBzaXplc1xyXG4gICAgY29uc3Qgc2l6ZSA9IHNpemVzW2luZGV4XVxyXG4gICAgZGVsdGEgPSBNYXRoLm1heChzaXplLCAxKSAqIGRlbHRhIC8gTWF0aC5tYXgoY3NpemUsIDEpXHJcbiAgICBzaXplc1tpbmRleF0gKz0gZGVsdGFcclxuICAgIHNpemVzW2luZGV4ICsgMV0gLT0gZGVsdGFcclxuXHJcbiAgICB0aGlzLnNldFNpemVzKHNpemVzKVxyXG4gIH1cclxuICBzZXRTaXplcyhzaXplcykge1xyXG4gICAgLy8gTm9ybWFsaXplIHNpemVzXHJcbiAgICBjb25zdCBsZW4gPSBzaXplcy5yZWR1Y2UoKHByZXYsIHN6KSA9PiBwcmV2ICsgc3osIDApXHJcbiAgICBjb25zdCBmYWN0b3IgPSAxMDAgLyBsZW5cclxuICAgIHNpemVzLmZvckVhY2goKHN6LCBpKSA9PiBzaXplc1tpXSAqPSBmYWN0b3IpXHJcblxyXG4gICAgLy8gVXBkYXRlIHN0YXRlXHJcbiAgICB0aGlzLnNldFN0YXRlKHsgc2l6ZXMgfSlcclxuICB9XHJcbiAgcmVuZGVyKCkge1xyXG4gICAgY29uc3QgeyBpdGVtcyB9ID0gdGhpcy5wcm9wc1xyXG4gICAgY29uc3QgeyBzaXplcyB9ID0gdGhpcy5zdGF0ZVxyXG4gICAgY29uc3QgY29udGVudHMgPSBbXVxyXG4gICAgbGV0IGluZGV4ID0gMFxyXG5cclxuICAgIGlmICghaXRlbXMgfHwgIUFycmF5LmlzQXJyYXkoaXRlbXMpKSB7XHJcbiAgICAgIGNvbnNvbGUuZXJyb3IoXCJFbXB0eSBDb2xsYXBzaWJsZSBXaW5kb3cgaXMgdXNlbGVzcy5cIilcclxuICAgICAgcmV0dXJuIG51bGxcclxuICAgIH1cclxuXHJcbiAgICB3aGlsZSAoaW5kZXggPCBpdGVtcy5sZW5ndGggLSAxKSB7XHJcbiAgICAgIGNvbnN0IGl0ZW0gPSBpdGVtc1tpbmRleF1cclxuICAgICAgY29udGVudHMucHVzaCg8ZGl2XHJcbiAgICAgICAga2V5PXsgY29udGVudHMubGVuZ3RoIH1cclxuICAgICAgICByZWY9eyBpbmRleCB9XHJcbiAgICAgICAgc3R5bGU9e3sgb3ZlcmZsb3c6IGl0ZW0ub3ZlcmZsb3cgfHwgXCJhdXRvXCIsIGhlaWdodDogc2l6ZXNbaW5kZXhdICsgXCIlXCIgfX1cclxuICAgICAgICAgICAgICAgICAgICA+XHJcbiAgICAgICAge2l0ZW0uY29udGVudH1cclxuICAgICAgPC9kaXY+KVxyXG4gICAgICBjb250ZW50cy5wdXNoKDxQYW5lbFJlc2l6ZXJcclxuICAgICAgICBrZXk9eyBjb250ZW50cy5sZW5ndGggfVxyXG4gICAgICAgIG9uUmVzaXplPXsgdGhpcy5oYW5kbGVSZXNpemUoaW5kZXgpIH1cclxuICAgICAgICB0cmFuc2Zvcm1EZWx0YT17IHRoaXMudHJhbnNmb3JtRGVsdGEgfVxyXG4gICAgICAgICAgICAgICAgICAgIC8+KVxyXG4gICAgICBpbmRleCsrXHJcbiAgICB9XHJcblxyXG4gICAgY29uc3QgaXRlbSA9IGl0ZW1zW2luZGV4XVxyXG5cclxuICAgIGNvbnRlbnRzLnB1c2goPGRpdlxyXG4gICAgICBrZXk9eyBjb250ZW50cy5sZW5ndGggfVxyXG4gICAgICByZWY9eyBpbmRleCB9XHJcbiAgICAgIHN0eWxlPXt7IG92ZXJmbG93OiBpdGVtLm92ZXJmbG93IHx8IFwiYXV0b1wiLCBoZWlnaHQ6IHNpemVzW2luZGV4XSArIFwiJVwiIH19XHJcbiAgICAgICAgICAgICAgICAgID5cclxuICAgICAge2l0ZW0uY29udGVudH1cclxuICAgIDwvZGl2PilcclxuXHJcbiAgICByZXR1cm4gKDxkaXYgY2xhc3NOYW1lPVwiV05EX3NpZGVfcGFuZWwgSCB3aWR0aC0xMDAgaGVpZ2h0LTEwMFwiPlxyXG4gICAgICB7Y29udGVudHN9XHJcbiAgICA8L2Rpdj4pXHJcbiAgfVxyXG59XHJcbiJdfQ==