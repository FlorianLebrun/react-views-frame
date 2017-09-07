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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9saWIvbGF5b3V0L1BsdWdpbi5qcyJdLCJuYW1lcyI6WyJQbHVnaW5DbGFzcyIsImRlc2MiLCJ3aW5kb3dzIiwibGlua3MiLCJPYmplY3QiLCJrZXlzIiwiZm9yRWFjaCIsImtleSIsImNvbXBvbmVudCIsIlBsdWdpbkluc3RhbmNlIiwibmFtZSIsImluc3RhbmNlIiwiY29udGV4dCIsImltcG9ydCIsInJlZiIsInBsdWdpbiIsInBsdWdpbnMiLCJwbHVnaW5FeHBvcnQiLCJwbHVnaW5DbGFzcyIsImV4cG9ydCIsIndpbmRvdyIsInBhcmFtZXRlcnMiLCJhZGRQYXJhbWV0ZXJMaW5rIiwicGFyYW0iLCJwbHVnaW5XaWxsTW91bnQiLCJsaW5rIiwicmVzb2x2ZVZhbHVlUmVmZXJlbmNlIiwiYWRkTGluayIsImxpbmtMaXN0IiwicGF0aCIsInB1c2giLCJjb25zb2xlIiwiZXJyb3IiLCJyZWZlcmVuY2UiLCJwYXJ0cyIsInNwbGl0IiwibGVuZ3RoIiwicGx1Z2luQ2xhc3NlcyIsInVwZGF0ZU5leHRTdGF0ZSIsIm5leHRTdGF0ZSIsInVwZGF0ZWRXaW5kb3dzIiwidmFsdWUiLCJsYXlvdXQiLCJ3bmQiLCJ3bmRJZCIsIndsaW5rIiwiZmluZCIsImxrIiwid2luZG93Q2xhc3MiLCJpbmRleE9mIiwicmVuZGVyIiwid2luZG93TmFtZSIsIm9wdGlvbnMiLCJvcGVuUGx1Z2luV2luZG93IiwibG9nIiwic3RhdGUiLCJvbGRTdGF0ZSIsIm5ld1N0YXRlIiwic2V0VGltZW91dCJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBQUE7Ozs7SUFPYUEsVyxXQUFBQSxXO0FBR3lCO0FBTXBDLHVCQUFZQyxJQUFaLEVBQTBCO0FBQUE7O0FBQUE7O0FBQUEsU0FMMUJDLE9BSzBCLEdBTGtCLEVBS2xCO0FBQUEsU0FKMUJDLEtBSTBCLEdBSmtCLEVBSWxCOztBQUN4QkYsWUFBUUcsT0FBT0MsSUFBUCxDQUFZSixJQUFaLEVBQWtCSyxPQUFsQixDQUEwQjtB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LEVBQWVFLFdBQVcsS0FBS3BCLGVBQWhCLEVBQWlDLENBQWpDO0FBQ2hCIiwiZmlsZSI6IlBsdWdpbi5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IFdpbmRvd0NsYXNzIH0gZnJvbSBcIi4vV2luZG93XCJcclxuXHJcbnR5cGUgUGFyYW1ldGVyTGluayA9IHtcclxuICB3aW5kb3c6IFdpbmRvd0NsYXNzLFxyXG4gIHBhcmFtOiBzdHJpbmcsXHJcbn1cclxuXHJcbmV4cG9ydCBjbGFzcyBQbHVnaW5DbGFzcyB7XHJcbiAgbmFtZTogc3RyaW5nXHJcbiAgaW5zdGFuY2U6IFBsdWdpbkluc3RhbmNlXHJcbiAgY29tcG9uZW50OiBGdW5jdGlvbjxQbHVnaW5JbnN0YW5jZT4gLy8gY29uc3RydWN0b3Igb2YgUGx1Z2luSW5zdGFuY2VcclxuICB3aW5kb3dzOiB7IFtXaW5kb3dDbGFzc0lEXTogV2luZG93Q2xhc3MgfSA9IHt9XHJcbiAgbGlua3M6IHsgW3N0cmluZ106IEFycmF5PFBhcmFtZXRlckxpbms+IH0gPSB7fVxyXG4gIGV4cG9ydDogT2JqZWN0XHJcbiAgaW1wb3J0OiBPYmplY3RcclxuXHJcbiAgY29uc3RydWN0b3IoZGVzYzogT2JqZWN0KSB7XHJcbiAgICBkZXNjICYmIE9iamVjdC5rZXlzKGRlc2MpLmZvckVhY2goa2V5ID0+IHRoaXNba2V5XSA9IGRlc2Nba2V5XSlcclxuICAgIHRoaXMuY29tcG9uZW50ID0gdGhpcy5jb21wb25lbnQgfHwgUGx1Z2luSW5zdGFuY2VcclxuICAgIE9iamVjdC5rZXlzKGRlc2Mud2luZG93cykuZm9yRWFjaChuYW1lID0+IHtcclxuICAgICAgdGhpcy53aW5kb3dzW25hbWVdID0gbmV3IFdpbmRvd0NsYXNzKG5hbWUsIGRlc2Mud2luZG93c1tuYW1lXSwgdGhpcylcclxuICAgIH0pXHJcbiAgfVxyXG4gIGNyZWF0ZUluc3RhbmNlKCk6IFBsdWdpbkluc3RhbmNlIHtcclxuICAgIHJldHVybiBuZXcgKHRoaXMuY29tcG9uZW50KSh0aGlzKVxyXG4gIH1cclxuICBtb3VudEluc3RhbmNlKGluc3RhbmNlOiBQbHVnaW5JbnN0YW5jZSwgY29udGV4dDogQXBwbGljYXRpb25MYXlvdXQpIHtcclxuICAgIHRoaXMuaW5zdGFuY2UgPSBpbnN0YW5jZVxyXG5cclxuICAgIC8vIFByb2Nlc3MgaW1wb3J0XHJcbiAgICB0aGlzLmltcG9ydCAmJiBPYmplY3Qua2V5cyh0aGlzLmltcG9ydCkuZm9yRWFjaChuYW1lID0+IHtcclxuICAgICAgY29uc3QgcmVmID0gdGhpcy5pbXBvcnRbbmFtZV1cclxuICAgICAgY29uc3QgcGx1Z2luID0gY29udGV4dC5wbHVnaW5zW25hbWVdXHJcbiAgICAgIGNvbnN0IHBsdWdpbkV4cG9ydCA9IHBsdWdpbi5wbHVnaW5DbGFzcy5leHBvcnRcclxuICAgICAgaWYgKHBsdWdpbkV4cG9ydCkge1xyXG4gICAgICAgIGlmIChyZWYgPT09IHRydWUpIHtcclxuICAgICAgICAgIHBsdWdpbkV4cG9ydC5mb3JFYWNoKGtleSA9PiB7XHJcbiAgICAgICAgICAgIGluc3RhbmNlW2tleV0gPSBwbHVnaW5ba2V5XVxyXG4gICAgICAgICAgfSlcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSBpZiAodHlwZW9mIHJlZiA9PT0gXCJzdHJpbmdcIikge1xyXG4gICAgICAgICAgaW5zdGFuY2VbcmVmXSA9IHBsdWdpblxyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgICBlbHNlIGlmICh0eXBlb2YgcmVmID09PSBcInN0cmluZ1wiKSB7XHJcbiAgICAgICAgaW5zdGFuY2VbcmVmXSA9IHBsdWdpblxyXG4gICAgICB9XHJcbiAgICB9KVxyXG5cclxuICAgIC8vIFByb2Nlc3Mgd2luZG93cyBwYXJhbWV0ZXJzIGltcG9ydFxyXG4gICAgT2JqZWN0LmtleXModGhpcy53aW5kb3dzKS5mb3JFYWNoKGtleSA9PiB7XHJcbiAgICAgIGNvbnN0IHdpbmRvdyA9IHRoaXMud2luZG93c1trZXldXHJcbiAgICAgIHdpbmRvdy5wYXJhbWV0ZXJzICYmIE9iamVjdC5rZXlzKHdpbmRvdy5wYXJhbWV0ZXJzKS5mb3JFYWNoKHBhcmFtID0+IHtcclxuICAgICAgICB0aGlzLmFkZFBhcmFtZXRlckxpbmsod2luZG93LCBwYXJhbSlcclxuICAgICAgfSlcclxuICAgIH0pXHJcblxyXG4gICAgaW5zdGFuY2UucGx1Z2luV2lsbE1vdW50KClcclxuICB9XHJcbiAgYWRkUGFyYW1ldGVyTGluayh3aW5kb3c6IE9iamVjdCwgcGFyYW06IHN0cmluZykge1xyXG4gICAgY29uc3QgbGluayA9IHRoaXMucmVzb2x2ZVZhbHVlUmVmZXJlbmNlKHdpbmRvdy5wYXJhbWV0ZXJzW3BhcmFtXSwgcGFyYW0pXHJcbiAgICBpZiAobGluaykge1xyXG4gICAgICBsaW5rLnBhcmFtID0gcGFyYW1cclxuICAgICAgbGluay53aW5kb3cgPSB3aW5kb3dcclxuICAgICAgd2luZG93LmFkZExpbmsobGluaylcclxuICAgICAgY29uc3QgbGlua0xpc3QgPSB0aGlzLmxpbmtzW2xpbmsucGF0aF1cclxuICAgICAgaWYgKCFsaW5rTGlzdCkgdGhpcy5saW5rc1tsaW5rLnBhdGhdID0gWyBsaW5rIF1cclxuICAgICAgZWxzZSBsaW5rTGlzdC5wdXNoKGxpbmspXHJcbiAgICB9XHJcbiAgICBlbHNlIHtcclxuICAgICAgY29uc29sZS5lcnJvcihcIlBhcmFtZXRlciAnXCIgKyBwYXJhbSArIFwiJyBvZiB3aW5kb3cgJ1wiICsgd2luZG93Lm5hbWUgKyBcIicgaGFzIGludmFsaWQgbGluazpcIiwgbGluay5wYXRoKVxyXG4gICAgfVxyXG4gIH1cclxuICByZXNvbHZlVmFsdWVSZWZlcmVuY2UocmVmZXJlbmNlOiBzdHJpbmcsIGtleTogc3RyaW5nKSB7XHJcbiAgICBpZiAocmVmZXJlbmNlID09PSB0cnVlKSB7XHJcbiAgICAgIHJldHVybiB7XHJcbiAgICAgICAgcGx1Z2luQ2xhc3M6IHRoaXMsXHJcbiAgICAgICAgcGF0aDoga2V5LFxyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgICBlbHNlIGlmICh0eXBlb2YgcmVmZXJlbmNlID09PSBcInN0cmluZ1wiKSB7XHJcbiAgICAgIGNvbnN0IHBhcnRzID0gcmVmZXJlbmNlLnNwbGl0KFwiL1wiKVxyXG4gICAgICBpZiAocGFydHMubGVuZ3RoID4gMSkge1xyXG4gICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICBwbHVnaW5DbGFzczogcGFydHNbMF0gPyB0aGlzLmNvbnRleHQucGx1Z2luQ2xhc3Nlc1twYXJ0c1swXV0gOiB0aGlzLFxyXG4gICAgICAgICAgcGF0aDogcGFydHNbMV0sXHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICAgIGVsc2UgcmV0dXJuIHtcclxuICAgICAgICBwbHVnaW5DbGFzczogdGhpcyxcclxuICAgICAgICBwYXRoOiByZWZlcmVuY2UsXHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9XHJcbn1cclxuXHJcbmV4cG9ydCBjbGFzcyBQbHVnaW5JbnN0YW5jZSB7XHJcbiAgcGx1Z2luQ2xhc3M6IFBsdWdpbkNsYXNzXHJcblxyXG4gIC8vIExpZmUgQ3ljbGUgbWFuYWdlbWVudCBmdW5jdGlvbnNcclxuICBwbHVnaW5XaWxsTW91bnQoKSB7IH1cclxuICBwbHVnaW5EaWRNb3VudCgpIHsgfVxyXG4gIHBsdWdpbldpbGxVbm1vdW50KCkgeyB9XHJcblxyXG4gIGNvbnN0cnVjdG9yKHBsdWdpbkNsYXNzOiBQbHVnaW5DbGFzcykge1xyXG4gICAgdGhpcy5wbHVnaW5DbGFzcyA9IHBsdWdpbkNsYXNzXHJcbiAgfVxyXG4gIG9wZW5XaW5kb3cod2luZG93TmFtZTogc3RyaW5nLCBvcHRpb25zKSB7XHJcbiAgICB0aGlzLmxheW91dC5vcGVuUGx1Z2luV2luZG93KHRoaXMucGx1Z2luQ2xhc3Mud2luZG93c1t3aW5kb3dOYW1lXSwgdGhpcywgb3B0aW9ucylcclxuICB9XHJcbiAgY2xvc2VBbGxXaW5kb3coKSB7XHJcbiAgICBjb25zb2xlLmxvZyhcImNsb3NlQWxsV2luZG93IE5PVCBJTVBMRU1FTlRFRFwiKVxyXG4gIH1cclxuICB1cGRhdGVOZXh0U3RhdGUgPSAoKSA9PiB7XHJcbiAgICBpZiAodGhpcy5uZXh0U3RhdGUpIHtcclxuICAgICAgY29uc3QgdXBkYXRlZFdpbmRvd3MgPSBbXVxyXG4gICAgICBPYmplY3Qua2V5cyh0aGlzLm5leHRTdGF0ZSkuZm9yRWFjaChrZXkgPT4ge1xyXG4gICAgICAgIGNvbnN0IHZhbHVlID0gdGhpcy5uZXh0U3RhdGVba2V5XVxyXG4gICAgICAgIGNvbnN0IGxpbmtzID0gdGhpcy5wbHVnaW5DbGFzcy5saW5rc1trZXldXHJcbiAgICAgICAgdGhpc1trZXldID0gdmFsdWVcclxuICAgICAgICBpZiAobGlua3MpIHtcclxuICAgICAgICAgIGNvbnN0IHdpbmRvd3MgPSB0aGlzLmxheW91dC53aW5kb3dzXHJcbiAgICAgICAgICBPYmplY3Qua2V5cyh3aW5kb3dzKS5mb3JFYWNoKHduZElkID0+IHtcclxuICAgICAgICAgICAgY29uc3Qgd25kID0gd2luZG93c1t3bmRJZF1cclxuICAgICAgICAgICAgY29uc3Qgd2xpbmsgPSBsaW5rcy5maW5kKGxrID0+IGxrLndpbmRvdyA9PT0gd25kLndpbmRvd0NsYXNzKVxyXG4gICAgICAgICAgICBpZiAod2xpbmspIHtcclxuICAgICAgICAgICAgICB3bmQucGFyYW1ldGVyc1t3bGluay5wYXJhbV0gPSB2YWx1ZVxyXG4gICAgICAgICAgICAgIGlmICh1cGRhdGVkV2luZG93cy5pbmRleE9mKHduZCkgPCAwKSB1cGRhdGVkV2luZG93cy5wdXNoKHduZClcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgfSlcclxuICAgICAgICB9XHJcbiAgICAgIH0pXHJcbiAgICAgIHVwZGF0ZWRXaW5kb3dzLmZvckVhY2god25kID0+IHduZC5yZW5kZXIoKSlcclxuICAgICAgdGhpcy5uZXh0U3RhdGUgPSBudWxsXHJcbiAgICB9XHJcbiAgfVxyXG4gIHNldFN0YXRlKHN0YXRlOiBPYmplY3QpIHtcclxuICAgIGNvbnN0IG9sZFN0YXRlID0gdGhpcy5uZXh0U3RhdGVcclxuICAgIGNvbnN0IG5ld1N0YXRlID0gb2xkU3RhdGUgfHwge31cclxuICAgIE9iamVjdC5rZXlzKHN0YXRlKS5mb3JFYWNoKGtleSA9PiB7XHJcbiAgICAgIG5ld1N0YXRlW2tleV0gPSBzdGF0ZVtrZXldXHJcbiAgICAgIHRoaXNba2V5XSA9IHN0YXRlW2tleV1cclxuICAgIH0pXHJcbiAgICB0aGlzLm5leHRTdGF0ZSA9IG5ld1N0YXRlXHJcbiAgICBpZiAoIW9sZFN0YXRlKSBzZXRUaW1lb3V0KHRoaXMudXBkYXRlTmV4dFN0YXRlLCAwKVxyXG4gIH1cclxufSJdfQ==