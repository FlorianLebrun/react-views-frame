"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _reactDom = require("react-dom");

var _reactDom2 = _interopRequireDefault(_reactDom);

var _layout = require("../layout");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

exports.default = {
  name: "popup-addon",
  component: function (_PluginComponent) {
    _inherits(component, _PluginComponent);

    function component() {
      var _ref;

      var _temp, _this, _ret;

      _classCallCheck(this, component);

      for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = component.__proto__ || Object.getPrototypeOf(component)).call.apply(_ref, [this].concat(args))), _this), _this.modalStack = [], _temp), _possibleConstructorReturn(_this, _ret);
    }

    _createClass(component, [{
      key: "pluginWillMount",
      value: function pluginWillMount() {
        this.application.popup = this.popup.bind(this);
      }
    }, {
      key: "popup",
      value: function popup(renderer, outsideReject) {
        var _this2 = this;

        return new Promise(function (resolve, reject) {
          var htmlRoot = document.createElement("div");
          htmlRoot.style.position = "absolute";
          htmlRoot.style.left = "0px";
          htmlRoot.style.top = "0px";
          htmlRoot.style.zIndex = _this2.modalStack.length * 1000 + 1000;
          document.body.appendChild(htmlRoot);

          function handleResolve(data) {
            document.body.removeChild(htmlRoot);
            resolve(data);
          }
          function handleReject(data) {
            document.body.removeChild(htmlRoot);
            reject(data);
          }
          function handleStopPropagation(evt) {
            evt.stopPropagation();
          }
          _reactDom2.default.render(_react2.default.createElement(
            "div",
            null,
            _react2.default.createElement("div", { style: styles.backdrop, className: "backdrop web-modal-dialog" }),
            _react2.default.createElement(
              "div",
              { style: styles.vWrapper, onClick: outsideReject && handleReject, className: "v-wrapper" },
              _react2.default.createElement(
                "div",
                { style: styles.hWrapper, className: "h-wrapper" },
                _react2.default.createElement(
                  "div",
                  { className: "modal-dialog", onClick: handleStopPropagation },
                  _react2.default.createElement(
                    "div",
                    { className: "modal-content" },
                    _react2.default.createElement(
                      "div",
                      { className: "modal-body" },
                      renderer(handleResolve, handleReject)
                    )
                  )
                )
              )
            )
          ), htmlRoot);
        });
      }
    }]);

    return component;
  }(_layout.PluginComponent)
};


