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
  }

  _createClass(PluginComponent, [{
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9saWIvbGF5b3V0L1BsdWdpbi5qcyJdLCJuYW1lcyI6WyJQbHVnaW5TdGF0dXMiLCJNYXBwZWQiLCJkZXNjIiwiSW5zdGFsbGVkIiwiTW91bnRlZCIsIlBsdWdpbkNsYXNzIiwibmFtZSIsImNvbnRleHQiLCJ3aW5kb3dzIiwibGlua3MiLCJzdGF0dXMiLCJwYXJhbWV0ZXJzIiwiY29tcG9uZW50IiwiUGx1Z2luQ29tcG9uZW50IiwiZGVwZW5kZW5jaWVzIiwiZm9yRWFjaCIsImFkZERlcGVuZGVuY3kiLCJPYmplY3QiLCJrZXlzIiwid2lsbE1vdW50IiwicHJvbXB0TW91bnQiLCJ1c2VyIiwidXNlcnMiLCJwdXNoIiwicGx1Z2luQ2xhc3MiLCJtYXBQbHVnaW4iLCJkZXBzIiwiaSIsImxlbmd0aCIsImFkZFVzZXIiLCJpbnN0YW5jZSIsImRpZE1vdW50IiwicGx1Z2lucyIsInBsdWdpbldpbGxNb3VudCIsIngiLCJpbXBvcnQiLCJyZWYiLCJwbHVnaW4iLCJwbHVnaW5FeHBvcnQiLCJleHBvcnQiLCJrZXkiLCJ3aW5kb3ciLCJhZGRQYXJhbWV0ZXJMaW5rIiwicGFyYW0iLCJwbHVnaW5EaWRNb3VudCIsImxpbmsiLCJyZXNvbHZlVmFsdWVSZWZlcmVuY2UiLCJhZGRMaW5rIiwibGlua0xpc3QiLCJwYXRoIiwiY29uc29sZSIsImVycm9yIiwicmVmZXJlbmNlIiwicGFydHMiLCJzcGxpdCIsInBsdWdpbkNsYXNzZXMiLCJ1cGRhdGVOZXh0U3RhdGUiLCJuZXh0U3RhdGUiLCJ1cGRhdGVkV2luZG93cyIsInZhbHVlIiwibGF5b3V0Iiwid25kIiwid25kSWQiLCJ3bGluayIsImZpbmQiLCJsayIsIndpbmRvd0NsYXNzIiwiaW5kZXhPZiIsInJlbmRlciIsImFwcGxpY2F0aW9uIiwid2luZG93TmFtZSIsIm9wdGlvbnMiLCJvcGVuUGx1Z2luV2luZG93IiwiY2xvc2VQbHVnaW5XaW5kb3dzIiwic3RhdGUiLCJvbGRTdGF0ZSIsIm5ld1N0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LE1BQU1sQyxHQUFOLENBQWhCO0FBQ0EsZUFBS0EsR0FBTCxJQUFZa0MsTUFBTWxDLEdBQU4sQ0FBWjtBQUNELE9BSEQ7QUFJQSxXQUFLaUIsU0FBTCxHQUFpQm1CLFFBQWpCO0FBQ0EsVUFBSSxDQUFDRCxRQUFMLEVBQWVFLFdBQVcsS0FBS3JCLGVBQWhCLEVBQWlDLENBQWpDO0FBQ2hCIiwiZmlsZSI6IlBsdWdpbi5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IFdpbmRvd0NsYXNzIH0gZnJvbSBcIi4vV2luZG93XCJcclxuXHJcbnR5cGUgUGFyYW1ldGVyTGluayA9IHtcclxuICB3aW5kb3c6IFdpbmRvd0NsYXNzLFxyXG4gIHBhcmFtOiBzdHJpbmcsXHJcbn1cclxuXHJcbmNvbnN0IFBsdWdpblN0YXR1cyA9IHtcclxuICBNYXBwZWQ6IHsgZGVzYzogXCJtYXBwZWQgYnV0IG5vdCBpbnN0YWxsZWRcIiB9LFxyXG4gIEluc3RhbGxlZDogeyBkZXNjOiBcImluc3RhbmNpZWQgYW5kIHdpbGwgbW91bnRcIiB9LFxyXG4gIE1vdW50ZWQ6IHsgZGVzYzogXCJpbnN0YW5jaWVkIGFuZCB3aWxsIG1vdW50XCIgfSxcclxufVxyXG5cclxuZXhwb3J0IGNsYXNzIFBsdWdpbkNsYXNzIHtcclxuICBuYW1lOiBzdHJpbmdcclxuICBzdGF0dXM6IE9iamVjdFxyXG4gIGluc3RhbmNlOiBQbHVnaW5Db21wb25lbnRcclxuICBjb21wb25lbnQ6IEZ1bmN0aW9uXHJcbiAgcGFyYW1ldGVyczogT2JqZWN0XHJcbiAgd2luZG93czogeyBbV2luZG93Q2xhc3NJRF06IFdpbmRvd0NsYXNzIH0gPSB7fVxyXG4gIGxpbmtzOiB7IFtzdHJpbmddOiBBcnJheTxQYXJhbWV0ZXJMaW5rPiB9ID0ge31cclxuICBleHBvcnQ6IE9iamVjdFxyXG4gIGltcG9ydDogT2JqZWN0XHJcbiAgY29udGV4dDogUGx1Z2luQ29udGV4dFxyXG4gIHVzZXJzOiBBcnJheTxQbHVnaW5DbGFzcz5cclxuICBkZXBlbmRlbmNpZXM6IEFycmF5PFBsdWdpbkNsYXNzPlxyXG5cclxuICBjb25zdHJ1Y3RvcihuYW1lOiBzdHJpbmcsIGNvbnRleHQ6IFBsdWdpbkNvbnRleHQpIHtcclxuICAgIHRoaXMubmFtZSA9IG5hbWVcclxuICAgIHRoaXMuc3RhdHVzID0gUGx1Z2luU3RhdHVzLk1hcHBlZFxyXG4gICAgdGhpcy5jb250ZXh0ID0gY29udGV4dFxyXG4gIH1cclxuICBzZXR1cChkZXNjOiBPYmplY3QsIHBhcmFtZXRlcnM6IE9iamVjdCkge1xyXG4gICAgdGhpcy5wYXJhbWV0ZXJzID0gcGFyYW1ldGVyc1xyXG4gICAgdGhpcy5jb21wb25lbnQgPSBkZXNjLmNvbXBvbmVudCB8fCBQbHVnaW5Db21wb25lbnRcclxuXHJcbiAgICAvLyBTZXR1cCBkZXBlbmRlbmNpZXNcclxuICAgIGlmIChkZXNjLmRlcGVuZGVuY2llcykge1xyXG4gICAgICBkZXNjLmRlcGVuZGVuY2llcy5mb3JFYWNoKG5hbWUgPT4ge1xyXG4gICAgICAgIHJldHVybiB0aGlzLmFkZERlcGVuZGVuY3kobmFtZSlcclxuICAgICAgfSlcclxuICAgIH1cclxuXHJcbiAgICAvLyBTZXR1cCB3aW5kb3dzXHJcbiAgICBpZiAoZGVzYy53aW5kb3dzKSB7XHJcbiAgICAgIE9iamVjdC5rZXlzKGRlc2Mud2luZG93cykuZm9yRWFjaChuYW1lID0+IHtcclxuICAgICAgICB0aGlzLndpbmRvd3NbbmFtZV0gPSBuZXcgV2luZG93Q2xhc3MobmFtZSwgZGVzYy53aW5kb3dzW25hbWVdLCB0aGlzKVxyXG4gICAgICB9KVxyXG4gICAgICB0aGlzLmFkZERlcGVuZGVuY3koXCJ3aW5kb3dzLWZyYW1lXCIpXHJcbiAgICB9XHJcblxyXG4gICAgLy8gTW91bnQgYW4gaW5zdGFuY2VcclxuICAgIHRoaXMud2lsbE1vdW50KClcclxuXHJcbiAgICAvLyBQcm9tcHQgZm9yIGRpZCBtb3VudCBwcm9jZWR1cmVcclxuICAgIHRoaXMucHJvbXB0TW91bnQoKVxyXG4gIH1cclxuICBhZGRVc2VyKHVzZXI6IFBsdWdpbkNsYXNzKSB7XHJcbiAgICBpZiAoIXRoaXMudXNlcnMpIHRoaXMudXNlcnMgPSBbXVxyXG4gICAgdGhpcy51c2Vycy5wdXNoKHVzZXIpXHJcbiAgICByZXR1cm4gdGhpc1xyXG4gIH1cclxuICBhZGREZXBlbmRlbmN5KG5hbWU6IHN0cmluZykge1xyXG4gICAgY29uc3QgcGx1Z2luQ2xhc3MgPSB0aGlzLmNvbnRleHQubWFwUGx1Z2luKG5hbWUpXHJcbiAgICBpZiAoIXRoaXMuZGVwZW5kZW5jaWVzKSB0aGlzLmRlcGVuZGVuY2llcyA9IFtdXHJcblxyXG4gICAgY29uc3QgZGVwcyA9IHRoaXMuZGVwZW5kZW5jaWVzXHJcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IGRlcHMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgaWYgKGRlcHNbaV0gPT09IHBsdWdpbkNsYXNzKSByZXR1cm5cclxuICAgIH1cclxuICAgIGRlcHMucHVzaChwbHVnaW5DbGFzcylcclxuICAgIHJldHVybiBwbHVnaW5DbGFzcy5hZGRVc2VyKHRoaXMpXHJcbiAgfVxyXG4gIHByb21wdE1vdW50KCkge1xyXG4gICAgaWYgKHRoaXMuc3RhdHVzID09PSBQbHVnaW5TdGF0dXMuSW5zdGFsbGVkKSB7XHJcbiAgICAgIGNvbnN0IGRlcHMgPSB0aGlzLmRlcGVuZGVuY2llc1xyXG4gICAgICBpZiAoZGVwcykge1xyXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgZGVwcy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgaWYgKCFkZXBzW2ldLmluc3RhbmNlKSByZXR1cm5cclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgICAgdGhpcy5kaWRNb3VudCgpXHJcbiAgICB9XHJcbiAgfVxyXG4gIHdpbGxNb3VudCgpIHtcclxuICAgIHRoaXMuc3RhdHVzID0gUGx1Z2luU3RhdHVzLkluc3RhbGxlZFxyXG5cclxuICAgIC8vIENyZWF0ZSBpbnN0YW5jZVxyXG4gICAgdGhpcy5pbnN0YW5jZSA9IG5ldyAodGhpcy5jb21wb25lbnQpKHRoaXMpXHJcbiAgICB0aGlzLmNvbnRleHQucGx1Z2luc1t0aGlzLm5hbWVdID0gdGhpcy5pbnN0YW5jZVxyXG5cclxuICAgIC8vIENhbGwgd2lsbCBtb3VudFxyXG4gICAgdGhpcy5pbnN0YW5jZS5wbHVnaW5XaWxsTW91bnQodGhpcy5wYXJhbWV0ZXJzKVxyXG5cclxuICAgIC8vIE5vdGlmeSBhbGwgdXNlciBwbHVnaW5zXHJcbiAgICB0aGlzLnVzZXJzICYmIHRoaXMudXNlcnMuZm9yRWFjaCh4ID0+IHgucHJvbXB0TW91bnQodGhpcykpXHJcbiAgfVxyXG4gIGRpZE1vdW50KCkge1xyXG4gICAgdGhpcy5zdGF0dXMgPSBQbHVnaW5TdGF0dXMuTW91bnRlZFxyXG5cclxuICAgIC8vIFByb2Nlc3MgaW1wb3J0XHJcbiAgICB0aGlzLmltcG9ydCAmJiBPYmplY3Qua2V5cyh0aGlzLmltcG9ydCkuZm9yRWFjaChuYW1lID0+IHtcclxuICAgICAgY29uc3QgcmVmID0gdGhpcy5pbXBvcnRbbmFtZV1cclxuICAgICAgY29uc3QgcGx1Z2luID0gdGhpcy5jb250ZXh0LnBsdWdpbnNbbmFtZV1cclxuICAgICAgY29uc3QgcGx1Z2luRXhwb3J0ID0gcGx1Z2luLnBsdWdpbkNsYXNzLmV4cG9ydFxyXG4gICAgICBpZiAocGx1Z2luRXhwb3J0KSB7XHJcbiAgICAgICAgaWYgKHJlZiA9PT0gdHJ1ZSkge1xyXG4gICAgICAgICAgcGx1Z2luRXhwb3J0LmZvckVhY2goa2V5ID0+IHtcclxuICAgICAgICAgICAgdGhpcy5pbnN0YW5jZVtrZXldID0gcGx1Z2luW2tleV1cclxuICAgICAgICAgIH0pXHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2UgaWYgKHR5cGVvZiByZWYgPT09IFwic3RyaW5nXCIpIHtcclxuICAgICAgICAgIHRoaXMuaW5zdGFuY2VbcmVmXSA9IHBsdWdpblxyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgICBlbHNlIGlmICh0eXBlb2YgcmVmID09PSBcInN0cmluZ1wiKSB7XHJcbiAgICAgICAgdGhpcy5pbnN0YW5jZVtyZWZdID0gcGx1Z2luXHJcbiAgICAgIH1cclxuICAgIH0pXHJcblxyXG4gICAgLy8gUHJvY2VzcyB3aW5kb3dzIHBhcmFtZXRlcnMgaW1wb3J0XHJcbiAgICBPYmplY3Qua2V5cyh0aGlzLndpbmRvd3MpLmZvckVhY2goa2V5ID0+IHtcclxuICAgICAgY29uc3Qgd2luZG93ID0gdGhpcy53aW5kb3dzW2tleV1cclxuICAgICAgd2luZG93LnBhcmFtZXRlcnMgJiYgT2JqZWN0LmtleXMod2luZG93LnBhcmFtZXRlcnMpLmZvckVhY2gocGFyYW0gPT4ge1xyXG4gICAgICAgIHRoaXMuYWRkUGFyYW1ldGVyTGluayh3aW5kb3csIHBhcmFtKVxyXG4gICAgICB9KVxyXG4gICAgfSlcclxuXHJcbiAgICB0aGlzLmluc3RhbmNlLnBsdWdpbkRpZE1vdW50KClcclxuICB9XHJcbiAgYWRkUGFyYW1ldGVyTGluayh3aW5kb3c6IE9iamVjdCwgcGFyYW06IHN0cmluZykge1xyXG4gICAgY29uc3QgbGluayA9IHRoaXMucmVzb2x2ZVZhbHVlUmVmZXJlbmNlKHdpbmRvdy5wYXJhbWV0ZXJzW3BhcmFtXSwgcGFyYW0pXHJcbiAgICBpZiAobGluaykge1xyXG4gICAgICBsaW5rLnBhcmFtID0gcGFyYW1cclxuICAgICAgbGluay53aW5kb3cgPSB3aW5kb3dcclxuICAgICAgd2luZG93LmFkZExpbmsobGluaylcclxuICAgICAgY29uc3QgbGlua0xpc3QgPSB0aGlzLmxpbmtzW2xpbmsucGF0aF1cclxuICAgICAgaWYgKCFsaW5rTGlzdCkgdGhpcy5saW5rc1tsaW5rLnBhdGhdID0gWyBsaW5rIF1cclxuICAgICAgZWxzZSBsaW5rTGlzdC5wdXNoKGxpbmspXHJcbiAgICB9XHJcbiAgICBlbHNlIHtcclxuICAgICAgY29uc29sZS5lcnJvcihcIlBhcmFtZXRlciAnXCIgKyBwYXJhbSArIFwiJyBvZiB3aW5kb3cgJ1wiICsgd2luZG93Lm5hbWUgKyBcIicgaGFzIGludmFsaWQgbGluazpcIiwgbGluay5wYXRoKVxyXG4gICAgfVxyXG4gIH1cclxuICByZXNvbHZlVmFsdWVSZWZlcmVuY2UocmVmZXJlbmNlOiBzdHJpbmcsIGtleTogc3RyaW5nKSB7XHJcbiAgICBpZiAocmVmZXJlbmNlID09PSB0cnVlKSB7XHJcbiAgICAgIHJldHVybiB7XHJcbiAgICAgICAgcGx1Z2luQ2xhc3M6IHRoaXMsXHJcbiAgICAgICAgcGF0aDoga2V5LFxyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgICBlbHNlIGlmICh0eXBlb2YgcmVmZXJlbmNlID09PSBcInN0cmluZ1wiKSB7XHJcbiAgICAgIGNvbnN0IHBhcnRzID0gcmVmZXJlbmNlLnNwbGl0KFwiL1wiKVxyXG4gICAgICBpZiAocGFydHMubGVuZ3RoID4gMSkge1xyXG4gICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICBwbHVnaW5DbGFzczogcGFydHNbMF0gPyB0aGlzLmNvbnRleHQucGx1Z2luQ2xhc3Nlc1twYXJ0c1swXV0gOiB0aGlzLFxyXG4gICAgICAgICAgcGF0aDogcGFydHNbMV0sXHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICAgIGVsc2UgcmV0dXJuIHtcclxuICAgICAgICBwbHVnaW5DbGFzczogdGhpcyxcclxuICAgICAgICBwYXRoOiByZWZlcmVuY2UsXHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9XHJcbn1cclxuXHJcbmV4cG9ydCBjbGFzcyBQbHVnaW5Db21wb25lbnQge1xyXG4gIHBsdWdpbkNsYXNzOiBQbHVnaW5DbGFzc1xyXG4gIGFwcGxpY2F0aW9uOiBPYmplY3RcclxuXHJcbiAgLy8gTGlmZSBDeWNsZSBtYW5hZ2VtZW50IGZ1bmN0aW9uc1xyXG4gIHBsdWdpbldpbGxNb3VudChwYXJhbWV0ZXJzOiBPYmplY3QpIHsgfSAvLyBlc2xpbnQtZGlzYWJsZS1saW5lXHJcbiAgcGx1Z2luRGlkTW91bnQoKSB7IH1cclxuICBwbHVnaW5XaWxsVW5tb3VudCgpIHsgfVxyXG5cclxuICBjb25zdHJ1Y3RvcihwbHVnaW5DbGFzczogUGx1Z2luQ2xhc3MpIHtcclxuICAgIHRoaXMucGx1Z2luQ2xhc3MgPSBwbHVnaW5DbGFzc1xyXG4gICAgdGhpcy5hcHBsaWNhdGlvbiA9IHBsdWdpbkNsYXNzLmNvbnRleHQuYXBwbGljYXRpb25cclxuICB9XHJcbiAgb3BlbldpbmRvdyh3aW5kb3dOYW1lOiBzdHJpbmcsIG9wdGlvbnM6IE9iamVjdCkge1xyXG4gICAgdGhpcy5sYXlvdXQub3BlblBsdWdpbldpbmRvdyh0aGlzLnBsdWdpbkNsYXNzLndpbmRvd3Nbd2luZG93TmFtZV0sIHRoaXMsIG9wdGlvbnMpXHJcbiAgfVxyXG4gIGNsb3NlV2luZG93KHdpbmRvd05hbWU6IHN0cmluZykge1xyXG4gICAgdGhpcy5sYXlvdXQuY2xvc2VQbHVnaW5XaW5kb3dzKHRoaXMucGx1Z2luQ2xhc3Mud2luZG93c1t3aW5kb3dOYW1lXSwgdGhpcylcclxuICB9XHJcbiAgY2xvc2VBbGxXaW5kb3coKSB7XHJcbiAgICB0aGlzLmxheW91dC5jbG9zZVBsdWdpbldpbmRvd3MobnVsbCwgdGhpcylcclxuICB9XHJcbiAgdXBkYXRlTmV4dFN0YXRlID0gKCkgPT4ge1xyXG4gICAgaWYgKHRoaXMubmV4dFN0YXRlKSB7XHJcbiAgICAgIGNvbnN0IHVwZGF0ZWRXaW5kb3dzID0gW11cclxuICAgICAgT2JqZWN0LmtleXModGhpcy5uZXh0U3RhdGUpLmZvckVhY2goa2V5ID0+IHtcclxuICAgICAgICBjb25zdCB2YWx1ZSA9IHRoaXMubmV4dFN0YXRlW2tleV1cclxuICAgICAgICBjb25zdCBsaW5rcyA9IHRoaXMucGx1Z2luQ2xhc3MubGlua3Nba2V5XVxyXG4gICAgICAgIHRoaXNba2V5XSA9IHZhbHVlXHJcbiAgICAgICAgaWYgKGxpbmtzKSB7XHJcbiAgICAgICAgICBjb25zdCB3aW5kb3dzID0gdGhpcy5sYXlvdXQud2luZG93c1xyXG4gICAgICAgICAgT2JqZWN0LmtleXMod2luZG93cykuZm9yRWFjaCh3bmRJZCA9PiB7XHJcbiAgICAgICAgICAgIGNvbnN0IHduZCA9IHdpbmRvd3Nbd25kSWRdXHJcbiAgICAgICAgICAgIGNvbnN0IHdsaW5rID0gbGlua3MuZmluZChsayA9PiBsay53aW5kb3cgPT09IHduZC53aW5kb3dDbGFzcylcclxuICAgICAgICAgICAgaWYgKHdsaW5rKSB7XHJcbiAgICAgICAgICAgICAgd25kLnBhcmFtZXRlcnNbd2xpbmsucGFyYW1dID0gdmFsdWVcclxuICAgICAgICAgICAgICBpZiAodXBkYXRlZFdpbmRvd3MuaW5kZXhPZih3bmQpIDwgMCkgdXBkYXRlZFdpbmRvd3MucHVzaCh3bmQpXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgIH0pXHJcbiAgICAgICAgfVxyXG4gICAgICB9KVxyXG4gICAgICB1cGRhdGVkV2luZG93cy5mb3JFYWNoKHduZCA9PiB3bmQucmVuZGVyKCkpXHJcbiAgICAgIHRoaXMubmV4dFN0YXRlID0gbnVsbFxyXG4gICAgfVxyXG4gIH1cclxuICBzZXRTdGF0ZShzdGF0ZTogT2JqZWN0KSB7XHJcbiAgICBjb25zdCBvbGRTdGF0ZSA9IHRoaXMubmV4dFN0YXRlXHJcbiAgICBjb25zdCBuZXdTdGF0ZSA9IG9sZFN0YXRlIHx8IHt9XHJcbiAgICBPYmplY3Qua2V5cyhzdGF0ZSkuZm9yRWFjaChrZXkgPT4ge1xyXG4gICAgICBuZXdTdGF0ZVtrZXldID0gc3RhdGVba2V5XVxyXG4gICAgICB0aGlzW2tleV0gPSBzdGF0ZVtrZXldXHJcbiAgICB9KVxyXG4gICAgdGhpcy5uZXh0U3RhdGUgPSBuZXdTdGF0ZVxyXG4gICAgaWYgKCFvbGRTdGF0ZSkgc2V0VGltZW91dCh0aGlzLnVwZGF0ZU5leHRTdGF0ZSwgMClcclxuICB9XHJcbn0iXX0=