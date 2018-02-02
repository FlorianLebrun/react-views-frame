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

var defaultArray = [];

var Split = function (_Component) {
  _inherits(Split, _Component);

  function Split() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, Split);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = Split.__proto__ || Object.getPrototypeOf(Split)).call.apply(_ref, [this].concat(args))), _this), _this.sizes = [], _this.modes = [], _this.handleResize = function (index) {
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
      this.updateProps(this.props);
    }
  }, {
    key: "componentWillReceiveProps",
    value: function componentWillReceiveProps(nextProps) {
      this.updateProps(nextProps);
    }
  }, {
    key: "transformDelta",
    value: function transformDelta(e) {
      return e.deltaY;
    }
  }, {
    key: "updateProps",
    value: function updateProps(props) {
      var hasChanged = void 0;
      var prevItems = this.items || defaultArray;
      var nextItems = props.items || defaultArray;
      this.items = nextItems;

      // Check items count
      hasChanged = nextItems.length !== prevItems.length;

      // Update sizes and modes
      for (var i = 0; i < nextItems.length; i++) {
        var item = nextItems[i];
        var prevItem = prevItems[i];
        if (!prevItem || item.size !== prevItem.size) {
          hasChanged = true;
          if (item.size === undefined) {
            this.sizes[i] = 0;
            this.modes[i] = 0;
          } else {
            this.sizes[i] = item.size;
            if (this.modes[i] === undefined) this.modes[i] = 1;
          }
        }
      }

      // Update styles and normalize sizes
      hasChanged && this.applySizes();
    }
  }, {
    key: "applySizes",
    value: function applySizes() {
      var items = this.items,
          sizes = this.sizes,
          modes = this.modes;

      this.styles = [];
      this.sizes = [];

      // Accumulate sizes
      var len = 0;
      for (var i = 0; i < items.length; i++) {
        var sz = this.sizes[i] = sizes[i] || items[i].size;
        if (sz > 0) len += sz;
      }

      // Normalize sizes
      var factor = len ? 100 / len : 1;
      for (var _i = 0; _i < items.length; _i++) {
        var _style = this.styles[_i] = _extends({}, styles.content);
        var mode = modes[_i],
            item = items[_i];
        this.sizes[_i] *= factor;
        if (mode > 0) {
          _style.overflow = item.overflow || "auto";
          _style.flex = sizes[_i];
        } else if (mode < 0) {
          _style.overflow = item.overflow || "auto";
          _style.flex = 0;
          _style.height = 0;
        } else {
          _style.flex = _i < items.length - 1 ? 0 : 1;
          _style.height = "auto";
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
            "span",
            {
              key: contents.length,
              style: styles.header,
              onClick: this.handleCollapse(i)
            },
            this.modes[i] <= 0 ? _react2.default.createElement("span", { className: "fa fa-fw fa-caret-right padding-xs" }) : _react2.default.createElement("span", { className: "fa fa-fw fa-caret-down padding-xs" }),
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
        { style: styles.panel },
        contents
      );
    }
  }]);

  return Split;
}(_react.Component);

exports.default = Split;


