"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Listenable = function () {
  function Listenable() {
    var _this = this;

    _classCallCheck(this, Listenable);

    this.$status = "changed";

    this.dispatchState = function () {
      var k = void 0,
          i = void 0;
      var count = _this.$listeners ? _this.$listeners.length : 0;
      for (i = 0; i < count; i++) {
        var listener = _this.$listeners[i];
        if (listener.length > 1) {
          for (k = 1; k < listener.length; k++) {
            if (_this.$prevState.hasOwnProperty(listener[k])) {
              try {
                listener[0](_this, _this.$prevState);
              } catch (e) {
                console.error(e);
              }
              break;
            }
          }
        } else {
          try {
            listener[0](_this, _this.$prevState);
          } catch (e) {
            console.error(e);
          }
        }
      }
      _this.$prevState = 0;
    };
  }

  _createClass(Listenable, [{
    key: "listenState",
    value: function listenState(callback, keys) {
      if (callback instanceof Function) {
        var listener = [callback];
        keys && listener.concat(keys);
        if (!this.$listeners) this.$listeners = [];
        this.$listeners.push(listener);
      } else throw new Error("ViewFile::listenContent expects a not null function");
      return this;
    }
  }, {
    key: "unlistenState",
    value: function unlistenState(callback) {
      var i = void 0;
      if (this.$listeners) {
        for (i = 0; i < this.$listeners.length; i++) {
          if (this.$listeners[i][0] === callback) {
            this.$listeners.splice(i, 1);
            return true;
          }
        }
      }
      return false;
    }
  }, {
    key: "setState",
    value: function setState(value) {
      this.$status = "changed";
      for (var key in value) {
        if (this[key] !== value[key]) {
          if (!this.$prevState) {
            this.$prevState = {};
            setTimeout(this.dispatchState, 0);
          }
          if (!this.$prevState.hasOwnProperty(key)) {
            this.$prevState[key] = this[key];
          }
          this[key] = value[key];
        }
      }
    }
  }, {
    key: "terminate",
    value: function terminate() {
      this.$status = "released";
      this.dispatchState();
    }
  }]);

  return Listenable;
}();

