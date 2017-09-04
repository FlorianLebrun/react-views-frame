"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

exports.getEnv = getEnv;
exports.setEnv = setEnv;
exports.unlistenEnv = unlistenEnv;
exports.listenEnv = listenEnv;
exports.filterEnv = filterEnv;
exports.listenEnvStream = listenEnvStream;
exports.unlistenEnvStream = unlistenEnvStream;

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

// Listener based streaming
var StreamListener = function () {
  function StreamListener(callback) {
    _classCallCheck(this, StreamListener);

    this.callback = callback;
    this.values = [];
  }

  _createClass(StreamListener, [{
    key: "forEach",
    value: function forEach() {
      var _values;

      var result = (_values = this.values).forEach.apply(_values, arguments);
      this.values.length = 0;
      return result;
    }
  }, {
    key: "map",
    value: function map() {
      var _map;

      var result = (_map = this.map).forEach.apply(_map, arguments);
      this.values.length = 0;
      return result;
    }
  }, {
    key: "shift",
    value: function shift() {
      if (this.values.length) {
        return this.values.shift();
      }
      return undefined;
    }
  }]);

  return StreamListener;
}(); /* eslint-disable no-use-before-define */
/* eslint-disable react/no-multi-comp */

// Listener based last value reading


var EnvVar = function () {
  function EnvVar(name, value) {
    _classCallCheck(this, EnvVar);

    this.name = name;
    this.value = value;
    this.filters = null;
    this.valueListeners = null;
    this.streamListeners = null;
    this.pendingStatus = 0;
  }

  _createClass(EnvVar, [{
    key: "write",
    value: function write(value) {
      if (this.pendingStatus === 0) {
        if (envPendings.length === 0) {
          setTimeout(processPendingEnvVars, 0);
        }
        envPendings.push(this);
      }
      if (this.value !== value) this.pendingStatus = 1;else if (this.pendingStatus === 0) this.pendingStatus = -1;
      this.value = value;
      this.streamListeners && this.streamListeners.forEach(function (l) {
        return l.values.push(value);
      });
    }
  }, {
    key: "set",
    value: function set(value) {
      if (this.filters) {
        filterEnvVariables(this, value);
      } else {
        this.write(value);
      }
    }
  }, {
    key: "addValueFilter",
    value: function addValueFilter(callback) {
      if (callback instanceof Function) {
        if (!this.filters) this.filters = [];
        this.filters.push(callback);
      } else throw "EnvVar::addValueFilter expects a not null function";
    }
  }, {
    key: "addValueListener",
    value: function addValueListener(callback) {
      if (callback instanceof Function) {
        if (!this.valueListeners) this.valueListeners = [];
        this.valueListeners.push(callback);
      } else throw "EnvVar::addValueListener expects a not null function";
    }
  }, {
    key: "addStreamListener",
    value: function addStreamListener(callback) {
      if (callback instanceof Function) {
        if (!this.streamListeners) this.streamListeners = [];
        this.streamListeners.push(new StreamListener(callback));
      } else throw "EnvVar::addStreamListener expects a not null function";
    }
  }, {
    key: "removeListener",
    value: function removeListener(callback) {
      if (callback instanceof Function) {
        if (this.valueListeners) {
          var i = this.valueListeners.indexOf(callback);
          if (i != -1) this.valueListeners.splice(i, 1);
        }
        if (this.streamListeners) {
          var _i = this.streamListeners.findIndex(function (l) {
            return l.callback === callback;
          });
          if (_i != -1) this.streamListeners.splice(_i, 1);
        }
      } else throw "EnvVar::removeListener expects a not null function";
    }
  }, {
    key: "dispatch",
    value: function dispatch() {
      var _this = this;

      var pendingStatus = this.pendingStatus;
      this.pendingStatus = 0;
      if (pendingStatus > 0) {
        var value = this.value;
        this.valueListeners && this.valueListeners.forEach(function (l) {
          try {
            l(value, _this);
          } catch (e) {
            console.error(e);
          }
        });
      }
      this.streamListeners && this.streamListeners.forEach(function (l) {
        try {
          l.callback(l, _this);
        } catch (e) {
          console.error(e);
        }
      });
    }
  }]);

  return EnvVar;
}();

var envVars = {};
var envPendings = [];

