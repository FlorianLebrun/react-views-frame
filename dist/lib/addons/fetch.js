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
  component: function (_PluginComponent) {
    _inherits(component, _PluginComponent);

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

            var contentType = res.headers && res.headers.get("content-type");
            var isJson = contentType && contentType.toLowerCase().indexOf("application/json") !== -1;

            if (res.status >= 200 && res.status < 300) {
              if (endpoint.feedback) {
                endpoint.feedback(res, data);
              }
              if (res.status === 204) {
                return respondSuccess({});
              } else if (isJson && res.json instanceof Function) {
                return res.json().then(respondSuccess, respondError);
              } else {
                return res.blob().then(respondSuccess, respondError);
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
            } else if (isJson && res.json instanceof Function) {
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
  }(_layout.PluginComponent)
};
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9saWIvYWRkb25zL2ZldGNoLmpzIl0sIm5hbWVzIjpbIm5hbWUiLCJjb21wb25lbnQiLCJlbmRwb2ludHMiLCJsb2dpblByb21pc2UiLCJlbmFibGVMb2dpblJlY292ZXJ5IiwicGFyYW1ldGVycyIsImFwcGxpY2F0aW9uIiwiZmV0Y2hBUEkiLCJiaW5kIiwidXJsIiwib3B0aW9ucyIsImhhc0xvZ2luUmVjb3ZlcnkiLCJub0NyZWRlbnRpYWxzIiwiZW5kcG9pbnQiLCJmaW5kIiwibWF0Y2giLCJlIiwicGF0dGVybiIsIkVycm9yIiwicmVxdWVzdCIsIk9iamVjdCIsImFzc2lnbiIsImhlYWRlcnMiLCJib2R5IiwibWV0aG9kIiwiSlNPTiIsInN0cmluZ2lmeSIsInJlc3BvbnNlIiwicmVzIiwiUHJvbWlzZSIsInJlc29sdmUiLCJyZWplY3QiLCJyZXNwb25kU3VjY2VzcyIsImpzb24iLCJzdGF0dXMiLCJyZXNwb25kRXJyb3IiLCJlcnJvciIsImNvbnRlbnRUeXBlIiwiZ2V0IiwiaXNKc29uIiwidG9Mb3dlckNhc2UiLCJpbmRleE9mIiwiZmVlZGJhY2siLCJkYXRhIiwiRnVuY3Rpb24iLCJ0aGVuIiwiYmxvYiIsImxvZ2luIiwiZmV0Y2giLCJwcmVwYXJlIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBQUE7Ozs7Ozs7O2tCQUVlO0FBQ2JBLFFBQU0sYUFETztBQUViQztBQUFBOztBQUFBO0FBQUE7O0FBQUE7O0FBQUE7O0FBQUE7QUFBQTtBQUFBOztBQUFBLDhMQUNFQyxTQURGLEdBQ3FCLElBRHJCLFFBRUVDLFlBRkYsR0FFMEIsSUFGMUIsUUFHRUMsbUJBSEYsR0FHaUMsSUFIakM7QUFBQTs7QUFBQTtBQUFBO0FBQUEsc0NBS2tCQyxVQUxsQixFQUtzQztBQUNsQyxhQUFLQyxXQUFMLENBQWlCQyxRQUFqQixHQUE0QixLQUFLQSxRQUFMLENBQWNDLElBQWQsQ0FBbUIsSUFBbkIsQ0FBNUI7QUFDQSxhQUFLTixTQUFMLEdBQWlC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WixDQUFOO0FBQ0EsZUFBTzZCLE1BQU1uQyxTQUFTb0MsT0FBVCxDQUFpQnhDLEdBQWpCLEVBQXNCa0MsSUFBdEIsQ0FBTixFQUFtQ0EsSUFBbkMsRUFBeUNFLElBQXpDLENBQThDbEIsUUFBOUMsRUFBd0RBLFFBQXhELENBQVA7QUFDRDtBQTdGSDs7QUFBQTtBQUFBO0FBRmEsQyIsImZpbGUiOiJmZXRjaC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IFBsdWdpbkNvbXBvbmVudCB9IGZyb20gXCIuLi9sYXlvdXRcIlxyXG5cclxuZXhwb3J0IGRlZmF1bHQge1xyXG4gIG5hbWU6IFwiZmV0Y2gtYWRkb25cIixcclxuICBjb21wb25lbnQ6IGNsYXNzIGV4dGVuZHMgUGx1Z2luQ29tcG9uZW50IHtcclxuICAgIGVuZHBvaW50czogQXJyYXkgPSBudWxsXHJcbiAgICBsb2dpblByb21pc2U6IFByb21pc2UgPSBudWxsXHJcbiAgICBlbmFibGVMb2dpblJlY292ZXJ5OiBib29sZWFuID0gdHJ1ZVxyXG5cclxuICAgIHBsdWdpbldpbGxNb3VudChwYXJhbWV0ZXJzOiBPYmplY3QpIHtcclxuICAgICAgdGhpcy5hcHBsaWNhdGlvbi5mZXRjaEFQSSA9IHRoaXMuZmV0Y2hBUEkuYmluZCh0aGlzKVxyXG4gICAgICB0aGlzLmVuZHBvaW50cyA9IHBhcmFtZXRlcnMuZW5kcG9pbnRzXHJcbiAgICB9XHJcbiAgICBmZXRjaEFQSSh1cmwsIG9wdGlvbnMpIHtcclxuICAgICAgbGV0IGhhc0xvZ2luUmVjb3ZlcnkgPSB0aGlzLmVuYWJsZUxvZ2luUmVjb3ZlcnkgJiYgKCFvcHRpb25zIHx8ICFvcHRpb25zLm5vQ3JlZGVudGlhbHMpXHJcblxyXG4gICAgICBjb25zdCBlbmRwb2ludCA9IHRoaXMuZW5kcG9pbnRzLmZpbmQoZSA9PiB1cmwubWF0Y2goZS5wYXR0ZXJuKSlcclxuICAgICAgaWYgKCFlbmRwb2ludCkge1xyXG4gICAgICAgIHRocm93IG5ldyBFcnJvcihcIm5vIGVuZHBvaW50IGZvciBcIiArIHVybClcclxuICAgICAgfVxyXG5cclxuICAgICAgY29uc3QgcmVxdWVzdCA9IE9iamVjdC5hc3NpZ24oe30sIG9wdGlvbnMpXHJcbiAgICAgIHJlcXVlc3QuaGVhZGVycyA9IHtcclxuICAgICAgICBcIkFjY2VwdFwiOiBcImFwcGxpY2F0aW9uL2pzb25cIixcclxuICAgICAgICAuLi5yZXF1ZXN0LmhlYWRlcnMsXHJcbiAgICAgIH1cclxuICAgICAgaWYgKHJlcXVlc3QuYm9keSkge1xyXG4gICAgICAgIHJlcXVlc3QubWV0aG9kID0gcmVxdWVzdC5tZXRob2QgfHwgXCJQT1NUXCJcclxuICAgICAgICBpZiAocmVxdWVzdC5ib2R5IGluc3RhbmNlb2YgT2JqZWN0KSB7XHJcbiAgICAgICAgICByZXF1ZXN0LmhlYWRlcnNbXCJDb250ZW50LVR5cGVcIl0gPSBcImFwcGxpY2F0aW9uL2pzb25cIlxyXG4gICAgICAgICAgcmVxdWVzdC5ib2R5ID0gSlNPTi5zdHJpbmdpZnkocmVxdWVzdC5ib2R5KVxyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIGlmICghcmVxdWVzdC5oZWFkZXJzW1wiQ29udGVudC1UeXBlXCJdKSB7XHJcbiAgICAgICAgICByZXF1ZXN0LmhlYWRlcnNbXCJDb250ZW50LVR5cGVcIl0gPSBcInRleHQvcGxhaW5cIlxyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgICBlbHNlIHtcclxuICAgICAgICByZXF1ZXN0Lm1ldGhvZCA9IHJlcXVlc3QubWV0aG9kIHx8IFwiR0VUXCJcclxuICAgICAgfVxyXG5cclxuICAgICAgY29uc3QgcmVzcG9uc2UgPSAocmVzKSA9PiB7XHJcbiAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcclxuXHJcbiAgICAgICAgICBjb25zdCByZXNwb25kU3VjY2VzcyA9IGZ1bmN0aW9uKGpzb24pIHtcclxuICAgICAgICAgICAgcmVzb2x2ZSh7IHN0YXR1czogcmVzLnN0YXR1cywgaGVhZGVyczogcmVzLmhlYWRlcnMsIGpzb24gfSlcclxuICAgICAgICAgIH1cclxuICAgICAgICAgIGNvbnN0IHJlc3BvbmRFcnJvciA9IGZ1bmN0aW9uKGVycm9yKSB7XHJcbiAgICAgICAgICAgIHJlamVjdCh7IHN0YXR1czogcmVzLnN0YXR1cywgaGVhZGVyczogcmVzLmhlYWRlcnMsIGVycm9yIH0pXHJcbiAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgY29uc3QgY29udGVudFR5cGUgPSByZXMuaGVhZGVycyAmJiByZXMuaGVhZGVycy5nZXQoXCJjb250ZW50LXR5cGVcIilcclxuICAgICAgICAgIGNvbnN0IGlzSnNvbiA9IGNvbnRlbnRUeXBlICYmIGNvbnRlbnRUeXBlLnRvTG93ZXJDYXNlKCkuaW5kZXhPZihcImFwcGxpY2F0aW9uL2pzb25cIikgIT09IC0xXHJcblxyXG4gICAgICAgICAgaWYgKHJlcy5zdGF0dXMgPj0gMjAwICYmIHJlcy5zdGF0dXMgPCAzMDApIHtcclxuICAgICAgICAgICAgaWYgKGVuZHBvaW50LmZlZWRiYWNrKSB7XHJcbiAgICAgICAgICAgICAgZW5kcG9pbnQuZmVlZGJhY2socmVzLCBkYXRhKVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmIChyZXMuc3RhdHVzID09PSAyMDQpIHtcclxuICAgICAgICAgICAgICByZXR1cm4gcmVzcG9uZFN1Y2Nlc3Moe30pXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSBpZiAoaXNKc29uICYmIHJlcy5qc29uIGluc3RhbmNlb2YgRnVuY3Rpb24pIHtcclxuICAgICAgICAgICAgICByZXR1cm4gcmVzLmpzb24oKS50aGVuKHJlc3BvbmRTdWNjZXNzLCByZXNwb25kRXJyb3IpXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgcmV0dXJuIHJlcy5ibG9iKCkudGhlbihyZXNwb25kU3VjY2VzcywgcmVzcG9uZEVycm9yKVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgICBlbHNlIGlmIChyZXMuc3RhdHVzID09PSA0MDEgJiYgaGFzTG9naW5SZWNvdmVyeSAmJiBlbmRwb2ludC5sb2dpbikge1xyXG4gICAgICAgICAgICBpZiAoIXRoaXMubG9naW5Qcm9taXNlKSB7XHJcbiAgICAgICAgICAgICAgdGhpcy5sb2dpblByb21pc2UgPSBlbmRwb2ludC5sb2dpbih0aGlzLmFwcGxpY2F0aW9uKVxyXG4gICAgICAgICAgICAgIGlmICghdGhpcy5sb2dpblByb21pc2UpIHRocm93IG5ldyBFcnJvcigpXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgdGhpcy5sb2dpblByb21pc2UudGhlbigoKSA9PiB7XHJcbiAgICAgICAgICAgICAgdGhpcy5sb2dpblByb21pc2UgPSBudWxsXHJcbiAgICAgICAgICAgICAgaGFzTG9naW5SZWNvdmVyeSA9IGZhbHNlXHJcbiAgICAgICAgICAgICAgY29uc3QgZGF0YSA9IHsgLi4ucmVxdWVzdCB9XHJcbiAgICAgICAgICAgICAgcmVzb2x2ZShmZXRjaChlbmRwb2ludC5wcmVwYXJlKHVybCwgZGF0YSksIGRhdGEpLnRoZW4ocmVzcG9uc2UsIHJlc3BvbnNlKSlcclxuICAgICAgICAgICAgfSwgKGVycm9yKSA9PiB7XHJcbiAgICAgICAgICAgICAgdGhpcy5sb2dpblByb21pc2UgPSBudWxsXHJcbiAgICAgICAgICAgICAgdGhpcy5lbmFibGVMb2dpblJlY292ZXJ5ID0gZmFsc2VcclxuICAgICAgICAgICAgICByZXNwb25kRXJyb3IoZXJyb3IpXHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgICBlbHNlIGlmIChpc0pzb24gJiYgcmVzLmpzb24gaW5zdGFuY2VvZiBGdW5jdGlvbikge1xyXG4gICAgICAgICAgICByZXR1cm4gcmVzLmpzb24oKS50aGVuKHJlc3BvbmRFcnJvciwgKCkgPT4ge1xyXG4gICAgICAgICAgICAgIHRoaXMuZW5hYmxlTG9naW5SZWNvdmVyeSA9IGZhbHNlXHJcbiAgICAgICAgICAgICAgcmVzcG9uZEVycm9yKHJlcy5lcnJvcilcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICAgIH1cclxuICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICByZXR1cm4gcmVzcG9uZEVycm9yKHJlcy5lcnJvcilcclxuICAgICAgICAgIH1cclxuICAgICAgICB9KVxyXG4gICAgICB9XHJcblxyXG4gICAgICBjb25zdCBkYXRhID0geyAuLi5yZXF1ZXN0IH1cclxuICAgICAgcmV0dXJuIGZldGNoKGVuZHBvaW50LnByZXBhcmUodXJsLCBkYXRhKSwgZGF0YSkudGhlbihyZXNwb25zZSwgcmVzcG9uc2UpXHJcbiAgICB9XHJcbiAgfSxcclxufSJdfQ==