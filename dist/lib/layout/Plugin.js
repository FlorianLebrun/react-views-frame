"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PluginInstance = exports.PluginClass = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Window = require("./Window");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var PluginClass = exports.PluginClass = function () {
  function PluginClass(desc, parameters, context) {
    var _this = this;

    _classCallCheck(this, PluginClass);

    this.windows = {};
    this.links = {};

    desc && Object.keys(desc).forEach(function (key) {
      return _this[key] = desc[key];
    });
    this.context = context;
    this.parameters = parameters;
    this.component = this.component || PluginInstance;
    desc.windows && Object.keys(desc.windows).forEach(function (name) {
      _this.windows[name] = new _Window.WindowClass(name, desc.windows[name], _this);
    });
  } // constructor of PluginInstance


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

      instance.pluginWillMount(this.parameters);
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
    value: function pluginWillMount(parameters) {} // eslint-disable-line

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
    this.application = pluginClass.context.application;
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9saWIvbGF5b3V0L1BsdWdpbi5qcyJdLCJuYW1lcyI6WyJQbHVnaW5DbGFzcyIsImRlc2MiLCJwYXJhbWV0ZXJzIiwiY29udGV4dCIsIndpbmRvd3MiLCJsaW5rcyIsIk9iamVjdCIsImtleXMiLCJmb3JFYWNoIiwia2V5IiwiY29tcG9uZW50IiwiUGx1Z2luSW5zdGFuY2UiLCJuYW1lIiwiaW5zdGFuY2UiLCJpbXBvcnQiLCJyZWYiLCJwbHVnaW4iLCJwbHVnaW5zIiwicGx1Z2luRXhwb3J0IiwicGx1Z2luQ2xhc3MiLCJleHBvcnQiLCJ3aW5kb3ciLCJhZGRQYXJhbWV0ZXJMaW5rIiwicGFyYW0iLCJwbHVnaW5XaWxsTW91bnQiLCJsaW5rIiwicmVzb2x2ZVZhbHVlUmVmZXJlbmNlIiwiYWRkTGluayIsImxpbmtMaXN0IiwicGF0aCIsInB1c2giLCJjb25zb2xlIiwiZXJyb3IiLCJyZWZlcmVuY2UiLCJwYXJ0cyIsInNwbGl0IiwibGVuZ3RoIiwicGx1Z2luQ2xhc3NlcyIsInVwZGF0ZU5leHRTdGF0ZSIsIm5leHRTdGF0ZSIsInVwZGF0ZWRXaW5kb3dzIiwidmFsdWUiLCJsYXlvdXQiLCJ3bmQiLCJ3bmRJZCIsIndsaW5rIiwiZmluZCIsImxrIiwid2luZG93Q2xhc3MiLCJpbmRleE9mIiwicmVuZGVyIiwiYXBwbGljYXRpb24iLCJ3aW5kb3dOYW1lIiwib3B0aW9ucyIsIm9wZW5QbHVnaW5XaW5kb3ciLCJsb2ciLCJzdGF0ZSIsIm9sZFN0YXRlIiwibmV3U3RhdGUiLCJzZXRUaW1lb3V0Il0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFBQTs7OztJQU9hQSxXLFdBQUFBLFc7QUFXWCx1QkFBWUMsSUFBWixFQUEwQkMsVUFBMUIsRUFBOENDLE9BQTlDLEVBQXNFO0FBQUE7O0FBQUE7O0FBQUEsU0FOdEVDLE9BTXNFLEdBTjFCLEVBTTBCO0FBQUEsU0FMdEVDLEtBS3NFLEdBTDFCLEVBSzBCOztBQUNwRUosWUFBUUssT0FBT0MsSUFB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LEVBQTdCO0FBQ0FuRCxhQUFPQyxJQUFQLENBQVlpRCxLQUFaLEVBQW1CaEQsT0FBbkIsQ0FBMkIsZUFBTztBQUNoQ2tELGlCQUFTakQsR0FBVCxJQUFnQitDLE1BQU0vQyxHQUFOLENBQWhCO0FBQ0EsZUFBS0EsR0FBTCxJQUFZK0MsTUFBTS9DLEdBQU4sQ0FBWjtBQUNELE9BSEQ7QUFJQSxXQUFLOEIsU0FBTCxHQUFpQm1CLFFBQWpCO0FBQ0EsVUFBSSxDQUFDRCxRQUFMLEVBQWVFLFdBQVcsS0FBS3JCLGVBQWhCLEVBQWlDLENBQWpDO0FBQ2hCIiwiZmlsZSI6IlBsdWdpbi5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IFdpbmRvd0NsYXNzIH0gZnJvbSBcIi4vV2luZG93XCJcclxuXHJcbnR5cGUgUGFyYW1ldGVyTGluayA9IHtcclxuICB3aW5kb3c6IFdpbmRvd0NsYXNzLFxyXG4gIHBhcmFtOiBzdHJpbmcsXHJcbn1cclxuXHJcbmV4cG9ydCBjbGFzcyBQbHVnaW5DbGFzcyB7XHJcbiAgbmFtZTogc3RyaW5nXHJcbiAgaW5zdGFuY2U6IFBsdWdpbkluc3RhbmNlXHJcbiAgcGFyYW1ldGVyczogT2JqZWN0XHJcbiAgY29tcG9uZW50OiBGdW5jdGlvbjxQbHVnaW5JbnN0YW5jZT4gLy8gY29uc3RydWN0b3Igb2YgUGx1Z2luSW5zdGFuY2VcclxuICB3aW5kb3dzOiB7IFtXaW5kb3dDbGFzc0lEXTogV2luZG93Q2xhc3MgfSA9IHt9XHJcbiAgbGlua3M6IHsgW3N0cmluZ106IEFycmF5PFBhcmFtZXRlckxpbms+IH0gPSB7fVxyXG4gIGV4cG9ydDogT2JqZWN0XHJcbiAgaW1wb3J0OiBPYmplY3RcclxuICBjb250ZXh0OiBQbHVnaW5Db250ZXh0XHJcblxyXG4gIGNvbnN0cnVjdG9yKGRlc2M6IE9iamVjdCwgcGFyYW1ldGVyczogT2JqZWN0LCBjb250ZXh0OiBQbHVnaW5Db250ZXh0KSB7XHJcbiAgICBkZXNjICYmIE9iamVjdC5rZXlzKGRlc2MpLmZvckVhY2goa2V5ID0+IHRoaXNba2V5XSA9IGRlc2Nba2V5XSlcclxuICAgIHRoaXMuY29udGV4dCA9IGNvbnRleHRcclxuICAgIHRoaXMucGFyYW1ldGVycyA9IHBhcmFtZXRlcnNcclxuICAgIHRoaXMuY29tcG9uZW50ID0gdGhpcy5jb21wb25lbnQgfHwgUGx1Z2luSW5zdGFuY2VcclxuICAgIGRlc2Mud2luZG93cyAmJiBPYmplY3Qua2V5cyhkZXNjLndpbmRvd3MpLmZvckVhY2gobmFtZSA9PiB7XHJcbiAgICAgIHRoaXMud2luZG93c1tuYW1lXSA9IG5ldyBXaW5kb3dDbGFzcyhuYW1lLCBkZXNjLndpbmRvd3NbbmFtZV0sIHRoaXMpXHJcbiAgICB9KVxyXG4gIH1cclxuICBjcmVhdGVJbnN0YW5jZSgpOiBQbHVnaW5JbnN0YW5jZSB7XHJcbiAgICByZXR1cm4gbmV3ICh0aGlzLmNvbXBvbmVudCkodGhpcylcclxuICB9XHJcbiAgbW91bnRJbnN0YW5jZShpbnN0YW5jZTogUGx1Z2luSW5zdGFuY2UsIGNvbnRleHQ6IFBsdWdpbkNvbnRleHQpIHtcclxuICAgIHRoaXMuaW5zdGFuY2UgPSBpbnN0YW5jZVxyXG5cclxuICAgIC8vIFByb2Nlc3MgaW1wb3J0XHJcbiAgICB0aGlzLmltcG9ydCAmJiBPYmplY3Qua2V5cyh0aGlzLmltcG9ydCkuZm9yRWFjaChuYW1lID0+IHtcclxuICAgICAgY29uc3QgcmVmID0gdGhpcy5pbXBvcnRbbmFtZV1cclxuICAgICAgY29uc3QgcGx1Z2luID0gY29udGV4dC5wbHVnaW5zW25hbWVdXHJcbiAgICAgIGNvbnN0IHBsdWdpbkV4cG9ydCA9IHBsdWdpbi5wbHVnaW5DbGFzcy5leHBvcnRcclxuICAgICAgaWYgKHBsdWdpbkV4cG9ydCkge1xyXG4gICAgICAgIGlmIChyZWYgPT09IHRydWUpIHtcclxuICAgICAgICAgIHBsdWdpbkV4cG9ydC5mb3JFYWNoKGtleSA9PiB7XHJcbiAgICAgICAgICAgIGluc3RhbmNlW2tleV0gPSBwbHVnaW5ba2V5XVxyXG4gICAgICAgICAgfSlcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSBpZiAodHlwZW9mIHJlZiA9PT0gXCJzdHJpbmdcIikge1xyXG4gICAgICAgICAgaW5zdGFuY2VbcmVmXSA9IHBsdWdpblxyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgICBlbHNlIGlmICh0eXBlb2YgcmVmID09PSBcInN0cmluZ1wiKSB7XHJcbiAgICAgICAgaW5zdGFuY2VbcmVmXSA9IHBsdWdpblxyXG4gICAgICB9XHJcbiAgICB9KVxyXG5cclxuICAgIC8vIFByb2Nlc3Mgd2luZG93cyBwYXJhbWV0ZXJzIGltcG9ydFxyXG4gICAgT2JqZWN0LmtleXModGhpcy53aW5kb3dzKS5mb3JFYWNoKGtleSA9PiB7XHJcbiAgICAgIGNvbnN0IHdpbmRvdyA9IHRoaXMud2luZG93c1trZXldXHJcbiAgICAgIHdpbmRvdy5wYXJhbWV0ZXJzICYmIE9iamVjdC5rZXlzKHdpbmRvdy5wYXJhbWV0ZXJzKS5mb3JFYWNoKHBhcmFtID0+IHtcclxuICAgICAgICB0aGlzLmFkZFBhcmFtZXRlckxpbmsod2luZG93LCBwYXJhbSlcclxuICAgICAgfSlcclxuICAgIH0pXHJcblxyXG4gICAgaW5zdGFuY2UucGx1Z2luV2lsbE1vdW50KHRoaXMucGFyYW1ldGVycylcclxuICB9XHJcbiAgYWRkUGFyYW1ldGVyTGluayh3aW5kb3c6IE9iamVjdCwgcGFyYW06IHN0cmluZykge1xyXG4gICAgY29uc3QgbGluayA9IHRoaXMucmVzb2x2ZVZhbHVlUmVmZXJlbmNlKHdpbmRvdy5wYXJhbWV0ZXJzW3BhcmFtXSwgcGFyYW0pXHJcbiAgICBpZiAobGluaykge1xyXG4gICAgICBsaW5rLnBhcmFtID0gcGFyYW1cclxuICAgICAgbGluay53aW5kb3cgPSB3aW5kb3dcclxuICAgICAgd2luZG93LmFkZExpbmsobGluaylcclxuICAgICAgY29uc3QgbGlua0xpc3QgPSB0aGlzLmxpbmtzW2xpbmsucGF0aF1cclxuICAgICAgaWYgKCFsaW5rTGlzdCkgdGhpcy5saW5rc1tsaW5rLnBhdGhdID0gWyBsaW5rIF1cclxuICAgICAgZWxzZSBsaW5rTGlzdC5wdXNoKGxpbmspXHJcbiAgICB9XHJcbiAgICBlbHNlIHtcclxuICAgICAgY29uc29sZS5lcnJvcihcIlBhcmFtZXRlciAnXCIgKyBwYXJhbSArIFwiJyBvZiB3aW5kb3cgJ1wiICsgd2luZG93Lm5hbWUgKyBcIicgaGFzIGludmFsaWQgbGluazpcIiwgbGluay5wYXRoKVxyXG4gICAgfVxyXG4gIH1cclxuICByZXNvbHZlVmFsdWVSZWZlcmVuY2UocmVmZXJlbmNlOiBzdHJpbmcsIGtleTogc3RyaW5nKSB7XHJcbiAgICBpZiAocmVmZXJlbmNlID09PSB0cnVlKSB7XHJcbiAgICAgIHJldHVybiB7XHJcbiAgICAgICAgcGx1Z2luQ2xhc3M6IHRoaXMsXHJcbiAgICAgICAgcGF0aDoga2V5LFxyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgICBlbHNlIGlmICh0eXBlb2YgcmVmZXJlbmNlID09PSBcInN0cmluZ1wiKSB7XHJcbiAgICAgIGNvbnN0IHBhcnRzID0gcmVmZXJlbmNlLnNwbGl0KFwiL1wiKVxyXG4gICAgICBpZiAocGFydHMubGVuZ3RoID4gMSkge1xyXG4gICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICBwbHVnaW5DbGFzczogcGFydHNbMF0gPyB0aGlzLmNvbnRleHQucGx1Z2luQ2xhc3Nlc1twYXJ0c1swXV0gOiB0aGlzLFxyXG4gICAgICAgICAgcGF0aDogcGFydHNbMV0sXHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICAgIGVsc2UgcmV0dXJuIHtcclxuICAgICAgICBwbHVnaW5DbGFzczogdGhpcyxcclxuICAgICAgICBwYXRoOiByZWZlcmVuY2UsXHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9XHJcbn1cclxuXHJcbmV4cG9ydCBjbGFzcyBQbHVnaW5JbnN0YW5jZSB7XHJcbiAgcGx1Z2luQ2xhc3M6IFBsdWdpbkNsYXNzXHJcbiAgYXBwbGljYXRpb246IE9iamVjdFxyXG5cclxuICAvLyBMaWZlIEN5Y2xlIG1hbmFnZW1lbnQgZnVuY3Rpb25zXHJcbiAgcGx1Z2luV2lsbE1vdW50KHBhcmFtZXRlcnM6IE9iamVjdCkgeyB9IC8vIGVzbGludC1kaXNhYmxlLWxpbmVcclxuICBwbHVnaW5EaWRNb3VudCgpIHsgfVxyXG4gIHBsdWdpbldpbGxVbm1vdW50KCkgeyB9XHJcblxyXG4gIGNvbnN0cnVjdG9yKHBsdWdpbkNsYXNzOiBQbHVnaW5DbGFzcykge1xyXG4gICAgdGhpcy5wbHVnaW5DbGFzcyA9IHBsdWdpbkNsYXNzXHJcbiAgICB0aGlzLmFwcGxpY2F0aW9uID0gcGx1Z2luQ2xhc3MuY29udGV4dC5hcHBsaWNhdGlvblxyXG4gIH1cclxuICBvcGVuV2luZG93KHdpbmRvd05hbWU6IHN0cmluZywgb3B0aW9ucykge1xyXG4gICAgdGhpcy5sYXlvdXQub3BlblBsdWdpbldpbmRvdyh0aGlzLnBsdWdpbkNsYXNzLndpbmRvd3Nbd2luZG93TmFtZV0sIHRoaXMsIG9wdGlvbnMpXHJcbiAgfVxyXG4gIGNsb3NlQWxsV2luZG93KCkge1xyXG4gICAgY29uc29sZS5sb2coXCJjbG9zZUFsbFdpbmRvdyBOT1QgSU1QTEVNRU5URURcIilcclxuICB9XHJcbiAgdXBkYXRlTmV4dFN0YXRlID0gKCkgPT4ge1xyXG4gICAgaWYgKHRoaXMubmV4dFN0YXRlKSB7XHJcbiAgICAgIGNvbnN0IHVwZGF0ZWRXaW5kb3dzID0gW11cclxuICAgICAgT2JqZWN0LmtleXModGhpcy5uZXh0U3RhdGUpLmZvckVhY2goa2V5ID0+IHtcclxuICAgICAgICBjb25zdCB2YWx1ZSA9IHRoaXMubmV4dFN0YXRlW2tleV1cclxuICAgICAgICBjb25zdCBsaW5rcyA9IHRoaXMucGx1Z2luQ2xhc3MubGlua3Nba2V5XVxyXG4gICAgICAgIHRoaXNba2V5XSA9IHZhbHVlXHJcbiAgICAgICAgaWYgKGxpbmtzKSB7XHJcbiAgICAgICAgICBjb25zdCB3aW5kb3dzID0gdGhpcy5sYXlvdXQud2luZG93c1xyXG4gICAgICAgICAgT2JqZWN0LmtleXMod2luZG93cykuZm9yRWFjaCh3bmRJZCA9PiB7XHJcbiAgICAgICAgICAgIGNvbnN0IHduZCA9IHdpbmRvd3Nbd25kSWRdXHJcbiAgICAgICAgICAgIGNvbnN0IHdsaW5rID0gbGlua3MuZmluZChsayA9PiBsay53aW5kb3cgPT09IHduZC53aW5kb3dDbGFzcylcclxuICAgICAgICAgICAgaWYgKHdsaW5rKSB7XHJcbiAgICAgICAgICAgICAgd25kLnBhcmFtZXRlcnNbd2xpbmsucGFyYW1dID0gdmFsdWVcclxuICAgICAgICAgICAgICBpZiAodXBkYXRlZFdpbmRvd3MuaW5kZXhPZih3bmQpIDwgMCkgdXBkYXRlZFdpbmRvd3MucHVzaCh3bmQpXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgIH0pXHJcbiAgICAgICAgfVxyXG4gICAgICB9KVxyXG4gICAgICB1cGRhdGVkV2luZG93cy5mb3JFYWNoKHduZCA9PiB3bmQucmVuZGVyKCkpXHJcbiAgICAgIHRoaXMubmV4dFN0YXRlID0gbnVsbFxyXG4gICAgfVxyXG4gIH1cclxuICBzZXRTdGF0ZShzdGF0ZTogT2JqZWN0KSB7XHJcbiAgICBjb25zdCBvbGRTdGF0ZSA9IHRoaXMubmV4dFN0YXRlXHJcbiAgICBjb25zdCBuZXdTdGF0ZSA9IG9sZFN0YXRlIHx8IHt9XHJcbiAgICBPYmplY3Qua2V5cyhzdGF0ZSkuZm9yRWFjaChrZXkgPT4ge1xyXG4gICAgICBuZXdTdGF0ZVtrZXldID0gc3RhdGVba2V5XVxyXG4gICAgICB0aGlzW2tleV0gPSBzdGF0ZVtrZXldXHJcbiAgICB9KVxyXG4gICAgdGhpcy5uZXh0U3RhdGUgPSBuZXdTdGF0ZVxyXG4gICAgaWYgKCFvbGRTdGF0ZSkgc2V0VGltZW91dCh0aGlzLnVwZGF0ZU5leHRTdGF0ZSwgMClcclxuICB9XHJcbn0iXX0=