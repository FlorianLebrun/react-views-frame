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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9saWIvbGF5b3V0L0xheW91dC5qcyJdLCJuYW1lcyI6WyJBcHBsaWNhdGlvbkxheW91dCIsInBsdWdpbkNsYXNzZXMiLCJwbHVnaW5zIiwid2luZG93cyIsImRvY2tzIiwiZnJhbWUiLCJ3aW5kb3dMb2FkZWQiLCJ1aWRHZW5lcmF0b3IiLCJtb3VudFBsdWdpbnMiLCJwbHVnaW5OYW1lcyIsIk9iamVjdCIsImtleXMiLCJmb3JFYWNoIiwibmFtZSIsImNyZWF0ZUluc3RhbmNlIiwibW91bnRJbnN0YW5jZSIsInBsdWdpbkRpZE1vdW50IiwidW5tb3VudFBsdWdpbnMiLCJwbHVnaW4iLCJwbHVnaW5XaWxsVW5tb3VudCIsIndpbmRvdyIsImFkZEV2ZW50TGlzdGVuZXIiLCJwcmV2RnJhbWUiLCJkZXNjcmlwdGlvbiIsInBsdWdpbkNsYXNzIiwicGx1Z2luV2lsbE1vdW50Iiwid25kIiwiZG9ja0lkIiwiZm9yZWdyb3VuZCIsImF0dGFjaFdpbmRvdyIsImlkIiwid2luZG93Q2xhc3MiLCJwYXJlbnQiLCJvcHRpb25zIiwib3Blbk5ldyIsImdldFdpbmRvd0luc3RhbmNlRnJvbUNsYXNzIiwidXBkYXRlT3B0aW9ucyIsImRvY2tXaW5kb3ciLCJ3aW5kb3dJZCIsImZpbmQiLCJrZXkiLCJhcHBsaWNhdGlvbkxheW91dCJdLCJtYXBwaW5ncyI6Ijs7Ozs7OztxakJBQUE7OztBQUNBOztBQUNBOzs7O0lBRWFBLGlCLFdBQUFBLGlCO0FBV1gsK0JBQWM7QUFBQTs7QUFBQTs7QUFBQSxTQVZkQyxhQVVjLEdBVjZCLEVBVTdCO0FBQUEsU0FUZEMsT0FTYyxHQVQwQixFQVMxQjtBQUFBLFNBUmRDLE9BUWMsR0FSMEIsRUFRMUI7QUFBQSxTQVBkQyxLQU9jLEdBUCtCLEVBTy9CO0FBQUEsU0FOZEMsS0FNYyxHQU5DLElBTUQ7QUFBQSxTQUhkQyxZQUdjLEdBSFUsS0FHVjtBQUFBLFNBRmRDLFlBRWMsR0FGUyxDQUVUOztBQUFBLFNBY2RDLFlBZGMs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QkFBTCxDQUFnQ0osV0FBaEMsQ0FBaEQ7QUFDQSxZQUFJLENBQUNMLEdBQUwsRUFBVTtBQUNSQSxnQkFBTSwyQkFBbUIsTUFBTyxLQUFLbkIsWUFBTCxFQUExQixFQUFnRHdCLFdBQWhELEVBQTZELElBQTdELEVBQW1FYixNQUFuRSxFQUEyRWUsV0FBVyxFQUF0RixDQUFOO0FBQ0QsU0FGRCxNQUdLO0FBQ0hBLHFCQUFXUCxJQUFJVSxhQUFKLENBQWtCSCxPQUFsQixDQUFYO0FBQ0Q7QUFDRCxhQUFLSSxVQUFMLENBQWdCWCxHQUFoQixFQUFxQkEsSUFBSUMsTUFBekIsRUFBaUMsSUFBakM7QUFDRDtBQUNGOzs7c0NBQ2lCVyxRLEVBQW9CO0FBQ3BDLGFBQU8sS0FBS25DLE9BQUwsQ0FBYW1DLFFBQWIsQ0FBUDtBQUNEOzs7K0NBQzBCUCxXLEVBQTBCO0FBQUE7O0FBQ25ELFVBQU1PLFdBQVc1QixPQUFPQyxJQUFQLENBQVksS0FBS1IsT0FBakIsRUFBMEJvQyxJQUExQixDQUErQixlQUFPO0FBQ3JELGVBQVEsT0FBS3BDLE9BQUwsQ0FBYXFDLEdBQWIsRUFBa0JULFdBQWxCLEtBQWtDQSxXQUFuQyxHQUFrRCxPQUFLNUIsT0FBTCxDQUFhcUMsR0FBYixDQUFsRCxHQUFzRSxJQUE3RTtBQUNELE9BRmdCLENBQWpCO0FBR0EsYUFBT0YsWUFBWSxLQUFLbkMsT0FBTCxDQUFhbUMsUUFBYixDQUFuQjtBQUNEOzs7Ozs7QUFHSSxJQUFNRyxnREFBdUMsSUFBSXpDLGlCQUFKLEVBQTdDIiwiZmlsZSI6IkxheW91dC5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8qIGVzbGludC1kaXNhYmxlIHJlYWN0L25vLW11bHRpLWNvbXAgKi9cclxuaW1wb3J0IHsgUGx1Z2luSW5zdGFuY2UsIFBsdWdpbkNsYXNzIH0gZnJvbSBcIi4vUGx1Z2luXCJcclxuaW1wb3J0IHsgV2luZG93SW5zdGFuY2UsIFdpbmRvd0NsYXNzLCBXaW5kb3dJRCB9IGZyb20gXCIuL1dpbmRvd1wiXHJcblxyXG5leHBvcnQgY2xhc3MgQXBwbGljYXRpb25MYXlvdXQge1xyXG4gIHBsdWdpbkNsYXNzZXM6IHsgW3N0cmluZ106IFBsdWdpbkNsYXNzIH0gPSB7fVxyXG4gIHBsdWdpbnM6IHsgW3N0cmluZ106IFBsdWdpbkluc3RhbmNlIH0gPSB7fVxyXG4gIHdpbmRvd3M6IHsgW3N0cmluZ106IFdpbmRvd0luc3RhbmNlIH0gPSB7fVxyXG4gIGRvY2tzOiB7IFtzdHJpbmddOiBBcnJheTxXaW5kb3dJbnN0YW5jZT4gfSA9IHt9XHJcbiAgZnJhbWU6IEZyYW1lID0gbnVsbFxyXG5cclxuICBkaXNwbGF5TGF5b3V0OiBPYmplY3RcclxuICB3aW5kb3dMb2FkZWQ6IGJvb2xlYW4gPSBmYWxzZVxyXG4gIHVpZEdlbmVyYXRvcjogbnVtYmVyID0gMFxyXG5cclxuICBjb25zdHJ1Y3RvcigpIHtcclxuICAgIC8vIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKFwiRE9NQ29udGVudExvYWRlZFwiLCB0aGlzLm1vdW50UGx1Z2lucylcclxuICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKFwiYmVmb3JldW5sb2FkXCIsIHRoaXMudW5tb3VudFBsdWdpbnMpXHJcbiAgfVxyXG4gIHJlZ2lzdGVyRnJhbWUoZnJhbWU6IEZyYW1lKSB7XHJcbiAgICBjb25zdCBwcmV2RnJhbWUgPSB0aGlzLmZyYW1lXHJcbiAgICBpZiAoIWZyYW1lICYmIHByZXZGcmFtZSkge1xyXG4gICAgICB0aGlzLnVubW91bnRQbHVnaW5zKClcclxuICAgIH1cclxuICAgIHRoaXMuZnJhbWUgPSBmcmFtZVxyXG4gICAgaWYgKGZyYW1lICYmICFwcmV2RnJhbWUpIHtcclxuICAgICAgdGhpcy5tb3VudFBsdWdpbnMoKVxyXG4gICAgfVxyXG4gIH1cclxuICBtb3VudFBsdWdpbnMgPSAoKSA9PiB7XHJcbiAgICB0aGlzLndpbmRvd0xvYWRlZCA9IHRydWVcclxuICAgIGNvbnN0IHBsdWdpbk5hbWVzID0gT2JqZWN0LmtleXModGhpcy5wbHVnaW5DbGFzc2VzKVxyXG5cclxuICAgIC8vIEluc3RhbmNpbmcgcGx1Z2luc1xyXG4gICAgcGx1Z2luTmFtZXMuZm9yRWFjaChuYW1lID0+IHtcclxuICAgICAgdGhpcy5wbHVnaW5zW25hbWVdID0gdGhpcy5wbHVnaW5DbGFzc2VzW25hbWVdLmNyZWF0ZUluc3RhbmNlKClcclxuICAgIH0pXHJcblxyXG4gICAgLy8gQ29ubmVjdCBwbHVnaW5zXHJcbiAgICBwbHVnaW5OYW1lcy5mb3JFYWNoKG5hbWUgPT4ge1xyXG4gICAgICB0aGlzLnBsdWdpbkNsYXNzZXNbbmFtZV0ubW91bnRJbnN0YW5jZSh0aGlzLnBsdWdpbnNbbmFtZV0sIHRoaXMpXHJcbiAgICB9KVxyXG5cclxuICAgIC8vIEZpbmFsaXplIHBsdWdpbnMgbW91bnRcclxuICAgIHBsdWdpbk5hbWVzLmZvckVhY2gobmFtZSA9PiB7XHJcbiAgICAgIHRoaXMucGx1Z2luc1tuYW1lXS5wbHVnaW5EaWRNb3VudCgpXHJcbiAgICB9KVxyXG4gIH1cclxuICB1bm1vdW50UGx1Z2lucyA9ICgpID0+IHtcclxuICAgIE9iamVjdC5rZXlzKHRoaXMucGx1Z2lucykuZm9yRWFjaChuYW1lID0+IHtcclxuICAgICAgY29uc3QgcGx1Z2luID0gdGhpcy5wbHVnaW5zW25hbWVdXHJcbiAgICAgIHBsdWdpbi5wbHVnaW5XaWxsVW5tb3VudCgpXHJcbiAgICB9KVxyXG4gIH1cclxuICBpbnN0YWxsUGx1Z2luKGRlc2NyaXB0aW9uOiBPYmplY3QpOiBQbHVnaW5DbGFzcyB7XHJcbiAgICBjb25zdCBwbHVnaW5DbGFzcyA9IG5ldyBQbHVnaW5DbGFzcyhkZXNjcmlwdGlvbilcclxuICAgIHRoaXMucGx1Z2luQ2xhc3Nlc1tkZXNjcmlwdGlvbi5uYW1lXSA9IHBsdWdpbkNsYXNzXHJcbiAgICBpZiAodGhpcy53aW5kb3dMb2FkZWQpIHtcclxuICAgICAgY29uc3QgcGx1Z2luID0gcGx1Z2luQ2xhc3MuY3JlYXRlSW5zdGFuY2UoKVxyXG4gICAgICB0aGlzLnBsdWdpbnNbcGx1Z2luQ2xhc3MubmFtZV0gPSBwbHVnaW5cclxuICAgICAgcGx1Z2luLnBsdWdpbldpbGxNb3VudCgpXHJcbiAgICAgIHBsdWdpbi5wbHVnaW5EaWRNb3VudCgpXHJcbiAgICB9XHJcbiAgICByZXR1cm4gcGx1Z2luQ2xhc3NcclxuICB9XHJcbiAgZG9ja1dpbmRvdyh3bmQ6IFdpbmRvd0luc3RhbmNlLCBkb2NrSWQ6IERvY2tJRCwgZm9yZWdyb3VuZDogYm9vbGVhbikge1xyXG4gICAgdGhpcy5mcmFtZS5hdHRhY2hXaW5kb3cod25kLmlkLCBkb2NrSWQsIGZvcmVncm91bmQpXHJcbiAgfVxyXG4gIG9wZW5TdWJXaW5kb3cod2luZG93Q2xhc3M6IFdpbmRvd0NsYXNzLCBwYXJlbnQ6IFdpbmRvd0luc3RhbmNlLCBvcHRpb25zOiBXaW5kb3dPcHRpb25zKSB7XHJcbiAgICBpZiAod2luZG93Q2xhc3MgJiYgcGFyZW50KSB7XHJcbiAgICAgIGxldCB3bmQgPSAob3B0aW9ucyAmJiBvcHRpb25zLm9wZW5OZXcpID8gbnVsbCA6IHRoaXMuZ2V0V2luZG93SW5zdGFuY2VGcm9tQ2xhc3Mod2luZG93Q2xhc3MpXHJcbiAgICAgIGlmICghd25kKSB7XHJcbiAgICAgICAgd25kID0gbmV3IFdpbmRvd0luc3RhbmNlKFwiI1wiICsgKHRoaXMudWlkR2VuZXJhdG9yKyspLCB3aW5kb3dDbGFzcywgcGFyZW50LCBwYXJlbnQucGx1Z2luLCBvcHRpb25zIHx8IHt9KVxyXG4gICAgICB9XHJcbiAgICAgIGVsc2Uge1xyXG4gICAgICAgIG9wdGlvbnMgJiYgd25kLnVwZGF0ZU9wdGlvbnMob3B0aW9ucylcclxuICAgICAgfVxyXG4gICAgICB0aGlzLmRvY2tXaW5kb3cod25kLCB3bmQuZG9ja0lkLCB0cnVlKVxyXG4gICAgfVxyXG4gIH1cclxuICBvcGVuUGx1Z2luV2luZG93KHdpbmRvd0NsYXNzOiBXaW5kb3dDbGFzcywgcGx1Z2luOiBQbHVnaW5JbnN0YW5jZSwgb3B0aW9uczogV2luZG93T3B0aW9ucykge1xyXG4gICAgaWYgKHdpbmRvd0NsYXNzICYmIHBhcmVudCkge1xyXG4gICAgICBsZXQgd25kID0gKG9wdGlvbnMgJiYgb3B0aW9ucy5vcGVuTmV3KSA/IG51bGwgOiB0aGlzLmdldFdpbmRvd0luc3RhbmNlRnJvbUNsYXNzKHdpbmRvd0NsYXNzKVxyXG4gICAgICBpZiAoIXduZCkge1xyXG4gICAgICAgIHduZCA9IG5ldyBXaW5kb3dJbnN0YW5jZShcIiNcIiArICh0aGlzLnVpZEdlbmVyYXRvcisrKSwgd2luZG93Q2xhc3MsIG51bGwsIHBsdWdpbiwgb3B0aW9ucyB8fCB7fSlcclxuICAgICAgfVxyXG4gICAgICBlbHNlIHtcclxuICAgICAgICBvcHRpb25zICYmIHduZC51cGRhdGVPcHRpb25zKG9wdGlvbnMpXHJcbiAgICAgIH1cclxuICAgICAgdGhpcy5kb2NrV2luZG93KHduZCwgd25kLmRvY2tJZCwgdHJ1ZSlcclxuICAgIH1cclxuICB9XHJcbiAgZ2V0V2luZG93SW5zdGFuY2Uod2luZG93SWQ6IFdpbmRvd0lEKSB7XHJcbiAgICByZXR1cm4gdGhpcy53aW5kb3dzW3dpbmRvd0lkXVxyXG4gIH1cclxuICBnZXRXaW5kb3dJbnN0YW5jZUZyb21DbGFzcyh3aW5kb3dDbGFzczogV2luZG93Q2xhc3MpIHtcclxuICAgIGNvbnN0IHdpbmRvd0lkID0gT2JqZWN0LmtleXModGhpcy53aW5kb3dzKS5maW5kKGtleSA9PiB7XHJcbiAgICAgIHJldHVybiAodGhpcy53aW5kb3dzW2tleV0ud2luZG93Q2xhc3MgPT09IHdpbmRvd0NsYXNzKSA/IHRoaXMud2luZG93c1trZXldIDogbnVsbFxyXG4gICAgfSlcclxuICAgIHJldHVybiB3aW5kb3dJZCAmJiB0aGlzLndpbmRvd3Nbd2luZG93SWRdXHJcbiAgfVxyXG59XHJcblxyXG5leHBvcnQgY29uc3QgYXBwbGljYXRpb25MYXlvdXQ6IEFwcGxpY2F0aW9uTGF5b3V0ID0gbmV3IEFwcGxpY2F0aW9uTGF5b3V0KClcclxuIl19