exports.default = Listenable;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9saWIvbW9kdWxlcy9saXN0ZW5hYmxlLmpzIl0sIm5hbWVzIjpbIkxpc3RlbmFibGUiLCIkc3RhdHVzIiwiZGlzcGF0Y2hTdGF0ZSIsImsiLCJpIiwiY291bnQiLCIkbGlzdGVuZXJzIiwibGVuZ3RoIiwibGlzdGVuZXIiLCIkcHJldlN0YXRlIiwiaGFzT3duUHJvcGVydHkiLCJlIiwiY29uc29sZSIsImVycm9yIiwiY2FsbGJhY2siLCJrZXlzIiwiRnVuY3Rpb24iLCJjb25jYXQiLCJwdXNoIiwiRXJyb3IiLCJzcGxpY2UiLCJ2YWx1ZSIsImtleSIsInNldFRpbWVvdXQiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7SUFDcUJBLFU7Ozs7OztTQUNuQkMsTyxHQUFrQixTOztTQTBCbEJDLGEsR0FBZ0IsWUFBTTtBQUNwQixVQUFJQyxVQUFKO0FBQUEsVUFBT0MsVUFBUDtBQUNBLFVBQU1DLFFBQVEsTUFBS0MsVUFBTCxHQUFrQixNQUFLQSxVQUFMLENBQWdCQyxNQUFsQyxHQUEyQyxDQUF6RDtBQUNBLFdBQUtILElBQUksQ0FBVCxFQUFZQSxJQUFJQyxLQUFoQixFQUF1QkQsR0FBdkIsRUFBNEI7QUFDMUIsWUFBTUksV0FBVyxNQUFLRixVQUFMLENBQWdCRixDQUFoQixDQUFqQjtBQUNBLFlBQUlJLFNBQVNELE1BQVQsR0FBa0IsQ0FBdEIsRUFBeUI7QUFDdkIsZUFBS0osSUFBSSxDQUFULEVBQVlBLElBQUlLLFNBQVNELE1BQXpCLEVBQWlDSixHQUFqQyxFQUFzQztBQUNwQyxnQkFBSSxNQUFLTSxVQUFMLENBQWdCQyxjQUFoQixDQUErQkYsU0FBU0wsQ0FBVCxDQUEvQixDQUFKLEVBQWlEO0FBQy9DLGtCQUFJO0FBQ0ZLLHlCQUFTLENBQVQsU0FBa0IsTUFBS0MsVUFBdkI7QUFDRCxlQUZELENBR0EsT0FBT0UsQ0FBUCxFQUFVO0FBQ1JDLHdCQUFRQyxLQUFSLENBQWNGLENBQWQ7QUFDRDtBQUNEO0FBQ0Q7QUFDRjtBQUNGLFNBWkQsTUFhSztBQUNILGNBQUk7QUFDRkgscUJBQVMsQ0FBVCxTQUFrQixNQUFLQyxVQUF2QjtBQUNELFdBRkQsQ0FHQSxPQUFPRSxDQUFQLEVBQVU7QUFDUkMsb0JBQVFDLEtBQVIsQ0FBY0YsQ0FBZDtBQUNEO0FBQ0Y7QUFDRjtBQUNELFlBQUtGLFVBQUwsR0FBa0IsQ0FBbEI7QUFDRCxLOzs7OztnQ0FsRFdLLFEsRUFBb0JDLEksRUFBYTtBQUMzQyxVQUFJRCxvQkFBb0JFLFFBQXhCLEVBQWtDO0FBQ2hDLFlBQUlSLFdBQVcsQ0FBQ00sUUFBRCxDQUFmO0FBQ0FDLGdCQUFRUCxTQUFTUyxNQUFULENBQWdCRixJQUFoQixDQUFSO0FBQ0EsWUFBSSxDQUFDLEtBQUtULFVBQVYsRUFBc0IsS0FBS0EsVUFBTCxHQUFrQixFQUFsQjtBQUN0QixhQUFLQSxVQUFMLENBQWdCWSxJQUFoQixDQUFxQlYsUUFBckI7QUFDRCxPQUxELE1BTUssTUFBTSxJQUFJVyxLQUFKLENBQVUscURBQVYsQ0FBTjtBQUNMLGFBQU8sSUFBUDtBQUNEOzs7a0NBQ2FMLFEsRUFBb0I7QUFDaEMsVUFBSVYsVUFBSjtBQUNBLFVBQUksS0FBS0UsVUFBVCxFQUFxQjtBQUNuQixhQUFLRixJQUFJLENBQVQsRUFBWUEsSUFBSSxLQUFLRSxVQUFMLENBQWdCQyxNQUFoQyxFQUF3Q0gsR0FBeEMsRUFBNkM7QUFDM0MsY0FBSSxLQUFLRSxVQUFMLENBQWdCRixDQUFoQixFQUFtQixDQUFuQixNQUEwQlUsUUFBOUIsRUFBd0M7QUFDdEMsaUJBQUtSLFVBQUwsQ0FBZ0JjLE1BQWhCLENBQXVCaEIsQ0FBdkIsRUFBMEIsQ0FBMUI7QUFDQSxtQkFBTyxJQUFQO0FBQ0Q7QUFDRjtBQUNGO0FBQ0QsYUFBTyxLQUFQO0FBQ0Q7Ozs2QkE4QlFpQixLLEVBQU87QUFDZCxXQUFLcEIsT0FBTCxHQUFlLFNBQWY7QUFDQSxXQUFLLElBQUlxQixHQUFULElBQWdCRCxLQUFoQixFQUF1QjtBQUNyQixZQUFJLEtBQUtDLEdBQUwsTUFBY0QsTUFBTUMsR0FBTixDQUFsQixFQUE4QjtBQUM1QixjQUFJLENBQUMsS0FBS2IsVUFBVixFQUFzQjtBQUNwQixpQkFBS0EsVUFBTCxHQUFrQixFQUFsQjtBQUNBYyx1QkFBVyxLQUFLckIsYUFBaEIsRUFBK0IsQ0FBL0I7QUFDRDtBQUNELGNBQUksQ0FBQyxLQUFLTyxVQUFMLENBQWdCQyxjQUFoQixDQUErQlksR0FBL0IsQ0FBTCxFQUEwQztBQUN4QyxpQkFBS2IsVUFBTCxDQUFnQmEsR0FBaEIsSUFBdUIsS0FBS0EsR0FBTCxDQUF2QjtBQUNEO0FBQ0QsZUFBS0EsR0FBTCxJQUFZRCxNQUFNQyxHQUFOLENBQVo7QUFDRDtBQUNGO0FBQ0Y7OztnQ0FDVztBQUNWLFdBQUtyQixPQUFMLEdBQWUsVUFBZjtBQUNBLFdBQUtDLGFBQUw7QUFDRDs7Ozs7O2tCQTFFa0JGLFUiLCJmaWxlIjoibGlzdGVuYWJsZS5qcyIsInNvdXJjZXNDb250ZW50IjpbIlxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBMaXN0ZW5hYmxlIHtcclxuICAkc3RhdHVzOiBzdHJpbmcgPSBcImNoYW5nZWRcIlxyXG4gICRwcmV2U3RhdGU6IE9iamVjdFxyXG4gICRsaXN0ZW5lcnM6IEFycmF5PEFycmF5PEZ1bmN0aW9uIHwgc3RyaW5nPj5cclxuXHJcbiAgbGlzdGVuU3RhdGUoY2FsbGJhY2s6IEZ1bmN0aW9uLCBrZXlzOiBBcnJheSkge1xyXG4gICAgaWYgKGNhbGxiYWNrIGluc3RhbmNlb2YgRnVuY3Rpb24pIHtcclxuICAgICAgbGV0IGxpc3RlbmVyID0gW2NhbGxiYWNrXVxyXG4gICAgICBrZXlzICYmIGxpc3RlbmVyLmNvbmNhdChrZXlzKVxyXG4gICAgICBpZiAoIXRoaXMuJGxpc3RlbmVycykgdGhpcy4kbGlzdGVuZXJzID0gW11cclxuICAgICAgdGhpcy4kbGlzdGVuZXJzLnB1c2gobGlzdGVuZXIpXHJcbiAgICB9XHJcbiAgICBlbHNlIHRocm93IG5ldyBFcnJvcihcIlZpZXdGaWxlOjpsaXN0ZW5Db250ZW50IGV4cGVjdHMgYSBub3QgbnVsbCBmdW5jdGlvblwiKVxyXG4gICAgcmV0dXJuIHRoaXNcclxuICB9XHJcbiAgdW5saXN0ZW5TdGF0ZShjYWxsYmFjazogRnVuY3Rpb24pIHtcclxuICAgIGxldCBpXHJcbiAgICBpZiAodGhpcy4kbGlzdGVuZXJzKSB7XHJcbiAgICAgIGZvciAoaSA9IDA7IGkgPCB0aGlzLiRsaXN0ZW5lcnMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICBpZiAodGhpcy4kbGlzdGVuZXJzW2ldWzBdID09PSBjYWxsYmFjaykge1xyXG4gICAgICAgICAgdGhpcy4kbGlzdGVuZXJzLnNwbGljZShpLCAxKVxyXG4gICAgICAgICAgcmV0dXJuIHRydWVcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgIH1cclxuICAgIHJldHVybiBmYWxzZVxyXG4gIH1cclxuICBkaXNwYXRjaFN0YXRlID0gKCkgPT4ge1xyXG4gICAgbGV0IGssIGlcclxuICAgIGNvbnN0IGNvdW50ID0gdGhpcy4kbGlzdGVuZXJzID8gdGhpcy4kbGlzdGVuZXJzLmxlbmd0aCA6IDBcclxuICAgIGZvciAoaSA9IDA7IGkgPCBjb3VudDsgaSsrKSB7XHJcbiAgICAgIGNvbnN0IGxpc3RlbmVyID0gdGhpcy4kbGlzdGVuZXJzW2ldXHJcbiAgICAgIGlmIChsaXN0ZW5lci5sZW5ndGggPiAxKSB7XHJcbiAgICAgICAgZm9yIChrID0gMTsgayA8IGxpc3RlbmVyLmxlbmd0aDsgaysrKSB7XHJcbiAgICAgICAgICBpZiAodGhpcy4kcHJldlN0YXRlLmhhc093blByb3BlcnR5KGxpc3RlbmVyW2tdKSkge1xyXG4gICAgICAgICAgICB0cnkge1xyXG4gICAgICAgICAgICAgIGxpc3RlbmVyWzBdKHRoaXMsIHRoaXMuJHByZXZTdGF0ZSlcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBjYXRjaCAoZSkge1xyXG4gICAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoZSlcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBicmVha1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgICBlbHNlIHtcclxuICAgICAgICB0cnkge1xyXG4gICAgICAgICAgbGlzdGVuZXJbMF0odGhpcywgdGhpcy4kcHJldlN0YXRlKVxyXG4gICAgICAgIH1cclxuICAgICAgICBjYXRjaCAoZSkge1xyXG4gICAgICAgICAgY29uc29sZS5lcnJvcihlKVxyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgfVxyXG4gICAgdGhpcy4kcHJldlN0YXRlID0gMFxyXG4gIH1cclxuICBzZXRTdGF0ZSh2YWx1ZSkge1xyXG4gICAgdGhpcy4kc3RhdHVzID0gXCJjaGFuZ2VkXCJcclxuICAgIGZvciAobGV0IGtleSBpbiB2YWx1ZSkge1xyXG4gICAgICBpZiAodGhpc1trZXldICE9PSB2YWx1ZVtrZXldKSB7XHJcbiAgICAgICAgaWYgKCF0aGlzLiRwcmV2U3RhdGUpIHtcclxuICAgICAgICAgIHRoaXMuJHByZXZTdGF0ZSA9IHt9XHJcbiAgICAgICAgICBzZXRUaW1lb3V0KHRoaXMuZGlzcGF0Y2hTdGF0ZSwgMClcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKCF0aGlzLiRwcmV2U3RhdGUuaGFzT3duUHJvcGVydHkoa2V5KSkge1xyXG4gICAgICAgICAgdGhpcy4kcHJldlN0YXRlW2tleV0gPSB0aGlzW2tleV1cclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpc1trZXldID0gdmFsdWVba2V5XVxyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfVxyXG4gIHRlcm1pbmF0ZSgpIHtcclxuICAgIHRoaXMuJHN0YXR1cyA9IFwicmVsZWFzZWRcIlxyXG4gICAgdGhpcy5kaXNwYXRjaFN0YXRlKClcclxuICB9XHJcbn1cclxuIl19