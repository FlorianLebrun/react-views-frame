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

        var request = Object.assign({}, options);
        request.headers = _extends({
          "Accept": "application/json"
        }, request.headers);
        if (request.body) {
          request.method = request.method || "POST";
          if (request.body instanceof Object) {
            request.headers["Content-Type"] = "application/json";
            request.body = JSON.stringify(request.body);
          } else if (!request.headers["Content-Type"]) {
            request.headers["Content-Type"] = "text/plain";
          }
        } else {
          request.method = request.method || "GET";
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9saWIvYWRkb25zL2ZldGNoLmpzIl0sIm5hbWVzIjpbIm5hbWUiLCJjb21wb25lbnQiLCJlbmRwb2ludHMiLCJsb2dpblByb21pc2UiLCJlbmFibGVMb2dpblJlY292ZXJ5IiwicGFyYW1ldGVycyIsImFwcGxpY2F0aW9uIiwiZmV0Y2hBUEkiLCJiaW5kIiwidXJsIiwib3B0aW9ucyIsImhhc0xvZ2luUmVjb3ZlcnkiLCJub0NyZWRlbnRpYWxzIiwiZW5kcG9pbnQiLCJmaW5kIiwibWF0Y2giLCJlIiwicGF0dGVybiIsIkVycm9yIiwicmVxdWVzdCIsIk9iamVjdCIsImFzc2lnbiIsImhlYWRlcnMiLCJib2R5IiwibWV0aG9kIiwiSlNPTiIsInN0cmluZ2lmeSIsInJlc3BvbnNlIiwicmVzIiwiUHJvbWlzZSIsInJlc29sdmUiLCJyZWplY3QiLCJyZXNwb25kU3VjY2VzcyIsImpzb24iLCJzdGF0dXMiLCJyZXNwb25kRXJyb3IiLCJlcnJvciIsImZlZWRiYWNrIiwiZGF0YSIsInRoZW4iLCJsb2dpbiIsImZldGNoIiwicHJlcGFyZSIsIkZ1bmN0aW9uIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBQUE7Ozs7Ozs7O2tCQUVlO0FBQ2JBLFFBQU0sYUFETztBQUViQztBQUFBOztBQUFBO0FBQUE7O0FBQUE7O0FBQUE7O0FBQUE7QUFBQTtBQUFBOztBQUFBLDhMQUNFQyxTQURGLEdBQ3FCLElBRHJCLFFBRUVDLFlBRkYsR0FFMEIsSUFGMUIsUUFHRUMsbUJBSEYsR0FHaUMsSUFIakM7QUFBQTs7QUFBQTtBQUFBO0FBQUEsc0NBS2tCQyxVQUxsQixFQUtzQztBQUNsQyxhQUFLQyxXQUFMLENBQWlCQyxRQUFqQixHQUE0QixLQUFLQSxRQUFMLENBQWNDLElBQWQsQ0FBbUIsSUFBbkIsQ0FBNUI7QUFDQSxhQUFLTixTQUFMLEdBQWlCRyxXQUFXSCxTQUE1QjtBQUNEO0FBUkg7QUFBQTtBQUFBLCtCQVNXTyxHQVRYLEVBU2dCQyxPQVRoQixF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LG9CQUFZbkIsT0FBWixDQUFOO0FBQ0FXLHdCQUFRVyxNQUFNNUIsU0FBUzZCLE9BQVQsQ0FBaUJqQyxHQUFqQixFQUFzQjZCLElBQXRCLENBQU4sRUFBbUNBLElBQW5DLEVBQXlDQyxJQUF6QyxDQUE4Q1osUUFBOUMsRUFBd0RBLFFBQXhELENBQVI7QUFDRCxlQUxELEVBS0csVUFBQ1MsS0FBRCxFQUFXO0FBQ1osdUJBQUtqQyxZQUFMLEdBQW9CLElBQXBCO0FBQ0EsdUJBQUtDLG1CQUFMLEdBQTJCLEtBQTNCO0FBQ0ErQiw2QkFBYUMsS0FBYjtBQUNELGVBVEQ7QUFVRCxhQWZJLE1BZ0JBLElBQUlSLElBQUlLLElBQUosSUFBWUwsSUFBSUssSUFBSixZQUFvQlUsUUFBcEMsRUFBOEM7QUFDakQscUJBQU9mLElBQUlLLElBQUosR0FBV00sSUFBWCxDQUFnQkosWUFBaEIsRUFBOEIsWUFBTTtBQUN6Qyx1QkFBSy9CLG1CQUFMLEdBQTJCLEtBQTNCO0FBQ0ErQiw2QkFBYVAsSUFBSVEsS0FBakI7QUFDRCxlQUhNLENBQVA7QUFJRCxhQUxJLE1BTUE7QUFDSCxxQkFBT0QsYUFBYVAsSUFBSVEsS0FBakIsQ0FBUDtBQUNEO0FBQ0YsV0E3Q00sQ0FBUDtBQThDRCxTQS9DRDs7QUFpREEsWUFBTUUsb0JBQVluQixPQUFaLENBQU47QUFDQSxlQUFPc0IsTUFBTTVCLFNBQVM2QixPQUFULENBQWlCakMsR0FBakIsRUFBc0I2QixJQUF0QixDQUFOLEVBQW1DQSxJQUFuQyxFQUF5Q0MsSUFBekMsQ0FBOENaLFFBQTlDLEVBQXdEQSxRQUF4RCxDQUFQO0FBQ0Q7QUF2Rkg7O0FBQUE7QUFBQTtBQUZhLEMiLCJmaWxlIjoiZmV0Y2guanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBQbHVnaW5JbnN0YW5jZSB9IGZyb20gXCIuLi9sYXlvdXRcIlxyXG5cclxuZXhwb3J0IGRlZmF1bHQge1xyXG4gIG5hbWU6IFwiZmV0Y2gtYWRkb25cIixcclxuICBjb21wb25lbnQ6IGNsYXNzIGV4dGVuZHMgUGx1Z2luSW5zdGFuY2Uge1xyXG4gICAgZW5kcG9pbnRzOiBBcnJheSA9IG51bGxcclxuICAgIGxvZ2luUHJvbWlzZTogUHJvbWlzZSA9IG51bGxcclxuICAgIGVuYWJsZUxvZ2luUmVjb3Zlcnk6IGJvb2xlYW4gPSB0cnVlXHJcblxyXG4gICAgcGx1Z2luV2lsbE1vdW50KHBhcmFtZXRlcnM6IE9iamVjdCkge1xyXG4gICAgICB0aGlzLmFwcGxpY2F0aW9uLmZldGNoQVBJID0gdGhpcy5mZXRjaEFQSS5iaW5kKHRoaXMpXHJcbiAgICAgIHRoaXMuZW5kcG9pbnRzID0gcGFyYW1ldGVycy5lbmRwb2ludHNcclxuICAgIH1cclxuICAgIGZldGNoQVBJKHVybCwgb3B0aW9ucykge1xyXG4gICAgICBsZXQgaGFzTG9naW5SZWNvdmVyeSA9IHRoaXMuZW5hYmxlTG9naW5SZWNvdmVyeSAmJiAoIW9wdGlvbnMgfHwgIW9wdGlvbnMubm9DcmVkZW50aWFscylcclxuXHJcbiAgICAgIGNvbnN0IGVuZHBvaW50ID0gdGhpcy5lbmRwb2ludHMuZmluZChlID0+IHVybC5tYXRjaChlLnBhdHRlcm4pKVxyXG4gICAgICBpZiAoIWVuZHBvaW50KSB7XHJcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwibm8gZW5kcG9pbnQgZm9yIFwiICsgdXJsKVxyXG4gICAgICB9XHJcblxyXG4gICAgICBjb25zdCByZXF1ZXN0ID0gT2JqZWN0LmFzc2lnbih7fSwgb3B0aW9ucylcclxuICAgICAgcmVxdWVzdC5oZWFkZXJzID0ge1xyXG4gICAgICAgIFwiQWNjZXB0XCI6IFwiYXBwbGljYXRpb24vanNvblwiLFxyXG4gICAgICAgIC4uLnJlcXVlc3QuaGVhZGVycyxcclxuICAgICAgfVxyXG4gICAgICBpZiAocmVxdWVzdC5ib2R5KSB7XHJcbiAgICAgICAgcmVxdWVzdC5tZXRob2QgPSByZXF1ZXN0Lm1ldGhvZCB8fCBcIlBPU1RcIlxyXG4gICAgICAgIGlmIChyZXF1ZXN0LmJvZHkgaW5zdGFuY2VvZiBPYmplY3QpIHtcclxuICAgICAgICAgIHJlcXVlc3QuaGVhZGVyc1tcIkNvbnRlbnQtVHlwZVwiXSA9IFwiYXBwbGljYXRpb24vanNvblwiXHJcbiAgICAgICAgICByZXF1ZXN0LmJvZHkgPSBKU09OLnN0cmluZ2lmeShyZXF1ZXN0LmJvZHkpXHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2UgaWYgKCFyZXF1ZXN0LmhlYWRlcnNbXCJDb250ZW50LVR5cGVcIl0pIHtcclxuICAgICAgICAgIHJlcXVlc3QuaGVhZGVyc1tcIkNvbnRlbnQtVHlwZVwiXSA9IFwidGV4dC9wbGFpblwiXHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICAgIGVsc2Uge1xyXG4gICAgICAgIHJlcXVlc3QubWV0aG9kID0gcmVxdWVzdC5tZXRob2QgfHwgXCJHRVRcIlxyXG4gICAgICB9XHJcblxyXG4gICAgICBjb25zdCByZXNwb25zZSA9IChyZXMpID0+IHtcclxuICAgICAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xyXG5cclxuICAgICAgICAgIGNvbnN0IHJlc3BvbmRTdWNjZXNzID0gZnVuY3Rpb24gKGpzb24pIHtcclxuICAgICAgICAgICAgcmVzb2x2ZSh7IHN0YXR1czogcmVzLnN0YXR1cywgaGVhZGVyczogcmVzLmhlYWRlcnMsIGpzb24gfSlcclxuICAgICAgICAgIH1cclxuICAgICAgICAgIGNvbnN0IHJlc3BvbmRFcnJvciA9IGZ1bmN0aW9uIChlcnJvcikge1xyXG4gICAgICAgICAgICByZWplY3QoeyBzdGF0dXM6IHJlcy5zdGF0dXMsIGhlYWRlcnM6IHJlcy5oZWFkZXJzLCBlcnJvciB9KVxyXG4gICAgICAgICAgfVxyXG5cclxuICAgICAgICAgIGlmIChyZXMuc3RhdHVzID49IDIwMCAmJiByZXMuc3RhdHVzIDwgMzAwKSB7XHJcbiAgICAgICAgICAgIGlmIChlbmRwb2ludC5mZWVkYmFjaykge1xyXG4gICAgICAgICAgICAgIGVuZHBvaW50LmZlZWRiYWNrKHJlcywgZGF0YSlcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAocmVzLnN0YXR1cyA9PT0gMjA0KSB7XHJcbiAgICAgICAgICAgICAgcmV0dXJuIHJlc3BvbmRTdWNjZXNzKHt9KVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgIHJldHVybiByZXMuanNvbigpLnRoZW4ocmVzcG9uZFN1Y2Nlc3MsIHJlc3BvbmRFcnJvcilcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgfVxyXG4gICAgICAgICAgZWxzZSBpZiAocmVzLnN0YXR1cyA9PT0gNDAxICYmIGhhc0xvZ2luUmVjb3ZlcnkgJiYgZW5kcG9pbnQubG9naW4pIHtcclxuICAgICAgICAgICAgaWYgKCF0aGlzLmxvZ2luUHJvbWlzZSkge1xyXG4gICAgICAgICAgICAgIHRoaXMubG9naW5Qcm9taXNlID0gZW5kcG9pbnQubG9naW4odGhpcy5hcHBsaWNhdGlvbilcclxuICAgICAgICAgICAgICBpZiAoIXRoaXMubG9naW5Qcm9taXNlKSB0aHJvdyBuZXcgRXJyb3IoKVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHRoaXMubG9naW5Qcm9taXNlLnRoZW4oKCkgPT4ge1xyXG4gICAgICAgICAgICAgIHRoaXMubG9naW5Qcm9taXNlID0gbnVsbFxyXG4gICAgICAgICAgICAgIGhhc0xvZ2luUmVjb3ZlcnkgPSBmYWxzZVxyXG4gICAgICAgICAgICAgIGNvbnN0IGRhdGEgPSB7IC4uLnJlcXVlc3QgfVxyXG4gICAgICAgICAgICAgIHJlc29sdmUoZmV0Y2goZW5kcG9pbnQucHJlcGFyZSh1cmwsIGRhdGEpLCBkYXRhKS50aGVuKHJlc3BvbnNlLCByZXNwb25zZSkpXHJcbiAgICAgICAgICAgIH0sIChlcnJvcikgPT4ge1xyXG4gICAgICAgICAgICAgIHRoaXMubG9naW5Qcm9taXNlID0gbnVsbFxyXG4gICAgICAgICAgICAgIHRoaXMuZW5hYmxlTG9naW5SZWNvdmVyeSA9IGZhbHNlXHJcbiAgICAgICAgICAgICAgcmVzcG9uZEVycm9yKGVycm9yKVxyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgICAgfVxyXG4gICAgICAgICAgZWxzZSBpZiAocmVzLmpzb24gJiYgcmVzLmpzb24gaW5zdGFuY2VvZiBGdW5jdGlvbikge1xyXG4gICAgICAgICAgICByZXR1cm4gcmVzLmpzb24oKS50aGVuKHJlc3BvbmRFcnJvciwgKCkgPT4ge1xyXG4gICAgICAgICAgICAgIHRoaXMuZW5hYmxlTG9naW5SZWNvdmVyeSA9IGZhbHNlXHJcbiAgICAgICAgICAgICAgcmVzcG9uZEVycm9yKHJlcy5lcnJvcilcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICAgIH1cclxuICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICByZXR1cm4gcmVzcG9uZEVycm9yKHJlcy5lcnJvcilcclxuICAgICAgICAgIH1cclxuICAgICAgICB9KVxyXG4gICAgICB9XHJcblxyXG4gICAgICBjb25zdCBkYXRhID0geyAuLi5yZXF1ZXN0IH1cclxuICAgICAgcmV0dXJuIGZldGNoKGVuZHBvaW50LnByZXBhcmUodXJsLCBkYXRhKSwgZGF0YSkudGhlbihyZXNwb25zZSwgcmVzcG9uc2UpXHJcbiAgICB9XHJcbiAgfSxcclxufSJdfQ==