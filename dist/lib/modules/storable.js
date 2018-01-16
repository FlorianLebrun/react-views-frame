"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _listenable = require("./listenable");

var _listenable2 = _interopRequireDefault(_listenable);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Storable = function (_Listenable) {
  _inherits(Storable, _Listenable);

  function Storable(uid) {
    _classCallCheck(this, Storable);

    var _this = _possibleConstructorReturn(this, (Storable.__proto__ || Object.getPrototypeOf(Storable)).call(this));

    _this.uid = uid;
    return _this;
  }

  _createClass(Storable, [{
    key: "load",
    value: function load() {
      try {
        var json = window.localStorage.getItem(this.uid);
        this.data = json ? JSON.parse(json) : this.defaultData();
      } catch (e) {
        this.data = this.defaultData();
      }
      this.$status = "stored";
      this.dispatchData(this.data);
      return this.data;
    }
  }, {
    key: "save",
    value: function save() {
      this.data = this.updateData();
      var new_json = JSON.stringify(this.data);
      var prev_json = window.localStorage.getItem(this.uid);
      if (new_json !== prev_json) {
        window.localStorage.setItem(this.uid, new_json);
      }
      this.$status = "stored";
      return this.data;
    }
  }, {
    key: "delete",
    value: function _delete() {
      this.terminate();
      window.localStorage.removeItem(this.uid);
    }
  }, {
    key: "defaultData",
    value: function defaultData() {
      return {};
    }
  }, {
    key: "dispatchData",
    value: function dispatchData(data) {}
  }, {
    key: "updateData",
    value: function updateData() {
      return this.data;
    }
  }]);

  return Storable;
}(_listenable2.default);

