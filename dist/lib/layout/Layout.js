"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.applicationLayout = exports.ApplicationLayout = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }(); /* eslint-disable react/no-multi-comp */


var _Plugin = require("./Plugin");

var _Window = require("./Window");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var ApplicationLayout = exports.ApplicationLayout = function () {
  function ApplicationLayout() {
    var _this = this;

    _classCallCheck(this, ApplicationLayout);

    this.pluginClasses = {};
    this.plugins = {};
    this.windows = {};
    this.docks = {};
    this.frame = null;
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

    // window.addEventListener("DOMContentLoaded", this.mountPlugins)
    window.addEventListener("beforeunload", this.unmountPlugins);
  }

  _createClass(ApplicationLayout, [{
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
    value: function installPlugin(description) {
      var pluginClass = new _Plugin.PluginClass(description);
      this.pluginClasses[description.name] = pluginClass;
      if (this.windowLoaded) {
        var plugin = pluginClass.createInstance();
        this.plugins[pluginClass.name] = plugin;
        plugin.pluginWillMount();
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

  return ApplicationLayout;
}();

var applicationLayout = exports.applicationLayout = new ApplicationLayout();
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9BcHBsaWNhdGlvbi9sYXlvdXQvTGF5b3V0LmpzIl0sIm5hbWVzIjpbIkFwcGxpY2F0aW9uTGF5b3V0IiwicGx1Z2luQ2xhc3NlcyIsInBsdWdpbnMiLCJ3aW5kb3dzIiwiZG9ja3MiLCJmcmFtZSIsIndpbmRvd0xvYWRlZCIsInVpZEdlbmVyYXRvciIsIm1vdW50UGx1Z2lucyIsInBsdWdpbk5hbWVzIiwiT2JqZWN0Iiwia2V5cyIsImZvckVhY2giLCJuYW1lIiwiY3JlYXRlSW5zdGFuY2UiLCJtb3VudEluc3RhbmNlIiwicGx1Z2luRGlkTW91bnQiLCJ1bm1vdW50UGx1Z2lucyIsInBsdWdpbiIsInBsdWdpbldpbGxVbm1vdW50Iiwid2luZG93IiwiYWRkRXZlbnRMaXN0ZW5lciIsInByZXZGcmFtZSIsImRlc2NyaXB0aW9uIiwicGx1Z2luQ2xhc3MiLCJwbHVnaW5XaWxsTW91bnQiLCJ3bmQiLCJkb2NrSWQiLCJmb3JlZ3JvdW5kIiwiYXR0YWNoV2luZG93IiwiaWQiLCJ3aW5kb3dDbGFzcyIsInBhcmVudCIsIm9wdGlvbnMiLCJvcGVuTmV3IiwiZ2V0V2luZG93SW5zdGFuY2VGcm9tQ2xhc3MiLCJ1cGRhdGVPcHRpb25zIiwiZG9ja1dpbmRvdyIsIndpbmRvd0lkIiwiZmluZCIsImtleSIsImFwcGxpY2F0aW9uTGF5b3V0Il0sIm1hcHBpbmdzIjoiOzs7Ozs7O3FqQkFBQTs7O0FBQ0E7O0FBQ0E7Ozs7SUFFYUEsaUIsV0FBQUEsaUI7QUFXWCwrQkFBYztBQUFBOztBQUFBOztBQUFBLFNBVmRDLGFBVWMsR0FWNkIsRUFVN0I7QUFBQSxTQVRkQyxPQVNjLEdBVDBCLEVBUzFCO0FBQUEsU0FSZEMsT0FRYyxHQVIwQixFQVExQjtBQUFBLFNBUGRDLEtBT2MsR0FQK0IsRUFPL0I7QUFBQSxTQU5kQyxLQU1jLEdBTkMsSUFNRDtBQUFBLFNBSGRDLFlBR2MsR0FIVSxLQUdWO0FBQUEsU0FGZEMsWUFFYyxHQUZTLENBRVQ7O0FBQUEsU0Fj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LEtBQUtDLDBCQUFMLENBQWdDSixXQUFoQyxDQUFoRDtBQUNBLFlBQUksQ0FBQ0wsR0FBTCxFQUFVO0FBQ1JBLGdCQUFNLDJCQUFtQixNQUFPLEtBQUtuQixZQUFMLEVBQTFCLEVBQWdEd0IsV0FBaEQsRUFBNkQsSUFBN0QsRUFBbUViLE1BQW5FLEVBQTJFZSxXQUFXLEVBQXRGLENBQU47QUFDRCxTQUZELE1BR0s7QUFDSEEscUJBQVdQLElBQUlVLGFBQUosQ0FBa0JILE9BQWxCLENBQVg7QUFDRDtBQUNELGFBQUtJLFVBQUwsQ0FBZ0JYLEdBQWhCLEVBQXFCQSxJQUFJQyxNQUF6QixFQUFpQyxJQUFqQztBQUNEO0FBQ0Y7OztzQ0FDaUJXLFEsRUFBb0I7QUFDcEMsYUFBTyxLQUFLbkMsT0FBTCxDQUFhbUMsUUFBYixDQUFQO0FBQ0Q7OzsrQ0FDMEJQLFcsRUFBMEI7QUFBQTs7QUFDbkQsVUFBTU8sV0FBVzVCLE9BQU9DLElBQVAsQ0FBWSxLQUFLUixPQUFqQixFQUEwQm9DLElBQTFCLENBQStCLGVBQU87QUFDckQsZUFBUSxPQUFLcEMsT0FBTCxDQUFhcUMsR0FBYixFQUFrQlQsV0FBbEIsS0FBa0NBLFdBQW5DLEdBQWtELE9BQUs1QixPQUFMLENBQWFxQyxHQUFiLENBQWxELEdBQXNFLElBQTdFO0FBQ0QsT0FGZ0IsQ0FBakI7QUFHQSxhQUFPRixZQUFZLEtBQUtuQyxPQUFMLENBQWFtQyxRQUFiLENBQW5CO0FBQ0Q7Ozs7OztBQUdJLElBQU1HLGdEQUF1QyxJQUFJekMsaUJBQUosRUFBN0MiLCJmaWxlIjoiTGF5b3V0LmpzIiwic291cmNlc0NvbnRlbnQiOlsiLyogZXNsaW50LWRpc2FibGUgcmVhY3Qvbm8tbXVsdGktY29tcCAqL1xyXG5pbXBvcnQgeyBQbHVnaW5JbnN0YW5jZSwgUGx1Z2luQ2xhc3MgfSBmcm9tIFwiLi9QbHVnaW5cIlxyXG5pbXBvcnQgeyBXaW5kb3dJbnN0YW5jZSwgV2luZG93Q2xhc3MsIFdpbmRvd0lEIH0gZnJvbSBcIi4vV2luZG93XCJcclxuXHJcbmV4cG9ydCBjbGFzcyBBcHBsaWNhdGlvbkxheW91dCB7XHJcbiAgcGx1Z2luQ2xhc3NlczogeyBbc3RyaW5nXTogUGx1Z2luQ2xhc3MgfSA9IHt9XHJcbiAgcGx1Z2luczogeyBbc3RyaW5nXTogUGx1Z2luSW5zdGFuY2UgfSA9IHt9XHJcbiAgd2luZG93czogeyBbc3RyaW5nXTogV2luZG93SW5zdGFuY2UgfSA9IHt9XHJcbiAgZG9ja3M6IHsgW3N0cmluZ106IEFycmF5PFdpbmRvd0luc3RhbmNlPiB9ID0ge31cclxuICBmcmFtZTogRnJhbWUgPSBudWxsXHJcblxyXG4gIGRpc3BsYXlMYXlvdXQ6IE9iamVjdFxyXG4gIHdpbmRvd0xvYWRlZDogYm9vbGVhbiA9IGZhbHNlXHJcbiAgdWlkR2VuZXJhdG9yOiBudW1iZXIgPSAwXHJcblxyXG4gIGNvbnN0cnVjdG9yKCkge1xyXG4gICAgLy8gd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoXCJET01Db250ZW50TG9hZGVkXCIsIHRoaXMubW91bnRQbHVnaW5zKVxyXG4gICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoXCJiZWZvcmV1bmxvYWRcIiwgdGhpcy51bm1vdW50UGx1Z2lucylcclxuICB9XHJcbiAgcmVnaXN0ZXJGcmFtZShmcmFtZTogRnJhbWUpIHtcclxuICAgIGNvbnN0IHByZXZGcmFtZSA9IHRoaXMuZnJhbWVcclxuICAgIGlmICghZnJhbWUgJiYgcHJldkZyYW1lKSB7XHJcbiAgICAgIHRoaXMudW5tb3VudFBsdWdpbnMoKVxyXG4gICAgfVxyXG4gICAgdGhpcy5mcmFtZSA9IGZyYW1lXHJcbiAgICBpZiAoZnJhbWUgJiYgIXByZXZGcmFtZSkge1xyXG4gICAgICB0aGlzLm1vdW50UGx1Z2lucygpXHJcbiAgICB9XHJcbiAgfVxyXG4gIG1vdW50UGx1Z2lucyA9ICgpID0+IHtcclxuICAgIHRoaXMud2luZG93TG9hZGVkID0gdHJ1ZVxyXG4gICAgY29uc3QgcGx1Z2luTmFtZXMgPSBPYmplY3Qua2V5cyh0aGlzLnBsdWdpbkNsYXNzZXMpXHJcblxyXG4gICAgLy8gSW5zdGFuY2luZyBwbHVnaW5zXHJcbiAgICBwbHVnaW5OYW1lcy5mb3JFYWNoKG5hbWUgPT4ge1xyXG4gICAgICB0aGlzLnBsdWdpbnNbbmFtZV0gPSB0aGlzLnBsdWdpbkNsYXNzZXNbbmFtZV0uY3JlYXRlSW5zdGFuY2UoKVxyXG4gICAgfSlcclxuXHJcbiAgICAvLyBDb25uZWN0IHBsdWdpbnNcclxuICAgIHBsdWdpbk5hbWVzLmZvckVhY2gobmFtZSA9PiB7XHJcbiAgICAgIHRoaXMucGx1Z2luQ2xhc3Nlc1tuYW1lXS5tb3VudEluc3RhbmNlKHRoaXMucGx1Z2luc1tuYW1lXSwgdGhpcylcclxuICAgIH0pXHJcblxyXG4gICAgLy8gRmluYWxpemUgcGx1Z2lucyBtb3VudFxyXG4gICAgcGx1Z2luTmFtZXMuZm9yRWFjaChuYW1lID0+IHtcclxuICAgICAgdGhpcy5wbHVnaW5zW25hbWVdLnBsdWdpbkRpZE1vdW50KClcclxuICAgIH0pXHJcbiAgfVxyXG4gIHVubW91bnRQbHVnaW5zID0gKCkgPT4ge1xyXG4gICAgT2JqZWN0LmtleXModGhpcy5wbHVnaW5zKS5mb3JFYWNoKG5hbWUgPT4ge1xyXG4gICAgICBjb25zdCBwbHVnaW4gPSB0aGlzLnBsdWdpbnNbbmFtZV1cclxuICAgICAgcGx1Z2luLnBsdWdpbldpbGxVbm1vdW50KClcclxuICAgIH0pXHJcbiAgfVxyXG4gIGluc3RhbGxQbHVnaW4oZGVzY3JpcHRpb246IE9iamVjdCk6IFBsdWdpbkNsYXNzIHtcclxuICAgIGNvbnN0IHBsdWdpbkNsYXNzID0gbmV3IFBsdWdpbkNsYXNzKGRlc2NyaXB0aW9uKVxyXG4gICAgdGhpcy5wbHVnaW5DbGFzc2VzW2Rlc2NyaXB0aW9uLm5hbWVdID0gcGx1Z2luQ2xhc3NcclxuICAgIGlmICh0aGlzLndpbmRvd0xvYWRlZCkge1xyXG4gICAgICBjb25zdCBwbHVnaW4gPSBwbHVnaW5DbGFzcy5jcmVhdGVJbnN0YW5jZSgpXHJcbiAgICAgIHRoaXMucGx1Z2luc1twbHVnaW5DbGFzcy5uYW1lXSA9IHBsdWdpblxyXG4gICAgICBwbHVnaW4ucGx1Z2luV2lsbE1vdW50KClcclxuICAgICAgcGx1Z2luLnBsdWdpbkRpZE1vdW50KClcclxuICAgIH1cclxuICAgIHJldHVybiBwbHVnaW5DbGFzc1xyXG4gIH1cclxuICBkb2NrV2luZG93KHduZDogV2luZG93SW5zdGFuY2UsIGRvY2tJZDogRG9ja0lELCBmb3JlZ3JvdW5kOiBib29sZWFuKSB7XHJcbiAgICB0aGlzLmZyYW1lLmF0dGFjaFdpbmRvdyh3bmQuaWQsIGRvY2tJZCwgZm9yZWdyb3VuZClcclxuICB9XHJcbiAgb3BlblN1YldpbmRvdyh3aW5kb3dDbGFzczogV2luZG93Q2xhc3MsIHBhcmVudDogV2luZG93SW5zdGFuY2UsIG9wdGlvbnM6IFdpbmRvd09wdGlvbnMpIHtcclxuICAgIGlmICh3aW5kb3dDbGFzcyAmJiBwYXJlbnQpIHtcclxuICAgICAgbGV0IHduZCA9IChvcHRpb25zICYmIG9wdGlvbnMub3Blbk5ldykgPyBudWxsIDogdGhpcy5nZXRXaW5kb3dJbnN0YW5jZUZyb21DbGFzcyh3aW5kb3dDbGFzcylcclxuICAgICAgaWYgKCF3bmQpIHtcclxuICAgICAgICB3bmQgPSBuZXcgV2luZG93SW5zdGFuY2UoXCIjXCIgKyAodGhpcy51aWRHZW5lcmF0b3IrKyksIHdpbmRvd0NsYXNzLCBwYXJlbnQsIHBhcmVudC5wbHVnaW4sIG9wdGlvbnMgfHwge30pXHJcbiAgICAgIH1cclxuICAgICAgZWxzZSB7XHJcbiAgICAgICAgb3B0aW9ucyAmJiB3bmQudXBkYXRlT3B0aW9ucyhvcHRpb25zKVxyXG4gICAgICB9XHJcbiAgICAgIHRoaXMuZG9ja1dpbmRvdyh3bmQsIHduZC5kb2NrSWQsIHRydWUpXHJcbiAgICB9XHJcbiAgfVxyXG4gIG9wZW5QbHVnaW5XaW5kb3cod2luZG93Q2xhc3M6IFdpbmRvd0NsYXNzLCBwbHVnaW46IFBsdWdpbkluc3RhbmNlLCBvcHRpb25zOiBXaW5kb3dPcHRpb25zKSB7XHJcbiAgICBpZiAod2luZG93Q2xhc3MgJiYgcGFyZW50KSB7XHJcbiAgICAgIGxldCB3bmQgPSAob3B0aW9ucyAmJiBvcHRpb25zLm9wZW5OZXcpID8gbnVsbCA6IHRoaXMuZ2V0V2luZG93SW5zdGFuY2VGcm9tQ2xhc3Mod2luZG93Q2xhc3MpXHJcbiAgICAgIGlmICghd25kKSB7XHJcbiAgICAgICAgd25kID0gbmV3IFdpbmRvd0luc3RhbmNlKFwiI1wiICsgKHRoaXMudWlkR2VuZXJhdG9yKyspLCB3aW5kb3dDbGFzcywgbnVsbCwgcGx1Z2luLCBvcHRpb25zIHx8IHt9KVxyXG4gICAgICB9XHJcbiAgICAgIGVsc2Uge1xyXG4gICAgICAgIG9wdGlvbnMgJiYgd25kLnVwZGF0ZU9wdGlvbnMob3B0aW9ucylcclxuICAgICAgfVxyXG4gICAgICB0aGlzLmRvY2tXaW5kb3cod25kLCB3bmQuZG9ja0lkLCB0cnVlKVxyXG4gICAgfVxyXG4gIH1cclxuICBnZXRXaW5kb3dJbnN0YW5jZSh3aW5kb3dJZDogV2luZG93SUQpIHtcclxuICAgIHJldHVybiB0aGlzLndpbmRvd3Nbd2luZG93SWRdXHJcbiAgfVxyXG4gIGdldFdpbmRvd0luc3RhbmNlRnJvbUNsYXNzKHdpbmRvd0NsYXNzOiBXaW5kb3dDbGFzcykge1xyXG4gICAgY29uc3Qgd2luZG93SWQgPSBPYmplY3Qua2V5cyh0aGlzLndpbmRvd3MpLmZpbmQoa2V5ID0+IHtcclxuICAgICAgcmV0dXJuICh0aGlzLndpbmRvd3Nba2V5XS53aW5kb3dDbGFzcyA9PT0gd2luZG93Q2xhc3MpID8gdGhpcy53aW5kb3dzW2tleV0gOiBudWxsXHJcbiAgICB9KVxyXG4gICAgcmV0dXJuIHdpbmRvd0lkICYmIHRoaXMud2luZG93c1t3aW5kb3dJZF1cclxuICB9XHJcbn1cclxuXHJcbmV4cG9ydCBjb25zdCBhcHBsaWNhdGlvbkxheW91dDogQXBwbGljYXRpb25MYXlvdXQgPSBuZXcgQXBwbGljYXRpb25MYXlvdXQoKVxyXG4iXX0=