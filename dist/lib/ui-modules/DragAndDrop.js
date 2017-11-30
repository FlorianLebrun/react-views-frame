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
          var acknowledgment = _this2.props.onDrop && _this2.props.onDrop(bag, x, y, evt);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9saWIvdWktbW9kdWxlcy9EcmFnQW5kRHJvcC5qcyJdLCJuYW1lcyI6WyJkcmFnZ2VkWm9uZSIsImRyb3BTdWdnZXN0ZWQiLCJkcm9wUmVnaXN0cnkiLCJTZWxlY3REcm9wU3VnZ2VzdGVkIiwiem9uZSIsInVuc2VsZWN0Iiwic2VsZWN0IiwiVW5zZWxlY3REcm9wU3VnZ2VzdGVkIiwiUmVnaXN0ZXJEcm9wWm9uZSIsInpvbmVJZCIsImxlbmd0aCIsInB1c2giLCJVbnJlZ2lzdGVyRHJvcFpvbmUiLCJsem9uZSIsInVuZGVmaW5lZCIsInBvcCIsIkZvY3VzRHJvcFpvbmUiLCJkYXRhIiwiZm9yRWFjaCIsIngiLCJhY3RpdmF0ZSIsIkJsdXJEcm9wWm9uZSIsImRlYWN0aXZhdGUiLCJvYmplY3RUb0RhdGFUcmFuc2ZlcnQiLCJvYmoiLCJkYXRhVHJhbnNmZXIiLCJPYmplY3QiLCJrZXlzIiwia2V5Iiwic2V0RGF0YSIsIkpTT04iLCJzdHJpbmdpZnkiLCJkcmFnSW1hZ2UiLCJzZXREcmFnSW1hZ2UiLCJlbGVtZW50IiwibGVmdCIsInRvcCIsImRhdGFUcmFuc2ZlcnRUb09iamVjdCIsInR5cGVzIiwicGFyc2UiLCJnZXREYXRhIiwiZSIsIkRyYWdab25lIiwiaGFuZGxlRHJhZ1N0YXJ0IiwiZXZ0IiwiYmFnIiwicHJvcHMiLCJvbkRyYWdTdGFydCIsInN0b3BQcm9wYWdhdGlvbiIsImhhbmRsZURyYWdFbmQiLCJkcmFnQ29tcGxldGUiLCJvbkRyYWdFbmQiLCJvdGhlclByb3BzIiwic3R5bGUiLCJEcm9wWm9uZSIsImNvbXBvbmVudFdpbGxNb3VudCIsImNvbXBvbmVudFdpbGxVbm1vdW50IiwiYWN0aXZlIiwiaGFuZGxlRHJvcCIsInByZXZlbnREZWZhdWx0IiwicmVjdCIsImN1cnJlbnRUYXJnZXQiLCJnZXRCb3VuZGluZ0NsaWVudFJlY3QiLCJjbGllbnRYIiwieSIsImNsaWVudFkiLCJhY2tub3dsZWRnbWVudCIsIm9uRHJvcCIsImNvbnNvbGUiLCJlcnJvciIsImhhbmRsZURyYWdPdmVyIiwib25Ecm9wTWF0Y2giLCJoYW5kbGVEcmFnRW50ZXIiLCJyZWZzIiwiaGFuZGxlRHJhZ0xlYXZlIiwiaXNEcm9wcGFibGUiLCJkb20iLCJoaWdobGlnaHRDbGFzc05hbWUiLCJjbGFzc05hbWUiLCJzZWxlY3RlZENsYXNzTmFtZSIsIm9uRHJvcEhpZ2h0bGlnaHQiLCJEcmFnRHJvcFpvbmUiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7O0FBR0E7Ozs7QUFFQTs7Ozs7Ozs7OzsrZUFMQTtBQUNBO0FBQ0E7OztBQUtBLElBQUlBLGNBQXdCLElBQTVCO0FBQ0EsSUFBSUMsZ0JBQTBCLElBQTlCO0FBQ0EsSUFBTUMsZUFBeUMsRUFBL0M7O0FBRUEsU0FBU0MsbUJBQVQsQ0FBNkJDLElBQTdCLEVBQTZDO0FBQzNDLE1BQUlILGFBQUosRUFBbUI7QUFDakJBLGtCQUFjSSxRQUFkO0FBQ0Q7QUFDREQsT0FBS0UsTUFBTDtBQUNBTCxrQkFBZ0JHLElBQWhCO0FBQ0Q7O0FBRUQsU0FBU0cscUJBQVQsQ0FBK0JILElBQS9CLEVBQStDO0FBQzdDQSxPQUFLQyxRQUFMO0FBQ0EsTUFBSUosa0JBQWtCRyxJQUF0QixFQUE0QjtBQUMxQkgsb0JBQWdCLElBQWhCO0FBQ0Q7QUFDRjs7QUFFRCxTQUFTTyxnQkFBVCxDQUEwQkosSUFBMUIsRUFBMEM7QUFDeENBLE9BQUtLLE1BQUwsR0FBY1AsYUFBYVEsTUFBM0I7QUFDQVIsZUFBYVMsSUFBYixDQUFrQlAsSUFBbEI7QUFDRDs7QUFFRCxTQUFTUSxrQkFBVCxDQUE0QlIsSUFBNUIsRUFBNEM7QUFDMUMsTUFBTVMsUUFBUVgsYUFBYUEsYUFBYVEsTUFBYixHQUFzQixDQUFuQyxDQUFkO0FBQ0FHLFFBQU1KLE1BQU4sR0FBZUwsS0FBS0ssTUFBcEI7QUFDQUwsT0FBS0ssTUFBTCxHQUFjSyxTQUFkO0FBQ0FaLGVBQWFXLE1BQU1KLE1BQW5CLElBQTZCSSxLQUE3QjtBQUNBWCxlQUFhYSxHQUFiO0FBQ0Q7O0FBRUQs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QVksS0FBS00sYUFObkI7QUFPRSxnQkFBUyxLQUFLUyxVQVBoQjtBQVFFLG9CQUFhLEtBQUtZLGNBUnBCO0FBU0UscUJBQWMsS0FBS0UsZUFUckI7QUFVRSxxQkFBYyxLQUFLRTtBQVZyQixTQVdPdEIsVUFYUCxFQURGO0FBY0Q7Ozs7RUFyQytCRSxRIiwiZmlsZSI6IkRyYWdBbmREcm9wLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLyogZXNsaW50LWRpc2FibGUgcmVhY3Qvbm8tc3RyaW5nLXJlZnMgKi9cclxuLyogZXNsaW50LWRpc2FibGUgcmVhY3Qvbm8tbXVsdGktY29tcCAqL1xyXG4vKiBlc2xpbnQtZGlzYWJsZSBuby11c2UtYmVmb3JlLWRlZmluZSAqL1xyXG5pbXBvcnQgUmVhY3QsIHsgQ29tcG9uZW50IH0gZnJvbSBcInJlYWN0XCJcclxuXHJcbmltcG9ydCB7IHN0b3BQcm9wYWdhdGlvbiB9IGZyb20gXCIuL2V2ZW50LnV0aWxzXCJcclxuXHJcbmxldCBkcmFnZ2VkWm9uZTogRHJhZ1pvbmUgPSBudWxsXHJcbmxldCBkcm9wU3VnZ2VzdGVkOiBEcm9wWm9uZSA9IG51bGxcclxuY29uc3QgZHJvcFJlZ2lzdHJ5OiBBcnJheTxEcm9wWm9uZSB8IG51bWJlcj4gPSBbXVxyXG5cclxuZnVuY3Rpb24gU2VsZWN0RHJvcFN1Z2dlc3RlZCh6b25lOiBEcm9wWm9uZSkge1xyXG4gIGlmIChkcm9wU3VnZ2VzdGVkKSB7XHJcbiAgICBkcm9wU3VnZ2VzdGVkLnVuc2VsZWN0KClcclxuICB9XHJcbiAgem9uZS5zZWxlY3QoKVxyXG4gIGRyb3BTdWdnZXN0ZWQgPSB6b25lXHJcbn1cclxuXHJcbmZ1bmN0aW9uIFVuc2VsZWN0RHJvcFN1Z2dlc3RlZCh6b25lOiBEcm9wWm9uZSkge1xyXG4gIHpvbmUudW5zZWxlY3QoKVxyXG4gIGlmIChkcm9wU3VnZ2VzdGVkID09PSB6b25lKSB7XHJcbiAgICBkcm9wU3VnZ2VzdGVkID0gbnVsbFxyXG4gIH1cclxufVxyXG5cclxuZnVuY3Rpb24gUmVnaXN0ZXJEcm9wWm9uZSh6b25lOiBEcm9wWm9uZSkge1xyXG4gIHpvbmUuem9uZUlkID0gZHJvcFJlZ2lzdHJ5Lmxlbmd0aFxyXG4gIGRyb3BSZWdpc3RyeS5wdXNoKHpvbmUpXHJcbn1cclxuXHJcbmZ1bmN0aW9uIFVucmVnaXN0ZXJEcm9wWm9uZSh6b25lOiBEcm9wWm9uZSkge1xyXG4gIGNvbnN0IGx6b25lID0gZHJvcFJlZ2lzdHJ5W2Ryb3BSZWdpc3RyeS5sZW5ndGggLSAxXVxyXG4gIGx6b25lLnpvbmVJZCA9IHpvbmUuem9uZUlkXHJcbiAgem9uZS56b25lSWQgPSB1bmRlZmluZWRcclxuICBkcm9wUmVnaXN0cnlbbHpvbmUuem9uZUlkXSA9IGx6b25lXHJcbiAgZHJvcFJlZ2lzdHJ5LnBvcCgpXHJcbn1cclxuXHJcbmZ1bmN0aW9uIEZvY3VzRHJvcFpvbmUoZGF0YTogYW55KSB7XHJcbiAgZHJvcFJlZ2lzdHJ5LmZvckVhY2goeCA9PiB4LmFjdGl2YXRlKGRhdGEpKVxyXG59XHJcblxyXG5mdW5jdGlvbiBCbHVyRHJvcFpvbmUoKSB7XHJcbiAgZHJvcFJlZ2lzdHJ5LmZvckVhY2goeCA9PiB4LmRlYWN0aXZhdGUoKSlcclxufVxyXG5cclxudHlwZSBEcmFnUHJvcHNUeXBlID0ge1xyXG4gIG9uRHJhZ1N0YXJ0OiBGdW5jdGlvbixcclxuICBvbkRyYWdFbmQ6IEZ1bmN0aW9uLFxyXG4gIHN0eWxlPzogYW55LFxyXG59XHJcblxyXG5mdW5jdGlvbiBvYmplY3RUb0RhdGFUcmFuc2ZlcnQob2JqOiBPYmplY3QsIGRhdGFUcmFuc2ZlcjogT2JqZWN0KSB7XHJcbiAgT2JqZWN0LmtleXMob2JqKS5mb3JFYWNoKGtleSA9PiB7XHJcbiAgICBpZiAoa2V5ICE9PSBcImRyYWdJbWFnZVwiKSB7XHJcbiAgICAgIGRhdGFUcmFuc2Zlci5zZXREYXRhKGtleSwgSlNPTi5zdHJpbmdpZnkob2JqW2tleV0pKVxyXG4gICAgfVxyXG4gIH0pXHJcbiAgaWYgKG9iai5kcmFnSW1hZ2UpIHtcclxuICAgIGRhdGFUcmFuc2Zlci5zZXREcmFnSW1hZ2Uob2JqLmRyYWdJbWFnZS5lbGVtZW50LCBvYmouZHJhZ0ltYWdlLmxlZnQgfHwgMCwgb2JqLmRyYWdJbWFnZS50b3AgfHwgMClcclxuICB9XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGRhdGFUcmFuc2ZlcnRUb09iamVjdChkYXRhVHJhbnNmZXI6IE9iamVjdCk6IE9iamVjdCB7XHJcbiAgY29uc3Qgb2JqID0ge31cclxuICBkYXRhVHJhbnNmZXIudHlwZXMuZm9yRWFjaCgoa2V5KSA9PiB7XHJcbiAgICB0cnkge1xyXG4gICAgICBvYmpba2V5XSA9IEpTT04ucGFyc2UoZGF0YVRyYW5zZmVyLmdldERhdGEoa2V5KSlcclxuICAgIH1cclxuICAgIGNhdGNoIChlKSB7XHJcbiAgICAgIC8vIE5vdGhpbmdcclxuICAgIH1cclxuICB9KVxyXG4gIHJldHVybiBvYmpcclxufVxyXG5cclxuZXhwb3J0IGNsYXNzIERyYWdab25lIGV4dGVuZHMgQ29tcG9uZW50IHtcclxuICBwcm9wczogRHJhZ1Byb3BzVHlwZVxyXG5cclxuICBoYW5kbGVEcmFnU3RhcnQgPSAoZXZ0KSA9PiB7XHJcbiAgICBjb25zdCBiYWcgPSB0aGlzLnByb3BzLm9uRHJhZ1N0YXJ0ICYmIHRoaXMucHJvcHMub25EcmFnU3RhcnQoZXZ0KVxyXG4gICAgaWYgKGJhZykge1xyXG4gICAgICBkcmFnZ2VkWm9uZSA9IHRoaXNcclxuICAgICAgZXZ0LnN0b3BQcm9wYWdhdGlvbigpXHJcbiAgICAgIG9iamVjdFRvRGF0YVRyYW5zZmVydChiYWcsIGV2dC5kYXRhVHJhbnNmZXIpXHJcbiAgICAgIEZvY3VzRHJvcFpvbmUoYmFnKVxyXG4gICAgfVxyXG4gIH1cclxuICBoYW5kbGVEcmFnRW5kID0gKGV2dCkgPT4ge1xyXG4gICAgZXZ0LnN0b3BQcm9wYWdhdGlvbigpXHJcbiAgICB0aGlzLmRyYWdDb21wbGV0ZSgpXHJcbiAgICBCbHVyRHJvcFpvbmUoKVxyXG4gIH1cclxuICBkcmFnQ29tcGxldGUoZGF0YTogYW55KSB7XHJcbiAgICBpZiAoZHJhZ2dlZFpvbmUgPT09IHRoaXMpIHtcclxuICAgICAgdGhpcy5wcm9wcy5vbkRyYWdFbmQgJiYgdGhpcy5wcm9wcy5vbkRyYWdFbmQoZGF0YSB8fCB7fSlcclxuICAgIH1cclxuICAgIGRyYWdnZWRab25lID0gbnVsbFxyXG4gIH1cclxuICByZW5kZXIoKTogUmVhY3QkRWxlbWVudDxhbnk+IHtcclxuICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby11bnVzZWQtdmFyc1xyXG4gICAgY29uc3QgeyBvbkRyYWdTdGFydCwgb25EcmFnRW5kLCAuLi5vdGhlclByb3BzIH0gPSB0aGlzLnByb3BzXHJcbiAgICByZXR1cm4gKFxyXG4gICAgICA8ZGl2XHJcbiAgICAgICAgc3R5bGU9eyB0aGlzLnByb3BzLnN0eWxlIH1cclxuICAgICAgICBkcmFnZ2FibGVcclxuICAgICAgICBvbk1vdXNlRG93bj17IHN0b3BQcm9wYWdhdGlvbiB9XHJcbiAgICAgICAgb25EcmFnU3RhcnQ9eyB0aGlzLmhhbmRsZURyYWdTdGFydCB9XHJcbiAgICAgICAgb25EcmFnRW5kPXsgdGhpcy5oYW5kbGVEcmFnRW5kIH1cclxuICAgICAgICB7IC4uLm90aGVyUHJvcHMgfVxyXG4gICAgICAvPilcclxuICB9XHJcbn1cclxuXHJcbnR5cGUgRHJvcFByb3BzVHlwZSA9IHtcclxuICBvbkRyb3A6IEZ1bmN0aW9uLFxyXG4gIG9uRHJvcE1hdGNoOiBGdW5jdGlvbixcclxuICBvbkRyb3BIaWdodGxpZ2h0OiBGdW5jdGlvbixcclxuICBjbGFzc05hbWU6IHN0cmluZyxcclxuICBzZWxlY3RlZENsYXNzTmFtZTogc3RyaW5nLFxyXG4gIGhpZ2hsaWdodENsYXNzTmFtZTogc3RyaW5nLFxyXG4gIGlzRHJvcHBhYmxlPzogRnVuY3Rpb25cclxufVxyXG5cclxuZXhwb3J0IGNsYXNzIERyb3Bab25lIGV4dGVuZHMgQ29tcG9uZW50IHtcclxuICBwcm9wczogRHJvcFByb3BzVHlwZVxyXG5cclxuICBjb21wb25lbnRXaWxsTW91bnQgPSAoKSA9PiB7XHJcbiAgICBSZWdpc3RlckRyb3Bab25lKHRoaXMpXHJcbiAgfVxyXG4gIGNvbXBvbmVudFdpbGxVbm1vdW50ID0gKCkgPT4ge1xyXG4gICAgVW5yZWdpc3RlckRyb3Bab25lKHRoaXMpXHJcbiAgfVxyXG5cclxuICB6b25lSWQ6IG51bWJlciA9IHVuZGVmaW5lZFxyXG4gIGFjdGl2ZTogYm9vbGVhbiA9IGZhbHNlXHJcblxyXG4gIGFjdGl2YXRlKGRhdGEpIHtcclxuICAgIGNvbnN0IHByb3BzID0gdGhpcy5wcm9wc1xyXG4gICAgaWYgKCFwcm9wcy5pc0Ryb3BwYWJsZSB8fCBwcm9wcy5pc0Ryb3BwYWJsZShkYXRhKSkge1xyXG4gICAgICB0aGlzLmFjdGl2ZSA9IHRydWVcclxuICAgIH1cclxuICAgIGVsc2Uge1xyXG4gICAgICB0aGlzLmFjdGl2ZSA9IGZhbHNlXHJcbiAgICB9XHJcbiAgICBjb25zdCBkb20gPSB0aGlzLnJlZnMuem9uZVxyXG4gICAgaWYgKHRoaXMuYWN0aXZlICYmIHByb3BzLmhpZ2hsaWdodENsYXNzTmFtZSkge1xyXG4gICAgICBkb20uY2xhc3NOYW1lID0gcHJvcHMuY2xhc3NOYW1lICsgXCIgXCIgKyBwcm9wcy5oaWdobGlnaHRDbGFzc05hbWVcclxuICAgIH1cclxuICAgIGVsc2Uge1xyXG4gICAgICBkb20uY2xhc3NOYW1lID0gcHJvcHMuY2xhc3NOYW1lXHJcbiAgICB9XHJcbiAgfVxyXG4gIGRlYWN0aXZhdGUoKSB7XHJcbiAgICBpZiAodGhpcy5hY3RpdmUpIHtcclxuICAgICAgY29uc3QgZG9tID0gdGhpcy5yZWZzLnpvbmVcclxuICAgICAgZG9tLmNsYXNzTmFtZSA9IHRoaXMucHJvcHMuY2xhc3NOYW1lXHJcbiAgICAgIHRoaXMuYWN0aXZlID0gZmFsc2VcclxuICAgIH1cclxuICB9XHJcbiAgc2VsZWN0KCkge1xyXG4gICAgY29uc3QgcHJvcHMgPSB0aGlzLnByb3BzXHJcbiAgICBjb25zdCBkb20gPSB0aGlzLnJlZnMuem9uZVxyXG4gICAgaWYgKHRoaXMuYWN0aXZlICYmIHByb3BzLnNlbGVjdGVkQ2xhc3NOYW1lKSB7XHJcbiAgICAgIGlmIChwcm9wcy5oaWdobGlnaHRDbGFzc05hbWUpIHtcclxuICAgICAgICBkb20uY2xhc3NOYW1lID0gcHJvcHMuY2xhc3NOYW1lICsgXCIgXCIgKyBwcm9wcy5oaWdobGlnaHRDbGFzc05hbWUgKyBcIiBcIiArIHByb3BzLnNlbGVjdGVkQ2xhc3NOYW1lXHJcbiAgICAgIH1cclxuICAgICAgZWxzZSB7XHJcbiAgICAgICAgZG9tLmNsYXNzTmFtZSA9IHByb3BzLmNsYXNzTmFtZSArIFwiIFwiICsgcHJvcHMuc2VsZWN0ZWRDbGFzc05hbWVcclxuICAgICAgfVxyXG4gICAgfVxyXG4gICAgZWxzZSB7XHJcbiAgICAgIGRvbS5jbGFzc05hbWUgPSBwcm9wcy5jbGFzc05hbWVcclxuICAgIH1cclxuICB9XHJcbiAgdW5zZWxlY3QoKSB7XHJcbiAgICBjb25zdCBwcm9wcyA9IHRoaXMucHJvcHNcclxuICAgIGNvbnN0IGRvbSA9IHRoaXMucmVmcy56b25lXHJcbiAgICBpZiAodGhpcy5hY3RpdmUgJiYgcHJvcHMuaGlnaGxpZ2h0Q2xhc3NOYW1lKSB7XHJcbiAgICAgIGRvbS5jbGFzc05hbWUgPSBwcm9wcy5jbGFzc05hbWUgKyBcIiBcIiArIHByb3BzLmhpZ2hsaWdodENsYXNzTmFtZVxyXG4gICAgfVxyXG4gICAgZWxzZSB7XHJcbiAgICAgIGRvbS5jbGFzc05hbWUgPSBwcm9wcy5jbGFzc05hbWVcclxuICAgIH1cclxuICB9XHJcbiAgaGFuZGxlRHJvcCA9IChldnQpID0+IHtcclxuICAgIGlmIChkcm9wU3VnZ2VzdGVkID09PSB0aGlzKSB7XHJcbiAgICAgIGV2dC5zdG9wUHJvcGFnYXRpb24oKVxyXG4gICAgICBldnQucHJldmVudERlZmF1bHQoKVxyXG4gICAgICBVbnNlbGVjdERyb3BTdWdnZXN0ZWQodGhpcylcclxuICAgICAgY29uc3QgcmVjdCA9IGV2dC5jdXJyZW50VGFyZ2V0LmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpXHJcbiAgICAgIGNvbnN0IHggPSBldnQuY2xpZW50WCAtIHJlY3QubGVmdFxyXG4gICAgICBjb25zdCB5ID0gZXZ0LmNsaWVudFkgLSByZWN0LnRvcFxyXG4gICAgICBjb25zdCBiYWcgPSBkYXRhVHJhbnNmZXJ0VG9PYmplY3QoZXZ0LmRhdGFUcmFuc2ZlcilcclxuICAgICAgdHJ5IHtcclxuICAgICAgICBjb25zdCBhY2tub3dsZWRnbWVudCA9IHRoaXMucHJvcHMub25Ecm9wICYmIHRoaXMucHJvcHMub25Ecm9wKGJhZywgeCwgeSwgZXZ0KVxyXG4gICAgICAgIGRyYWdnZWRab25lICYmIGRyYWdnZWRab25lLmRyYWdDb21wbGV0ZShhY2tub3dsZWRnbWVudClcclxuICAgICAgfVxyXG4gICAgICBjYXRjaCAoZSkge1xyXG4gICAgICAgIGNvbnNvbGUuZXJyb3IoZSlcclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH1cclxuICBoYW5kbGVEcmFnT3ZlciA9IChldnQpID0+IHtcclxuICAgIGlmIChkcm9wU3VnZ2VzdGVkID09PSB0aGlzIHx8ICF0aGlzLnByb3BzLm9uRHJvcE1hdGNoIHx8IHRoaXMucHJvcHMub25Ecm9wTWF0Y2goZXZ0LmRhdGFUcmFuc2Zlci50eXBlcykpIHtcclxuICAgICAgZXZ0LnByZXZlbnREZWZhdWx0KClcclxuICAgICAgZXZ0LnN0b3BQcm9wYWdhdGlvbigpXHJcbiAgICAgIFNlbGVjdERyb3BTdWdnZXN0ZWQodGhpcylcclxuICAgIH1cclxuICB9XHJcbiAgaGFuZGxlRHJhZ0VudGVyID0gKGV2dCkgPT4ge1xyXG4gICAgaWYgKGRyb3BTdWdnZXN0ZWQgPT09IHRoaXMgfHwgIXRoaXMucHJvcHMub25Ecm9wTWF0Y2ggfHwgdGhpcy5wcm9wcy5vbkRyb3BNYXRjaChldnQuZGF0YVRyYW5zZmVyLnR5cGVzKSkge1xyXG4gICAgICBldnQucHJldmVudERlZmF1bHQoKVxyXG4gICAgICBldnQuc3RvcFByb3BhZ2F0aW9uKClcclxuICAgICAgaWYgKGV2dC5jdXJyZW50VGFyZ2V0ID09PSB0aGlzLnJlZnMuem9uZSkge1xyXG4gICAgICAgIFNlbGVjdERyb3BTdWdnZXN0ZWQodGhpcylcclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH1cclxuICBoYW5kbGVEcmFnTGVhdmUgPSAoZXZ0KSA9PiB7XHJcbiAgICBpZiAoZHJvcFN1Z2dlc3RlZCA9PT0gdGhpcykge1xyXG4gICAgICBldnQucHJldmVudERlZmF1bHQoKVxyXG4gICAgICBldnQuc3RvcFByb3BhZ2F0aW9uKClcclxuICAgICAgVW5zZWxlY3REcm9wU3VnZ2VzdGVkKHRoaXMpXHJcbiAgICB9XHJcbiAgfVxyXG4gIHJlbmRlcigpOiBSZWFjdCRFbGVtZW50PGFueT4ge1xyXG4gICAgY29uc3Qge1xyXG4gICAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tdW51c2VkLXZhcnNcclxuICAgICAgb25Ecm9wLCBvbkRyb3BNYXRjaCwgb25Ecm9wSGlnaHRsaWdodCwgc2VsZWN0ZWRDbGFzc05hbWUsXHJcbiAgICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby11bnVzZWQtdmFyc1xyXG4gICAgICBoaWdobGlnaHRDbGFzc05hbWUsIGlzRHJvcHBhYmxlLCAuLi5vdGhlclByb3BzIH0gPSB0aGlzLnByb3BzXHJcbiAgICByZXR1cm4gKFxyXG4gICAgICA8ZGl2XHJcbiAgICAgICAgcmVmPXsgXCJ6b25lXCIgfVxyXG4gICAgICAgIGNsYXNzTmFtZT17IHRoaXMucHJvcHMuY2xhc3NOYW1lIH1cclxuICAgICAgICBvbkRyb3A9eyB0aGlzLmhhbmRsZURyb3AgfVxyXG4gICAgICAgIG9uRHJhZ092ZXI9eyB0aGlzLmhhbmRsZURyYWdPdmVyIH1cclxuICAgICAgICBvbkRyYWdFbnRlcj17IHRoaXMuaGFuZGxlRHJhZ0VudGVyIH1cclxuICAgICAgICBvbkRyYWdMZWF2ZT17IHRoaXMuaGFuZGxlRHJhZ0xlYXZlIH1cclxuICAgICAgICB7IC4uLm90aGVyUHJvcHMgfVxyXG4gICAgICAvPilcclxuICB9XHJcbn1cclxuXHJcbmV4cG9ydCBjbGFzcyBEcmFnRHJvcFpvbmUgZXh0ZW5kcyBEcm9wWm9uZSB7XHJcblxyXG4gIGhhbmRsZURyYWdTdGFydCA9IChldnQpID0+IHtcclxuICAgIGNvbnN0IGJhZyA9IHRoaXMucHJvcHMub25EcmFnU3RhcnQgJiYgdGhpcy5wcm9wcy5vbkRyYWdTdGFydChldnQpXHJcbiAgICBpZiAoYmFnKSB7XHJcbiAgICAgIGV2dC5zdG9wUHJvcGFnYXRpb24oKVxyXG4gICAgICBvYmplY3RUb0RhdGFUcmFuc2ZlcnQoYmFnLCBldnQuZGF0YVRyYW5zZmVyKVxyXG4gICAgICBGb2N1c0Ryb3Bab25lKGJhZylcclxuICAgIH1cclxuICB9XHJcbiAgaGFuZGxlRHJhZ0VuZCA9IChldnQpID0+IHtcclxuICAgIGV2dC5zdG9wUHJvcGFnYXRpb24oKVxyXG4gICAgdGhpcy5wcm9wcy5vbkRyYWdFbmQgJiYgdGhpcy5wcm9wcy5vbkRyYWdFbmQoZXZ0KVxyXG4gICAgQmx1ckRyb3Bab25lKClcclxuICB9XHJcbiAgcmVuZGVyKCk6IFJlYWN0JEVsZW1lbnQ8YW55PiB7XHJcbiAgICBjb25zdCB7XHJcbiAgICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby11bnVzZWQtdmFyc1xyXG4gICAgICBvbkRyb3AsIG9uRHJvcE1hdGNoLCBvbkRyb3BIaWdodGxpZ2h0LCBzZWxlY3RlZENsYXNzTmFtZSxcclxuICAgICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXVudXNlZC12YXJzXHJcbiAgICAgIGhpZ2hsaWdodENsYXNzTmFtZSwgaXNEcm9wcGFibGUsIG9uRHJhZ1N0YXJ0LCBvbkRyYWdFbmQsXHJcbiAgICAgIC4uLm90aGVyUHJvcHNcclxuICAgIH0gPSB0aGlzLnByb3BzXHJcbiAgICByZXR1cm4gKFxyXG4gICAgICA8ZGl2XHJcbiAgICAgICAgcmVmPXsgXCJ6b25lXCIgfVxyXG4gICAgICAgIGRyYWdnYWJsZVxyXG4gICAgICAgIGNsYXNzTmFtZT17IHRoaXMucHJvcHMuY2xhc3NOYW1lIH1cclxuICAgICAgICBvbk1vdXNlRG93bj17IHN0b3BQcm9wYWdhdGlvbiB9XHJcbiAgICAgICAgb25EcmFnU3RhcnQ9eyB0aGlzLmhhbmRsZURyYWdTdGFydCB9XHJcbiAgICAgICAgb25EcmFnRW5kPXsgdGhpcy5oYW5kbGVEcmFnRW5kIH1cclxuICAgICAgICBvbkRyb3A9eyB0aGlzLmhhbmRsZURyb3AgfVxyXG4gICAgICAgIG9uRHJhZ092ZXI9eyB0aGlzLmhhbmRsZURyYWdPdmVyIH1cclxuICAgICAgICBvbkRyYWdFbnRlcj17IHRoaXMuaGFuZGxlRHJhZ0VudGVyIH1cclxuICAgICAgICBvbkRyYWdMZWF2ZT17IHRoaXMuaGFuZGxlRHJhZ0xlYXZlIH1cclxuICAgICAgICB7IC4uLm90aGVyUHJvcHMgfVxyXG4gICAgICAvPilcclxuICB9XHJcbn0iXX0=