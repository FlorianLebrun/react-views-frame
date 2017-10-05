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

        var request = Object.assign({ headers: {} }, options);
        if (options) {
          if (options.body instanceof Object) {
            request.headers["Content-Type"] = "application/json";
            request.body = JSON.stringify(options.body);
          } else if (options.body) {
            var contentType = options.headers["Content-Type"];
            if (!contentType) request.headers["Content-Type"] = "text/plain";
          }
          request.method = options.method || "GET";
          request.headers = Object.assign({ "Accept": "application/json" }, options.headers);
        } else {
          request.method = "GET";
          request.headers = { "Accept": "application/json" };
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
              if (endpoint.feedback) {
                endpoint.feedback(res, data);
              }
              if (res.status === 204) {
                return respondSuccess({});
              } else {
                return res.json().then(respondSuccess, respondError);
              }
            } else if (res.status === 401 && hasLoginRecovery && endpoint.login) {
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
            } else if (res.json && res.json instanceof Function) {
              return res.json().then(respondError, function () {
                _this2.enableLoginRecovery = false;
                respondError(res.error);
              });
            } else {
              return respondError(res.error);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9saWIvYWRkb25zL2ZldGNoLmpzIl0sIm5hbWVzIjpbIm5hbWUiLCJjb21wb25lbnQiLCJlbmRwb2ludHMiLCJsb2dpblByb21pc2UiLCJlbmFibGVMb2dpblJlY292ZXJ5IiwicGFyYW1ldGVycyIsImFwcGxpY2F0aW9uIiwiZmV0Y2hBUEkiLCJiaW5kIiwidXJsIiwib3B0aW9ucyIsImhhc0xvZ2luUmVjb3ZlcnkiLCJub0NyZWRlbnRpYWxzIiwiZW5kcG9pbnQiLCJmaW5kIiwibWF0Y2giLCJlIiwicGF0dGVybiIsIkVycm9yIiwicmVxdWVzdCIsIk9iamVjdCIsImFzc2lnbiIsImhlYWRlcnMiLCJib2R5IiwiSlNPTiIsInN0cmluZ2lmeSIsImNvbnRlbnRUeXBlIiwibWV0aG9kIiwicmVzcG9uc2UiLCJyZXMiLCJQcm9taXNlIiwicmVzb2x2ZSIsInJlamVjdCIsInJlc3BvbmRTdWNjZXNzIiwianNvbiIsInN0YXR1cyIsInJlc3BvbmRFcnJvciIsImVycm9yIiwiZmVlZGJhY2siLCJkYXRhIiwidGhlbiIsImxvZ2luIiwiZmV0Y2giLCJwcmVwYXJlIiwiRnVuY3Rpb24iXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFBQTs7Ozs7Ozs7a0JBRWU7QUFDYkEsUUFBTSxhQURPO0FBRWJDO0FBQUE7O0FBQUE7QUFBQTs7QUFBQTs7QUFBQTs7QUFBQTtBQUFBO0FBQUE7O0FBQUEsOExBQ0VDLFNBREYsR0FDcUIsSUFEckIsUUFFRUMsWUFGRixHQUUwQixJQUYxQixRQUdFQyxtQkFIRixHQUdpQyxJQUhqQztBQUFBOztBQUFBO0FBQUE7QUFBQSxzQ0FLa0JDLFVBTGxCLEVBS3NDO0FBQ2xDLGFBQUtDLFdBQUwsQ0FBaUJDLFFBQWpCLEdBQTRCLEtBQUtBLFFBQUwsQ0FBY0MsSUFBZCxDQUFtQixJQUFuQixDQUE1QjtBQUNBLGFBQUtOLFNBQUwsR0FBaUJHLFdBQVdILFNBQTVCO0FBQ0Q7QUFSSDtBQUFBO0FBQUEsK0JBU1dPLEdBVFgs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aW1wb3J0IHsgUGx1Z2luSW5zdGFuY2UgfSBmcm9tIFwiLi4vbGF5b3V0XCJcclxuXHJcbmV4cG9ydCBkZWZhdWx0IHtcclxuICBuYW1lOiBcImZldGNoLWFkZG9uXCIsXHJcbiAgY29tcG9uZW50OiBjbGFzcyBleHRlbmRzIFBsdWdpbkluc3RhbmNlIHtcclxuICAgIGVuZHBvaW50czogQXJyYXkgPSBudWxsXHJcbiAgICBsb2dpblByb21pc2U6IFByb21pc2UgPSBudWxsXHJcbiAgICBlbmFibGVMb2dpblJlY292ZXJ5OiBib29sZWFuID0gdHJ1ZVxyXG5cclxuICAgIHBsdWdpbldpbGxNb3VudChwYXJhbWV0ZXJzOiBPYmplY3QpIHtcclxuICAgICAgdGhpcy5hcHBsaWNhdGlvbi5mZXRjaEFQSSA9IHRoaXMuZmV0Y2hBUEkuYmluZCh0aGlzKVxyXG4gICAgICB0aGlzLmVuZHBvaW50cyA9IHBhcmFtZXRlcnMuZW5kcG9pbnRzXHJcbiAgICB9XHJcbiAgICBmZXRjaEFQSSh1cmwsIG9wdGlvbnMpIHtcclxuICAgICAgbGV0IGhhc0xvZ2luUmVjb3ZlcnkgPSB0aGlzLmVuYWJsZUxvZ2luUmVjb3ZlcnkgJiYgKCFvcHRpb25zIHx8ICFvcHRpb25zLm5vQ3JlZGVudGlhbHMpXHJcblxyXG4gICAgICBjb25zdCBlbmRwb2ludCA9IHRoaXMuZW5kcG9pbnRzLmZpbmQoZSA9PiB1cmwubWF0Y2goZS5wYXR0ZXJuKSlcclxuICAgICAgaWYgKCFlbmRwb2ludCkge1xyXG4gICAgICAgIHRocm93IG5ldyBFcnJvcihcIm5vIGVuZHBvaW50IGZvciBcIiArIHVybClcclxuICAgICAgfVxyXG5cclxuICAgICAgY29uc3QgcmVxdWVzdCA9IE9iamVjdC5hc3NpZ24oeyBoZWFkZXJzOnt9IH0sIG9wdGlvbnMpXHJcbiAgICAgIGlmIChvcHRpb25zKSB7XHJcbiAgICAgICAgaWYgKG9wdGlvbnMuYm9keSBpbnN0YW5jZW9mIE9iamVjdCkge1xyXG4gICAgICAgICAgcmVxdWVzdC5oZWFkZXJzW1wiQ29udGVudC1UeXBlXCJdID0gXCJhcHBsaWNhdGlvbi9qc29uXCJcclxuICAgICAgICAgIHJlcXVlc3QuYm9keSA9IEpTT04uc3RyaW5naWZ5KG9wdGlvbnMuYm9keSlcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSBpZiAob3B0aW9ucy5ib2R5KSB7XHJcbiAgICAgICAgICBjb25zdCBjb250ZW50VHlwZSA9IG9wdGlvbnMuaGVhZGVyc1tcIkNvbnRlbnQtVHlwZVwiXVxyXG4gICAgICAgICAgaWYgKCFjb250ZW50VHlwZSkgcmVxdWVzdC5oZWFkZXJzW1wiQ29udGVudC1UeXBlXCJdID0gXCJ0ZXh0L3BsYWluXCJcclxuICAgICAgICB9XHJcbiAgICAgICAgcmVxdWVzdC5tZXRob2QgPSBvcHRpb25zLm1ldGhvZCB8fCBcIkdFVFwiXHJcbiAgICAgICAgcmVxdWVzdC5oZWFkZXJzID0gT2JqZWN0LmFzc2lnbih7IFwiQWNjZXB0XCI6IFwiYXBwbGljYXRpb24vanNvblwiIH0sIG9wdGlvbnMuaGVhZGVycylcclxuICAgICAgfVxyXG4gICAgICBlbHNlIHtcclxuICAgICAgICByZXF1ZXN0Lm1ldGhvZCA9IFwiR0VUXCJcclxuICAgICAgICByZXF1ZXN0LmhlYWRlcnMgPSB7IFwiQWNjZXB0XCI6IFwiYXBwbGljYXRpb24vanNvblwiIH1cclxuICAgICAgfVxyXG5cclxuICAgICAgY29uc3QgcmVzcG9uc2UgPSAocmVzKSA9PiB7XHJcbiAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcclxuXHJcbiAgICAgICAgICBjb25zdCByZXNwb25kU3VjY2VzcyA9IGZ1bmN0aW9uKGpzb24pIHtcclxuICAgICAgICAgICAgcmVzb2x2ZSh7IHN0YXR1czogcmVzLnN0YXR1cywgaGVhZGVyczogcmVzLmhlYWRlcnMsIGpzb24gfSlcclxuICAgICAgICAgIH1cclxuICAgICAgICAgIGNvbnN0IHJlc3BvbmRFcnJvciA9IGZ1bmN0aW9uKGVycm9yKSB7XHJcbiAgICAgICAgICAgIHJlamVjdCh7IHN0YXR1czogcmVzLnN0YXR1cywgaGVhZGVyczogcmVzLmhlYWRlcnMsIGVycm9yIH0pXHJcbiAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgaWYgKHJlcy5zdGF0dXMgPj0gMjAwICYmIHJlcy5zdGF0dXMgPCAzMDApIHtcclxuICAgICAgICAgICAgaWYgKGVuZHBvaW50LmZlZWRiYWNrKSB7XHJcbiAgICAgICAgICAgICAgZW5kcG9pbnQuZmVlZGJhY2socmVzLCBkYXRhKVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmIChyZXMuc3RhdHVzID09PSAyMDQpIHtcclxuICAgICAgICAgICAgICByZXR1cm4gcmVzcG9uZFN1Y2Nlc3Moe30pXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgcmV0dXJuIHJlcy5qc29uKCkudGhlbihyZXNwb25kU3VjY2VzcywgcmVzcG9uZEVycm9yKVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgICBlbHNlIGlmIChyZXMuc3RhdHVzID09PSA0MDEgJiYgaGFzTG9naW5SZWNvdmVyeSAmJiBlbmRwb2ludC5sb2dpbikge1xyXG4gICAgICAgICAgICBpZiAoIXRoaXMubG9naW5Qcm9taXNlKSB7XHJcbiAgICAgICAgICAgICAgdGhpcy5sb2dpblByb21pc2UgPSBlbmRwb2ludC5sb2dpbih0aGlzLmFwcGxpY2F0aW9uKVxyXG4gICAgICAgICAgICAgIGlmICghdGhpcy5sb2dpblByb21pc2UpIHRocm93IG5ldyBFcnJvcigpXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgdGhpcy5sb2dpblByb21pc2UudGhlbigoKSA9PiB7XHJcbiAgICAgICAgICAgICAgdGhpcy5sb2dpblByb21pc2UgPSBudWxsXHJcbiAgICAgICAgICAgICAgaGFzTG9naW5SZWNvdmVyeSA9IGZhbHNlXHJcbiAgICAgICAgICAgICAgY29uc3QgZGF0YSA9IHsgLi4ucmVxdWVzdCB9XHJcbiAgICAgICAgICAgICAgcmVzb2x2ZShmZXRjaChlbmRwb2ludC5wcmVwYXJlKHVybCwgZGF0YSksIGRhdGEpLnRoZW4ocmVzcG9uc2UsIHJlc3BvbnNlKSlcclxuICAgICAgICAgICAgfSwgKGVycm9yKSA9PiB7XHJcbiAgICAgICAgICAgICAgdGhpcy5sb2dpblByb21pc2UgPSBudWxsXHJcbiAgICAgICAgICAgICAgdGhpcy5lbmFibGVMb2dpblJlY292ZXJ5ID0gZmFsc2VcclxuICAgICAgICAgICAgICByZXNwb25kRXJyb3IoZXJyb3IpXHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgICBlbHNlIGlmIChyZXMuanNvbiAmJiByZXMuanNvbiBpbnN0YW5jZW9mIEZ1bmN0aW9uKSB7XHJcbiAgICAgICAgICAgIHJldHVybiByZXMuanNvbigpLnRoZW4ocmVzcG9uZEVycm9yLCAoKSA9PiB7XHJcbiAgICAgICAgICAgICAgdGhpcy5lbmFibGVMb2dpblJlY292ZXJ5ID0gZmFsc2VcclxuICAgICAgICAgICAgICByZXNwb25kRXJyb3IocmVzLmVycm9yKVxyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgICAgfVxyXG4gICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgIHJldHVybiByZXNwb25kRXJyb3IocmVzLmVycm9yKVxyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH0pXHJcbiAgICAgIH1cclxuXHJcbiAgICAgIGNvbnN0IGRhdGEgPSB7IC4uLnJlcXVlc3QgfVxyXG4gICAgICByZXR1cm4gZmV0Y2goZW5kcG9pbnQucHJlcGFyZSh1cmwsIGRhdGEpLCBkYXRhKS50aGVuKHJlc3BvbnNlLCByZXNwb25zZSlcclxuICAgIH1cclxuICB9LFxyXG59Il19