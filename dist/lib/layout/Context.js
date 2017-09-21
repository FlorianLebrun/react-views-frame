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

      // Instancing plugins
      pluginNames.forEach(function (name) {
        _this.plugins[name] = _this.pluginClasses[name].createInstance();
      });

      // Connect plugins
      pluginNames.forEach(function (name) {
        _this.pluginClasses[name].mountInstance(_this.plugins[name], _this);
      });

      // Finalize plugins mount
      pluginNames.forEach(function (name) {
        _this.plugins[name].pluginDidMount();
      });
    };

    this.unmountPlugins = function () {
      Object.keys(_this.plugins).forEach(function (name) {
        var plugin = _this.plugins[name];
        plugin.pluginWillUnmount();
      });
    };

    this.application = application;
    _Plugin.PluginInstance.prototype.layout = this;
    _Window.WindowInstance.prototype.layout = this;
    _Plugin.PluginInstance.prototype.application = application;
    _Window.WindowInstance.prototype.application = application;
    window.addEventListener("beforeunload", this.unmountPlugins);
  }

  _createClass(PluginContext, [{
    key: "registerFrame",
    value: function registerFrame(frame) {
      var prevFrame = this.frame;
      if (!frame && prevFrame) {
        this.unmountPlugins();
      }
      this.frame = frame;
      if (frame && !prevFrame) {
        this.mountPlugins();
      }
    }
  }, {
    key: "configureLayout",
    value: function configureLayout(description) {
      this.splashComponent = description.splashComponent;
      this.displayLayout = description.displayLayout;
    }
  }, {
    key: "installPlugin",
    value: function installPlugin(description, parameters) {
      var pluginClass = new _Plugin.PluginClass(description, parameters, this);
      this.pluginClasses[description.name] = pluginClass;
      if (this.windowLoaded) {
        var plugin = pluginClass.createInstance();
        this.plugins[pluginClass.name] = plugin;
        plugin.pluginWillMount(parameters);
        plugin.pluginDidMount();
      }
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
      var _this2 = this;

      var windows = void 0;
      if (windowClass) windows = this.findAllWindowsByClass(windowClass);else windows = this.findAllWindowsByPlugin(plugin);
      windows.forEach(function (wnd) {
        return _this2.removeWindow(wnd.id);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9saWIvbGF5b3V0L0NvbnRleHQuanMiXSwibmFtZXMiOlsiUGx1Z2luQ29udGV4dCIsImFwcGxpY2F0aW9uIiwicGx1Z2luQ2xhc3NlcyIsInBsdWdpbnMiLCJ3aW5kb3dzIiwiZG9ja3MiLCJmcmFtZSIsIndpbmRvd0xvYWRlZCIsInVpZEdlbmVyYXRvciIsIm1vdW50UGx1Z2lucyIsInBsdWdpbk5hbWVzIiwiT2JqZWN0Iiwia2V5cyIsImZvckVhY2giLCJuYW1lIiwiY3JlYXRlSW5zdGFuY2UiLCJtb3VudEluc3RhbmNlIiwicGx1Z2luRGlkTW91bnQiLCJ1bm1vdW50UGx1Z2lucyIsInBsdWdpbiIsInBsdWdpbldpbGxVbm1vdW50IiwicHJvdG90eXBlIiwibGF5b3V0Iiwid2luZG93IiwiYWRkRXZlbnRMaXN0ZW5lciIsInByZXZGcmFtZSIsImRlc2NyaXB0aW9uIiwic3BsYXNoQ29tcG9uZW50IiwiZGlzcGxheUxheW91dCIsInBhcmFtZXRlcnMiLCJwbHVnaW5DbGFzcyIsInBsdWdpbldpbGxNb3VudCIsInduZCIsImRvY2tJZCIsImZvcmVncm91bmQiLCJhdHRhY2hXaW5kb3ciLCJpZCIsIndpbmRvd0lkIiwiZGV0dGFjaFdpbmRvdyIsImNsb3NlIiwid2luZG93Q2xhc3MiLCJwYXJlbnQiLCJvcHRpb25zIiwib3Blbk5ldyIsImZpbmRPbmVXaW5kb3dCeUNsYXNzIiwidXBkYXRlT3B0aW9ucyIsImRvY2tXaW5kb3ciLCJmaW5kQWxsV2luZG93c0J5Q2xhc3MiLCJmaW5kQWxsV2luZG93c0J5UGx1Z2luIiwicmVtb3ZlV2luZG93IiwicHVzaCIsInZhbHVlcyJdLCJtYXBwaW5ncyI6Ijs7Ozs7OztxakJBQUE7OztBQUNBOztBQUNBOzs7O0lBRWFBLGEsV0FBQUEsYTtBQVlYLHlCQUFZQyxXQUFaLEVBQXlCO0FBQUE7O0FBQUE7O0FBQUEsU0FYekJDLGFBV3lCLEdBWGtCLEVBV2xCO0FBQUEsU0FWekJDLE9BVXlCLEdBVmUs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QUE4QztBQUM1Q2Ysb0JBQVE4QyxJQUFSLENBQWEsS0FBSzlDLE9BQUwsQ0FBYWlDLFFBQWIsQ0FBYjtBQUNEO0FBQ0Y7QUFDRjtBQUNELGFBQU9qQyxPQUFQO0FBQ0Q7OzswQ0FDcUJvQyxXLEVBQWlEO0FBQ3JFLFVBQUlBLFdBQUosRUFBaUI7QUFDZixZQUFJSCxpQkFBSjtBQUNBLFlBQU1qQyxVQUFVLEVBQWhCO0FBQ0EsYUFBS2lDLFFBQUwsSUFBaUIsS0FBS2pDLE9BQXRCLEVBQStCO0FBQzdCLGNBQUksS0FBS0EsT0FBTCxDQUFhaUMsUUFBYixFQUF1QkcsV0FBdkIsS0FBdUNBLFdBQTNDLEVBQXdEO0FBQ3REcEMsb0JBQVE4QyxJQUFSLENBQWEsS0FBSzlDLE9BQUwsQ0FBYWlDLFFBQWIsQ0FBYjtBQUNEO0FBQ0Y7QUFDRCxlQUFPakMsT0FBUDtBQUNELE9BVEQsTUFVSztBQUNILGVBQU8sS0FBS0EsT0FBTCxDQUFhK0MsTUFBYixFQUFQO0FBQ0Q7QUFDRiIsImZpbGUiOiJDb250ZXh0LmpzIiwic291cmNlc0NvbnRlbnQiOlsiLyogZXNsaW50LWRpc2FibGUgcmVhY3Qvbm8tbXVsdGktY29tcCAqL1xyXG5pbXBvcnQgeyBQbHVnaW5JbnN0YW5jZSwgUGx1Z2luQ2xhc3MgfSBmcm9tIFwiLi9QbHVnaW5cIlxyXG5pbXBvcnQgeyBXaW5kb3dJbnN0YW5jZSwgV2luZG93Q2xhc3MsIFdpbmRvd0lEIH0gZnJvbSBcIi4vV2luZG93XCJcclxuXHJcbmV4cG9ydCBjbGFzcyBQbHVnaW5Db250ZXh0IHtcclxuICBwbHVnaW5DbGFzc2VzOiB7IFtzdHJpbmddOiBQbHVnaW5DbGFzcyB9ID0ge31cclxuICBwbHVnaW5zOiB7IFtzdHJpbmddOiBQbHVnaW5JbnN0YW5jZSB9ID0ge31cclxuICB3aW5kb3dzOiB7IFtzdHJpbmddOiBXaW5kb3dJbnN0YW5jZSB9ID0ge31cclxuICBkb2NrczogeyBbc3RyaW5nXTogQXJyYXk8V2luZG93SW5zdGFuY2U+IH0gPSB7fVxyXG4gIGZyYW1lOiBGcmFtZSA9IG51bGxcclxuICBhcHBsaWNhdGlvbjogT2JqZWN0ID0gbnVsbFxyXG5cclxuICBkaXNwbGF5TGF5b3V0OiBPYmplY3RcclxuICB3aW5kb3dMb2FkZWQ6IGJvb2xlYW4gPSBmYWxzZVxyXG4gIHVpZEdlbmVyYXRvcjogbnVtYmVyID0gMFxyXG5cclxuICBjb25zdHJ1Y3RvcihhcHBsaWNhdGlvbikge1xyXG4gICAgdGhpcy5hcHBsaWNhdGlvbiA9IGFwcGxpY2F0aW9uXHJcbiAgICBQbHVnaW5JbnN0YW5jZS5wcm90b3R5cGUubGF5b3V0ID0gdGhpc1xyXG4gICAgV2luZG93SW5zdGFuY2UucHJvdG90eXBlLmxheW91dCA9IHRoaXNcclxuICAgIFBsdWdpbkluc3RhbmNlLnByb3RvdHlwZS5hcHBsaWNhdGlvbiA9IGFwcGxpY2F0aW9uXHJcbiAgICBXaW5kb3dJbnN0YW5jZS5wcm90b3R5cGUuYXBwbGljYXRpb24gPSBhcHBsaWNhdGlvblxyXG4gICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoXCJiZWZvcmV1bmxvYWRcIiwgdGhpcy51bm1vdW50UGx1Z2lucylcclxuICB9XHJcbiAgcmVnaXN0ZXJGcmFtZShmcmFtZTogRnJhbWUpIHtcclxuICAgIGNvbnN0IHByZXZGcmFtZSA9IHRoaXMuZnJhbWVcclxuICAgIGlmICghZnJhbWUgJiYgcHJldkZyYW1lKSB7XHJcbiAgICAgIHRoaXMudW5tb3VudFBsdWdpbnMoKVxyXG4gICAgfVxyXG4gICAgdGhpcy5mcmFtZSA9IGZyYW1lXHJcbiAgICBpZiAoZnJhbWUgJiYgIXByZXZGcmFtZSkge1xyXG4gICAgICB0aGlzLm1vdW50UGx1Z2lucygpXHJcbiAgICB9XHJcbiAgfVxyXG4gIG1vdW50UGx1Z2lucyA9ICgpID0+IHtcclxuICAgIHRoaXMud2luZG93TG9hZGVkID0gdHJ1ZVxyXG4gICAgY29uc3QgcGx1Z2luTmFtZXMgPSBPYmplY3Qua2V5cyh0aGlzLnBsdWdpbkNsYXNzZXMpXHJcblxyXG4gICAgLy8gSW5zdGFuY2luZyBwbHVnaW5zXHJcbiAgICBwbHVnaW5OYW1lcy5mb3JFYWNoKG5hbWUgPT4ge1xyXG4gICAgICB0aGlzLnBsdWdpbnNbbmFtZV0gPSB0aGlzLnBsdWdpbkNsYXNzZXNbbmFtZV0uY3JlYXRlSW5zdGFuY2UoKVxyXG4gICAgfSlcclxuXHJcbiAgICAvLyBDb25uZWN0IHBsdWdpbnNcclxuICAgIHBsdWdpbk5hbWVzLmZvckVhY2gobmFtZSA9PiB7XHJcbiAgICAgIHRoaXMucGx1Z2luQ2xhc3Nlc1tuYW1lXS5tb3VudEluc3RhbmNlKHRoaXMucGx1Z2luc1tuYW1lXSwgdGhpcylcclxuICAgIH0pXHJcblxyXG4gICAgLy8gRmluYWxpemUgcGx1Z2lucyBtb3VudFxyXG4gICAgcGx1Z2luTmFtZXMuZm9yRWFjaChuYW1lID0+IHtcclxuICAgICAgdGhpcy5wbHVnaW5zW25hbWVdLnBsdWdpbkRpZE1vdW50KClcclxuICAgIH0pXHJcbiAgfVxyXG4gIHVubW91bnRQbHVnaW5zID0gKCkgPT4ge1xyXG4gICAgT2JqZWN0LmtleXModGhpcy5wbHVnaW5zKS5mb3JFYWNoKG5hbWUgPT4ge1xyXG4gICAgICBjb25zdCBwbHVnaW4gPSB0aGlzLnBsdWdpbnNbbmFtZV1cclxuICAgICAgcGx1Z2luLnBsdWdpbldpbGxVbm1vdW50KClcclxuICAgIH0pXHJcbiAgfVxyXG4gIGNvbmZpZ3VyZUxheW91dChkZXNjcmlwdGlvbjogT2JqZWN0KSB7XHJcbiAgICB0aGlzLnNwbGFzaENvbXBvbmVudCA9IGRlc2NyaXB0aW9uLnNwbGFzaENvbXBvbmVudFxyXG4gICAgdGhpcy5kaXNwbGF5TGF5b3V0ID0gZGVzY3JpcHRpb24uZGlzcGxheUxheW91dFxyXG4gIH1cclxuICBpbnN0YWxsUGx1Z2luKGRlc2NyaXB0aW9uOiBPYmplY3QsIHBhcmFtZXRlcnM6IE9iamVjdCk6IFBsdWdpbkNsYXNzIHtcclxuICAgIGNvbnN0IHBsdWdpbkNsYXNzID0gbmV3IFBsdWdpbkNsYXNzKGRlc2NyaXB0aW9uLCBwYXJhbWV0ZXJzLCB0aGlzKVxyXG4gICAgdGhpcy5wbHVnaW5DbGFzc2VzW2Rlc2NyaXB0aW9uLm5hbWVdID0gcGx1Z2luQ2xhc3NcclxuICAgIGlmICh0aGlzLndpbmRvd0xvYWRlZCkge1xyXG4gICAgICBjb25zdCBwbHVnaW4gPSBwbHVnaW5DbGFzcy5jcmVhdGVJbnN0YW5jZSgpXHJcbiAgICAgIHRoaXMucGx1Z2luc1twbHVnaW5DbGFzcy5uYW1lXSA9IHBsdWdpblxyXG4gICAgICBwbHVnaW4ucGx1Z2luV2lsbE1vdW50KHBhcmFtZXRlcnMpXHJcbiAgICAgIHBsdWdpbi5wbHVnaW5EaWRNb3VudCgpXHJcbiAgICB9XHJcbiAgICByZXR1cm4gcGx1Z2luQ2xhc3NcclxuICB9XHJcbiAgZG9ja1dpbmRvdyh3bmQ6IFdpbmRvd0luc3RhbmNlLCBkb2NrSWQ6IERvY2tJRCwgZm9yZWdyb3VuZDogYm9vbGVhbikge1xyXG4gICAgdGhpcy5mcmFtZSAmJiB0aGlzLmZyYW1lLmF0dGFjaFdpbmRvdyh3bmQuaWQsIGRvY2tJZCwgZm9yZWdyb3VuZClcclxuICB9XHJcbiAgZGV0dGFjaFdpbmRvdyh3aW5kb3dJZDogV2luZG93SUQpIHtcclxuICAgIHRoaXMuZnJhbWUgJiYgdGhpcy5mcmFtZS5kZXR0YWNoV2luZG93KHdpbmRvd0lkKVxyXG4gIH1cclxuICByZW1vdmVXaW5kb3cod2luZG93SWQ6IFdpbmRvd0lEKSB7XHJcbiAgICBjb25zdCB3bmQgPSB0aGlzLndpbmRvd3Nbd2luZG93SWRdXHJcbiAgICB0aGlzLmRldHRhY2hXaW5kb3cod2luZG93SWQpXHJcbiAgICBkZWxldGUgdGhpcy53aW5kb3dzW3dpbmRvd0lkXVxyXG4gICAgd25kLmNsb3NlKClcclxuICB9XHJcbiAgb3BlblN1YldpbmRvdyh3aW5kb3dDbGFzczogV2luZG93Q2xhc3MsIHBhcmVudDogV2luZG93SW5zdGFuY2UsIG9wdGlvbnM6IFdpbmRvd09wdGlvbnMpIHtcclxuICAgIGlmICh3aW5kb3dDbGFzcyAmJiBwYXJlbnQpIHtcclxuICAgICAgbGV0IHduZCA9IChvcHRpb25zICYmIG9wdGlvbnMub3Blbk5ldykgPyBudWxsIDogdGhpcy5maW5kT25lV2luZG93QnlDbGFzcyh3aW5kb3dDbGFzcylcclxuICAgICAgaWYgKCF3bmQpIHtcclxuICAgICAgICB3bmQgPSBuZXcgV2luZG93SW5zdGFuY2UoXCIjXCIgKyAodGhpcy51aWRHZW5lcmF0b3IrKyksIHdpbmRvd0NsYXNzLCBwYXJlbnQsIHBhcmVudC5wbHVnaW4sIG9wdGlvbnMgfHwge30pXHJcbiAgICAgIH1cclxuICAgICAgZWxzZSB7XHJcbiAgICAgICAgb3B0aW9ucyAmJiB3bmQudXBkYXRlT3B0aW9ucyhvcHRpb25zKVxyXG4gICAgICB9XHJcbiAgICAgIHRoaXMuZG9ja1dpbmRvdyh3bmQsIHduZC5kb2NrSWQsIHRydWUpXHJcbiAgICB9XHJcbiAgfVxyXG4gIG9wZW5QbHVnaW5XaW5kb3cod2luZG93Q2xhc3M6IFdpbmRvd0NsYXNzLCBwbHVnaW46IFBsdWdpbkluc3RhbmNlLCBvcHRpb25zOiBXaW5kb3dPcHRpb25zKSB7XHJcbiAgICBpZiAod2luZG93Q2xhc3MpIHtcclxuICAgICAgbGV0IHduZCA9IChvcHRpb25zICYmIG9wdGlvbnMub3Blbk5ldykgPyBudWxsIDogdGhpcy5maW5kT25lV2luZG93QnlDbGFzcyh3aW5kb3dDbGFzcylcclxuICAgICAgaWYgKCF3bmQpIHtcclxuICAgICAgICB3bmQgPSBuZXcgV2luZG93SW5zdGFuY2UoXCIjXCIgKyAodGhpcy51aWRHZW5lcmF0b3IrKyksIHdpbmRvd0NsYXNzLCBudWxsLCBwbHVnaW4sIG9wdGlvbnMgfHwge30pXHJcbiAgICAgIH1cclxuICAgICAgZWxzZSB7XHJcbiAgICAgICAgb3B0aW9ucyAmJiB3bmQudXBkYXRlT3B0aW9ucyhvcHRpb25zKVxyXG4gICAgICB9XHJcbiAgICAgIHRoaXMuZG9ja1dpbmRvdyh3bmQsIHduZC5kb2NrSWQsIHRydWUpXHJcbiAgICB9XHJcbiAgfVxyXG4gIGNsb3NlUGx1Z2luV2luZG93cyh3aW5kb3dDbGFzczogV2luZG93Q2xhc3MsIHBsdWdpbjogUGx1Z2luSW5zdGFuY2UpIHtcclxuICAgIGxldCB3aW5kb3dzXHJcbiAgICBpZiAod2luZG93Q2xhc3MpIHdpbmRvd3MgPSB0aGlzLmZpbmRBbGxXaW5kb3dzQnlDbGFzcyh3aW5kb3dDbGFzcylcclxuICAgIGVsc2Ugd2luZG93cyA9IHRoaXMuZmluZEFsbFdpbmRvd3NCeVBsdWdpbihwbHVnaW4pXHJcbiAgICB3aW5kb3dzLmZvckVhY2god25kID0+IHRoaXMucmVtb3ZlV2luZG93KHduZC5pZCkpXHJcbiAgfVxyXG4gIGdldFdpbmRvd0luc3RhbmNlKHdpbmRvd0lkOiBXaW5kb3dJRCkge1xyXG4gICAgcmV0dXJuIHRoaXMud2luZG93c1t3aW5kb3dJZF1cclxuICB9XHJcbiAgZmluZE9uZVdpbmRvd0J5Q2xhc3Mod2luZG93Q2xhc3M6IFdpbmRvd0NsYXNzKTogV2luZG93SW5zdGFuY2Uge1xyXG4gICAgbGV0IHdpbmRvd0lkXHJcbiAgICBmb3IgKHdpbmRvd0lkIGluIHRoaXMud2luZG93cykge1xyXG4gICAgICBpZiAodGhpcy53aW5kb3dzW3dpbmRvd0lkXS53aW5kb3dDbGFzcyA9PT0gd2luZG93Q2xhc3MpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy53aW5kb3dzW3dpbmRvd0lkXVxyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgICByZXR1cm4gbnVsbFxyXG4gIH1cclxuICBmaW5kQWxsV2luZG93c0J5UGx1Z2luKHBsdWdpbjogUGx1Z2luSW5zdGFuY2UpOiBBcnJheTxXaW5kb3dJbnN0YW5jZT4ge1xyXG4gICAgY29uc3Qgd2luZG93cyA9IFtdXHJcbiAgICBpZiAocGx1Z2luKSB7XHJcbiAgICAgIGxldCB3aW5kb3dJZFxyXG4gICAgICBmb3IgKHdpbmRvd0lkIGluIHRoaXMud2luZG93cykge1xyXG4gICAgICAgIGlmICh0aGlzLndpbmRvd3Nbd2luZG93SWRdLnBsdWdpbiA9PT0gcGx1Z2luKSB7XHJcbiAgICAgICAgICB3aW5kb3dzLnB1c2godGhpcy53aW5kb3dzW3dpbmRvd0lkXSlcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgIH1cclxuICAgIHJldHVybiB3aW5kb3dzXHJcbiAgfVxyXG4gIGZpbmRBbGxXaW5kb3dzQnlDbGFzcyh3aW5kb3dDbGFzczogV2luZG93Q2xhc3MpOiBBcnJheTxXaW5kb3dJbnN0YW5jZT4ge1xyXG4gICAgaWYgKHdpbmRvd0NsYXNzKSB7XHJcbiAgICAgIGxldCB3aW5kb3dJZFxyXG4gICAgICBjb25zdCB3aW5kb3dzID0gW11cclxuICAgICAgZm9yICh3aW5kb3dJZCBpbiB0aGlzLndpbmRvd3MpIHtcclxuICAgICAgICBpZiAodGhpcy53aW5kb3dzW3dpbmRvd0lkXS53aW5kb3dDbGFzcyA9PT0gd2luZG93Q2xhc3MpIHtcclxuICAgICAgICAgIHdpbmRvd3MucHVzaCh0aGlzLndpbmRvd3Nbd2luZG93SWRdKVxyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgICByZXR1cm4gd2luZG93c1xyXG4gICAgfVxyXG4gICAgZWxzZSB7XHJcbiAgICAgIHJldHVybiB0aGlzLndpbmRvd3MudmFsdWVzKClcclxuICAgIH1cclxuICB9XHJcbn1cclxuIl19