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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9saWIvdWktbW9kdWxlcy9EcmFnQW5kRHJvcC5qcyJdLCJuYW1lcyI6WyJkcmFnZ2VkWm9uZSIsImRyb3BTdWdnZXN0ZWQiLCJkcm9wUmVnaXN0cnkiLCJTZWxlY3REcm9wU3VnZ2VzdGVkIiwiem9uZSIsInVuc2VsZWN0Iiwic2VsZWN0IiwiVW5zZWxlY3REcm9wU3VnZ2VzdGVkIiwiUmVnaXN0ZXJEcm9wWm9uZSIsInpvbmVJZCIsImxlbmd0aCIsInB1c2giLCJVbnJlZ2lzdGVyRHJvcFpvbmUiLCJsem9uZSIsInVuZGVmaW5lZCIsInBvcCIsIkZvY3VzRHJvcFpvbmUiLCJkYXRhIiwiZm9yRWFjaCIsIngiLCJhY3RpdmF0ZSIsIkJsdXJEcm9wWm9uZSIsImRlYWN0aXZhdGUiLCJvYmplY3RUb0RhdGFUcmFuc2ZlcnQiLCJvYmoiLCJkYXRhVHJhbnNmZXIiLCJPYmplY3QiLCJrZXlzIiwia2V5Iiwic2V0RGF0YSIsIkpTT04iLCJzdHJpbmdpZnkiLCJkcmFnSW1hZ2UiLCJzZXREcmFnSW1hZ2UiLCJlbGVtZW50IiwibGVmdCIsInRvcCIsImRhdGFUcmFuc2ZlcnRUb09iamVjdCIsInR5cGVzIiwicGFyc2UiLCJnZXREYXRhIiwiZSIsIkRyYWdab25lIiwiaGFuZGxlRHJhZ1N0YXJ0IiwiZXZ0IiwiYmFnIiwicHJvcHMiLCJvbkRyYWdTdGFydCIsInN0b3BQcm9wYWdhdGlvbiIsImhhbmRsZURyYWdFbmQiLCJkcmFnQ29tcGxldGUiLCJvbkRyYWdFbmQiLCJvdGhlclByb3BzIiwic3R5bGUiLCJEcm9wWm9uZSIsImNvbXBvbmVudFdpbGxNb3VudCIsImNvbXBvbmVudFdpbGxVbm1vdW50IiwiYWN0aXZlIiwiaGFuZGxlRHJvcCIsInByZXZlbnREZWZhdWx0IiwicmVjdCIsImN1cnJlbnRUYXJnZXQiLCJnZXRCb3VuZGluZ0NsaWVudFJlY3QiLCJjbGllbnRYIiwieSIsImNsaWVudFkiLCJhY2tub3dsZWRnbWVudCIsIm9uRHJvcCIsImNvbnNvbGUiLCJlcnJvciIsImhhbmRsZURyYWdPdmVyIiwib25Ecm9wTWF0Y2giLCJoYW5kbGVEcmFnRW50ZXIiLCJyZWZzIiwiaGFuZGxlRHJhZ0xlYXZlIiwiaXNEcm9wcGFibGUiLCJkb20iLCJoaWdobGlnaHRDbGFzc05hbWUiLCJjbGFzc05hbWUiLCJzZWxlY3RlZENsYXNzTmFtZSIsIm9uRHJvcEhpZ2h0bGlnaHQiLCJEcmFnRHJvcFpvbmUiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7O0FBR0E7Ozs7QUFFQTs7Ozs7Ozs7OzsrZUFMQTtBQUNBO0FBQ0E7OztBQUtBLElBQUlBLGNBQXdCLElBQTVCO0FBQ0EsSUFBSUMsZ0JBQTBCLElBQTlCO0FBQ0EsSUFBTUMsZUFBeUMsRUFBL0M7O0FBRUEsU0FBU0MsbUJBQVQsQ0FBNkJDLElBQTdCLEVBQTZDO0FBQzNDLE1BQUlILGFBQUosRUFBbUI7QUFDakJBLGtCQUFjSSxRQUFkO0FBQ0Q7QUFDREQsT0FBS0UsTUFBTDtBQUNBTCxrQkFBZ0JHLElBQWhCO0FBQ0Q7O0FBRUQsU0FBU0cscUJBQVQsQ0FBK0JILElBQS9CLEVBQStDO0FBQzdDQSxPQUFLQyxRQUFMO0FBQ0EsTUFBSUosa0JBQWtCRyxJQUF0QixFQUE0QjtBQUMxQkgsb0JBQWdCLElBQWhCO0FBQ0Q7QUFDRjs7QUFFRCxTQUFTTyxnQkFBVCxDQUEwQkosSUFBMUIsRUFBMEM7QUFDeENBLE9BQUtLLE1BQUwsR0FBY1AsYUFBYVEsTUFBM0I7QUFDQVIsZUFBYVMsSUFBYixDQUFrQlAsSUFBbEI7QUFDRDs7QUFFRCxTQUFTUSxrQkFBVCxDQUE0QlIsSUFBNUIsRUFBNEM7QUFDMUMsTUFBTVMsUUFBUVgsYUFBYUEsYUFBYVEsTUFBYixHQUFzQixDQUFuQyxDQUFkO0FBQ0FHLFFBQU1KLE1BQU4sR0FBZUwsS0FBS0ssTUFBcEI7QUFDQUwsT0FBS0ssTUFBTCxHQUFjSyxTQUFkO0FBQ0FaLGVBQWFXLE1BQU1KLE1BQW5CLElBQTZCSSxLQUE3QjtBQUNBWCxlQUFhYSxHQUFiO0FBQ0Q7O0FBRUQs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O0FBT0UsZ0JBQVMsS0FBS1MsVUFQaEI7QUFRRSxvQkFBYSxLQUFLWSxjQVJwQjtBQVNFLHFCQUFjLEtBQUtFLGVBVHJCO0FBVUUscUJBQWMsS0FBS0U7QUFWckIsU0FXT3RCLFVBWFAsRUFERjtBQWNEOzs7O0VBckMrQkUsUSIsImZpbGUiOiJEcmFnQW5kRHJvcC5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8qIGVzbGludC1kaXNhYmxlIHJlYWN0L25vLXN0cmluZy1yZWZzICovXHJcbi8qIGVzbGludC1kaXNhYmxlIHJlYWN0L25vLW11bHRpLWNvbXAgKi9cclxuLyogZXNsaW50LWRpc2FibGUgbm8tdXNlLWJlZm9yZS1kZWZpbmUgKi9cclxuaW1wb3J0IFJlYWN0LCB7IENvbXBvbmVudCB9IGZyb20gXCJyZWFjdFwiXHJcblxyXG5pbXBvcnQgeyBzdG9wUHJvcGFnYXRpb24gfSBmcm9tIFwiLi9ldmVudC51dGlsc1wiXHJcblxyXG5sZXQgZHJhZ2dlZFpvbmU6IERyYWdab25lID0gbnVsbFxyXG5sZXQgZHJvcFN1Z2dlc3RlZDogRHJvcFpvbmUgPSBudWxsXHJcbmNvbnN0IGRyb3BSZWdpc3RyeTogQXJyYXk8RHJvcFpvbmUgfCBudW1iZXI+ID0gW11cclxuXHJcbmZ1bmN0aW9uIFNlbGVjdERyb3BTdWdnZXN0ZWQoem9uZTogRHJvcFpvbmUpIHtcclxuICBpZiAoZHJvcFN1Z2dlc3RlZCkge1xyXG4gICAgZHJvcFN1Z2dlc3RlZC51bnNlbGVjdCgpXHJcbiAgfVxyXG4gIHpvbmUuc2VsZWN0KClcclxuICBkcm9wU3VnZ2VzdGVkID0gem9uZVxyXG59XHJcblxyXG5mdW5jdGlvbiBVbnNlbGVjdERyb3BTdWdnZXN0ZWQoem9uZTogRHJvcFpvbmUpIHtcclxuICB6b25lLnVuc2VsZWN0KClcclxuICBpZiAoZHJvcFN1Z2dlc3RlZCA9PT0gem9uZSkge1xyXG4gICAgZHJvcFN1Z2dlc3RlZCA9IG51bGxcclxuICB9XHJcbn1cclxuXHJcbmZ1bmN0aW9uIFJlZ2lzdGVyRHJvcFpvbmUoem9uZTogRHJvcFpvbmUpIHtcclxuICB6b25lLnpvbmVJZCA9IGRyb3BSZWdpc3RyeS5sZW5ndGhcclxuICBkcm9wUmVnaXN0cnkucHVzaCh6b25lKVxyXG59XHJcblxyXG5mdW5jdGlvbiBVbnJlZ2lzdGVyRHJvcFpvbmUoem9uZTogRHJvcFpvbmUpIHtcclxuICBjb25zdCBsem9uZSA9IGRyb3BSZWdpc3RyeVtkcm9wUmVnaXN0cnkubGVuZ3RoIC0gMV1cclxuICBsem9uZS56b25lSWQgPSB6b25lLnpvbmVJZFxyXG4gIHpvbmUuem9uZUlkID0gdW5kZWZpbmVkXHJcbiAgZHJvcFJlZ2lzdHJ5W2x6b25lLnpvbmVJZF0gPSBsem9uZVxyXG4gIGRyb3BSZWdpc3RyeS5wb3AoKVxyXG59XHJcblxyXG5mdW5jdGlvbiBGb2N1c0Ryb3Bab25lKGRhdGE6IGFueSkge1xyXG4gIGRyb3BSZWdpc3RyeS5mb3JFYWNoKHggPT4geC5hY3RpdmF0ZShkYXRhKSlcclxufVxyXG5cclxuZnVuY3Rpb24gQmx1ckRyb3Bab25lKCkge1xyXG4gIGRyb3BSZWdpc3RyeS5mb3JFYWNoKHggPT4geC5kZWFjdGl2YXRlKCkpXHJcbn1cclxuXHJcbnR5cGUgRHJhZ1Byb3BzVHlwZSA9IHtcclxuICBvbkRyYWdTdGFydDogRnVuY3Rpb24sXHJcbiAgb25EcmFnRW5kOiBGdW5jdGlvbixcclxuICBzdHlsZT86IGFueSxcclxufVxyXG5cclxuZnVuY3Rpb24gb2JqZWN0VG9EYXRhVHJhbnNmZXJ0KG9iajogT2JqZWN0LCBkYXRhVHJhbnNmZXI6IE9iamVjdCkge1xyXG4gIE9iamVjdC5rZXlzKG9iaikuZm9yRWFjaChrZXkgPT4ge1xyXG4gICAgaWYgKGtleSAhPT0gXCJkcmFnSW1hZ2VcIikge1xyXG4gICAgICBkYXRhVHJhbnNmZXIuc2V0RGF0YShrZXksIEpTT04uc3RyaW5naWZ5KG9ialtrZXldKSlcclxuICAgIH1cclxuICB9KVxyXG4gIGlmIChvYmouZHJhZ0ltYWdlKSB7XHJcbiAgICBkYXRhVHJhbnNmZXIuc2V0RHJhZ0ltYWdlKG9iai5kcmFnSW1hZ2UuZWxlbWVudCwgb2JqLmRyYWdJbWFnZS5sZWZ0IHx8IDAsIG9iai5kcmFnSW1hZ2UudG9wIHx8IDApXHJcbiAgfVxyXG59XHJcblxyXG5mdW5jdGlvbiBkYXRhVHJhbnNmZXJ0VG9PYmplY3QoZGF0YVRyYW5zZmVyOiBPYmplY3QpOiBPYmplY3Qge1xyXG4gIGNvbnN0IG9iaiA9IHt9XHJcbiAgZGF0YVRyYW5zZmVyLnR5cGVzLmZvckVhY2goKGtleSkgPT4ge1xyXG4gICAgdHJ5IHtcclxuICAgICAgb2JqW2tleV0gPSBKU09OLnBhcnNlKGRhdGFUcmFuc2Zlci5nZXREYXRhKGtleSkpXHJcbiAgICB9XHJcbiAgICBjYXRjaCAoZSkge1xyXG4gICAgICAvLyBOb3RoaW5nXHJcbiAgICB9XHJcbiAgfSlcclxuICByZXR1cm4gb2JqXHJcbn1cclxuXHJcbmV4cG9ydCBjbGFzcyBEcmFnWm9uZSBleHRlbmRzIENvbXBvbmVudCB7XHJcbiAgcHJvcHM6IERyYWdQcm9wc1R5cGVcclxuXHJcbiAgaGFuZGxlRHJhZ1N0YXJ0ID0gKGV2dCkgPT4ge1xyXG4gICAgY29uc3QgYmFnID0gdGhpcy5wcm9wcy5vbkRyYWdTdGFydCAmJiB0aGlzLnByb3BzLm9uRHJhZ1N0YXJ0KGV2dClcclxuICAgIGlmIChiYWcpIHtcclxuICAgICAgZHJhZ2dlZFpvbmUgPSB0aGlzXHJcbiAgICAgIGV2dC5zdG9wUHJvcGFnYXRpb24oKVxyXG4gICAgICBvYmplY3RUb0RhdGFUcmFuc2ZlcnQoYmFnLCBldnQuZGF0YVRyYW5zZmVyKVxyXG4gICAgICBGb2N1c0Ryb3Bab25lKGJhZylcclxuICAgIH1cclxuICB9XHJcbiAgaGFuZGxlRHJhZ0VuZCA9IChldnQpID0+IHtcclxuICAgIGV2dC5zdG9wUHJvcGFnYXRpb24oKVxyXG4gICAgdGhpcy5kcmFnQ29tcGxldGUoKVxyXG4gICAgQmx1ckRyb3Bab25lKClcclxuICB9XHJcbiAgZHJhZ0NvbXBsZXRlKGRhdGE6IGFueSkge1xyXG4gICAgaWYgKGRyYWdnZWRab25lID09PSB0aGlzKSB7XHJcbiAgICAgIHRoaXMucHJvcHMub25EcmFnRW5kICYmIHRoaXMucHJvcHMub25EcmFnRW5kKGRhdGEgfHwge30pXHJcbiAgICB9XHJcbiAgICBkcmFnZ2VkWm9uZSA9IG51bGxcclxuICB9XHJcbiAgcmVuZGVyKCk6IFJlYWN0JEVsZW1lbnQ8YW55PiB7XHJcbiAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tdW51c2VkLXZhcnNcclxuICAgIGNvbnN0IHsgb25EcmFnU3RhcnQsIG9uRHJhZ0VuZCwgLi4ub3RoZXJQcm9wcyB9ID0gdGhpcy5wcm9wc1xyXG4gICAgcmV0dXJuIChcclxuICAgICAgPGRpdlxyXG4gICAgICAgIHN0eWxlPXsgdGhpcy5wcm9wcy5zdHlsZSB9XHJcbiAgICAgICAgZHJhZ2dhYmxlXHJcbiAgICAgICAgb25Nb3VzZURvd249eyBzdG9wUHJvcGFnYXRpb24gfVxyXG4gICAgICAgIG9uRHJhZ1N0YXJ0PXsgdGhpcy5oYW5kbGVEcmFnU3RhcnQgfVxyXG4gICAgICAgIG9uRHJhZ0VuZD17IHRoaXMuaGFuZGxlRHJhZ0VuZCB9XHJcbiAgICAgICAgeyAuLi5vdGhlclByb3BzIH1cclxuICAgICAgLz4pXHJcbiAgfVxyXG59XHJcblxyXG50eXBlIERyb3BQcm9wc1R5cGUgPSB7XHJcbiAgb25Ecm9wOiBGdW5jdGlvbixcclxuICBvbkRyb3BNYXRjaDogRnVuY3Rpb24sXHJcbiAgb25Ecm9wSGlnaHRsaWdodDogRnVuY3Rpb24sXHJcbiAgY2xhc3NOYW1lOiBzdHJpbmcsXHJcbiAgc2VsZWN0ZWRDbGFzc05hbWU6IHN0cmluZyxcclxuICBoaWdobGlnaHRDbGFzc05hbWU6IHN0cmluZyxcclxuICBpc0Ryb3BwYWJsZT86IEZ1bmN0aW9uXHJcbn1cclxuXHJcbmV4cG9ydCBjbGFzcyBEcm9wWm9uZSBleHRlbmRzIENvbXBvbmVudCB7XHJcbiAgcHJvcHM6IERyb3BQcm9wc1R5cGVcclxuXHJcbiAgY29tcG9uZW50V2lsbE1vdW50ID0gKCkgPT4ge1xyXG4gICAgUmVnaXN0ZXJEcm9wWm9uZSh0aGlzKVxyXG4gIH1cclxuICBjb21wb25lbnRXaWxsVW5tb3VudCA9ICgpID0+IHtcclxuICAgIFVucmVnaXN0ZXJEcm9wWm9uZSh0aGlzKVxyXG4gIH1cclxuXHJcbiAgem9uZUlkOiBudW1iZXIgPSB1bmRlZmluZWRcclxuICBhY3RpdmU6IGJvb2xlYW4gPSBmYWxzZVxyXG5cclxuICBhY3RpdmF0ZShkYXRhKSB7XHJcbiAgICBjb25zdCBwcm9wcyA9IHRoaXMucHJvcHNcclxuICAgIGlmICghcHJvcHMuaXNEcm9wcGFibGUgfHwgcHJvcHMuaXNEcm9wcGFibGUoZGF0YSkpIHtcclxuICAgICAgdGhpcy5hY3RpdmUgPSB0cnVlXHJcbiAgICB9XHJcbiAgICBlbHNlIHtcclxuICAgICAgdGhpcy5hY3RpdmUgPSBmYWxzZVxyXG4gICAgfVxyXG4gICAgY29uc3QgZG9tID0gdGhpcy5yZWZzLnpvbmVcclxuICAgIGlmICh0aGlzLmFjdGl2ZSAmJiBwcm9wcy5oaWdobGlnaHRDbGFzc05hbWUpIHtcclxuICAgICAgZG9tLmNsYXNzTmFtZSA9IHByb3BzLmNsYXNzTmFtZSArIFwiIFwiICsgcHJvcHMuaGlnaGxpZ2h0Q2xhc3NOYW1lXHJcbiAgICB9XHJcbiAgICBlbHNlIHtcclxuICAgICAgZG9tLmNsYXNzTmFtZSA9IHByb3BzLmNsYXNzTmFtZVxyXG4gICAgfVxyXG4gIH1cclxuICBkZWFjdGl2YXRlKCkge1xyXG4gICAgaWYgKHRoaXMuYWN0aXZlKSB7XHJcbiAgICAgIGNvbnN0IGRvbSA9IHRoaXMucmVmcy56b25lXHJcbiAgICAgIGRvbS5jbGFzc05hbWUgPSB0aGlzLnByb3BzLmNsYXNzTmFtZVxyXG4gICAgICB0aGlzLmFjdGl2ZSA9IGZhbHNlXHJcbiAgICB9XHJcbiAgfVxyXG4gIHNlbGVjdCgpIHtcclxuICAgIGNvbnN0IHByb3BzID0gdGhpcy5wcm9wc1xyXG4gICAgY29uc3QgZG9tID0gdGhpcy5yZWZzLnpvbmVcclxuICAgIGlmICh0aGlzLmFjdGl2ZSAmJiBwcm9wcy5zZWxlY3RlZENsYXNzTmFtZSkge1xyXG4gICAgICBpZiAocHJvcHMuaGlnaGxpZ2h0Q2xhc3NOYW1lKSB7XHJcbiAgICAgICAgZG9tLmNsYXNzTmFtZSA9IHByb3BzLmNsYXNzTmFtZSArIFwiIFwiICsgcHJvcHMuaGlnaGxpZ2h0Q2xhc3NOYW1lICsgXCIgXCIgKyBwcm9wcy5zZWxlY3RlZENsYXNzTmFtZVxyXG4gICAgICB9XHJcbiAgICAgIGVsc2Uge1xyXG4gICAgICAgIGRvbS5jbGFzc05hbWUgPSBwcm9wcy5jbGFzc05hbWUgKyBcIiBcIiArIHByb3BzLnNlbGVjdGVkQ2xhc3NOYW1lXHJcbiAgICAgIH1cclxuICAgIH1cclxuICAgIGVsc2Uge1xyXG4gICAgICBkb20uY2xhc3NOYW1lID0gcHJvcHMuY2xhc3NOYW1lXHJcbiAgICB9XHJcbiAgfVxyXG4gIHVuc2VsZWN0KCkge1xyXG4gICAgY29uc3QgcHJvcHMgPSB0aGlzLnByb3BzXHJcbiAgICBjb25zdCBkb20gPSB0aGlzLnJlZnMuem9uZVxyXG4gICAgaWYgKHRoaXMuYWN0aXZlICYmIHByb3BzLmhpZ2hsaWdodENsYXNzTmFtZSkge1xyXG4gICAgICBkb20uY2xhc3NOYW1lID0gcHJvcHMuY2xhc3NOYW1lICsgXCIgXCIgKyBwcm9wcy5oaWdobGlnaHRDbGFzc05hbWVcclxuICAgIH1cclxuICAgIGVsc2Uge1xyXG4gICAgICBkb20uY2xhc3NOYW1lID0gcHJvcHMuY2xhc3NOYW1lXHJcbiAgICB9XHJcbiAgfVxyXG4gIGhhbmRsZURyb3AgPSAoZXZ0KSA9PiB7XHJcbiAgICBpZiAoZHJvcFN1Z2dlc3RlZCA9PT0gdGhpcykge1xyXG4gICAgICBldnQuc3RvcFByb3BhZ2F0aW9uKClcclxuICAgICAgZXZ0LnByZXZlbnREZWZhdWx0KClcclxuICAgICAgVW5zZWxlY3REcm9wU3VnZ2VzdGVkKHRoaXMpXHJcbiAgICAgIGNvbnN0IHJlY3QgPSBldnQuY3VycmVudFRhcmdldC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKVxyXG4gICAgICBjb25zdCB4ID0gZXZ0LmNsaWVudFggLSByZWN0LmxlZnRcclxuICAgICAgY29uc3QgeSA9IGV2dC5jbGllbnRZIC0gcmVjdC50b3BcclxuICAgICAgY29uc3QgYmFnID0gZGF0YVRyYW5zZmVydFRvT2JqZWN0KGV2dC5kYXRhVHJhbnNmZXIpXHJcbiAgICAgIHRyeSB7XHJcbiAgICAgICAgY29uc3QgYWNrbm93bGVkZ21lbnQgPSB0aGlzLnByb3BzLm9uRHJvcCAmJiB0aGlzLnByb3BzLm9uRHJvcChiYWcsIHgsIHkpXHJcbiAgICAgICAgZHJhZ2dlZFpvbmUgJiYgZHJhZ2dlZFpvbmUuZHJhZ0NvbXBsZXRlKGFja25vd2xlZGdtZW50KVxyXG4gICAgICB9XHJcbiAgICAgIGNhdGNoIChlKSB7XHJcbiAgICAgICAgY29uc29sZS5lcnJvcihlKVxyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfVxyXG4gIGhhbmRsZURyYWdPdmVyID0gKGV2dCkgPT4ge1xyXG4gICAgaWYgKGRyb3BTdWdnZXN0ZWQgPT09IHRoaXMgfHwgIXRoaXMucHJvcHMub25Ecm9wTWF0Y2ggfHwgdGhpcy5wcm9wcy5vbkRyb3BNYXRjaChldnQuZGF0YVRyYW5zZmVyLnR5cGVzKSkge1xyXG4gICAgICBldnQucHJldmVudERlZmF1bHQoKVxyXG4gICAgICBldnQuc3RvcFByb3BhZ2F0aW9uKClcclxuICAgICAgU2VsZWN0RHJvcFN1Z2dlc3RlZCh0aGlzKVxyXG4gICAgfVxyXG4gIH1cclxuICBoYW5kbGVEcmFnRW50ZXIgPSAoZXZ0KSA9PiB7XHJcbiAgICBpZiAoZHJvcFN1Z2dlc3RlZCA9PT0gdGhpcyB8fCAhdGhpcy5wcm9wcy5vbkRyb3BNYXRjaCB8fCB0aGlzLnByb3BzLm9uRHJvcE1hdGNoKGV2dC5kYXRhVHJhbnNmZXIudHlwZXMpKSB7XHJcbiAgICAgIGV2dC5wcmV2ZW50RGVmYXVsdCgpXHJcbiAgICAgIGV2dC5zdG9wUHJvcGFnYXRpb24oKVxyXG4gICAgICBpZiAoZXZ0LmN1cnJlbnRUYXJnZXQgPT09IHRoaXMucmVmcy56b25lKSB7XHJcbiAgICAgICAgU2VsZWN0RHJvcFN1Z2dlc3RlZCh0aGlzKVxyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfVxyXG4gIGhhbmRsZURyYWdMZWF2ZSA9IChldnQpID0+IHtcclxuICAgIGlmIChkcm9wU3VnZ2VzdGVkID09PSB0aGlzKSB7XHJcbiAgICAgIGV2dC5wcmV2ZW50RGVmYXVsdCgpXHJcbiAgICAgIGV2dC5zdG9wUHJvcGFnYXRpb24oKVxyXG4gICAgICBVbnNlbGVjdERyb3BTdWdnZXN0ZWQodGhpcylcclxuICAgIH1cclxuICB9XHJcbiAgcmVuZGVyKCk6IFJlYWN0JEVsZW1lbnQ8YW55PiB7XHJcbiAgICBjb25zdCB7XHJcbiAgICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby11bnVzZWQtdmFyc1xyXG4gICAgICBvbkRyb3AsIG9uRHJvcE1hdGNoLCBvbkRyb3BIaWdodGxpZ2h0LCBzZWxlY3RlZENsYXNzTmFtZSxcclxuICAgICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXVudXNlZC12YXJzXHJcbiAgICAgIGhpZ2hsaWdodENsYXNzTmFtZSwgaXNEcm9wcGFibGUsIC4uLm90aGVyUHJvcHMgfSA9IHRoaXMucHJvcHNcclxuICAgIHJldHVybiAoXHJcbiAgICAgIDxkaXZcclxuICAgICAgICByZWY9eyBcInpvbmVcIiB9XHJcbiAgICAgICAgY2xhc3NOYW1lPXsgdGhpcy5wcm9wcy5jbGFzc05hbWUgfVxyXG4gICAgICAgIG9uRHJvcD17IHRoaXMuaGFuZGxlRHJvcCB9XHJcbiAgICAgICAgb25EcmFnT3Zlcj17IHRoaXMuaGFuZGxlRHJhZ092ZXIgfVxyXG4gICAgICAgIG9uRHJhZ0VudGVyPXsgdGhpcy5oYW5kbGVEcmFnRW50ZXIgfVxyXG4gICAgICAgIG9uRHJhZ0xlYXZlPXsgdGhpcy5oYW5kbGVEcmFnTGVhdmUgfVxyXG4gICAgICAgIHsgLi4ub3RoZXJQcm9wcyB9XHJcbiAgICAgIC8+KVxyXG4gIH1cclxufVxyXG5cclxuZXhwb3J0IGNsYXNzIERyYWdEcm9wWm9uZSBleHRlbmRzIERyb3Bab25lIHtcclxuXHJcbiAgaGFuZGxlRHJhZ1N0YXJ0ID0gKGV2dCkgPT4ge1xyXG4gICAgY29uc3QgYmFnID0gdGhpcy5wcm9wcy5vbkRyYWdTdGFydCAmJiB0aGlzLnByb3BzLm9uRHJhZ1N0YXJ0KGV2dClcclxuICAgIGlmIChiYWcpIHtcclxuICAgICAgZXZ0LnN0b3BQcm9wYWdhdGlvbigpXHJcbiAgICAgIG9iamVjdFRvRGF0YVRyYW5zZmVydChiYWcsIGV2dC5kYXRhVHJhbnNmZXIpXHJcbiAgICAgIEZvY3VzRHJvcFpvbmUoYmFnKVxyXG4gICAgfVxyXG4gIH1cclxuICBoYW5kbGVEcmFnRW5kID0gKGV2dCkgPT4ge1xyXG4gICAgZXZ0LnN0b3BQcm9wYWdhdGlvbigpXHJcbiAgICB0aGlzLnByb3BzLm9uRHJhZ0VuZCAmJiB0aGlzLnByb3BzLm9uRHJhZ0VuZChldnQpXHJcbiAgICBCbHVyRHJvcFpvbmUoKVxyXG4gIH1cclxuICByZW5kZXIoKTogUmVhY3QkRWxlbWVudDxhbnk+IHtcclxuICAgIGNvbnN0IHtcclxuICAgICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXVudXNlZC12YXJzXHJcbiAgICAgIG9uRHJvcCwgb25Ecm9wTWF0Y2gsIG9uRHJvcEhpZ2h0bGlnaHQsIHNlbGVjdGVkQ2xhc3NOYW1lLFxyXG4gICAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tdW51c2VkLXZhcnNcclxuICAgICAgaGlnaGxpZ2h0Q2xhc3NOYW1lLCBpc0Ryb3BwYWJsZSwgb25EcmFnU3RhcnQsIG9uRHJhZ0VuZCxcclxuICAgICAgLi4ub3RoZXJQcm9wcyxcclxuICAgIH0gPSB0aGlzLnByb3BzXHJcbiAgICByZXR1cm4gKFxyXG4gICAgICA8ZGl2XHJcbiAgICAgICAgcmVmPXsgXCJ6b25lXCIgfVxyXG4gICAgICAgIGRyYWdnYWJsZVxyXG4gICAgICAgIGNsYXNzTmFtZT17IHRoaXMucHJvcHMuY2xhc3NOYW1lIH1cclxuICAgICAgICBvbk1vdXNlRG93bj17IHN0b3BQcm9wYWdhdGlvbiB9XHJcbiAgICAgICAgb25EcmFnU3RhcnQ9eyB0aGlzLmhhbmRsZURyYWdTdGFydCB9XHJcbiAgICAgICAgb25EcmFnRW5kPXsgdGhpcy5oYW5kbGVEcmFnRW5kIH1cclxuICAgICAgICBvbkRyb3A9eyB0aGlzLmhhbmRsZURyb3AgfVxyXG4gICAgICAgIG9uRHJhZ092ZXI9eyB0aGlzLmhhbmRsZURyYWdPdmVyIH1cclxuICAgICAgICBvbkRyYWdFbnRlcj17IHRoaXMuaGFuZGxlRHJhZ0VudGVyIH1cclxuICAgICAgICBvbkRyYWdMZWF2ZT17IHRoaXMuaGFuZGxlRHJhZ0xlYXZlIH1cclxuICAgICAgICB7IC4uLm90aGVyUHJvcHMgfVxyXG4gICAgICAvPilcclxuICB9XHJcbn0iXX0=