var styles = {
  header: {
    display: "flex",
    flexDirection: "row",
    whiteSpace: "nowrap",
    cursor: "pointer",
    backgroundColor: "#234",
    borderBottom: "solid 1px #012",
    color: "#89a",
    overflow: "hidden"
  },
  content: {
    backgroundColor: "#fff"
  },
  panel: {
    display: "flex",
    height: "100%",
    maxHeight: "100%",
    minHeight: "100%",
    maxWidth: "100%",
    minWidth: "100%",
    flexDirection: "column",
    backgroundColor: "#234"
  }
};
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9saWIvdWktbW9kdWxlcy9TcGxpdC5qcyJdLCJuYW1lcyI6WyJkZWZhdWx0QXJyYXkiLCJTcGxpdCIsInNpemVzIiwibW9kZXMiLCJoYW5kbGVSZXNpemUiLCJpbmRleCIsImRlbHRhIiwiY3NpemUiLCJyZWZzIiwiY2xpZW50SGVpZ2h0Iiwic2l6ZSIsIk1hdGgiLCJtYXgiLCJhcHBseVNpemVzIiwiaGFuZGxlQ29sbGFwc2UiLCJ1cGRhdGVQcm9wcyIsInByb3BzIiwibmV4dFByb3BzIiwiZSIsImRlbHRhWSIsImhhc0NoYW5nZWQiLCJwcmV2SXRlbXMiLCJpdGVtcyIsIm5leHRJdGVtcyIsImxlbmd0aCIsImkiLCJpdGVtIiwicHJldkl0ZW0iLCJ1bmRlZmluZWQiLCJzdHlsZXMiLCJsZW4iLCJzeiIsImZhY3RvciIsInN0eWxlIiwiY29udGVudCIsIm1vZGUiLCJvdmVyZmxvdyIsImZsZXgiLCJoZWlnaHQiLCJmb3JjZVVwZGF0ZSIsImNvbnRlbnRzIiwiQXJyYXkiLCJpc0FycmF5IiwiY29uc29sZSIsImVycm9yIiwibGFzdEluZGV4IiwiaGVhZGVyIiwicHVzaCIsInRyYW5zZm9ybURlbHRhIiwicGFuZWwiLCJkaXNwbGF5IiwiZmxleERpcmVjdGlvbiIsIndoaXRlU3BhY2UiLCJjdXJzb3IiLCJiYWNrZ3JvdW5kQ29sb3IiLCJib3JkZXJCb3R0b20iLCJjb2xvciIsIm1heEhlaWdodCIsIm1pbkhlaWdodCIsIm1heFdpZHRoIiwibWluV2lkdGgiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFDQTs7OztBQUVBOzs7Ozs7OzsrZUFIQTs7O0FBS0E7Ozs7OztBQWlCQSxJQUFNQSxlQUFlLEVBQXJCOztJQUVxQkMsSzs7Ozs7Ozs7Ozs7Ozs7b0xBSW5CQyxLLEdBQXVCLEUsUUFDdkJDLEssR0FBdUIsRSxRQThFdkJDLFksR0FBZSxVQUFDQyxLQUFEO0FBQUEsYUFBVyxVQUFDQyxLQUFELEVBQVc7QUFBQTtBQUFBLFlBQzNCSixL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LFNBQVM7QUFDYmlCLFVBQVE7QUFDTkksYUFBUyxNQURIO0FBRU5DLG1CQUFlLEtBRlQ7QUFHTkMsZ0JBQVksUUFITjtBQUlOQyxZQUFRLFNBSkY7QUFLTkMscUJBQWlCLE1BTFg7QUFNTkMsa0JBQWMsZ0JBTlI7QUFPTkMsV0FBTyxNQVBEO0FBUU5wQixjQUFVO0FBUkosR0FESztBQVdiRixXQUFTO0FBQ1BvQixxQkFBaUI7QUFEVixHQVhJO0FBY2JMLFNBQU87QUFDTEMsYUFBUyxNQURKO0FBRUxaLFlBQVEsTUFGSDtBQUdMbUIsZUFBVyxNQUhOO0FBSUxDLGVBQVcsTUFKTjtBQUtMQyxjQUFVLE1BTEw7QUFNTEMsY0FBVSxNQU5MO0FBT0xULG1CQUFlLFFBUFY7QUFRTEcscUJBQWlCO0FBUlo7QUFkTSxDQUFmIiwiZmlsZSI6IlNwbGl0LmpzIiwic291cmNlc0NvbnRlbnQiOlsiLyogZXNsaW50LWRpc2FibGUgcmVhY3Qvbm8tc3RyaW5nLXJlZnMgKi9cclxuaW1wb3J0IFJlYWN0LCB7IENvbXBvbmVudCB9IGZyb20gXCJyZWFjdFwiXHJcblxyXG5pbXBvcnQgeyBQYW5lbFJlc2l6ZXIgfSBmcm9tIFwiLi4vYWRkb25zL3dpbmRvd3MtZnJhbWUvRnJhbWVQYW5lbHNcIlxyXG5cclxuLyoqICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxyXG4qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcclxuKioqIFdpbmRvdyBTcGxpdFxyXG4qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcclxuKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqL1xyXG5cclxudHlwZSBTcGxpdEl0ZW1UeXBlID0ge1xyXG4gIGNvbnRlbnQ6IFJlYWN0JEVsZW1lbnQ8YW55PixcclxuICBzaXplOiBudW1iZXIsXHJcbiAgb3ZlcmZsb3c6IHN0cmluZyxcclxufVxyXG5cclxudHlwZSBQcm9wc1R5cGUgPSB7XHJcbiAgaXRlbXM/OiBBcnJheTxTcGxpdEl0ZW1UeXBlPixcclxuICBzdHlsZT86IE9iamVjdCB8IEFycmF5PGFueT4sXHJcbn1cclxuXHJcbmNvbnN0IGRlZmF1bHRBcnJheSA9IFtdXHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBTcGxpdCBleHRlbmRzIENvbXBvbmVudDx2b2lkLCBQcm9wc1R5cGUsIHZvaWQ+IHtcclxuICBwcm9wczogUHJvcHNUeXBlXHJcblxyXG4gIGl0ZW1zOiBBcnJheTxTcGxpdEl0ZW1UeXBlPlxyXG4gIHNpemVzOiBBcnJheTxudW1iZXI+ID0gW11cclxuICBtb2RlczogQXJyYXk8bnVtYmVyPiA9IFtdXHJcbiAgc3R5bGVzOiBBcnJheTxPYmplY3Q+XHJcblxyXG4gIGNvbXBvbmVudFdpbGxNb3VudCgpIHtcclxuICAgIHRoaXMudXBkYXRlUHJvcHModGhpcy5wcm9wcylcclxuICB9XHJcbiAgY29tcG9uZW50V2lsbFJlY2VpdmVQcm9wcyhuZXh0UHJvcHMpIHtcclxuICAgIHRoaXMudXBkYXRlUHJvcHMobmV4dFByb3BzKVxyXG4gIH1cclxuICB0cmFuc2Zvcm1EZWx0YShlKSB7XHJcbiAgICByZXR1cm4gZS5kZWx0YVlcclxuICB9XHJcbiAgdXBkYXRlUHJvcHMocHJvcHMpIHtcclxuICAgIGxldCBoYXNDaGFuZ2VkXHJcbiAgICBjb25zdCBwcmV2SXRlbXMgPSB0aGlzLml0ZW1zIHx8IGRlZmF1bHRBcnJheVxyXG4gICAgY29uc3QgbmV4dEl0ZW1zID0gcHJvcHMuaXRlbXMgfHwgZGVmYXVsdEFycmF5XHJcbiAgICB0aGlzLml0ZW1zID0gbmV4dEl0ZW1zXHJcblxyXG4gICAgLy8gQ2hlY2sgaXRlbXMgY291bnRcclxuICAgIGhhc0NoYW5nZWQgPSAobmV4dEl0ZW1zLmxlbmd0aCAhPT0gcHJldkl0ZW1zLmxlbmd0aClcclxuXHJcbiAgICAvLyBVcGRhdGUgc2l6ZXMgYW5kIG1vZGVzXHJcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IG5leHRJdGVtcy5sZW5ndGg7IGkrKykge1xyXG4gICAgICBjb25zdCBpdGVtID0gbmV4dEl0ZW1zW2ldXHJcbiAgICAgIGNvbnN0IHByZXZJdGVtID0gcHJldkl0ZW1zW2ldXHJcbiAgICAgIGlmICghcHJldkl0ZW0gfHwgaXRlbS5zaXplICE9PSBwcmV2SXRlbS5zaXplKSB7XHJcbiAgICAgICAgaGFzQ2hhbmdlZCA9IHRydWVcclxuICAgICAgICBpZiAoaXRlbS5zaXplID09PSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgIHRoaXMuc2l6ZXNbaV0gPSAwXHJcbiAgICAgICAgICB0aGlzLm1vZGVzW2ldID0gMFxyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIHtcclxuICAgICAgICAgIHRoaXMuc2l6ZXNbaV0gPSBpdGVtLnNpemVcclxuICAgICAgICAgIGlmICh0aGlzLm1vZGVzW2ldID09PSB1bmRlZmluZWQpXHJcbiAgICAgICAgICAgIHRoaXMubW9kZXNbaV0gPSAxXHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLy8gVXBkYXRlIHN0eWxlcyBhbmQgbm9ybWFsaXplIHNpemVzXHJcbiAgICBoYXNDaGFuZ2VkICYmIHRoaXMuYXBwbHlTaXplcygpXHJcbiAgfVxyXG4gIGFwcGx5U2l6ZXMoKSB7XHJcbiAgICBjb25zdCB7IGl0ZW1zLCBzaXplcywgbW9kZXMgfSA9IHRoaXNcclxuICAgIHRoaXMuc3R5bGVzID0gW11cclxuICAgIHRoaXMuc2l6ZXMgPSBbXVxyXG5cclxuICAgIC8vIEFjY3VtdWxhdGUgc2l6ZXNcclxuICAgIGxldCBsZW4gPSAwXHJcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IGl0ZW1zLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgIGNvbnN0IHN6ID0gdGhpcy5zaXplc1tpXSA9IHNpemVzW2ldIHx8IGl0ZW1zW2ldLnNpemVcclxuICAgICAgaWYgKHN6ID4gMCkgbGVuICs9IHN6XHJcbiAgICB9XHJcblxyXG4gICAgLy8gTm9ybWFsaXplIHNpemVzXHJcbiAgICBjb25zdCBmYWN0b3IgPSBsZW4gPyAxMDAgLyBsZW4gOiAxXHJcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IGl0ZW1zLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgIGNvbnN0IHN0eWxlID0gdGhpcy5zdHlsZXNbaV0gPSB7IC4uLnN0eWxlcy5jb250ZW50IH1cclxuICAgICAgY29uc3QgbW9kZSA9IG1vZGVzW2ldLCBpdGVtID0gaXRlbXNbaV1cclxuICAgICAgdGhpcy5zaXplc1tpXSAqPSBmYWN0b3JcclxuICAgICAgaWYgKG1vZGUgPiAwKSB7XHJcbiAgICAgICAgc3R5bGUub3ZlcmZsb3cgPSBpdGVtLm92ZXJmbG93IHx8IFwiYXV0b1wiXHJcbiAgICAgICAgc3R5bGUuZmxleCA9IHNpemVzW2ldXHJcbiAgICAgIH1cclxuICAgICAgZWxzZSBpZiAobW9kZSA8IDApIHtcclxuICAgICAgICBzdHlsZS5vdmVyZmxvdyA9IGl0ZW0ub3ZlcmZsb3cgfHwgXCJhdXRvXCJcclxuICAgICAgICBzdHlsZS5mbGV4ID0gMFxyXG4gICAgICAgIHN0eWxlLmhlaWdodCA9IDBcclxuICAgICAgfVxyXG4gICAgICBlbHNlIHtcclxuICAgICAgICBzdHlsZS5mbGV4ID0gKGkgPCBpdGVtcy5sZW5ndGggLSAxKSA/IDAgOiAxXHJcbiAgICAgICAgc3R5bGUuaGVpZ2h0ID0gXCJhdXRvXCJcclxuICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8vIFVwZGF0ZVxyXG4gICAgdGhpcy5mb3JjZVVwZGF0ZSgpXHJcbiAgfVxyXG4gIGhhbmRsZVJlc2l6ZSA9IChpbmRleCkgPT4gKGRlbHRhKSA9PiB7XHJcbiAgICBjb25zdCB7IHNpemVzLCBtb2RlcyB9ID0gdGhpc1xyXG4gICAgaWYgKG1vZGVzW2luZGV4XSA+IDApIHtcclxuICAgICAgY29uc3QgY3NpemUgPSB0aGlzLnJlZnNbaW5kZXhdLmNsaWVudEhlaWdodFxyXG5cclxuICAgICAgLy8gVXBkYXRlIHNpemVzXHJcbiAgICAgIGNvbnN0IHNpemUgPSBzaXplc1tpbmRleF1cclxuICAgICAgZGVsdGEgPSBNYXRoLm1heChzaXplLCAxKSAqIGRlbHRhIC8gTWF0aC5tYXgoY3NpemUsIDEpXHJcbiAgICAgIHNpemVzW2luZGV4XSArPSBkZWx0YVxyXG4gICAgICBzaXplc1tpbmRleCArIDFdIC09IGRlbHRhXHJcblxyXG4gICAgICB0aGlzLmFwcGx5U2l6ZXMoKVxyXG4gICAgfVxyXG4gIH1cclxuICBoYW5kbGVDb2xsYXBzZSA9IChpbmRleCkgPT4gKCkgPT4ge1xyXG4gICAgY29uc3QgeyBtb2RlcyB9ID0gdGhpc1xyXG4gICAgbW9kZXNbaW5kZXhdID0gLW1vZGVzW2luZGV4XVxyXG4gICAgdGhpcy5hcHBseVNpemVzKClcclxuICB9XHJcbiAgcmVuZGVyKCkge1xyXG4gICAgY29uc3QgeyBpdGVtcyB9ID0gdGhpcy5wcm9wc1xyXG4gICAgY29uc3QgY29udGVudHMgPSBbXVxyXG5cclxuICAgIGlmICghaXRlbXMgfHwgIUFycmF5LmlzQXJyYXkoaXRlbXMpKSB7XHJcbiAgICAgIGNvbnNvbGUuZXJyb3IoXCJFbXB0eSBDb2xsYXBzaWJsZSBXaW5kb3cgaXMgdXNlbGVzcy5cIilcclxuICAgICAgcmV0dXJuIG51bGxcclxuICAgIH1cclxuXHJcbiAgICBjb25zdCBsYXN0SW5kZXggPSBpdGVtcy5sZW5ndGggLSAxXHJcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8PSBsYXN0SW5kZXg7IGkrKykge1xyXG4gICAgICBjb25zdCBpdGVtID0gaXRlbXNbaV1cclxuXHJcbiAgICAgIC8vIFJlbmRlciBoZWFkZXJcclxuICAgICAgaWYgKGl0ZW0uaGVhZGVyKSB7XHJcbiAgICAgICAgY29udGVudHMucHVzaCg8c3BhblxyXG4gICAgICAgICAga2V5PXtjb250ZW50cy5sZW5ndGh9XHJcbiAgICAgICAgICBzdHlsZT17c3R5bGVzLmhlYWRlcn1cclxuICAgICAgICAgIG9uQ2xpY2s9e3RoaXMuaGFuZGxlQ29sbGFwc2UoaSl9XHJcbiAgICAgICAgPlxyXG4gICAgICAgICAge3RoaXMubW9kZXNbaV0gPD0gMFxyXG4gICAgICAgICAgICA/IDxzcGFuIGNsYXNzTmFtZT1cImZhIGZhLWZ3IGZhLWNhcmV0LXJpZ2h0IHBhZGRpbmcteHNcIiAvPlxyXG4gICAgICAgICAgICA6IDxzcGFuIGNsYXNzTmFtZT1cImZhIGZhLWZ3IGZhLWNhcmV0LWRvd24gcGFkZGluZy14c1wiIC8+XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgICB7aXRlbS5oZWFkZXJ9XHJcbiAgICAgICAgPC9zcGFuPilcclxuICAgICAgfVxyXG5cclxuICAgICAgLy8gUmVuZGVyIGNvbnRlbnRcclxuICAgICAgY29udGVudHMucHVzaCg8ZGl2XHJcbiAgICAgICAga2V5PXtjb250ZW50cy5sZW5ndGh9XHJcbiAgICAgICAgcmVmPXtpfVxyXG4gICAgICAgIHN0eWxlPXt0aGlzLnN0eWxlc1tpXX1cclxuICAgICAgPlxyXG4gICAgICAgIHtpdGVtLmNvbnRlbnR9XHJcbiAgICAgIDwvZGl2PilcclxuXHJcbiAgICAgIC8vIFJlbmRlciByZXNpemVyXHJcbiAgICAgIGlmIChpIDwgbGFzdEluZGV4KSB7XHJcbiAgICAgICAgY29udGVudHMucHVzaCg8UGFuZWxSZXNpemVyXHJcbiAgICAgICAgICBrZXk9e2NvbnRlbnRzLmxlbmd0aH1cclxuICAgICAgICAgIG9uUmVzaXplPXt0aGlzLmhhbmRsZVJlc2l6ZShpKX1cclxuICAgICAgICAgIHRyYW5zZm9ybURlbHRhPXt0aGlzLnRyYW5zZm9ybURlbHRhfVxyXG4gICAgICAgIC8+KVxyXG4gICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuICg8ZGl2IHN0eWxlPXtzdHlsZXMucGFuZWx9PlxyXG4gICAgICB7Y29udGVudHN9XHJcbiAgICA8L2Rpdj4pXHJcbiAgfVxyXG59XHJcblxyXG5cclxuY29uc3Qgc3R5bGVzID0ge1xyXG4gIGhlYWRlcjoge1xyXG4gICAgZGlzcGxheTogXCJmbGV4XCIsXHJcbiAgICBmbGV4RGlyZWN0aW9uOiBcInJvd1wiLFxyXG4gICAgd2hpdGVTcGFjZTogXCJub3dyYXBcIixcclxuICAgIGN1cnNvcjogXCJwb2ludGVyXCIsXHJcbiAgICBiYWNrZ3JvdW5kQ29sb3I6IFwiIzIzNFwiLFxyXG4gICAgYm9yZGVyQm90dG9tOiBcInNvbGlkIDFweCAjMDEyXCIsXHJcbiAgICBjb2xvcjogXCIjODlhXCIsXHJcbiAgICBvdmVyZmxvdzogXCJoaWRkZW5cIixcclxuICB9LFxyXG4gIGNvbnRlbnQ6IHtcclxuICAgIGJhY2tncm91bmRDb2xvcjogXCIjZmZmXCIsXHJcbiAgfSxcclxuICBwYW5lbDoge1xyXG4gICAgZGlzcGxheTogXCJmbGV4XCIsXHJcbiAgICBoZWlnaHQ6IFwiMTAwJVwiLFxyXG4gICAgbWF4SGVpZ2h0OiBcIjEwMCVcIixcclxuICAgIG1pbkhlaWdodDogXCIxMDAlXCIsXHJcbiAgICBtYXhXaWR0aDogXCIxMDAlXCIsXHJcbiAgICBtaW5XaWR0aDogXCIxMDAlXCIsXHJcbiAgICBmbGV4RGlyZWN0aW9uOiBcImNvbHVtblwiLFxyXG4gICAgYmFja2dyb3VuZENvbG9yOiBcIiMyMzRcIixcclxuICB9XHJcbn0iXX0=