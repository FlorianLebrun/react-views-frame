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
            if (_this.$nextState.hasOwnProperty(listener[k])) {
              try {
                listener[0](_this);
              } catch (e) {
                console.error(e);
              }
              break;
            }
          }
        } else {
          try {
            listener[0](_this);
          } catch (e) {
            console.error(e);
          }
        }
      }
      _this.$nextState = 0;
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
      if (this.$nextState) {
        this.$nextState = Object.assign(this.$nextState, value);
      } else {
        this.$nextState = Object.assign({}, value);
        setTimeout(this.dispatchState, 0);
      }
      Object.assign(this, value);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9saWIvbW9kdWxlcy9saXN0ZW5hYmxlLmpzIl0sIm5hbWVzIjpbIkxpc3RlbmFibGUiLCIkc3RhdHVzIiwiZGlzcGF0Y2hTdGF0ZSIsImsiLCJpIiwiY291bnQiLCIkbGlzdGVuZXJzIiwibGVuZ3RoIiwibGlzdGVuZXIiLCIkbmV4dFN0YXRlIiwiaGFzT3duUHJvcGVydHkiLCJlIiwiY29uc29sZSIsImVycm9yIiwiY2FsbGJhY2siLCJrZXlzIiwiRnVuY3Rpb24iLCJjb25jYXQiLCJwdXNoIiwiRXJyb3IiLCJzcGxpY2UiLCJ2YWx1ZSIsIk9iamVjdCIsImFzc2lnbiIsInNldFRpbWVvdXQiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7SUFDcUJBLFU7Ozs7OztTQUNuQkMsTyxHQUFrQixTOztTQTBCbEJDLGEsR0FBZ0IsWUFBTTtBQUNwQixVQUFJQyxVQUFKO0FBQUEsVUFBT0MsVUFBUDtBQUNBLFVBQU1DLFFBQVEsTUFBS0MsVUFBTCxHQUFnQixNQUFLQSxVQUFMLENBQWdCQyxNQUFoQyxHQUF1QyxDQUFyRDtBQUNBLFdBQUtILElBQUksQ0FBVCxFQUFZQSxJQUFJQyxLQUFoQixFQUF1QkQsR0FBdkIsRUFBNEI7QUFDMUIsWUFBTUksV0FBVyxNQUFLRixVQUFMLENBQWdCRixDQUFoQixDQUFqQjtBQUNBLFlBQUlJLFNBQVNELE1BQVQsR0FBa0IsQ0FBdEIsRUFBeUI7QUFDdkIsZUFBS0osSUFBSSxDQUFULEVBQVlBLElBQUlLLFNBQVNELE1BQXpCLEVBQWlDSixHQUFqQyxFQUFzQztBQUNwQyxnQkFBSSxNQUFLTSxVQUFMLENBQWdCQyxjQUFoQixDQUErQkYsU0FBU0wsQ0FBVCxDQUEvQixDQUFKLEVBQWlEO0FBQy9DLGtCQUFJO0FBQ0ZLLHlCQUFTLENBQVQ7QUFDRCxlQUZELENBR0EsT0FBT0csQ0FBUCxFQUFVO0FBQ1JDLHdCQUFRQyxLQUFSLENBQWNGLENBQWQ7QUFDRDtBQUNEO0FBQ0Q7QUFDRjtBQUNGLFNBWkQsTUFhSztBQUNILGNBQUk7QUFDRkgscUJBQVMsQ0FBVDtBQUNELFdBRkQsQ0FHQSxPQUFPRyxDQUFQLEVBQVU7QUFDUkMsb0JBQVFDLEtBQVIsQ0FBY0YsQ0FBZDtBQUNEO0FBQ0Y7QUFDRjtBQUNELFlBQUtGLFVBQUwsR0FBa0IsQ0FBbEI7QUFDRCxLOzs7OztnQ0FsRFdLLFEsRUFBb0JDLEksRUFBYTtBQUMzQyxVQUFJRCxvQkFBb0JFLFFBQXhCLEVBQWtDO0FBQ2hDLFlBQUlSLFdBQVcsQ0FBQ00sUUFBRCxDQUFmO0FBQ0FDLGdCQUFRUCxTQUFTUyxNQUFULENBQWdCRixJQUFoQixDQUFSO0FBQ0EsWUFBSSxDQUFDLEtBQUtULFVBQVYsRUFBc0IsS0FBS0EsVUFBTCxHQUFrQixFQUFsQjtBQUN0QixhQUFLQSxVQUFMLENBQWdCWSxJQUFoQixDQUFxQlYsUUFBckI7QUFDRCxPQUxELE1BTUssTUFBTSxJQUFJVyxLQUFKLENBQVUscURBQVYsQ0FBTjtBQUNMLGFBQU8sSUFBUDtBQUNEOzs7a0NBQ2FMLFEsRUFBb0I7QUFDaEMsVUFBSVYsVUFBSjtBQUNBLFVBQUksS0FBS0UsVUFBVCxFQUFxQjtBQUNuQixhQUFLRixJQUFJLENBQVQsRUFBWUEsSUFBSSxLQUFLRSxVQUFMLENBQWdCQyxNQUFoQyxFQUF3Q0gsR0FBeEMsRUFBNkM7QUFDM0MsY0FBSSxLQUFLRSxVQUFMLENBQWdCRixDQUFoQixFQUFtQixDQUFuQixNQUEwQlUsUUFBOUIsRUFBd0M7QUFDdEMsaUJBQUtSLFVBQUwsQ0FBZ0JjLE1BQWhCLENBQXVCaEIsQ0FBdkIsRUFBMEIsQ0FBMUI7QUFDQSxtQkFBTyxJQUFQO0FBQ0Q7QUFDRjtBQUNGO0FBQ0QsYUFBTyxLQUFQO0FBQ0Q7Ozs2QkE4QlFpQixLLEVBQU87QUFDZCxXQUFLcEIsT0FBTCxHQUFlLFNBQWY7QUFDQSxVQUFJLEtBQUtRLFVBQVQsRUFBcUI7QUFDbkIsYUFBS0EsVUFBTCxHQUFrQmEsT0FBT0MsTUFBUCxDQUFjLEtBQUtkLFVBQW5CLEVBQStCWSxLQUEvQixDQUFsQjtBQUNELE9BRkQsTUFHSztBQUNILGFBQUtaLFVBQUwsR0FBa0JhLE9BQU9DLE1BQVAsQ0FBYyxFQUFkLEVBQWtCRixLQUFsQixDQUFsQjtBQUNBRyxtQkFBVyxLQUFLdEIsYUFBaEIsRUFBK0IsQ0FBL0I7QUFDRDtBQUNEb0IsYUFBT0MsTUFBUCxDQUFjLElBQWQsRUFBb0JGLEtBQXBCO0FBQ0Q7OztnQ0FDVztBQUNWLFdBQUtwQixPQUFMLEdBQWUsVUFBZjtBQUNBLFdBQUtDLGFBQUw7QUFDRDs7Ozs7O2tCQXRFa0JGLFUiLCJmaWxlIjoibGlzdGVuYWJsZS5qcyIsInNvdXJjZXNDb250ZW50IjpbIlxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBMaXN0ZW5hYmxlIHtcclxuICAkc3RhdHVzOiBzdHJpbmcgPSBcImNoYW5nZWRcIlxyXG4gICRuZXh0U3RhdGU6IE9iamVjdFxyXG4gICRsaXN0ZW5lcnM6IEFycmF5PEFycmF5PEZ1bmN0aW9uIHwgc3RyaW5nPj5cclxuXHJcbiAgbGlzdGVuU3RhdGUoY2FsbGJhY2s6IEZ1bmN0aW9uLCBrZXlzOiBBcnJheSkge1xyXG4gICAgaWYgKGNhbGxiYWNrIGluc3RhbmNlb2YgRnVuY3Rpb24pIHtcclxuICAgICAgbGV0IGxpc3RlbmVyID0gW2NhbGxiYWNrXVxyXG4gICAgICBrZXlzICYmIGxpc3RlbmVyLmNvbmNhdChrZXlzKVxyXG4gICAgICBpZiAoIXRoaXMuJGxpc3RlbmVycykgdGhpcy4kbGlzdGVuZXJzID0gW11cclxuICAgICAgdGhpcy4kbGlzdGVuZXJzLnB1c2gobGlzdGVuZXIpXHJcbiAgICB9XHJcbiAgICBlbHNlIHRocm93IG5ldyBFcnJvcihcIlZpZXdGaWxlOjpsaXN0ZW5Db250ZW50IGV4cGVjdHMgYSBub3QgbnVsbCBmdW5jdGlvblwiKVxyXG4gICAgcmV0dXJuIHRoaXNcclxuICB9XHJcbiAgdW5saXN0ZW5TdGF0ZShjYWxsYmFjazogRnVuY3Rpb24pIHtcclxuICAgIGxldCBpXHJcbiAgICBpZiAodGhpcy4kbGlzdGVuZXJzKSB7XHJcbiAgICAgIGZvciAoaSA9IDA7IGkgPCB0aGlzLiRsaXN0ZW5lcnMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICBpZiAodGhpcy4kbGlzdGVuZXJzW2ldWzBdID09PSBjYWxsYmFjaykge1xyXG4gICAgICAgICAgdGhpcy4kbGlzdGVuZXJzLnNwbGljZShpLCAxKVxyXG4gICAgICAgICAgcmV0dXJuIHRydWVcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgIH1cclxuICAgIHJldHVybiBmYWxzZVxyXG4gIH1cclxuICBkaXNwYXRjaFN0YXRlID0gKCkgPT4ge1xyXG4gICAgbGV0IGssIGlcclxuICAgIGNvbnN0IGNvdW50ID0gdGhpcy4kbGlzdGVuZXJzP3RoaXMuJGxpc3RlbmVycy5sZW5ndGg6MFxyXG4gICAgZm9yIChpID0gMDsgaSA8IGNvdW50OyBpKyspIHtcclxuICAgICAgY29uc3QgbGlzdGVuZXIgPSB0aGlzLiRsaXN0ZW5lcnNbaV1cclxuICAgICAgaWYgKGxpc3RlbmVyLmxlbmd0aCA+IDEpIHtcclxuICAgICAgICBmb3IgKGsgPSAxOyBrIDwgbGlzdGVuZXIubGVuZ3RoOyBrKyspIHtcclxuICAgICAgICAgIGlmICh0aGlzLiRuZXh0U3RhdGUuaGFzT3duUHJvcGVydHkobGlzdGVuZXJba10pKSB7XHJcbiAgICAgICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgICAgbGlzdGVuZXJbMF0odGhpcylcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBjYXRjaCAoZSkge1xyXG4gICAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoZSlcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBicmVha1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgICBlbHNlIHtcclxuICAgICAgICB0cnkge1xyXG4gICAgICAgICAgbGlzdGVuZXJbMF0odGhpcylcclxuICAgICAgICB9XHJcbiAgICAgICAgY2F0Y2ggKGUpIHtcclxuICAgICAgICAgIGNvbnNvbGUuZXJyb3IoZSlcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgIH1cclxuICAgIHRoaXMuJG5leHRTdGF0ZSA9IDBcclxuICB9XHJcbiAgc2V0U3RhdGUodmFsdWUpIHtcclxuICAgIHRoaXMuJHN0YXR1cyA9IFwiY2hhbmdlZFwiXHJcbiAgICBpZiAodGhpcy4kbmV4dFN0YXRlKSB7XHJcbiAgICAgIHRoaXMuJG5leHRTdGF0ZSA9IE9iamVjdC5hc3NpZ24odGhpcy4kbmV4dFN0YXRlLCB2YWx1ZSlcclxuICAgIH1cclxuICAgIGVsc2Uge1xyXG4gICAgICB0aGlzLiRuZXh0U3RhdGUgPSBPYmplY3QuYXNzaWduKHt9LCB2YWx1ZSlcclxuICAgICAgc2V0VGltZW91dCh0aGlzLmRpc3BhdGNoU3RhdGUsIDApXHJcbiAgICB9XHJcbiAgICBPYmplY3QuYXNzaWduKHRoaXMsIHZhbHVlKVxyXG4gIH1cclxuICB0ZXJtaW5hdGUoKSB7XHJcbiAgICB0aGlzLiRzdGF0dXMgPSBcInJlbGVhc2VkXCJcclxuICAgIHRoaXMuZGlzcGF0Y2hTdGF0ZSgpXHJcbiAgfVxyXG59XHJcbiJdfQ==