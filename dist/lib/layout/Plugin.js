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
    key: "closeWindow",
    value: function closeWindow(windowName) {
      this.layout.closePluginWindows(this.pluginClass.windows[windowName], this);
    }
  }, {
    key: "closeAllWindow",
    value: function closeAllWindow() {
      this.layout.closePluginWindows(null, this);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9saWIvbGF5b3V0L1BsdWdpbi5qcyJdLCJuYW1lcyI6WyJQbHVnaW5DbGFzcyIsImRlc2MiLCJwYXJhbWV0ZXJzIiwiY29udGV4dCIsIndpbmRvd3MiLCJsaW5rcyIsIk9iamVjdCIsImtleXMiLCJmb3JFYWNoIiwia2V5IiwiY29tcG9uZW50IiwiUGx1Z2luSW5zdGFuY2UiLCJuYW1lIiwiaW5zdGFuY2UiLCJpbXBvcnQiLCJyZWYiLCJwbHVnaW4iLCJwbHVnaW5zIiwicGx1Z2luRXhwb3J0IiwicGx1Z2luQ2xhc3MiLCJleHBvcnQiLCJ3aW5kb3ciLCJhZGRQYXJhbWV0ZXJMaW5rIiwicGFyYW0iLCJwbHVnaW5XaWxsTW91bnQiLCJsaW5rIiwicmVzb2x2ZVZhbHVlUmVmZXJlbmNlIiwiYWRkTGluayIsImxpbmtMaXN0IiwicGF0aCIsInB1c2giLCJjb25zb2xlIiwiZXJyb3IiLCJyZWZlcmVuY2UiLCJwYXJ0cyIsInNwbGl0IiwibGVuZ3RoIiwicGx1Z2luQ2xhc3NlcyIsInVwZGF0ZU5leHRTdGF0ZSIsIm5leHRTdGF0ZSIsInVwZGF0ZWRXaW5kb3dzIiwidmFsdWUiLCJsYXlvdXQiLCJ3bmQiLCJ3bmRJZCIsIndsaW5rIiwiZmluZCIsImxrIiwid2luZG93Q2xhc3MiLCJpbmRleE9mIiwicmVuZGVyIiwiYXBwbGljYXRpb24iLCJ3aW5kb3dOYW1lIiwib3B0aW9ucyIsIm9wZW5QbHVnaW5XaW5kb3ciLCJjbG9zZVBsdWdpbldpbmRvd3MiLCJzdGF0ZSIsIm9sZFN0YXRlIiwibmV3U3RhdGUiLCJzZXRUaW1lb3V0Il0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFBQTs7OztJQU9hQSxXLFdBQUFBLFc7QUFXWCx1QkFBWUMsSUFBWixFQUEwQkMsVUFBMUIsRUFBOENDLE9BQTlDLEVBQXNFO0FBQUE7O0FBQUE7O0FBQUEsU0FOdEVDLE9BTXNFLEdBTjFCLEVBTTBCO0FBQUEsU0FMdEVDLEtBS3NFLEdBTDFCLEVBSzBCOztBQUNwRUosWUFBUUssT0FBT0MsSUFBUCxDQUFZTixJQUFaLEVBQWtCTyxPQUFsQixDQUEwQjtBQUFBLGFBQU8sTUFBS0MsR0FBTCxJQUFZUixLQUFLUSxHQUFMLENBQW5CO0FBQUEsS0FBMUIsQ0FBUjtBQUNBLFNBQUtOLE9BQUwsR0FBZUEsT0FBZjtBQUNBLFNBQUtELFVBQUwsR0FBa0JBLFVBQWxCO0FBQ0EsU0FBS1EsU0FBTCxHQUFpQixLQUFLQSxTQUFMLElBQWtCQyxjQUFuQztBQUNBVixTQUFLRyxPQUFMLElBQWdCRSxPQUFPQyxJQUFQLENBQVlOLEtBQUtHLE9BQWpCLEVBQTBCSSxPQUExQixDQUFrQyxnQkFBUTtBQUN4RCxZQUFLSixPQUFMLENBQWFRLElBQWIsSUFBcUIsd0JBQWdCQSxJQUFoQixFQUFzQlgsS0FBS0csT0FBTCxDQUFhUSxJQUFiLENBQXRCLFFBQXJCO0FBQ0QsS0FGZSxDQUFoQjtBQUdELEcsQ0FmbUM7Ozs7O3FDQWdCSDtBQUMvQixhQUFPLElBQUssS0FBS0YsU0FBVixDQUFxQixJQUFyQixDQUFQO0FBQ0Q7OztrQ0FDYUcsUSxFQUEwQlYsTyxFQUF3QjtBQUFBOztBQUM5RCxXQUFLVSxRQUFMLEdBQWdCQSxRQUFoQjs7QUFFQTtBQUNBLFdBQUtDLE1BQUwsSUFBZVIsT0FBT0MsSUFBUCxDQUFZLEtBQUtPLE1BQWpCLEVBQXlCTixPQUF6QixDQUFpQyxnQkFBUTtBQUN0RCxZQUFNTyxNQUFNLE9BQUtELE1BQUwsQ0FBWUYsSUFBWixDQUFaO0FBQ0EsWUFBTUksU0FBU2IsUUFBUWMsT0FBUixDQUFnQkwsSUFBaEIsQ0FBZjtBQUNBLFlBQU1NLGVBQWVGLE9BQU9HLFdBQVAsQ0FBbUJDLE1BQXhDO0FBQ0EsWUFBSUYsWUFBSixFQUFrQjtBQUNoQixjQUFJSCxRQUFRLElBQVosRUFBa0I7QUFDaEJHLHlCQUFhVixPQUFiLENBQXFCLGVBQU87QUFDMUJLLHVCQUFTSixHQUFULElBQWdCTyxPQUFPUCxHQUFQLENBQWhCO0FBQ0QsYUFGRDtBQUdELFdBSkQsTUFLSyxJQUFJLE9BQU9NLEdBQVAsS0FBZSxRQUFuQixFQUE2QjtBQUNoQ0YscUJBQVNFLEdBQVQsSUFBZ0JDLE1BQWhCO0FBQ0Q7QUFDRixTQVRELE1BVUssSUFBSSxPQUFPRCxHQUFQLEtBQWUsUUFBbkIsRUFBNkI7QUFDaENGLG1CQUFTRSxHQUFULElBQWdCQyxNQUFoQjtBQUNEO0FBQ0YsT0FqQmMsQ0FBZjs7QUFtQkE7QUFDQVYsYUFBT0MsSUFBUCxDQUFZLEtBQUtILE9BQWpCLEVBQTBCSSxPQUExQixDQUFrQyxlQUFPO0FBQ3ZDLFlBQU1hLFNBQVMsT0FBS2pCLE9BQUwsQ0FBYUssR0FBYixDQUFmO0FBQ0FZLGVBQU9uQixVQUFQLElBQXFCSSxPQUFPQyxJQUFQLENBQVljLE9BQU9uQixVQUFuQixFQUErQk0sT0FBL0IsQ0FBdUMsaUJBQVM7QUFDbkUsaUJBQUtjLGdCQUFMLENBQXNCRCxNQUF0QixFQUE4QkUsS0FBOUI7QUFDRCxTQUZvQixDQUFyQjtBQUdELE9BTEQ7O0FBT0FWLGVBQVNXLGVBQVQsQ0FBeUIsS0FBS3RCLFVBQTlCO0FBQ0Q7OztxQ0FDZ0JtQixNLEVBQWdCRSxLLEVBQWU7QUFDOUMsVUFBTUUsT0FBTyxLQUFLQyxxQkFBTCxDQUEyQkwsT0FBT25CLFVBQVAsQ0FBa0JxQixLQUFsQixDQUEzQixFQUFxREEsS0FBckQsQ0FBYjtBQUNBLFVBQUlFLElBQUosRUFBVTtBQUNSQSxhQUFLRixLQUFMLEdBQWFBLEtBQWI7QUFDQUUsYUFBS0osTUFBTCxHQUFjQSxNQUFkO0FBQ0FBLGVBQU9NLE9BQVAsQ0FBZUYsSUFBZjtBQUNBLFlBQU1HLFdBQVcsS0FBS3ZCLEtBQUwsQ0FBV29CLEtBQUtJLElBQWhCLENBQWpCO0FBQ0EsWUFBSSxDQUFDRCxRQUFMLEVBQWUsS0FBS3ZCLEtBQUwsQ0FBV29CLEtBQUtJLElBQWhCLElBQXdCLENBQUVKLElBQUYsQ0FBeEIsQ0FBZixLQUNLRyxTQUFTRSxJQUFULENBQWNMLElBQWQ7QUFDTixPQVBELE1BUUs7QUFDSE0sZ0JBQVFDLEtBQVIsQ0FBYyxnQkFBZ0JULEtBQWhCLEdBQXdCLGVBQXhCLEdBQTBDRixPQUFPVCxJQUFqRCxHQUF3RCxxQkFBdEUsRUFBNkZhLEtBQUtJLElBQWxHO0FBQ0Q7QUFDRjs7OzBDQUNxQkksUyxFQUFtQnhCLEcsRUFBYTtBQUNwRCxVQUFJd0IsY0FBYyxJQUFsQixFQUF3QjtBQUN0QixlQUFPO0FBQ0xkLHVCQUFhLElBRFI7QUFFTFUsZ0JBQU1wQjtBQUZELFNBQVA7QUFJRCxPQUxELE1BTUssSUFBSSxPQUFPd0IsU0FBUCxLQUFxQixRQUF6QixFQUFtQztBQUN0QyxZQUFNQyxRQUFRRCxVQUFVRSxLQUFWLENBQWdCLEdBQWhCLENBQWQ7QUFDQSxZQUFJRCxNQUFNRSxNQUFOLEdBQWUsQ0FBbkIsRUFBc0I7QUFDcEIsaUJBQU87QUFDTGpCLHlCQUFhZSxNQUFNLENBQU4sSUFBVyxLQUFLL0IsT0FBTCxDQUFha0MsYUFBYixDQUEyQkgsTUFBTSxDQUFOLENBQTNCLENBQVgsR0FBa0QsSUFEMUQ7QUFFTEwsa0JBQU1LLE1BQU0sQ0FBTjtBQUZELFdBQVA7QUFJRCxTQUxELE1BTUssT0FBTztBQUNWZix1QkFBYSxJQURIO0FBRVZVLGdCQUFNSTtBQUZJLFNBQVA7QUFJTjtBQUNGOzs7Ozs7SUFHVXRCLGMsV0FBQUEsYzs7Ozs7QUFJWDtvQ0FDZ0JULFUsRUFBb0IsQ0FBRyxDLENBQUM7Ozs7cUNBQ3ZCLENBQUc7Ozt3Q0FDQSxDQUFHOzs7QUFFdkIsMEJBQVlpQixXQUFaLEVBQXNDO0FBQUE7O0FBQUE7O0FBQUEsU0FhdENtQixlQWJzQyxHQWFwQixZQUFNO0FBQ3RCLFVBQUksT0FBS0MsU0FBVCxFQUFvQjtBQUNsQixZQUFNQyxpQkFBaUIsRUFBdkI7QUFDQWxDLGVBQU9DLElBQVAsQ0FBWSxPQUFLZ0MsU0FBakIsRUFBNEIvQixPQUE1QixDQUFvQyxlQUFPO0FBQ3pDLGNBQU1pQyxRQUFRLE9BQUtGLFNBQUwsQ0FBZTlCLEdBQWYsQ0FBZDtBQUNBLGNBQU1KLFFBQVEsT0FBS2MsV0FBTCxDQUFpQmQsS0FBakIsQ0FBdUJJLEdBQXZCLENBQWQ7QUFDQSxpQkFBS0EsR0FBTCxJQUFZZ0MsS0FBWjtBQUNBLGNBQUlwQyxLQUFKLEVBQVc7QUFDVCxnQkFBTUQsVUFBVSxPQUFLc0MsTUFBTCxDQUFZdEMsT0FBNUI7QUFDQUUsbUJBQU9DLElBQVAsQ0FBWUgsT0FBWixFQUFxQkksT0FBckIsQ0FBNkIsaUJBQVM7QUFDcEMsa0JBQU1tQyxNQUFNdkMsUUFBUXdDLEtBQVIsQ0FBWjtBQUNBLGtCQUFNQyxRQUFReEMsTUFBTXlDLElBQU4sQ0FBVztBQUFBLHVCQUFNQyxHQUFHMUIsTUFBSCxLQUFjc0IsSUFBSUssV0FBeEI7QUFBQSxlQUFYLENBQWQ7QUFDQSxrQkFBSUgsS0FBSixFQUFXO0FBQ1RGLG9CQUFJekMsVUFBSixDQUFlMkMsTUFBTXRCLEtBQXJCLElBQThCa0IsS0FBOUI7QUFDQSxvQkFBSUQsZUFBZVMsT0FBZixDQUF1Qk4sR0FBdkIsSUFBOEIsQ0FBbEMsRUFBcUNILGVBQWVWLElBQWYsQ0FBb0JhLEdBQXBCO0FBQ3RDO0FBQ0YsYUFQRDtBQVFEO0FBQ0YsU0FmRDtBQWdCQUgsdUJBQWVoQyxPQUFmLENBQXVCO0FBQUEsaUJBQU9tQyxJQUFJTyxNQUFKLEVBQVA7QUFBQSxTQUF2QjtBQUNBLGVBQUtYLFNBQUwsR0FBaUIsSUFBakI7QUFDRDtBQUNGLEtBbkNxQzs7QUFDcEMsU0FBS3BCLFdBQUwsR0FBbUJBLFdBQW5CO0FBQ0EsU0FBS2dDLFdBQUwsR0FBbUJoQyxZQUFZaEIsT0FBWixDQUFvQmdELFdBQXZDO0FBQ0Q7Ozs7K0JBQ1VDLFUsRUFBb0JDLE8sRUFBaUI7QUFDOUMsV0FBS1gsTUFBTCxDQUFZWSxnQkFBWixDQUE2QixLQUFLbkMsV0FBTCxDQUFpQmYsT0FBakIsQ0FBeUJnRCxVQUF6QixDQUE3QixFQUFtRSxJQUFuRSxFQUF5RUMsT0FBekU7QUFDRDs7O2dDQUNXRCxVLEVBQW9CO0FBQzlCLFdBQUtWLE1BQUwsQ0FBWWEsa0JBQVosQ0FBK0IsS0FBS3BDLFdBQUwsQ0FBaUJmLE9BQWpCLENBQXlCZ0QsVUFBekIsQ0FBL0IsRUFBcUUsSUFBckU7QUFDRDs7O3FDQUNnQjtBQUNmLFdBQUtWLE1BQUwsQ0FBWWEsa0JBQVosQ0FBK0IsSUFBL0IsRUFBcUMsSUFBckM7QUFDRDs7OzZCQXdCUUMsSyxFQUFlO0FBQUE7O0FBQ3RCLFVBQU1DLFdBQVcsS0FBS2xCLFNBQXRCO0FBQ0EsVUFBTW1CLFdBQVdELFlBQVksRUFBN0I7QUFDQW5ELGFBQU9DLElBQVAsQ0FBWWlELEtBQVosRUFBbUJoRCxPQUFuQixDQUEyQixlQUFPO0FBQ2hDa0QsaUJBQVNqRCxHQUFULElBQWdCK0MsTUFBTS9DLEdBQU4sQ0FBaEI7QUFDQSxlQUFLQSxHQUFMLElBQVkrQyxNQUFNL0MsR0FBTixDQUFaO0FBQ0QsT0FIRDtBQUlBLFdBQUs4QixTQUFMLEdBQWlCbUIsUUFBakI7QUFDQSxVQUFJLENBQUNELFFBQUwsRUFBZUUsV0FBVyxLQUFLckIsZUFBaEIsRUFBaUMsQ0FBakM7QUFDaEIiLCJmaWxlIjoiUGx1Z2luLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgV2luZG93Q2xhc3MgfSBmcm9tIFwiLi9XaW5kb3dcIlxyXG5cclxudHlwZSBQYXJhbWV0ZXJMaW5rID0ge1xyXG4gIHdpbmRvdzogV2luZG93Q2xhc3MsXHJcbiAgcGFyYW06IHN0cmluZyxcclxufVxyXG5cclxuZXhwb3J0IGNsYXNzIFBsdWdpbkNsYXNzIHtcclxuICBuYW1lOiBzdHJpbmdcclxuICBpbnN0YW5jZTogUGx1Z2luSW5zdGFuY2VcclxuICBwYXJhbWV0ZXJzOiBPYmplY3RcclxuICBjb21wb25lbnQ6IEZ1bmN0aW9uPFBsdWdpbkluc3RhbmNlPiAvLyBjb25zdHJ1Y3RvciBvZiBQbHVnaW5JbnN0YW5jZVxyXG4gIHdpbmRvd3M6IHsgW1dpbmRvd0NsYXNzSURdOiBXaW5kb3dDbGFzcyB9ID0ge31cclxuICBsaW5rczogeyBbc3RyaW5nXTogQXJyYXk8UGFyYW1ldGVyTGluaz4gfSA9IHt9XHJcbiAgZXhwb3J0OiBPYmplY3RcclxuICBpbXBvcnQ6IE9iamVjdFxyXG4gIGNvbnRleHQ6IFBsdWdpbkNvbnRleHRcclxuXHJcbiAgY29uc3RydWN0b3IoZGVzYzogT2JqZWN0LCBwYXJhbWV0ZXJzOiBPYmplY3QsIGNvbnRleHQ6IFBsdWdpbkNvbnRleHQpIHtcclxuICAgIGRlc2MgJiYgT2JqZWN0LmtleXMoZGVzYykuZm9yRWFjaChrZXkgPT4gdGhpc1trZXldID0gZGVzY1trZXldKVxyXG4gICAgdGhpcy5jb250ZXh0ID0gY29udGV4dFxyXG4gICAgdGhpcy5wYXJhbWV0ZXJzID0gcGFyYW1ldGVyc1xyXG4gICAgdGhpcy5jb21wb25lbnQgPSB0aGlzLmNvbXBvbmVudCB8fCBQbHVnaW5JbnN0YW5jZVxyXG4gICAgZGVzYy53aW5kb3dzICYmIE9iamVjdC5rZXlzKGRlc2Mud2luZG93cykuZm9yRWFjaChuYW1lID0+IHtcclxuICAgICAgdGhpcy53aW5kb3dzW25hbWVdID0gbmV3IFdpbmRvd0NsYXNzKG5hbWUsIGRlc2Mud2luZG93c1tuYW1lXSwgdGhpcylcclxuICAgIH0pXHJcbiAgfVxyXG4gIGNyZWF0ZUluc3RhbmNlKCk6IFBsdWdpbkluc3RhbmNlIHtcclxuICAgIHJldHVybiBuZXcgKHRoaXMuY29tcG9uZW50KSh0aGlzKVxyXG4gIH1cclxuICBtb3VudEluc3RhbmNlKGluc3RhbmNlOiBQbHVnaW5JbnN0YW5jZSwgY29udGV4dDogUGx1Z2luQ29udGV4dCkge1xyXG4gICAgdGhpcy5pbnN0YW5jZSA9IGluc3RhbmNlXHJcblxyXG4gICAgLy8gUHJvY2VzcyBpbXBvcnRcclxuICAgIHRoaXMuaW1wb3J0ICYmIE9iamVjdC5rZXlzKHRoaXMuaW1wb3J0KS5mb3JFYWNoKG5hbWUgPT4ge1xyXG4gICAgICBjb25zdCByZWYgPSB0aGlzLmltcG9ydFtuYW1lXVxyXG4gICAgICBjb25zdCBwbHVnaW4gPSBjb250ZXh0LnBsdWdpbnNbbmFtZV1cclxuICAgICAgY29uc3QgcGx1Z2luRXhwb3J0ID0gcGx1Z2luLnBsdWdpbkNsYXNzLmV4cG9ydFxyXG4gICAgICBpZiAocGx1Z2luRXhwb3J0KSB7XHJcbiAgICAgICAgaWYgKHJlZiA9PT0gdHJ1ZSkge1xyXG4gICAgICAgICAgcGx1Z2luRXhwb3J0LmZvckVhY2goa2V5ID0+IHtcclxuICAgICAgICAgICAgaW5zdGFuY2Vba2V5XSA9IHBsdWdpbltrZXldXHJcbiAgICAgICAgICB9KVxyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIGlmICh0eXBlb2YgcmVmID09PSBcInN0cmluZ1wiKSB7XHJcbiAgICAgICAgICBpbnN0YW5jZVtyZWZdID0gcGx1Z2luXHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICAgIGVsc2UgaWYgKHR5cGVvZiByZWYgPT09IFwic3RyaW5nXCIpIHtcclxuICAgICAgICBpbnN0YW5jZVtyZWZdID0gcGx1Z2luXHJcbiAgICAgIH1cclxuICAgIH0pXHJcblxyXG4gICAgLy8gUHJvY2VzcyB3aW5kb3dzIHBhcmFtZXRlcnMgaW1wb3J0XHJcbiAgICBPYmplY3Qua2V5cyh0aGlzLndpbmRvd3MpLmZvckVhY2goa2V5ID0+IHtcclxuICAgICAgY29uc3Qgd2luZG93ID0gdGhpcy53aW5kb3dzW2tleV1cclxuICAgICAgd2luZG93LnBhcmFtZXRlcnMgJiYgT2JqZWN0LmtleXMod2luZG93LnBhcmFtZXRlcnMpLmZvckVhY2gocGFyYW0gPT4ge1xyXG4gICAgICAgIHRoaXMuYWRkUGFyYW1ldGVyTGluayh3aW5kb3csIHBhcmFtKVxyXG4gICAgICB9KVxyXG4gICAgfSlcclxuXHJcbiAgICBpbnN0YW5jZS5wbHVnaW5XaWxsTW91bnQodGhpcy5wYXJhbWV0ZXJzKVxyXG4gIH1cclxuICBhZGRQYXJhbWV0ZXJMaW5rKHdpbmRvdzogT2JqZWN0LCBwYXJhbTogc3RyaW5nKSB7XHJcbiAgICBjb25zdCBsaW5rID0gdGhpcy5yZXNvbHZlVmFsdWVSZWZlcmVuY2Uod2luZG93LnBhcmFtZXRlcnNbcGFyYW1dLCBwYXJhbSlcclxuICAgIGlmIChsaW5rKSB7XHJcbiAgICAgIGxpbmsucGFyYW0gPSBwYXJhbVxyXG4gICAgICBsaW5rLndpbmRvdyA9IHdpbmRvd1xyXG4gICAgICB3aW5kb3cuYWRkTGluayhsaW5rKVxyXG4gICAgICBjb25zdCBsaW5rTGlzdCA9IHRoaXMubGlua3NbbGluay5wYXRoXVxyXG4gICAgICBpZiAoIWxpbmtMaXN0KSB0aGlzLmxpbmtzW2xpbmsucGF0aF0gPSBbIGxpbmsgXVxyXG4gICAgICBlbHNlIGxpbmtMaXN0LnB1c2gobGluaylcclxuICAgIH1cclxuICAgIGVsc2Uge1xyXG4gICAgICBjb25zb2xlLmVycm9yKFwiUGFyYW1ldGVyICdcIiArIHBhcmFtICsgXCInIG9mIHdpbmRvdyAnXCIgKyB3aW5kb3cubmFtZSArIFwiJyBoYXMgaW52YWxpZCBsaW5rOlwiLCBsaW5rLnBhdGgpXHJcbiAgICB9XHJcbiAgfVxyXG4gIHJlc29sdmVWYWx1ZVJlZmVyZW5jZShyZWZlcmVuY2U6IHN0cmluZywga2V5OiBzdHJpbmcpIHtcclxuICAgIGlmIChyZWZlcmVuY2UgPT09IHRydWUpIHtcclxuICAgICAgcmV0dXJuIHtcclxuICAgICAgICBwbHVnaW5DbGFzczogdGhpcyxcclxuICAgICAgICBwYXRoOiBrZXksXHJcbiAgICAgIH1cclxuICAgIH1cclxuICAgIGVsc2UgaWYgKHR5cGVvZiByZWZlcmVuY2UgPT09IFwic3RyaW5nXCIpIHtcclxuICAgICAgY29uc3QgcGFydHMgPSByZWZlcmVuY2Uuc3BsaXQoXCIvXCIpXHJcbiAgICAgIGlmIChwYXJ0cy5sZW5ndGggPiAxKSB7XHJcbiAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgIHBsdWdpbkNsYXNzOiBwYXJ0c1swXSA/IHRoaXMuY29udGV4dC5wbHVnaW5DbGFzc2VzW3BhcnRzWzBdXSA6IHRoaXMsXHJcbiAgICAgICAgICBwYXRoOiBwYXJ0c1sxXSxcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgICAgZWxzZSByZXR1cm4ge1xyXG4gICAgICAgIHBsdWdpbkNsYXNzOiB0aGlzLFxyXG4gICAgICAgIHBhdGg6IHJlZmVyZW5jZSxcclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH1cclxufVxyXG5cclxuZXhwb3J0IGNsYXNzIFBsdWdpbkluc3RhbmNlIHtcclxuICBwbHVnaW5DbGFzczogUGx1Z2luQ2xhc3NcclxuICBhcHBsaWNhdGlvbjogT2JqZWN0XHJcblxyXG4gIC8vIExpZmUgQ3ljbGUgbWFuYWdlbWVudCBmdW5jdGlvbnNcclxuICBwbHVnaW5XaWxsTW91bnQocGFyYW1ldGVyczogT2JqZWN0KSB7IH0gLy8gZXNsaW50LWRpc2FibGUtbGluZVxyXG4gIHBsdWdpbkRpZE1vdW50KCkgeyB9XHJcbiAgcGx1Z2luV2lsbFVubW91bnQoKSB7IH1cclxuXHJcbiAgY29uc3RydWN0b3IocGx1Z2luQ2xhc3M6IFBsdWdpbkNsYXNzKSB7XHJcbiAgICB0aGlzLnBsdWdpbkNsYXNzID0gcGx1Z2luQ2xhc3NcclxuICAgIHRoaXMuYXBwbGljYXRpb24gPSBwbHVnaW5DbGFzcy5jb250ZXh0LmFwcGxpY2F0aW9uXHJcbiAgfVxyXG4gIG9wZW5XaW5kb3cod2luZG93TmFtZTogc3RyaW5nLCBvcHRpb25zOiBPYmplY3QpIHtcclxuICAgIHRoaXMubGF5b3V0Lm9wZW5QbHVnaW5XaW5kb3codGhpcy5wbHVnaW5DbGFzcy53aW5kb3dzW3dpbmRvd05hbWVdLCB0aGlzLCBvcHRpb25zKVxyXG4gIH1cclxuICBjbG9zZVdpbmRvdyh3aW5kb3dOYW1lOiBzdHJpbmcpIHtcclxuICAgIHRoaXMubGF5b3V0LmNsb3NlUGx1Z2luV2luZG93cyh0aGlzLnBsdWdpbkNsYXNzLndpbmRvd3Nbd2luZG93TmFtZV0sIHRoaXMpXHJcbiAgfVxyXG4gIGNsb3NlQWxsV2luZG93KCkge1xyXG4gICAgdGhpcy5sYXlvdXQuY2xvc2VQbHVnaW5XaW5kb3dzKG51bGwsIHRoaXMpXHJcbiAgfVxyXG4gIHVwZGF0ZU5leHRTdGF0ZSA9ICgpID0+IHtcclxuICAgIGlmICh0aGlzLm5leHRTdGF0ZSkge1xyXG4gICAgICBjb25zdCB1cGRhdGVkV2luZG93cyA9IFtdXHJcbiAgICAgIE9iamVjdC5rZXlzKHRoaXMubmV4dFN0YXRlKS5mb3JFYWNoKGtleSA9PiB7XHJcbiAgICAgICAgY29uc3QgdmFsdWUgPSB0aGlzLm5leHRTdGF0ZVtrZXldXHJcbiAgICAgICAgY29uc3QgbGlua3MgPSB0aGlzLnBsdWdpbkNsYXNzLmxpbmtzW2tleV1cclxuICAgICAgICB0aGlzW2tleV0gPSB2YWx1ZVxyXG4gICAgICAgIGlmIChsaW5rcykge1xyXG4gICAgICAgICAgY29uc3Qgd2luZG93cyA9IHRoaXMubGF5b3V0LndpbmRvd3NcclxuICAgICAgICAgIE9iamVjdC5rZXlzKHdpbmRvd3MpLmZvckVhY2god25kSWQgPT4ge1xyXG4gICAgICAgICAgICBjb25zdCB3bmQgPSB3aW5kb3dzW3duZElkXVxyXG4gICAgICAgICAgICBjb25zdCB3bGluayA9IGxpbmtzLmZpbmQobGsgPT4gbGsud2luZG93ID09PSB3bmQud2luZG93Q2xhc3MpXHJcbiAgICAgICAgICAgIGlmICh3bGluaykge1xyXG4gICAgICAgICAgICAgIHduZC5wYXJhbWV0ZXJzW3dsaW5rLnBhcmFtXSA9IHZhbHVlXHJcbiAgICAgICAgICAgICAgaWYgKHVwZGF0ZWRXaW5kb3dzLmluZGV4T2Yod25kKSA8IDApIHVwZGF0ZWRXaW5kb3dzLnB1c2god25kKVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICB9KVxyXG4gICAgICAgIH1cclxuICAgICAgfSlcclxuICAgICAgdXBkYXRlZFdpbmRvd3MuZm9yRWFjaCh3bmQgPT4gd25kLnJlbmRlcigpKVxyXG4gICAgICB0aGlzLm5leHRTdGF0ZSA9IG51bGxcclxuICAgIH1cclxuICB9XHJcbiAgc2V0U3RhdGUoc3RhdGU6IE9iamVjdCkge1xyXG4gICAgY29uc3Qgb2xkU3RhdGUgPSB0aGlzLm5leHRTdGF0ZVxyXG4gICAgY29uc3QgbmV3U3RhdGUgPSBvbGRTdGF0ZSB8fCB7fVxyXG4gICAgT2JqZWN0LmtleXMoc3RhdGUpLmZvckVhY2goa2V5ID0+IHtcclxuICAgICAgbmV3U3RhdGVba2V5XSA9IHN0YXRlW2tleV1cclxuICAgICAgdGhpc1trZXldID0gc3RhdGVba2V5XVxyXG4gICAgfSlcclxuICAgIHRoaXMubmV4dFN0YXRlID0gbmV3U3RhdGVcclxuICAgIGlmICghb2xkU3RhdGUpIHNldFRpbWVvdXQodGhpcy51cGRhdGVOZXh0U3RhdGUsIDApXHJcbiAgfVxyXG59Il19