var styles = {
  backdropWrapper: {
    position: "fixed",
    height: "100%",
    width: "100%",
    zIndex: 999
  },
  backdrop: {
    opacity: .5,
    position: "fixed",
    height: "100%",
    width: "100%",
    zIndex: 998,
    backgroundColor: "#333"
  },
  vWrapper: {
    position: "fixed",
    height: "100%",
    width: "100%",
    zIndex: 999,
    flexDirection: "row",
    justifyContent: "center"
  },
  hWrapper: {
    height: "100%",
    flexDirection: "column",
    justifyContent: "center"
  },
  modalDialog: {
    width: 600,
    marginTop: 30,
    marginBottom: 30
  },
  modalContent: {
    marginLeft: "auto",
    marginRight: "auto",
    width: 600,
    boxShadow: "0 5px 15px rgba(0,0,0,.5)",
    zIndex: 99999999,
    backgroundColor: "white",
    padding: 3,
    borderWidth: 1,
    borderColor: "rgba(0,0,0,.2)",
    borderRadius: 6
  },
  modalHeader: {
    padding: 10,
    borderBottomColor: "#e5e5e5",
    borderBottomWidth: 1,
    flex: 1,
    flexDirection: "row"
  },
  close: {
    cursor: "pointer"
  },
  modalBody: {
    position: "relative",
    padding: 10
  },
  modalFooter: {
    padding: 10,
    alignItems: "flex-end",
    borderTopWidth: 1,
    borderColor: "#e5e5e5"
  }
};
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9saWIvYWRkb25zL3BvcHVwLmpzIl0sIm5hbWVzIjpbIm5hbWUiLCJjb21wb25lbnQiLCJtb2RhbFN0YWNrIiwiYXBwbGljYXRpb24iLCJwb3B1cCIsImJpbmQiLCJyZW5kZXJlciIsIm91dHNpZGVSZWplY3QiLCJQcm9taXNlIiwicmVzb2x2ZSIsInJlamVjdCIsImh0bWxSb290IiwiZG9jdW1lbnQiLCJjcmVhdGVFbGVtZW50Iiwic3R5bGUiLCJwb3NpdGlvbiIsImxlZnQiLCJ0b3AiLCJ6SW5kZXgiLCJsZW5ndGgiLCJib2R5IiwiYXBwZW5kQ2hpbGQiLCJoYW5kbGVSZXNvbHZlIiwiZGF0YSIsInJlbW92ZUNoaWxkIiwiaGFuZGxlUmVqZWN0IiwiaGFuZGxlU3RvcFByb3BhZ2F0aW9uIiwiZXZ0Iiwic3RvcFByb3BhZ2F0aW9uIiwicmVuZGVyIiwic3R5bGVzIiwiYmFja2Ryb3AiLCJ2V3JhcHBlciIsImhXcmFwcGVyIiwiYmFja2Ryb3BXcmFwcGVyIiwiaGVpZ2h0Iiwid2lkdGgiLCJvcGFjaXR5IiwiYmFja2dyb3VuZENvbG9yIiwiZmxleERpcmVjdGlvbiIsImp1c3RpZnlDb250ZW50IiwibW9kYWxEaWFsb2ciLCJtYXJnaW5Ub3AiLCJtYXJnaW5Cb3R0b20iLCJtb2RhbENvbnRlbnQiLCJtYXJnaW5MZWZ0IiwibWFyZ2luUmlnaHQiLCJib3hTaGFkb3ciLCJwYWRkaW5nIiwiYm9yZGVyV2lkdGgiLCJib3JkZXJDb2xvciIsImJvcmRlclJhZGl1cyIsIm1vZGFsSGVhZGVyIiwiYm9yZGVyQm90dG9tQ29sb3IiLCJib3JkZXJCb3R0b21XaWR0aCIsImZsZXgiLCJjbG9zZSIsImN1cnNvciIsIm1vZGFsQm9keSIsIm1vZGFsRm9vdGVyIiwiYWxpZ25JdGVtcyIsImJvcmRlclRvcFdpZHRoIl0sIm1hcHBpbmdzIjoiOzs7Ozs7OztBQUFBOzs7O0FBQ0E7Ozs7QUFFQTs7Ozs7Ozs7OztrQkFFZTtBQUNiQSxRQUFNLGFBRE87QUFF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LGdCQUFjO0FBQ1pDLGdCQUFZLE1BREE7QUFFWkMsaUJBQWEsTUFGRDtBQUdaVixXQUFPLEdBSEs7QUFJWlcsZUFBVywyQkFKQztBQUtaN0IsWUFBUSxRQUxJO0FBTVpvQixxQkFBaUIsT0FOTDtBQU9aVSxhQUFTLENBUEc7QUFRWkMsaUJBQWEsQ0FSRDtBQVNaQyxpQkFBYSxnQkFURDtBQVVaQyxrQkFBYztBQVZGLEdBakNEO0FBNkNiQyxlQUFhO0FBQ1hKLGFBQVMsRUFERTtBQUVYSyx1QkFBbUIsU0FGUjtBQUdYQyx1QkFBbUIsQ0FIUjtBQUlYQyxVQUFNLENBSks7QUFLWGhCLG1CQUFlO0FBTEosR0E3Q0E7QUFvRGJpQixTQUFPO0FBQ0xDLFlBQVE7QUFESCxHQXBETTtBQXVEYkMsYUFBVztBQUNUM0MsY0FBVSxVQUREO0FBRVRpQyxhQUFTO0FBRkEsR0F2REU7QUEyRGJXLGVBQWE7QUFDWFgsYUFBUyxFQURFO0FBRVhZLGdCQUFZLFVBRkQ7QUFHWEMsb0JBQWdCLENBSEw7QUFJWFgsaUJBQWE7QUFKRjtBQTNEQSxDQUFmIiwiZmlsZSI6InBvcHVwLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFJlYWN0IGZyb20gXCJyZWFjdFwiXHJcbmltcG9ydCBSZWFjdERPTSBmcm9tIFwicmVhY3QtZG9tXCJcclxuXHJcbmltcG9ydCB7IFBsdWdpbkNvbXBvbmVudCB9IGZyb20gXCIuLi9sYXlvdXRcIlxyXG5cclxuZXhwb3J0IGRlZmF1bHQge1xyXG4gIG5hbWU6IFwicG9wdXAtYWRkb25cIixcclxuICBjb21wb25lbnQ6IGNsYXNzIGV4dGVuZHMgUGx1Z2luQ29tcG9uZW50IHtcclxuICAgIG1vZGFsU3RhY2sgPSBbXVxyXG4gICAgcGx1Z2luV2lsbE1vdW50KCkge1xyXG4gICAgICB0aGlzLmFwcGxpY2F0aW9uLnBvcHVwID0gdGhpcy5wb3B1cC5iaW5kKHRoaXMpXHJcbiAgICB9XHJcbiAgICBwb3B1cChyZW5kZXJlcjogRnVuY3Rpb24sIG91dHNpZGVSZWplY3QpOiBQcm9taXNlIHtcclxuICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcclxuICAgICAgICBjb25zdCBodG1sUm9vdCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIilcclxuICAgICAgICBodG1sUm9vdC5zdHlsZS5wb3NpdGlvbiA9IFwiYWJzb2x1dGVcIlxyXG4gICAgICAgIGh0bWxSb290LnN0eWxlLmxlZnQgPSBcIjBweFwiXHJcbiAgICAgICAgaHRtbFJvb3Quc3R5bGUudG9wID0gXCIwcHhcIlxyXG4gICAgICAgIGh0bWxSb290LnN0eWxlLnpJbmRleCA9IHRoaXMubW9kYWxTdGFjay5sZW5ndGggKiAxMDAwICsgMTAwMFxyXG4gICAgICAgIGRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQoaHRtbFJvb3QpXHJcblxyXG4gICAgICAgIGZ1bmN0aW9uIGhhbmRsZVJlc29sdmUoZGF0YSkge1xyXG4gICAgICAgICAgZG9jdW1lbnQuYm9keS5yZW1vdmVDaGlsZChodG1sUm9vdClcclxuICAgICAgICAgIHJlc29sdmUoZGF0YSlcclxuICAgICAgICB9XHJcbiAgICAgICAgZnVuY3Rpb24gaGFuZGxlUmVqZWN0KGRhdGEpIHtcclxuICAgICAgICAgIGRvY3VtZW50LmJvZHkucmVtb3ZlQ2hpbGQoaHRtbFJvb3QpXHJcbiAgICAgICAgICByZWplY3QoZGF0YSlcclxuICAgICAgICB9XHJcbiAgICAgICAgZnVuY3Rpb24gaGFuZGxlU3RvcFByb3BhZ2F0aW9uKGV2dCkge1xyXG4gICAgICAgICAgZXZ0LnN0b3BQcm9wYWdhdGlvbigpXHJcbiAgICAgICAgfVxyXG4gICAgICAgIFJlYWN0RE9NLnJlbmRlcigoXHJcbiAgICAgICAgICA8ZGl2PlxyXG4gICAgICAgICAgICA8ZGl2IHN0eWxlPXsgc3R5bGVzLmJhY2tkcm9wIH0gY2xhc3NOYW1lPVwiYmFja2Ryb3Agd2ViLW1vZGFsLWRpYWxvZ1wiIC8+XHJcbiAgICAgICAgICAgIDxkaXYgc3R5bGU9eyBzdHlsZXMudldyYXBwZXIgfSBvbkNsaWNrPXsgb3V0c2lkZVJlamVjdCAmJiBoYW5kbGVSZWplY3QgfSBjbGFzc05hbWU9XCJ2LXdyYXBwZXJcIj5cclxuICAgICAgICAgICAgICA8ZGl2IHN0eWxlPXsgc3R5bGVzLmhXcmFwcGVyIH0gY2xhc3NOYW1lPVwiaC13cmFwcGVyXCI+XHJcbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cIm1vZGFsLWRpYWxvZ1wiIG9uQ2xpY2s9eyBoYW5kbGVTdG9wUHJvcGFnYXRpb24gfT5cclxuICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJtb2RhbC1jb250ZW50XCI+XHJcbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJtb2RhbC1ib2R5XCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICB7cmVuZGVyZXIoaGFuZGxlUmVzb2x2ZSwgaGFuZGxlUmVqZWN0KX1cclxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICApLCBodG1sUm9vdClcclxuICAgICAgfSlcclxuICAgIH1cclxuICB9LFxyXG59XHJcblxyXG5jb25zdCBzdHlsZXMgPSB7XHJcbiAgYmFja2Ryb3BXcmFwcGVyOiB7XHJcbiAgICBwb3NpdGlvbjogXCJmaXhlZFwiLFxyXG4gICAgaGVpZ2h0OiBcIjEwMCVcIixcclxuICAgIHdpZHRoOiBcIjEwMCVcIixcclxuICAgIHpJbmRleDogOTk5LFxyXG4gIH0sXHJcbiAgYmFja2Ryb3A6IHtcclxuICAgIG9wYWNpdHk6IC41LFxyXG4gICAgcG9zaXRpb246IFwiZml4ZWRcIixcclxuICAgIGhlaWdodDogXCIxMDAlXCIsXHJcbiAgICB3aWR0aDogXCIxMDAlXCIsXHJcbiAgICB6SW5kZXg6IDk5OCxcclxuICAgIGJhY2tncm91bmRDb2xvcjogXCIjMzMzXCIsXHJcbiAgfSxcclxuICB2V3JhcHBlcjoge1xyXG4gICAgcG9zaXRpb246IFwiZml4ZWRcIixcclxuICAgIGhlaWdodDogXCIxMDAlXCIsXHJcbiAgICB3aWR0aDogXCIxMDAlXCIsXHJcbiAgICB6SW5kZXg6IDk5OSxcclxuICAgIGZsZXhEaXJlY3Rpb246IFwicm93XCIsXHJcbiAgICBqdXN0aWZ5Q29udGVudDogXCJjZW50ZXJcIixcclxuICB9LFxyXG4gIGhXcmFwcGVyOiB7XHJcbiAgICBoZWlnaHQ6IFwiMTAwJVwiLFxyXG4gICAgZmxleERpcmVjdGlvbjogXCJjb2x1bW5cIixcclxuICAgIGp1c3RpZnlDb250ZW50OiBcImNlbnRlclwiLFxyXG4gIH0sXHJcbiAgbW9kYWxEaWFsb2c6IHtcclxuICAgIHdpZHRoOiA2MDAsXHJcbiAgICBtYXJnaW5Ub3A6IDMwLFxyXG4gICAgbWFyZ2luQm90dG9tOiAzMCxcclxuICB9LFxyXG4gIG1vZGFsQ29udGVudDoge1xyXG4gICAgbWFyZ2luTGVmdDogXCJhdXRvXCIsXHJcbiAgICBtYXJnaW5SaWdodDogXCJhdXRvXCIsXHJcbiAgICB3aWR0aDogNjAwLFxyXG4gICAgYm94U2hhZG93OiBcIjAgNXB4IDE1cHggcmdiYSgwLDAsMCwuNSlcIixcclxuICAgIHpJbmRleDogOTk5OTk5OTksXHJcbiAgICBiYWNrZ3JvdW5kQ29sb3I6IFwid2hpdGVcIixcclxuICAgIHBhZGRpbmc6IDMsXHJcbiAgICBib3JkZXJXaWR0aDogMSxcclxuICAgIGJvcmRlckNvbG9yOiBcInJnYmEoMCwwLDAsLjIpXCIsXHJcbiAgICBib3JkZXJSYWRpdXM6IDYsXHJcbiAgfSxcclxuICBtb2RhbEhlYWRlcjoge1xyXG4gICAgcGFkZGluZzogMTAsXHJcbiAgICBib3JkZXJCb3R0b21Db2xvcjogXCIjZTVlNWU1XCIsXHJcbiAgICBib3JkZXJCb3R0b21XaWR0aDogMSxcclxuICAgIGZsZXg6IDEsXHJcbiAgICBmbGV4RGlyZWN0aW9uOiBcInJvd1wiLFxyXG4gIH0sXHJcbiAgY2xvc2U6IHtcclxuICAgIGN1cnNvcjogXCJwb2ludGVyXCIsXHJcbiAgfSxcclxuICBtb2RhbEJvZHk6IHtcclxuICAgIHBvc2l0aW9uOiBcInJlbGF0aXZlXCIsXHJcbiAgICBwYWRkaW5nOiAxMCxcclxuICB9LFxyXG4gIG1vZGFsRm9vdGVyOiB7XHJcbiAgICBwYWRkaW5nOiAxMCxcclxuICAgIGFsaWduSXRlbXM6IFwiZmxleC1lbmRcIixcclxuICAgIGJvcmRlclRvcFdpZHRoOiAxLFxyXG4gICAgYm9yZGVyQ29sb3I6IFwiI2U1ZTVlNVwiLFxyXG4gIH0sXHJcbn1cclxuXHJcbiJdfQ==