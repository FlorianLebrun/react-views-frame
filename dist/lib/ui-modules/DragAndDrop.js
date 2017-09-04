"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DragDropZone = exports.DropZone = exports.DragZone = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _event = require("./event.utils");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /* eslint-disable react/no-string-refs */
/* eslint-disable react/no-multi-comp */
/* eslint-disable no-use-before-define */


var draggedZone = null;
var dropSuggested = null;
var dropRegistry = [];

function SelectDropSuggested(zone) {
  if (dropSuggested) {
    dropSuggested.unselect();
  }
  zone.select();
  dropSuggested = zone;
}

function UnselectDropSuggested(zone) {
  zone.unselect();
  if (dropSuggested === zone) {
    dropSuggested = null;
  }
}

function RegisterDropZone(zone) {
  zone.zoneId = dropRegistry.length;
  dropRegistry.push(zone);
}

function UnregisterDropZone(zone) {
  var lzone = dropRegistry[dropRegistry.length - 1];
  lzone.zoneId = zone.zoneId;
  zone.zoneId = undefined;
  dropRegistry[lzone.zoneId] = lzone;
  dropRegistry.pop();
}

function FocusDropZone(data) {
  dropRegistry.forEach(function (x) {
    return x.activate(data);
  });
}

function BlurDropZone() {
  dropRegistry.forEach(function (x) {
    return x.deactivate();
  });
}

function objectToDataTransfert(obj, dataTransfer) {
  Object.keys(obj).forEach(function (key) {
    if (key !== "dragImage") {
      dataTransfer.setData(key, JSON.stringify(obj[key]));
    }
  });
  if (obj.dragImage) {
    dataTransfer.setDragImage(obj.dragImage.element, obj.dragImage.left || 0, obj.dragImage.top || 0);
  }
}

function dataTransfertToObject(dataTransfer) {
  var obj = {};
  dataTransfer.types.forEach(function (key) {
    try {
      obj[key] = JSON.parse(dataTransfer.getData(key));
    } catch (e) {
      // Nothing
    }
  });
  return obj;
}

var DragZone = exports.DragZone = function (_Component) {
  _inherits(DragZone, _Component);

  function DragZone() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, DragZone);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = DragZone.__proto__ || Object.getPrototypeOf(DragZone)).call.apply(_ref, [this].concat(args))), _this), _this.handleDragStart = function (evt) {
      var bag = _this.props.onDragStart && _this.props.onDragStart(evt);
      if (bag) {
        draggedZone = _this;
        evt.stopPropagation();
        objectToDataTransfert(bag, evt.dataTransfer);
        FocusDropZone(bag);
      }
    }, _this.handleDragEnd = function (evt) {
      evt.stopPropagation();
      _this.dragComplete();
      BlurDropZone();
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(DragZone, [{
    key: "dragComplete",
    value: function dragComplete(data) {
      if (draggedZone === this) {
        this.props.onDragEnd && this.props.onDragEnd(data || {});
      }
      draggedZone = null;
    }
  }, {
    key: "render",
    value: function render() {
      // eslint-disable-next-line no-unused-vars
      var _props = this.props,
          onDragStart = _props.onDragStart,
          onDragEnd = _props.onDragEnd,
          otherProps = _objectWithoutProperties(_props, ["onDragStart", "onDragEnd"]);

      return _react2.default.createElement("div", _extends({
        style: this.props.style,
        draggable: true,
        onMouseDown: _event.stopPropagation,
        onDragStart: this.handleDragStart,
        onDragEnd: this.handleDragEnd
      }, otherProps));
    }
  }]);

  return DragZone;
}(_react.Component);

