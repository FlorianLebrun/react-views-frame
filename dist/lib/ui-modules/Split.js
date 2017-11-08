"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _FramePanels = require("../addons/windows-frame/FramePanels");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /* eslint-disable react/no-string-refs */


/** ******************************
*********************************
*** Window Split
*********************************
*********************************/

var Split = function (_Component) {
  _inherits(Split, _Component);

  function Split() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, Split);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = Split.__proto__ || Object.getPrototypeOf(Split)).call.apply(_ref, [this].concat(args))), _this), _this.handleResize = function (index) {
      return function (delta) {
        var _this2 = _this,
            sizes = _this2.sizes,
            modes = _this2.modes;

        if (modes[index] > 0) {
          var csize = _this.refs[index].clientHeight;

          // Update sizes
          var _size = sizes[index];
          delta = Math.max(_size, 1) * delta / Math.max(csize, 1);
          sizes[index] += delta;
          sizes[index + 1] -= delta;

          _this.applySizes();
        }
      };
    }, _this.handleCollapse = function (index) {
      return function () {
        var _this3 = _this,
            modes = _this3.modes;

        modes[index] = -modes[index];
        _this.applySizes();
      };
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(Split, [{
    key: "componentWillMount",
    value: function componentWillMount() {
      var items = this.props.items;

      this.sizes = items.map(function (item) {
        return item.size || 0;
      });
      this.modes = items.map(function (item) {
        return item.size !== undefined ? 1 : 0;
      });
      this.styles = items.map(function (item) {
        return { overflow: item.overflow || "auto" };
      });
      this.applySizes();
    }
  }, {
    key: "transformDelta",
    value: function transformDelta(e) {
      return e.deltaY;
    }
  }, {
    key: "applySizes",
    value: function applySizes() {
      var sizes = this.sizes,
          modes = this.modes,
          styles = this.styles;

      // Accumulate sizes

      var len = 0;
      for (var i = 0; i < sizes.length; i++) {
        if (sizes[i] > 0) len += sizes[i];
      }

      // Normalize sizes
      var factor = len ? 100 / len : 1;
      for (var _i = 0; _i < sizes.length; _i++) {
        var mode = modes[_i];
        sizes[_i] *= factor;
        if (mode > 0) {
          styles[_i] = _extends({}, styles[_i], { height: sizes[_i] + "%" });
        } else if (mode < 0) {
          styles[_i] = _extends({}, styles[_i], { height: 0 });
        } else {
          styles[_i] = { height: "auto" };
        }
      }

      // Update
      this.forceUpdate();
    }
  }, {
    key: "render",
    value: function render() {
      var items = this.props.items;

      var contents = [];

      if (!items || !Array.isArray(items)) {
        console.error("Empty Collapsible Window is useless.");
        return null;
      }

      var lastIndex = items.length - 1;
      for (var i = 0; i <= lastIndex; i++) {
        var item = items[i];

        // Render header
        if (item.header) {
          contents.push(_react2.default.createElement(
            "div",
            {
              key: contents.length,
              style: styles.header,
              onClick: this.handleCollapse(i)
            },
            this.modes[i] > 0 ? _react2.default.createElement("span", { className: "fa fa-fw fa-caret-right padding-xs" }) : _react2.default.createElement("span", { className: "fa fa-fw fa-caret-down padding-xs" }),
            item.header
          ));
        }

        // Render content
        contents.push(_react2.default.createElement(
          "div",
          {
            key: contents.length,
            ref: i,
            style: this.styles[i]
          },
          item.content
        ));

        // Render resizer
        if (i < lastIndex) {
          contents.push(_react2.default.createElement(_FramePanels.PanelResizer, {
            key: contents.length,
            onResize: this.handleResize(i),
            transformDelta: this.transformDelta
          }));
        }
      }

      return _react2.default.createElement(
        "div",
        { className: "WND_side_panel WND_side_panel_H width-100 height-100" },
        contents
      );
    }
  }]);

  return Split;
}(_react.Component);

exports.default = Split;