exports.default = Storable;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9saWIvbW9kdWxlcy9zdG9yYWJsZS5qcyJdLCJuYW1lcyI6WyJTdG9yYWJsZSIsInVpZCIsImpzb24iLCJ3aW5kb3ciLCJsb2NhbFN0b3JhZ2UiLCJnZXRJdGVtIiwiZGF0YSIsIkpTT04iLCJwYXJzZSIsImRlZmF1bHREYXRhIiwiZSIsIiRzdGF0dXMiLCJkaXNwYXRjaERhdGEiLCJ1cGRhdGVEYXRhIiwibmV3X2pzb24iLCJzdHJpbmdpZnkiLCJwcmV2X2pzb24iLCJzZXRJdGVtIiwidGVybWluYXRlIiwicmVtb3ZlSXRlbSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7QUFBQTs7Ozs7Ozs7Ozs7O0lBRXFCQSxROzs7QUFJbkIsb0JBQVlDLEdBQVosRUFBeUI7QUFBQTs7QUFBQTs7QUFFdkIsVUFBS0EsR0FBTCxHQUFXQSxHQUFYO0FBRnVCO0FBR3hCOzs7OzJCQUNjO0FBQ2IsVUFBSTtBQUNGLFlBQU1DLE9BQU9DLE9BQU9DLFlBQVAsQ0FBb0JDLE9BQXBCLENBQTRCLEtBQUtKLEdBQWpDLENBQWI7QUFDQSxhQUFLSyxJQUFMLEdBQVlKLE9BQU9LLEtBQUtDLEtBQUwsQ0FBV04sSUFBWCxDQUFQLEdBQTBCLEtBQUtPLFdBQUwsRUFBdEM7QUFDRCxPQUhELENBSUEsT0FBT0MsQ0FBUCxFQUFVO0FBQUUsYUFBS0osSUFBTCxHQUFZLEtBQUtHLFdBQUwsRUFBWjtBQUFnQztBQUM1QyxXQUFLRSxPQUFMLEdBQWUsUUFBZjtBQUNBLFdBQUtDLFlBQUwsQ0FBa0IsS0FBS04sSUFBdkI7QUFDQSxhQUFPLEtBQUtBLElBQVo7QUFDRDs7OzJCQUNjO0FBQ2IsV0FBS0EsSUFBTCxHQUFZLEtBQUtPLFVBQUwsRUFBWjtBQUNBLFVBQU1DLFdBQVdQLEtBQUtRLFNBQUwsQ0FBZSxLQUFLVCxJQUFwQixDQUFqQjtBQUNBLFVBQU1VLFlBQVliLE9BQU9DLFlBQVAsQ0FBb0JDLE9BQXBCLENBQTRCLEtBQUtKLEdBQWpDLENBQWxCO0FBQ0EsVUFBSWEsYUFBYUUsU0FBakIsRUFBNEI7QUFDMUJiLGVBQU9DLFlBQVAsQ0FBb0JhLE9BQXBCLENBQTRCLEtBQUtoQixHQUFqQyxFQUFzQ2EsUUFBdEM7QUFDRDtBQUNELFdBQUtILE9BQUwsR0FBZSxRQUFmO0FBQ0EsYUFBTyxLQUFLTCxJQUFaO0FBQ0Q7Ozs4QkFDUTtBQUNQLFdBQUtZLFNBQUw7QUFDQWYsYUFBT0MsWUFBUCxDQUFvQmUsVUFBcEIsQ0FBK0IsS0FBS2xCLEdBQXBDO0FBQ0Q7OztrQ0FDYTtBQUNaLGFBQU8sRUFBUDtBQUNEOzs7aUNBQ1lLLEksRUFBYyxDQUMxQjs7O2lDQUNvQjtBQUNuQixhQUFPLEtBQUtBLElBQVo7QUFDRDs7Ozs7O2tCQXZDa0JOLFEiLCJmaWxlIjoic3RvcmFibGUuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgTGlzdGVuYWJsZSBmcm9tIFwiLi9saXN0ZW5hYmxlXCJcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFN0b3JhYmxlIGV4dGVuZHMgTGlzdGVuYWJsZSB7XHJcbiAgdWlkOiBzdHJpbmdcclxuICBkYXRhOiBPYmplY3RcclxuXHJcbiAgY29uc3RydWN0b3IodWlkOiBzdHJpbmcpIHtcclxuICAgIHN1cGVyKClcclxuICAgIHRoaXMudWlkID0gdWlkXHJcbiAgfVxyXG4gIGxvYWQoKTogT2JqZWN0IHtcclxuICAgIHRyeSB7XHJcbiAgICAgIGNvbnN0IGpzb24gPSB3aW5kb3cubG9jYWxTdG9yYWdlLmdldEl0ZW0odGhpcy51aWQpXHJcbiAgICAgIHRoaXMuZGF0YSA9IGpzb24gPyBKU09OLnBhcnNlKGpzb24pIDogdGhpcy5kZWZhdWx0RGF0YSgpXHJcbiAgICB9XHJcbiAgICBjYXRjaCAoZSkgeyB0aGlzLmRhdGEgPSB0aGlzLmRlZmF1bHREYXRhKCkgfVxyXG4gICAgdGhpcy4kc3RhdHVzID0gXCJzdG9yZWRcIlxyXG4gICAgdGhpcy5kaXNwYXRjaERhdGEodGhpcy5kYXRhKVxyXG4gICAgcmV0dXJuIHRoaXMuZGF0YVxyXG4gIH1cclxuICBzYXZlKCk6IE9iamVjdCB7XHJcbiAgICB0aGlzLmRhdGEgPSB0aGlzLnVwZGF0ZURhdGEoKVxyXG4gICAgY29uc3QgbmV3X2pzb24gPSBKU09OLnN0cmluZ2lmeSh0aGlzLmRhdGEpXHJcbiAgICBjb25zdCBwcmV2X2pzb24gPSB3aW5kb3cubG9jYWxTdG9yYWdlLmdldEl0ZW0odGhpcy51aWQpXHJcbiAgICBpZiAobmV3X2pzb24gIT09IHByZXZfanNvbikge1xyXG4gICAgICB3aW5kb3cubG9jYWxTdG9yYWdlLnNldEl0ZW0odGhpcy51aWQsIG5ld19qc29uKVxyXG4gICAgfVxyXG4gICAgdGhpcy4kc3RhdHVzID0gXCJzdG9yZWRcIlxyXG4gICAgcmV0dXJuIHRoaXMuZGF0YVxyXG4gIH1cclxuICBkZWxldGUoKSB7XHJcbiAgICB0aGlzLnRlcm1pbmF0ZSgpXHJcbiAgICB3aW5kb3cubG9jYWxTdG9yYWdlLnJlbW92ZUl0ZW0odGhpcy51aWQpXHJcbiAgfVxyXG4gIGRlZmF1bHREYXRhKCkge1xyXG4gICAgcmV0dXJuIHt9XHJcbiAgfVxyXG4gIGRpc3BhdGNoRGF0YShkYXRhOiBPYmplY3QpIHtcclxuICB9XHJcbiAgdXBkYXRlRGF0YSgpOiBPYmplY3Qge1xyXG4gICAgcmV0dXJuIHRoaXMuZGF0YVxyXG4gIH1cclxufVxyXG4iXX0=