function processPendingEnvVars() {
  var i = void 0;
  for (i = 0; i < envPendings.length; i++) {
    envPendings[i].dispatch();
  }
  envPendings.length = 0;
}

function createEnvVariable(name) {
  var envv = envVars[name];
  if (!envv) {
    envv = new EnvVar(name);
    envVars[name] = envv;
  }
  return envv;
}

function filterEnvVariables(envv, value) {
  var dones = {};
  var values = _defineProperty({}, envv.name, value);
  var changing = true;
  while (changing) {
    changing = false;
    Object.keys(values).forEach(function (envname) {
      if (!dones[envname]) {
        envv = createEnvVariable(envname);
        if (envv.filters) {
          envv.filters.forEach(function (f) {
            return values = _extends({}, values, f(values[envname]));
          });
        }
        changing = true;
        dones[envname] = envv;
      }
    });
  }
  Object.keys(dones).forEach(function (envname) {
    dones[envname].write(values[envname]);
  });
}

function getEnv(name) {
  var envv = envVars[name];
  return envv ? envv.value : undefined;
}

function setEnv(name, value) {
  var envv = envVars[name];
  if (!envv) {
    envv = new EnvVar(name, value);
    envVars[name] = envv;
  }
  envv.set(value);
  return envv.value;
}

function unlistenEnv(name, callback) {
  var envv = envVars[name];
  envv && envv.removeListener(callback);
}

function listenEnv(name, callback) {
  var envv = createEnvVariable(name);
  envv.addValueListener(callback);
  return envv.value;
}

function filterEnv(name, callback) {
  var envv = createEnvVariable(name);
  envv.addValueFilter(callback);
  return envv.value;
}

function listenEnvStream(name, callback) {
  var envv = createEnvVariable(name);
  envv.addStreamListener(callback);
}

function unlistenEnvStream(name, callback) {
  unlistenEnv(name, callback);
}

// Management of window.location

function filterWindowLocation(location) {
  if (typeof location === "string") {
    var locParts = location.split("?");
    location = {};
    location.url = locParts[0];
    location.params = {};
    if (locParts[1]) {
      locParts[1].split("&").forEach(function (param) {
        var parts = param.split("=");
        location.params[parts[0]] = parts[1];
      });
    }
  } else if (location) {
    var hash = location.url;
    var isFirst = true;
    if (location.params) {
      hash += "?";
      Object.keys(location.params).forEach(function (key) {
        var param = location.params[key];
        if (isFirst) isFirst = false;else hash += "&";
        hash += key + "=" + param;
      });
    }
    window.location.hash = hash;
  }
  return { "window.location": location };
}

function updateWindowLocation() {
  setEnv("window.location", window.location.hash);
}