var styles = {
  header: {
    cursor: "pointer",
    backgroundColor: "#234",
    borderBottom: "solid 1px #012",
    color: "#89a"
  }
};
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9saWIvdWktbW9kdWxlcy9TcGxpdC5qcyJdLCJuYW1lcyI6WyJTcGxpdCIsImhhbmRsZVJlc2l6ZSIsImluZGV4IiwiZGVsdGEiLCJzaXplcyIsIm1vZGVzIiwiY3NpemUiLCJyZWZzIiwiY2xpZW50SGVpZ2h0Iiwic2l6ZSIsIk1hdGgiLCJtYXgiLCJhcHBseVNpemVzIiwiaGFuZGxlQ29sbGFwc2UiLCJpdGVtcyIsInByb3BzIiwibWFwIiwiaXRlbSIsInVuZGVmaW5lZCIsInN0eWxlcyIsIm92ZXJmbG93IiwiZSIsImRlbHRhWSIsImxlbiIsImkiLCJsZW5ndGgiLCJmYWN0b3IiLCJtb2RlIiwiaGVpZ2h0IiwiZm9yY2VVcGRhdGUiLCJjb250ZW50cyIsIkFycmF5IiwiaXNBcnJheSIsImNvbnNvbGUiLCJlcnJvciIsImxhc3RJbmRleCIsImhlYWRlciIsInB1c2giLCJjb250ZW50IiwidHJhbnNmb3JtRGVsdGEiLCJjdXJzb3IiLCJiYWNrZ3JvdW5kQ29sb3IiLCJib3JkZXJCb3R0b20iLCJjb2xvciJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUNBOzs7O0FBRUE7Ozs7Ozs7OytlQUhBOzs7QUFLQTs7Ozs7O0lBaUJxQkEsSzs7Ozs7Ozs7Ozs7Ozs7b0xBa0JuQkMsWSxHQUFlLFVBQUNDLEtBQUQ7QUFBQSxhQUFXLFVBQUNDLEtBQUQsRUFBVztBQUFBO0FBQUEsWUFDM0JDLEtBRDJCLFVBQzNCQSxLQUQyQjtBQUFBLFlBQ3BCQyxLQURvQixVQUNwQkEsS0FEb0I7O0FBRW5DLFlBQUlBLE1BQU1ILEtBQU4sSUFBZSxDQUFuQixFQUFzQjtBQUNwQixjQUFNSSxRQUFRLE1BQUtDLElBQUwsQ0FBVUwsS0FBVixFQUFpQk0sWUFBL0I7O0FBRUE7QUFDQSxjQUFNQyxRQUFPTCxNQUFNRixLQUFOLENBQWI7QUFDQUMsa0JBQVFPLEtBQUtDLEdBQUwsQ0FBU0YsS0FBVCxFQUFlLENBQWYsSUFBb0JOLEtBQXBCLEdBQTRCTyxLQUFLQyxH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ZWFjdC9uby1zdHJpbmctcmVmcyAqL1xyXG5pbXBvcnQgUmVhY3QsIHsgQ29tcG9uZW50IH0gZnJvbSBcInJlYWN0XCJcclxuXHJcbmltcG9ydCB7IFBhbmVsUmVzaXplciB9IGZyb20gXCIuLi9hZGRvbnMvd2luZG93cy1mcmFtZS9GcmFtZVBhbmVsc1wiXHJcblxyXG4vKiogKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXHJcbioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxyXG4qKiogV2luZG93IFNwbGl0XHJcbioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxyXG4qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiovXHJcblxyXG5leHBvcnQgdHlwZSBJdGVtU3BsaXRUeXBlID0ge1xyXG4gIGNvbnRlbnQ6IFJlYWN0JEVsZW1lbnQ8YW55PixcclxuICBzaXplOiBudW1iZXIsXHJcbiAgb3ZlcmZsb3c6IHN0cmluZyxcclxufVxyXG5cclxudHlwZSBQcm9wc1R5cGUgPSB7XHJcbiAgaXRlbXM/OiBBcnJheTxJdGVtU3BsaXRUeXBlPixcclxuICBzdHlsZT86IE9iamVjdCB8IEFycmF5PGFueT4sXHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFNwbGl0IGV4dGVuZHMgQ29tcG9uZW50PHZvaWQsIFByb3BzVHlwZSwgdm9pZD4ge1xyXG4gIHByb3BzOiBQcm9wc1R5cGVcclxuXHJcbiAgY29tcG9uZW50V2lsbE1vdW50KCkge1xyXG4gICAgY29uc3QgeyBpdGVtcyB9ID0gdGhpcy5wcm9wc1xyXG4gICAgdGhpcy5zaXplcyA9IGl0ZW1zLm1hcCgoaXRlbSkgPT4gaXRlbS5zaXplIHx8IDApXHJcbiAgICB0aGlzLm1vZGVzID0gaXRlbXMubWFwKChpdGVtKSA9PiBpdGVtLnNpemUgIT09IHVuZGVmaW5lZCA/IDEgOiAwKVxyXG4gICAgdGhpcy5zdHlsZXMgPSBpdGVtcy5tYXAoKGl0ZW0pID0+ICh7IG92ZXJmbG93OiBpdGVtLm92ZXJmbG93IHx8IFwiYXV0b1wiIH0pKVxyXG4gICAgdGhpcy5hcHBseVNpemVzKClcclxuICB9XHJcblxyXG4gIHNpemVzOiBBcnJheTxudW1iZXI+XHJcbiAgbW9kZXM6IEFycmF5PG51bWJlcj5cclxuICBzdHlsZXM6IEFycmF5PE9iamVjdD5cclxuXHJcbiAgdHJhbnNmb3JtRGVsdGEoZSkge1xyXG4gICAgcmV0dXJuIGUuZGVsdGFZXHJcbiAgfVxyXG4gIGhhbmRsZVJlc2l6ZSA9IChpbmRleCkgPT4gKGRlbHRhKSA9PiB7XHJcbiAgICBjb25zdCB7IHNpemVzLCBtb2RlcyB9ID0gdGhpc1xyXG4gICAgaWYgKG1vZGVzW2luZGV4XSA+IDApIHtcclxuICAgICAgY29uc3QgY3NpemUgPSB0aGlzLnJlZnNbaW5kZXhdLmNsaWVudEhlaWdodFxyXG5cclxuICAgICAgLy8gVXBkYXRlIHNpemVzXHJcbiAgICAgIGNvbnN0IHNpemUgPSBzaXplc1tpbmRleF1cclxuICAgICAgZGVsdGEgPSBNYXRoLm1heChzaXplLCAxKSAqIGRlbHRhIC8gTWF0aC5tYXgoY3NpemUsIDEpXHJcbiAgICAgIHNpemVzW2luZGV4XSArPSBkZWx0YVxyXG4gICAgICBzaXplc1tpbmRleCArIDFdIC09IGRlbHRhXHJcblxyXG4gICAgICB0aGlzLmFwcGx5U2l6ZXMoKVxyXG4gICAgfVxyXG4gIH1cclxuICBoYW5kbGVDb2xsYXBzZSA9IChpbmRleCkgPT4gKCkgPT4ge1xyXG4gICAgY29uc3QgeyBtb2RlcyB9ID0gdGhpc1xyXG4gICAgbW9kZXNbaW5kZXhdID0gLW1vZGVzW2luZGV4XVxyXG4gICAgdGhpcy5hcHBseVNpemVzKClcclxuICB9XHJcbiAgYXBwbHlTaXplcygpIHtcclxuICAgIGNvbnN0IHsgc2l6ZXMsIG1vZGVzLCBzdHlsZXMgfSA9IHRoaXNcclxuXHJcbiAgICAvLyBBY2N1bXVsYXRlIHNpemVzXHJcbiAgICBsZXQgbGVuID0gMFxyXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBzaXplcy5sZW5ndGg7IGkrKykge1xyXG4gICAgICBpZiAoc2l6ZXNbaV0gPiAwKSBsZW4gKz0gc2l6ZXNbaV1cclxuICAgIH1cclxuXHJcbiAgICAvLyBOb3JtYWxpemUgc2l6ZXNcclxuICAgIGNvbnN0IGZhY3RvciA9IGxlbiA/IDEwMCAvIGxlbiA6IDFcclxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgc2l6ZXMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgY29uc3QgbW9kZSA9IG1vZGVzW2ldXHJcbiAgICAgIHNpemVzW2ldICo9IGZhY3RvclxyXG4gICAgICBpZiAobW9kZSA+IDApIHtcclxuICAgICAgICBzdHlsZXNbaV0gPSB7IC4uLnN0eWxlc1tpXSwgaGVpZ2h0OiBzaXplc1tpXSArIFwiJVwiIH1cclxuICAgICAgfVxyXG4gICAgICBlbHNlIGlmIChtb2RlIDwgMCkge1xyXG4gICAgICAgIHN0eWxlc1tpXSA9IHsgLi4uc3R5bGVzW2ldLCBoZWlnaHQ6IDAgfVxyXG4gICAgICB9XHJcbiAgICAgIGVsc2Uge1xyXG4gICAgICAgIHN0eWxlc1tpXSA9IHsgaGVpZ2h0OiBcImF1dG9cIiB9XHJcbiAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvLyBVcGRhdGVcclxuICAgIHRoaXMuZm9yY2VVcGRhdGUoKVxyXG4gIH1cclxuICByZW5kZXIoKSB7XHJcbiAgICBjb25zdCB7IGl0ZW1zIH0gPSB0aGlzLnByb3BzXHJcbiAgICBjb25zdCBjb250ZW50cyA9IFtdXHJcblxyXG4gICAgaWYgKCFpdGVtcyB8fCAhQXJyYXkuaXNBcnJheShpdGVtcykpIHtcclxuICAgICAgY29uc29sZS5lcnJvcihcIkVtcHR5IENvbGxhcHNpYmxlIFdpbmRvdyBpcyB1c2VsZXNzLlwiKVxyXG4gICAgICByZXR1cm4gbnVsbFxyXG4gICAgfVxyXG5cclxuICAgIGNvbnN0IGxhc3RJbmRleCA9IGl0ZW1zLmxlbmd0aCAtIDFcclxuICAgIGZvciAobGV0IGkgPSAwOyBpIDw9IGxhc3RJbmRleDsgaSsrKSB7XHJcbiAgICAgIGNvbnN0IGl0ZW0gPSBpdGVtc1tpXVxyXG5cclxuICAgICAgLy8gUmVuZGVyIGhlYWRlclxyXG4gICAgICBpZiAoaXRlbS5oZWFkZXIpIHtcclxuICAgICAgICBjb250ZW50cy5wdXNoKDxkaXZcclxuICAgICAgICAgIGtleT17IGNvbnRlbnRzLmxlbmd0aCB9XHJcbiAgICAgICAgICBzdHlsZT17IHN0eWxlcy5oZWFkZXIgfVxyXG4gICAgICAgICAgb25DbGljaz17IHRoaXMuaGFuZGxlQ29sbGFwc2UoaSkgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgPlxyXG4gICAgICAgICAge3RoaXMubW9kZXNbaV0gPiAwXHJcbiAgICAgICAgICAgID8gPHNwYW4gY2xhc3NOYW1lPVwiZmEgZmEtZncgZmEtY2FyZXQtcmlnaHQgcGFkZGluZy14c1wiIC8+XHJcbiAgICAgICAgICAgIDogPHNwYW4gY2xhc3NOYW1lPVwiZmEgZmEtZncgZmEtY2FyZXQtZG93biBwYWRkaW5nLXhzXCIgLz5cclxuICAgICAgICAgIH1cclxuICAgICAgICAgIHtpdGVtLmhlYWRlcn1cclxuICAgICAgICA8L2Rpdj4pXHJcbiAgICAgIH1cclxuXHJcbiAgICAgIC8vIFJlbmRlciBjb250ZW50XHJcbiAgICAgIGNvbnRlbnRzLnB1c2goPGRpdlxyXG4gICAgICAgIGtleT17IGNvbnRlbnRzLmxlbmd0aCB9XHJcbiAgICAgICAgcmVmPXsgaSB9XHJcbiAgICAgICAgc3R5bGU9eyB0aGlzLnN0eWxlc1tpXSB9XHJcbiAgICAgICAgICAgICAgICAgICAgPlxyXG4gICAgICAgIHtpdGVtLmNvbnRlbnR9XHJcbiAgICAgIDwvZGl2PilcclxuXHJcbiAgICAgIC8vIFJlbmRlciByZXNpemVyXHJcbiAgICAgIGlmIChpIDwgbGFzdEluZGV4KSB7XHJcbiAgICAgICAgY29udGVudHMucHVzaCg8UGFuZWxSZXNpemVyXHJcbiAgICAgICAgICBrZXk9eyBjb250ZW50cy5sZW5ndGggfVxyXG4gICAgICAgICAgb25SZXNpemU9eyB0aGlzLmhhbmRsZVJlc2l6ZShpKSB9XHJcbiAgICAgICAgICB0cmFuc2Zvcm1EZWx0YT17IHRoaXMudHJhbnNmb3JtRGVsdGEgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgLz4pXHJcbiAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gKDxkaXYgY2xhc3NOYW1lPVwiV05EX3NpZGVfcGFuZWwgV05EX3NpZGVfcGFuZWxfSCB3aWR0aC0xMDAgaGVpZ2h0LTEwMFwiPlxyXG4gICAgICB7Y29udGVudHN9XHJcbiAgICA8L2Rpdj4pXHJcbiAgfVxyXG59XHJcblxyXG5jb25zdCBzdHlsZXMgPSB7XHJcbiAgaGVhZGVyOiB7XHJcbiAgICBjdXJzb3I6IFwicG9pbnRlclwiLFxyXG4gICAgYmFja2dyb3VuZENvbG9yOiBcIiMyMzRcIixcclxuICAgIGJvcmRlckJvdHRvbTogXCJzb2xpZCAxcHggIzAxMlwiLFxyXG4gICAgY29sb3I6IFwiIzg5YVwiLFxyXG4gIH0sXHJcbn0iXX0=