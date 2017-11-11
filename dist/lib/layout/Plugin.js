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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9saWIvbGF5b3V0L1BsdWdpbi5qcyJdLCJuYW1lcyI6WyJQbHVnaW5TdGF0dXMiLCJNYXBwZWQiLCJkZXNjIiwiSW5zdGFsbGVkIiwiTW91bnRlZCIsIlBsdWdpbkNsYXNzIiwibmFtZSIsImNvbnRleHQiLCJ3aW5kb3dzIiwibGlua3MiLCJzdGF0dXMiLCJwYXJhbWV0ZXJzIiwiY29tcG9uZW50IiwiUGx1Z2luQ29tcG9uZW50IiwiZGVwZW5kZW5jaWVzIiwiZm9yRWFjaCIsImFkZERlcGVuZGVuY3kiLCJPYmplY3QiLCJrZXlzIiwid2lsbE1vdW50IiwicHJvbXB0TW91bnQiLCJ1c2VyIiwidXNlcnMiLCJwdXNoIiwicGx1Z2luQ2xhc3MiLCJtYXBQbHVnaW4iLCJkZXBzIiwiaSIsImxlbmd0aCIsImFkZFVzZXIiLCJpbnN0YW5jZSIsImRpZE1vdW50IiwicGx1Z2lucyIsInBsdWdpbldpbGxNb3VudCIsIngiLCJpbXBvcnQiLCJyZWYiLCJwbHVnaW4iLCJwbHVnaW5FeHBvcnQiLCJleHBvcnQiLCJrZXkiLCJ3aW5kb3ciLCJhZGRQYXJhbWV0ZXJMaW5rIiwicGFyYW0iLCJwbHVnaW5EaWRNb3VudCIsImxpbmsiLCJyZXNvbHZlVmFsdWVSZWZlcmVuY2UiLCJhZGRMaW5rIiwibGlua0xpc3QiLCJwYXRoIiwiY29uc29sZSIsImVycm9yIiwicmVmZXJlbmNlIiwicGFydHMiLCJzcGxpdCIsInBsdWdpbkNsYXNzZXMiLCJ1cGRhdGVOZXh0U3RhdGUiLCJuZXh0U3RhdGUiLCJ1cGRhdGVkV2luZG93cyIsInZhbHVlIiwic2F2ZVBsdWdpblN0b3JhZ2UiLCJsYXlvdXQiLCJ3bmQiLCJ3bmRJZCIsIndsaW5rIiwiZmluZCIsImxrIiwid2luZG93Q2xhc3MiLCJpbmRleE9mIiwicmVuZGVyIiwiYXBwbGljYXRpb24iLCJyZXN0b3JlUGx1Z2luU3RvcmFnZSIsImRhdGEiLCJsb2NhbFN0b3JhZ2UiLCJnZXRJdGVtIiwic3RvcmFnZSIsIkpTT04iLCJwYXJzZSIsImUiLCJyZW1vdmVJdGVtIiwic3RyaW5naWZ5Iiwic2V0SXRlbSIsIndpbmRvd05hbWUiLCJvcHRpb25zIiwib3BlblBsdWdpbldpbmRvdyIsImNsb3NlUGx1Z2luV2luZG93cyIsInN0YXRlIiwib2xkU3RhdGUiLCJuZXdTdGF0ZSIsInNldFRpbWVvdXQiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUFBOzs7O0FBT0EsSUFBTUEsZUFBZTtBQUNuQkMsVUFBUSxFQUFFQyxNQUFNLDBCQUFSLEVBRFc7QUFFbkJDLGFBQVcsRUFBRUQsTUFBTSwyQkFBUixFQUZRO0FBR25CRSxXQUFTLEVBQUVGLE1BQU0sMkJBQVI7QUFIVSxDQUFyQjs7SUFNYUcsVyxXQUFBQSxXO0FBY1gsdUJBQVlDLElBQVosRUFBMEJDLE9BQTFCLEVBQWtEO0FBQUE7O0FBQUEsU0FSbERDLE9BUWtELEdBUk4sRUFRTTtBQUFBLFNBUGxEQyxLQU9rRCxHQVBOLEVBT007O0FBQ2hELFNBQUtILElBQUwsR0FBWUEsSUFBWjtBQUNBLFNBQUtJLE1BQUwsR0FBY1YsYUFBYUMsTUFBM0I7QUFDQSxTQUFLTSxPQUFMLEdBQWVBLE9BQWY7QUFDRDs7OzswQkFDS0wsSSxFQUFjUyxVLEVBQW9CO0FBQUE7O0FBQ3RDLFdBQUtBLFVBQUwsR0FBa0JBLFVBQWxCO0FBQ0EsV0FBS0MsU0FBTCxHQUFpQlYsS0FBS1UsU0FBTCxJQUFrQkMsZUFBbkM7O0FBRUE7QUFDQSxVQUFJWCxLQUFLWSxZQUFULEVBQXVCO0FBQ3JCWixhQUFLWSxZQUFMLENBQWtCQyxPQUFsQixDQUEwQixnQkFBUTtBQUNoQyxpQkFBTyxNQUFLQyxhQUFMLENBQW1CVixJQUFuQixDQUFQO0FBQ0QsU0FGRDtBQUdEOztBQUVEO0FBQ0EsVUFBSUosS0FBS00sT0FBVCxFQUFrQjtBQUNoQlMsZUFBT0MsSUFBUCxDQUFZaEIsS0FBS00sT0FBakIsRUFBMEJPLE9BQTFCLENBQWtDLGdCQUFRO0FBQ3hDLGdCQUFLUCxPQUFMLENBQWFGLElBQWIsSUFBcUIsd0JBQWdC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S0FBS2pDLGVBQWhCLEVBQWlDLENBQWpDO0FBQ2hCIiwiZmlsZSI6IlBsdWdpbi5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IFdpbmRvd0NsYXNzIH0gZnJvbSBcIi4vV2luZG93XCJcclxuXHJcbnR5cGUgUGFyYW1ldGVyTGluayA9IHtcclxuICB3aW5kb3c6IFdpbmRvd0NsYXNzLFxyXG4gIHBhcmFtOiBzdHJpbmcsXHJcbn1cclxuXHJcbmNvbnN0IFBsdWdpblN0YXR1cyA9IHtcclxuICBNYXBwZWQ6IHsgZGVzYzogXCJtYXBwZWQgYnV0IG5vdCBpbnN0YWxsZWRcIiB9LFxyXG4gIEluc3RhbGxlZDogeyBkZXNjOiBcImluc3RhbmNpZWQgYW5kIHdpbGwgbW91bnRcIiB9LFxyXG4gIE1vdW50ZWQ6IHsgZGVzYzogXCJpbnN0YW5jaWVkIGFuZCB3aWxsIG1vdW50XCIgfSxcclxufVxyXG5cclxuZXhwb3J0IGNsYXNzIFBsdWdpbkNsYXNzIHtcclxuICBuYW1lOiBzdHJpbmdcclxuICBzdGF0dXM6IE9iamVjdFxyXG4gIGluc3RhbmNlOiBQbHVnaW5Db21wb25lbnRcclxuICBjb21wb25lbnQ6IEZ1bmN0aW9uXHJcbiAgcGFyYW1ldGVyczogT2JqZWN0XHJcbiAgd2luZG93czogeyBbV2luZG93Q2xhc3NJRF06IFdpbmRvd0NsYXNzIH0gPSB7fVxyXG4gIGxpbmtzOiB7IFtzdHJpbmddOiBBcnJheTxQYXJhbWV0ZXJMaW5rPiB9ID0ge31cclxuICBleHBvcnQ6IE9iamVjdFxyXG4gIGltcG9ydDogT2JqZWN0XHJcbiAgY29udGV4dDogUGx1Z2luQ29udGV4dFxyXG4gIHVzZXJzOiBBcnJheTxQbHVnaW5DbGFzcz5cclxuICBkZXBlbmRlbmNpZXM6IEFycmF5PFBsdWdpbkNsYXNzPlxyXG5cclxuICBjb25zdHJ1Y3RvcihuYW1lOiBzdHJpbmcsIGNvbnRleHQ6IFBsdWdpbkNvbnRleHQpIHtcclxuICAgIHRoaXMubmFtZSA9IG5hbWVcclxuICAgIHRoaXMuc3RhdHVzID0gUGx1Z2luU3RhdHVzLk1hcHBlZFxyXG4gICAgdGhpcy5jb250ZXh0ID0gY29udGV4dFxyXG4gIH1cclxuICBzZXR1cChkZXNjOiBPYmplY3QsIHBhcmFtZXRlcnM6IE9iamVjdCkge1xyXG4gICAgdGhpcy5wYXJhbWV0ZXJzID0gcGFyYW1ldGVyc1xyXG4gICAgdGhpcy5jb21wb25lbnQgPSBkZXNjLmNvbXBvbmVudCB8fCBQbHVnaW5Db21wb25lbnRcclxuXHJcbiAgICAvLyBTZXR1cCBkZXBlbmRlbmNpZXNcclxuICAgIGlmIChkZXNjLmRlcGVuZGVuY2llcykge1xyXG4gICAgICBkZXNjLmRlcGVuZGVuY2llcy5mb3JFYWNoKG5hbWUgPT4ge1xyXG4gICAgICAgIHJldHVybiB0aGlzLmFkZERlcGVuZGVuY3kobmFtZSlcclxuICAgICAgfSlcclxuICAgIH1cclxuXHJcbiAgICAvLyBTZXR1cCB3aW5kb3dzXHJcbiAgICBpZiAoZGVzYy53aW5kb3dzKSB7XHJcbiAgICAgIE9iamVjdC5rZXlzKGRlc2Mud2luZG93cykuZm9yRWFjaChuYW1lID0+IHtcclxuICAgICAgICB0aGlzLndpbmRvd3NbbmFtZV0gPSBuZXcgV2luZG93Q2xhc3MobmFtZSwgZGVzYy53aW5kb3dzW25hbWVdLCB0aGlzKVxyXG4gICAgICB9KVxyXG4gICAgICB0aGlzLmFkZERlcGVuZGVuY3koXCJ3aW5kb3dzLWZyYW1lXCIpXHJcbiAgICB9XHJcblxyXG4gICAgLy8gTW91bnQgYW4gaW5zdGFuY2VcclxuICAgIHRoaXMud2lsbE1vdW50KClcclxuXHJcbiAgICAvLyBQcm9tcHQgZm9yIGRpZCBtb3VudCBwcm9jZWR1cmVcclxuICAgIHRoaXMucHJvbXB0TW91bnQoKVxyXG4gIH1cclxuICBhZGRVc2VyKHVzZXI6IFBsdWdpbkNsYXNzKSB7XHJcbiAgICBpZiAoIXRoaXMudXNlcnMpIHRoaXMudXNlcnMgPSBbXVxyXG4gICAgdGhpcy51c2Vycy5wdXNoKHVzZXIpXHJcbiAgICByZXR1cm4gdGhpc1xyXG4gIH1cclxuICBhZGREZXBlbmRlbmN5KG5hbWU6IHN0cmluZykge1xyXG4gICAgY29uc3QgcGx1Z2luQ2xhc3MgPSB0aGlzLmNvbnRleHQubWFwUGx1Z2luKG5hbWUpXHJcbiAgICBpZiAoIXRoaXMuZGVwZW5kZW5jaWVzKSB0aGlzLmRlcGVuZGVuY2llcyA9IFtdXHJcblxyXG4gICAgY29uc3QgZGVwcyA9IHRoaXMuZGVwZW5kZW5jaWVzXHJcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IGRlcHMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgaWYgKGRlcHNbaV0gPT09IHBsdWdpbkNsYXNzKSByZXR1cm5cclxuICAgIH1cclxuICAgIGRlcHMucHVzaChwbHVnaW5DbGFzcylcclxuICAgIHJldHVybiBwbHVnaW5DbGFzcy5hZGRVc2VyKHRoaXMpXHJcbiAgfVxyXG4gIHByb21wdE1vdW50KCkge1xyXG4gICAgaWYgKHRoaXMuc3RhdHVzID09PSBQbHVnaW5TdGF0dXMuSW5zdGFsbGVkKSB7XHJcbiAgICAgIGNvbnN0IGRlcHMgPSB0aGlzLmRlcGVuZGVuY2llc1xyXG4gICAgICBpZiAoZGVwcykge1xyXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgZGVwcy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgaWYgKCFkZXBzW2ldLmluc3RhbmNlKSByZXR1cm5cclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgICAgdGhpcy5kaWRNb3VudCgpXHJcbiAgICB9XHJcbiAgfVxyXG4gIHdpbGxNb3VudCgpIHtcclxuICAgIHRoaXMuc3RhdHVzID0gUGx1Z2luU3RhdHVzLkluc3RhbGxlZFxyXG5cclxuICAgIC8vIENyZWF0ZSBpbnN0YW5jZVxyXG4gICAgdGhpcy5pbnN0YW5jZSA9IG5ldyAodGhpcy5jb21wb25lbnQpKHRoaXMpXHJcbiAgICB0aGlzLmNvbnRleHQucGx1Z2luc1t0aGlzLm5hbWVdID0gdGhpcy5pbnN0YW5jZVxyXG5cclxuICAgIC8vIENhbGwgd2lsbCBtb3VudFxyXG4gICAgdGhpcy5pbnN0YW5jZS5wbHVnaW5XaWxsTW91bnQodGhpcy5wYXJhbWV0ZXJzKVxyXG5cclxuICAgIC8vIE5vdGlmeSBhbGwgdXNlciBwbHVnaW5zXHJcbiAgICB0aGlzLnVzZXJzICYmIHRoaXMudXNlcnMuZm9yRWFjaCh4ID0+IHgucHJvbXB0TW91bnQodGhpcykpXHJcbiAgfVxyXG4gIGRpZE1vdW50KCkge1xyXG4gICAgdGhpcy5zdGF0dXMgPSBQbHVnaW5TdGF0dXMuTW91bnRlZFxyXG5cclxuICAgIC8vIFByb2Nlc3MgaW1wb3J0XHJcbiAgICB0aGlzLmltcG9ydCAmJiBPYmplY3Qua2V5cyh0aGlzLmltcG9ydCkuZm9yRWFjaChuYW1lID0+IHtcclxuICAgICAgY29uc3QgcmVmID0gdGhpcy5pbXBvcnRbbmFtZV1cclxuICAgICAgY29uc3QgcGx1Z2luID0gdGhpcy5jb250ZXh0LnBsdWdpbnNbbmFtZV1cclxuICAgICAgY29uc3QgcGx1Z2luRXhwb3J0ID0gcGx1Z2luLnBsdWdpbkNsYXNzLmV4cG9ydFxyXG4gICAgICBpZiAocGx1Z2luRXhwb3J0KSB7XHJcbiAgICAgICAgaWYgKHJlZiA9PT0gdHJ1ZSkge1xyXG4gICAgICAgICAgcGx1Z2luRXhwb3J0LmZvckVhY2goa2V5ID0+IHtcclxuICAgICAgICAgICAgdGhpcy5pbnN0YW5jZVtrZXldID0gcGx1Z2luW2tleV1cclxuICAgICAgICAgIH0pXHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2UgaWYgKHR5cGVvZiByZWYgPT09IFwic3RyaW5nXCIpIHtcclxuICAgICAgICAgIHRoaXMuaW5zdGFuY2VbcmVmXSA9IHBsdWdpblxyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgICBlbHNlIGlmICh0eXBlb2YgcmVmID09PSBcInN0cmluZ1wiKSB7XHJcbiAgICAgICAgdGhpcy5pbnN0YW5jZVtyZWZdID0gcGx1Z2luXHJcbiAgICAgIH1cclxuICAgIH0pXHJcblxyXG4gICAgLy8gUHJvY2VzcyB3aW5kb3dzIHBhcmFtZXRlcnMgaW1wb3J0XHJcbiAgICBPYmplY3Qua2V5cyh0aGlzLndpbmRvd3MpLmZvckVhY2goa2V5ID0+IHtcclxuICAgICAgY29uc3Qgd2luZG93ID0gdGhpcy53aW5kb3dzW2tleV1cclxuICAgICAgd2luZG93LnBhcmFtZXRlcnMgJiYgT2JqZWN0LmtleXMod2luZG93LnBhcmFtZXRlcnMpLmZvckVhY2gocGFyYW0gPT4ge1xyXG4gICAgICAgIHRoaXMuYWRkUGFyYW1ldGVyTGluayh3aW5kb3csIHBhcmFtKVxyXG4gICAgICB9KVxyXG4gICAgfSlcclxuXHJcbiAgICB0aGlzLmluc3RhbmNlLnBsdWdpbkRpZE1vdW50KClcclxuICB9XHJcbiAgYWRkUGFyYW1ldGVyTGluayh3aW5kb3c6IE9iamVjdCwgcGFyYW06IHN0cmluZykge1xyXG4gICAgY29uc3QgbGluayA9IHRoaXMucmVzb2x2ZVZhbHVlUmVmZXJlbmNlKHdpbmRvdy5wYXJhbWV0ZXJzW3BhcmFtXSwgcGFyYW0pXHJcbiAgICBpZiAobGluaykge1xyXG4gICAgICBsaW5rLnBhcmFtID0gcGFyYW1cclxuICAgICAgbGluay53aW5kb3cgPSB3aW5kb3dcclxuICAgICAgd2luZG93LmFkZExpbmsobGluaylcclxuICAgICAgY29uc3QgbGlua0xpc3QgPSB0aGlzLmxpbmtzW2xpbmsucGF0aF1cclxuICAgICAgaWYgKCFsaW5rTGlzdCkgdGhpcy5saW5rc1tsaW5rLnBhdGhdID0gWyBsaW5rIF1cclxuICAgICAgZWxzZSBsaW5rTGlzdC5wdXNoKGxpbmspXHJcbiAgICB9XHJcbiAgICBlbHNlIHtcclxuICAgICAgY29uc29sZS5lcnJvcihcIlBhcmFtZXRlciAnXCIgKyBwYXJhbSArIFwiJyBvZiB3aW5kb3cgJ1wiICsgd2luZG93Lm5hbWUgKyBcIicgaGFzIGludmFsaWQgbGluazpcIiwgbGluay5wYXRoKVxyXG4gICAgfVxyXG4gIH1cclxuICByZXNvbHZlVmFsdWVSZWZlcmVuY2UocmVmZXJlbmNlOiBzdHJpbmcsIGtleTogc3RyaW5nKSB7XHJcbiAgICBpZiAocmVmZXJlbmNlID09PSB0cnVlKSB7XHJcbiAgICAgIHJldHVybiB7XHJcbiAgICAgICAgcGx1Z2luQ2xhc3M6IHRoaXMsXHJcbiAgICAgICAgcGF0aDoga2V5LFxyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgICBlbHNlIGlmICh0eXBlb2YgcmVmZXJlbmNlID09PSBcInN0cmluZ1wiKSB7XHJcbiAgICAgIGNvbnN0IHBhcnRzID0gcmVmZXJlbmNlLnNwbGl0KFwiL1wiKVxyXG4gICAgICBpZiAocGFydHMubGVuZ3RoID4gMSkge1xyXG4gICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICBwbHVnaW5DbGFzczogcGFydHNbMF0gPyB0aGlzLmNvbnRleHQucGx1Z2luQ2xhc3Nlc1twYXJ0c1swXV0gOiB0aGlzLFxyXG4gICAgICAgICAgcGF0aDogcGFydHNbMV0sXHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICAgIGVsc2UgcmV0dXJuIHtcclxuICAgICAgICBwbHVnaW5DbGFzczogdGhpcyxcclxuICAgICAgICBwYXRoOiByZWZlcmVuY2UsXHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9XHJcbn1cclxuXHJcbmV4cG9ydCBjbGFzcyBQbHVnaW5Db21wb25lbnQge1xyXG4gIHBsdWdpbkNsYXNzOiBQbHVnaW5DbGFzc1xyXG4gIGFwcGxpY2F0aW9uOiBPYmplY3RcclxuICBzdG9yYWdlOiBPYmplY3RcclxuICBuZXh0U3RhdGU6IE9iamVjdFxyXG5cclxuICAvLyBMaWZlIEN5Y2xlIG1hbmFnZW1lbnQgZnVuY3Rpb25zXHJcbiAgcGx1Z2luV2lsbE1vdW50KHBhcmFtZXRlcnM6IE9iamVjdCkgeyB9IC8vIGVzbGludC1kaXNhYmxlLWxpbmVcclxuICBwbHVnaW5EaWRNb3VudCgpIHsgfVxyXG4gIHBsdWdpbldpbGxVbm1vdW50KCkgeyB9XHJcblxyXG4gIGNvbnN0cnVjdG9yKHBsdWdpbkNsYXNzOiBQbHVnaW5DbGFzcykge1xyXG4gICAgdGhpcy5wbHVnaW5DbGFzcyA9IHBsdWdpbkNsYXNzXHJcbiAgICB0aGlzLmFwcGxpY2F0aW9uID0gcGx1Z2luQ2xhc3MuY29udGV4dC5hcHBsaWNhdGlvblxyXG4gICAgdGhpcy5yZXN0b3JlUGx1Z2luU3RvcmFnZSgpXHJcbiAgfVxyXG4gIHJlc3RvcmVQbHVnaW5TdG9yYWdlKCkge1xyXG4gICAgdHJ5IHtcclxuICAgICAgY29uc3QgZGF0YSA9IGxvY2FsU3RvcmFnZS5nZXRJdGVtKHRoaXMucGx1Z2luQ2xhc3MubmFtZSlcclxuICAgICAgdGhpcy5zdG9yYWdlID0gZGF0YSA/IEpTT04ucGFyc2UoZGF0YSkgOiB7fVxyXG4gICAgfVxyXG4gICAgY2F0Y2ggKGUpIHtcclxuICAgICAgdGhpcy5zdG9yYWdlID0ge31cclxuICAgICAgbG9jYWxTdG9yYWdlLnJlbW92ZUl0ZW0odGhpcy5wbHVnaW5DbGFzcy5uYW1lKVxyXG4gICAgICBjb25zb2xlLmVycm9yKFwicGx1Z2luIHN0b3JhZ2UgY2Fubm90IGJlIGxvYWRcIiwgZSlcclxuICAgIH1cclxuICB9XHJcbiAgc2F2ZVBsdWdpblN0b3JhZ2Uoc3RvcmFnZTogT2JqZWN0KSB7XHJcbiAgICB0cnkge1xyXG4gICAgICBjb25zdCBkYXRhID0gSlNPTi5zdHJpbmdpZnkoc3RvcmFnZSlcclxuICAgICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0odGhpcy5wbHVnaW5DbGFzcy5uYW1lLCBkYXRhKVxyXG4gICAgfVxyXG4gICAgY2F0Y2ggKGUpIHtcclxuICAgICAgY29uc29sZS5lcnJvcihcInBsdWdpbiBzdG9yYWdlIGNhbm5vdCBiZSBzYXZlXCIsIGUpXHJcbiAgICB9XHJcbiAgfVxyXG4gIG9wZW5XaW5kb3cod2luZG93TmFtZTogc3RyaW5nLCBvcHRpb25zOiBPYmplY3QpIHtcclxuICAgIHRoaXMubGF5b3V0Lm9wZW5QbHVnaW5XaW5kb3codGhpcy5wbHVnaW5DbGFzcy53aW5kb3dzW3dpbmRvd05hbWVdLCB0aGlzLCBvcHRpb25zKVxyXG4gIH1cclxuICBjbG9zZVdpbmRvdyh3aW5kb3dOYW1lOiBzdHJpbmcpIHtcclxuICAgIHRoaXMubGF5b3V0LmNsb3NlUGx1Z2luV2luZG93cyh0aGlzLnBsdWdpbkNsYXNzLndpbmRvd3Nbd2luZG93TmFtZV0sIHRoaXMpXHJcbiAgfVxyXG4gIGNsb3NlQWxsV2luZG93KCkge1xyXG4gICAgdGhpcy5sYXlvdXQuY2xvc2VQbHVnaW5XaW5kb3dzKG51bGwsIHRoaXMpXHJcbiAgfVxyXG4gIHVwZGF0ZU5leHRTdGF0ZSA9ICgpID0+IHtcclxuICAgIGlmICh0aGlzLm5leHRTdGF0ZSkge1xyXG4gICAgICBjb25zdCB1cGRhdGVkV2luZG93cyA9IFtdXHJcbiAgICAgIE9iamVjdC5rZXlzKHRoaXMubmV4dFN0YXRlKS5mb3JFYWNoKGtleSA9PiB7XHJcbiAgICAgICAgY29uc3QgdmFsdWUgPSB0aGlzLm5leHRTdGF0ZVtrZXldXHJcbiAgICAgICAgY29uc3QgbGlua3MgPSB0aGlzLnBsdWdpbkNsYXNzLmxpbmtzW2tleV1cclxuICAgICAgICB0aGlzW2tleV0gPSB2YWx1ZVxyXG4gICAgICAgIGlmIChrZXkgPT09IFwic3RvcmFnZVwiKSB7XHJcbiAgICAgICAgICB0aGlzLnNhdmVQbHVnaW5TdG9yYWdlKHZhbHVlKVxyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAobGlua3MpIHtcclxuICAgICAgICAgIGNvbnN0IHdpbmRvd3MgPSB0aGlzLmxheW91dC53aW5kb3dzXHJcbiAgICAgICAgICBPYmplY3Qua2V5cyh3aW5kb3dzKS5mb3JFYWNoKHduZElkID0+IHtcclxuICAgICAgICAgICAgY29uc3Qgd25kID0gd2luZG93c1t3bmRJZF1cclxuICAgICAgICAgICAgY29uc3Qgd2xpbmsgPSBsaW5rcy5maW5kKGxrID0+IGxrLndpbmRvdyA9PT0gd25kLndpbmRvd0NsYXNzKVxyXG4gICAgICAgICAgICBpZiAod2xpbmspIHtcclxuICAgICAgICAgICAgICB3bmQucGFyYW1ldGVyc1t3bGluay5wYXJhbV0gPSB2YWx1ZVxyXG4gICAgICAgICAgICAgIGlmICh1cGRhdGVkV2luZG93cy5pbmRleE9mKHduZCkgPCAwKSB1cGRhdGVkV2luZG93cy5wdXNoKHduZClcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgfSlcclxuICAgICAgICB9XHJcbiAgICAgIH0pXHJcbiAgICAgIHVwZGF0ZWRXaW5kb3dzLmZvckVhY2god25kID0+IHduZC5yZW5kZXIoKSlcclxuICAgICAgdGhpcy5uZXh0U3RhdGUgPSBudWxsXHJcbiAgICB9XHJcbiAgfVxyXG4gIHNldFN0YXRlKHN0YXRlOiBPYmplY3QpIHtcclxuICAgIGNvbnN0IG9sZFN0YXRlID0gdGhpcy5uZXh0U3RhdGVcclxuICAgIGNvbnN0IG5ld1N0YXRlID0gb2xkU3RhdGUgfHwge31cclxuICAgIE9iamVjdC5rZXlzKHN0YXRlKS5mb3JFYWNoKGtleSA9PiB7XHJcbiAgICAgIG5ld1N0YXRlW2tleV0gPSBzdGF0ZVtrZXldXHJcbiAgICAgIHRoaXNba2V5XSA9IHN0YXRlW2tleV1cclxuICAgIH0pXHJcbiAgICB0aGlzLm5leHRTdGF0ZSA9IG5ld1N0YXRlXHJcbiAgICBpZiAoIW9sZFN0YXRlKSBzZXRUaW1lb3V0KHRoaXMudXBkYXRlTmV4dFN0YXRlLCAwKVxyXG4gIH1cclxufSJdfQ==