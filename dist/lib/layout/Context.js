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
    value: function dettachWindow(windowId) {
      var wnd = this.windows[windowId];
      this.frame && this.frame.dettachWindow(wnd);
    }
  }, {
    key: "removeWindow",
    value: function removeWindow(windowId) {
      var wnd = this.windows[windowId];
      this.dettachWindow(wnd);
      delete this.windows[windowId];
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9saWIvbGF5b3V0L0NvbnRleHQuanMiXSwibmFtZXMiOlsiUGx1Z2luQ29udGV4dCIsImFwcGxpY2F0aW9uIiwicGx1Z2luQ2xhc3NlcyIsInBsdWdpbnMiLCJ3aW5kb3dzIiwiZG9ja3MiLCJmb2N1c2VkIiwiZnJhbWUiLCJ3aW5kb3dMb2FkZWQiLCJ1aWRHZW5lcmF0b3IiLCJtb3VudFBsdWdpbnMiLCJwbHVnaW5OYW1lcyIsIk9iamVjdCIsImtleXMiLCJmb3JFYWNoIiwibmFtZSIsIndpbGxNb3VudCIsImRpZE1vdW50IiwidW5tb3VudFBsdWdpbnMiLCJwbHVnaW4iLCJwbHVnaW5XaWxsVW5tb3VudCIsInByb3RvdHlwZSIsImxheW91dCIsIndpbmRvdyIsImFkZEV2ZW50TGlzdGVuZXIiLCJ3bmQiLCJrZXkiLCJhdHRhY2hXaW5kb3ciLCJkb2NrSWQiLCJkZXNjcmlwdGlvbiIsInNwbGFzaENvbXBvbmVudCIsImRpc3BsYXlMYXlvdXQiLCJwbHVnaW5DbGFzcyIsInBhcmFtZXRlcnMiLCJtYXBQbHVnaW4iLCJzZXR1cCIsImZvcmVncm91bmQiLCJ3aW5kb3dJZCIsImRldHRhY2hXaW5kb3ciLCJjbG9zZSIsInByZXZfZm9jdXNlZCIsIm5vdGlmeUJsdXIiLCJub3RpZnlGb2N1c0NoYW5nZSIsIm5vdGlmeUZvY3VzIiwid2luZG93Q2xhc3MiLCJwYXJlbnQiLCJvcHRpb25zIiwib3Blbk5ldyIsImZpbmRPbmVXaW5kb3dCeUNsYXNzIiwidXBkYXRlT3B0aW9ucyIsImRvY2tXaW5kb3ciLCJmaW5kQWxsV2luZG93c0J5Q2xhc3MiLCJmaW5kQWxsV2luZG93c0J5UGx1Z2luIiwicmVtb3ZlV2luZG93IiwiaWQiLCJwdXNoIiwidmFsdWVzIl0sIm1hcHBpbmdzIjoiOzs7Ozs7O3FqQkFBQTs7O0FBQ0E7O0FBQ0E7Ozs7SUFFYUEsYSxXQUFBQSxhO0FBYVgseUJBQVlDLFdBQVosRUFBeUI7QUFBQTs7QUFBQTs7QUFBQSxTQVp6QkMsYUFZeUIsR0Faa0IsRUFZbEI7QUFBQSxTQVh6QkMsT0FXeUIsR0FYZ0IsRUFXaEI7QUFBQSxTQVZ6QkMsT0FVeUIsR0FWZSxFQVVmO0FBQUEsU0FUekJDLEtBU3lCLEdBVG9CLEVBU3BCO0FBQUEsU0FSekJDLE9BUXlCLEdBUkMsSUFRRDtBQUFBLFNBUHpCQyxLQU95QixHQVBWLElBT1U7QUFBQSxTQU56Qk4sV0FNeUIsR0FOSCxJQU1HO0FBQUEsU0FIekJPLFlBR3lCLEdBSEQsS0FHQztBQUFBLFNBRnpCQyxZQUV5QixHQUZGLENBRUU7O0FBQUEsU0FpQnpCQyxZQWpCeUIsR0FpQlYsWUFBTTtBQUNuQixZQUFLRixZQUFMLEdBQW9CLElBQXBCO0FBQ0EsVUFBTUcsY0FBY0MsT0FBT0MsSUFBUCxDQUFZLE1BQUtYLGFBQWpCLENBQXBCOztBQUVBO0FBQ0FTLGtCQUFZRyxPQUFaLENBQW9CLGdCQUFRO0FBQzFCLGNBQUtaLGFBQUwsQ0FBbUJhLElBQW5CLEVBQXlCQyxTQUF6QjtBQUNELE9BRkQ7O0FBSUE7QUFDQUwsa0JBQVlHLE9BQVosQ0FBb0IsZ0JBQVE7QUFDMUIsY0FBS1osYUFBTCxDQUFtQmEsSUFBbkIsRUFBeUJFLFFBQXpCO0FBQ0QsT0FGRDtBQUdELEtBOUJ3Qjs7QUFBQSxTQStCekJDLGNBL0J5QixHQStCUixZQUFNO0FBQ3JCTixhQUFPQyxJQUFQLENBQVksTUFBS1YsT0FBakIsRUFBMEJXLE9BQTFCLENBQWtDLGdCQUFRO0FBQ3hDLFlBQU1LLFNBQVMsTUFBS2hCLE9BQUwsQ0FBYVksSUFBYixDQUFmO0FBQ0FJLGVBQU9DLGlCQUFQO0FBQ0QsT0FIRDtBQUlELEtBcEN3Qjs7QUFDdkIsU0FBS25CLFdBQUwsR0FBbUJBLFdBQW5CO0FBQ0EsNEJBQWdCb0IsU0FBaEIsQ0FBMEJDLE1BQTFCLEdBQW1DLElBQW5DO0FBQ0EsNEJBQWdCRCxTQUFoQixDQUEwQnBCLFdBQTFCLEdBQXdDQSxXQUF4QztBQUNBLDJCQUFlb0IsU0FBZixDQUF5QkMsTUFBekIsR0FBa0MsSUFBbEM7QUFDQSwyQkFBZUQsU0FBZixDQUF5QnBCLFdBQXpCLEdBQXVDQSxXQUF2QztBQUNBLDRCQUFnQm9CLFNBQWhCLENBQTBCQyxNQUExQixHQUFtQyxJQUFuQztBQUNBLDRCQUFnQkQsU0FBaEIsQ0FBMEJwQixXQUExQixHQUF3Q0EsV0FBeEM7QUFDQXNCLFdBQU9DLGdCQUFQLENBQXdCLGNBQXhCLEVBQXdDLEtBQUtOLGNBQTdDO0FBQ0Q7Ozs7a0NBQ2FYLEssRUFBYztBQUFBOztBQUMxQixXQUFLQSxLQUFMLEdBQWFBLEtBQWI7QUFDQUEsZUFBU0ssT0FBT0MsSUFBUCxDQUFZLEtBQUtULE9BQWpCLEVBQTBCVSxPQUExQixDQUFrQyxlQUFLO0FBQzlDLFlBQU1XLE1BQU0sT0FBS3JCLE9BQUwsQ0FBYXNCLEdBQWIsQ0FBWjtBQUNBbkIsY0FBTW9CLFlBQU4sQ0FBbUJGLEdBQW5CLEVBQXdCQSxJQUFJRyxNQUE1QjtBQUNELE9BSFEsQ0FBVDtBQUlEOzs7b0NBcUJlQyxXLEVBQXFCO0FBQ25DLFdBQUtDLGVBQUwsR0FBdUJELFlBQVlDLGVBQW5DO0FBQ0EsV0FBS0MsYUFBTCxHQUFxQkYsWUFBWUUsYUFBakM7QUFDRDs7OzhCQUNTaEIsSSxFQUFNO0FBQ2QsVUFBSWlCLGNBQWMsS0FBSzlCLGFBQUwsQ0FBbUJhLElBQW5CLENBQWxCO0FBQ0EsVUFBSSxDQUFDaUIsV0FBTCxFQUFrQjtBQUNoQkEsc0JBQWMsd0JBQWdCakIsSUFBaEIsRUFBc0IsSUFBdEIsQ0FBZDtBQUNBLGFBQUtiLGFBQUwsQ0FBbUJhLElBQW5CLElBQTJCaUIsV0FBM0I7QUFDRDtBQUNELGFBQU9BLFdBQVA7QUFDRDs7O2tDQUNhSCxXLEVBQXFCSSxVLEVBQWlDO0FBQ2xFLFVBQU1ELGNBQWMsS0FBS0UsU0FBTCxDQUFlTCxZQUFZZCxJQUEzQixDQUFwQjtBQUNBaUIsa0JBQVlHLEtBQVosQ0FBa0JOLFdBQWxCLEVBQStCSSxVQUEvQjtBQUNBLGFBQU9ELFdBQVA7QUFDRDs7OytCQUNVUCxHLEVBQXFCRyxNLEVBQWdCUSxVLEVBQXFCO0FBQ25FLFdBQUs3QixLQUFMLElBQWMsS0FBS0EsS0FBTCxDQUFXb0IsWUFBWCxDQUF3QkYsR0FBeEIsRUFBNkJHLE1BQTdCLEVBQXFDUSxVQUFyQyxDQUFkO0FBQ0Q7OztrQ0FDYUMsUSxFQUFvQjtBQUNoQyxVQUFNWixNQUFNLEtBQUtyQixPQUFMLENBQWFpQyxRQUFiLENBQVo7QUFDQSxXQUFLOUIsS0FBTCxJQUFjLEtBQUtBLEtBQUwsQ0FBVytCLGFBQVgsQ0FBeUJiLEdBQXpCLENBQWQ7QUFDRDs7O2lDQUNZWSxRLEVBQW9CO0FBQy9CLFVBQU1aLE1BQU0sS0FBS3JCLE9BQUwsQ0FBYWlDLFFBQWIsQ0FBWjtBQUNBLFdBQUtDLGFBQUwsQ0FBbUJiLEdBQW5CO0FBQ0EsYUFBTyxLQUFLckIsT0FBTCxDQUFhaUMsUUFBYixDQUFQO0FBQ0FaLFVBQUljLEtBQUo7QUFDRDs7O2tDQUNhakMsTyxFQUF5QjtBQUNyQyxVQUFNa0MsZUFBZSxLQUFLbEMsT0FBMUI7QUFDQSxVQUFHa0MsaUJBQWlCbEMsT0FBcEIsRUFBNkI7QUFDM0IsYUFBS0EsT0FBTCxHQUFlQSxPQUFmO0FBQ0FrQyx3QkFBZ0JBLGFBQWFDLFVBQWIsRUFBaEI7QUFDQSxhQUFLbEMsS0FBTCxJQUFjLEtBQUtBLEtBQUwsQ0FBV21DLGlCQUFYLENBQTZCLEtBQUtwQyxPQUFsQyxFQUEyQ2tDLFlBQTNDLENBQWQ7QUFDQSxhQUFLbEMsT0FBTCxJQUFnQixLQUFLQSxPQUFMLENBQWFxQyxXQUFiLEVBQWhCO0FBQ0Q7QUFDRjs7O2tDQUNhQyxXLEVBQTBCQyxNLEVBQXdCQyxPLEVBQXdCO0FBQ3RGLFVBQUlGLGVBQWVDLE1BQW5CLEVBQTJCO0FBQ3pCLFlBQUlwQixNQUFPcUIsV0FBV0EsUUFBUUMsT0FBcEIsR0FBK0IsSUFBL0IsR0FBc0MsS0FBS0Msb0JBQUwsQ0FBMEJKLFdBQTFCLENBQWhEO0FBQ0EsWUFBSSxDQUFDbkIsR0FBTCxFQUFVO0FBQ1JBLGdCQUFNLDJCQUFtQixNQUFPLEtBQUtoQixZQUFMLEVBQTFCLEVBQWdEbUMsV0FBaEQsRUFBNkRDLE1BQTdELEVBQXFFQSxPQUFPMUIsTUFBNUUsRUFBb0YyQixXQUFXLEVBQS9GLENBQU47QUFDRCxTQUZELE1BR0s7QUFDSEEscUJBQVdyQixJQUFJd0IsYUFBSixDQUFrQkgsT0FBbEIsQ0FBWDtBQUNEO0FBQ0QsYUFBS0ksVUFBTCxDQUFnQnpCLEdBQWhCLEVBQXFCQSxJQUFJRyxNQUF6QixFQUFpQyxJQUFqQztBQUNEO0FBQ0Y7OztxQ0FDZ0JnQixXLEVBQTBCekIsTSxFQUF5QjJCLE8sRUFBd0I7QUFDMUYsVUFBSUYsV0FBSixFQUFpQjtBQUNmLFlBQUluQixNQUFPcUIsV0FBV0EsUUFBUUMsT0FBcEIsR0FBK0IsSUFBL0IsR0FBc0MsS0FBS0Msb0JBQUwsQ0FBMEJKLFdBQTFCLENBQWhEO0FBQ0EsWUFBSSxDQUFDbkIsR0FBTCxFQUFVO0FBQ1JBLGdCQUFNLDJCQUFtQixNQUFPLEtBQUtoQixZQUFMLEVBQTFCLEVBQWdEbUMsV0FBaEQsRUFBNkQsSUFBN0QsRUFBbUV6QixNQUFuRSxFQUEyRTJCLFdBQVcsRUFBdEYsQ0FBTjtBQUNELFNBRkQsTUFHSztBQUNIQSxxQkFBV3JCLElBQUl3QixhQUFKLENBQWtCSCxPQUFsQixDQUFYO0FBQ0Q7QUFDRCxhQUFLSSxVQUFMLENBQWdCekIsR0FBaEIsRUFBcUJBLElBQUlHLE1BQXpCLEVBQWlDLElBQWpDO0FBQ0Q7QUFDRjs7O3VDQUNrQmdCLFcsRUFBMEJ6QixNLEVBQXlCO0FBQUE7O0FBQ3BFLFVBQUlmLGdCQUFKO0FBQ0EsVUFBSXdDLFdBQUosRUFBaUJ4QyxVQUFVLEtBQUsrQyxxQkFBTCxDQUEyQlAsV0FBM0IsQ0FBVixDQUFqQixLQUNLeEMsVUFBVSxLQUFLZ0Qsc0JBQUwsQ0FBNEJqQyxNQUE1QixDQUFWO0FBQ0xmLGNBQVFVLE9BQVIsQ0FBZ0I7QUFBQSxlQUFPLE9BQUt1QyxZQUFMLENBQWtCNUIsSUFBSTZCLEVBQXRCLENBQVA7QUFBQSxPQUFoQjtBQUNEOzs7c0NBQ2lCakIsUSxFQUFvQjtBQUNwQyxhQUFPLEtBQUtqQyxPQUFMLENBQWFpQyxRQUFiLENBQVA7QUFDRDs7O3lDQUNvQk8sVyxFQUEwQztBQUM3RCxVQUFJUCxpQkFBSjtBQUNBLFdBQUtBLFFBQUwsSUFBaUIsS0FBS2pDLE9BQXRCLEVBQStCO0FBQzdCLFlBQUksS0FBS0EsT0FBTCxDQUFhaUMsUUFBYixFQUF1Qk8sV0FBdkIsS0FBdUNBLFdBQTNDLEVBQXdEO0FBQ3RELGlCQUFPLEtBQUt4QyxPQUFMLENBQWFpQyxRQUFiLENBQVA7QUFDRDtBQUNGO0FBQ0QsYUFBTyxJQUFQO0FBQ0Q7OzsyQ0FDc0JsQixNLEVBQWdEO0FBQ3JFLFVBQU1mLFVBQVUsRUFBaEI7QUFDQSxVQUFJZSxNQUFKLEVBQVk7QUFDVixZQUFJa0IsaUJBQUo7QUFDQSxhQUFLQSxRQUFMLElBQWlCLEtBQUtqQyxPQUF0QixFQUErQjtBQUM3QixjQUFJLEtBQUtBLE9BQUwsQ0FBYWlDLFFBQWIsRUFBdUJsQixNQUF2QixLQUFrQ0EsTUFBdEMsRUFBOEM7QUFDNUNmLG9CQUFRbUQsSUFBUixDQUFhLEtBQUtuRCxPQUFMLENBQWFpQyxRQUFiLENBQWI7QUFDRDtBQUNGO0FBQ0Y7QUFDRCxhQUFPakMsT0FBUDtBQUNEOzs7MENBQ3FCd0MsVyxFQUFpRDtBQUNyRSxVQUFJQSxXQUFKLEVBQWlCO0FBQ2YsWUFBSVAsaUJBQUo7QUFDQSxZQUFNakMsVUFBVSxFQUFoQjtBQUNBLGFBQUtpQyxRQUFMLElBQWlCLEtBQUtqQyxPQUF0QixFQUErQjtBQUM3QixjQUFJLEtBQUtBLE9BQUwsQ0FBYWlDLFFBQWIsRUFBdUJPLFdBQXZCLEtBQXVDQSxXQUEzQyxFQUF3RDtBQUN0RHhDLG9CQUFRbUQsSUFBUixDQUFhLEtBQUtuRCxPQUFMLENBQWFpQyxRQUFiLENBQWI7QUFDRDtBQUNGO0FBQ0QsZUFBT2pDLE9BQVA7QUFDRCxPQVRELE1BVUs7QUFDSCxlQUFPLEtBQUtBLE9BQUwsQ0FBYW9ELE1BQWIsRUFBUDtBQUNEO0FBQ0YiLCJmaWxlIjoiQ29udGV4dC5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8qIGVzbGludC1kaXNhYmxlIHJlYWN0L25vLW11bHRpLWNvbXAgKi9cclxuaW1wb3J0IHsgUGx1Z2luQ29tcG9uZW50LCBQbHVnaW5DbGFzcyB9IGZyb20gXCIuL1BsdWdpblwiXHJcbmltcG9ydCB7IFdpbmRvd0luc3RhbmNlLCBXaW5kb3dDbGFzcywgV2luZG93Q29udGFpbmVyLCBXaW5kb3dJRCB9IGZyb20gXCIuL1dpbmRvd1wiXHJcblxyXG5leHBvcnQgY2xhc3MgUGx1Z2luQ29udGV4dCB7XHJcbiAgcGx1Z2luQ2xhc3NlczogeyBbc3RyaW5nXTogUGx1Z2luQ2xhc3MgfSA9IHt9XHJcbiAgcGx1Z2luczogeyBbc3RyaW5nXTogUGx1Z2luQ29tcG9uZW50IH0gPSB7fVxyXG4gIHdpbmRvd3M6IHsgW3N0cmluZ106IFdpbmRvd0luc3RhbmNlIH0gPSB7fVxyXG4gIGRvY2tzOiB7IFtzdHJpbmddOiBBcnJheTxXaW5kb3dJbnN0YW5jZT4gfSA9IHt9XHJcbiAgZm9jdXNlZDogV2luZG93SW5zdGFuY2UgPSBudWxsXHJcbiAgZnJhbWU6IEZyYW1lID0gbnVsbFxyXG4gIGFwcGxpY2F0aW9uOiBPYmplY3QgPSBudWxsXHJcblxyXG4gIGRpc3BsYXlMYXlvdXQ6IE9iamVjdFxyXG4gIHdpbmRvd0xvYWRlZDogYm9vbGVhbiA9IGZhbHNlXHJcbiAgdWlkR2VuZXJhdG9yOiBudW1iZXIgPSAwXHJcblxyXG4gIGNvbnN0cnVjdG9yKGFwcGxpY2F0aW9uKSB7XHJcbiAgICB0aGlzLmFwcGxpY2F0aW9uID0gYXBwbGljYXRpb25cclxuICAgIFBsdWdpbkNvbXBvbmVudC5wcm90b3R5cGUubGF5b3V0ID0gdGhpc1xyXG4gICAgUGx1Z2luQ29tcG9uZW50LnByb3RvdHlwZS5hcHBsaWNhdGlvbiA9IGFwcGxpY2F0aW9uXHJcbiAgICBXaW5kb3dJbnN0YW5jZS5wcm90b3R5cGUubGF5b3V0ID0gdGhpc1xyXG4gICAgV2luZG93SW5zdGFuY2UucHJvdG90eXBlLmFwcGxpY2F0aW9uID0gYXBwbGljYXRpb25cclxuICAgIFdpbmRvd0NvbnRhaW5lci5wcm90b3R5cGUubGF5b3V0ID0gdGhpc1xyXG4gICAgV2luZG93Q29udGFpbmVyLnByb3RvdHlwZS5hcHBsaWNhdGlvbiA9IGFwcGxpY2F0aW9uXHJcbiAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcihcImJlZm9yZXVubG9hZFwiLCB0aGlzLnVubW91bnRQbHVnaW5zKVxyXG4gIH1cclxuICByZWdpc3RlckZyYW1lKGZyYW1lOiBGcmFtZSkge1xyXG4gICAgdGhpcy5mcmFtZSA9IGZyYW1lXHJcbiAgICBmcmFtZSAmJiBPYmplY3Qua2V5cyh0aGlzLndpbmRvd3MpLmZvckVhY2goa2V5PT57XHJcbiAgICAgIGNvbnN0IHduZCA9IHRoaXMud2luZG93c1trZXldXHJcbiAgICAgIGZyYW1lLmF0dGFjaFdpbmRvdyh3bmQsIHduZC5kb2NrSWQpXHJcbiAgICB9KVxyXG4gIH1cclxuICBtb3VudFBsdWdpbnMgPSAoKSA9PiB7XHJcbiAgICB0aGlzLndpbmRvd0xvYWRlZCA9IHRydWVcclxuICAgIGNvbnN0IHBsdWdpbk5hbWVzID0gT2JqZWN0LmtleXModGhpcy5wbHVnaW5DbGFzc2VzKVxyXG5cclxuICAgIC8vIENvbm5lY3QgcGx1Z2luc1xyXG4gICAgcGx1Z2luTmFtZXMuZm9yRWFjaChuYW1lID0+IHtcclxuICAgICAgdGhpcy5wbHVnaW5DbGFzc2VzW25hbWVdLndpbGxNb3VudCgpXHJcbiAgICB9KVxyXG5cclxuICAgIC8vIEZpbmFsaXplIHBsdWdpbnMgbW91bnRcclxuICAgIHBsdWdpbk5hbWVzLmZvckVhY2gobmFtZSA9PiB7XHJcbiAgICAgIHRoaXMucGx1Z2luQ2xhc3Nlc1tuYW1lXS5kaWRNb3VudCgpXHJcbiAgICB9KVxyXG4gIH1cclxuICB1bm1vdW50UGx1Z2lucyA9ICgpID0+IHtcclxuICAgIE9iamVjdC5rZXlzKHRoaXMucGx1Z2lucykuZm9yRWFjaChuYW1lID0+IHtcclxuICAgICAgY29uc3QgcGx1Z2luID0gdGhpcy5wbHVnaW5zW25hbWVdXHJcbiAgICAgIHBsdWdpbi5wbHVnaW5XaWxsVW5tb3VudCgpXHJcbiAgICB9KVxyXG4gIH1cclxuICBjb25maWd1cmVMYXlvdXQoZGVzY3JpcHRpb246IE9iamVjdCkge1xyXG4gICAgdGhpcy5zcGxhc2hDb21wb25lbnQgPSBkZXNjcmlwdGlvbi5zcGxhc2hDb21wb25lbnRcclxuICAgIHRoaXMuZGlzcGxheUxheW91dCA9IGRlc2NyaXB0aW9uLmRpc3BsYXlMYXlvdXRcclxuICB9XHJcbiAgbWFwUGx1Z2luKG5hbWUpIHtcclxuICAgIGxldCBwbHVnaW5DbGFzcyA9IHRoaXMucGx1Z2luQ2xhc3Nlc1tuYW1lXVxyXG4gICAgaWYgKCFwbHVnaW5DbGFzcykge1xyXG4gICAgICBwbHVnaW5DbGFzcyA9IG5ldyBQbHVnaW5DbGFzcyhuYW1lLCB0aGlzKVxyXG4gICAgICB0aGlzLnBsdWdpbkNsYXNzZXNbbmFtZV0gPSBwbHVnaW5DbGFzc1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIHBsdWdpbkNsYXNzXHJcbiAgfVxyXG4gIGluc3RhbGxQbHVnaW4oZGVzY3JpcHRpb246IE9iamVjdCwgcGFyYW1ldGVyczogT2JqZWN0KTogUGx1Z2luQ2xhc3Mge1xyXG4gICAgY29uc3QgcGx1Z2luQ2xhc3MgPSB0aGlzLm1hcFBsdWdpbihkZXNjcmlwdGlvbi5uYW1lKVxyXG4gICAgcGx1Z2luQ2xhc3Muc2V0dXAoZGVzY3JpcHRpb24sIHBhcmFtZXRlcnMpXHJcbiAgICByZXR1cm4gcGx1Z2luQ2xhc3NcclxuICB9XHJcbiAgZG9ja1dpbmRvdyh3bmQ6IFdpbmRvd0luc3RhbmNlLCBkb2NrSWQ6IERvY2tJRCwgZm9yZWdyb3VuZDogYm9vbGVhbikge1xyXG4gICAgdGhpcy5mcmFtZSAmJiB0aGlzLmZyYW1lLmF0dGFjaFdpbmRvdyh3bmQsIGRvY2tJZCwgZm9yZWdyb3VuZClcclxuICB9XHJcbiAgZGV0dGFjaFdpbmRvdyh3aW5kb3dJZDogV2luZG93SUQpIHtcclxuICAgIGNvbnN0IHduZCA9IHRoaXMud2luZG93c1t3aW5kb3dJZF1cclxuICAgIHRoaXMuZnJhbWUgJiYgdGhpcy5mcmFtZS5kZXR0YWNoV2luZG93KHduZClcclxuICB9XHJcbiAgcmVtb3ZlV2luZG93KHdpbmRvd0lkOiBXaW5kb3dJRCkge1xyXG4gICAgY29uc3Qgd25kID0gdGhpcy53aW5kb3dzW3dpbmRvd0lkXVxyXG4gICAgdGhpcy5kZXR0YWNoV2luZG93KHduZClcclxuICAgIGRlbGV0ZSB0aGlzLndpbmRvd3Nbd2luZG93SWRdXHJcbiAgICB3bmQuY2xvc2UoKVxyXG4gIH1cclxuICBmb2N1c09uV2luZG93KGZvY3VzZWQ6IFdpbmRvd0luc3RhbmNlKSB7XHJcbiAgICBjb25zdCBwcmV2X2ZvY3VzZWQgPSB0aGlzLmZvY3VzZWRcclxuICAgIGlmKHByZXZfZm9jdXNlZCAhPT0gZm9jdXNlZCkge1xyXG4gICAgICB0aGlzLmZvY3VzZWQgPSBmb2N1c2VkXHJcbiAgICAgIHByZXZfZm9jdXNlZCAmJiBwcmV2X2ZvY3VzZWQubm90aWZ5Qmx1cigpXHJcbiAgICAgIHRoaXMuZnJhbWUgJiYgdGhpcy5mcmFtZS5ub3RpZnlGb2N1c0NoYW5nZSh0aGlzLmZvY3VzZWQsIHByZXZfZm9jdXNlZClcclxuICAgICAgdGhpcy5mb2N1c2VkICYmIHRoaXMuZm9jdXNlZC5ub3RpZnlGb2N1cygpXHJcbiAgICB9XHJcbiAgfVxyXG4gIG9wZW5TdWJXaW5kb3cod2luZG93Q2xhc3M6IFdpbmRvd0NsYXNzLCBwYXJlbnQ6IFdpbmRvd0luc3RhbmNlLCBvcHRpb25zOiBXaW5kb3dPcHRpb25zKSB7XHJcbiAgICBpZiAod2luZG93Q2xhc3MgJiYgcGFyZW50KSB7XHJcbiAgICAgIGxldCB3bmQgPSAob3B0aW9ucyAmJiBvcHRpb25zLm9wZW5OZXcpID8gbnVsbCA6IHRoaXMuZmluZE9uZVdpbmRvd0J5Q2xhc3Mod2luZG93Q2xhc3MpXHJcbiAgICAgIGlmICghd25kKSB7XHJcbiAgICAgICAgd25kID0gbmV3IFdpbmRvd0luc3RhbmNlKFwiI1wiICsgKHRoaXMudWlkR2VuZXJhdG9yKyspLCB3aW5kb3dDbGFzcywgcGFyZW50LCBwYXJlbnQucGx1Z2luLCBvcHRpb25zIHx8IHt9KVxyXG4gICAgICB9XHJcbiAgICAgIGVsc2Uge1xyXG4gICAgICAgIG9wdGlvbnMgJiYgd25kLnVwZGF0ZU9wdGlvbnMob3B0aW9ucylcclxuICAgICAgfVxyXG4gICAgICB0aGlzLmRvY2tXaW5kb3cod25kLCB3bmQuZG9ja0lkLCB0cnVlKVxyXG4gICAgfVxyXG4gIH1cclxuICBvcGVuUGx1Z2luV2luZG93KHdpbmRvd0NsYXNzOiBXaW5kb3dDbGFzcywgcGx1Z2luOiBQbHVnaW5Db21wb25lbnQsIG9wdGlvbnM6IFdpbmRvd09wdGlvbnMpIHtcclxuICAgIGlmICh3aW5kb3dDbGFzcykge1xyXG4gICAgICBsZXQgd25kID0gKG9wdGlvbnMgJiYgb3B0aW9ucy5vcGVuTmV3KSA/IG51bGwgOiB0aGlzLmZpbmRPbmVXaW5kb3dCeUNsYXNzKHdpbmRvd0NsYXNzKVxyXG4gICAgICBpZiAoIXduZCkge1xyXG4gICAgICAgIHduZCA9IG5ldyBXaW5kb3dJbnN0YW5jZShcIiNcIiArICh0aGlzLnVpZEdlbmVyYXRvcisrKSwgd2luZG93Q2xhc3MsIG51bGwsIHBsdWdpbiwgb3B0aW9ucyB8fCB7fSlcclxuICAgICAgfVxyXG4gICAgICBlbHNlIHtcclxuICAgICAgICBvcHRpb25zICYmIHduZC51cGRhdGVPcHRpb25zKG9wdGlvbnMpXHJcbiAgICAgIH1cclxuICAgICAgdGhpcy5kb2NrV2luZG93KHduZCwgd25kLmRvY2tJZCwgdHJ1ZSlcclxuICAgIH1cclxuICB9XHJcbiAgY2xvc2VQbHVnaW5XaW5kb3dzKHdpbmRvd0NsYXNzOiBXaW5kb3dDbGFzcywgcGx1Z2luOiBQbHVnaW5Db21wb25lbnQpIHtcclxuICAgIGxldCB3aW5kb3dzXHJcbiAgICBpZiAod2luZG93Q2xhc3MpIHdpbmRvd3MgPSB0aGlzLmZpbmRBbGxXaW5kb3dzQnlDbGFzcyh3aW5kb3dDbGFzcylcclxuICAgIGVsc2Ugd2luZG93cyA9IHRoaXMuZmluZEFsbFdpbmRvd3NCeVBsdWdpbihwbHVnaW4pXHJcbiAgICB3aW5kb3dzLmZvckVhY2god25kID0+IHRoaXMucmVtb3ZlV2luZG93KHduZC5pZCkpXHJcbiAgfVxyXG4gIGdldFdpbmRvd0luc3RhbmNlKHdpbmRvd0lkOiBXaW5kb3dJRCkge1xyXG4gICAgcmV0dXJuIHRoaXMud2luZG93c1t3aW5kb3dJZF1cclxuICB9XHJcbiAgZmluZE9uZVdpbmRvd0J5Q2xhc3Mod2luZG93Q2xhc3M6IFdpbmRvd0NsYXNzKTogV2luZG93SW5zdGFuY2Uge1xyXG4gICAgbGV0IHdpbmRvd0lkXHJcbiAgICBmb3IgKHdpbmRvd0lkIGluIHRoaXMud2luZG93cykge1xyXG4gICAgICBpZiAodGhpcy53aW5kb3dzW3dpbmRvd0lkXS53aW5kb3dDbGFzcyA9PT0gd2luZG93Q2xhc3MpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy53aW5kb3dzW3dpbmRvd0lkXVxyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgICByZXR1cm4gbnVsbFxyXG4gIH1cclxuICBmaW5kQWxsV2luZG93c0J5UGx1Z2luKHBsdWdpbjogUGx1Z2luQ29tcG9uZW50KTogQXJyYXk8V2luZG93SW5zdGFuY2U+IHtcclxuICAgIGNvbnN0IHdpbmRvd3MgPSBbXVxyXG4gICAgaWYgKHBsdWdpbikge1xyXG4gICAgICBsZXQgd2luZG93SWRcclxuICAgICAgZm9yICh3aW5kb3dJZCBpbiB0aGlzLndpbmRvd3MpIHtcclxuICAgICAgICBpZiAodGhpcy53aW5kb3dzW3dpbmRvd0lkXS5wbHVnaW4gPT09IHBsdWdpbikge1xyXG4gICAgICAgICAgd2luZG93cy5wdXNoKHRoaXMud2luZG93c1t3aW5kb3dJZF0pXHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgICByZXR1cm4gd2luZG93c1xyXG4gIH1cclxuICBmaW5kQWxsV2luZG93c0J5Q2xhc3Mod2luZG93Q2xhc3M6IFdpbmRvd0NsYXNzKTogQXJyYXk8V2luZG93SW5zdGFuY2U+IHtcclxuICAgIGlmICh3aW5kb3dDbGFzcykge1xyXG4gICAgICBsZXQgd2luZG93SWRcclxuICAgICAgY29uc3Qgd2luZG93cyA9IFtdXHJcbiAgICAgIGZvciAod2luZG93SWQgaW4gdGhpcy53aW5kb3dzKSB7XHJcbiAgICAgICAgaWYgKHRoaXMud2luZG93c1t3aW5kb3dJZF0ud2luZG93Q2xhc3MgPT09IHdpbmRvd0NsYXNzKSB7XHJcbiAgICAgICAgICB3aW5kb3dzLnB1c2godGhpcy53aW5kb3dzW3dpbmRvd0lkXSlcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgICAgcmV0dXJuIHdpbmRvd3NcclxuICAgIH1cclxuICAgIGVsc2Uge1xyXG4gICAgICByZXR1cm4gdGhpcy53aW5kb3dzLnZhbHVlcygpXHJcbiAgICB9XHJcbiAgfVxyXG59XHJcbiJdfQ==