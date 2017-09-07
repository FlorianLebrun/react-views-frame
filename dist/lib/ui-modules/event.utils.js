"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

exports.stopEvent = stopEvent;
exports.stopPropagation = stopPropagation;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function stopEvent(e) {
  if (e.stopPropagation) e.stopPropagation();
  if (e.preventDefault) e.preventDefault();
  return false;
}

function stopPropagation(e) {
  if (e.stopPropagation) e.stopPropagation();
  return false;
}

var HtmlScrollingReaction = exports.HtmlScrollingReaction = function () {
  function HtmlScrollingReaction(element, event, onMouseScroll) {
    _classCallCheck(this, HtmlScrollingReaction);

    stopEvent(event);
    this.element = element;
    this.mouseX = event.screenX;
    this.mouseY = event.screenY;
    this.scrollX = element.scrollLeft;
    this.scrollY = element.scrollTop;
    this.onMouseScroll = onMouseScroll;
    setCurrentGrabReaction(this);
  }

  _createClass(HtmlScrollingReaction, [{
    key: "scroll",
    value: function scroll() {
      this.element.scrollLeft = this.scrollX;
      this.element.scrollTop = this.scrollY;
    }
  }, {
    key: "handleMouseMove",
    value: function handleMouseMove(event) {
      stopEvent(event);
      this.scrollX += this.mouseX - event.screenX;
      this.scrollY += this.mouseY - event.screenY;
      this.mouseX = event.screenX;
      this.mouseY = event.screenY;
      if (this.onMouseScroll) this.onMouseScroll(this);else this.scroll();
    }
  }, {
    key: "handleCompleted",
    value: function handleCompleted() {
      removeCurrentGrabReaction(this);
    }
  }]);

  return HtmlScrollingReaction;
}();

var HtmlGrabReaction = exports.HtmlGrabReaction = function () {
  function HtmlGrabReaction(element, event, onMouseGrab) {
    _classCallCheck(this, HtmlGrabReaction);

    stopEvent(event);
    this.element = element;
    this.mouseX = event.screenX;
    this.mouseY = event.screenY;
    this.left = element.offsetLeft;
    this.top = element.offsetTop;
    this.onMouseGrab = onMouseGrab;
    setCurrentGrabReaction(this);
  }

  _createClass(HtmlGrabReaction, [{
    key: "move",
    value: function move() {
      this.element.style.left = this.left + "px";
      this.element.style.top = this.top + "px";
    }
  }, {
    key: "handleMouseMove",
    value: function handleMouseMove(event) {
      stopEvent(event);
      this.deltaX = event.screenX - this.mouseX;
      this.deltaY = event.screenY - this.mouseY;
      this.left += this.deltaX;
      this.top += this.deltaY;
      this.mouseX = event.screenX;
      this.mouseY = event.screenY;
      if (this.onMouseGrab) this.onMouseGrab(this);else this.move();
    }
  }, {
    key: "handleCompleted",
    value: function handleCompleted() {
      removeCurrentGrabReaction(this);
    }
  }]);

  return HtmlGrabReaction;
}();

var SVGGrabReaction = exports.SVGGrabReaction = function () {
  function SVGGrabReaction(element, event, onMouseGrab) {
    _classCallCheck(this, SVGGrabReaction);

    stopEvent(event);
    this.element = element;
    this.mouseX = event.screenX;
    this.mouseY = event.screenY;
    this.x = element.x();
    this.y = element.y();
    this.onMouseGrab = onMouseGrab;
    setCurrentGrabReaction(this);
  }

  _createClass(SVGGrabReaction, [{
    key: "move",
    value: function move() {
      this.element.x(this.x);
      this.element.y(this.y);
    }
  }, {
    key: "handleMouseMove",
    value: function handleMouseMove(event) {
      stopEvent(event);
      this.x += event.screenX - this.mouseX;
      this.y += event.screenY - this.mouseY;
      this.mouseX = event.screenX;
      this.mouseY = event.screenY;
      if (this.onMouseGrab) this.onMouseGrab(this);else this.move();
    }
  }, {
    key: "handleCompleted",
    value: function handleCompleted() {
      removeCurrentGrabReaction(this);
    }
  }]);

  return SVGGrabReaction;
}();

