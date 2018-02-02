"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PluginComponent = exports.PluginClass = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Window = require("./Window");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var PluginStatus = {
  Mapped: { desc: "mapped but not installed" },
  Installed: { desc: "instancied and will mount" },
  Mounted: { desc: "instancied and will mount" }
};

var PluginClass = exports.PluginClass = function () {
  function PluginClass(name, context) {
    _classCallCheck(this, PluginClass);

    this.windows = {};
    this.links = {};

    this.name = name;
    this.status = PluginStatus.Mapped;
    this.context = context;
  }

  _createClass(PluginClass, [{
    key: "setup",
    value: function setup(desc, parameters) {
      var _this = this;

      this.parameters = parameters;
      this.component = desc.component || PluginComponent;

      // Setup dependencies
      if (desc.dependencies) {
        desc.dependencies.forEach(function (name) {
          return _this.addDependency(name);
        });
      }

      // Setup windows
      if (desc.windows) {
        Object.keys(desc.windows).forEach(function (name) {
          _this.windows[name] = new _Window.WindowClass(name, desc.windows[name], _this);
        });
        this.addDependency("windows-frame");
      }

      // Mount an instance
      this.willMount();

      // Prompt for did mount procedure
      this.promptMount();
    }
  }, {
    key: "addUser",
    value: function addUser(user) {
      if (!this.users) this.users = [];
      this.users.push(user);
      return this;
    }
  }, {
    key: "addDependency",
    value: function addDependency(name) {
      var pluginClass = this.context.mapPlugin(name);
      if (!this.dependencies) this.dependencies = [];

      var deps = this.dependencies;
      for (var i = 0; i < deps.length; i++) {
        if (deps[i] === pluginClass) return;
      }
      deps.push(pluginClass);
      return pluginClass.addUser(this);
    }
  }, {
    key: "promptMount",
    value: function promptMount() {
      if (this.status === PluginStatus.Installed) {
        var deps = this.dependencies;
        if (deps) {
          for (var i = 0; i < deps.length; i++) {
            if (!deps[i].instance) return;
          }
        }
        this.didMount();
      }
    }
  }, {
    key: "willMount",
    value: function willMount() {
      var _this2 = this;

      this.status = PluginStatus.Installed;

      // Create instance
      this.instance = new this.component(this);
      this.context.plugins[this.name] = this.instance;

      // Call will mount
      this.instance.pluginWillMount(this.parameters);

      // Notify all user plugins
      this.users && this.users.forEach(function (x) {
        return x.promptMount(_this2);
      });
    }
  }, {
    key: "didMount",
    value: function didMount() {
      var _this3 = this;

      this.status = PluginStatus.Mounted;

      // Process import
      this.import && Object.keys(this.import).forEach(function (name) {
        var ref = _this3.import[name];
        var plugin = _this3.context.plugins[name];
        var pluginExport = plugin.pluginClass.export;
        if (pluginExport) {
          if (ref === true) {
            pluginExport.forEach(function (key) {
              _this3.instance[key] = plugin[key];
            });
          } else if (typeof ref === "string") {
            _this3.instance[ref] = plugin;
          }
        } else if (typeof ref === "string") {
          _this3.instance[ref] = plugin;
        }
      });

      // Process windows parameters import
      Object.keys(this.windows).forEach(function (key) {
        var window = _this3.windows[key];
        window.parameters && Object.keys(window.parameters).forEach(function (param) {
          _this3.addParameterLink(window, param);
        });
      });

      this.instance.pluginDidMount();
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

var PluginComponent = exports.PluginComponent = function () {
  _createClass(PluginComponent, [{
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

  function PluginComponent(pluginClass) {
    var _this4 = this;

    _classCallCheck(this, PluginComponent);

    this.updateNextState = function () {
      if (_this4.nextState) {
        var updatedWindows = [];
        Object.keys(_this4.nextState).forEach(function (key) {
          var value = _this4.nextState[key];
          var links = _this4.pluginClass.links[key];
          _this4[key] = value;
          if (key === "storage") {
            _this4.savePluginStorage(value);
          }
          if (links) {
            var windows = _this4.layout.windows;
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
        _this4.nextState = null;
      }
    };

    this.pluginClass = pluginClass;
    this.application = pluginClass.context.application;
    this.restorePluginStorage();
  }

  _createClass(PluginComponent, [{
    key: "restorePluginStorage",
    value: function restorePluginStorage() {
      try {
        var data = localStorage.getItem(this.pluginClass.name);
        this.storage = data ? JSON.parse(data) : {};
      } catch (e) {
        this.storage = {};
        localStorage.removeItem(this.pluginClass.name);
        console.error("plugin storage cannot be load", e);
      }
    }
  }, {
    key: "savePluginStorage",
    value: function savePluginStorage(storage) {
      try {
        var data = JSON.stringify(storage);
        localStorage.setItem(this.pluginClass.name, data);
      } catch (e) {
        console.error("plugin storage cannot be save", e);
      }
    }
  }, {
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
      var _this5 = this;

      var oldState = this.nextState;
      var newState = oldState || {};
      Object.keys(state).forEach(function (key) {
        newState[key] = state[key];
        _this5[key] = state[key];
      });
      this.nextState = newState;
      if (!oldState) setTimeout(this.updateNextState, 0);
    }
  }]);

  return PluginComponent;
}();
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9saWIvbGF5b3V0L1BsdWdpbi5qcyJdLCJuYW1lcyI6WyJQbHVnaW5TdGF0dXMiLCJNYXBwZWQiLCJkZXNjIiwiSW5zdGFsbGVkIiwiTW91bnRlZCIsIlBsdWdpbkNsYXNzIiwibmFtZSIsImNvbnRleHQiLCJ3aW5kb3dzIiwibGlua3MiLCJzdGF0dXMiLCJwYXJhbWV0ZXJzIiwiY29tcG9uZW50IiwiUGx1Z2luQ29tcG9uZW50IiwiZGVwZW5kZW5jaWVzIiwiZm9yRWFjaCIsImFkZERlcGVuZGVuY3kiLCJPYmplY3QiLCJrZXlzIiwid2lsbE1vdW50IiwicHJvbXB0TW91bnQiLCJ1c2VyIiwidXNlcnMiLCJwdXNoIiwicGx1Z2luQ2xhc3MiLCJtYXBQbHVnaW4iLCJkZXBzIiwiaSIsImxlbmd0aCIsImFkZFVzZXIiLCJpbnN0YW5jZSIsImRpZE1vdW50IiwicGx1Z2lucyIsInBsdWdpbldpbGxNb3VudCIsIngiLCJpbXBvcnQiLCJyZWYiLCJwbHVnaW4iLCJwbHVnaW5FeHBvcnQiLCJleHBvcnQiLCJrZXkiLCJ3aW5kb3ciLCJhZGRQYXJhbWV0ZXJMaW5rIiwicGFyYW0iLCJwbHVnaW5EaWRNb3VudCIsImxpbmsiLCJyZXNvbHZlVmFsdWVSZWZlcmVuY2UiLCJhZGRMaW5rIiwibGlua0xpc3QiLCJwYXRoIiwiY29uc29sZSIsImVycm9yIiwicmVmZXJlbmNlIiwicGFydHMiLCJzcGxpdCIsInBsdWdpbkNsYXNzZXMiLCJ1cGRhdGVOZXh0U3RhdGUiLCJuZXh0U3RhdGUiLCJ1cGRhdGVkV2luZG93cyIsInZhbHVlIiwic2F2ZVBsdWdpblN0b3JhZ2UiLCJsYXlvdXQiLCJ3bmQiLCJ3bmRJZCIsIndsaW5rIiwiZmluZCIsImxrIiwid2luZG93Q2xhc3MiLCJpbmRleE9mIiwicmVuZGVyIiwiYXBwbGljYXRpb24iLCJyZXN0b3JlUGx1Z2luU3RvcmFnZSIsImRhdGEiLCJsb2NhbFN0b3JhZ2UiLCJnZXRJdGVtIiwic3RvcmFnZSIsIkpTT04iLCJwYXJzZSIsImUiLCJyZW1vdmVJdGVtIiwic3RyaW5naWZ5Iiwic2V0SXRlbSIsIndpbmRvd05hbWUiLCJvcHRpb25zIiwib3BlblBsdWdpbldpbmRvdyIsImNsb3NlUGx1Z2luV2luZG93cyIsInN0YXRlIiwib2xkU3RhdGUiLCJuZXdTdGF0ZSIsInNldFRpbWVvdXQiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUFBOzs7O0FBT0EsSUFBTUEsZUFBZTtBQUNuQkMsVUFBUSxFQUFFQyxNQUFNLDBCQUFSLEVBRFc7QUFFbkJDLGFBQVcsRUFBRUQsTUFBTSwyQkFBUixFQUZRO0FBR25CRSxXQUFTLEVBQUVGLE1BQU0sMkJBQVI7QUFIVSxDQUFyQjs7SUFNYUcsVyxXQUFBQSxXO0FBY1gsdUJBQVlDLElBQVosRUFBMEJDLE9BQTFCLEVBQWtEO0FBQUE7O0FBQUEsU0FSbERDLE9BUWtELEdBUmIsRUFRYTtBQUFBLFNBUGxEQyxLQU9rRCxHQVBOLEVBT007O0FBQ2hELFNBQUtILElBQUwsR0FBWUEsSUFBWjtBQUNBLFNBQUtJLE1BQUwsR0FBY1YsYUFBYUMsTUFBM0I7QUFDQSxTQUFLTSxPQUFMLEdBQWVBLE9BQWY7QUFDRDs7OzswQkFDS0wsSSxFQUFjUyxVLEVBQW9CO0FBQUE7O0FBQ3RDLFdBQUtBLFVBQUwsR0FBa0JBLFVBQWxCO0FBQ0EsV0FBS0MsU0FBTCxHQUFpQlYsS0FBS1UsU0FBTCxJQUFrQkMsZUFBbkM7O0FBRUE7QUFDQSxVQUFJWCxLQUFLWSxZQUFULEVBQXVCO0FBQ3JCWixhQUFLWSxZQUFMLENBQWtCQyxPQUFsQixDQUEwQixnQkFBUTtBQUNoQyxpQkFBTyxNQUFLQyxhQUFMLENBQW1CVixJQUFuQixDQUFQO0FBQ0QsU0FGRDtBQUdEOztBQUVEO0FBQ0EsVUFBSUosS0FBS00sT0FBVCxFQUFrQjtBQUNoQlMsZUFBT0MsSUFBUCxDQUFZaEIsS0FBS00sT0FBakIsRUFBMEJPLE9BQTFCLENBQWtDLGdCQUFRO0FBQ3hDLGdCQUFLUCxPQUFMLENBQWFGLElBQWIsSUFBcUIsd0JBQWdC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S0FBS2pDLGVBQWhCLEVBQWlDLENBQWpDO0FBQ2hCIiwiZmlsZSI6IlBsdWdpbi5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IFdpbmRvd0NsYXNzIH0gZnJvbSBcIi4vV2luZG93XCJcclxuXHJcbnR5cGUgUGFyYW1ldGVyTGluayA9IHtcclxuICB3aW5kb3c6IFdpbmRvd0NsYXNzLFxyXG4gIHBhcmFtOiBzdHJpbmcsXHJcbn1cclxuXHJcbmNvbnN0IFBsdWdpblN0YXR1cyA9IHtcclxuICBNYXBwZWQ6IHsgZGVzYzogXCJtYXBwZWQgYnV0IG5vdCBpbnN0YWxsZWRcIiB9LFxyXG4gIEluc3RhbGxlZDogeyBkZXNjOiBcImluc3RhbmNpZWQgYW5kIHdpbGwgbW91bnRcIiB9LFxyXG4gIE1vdW50ZWQ6IHsgZGVzYzogXCJpbnN0YW5jaWVkIGFuZCB3aWxsIG1vdW50XCIgfSxcclxufVxyXG5cclxuZXhwb3J0IGNsYXNzIFBsdWdpbkNsYXNzIHtcclxuICBuYW1lOiBzdHJpbmdcclxuICBzdGF0dXM6IE9iamVjdFxyXG4gIGluc3RhbmNlOiBQbHVnaW5Db21wb25lbnRcclxuICBjb21wb25lbnQ6IEZ1bmN0aW9uXHJcbiAgcGFyYW1ldGVyczogT2JqZWN0XHJcbiAgd2luZG93czogeyBbc3RyaW5nXTogV2luZG93Q2xhc3MgfSA9IHt9XHJcbiAgbGlua3M6IHsgW3N0cmluZ106IEFycmF5PFBhcmFtZXRlckxpbms+IH0gPSB7fVxyXG4gIGV4cG9ydDogT2JqZWN0XHJcbiAgaW1wb3J0OiBPYmplY3RcclxuICBjb250ZXh0OiBQbHVnaW5Db250ZXh0XHJcbiAgdXNlcnM6IEFycmF5PFBsdWdpbkNsYXNzPlxyXG4gIGRlcGVuZGVuY2llczogQXJyYXk8UGx1Z2luQ2xhc3M+XHJcblxyXG4gIGNvbnN0cnVjdG9yKG5hbWU6IHN0cmluZywgY29udGV4dDogUGx1Z2luQ29udGV4dCkge1xyXG4gICAgdGhpcy5uYW1lID0gbmFtZVxyXG4gICAgdGhpcy5zdGF0dXMgPSBQbHVnaW5TdGF0dXMuTWFwcGVkXHJcbiAgICB0aGlzLmNvbnRleHQgPSBjb250ZXh0XHJcbiAgfVxyXG4gIHNldHVwKGRlc2M6IE9iamVjdCwgcGFyYW1ldGVyczogT2JqZWN0KSB7XHJcbiAgICB0aGlzLnBhcmFtZXRlcnMgPSBwYXJhbWV0ZXJzXHJcbiAgICB0aGlzLmNvbXBvbmVudCA9IGRlc2MuY29tcG9uZW50IHx8IFBsdWdpbkNvbXBvbmVudFxyXG5cclxuICAgIC8vIFNldHVwIGRlcGVuZGVuY2llc1xyXG4gICAgaWYgKGRlc2MuZGVwZW5kZW5jaWVzKSB7XHJcbiAgICAgIGRlc2MuZGVwZW5kZW5jaWVzLmZvckVhY2gobmFtZSA9PiB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuYWRkRGVwZW5kZW5jeShuYW1lKVxyXG4gICAgICB9KVxyXG4gICAgfVxyXG5cclxuICAgIC8vIFNldHVwIHdpbmRvd3NcclxuICAgIGlmIChkZXNjLndpbmRvd3MpIHtcclxuICAgICAgT2JqZWN0LmtleXMoZGVzYy53aW5kb3dzKS5mb3JFYWNoKG5hbWUgPT4ge1xyXG4gICAgICAgIHRoaXMud2luZG93c1tuYW1lXSA9IG5ldyBXaW5kb3dDbGFzcyhuYW1lLCBkZXNjLndpbmRvd3NbbmFtZV0sIHRoaXMpXHJcbiAgICAgIH0pXHJcbiAgICAgIHRoaXMuYWRkRGVwZW5kZW5jeShcIndpbmRvd3MtZnJhbWVcIilcclxuICAgIH1cclxuXHJcbiAgICAvLyBNb3VudCBhbiBpbnN0YW5jZVxyXG4gICAgdGhpcy53aWxsTW91bnQoKVxyXG5cclxuICAgIC8vIFByb21wdCBmb3IgZGlkIG1vdW50IHByb2NlZHVyZVxyXG4gICAgdGhpcy5wcm9tcHRNb3VudCgpXHJcbiAgfVxyXG4gIGFkZFVzZXIodXNlcjogUGx1Z2luQ2xhc3MpIHtcclxuICAgIGlmICghdGhpcy51c2VycykgdGhpcy51c2VycyA9IFtdXHJcbiAgICB0aGlzLnVzZXJzLnB1c2godXNlcilcclxuICAgIHJldHVybiB0aGlzXHJcbiAgfVxyXG4gIGFkZERlcGVuZGVuY3kobmFtZTogc3RyaW5nKSB7XHJcbiAgICBjb25zdCBwbHVnaW5DbGFzcyA9IHRoaXMuY29udGV4dC5tYXBQbHVnaW4obmFtZSlcclxuICAgIGlmICghdGhpcy5kZXBlbmRlbmNpZXMpIHRoaXMuZGVwZW5kZW5jaWVzID0gW11cclxuXHJcbiAgICBjb25zdCBkZXBzID0gdGhpcy5kZXBlbmRlbmNpZXNcclxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgZGVwcy5sZW5ndGg7IGkrKykge1xyXG4gICAgICBpZiAoZGVwc1tpXSA9PT0gcGx1Z2luQ2xhc3MpIHJldHVyblxyXG4gICAgfVxyXG4gICAgZGVwcy5wdXNoKHBsdWdpbkNsYXNzKVxyXG4gICAgcmV0dXJuIHBsdWdpbkNsYXNzLmFkZFVzZXIodGhpcylcclxuICB9XHJcbiAgcHJvbXB0TW91bnQoKSB7XHJcbiAgICBpZiAodGhpcy5zdGF0dXMgPT09IFBsdWdpblN0YXR1cy5JbnN0YWxsZWQpIHtcclxuICAgICAgY29uc3QgZGVwcyA9IHRoaXMuZGVwZW5kZW5jaWVzXHJcbiAgICAgIGlmIChkZXBzKSB7XHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBkZXBzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICBpZiAoIWRlcHNbaV0uaW5zdGFuY2UpIHJldHVyblxyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgICB0aGlzLmRpZE1vdW50KClcclxuICAgIH1cclxuICB9XHJcbiAgd2lsbE1vdW50KCkge1xyXG4gICAgdGhpcy5zdGF0dXMgPSBQbHVnaW5TdGF0dXMuSW5zdGFsbGVkXHJcblxyXG4gICAgLy8gQ3JlYXRlIGluc3RhbmNlXHJcbiAgICB0aGlzLmluc3RhbmNlID0gbmV3ICh0aGlzLmNvbXBvbmVudCkodGhpcylcclxuICAgIHRoaXMuY29udGV4dC5wbHVnaW5zW3RoaXMubmFtZV0gPSB0aGlzLmluc3RhbmNlXHJcblxyXG4gICAgLy8gQ2FsbCB3aWxsIG1vdW50XHJcbiAgICB0aGlzLmluc3RhbmNlLnBsdWdpbldpbGxNb3VudCh0aGlzLnBhcmFtZXRlcnMpXHJcblxyXG4gICAgLy8gTm90aWZ5IGFsbCB1c2VyIHBsdWdpbnNcclxuICAgIHRoaXMudXNlcnMgJiYgdGhpcy51c2Vycy5mb3JFYWNoKHggPT4geC5wcm9tcHRNb3VudCh0aGlzKSlcclxuICB9XHJcbiAgZGlkTW91bnQoKSB7XHJcbiAgICB0aGlzLnN0YXR1cyA9IFBsdWdpblN0YXR1cy5Nb3VudGVkXHJcblxyXG4gICAgLy8gUHJvY2VzcyBpbXBvcnRcclxuICAgIHRoaXMuaW1wb3J0ICYmIE9iamVjdC5rZXlzKHRoaXMuaW1wb3J0KS5mb3JFYWNoKG5hbWUgPT4ge1xyXG4gICAgICBjb25zdCByZWYgPSB0aGlzLmltcG9ydFtuYW1lXVxyXG4gICAgICBjb25zdCBwbHVnaW4gPSB0aGlzLmNvbnRleHQucGx1Z2luc1tuYW1lXVxyXG4gICAgICBjb25zdCBwbHVnaW5FeHBvcnQgPSBwbHVnaW4ucGx1Z2luQ2xhc3MuZXhwb3J0XHJcbiAgICAgIGlmIChwbHVnaW5FeHBvcnQpIHtcclxuICAgICAgICBpZiAocmVmID09PSB0cnVlKSB7XHJcbiAgICAgICAgICBwbHVnaW5FeHBvcnQuZm9yRWFjaChrZXkgPT4ge1xyXG4gICAgICAgICAgICB0aGlzLmluc3RhbmNlW2tleV0gPSBwbHVnaW5ba2V5XVxyXG4gICAgICAgICAgfSlcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSBpZiAodHlwZW9mIHJlZiA9PT0gXCJzdHJpbmdcIikge1xyXG4gICAgICAgICAgdGhpcy5pbnN0YW5jZVtyZWZdID0gcGx1Z2luXHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICAgIGVsc2UgaWYgKHR5cGVvZiByZWYgPT09IFwic3RyaW5nXCIpIHtcclxuICAgICAgICB0aGlzLmluc3RhbmNlW3JlZl0gPSBwbHVnaW5cclxuICAgICAgfVxyXG4gICAgfSlcclxuXHJcbiAgICAvLyBQcm9jZXNzIHdpbmRvd3MgcGFyYW1ldGVycyBpbXBvcnRcclxuICAgIE9iamVjdC5rZXlzKHRoaXMud2luZG93cykuZm9yRWFjaChrZXkgPT4ge1xyXG4gICAgICBjb25zdCB3aW5kb3cgPSB0aGlzLndpbmRvd3Nba2V5XVxyXG4gICAgICB3aW5kb3cucGFyYW1ldGVycyAmJiBPYmplY3Qua2V5cyh3aW5kb3cucGFyYW1ldGVycykuZm9yRWFjaChwYXJhbSA9PiB7XHJcbiAgICAgICAgdGhpcy5hZGRQYXJhbWV0ZXJMaW5rKHdpbmRvdywgcGFyYW0pXHJcbiAgICAgIH0pXHJcbiAgICB9KVxyXG5cclxuICAgIHRoaXMuaW5zdGFuY2UucGx1Z2luRGlkTW91bnQoKVxyXG4gIH1cclxuICBhZGRQYXJhbWV0ZXJMaW5rKHdpbmRvdzogT2JqZWN0LCBwYXJhbTogc3RyaW5nKSB7XHJcbiAgICBjb25zdCBsaW5rID0gdGhpcy5yZXNvbHZlVmFsdWVSZWZlcmVuY2Uod2luZG93LnBhcmFtZXRlcnNbcGFyYW1dLCBwYXJhbSlcclxuICAgIGlmIChsaW5rKSB7XHJcbiAgICAgIGxpbmsucGFyYW0gPSBwYXJhbVxyXG4gICAgICBsaW5rLndpbmRvdyA9IHdpbmRvd1xyXG4gICAgICB3aW5kb3cuYWRkTGluayhsaW5rKVxyXG4gICAgICBjb25zdCBsaW5rTGlzdCA9IHRoaXMubGlua3NbbGluay5wYXRoXVxyXG4gICAgICBpZiAoIWxpbmtMaXN0KSB0aGlzLmxpbmtzW2xpbmsucGF0aF0gPSBbIGxpbmsgXVxyXG4gICAgICBlbHNlIGxpbmtMaXN0LnB1c2gobGluaylcclxuICAgIH1cclxuICAgIGVsc2Uge1xyXG4gICAgICBjb25zb2xlLmVycm9yKFwiUGFyYW1ldGVyICdcIiArIHBhcmFtICsgXCInIG9mIHdpbmRvdyAnXCIgKyB3aW5kb3cubmFtZSArIFwiJyBoYXMgaW52YWxpZCBsaW5rOlwiLCBsaW5rLnBhdGgpXHJcbiAgICB9XHJcbiAgfVxyXG4gIHJlc29sdmVWYWx1ZVJlZmVyZW5jZShyZWZlcmVuY2U6IHN0cmluZywga2V5OiBzdHJpbmcpIHtcclxuICAgIGlmIChyZWZlcmVuY2UgPT09IHRydWUpIHtcclxuICAgICAgcmV0dXJuIHtcclxuICAgICAgICBwbHVnaW5DbGFzczogdGhpcyxcclxuICAgICAgICBwYXRoOiBrZXksXHJcbiAgICAgIH1cclxuICAgIH1cclxuICAgIGVsc2UgaWYgKHR5cGVvZiByZWZlcmVuY2UgPT09IFwic3RyaW5nXCIpIHtcclxuICAgICAgY29uc3QgcGFydHMgPSByZWZlcmVuY2Uuc3BsaXQoXCIvXCIpXHJcbiAgICAgIGlmIChwYXJ0cy5sZW5ndGggPiAxKSB7XHJcbiAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgIHBsdWdpbkNsYXNzOiBwYXJ0c1swXSA/IHRoaXMuY29udGV4dC5wbHVnaW5DbGFzc2VzW3BhcnRzWzBdXSA6IHRoaXMsXHJcbiAgICAgICAgICBwYXRoOiBwYXJ0c1sxXSxcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgICAgZWxzZSByZXR1cm4ge1xyXG4gICAgICAgIHBsdWdpbkNsYXNzOiB0aGlzLFxyXG4gICAgICAgIHBhdGg6IHJlZmVyZW5jZSxcclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH1cclxufVxyXG5cclxuZXhwb3J0IGNsYXNzIFBsdWdpbkNvbXBvbmVudCB7XHJcbiAgcGx1Z2luQ2xhc3M6IFBsdWdpbkNsYXNzXHJcbiAgYXBwbGljYXRpb246IE9iamVjdFxyXG4gIHN0b3JhZ2U6IE9iamVjdFxyXG4gIG5leHRTdGF0ZTogT2JqZWN0XHJcblxyXG4gIC8vIExpZmUgQ3ljbGUgbWFuYWdlbWVudCBmdW5jdGlvbnNcclxuICBwbHVnaW5XaWxsTW91bnQocGFyYW1ldGVyczogT2JqZWN0KSB7IH0gLy8gZXNsaW50LWRpc2FibGUtbGluZVxyXG4gIHBsdWdpbkRpZE1vdW50KCkgeyB9XHJcbiAgcGx1Z2luV2lsbFVubW91bnQoKSB7IH1cclxuXHJcbiAgY29uc3RydWN0b3IocGx1Z2luQ2xhc3M6IFBsdWdpbkNsYXNzKSB7XHJcbiAgICB0aGlzLnBsdWdpbkNsYXNzID0gcGx1Z2luQ2xhc3NcclxuICAgIHRoaXMuYXBwbGljYXRpb24gPSBwbHVnaW5DbGFzcy5jb250ZXh0LmFwcGxpY2F0aW9uXHJcbiAgICB0aGlzLnJlc3RvcmVQbHVnaW5TdG9yYWdlKClcclxuICB9XHJcbiAgcmVzdG9yZVBsdWdpblN0b3JhZ2UoKSB7XHJcbiAgICB0cnkge1xyXG4gICAgICBjb25zdCBkYXRhID0gbG9jYWxTdG9yYWdlLmdldEl0ZW0odGhpcy5wbHVnaW5DbGFzcy5uYW1lKVxyXG4gICAgICB0aGlzLnN0b3JhZ2UgPSBkYXRhID8gSlNPTi5wYXJzZShkYXRhKSA6IHt9XHJcbiAgICB9XHJcbiAgICBjYXRjaCAoZSkge1xyXG4gICAgICB0aGlzLnN0b3JhZ2UgPSB7fVxyXG4gICAgICBsb2NhbFN0b3JhZ2UucmVtb3ZlSXRlbSh0aGlzLnBsdWdpbkNsYXNzLm5hbWUpXHJcbiAgICAgIGNvbnNvbGUuZXJyb3IoXCJwbHVnaW4gc3RvcmFnZSBjYW5ub3QgYmUgbG9hZFwiLCBlKVxyXG4gICAgfVxyXG4gIH1cclxuICBzYXZlUGx1Z2luU3RvcmFnZShzdG9yYWdlOiBPYmplY3QpIHtcclxuICAgIHRyeSB7XHJcbiAgICAgIGNvbnN0IGRhdGEgPSBKU09OLnN0cmluZ2lmeShzdG9yYWdlKVxyXG4gICAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbSh0aGlzLnBsdWdpbkNsYXNzLm5hbWUsIGRhdGEpXHJcbiAgICB9XHJcbiAgICBjYXRjaCAoZSkge1xyXG4gICAgICBjb25zb2xlLmVycm9yKFwicGx1Z2luIHN0b3JhZ2UgY2Fubm90IGJlIHNhdmVcIiwgZSlcclxuICAgIH1cclxuICB9XHJcbiAgb3BlbldpbmRvdyh3aW5kb3dOYW1lOiBzdHJpbmcsIG9wdGlvbnM6IE9iamVjdCkge1xyXG4gICAgdGhpcy5sYXlvdXQub3BlblBsdWdpbldpbmRvdyh0aGlzLnBsdWdpbkNsYXNzLndpbmRvd3Nbd2luZG93TmFtZV0sIHRoaXMsIG9wdGlvbnMpXHJcbiAgfVxyXG4gIGNsb3NlV2luZG93KHdpbmRvd05hbWU6IHN0cmluZykge1xyXG4gICAgdGhpcy5sYXlvdXQuY2xvc2VQbHVnaW5XaW5kb3dzKHRoaXMucGx1Z2luQ2xhc3Mud2luZG93c1t3aW5kb3dOYW1lXSwgdGhpcylcclxuICB9XHJcbiAgY2xvc2VBbGxXaW5kb3coKSB7XHJcbiAgICB0aGlzLmxheW91dC5jbG9zZVBsdWdpbldpbmRvd3MobnVsbCwgdGhpcylcclxuICB9XHJcbiAgdXBkYXRlTmV4dFN0YXRlID0gKCkgPT4ge1xyXG4gICAgaWYgKHRoaXMubmV4dFN0YXRlKSB7XHJcbiAgICAgIGNvbnN0IHVwZGF0ZWRXaW5kb3dzID0gW11cclxuICAgICAgT2JqZWN0LmtleXModGhpcy5uZXh0U3RhdGUpLmZvckVhY2goa2V5ID0+IHtcclxuICAgICAgICBjb25zdCB2YWx1ZSA9IHRoaXMubmV4dFN0YXRlW2tleV1cclxuICAgICAgICBjb25zdCBsaW5rcyA9IHRoaXMucGx1Z2luQ2xhc3MubGlua3Nba2V5XVxyXG4gICAgICAgIHRoaXNba2V5XSA9IHZhbHVlXHJcbiAgICAgICAgaWYgKGtleSA9PT0gXCJzdG9yYWdlXCIpIHtcclxuICAgICAgICAgIHRoaXMuc2F2ZVBsdWdpblN0b3JhZ2UodmFsdWUpXHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmIChsaW5rcykge1xyXG4gICAgICAgICAgY29uc3Qgd2luZG93cyA9IHRoaXMubGF5b3V0LndpbmRvd3NcclxuICAgICAgICAgIE9iamVjdC5rZXlzKHdpbmRvd3MpLmZvckVhY2god25kSWQgPT4ge1xyXG4gICAgICAgICAgICBjb25zdCB3bmQgPSB3aW5kb3dzW3duZElkXVxyXG4gICAgICAgICAgICBjb25zdCB3bGluayA9IGxpbmtzLmZpbmQobGsgPT4gbGsud2luZG93ID09PSB3bmQud2luZG93Q2xhc3MpXHJcbiAgICAgICAgICAgIGlmICh3bGluaykge1xyXG4gICAgICAgICAgICAgIHduZC5wYXJhbWV0ZXJzW3dsaW5rLnBhcmFtXSA9IHZhbHVlXHJcbiAgICAgICAgICAgICAgaWYgKHVwZGF0ZWRXaW5kb3dzLmluZGV4T2Yod25kKSA8IDApIHVwZGF0ZWRXaW5kb3dzLnB1c2god25kKVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICB9KVxyXG4gICAgICAgIH1cclxuICAgICAgfSlcclxuICAgICAgdXBkYXRlZFdpbmRvd3MuZm9yRWFjaCh3bmQgPT4gd25kLnJlbmRlcigpKVxyXG4gICAgICB0aGlzLm5leHRTdGF0ZSA9IG51bGxcclxuICAgIH1cclxuICB9XHJcbiAgc2V0U3RhdGUoc3RhdGU6IE9iamVjdCkge1xyXG4gICAgY29uc3Qgb2xkU3RhdGUgPSB0aGlzLm5leHRTdGF0ZVxyXG4gICAgY29uc3QgbmV3U3RhdGUgPSBvbGRTdGF0ZSB8fCB7fVxyXG4gICAgT2JqZWN0LmtleXMoc3RhdGUpLmZvckVhY2goa2V5ID0+IHtcclxuICAgICAgbmV3U3RhdGVba2V5XSA9IHN0YXRlW2tleV1cclxuICAgICAgdGhpc1trZXldID0gc3RhdGVba2V5XVxyXG4gICAgfSlcclxuICAgIHRoaXMubmV4dFN0YXRlID0gbmV3U3RhdGVcclxuICAgIGlmICghb2xkU3RhdGUpIHNldFRpbWVvdXQodGhpcy51cGRhdGVOZXh0U3RhdGUsIDApXHJcbiAgfVxyXG59Il19