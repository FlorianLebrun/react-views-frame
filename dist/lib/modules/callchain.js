"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var CallSite = exports.CallSite = function () {
  function CallSite(self, proc, args) {
    _classCallCheck(this, CallSite);

    this.status = -1;
    this.self = self;
    this.proc = proc;
    this.args = args;
  } // -1: not stacked, 0: pending, 1: working, 2:resolved, 3:rejected

  _createClass(CallSite, [{
    key: "containOf",
    value: function containOf(proc) {
      for (var c = this; c; c = c.back) {
        if (c.proc === proc && c.status < 2) {
          return c;
        }
      }
    }
  }, {
    key: "abortAllOf",
    value: function abortAllOf(proc) {
      for (var c = this; c; c = c.back) {
        if (c.proc === proc && c.status < 2) {
          this.abort("aborted");
        }
      }
    }
  }, {
    key: "abort",
    value: function abort(data) {
      if (this.status < 2) {
        this.status = 3;
        this._data = data;
        this._reject && this._reject(data);
        var nextCall = this.next;
        if (nextCall) {
          this.next.back = null;
          this.next = null;
          nextCall._do();
        }
      } else if (this.status < 3) {
        throw new Error("'abort/complete' cannot applied twice on CallSite");
      }
    }
  }, {
    key: "complete",
    value: function complete(data) {
      if (this.status < 2) {
        this.status = 2;
        this._data = data;
        this._resolve && this._resolve(data);
        var nextCall = this.next;
        if (nextCall) {
          this.next.back = null;
          this.next = null;
          nextCall._do();
        }
      } else if (this.status < 3) {
        throw new Error("'abort/complete' cannot applied twice on CallSite");
      }
    }
  }, {
    key: "when",
    value: function when() {
      var _this = this;

      if (!this._when) {
        switch (this.status) {
          case 2:
            this._when = Promise.resolve(this._data);
            break;
          case 3:
            this._when = Promise.reject(this._data);
            break;
          default:
            this._when = new Promise(function (_resolve, _reject) {
              _this._resolve = _resolve;
              _this._reject = _reject;
            });
        }
      }
      return this._when;
    }
  }, {
    key: "_do",
    value: function _do() {
      var _this2 = this;

      if (this.status < 1) {
        this.status = 1;
        try {
          var result = this.proc.apply(this.self, this.args);
          if (result instanceof Promise) {
            result.then(function (data) {
              _this2.complete(data);
            }, function (e) {
              _this2.abort(e);
            });
          } else {
            this.complete(result);
          }
        } catch (e) {
          this.abort(e);
        }
      } else {
        throw new Error("'_do' cannot applied twice on CallSite");
      }
    }
  }, {
    key: "execute",
    value: function execute(after) {
      if (this.status < 0) {
        this.status = 0;
        if (after) {
          if (after.next) {
            this.next = after.next;
            this.next.back = this;
          }
          if (after.status < 2 || after.back) {
            this.back = after;
            after.next = this;
          }
        }
        if (!this.back) {
          this._do();
        }
      } else {
        throw new Error("'execute' cannot applied twice on CallSite");
      }
    }
  }]);

  return CallSite;
}();

var CallChain = function () {
  function CallChain() {
    _classCallCheck(this, CallChain);
  }

  _createClass(CallChain, [{
    key: "call",
    value: function call(self, proc, args) {
      var call = new CallSite(self, proc, args);
      call.execute(this.tos);
      this.tos = call;
      return call;
    }
  }, {
    key: "abortAllOf",
    value: function abortAllOf(proc) {
      return this.tos && this.tos.abortAllOf(proc);
    }
  }, {
    key: "containOf",
    value: function containOf(proc) {
      return this.tos && this.tos.containOf(proc);
    }
  }]);

  return CallChain;
}();