var grabReaction = null;
function setCurrentGrabReaction(reaction) {
  grabReaction && grabReaction.handleCompleted();
  grabReaction = reaction;
}
function removeCurrentGrabReaction(reaction) {
  if (grabReaction === reaction) grabReaction = null;
}
window.addEventListener("mousemove", function (e) {
  grabReaction && grabReaction.handleMouseMove(e);
});
window.addEventListener("mouseup", function () {
  grabReaction && grabReaction.handleCompleted();
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9saWIvdWktbW9kdWxlcy9ldmVudC51dGlscy5qcyJdLCJuYW1lcyI6WyJzdG9wRXZlbnQiLCJzdG9wUHJvcGFnYXRpb24iLCJlIiwicHJldmVudERlZmF1bHQiLCJIdG1sU2Nyb2xsaW5nUmVhY3Rpb24iLCJlbGVtZW50IiwiZXZlbnQiLCJvbk1vdXNlU2Nyb2xsIiwibW91c2VYIiwic2NyZWVuWCIsIm1vdXNlWSIsInNjcmVlblkiLCJzY3JvbGxYIiwic2Nyb2xsTGVmdCIsInNjcm9sbFkiLCJzY3JvbGxUb3AiLCJzZXRDdXJyZW50R3JhYlJlYWN0aW9uIiwic2Nyb2xsIiwicmVtb3ZlQ3VycmVudEdyYWJSZWFjdGlvbiIsIkh0bWxHcmFiUmVhY3Rpb24iLCJvbk1vdXNlR3JhYiIsImxlZnQiLCJvZmZzZXRMZWZ0IiwidG9wIiwib2Zmc2V0VG9wIiwic3R5bGUiLCJkZWx0YVgiLCJkZWx0YVkiLCJtb3ZlIiwiU1ZHR3JhYlJlYWN0aW9uIiwieCIsInkiLCJncmFiUmVhY3Rpb24iLCJyZWFjdGlvbiIsImhhbmRsZUNvbXBsZXRlZCIsIndpbmRvdyIsImFkZEV2ZW50TGlzdGVuZXIiLCJoYW5kbGVNb3VzZU1vdmUiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7O1FBQ2dCQSxTLEdBQUFBLFM7UUFNQUMsZSxHQUFBQSxlOzs7O0FBTlQsU0FBU0QsU0FBVCxDQUFtQkUsQ0FBbkIsRUFBc0I7QUFDM0IsTUFBSUEsRUFBRUQsZUFBTixFQUF1QkMsRUFBRUQsZUFBRjtBQUN2QixNQUFJQyxFQUFFQyxjQUFOLEVBQXNCRCxFQUFFQyxjQUFGO0FBQ3RCLFNBQU8sS0FBUDtBQUNEOztBQUVNLFNBQVNGLGVBQVQsQ0FBeUJDLENBQXpCLEVBQTRCO0FBQ2pDLE1BQUlBLEVBQUVELGVBQU4sRUFBdUJDLEVBQUVELGVBQUY7QUFDdkIsU0FBTyxLQUFQO0FBQ0Q7O0lBRVlHLHFCLFdBQUFBLHFCO0FBQ1gsaUNBQVlDLE9BQVosRUFBcUJDLEtBQXJCLEVBQTRC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bHMuanMiLCJzb3VyY2VzQ29udGVudCI6WyJcclxuZXhwb3J0IGZ1bmN0aW9uIHN0b3BFdmVudChlKSB7XHJcbiAgaWYgKGUuc3RvcFByb3BhZ2F0aW9uKSBlLnN0b3BQcm9wYWdhdGlvbigpXHJcbiAgaWYgKGUucHJldmVudERlZmF1bHQpIGUucHJldmVudERlZmF1bHQoKVxyXG4gIHJldHVybiBmYWxzZVxyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gc3RvcFByb3BhZ2F0aW9uKGUpIHtcclxuICBpZiAoZS5zdG9wUHJvcGFnYXRpb24pIGUuc3RvcFByb3BhZ2F0aW9uKClcclxuICByZXR1cm4gZmFsc2VcclxufVxyXG5cclxuZXhwb3J0IGNsYXNzIEh0bWxTY3JvbGxpbmdSZWFjdGlvbiB7XHJcbiAgY29uc3RydWN0b3IoZWxlbWVudCwgZXZlbnQsIG9uTW91c2VTY3JvbGwpIHtcclxuICAgIHN0b3BFdmVudChldmVudClcclxuICAgIHRoaXMuZWxlbWVudCA9IGVsZW1lbnRcclxuICAgIHRoaXMubW91c2VYID0gZXZlbnQuc2NyZWVuWFxyXG4gICAgdGhpcy5tb3VzZVkgPSBldmVudC5zY3JlZW5ZXHJcbiAgICB0aGlzLnNjcm9sbFggPSBlbGVtZW50LnNjcm9sbExlZnRcclxuICAgIHRoaXMuc2Nyb2xsWSA9IGVsZW1lbnQuc2Nyb2xsVG9wXHJcbiAgICB0aGlzLm9uTW91c2VTY3JvbGwgPSBvbk1vdXNlU2Nyb2xsXHJcbiAgICBzZXRDdXJyZW50R3JhYlJlYWN0aW9uKHRoaXMpXHJcbiAgfVxyXG4gIHNjcm9sbCgpIHtcclxuICAgIHRoaXMuZWxlbWVudC5zY3JvbGxMZWZ0ID0gdGhpcy5zY3JvbGxYXHJcbiAgICB0aGlzLmVsZW1lbnQuc2Nyb2xsVG9wID0gdGhpcy5zY3JvbGxZXHJcbiAgfVxyXG4gIGhhbmRsZU1vdXNlTW92ZShldmVudCkge1xyXG4gICAgc3RvcEV2ZW50KGV2ZW50KVxyXG4gICAgdGhpcy5zY3JvbGxYICs9IHRoaXMubW91c2VYIC0gZXZlbnQuc2NyZWVuWFxyXG4gICAgdGhpcy5zY3JvbGxZICs9IHRoaXMubW91c2VZIC0gZXZlbnQuc2NyZWVuWVxyXG4gICAgdGhpcy5tb3VzZVggPSBldmVudC5zY3JlZW5YXHJcbiAgICB0aGlzLm1vdXNlWSA9IGV2ZW50LnNjcmVlbllcclxuICAgIGlmICh0aGlzLm9uTW91c2VTY3JvbGwpIHRoaXMub25Nb3VzZVNjcm9sbCh0aGlzKVxyXG4gICAgZWxzZSB0aGlzLnNjcm9sbCgpXHJcbiAgfVxyXG4gIGhhbmRsZUNvbXBsZXRlZCgpIHtcclxuICAgIHJlbW92ZUN1cnJlbnRHcmFiUmVhY3Rpb24odGhpcylcclxuICB9XHJcbn1cclxuXHJcbmV4cG9ydCBjbGFzcyBIdG1sR3JhYlJlYWN0aW9uIHtcclxuICBjb25zdHJ1Y3RvcihlbGVtZW50LCBldmVudCwgb25Nb3VzZUdyYWIpIHtcclxuICAgIHN0b3BFdmVudChldmVudClcclxuICAgIHRoaXMuZWxlbWVudCA9IGVsZW1lbnRcclxuICAgIHRoaXMubW91c2VYID0gZXZlbnQuc2NyZWVuWFxyXG4gICAgdGhpcy5tb3VzZVkgPSBldmVudC5zY3JlZW5ZXHJcbiAgICB0aGlzLmxlZnQgPSBlbGVtZW50Lm9mZnNldExlZnRcclxuICAgIHRoaXMudG9wID0gZWxlbWVudC5vZmZzZXRUb3BcclxuICAgIHRoaXMub25Nb3VzZUdyYWIgPSBvbk1vdXNlR3JhYlxyXG4gICAgc2V0Q3VycmVudEdyYWJSZWFjdGlvbih0aGlzKVxyXG4gIH1cclxuICBtb3ZlKCkge1xyXG4gICAgdGhpcy5lbGVtZW50LnN0eWxlLmxlZnQgPSB0aGlzLmxlZnQgKyBcInB4XCJcclxuICAgIHRoaXMuZWxlbWVudC5zdHlsZS50b3AgPSB0aGlzLnRvcCArIFwicHhcIlxyXG4gIH1cclxuICBoYW5kbGVNb3VzZU1vdmUoZXZlbnQpIHtcclxuICAgIHN0b3BFdmVudChldmVudClcclxuICAgIHRoaXMuZGVsdGFYID0gZXZlbnQuc2NyZWVuWCAtIHRoaXMubW91c2VYXHJcbiAgICB0aGlzLmRlbHRhWSA9IGV2ZW50LnNjcmVlblkgLSB0aGlzLm1vdXNlWVxyXG4gICAgdGhpcy5sZWZ0ICs9IHRoaXMuZGVsdGFYXHJcbiAgICB0aGlzLnRvcCArPSB0aGlzLmRlbHRhWVxyXG4gICAgdGhpcy5tb3VzZVggPSBldmVudC5zY3JlZW5YXHJcbiAgICB0aGlzLm1vdXNlWSA9IGV2ZW50LnNjcmVlbllcclxuICAgIGlmICh0aGlzLm9uTW91c2VHcmFiKSB0aGlzLm9uTW91c2VHcmFiKHRoaXMpXHJcbiAgICBlbHNlIHRoaXMubW92ZSgpXHJcbiAgfVxyXG4gIGhhbmRsZUNvbXBsZXRlZCgpIHtcclxuICAgIHJlbW92ZUN1cnJlbnRHcmFiUmVhY3Rpb24odGhpcylcclxuICB9XHJcbn1cclxuXHJcbmV4cG9ydCBjbGFzcyBTVkdHcmFiUmVhY3Rpb24ge1xyXG4gIGNvbnN0cnVjdG9yKGVsZW1lbnQsIGV2ZW50LCBvbk1vdXNlR3JhYikge1xyXG4gICAgc3RvcEV2ZW50KGV2ZW50KVxyXG4gICAgdGhpcy5lbGVtZW50ID0gZWxlbWVudFxyXG4gICAgdGhpcy5tb3VzZVggPSBldmVudC5zY3JlZW5YXHJcbiAgICB0aGlzLm1vdXNlWSA9IGV2ZW50LnNjcmVlbllcclxuICAgIHRoaXMueCA9IGVsZW1lbnQueCgpXHJcbiAgICB0aGlzLnkgPSBlbGVtZW50LnkoKVxyXG4gICAgdGhpcy5vbk1vdXNlR3JhYiA9IG9uTW91c2VHcmFiXHJcbiAgICBzZXRDdXJyZW50R3JhYlJlYWN0aW9uKHRoaXMpXHJcbiAgfVxyXG4gIG1vdmUoKSB7XHJcbiAgICB0aGlzLmVsZW1lbnQueCh0aGlzLngpXHJcbiAgICB0aGlzLmVsZW1lbnQueSh0aGlzLnkpXHJcbiAgfVxyXG4gIGhhbmRsZU1vdXNlTW92ZShldmVudCkge1xyXG4gICAgc3RvcEV2ZW50KGV2ZW50KVxyXG4gICAgdGhpcy54ICs9IGV2ZW50LnNjcmVlblggLSB0aGlzLm1vdXNlWFxyXG4gICAgdGhpcy55ICs9IGV2ZW50LnNjcmVlblkgLSB0aGlzLm1vdXNlWVxyXG4gICAgdGhpcy5tb3VzZVggPSBldmVudC5zY3JlZW5YXHJcbiAgICB0aGlzLm1vdXNlWSA9IGV2ZW50LnNjcmVlbllcclxuICAgIGlmICh0aGlzLm9uTW91c2VHcmFiKSB0aGlzLm9uTW91c2VHcmFiKHRoaXMpXHJcbiAgICBlbHNlIHRoaXMubW92ZSgpXHJcbiAgfVxyXG4gIGhhbmRsZUNvbXBsZXRlZCgpIHtcclxuICAgIHJlbW92ZUN1cnJlbnRHcmFiUmVhY3Rpb24odGhpcylcclxuICB9XHJcbn1cclxuXHJcbmxldCBncmFiUmVhY3Rpb24gPSBudWxsXHJcbmZ1bmN0aW9uIHNldEN1cnJlbnRHcmFiUmVhY3Rpb24ocmVhY3Rpb24pIHtcclxuICBncmFiUmVhY3Rpb24gJiYgZ3JhYlJlYWN0aW9uLmhhbmRsZUNvbXBsZXRlZCgpXHJcbiAgZ3JhYlJlYWN0aW9uID0gcmVhY3Rpb25cclxufVxyXG5mdW5jdGlvbiByZW1vdmVDdXJyZW50R3JhYlJlYWN0aW9uKHJlYWN0aW9uKSB7XHJcbiAgaWYgKGdyYWJSZWFjdGlvbiA9PT0gcmVhY3Rpb24pIGdyYWJSZWFjdGlvbiA9IG51bGxcclxufVxyXG53aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcihcIm1vdXNlbW92ZVwiLCBmdW5jdGlvbihlKSB7XHJcbiAgZ3JhYlJlYWN0aW9uICYmIGdyYWJSZWFjdGlvbi5oYW5kbGVNb3VzZU1vdmUoZSlcclxufSlcclxud2luZG93LmFkZEV2ZW50TGlzdGVuZXIoXCJtb3VzZXVwXCIsIGZ1bmN0aW9uKCkge1xyXG4gIGdyYWJSZWFjdGlvbiAmJiBncmFiUmVhY3Rpb24uaGFuZGxlQ29tcGxldGVkKClcclxufSlcclxuIl19