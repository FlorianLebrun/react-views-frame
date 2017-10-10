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
      this.frame = frame;
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9saWIvbGF5b3V0L0NvbnRleHQuanMiXSwibmFtZXMiOlsiUGx1Z2luQ29udGV4dCIsImFwcGxpY2F0aW9uIiwicGx1Z2luQ2xhc3NlcyIsInBsdWdpbnMiLCJ3aW5kb3dzIiwiZG9ja3MiLCJmcmFtZSIsIndpbmRvd0xvYWRlZCIsInVpZEdlbmVyYXRvciIsIm1vdW50UGx1Z2lucyIsInBsdWdpbk5hbWVzIiwiT2JqZWN0Iiwia2V5cyIsImZvckVhY2giLCJuYW1lIiwid2lsbE1vdW50IiwiZGlkTW91bnQiLCJ1bm1vdW50UGx1Z2lucyIsInBsdWdpbiIsInBsdWdpbldpbGxVbm1vdW50IiwicHJvdG90eXBlIiwibGF5b3V0Iiwid2luZG93IiwiYWRkRXZlbnRMaXN0ZW5lciIsImRlc2NyaXB0aW9uIiwic3BsYXNoQ29tcG9uZW50IiwiZGlzcGxheUxheW91dCIsInBsdWdpbkNsYXNzIiwicGFyYW1ldGVycyIsIm1hcFBsdWdpbiIsInNldHVwIiwid25kIiwiZG9ja0lkIiwiZm9yZWdyb3VuZCIsImF0dGFjaFdpbmRvdyIsImlkIiwid2luZG93SWQiLCJkZXR0YWNoV2luZG93IiwiY2xvc2UiLCJ3aW5kb3dDbGFzcyIsInBhcmVudCIsIm9wdGlvbnMiLCJvcGVuTmV3IiwiZmluZE9uZVdpbmRvd0J5Q2xhc3MiLCJ1cGRhdGVPcHRpb25zIiwiZG9ja1dpbmRvdyIsImZpbmRBbGxXaW5kb3dzQnlDbGFzcyIsImZpbmRBbGxXaW5kb3dzQnlQbHVnaW4iLCJyZW1vdmVXaW5kb3ciLCJwdXNoIiwidmFsdWVzIl0sIm1hcHBpbmdzIjoiOzs7Ozs7O3FqQkFBQTs7O0FBQ0E7O0FBQ0E7Ozs7SUFFYUEsYSxXQUFBQSxhO0FBWVgseUJBQVlDLFdBQVosRUFBeUI7QUFBQTs7QUFBQTs7QUFBQSxTQVh6QkMsYUFXeUIsR0FYa0IsRUFXbEI7QUFBQSxTQVZ6QkMsT0FVeUIsR0FWZ0IsRUFVaEI7QUFBQSxTQVR6QkMsT0FTeUIsR0FUZSxFQVNmO0FB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N0MsT0FBTCxDQUFhZ0MsUUFBYixDQUFiO0FBQ0Q7QUFDRjtBQUNELGVBQU9oQyxPQUFQO0FBQ0QsT0FURCxNQVVLO0FBQ0gsZUFBTyxLQUFLQSxPQUFMLENBQWE4QyxNQUFiLEVBQVA7QUFDRDtBQUNGIiwiZmlsZSI6IkNvbnRleHQuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvKiBlc2xpbnQtZGlzYWJsZSByZWFjdC9uby1tdWx0aS1jb21wICovXHJcbmltcG9ydCB7IFBsdWdpbkNvbXBvbmVudCwgUGx1Z2luQ2xhc3MgfSBmcm9tIFwiLi9QbHVnaW5cIlxyXG5pbXBvcnQgeyBXaW5kb3dJbnN0YW5jZSwgV2luZG93Q2xhc3MsIFdpbmRvd0lEIH0gZnJvbSBcIi4vV2luZG93XCJcclxuXHJcbmV4cG9ydCBjbGFzcyBQbHVnaW5Db250ZXh0IHtcclxuICBwbHVnaW5DbGFzc2VzOiB7IFtzdHJpbmddOiBQbHVnaW5DbGFzcyB9ID0ge31cclxuICBwbHVnaW5zOiB7IFtzdHJpbmddOiBQbHVnaW5Db21wb25lbnQgfSA9IHt9XHJcbiAgd2luZG93czogeyBbc3RyaW5nXTogV2luZG93SW5zdGFuY2UgfSA9IHt9XHJcbiAgZG9ja3M6IHsgW3N0cmluZ106IEFycmF5PFdpbmRvd0luc3RhbmNlPiB9ID0ge31cclxuICBmcmFtZTogRnJhbWUgPSBudWxsXHJcbiAgYXBwbGljYXRpb246IE9iamVjdCA9IG51bGxcclxuXHJcbiAgZGlzcGxheUxheW91dDogT2JqZWN0XHJcbiAgd2luZG93TG9hZGVkOiBib29sZWFuID0gZmFsc2VcclxuICB1aWRHZW5lcmF0b3I6IG51bWJlciA9IDBcclxuXHJcbiAgY29uc3RydWN0b3IoYXBwbGljYXRpb24pIHtcclxuICAgIHRoaXMuYXBwbGljYXRpb24gPSBhcHBsaWNhdGlvblxyXG4gICAgUGx1Z2luQ29tcG9uZW50LnByb3RvdHlwZS5sYXlvdXQgPSB0aGlzXHJcbiAgICBQbHVnaW5Db21wb25lbnQucHJvdG90eXBlLmFwcGxpY2F0aW9uID0gYXBwbGljYXRpb25cclxuICAgIFdpbmRvd0luc3RhbmNlLnByb3RvdHlwZS5sYXlvdXQgPSB0aGlzXHJcbiAgICBXaW5kb3dJbnN0YW5jZS5wcm90b3R5cGUuYXBwbGljYXRpb24gPSBhcHBsaWNhdGlvblxyXG4gICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoXCJiZWZvcmV1bmxvYWRcIiwgdGhpcy51bm1vdW50UGx1Z2lucylcclxuICB9XHJcbiAgcmVnaXN0ZXJGcmFtZShmcmFtZTogRnJhbWUpIHtcclxuICAgIHRoaXMuZnJhbWUgPSBmcmFtZVxyXG4gIH1cclxuICBtb3VudFBsdWdpbnMgPSAoKSA9PiB7XHJcbiAgICB0aGlzLndpbmRvd0xvYWRlZCA9IHRydWVcclxuICAgIGNvbnN0IHBsdWdpbk5hbWVzID0gT2JqZWN0LmtleXModGhpcy5wbHVnaW5DbGFzc2VzKVxyXG5cclxuICAgIC8vIENvbm5lY3QgcGx1Z2luc1xyXG4gICAgcGx1Z2luTmFtZXMuZm9yRWFjaChuYW1lID0+IHtcclxuICAgICAgdGhpcy5wbHVnaW5DbGFzc2VzW25hbWVdLndpbGxNb3VudCgpXHJcbiAgICB9KVxyXG5cclxuICAgIC8vIEZpbmFsaXplIHBsdWdpbnMgbW91bnRcclxuICAgIHBsdWdpbk5hbWVzLmZvckVhY2gobmFtZSA9PiB7XHJcbiAgICAgIHRoaXMucGx1Z2luQ2xhc3Nlc1tuYW1lXS5kaWRNb3VudCgpXHJcbiAgICB9KVxyXG4gIH1cclxuICB1bm1vdW50UGx1Z2lucyA9ICgpID0+IHtcclxuICAgIE9iamVjdC5rZXlzKHRoaXMucGx1Z2lucykuZm9yRWFjaChuYW1lID0+IHtcclxuICAgICAgY29uc3QgcGx1Z2luID0gdGhpcy5wbHVnaW5zW25hbWVdXHJcbiAgICAgIHBsdWdpbi5wbHVnaW5XaWxsVW5tb3VudCgpXHJcbiAgICB9KVxyXG4gIH1cclxuICBjb25maWd1cmVMYXlvdXQoZGVzY3JpcHRpb246IE9iamVjdCkge1xyXG4gICAgdGhpcy5zcGxhc2hDb21wb25lbnQgPSBkZXNjcmlwdGlvbi5zcGxhc2hDb21wb25lbnRcclxuICAgIHRoaXMuZGlzcGxheUxheW91dCA9IGRlc2NyaXB0aW9uLmRpc3BsYXlMYXlvdXRcclxuICB9XHJcbiAgbWFwUGx1Z2luKG5hbWUpIHtcclxuICAgIGxldCBwbHVnaW5DbGFzcyA9IHRoaXMucGx1Z2luQ2xhc3Nlc1tuYW1lXVxyXG4gICAgaWYgKCFwbHVnaW5DbGFzcykge1xyXG4gICAgICBwbHVnaW5DbGFzcyA9IG5ldyBQbHVnaW5DbGFzcyhuYW1lLCB0aGlzKVxyXG4gICAgICB0aGlzLnBsdWdpbkNsYXNzZXNbbmFtZV0gPSBwbHVnaW5DbGFzc1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIHBsdWdpbkNsYXNzXHJcbiAgfVxyXG4gIGluc3RhbGxQbHVnaW4oZGVzY3JpcHRpb246IE9iamVjdCwgcGFyYW1ldGVyczogT2JqZWN0KTogUGx1Z2luQ2xhc3Mge1xyXG4gICAgY29uc3QgcGx1Z2luQ2xhc3MgPSB0aGlzLm1hcFBsdWdpbihkZXNjcmlwdGlvbi5uYW1lKVxyXG4gICAgcGx1Z2luQ2xhc3Muc2V0dXAoZGVzY3JpcHRpb24sIHBhcmFtZXRlcnMpXHJcbiAgICByZXR1cm4gcGx1Z2luQ2xhc3NcclxuICB9XHJcbiAgZG9ja1dpbmRvdyh3bmQ6IFdpbmRvd0luc3RhbmNlLCBkb2NrSWQ6IERvY2tJRCwgZm9yZWdyb3VuZDogYm9vbGVhbikge1xyXG4gICAgdGhpcy5mcmFtZSAmJiB0aGlzLmZyYW1lLmF0dGFjaFdpbmRvdyh3bmQuaWQsIGRvY2tJZCwgZm9yZWdyb3VuZClcclxuICB9XHJcbiAgZGV0dGFjaFdpbmRvdyh3aW5kb3dJZDogV2luZG93SUQpIHtcclxuICAgIHRoaXMuZnJhbWUgJiYgdGhpcy5mcmFtZS5kZXR0YWNoV2luZG93KHdpbmRvd0lkKVxyXG4gIH1cclxuICByZW1vdmVXaW5kb3cod2luZG93SWQ6IFdpbmRvd0lEKSB7XHJcbiAgICBjb25zdCB3bmQgPSB0aGlzLndpbmRvd3Nbd2luZG93SWRdXHJcbiAgICB0aGlzLmRldHRhY2hXaW5kb3cod2luZG93SWQpXHJcbiAgICBkZWxldGUgdGhpcy53aW5kb3dzW3dpbmRvd0lkXVxyXG4gICAgd25kLmNsb3NlKClcclxuICB9XHJcbiAgb3BlblN1YldpbmRvdyh3aW5kb3dDbGFzczogV2luZG93Q2xhc3MsIHBhcmVudDogV2luZG93SW5zdGFuY2UsIG9wdGlvbnM6IFdpbmRvd09wdGlvbnMpIHtcclxuICAgIGlmICh3aW5kb3dDbGFzcyAmJiBwYXJlbnQpIHtcclxuICAgICAgbGV0IHduZCA9IChvcHRpb25zICYmIG9wdGlvbnMub3Blbk5ldykgPyBudWxsIDogdGhpcy5maW5kT25lV2luZG93QnlDbGFzcyh3aW5kb3dDbGFzcylcclxuICAgICAgaWYgKCF3bmQpIHtcclxuICAgICAgICB3bmQgPSBuZXcgV2luZG93SW5zdGFuY2UoXCIjXCIgKyAodGhpcy51aWRHZW5lcmF0b3IrKyksIHdpbmRvd0NsYXNzLCBwYXJlbnQsIHBhcmVudC5wbHVnaW4sIG9wdGlvbnMgfHwge30pXHJcbiAgICAgIH1cclxuICAgICAgZWxzZSB7XHJcbiAgICAgICAgb3B0aW9ucyAmJiB3bmQudXBkYXRlT3B0aW9ucyhvcHRpb25zKVxyXG4gICAgICB9XHJcbiAgICAgIHRoaXMuZG9ja1dpbmRvdyh3bmQsIHduZC5kb2NrSWQsIHRydWUpXHJcbiAgICB9XHJcbiAgfVxyXG4gIG9wZW5QbHVnaW5XaW5kb3cod2luZG93Q2xhc3M6IFdpbmRvd0NsYXNzLCBwbHVnaW46IFBsdWdpbkNvbXBvbmVudCwgb3B0aW9uczogV2luZG93T3B0aW9ucykge1xyXG4gICAgaWYgKHdpbmRvd0NsYXNzKSB7XHJcbiAgICAgIGxldCB3bmQgPSAob3B0aW9ucyAmJiBvcHRpb25zLm9wZW5OZXcpID8gbnVsbCA6IHRoaXMuZmluZE9uZVdpbmRvd0J5Q2xhc3Mod2luZG93Q2xhc3MpXHJcbiAgICAgIGlmICghd25kKSB7XHJcbiAgICAgICAgd25kID0gbmV3IFdpbmRvd0luc3RhbmNlKFwiI1wiICsgKHRoaXMudWlkR2VuZXJhdG9yKyspLCB3aW5kb3dDbGFzcywgbnVsbCwgcGx1Z2luLCBvcHRpb25zIHx8IHt9KVxyXG4gICAgICB9XHJcbiAgICAgIGVsc2Uge1xyXG4gICAgICAgIG9wdGlvbnMgJiYgd25kLnVwZGF0ZU9wdGlvbnMob3B0aW9ucylcclxuICAgICAgfVxyXG4gICAgICB0aGlzLmRvY2tXaW5kb3cod25kLCB3bmQuZG9ja0lkLCB0cnVlKVxyXG4gICAgfVxyXG4gIH1cclxuICBjbG9zZVBsdWdpbldpbmRvd3Mod2luZG93Q2xhc3M6IFdpbmRvd0NsYXNzLCBwbHVnaW46IFBsdWdpbkNvbXBvbmVudCkge1xyXG4gICAgbGV0IHdpbmRvd3NcclxuICAgIGlmICh3aW5kb3dDbGFzcykgd2luZG93cyA9IHRoaXMuZmluZEFsbFdpbmRvd3NCeUNsYXNzKHdpbmRvd0NsYXNzKVxyXG4gICAgZWxzZSB3aW5kb3dzID0gdGhpcy5maW5kQWxsV2luZG93c0J5UGx1Z2luKHBsdWdpbilcclxuICAgIHdpbmRvd3MuZm9yRWFjaCh3bmQgPT4gdGhpcy5yZW1vdmVXaW5kb3cod25kLmlkKSlcclxuICB9XHJcbiAgZ2V0V2luZG93SW5zdGFuY2Uod2luZG93SWQ6IFdpbmRvd0lEKSB7XHJcbiAgICByZXR1cm4gdGhpcy53aW5kb3dzW3dpbmRvd0lkXVxyXG4gIH1cclxuICBmaW5kT25lV2luZG93QnlDbGFzcyh3aW5kb3dDbGFzczogV2luZG93Q2xhc3MpOiBXaW5kb3dJbnN0YW5jZSB7XHJcbiAgICBsZXQgd2luZG93SWRcclxuICAgIGZvciAod2luZG93SWQgaW4gdGhpcy53aW5kb3dzKSB7XHJcbiAgICAgIGlmICh0aGlzLndpbmRvd3Nbd2luZG93SWRdLndpbmRvd0NsYXNzID09PSB3aW5kb3dDbGFzcykge1xyXG4gICAgICAgIHJldHVybiB0aGlzLndpbmRvd3Nbd2luZG93SWRdXHJcbiAgICAgIH1cclxuICAgIH1cclxuICAgIHJldHVybiBudWxsXHJcbiAgfVxyXG4gIGZpbmRBbGxXaW5kb3dzQnlQbHVnaW4ocGx1Z2luOiBQbHVnaW5Db21wb25lbnQpOiBBcnJheTxXaW5kb3dJbnN0YW5jZT4ge1xyXG4gICAgY29uc3Qgd2luZG93cyA9IFtdXHJcbiAgICBpZiAocGx1Z2luKSB7XHJcbiAgICAgIGxldCB3aW5kb3dJZFxyXG4gICAgICBmb3IgKHdpbmRvd0lkIGluIHRoaXMud2luZG93cykge1xyXG4gICAgICAgIGlmICh0aGlzLndpbmRvd3Nbd2luZG93SWRdLnBsdWdpbiA9PT0gcGx1Z2luKSB7XHJcbiAgICAgICAgICB3aW5kb3dzLnB1c2godGhpcy53aW5kb3dzW3dpbmRvd0lkXSlcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgIH1cclxuICAgIHJldHVybiB3aW5kb3dzXHJcbiAgfVxyXG4gIGZpbmRBbGxXaW5kb3dzQnlDbGFzcyh3aW5kb3dDbGFzczogV2luZG93Q2xhc3MpOiBBcnJheTxXaW5kb3dJbnN0YW5jZT4ge1xyXG4gICAgaWYgKHdpbmRvd0NsYXNzKSB7XHJcbiAgICAgIGxldCB3aW5kb3dJZFxyXG4gICAgICBjb25zdCB3aW5kb3dzID0gW11cclxuICAgICAgZm9yICh3aW5kb3dJZCBpbiB0aGlzLndpbmRvd3MpIHtcclxuICAgICAgICBpZiAodGhpcy53aW5kb3dzW3dpbmRvd0lkXS53aW5kb3dDbGFzcyA9PT0gd2luZG93Q2xhc3MpIHtcclxuICAgICAgICAgIHdpbmRvd3MucHVzaCh0aGlzLndpbmRvd3Nbd2luZG93SWRdKVxyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgICByZXR1cm4gd2luZG93c1xyXG4gICAgfVxyXG4gICAgZWxzZSB7XHJcbiAgICAgIHJldHVybiB0aGlzLndpbmRvd3MudmFsdWVzKClcclxuICAgIH1cclxuICB9XHJcbn1cclxuIl19