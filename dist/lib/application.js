"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

exports.extendApplication = extendApplication;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var ApplicationInstance = exports.ApplicationInstance = function () {
  function ApplicationInstance() {
    _classCallCheck(this, ApplicationInstance);
  }

  _createClass(ApplicationInstance, [{
    key: "installFeatures",
    value: function installFeatures(features, onlyFunction) {
      var _this = this;

      Object.keys(features).forEach(function (key) {
        if (!onlyFunction || features[key] instanceof Function) {
          _this[key] = features[key];
        }
      });
    }
  }, {
    key: "injectAsProperty",
    value: function injectAsProperty(clazz) {
      Object.defineProperty(clazz.prototype, "application", {
        value: Application,
        writable: false,
        enumerable: false,
        configurable: false
      });
    }
  }]);

  return ApplicationInstance;
}();

function extendApplication(features) {
  Object.keys(features).forEach(function (key) {
    Object.defineProperty(ApplicationInstance.prototype, key, {
      value: features[key],
      writable: false,
      enumerable: false,
      configurable: false
    });
  });
}

var Application = exports.Application = new ApplicationInstance();
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9saWIvYXBwbGljYXRpb24uanMiXSwibmFtZXMiOlsiZXh0ZW5kQXBwbGljYXRpb24iLCJBcHBsaWNhdGlvbkluc3RhbmNlIiwiZmVhdHVyZXMiLCJvbmx5RnVuY3Rpb24iLCJPYmplY3QiLCJrZXlzIiwiZm9yRWFjaCIsImtleSIsIkZ1bmN0aW9uIiwiY2xhenoiLCJkZWZpbmVQcm9wZXJ0eSIsInByb3RvdHlwZSIsInZhbHVlIiwiQXBwbGljYXRpb24iLCJ3cml0YWJsZSIsImVudW1lcmFibGUiLCJjb25maWd1cmFibGUiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7O1FBb0JnQkEsaUIsR0FBQUEsaUI7Ozs7SUFuQkhDLG1CLFdBQUFBLG1COzs7Ozs7O29DQUVLQyxRLEVBQTZCQyxZLEVBQXVCO0FBQUE7O0FBQ2xFQyxhQUFPQyxJQUFQLENBQVlILFFBQVosRUFBc0JJLE9BQXRCLENBQThCLGVBQU87QUFDbkMsWUFBSSxDQUFDSCxZQUFELElBQWtCRCxTQUFTSyxHQUFULGFBQXlCQyxRQUEvQyxFQUEwRDtBQUN4RCxnQkFBS0QsR0FBTCxJQUFZTCxTQUFTSyxHQUFULENBQVo7QUFDRDtBQUNGLE9BSkQ7QUFLRDs7O3FDQUNnQkUsSyxFQUFPO0FBQ3RCTCxhQUFPTSxjQUFQLENBQXNCRCxNQUFNRSxTQUE1QixFQUF1QyxhQUF2QyxFQUFzRDtBQUNwREMsZUFBT0MsV0FENkM7QUFFcERDLGtCQUFVLEtBRjBDO0FBR3BEQyxvQkFBWSxLQUh3QztBQUlwREMsc0JBQWM7QUFKc0MsT0FBdEQ7QUFNRDs7Ozs7O0FBR0ksU0FBU2hCLGlCQUFULENBQTJCRSxRQUEzQixFQUF3RDtBQUM3REUsU0FBT0MsSUFBUCxDQUFZSCxRQUFaLEVBQXNCSSxPQUF0QixDQUE4QixlQUFPO0FBQ25DRixXQUFPTSxjQUFQLENBQXNCVCxvQkFBb0JVLFNBQTFDLEVBQXFESixHQUFyRCxFQUEwRDtBQUN4REssYUFBT1YsU0FBU0ssR0FBVCxDQURpRDtBQUV4RE8sZ0JBQVUsS0FGOEM7QUFHeERDLGtCQUFZLEtBSDRDO0FBSXhEQyxvQkFBYztBQUowQyxLQUExRDtBQU1ELEdBUEQ7QUFRRDs7QUFFTSxJQUFNSCxvQ0FBYyxJQUFJWixtQkFBSixFQUFwQiIsImZpbGUiOiJhcHBsaWNhdGlvbi5qcyIsInNvdXJjZXNDb250ZW50IjpbIlxyXG5leHBvcnQgY2xhc3MgQXBwbGljYXRpb25JbnN0YW5jZSB7XHJcblxyXG4gIGluc3RhbGxGZWF0dXJlcyhmZWF0dXJlczogeyBbc3RyaW5nXTogYW55IH0sIG9ubHlGdW5jdGlvbjogYm9vbGVhbikge1xyXG4gICAgT2JqZWN0LmtleXMoZmVhdHVyZXMpLmZvckVhY2goa2V5ID0+IHtcclxuICAgICAgaWYgKCFvbmx5RnVuY3Rpb24gfHwgKGZlYXR1cmVzW2tleV0gaW5zdGFuY2VvZiBGdW5jdGlvbikpIHtcclxuICAgICAgICB0aGlzW2tleV0gPSBmZWF0dXJlc1trZXldXHJcbiAgICAgIH1cclxuICAgIH0pXHJcbiAgfVxyXG4gIGluamVjdEFzUHJvcGVydHkoY2xhenopIHtcclxuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShjbGF6ei5wcm90b3R5cGUsIFwiYXBwbGljYXRpb25cIiwge1xyXG4gICAgICB2YWx1ZTogQXBwbGljYXRpb24sXHJcbiAgICAgIHdyaXRhYmxlOiBmYWxzZSxcclxuICAgICAgZW51bWVyYWJsZTogZmFsc2UsXHJcbiAgICAgIGNvbmZpZ3VyYWJsZTogZmFsc2UsXHJcbiAgICB9KVxyXG4gIH1cclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIGV4dGVuZEFwcGxpY2F0aW9uKGZlYXR1cmVzOiB7IFtzdHJpbmddOiBhbnkgfSkge1xyXG4gIE9iamVjdC5rZXlzKGZlYXR1cmVzKS5mb3JFYWNoKGtleSA9PiB7XHJcbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoQXBwbGljYXRpb25JbnN0YW5jZS5wcm90b3R5cGUsIGtleSwge1xyXG4gICAgICB2YWx1ZTogZmVhdHVyZXNba2V5XSxcclxuICAgICAgd3JpdGFibGU6IGZhbHNlLFxyXG4gICAgICBlbnVtZXJhYmxlOiBmYWxzZSxcclxuICAgICAgY29uZmlndXJhYmxlOiBmYWxzZSxcclxuICAgIH0pXHJcbiAgfSlcclxufVxyXG5cclxuZXhwb3J0IGNvbnN0IEFwcGxpY2F0aW9uID0gbmV3IEFwcGxpY2F0aW9uSW5zdGFuY2UoKVxyXG4iXX0=