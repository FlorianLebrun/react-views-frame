"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PluginInstance = exports.PluginClass = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Window = require("./Window");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var PluginClass = exports.PluginClass = function () {
  // constructor of PluginInstance
  function PluginClass(desc) {
    var _this = this;

    _classCallCheck(this, PluginClass);

    this.windows = {};
    this.links = {};

    desc && Object.keys(desc).forEach(function (key) {
      return _this[key] = desc[key];
    });
    this.component = this.component || PluginInstance;
    Object.keys(desc.windows).forEach(function (name) {
      _this.windows[name] = new _Window.WindowClass(name, desc.windows[name], _this);
    });
  }

  _createClass(PluginClass, [{
    key: "createInstance",
    value: function createInstance() {
      return new this.component(this);
    }
  }, {
    key: "mountInstance",
    value: function mountInstance(instance, context) {
      var _this2 = this;

      this.instance = instance;

      // Process import
      this.import && Object.keys(this.import).forEach(function (name) {
        var ref = _this2.import[name];
        var plugin = context.plugins[name];
        var pluginExport = plugin.pluginClass.export;
        if (pluginExport) {
          if (ref === true) {
            pluginExport.forEach(function (key) {
              instance[key] = plugin[key];
            });
          } else if (typeof ref === "string") {
            instance[ref] = plugin;
          }
        } else if (typeof ref === "string") {
          instance[ref] = plugin;
        }
      });

      // Process windows parameters import
      Object.keys(this.windows).forEach(function (key) {
        var window = _this2.windows[key];
        window.parameters && Object.keys(window.parameters).forEach(function (param) {
          _this2.addParameterLink(window, param);
        });
      });

      instance.pluginWillMount();
    }
  }, {
    key: "addParameterLink",
    value: function addParameterLink(window, param) {
      var link = this.resolveValueReference(window.parameters[param], param);
      if (link) {
        link.param = param;
        link.window = window;
        window.addLink(link);
        var linkList = this.links[link.path];
        if (!linkList) this.links[link.path] = [link];else linkList.push(link);
      } else {
        console.error("Parameter '" + param + "' of window '" + window.name + "' has invalid link:", link.path);
      }
    }
  }, {
    key: "resolveValueReference",
    value: function resolveValueReference(reference, key) {
      if (reference === true) {
        return {
          pluginClass: this,
          path: key
        };
      } else if (typeof reference === "string") {
        var parts = reference.split("/");
        if (parts.length > 1) {
          return {
            pluginClass: parts[0] ? this.context.pluginClasses[parts[0]] : this,
            path: parts[1]
          };
        } else return {
          pluginClass: this,
          path: reference
        };
      }
    }
  }]);

  return PluginClass;
}();

