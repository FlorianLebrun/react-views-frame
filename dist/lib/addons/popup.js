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
  component: function (_PluginInstance) {
    _inherits(component, _PluginInstance);

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
  }(_layout.PluginInstance)
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9saWIvYWRkb25zL3BvcHVwLmpzIl0sIm5hbWVzIjpbIm5hbWUiLCJjb21wb25lbnQiLCJtb2RhbFN0YWNrIiwiYXBwbGljYXRpb24iLCJwb3B1cCIsImJpbmQiLCJyZW5kZXJlciIsIm91dHNpZGVSZWplY3QiLCJQcm9taXNlIiwicmVzb2x2ZSIsInJlamVjdCIsImh0bWxSb290IiwiZG9jdW1lbnQiLCJjcmVhdGVFbGVtZW50Iiwic3R5bGUiLCJwb3NpdGlvbiIsImxlZnQiLCJ0b3AiLCJ6SW5kZXgiLCJsZW5ndGgiLCJib2R5IiwiYXBwZW5kQ2hpbGQiLCJoYW5kbGVSZXNvbHZlIiwiZGF0YSIsInJlbW92ZUNoaWxkIiwiaGFuZGxlUmVqZWN0IiwiaGFuZGxlU3RvcFByb3BhZ2F0aW9uIiwiZXZ0Iiwic3RvcFByb3BhZ2F0aW9uIiwicmVuZGVyIiwic3R5bGVzIiwiYmFja2Ryb3AiLCJ2V3JhcHBlciIsImhXcmFwcGVyIiwiYmFja2Ryb3BXcmFwcGVyIiwiaGVpZ2h0Iiwid2lkdGgiLCJvcGFjaXR5IiwiYmFja2dyb3VuZENvbG9yIiwiZmxleERpcmVjdGlvbiIsImp1c3RpZnlDb250ZW50IiwibW9kYWxEaWFsb2ciLCJtYXJnaW5Ub3AiLCJtYXJnaW5Cb3R0b20iLCJtb2RhbENvbnRlbnQiLCJtYXJnaW5MZWZ0IiwibWFyZ2luUmlnaHQiLCJib3hTaGFkb3ciLCJwYWRkaW5nIiwiYm9yZGVyV2lkdGgiLCJib3JkZXJDb2xvciIsImJvcmRlclJhZGl1cyIsIm1vZGFsSGVhZGVyIiwiYm9yZGVyQm90dG9tQ29sb3IiLCJib3JkZXJCb3R0b21XaWR0aCIsImZsZXgiLCJjbG9zZSIsImN1cnNvciIsIm1vZGFsQm9keSIsIm1vZGFsRm9vdGVyIiwiYWxpZ25JdGVtcyIsImJvcmRlclRvcFdpZHRoIl0sIm1hcHBpbmdzIjoiOzs7Ozs7OztBQUFBOzs7O0FBQ0E7Ozs7QUFFQTs7Ozs7Ozs7OztrQkFFZTtBQUNiQSxRQUFNLGFBRE87QUFF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LGdCQUFjO0FBQ1pDLGdCQUFZLE1BREE7QUFFWkMsaUJBQWEsTUFGRDtBQUdaVixXQUFPLEdBSEs7QUFJWlcsZUFBVywyQkFKQztBQUtaN0IsWUFBUSxRQUxJO0FBTVpvQixxQkFBaUIsT0FOTDtBQU9aVSxhQUFTLENBUEc7QUFRWkMsaUJBQWEsQ0FSRDtBQVNaQyxpQkFBYSxnQkFURDtBQVVaQyxrQkFBYztBQVZGLEdBakNEO0FBNkNiQyxlQUFhO0FBQ1hKLGFBQVMsRUFERTtBQUVYSyx1QkFBbUIsU0FGUjtBQUdYQyx1QkFBbUIsQ0FIUjtBQUlYQyxVQUFNLENBSks7QUFLWGhCLG1CQUFlO0FBTEosR0E3Q0E7QUFvRGJpQixTQUFPO0FBQ0xDLFlBQVE7QUFESCxHQXBETTtBQXVEYkMsYUFBVztBQUNUM0MsY0FBVSxVQUREO0FBRVRpQyxhQUFTO0FBRkEsR0F2REU7QUEyRGJXLGVBQWE7QUFDWFgsYUFBUyxFQURFO0FBRVhZLGdCQUFZLFVBRkQ7QUFHWEMsb0JBQWdCLENBSEw7QUFJWFgsaUJBQWE7QUFKRjtBQTNEQSxDQUFmIiwiZmlsZSI6InBvcHVwLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFJlYWN0IGZyb20gXCJyZWFjdFwiXHJcbmltcG9ydCBSZWFjdERPTSBmcm9tIFwicmVhY3QtZG9tXCJcclxuXHJcbmltcG9ydCB7IFBsdWdpbkluc3RhbmNlIH0gZnJvbSBcIi4uL2xheW91dFwiXHJcblxyXG5leHBvcnQgZGVmYXVsdCB7XHJcbiAgbmFtZTogXCJwb3B1cC1hZGRvblwiLFxyXG4gIGNvbXBvbmVudDogY2xhc3MgZXh0ZW5kcyBQbHVnaW5JbnN0YW5jZSB7XHJcbiAgICBtb2RhbFN0YWNrID0gW11cclxuICAgIHBsdWdpbldpbGxNb3VudCgpIHtcclxuICAgICAgdGhpcy5hcHBsaWNhdGlvbi5wb3B1cCA9IHRoaXMucG9wdXAuYmluZCh0aGlzKVxyXG4gICAgfVxyXG4gICAgcG9wdXAocmVuZGVyZXI6IEZ1bmN0aW9uLCBvdXRzaWRlUmVqZWN0KTogUHJvbWlzZSB7XHJcbiAgICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XHJcbiAgICAgICAgY29uc3QgaHRtbFJvb3QgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpXHJcbiAgICAgICAgaHRtbFJvb3Quc3R5bGUucG9zaXRpb24gPSBcImFic29sdXRlXCJcclxuICAgICAgICBodG1sUm9vdC5zdHlsZS5sZWZ0ID0gXCIwcHhcIlxyXG4gICAgICAgIGh0bWxSb290LnN0eWxlLnRvcCA9IFwiMHB4XCJcclxuICAgICAgICBodG1sUm9vdC5zdHlsZS56SW5kZXggPSB0aGlzLm1vZGFsU3RhY2subGVuZ3RoICogMTAwMCArIDEwMDBcclxuICAgICAgICBkb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKGh0bWxSb290KVxyXG5cclxuICAgICAgICBmdW5jdGlvbiBoYW5kbGVSZXNvbHZlKGRhdGEpIHtcclxuICAgICAgICAgIGRvY3VtZW50LmJvZHkucmVtb3ZlQ2hpbGQoaHRtbFJvb3QpXHJcbiAgICAgICAgICByZXNvbHZlKGRhdGEpXHJcbiAgICAgICAgfVxyXG4gICAgICAgIGZ1bmN0aW9uIGhhbmRsZVJlamVjdChkYXRhKSB7XHJcbiAgICAgICAgICBkb2N1bWVudC5ib2R5LnJlbW92ZUNoaWxkKGh0bWxSb290KVxyXG4gICAgICAgICAgcmVqZWN0KGRhdGEpXHJcbiAgICAgICAgfVxyXG4gICAgICAgIGZ1bmN0aW9uIGhhbmRsZVN0b3BQcm9wYWdhdGlvbihldnQpIHtcclxuICAgICAgICAgIGV2dC5zdG9wUHJvcGFnYXRpb24oKVxyXG4gICAgICAgIH1cclxuICAgICAgICBSZWFjdERPTS5yZW5kZXIoKFxyXG4gICAgICAgICAgPGRpdj5cclxuICAgICAgICAgICAgPGRpdiBzdHlsZT17IHN0eWxlcy5iYWNrZHJvcCB9IGNsYXNzTmFtZT1cImJhY2tkcm9wIHdlYi1tb2RhbC1kaWFsb2dcIiAvPlxyXG4gICAgICAgICAgICA8ZGl2IHN0eWxlPXsgc3R5bGVzLnZXcmFwcGVyIH0gb25DbGljaz17IG91dHNpZGVSZWplY3QgJiYgaGFuZGxlUmVqZWN0IH0gY2xhc3NOYW1lPVwidi13cmFwcGVyXCI+XHJcbiAgICAgICAgICAgICAgPGRpdiBzdHlsZT17IHN0eWxlcy5oV3JhcHBlciB9IGNsYXNzTmFtZT1cImgtd3JhcHBlclwiPlxyXG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJtb2RhbC1kaWFsb2dcIiBvbkNsaWNrPXsgaGFuZGxlU3RvcFByb3BhZ2F0aW9uIH0+XHJcbiAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwibW9kYWwtY29udGVudFwiPlxyXG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwibW9kYWwtYm9keVwiPlxyXG4gICAgICAgICAgICAgICAgICAgICAge3JlbmRlcmVyKGhhbmRsZVJlc29sdmUsIGhhbmRsZVJlamVjdCl9XHJcbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgKSwgaHRtbFJvb3QpXHJcbiAgICAgIH0pXHJcbiAgICB9XHJcbiAgfSxcclxufVxyXG5cclxuY29uc3Qgc3R5bGVzID0ge1xyXG4gIGJhY2tkcm9wV3JhcHBlcjoge1xyXG4gICAgcG9zaXRpb246IFwiZml4ZWRcIixcclxuICAgIGhlaWdodDogXCIxMDAlXCIsXHJcbiAgICB3aWR0aDogXCIxMDAlXCIsXHJcbiAgICB6SW5kZXg6IDk5OSxcclxuICB9LFxyXG4gIGJhY2tkcm9wOiB7XHJcbiAgICBvcGFjaXR5OiAuNSxcclxuICAgIHBvc2l0aW9uOiBcImZpeGVkXCIsXHJcbiAgICBoZWlnaHQ6IFwiMTAwJVwiLFxyXG4gICAgd2lkdGg6IFwiMTAwJVwiLFxyXG4gICAgekluZGV4OiA5OTgsXHJcbiAgICBiYWNrZ3JvdW5kQ29sb3I6IFwiIzMzM1wiLFxyXG4gIH0sXHJcbiAgdldyYXBwZXI6IHtcclxuICAgIHBvc2l0aW9uOiBcImZpeGVkXCIsXHJcbiAgICBoZWlnaHQ6IFwiMTAwJVwiLFxyXG4gICAgd2lkdGg6IFwiMTAwJVwiLFxyXG4gICAgekluZGV4OiA5OTksXHJcbiAgICBmbGV4RGlyZWN0aW9uOiBcInJvd1wiLFxyXG4gICAganVzdGlmeUNvbnRlbnQ6IFwiY2VudGVyXCIsXHJcbiAgfSxcclxuICBoV3JhcHBlcjoge1xyXG4gICAgaGVpZ2h0OiBcIjEwMCVcIixcclxuICAgIGZsZXhEaXJlY3Rpb246IFwiY29sdW1uXCIsXHJcbiAgICBqdXN0aWZ5Q29udGVudDogXCJjZW50ZXJcIixcclxuICB9LFxyXG4gIG1vZGFsRGlhbG9nOiB7XHJcbiAgICB3aWR0aDogNjAwLFxyXG4gICAgbWFyZ2luVG9wOiAzMCxcclxuICAgIG1hcmdpbkJvdHRvbTogMzAsXHJcbiAgfSxcclxuICBtb2RhbENvbnRlbnQ6IHtcclxuICAgIG1hcmdpbkxlZnQ6IFwiYXV0b1wiLFxyXG4gICAgbWFyZ2luUmlnaHQ6IFwiYXV0b1wiLFxyXG4gICAgd2lkdGg6IDYwMCxcclxuICAgIGJveFNoYWRvdzogXCIwIDVweCAxNXB4IHJnYmEoMCwwLDAsLjUpXCIsXHJcbiAgICB6SW5kZXg6IDk5OTk5OTk5LFxyXG4gICAgYmFja2dyb3VuZENvbG9yOiBcIndoaXRlXCIsXHJcbiAgICBwYWRkaW5nOiAzLFxyXG4gICAgYm9yZGVyV2lkdGg6IDEsXHJcbiAgICBib3JkZXJDb2xvcjogXCJyZ2JhKDAsMCwwLC4yKVwiLFxyXG4gICAgYm9yZGVyUmFkaXVzOiA2LFxyXG4gIH0sXHJcbiAgbW9kYWxIZWFkZXI6IHtcclxuICAgIHBhZGRpbmc6IDEwLFxyXG4gICAgYm9yZGVyQm90dG9tQ29sb3I6IFwiI2U1ZTVlNVwiLFxyXG4gICAgYm9yZGVyQm90dG9tV2lkdGg6IDEsXHJcbiAgICBmbGV4OiAxLFxyXG4gICAgZmxleERpcmVjdGlvbjogXCJyb3dcIixcclxuICB9LFxyXG4gIGNsb3NlOiB7XHJcbiAgICBjdXJzb3I6IFwicG9pbnRlclwiLFxyXG4gIH0sXHJcbiAgbW9kYWxCb2R5OiB7XHJcbiAgICBwb3NpdGlvbjogXCJyZWxhdGl2ZVwiLFxyXG4gICAgcGFkZGluZzogMTAsXHJcbiAgfSxcclxuICBtb2RhbEZvb3Rlcjoge1xyXG4gICAgcGFkZGluZzogMTAsXHJcbiAgICBhbGlnbkl0ZW1zOiBcImZsZXgtZW5kXCIsXHJcbiAgICBib3JkZXJUb3BXaWR0aDogMSxcclxuICAgIGJvcmRlckNvbG9yOiBcIiNlNWU1ZTVcIixcclxuICB9LFxyXG59XHJcblxyXG4iXX0=