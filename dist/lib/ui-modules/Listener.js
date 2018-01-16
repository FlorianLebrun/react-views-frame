"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require("react");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Listener = function (_Component) {
  _inherits(Listener, _Component);

  function Listener() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, Listener);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = Listener.__proto__ || Object.getPrototypeOf(Listener)).call.apply(_ref, [this].concat(args))), _this), _this.handleChange = function (value) {
      var onChange = _this.props.onChange;

      onChange && onChange(value);
      _this.forceUpdate();
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(Listener, [{
    key: "componentWillMount",
    value: function componentWillMount() {
      var value = this.props.value;

      value && value.listenState(this.handleChange);
    }
  }, {
    key: "componentWillReceiveProps",
    value: function componentWillReceiveProps(nextProps) {
      var nextValue = nextProps.value;
      var prevValue = this.props.value;
      if (nextValue !== prevValue) {
        prevValue && prevValue.unlistenState(this.handleChange);
        nextValue && nextValue.listenState(this.handleChange);
      }
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      var value = this.props.value;

      value && value.unlistenState(this.handleChange);
    }
  }, {
    key: "render",
    value: function render() {
      var children = this.props.children;

      if (children instanceof Function) {
        return children(this.props);
      } else {
        return children;
      }
    }
  }]);

  return Listener;
}(_react.Component);