var PluginInstance = exports.PluginInstance = function () {
  _createClass(PluginInstance, [{
    key: "pluginWillMount",


    // Life Cycle management functions
    value: function pluginWillMount() {}
  }, {
    key: "pluginDidMount",
    value: function pluginDidMount() {}
  }, {
    key: "pluginWillUnmount",
    value: function pluginWillUnmount() {}
  }]);

  function PluginInstance(pluginClass) {
    var _this3 = this;

    _classCallCheck(this, PluginInstance);

    this.updateNextState = function () {
      if (_this3.nextState) {
        var updatedWindows = [];
        Object.keys(_this3.nextState).forEach(function (key) {
          var value = _this3.nextState[key];
          var links = _this3.pluginClass.links[key];
          _this3[key] = value;
          if (links) {
            var windows = _this3.layout.windows;
            Object.keys(windows).forEach(function (wndId) {
              var wnd = windows[wndId];
              var wlink = links.find(function (lk) {
                return lk.window === wnd.windowClass;
              });
              if (wlink) {
                wnd.parameters[wlink.param] = value;
                if (updatedWindows.indexOf(wnd) < 0) updatedWindows.push(wnd);
              }
            });
          }
        });
        updatedWindows.forEach(function (wnd) {
          return wnd.render();
        });
        _this3.nextState = null;
      }
    };

    this.pluginClass = pluginClass;
  }

  _createClass(PluginInstance, [{
    key: "openWindow",
    value: function openWindow(windowName, options) {
      this.layout.openPluginWindow(this.pluginClass.windows[windowName], this, options);
    }
  }, {
    key: "closeAllWindow",
    value: function closeAllWindow() {
      console.log("closeAllWindow NOT IMPLEMENTED");
    }
  }, {
    key: "setState",
    value: function setState(state) {
      var _this4 = this;

      var oldState = this.nextState;
      var newState = oldState || {};
      Object.keys(state).forEach(function (key) {
        newState[key] = state[key];
        _this4[key] = state[key];
      });
      this.nextState = newState;
      if (!oldState) setTimeout(this.updateNextState, 0);
    }
  }]);

  return PluginInstance;
}();
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9BcHBsaWNhdGlvbi9sYXlvdXQvUGx1Z2luLmpzIl0sIm5hbWVzIjpbIlBsdWdpbkNsYXNzIiwiZGVzYyIsIndpbmRvd3MiLCJsaW5rcyIsIk9iamVjdCIsImtleXMiLCJmb3JFYWNoIiwia2V5IiwiY29tcG9uZW50IiwiUGx1Z2luSW5zdGFuY2UiLCJuYW1lIiwiaW5zdGFuY2UiLCJjb250ZXh0IiwiaW1wb3J0IiwicmVmIiwicGx1Z2luIiwicGx1Z2lucyIsInBsdWdpbkV4cG9ydCIsInBsdWdpbkNsYXNzIiwiZXhwb3J0Iiwid2luZG93IiwicGFyYW1ldGVycyIsImFkZFBhcmFtZXRlckxpbmsiLCJwYXJhbSIsInBsdWdpbldpbGxNb3VudCIsImxpbmsiLCJyZXNvbHZlVmFsdWVSZWZlcmVuY2UiLCJhZGRMaW5rIiwibGlua0xpc3QiLCJwYXRoIiwicHVzaCIsImNvbnNvbGUiLCJlcnJvciIsInJlZmVyZW5jZSIsInBhcnRzIiwic3BsaXQiLCJsZW5ndGgiLCJwbHVnaW5DbGFzc2VzIiwidXBkYXRlTmV4dFN0YXRlIiwibmV4dFN0YXRlIiwidXBkYXRlZFdpbmRvd3MiLCJ2YWx1ZSIsImxheW91dCIsInduZCIsInduZElkIiwid2xpbmsiLCJmaW5kIiwibGsiLCJ3aW5kb3dDbGFzcyIsImluZGV4T2YiLCJyZW5kZXIiLCJ3aW5kb3dOYW1lIiwib3B0aW9ucyIsIm9wZW5QbHVnaW5XaW5kb3ciLCJsb2ciLCJzdGF0ZSIsIm9sZFN0YXRlIiwibmV3U3RhdGUiLCJzZXRUaW1lb3V0Il0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFBQTs7OztJQU9hQSxXLFdBQUFBLFc7QUFHeUI7QUFNcEMsdUJBQVlDLElBQVosRUFBMEI7QUFBQTs7QUFBQTs7QUFBQSxTQUwxQkMsT0FLMEIsR0FMa0IsRUFLbEI7QUFBQSxTQUoxQkMsS0FJMEIsR0FKa0IsRUFJbEI7O0FBQ3hCRixZQUFRRyxPQUFPQyxJQUFQLENBQVlKLElBQVosRUFBa0JLLE9BQWxC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QUNELFFBQUwsRUFBZUUsV0FBVyxLQUFLcEIsZUFBaEIsRUFBaUMsQ0FBakM7QUFDaEIiLCJmaWxlIjoiUGx1Z2luLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgV2luZG93Q2xhc3MgfSBmcm9tIFwiLi9XaW5kb3dcIlxyXG5cclxudHlwZSBQYXJhbWV0ZXJMaW5rID0ge1xyXG4gIHdpbmRvdzogV2luZG93Q2xhc3MsXHJcbiAgcGFyYW06IHN0cmluZyxcclxufVxyXG5cclxuZXhwb3J0IGNsYXNzIFBsdWdpbkNsYXNzIHtcclxuICBuYW1lOiBzdHJpbmdcclxuICBpbnN0YW5jZTogUGx1Z2luSW5zdGFuY2VcclxuICBjb21wb25lbnQ6IEZ1bmN0aW9uPFBsdWdpbkluc3RhbmNlPiAvLyBjb25zdHJ1Y3RvciBvZiBQbHVnaW5JbnN0YW5jZVxyXG4gIHdpbmRvd3M6IHsgW1dpbmRvd0NsYXNzSURdOiBXaW5kb3dDbGFzcyB9ID0ge31cclxuICBsaW5rczogeyBbc3RyaW5nXTogQXJyYXk8UGFyYW1ldGVyTGluaz4gfSA9IHt9XHJcbiAgZXhwb3J0OiBPYmplY3RcclxuICBpbXBvcnQ6IE9iamVjdFxyXG5cclxuICBjb25zdHJ1Y3RvcihkZXNjOiBPYmplY3QpIHtcclxuICAgIGRlc2MgJiYgT2JqZWN0LmtleXMoZGVzYykuZm9yRWFjaChrZXkgPT4gdGhpc1trZXldID0gZGVzY1trZXldKVxyXG4gICAgdGhpcy5jb21wb25lbnQgPSB0aGlzLmNvbXBvbmVudCB8fCBQbHVnaW5JbnN0YW5jZVxyXG4gICAgT2JqZWN0LmtleXMoZGVzYy53aW5kb3dzKS5mb3JFYWNoKG5hbWUgPT4ge1xyXG4gICAgICB0aGlzLndpbmRvd3NbbmFtZV0gPSBuZXcgV2luZG93Q2xhc3MobmFtZSwgZGVzYy53aW5kb3dzW25hbWVdLCB0aGlzKVxyXG4gICAgfSlcclxuICB9XHJcbiAgY3JlYXRlSW5zdGFuY2UoKTogUGx1Z2luSW5zdGFuY2Uge1xyXG4gICAgcmV0dXJuIG5ldyAodGhpcy5jb21wb25lbnQpKHRoaXMpXHJcbiAgfVxyXG4gIG1vdW50SW5zdGFuY2UoaW5zdGFuY2U6IFBsdWdpbkluc3RhbmNlLCBjb250ZXh0OiBBcHBsaWNhdGlvbkxheW91dCkge1xyXG4gICAgdGhpcy5pbnN0YW5jZSA9IGluc3RhbmNlXHJcblxyXG4gICAgLy8gUHJvY2VzcyBpbXBvcnRcclxuICAgIHRoaXMuaW1wb3J0ICYmIE9iamVjdC5rZXlzKHRoaXMuaW1wb3J0KS5mb3JFYWNoKG5hbWUgPT4ge1xyXG4gICAgICBjb25zdCByZWYgPSB0aGlzLmltcG9ydFtuYW1lXVxyXG4gICAgICBjb25zdCBwbHVnaW4gPSBjb250ZXh0LnBsdWdpbnNbbmFtZV1cclxuICAgICAgY29uc3QgcGx1Z2luRXhwb3J0ID0gcGx1Z2luLnBsdWdpbkNsYXNzLmV4cG9ydFxyXG4gICAgICBpZiAocGx1Z2luRXhwb3J0KSB7XHJcbiAgICAgICAgaWYgKHJlZiA9PT0gdHJ1ZSkge1xyXG4gICAgICAgICAgcGx1Z2luRXhwb3J0LmZvckVhY2goa2V5ID0+IHtcclxuICAgICAgICAgICAgaW5zdGFuY2Vba2V5XSA9IHBsdWdpbltrZXldXHJcbiAgICAgICAgICB9KVxyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIGlmICh0eXBlb2YgcmVmID09PSBcInN0cmluZ1wiKSB7XHJcbiAgICAgICAgICBpbnN0YW5jZVtyZWZdID0gcGx1Z2luXHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICAgIGVsc2UgaWYgKHR5cGVvZiByZWYgPT09IFwic3RyaW5nXCIpIHtcclxuICAgICAgICBpbnN0YW5jZVtyZWZdID0gcGx1Z2luXHJcbiAgICAgIH1cclxuICAgIH0pXHJcblxyXG4gICAgLy8gUHJvY2VzcyB3aW5kb3dzIHBhcmFtZXRlcnMgaW1wb3J0XHJcbiAgICBPYmplY3Qua2V5cyh0aGlzLndpbmRvd3MpLmZvckVhY2goa2V5ID0+IHtcclxuICAgICAgY29uc3Qgd2luZG93ID0gdGhpcy53aW5kb3dzW2tleV1cclxuICAgICAgd2luZG93LnBhcmFtZXRlcnMgJiYgT2JqZWN0LmtleXMod2luZG93LnBhcmFtZXRlcnMpLmZvckVhY2gocGFyYW0gPT4ge1xyXG4gICAgICAgIHRoaXMuYWRkUGFyYW1ldGVyTGluayh3aW5kb3csIHBhcmFtKVxyXG4gICAgICB9KVxyXG4gICAgfSlcclxuXHJcbiAgICBpbnN0YW5jZS5wbHVnaW5XaWxsTW91bnQoKVxyXG4gIH1cclxuICBhZGRQYXJhbWV0ZXJMaW5rKHdpbmRvdzogT2JqZWN0LCBwYXJhbTogc3RyaW5nKSB7XHJcbiAgICBjb25zdCBsaW5rID0gdGhpcy5yZXNvbHZlVmFsdWVSZWZlcmVuY2Uod2luZG93LnBhcmFtZXRlcnNbcGFyYW1dLCBwYXJhbSlcclxuICAgIGlmIChsaW5rKSB7XHJcbiAgICAgIGxpbmsucGFyYW0gPSBwYXJhbVxyXG4gICAgICBsaW5rLndpbmRvdyA9IHdpbmRvd1xyXG4gICAgICB3aW5kb3cuYWRkTGluayhsaW5rKVxyXG4gICAgICBjb25zdCBsaW5rTGlzdCA9IHRoaXMubGlua3NbbGluay5wYXRoXVxyXG4gICAgICBpZiAoIWxpbmtMaXN0KSB0aGlzLmxpbmtzW2xpbmsucGF0aF0gPSBbIGxpbmsgXVxyXG4gICAgICBlbHNlIGxpbmtMaXN0LnB1c2gobGluaylcclxuICAgIH1cclxuICAgIGVsc2Uge1xyXG4gICAgICBjb25zb2xlLmVycm9yKFwiUGFyYW1ldGVyICdcIiArIHBhcmFtICsgXCInIG9mIHdpbmRvdyAnXCIgKyB3aW5kb3cubmFtZSArIFwiJyBoYXMgaW52YWxpZCBsaW5rOlwiLCBsaW5rLnBhdGgpXHJcbiAgICB9XHJcbiAgfVxyXG4gIHJlc29sdmVWYWx1ZVJlZmVyZW5jZShyZWZlcmVuY2U6IHN0cmluZywga2V5OiBzdHJpbmcpIHtcclxuICAgIGlmIChyZWZlcmVuY2UgPT09IHRydWUpIHtcclxuICAgICAgcmV0dXJuIHtcclxuICAgICAgICBwbHVnaW5DbGFzczogdGhpcyxcclxuICAgICAgICBwYXRoOiBrZXksXHJcbiAgICAgIH1cclxuICAgIH1cclxuICAgIGVsc2UgaWYgKHR5cGVvZiByZWZlcmVuY2UgPT09IFwic3RyaW5nXCIpIHtcclxuICAgICAgY29uc3QgcGFydHMgPSByZWZlcmVuY2Uuc3BsaXQoXCIvXCIpXHJcbiAgICAgIGlmIChwYXJ0cy5sZW5ndGggPiAxKSB7XHJcbiAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgIHBsdWdpbkNsYXNzOiBwYXJ0c1swXSA/IHRoaXMuY29udGV4dC5wbHVnaW5DbGFzc2VzW3BhcnRzWzBdXSA6IHRoaXMsXHJcbiAgICAgICAgICBwYXRoOiBwYXJ0c1sxXSxcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgICAgZWxzZSByZXR1cm4ge1xyXG4gICAgICAgIHBsdWdpbkNsYXNzOiB0aGlzLFxyXG4gICAgICAgIHBhdGg6IHJlZmVyZW5jZSxcclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH1cclxufVxyXG5cclxuZXhwb3J0IGNsYXNzIFBsdWdpbkluc3RhbmNlIHtcclxuICBwbHVnaW5DbGFzczogUGx1Z2luQ2xhc3NcclxuXHJcbiAgLy8gTGlmZSBDeWNsZSBtYW5hZ2VtZW50IGZ1bmN0aW9uc1xyXG4gIHBsdWdpbldpbGxNb3VudCgpIHsgfVxyXG4gIHBsdWdpbkRpZE1vdW50KCkgeyB9XHJcbiAgcGx1Z2luV2lsbFVubW91bnQoKSB7IH1cclxuXHJcbiAgY29uc3RydWN0b3IocGx1Z2luQ2xhc3M6IFBsdWdpbkNsYXNzKSB7XHJcbiAgICB0aGlzLnBsdWdpbkNsYXNzID0gcGx1Z2luQ2xhc3NcclxuICB9XHJcbiAgb3BlbldpbmRvdyh3aW5kb3dOYW1lOiBzdHJpbmcsIG9wdGlvbnMpIHtcclxuICAgIHRoaXMubGF5b3V0Lm9wZW5QbHVnaW5XaW5kb3codGhpcy5wbHVnaW5DbGFzcy53aW5kb3dzW3dpbmRvd05hbWVdLCB0aGlzLCBvcHRpb25zKVxyXG4gIH1cclxuICBjbG9zZUFsbFdpbmRvdygpIHtcclxuICAgIGNvbnNvbGUubG9nKFwiY2xvc2VBbGxXaW5kb3cgTk9UIElNUExFTUVOVEVEXCIpXHJcbiAgfVxyXG4gIHVwZGF0ZU5leHRTdGF0ZSA9ICgpID0+IHtcclxuICAgIGlmICh0aGlzLm5leHRTdGF0ZSkge1xyXG4gICAgICBjb25zdCB1cGRhdGVkV2luZG93cyA9IFtdXHJcbiAgICAgIE9iamVjdC5rZXlzKHRoaXMubmV4dFN0YXRlKS5mb3JFYWNoKGtleSA9PiB7XHJcbiAgICAgICAgY29uc3QgdmFsdWUgPSB0aGlzLm5leHRTdGF0ZVtrZXldXHJcbiAgICAgICAgY29uc3QgbGlua3MgPSB0aGlzLnBsdWdpbkNsYXNzLmxpbmtzW2tleV1cclxuICAgICAgICB0aGlzW2tleV0gPSB2YWx1ZVxyXG4gICAgICAgIGlmIChsaW5rcykge1xyXG4gICAgICAgICAgY29uc3Qgd2luZG93cyA9IHRoaXMubGF5b3V0LndpbmRvd3NcclxuICAgICAgICAgIE9iamVjdC5rZXlzKHdpbmRvd3MpLmZvckVhY2god25kSWQgPT4ge1xyXG4gICAgICAgICAgICBjb25zdCB3bmQgPSB3aW5kb3dzW3duZElkXVxyXG4gICAgICAgICAgICBjb25zdCB3bGluayA9IGxpbmtzLmZpbmQobGsgPT4gbGsud2luZG93ID09PSB3bmQud2luZG93Q2xhc3MpXHJcbiAgICAgICAgICAgIGlmICh3bGluaykge1xyXG4gICAgICAgICAgICAgIHduZC5wYXJhbWV0ZXJzW3dsaW5rLnBhcmFtXSA9IHZhbHVlXHJcbiAgICAgICAgICAgICAgaWYgKHVwZGF0ZWRXaW5kb3dzLmluZGV4T2Yod25kKSA8IDApIHVwZGF0ZWRXaW5kb3dzLnB1c2god25kKVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICB9KVxyXG4gICAgICAgIH1cclxuICAgICAgfSlcclxuICAgICAgdXBkYXRlZFdpbmRvd3MuZm9yRWFjaCh3bmQgPT4gd25kLnJlbmRlcigpKVxyXG4gICAgICB0aGlzLm5leHRTdGF0ZSA9IG51bGxcclxuICAgIH1cclxuICB9XHJcbiAgc2V0U3RhdGUoc3RhdGU6IE9iamVjdCkge1xyXG4gICAgY29uc3Qgb2xkU3RhdGUgPSB0aGlzLm5leHRTdGF0ZVxyXG4gICAgY29uc3QgbmV3U3RhdGUgPSBvbGRTdGF0ZSB8fCB7fVxyXG4gICAgT2JqZWN0LmtleXMoc3RhdGUpLmZvckVhY2goa2V5ID0+IHtcclxuICAgICAgbmV3U3RhdGVba2V5XSA9IHN0YXRlW2tleV1cclxuICAgICAgdGhpc1trZXldID0gc3RhdGVba2V5XVxyXG4gICAgfSlcclxuICAgIHRoaXMubmV4dFN0YXRlID0gbmV3U3RhdGVcclxuICAgIGlmICghb2xkU3RhdGUpIHNldFRpbWVvdXQodGhpcy51cGRhdGVOZXh0U3RhdGUsIDApXHJcbiAgfVxyXG59Il19