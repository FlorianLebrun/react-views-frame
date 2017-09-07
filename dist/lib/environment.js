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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9saWIvZW52aXJvbm1lbnQuanMiXSwibmFtZXMiOlsiZ2V0RW52Iiwic2V0RW52IiwidW5saXN0ZW5FbnYiLCJsaXN0ZW5FbnYiLCJmaWx0ZXJFbnYiLCJsaXN0ZW5FbnZTdHJlYW0iLCJ1bmxpc3RlbkVudlN0cmVhbSIsIlN0cmVhbUxpc3RlbmVyIiwiY2FsbGJhY2siLCJ2YWx1ZXMiLCJyZXN1bHQiLCJmb3JFYWNoIiwiYXJndW1lbnRzIiwibGVuZ3RoIiwibWFwIiwic2hpZnQiLCJ1bmRlZmluZWQiLCJFbnZWYXIiLCJuYW1lIiwidmFsdWUiLCJmaWx0ZXJzIiwidmFsdWVMaXN0ZW5lcnMiLCJzdHJlYW1MaXN0ZW5lcnMiLCJwZW5kaW5nU3RhdHVzIiwiZW52UGVuZGluZ3MiLCJzZXRUaW1lb3V0IiwicHJvY2Vzc1BlbmRpbmdFbnZWYXJzIiwicHVzaCIsImwiLCJmaWx0ZXJFbnZWYXJpYWJsZXMiLCJ3cml0ZSIsIkZ1bmN0aW9uIiwiaSIsImluZGV4T2YiLCJzcGxpY2UiLCJmaW5kSW5kZXgiLCJlIiwiY29uc29sZSIsImVycm9yIiwiZW52VmFycyIsImRpc3BhdGNoIiwiY3JlYXRlRW52VmFyaWFibGUiLCJlbnZ2IiwiZG9uZXMiLCJjaGFuZ2luZyIsIk9iamVjdCIsImtleXMiLCJlbnZuYW1lIiwiZiIsInNldCIsInJlbW92ZUxpc3RlbmVyIiwiYWRkVmFsdWVMaXN0ZW5lciIsImFkZFZhbHVlRmlsdGVyIiwiYWRkU3RyZWFtTGlzdGVuZXIiLCJmaWx0ZXJXaW5kb3dMb2NhdGlvbiIsImxvY2F0aW9uIiwibG9jUGFydHMiLCJzcGxpdCIsInVybCIsInBhcmFtcyIsInBhcmFtIiwicGFydHMiLCJoYXNoIiwiaXNGaXJzdCIsImtleSIsIndpbmRvdyIsInVwZGF0ZVdpbmRvd0xvY2F0aW9uIiwiYWRkRXZlbnRMaXN0ZW5lciJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztRQTBLZ0JBLE0sR0FBQUEsTTtRQUtBQyxNLEdBQUFBLE07UUFVQUMsVyxHQUFBQSxXO1FBS0FDLFMsR0FBQUEsUztRQU1BQyxTLEdBQUFBLFM7UUFNQUMsZSxHQUFBQSxlO1FBS0FDLGlCLEdBQUFBLGlCOzs7Ozs7QUF6TWhCO0lBQ01DLGM7QUFHSiwwQkFBWUMsUUFBWixFQUFnQztBQUFBOztBQUM5QixTQUFLQSxRQUFMLEdBQWdCQSxRQUFoQjtBQUNBLFNBQUtDLE1BQUwsR0FBYyxFQUFkO0FBQ0Q7Ozs7OEJBQ1M7QUFBQTs7QUFDUixVQUFNQyxTQUFTLGdCQUFLRCxNQUFMLEVBQVlFLE9BQVosZ0JBQXVCQyxTQUF2QixDQUFmO0FBQ0EsV0FBS0gsTUFBTCxDQUFZSSxNQUFaLEdBQXFCLENBQXJCO0FBQ0EsYUFBT0gsTUFBUDtBQUNEOzs7MEJBQ0s7QUFBQTs7QUFDSixVQUFNQSxTQUFTLGFBQUtJLEdBQUwsRUFBU0gsT0FBVCxhQUFvQkMsU0FBcEIsQ0FBZjtBQUNBLFdBQUtILE1BQUwsQ0FBWUksTUFBWixHQUFxQixDQUFyQjtBQUNBLGFBQU9ILE1BQVA7QUFDRDs7OzRCQUNZO0FBQ1gsVUFBSSxLQUFLRCxNQUFMLENBQVlJLE1BQWhCLEVBQXdCO0FBQ3RCLGVBQU8sS0FBS0osTUFBTCxDQUFZTSxLQUFaLEVBQVA7QUFDRDtBQUNELGFBQU9DLFNBQVA7QUFDRDs7OztLQTdCSDtBQUNBOztBQUVBOzs7SUE2Qk1DLE07QUFRSixrQkFBWUMsSUFBWixFQUEwQkMsS0FBMUIsRUFBc0M7QUFBQTs7QUFDcEMsU0FBS0QsSUFBTCxHQUFZQSxJQUFaO0FBQ0EsU0FBS0MsS0FBTCxHQUFhQSxLQUFiO0FBQ0EsU0FBS0MsT0FBTCxHQUFlLElBQWY7QUFDQSxTQUFLQyxjQUFMLEdBQXNCLElBQXRCO0FBQ0EsU0FBS0MsZUFBTCxHQUF1QixJQUF2QjtBQUNBLFNBQUtDLGFBQUwsR0FBcUIsQ0FBckI7QUFDRDs7OzswQkFDS0osSyxFQUFZO0FBQ2hCLFVBQUksS0FBS0ksYUFBTCxLQUF1QixDQUEzQixFQUE4QjtBQUM1QixZQUFJQyxZQUFZWCxNQUFaLEtBQXVCLENBQTNCLEVBQThCO0FBQzVCWSxxQkFBV0MscUJBQVgsRUFBa0MsQ0FBbEM7QUFDRDtBQUNERixvQkFBWUcsSUFBWixDQUFpQixJQUFqQjtBQUNEO0FBQ0QsVUFBSSxLQUFLUixLQUFMLEtBQWVBLEtBQW5CLEVBQTBCLEtBQUtJLGFBQUwsR0FBcUIsQ0FBckIsQ0FBMUIsS0FDSyxJQUFJLEtBQUtBLGFBQUwsS0FBdUIsQ0FBM0IsRUFBOEIsS0FBS0EsYUFBTCxHQUFxQixDQUFDLENBQXRCO0FBQ25DLFdBQUtKLEtBQUwsR0FBYUEsS0FBYjtBQUNBLFdBQUtHLGVBQUwsSUFBd0IsS0FBS0EsZUFBTCxDQUFxQlgsT0FBckIsQ0FBNkI7QUFBQSxlQUFLaUIsRUFBRW5CLE1BQUYsQ0FBU2tCLElBQVQsQ0FBY1IsS0FBZCxDQUFMO0FBQUEsT0FBN0IsQ0FBeEI7QUFDRDs7O3dCQUNHQSxLLEVBQVk7QUFDZCxVQUFJLEtBQUtDLE9BQVQsRUFBa0I7QUFDaEJTLDJCQUFtQixJQUFuQixFQUF5QlYsS0FBekI7QUFDRCxPQUZELE1BR0s7QUFDSCxhQUFLVyxLQUFMLENBQVdYLEtBQVg7QUFDRDtBQUNGOzs7bUNBQ2NYLFEsRUFBb0I7QUFDakMsVUFBSUEsb0JBQW9CdUIsUUFBeEIsRUFBa0M7QUFDaEMsWUFBSSxDQUFDLEtBQUtYLE9BQVYsRUFBbUIsS0FBS0EsT0FBTCxHQUFlLEVBQWY7QUFDbkIsYUFBS0EsT0FBTCxDQUFhTyxJQUFiLENBQWtCbkIsUUFBbEI7QUFDRCxPQUhELE1BSUssTUFBTSxvREFBTjtBQUNOOzs7cUNBQ2dCQSxRLEVBQW9CO0FBQ25DLFVBQUlBLG9CQUFvQnVCLFFBQXhCLEVBQWtDO0FBQ2hDLFlBQUksQ0FBQyxLQUFLVixjQUFWLEVBQTBCLEtBQUtBLGNBQUwsR0FBc0IsRUFBdEI7QUFDMUIsYUFBS0EsY0FBTCxDQUFvQk0sSUFBcEIsQ0FBeUJuQixRQUF6QjtBQUNELE9BSEQsTUFJSyxNQUFNLHNEQUFOO0FBQ047OztzQ0FDaUJBLFEsRUFBb0I7QUFDcEMsVUFBSUEsb0JBQW9CdUIsUUFBeEIsRUFBa0M7QUFDaEMsWUFBSSxDQUFDLEtBQUtULGVBQVYsRUFBMkIsS0FBS0EsZUFBTCxHQUF1QixFQUF2QjtBQUMzQixhQUFLQSxlQUFMLENBQXFCSyxJQUFyQixDQUEwQixJQUFJcEIsY0FBSixDQUFtQkMsUUFBbkIsQ0FBMUI7QUFDRCxPQUhELE1BSUssTUFBTSx1REFBTjtBQUNOOzs7bUNBQ2NBLFEsRUFBb0I7QUFDakMsVUFBSUEsb0JBQW9CdUIsUUFBeEIsRUFBa0M7QUFDaEMsWUFBSSxLQUFLVixjQUFULEVBQXlCO0FBQ3ZCLGNBQU1XLElBQUksS0FBS1gsY0FBTCxDQUFvQlksT0FBcEIsQ0FBNEJ6QixRQUE1QixDQUFWO0FBQ0EsY0FBSXdCLEtBQUssQ0FBQyxDQUFWLEVBQWEsS0FBS1gsY0FBTCxDQUFvQmEsTUFBcEIsQ0FBMkJGLENBQTNCLEVBQThCLENBQTlCO0FBQ2Q7QUFDRCxZQUFJLEtBQUtWLGVBQVQsRUFBMEI7QUFDeEIsY0FBTVUsS0FBSSxLQUFLVixlQUFMLENBQXFCYSxTQUFyQixDQUErQjtBQUFBLG1CQUFLUCxFQUFFcEIsUUFBRixLQUFlQSxRQUFwQjtBQUFBLFdBQS9CLENBQVY7QUFDQSxjQUFJd0IsTUFBSyxDQUFDLENBQVYsRUFBYSxLQUFLVixlQUFMLENBQXFCWSxNQUFyQixDQUE0QkYsRUFBNUIsRUFBK0IsQ0FBL0I7QUFDZDtBQUNGLE9BVEQsTUFVSyxNQUFNLG9EQUFOO0FBQ047OzsrQkFDVTtBQUFBOztBQUNULFVBQU1ULGdCQUFnQixLQUFLQSxhQUEzQjtBQUNBLFdBQUtBLGFBQUwsR0FBcUIsQ0FBckI7QUFDQSxVQUFJQSxnQkFBZ0IsQ0FBcEIsRUFBdUI7QUFDckIsWUFBTUosUUFBUSxLQUFLQSxLQUFuQjtBQUNBLGFBQUtFLGNBQUwsSUFBdUIsS0FBS0EsY0FBTCxDQUFvQlYsT0FBcEIsQ0FBNEIsYUFBSztBQUN0RCxjQUFJO0FBQ0ZpQixjQUFFVCxLQUFGO0FBQ0QsV0FGRCxDQUdBLE9BQU9pQixDQUFQLEVBQVU7QUFDUkMsb0JBQVFDLEtBQVIsQ0FBY0YsQ0FBZDtBQUNEO0FBQ0YsU0FQc0IsQ0FBdkI7QUFRRDtBQUNELFdBQUtkLGVBQUwsSUFBd0IsS0FBS0EsZUFBTCxDQUFxQlgsT0FBckIsQ0FBNkIsYUFBSztBQUN4RCxZQUFJO0FBQ0ZpQixZQUFFcEIsUUFBRixDQUFXb0IsQ0FBWDtBQUNELFNBRkQsQ0FHQSxPQUFPUSxDQUFQLEVBQVU7QUFDUkMsa0JBQVFDLEtBQVIsQ0FBY0YsQ0FBZDtBQUNEO0FBQ0YsT0FQdUIsQ0FBeEI7QUFTRDs7Ozs7O0FBR0gsSUFBTUcsVUFBZ0MsRUFBdEM7QUFDQSxJQUFNZixjQUE2QixFQUFuQzs7QUFFQSxTQUFTRSxxQkFBVCxHQUFpQztBQUMvQixNQUFJTSxVQUFKO0FBQ0EsT0FBS0EsSUFBSSxDQUFULEVBQVlBLElBQUlSLFlBQVlYLE1BQTVCLEVBQW9DbUIsR0FBcEMsRUFBeUM7QUFDdkNSLGdCQUFZUSxDQUFaLEVBQWVRLFFBQWY7QUFDRDtBQUNEaEIsY0FBWVgsTUFBWixHQUFxQixDQUFyQjtBQUNEOztBQUVELFNBQVM0QixpQkFBVCxDQUEyQnZCLElBQTNCLEVBQWlEO0FBQy9DLE1BQUl3QixPQUFPSCxRQUFRckIsSUFBUixDQUFYO0FBQ0EsTUFBSSxDQUFDd0IsSUFBTCxFQUFXO0FBQ1RBLFdBQU8sSUFBSXpCLE1BQUosQ0FBV0MsSUFBWCxDQUFQO0FBQ0FxQixZQUFRckIsSUFBUixJQUFnQndCLElBQWhCO0FBQ0Q7QUFDRCxTQUFPQSxJQUFQO0FBQ0Q7O0FBRUQsU0FBU2Isa0JBQVQsQ0FBNEJhLElBQTVCLEVBQTBDdkIsS0FBMUMsRUFBc0Q7QUFDcEQsTUFBTXdCLFFBQVEsRUFBZDtBQUNBLE1BQUlsQyw2QkFBWWlDLEtBQUt4QixJQUFqQixFQUF3QkMsS0FBeEIsQ0FBSjtBQUNBLE1BQUl5QixXQUFXLElBQWY7QUFDQSxTQUFPQSxRQUFQLEVBQWlCO0FBQ2ZBLGVBQVcsS0FBWDtBQUNBQyxXQUFPQyxJQUFQLENBQVlyQyxNQUFaLEVBQW9CRSxPQUFwQixDQUE0QixtQkFBVztBQUNyQyxVQUFJLENBQUNnQyxNQUFNSSxPQUFOLENBQUwsRUFBcUI7QUFDbkJMLGVBQU9ELGtCQUFrQk0sT0FBbEIsQ0FBUDtBQUNBLFlBQUlMLEtBQUt0QixPQUFULEVBQWtCO0FBQ2hCc0IsZUFBS3RCLE9BQUwsQ0FBYVQsT0FBYixDQUFxQjtBQUFBLG1CQUFLRixzQkFBY0EsTUFBZCxFQUF5QnVDLEVBQUV2QyxPQUFPc0MsT0FBUCxDQUFGLENBQXpCLENBQUw7QUFBQSxXQUFyQjtBQUNEO0FBQ0RILG1CQUFXLElBQVg7QUFDQUQsY0FBTUksT0FBTixJQUFpQkwsSUFBakI7QUFDRDtBQUNGLEtBVEQ7QUFVRDtBQUNERyxTQUFPQyxJQUFQLENBQVlILEtBQVosRUFBbUJoQyxPQUFuQixDQUEyQixtQkFBVztBQUNwQ2dDLFVBQU1JLE9BQU4sRUFBZWpCLEtBQWYsQ0FBcUJyQixPQUFPc0MsT0FBUCxDQUFyQjtBQUNELEdBRkQ7QUFHRDs7QUFFTSxTQUFTL0MsTUFBVCxDQUFnQmtCLElBQWhCLEVBQW1DO0FBQ3hDLE1BQU13QixPQUFPSCxRQUFRckIsSUFBUixDQUFiO0FBQ0EsU0FBT3dCLE9BQU9BLEtBQUt2QixLQUFaLEdBQW9CSCxTQUEzQjtBQUNEOztBQUVNLFNBQVNmLE1BQVQsQ0FBZ0JpQixJQUFoQixFQUE4QkMsS0FBOUIsRUFBMEM7QUFDL0MsTUFBSXVCLE9BQWVILFFBQVFyQixJQUFSLENBQW5CO0FBQ0EsTUFBSSxDQUFDd0IsSUFBTCxFQUFXO0FBQ1RBLFdBQU8sSUFBSXpCLE1BQUosQ0FBV0MsSUFBWCxFQUFpQkMsS0FBakIsQ0FBUDtBQUNBb0IsWUFBUXJCLElBQVIsSUFBZ0J3QixJQUFoQjtBQUNEO0FBQ0RBLE9BQUtPLEdBQUwsQ0FBUzlCLEtBQVQ7QUFDQSxTQUFPdUIsS0FBS3ZCLEtBQVo7QUFDRDs7QUFFTSxTQUFTakIsV0FBVCxDQUFxQmdCLElBQXJCLEVBQW1DVixRQUFuQyxFQUF1RDtBQUM1RCxNQUFNa0MsT0FBT0gsUUFBUXJCLElBQVIsQ0FBYjtBQUNBd0IsVUFBUUEsS0FBS1EsY0FBTCxDQUFvQjFDLFFBQXBCLENBQVI7QUFDRDs7QUFFTSxTQUFTTCxTQUFULENBQW1CZSxJQUFuQixFQUFpQ1YsUUFBakMsRUFBcUQ7QUFDMUQsTUFBTWtDLE9BQU9ELGtCQUFrQnZCLElBQWxCLENBQWI7QUFDQXdCLE9BQUtTLGdCQUFMLENBQXNCM0MsUUFBdEI7QUFDQSxTQUFPa0MsS0FBS3ZCLEtBQVo7QUFDRDs7QUFFTSxTQUFTZixTQUFULENBQW1CYyxJQUFuQixFQUFpQ1YsUUFBakMsRUFBcUQ7QUFDMUQsTUFBTWtDLE9BQU9ELGtCQUFrQnZCLElBQWxCLENBQWI7QUFDQXdCLE9BQUtVLGNBQUwsQ0FBb0I1QyxRQUFwQjtBQUNBLFNBQU9rQyxLQUFLdkIsS0FBWjtBQUNEOztBQUVNLFNBQVNkLGVBQVQsQ0FBeUJhLElBQXpCLEVBQXVDVixRQUF2QyxFQUEyRDtBQUNoRSxNQUFNa0MsT0FBT0Qsa0JBQWtCdkIsSUFBbEIsQ0FBYjtBQUNBd0IsT0FBS1csaUJBQUwsQ0FBdUI3QyxRQUF2QjtBQUNEOztBQUVNLFNBQVNGLGlCQUFULENBQTJCWSxJQUEzQixFQUF5Q1YsUUFBekMsRUFBNkQ7QUFDbEVOLGNBQVlnQixJQUFaLEVBQWtCVixRQUFsQjtBQUNEOztBQUVEOztBQUVBLFNBQVM4QyxvQkFBVCxDQUE4QkMsUUFBOUIsRUFBd0M7QUFDdEMsTUFBSSxPQUFPQSxRQUFQLEtBQW9CLFFBQXhCLEVBQWtDO0FBQ2hDLFFBQU1DLFdBQVdELFNBQVNFLEtBQVQsQ0FBZSxHQUFmLENBQWpCO0FBQ0FGLGVBQVcsRUFBWDtBQUNBQSxhQUFTRyxHQUFULEdBQWVGLFNBQVMsQ0FBVCxDQUFmO0FBQ0FELGFBQVNJLE1BQVQsR0FBa0IsRUFBbEI7QUFDQSxRQUFJSCxTQUFTLENBQVQsQ0FBSixFQUFpQjtBQUNmQSxlQUFTLENBQVQsRUFBWUMsS0FBWixDQUFrQixHQUFsQixFQUF1QjlDLE9BQXZCLENBQStCLFVBQUNpRCxLQUFELEVBQVc7QUFDeEMsWUFBTUMsUUFBUUQsTUFBTUgsS0FBTixDQUFZLEdBQVosQ0FBZDtBQUNBRixpQkFBU0ksTUFBVCxDQUFnQkUsTUFBTSxDQUFOLENBQWhCLElBQTRCQSxNQUFNLENBQU4sQ0FBNUI7QUFDRCxPQUhEO0FBSUQ7QUFDRixHQVhELE1BWUssSUFBSU4sUUFBSixFQUFjO0FBQ2pCLFFBQUlPLE9BQU9QLFNBQVNHLEdBQXBCO0FBQ0EsUUFBSUssVUFBVSxJQUFkO0FBQ0EsUUFBSVIsU0FBU0ksTUFBYixFQUFxQjtBQUNuQkcsY0FBUSxHQUFSO0FBQ0FqQixhQUFPQyxJQUFQLENBQVlTLFNBQVNJLE1BQXJCLEVBQTZCaEQsT0FBN0IsQ0FBcUMsZUFBTztBQUMxQyxZQUFNaUQsUUFBUUwsU0FBU0ksTUFBVCxDQUFnQkssR0FBaEIsQ0FBZDtBQUNBLFlBQUlELE9BQUosRUFBYUEsVUFBVSxLQUFWLENBQWIsS0FDS0QsUUFBUSxHQUFSO0FBQ0xBLGdCQUFRRSxNQUFNLEdBQU4sR0FBWUosS0FBcEI7QUFDRCxPQUxEO0FBTUQ7QUFDREssV0FBT1YsUUFBUCxDQUFnQk8sSUFBaEIsR0FBdUJBLElBQXZCO0FBQ0Q7QUFDRCxTQUFPLEVBQUUsbUJBQW1CUCxRQUFyQixFQUFQO0FBQ0Q7O0FBRUQsU0FBU1csb0JBQVQsR0FBZ0M7QUFDOUJqRSxTQUFPLGlCQUFQLEVBQTBCZ0UsT0FBT1YsUUFBUCxDQUFnQk8sSUFBMUM7QUFDRDs7QUFFRDFELFVBQVUsaUJBQVYsRUFBNkJrRCxvQkFBN0I7QUFDQVcsT0FBT0UsZ0JBQVAsQ0FBd0IsTUFBeEIsRUFBZ0NELG9CQUFoQztBQUNBRCxPQUFPRSxnQkFBUCxDQUF3QixZQUF4QixFQUFzQ0Qsb0JBQXRDIiwiZmlsZSI6ImVudmlyb25tZW50LmpzIiwic291cmNlc0NvbnRlbnQiOlsiLyogZXNsaW50LWRpc2FibGUgbm8tdXNlLWJlZm9yZS1kZWZpbmUgKi9cclxuLyogZXNsaW50LWRpc2FibGUgcmVhY3Qvbm8tbXVsdGktY29tcCAqL1xyXG5cclxuLy8gTGlzdGVuZXIgYmFzZWQgbGFzdCB2YWx1ZSByZWFkaW5nXHJcbnR5cGUgVmFsdWVMaXN0ZW5lciA9IEZ1bmN0aW9uXHJcblxyXG4vLyBMaXN0ZW5lciBiYXNlZCBzdHJlYW1pbmdcclxuY2xhc3MgU3RyZWFtTGlzdGVuZXIge1xyXG4gIHZhbHVlczogQXJyYXk8YW55PlxyXG4gIGNhbGxiYWNrOiBGdW5jdGlvblxyXG4gIGNvbnN0cnVjdG9yKGNhbGxiYWNrOiBGdW5jdGlvbikge1xyXG4gICAgdGhpcy5jYWxsYmFjayA9IGNhbGxiYWNrXHJcbiAgICB0aGlzLnZhbHVlcyA9IFtdXHJcbiAgfVxyXG4gIGZvckVhY2goKSB7XHJcbiAgICBjb25zdCByZXN1bHQgPSB0aGlzLnZhbHVlcy5mb3JFYWNoKC4uLmFyZ3VtZW50cylcclxuICAgIHRoaXMudmFsdWVzLmxlbmd0aCA9IDBcclxuICAgIHJldHVybiByZXN1bHRcclxuICB9XHJcbiAgbWFwKCkge1xyXG4gICAgY29uc3QgcmVzdWx0ID0gdGhpcy5tYXAuZm9yRWFjaCguLi5hcmd1bWVudHMpXHJcbiAgICB0aGlzLnZhbHVlcy5sZW5ndGggPSAwXHJcbiAgICByZXR1cm4gcmVzdWx0XHJcbiAgfVxyXG4gIHNoaWZ0KCk6IGFueSB7XHJcbiAgICBpZiAodGhpcy52YWx1ZXMubGVuZ3RoKSB7XHJcbiAgICAgIHJldHVybiB0aGlzLnZhbHVlcy5zaGlmdCgpXHJcbiAgICB9XHJcbiAgICByZXR1cm4gdW5kZWZpbmVkXHJcbiAgfVxyXG59XHJcblxyXG5jbGFzcyBFbnZWYXIge1xyXG4gIG5hbWU6IHN0cmluZ1xyXG4gIHZhbHVlOiBhbnlcclxuICBmaWx0ZXJzOiBBcnJheTxGdW5jdGlvbj5cclxuICB2YWx1ZUxpc3RlbmVyczogQXJyYXk8VmFsdWVMaXN0ZW5lcj5cclxuICBzdHJlYW1MaXN0ZW5lcnM6IEFycmF5PFN0cmVhbUxpc3RlbmVyPlxyXG4gIHBlbmRpbmdTdGF0dXM6IG51bWJlclxyXG5cclxuICBjb25zdHJ1Y3RvcihuYW1lOiBzdHJpbmcsIHZhbHVlOiBhbnkpIHtcclxuICAgIHRoaXMubmFtZSA9IG5hbWVcclxuICAgIHRoaXMudmFsdWUgPSB2YWx1ZVxyXG4gICAgdGhpcy5maWx0ZXJzID0gbnVsbFxyXG4gICAgdGhpcy52YWx1ZUxpc3RlbmVycyA9IG51bGxcclxuICAgIHRoaXMuc3RyZWFtTGlzdGVuZXJzID0gbnVsbFxyXG4gICAgdGhpcy5wZW5kaW5nU3RhdHVzID0gMFxyXG4gIH1cclxuICB3cml0ZSh2YWx1ZTogYW55KSB7XHJcbiAgICBpZiAodGhpcy5wZW5kaW5nU3RhdHVzID09PSAwKSB7XHJcbiAgICAgIGlmIChlbnZQZW5kaW5ncy5sZW5ndGggPT09IDApIHtcclxuICAgICAgICBzZXRUaW1lb3V0KHByb2Nlc3NQZW5kaW5nRW52VmFycywgMClcclxuICAgICAgfVxyXG4gICAgICBlbnZQZW5kaW5ncy5wdXNoKHRoaXMpXHJcbiAgICB9XHJcbiAgICBpZiAodGhpcy52YWx1ZSAhPT0gdmFsdWUpIHRoaXMucGVuZGluZ1N0YXR1cyA9IDFcclxuICAgIGVsc2UgaWYgKHRoaXMucGVuZGluZ1N0YXR1cyA9PT0gMCkgdGhpcy5wZW5kaW5nU3RhdHVzID0gLTFcclxuICAgIHRoaXMudmFsdWUgPSB2YWx1ZVxyXG4gICAgdGhpcy5zdHJlYW1MaXN0ZW5lcnMgJiYgdGhpcy5zdHJlYW1MaXN0ZW5lcnMuZm9yRWFjaChsID0+IGwudmFsdWVzLnB1c2godmFsdWUpKVxyXG4gIH1cclxuICBzZXQodmFsdWU6IGFueSkge1xyXG4gICAgaWYgKHRoaXMuZmlsdGVycykge1xyXG4gICAgICBmaWx0ZXJFbnZWYXJpYWJsZXModGhpcywgdmFsdWUpXHJcbiAgICB9XHJcbiAgICBlbHNlIHtcclxuICAgICAgdGhpcy53cml0ZSh2YWx1ZSlcclxuICAgIH1cclxuICB9XHJcbiAgYWRkVmFsdWVGaWx0ZXIoY2FsbGJhY2s6IEZ1bmN0aW9uKSB7XHJcbiAgICBpZiAoY2FsbGJhY2sgaW5zdGFuY2VvZiBGdW5jdGlvbikge1xyXG4gICAgICBpZiAoIXRoaXMuZmlsdGVycykgdGhpcy5maWx0ZXJzID0gW11cclxuICAgICAgdGhpcy5maWx0ZXJzLnB1c2goY2FsbGJhY2spXHJcbiAgICB9XHJcbiAgICBlbHNlIHRocm93IFwiRW52VmFyOjphZGRWYWx1ZUZpbHRlciBleHBlY3RzIGEgbm90IG51bGwgZnVuY3Rpb25cIlxyXG4gIH1cclxuICBhZGRWYWx1ZUxpc3RlbmVyKGNhbGxiYWNrOiBGdW5jdGlvbikge1xyXG4gICAgaWYgKGNhbGxiYWNrIGluc3RhbmNlb2YgRnVuY3Rpb24pIHtcclxuICAgICAgaWYgKCF0aGlzLnZhbHVlTGlzdGVuZXJzKSB0aGlzLnZhbHVlTGlzdGVuZXJzID0gW11cclxuICAgICAgdGhpcy52YWx1ZUxpc3RlbmVycy5wdXNoKGNhbGxiYWNrKVxyXG4gICAgfVxyXG4gICAgZWxzZSB0aHJvdyBcIkVudlZhcjo6YWRkVmFsdWVMaXN0ZW5lciBleHBlY3RzIGEgbm90IG51bGwgZnVuY3Rpb25cIlxyXG4gIH1cclxuICBhZGRTdHJlYW1MaXN0ZW5lcihjYWxsYmFjazogRnVuY3Rpb24pIHtcclxuICAgIGlmIChjYWxsYmFjayBpbnN0YW5jZW9mIEZ1bmN0aW9uKSB7XHJcbiAgICAgIGlmICghdGhpcy5zdHJlYW1MaXN0ZW5lcnMpIHRoaXMuc3RyZWFtTGlzdGVuZXJzID0gW11cclxuICAgICAgdGhpcy5zdHJlYW1MaXN0ZW5lcnMucHVzaChuZXcgU3RyZWFtTGlzdGVuZXIoY2FsbGJhY2spKVxyXG4gICAgfVxyXG4gICAgZWxzZSB0aHJvdyBcIkVudlZhcjo6YWRkU3RyZWFtTGlzdGVuZXIgZXhwZWN0cyBhIG5vdCBudWxsIGZ1bmN0aW9uXCJcclxuICB9XHJcbiAgcmVtb3ZlTGlzdGVuZXIoY2FsbGJhY2s6IEZ1bmN0aW9uKSB7XHJcbiAgICBpZiAoY2FsbGJhY2sgaW5zdGFuY2VvZiBGdW5jdGlvbikge1xyXG4gICAgICBpZiAodGhpcy52YWx1ZUxpc3RlbmVycykge1xyXG4gICAgICAgIGNvbnN0IGkgPSB0aGlzLnZhbHVlTGlzdGVuZXJzLmluZGV4T2YoY2FsbGJhY2spXHJcbiAgICAgICAgaWYgKGkgIT0gLTEpIHRoaXMudmFsdWVMaXN0ZW5lcnMuc3BsaWNlKGksIDEpXHJcbiAgICAgIH1cclxuICAgICAgaWYgKHRoaXMuc3RyZWFtTGlzdGVuZXJzKSB7XHJcbiAgICAgICAgY29uc3QgaSA9IHRoaXMuc3RyZWFtTGlzdGVuZXJzLmZpbmRJbmRleChsID0+IGwuY2FsbGJhY2sgPT09IGNhbGxiYWNrKVxyXG4gICAgICAgIGlmIChpICE9IC0xKSB0aGlzLnN0cmVhbUxpc3RlbmVycy5zcGxpY2UoaSwgMSlcclxuICAgICAgfVxyXG4gICAgfVxyXG4gICAgZWxzZSB0aHJvdyBcIkVudlZhcjo6cmVtb3ZlTGlzdGVuZXIgZXhwZWN0cyBhIG5vdCBudWxsIGZ1bmN0aW9uXCJcclxuICB9XHJcbiAgZGlzcGF0Y2goKSB7XHJcbiAgICBjb25zdCBwZW5kaW5nU3RhdHVzID0gdGhpcy5wZW5kaW5nU3RhdHVzXHJcbiAgICB0aGlzLnBlbmRpbmdTdGF0dXMgPSAwXHJcbiAgICBpZiAocGVuZGluZ1N0YXR1cyA+IDApIHtcclxuICAgICAgY29uc3QgdmFsdWUgPSB0aGlzLnZhbHVlXHJcbiAgICAgIHRoaXMudmFsdWVMaXN0ZW5lcnMgJiYgdGhpcy52YWx1ZUxpc3RlbmVycy5mb3JFYWNoKGwgPT4ge1xyXG4gICAgICAgIHRyeSB7XHJcbiAgICAgICAgICBsKHZhbHVlLCB0aGlzKVxyXG4gICAgICAgIH1cclxuICAgICAgICBjYXRjaCAoZSkge1xyXG4gICAgICAgICAgY29uc29sZS5lcnJvcihlKVxyXG4gICAgICAgIH1cclxuICAgICAgfSlcclxuICAgIH1cclxuICAgIHRoaXMuc3RyZWFtTGlzdGVuZXJzICYmIHRoaXMuc3RyZWFtTGlzdGVuZXJzLmZvckVhY2gobCA9PiB7XHJcbiAgICAgIHRyeSB7XHJcbiAgICAgICAgbC5jYWxsYmFjayhsLCB0aGlzKVxyXG4gICAgICB9XHJcbiAgICAgIGNhdGNoIChlKSB7XHJcbiAgICAgICAgY29uc29sZS5lcnJvcihlKVxyXG4gICAgICB9XHJcbiAgICB9KVxyXG5cclxuICB9XHJcbn1cclxuXHJcbmNvbnN0IGVudlZhcnM6IHsgW3N0cmluZ106IEVudlZhciB9ID0ge31cclxuY29uc3QgZW52UGVuZGluZ3M6IEFycmF5PEVudlZhcj4gPSBbXVxyXG5cclxuZnVuY3Rpb24gcHJvY2Vzc1BlbmRpbmdFbnZWYXJzKCkge1xyXG4gIGxldCBpXHJcbiAgZm9yIChpID0gMDsgaSA8IGVudlBlbmRpbmdzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICBlbnZQZW5kaW5nc1tpXS5kaXNwYXRjaCgpXHJcbiAgfVxyXG4gIGVudlBlbmRpbmdzLmxlbmd0aCA9IDBcclxufVxyXG5cclxuZnVuY3Rpb24gY3JlYXRlRW52VmFyaWFibGUobmFtZTogc3RyaW5nKTogRW52VmFyIHtcclxuICBsZXQgZW52diA9IGVudlZhcnNbbmFtZV1cclxuICBpZiAoIWVudnYpIHtcclxuICAgIGVudnYgPSBuZXcgRW52VmFyKG5hbWUpXHJcbiAgICBlbnZWYXJzW25hbWVdID0gZW52dlxyXG4gIH1cclxuICByZXR1cm4gZW52dlxyXG59XHJcblxyXG5mdW5jdGlvbiBmaWx0ZXJFbnZWYXJpYWJsZXMoZW52djogRW52VmFyLCB2YWx1ZTogYW55KSB7XHJcbiAgY29uc3QgZG9uZXMgPSB7fVxyXG4gIGxldCB2YWx1ZXMgPSB7IFtlbnZ2Lm5hbWVdOiB2YWx1ZSB9XHJcbiAgbGV0IGNoYW5naW5nID0gdHJ1ZVxyXG4gIHdoaWxlIChjaGFuZ2luZykge1xyXG4gICAgY2hhbmdpbmcgPSBmYWxzZVxyXG4gICAgT2JqZWN0LmtleXModmFsdWVzKS5mb3JFYWNoKGVudm5hbWUgPT4ge1xyXG4gICAgICBpZiAoIWRvbmVzW2Vudm5hbWVdKSB7XHJcbiAgICAgICAgZW52diA9IGNyZWF0ZUVudlZhcmlhYmxlKGVudm5hbWUpXHJcbiAgICAgICAgaWYgKGVudnYuZmlsdGVycykge1xyXG4gICAgICAgICAgZW52di5maWx0ZXJzLmZvckVhY2goZiA9PiB2YWx1ZXMgPSB7IC4uLnZhbHVlcywgLi4uZih2YWx1ZXNbZW52bmFtZV0pIH0pXHJcbiAgICAgICAgfVxyXG4gICAgICAgIGNoYW5naW5nID0gdHJ1ZVxyXG4gICAgICAgIGRvbmVzW2Vudm5hbWVdID0gZW52dlxyXG4gICAgICB9XHJcbiAgICB9KVxyXG4gIH1cclxuICBPYmplY3Qua2V5cyhkb25lcykuZm9yRWFjaChlbnZuYW1lID0+IHtcclxuICAgIGRvbmVzW2Vudm5hbWVdLndyaXRlKHZhbHVlc1tlbnZuYW1lXSlcclxuICB9KVxyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gZ2V0RW52KG5hbWU6IHN0cmluZyk6IGFueSB7XHJcbiAgY29uc3QgZW52diA9IGVudlZhcnNbbmFtZV1cclxuICByZXR1cm4gZW52diA/IGVudnYudmFsdWUgOiB1bmRlZmluZWRcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIHNldEVudihuYW1lOiBzdHJpbmcsIHZhbHVlOiBhbnkpIHtcclxuICBsZXQgZW52djogRW52VmFyID0gZW52VmFyc1tuYW1lXVxyXG4gIGlmICghZW52dikge1xyXG4gICAgZW52diA9IG5ldyBFbnZWYXIobmFtZSwgdmFsdWUpXHJcbiAgICBlbnZWYXJzW25hbWVdID0gZW52dlxyXG4gIH1cclxuICBlbnZ2LnNldCh2YWx1ZSlcclxuICByZXR1cm4gZW52di52YWx1ZVxyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gdW5saXN0ZW5FbnYobmFtZTogc3RyaW5nLCBjYWxsYmFjazogRnVuY3Rpb24pIHtcclxuICBjb25zdCBlbnZ2ID0gZW52VmFyc1tuYW1lXVxyXG4gIGVudnYgJiYgZW52di5yZW1vdmVMaXN0ZW5lcihjYWxsYmFjaylcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIGxpc3RlbkVudihuYW1lOiBzdHJpbmcsIGNhbGxiYWNrOiBGdW5jdGlvbikge1xyXG4gIGNvbnN0IGVudnYgPSBjcmVhdGVFbnZWYXJpYWJsZShuYW1lKVxyXG4gIGVudnYuYWRkVmFsdWVMaXN0ZW5lcihjYWxsYmFjaylcclxuICByZXR1cm4gZW52di52YWx1ZVxyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gZmlsdGVyRW52KG5hbWU6IHN0cmluZywgY2FsbGJhY2s6IEZ1bmN0aW9uKSB7XHJcbiAgY29uc3QgZW52diA9IGNyZWF0ZUVudlZhcmlhYmxlKG5hbWUpXHJcbiAgZW52di5hZGRWYWx1ZUZpbHRlcihjYWxsYmFjaylcclxuICByZXR1cm4gZW52di52YWx1ZVxyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gbGlzdGVuRW52U3RyZWFtKG5hbWU6IHN0cmluZywgY2FsbGJhY2s6IEZ1bmN0aW9uKSB7XHJcbiAgY29uc3QgZW52diA9IGNyZWF0ZUVudlZhcmlhYmxlKG5hbWUpXHJcbiAgZW52di5hZGRTdHJlYW1MaXN0ZW5lcihjYWxsYmFjaylcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIHVubGlzdGVuRW52U3RyZWFtKG5hbWU6IHN0cmluZywgY2FsbGJhY2s6IEZ1bmN0aW9uKSB7XHJcbiAgdW5saXN0ZW5FbnYobmFtZSwgY2FsbGJhY2spXHJcbn1cclxuXHJcbi8vIE1hbmFnZW1lbnQgb2Ygd2luZG93LmxvY2F0aW9uXHJcblxyXG5mdW5jdGlvbiBmaWx0ZXJXaW5kb3dMb2NhdGlvbihsb2NhdGlvbikge1xyXG4gIGlmICh0eXBlb2YgbG9jYXRpb24gPT09IFwic3RyaW5nXCIpIHtcclxuICAgIGNvbnN0IGxvY1BhcnRzID0gbG9jYXRpb24uc3BsaXQoXCI/XCIpXHJcbiAgICBsb2NhdGlvbiA9IHt9XHJcbiAgICBsb2NhdGlvbi51cmwgPSBsb2NQYXJ0c1swXVxyXG4gICAgbG9jYXRpb24ucGFyYW1zID0ge31cclxuICAgIGlmIChsb2NQYXJ0c1sxXSkge1xyXG4gICAgICBsb2NQYXJ0c1sxXS5zcGxpdChcIiZcIikuZm9yRWFjaCgocGFyYW0pID0+IHtcclxuICAgICAgICBjb25zdCBwYXJ0cyA9IHBhcmFtLnNwbGl0KFwiPVwiKVxyXG4gICAgICAgIGxvY2F0aW9uLnBhcmFtc1twYXJ0c1swXV0gPSBwYXJ0c1sxXVxyXG4gICAgICB9KVxyXG4gICAgfVxyXG4gIH1cclxuICBlbHNlIGlmIChsb2NhdGlvbikge1xyXG4gICAgbGV0IGhhc2ggPSBsb2NhdGlvbi51cmxcclxuICAgIGxldCBpc0ZpcnN0ID0gdHJ1ZVxyXG4gICAgaWYgKGxvY2F0aW9uLnBhcmFtcykge1xyXG4gICAgICBoYXNoICs9IFwiP1wiXHJcbiAgICAgIE9iamVjdC5rZXlzKGxvY2F0aW9uLnBhcmFtcykuZm9yRWFjaChrZXkgPT4ge1xyXG4gICAgICAgIGNvbnN0IHBhcmFtID0gbG9jYXRpb24ucGFyYW1zW2tleV1cclxuICAgICAgICBpZiAoaXNGaXJzdCkgaXNGaXJzdCA9IGZhbHNlXHJcbiAgICAgICAgZWxzZSBoYXNoICs9IFwiJlwiXHJcbiAgICAgICAgaGFzaCArPSBrZXkgKyBcIj1cIiArIHBhcmFtXHJcbiAgICAgIH0pXHJcbiAgICB9XHJcbiAgICB3aW5kb3cubG9jYXRpb24uaGFzaCA9IGhhc2hcclxuICB9XHJcbiAgcmV0dXJuIHsgXCJ3aW5kb3cubG9jYXRpb25cIjogbG9jYXRpb24gfVxyXG59XHJcblxyXG5mdW5jdGlvbiB1cGRhdGVXaW5kb3dMb2NhdGlvbigpIHtcclxuICBzZXRFbnYoXCJ3aW5kb3cubG9jYXRpb25cIiwgd2luZG93LmxvY2F0aW9uLmhhc2gpXHJcbn1cclxuXHJcbmZpbHRlckVudihcIndpbmRvdy5sb2NhdGlvblwiLCBmaWx0ZXJXaW5kb3dMb2NhdGlvbilcclxud2luZG93LmFkZEV2ZW50TGlzdGVuZXIoXCJsb2FkXCIsIHVwZGF0ZVdpbmRvd0xvY2F0aW9uKVxyXG53aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcihcImhhc2hjaGFuZ2VcIiwgdXBkYXRlV2luZG93TG9jYXRpb24pXHJcbiJdfQ==