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
    this.focused = null;
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
    _Window.WindowContainer.prototype.layout = this;
    _Window.WindowContainer.prototype.application = application;
    window.addEventListener("beforeunload", this.unmountPlugins);
  }

  _createClass(PluginContext, [{
    key: "registerFrame",
    value: function registerFrame(frame) {
      var _this2 = this;

      this.frame = frame;
      frame && Object.keys(this.windows).forEach(function (key) {
        var wnd = _this2.windows[key];
        frame.attachWindow(wnd, wnd.dockId);
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
      this.frame && this.frame.attachWindow(wnd, dockId, foreground);
    }
  }, {
    key: "dettachWindow",
    value: function dettachWindow(wnd) {
      this.frame && this.frame.dettachWindow(wnd);
    }
  }, {
    key: "removeWindow",
    value: function removeWindow(wnd) {
      this.dettachWindow(wnd);
      delete this.windows[wnd.id];
      wnd.close();
    }
  }, {
    key: "focusOnWindow",
    value: function focusOnWindow(focused) {
      var prev_focused = this.focused;
      if (prev_focused !== focused) {
        this.focused = focused;
        prev_focused && prev_focused.notifyBlur();
        this.frame && this.frame.notifyFocusChange(this.focused, prev_focused);
        this.focused && this.focused.notifyFocus();
      }
    }
  }, {
    key: "openSubWindow",
    value: function openSubWindow(windowClass, parent, options) {
      if (windowClass && parent) {
        var wnd = options && options.openNew ? null : this.findOneWindowByClass(windowClass);
        if (!wnd) {
          wnd = new _Window.WindowInstance("#" + this.uidGenerator++, windowClass, parent, parent.plugin, options);
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
          wnd = new _Window.WindowInstance("#" + this.uidGenerator++, windowClass, null, plugin, options);
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
        return _this3.removeWindow(wnd);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9saWIvbGF5b3V0L0NvbnRleHQuanMiXSwibmFtZXMiOlsiUGx1Z2luQ29udGV4dCIsImFwcGxpY2F0aW9uIiwicGx1Z2luQ2xhc3NlcyIsInBsdWdpbnMiLCJ3aW5kb3dzIiwiZG9ja3MiLCJmb2N1c2VkIiwiZnJhbWUiLCJ3aW5kb3dMb2FkZWQiLCJ1aWRHZW5lcmF0b3IiLCJtb3VudFBsdWdpbnMiLCJwbHVnaW5OYW1lcyIsIk9iamVjdCIsImtleXMiLCJmb3JFYWNoIiwibmFtZSIsIndpbGxNb3VudCIsImRpZE1vdW50IiwidW5tb3VudFBsdWdpbnMiLCJwbHVnaW4iLCJwbHVnaW5XaWxsVW5tb3VudCIsInByb3RvdHlwZSIsImxheW91dCIsIndpbmRvdyIsImFkZEV2ZW50TGlzdGVuZXIiLCJ3bmQiLCJrZXkiLCJhdHRhY2hXaW5kb3ciLCJkb2NrSWQiLCJkZXNjcmlwdGlvbiIsInNwbGFzaENvbXBvbmVudCIsImRpc3BsYXlMYXlvdXQiLCJwbHVnaW5DbGFzcyIsInBhcmFtZXRlcnMiLCJtYXBQbHVnaW4iLCJzZXR1cCIsImZvcmVncm91bmQiLCJkZXR0YWNoV2luZG93IiwiaWQiLCJjbG9zZSIsInByZXZfZm9jdXNlZCIsIm5vdGlmeUJsdXIiLCJub3RpZnlGb2N1c0NoYW5nZSIsIm5vdGlmeUZvY3VzIiwid2luZG93Q2xhc3MiLCJwYXJlbnQiLCJvcHRpb25zIiwib3Blbk5ldyIsImZpbmRPbmVXaW5kb3dCeUNsYXNzIiwidXBkYXRlT3B0aW9ucyIsImRvY2tXaW5kb3ciLCJmaW5kQWxsV2luZG93c0J5Q2xhc3MiLCJmaW5kQWxsV2luZG93c0J5UGx1Z2luIiwicmVtb3ZlV2luZG93Iiwid2luZG93SWQiLCJwdXNoIiwidmFsdWVzIl0sIm1hcHBpbmdzIjoiOzs7Ozs7O3FqQkFBQTs7O0FBQ0E7O0FBQ0E7Ozs7SUFFYUEsYSxXQUFBQSxhO0FBYVgseUJBQVlDLFdBQVosRUFBeUI7QUFBQTs7QUFBQTs7QUFBQSxTQVp6QkMs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WUFBSSxLQUFLQSxPQUFMLENBQWFrRCxRQUFiLEVBQXVCVixXQUF2QixLQUF1Q0EsV0FBM0MsRUFBd0Q7QUFDdEQsaUJBQU8sS0FBS3hDLE9BQUwsQ0FBYWtELFFBQWIsQ0FBUDtBQUNEO0FBQ0Y7QUFDRCxhQUFPLElBQVA7QUFDRDs7OzJDQUNzQm5DLE0sRUFBZ0Q7QUFDckUsVUFBTWYsVUFBVSxFQUFoQjtBQUNBLFVBQUllLE1BQUosRUFBWTtBQUNWLFlBQUltQyxpQkFBSjtBQUNBLGFBQUtBLFFBQUwsSUFBaUIsS0FBS2xELE9BQXRCLEVBQStCO0FBQzdCLGNBQUksS0FBS0EsT0FBTCxDQUFha0QsUUFBYixFQUF1Qm5DLE1BQXZCLEtBQWtDQSxNQUF0QyxFQUE4QztBQUM1Q2Ysb0JBQVFtRCxJQUFSLENBQWEsS0FBS25ELE9BQUwsQ0FBYWtELFFBQWIsQ0FBYjtBQUNEO0FBQ0Y7QUFDRjtBQUNELGFBQU9sRCxPQUFQO0FBQ0Q7OzswQ0FDcUJ3QyxXLEVBQWlEO0FBQ3JFLFVBQUlBLFdBQUosRUFBaUI7QUFDZixZQUFJVSxpQkFBSjtBQUNBLFlBQU1sRCxVQUFVLEVBQWhCO0FBQ0EsYUFBS2tELFFBQUwsSUFBaUIsS0FBS2xELE9BQXRCLEVBQStCO0FBQzdCLGNBQUksS0FBS0EsT0FBTCxDQUFha0QsUUFBYixFQUF1QlYsV0FBdkIsS0FBdUNBLFdBQTNDLEVBQXdEO0FBQ3REeEMsb0JBQVFtRCxJQUFSLENBQWEsS0FBS25ELE9BQUwsQ0FBYWtELFFBQWIsQ0FBYjtBQUNEO0FBQ0Y7QUFDRCxlQUFPbEQsT0FBUDtBQUNELE9BVEQsTUFVSztBQUNILGVBQU8sS0FBS0EsT0FBTCxDQUFhb0QsTUFBYixFQUFQO0FBQ0Q7QUFDRiIsImZpbGUiOiJDb250ZXh0LmpzIiwic291cmNlc0NvbnRlbnQiOlsiLyogZXNsaW50LWRpc2FibGUgcmVhY3Qvbm8tbXVsdGktY29tcCAqL1xyXG5pbXBvcnQgeyBQbHVnaW5Db21wb25lbnQsIFBsdWdpbkNsYXNzIH0gZnJvbSBcIi4vUGx1Z2luXCJcclxuaW1wb3J0IHsgV2luZG93SW5zdGFuY2UsIFdpbmRvd0NsYXNzLCBXaW5kb3dDb250YWluZXIgfSBmcm9tIFwiLi9XaW5kb3dcIlxyXG5cclxuZXhwb3J0IGNsYXNzIFBsdWdpbkNvbnRleHQge1xyXG4gIHBsdWdpbkNsYXNzZXM6IHsgW3N0cmluZ106IFBsdWdpbkNsYXNzIH0gPSB7fVxyXG4gIHBsdWdpbnM6IHsgW3N0cmluZ106IFBsdWdpbkNvbXBvbmVudCB9ID0ge31cclxuICB3aW5kb3dzOiB7IFtzdHJpbmddOiBXaW5kb3dJbnN0YW5jZSB9ID0ge31cclxuICBkb2NrczogeyBbc3RyaW5nXTogQXJyYXk8V2luZG93SW5zdGFuY2U+IH0gPSB7fVxyXG4gIGZvY3VzZWQ6IFdpbmRvd0luc3RhbmNlID0gbnVsbFxyXG4gIGZyYW1lOiBGcmFtZSA9IG51bGxcclxuICBhcHBsaWNhdGlvbjogT2JqZWN0ID0gbnVsbFxyXG5cclxuICBkaXNwbGF5TGF5b3V0OiBPYmplY3RcclxuICB3aW5kb3dMb2FkZWQ6IGJvb2xlYW4gPSBmYWxzZVxyXG4gIHVpZEdlbmVyYXRvcjogbnVtYmVyID0gMFxyXG5cclxuICBjb25zdHJ1Y3RvcihhcHBsaWNhdGlvbikge1xyXG4gICAgdGhpcy5hcHBsaWNhdGlvbiA9IGFwcGxpY2F0aW9uXHJcbiAgICBQbHVnaW5Db21wb25lbnQucHJvdG90eXBlLmxheW91dCA9IHRoaXNcclxuICAgIFBsdWdpbkNvbXBvbmVudC5wcm90b3R5cGUuYXBwbGljYXRpb24gPSBhcHBsaWNhdGlvblxyXG4gICAgV2luZG93SW5zdGFuY2UucHJvdG90eXBlLmxheW91dCA9IHRoaXNcclxuICAgIFdpbmRvd0luc3RhbmNlLnByb3RvdHlwZS5hcHBsaWNhdGlvbiA9IGFwcGxpY2F0aW9uXHJcbiAgICBXaW5kb3dDb250YWluZXIucHJvdG90eXBlLmxheW91dCA9IHRoaXNcclxuICAgIFdpbmRvd0NvbnRhaW5lci5wcm90b3R5cGUuYXBwbGljYXRpb24gPSBhcHBsaWNhdGlvblxyXG4gICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoXCJiZWZvcmV1bmxvYWRcIiwgdGhpcy51bm1vdW50UGx1Z2lucylcclxuICB9XHJcbiAgcmVnaXN0ZXJGcmFtZShmcmFtZTogRnJhbWUpIHtcclxuICAgIHRoaXMuZnJhbWUgPSBmcmFtZVxyXG4gICAgZnJhbWUgJiYgT2JqZWN0LmtleXModGhpcy53aW5kb3dzKS5mb3JFYWNoKGtleT0+e1xyXG4gICAgICBjb25zdCB3bmQgPSB0aGlzLndpbmRvd3Nba2V5XVxyXG4gICAgICBmcmFtZS5hdHRhY2hXaW5kb3cod25kLCB3bmQuZG9ja0lkKVxyXG4gICAgfSlcclxuICB9XHJcbiAgbW91bnRQbHVnaW5zID0gKCkgPT4ge1xyXG4gICAgdGhpcy53aW5kb3dMb2FkZWQgPSB0cnVlXHJcbiAgICBjb25zdCBwbHVnaW5OYW1lcyA9IE9iamVjdC5rZXlzKHRoaXMucGx1Z2luQ2xhc3NlcylcclxuXHJcbiAgICAvLyBDb25uZWN0IHBsdWdpbnNcclxuICAgIHBsdWdpbk5hbWVzLmZvckVhY2gobmFtZSA9PiB7XHJcbiAgICAgIHRoaXMucGx1Z2luQ2xhc3Nlc1tuYW1lXS53aWxsTW91bnQoKVxyXG4gICAgfSlcclxuXHJcbiAgICAvLyBGaW5hbGl6ZSBwbHVnaW5zIG1vdW50XHJcbiAgICBwbHVnaW5OYW1lcy5mb3JFYWNoKG5hbWUgPT4ge1xyXG4gICAgICB0aGlzLnBsdWdpbkNsYXNzZXNbbmFtZV0uZGlkTW91bnQoKVxyXG4gICAgfSlcclxuICB9XHJcbiAgdW5tb3VudFBsdWdpbnMgPSAoKSA9PiB7XHJcbiAgICBPYmplY3Qua2V5cyh0aGlzLnBsdWdpbnMpLmZvckVhY2gobmFtZSA9PiB7XHJcbiAgICAgIGNvbnN0IHBsdWdpbiA9IHRoaXMucGx1Z2luc1tuYW1lXVxyXG4gICAgICBwbHVnaW4ucGx1Z2luV2lsbFVubW91bnQoKVxyXG4gICAgfSlcclxuICB9XHJcbiAgY29uZmlndXJlTGF5b3V0KGRlc2NyaXB0aW9uOiBPYmplY3QpIHtcclxuICAgIHRoaXMuc3BsYXNoQ29tcG9uZW50ID0gZGVzY3JpcHRpb24uc3BsYXNoQ29tcG9uZW50XHJcbiAgICB0aGlzLmRpc3BsYXlMYXlvdXQgPSBkZXNjcmlwdGlvbi5kaXNwbGF5TGF5b3V0XHJcbiAgfVxyXG4gIG1hcFBsdWdpbihuYW1lKSB7XHJcbiAgICBsZXQgcGx1Z2luQ2xhc3MgPSB0aGlzLnBsdWdpbkNsYXNzZXNbbmFtZV1cclxuICAgIGlmICghcGx1Z2luQ2xhc3MpIHtcclxuICAgICAgcGx1Z2luQ2xhc3MgPSBuZXcgUGx1Z2luQ2xhc3MobmFtZSwgdGhpcylcclxuICAgICAgdGhpcy5wbHVnaW5DbGFzc2VzW25hbWVdID0gcGx1Z2luQ2xhc3NcclxuICAgIH1cclxuICAgIHJldHVybiBwbHVnaW5DbGFzc1xyXG4gIH1cclxuICBpbnN0YWxsUGx1Z2luKGRlc2NyaXB0aW9uOiBPYmplY3QsIHBhcmFtZXRlcnM6IE9iamVjdCk6IFBsdWdpbkNsYXNzIHtcclxuICAgIGNvbnN0IHBsdWdpbkNsYXNzID0gdGhpcy5tYXBQbHVnaW4oZGVzY3JpcHRpb24ubmFtZSlcclxuICAgIHBsdWdpbkNsYXNzLnNldHVwKGRlc2NyaXB0aW9uLCBwYXJhbWV0ZXJzKVxyXG4gICAgcmV0dXJuIHBsdWdpbkNsYXNzXHJcbiAgfVxyXG4gIGRvY2tXaW5kb3cod25kOiBXaW5kb3dJbnN0YW5jZSwgZG9ja0lkOiBEb2NrSUQsIGZvcmVncm91bmQ6IGJvb2xlYW4pIHtcclxuICAgIHRoaXMuZnJhbWUgJiYgdGhpcy5mcmFtZS5hdHRhY2hXaW5kb3cod25kLCBkb2NrSWQsIGZvcmVncm91bmQpXHJcbiAgfVxyXG4gIGRldHRhY2hXaW5kb3cod25kOiBXaW5kb3dJbnN0YW5jZSkge1xyXG4gICAgdGhpcy5mcmFtZSAmJiB0aGlzLmZyYW1lLmRldHRhY2hXaW5kb3cod25kKVxyXG4gIH1cclxuICByZW1vdmVXaW5kb3cod25kOiBXaW5kb3dJbnN0YW5jZSkge1xyXG4gICAgdGhpcy5kZXR0YWNoV2luZG93KHduZClcclxuICAgIGRlbGV0ZSB0aGlzLndpbmRvd3Nbd25kLmlkXVxyXG4gICAgd25kLmNsb3NlKClcclxuICB9XHJcbiAgZm9jdXNPbldpbmRvdyhmb2N1c2VkOiBXaW5kb3dJbnN0YW5jZSkge1xyXG4gICAgY29uc3QgcHJldl9mb2N1c2VkID0gdGhpcy5mb2N1c2VkXHJcbiAgICBpZihwcmV2X2ZvY3VzZWQgIT09IGZvY3VzZWQpIHtcclxuICAgICAgdGhpcy5mb2N1c2VkID0gZm9jdXNlZFxyXG4gICAgICBwcmV2X2ZvY3VzZWQgJiYgcHJldl9mb2N1c2VkLm5vdGlmeUJsdXIoKVxyXG4gICAgICB0aGlzLmZyYW1lICYmIHRoaXMuZnJhbWUubm90aWZ5Rm9jdXNDaGFuZ2UodGhpcy5mb2N1c2VkLCBwcmV2X2ZvY3VzZWQpXHJcbiAgICAgIHRoaXMuZm9jdXNlZCAmJiB0aGlzLmZvY3VzZWQubm90aWZ5Rm9jdXMoKVxyXG4gICAgfVxyXG4gIH1cclxuICBvcGVuU3ViV2luZG93KHdpbmRvd0NsYXNzOiBXaW5kb3dDbGFzcywgcGFyZW50OiBXaW5kb3dJbnN0YW5jZSwgb3B0aW9uczogV2luZG93T3B0aW9ucykge1xyXG4gICAgaWYgKHdpbmRvd0NsYXNzICYmIHBhcmVudCkge1xyXG4gICAgICBsZXQgd25kID0gKG9wdGlvbnMgJiYgb3B0aW9ucy5vcGVuTmV3KSA/IG51bGwgOiB0aGlzLmZpbmRPbmVXaW5kb3dCeUNsYXNzKHdpbmRvd0NsYXNzKVxyXG4gICAgICBpZiAoIXduZCkge1xyXG4gICAgICAgIHduZCA9IG5ldyBXaW5kb3dJbnN0YW5jZShcIiNcIiArICh0aGlzLnVpZEdlbmVyYXRvcisrKSwgd2luZG93Q2xhc3MsIHBhcmVudCwgcGFyZW50LnBsdWdpbiwgb3B0aW9ucylcclxuICAgICAgfVxyXG4gICAgICBlbHNlIHtcclxuICAgICAgICBvcHRpb25zICYmIHduZC51cGRhdGVPcHRpb25zKG9wdGlvbnMpXHJcbiAgICAgIH1cclxuICAgICAgdGhpcy5kb2NrV2luZG93KHduZCwgd25kLmRvY2tJZCwgdHJ1ZSlcclxuICAgIH1cclxuICB9XHJcbiAgb3BlblBsdWdpbldpbmRvdyh3aW5kb3dDbGFzczogV2luZG93Q2xhc3MsIHBsdWdpbjogUGx1Z2luQ29tcG9uZW50LCBvcHRpb25zOiBXaW5kb3dPcHRpb25zKSB7XHJcbiAgICBpZiAod2luZG93Q2xhc3MpIHtcclxuICAgICAgbGV0IHduZCA9IChvcHRpb25zICYmIG9wdGlvbnMub3Blbk5ldykgPyBudWxsIDogdGhpcy5maW5kT25lV2luZG93QnlDbGFzcyh3aW5kb3dDbGFzcylcclxuICAgICAgaWYgKCF3bmQpIHtcclxuICAgICAgICB3bmQgPSBuZXcgV2luZG93SW5zdGFuY2UoXCIjXCIgKyAodGhpcy51aWRHZW5lcmF0b3IrKyksIHdpbmRvd0NsYXNzLCBudWxsLCBwbHVnaW4sIG9wdGlvbnMpXHJcbiAgICAgIH1cclxuICAgICAgZWxzZSB7XHJcbiAgICAgICAgb3B0aW9ucyAmJiB3bmQudXBkYXRlT3B0aW9ucyhvcHRpb25zKVxyXG4gICAgICB9XHJcbiAgICAgIHRoaXMuZG9ja1dpbmRvdyh3bmQsIHduZC5kb2NrSWQsIHRydWUpXHJcbiAgICB9XHJcbiAgfVxyXG4gIGNsb3NlUGx1Z2luV2luZG93cyh3aW5kb3dDbGFzczogV2luZG93Q2xhc3MsIHBsdWdpbjogUGx1Z2luQ29tcG9uZW50KSB7XHJcbiAgICBsZXQgd2luZG93c1xyXG4gICAgaWYgKHdpbmRvd0NsYXNzKSB3aW5kb3dzID0gdGhpcy5maW5kQWxsV2luZG93c0J5Q2xhc3Mod2luZG93Q2xhc3MpXHJcbiAgICBlbHNlIHdpbmRvd3MgPSB0aGlzLmZpbmRBbGxXaW5kb3dzQnlQbHVnaW4ocGx1Z2luKVxyXG4gICAgd2luZG93cy5mb3JFYWNoKHduZCA9PiB0aGlzLnJlbW92ZVdpbmRvdyh3bmQpKVxyXG4gIH1cclxuICBnZXRXaW5kb3dJbnN0YW5jZSh3aW5kb3dJZDogV2luZG93SUQpIHtcclxuICAgIHJldHVybiB0aGlzLndpbmRvd3Nbd2luZG93SWRdXHJcbiAgfVxyXG4gIGZpbmRPbmVXaW5kb3dCeUNsYXNzKHdpbmRvd0NsYXNzOiBXaW5kb3dDbGFzcyk6IFdpbmRvd0luc3RhbmNlIHtcclxuICAgIGxldCB3aW5kb3dJZFxyXG4gICAgZm9yICh3aW5kb3dJZCBpbiB0aGlzLndpbmRvd3MpIHtcclxuICAgICAgaWYgKHRoaXMud2luZG93c1t3aW5kb3dJZF0ud2luZG93Q2xhc3MgPT09IHdpbmRvd0NsYXNzKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMud2luZG93c1t3aW5kb3dJZF1cclxuICAgICAgfVxyXG4gICAgfVxyXG4gICAgcmV0dXJuIG51bGxcclxuICB9XHJcbiAgZmluZEFsbFdpbmRvd3NCeVBsdWdpbihwbHVnaW46IFBsdWdpbkNvbXBvbmVudCk6IEFycmF5PFdpbmRvd0luc3RhbmNlPiB7XHJcbiAgICBjb25zdCB3aW5kb3dzID0gW11cclxuICAgIGlmIChwbHVnaW4pIHtcclxuICAgICAgbGV0IHdpbmRvd0lkXHJcbiAgICAgIGZvciAod2luZG93SWQgaW4gdGhpcy53aW5kb3dzKSB7XHJcbiAgICAgICAgaWYgKHRoaXMud2luZG93c1t3aW5kb3dJZF0ucGx1Z2luID09PSBwbHVnaW4pIHtcclxuICAgICAgICAgIHdpbmRvd3MucHVzaCh0aGlzLndpbmRvd3Nbd2luZG93SWRdKVxyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgfVxyXG4gICAgcmV0dXJuIHdpbmRvd3NcclxuICB9XHJcbiAgZmluZEFsbFdpbmRvd3NCeUNsYXNzKHdpbmRvd0NsYXNzOiBXaW5kb3dDbGFzcyk6IEFycmF5PFdpbmRvd0luc3RhbmNlPiB7XHJcbiAgICBpZiAod2luZG93Q2xhc3MpIHtcclxuICAgICAgbGV0IHdpbmRvd0lkXHJcbiAgICAgIGNvbnN0IHdpbmRvd3MgPSBbXVxyXG4gICAgICBmb3IgKHdpbmRvd0lkIGluIHRoaXMud2luZG93cykge1xyXG4gICAgICAgIGlmICh0aGlzLndpbmRvd3Nbd2luZG93SWRdLndpbmRvd0NsYXNzID09PSB3aW5kb3dDbGFzcykge1xyXG4gICAgICAgICAgd2luZG93cy5wdXNoKHRoaXMud2luZG93c1t3aW5kb3dJZF0pXHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICAgIHJldHVybiB3aW5kb3dzXHJcbiAgICB9XHJcbiAgICBlbHNlIHtcclxuICAgICAgcmV0dXJuIHRoaXMud2luZG93cy52YWx1ZXMoKVxyXG4gICAgfVxyXG4gIH1cclxufVxyXG4iXX0=