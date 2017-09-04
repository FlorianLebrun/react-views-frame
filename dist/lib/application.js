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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9BcHBsaWNhdGlvbi9hcHBsaWNhdGlvbi5qcyJdLCJuYW1lcyI6WyJleHRlbmRBcHBsaWNhdGlvbiIsIkFwcGxpY2F0aW9uSW5zdGFuY2UiLCJmZWF0dXJlcyIsIm9ubHlGdW5jdGlvbiIsIk9iamVjdCIsImtleXMiLCJmb3JFYWNoIiwia2V5IiwiRnVuY3Rpb24iLCJjbGF6eiIsImRlZmluZVByb3BlcnR5IiwicHJvdG90eXBlIiwidmFsdWUiLCJBcHBsaWNhdGlvbiIsIndyaXRhYmxlIiwiZW51bWVyYWJsZSIsImNvbmZpZ3VyYWJsZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7UUFvQmdCQSxpQixHQUFBQSxpQjs7OztJQW5CSEMsbUIsV0FBQUEsbUI7Ozs7Ozs7b0NBRUtDLFEsRUFBNkJDLFksRUFBdUI7QUFBQTs7QUFDbEVDLGFBQU9DLElBQVAsQ0FBWUgsUUFBWixFQUFzQkksT0FBdEIsQ0FBOEIsZUFBTztBQUNuQyxZQUFJLENBQUNILFlBQUQsSUFBa0JELFNBQVNLLEdBQVQsYUFBeUJDLFFBQS9DLEVBQTBEO0FBQ3hELGdCQUFLRCxHQUFMLElBQVlMLFNBQVNLLEdBQVQsQ0FBWjtBQUNEO0FBQ0YsT0FKRDtBQUtEOzs7cUNBQ2dCRSxLLEVBQU87QUFDdEJMLGFBQU9NLGNBQVAsQ0FBc0JELE1BQU1FLFNBQTVCLEVBQXVDLGFBQXZDLEVBQXNEO0FBQ3BEQyxlQUFPQyxXQUQ2QztBQUVwREMsa0JBQVUsS0FGMEM7QUFHcERDLG9CQUFZLEtBSHdDO0FBSXBEQyxzQkFBYztBQUpzQyxPQUF0RDtBQU1EOzs7Ozs7QUFHSSxTQUFTaEIsaUJBQVQsQ0FBMkJFLFFBQTNCLEVBQXdEO0FBQzdERSxTQUFPQyxJQUFQLENBQVlILFFBQVosRUFBc0JJLE9BQXRCLENBQThCLGVBQU87QUFDbkNGLFdBQU9NLGNBQVAsQ0FBc0JULG9CQUFvQlUsU0FBMUMsRUFBcURKLEdBQXJELEVBQTBEO0FBQ3hESyxhQUFPVixTQUFTSyxHQUFULENBRGlEO0FBRXhETyxnQkFBVSxLQUY4QztBQUd4REMsa0JBQVksS0FINEM7QUFJeERDLG9CQUFjO0FBSjBDLEtBQTFEO0FBTUQsR0FQRDtBQVFEOztBQUVNLElBQU1ILG9DQUFjLElBQUlaLG1CQUFKLEVBQXBCIiwiZmlsZSI6ImFwcGxpY2F0aW9uLmpzIiwic291cmNlc0NvbnRlbnQiOlsiXHJcbmV4cG9ydCBjbGFzcyBBcHBsaWNhdGlvbkluc3RhbmNlIHtcclxuXHJcbiAgaW5zdGFsbEZlYXR1cmVzKGZlYXR1cmVzOiB7IFtzdHJpbmddOiBhbnkgfSwgb25seUZ1bmN0aW9uOiBib29sZWFuKSB7XHJcbiAgICBPYmplY3Qua2V5cyhmZWF0dXJlcykuZm9yRWFjaChrZXkgPT4ge1xyXG4gICAgICBpZiAoIW9ubHlGdW5jdGlvbiB8fCAoZmVhdHVyZXNba2V5XSBpbnN0YW5jZW9mIEZ1bmN0aW9uKSkge1xyXG4gICAgICAgIHRoaXNba2V5XSA9IGZlYXR1cmVzW2tleV1cclxuICAgICAgfVxyXG4gICAgfSlcclxuICB9XHJcbiAgaW5qZWN0QXNQcm9wZXJ0eShjbGF6eikge1xyXG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KGNsYXp6LnByb3RvdHlwZSwgXCJhcHBsaWNhdGlvblwiLCB7XHJcbiAgICAgIHZhbHVlOiBBcHBsaWNhdGlvbixcclxuICAgICAgd3JpdGFibGU6IGZhbHNlLFxyXG4gICAgICBlbnVtZXJhYmxlOiBmYWxzZSxcclxuICAgICAgY29uZmlndXJhYmxlOiBmYWxzZSxcclxuICAgIH0pXHJcbiAgfVxyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gZXh0ZW5kQXBwbGljYXRpb24oZmVhdHVyZXM6IHsgW3N0cmluZ106IGFueSB9KSB7XHJcbiAgT2JqZWN0LmtleXMoZmVhdHVyZXMpLmZvckVhY2goa2V5ID0+IHtcclxuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShBcHBsaWNhdGlvbkluc3RhbmNlLnByb3RvdHlwZSwga2V5LCB7XHJcbiAgICAgIHZhbHVlOiBmZWF0dXJlc1trZXldLFxyXG4gICAgICB3cml0YWJsZTogZmFsc2UsXHJcbiAgICAgIGVudW1lcmFibGU6IGZhbHNlLFxyXG4gICAgICBjb25maWd1cmFibGU6IGZhbHNlLFxyXG4gICAgfSlcclxuICB9KVxyXG59XHJcblxyXG5leHBvcnQgY29uc3QgQXBwbGljYXRpb24gPSBuZXcgQXBwbGljYXRpb25JbnN0YW5jZSgpXHJcbiJdfQ==