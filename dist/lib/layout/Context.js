"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PluginContext = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }(); /* eslint-disable react/no-multi-comp */


var _Plugin = require("./Plugin");

var _Window = require("./Window");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var PluginContext = exports.PluginContext = function () {
  function PluginContext(application) {
    var _this = this;

    _classCallCheck(this, PluginContext);

    this.pluginClasses = {};
    this.plugins = {};
    this.windows = {};
    this.docks = {};
    this.frame = null;
    this.application = null;
    this.windowLoaded = false;
    this.uidGenerator = 0;

    this.mountPlugins = function () {
      _this.windowLoaded = true;
      var pluginNames = Object.keys(_this.pluginClasses);

      // Connect plugins
      pluginNames.forEach(function (name) {
        _this.pluginClasses[name].willMount();
      });

      // Finalize plugins mount
      pluginNames.forEach(function (name) {
        _this.pluginClasses[name].didMount();
      });
    };

    this.unmountPlugins = function () {
      Object.keys(_this.plugins).forEach(function (name) {
        var plugin = _this.plugins[name];
        plugin.pluginWillUnmount();
      });
    };

    this.application = application;
    _Plugin.PluginComponent.prototype.layout = this;
    _Plugin.PluginComponent.prototype.application = application;
    _Window.WindowInstance.prototype.layout = this;
    _Window.WindowInstance.prototype.application = application;
    window.addEventListener("beforeunload", this.unmountPlugins);
  }

  _createClass(PluginContext, [{
    key: "registerFrame",
    value: function registerFrame(frame) {
      var _this2 = this;

      this.frame = frame;
      frame && Object.keys(this.windows).forEach(function (key) {
        var wnd = _this2.windows[key];
        frame.attachWindow(wnd.id, wnd.dockId);
      });
    }
  }, {
    key: "configureLayout",
    value: function configureLayout(description) {
      this.splashComponent = description.splashComponent;
      this.displayLayout = description.displayLayout;
    }
  }, {
    key: "mapPlugin",
    value: function mapPlugin(name) {
      var pluginClass = this.pluginClasses[name];
      if (!pluginClass) {
        pluginClass = new _Plugin.PluginClass(name, this);
        this.pluginClasses[name] = pluginClass;
      }
      return pluginClass;
    }
  }, {
    key: "installPlugin",
    value: function installPlugin(description, parameters) {
      var pluginClass = this.mapPlugin(description.name);
      pluginClass.setup(description, parameters);
      return pluginClass;
    }
  }, {
    key: "dockWindow",
    value: function dockWindow(wnd, dockId, foreground) {
      this.frame && this.frame.attachWindow(wnd.id, dockId, foreground);
    }
  }, {
    key: "dettachWindow",
    value: function dettachWindow(windowId) {
      this.frame && this.frame.dettachWindow(windowId);
    }
  }, {
    key: "removeWindow",
    value: function removeWindow(windowId) {
      var wnd = this.windows[windowId];
      this.dettachWindow(windowId);
      delete this.windows[windowId];
      wnd.close();
    }
  }, {
    key: "openSubWindow",
    value: function openSubWindow(windowClass, parent, options) {
      if (windowClass && parent) {
        var wnd = options && options.openNew ? null : this.findOneWindowByClass(windowClass);
        if (!wnd) {
          wnd = new _Window.WindowInstance("#" + this.uidGenerator++, windowClass, parent, parent.plugin, options || {});
        } else {
          options && wnd.updateOptions(options);
        }
        this.dockWindow(wnd, wnd.dockId, true);
      }
    }
  }, {
    key: "openPluginWindow",
    value: function openPluginWindow(windowClass, plugin, options) {
      if (windowClass) {
        var wnd = options && options.openNew ? null : this.findOneWindowByClass(windowClass);
        if (!wnd) {
          wnd = new _Window.WindowInstance("#" + this.uidGenerator++, windowClass, null, plugin, options || {});
        } else {
          options && wnd.updateOptions(options);
        }
        this.dockWindow(wnd, wnd.dockId, true);
      }
    }
  }, {
    key: "closePluginWindows",
    value: function closePluginWindows(windowClass, plugin) {
      var _this3 = this;

      var windows = void 0;
      if (windowClass) windows = this.findAllWindowsByClass(windowClass);else windows = this.findAllWindowsByPlugin(plugin);
      windows.forEach(function (wnd) {
        return _this3.removeWindow(wnd.id);
      });
    }
  }, {
    key: "getWindowInstance",
    value: function getWindowInstance(windowId) {
      return this.windows[windowId];
    }
  }, {
    key: "findOneWindowByClass",
    value: function findOneWindowByClass(windowClass) {
      var windowId = void 0;
      for (windowId in this.windows) {
        if (this.windows[windowId].windowClass === windowClass) {
          return this.windows[windowId];
        }
      }
      return null;
    }
  }, {
    key: "findAllWindowsByPlugin",
    value: function findAllWindowsByPlugin(plugin) {
      var windows = [];
      if (plugin) {
        var windowId = void 0;
        for (windowId in this.windows) {
          if (this.windows[windowId].plugin === plugin) {
            windows.push(this.windows[windowId]);
          }
        }
      }
      return windows;
    }
  }, {
    key: "findAllWindowsByClass",
    value: function findAllWindowsByClass(windowClass) {
      if (windowClass) {
        var windowId = void 0;
        var windows = [];
        for (windowId in this.windows) {
          if (this.windows[windowId].windowClass === windowClass) {
            windows.push(this.windows[windowId]);
          }
        }
        return windows;
      } else {
        return this.windows.values();
      }
    }
  }]);

  return PluginContext;
}();
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9saWIvbGF5b3V0L0NvbnRleHQuanMiXSwibmFtZXMiOlsiUGx1Z2luQ29udGV4dCIsImFwcGxpY2F0aW9uIiwicGx1Z2luQ2xhc3NlcyIsInBsdWdpbnMiLCJ3aW5kb3dzIiwiZG9ja3MiLCJmcmFtZSIsIndpbmRvd0xvYWRlZCIsInVpZEdlbmVyYXRvciIsIm1vdW50UGx1Z2lucyIsInBsdWdpbk5hbWVzIiwiT2JqZWN0Iiwia2V5cyIsImZvckVhY2giLCJuYW1lIiwid2lsbE1vdW50IiwiZGlkTW91bnQiLCJ1bm1vdW50UGx1Z2lucyIsInBsdWdpbiIsInBsdWdpbldpbGxVbm1vdW50IiwicHJvdG90eXBlIiwibGF5b3V0Iiwid2luZG93IiwiYWRkRXZlbnRMaXN0ZW5lciIsInduZCIsImtleSIsImF0dGFjaFdpbmRvdyIsImlkIiwiZG9ja0lkIiwiZGVzY3JpcHRpb24iLCJzcGxhc2hDb21wb25lbnQiLCJkaXNwbGF5TGF5b3V0IiwicGx1Z2luQ2xhc3MiLCJwYXJhbWV0ZXJzIiwibWFwUGx1Z2luIiwic2V0dXAiLCJmb3JlZ3JvdW5kIiwid2luZG93SWQiLCJkZXR0YWNoV2luZG93IiwiY2xvc2UiLCJ3aW5kb3dDbGFzcyIsInBhcmVudCIsIm9wdGlvbnMiLCJvcGVuTmV3IiwiZmluZE9uZVdpbmRvd0J5Q2xhc3MiLCJ1cGRhdGVPcHRpb25zIiwiZG9ja1dpbmRvdyIsImZpbmRBbGxXaW5kb3dzQnlDbGFzcyIsImZpbmRBbGxXaW5kb3dzQnlQbHVnaW4iLCJyZW1vdmVXaW5kb3ciLCJwdXNoIiwidmFsdWVzIl0sIm1hcHBpbmdzIjoiOzs7Ozs7O3FqQkFBQTs7O0FBQ0E7O0FBQ0E7Ozs7SUFFYUEsYSxXQUFBQSxhO0FBWVgseUJBQVlDLFdBQVosRUFBeUI7QUFBQTs7QUFBQTs7QUFBQSxTQVh6QkMsYUFXeUIsR0FYa0IsRUFXbEI7QUFBQSxTQVZ6QkMsT0FVeUIsR0FWZ0IsRUFVaEI7QUFBQSxTQVR6QkMsT0FTeUIsR0FUZSxF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QyxXLEVBQWlEO0FBQ3JFLFVBQUlBLFdBQUosRUFBaUI7QUFDZixZQUFJSCxpQkFBSjtBQUNBLFlBQU1qQyxVQUFVLEVBQWhCO0FBQ0EsYUFBS2lDLFFBQUwsSUFBaUIsS0FBS2pDLE9BQXRCLEVBQStCO0FBQzdCLGNBQUksS0FBS0EsT0FBTCxDQUFhaUMsUUFBYixFQUF1QkcsV0FBdkIsS0FBdUNBLFdBQTNDLEVBQXdEO0FBQ3REcEMsb0JBQVE4QyxJQUFSLENBQWEsS0FBSzlDLE9BQUwsQ0FBYWlDLFFBQWIsQ0FBYjtBQUNEO0FBQ0Y7QUFDRCxlQUFPakMsT0FBUDtBQUNELE9BVEQsTUFVSztBQUNILGVBQU8sS0FBS0EsT0FBTCxDQUFhK0MsTUFBYixFQUFQO0FBQ0Q7QUFDRiIsImZpbGUiOiJDb250ZXh0LmpzIiwic291cmNlc0NvbnRlbnQiOlsiLyogZXNsaW50LWRpc2FibGUgcmVhY3Qvbm8tbXVsdGktY29tcCAqL1xyXG5pbXBvcnQgeyBQbHVnaW5Db21wb25lbnQsIFBsdWdpbkNsYXNzIH0gZnJvbSBcIi4vUGx1Z2luXCJcclxuaW1wb3J0IHsgV2luZG93SW5zdGFuY2UsIFdpbmRvd0NsYXNzLCBXaW5kb3dJRCB9IGZyb20gXCIuL1dpbmRvd1wiXHJcblxyXG5leHBvcnQgY2xhc3MgUGx1Z2luQ29udGV4dCB7XHJcbiAgcGx1Z2luQ2xhc3NlczogeyBbc3RyaW5nXTogUGx1Z2luQ2xhc3MgfSA9IHt9XHJcbiAgcGx1Z2luczogeyBbc3RyaW5nXTogUGx1Z2luQ29tcG9uZW50IH0gPSB7fVxyXG4gIHdpbmRvd3M6IHsgW3N0cmluZ106IFdpbmRvd0luc3RhbmNlIH0gPSB7fVxyXG4gIGRvY2tzOiB7IFtzdHJpbmddOiBBcnJheTxXaW5kb3dJbnN0YW5jZT4gfSA9IHt9XHJcbiAgZnJhbWU6IEZyYW1lID0gbnVsbFxyXG4gIGFwcGxpY2F0aW9uOiBPYmplY3QgPSBudWxsXHJcblxyXG4gIGRpc3BsYXlMYXlvdXQ6IE9iamVjdFxyXG4gIHdpbmRvd0xvYWRlZDogYm9vbGVhbiA9IGZhbHNlXHJcbiAgdWlkR2VuZXJhdG9yOiBudW1iZXIgPSAwXHJcblxyXG4gIGNvbnN0cnVjdG9yKGFwcGxpY2F0aW9uKSB7XHJcbiAgICB0aGlzLmFwcGxpY2F0aW9uID0gYXBwbGljYXRpb25cclxuICAgIFBsdWdpbkNvbXBvbmVudC5wcm90b3R5cGUubGF5b3V0ID0gdGhpc1xyXG4gICAgUGx1Z2luQ29tcG9uZW50LnByb3RvdHlwZS5hcHBsaWNhdGlvbiA9IGFwcGxpY2F0aW9uXHJcbiAgICBXaW5kb3dJbnN0YW5jZS5wcm90b3R5cGUubGF5b3V0ID0gdGhpc1xyXG4gICAgV2luZG93SW5zdGFuY2UucHJvdG90eXBlLmFwcGxpY2F0aW9uID0gYXBwbGljYXRpb25cclxuICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKFwiYmVmb3JldW5sb2FkXCIsIHRoaXMudW5tb3VudFBsdWdpbnMpXHJcbiAgfVxyXG4gIHJlZ2lzdGVyRnJhbWUoZnJhbWU6IEZyYW1lKSB7XHJcbiAgICB0aGlzLmZyYW1lID0gZnJhbWVcclxuICAgIGZyYW1lICYmIE9iamVjdC5rZXlzKHRoaXMud2luZG93cykuZm9yRWFjaChrZXk9PntcclxuICAgICAgY29uc3Qgd25kID0gdGhpcy53aW5kb3dzW2tleV1cclxuICAgICAgZnJhbWUuYXR0YWNoV2luZG93KHduZC5pZCwgd25kLmRvY2tJZClcclxuICAgIH0pXHJcbiAgfVxyXG4gIG1vdW50UGx1Z2lucyA9ICgpID0+IHtcclxuICAgIHRoaXMud2luZG93TG9hZGVkID0gdHJ1ZVxyXG4gICAgY29uc3QgcGx1Z2luTmFtZXMgPSBPYmplY3Qua2V5cyh0aGlzLnBsdWdpbkNsYXNzZXMpXHJcblxyXG4gICAgLy8gQ29ubmVjdCBwbHVnaW5zXHJcbiAgICBwbHVnaW5OYW1lcy5mb3JFYWNoKG5hbWUgPT4ge1xyXG4gICAgICB0aGlzLnBsdWdpbkNsYXNzZXNbbmFtZV0ud2lsbE1vdW50KClcclxuICAgIH0pXHJcblxyXG4gICAgLy8gRmluYWxpemUgcGx1Z2lucyBtb3VudFxyXG4gICAgcGx1Z2luTmFtZXMuZm9yRWFjaChuYW1lID0+IHtcclxuICAgICAgdGhpcy5wbHVnaW5DbGFzc2VzW25hbWVdLmRpZE1vdW50KClcclxuICAgIH0pXHJcbiAgfVxyXG4gIHVubW91bnRQbHVnaW5zID0gKCkgPT4ge1xyXG4gICAgT2JqZWN0LmtleXModGhpcy5wbHVnaW5zKS5mb3JFYWNoKG5hbWUgPT4ge1xyXG4gICAgICBjb25zdCBwbHVnaW4gPSB0aGlzLnBsdWdpbnNbbmFtZV1cclxuICAgICAgcGx1Z2luLnBsdWdpbldpbGxVbm1vdW50KClcclxuICAgIH0pXHJcbiAgfVxyXG4gIGNvbmZpZ3VyZUxheW91dChkZXNjcmlwdGlvbjogT2JqZWN0KSB7XHJcbiAgICB0aGlzLnNwbGFzaENvbXBvbmVudCA9IGRlc2NyaXB0aW9uLnNwbGFzaENvbXBvbmVudFxyXG4gICAgdGhpcy5kaXNwbGF5TGF5b3V0ID0gZGVzY3JpcHRpb24uZGlzcGxheUxheW91dFxyXG4gIH1cclxuICBtYXBQbHVnaW4obmFtZSkge1xyXG4gICAgbGV0IHBsdWdpbkNsYXNzID0gdGhpcy5wbHVnaW5DbGFzc2VzW25hbWVdXHJcbiAgICBpZiAoIXBsdWdpbkNsYXNzKSB7XHJcbiAgICAgIHBsdWdpbkNsYXNzID0gbmV3IFBsdWdpbkNsYXNzKG5hbWUsIHRoaXMpXHJcbiAgICAgIHRoaXMucGx1Z2luQ2xhc3Nlc1tuYW1lXSA9IHBsdWdpbkNsYXNzXHJcbiAgICB9XHJcbiAgICByZXR1cm4gcGx1Z2luQ2xhc3NcclxuICB9XHJcbiAgaW5zdGFsbFBsdWdpbihkZXNjcmlwdGlvbjogT2JqZWN0LCBwYXJhbWV0ZXJzOiBPYmplY3QpOiBQbHVnaW5DbGFzcyB7XHJcbiAgICBjb25zdCBwbHVnaW5DbGFzcyA9IHRoaXMubWFwUGx1Z2luKGRlc2NyaXB0aW9uLm5hbWUpXHJcbiAgICBwbHVnaW5DbGFzcy5zZXR1cChkZXNjcmlwdGlvbiwgcGFyYW1ldGVycylcclxuICAgIHJldHVybiBwbHVnaW5DbGFzc1xyXG4gIH1cclxuICBkb2NrV2luZG93KHduZDogV2luZG93SW5zdGFuY2UsIGRvY2tJZDogRG9ja0lELCBmb3JlZ3JvdW5kOiBib29sZWFuKSB7XHJcbiAgICB0aGlzLmZyYW1lICYmIHRoaXMuZnJhbWUuYXR0YWNoV2luZG93KHduZC5pZCwgZG9ja0lkLCBmb3JlZ3JvdW5kKVxyXG4gIH1cclxuICBkZXR0YWNoV2luZG93KHdpbmRvd0lkOiBXaW5kb3dJRCkge1xyXG4gICAgdGhpcy5mcmFtZSAmJiB0aGlzLmZyYW1lLmRldHRhY2hXaW5kb3cod2luZG93SWQpXHJcbiAgfVxyXG4gIHJlbW92ZVdpbmRvdyh3aW5kb3dJZDogV2luZG93SUQpIHtcclxuICAgIGNvbnN0IHduZCA9IHRoaXMud2luZG93c1t3aW5kb3dJZF1cclxuICAgIHRoaXMuZGV0dGFjaFdpbmRvdyh3aW5kb3dJZClcclxuICAgIGRlbGV0ZSB0aGlzLndpbmRvd3Nbd2luZG93SWRdXHJcbiAgICB3bmQuY2xvc2UoKVxyXG4gIH1cclxuICBvcGVuU3ViV2luZG93KHdpbmRvd0NsYXNzOiBXaW5kb3dDbGFzcywgcGFyZW50OiBXaW5kb3dJbnN0YW5jZSwgb3B0aW9uczogV2luZG93T3B0aW9ucykge1xyXG4gICAgaWYgKHdpbmRvd0NsYXNzICYmIHBhcmVudCkge1xyXG4gICAgICBsZXQgd25kID0gKG9wdGlvbnMgJiYgb3B0aW9ucy5vcGVuTmV3KSA/IG51bGwgOiB0aGlzLmZpbmRPbmVXaW5kb3dCeUNsYXNzKHdpbmRvd0NsYXNzKVxyXG4gICAgICBpZiAoIXduZCkge1xyXG4gICAgICAgIHduZCA9IG5ldyBXaW5kb3dJbnN0YW5jZShcIiNcIiArICh0aGlzLnVpZEdlbmVyYXRvcisrKSwgd2luZG93Q2xhc3MsIHBhcmVudCwgcGFyZW50LnBsdWdpbiwgb3B0aW9ucyB8fCB7fSlcclxuICAgICAgfVxyXG4gICAgICBlbHNlIHtcclxuICAgICAgICBvcHRpb25zICYmIHduZC51cGRhdGVPcHRpb25zKG9wdGlvbnMpXHJcbiAgICAgIH1cclxuICAgICAgdGhpcy5kb2NrV2luZG93KHduZCwgd25kLmRvY2tJZCwgdHJ1ZSlcclxuICAgIH1cclxuICB9XHJcbiAgb3BlblBsdWdpbldpbmRvdyh3aW5kb3dDbGFzczogV2luZG93Q2xhc3MsIHBsdWdpbjogUGx1Z2luQ29tcG9uZW50LCBvcHRpb25zOiBXaW5kb3dPcHRpb25zKSB7XHJcbiAgICBpZiAod2luZG93Q2xhc3MpIHtcclxuICAgICAgbGV0IHduZCA9IChvcHRpb25zICYmIG9wdGlvbnMub3Blbk5ldykgPyBudWxsIDogdGhpcy5maW5kT25lV2luZG93QnlDbGFzcyh3aW5kb3dDbGFzcylcclxuICAgICAgaWYgKCF3bmQpIHtcclxuICAgICAgICB3bmQgPSBuZXcgV2luZG93SW5zdGFuY2UoXCIjXCIgKyAodGhpcy51aWRHZW5lcmF0b3IrKyksIHdpbmRvd0NsYXNzLCBudWxsLCBwbHVnaW4sIG9wdGlvbnMgfHwge30pXHJcbiAgICAgIH1cclxuICAgICAgZWxzZSB7XHJcbiAgICAgICAgb3B0aW9ucyAmJiB3bmQudXBkYXRlT3B0aW9ucyhvcHRpb25zKVxyXG4gICAgICB9XHJcbiAgICAgIHRoaXMuZG9ja1dpbmRvdyh3bmQsIHduZC5kb2NrSWQsIHRydWUpXHJcbiAgICB9XHJcbiAgfVxyXG4gIGNsb3NlUGx1Z2luV2luZG93cyh3aW5kb3dDbGFzczogV2luZG93Q2xhc3MsIHBsdWdpbjogUGx1Z2luQ29tcG9uZW50KSB7XHJcbiAgICBsZXQgd2luZG93c1xyXG4gICAgaWYgKHdpbmRvd0NsYXNzKSB3aW5kb3dzID0gdGhpcy5maW5kQWxsV2luZG93c0J5Q2xhc3Mod2luZG93Q2xhc3MpXHJcbiAgICBlbHNlIHdpbmRvd3MgPSB0aGlzLmZpbmRBbGxXaW5kb3dzQnlQbHVnaW4ocGx1Z2luKVxyXG4gICAgd2luZG93cy5mb3JFYWNoKHduZCA9PiB0aGlzLnJlbW92ZVdpbmRvdyh3bmQuaWQpKVxyXG4gIH1cclxuICBnZXRXaW5kb3dJbnN0YW5jZSh3aW5kb3dJZDogV2luZG93SUQpIHtcclxuICAgIHJldHVybiB0aGlzLndpbmRvd3Nbd2luZG93SWRdXHJcbiAgfVxyXG4gIGZpbmRPbmVXaW5kb3dCeUNsYXNzKHdpbmRvd0NsYXNzOiBXaW5kb3dDbGFzcyk6IFdpbmRvd0luc3RhbmNlIHtcclxuICAgIGxldCB3aW5kb3dJZFxyXG4gICAgZm9yICh3aW5kb3dJZCBpbiB0aGlzLndpbmRvd3MpIHtcclxuICAgICAgaWYgKHRoaXMud2luZG93c1t3aW5kb3dJZF0ud2luZG93Q2xhc3MgPT09IHdpbmRvd0NsYXNzKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMud2luZG93c1t3aW5kb3dJZF1cclxuICAgICAgfVxyXG4gICAgfVxyXG4gICAgcmV0dXJuIG51bGxcclxuICB9XHJcbiAgZmluZEFsbFdpbmRvd3NCeVBsdWdpbihwbHVnaW46IFBsdWdpbkNvbXBvbmVudCk6IEFycmF5PFdpbmRvd0luc3RhbmNlPiB7XHJcbiAgICBjb25zdCB3aW5kb3dzID0gW11cclxuICAgIGlmIChwbHVnaW4pIHtcclxuICAgICAgbGV0IHdpbmRvd0lkXHJcbiAgICAgIGZvciAod2luZG93SWQgaW4gdGhpcy53aW5kb3dzKSB7XHJcbiAgICAgICAgaWYgKHRoaXMud2luZG93c1t3aW5kb3dJZF0ucGx1Z2luID09PSBwbHVnaW4pIHtcclxuICAgICAgICAgIHdpbmRvd3MucHVzaCh0aGlzLndpbmRvd3Nbd2luZG93SWRdKVxyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgfVxyXG4gICAgcmV0dXJuIHdpbmRvd3NcclxuICB9XHJcbiAgZmluZEFsbFdpbmRvd3NCeUNsYXNzKHdpbmRvd0NsYXNzOiBXaW5kb3dDbGFzcyk6IEFycmF5PFdpbmRvd0luc3RhbmNlPiB7XHJcbiAgICBpZiAod2luZG93Q2xhc3MpIHtcclxuICAgICAgbGV0IHdpbmRvd0lkXHJcbiAgICAgIGNvbnN0IHdpbmRvd3MgPSBbXVxyXG4gICAgICBmb3IgKHdpbmRvd0lkIGluIHRoaXMud2luZG93cykge1xyXG4gICAgICAgIGlmICh0aGlzLndpbmRvd3Nbd2luZG93SWRdLndpbmRvd0NsYXNzID09PSB3aW5kb3dDbGFzcykge1xyXG4gICAgICAgICAgd2luZG93cy5wdXNoKHRoaXMud2luZG93c1t3aW5kb3dJZF0pXHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICAgIHJldHVybiB3aW5kb3dzXHJcbiAgICB9XHJcbiAgICBlbHNlIHtcclxuICAgICAgcmV0dXJuIHRoaXMud2luZG93cy52YWx1ZXMoKVxyXG4gICAgfVxyXG4gIH1cclxufVxyXG4iXX0=