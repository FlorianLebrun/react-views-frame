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
      this.frame.attachWindow(wnd.id, dockId, foreground);
    }
  }, {
    key: "openSubWindow",
    value: function openSubWindow(windowClass, parent, options) {
      if (windowClass && parent) {
        var wnd = options && options.openNew ? null : this.getWindowInstanceFromClass(windowClass);
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
      if (windowClass && parent) {
        var wnd = options && options.openNew ? null : this.getWindowInstanceFromClass(windowClass);
        if (!wnd) {
          wnd = new _Window.WindowInstance("#" + this.uidGenerator++, windowClass, null, plugin, options || {});
        } else {
          options && wnd.updateOptions(options);
        }
        this.dockWindow(wnd, wnd.dockId, true);
      }
    }
  }, {
    key: "getWindowInstance",
    value: function getWindowInstance(windowId) {
      return this.windows[windowId];
    }
  }, {
    key: "getWindowInstanceFromClass",
    value: function getWindowInstanceFromClass(windowClass) {
      var _this2 = this;

      var windowId = Object.keys(this.windows).find(function (key) {
        return _this2.windows[key].windowClass === windowClass ? _this2.windows[key] : null;
      });
      return windowId && this.windows[windowId];
    }
  }]);

  return PluginContext;
}();
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9saWIvbGF5b3V0L0NvbnRleHQuanMiXSwibmFtZXMiOlsiUGx1Z2luQ29udGV4dCIsImFwcGxpY2F0aW9uIiwicGx1Z2luQ2xhc3NlcyIsInBsdWdpbnMiLCJ3aW5kb3dzIiwiZG9ja3MiLCJmcmFtZSIsIndpbmRvd0xvYWRlZCIsInVpZEdlbmVyYXRvciIsIm1vdW50UGx1Z2lucyIsInBsdWdpbk5hbWVzIiwiT2JqZWN0Iiwia2V5cyIsImZvckVhY2giLCJuYW1lIiwiY3JlYXRlSW5zdGFuY2UiLCJtb3VudEluc3RhbmNlIiwicGx1Z2luRGlkTW91bnQiLCJ1bm1vdW50UGx1Z2lucyIsInBsdWdpbiIsInBsdWdpbldpbGxVbm1vdW50IiwicHJvdG90eXBlIiwibGF5b3V0Iiwid2luZG93IiwiYWRkRXZlbnRMaXN0ZW5lciIsInByZXZGcmFtZSIsImRlc2NyaXB0aW9uIiwicGFyYW1ldGVycyIsInBsdWdpbkNsYXNzIiwicGx1Z2luV2lsbE1vdW50Iiwid25kIiwiZG9ja0lkIiwiZm9yZWdyb3VuZCIsImF0dGFjaFdpbmRvdyIsImlkIiwid2luZG93Q2xhc3MiLCJwYXJlbnQiLCJvcHRpb25zIiwib3Blbk5ldyIsImdldFdpbmRvd0luc3RhbmNlRnJvbUNsYXNzIiwidXBkYXRlT3B0aW9ucyIsImRvY2tXaW5kb3ciLCJ3aW5kb3dJZCIsImZpbmQiLCJrZXkiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7cWpCQUFBOzs7QUFDQTs7QUFDQTs7OztJQUVhQSxhLFdBQUFBLGE7QUFZWCx5QkFBWUMsV0FBWixFQUF5QjtBQUFBOztBQUFBOztBQUFBLFNBWHpCQyxhQVd5QixHQVhrQixFQVdsQjtBQUFBLFNBVnpCQyxPQVV5QixHQVZlLEVBVWY7QUFBQSxTQVR6QkMsT0FTeUIsR0FUZSxFQVNmO0FBQUEsU0FSekJDLEtBUXlCLEdBUm9CLEVBUXBCO0FBQUEsU0FQekJDLEtBT3lCLEdBUFYsSUFPVTtBQUFBLFNBTnpCTCxXQU15QixHQU5ILElBTUc7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Z0IsQ0FBakI7QUFHQSxhQUFPRixZQUFZLEtBQUt0QyxPQUFMLENBQWFzQyxRQUFiLENBQW5CO0FBQ0QiLCJmaWxlIjoiQ29udGV4dC5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8qIGVzbGludC1kaXNhYmxlIHJlYWN0L25vLW11bHRpLWNvbXAgKi9cclxuaW1wb3J0IHsgUGx1Z2luSW5zdGFuY2UsIFBsdWdpbkNsYXNzIH0gZnJvbSBcIi4vUGx1Z2luXCJcclxuaW1wb3J0IHsgV2luZG93SW5zdGFuY2UsIFdpbmRvd0NsYXNzLCBXaW5kb3dJRCB9IGZyb20gXCIuL1dpbmRvd1wiXHJcblxyXG5leHBvcnQgY2xhc3MgUGx1Z2luQ29udGV4dCB7XHJcbiAgcGx1Z2luQ2xhc3NlczogeyBbc3RyaW5nXTogUGx1Z2luQ2xhc3MgfSA9IHt9XHJcbiAgcGx1Z2luczogeyBbc3RyaW5nXTogUGx1Z2luSW5zdGFuY2UgfSA9IHt9XHJcbiAgd2luZG93czogeyBbc3RyaW5nXTogV2luZG93SW5zdGFuY2UgfSA9IHt9XHJcbiAgZG9ja3M6IHsgW3N0cmluZ106IEFycmF5PFdpbmRvd0luc3RhbmNlPiB9ID0ge31cclxuICBmcmFtZTogRnJhbWUgPSBudWxsXHJcbiAgYXBwbGljYXRpb246IE9iamVjdCA9IG51bGxcclxuXHJcbiAgZGlzcGxheUxheW91dDogT2JqZWN0XHJcbiAgd2luZG93TG9hZGVkOiBib29sZWFuID0gZmFsc2VcclxuICB1aWRHZW5lcmF0b3I6IG51bWJlciA9IDBcclxuXHJcbiAgY29uc3RydWN0b3IoYXBwbGljYXRpb24pIHtcclxuICAgIHRoaXMuYXBwbGljYXRpb24gPSBhcHBsaWNhdGlvblxyXG4gICAgUGx1Z2luSW5zdGFuY2UucHJvdG90eXBlLmxheW91dCA9IHRoaXNcclxuICAgIFdpbmRvd0luc3RhbmNlLnByb3RvdHlwZS5sYXlvdXQgPSB0aGlzXHJcbiAgICBQbHVnaW5JbnN0YW5jZS5wcm90b3R5cGUuYXBwbGljYXRpb24gPSBhcHBsaWNhdGlvblxyXG4gICAgV2luZG93SW5zdGFuY2UucHJvdG90eXBlLmFwcGxpY2F0aW9uID0gYXBwbGljYXRpb25cclxuICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKFwiYmVmb3JldW5sb2FkXCIsIHRoaXMudW5tb3VudFBsdWdpbnMpXHJcbiAgfVxyXG4gIHJlZ2lzdGVyRnJhbWUoZnJhbWU6IEZyYW1lKSB7XHJcbiAgICBjb25zdCBwcmV2RnJhbWUgPSB0aGlzLmZyYW1lXHJcbiAgICBpZiAoIWZyYW1lICYmIHByZXZGcmFtZSkge1xyXG4gICAgICB0aGlzLnVubW91bnRQbHVnaW5zKClcclxuICAgIH1cclxuICAgIHRoaXMuZnJhbWUgPSBmcmFtZVxyXG4gICAgaWYgKGZyYW1lICYmICFwcmV2RnJhbWUpIHtcclxuICAgICAgdGhpcy5tb3VudFBsdWdpbnMoKVxyXG4gICAgfVxyXG4gIH1cclxuICBtb3VudFBsdWdpbnMgPSAoKSA9PiB7XHJcbiAgICB0aGlzLndpbmRvd0xvYWRlZCA9IHRydWVcclxuICAgIGNvbnN0IHBsdWdpbk5hbWVzID0gT2JqZWN0LmtleXModGhpcy5wbHVnaW5DbGFzc2VzKVxyXG5cclxuICAgIC8vIEluc3RhbmNpbmcgcGx1Z2luc1xyXG4gICAgcGx1Z2luTmFtZXMuZm9yRWFjaChuYW1lID0+IHtcclxuICAgICAgdGhpcy5wbHVnaW5zW25hbWVdID0gdGhpcy5wbHVnaW5DbGFzc2VzW25hbWVdLmNyZWF0ZUluc3RhbmNlKClcclxuICAgIH0pXHJcblxyXG4gICAgLy8gQ29ubmVjdCBwbHVnaW5zXHJcbiAgICBwbHVnaW5OYW1lcy5mb3JFYWNoKG5hbWUgPT4ge1xyXG4gICAgICB0aGlzLnBsdWdpbkNsYXNzZXNbbmFtZV0ubW91bnRJbnN0YW5jZSh0aGlzLnBsdWdpbnNbbmFtZV0sIHRoaXMpXHJcbiAgICB9KVxyXG5cclxuICAgIC8vIEZpbmFsaXplIHBsdWdpbnMgbW91bnRcclxuICAgIHBsdWdpbk5hbWVzLmZvckVhY2gobmFtZSA9PiB7XHJcbiAgICAgIHRoaXMucGx1Z2luc1tuYW1lXS5wbHVnaW5EaWRNb3VudCgpXHJcbiAgICB9KVxyXG4gIH1cclxuICB1bm1vdW50UGx1Z2lucyA9ICgpID0+IHtcclxuICAgIE9iamVjdC5rZXlzKHRoaXMucGx1Z2lucykuZm9yRWFjaChuYW1lID0+IHtcclxuICAgICAgY29uc3QgcGx1Z2luID0gdGhpcy5wbHVnaW5zW25hbWVdXHJcbiAgICAgIHBsdWdpbi5wbHVnaW5XaWxsVW5tb3VudCgpXHJcbiAgICB9KVxyXG4gIH1cclxuICBpbnN0YWxsUGx1Z2luKGRlc2NyaXB0aW9uOiBPYmplY3QsIHBhcmFtZXRlcnM6T2JqZWN0KTogUGx1Z2luQ2xhc3Mge1xyXG4gICAgY29uc3QgcGx1Z2luQ2xhc3MgPSBuZXcgUGx1Z2luQ2xhc3MoZGVzY3JpcHRpb24sIHBhcmFtZXRlcnMsIHRoaXMpXHJcbiAgICB0aGlzLnBsdWdpbkNsYXNzZXNbZGVzY3JpcHRpb24ubmFtZV0gPSBwbHVnaW5DbGFzc1xyXG4gICAgaWYgKHRoaXMud2luZG93TG9hZGVkKSB7XHJcbiAgICAgIGNvbnN0IHBsdWdpbiA9IHBsdWdpbkNsYXNzLmNyZWF0ZUluc3RhbmNlKClcclxuICAgICAgdGhpcy5wbHVnaW5zW3BsdWdpbkNsYXNzLm5hbWVdID0gcGx1Z2luXHJcbiAgICAgIHBsdWdpbi5wbHVnaW5XaWxsTW91bnQocGFyYW1ldGVycylcclxuICAgICAgcGx1Z2luLnBsdWdpbkRpZE1vdW50KClcclxuICAgIH1cclxuICAgIHJldHVybiBwbHVnaW5DbGFzc1xyXG4gIH1cclxuICBkb2NrV2luZG93KHduZDogV2luZG93SW5zdGFuY2UsIGRvY2tJZDogRG9ja0lELCBmb3JlZ3JvdW5kOiBib29sZWFuKSB7XHJcbiAgICB0aGlzLmZyYW1lLmF0dGFjaFdpbmRvdyh3bmQuaWQsIGRvY2tJZCwgZm9yZWdyb3VuZClcclxuICB9XHJcbiAgb3BlblN1YldpbmRvdyh3aW5kb3dDbGFzczogV2luZG93Q2xhc3MsIHBhcmVudDogV2luZG93SW5zdGFuY2UsIG9wdGlvbnM6IFdpbmRvd09wdGlvbnMpIHtcclxuICAgIGlmICh3aW5kb3dDbGFzcyAmJiBwYXJlbnQpIHtcclxuICAgICAgbGV0IHduZCA9IChvcHRpb25zICYmIG9wdGlvbnMub3Blbk5ldykgPyBudWxsIDogdGhpcy5nZXRXaW5kb3dJbnN0YW5jZUZyb21DbGFzcyh3aW5kb3dDbGFzcylcclxuICAgICAgaWYgKCF3bmQpIHtcclxuICAgICAgICB3bmQgPSBuZXcgV2luZG93SW5zdGFuY2UoXCIjXCIgKyAodGhpcy51aWRHZW5lcmF0b3IrKyksIHdpbmRvd0NsYXNzLCBwYXJlbnQsIHBhcmVudC5wbHVnaW4sIG9wdGlvbnMgfHwge30pXHJcbiAgICAgIH1cclxuICAgICAgZWxzZSB7XHJcbiAgICAgICAgb3B0aW9ucyAmJiB3bmQudXBkYXRlT3B0aW9ucyhvcHRpb25zKVxyXG4gICAgICB9XHJcbiAgICAgIHRoaXMuZG9ja1dpbmRvdyh3bmQsIHduZC5kb2NrSWQsIHRydWUpXHJcbiAgICB9XHJcbiAgfVxyXG4gIG9wZW5QbHVnaW5XaW5kb3cod2luZG93Q2xhc3M6IFdpbmRvd0NsYXNzLCBwbHVnaW46IFBsdWdpbkluc3RhbmNlLCBvcHRpb25zOiBXaW5kb3dPcHRpb25zKSB7XHJcbiAgICBpZiAod2luZG93Q2xhc3MgJiYgcGFyZW50KSB7XHJcbiAgICAgIGxldCB3bmQgPSAob3B0aW9ucyAmJiBvcHRpb25zLm9wZW5OZXcpID8gbnVsbCA6IHRoaXMuZ2V0V2luZG93SW5zdGFuY2VGcm9tQ2xhc3Mod2luZG93Q2xhc3MpXHJcbiAgICAgIGlmICghd25kKSB7XHJcbiAgICAgICAgd25kID0gbmV3IFdpbmRvd0luc3RhbmNlKFwiI1wiICsgKHRoaXMudWlkR2VuZXJhdG9yKyspLCB3aW5kb3dDbGFzcywgbnVsbCwgcGx1Z2luLCBvcHRpb25zIHx8IHt9KVxyXG4gICAgICB9XHJcbiAgICAgIGVsc2Uge1xyXG4gICAgICAgIG9wdGlvbnMgJiYgd25kLnVwZGF0ZU9wdGlvbnMob3B0aW9ucylcclxuICAgICAgfVxyXG4gICAgICB0aGlzLmRvY2tXaW5kb3cod25kLCB3bmQuZG9ja0lkLCB0cnVlKVxyXG4gICAgfVxyXG4gIH1cclxuICBnZXRXaW5kb3dJbnN0YW5jZSh3aW5kb3dJZDogV2luZG93SUQpIHtcclxuICAgIHJldHVybiB0aGlzLndpbmRvd3Nbd2luZG93SWRdXHJcbiAgfVxyXG4gIGdldFdpbmRvd0luc3RhbmNlRnJvbUNsYXNzKHdpbmRvd0NsYXNzOiBXaW5kb3dDbGFzcykge1xyXG4gICAgY29uc3Qgd2luZG93SWQgPSBPYmplY3Qua2V5cyh0aGlzLndpbmRvd3MpLmZpbmQoa2V5ID0+IHtcclxuICAgICAgcmV0dXJuICh0aGlzLndpbmRvd3Nba2V5XS53aW5kb3dDbGFzcyA9PT0gd2luZG93Q2xhc3MpID8gdGhpcy53aW5kb3dzW2tleV0gOiBudWxsXHJcbiAgICB9KVxyXG4gICAgcmV0dXJuIHdpbmRvd0lkICYmIHRoaXMud2luZG93c1t3aW5kb3dJZF1cclxuICB9XHJcbn1cclxuIl19