var DropZone = exports.DropZone = function (_Component2) {
  _inherits(DropZone, _Component2);

  function DropZone() {
    var _ref2;

    var _temp2, _this2, _ret2;

    _classCallCheck(this, DropZone);

    for (var _len2 = arguments.length, args = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
      args[_key2] = arguments[_key2];
    }

    return _ret2 = (_temp2 = (_this2 = _possibleConstructorReturn(this, (_ref2 = DropZone.__proto__ || Object.getPrototypeOf(DropZone)).call.apply(_ref2, [this].concat(args))), _this2), _this2.componentWillMount = function () {
      RegisterDropZone(_this2);
    }, _this2.componentWillUnmount = function () {
      UnregisterDropZone(_this2);
    }, _this2.zoneId = undefined, _this2.active = false, _this2.handleDrop = function (evt) {
      if (dropSuggested === _this2) {
        evt.stopPropagation();
        evt.preventDefault();
        UnselectDropSuggested(_this2);
        var rect = evt.currentTarget.getBoundingClientRect();
        var x = evt.clientX - rect.left;
        var y = evt.clientY - rect.top;
        var bag = dataTransfertToObject(evt.dataTransfer);
        try {
          var acknowledgment = _this2.props.onDrop && _this2.props.onDrop(bag, x, y);
          draggedZone && draggedZone.dragComplete(acknowledgment);
        } catch (e) {
          console.error(e);
        }
      }
    }, _this2.handleDragOver = function (evt) {
      if (dropSuggested === _this2 || !_this2.props.onDropMatch || _this2.props.onDropMatch(evt.dataTransfer.types)) {
        evt.preventDefault();
        evt.stopPropagation();
        SelectDropSuggested(_this2);
      }
    }, _this2.handleDragEnter = function (evt) {
      if (dropSuggested === _this2 || !_this2.props.onDropMatch || _this2.props.onDropMatch(evt.dataTransfer.types)) {
        evt.preventDefault();
        evt.stopPropagation();
        if (evt.currentTarget === _this2.refs.zone) {
          SelectDropSuggested(_this2);
        }
      }
    }, _this2.handleDragLeave = function (evt) {
      if (dropSuggested === _this2) {
        evt.preventDefault();
        evt.stopPropagation();
        UnselectDropSuggested(_this2);
      }
    }, _temp2), _possibleConstructorReturn(_this2, _ret2);
  }

  _createClass(DropZone, [{
    key: "activate",
    value: function activate(data) {
      var props = this.props;
      if (!props.isDroppable || props.isDroppable(data)) {
        this.active = true;
      } else {
        this.active = false;
      }
      var dom = this.refs.zone;
      if (this.active && props.highlightClassName) {
        dom.className = props.className + " " + props.highlightClassName;
      } else {
        dom.className = props.className;
      }
    }
  }, {
    key: "deactivate",
    value: function deactivate() {
      if (this.active) {
        var dom = this.refs.zone;
        dom.className = this.props.className;
        this.active = false;
      }
    }
  }, {
    key: "select",
    value: function select() {
      var props = this.props;
      var dom = this.refs.zone;
      if (this.active && props.selectedClassName) {
        if (props.highlightClassName) {
          dom.className = props.className + " " + props.highlightClassName + " " + props.selectedClassName;
        } else {
          dom.className = props.className + " " + props.selectedClassName;
        }
      } else {
        dom.className = props.className;
      }
    }
  }, {
    key: "unselect",
    value: function unselect() {
      var props = this.props;
      var dom = this.refs.zone;
      if (this.active && props.highlightClassName) {
        dom.className = props.className + " " + props.highlightClassName;
      } else {
        dom.className = props.className;
      }
    }
  }, {
    key: "render",
    value: function render() {
      var _props2 = this.props,
          onDrop = _props2.onDrop,
          onDropMatch = _props2.onDropMatch,
          onDropHightlight = _props2.onDropHightlight,
          selectedClassName = _props2.selectedClassName,
          highlightClassName = _props2.highlightClassName,
          isDroppable = _props2.isDroppable,
          otherProps = _objectWithoutProperties(_props2, ["onDrop", "onDropMatch", "onDropHightlight", "selectedClassName", "highlightClassName", "isDroppable"]);

      return _react2.default.createElement("div", _extends({
        ref: "zone",
        className: this.props.className,
        onDrop: this.handleDrop,
        onDragOver: this.handleDragOver,
        onDragEnter: this.handleDragEnter,
        onDragLeave: this.handleDragLeave
      }, otherProps));
    }
  }]);

  return DropZone;
}(_react.Component);