filterEnv("window.location", filterWindowLocation);
window.addEventListener("load", updateWindowLocation);
window.addEventListener("hashchange", updateWindowLocation);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9BcHBsaWNhdGlvbi9lbnZpcm9ubWVudC5qcyJdLCJuYW1lcyI6WyJnZXRFbnYiLCJzZXRFbnYiLCJ1bmxpc3RlbkVudiIsImxpc3RlbkVudiIsImZpbHRlckVudiIsImxpc3RlbkVudlN0cmVhbSIsInVubGlzdGVuRW52U3RyZWFtIiwiU3RyZWFtTGlzdGVuZXIiLCJjYWxsYmFjayIsInZhbHVlcyIsInJlc3VsdCIsImZvckVhY2giLCJhcmd1bWVudHMiLCJsZW5ndGgiLCJtYXAiLCJzaGlmdCIsInVuZGVmaW5lZCIsIkVudlZhciIsIm5hbWUiLCJ2YWx1ZSIsImZpbHRlcnMiLCJ2YWx1ZUxpc3RlbmVycyIsInN0cmVhbUxpc3RlbmVycyIsInBlbmRpbmdTdGF0dXMiLCJlbnZQZW5kaW5ncyIsInNldFRpbWVvdXQiLCJwcm9jZXNzUGVuZGluZ0VudlZhcnMiLCJwdXNoIiwibCIsImZpbHRlckVudlZhcmlhYmxlcyIsIndyaXRlIiwiRnVuY3Rpb24iLCJpIiwiaW5kZXhPZiIsInNwbGljZSIsImZpbmRJbmRleCIsImUiLCJjb25zb2xlIiwiZXJyb3IiLCJlbnZWYXJzIiwiZGlzcGF0Y2giLCJjcmVhdGVFbnZWYXJpYWJsZSIsImVudnYiLCJkb25lcyIsImNoYW5naW5nIiwiT2JqZWN0Iiwia2V5cyIsImVudm5hbWUiLCJmIiwic2V0IiwicmVtb3ZlTGlzdGVuZXIiLCJhZGRWYWx1ZUxpc3RlbmVyIiwiYWRkVmFsdWVGaWx0ZXIiLCJhZGRTdHJlYW1MaXN0ZW5lciIsImZpbHRlcldpbmRvd0xvY2F0aW9uIiwibG9jYXRpb24iLCJsb2NQYXJ0cyIsInNwbGl0IiwidXJsIiwicGFyYW1zIiwicGFyYW0iLCJwYXJ0cyIsImhhc2giLCJpc0ZpcnN0Iiwia2V5Iiwid2luZG93IiwidXBkYXRlV2luZG93TG9jYXRpb24iLCJhZGRFdmVudExpc3RlbmVyIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O1FBMEtnQkEsTSxHQUFBQSxNO1FBS0FDLE0sR0FB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Q0FGLGlCQUFTSSxNQUFULENBQWdCRSxNQUFNLENBQU4sQ0FBaEIsSUFBNEJBLE1BQU0sQ0FBTixDQUE1QjtBQUNELE9BSEQ7QUFJRDtBQUNGLEdBWEQsTUFZSyxJQUFJTixRQUFKLEVBQWM7QUFDakIsUUFBSU8sT0FBT1AsU0FBU0csR0FBcEI7QUFDQSxRQUFJSyxVQUFVLElBQWQ7QUFDQSxRQUFJUixTQUFTSSxNQUFiLEVBQXFCO0FBQ25CRyxjQUFRLEdBQVI7QUFDQWpCLGFBQU9DLElBQVAsQ0FBWVMsU0FBU0ksTUFBckIsRUFBNkJoRCxPQUE3QixDQUFxQyxlQUFPO0FBQzFDLFlBQU1pRCxRQUFRTCxTQUFTSSxNQUFULENBQWdCSyxHQUFoQixDQUFkO0FBQ0EsWUFBSUQsT0FBSixFQUFhQSxVQUFVLEtBQVYsQ0FBYixLQUNLRCxRQUFRLEdBQVI7QUFDTEEsZ0JBQVFFLE1BQU0sR0FBTixHQUFZSixLQUFwQjtBQUNELE9BTEQ7QUFNRDtBQUNESyxXQUFPVixRQUFQLENBQWdCTyxJQUFoQixHQUF1QkEsSUFBdkI7QUFDRDtBQUNELFNBQU8sRUFBRSxtQkFBbUJQLFFBQXJCLEVBQVA7QUFDRDs7QUFFRCxTQUFTVyxvQkFBVCxHQUFnQztBQUM5QmpFLFNBQU8saUJBQVAsRUFBMEJnRSxPQUFPVixRQUFQLENBQWdCTyxJQUExQztBQUNEOztBQUVEMUQsVUFBVSxpQkFBVixFQUE2QmtELG9CQUE3QjtBQUNBVyxPQUFPRSxnQkFBUCxDQUF3QixNQUF4QixFQUFnQ0Qsb0JBQWhDO0FBQ0FELE9BQU9FLGdCQUFQLENBQXdCLFlBQXhCLEVBQXNDRCxvQkFBdEMiLCJmaWxlIjoiZW52aXJvbm1lbnQuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvKiBlc2xpbnQtZGlzYWJsZSBuby11c2UtYmVmb3JlLWRlZmluZSAqL1xyXG4vKiBlc2xpbnQtZGlzYWJsZSByZWFjdC9uby1tdWx0aS1jb21wICovXHJcblxyXG4vLyBMaXN0ZW5lciBiYXNlZCBsYXN0IHZhbHVlIHJlYWRpbmdcclxudHlwZSBWYWx1ZUxpc3RlbmVyID0gRnVuY3Rpb25cclxuXHJcbi8vIExpc3RlbmVyIGJhc2VkIHN0cmVhbWluZ1xyXG5jbGFzcyBTdHJlYW1MaXN0ZW5lciB7XHJcbiAgdmFsdWVzOiBBcnJheTxhbnk+XHJcbiAgY2FsbGJhY2s6IEZ1bmN0aW9uXHJcbiAgY29uc3RydWN0b3IoY2FsbGJhY2s6IEZ1bmN0aW9uKSB7XHJcbiAgICB0aGlzLmNhbGxiYWNrID0gY2FsbGJhY2tcclxuICAgIHRoaXMudmFsdWVzID0gW11cclxuICB9XHJcbiAgZm9yRWFjaCgpIHtcclxuICAgIGNvbnN0IHJlc3VsdCA9IHRoaXMudmFsdWVzLmZvckVhY2goLi4uYXJndW1lbnRzKVxyXG4gICAgdGhpcy52YWx1ZXMubGVuZ3RoID0gMFxyXG4gICAgcmV0dXJuIHJlc3VsdFxyXG4gIH1cclxuICBtYXAoKSB7XHJcbiAgICBjb25zdCByZXN1bHQgPSB0aGlzLm1hcC5mb3JFYWNoKC4uLmFyZ3VtZW50cylcclxuICAgIHRoaXMudmFsdWVzLmxlbmd0aCA9IDBcclxuICAgIHJldHVybiByZXN1bHRcclxuICB9XHJcbiAgc2hpZnQoKTogYW55IHtcclxuICAgIGlmICh0aGlzLnZhbHVlcy5sZW5ndGgpIHtcclxuICAgICAgcmV0dXJuIHRoaXMudmFsdWVzLnNoaWZ0KClcclxuICAgIH1cclxuICAgIHJldHVybiB1bmRlZmluZWRcclxuICB9XHJcbn1cclxuXHJcbmNsYXNzIEVudlZhciB7XHJcbiAgbmFtZTogc3RyaW5nXHJcbiAgdmFsdWU6IGFueVxyXG4gIGZpbHRlcnM6IEFycmF5PEZ1bmN0aW9uPlxyXG4gIHZhbHVlTGlzdGVuZXJzOiBBcnJheTxWYWx1ZUxpc3RlbmVyPlxyXG4gIHN0cmVhbUxpc3RlbmVyczogQXJyYXk8U3RyZWFtTGlzdGVuZXI+XHJcbiAgcGVuZGluZ1N0YXR1czogbnVtYmVyXHJcblxyXG4gIGNvbnN0cnVjdG9yKG5hbWU6IHN0cmluZywgdmFsdWU6IGFueSkge1xyXG4gICAgdGhpcy5uYW1lID0gbmFtZVxyXG4gICAgdGhpcy52YWx1ZSA9IHZhbHVlXHJcbiAgICB0aGlzLmZpbHRlcnMgPSBudWxsXHJcbiAgICB0aGlzLnZhbHVlTGlzdGVuZXJzID0gbnVsbFxyXG4gICAgdGhpcy5zdHJlYW1MaXN0ZW5lcnMgPSBudWxsXHJcbiAgICB0aGlzLnBlbmRpbmdTdGF0dXMgPSAwXHJcbiAgfVxyXG4gIHdyaXRlKHZhbHVlOiBhbnkpIHtcclxuICAgIGlmICh0aGlzLnBlbmRpbmdTdGF0dXMgPT09IDApIHtcclxuICAgICAgaWYgKGVudlBlbmRpbmdzLmxlbmd0aCA9PT0gMCkge1xyXG4gICAgICAgIHNldFRpbWVvdXQocHJvY2Vzc1BlbmRpbmdFbnZWYXJzLCAwKVxyXG4gICAgICB9XHJcbiAgICAgIGVudlBlbmRpbmdzLnB1c2godGhpcylcclxuICAgIH1cclxuICAgIGlmICh0aGlzLnZhbHVlICE9PSB2YWx1ZSkgdGhpcy5wZW5kaW5nU3RhdHVzID0gMVxyXG4gICAgZWxzZSBpZiAodGhpcy5wZW5kaW5nU3RhdHVzID09PSAwKSB0aGlzLnBlbmRpbmdTdGF0dXMgPSAtMVxyXG4gICAgdGhpcy52YWx1ZSA9IHZhbHVlXHJcbiAgICB0aGlzLnN0cmVhbUxpc3RlbmVycyAmJiB0aGlzLnN0cmVhbUxpc3RlbmVycy5mb3JFYWNoKGwgPT4gbC52YWx1ZXMucHVzaCh2YWx1ZSkpXHJcbiAgfVxyXG4gIHNldCh2YWx1ZTogYW55KSB7XHJcbiAgICBpZiAodGhpcy5maWx0ZXJzKSB7XHJcbiAgICAgIGZpbHRlckVudlZhcmlhYmxlcyh0aGlzLCB2YWx1ZSlcclxuICAgIH1cclxuICAgIGVsc2Uge1xyXG4gICAgICB0aGlzLndyaXRlKHZhbHVlKVxyXG4gICAgfVxyXG4gIH1cclxuICBhZGRWYWx1ZUZpbHRlcihjYWxsYmFjazogRnVuY3Rpb24pIHtcclxuICAgIGlmIChjYWxsYmFjayBpbnN0YW5jZW9mIEZ1bmN0aW9uKSB7XHJcbiAgICAgIGlmICghdGhpcy5maWx0ZXJzKSB0aGlzLmZpbHRlcnMgPSBbXVxyXG4gICAgICB0aGlzLmZpbHRlcnMucHVzaChjYWxsYmFjaylcclxuICAgIH1cclxuICAgIGVsc2UgdGhyb3cgXCJFbnZWYXI6OmFkZFZhbHVlRmlsdGVyIGV4cGVjdHMgYSBub3QgbnVsbCBmdW5jdGlvblwiXHJcbiAgfVxyXG4gIGFkZFZhbHVlTGlzdGVuZXIoY2FsbGJhY2s6IEZ1bmN0aW9uKSB7XHJcbiAgICBpZiAoY2FsbGJhY2sgaW5zdGFuY2VvZiBGdW5jdGlvbikge1xyXG4gICAgICBpZiAoIXRoaXMudmFsdWVMaXN0ZW5lcnMpIHRoaXMudmFsdWVMaXN0ZW5lcnMgPSBbXVxyXG4gICAgICB0aGlzLnZhbHVlTGlzdGVuZXJzLnB1c2goY2FsbGJhY2spXHJcbiAgICB9XHJcbiAgICBlbHNlIHRocm93IFwiRW52VmFyOjphZGRWYWx1ZUxpc3RlbmVyIGV4cGVjdHMgYSBub3QgbnVsbCBmdW5jdGlvblwiXHJcbiAgfVxyXG4gIGFkZFN0cmVhbUxpc3RlbmVyKGNhbGxiYWNrOiBGdW5jdGlvbikge1xyXG4gICAgaWYgKGNhbGxiYWNrIGluc3RhbmNlb2YgRnVuY3Rpb24pIHtcclxuICAgICAgaWYgKCF0aGlzLnN0cmVhbUxpc3RlbmVycykgdGhpcy5zdHJlYW1MaXN0ZW5lcnMgPSBbXVxyXG4gICAgICB0aGlzLnN0cmVhbUxpc3RlbmVycy5wdXNoKG5ldyBTdHJlYW1MaXN0ZW5lcihjYWxsYmFjaykpXHJcbiAgICB9XHJcbiAgICBlbHNlIHRocm93IFwiRW52VmFyOjphZGRTdHJlYW1MaXN0ZW5lciBleHBlY3RzIGEgbm90IG51bGwgZnVuY3Rpb25cIlxyXG4gIH1cclxuICByZW1vdmVMaXN0ZW5lcihjYWxsYmFjazogRnVuY3Rpb24pIHtcclxuICAgIGlmIChjYWxsYmFjayBpbnN0YW5jZW9mIEZ1bmN0aW9uKSB7XHJcbiAgICAgIGlmICh0aGlzLnZhbHVlTGlzdGVuZXJzKSB7XHJcbiAgICAgICAgY29uc3QgaSA9IHRoaXMudmFsdWVMaXN0ZW5lcnMuaW5kZXhPZihjYWxsYmFjaylcclxuICAgICAgICBpZiAoaSAhPSAtMSkgdGhpcy52YWx1ZUxpc3RlbmVycy5zcGxpY2UoaSwgMSlcclxuICAgICAgfVxyXG4gICAgICBpZiAodGhpcy5zdHJlYW1MaXN0ZW5lcnMpIHtcclxuICAgICAgICBjb25zdCBpID0gdGhpcy5zdHJlYW1MaXN0ZW5lcnMuZmluZEluZGV4KGwgPT4gbC5jYWxsYmFjayA9PT0gY2FsbGJhY2spXHJcbiAgICAgICAgaWYgKGkgIT0gLTEpIHRoaXMuc3RyZWFtTGlzdGVuZXJzLnNwbGljZShpLCAxKVxyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgICBlbHNlIHRocm93IFwiRW52VmFyOjpyZW1vdmVMaXN0ZW5lciBleHBlY3RzIGEgbm90IG51bGwgZnVuY3Rpb25cIlxyXG4gIH1cclxuICBkaXNwYXRjaCgpIHtcclxuICAgIGNvbnN0IHBlbmRpbmdTdGF0dXMgPSB0aGlzLnBlbmRpbmdTdGF0dXNcclxuICAgIHRoaXMucGVuZGluZ1N0YXR1cyA9IDBcclxuICAgIGlmIChwZW5kaW5nU3RhdHVzID4gMCkge1xyXG4gICAgICBjb25zdCB2YWx1ZSA9IHRoaXMudmFsdWVcclxuICAgICAgdGhpcy52YWx1ZUxpc3RlbmVycyAmJiB0aGlzLnZhbHVlTGlzdGVuZXJzLmZvckVhY2gobCA9PiB7XHJcbiAgICAgICAgdHJ5IHtcclxuICAgICAgICAgIGwodmFsdWUsIHRoaXMpXHJcbiAgICAgICAgfVxyXG4gICAgICAgIGNhdGNoIChlKSB7XHJcbiAgICAgICAgICBjb25zb2xlLmVycm9yKGUpXHJcbiAgICAgICAgfVxyXG4gICAgICB9KVxyXG4gICAgfVxyXG4gICAgdGhpcy5zdHJlYW1MaXN0ZW5lcnMgJiYgdGhpcy5zdHJlYW1MaXN0ZW5lcnMuZm9yRWFjaChsID0+IHtcclxuICAgICAgdHJ5IHtcclxuICAgICAgICBsLmNhbGxiYWNrKGwsIHRoaXMpXHJcbiAgICAgIH1cclxuICAgICAgY2F0Y2ggKGUpIHtcclxuICAgICAgICBjb25zb2xlLmVycm9yKGUpXHJcbiAgICAgIH1cclxuICAgIH0pXHJcblxyXG4gIH1cclxufVxyXG5cclxuY29uc3QgZW52VmFyczogeyBbc3RyaW5nXTogRW52VmFyIH0gPSB7fVxyXG5jb25zdCBlbnZQZW5kaW5nczogQXJyYXk8RW52VmFyPiA9IFtdXHJcblxyXG5mdW5jdGlvbiBwcm9jZXNzUGVuZGluZ0VudlZhcnMoKSB7XHJcbiAgbGV0IGlcclxuICBmb3IgKGkgPSAwOyBpIDwgZW52UGVuZGluZ3MubGVuZ3RoOyBpKyspIHtcclxuICAgIGVudlBlbmRpbmdzW2ldLmRpc3BhdGNoKClcclxuICB9XHJcbiAgZW52UGVuZGluZ3MubGVuZ3RoID0gMFxyXG59XHJcblxyXG5mdW5jdGlvbiBjcmVhdGVFbnZWYXJpYWJsZShuYW1lOiBzdHJpbmcpOiBFbnZWYXIge1xyXG4gIGxldCBlbnZ2ID0gZW52VmFyc1tuYW1lXVxyXG4gIGlmICghZW52dikge1xyXG4gICAgZW52diA9IG5ldyBFbnZWYXIobmFtZSlcclxuICAgIGVudlZhcnNbbmFtZV0gPSBlbnZ2XHJcbiAgfVxyXG4gIHJldHVybiBlbnZ2XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGZpbHRlckVudlZhcmlhYmxlcyhlbnZ2OiBFbnZWYXIsIHZhbHVlOiBhbnkpIHtcclxuICBjb25zdCBkb25lcyA9IHt9XHJcbiAgbGV0IHZhbHVlcyA9IHsgW2VudnYubmFtZV06IHZhbHVlIH1cclxuICBsZXQgY2hhbmdpbmcgPSB0cnVlXHJcbiAgd2hpbGUgKGNoYW5naW5nKSB7XHJcbiAgICBjaGFuZ2luZyA9IGZhbHNlXHJcbiAgICBPYmplY3Qua2V5cyh2YWx1ZXMpLmZvckVhY2goZW52bmFtZSA9PiB7XHJcbiAgICAgIGlmICghZG9uZXNbZW52bmFtZV0pIHtcclxuICAgICAgICBlbnZ2ID0gY3JlYXRlRW52VmFyaWFibGUoZW52bmFtZSlcclxuICAgICAgICBpZiAoZW52di5maWx0ZXJzKSB7XHJcbiAgICAgICAgICBlbnZ2LmZpbHRlcnMuZm9yRWFjaChmID0+IHZhbHVlcyA9IHsgLi4udmFsdWVzLCAuLi5mKHZhbHVlc1tlbnZuYW1lXSkgfSlcclxuICAgICAgICB9XHJcbiAgICAgICAgY2hhbmdpbmcgPSB0cnVlXHJcbiAgICAgICAgZG9uZXNbZW52bmFtZV0gPSBlbnZ2XHJcbiAgICAgIH1cclxuICAgIH0pXHJcbiAgfVxyXG4gIE9iamVjdC5rZXlzKGRvbmVzKS5mb3JFYWNoKGVudm5hbWUgPT4ge1xyXG4gICAgZG9uZXNbZW52bmFtZV0ud3JpdGUodmFsdWVzW2Vudm5hbWVdKVxyXG4gIH0pXHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBnZXRFbnYobmFtZTogc3RyaW5nKTogYW55IHtcclxuICBjb25zdCBlbnZ2ID0gZW52VmFyc1tuYW1lXVxyXG4gIHJldHVybiBlbnZ2ID8gZW52di52YWx1ZSA6IHVuZGVmaW5lZFxyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gc2V0RW52KG5hbWU6IHN0cmluZywgdmFsdWU6IGFueSkge1xyXG4gIGxldCBlbnZ2OiBFbnZWYXIgPSBlbnZWYXJzW25hbWVdXHJcbiAgaWYgKCFlbnZ2KSB7XHJcbiAgICBlbnZ2ID0gbmV3IEVudlZhcihuYW1lLCB2YWx1ZSlcclxuICAgIGVudlZhcnNbbmFtZV0gPSBlbnZ2XHJcbiAgfVxyXG4gIGVudnYuc2V0KHZhbHVlKVxyXG4gIHJldHVybiBlbnZ2LnZhbHVlXHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiB1bmxpc3RlbkVudihuYW1lOiBzdHJpbmcsIGNhbGxiYWNrOiBGdW5jdGlvbikge1xyXG4gIGNvbnN0IGVudnYgPSBlbnZWYXJzW25hbWVdXHJcbiAgZW52diAmJiBlbnZ2LnJlbW92ZUxpc3RlbmVyKGNhbGxiYWNrKVxyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gbGlzdGVuRW52KG5hbWU6IHN0cmluZywgY2FsbGJhY2s6IEZ1bmN0aW9uKSB7XHJcbiAgY29uc3QgZW52diA9IGNyZWF0ZUVudlZhcmlhYmxlKG5hbWUpXHJcbiAgZW52di5hZGRWYWx1ZUxpc3RlbmVyKGNhbGxiYWNrKVxyXG4gIHJldHVybiBlbnZ2LnZhbHVlXHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBmaWx0ZXJFbnYobmFtZTogc3RyaW5nLCBjYWxsYmFjazogRnVuY3Rpb24pIHtcclxuICBjb25zdCBlbnZ2ID0gY3JlYXRlRW52VmFyaWFibGUobmFtZSlcclxuICBlbnZ2LmFkZFZhbHVlRmlsdGVyKGNhbGxiYWNrKVxyXG4gIHJldHVybiBlbnZ2LnZhbHVlXHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBsaXN0ZW5FbnZTdHJlYW0obmFtZTogc3RyaW5nLCBjYWxsYmFjazogRnVuY3Rpb24pIHtcclxuICBjb25zdCBlbnZ2ID0gY3JlYXRlRW52VmFyaWFibGUobmFtZSlcclxuICBlbnZ2LmFkZFN0cmVhbUxpc3RlbmVyKGNhbGxiYWNrKVxyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gdW5saXN0ZW5FbnZTdHJlYW0obmFtZTogc3RyaW5nLCBjYWxsYmFjazogRnVuY3Rpb24pIHtcclxuICB1bmxpc3RlbkVudihuYW1lLCBjYWxsYmFjaylcclxufVxyXG5cclxuLy8gTWFuYWdlbWVudCBvZiB3aW5kb3cubG9jYXRpb25cclxuXHJcbmZ1bmN0aW9uIGZpbHRlcldpbmRvd0xvY2F0aW9uKGxvY2F0aW9uKSB7XHJcbiAgaWYgKHR5cGVvZiBsb2NhdGlvbiA9PT0gXCJzdHJpbmdcIikge1xyXG4gICAgY29uc3QgbG9jUGFydHMgPSBsb2NhdGlvbi5zcGxpdChcIj9cIilcclxuICAgIGxvY2F0aW9uID0ge31cclxuICAgIGxvY2F0aW9uLnVybCA9IGxvY1BhcnRzWzBdXHJcbiAgICBsb2NhdGlvbi5wYXJhbXMgPSB7fVxyXG4gICAgaWYgKGxvY1BhcnRzWzFdKSB7XHJcbiAgICAgIGxvY1BhcnRzWzFdLnNwbGl0KFwiJlwiKS5mb3JFYWNoKChwYXJhbSkgPT4ge1xyXG4gICAgICAgIGNvbnN0IHBhcnRzID0gcGFyYW0uc3BsaXQoXCI9XCIpXHJcbiAgICAgICAgbG9jYXRpb24ucGFyYW1zW3BhcnRzWzBdXSA9IHBhcnRzWzFdXHJcbiAgICAgIH0pXHJcbiAgICB9XHJcbiAgfVxyXG4gIGVsc2UgaWYgKGxvY2F0aW9uKSB7XHJcbiAgICBsZXQgaGFzaCA9IGxvY2F0aW9uLnVybFxyXG4gICAgbGV0IGlzRmlyc3QgPSB0cnVlXHJcbiAgICBpZiAobG9jYXRpb24ucGFyYW1zKSB7XHJcbiAgICAgIGhhc2ggKz0gXCI/XCJcclxuICAgICAgT2JqZWN0LmtleXMobG9jYXRpb24ucGFyYW1zKS5mb3JFYWNoKGtleSA9PiB7XHJcbiAgICAgICAgY29uc3QgcGFyYW0gPSBsb2NhdGlvbi5wYXJhbXNba2V5XVxyXG4gICAgICAgIGlmIChpc0ZpcnN0KSBpc0ZpcnN0ID0gZmFsc2VcclxuICAgICAgICBlbHNlIGhhc2ggKz0gXCImXCJcclxuICAgICAgICBoYXNoICs9IGtleSArIFwiPVwiICsgcGFyYW1cclxuICAgICAgfSlcclxuICAgIH1cclxuICAgIHdpbmRvdy5sb2NhdGlvbi5oYXNoID0gaGFzaFxyXG4gIH1cclxuICByZXR1cm4geyBcIndpbmRvdy5sb2NhdGlvblwiOiBsb2NhdGlvbiB9XHJcbn1cclxuXHJcbmZ1bmN0aW9uIHVwZGF0ZVdpbmRvd0xvY2F0aW9uKCkge1xyXG4gIHNldEVudihcIndpbmRvdy5sb2NhdGlvblwiLCB3aW5kb3cubG9jYXRpb24uaGFzaClcclxufVxyXG5cclxuZmlsdGVyRW52KFwid2luZG93LmxvY2F0aW9uXCIsIGZpbHRlcldpbmRvd0xvY2F0aW9uKVxyXG53aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcihcImxvYWRcIiwgdXBkYXRlV2luZG93TG9jYXRpb24pXHJcbndpbmRvdy5hZGRFdmVudExpc3RlbmVyKFwiaGFzaGNoYW5nZVwiLCB1cGRhdGVXaW5kb3dMb2NhdGlvbilcclxuIl19