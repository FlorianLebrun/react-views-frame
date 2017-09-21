"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _layout = require("../layout");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

exports.default = {
  name: "fetch-addon",
  component: function (_PluginInstance) {
    _inherits(component, _PluginInstance);

    function component() {
      var _ref;

      var _temp, _this, _ret;

      _classCallCheck(this, component);

      for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = component.__proto__ || Object.getPrototypeOf(component)).call.apply(_ref, [this].concat(args))), _this), _this.endpoints = null, _this.loginPromise = null, _this.enableLoginRecovery = true, _temp), _possibleConstructorReturn(_this, _ret);
    }

    _createClass(component, [{
      key: "pluginWillMount",
      value: function pluginWillMount(parameters) {
        this.application.fetchAPI = this.fetchAPI.bind(this);
        this.endpoints = parameters.endpoints;
      }
    }, {
      key: "fetchAPI",
      value: function fetchAPI(url, options) {
        var _this2 = this;

        var hasLoginRecovery = this.enableLoginRecovery && (!options || !options.noCredentials);

        var endpoint = this.endpoints.find(function (e) {
          return url.match(e.pattern);
        });
        if (!endpoint) {
          throw new Error("no endpoint for " + url);
        }

        var request = {
          method: "GET",
          headers: { "Accept": "application/json" }
        };

        if (options) {
          if (options.body instanceof Object) {
            request.headers["Content-Type"] = "application/json";
            request.body = JSON.stringify(options.body);
          } else if (options.body) {
            var contentType = options.headers["Content-Type"];
            if (!contentType) request.headers["Content-Type"] = "text/plain";
          }
          if (options.method) request.method = options.method;
          if (options.headers) Object.assign(request.headers, options.headers);
        }

        var response = function response(res) {
          return new Promise(function (resolve, reject) {

            var respondSuccess = function respondSuccess(json) {
              resolve({ status: res.status, headers: res.headers, json: json });
            };
            var respondError = function respondError(error) {
              reject({ status: res.status, headers: res.headers, error: error });
            };

            if (res.status >= 200 && res.status < 300) {
              if (res.status === 204) {
                return respondSuccess({});
              } else {
                return res.json().then(respondSuccess, respondError);
              }
            } else if (res.status === 401 && hasLoginRecovery) {
              if (!_this2.loginPromise) {
                _this2.loginPromise = endpoint.login(_this2.application);
                if (!_this2.loginPromise) throw new Error();
              }
              _this2.loginPromise.then(function () {
                _this2.loginPromise = null;
                hasLoginRecovery = false;
                var data = _extends({}, request);
                resolve(fetch(endpoint.prepare(url, data), data).then(response, response));
              }, function (error) {
                _this2.loginPromise = null;
                _this2.enableLoginRecovery = false;
                respondError(error);
              });
            } else {
              return res.json().then(respondError, function () {
                _this2.enableLoginRecovery = false;
                respondError(res.error);
              });
            }
          });
        };

        var data = _extends({}, request);
        return fetch(endpoint.prepare(url, data), data).then(response, response);
      }
    }]);

    return component;
  }(_layout.PluginInstance)
};
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9saWIvYWRkb25zL2ZldGNoLmpzIl0sIm5hbWVzIjpbIm5hbWUiLCJjb21wb25lbnQiLCJlbmRwb2ludHMiLCJsb2dpblByb21pc2UiLCJlbmFibGVMb2dpblJlY292ZXJ5IiwicGFyYW1ldGVycyIsImFwcGxpY2F0aW9uIiwiZmV0Y2hBUEkiLCJiaW5kIiwidXJsIiwib3B0aW9ucyIsImhhc0xvZ2luUmVjb3ZlcnkiLCJub0NyZWRlbnRpYWxzIiwiZW5kcG9pbnQiLCJmaW5kIiwibWF0Y2giLCJlIiwicGF0dGVybiIsIkVycm9yIiwicmVxdWVzdCIsIm1ldGhvZCIsImhlYWRlcnMiLCJib2R5IiwiT2JqZWN0IiwiSlNPTiIsInN0cmluZ2lmeSIsImNvbnRlbnRUeXBlIiwiYXNzaWduIiwicmVzcG9uc2UiLCJyZXMiLCJQcm9taXNlIiwicmVzb2x2ZSIsInJlamVjdCIsInJlc3BvbmRTdWNjZXNzIiwianNvbiIsInN0YXR1cyIsInJlc3BvbmRFcnJvciIsImVycm9yIiwidGhlbiIsImxvZ2luIiwiZGF0YSIsImZldGNoIiwicHJlcGFyZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUFBOzs7Ozs7OztrQkFFZTtBQUNiQSxRQUFNLGFBRE87QUFFYkM7QUFBQTs7QUFBQTtBQUFBOztBQUFBOztBQUFBOztBQUFBO0FBQUE7QUFBQTs7QUFBQSw4TEFDRUMsU0FERixHQUNxQixJQURyQixRQUVFQyxZQUZGLEdBRTBCLElBRjFCLFFBR0VDLG1CQUhGLEdBR2lDLElBSGpDO0FBQUE7O0FBQUE7QUFBQTtBQUFBLHNDQUtrQkMsVUFMbEIsRUFLc0M7QUFDbEMsYUFBS0MsV0FBTCxDQUFpQkMsUUFBakIsR0FBNEIsS0FBS0EsUUFBTCxDQUFjQyxJQUFkLENBQW1CLElBQW5CLENBQTVCO0FBQ0EsYUFBS04sU0FBTCxHQUFpQkcsV0FBV0gsU0FBNUI7QUFDRDtBQVJIO0FBQUE7QUFBQSwrQkFTV08sR0FUWCxFQVNnQkMsT0FUaEIsRUFTeUI7QUFB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Q0FBTixFQUFtQ0EsSUFBbkMsRUFBeUNGLElBQXpDLENBQThDVixRQUE5QyxFQUF3REEsUUFBeEQsQ0FBUjtBQUNELGVBTEQsRUFLRyxVQUFDUyxLQUFELEVBQVc7QUFDWix1QkFBS2xDLFlBQUwsR0FBb0IsSUFBcEI7QUFDQSx1QkFBS0MsbUJBQUwsR0FBMkIsS0FBM0I7QUFDQWdDLDZCQUFhQyxLQUFiO0FBQ0QsZUFURDtBQVVELGFBZkksTUFnQkE7QUFDSCxxQkFBT1IsSUFBSUssSUFBSixHQUFXSSxJQUFYLENBQWdCRixZQUFoQixFQUE4QixZQUFNO0FBQ3pDLHVCQUFLaEMsbUJBQUwsR0FBMkIsS0FBM0I7QUFDQWdDLDZCQUFhUCxJQUFJUSxLQUFqQjtBQUNELGVBSE0sQ0FBUDtBQUlEO0FBQ0YsV0F2Q00sQ0FBUDtBQXdDRCxTQXpDRDs7QUEyQ0EsWUFBTUcsb0JBQVlyQixPQUFaLENBQU47QUFDQSxlQUFPc0IsTUFBTTVCLFNBQVM2QixPQUFULENBQWlCakMsR0FBakIsRUFBc0IrQixJQUF0QixDQUFOLEVBQW1DQSxJQUFuQyxFQUF5Q0YsSUFBekMsQ0FBOENWLFFBQTlDLEVBQXdEQSxRQUF4RCxDQUFQO0FBQ0Q7QUFoRkg7O0FBQUE7QUFBQTtBQUZhLEMiLCJmaWxlIjoiZmV0Y2guanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBQbHVnaW5JbnN0YW5jZSB9IGZyb20gXCIuLi9sYXlvdXRcIlxyXG5cclxuZXhwb3J0IGRlZmF1bHQge1xyXG4gIG5hbWU6IFwiZmV0Y2gtYWRkb25cIixcclxuICBjb21wb25lbnQ6IGNsYXNzIGV4dGVuZHMgUGx1Z2luSW5zdGFuY2Uge1xyXG4gICAgZW5kcG9pbnRzOiBBcnJheSA9IG51bGxcclxuICAgIGxvZ2luUHJvbWlzZTogUHJvbWlzZSA9IG51bGxcclxuICAgIGVuYWJsZUxvZ2luUmVjb3Zlcnk6IGJvb2xlYW4gPSB0cnVlXHJcblxyXG4gICAgcGx1Z2luV2lsbE1vdW50KHBhcmFtZXRlcnM6IE9iamVjdCkge1xyXG4gICAgICB0aGlzLmFwcGxpY2F0aW9uLmZldGNoQVBJID0gdGhpcy5mZXRjaEFQSS5iaW5kKHRoaXMpXHJcbiAgICAgIHRoaXMuZW5kcG9pbnRzID0gcGFyYW1ldGVycy5lbmRwb2ludHNcclxuICAgIH1cclxuICAgIGZldGNoQVBJKHVybCwgb3B0aW9ucykge1xyXG4gICAgICBsZXQgaGFzTG9naW5SZWNvdmVyeSA9IHRoaXMuZW5hYmxlTG9naW5SZWNvdmVyeSAmJiAoIW9wdGlvbnMgfHwgIW9wdGlvbnMubm9DcmVkZW50aWFscylcclxuXHJcbiAgICAgIGNvbnN0IGVuZHBvaW50ID0gdGhpcy5lbmRwb2ludHMuZmluZChlID0+IHVybC5tYXRjaChlLnBhdHRlcm4pKVxyXG4gICAgICBpZiAoIWVuZHBvaW50KSB7XHJcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwibm8gZW5kcG9pbnQgZm9yIFwiICsgdXJsKVxyXG4gICAgICB9XHJcblxyXG4gICAgICBjb25zdCByZXF1ZXN0ID0ge1xyXG4gICAgICAgIG1ldGhvZDogXCJHRVRcIixcclxuICAgICAgICBoZWFkZXJzOiB7IFwiQWNjZXB0XCI6IFwiYXBwbGljYXRpb24vanNvblwiIH0sXHJcbiAgICAgIH1cclxuXHJcbiAgICAgIGlmIChvcHRpb25zKSB7XHJcbiAgICAgICAgaWYgKG9wdGlvbnMuYm9keSBpbnN0YW5jZW9mIE9iamVjdCkge1xyXG4gICAgICAgICAgcmVxdWVzdC5oZWFkZXJzW1wiQ29udGVudC1UeXBlXCJdID0gXCJhcHBsaWNhdGlvbi9qc29uXCJcclxuICAgICAgICAgIHJlcXVlc3QuYm9keSA9IEpTT04uc3RyaW5naWZ5KG9wdGlvbnMuYm9keSlcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSBpZiAob3B0aW9ucy5ib2R5KSB7XHJcbiAgICAgICAgICBjb25zdCBjb250ZW50VHlwZSA9IG9wdGlvbnMuaGVhZGVyc1tcIkNvbnRlbnQtVHlwZVwiXVxyXG4gICAgICAgICAgaWYgKCFjb250ZW50VHlwZSkgcmVxdWVzdC5oZWFkZXJzW1wiQ29udGVudC1UeXBlXCJdID0gXCJ0ZXh0L3BsYWluXCJcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKG9wdGlvbnMubWV0aG9kKSByZXF1ZXN0Lm1ldGhvZCA9IG9wdGlvbnMubWV0aG9kXHJcbiAgICAgICAgaWYgKG9wdGlvbnMuaGVhZGVycykgT2JqZWN0LmFzc2lnbihyZXF1ZXN0LmhlYWRlcnMsIG9wdGlvbnMuaGVhZGVycylcclxuICAgICAgfVxyXG5cclxuICAgICAgY29uc3QgcmVzcG9uc2UgPSAocmVzKSA9PiB7XHJcbiAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcclxuXHJcbiAgICAgICAgICBjb25zdCByZXNwb25kU3VjY2VzcyA9IGZ1bmN0aW9uKGpzb24pIHtcclxuICAgICAgICAgICAgcmVzb2x2ZSh7IHN0YXR1czogcmVzLnN0YXR1cywgaGVhZGVyczogcmVzLmhlYWRlcnMsIGpzb24gfSlcclxuICAgICAgICAgIH1cclxuICAgICAgICAgIGNvbnN0IHJlc3BvbmRFcnJvciA9IGZ1bmN0aW9uKGVycm9yKSB7XHJcbiAgICAgICAgICAgIHJlamVjdCh7IHN0YXR1czogcmVzLnN0YXR1cywgaGVhZGVyczogcmVzLmhlYWRlcnMsIGVycm9yIH0pXHJcbiAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgaWYgKHJlcy5zdGF0dXMgPj0gMjAwICYmIHJlcy5zdGF0dXMgPCAzMDApIHtcclxuICAgICAgICAgICAgaWYgKHJlcy5zdGF0dXMgPT09IDIwNCkge1xyXG4gICAgICAgICAgICAgIHJldHVybiByZXNwb25kU3VjY2Vzcyh7fSlcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICByZXR1cm4gcmVzLmpzb24oKS50aGVuKHJlc3BvbmRTdWNjZXNzLCByZXNwb25kRXJyb3IpXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgIH1cclxuICAgICAgICAgIGVsc2UgaWYgKHJlcy5zdGF0dXMgPT09IDQwMSAmJiBoYXNMb2dpblJlY292ZXJ5KSB7XHJcbiAgICAgICAgICAgIGlmICghdGhpcy5sb2dpblByb21pc2UpIHtcclxuICAgICAgICAgICAgICB0aGlzLmxvZ2luUHJvbWlzZSA9IGVuZHBvaW50LmxvZ2luKHRoaXMuYXBwbGljYXRpb24pXHJcbiAgICAgICAgICAgICAgaWYgKCF0aGlzLmxvZ2luUHJvbWlzZSkgdGhyb3cgbmV3IEVycm9yKClcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB0aGlzLmxvZ2luUHJvbWlzZS50aGVuKCgpID0+IHtcclxuICAgICAgICAgICAgICB0aGlzLmxvZ2luUHJvbWlzZSA9IG51bGxcclxuICAgICAgICAgICAgICBoYXNMb2dpblJlY292ZXJ5ID0gZmFsc2VcclxuICAgICAgICAgICAgICBjb25zdCBkYXRhID0geyAuLi5yZXF1ZXN0IH1cclxuICAgICAgICAgICAgICByZXNvbHZlKGZldGNoKGVuZHBvaW50LnByZXBhcmUodXJsLCBkYXRhKSwgZGF0YSkudGhlbihyZXNwb25zZSwgcmVzcG9uc2UpKVxyXG4gICAgICAgICAgICB9LCAoZXJyb3IpID0+IHtcclxuICAgICAgICAgICAgICB0aGlzLmxvZ2luUHJvbWlzZSA9IG51bGxcclxuICAgICAgICAgICAgICB0aGlzLmVuYWJsZUxvZ2luUmVjb3ZlcnkgPSBmYWxzZVxyXG4gICAgICAgICAgICAgIHJlc3BvbmRFcnJvcihlcnJvcilcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICAgIH1cclxuICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICByZXR1cm4gcmVzLmpzb24oKS50aGVuKHJlc3BvbmRFcnJvciwgKCkgPT4ge1xyXG4gICAgICAgICAgICAgIHRoaXMuZW5hYmxlTG9naW5SZWNvdmVyeSA9IGZhbHNlXHJcbiAgICAgICAgICAgICAgcmVzcG9uZEVycm9yKHJlcy5lcnJvcilcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICAgIH1cclxuICAgICAgICB9KVxyXG4gICAgICB9XHJcblxyXG4gICAgICBjb25zdCBkYXRhID0geyAuLi5yZXF1ZXN0IH1cclxuICAgICAgcmV0dXJuIGZldGNoKGVuZHBvaW50LnByZXBhcmUodXJsLCBkYXRhKSwgZGF0YSkudGhlbihyZXNwb25zZSwgcmVzcG9uc2UpXHJcbiAgICB9XHJcbiAgfSxcclxufSJdfQ==