exports.default = CallChain;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9saWIvbW9kdWxlcy9jYWxsY2hhaW4uanMiXSwibmFtZXMiOlsiQ2FsbFNpdGUiLCJzZWxmIiwicHJvYyIsImFyZ3MiLCJzdGF0dXMiLCJjIiwiYmFjayIsImFib3J0IiwiZGF0YSIsIl9kYXRhIiwiX3JlamVjdCIsIm5leHRDYWxsIiwibmV4dCIsIl9kbyIsIkVycm9yIiwiX3Jlc29sdmUiLCJfd2hlbiIsIlByb21pc2UiLCJyZXNvbHZlIiwicmVqZWN0IiwicmVzdWx0IiwiYXBwbHkiLCJ0aGVuIiwiY29tcGxldGUiLCJlIiwiYWZ0ZXIiLCJDYWxsQ2hhaW4iLCJjYWxsIiwiZXhlY3V0ZSIsInRvcyIsImFib3J0QWxsT2YiLCJjb250YWluT2YiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7SUFDYUEsUSxXQUFBQSxRO0FBY1gsb0JBQVlDLElBQVosRUFBa0JDLElBQWxCLEVBQXdCQyxJQUF4QixFQUE4QjtBQUFBOztBQUM1QixTQUFLQyxNQUFMLEdBQWMsQ0FBQyxDQUFmO0FBQ0EsU0FBS0gsSUFBTCxHQUFZQSxJQUFaO0FBQ0EsU0FBS0MsSUFBTCxHQUFZQSxJQUFaO0FBQ0EsU0FBS0MsSUFBTCxHQUFZQSxJQUFaO0FBQ0QsRyxDQWxCYzs7Ozs4QkFtQkxELEksRUFBZ0I7QUFDeEIsV0FBSyxJQUFJRyxJQUFJLElBQWIsRUFBbUJBLENBQW5CLEVBQXNCQSxJQUFJQSxFQUFFQyxJQUE1QixFQUFrQztBQUNoQyxZQUFJRCxFQUFFSCxJQUFGLEtBQVdBLElBQVgsSUFBbUJHLEVBQUVELE1BQUYsR0FBVyxDQUFsQyxFQUFxQztBQUNuQyxpQkFBT0MsQ0FBUDtBQUNEO0FBQ0Y7QUFDRjs7OytCQUNVSCxJLEVBQU07QUFDZixXQUFLLElBQUlHLElBQUksSUFBYixFQUFtQkEsQ0FBbkIsRUFBc0JBLElBQUlBLEVBQUVDLElBQTVCLEVBQWtDO0FBQ2hDLFlBQUlELEVBQUVILElBQUYsS0FBV0EsSUFBWCxJQUFtQkcsRUFBRUQsTUFBRixHQUFX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LGFBQUtBLE1BQUwsR0FBYyxDQUFkO0FBQ0EsWUFBSXFCLEtBQUosRUFBVztBQUNULGNBQUlBLE1BQU1iLElBQVYsRUFBZ0I7QUFDZCxpQkFBS0EsSUFBTCxHQUFZYSxNQUFNYixJQUFsQjtBQUNBLGlCQUFLQSxJQUFMLENBQVVOLElBQVYsR0FBaUIsSUFBakI7QUFDRDtBQUNELGNBQUltQixNQUFNckIsTUFBTixHQUFlLENBQWYsSUFBb0JxQixNQUFNbkIsSUFBOUIsRUFBb0M7QUFDbEMsaUJBQUtBLElBQUwsR0FBWW1CLEtBQVo7QUFDQUEsa0JBQU1iLElBQU4sR0FBYSxJQUFiO0FBQ0Q7QUFDRjtBQUNELFlBQUksQ0FBQyxLQUFLTixJQUFWLEVBQWdCO0FBQ2QsZUFBS08sR0FBTDtBQUNEO0FBQ0YsT0FmRCxNQWdCSztBQUNILGNBQU0sSUFBSUMsS0FBSixDQUFVLDRDQUFWLENBQU47QUFDRDtBQUNGOzs7Ozs7SUFHa0JZLFM7Ozs7Ozs7eUJBRWR6QixJLEVBQU1DLEksRUFBTUMsSSxFQUFnQjtBQUMvQixVQUFNd0IsT0FBTyxJQUFJM0IsUUFBSixDQUFhQyxJQUFiLEVBQW1CQyxJQUFuQixFQUF5QkMsSUFBekIsQ0FBYjtBQUNBd0IsV0FBS0MsT0FBTCxDQUFhLEtBQUtDLEdBQWxCO0FBQ0EsV0FBS0EsR0FBTCxHQUFXRixJQUFYO0FBQ0EsYUFBT0EsSUFBUDtBQUNEOzs7K0JBQ1V6QixJLEVBQWdCO0FBQ3pCLGFBQU8sS0FBSzJCLEdBQUwsSUFBWSxLQUFLQSxHQUFMLENBQVNDLFVBQVQsQ0FBb0I1QixJQUFwQixDQUFuQjtBQUNEOzs7OEJBQ1NBLEksRUFBMEI7QUFDbEMsYUFBTyxLQUFLMkIsR0FBTCxJQUFZLEtBQUtBLEdBQUwsQ0FBU0UsU0FBVCxDQUFtQjdCLElBQW5CLENBQW5CO0FBQ0Q7Ozs7OztrQkFia0J3QixTIiwiZmlsZSI6ImNhbGxjaGFpbi5qcyIsInNvdXJjZXNDb250ZW50IjpbIlxyXG5leHBvcnQgY2xhc3MgQ2FsbFNpdGUge1xyXG4gIHN0YXR1czogbnVtYmVyIC8vIC0xOiBub3Qgc3RhY2tlZCwgMDogcGVuZGluZywgMTogd29ya2luZywgMjpyZXNvbHZlZCwgMzpyZWplY3RlZFxyXG5cclxuICBzZWxmOiBPYmplY3RcclxuICBwcm9jOiBGdW5jdGlvblxyXG4gIGFyZ3M6IEFycmF5PGFueT5cclxuICBuZXh0OiBDYWxsU2l0ZVxyXG4gIGJhY2s6IENhbGxTaXRlXHJcblxyXG4gIF93aGVuOiBQcm9taXNlXHJcbiAgX3Jlc29sdmU6IEZ1bmN0aW9uXHJcbiAgX3JlamVjdDogRnVuY3Rpb25cclxuICBfZGF0YTogYW55XHJcblxyXG4gIGNvbnN0cnVjdG9yKHNlbGYsIHByb2MsIGFyZ3MpIHtcclxuICAgIHRoaXMuc3RhdHVzID0gLTFcclxuICAgIHRoaXMuc2VsZiA9IHNlbGZcclxuICAgIHRoaXMucHJvYyA9IHByb2NcclxuICAgIHRoaXMuYXJncyA9IGFyZ3NcclxuICB9XHJcbiAgY29udGFpbk9mKHByb2MpOiBDYWxsU2l0ZSB7XHJcbiAgICBmb3IgKGxldCBjID0gdGhpczsgYzsgYyA9IGMuYmFjaykge1xyXG4gICAgICBpZiAoYy5wcm9jID09PSBwcm9jICYmIGMuc3RhdHVzIDwgMikge1xyXG4gICAgICAgIHJldHVybiBjXHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9XHJcbiAgYWJvcnRBbGxPZihwcm9jKSB7XHJcbiAgICBmb3IgKGxldCBjID0gdGhpczsgYzsgYyA9IGMuYmFjaykge1xyXG4gICAgICBpZiAoYy5wcm9jID09PSBwcm9jICYmIGMuc3RhdHVzIDwgMikge1xyXG4gICAgICAgIHRoaXMuYWJvcnQoXCJhYm9ydGVkXCIpXHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9XHJcbiAgYWJvcnQoZGF0YSkge1xyXG4gICAgaWYgKHRoaXMuc3RhdHVzIDwgMikge1xyXG4gICAgICB0aGlzLnN0YXR1cyA9IDNcclxuICAgICAgdGhpcy5fZGF0YSA9IGRhdGFcclxuICAgICAgdGhpcy5fcmVqZWN0ICYmIHRoaXMuX3JlamVjdChkYXRhKVxyXG4gICAgICBjb25zdCBuZXh0Q2FsbCA9IHRoaXMubmV4dFxyXG4gICAgICBpZiAobmV4dENhbGwpIHtcclxuICAgICAgICB0aGlzLm5leHQuYmFjayA9IG51bGxcclxuICAgICAgICB0aGlzLm5leHQgPSBudWxsXHJcbiAgICAgICAgbmV4dENhbGwuX2RvKClcclxuICAgICAgfVxyXG4gICAgfVxyXG4gICAgZWxzZSBpZiAodGhpcy5zdGF0dXMgPCAzKSB7XHJcbiAgICAgIHRocm93IG5ldyBFcnJvcihcIidhYm9ydC9jb21wbGV0ZScgY2Fubm90IGFwcGxpZWQgdHdpY2Ugb24gQ2FsbFNpdGVcIilcclxuICAgIH1cclxuICB9XHJcbiAgY29tcGxldGUoZGF0YSkge1xyXG4gICAgaWYgKHRoaXMuc3RhdHVzIDwgMikge1xyXG4gICAgICB0aGlzLnN0YXR1cyA9IDJcclxuICAgICAgdGhpcy5fZGF0YSA9IGRhdGFcclxuICAgICAgdGhpcy5fcmVzb2x2ZSAmJiB0aGlzLl9yZXNvbHZlKGRhdGEpXHJcbiAgICAgIGNvbnN0IG5leHRDYWxsID0gdGhpcy5uZXh0XHJcbiAgICAgIGlmIChuZXh0Q2FsbCkge1xyXG4gICAgICAgIHRoaXMubmV4dC5iYWNrID0gbnVsbFxyXG4gICAgICAgIHRoaXMubmV4dCA9IG51bGxcclxuICAgICAgICBuZXh0Q2FsbC5fZG8oKVxyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgICBlbHNlIGlmICh0aGlzLnN0YXR1cyA8IDMpIHtcclxuICAgICAgdGhyb3cgbmV3IEVycm9yKFwiJ2Fib3J0L2NvbXBsZXRlJyBjYW5ub3QgYXBwbGllZCB0d2ljZSBvbiBDYWxsU2l0ZVwiKVxyXG4gICAgfVxyXG4gIH1cclxuICB3aGVuKCkge1xyXG4gICAgaWYgKCF0aGlzLl93aGVuKSB7XHJcbiAgICAgIHN3aXRjaCAodGhpcy5zdGF0dXMpIHtcclxuICAgICAgICBjYXNlIDI6XHJcbiAgICAgICAgICB0aGlzLl93aGVuID0gUHJvbWlzZS5yZXNvbHZlKHRoaXMuX2RhdGEpXHJcbiAgICAgICAgICBicmVha1xyXG4gICAgICAgIGNhc2UgMzpcclxuICAgICAgICAgIHRoaXMuX3doZW4gPSBQcm9taXNlLnJlamVjdCh0aGlzLl9kYXRhKVxyXG4gICAgICAgICAgYnJlYWtcclxuICAgICAgICBkZWZhdWx0OlxyXG4gICAgICAgICAgdGhpcy5fd2hlbiA9IG5ldyBQcm9taXNlKChfcmVzb2x2ZSwgX3JlamVjdCkgPT4ge1xyXG4gICAgICAgICAgICB0aGlzLl9yZXNvbHZlID0gX3Jlc29sdmVcclxuICAgICAgICAgICAgdGhpcy5fcmVqZWN0ID0gX3JlamVjdFxyXG4gICAgICAgICAgfSlcclxuICAgICAgfVxyXG4gICAgfVxyXG4gICAgcmV0dXJuIHRoaXMuX3doZW5cclxuICB9XHJcbiAgX2RvKCkge1xyXG4gICAgaWYgKHRoaXMuc3RhdHVzIDwgMSkge1xyXG4gICAgICB0aGlzLnN0YXR1cyA9IDFcclxuICAgICAgdHJ5IHtcclxuICAgICAgICBsZXQgcmVzdWx0ID0gdGhpcy5wcm9jLmFwcGx5KHRoaXMuc2VsZiwgdGhpcy5hcmdzKVxyXG4gICAgICAgIGlmIChyZXN1bHQgaW5zdGFuY2VvZiBQcm9taXNlKSB7XHJcbiAgICAgICAgICByZXN1bHQudGhlbihkYXRhID0+IHtcclxuICAgICAgICAgICAgdGhpcy5jb21wbGV0ZShkYXRhKVxyXG4gICAgICAgICAgfSwgZSA9PiB7XHJcbiAgICAgICAgICAgIHRoaXMuYWJvcnQoZSlcclxuICAgICAgICAgIH0pXHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgdGhpcy5jb21wbGV0ZShyZXN1bHQpXHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICAgIGNhdGNoIChlKSB7XHJcbiAgICAgICAgdGhpcy5hYm9ydChlKVxyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgICBlbHNlIHtcclxuICAgICAgdGhyb3cgbmV3IEVycm9yKFwiJ19kbycgY2Fubm90IGFwcGxpZWQgdHdpY2Ugb24gQ2FsbFNpdGVcIilcclxuICAgIH1cclxuICB9XHJcbiAgZXhlY3V0ZShhZnRlcjogQ2FsbFNpdGUpIHtcclxuICAgIGlmICh0aGlzLnN0YXR1cyA8IDApIHtcclxuICAgICAgdGhpcy5zdGF0dXMgPSAwXHJcbiAgICAgIGlmIChhZnRlcikge1xyXG4gICAgICAgIGlmIChhZnRlci5uZXh0KSB7XHJcbiAgICAgICAgICB0aGlzLm5leHQgPSBhZnRlci5uZXh0XHJcbiAgICAgICAgICB0aGlzLm5leHQuYmFjayA9IHRoaXNcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKGFmdGVyLnN0YXR1cyA8IDIgfHwgYWZ0ZXIuYmFjaykge1xyXG4gICAgICAgICAgdGhpcy5iYWNrID0gYWZ0ZXJcclxuICAgICAgICAgIGFmdGVyLm5leHQgPSB0aGlzXHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICAgIGlmICghdGhpcy5iYWNrKSB7XHJcbiAgICAgICAgdGhpcy5fZG8oKVxyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgICBlbHNlIHtcclxuICAgICAgdGhyb3cgbmV3IEVycm9yKFwiJ2V4ZWN1dGUnIGNhbm5vdCBhcHBsaWVkIHR3aWNlIG9uIENhbGxTaXRlXCIpXHJcbiAgICB9XHJcbiAgfVxyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBDYWxsQ2hhaW4ge1xyXG4gIHRvczogQ2FsbFNpdGVcclxuICBjYWxsKHNlbGYsIHByb2MsIGFyZ3MpOiBDYWxsU2l0ZSB7XHJcbiAgICBjb25zdCBjYWxsID0gbmV3IENhbGxTaXRlKHNlbGYsIHByb2MsIGFyZ3MpXHJcbiAgICBjYWxsLmV4ZWN1dGUodGhpcy50b3MpXHJcbiAgICB0aGlzLnRvcyA9IGNhbGxcclxuICAgIHJldHVybiBjYWxsXHJcbiAgfVxyXG4gIGFib3J0QWxsT2YocHJvYzogRnVuY3Rpb24pIHtcclxuICAgIHJldHVybiB0aGlzLnRvcyAmJiB0aGlzLnRvcy5hYm9ydEFsbE9mKHByb2MpXHJcbiAgfVxyXG4gIGNvbnRhaW5PZihwcm9jOiBGdW5jdGlvbik6IENhbGxTaXRlIHtcclxuICAgIHJldHVybiB0aGlzLnRvcyAmJiB0aGlzLnRvcy5jb250YWluT2YocHJvYylcclxuICB9XHJcbn1cclxuIl19