exports.default = Listener;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9saWIvdWktbW9kdWxlcy9MaXN0ZW5lci5qcyJdLCJuYW1lcyI6WyJMaXN0ZW5lciIsImhhbmRsZUNoYW5nZSIsInZhbHVlIiwib25DaGFuZ2UiLCJwcm9wcyIsImZvcmNlVXBkYXRlIiwibGlzdGVuU3RhdGUiLCJuZXh0UHJvcHMiLCJuZXh0VmFsdWUiLCJwcmV2VmFsdWUiLCJ1bmxpc3RlblN0YXRlIiwiY2hpbGRyZW4iLCJGdW5jdGlvbiJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7QUFBQTs7Ozs7Ozs7SUFFcUJBLFE7Ozs7Ozs7Ozs7Ozs7OzBMQW1CbkJDLFksR0FBZSxVQUFDQyxLQUFELEVBQVc7QUFBQSxVQUNoQkMsUUFEZ0IsR0FDSCxNQUFLQyxLQURGLENBQ2hCRCxRQURnQjs7QUFFeEJBLGtCQUFZQSxTQUFTRCxLQUFULENBQVo7QUFDQSxZQUFLRyxXQUFMO0FBQ0QsSzs7Ozs7eUNBcEJvQjtBQUFBLFVBQ1hILEtBRFcsR0FDRCxLQUFLRSxLQURKLENBQ1hGLEtBRFc7O0FBRW5CQSxlQUFTQSxNQUFNSSxXQUFOLENBQWtCLEtBQUtMLFlBQXZCLENBQVQ7QUFDRDs7OzhDQUN5Qk0sUyxFQUFXO0FBQ25DLFVBQU1DLFlBQVlELFVBQVVMLEtBQTVCO0FBQ0EsVUFBTU8sWUFBWSxLQUFLTCxLQUFMLENBQVdGLEtBQTdCO0FBQ0EsVUFBSU0sY0FBY0MsU0FBbEIsRUFBNkI7QUFDM0JBLHFCQUFhQSxVQUFVQyxhQUFWLENBQXdCLEtBQUtULFlBQTdCLENBQWI7QUFDQU8scUJBQWFBLFVBQVVGLFdBQVYsQ0FBc0IsS0FBS0wsWUFBM0IsQ0FBYjtBQUNEO0FBQ0Y7OzsyQ0FDc0I7QUFBQSxVQUNiQyxLQURhLEdBQ0gsS0FBS0UsS0FERixDQUNiRixLQURhOztBQUVyQkEsZUFBU0EsTUFBTVEsYUFBTixDQUFvQixLQUFLVCxZQUF6QixDQUFUO0FBQ0Q7Ozs2QkFNUTtBQUFBLFVBQ0NVLFFBREQsR0FDYyxLQUFLUCxLQURuQixDQUNDTyxRQUREOztBQUVQLFVBQUlBLG9CQUFvQkMsUUFBeEIsRUFBa0M7QUFDaEMsZUFBT0QsU0FBUyxLQUFLUCxLQUFkLENBQVA7QUFDRCxPQUZELE1BR0s7QUFDSCxlQUFPTyxRQUFQO0FBQ0Q7QUFDRjs7Ozs7O2tCQWhDa0JYLFEiLCJmaWxlIjoiTGlzdGVuZXIuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQgfSBmcm9tIFwicmVhY3RcIlxyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgTGlzdGVuZXIgZXh0ZW5kcyBDb21wb25lbnQ8dm9pZCwgT2JqZWN0LCB2b2lkPiB7XHJcbiAgcHJvcHM6IE9iamVjdFxyXG5cclxuICBjb21wb25lbnRXaWxsTW91bnQoKSB7XHJcbiAgICBjb25zdCB7IHZhbHVlIH0gPSB0aGlzLnByb3BzXHJcbiAgICB2YWx1ZSAmJiB2YWx1ZS5saXN0ZW5TdGF0ZSh0aGlzLmhhbmRsZUNoYW5nZSlcclxuICB9XHJcbiAgY29tcG9uZW50V2lsbFJlY2VpdmVQcm9wcyhuZXh0UHJvcHMpIHtcclxuICAgIGNvbnN0IG5leHRWYWx1ZSA9IG5leHRQcm9wcy52YWx1ZVxyXG4gICAgY29uc3QgcHJldlZhbHVlID0gdGhpcy5wcm9wcy52YWx1ZVxyXG4gICAgaWYgKG5leHRWYWx1ZSAhPT0gcHJldlZhbHVlKSB7XHJcbiAgICAgIHByZXZWYWx1ZSAmJiBwcmV2VmFsdWUudW5saXN0ZW5TdGF0ZSh0aGlzLmhhbmRsZUNoYW5nZSlcclxuICAgICAgbmV4dFZhbHVlICYmIG5leHRWYWx1ZS5saXN0ZW5TdGF0ZSh0aGlzLmhhbmRsZUNoYW5nZSlcclxuICAgIH1cclxuICB9XHJcbiAgY29tcG9uZW50V2lsbFVubW91bnQoKSB7XHJcbiAgICBjb25zdCB7IHZhbHVlIH0gPSB0aGlzLnByb3BzXHJcbiAgICB2YWx1ZSAmJiB2YWx1ZS51bmxpc3RlblN0YXRlKHRoaXMuaGFuZGxlQ2hhbmdlKVxyXG4gIH1cclxuICBoYW5kbGVDaGFuZ2UgPSAodmFsdWUpID0+IHtcclxuICAgIGNvbnN0IHsgb25DaGFuZ2UgfSA9IHRoaXMucHJvcHNcclxuICAgIG9uQ2hhbmdlICYmIG9uQ2hhbmdlKHZhbHVlKVxyXG4gICAgdGhpcy5mb3JjZVVwZGF0ZSgpXHJcbiAgfVxyXG4gIHJlbmRlcigpIHtcclxuICAgIGNvbnN0IHsgY2hpbGRyZW4gfSA9IHRoaXMucHJvcHNcclxuICAgIGlmIChjaGlsZHJlbiBpbnN0YW5jZW9mIEZ1bmN0aW9uKSB7XHJcbiAgICAgIHJldHVybiBjaGlsZHJlbih0aGlzLnByb3BzKVxyXG4gICAgfVxyXG4gICAgZWxzZSB7XHJcbiAgICAgIHJldHVybiBjaGlsZHJlblxyXG4gICAgfVxyXG4gIH1cclxufVxyXG4iXX0=