var DragDropZone = exports.DragDropZone = function (_DropZone) {
  _inherits(DragDropZone, _DropZone);

  function DragDropZone() {
    var _ref3;

    var _temp3, _this3, _ret3;

    _classCallCheck(this, DragDropZone);

    for (var _len3 = arguments.length, args = Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
      args[_key3] = arguments[_key3];
    }

    return _ret3 = (_temp3 = (_this3 = _possibleConstructorReturn(this, (_ref3 = DragDropZone.__proto__ || Object.getPrototypeOf(DragDropZone)).call.apply(_ref3, [this].concat(args))), _this3), _this3.handleDragStart = function (evt) {
      var bag = _this3.props.onDragStart && _this3.props.onDragStart(evt);
      if (bag) {
        evt.stopPropagation();
        objectToDataTransfert(bag, evt.dataTransfer);
        FocusDropZone(bag);
      }
    }, _this3.handleDragEnd = function (evt) {
      evt.stopPropagation();
      _this3.props.onDragEnd && _this3.props.onDragEnd(evt);
      BlurDropZone();
    }, _temp3), _possibleConstructorReturn(_this3, _ret3);
  }

  _createClass(DragDropZone, [{
    key: "render",
    value: function render() {
      var _props3 = this.props,
          onDrop = _props3.onDrop,
          onDropMatch = _props3.onDropMatch,
          onDropHightlight = _props3.onDropHightlight,
          selectedClassName = _props3.selectedClassName,
          highlightClassName = _props3.highlightClassName,
          isDroppable = _props3.isDroppable,
          onDragStart = _props3.onDragStart,
          onDragEnd = _props3.onDragEnd,
          otherProps = _objectWithoutProperties(_props3, ["onDrop", "onDropMatch", "onDropHightlight", "selectedClassName", "highlightClassName", "isDroppable", "onDragStart", "onDragEnd"]);

      return _react2.default.createElement("div", _extends({
        ref: "zone",
        draggable: true,
        className: this.props.className,
        onMouseDown: _event.stopPropagation,
        onDragStart: this.handleDragStart,
        onDragEnd: this.handleDragEnd,
        onDrop: this.handleDrop,
        onDragOver: this.handleDragOver,
        onDragEnter: this.handleDragEnter,
        onDragLeave: this.handleDragLeave
      }, otherProps));
    }
  }]);

  return DragDropZone;
}(DropZone);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9BcHBsaWNhdGlvbi91aS1tb2R1bGVzL0RyYWdBbmREcm9wLmpzIl0sIm5hbWVzIjpbImRyYWdnZWRab25lIiwiZHJvcFN1Z2dlc3RlZCIsImRyb3BSZWdpc3RyeSIsIlNlbGVjdERyb3BTdWdnZXN0ZWQiLCJ6b25lIiwidW5zZWxlY3QiLCJzZWxlY3QiLCJVbnNlbGVjdERyb3BTdWdnZXN0ZWQiLCJSZWdpc3RlckRyb3Bab25lIiwiem9uZUlkIiwibGVuZ3RoIiwicHVzaCIsIlVucmVnaXN0ZXJEcm9wWm9uZSIsImx6b25lIiwidW5kZWZpbmVkIiwicG9wIiwiRm9jdXNEcm9wWm9uZSIsImRhdGEiLCJmb3JFYWNoIiwieCIsImFjdGl2YXRlIiwiQmx1ckRyb3Bab25lIiwiZGVhY3RpdmF0ZSIsIm9iamVjdFRvRGF0YVRyYW5zZmVydCIsIm9iaiIsImRhdGFUcmFuc2ZlciIsIk9iamVjdCIsImtleXMiLCJrZXkiLCJzZXREYXRhIiwiSlNPTiIsInN0cmluZ2lmeSIsImRyYWdJbWFnZSIsInNldERyYWdJbWFnZSIsImVsZW1lbnQiLCJsZWZ0IiwidG9wIiwiZGF0YVRyYW5zZmVydFRvT2JqZWN0IiwidHlwZXMiLCJwYXJzZSIsImdldERhdGEiLCJlIiwiRHJhZ1pvbmUiLCJoYW5kbGVEcmFnU3RhcnQiLCJldnQiLCJiYWciLCJwcm9wcyIsIm9uRHJhZ1N0YXJ0Iiwic3RvcFByb3BhZ2F0aW9uIiwiaGFuZGxlRHJhZ0VuZCIsImRyYWdDb21wbGV0ZSIsIm9uRHJhZ0VuZCIsIm90aGVyUHJvcHMiLCJzdHlsZSIsIkRyb3Bab25lIiwiY29tcG9uZW50V2lsbE1vdW50IiwiY29tcG9uZW50V2lsbFVubW91bnQiLCJhY3RpdmUiLCJoYW5kbGVEcm9wIiwicHJldmVudERlZmF1bHQiLCJyZWN0IiwiY3VycmVudFRhcmdldCIsImdldEJvdW5kaW5nQ2xpZW50UmVjdCIsImNsaWVudFgiLCJ5IiwiY2xpZW50WSIsImFja25vd2xlZGdtZW50Iiwib25Ecm9wIiwiY29uc29sZSIsImVycm9yIiwiaGFuZGxlRHJhZ092ZXIiLCJvbkRyb3BNYXRjaCIsImhhbmRsZURyYWdFbnRlciIsInJlZnMiLCJoYW5kbGVEcmFnTGVhdmUiLCJpc0Ryb3BwYWJsZSIsImRvbSIsImhpZ2hsaWdodENsYXNzTmFtZSIsImNsYXNzTmFtZSIsInNlbGVjdGVkQ2xhc3NOYW1lIiwib25Ecm9wSGlnaHRsaWdodCIsIkRyYWdEcm9wWm9uZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7QUFHQTs7OztBQUVBOzs7Ozs7Ozs7OytlQUxBO0FBQ0E7QUFDQTs7O0FBS0EsSUFBSUEsY0FBd0IsSUFBNUI7QUFDQSxJQUFJQyxnQkFBMEIsSUFBOUI7QUFDQSxJQUFNQyxlQUF5QyxFQUEvQzs7QUFFQSxTQUFTQyxtQkFBVCxDQUE2QkMsSUFBN0IsRUFBNkM7QUFDM0MsTUFBSUgsYUFBSixFQUFtQjtBQUNqQkEsa0JBQWNJLFFBQWQ7QUFDRDtBQUNERCxPQUFLRSxNQUFMO0FBQ0FMLGtCQUFnQkcsSUFBaEI7QUFDRDs7QUFFRCxTQUFTRyxxQkFBVCxDQUErQkgsSUFBL0IsRUFBK0M7QUFDN0NBLE9BQUtDLFFBQUw7QUFDQSxNQUFJSixrQkFBa0JHLElBQXRCLEVBQTRCO0FBQzFCSCxvQkFBZ0IsSUFBaEI7QUFDRDtBQUNGOztBQUVELFNBQVNPLGdCQUFULENBQTBCSixJQUExQixFQUEwQztBQUN4Q0EsT0FBS0ssTUFBTCxHQUFjUCxhQUFhUSxNQUEzQjtBQUNBUixlQUFhUyxJQUFiLENBQWtCUCxJQUFsQjtBQUNEOztBQUVELFNBQVNRLGtCQUFULENBQTRCUixJQUE1QixFQUE0QztBQUMxQyxNQUFNUyxRQUFRWCxhQUFhQSxhQUFhUSxNQUFiLEdBQXNCLENBQW5DLENBQWQ7QUFDQUcsUUFBTUosTUFBTixHQUFlTCxLQUFLSyxNQUFwQjtBQUNBTCxPQUFLSyxNQUFMLEdBQWNLLFNBQWQ7QUFDQVosZUFBYVcsTUFBTUosTUFBbkIsSUFBNkJJLEtBQTdCO0FBQ0FYLGVBQWFhLEdBQWI7QUFD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S00sYUFObkI7QUFPRSxnQkFBUyxLQUFLUyxVQVBoQjtBQVFFLG9CQUFhLEtBQUtZLGNBUnBCO0FBU0UscUJBQWMsS0FBS0UsZUFUckI7QUFVRSxxQkFBYyxLQUFLRTtBQVZyQixTQVdPdEIsVUFYUCxFQURGO0FBY0Q7Ozs7RUFyQytCRSxRIiwiZmlsZSI6IkRyYWdBbmREcm9wLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLyogZXNsaW50LWRpc2FibGUgcmVhY3Qvbm8tc3RyaW5nLXJlZnMgKi9cclxuLyogZXNsaW50LWRpc2FibGUgcmVhY3Qvbm8tbXVsdGktY29tcCAqL1xyXG4vKiBlc2xpbnQtZGlzYWJsZSBuby11c2UtYmVmb3JlLWRlZmluZSAqL1xyXG5pbXBvcnQgUmVhY3QsIHsgQ29tcG9uZW50IH0gZnJvbSBcInJlYWN0XCJcclxuXHJcbmltcG9ydCB7IHN0b3BQcm9wYWdhdGlvbiB9IGZyb20gXCIuL2V2ZW50LnV0aWxzXCJcclxuXHJcbmxldCBkcmFnZ2VkWm9uZTogRHJhZ1pvbmUgPSBudWxsXHJcbmxldCBkcm9wU3VnZ2VzdGVkOiBEcm9wWm9uZSA9IG51bGxcclxuY29uc3QgZHJvcFJlZ2lzdHJ5OiBBcnJheTxEcm9wWm9uZSB8IG51bWJlcj4gPSBbXVxyXG5cclxuZnVuY3Rpb24gU2VsZWN0RHJvcFN1Z2dlc3RlZCh6b25lOiBEcm9wWm9uZSkge1xyXG4gIGlmIChkcm9wU3VnZ2VzdGVkKSB7XHJcbiAgICBkcm9wU3VnZ2VzdGVkLnVuc2VsZWN0KClcclxuICB9XHJcbiAgem9uZS5zZWxlY3QoKVxyXG4gIGRyb3BTdWdnZXN0ZWQgPSB6b25lXHJcbn1cclxuXHJcbmZ1bmN0aW9uIFVuc2VsZWN0RHJvcFN1Z2dlc3RlZCh6b25lOiBEcm9wWm9uZSkge1xyXG4gIHpvbmUudW5zZWxlY3QoKVxyXG4gIGlmIChkcm9wU3VnZ2VzdGVkID09PSB6b25lKSB7XHJcbiAgICBkcm9wU3VnZ2VzdGVkID0gbnVsbFxyXG4gIH1cclxufVxyXG5cclxuZnVuY3Rpb24gUmVnaXN0ZXJEcm9wWm9uZSh6b25lOiBEcm9wWm9uZSkge1xyXG4gIHpvbmUuem9uZUlkID0gZHJvcFJlZ2lzdHJ5Lmxlbmd0aFxyXG4gIGRyb3BSZWdpc3RyeS5wdXNoKHpvbmUpXHJcbn1cclxuXHJcbmZ1bmN0aW9uIFVucmVnaXN0ZXJEcm9wWm9uZSh6b25lOiBEcm9wWm9uZSkge1xyXG4gIGNvbnN0IGx6b25lID0gZHJvcFJlZ2lzdHJ5W2Ryb3BSZWdpc3RyeS5sZW5ndGggLSAxXVxyXG4gIGx6b25lLnpvbmVJZCA9IHpvbmUuem9uZUlkXHJcbiAgem9uZS56b25lSWQgPSB1bmRlZmluZWRcclxuICBkcm9wUmVnaXN0cnlbbHpvbmUuem9uZUlkXSA9IGx6b25lXHJcbiAgZHJvcFJlZ2lzdHJ5LnBvcCgpXHJcbn1cclxuXHJcbmZ1bmN0aW9uIEZvY3VzRHJvcFpvbmUoZGF0YTogYW55KSB7XHJcbiAgZHJvcFJlZ2lzdHJ5LmZvckVhY2goeCA9PiB4LmFjdGl2YXRlKGRhdGEpKVxyXG59XHJcblxyXG5mdW5jdGlvbiBCbHVyRHJvcFpvbmUoKSB7XHJcbiAgZHJvcFJlZ2lzdHJ5LmZvckVhY2goeCA9PiB4LmRlYWN0aXZhdGUoKSlcclxufVxyXG5cclxudHlwZSBEcmFnUHJvcHNUeXBlID0ge1xyXG4gIG9uRHJhZ1N0YXJ0OiBGdW5jdGlvbixcclxuICBvbkRyYWdFbmQ6IEZ1bmN0aW9uLFxyXG4gIHN0eWxlPzogYW55LFxyXG59XHJcblxyXG5mdW5jdGlvbiBvYmplY3RUb0RhdGFUcmFuc2ZlcnQob2JqOiBPYmplY3QsIGRhdGFUcmFuc2ZlcjogT2JqZWN0KSB7XHJcbiAgT2JqZWN0LmtleXMob2JqKS5mb3JFYWNoKGtleSA9PiB7XHJcbiAgICBpZiAoa2V5ICE9PSBcImRyYWdJbWFnZVwiKSB7XHJcbiAgICAgIGRhdGFUcmFuc2Zlci5zZXREYXRhKGtleSwgSlNPTi5zdHJpbmdpZnkob2JqW2tleV0pKVxyXG4gICAgfVxyXG4gIH0pXHJcbiAgaWYgKG9iai5kcmFnSW1hZ2UpIHtcclxuICAgIGRhdGFUcmFuc2Zlci5zZXREcmFnSW1hZ2Uob2JqLmRyYWdJbWFnZS5lbGVtZW50LCBvYmouZHJhZ0ltYWdlLmxlZnQgfHwgMCwgb2JqLmRyYWdJbWFnZS50b3AgfHwgMClcclxuICB9XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGRhdGFUcmFuc2ZlcnRUb09iamVjdChkYXRhVHJhbnNmZXI6IE9iamVjdCk6IE9iamVjdCB7XHJcbiAgY29uc3Qgb2JqID0ge31cclxuICBkYXRhVHJhbnNmZXIudHlwZXMuZm9yRWFjaCgoa2V5KSA9PiB7XHJcbiAgICB0cnkge1xyXG4gICAgICBvYmpba2V5XSA9IEpTT04ucGFyc2UoZGF0YVRyYW5zZmVyLmdldERhdGEoa2V5KSlcclxuICAgIH1cclxuICAgIGNhdGNoIChlKSB7XHJcbiAgICAgIC8vIE5vdGhpbmdcclxuICAgIH1cclxuICB9KVxyXG4gIHJldHVybiBvYmpcclxufVxyXG5cclxuZXhwb3J0IGNsYXNzIERyYWdab25lIGV4dGVuZHMgQ29tcG9uZW50IHtcclxuICBwcm9wczogRHJhZ1Byb3BzVHlwZVxyXG5cclxuICBoYW5kbGVEcmFnU3RhcnQgPSAoZXZ0KSA9PiB7XHJcbiAgICBjb25zdCBiYWcgPSB0aGlzLnByb3BzLm9uRHJhZ1N0YXJ0ICYmIHRoaXMucHJvcHMub25EcmFnU3RhcnQoZXZ0KVxyXG4gICAgaWYgKGJhZykge1xyXG4gICAgICBkcmFnZ2VkWm9uZSA9IHRoaXNcclxuICAgICAgZXZ0LnN0b3BQcm9wYWdhdGlvbigpXHJcbiAgICAgIG9iamVjdFRvRGF0YVRyYW5zZmVydChiYWcsIGV2dC5kYXRhVHJhbnNmZXIpXHJcbiAgICAgIEZvY3VzRHJvcFpvbmUoYmFnKVxyXG4gICAgfVxyXG4gIH1cclxuICBoYW5kbGVEcmFnRW5kID0gKGV2dCkgPT4ge1xyXG4gICAgZXZ0LnN0b3BQcm9wYWdhdGlvbigpXHJcbiAgICB0aGlzLmRyYWdDb21wbGV0ZSgpXHJcbiAgICBCbHVyRHJvcFpvbmUoKVxyXG4gIH1cclxuICBkcmFnQ29tcGxldGUoZGF0YTogYW55KSB7XHJcbiAgICBpZiAoZHJhZ2dlZFpvbmUgPT09IHRoaXMpIHtcclxuICAgICAgdGhpcy5wcm9wcy5vbkRyYWdFbmQgJiYgdGhpcy5wcm9wcy5vbkRyYWdFbmQoZGF0YSB8fCB7fSlcclxuICAgIH1cclxuICAgIGRyYWdnZWRab25lID0gbnVsbFxyXG4gIH1cclxuICByZW5kZXIoKTogUmVhY3QkRWxlbWVudDxhbnk+IHtcclxuICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby11bnVzZWQtdmFyc1xyXG4gICAgY29uc3QgeyBvbkRyYWdTdGFydCwgb25EcmFnRW5kLCAuLi5vdGhlclByb3BzIH0gPSB0aGlzLnByb3BzXHJcbiAgICByZXR1cm4gKFxyXG4gICAgICA8ZGl2XHJcbiAgICAgICAgc3R5bGU9eyB0aGlzLnByb3BzLnN0eWxlIH1cclxuICAgICAgICBkcmFnZ2FibGVcclxuICAgICAgICBvbk1vdXNlRG93bj17IHN0b3BQcm9wYWdhdGlvbiB9XHJcbiAgICAgICAgb25EcmFnU3RhcnQ9eyB0aGlzLmhhbmRsZURyYWdTdGFydCB9XHJcbiAgICAgICAgb25EcmFnRW5kPXsgdGhpcy5oYW5kbGVEcmFnRW5kIH1cclxuICAgICAgICB7IC4uLm90aGVyUHJvcHMgfVxyXG4gICAgICAvPilcclxuICB9XHJcbn1cclxuXHJcbnR5cGUgRHJvcFByb3BzVHlwZSA9IHtcclxuICBvbkRyb3A6IEZ1bmN0aW9uLFxyXG4gIG9uRHJvcE1hdGNoOiBGdW5jdGlvbixcclxuICBvbkRyb3BIaWdodGxpZ2h0OiBGdW5jdGlvbixcclxuICBjbGFzc05hbWU6IHN0cmluZyxcclxuICBzZWxlY3RlZENsYXNzTmFtZTogc3RyaW5nLFxyXG4gIGhpZ2hsaWdodENsYXNzTmFtZTogc3RyaW5nLFxyXG4gIGlzRHJvcHBhYmxlPzogRnVuY3Rpb25cclxufVxyXG5cclxuZXhwb3J0IGNsYXNzIERyb3Bab25lIGV4dGVuZHMgQ29tcG9uZW50IHtcclxuICBwcm9wczogRHJvcFByb3BzVHlwZVxyXG5cclxuICBjb21wb25lbnRXaWxsTW91bnQgPSAoKSA9PiB7XHJcbiAgICBSZWdpc3RlckRyb3Bab25lKHRoaXMpXHJcbiAgfVxyXG4gIGNvbXBvbmVudFdpbGxVbm1vdW50ID0gKCkgPT4ge1xyXG4gICAgVW5yZWdpc3RlckRyb3Bab25lKHRoaXMpXHJcbiAgfVxyXG5cclxuICB6b25lSWQ6IG51bWJlciA9IHVuZGVmaW5lZFxyXG4gIGFjdGl2ZTogYm9vbGVhbiA9IGZhbHNlXHJcblxyXG4gIGFjdGl2YXRlKGRhdGEpIHtcclxuICAgIGNvbnN0IHByb3BzID0gdGhpcy5wcm9wc1xyXG4gICAgaWYgKCFwcm9wcy5pc0Ryb3BwYWJsZSB8fCBwcm9wcy5pc0Ryb3BwYWJsZShkYXRhKSkge1xyXG4gICAgICB0aGlzLmFjdGl2ZSA9IHRydWVcclxuICAgIH1cclxuICAgIGVsc2Uge1xyXG4gICAgICB0aGlzLmFjdGl2ZSA9IGZhbHNlXHJcbiAgICB9XHJcbiAgICBjb25zdCBkb20gPSB0aGlzLnJlZnMuem9uZVxyXG4gICAgaWYgKHRoaXMuYWN0aXZlICYmIHByb3BzLmhpZ2hsaWdodENsYXNzTmFtZSkge1xyXG4gICAgICBkb20uY2xhc3NOYW1lID0gcHJvcHMuY2xhc3NOYW1lICsgXCIgXCIgKyBwcm9wcy5oaWdobGlnaHRDbGFzc05hbWVcclxuICAgIH1cclxuICAgIGVsc2Uge1xyXG4gICAgICBkb20uY2xhc3NOYW1lID0gcHJvcHMuY2xhc3NOYW1lXHJcbiAgICB9XHJcbiAgfVxyXG4gIGRlYWN0aXZhdGUoKSB7XHJcbiAgICBpZiAodGhpcy5hY3RpdmUpIHtcclxuICAgICAgY29uc3QgZG9tID0gdGhpcy5yZWZzLnpvbmVcclxuICAgICAgZG9tLmNsYXNzTmFtZSA9IHRoaXMucHJvcHMuY2xhc3NOYW1lXHJcbiAgICAgIHRoaXMuYWN0aXZlID0gZmFsc2VcclxuICAgIH1cclxuICB9XHJcbiAgc2VsZWN0KCkge1xyXG4gICAgY29uc3QgcHJvcHMgPSB0aGlzLnByb3BzXHJcbiAgICBjb25zdCBkb20gPSB0aGlzLnJlZnMuem9uZVxyXG4gICAgaWYgKHRoaXMuYWN0aXZlICYmIHByb3BzLnNlbGVjdGVkQ2xhc3NOYW1lKSB7XHJcbiAgICAgIGlmIChwcm9wcy5oaWdobGlnaHRDbGFzc05hbWUpIHtcclxuICAgICAgICBkb20uY2xhc3NOYW1lID0gcHJvcHMuY2xhc3NOYW1lICsgXCIgXCIgKyBwcm9wcy5oaWdobGlnaHRDbGFzc05hbWUgKyBcIiBcIiArIHByb3BzLnNlbGVjdGVkQ2xhc3NOYW1lXHJcbiAgICAgIH1cclxuICAgICAgZWxzZSB7XHJcbiAgICAgICAgZG9tLmNsYXNzTmFtZSA9IHByb3BzLmNsYXNzTmFtZSArIFwiIFwiICsgcHJvcHMuc2VsZWN0ZWRDbGFzc05hbWVcclxuICAgICAgfVxyXG4gICAgfVxyXG4gICAgZWxzZSB7XHJcbiAgICAgIGRvbS5jbGFzc05hbWUgPSBwcm9wcy5jbGFzc05hbWVcclxuICAgIH1cclxuICB9XHJcbiAgdW5zZWxlY3QoKSB7XHJcbiAgICBjb25zdCBwcm9wcyA9IHRoaXMucHJvcHNcclxuICAgIGNvbnN0IGRvbSA9IHRoaXMucmVmcy56b25lXHJcbiAgICBpZiAodGhpcy5hY3RpdmUgJiYgcHJvcHMuaGlnaGxpZ2h0Q2xhc3NOYW1lKSB7XHJcbiAgICAgIGRvbS5jbGFzc05hbWUgPSBwcm9wcy5jbGFzc05hbWUgKyBcIiBcIiArIHByb3BzLmhpZ2hsaWdodENsYXNzTmFtZVxyXG4gICAgfVxyXG4gICAgZWxzZSB7XHJcbiAgICAgIGRvbS5jbGFzc05hbWUgPSBwcm9wcy5jbGFzc05hbWVcclxuICAgIH1cclxuICB9XHJcbiAgaGFuZGxlRHJvcCA9IChldnQpID0+IHtcclxuICAgIGlmIChkcm9wU3VnZ2VzdGVkID09PSB0aGlzKSB7XHJcbiAgICAgIGV2dC5zdG9wUHJvcGFnYXRpb24oKVxyXG4gICAgICBldnQucHJldmVudERlZmF1bHQoKVxyXG4gICAgICBVbnNlbGVjdERyb3BTdWdnZXN0ZWQodGhpcylcclxuICAgICAgY29uc3QgcmVjdCA9IGV2dC5jdXJyZW50VGFyZ2V0LmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpXHJcbiAgICAgIGNvbnN0IHggPSBldnQuY2xpZW50WCAtIHJlY3QubGVmdFxyXG4gICAgICBjb25zdCB5ID0gZXZ0LmNsaWVudFkgLSByZWN0LnRvcFxyXG4gICAgICBjb25zdCBiYWcgPSBkYXRhVHJhbnNmZXJ0VG9PYmplY3QoZXZ0LmRhdGFUcmFuc2ZlcilcclxuICAgICAgdHJ5IHtcclxuICAgICAgICBjb25zdCBhY2tub3dsZWRnbWVudCA9IHRoaXMucHJvcHMub25Ecm9wICYmIHRoaXMucHJvcHMub25Ecm9wKGJhZywgeCwgeSlcclxuICAgICAgICBkcmFnZ2VkWm9uZSAmJiBkcmFnZ2VkWm9uZS5kcmFnQ29tcGxldGUoYWNrbm93bGVkZ21lbnQpXHJcbiAgICAgIH1cclxuICAgICAgY2F0Y2ggKGUpIHtcclxuICAgICAgICBjb25zb2xlLmVycm9yKGUpXHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9XHJcbiAgaGFuZGxlRHJhZ092ZXIgPSAoZXZ0KSA9PiB7XHJcbiAgICBpZiAoZHJvcFN1Z2dlc3RlZCA9PT0gdGhpcyB8fCAhdGhpcy5wcm9wcy5vbkRyb3BNYXRjaCB8fCB0aGlzLnByb3BzLm9uRHJvcE1hdGNoKGV2dC5kYXRhVHJhbnNmZXIudHlwZXMpKSB7XHJcbiAgICAgIGV2dC5wcmV2ZW50RGVmYXVsdCgpXHJcbiAgICAgIGV2dC5zdG9wUHJvcGFnYXRpb24oKVxyXG4gICAgICBTZWxlY3REcm9wU3VnZ2VzdGVkKHRoaXMpXHJcbiAgICB9XHJcbiAgfVxyXG4gIGhhbmRsZURyYWdFbnRlciA9IChldnQpID0+IHtcclxuICAgIGlmIChkcm9wU3VnZ2VzdGVkID09PSB0aGlzIHx8ICF0aGlzLnByb3BzLm9uRHJvcE1hdGNoIHx8IHRoaXMucHJvcHMub25Ecm9wTWF0Y2goZXZ0LmRhdGFUcmFuc2Zlci50eXBlcykpIHtcclxuICAgICAgZXZ0LnByZXZlbnREZWZhdWx0KClcclxuICAgICAgZXZ0LnN0b3BQcm9wYWdhdGlvbigpXHJcbiAgICAgIGlmIChldnQuY3VycmVudFRhcmdldCA9PT0gdGhpcy5yZWZzLnpvbmUpIHtcclxuICAgICAgICBTZWxlY3REcm9wU3VnZ2VzdGVkKHRoaXMpXHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9XHJcbiAgaGFuZGxlRHJhZ0xlYXZlID0gKGV2dCkgPT4ge1xyXG4gICAgaWYgKGRyb3BTdWdnZXN0ZWQgPT09IHRoaXMpIHtcclxuICAgICAgZXZ0LnByZXZlbnREZWZhdWx0KClcclxuICAgICAgZXZ0LnN0b3BQcm9wYWdhdGlvbigpXHJcbiAgICAgIFVuc2VsZWN0RHJvcFN1Z2dlc3RlZCh0aGlzKVxyXG4gICAgfVxyXG4gIH1cclxuICByZW5kZXIoKTogUmVhY3QkRWxlbWVudDxhbnk+IHtcclxuICAgIGNvbnN0IHtcclxuICAgICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXVudXNlZC12YXJzXHJcbiAgICAgIG9uRHJvcCwgb25Ecm9wTWF0Y2gsIG9uRHJvcEhpZ2h0bGlnaHQsIHNlbGVjdGVkQ2xhc3NOYW1lLFxyXG4gICAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tdW51c2VkLXZhcnNcclxuICAgICAgaGlnaGxpZ2h0Q2xhc3NOYW1lLCBpc0Ryb3BwYWJsZSwgLi4ub3RoZXJQcm9wcyB9ID0gdGhpcy5wcm9wc1xyXG4gICAgcmV0dXJuIChcclxuICAgICAgPGRpdlxyXG4gICAgICAgIHJlZj17IFwiem9uZVwiIH1cclxuICAgICAgICBjbGFzc05hbWU9eyB0aGlzLnByb3BzLmNsYXNzTmFtZSB9XHJcbiAgICAgICAgb25Ecm9wPXsgdGhpcy5oYW5kbGVEcm9wIH1cclxuICAgICAgICBvbkRyYWdPdmVyPXsgdGhpcy5oYW5kbGVEcmFnT3ZlciB9XHJcbiAgICAgICAgb25EcmFnRW50ZXI9eyB0aGlzLmhhbmRsZURyYWdFbnRlciB9XHJcbiAgICAgICAgb25EcmFnTGVhdmU9eyB0aGlzLmhhbmRsZURyYWdMZWF2ZSB9XHJcbiAgICAgICAgeyAuLi5vdGhlclByb3BzIH1cclxuICAgICAgLz4pXHJcbiAgfVxyXG59XHJcblxyXG5leHBvcnQgY2xhc3MgRHJhZ0Ryb3Bab25lIGV4dGVuZHMgRHJvcFpvbmUge1xyXG5cclxuICBoYW5kbGVEcmFnU3RhcnQgPSAoZXZ0KSA9PiB7XHJcbiAgICBjb25zdCBiYWcgPSB0aGlzLnByb3BzLm9uRHJhZ1N0YXJ0ICYmIHRoaXMucHJvcHMub25EcmFnU3RhcnQoZXZ0KVxyXG4gICAgaWYgKGJhZykge1xyXG4gICAgICBldnQuc3RvcFByb3BhZ2F0aW9uKClcclxuICAgICAgb2JqZWN0VG9EYXRhVHJhbnNmZXJ0KGJhZywgZXZ0LmRhdGFUcmFuc2ZlcilcclxuICAgICAgRm9jdXNEcm9wWm9uZShiYWcpXHJcbiAgICB9XHJcbiAgfVxyXG4gIGhhbmRsZURyYWdFbmQgPSAoZXZ0KSA9PiB7XHJcbiAgICBldnQuc3RvcFByb3BhZ2F0aW9uKClcclxuICAgIHRoaXMucHJvcHMub25EcmFnRW5kICYmIHRoaXMucHJvcHMub25EcmFnRW5kKGV2dClcclxuICAgIEJsdXJEcm9wWm9uZSgpXHJcbiAgfVxyXG4gIHJlbmRlcigpOiBSZWFjdCRFbGVtZW50PGFueT4ge1xyXG4gICAgY29uc3Qge1xyXG4gICAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tdW51c2VkLXZhcnNcclxuICAgICAgb25Ecm9wLCBvbkRyb3BNYXRjaCwgb25Ecm9wSGlnaHRsaWdodCwgc2VsZWN0ZWRDbGFzc05hbWUsXHJcbiAgICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby11bnVzZWQtdmFyc1xyXG4gICAgICBoaWdobGlnaHRDbGFzc05hbWUsIGlzRHJvcHBhYmxlLCBvbkRyYWdTdGFydCwgb25EcmFnRW5kLFxyXG4gICAgICAuLi5vdGhlclByb3BzLFxyXG4gICAgfSA9IHRoaXMucHJvcHNcclxuICAgIHJldHVybiAoXHJcbiAgICAgIDxkaXZcclxuICAgICAgICByZWY9eyBcInpvbmVcIiB9XHJcbiAgICAgICAgZHJhZ2dhYmxlXHJcbiAgICAgICAgY2xhc3NOYW1lPXsgdGhpcy5wcm9wcy5jbGFzc05hbWUgfVxyXG4gICAgICAgIG9uTW91c2VEb3duPXsgc3RvcFByb3BhZ2F0aW9uIH1cclxuICAgICAgICBvbkRyYWdTdGFydD17IHRoaXMuaGFuZGxlRHJhZ1N0YXJ0IH1cclxuICAgICAgICBvbkRyYWdFbmQ9eyB0aGlzLmhhbmRsZURyYWdFbmQgfVxyXG4gICAgICAgIG9uRHJvcD17IHRoaXMuaGFuZGxlRHJvcCB9XHJcbiAgICAgICAgb25EcmFnT3Zlcj17IHRoaXMuaGFuZGxlRHJhZ092ZXIgfVxyXG4gICAgICAgIG9uRHJhZ0VudGVyPXsgdGhpcy5oYW5kbGVEcmFnRW50ZXIgfVxyXG4gICAgICAgIG9uRHJhZ0xlYXZlPXsgdGhpcy5oYW5kbGVEcmFnTGVhdmUgfVxyXG4gICAgICAgIHsgLi4ub3RoZXJQcm9wcyB9XHJcbiAgICAgIC8+KVxyXG4gIH1cclxufSJdfQ==