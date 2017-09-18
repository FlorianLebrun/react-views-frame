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

        options = {
          method: options && options.method || "GET",
          headers: _extends({
            "Accept": "application/json"
          }, options && options.headers)
        };

        if (options.body instanceof Object) {
          options.headers["Content-Type"] = "application/json";
          options.body = JSON.stringify(options.body);
        } else if (options.body) {
          var contentType = options.headers["Content-Type"];
          if (!contentType) options.headers["Content-Type"] = "text/plain";
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
                var data = _extends({}, options);
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

        var data = _extends({}, options);
        return fetch(endpoint.prepare(url, data), data).then(response, response);
      }
    }]);

    return component;
  }(_layout.PluginInstance)
};
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9saWIvYWRkb25zL2ZldGNoLmpzIl0sIm5hbWVzIjpbIm5hbWUiLCJjb21wb25lbnQiLCJlbmRwb2ludHMiLCJsb2dpblByb21pc2UiLCJlbmFibGVMb2dpblJlY292ZXJ5IiwicGFyYW1ldGVycyIsImFwcGxpY2F0aW9uIiwiZmV0Y2hBUEkiLCJiaW5kIiwidXJsIiwib3B0aW9ucyIsImhhc0xvZ2luUmVjb3ZlcnkiLCJub0NyZWRlbnRpYWxzIiwiZW5kcG9pbnQiLCJmaW5kIiwibWF0Y2giLCJlIiwicGF0dGVybiIsIkVycm9yIiwibWV0aG9kIiwiaGVhZGVycyIsImJvZHkiLCJPYmplY3QiLCJKU09OIiwic3RyaW5naWZ5IiwiY29udGVudFR5cGUiLCJyZXNwb25zZSIsInJlcyIsIlByb21pc2UiLCJyZXNvbHZlIiwicmVqZWN0IiwicmVzcG9uZFN1Y2Nlc3MiLCJqc29uIiwic3RhdHVzIiwicmVzcG9uZEVycm9yIiwiZXJyb3IiLCJ0aGVuIiwibG9naW4iLCJkYXRhIiwiZmV0Y2giLCJwcmVwYXJlIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBQUE7Ozs7Ozs7O2tCQUVlO0FBQ2JBLFFBQU0sYUFETztBQUViQztBQUFBOztBQUFBO0FBQUE7O0FBQUE7O0FBQUE7O0FBQUE7QUFBQTtBQUFBOztBQUFBLDhMQUNFQyxTQURGLEdBQ3FCLElBRHJCLFFBRUVDLFlBRkYsR0FFMEIsSUFGMUIsUUFHRUMsbUJBSEYsR0FHaUMsSUFIakM7QUFBQTs7QUFBQTtBQUFBO0FBQUEsc0NBS2tCQyxVQUxsQixFQUtzQztBQUNsQyxhQUFLQyxXQUFMLENBQWlCQyxRQUFqQixHQUE0QixLQUFLQSxRQUFMLENBQWNDLElBQWQsQ0FBbUIsSUFBbkIsQ0FBNUI7QUFDQSxhQUFLTixTQUFMLEdBQWlCRyxXQUFXSCxTQUE1QjtBQUNEO0FBUkg7QUFBQTtBQUFBLCtCQVNXTyxHQVRYLEVBU2dCQyxPQVRoQixFQVN5QjtBQUFBOztBQUNyQixZQUFJQyxtQkFB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LEtBQTNCO0FBQ0E4Qiw2QkFBYUMsS0FBYjtBQUNELGVBVEQ7QUFVRCxhQWZJLE1BZ0JBO0FBQ0gscUJBQU9SLElBQUlLLElBQUosR0FBV0ksSUFBWCxDQUFnQkYsWUFBaEIsRUFBOEIsWUFBTTtBQUN6Qyx1QkFBSzlCLG1CQUFMLEdBQTJCLEtBQTNCO0FBQ0E4Qiw2QkFBYVAsSUFBSVEsS0FBakI7QUFDRCxlQUhNLENBQVA7QUFJRDtBQUNGLFdBdkNNLENBQVA7QUF3Q0QsU0F6Q0Q7O0FBMkNBLFlBQU1HLG9CQUFZNUIsT0FBWixDQUFOO0FBQ0EsZUFBTzZCLE1BQU0xQixTQUFTMkIsT0FBVCxDQUFpQi9CLEdBQWpCLEVBQXNCNkIsSUFBdEIsQ0FBTixFQUFtQ0EsSUFBbkMsRUFBeUNGLElBQXpDLENBQThDVixRQUE5QyxFQUF3REEsUUFBeEQsQ0FBUDtBQUNEO0FBL0VIOztBQUFBO0FBQUE7QUFGYSxDIiwiZmlsZSI6ImZldGNoLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgUGx1Z2luSW5zdGFuY2UgfSBmcm9tIFwiLi4vbGF5b3V0XCJcclxuXHJcbmV4cG9ydCBkZWZhdWx0IHtcclxuICBuYW1lOiBcImZldGNoLWFkZG9uXCIsXHJcbiAgY29tcG9uZW50OiBjbGFzcyBleHRlbmRzIFBsdWdpbkluc3RhbmNlIHtcclxuICAgIGVuZHBvaW50czogQXJyYXkgPSBudWxsXHJcbiAgICBsb2dpblByb21pc2U6IFByb21pc2UgPSBudWxsXHJcbiAgICBlbmFibGVMb2dpblJlY292ZXJ5OiBib29sZWFuID0gdHJ1ZVxyXG5cclxuICAgIHBsdWdpbldpbGxNb3VudChwYXJhbWV0ZXJzOiBPYmplY3QpIHtcclxuICAgICAgdGhpcy5hcHBsaWNhdGlvbi5mZXRjaEFQSSA9IHRoaXMuZmV0Y2hBUEkuYmluZCh0aGlzKVxyXG4gICAgICB0aGlzLmVuZHBvaW50cyA9IHBhcmFtZXRlcnMuZW5kcG9pbnRzXHJcbiAgICB9XHJcbiAgICBmZXRjaEFQSSh1cmwsIG9wdGlvbnMpIHtcclxuICAgICAgbGV0IGhhc0xvZ2luUmVjb3ZlcnkgPSB0aGlzLmVuYWJsZUxvZ2luUmVjb3ZlcnkgJiYgKCFvcHRpb25zIHx8ICFvcHRpb25zLm5vQ3JlZGVudGlhbHMpXHJcblxyXG4gICAgICBjb25zdCBlbmRwb2ludCA9IHRoaXMuZW5kcG9pbnRzLmZpbmQoZSA9PiB1cmwubWF0Y2goZS5wYXR0ZXJuKSlcclxuICAgICAgaWYgKCFlbmRwb2ludCkge1xyXG4gICAgICAgIHRocm93IG5ldyBFcnJvcihcIm5vIGVuZHBvaW50IGZvciBcIiArIHVybClcclxuICAgICAgfVxyXG5cclxuICAgICAgb3B0aW9ucyA9IHtcclxuICAgICAgICBtZXRob2Q6IG9wdGlvbnMgJiYgb3B0aW9ucy5tZXRob2QgfHwgXCJHRVRcIixcclxuICAgICAgICBoZWFkZXJzOiB7XHJcbiAgICAgICAgICBcIkFjY2VwdFwiOiBcImFwcGxpY2F0aW9uL2pzb25cIixcclxuICAgICAgICAgIC4uLm9wdGlvbnMgJiYgb3B0aW9ucy5oZWFkZXJzLFxyXG4gICAgICAgIH0sXHJcbiAgICAgIH1cclxuXHJcbiAgICAgIGlmIChvcHRpb25zLmJvZHkgaW5zdGFuY2VvZiBPYmplY3QpIHtcclxuICAgICAgICBvcHRpb25zLmhlYWRlcnNbXCJDb250ZW50LVR5cGVcIl0gPSBcImFwcGxpY2F0aW9uL2pzb25cIlxyXG4gICAgICAgIG9wdGlvbnMuYm9keSA9IEpTT04uc3RyaW5naWZ5KG9wdGlvbnMuYm9keSlcclxuICAgICAgfVxyXG4gICAgICBlbHNlIGlmIChvcHRpb25zLmJvZHkpIHtcclxuICAgICAgICBjb25zdCBjb250ZW50VHlwZSA9IG9wdGlvbnMuaGVhZGVyc1tcIkNvbnRlbnQtVHlwZVwiXVxyXG4gICAgICAgIGlmICghY29udGVudFR5cGUpIG9wdGlvbnMuaGVhZGVyc1tcIkNvbnRlbnQtVHlwZVwiXSA9IFwidGV4dC9wbGFpblwiXHJcbiAgICAgIH1cclxuXHJcbiAgICAgIGNvbnN0IHJlc3BvbnNlID0gKHJlcykgPT4ge1xyXG4gICAgICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XHJcblxyXG4gICAgICAgICAgY29uc3QgcmVzcG9uZFN1Y2Nlc3MgPSBmdW5jdGlvbiAoanNvbikge1xyXG4gICAgICAgICAgICByZXNvbHZlKHsgc3RhdHVzOiByZXMuc3RhdHVzLCBoZWFkZXJzOiByZXMuaGVhZGVycywganNvbiB9KVxyXG4gICAgICAgICAgfVxyXG4gICAgICAgICAgY29uc3QgcmVzcG9uZEVycm9yID0gZnVuY3Rpb24gKGVycm9yKSB7XHJcbiAgICAgICAgICAgIHJlamVjdCh7IHN0YXR1czogcmVzLnN0YXR1cywgaGVhZGVyczogcmVzLmhlYWRlcnMsIGVycm9yIH0pXHJcbiAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgaWYgKHJlcy5zdGF0dXMgPj0gMjAwICYmIHJlcy5zdGF0dXMgPCAzMDApIHtcclxuICAgICAgICAgICAgaWYgKHJlcy5zdGF0dXMgPT09IDIwNCkge1xyXG4gICAgICAgICAgICAgIHJldHVybiByZXNwb25kU3VjY2Vzcyh7fSlcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICByZXR1cm4gcmVzLmpzb24oKS50aGVuKHJlc3BvbmRTdWNjZXNzLCByZXNwb25kRXJyb3IpXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgIH1cclxuICAgICAgICAgIGVsc2UgaWYgKHJlcy5zdGF0dXMgPT09IDQwMSAmJiBoYXNMb2dpblJlY292ZXJ5KSB7XHJcbiAgICAgICAgICAgIGlmICghdGhpcy5sb2dpblByb21pc2UpIHtcclxuICAgICAgICAgICAgICB0aGlzLmxvZ2luUHJvbWlzZSA9IGVuZHBvaW50LmxvZ2luKHRoaXMuYXBwbGljYXRpb24pXHJcbiAgICAgICAgICAgICAgaWYgKCF0aGlzLmxvZ2luUHJvbWlzZSkgdGhyb3cgbmV3IEVycm9yKClcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB0aGlzLmxvZ2luUHJvbWlzZS50aGVuKCgpID0+IHtcclxuICAgICAgICAgICAgICB0aGlzLmxvZ2luUHJvbWlzZSA9IG51bGxcclxuICAgICAgICAgICAgICBoYXNMb2dpblJlY292ZXJ5ID0gZmFsc2VcclxuICAgICAgICAgICAgICBjb25zdCBkYXRhID0geyAuLi5vcHRpb25zIH1cclxuICAgICAgICAgICAgICByZXNvbHZlKGZldGNoKGVuZHBvaW50LnByZXBhcmUodXJsLCBkYXRhKSwgZGF0YSkudGhlbihyZXNwb25zZSwgcmVzcG9uc2UpKVxyXG4gICAgICAgICAgICB9LCAoZXJyb3IpID0+IHtcclxuICAgICAgICAgICAgICB0aGlzLmxvZ2luUHJvbWlzZSA9IG51bGxcclxuICAgICAgICAgICAgICB0aGlzLmVuYWJsZUxvZ2luUmVjb3ZlcnkgPSBmYWxzZVxyXG4gICAgICAgICAgICAgIHJlc3BvbmRFcnJvcihlcnJvcilcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICAgIH1cclxuICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICByZXR1cm4gcmVzLmpzb24oKS50aGVuKHJlc3BvbmRFcnJvciwgKCkgPT4ge1xyXG4gICAgICAgICAgICAgIHRoaXMuZW5hYmxlTG9naW5SZWNvdmVyeSA9IGZhbHNlXHJcbiAgICAgICAgICAgICAgcmVzcG9uZEVycm9yKHJlcy5lcnJvcilcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICAgIH1cclxuICAgICAgICB9KVxyXG4gICAgICB9XHJcblxyXG4gICAgICBjb25zdCBkYXRhID0geyAuLi5vcHRpb25zIH1cclxuICAgICAgcmV0dXJuIGZldGNoKGVuZHBvaW50LnByZXBhcmUodXJsLCBkYXRhKSwgZGF0YSkudGhlbihyZXNwb25zZSwgcmVzcG9uc2UpXHJcbiAgICB9XHJcbiAgfSxcclxufSJdfQ==