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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9BcHBsaWNhdGlvbi91aS1tb2R1bGVzL2V2ZW50LnV0aWxzLmpzIl0sIm5hbWVzIjpbInN0b3BFdmVudCIsInN0b3BQcm9wYWdhdGlvbiIsImUiLCJwcmV2ZW50RGVmYXVsdCIsIkh0bWxTY3JvbGxpbmdSZWFjdGlvbiIsImVsZW1lbnQiLCJldmVudCIsIm9uTW91c2VTY3JvbGwiLCJtb3VzZVgiLCJzY3JlZW5YIiwibW91c2VZIiwic2NyZWVuWSIsInNjcm9sbFgiLCJzY3JvbGxMZWZ0Iiwic2Nyb2xsWSIsInNjcm9sbFRvcCIsInNldEN1cnJlbnRHcmFiUmVhY3Rpb24iLCJzY3JvbGwiLCJyZW1vdmVDdXJyZW50R3JhYlJlYWN0aW9uIiwiSHRtbEdyYWJSZWFjdGlvbiIsIm9uTW91c2VHcmFiIiwibGVmdCIsIm9mZnNldExlZnQiLCJ0b3AiLCJvZmZzZXRUb3AiLCJzdHlsZSIsImRlbHRhWCIsImRlbHRhWSIsIm1vdmUiLCJTVkdHcmFiUmVhY3Rpb24iLCJ4IiwieSIsImdyYWJSZWFjdGlvbiIsInJlYWN0aW9uIiwiaGFuZGxlQ29tcGxldGVkIiwid2luZG93IiwiYWRkRXZlbnRMaXN0ZW5lciIsImhhbmRsZU1vdXNlTW92ZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7UUFDZ0JBLFMsR0FBQUEsUztRQU1BQyxlLEdBQUFBLGU7Ozs7QUFOVCxTQUFTRCxTQUFULENBQW1CRSxDQUFuQixFQUFzQjtBQUMzQixNQUFJQSxFQUFFRCxlQUFOLEVBQXVCQyxFQUFFRCxlQUFGO0FBQ3ZCLE1BQUlDLEVBQUVDLGNBQU4sRUFBc0JELEVBQUVDLGNBQUY7QUFDdEIsU0FBTyxLQUFQO0FBQ0Q7O0FBRU0sU0FBU0YsZUFBVCxDQUF5QkMsQ0FBekIsRUFBNEI7QUFDakMsTUFBSUEsRUFBRUQsZUFBTixFQUF1QkMsRUFBRUQsZUFBRjtBQUN2QixTQUFPLEtBQVA7QUFDRDs7SUFFWUcscUIsV0FBQUEscUI7QUFDWCxpQ0FBWUMsT0FBWixFQUFxQkMsS0FBckIsRUFBNEJDLGFBQTVCLEVBQTJDO0FBQUE7O0FBQ3pDUCxjQUFVTSxLQUFWO0FBQ0EsU0FBS0QsT0FBTCxHQUFlQSxPQUFmO0FBQ0EsU0FBS0csTUFBTCxHQUFjRixNQUFNRyxPQUFwQjtBQUNBLFNBQUtDLE1BQUwsR0FBY0osTUFBTUssT0FBcEI7QUFDQSxTQUFLQyxPQUFMLEdBQWVQLFFBQVFRLFVBQXZCO0FBQ0EsU0FBS0MsT0FBTCxHQUFlVCxRQUFRVSxTQUF2QjtBQUNBLFNBQUtSLGFBQUwsR0FBcUJBLGFBQXJCO0FBQ0FTLDJCQUF1QixJQUF2QjtBQUNEOzs7OzZCQUNRO0FBQ1AsV0FBS1gsT0FBTCxDQUFhUSxVQUFiLEdBQTBCLEtBQUtELE9BQS9CO0FBQ0EsV0FBS1AsT0FBTCxDQUFhVSxTQUFiLEdBQXlCLEtBQUtELE9BQTlCO0FBQ0Q7OztvQ0FDZVIsSyxFQUFPO0FBQ3JCTixnQkFBVU0sS0FBVjtBQUNBLFdBQUtNLE9BQUwsSUFBZ0IsS0FBS0osTUFBTCxHQUFjRixNQUFNRyxPQUFwQztBQUNBLFdBQUtLLE9BQUwsSUFBZ0IsS0FBS0osTUFBTCxHQUFjSixNQUFNSyxPQUFwQztBQUNBLFdBQUtILE1BQUwsR0FBY0YsTUFBTUcsT0FBcEI7QUFDQSxXQUFLQyxNQUFMLEdBQWNKLE1BQU1LLE9BQXBCO0FBQ0EsVUFBSSxLQUFLSixhQUFULEVBQXdCLEtBQUtBLGFBQUwsQ0FBbUIsSUFBbkIsRUFBeEIsS0FDSyxLQUFLVSxNQUFMO0FBQ047OztzQ0FDaUI7QUFDaEJDLGdDQUEwQixJQUExQjtBQUNEOzs7Ozs7SUFHVUMsZ0IsV0FBQUEsZ0I7QUFDWCw0QkFBWWQsT0FBWixFQUFxQkMsS0FBckIsRUFBNEJjLFdBQTVCLEVBQXlDO0FBQUE7O0FBQ3ZDcEIsY0FBVU0sS0FBVjtBQUNBLFNBQUtELE9BQUwsR0FBZUEsT0FBZjtBQUNBLFNBQUtHLE1BQUwsR0FBY0YsTUFBTUcsT0FBcEI7QUFDQSxTQUFLQyxNQUFMLEdBQWNKLE1BQU1LLE9BQXBCO0FBQ0EsU0FBS1UsSUFBTCxHQUFZaEIsUUFBUWlCLFVBQXBCO0FBQ0EsU0FBS0MsR0FBTCxHQUFXbEIsUUFBUW1CLFNBQW5CO0FBQ0EsU0FBS0osV0FBTCxHQUFtQkEsV0FBbkI7QUFDQUosMkJBQXVCLElBQXZCO0FBQ0Q7Ozs7MkJBQ007QUFDTCxXQUFLWCxPQUFMLENBQWFvQixLQUFiLENBQW1CSixJQUFuQixHQUEwQixLQUFLQSxJQUFMLEdBQVksSUFBdEM7QUFDQSxXQUFLaEIsT0FBTCxDQUFhb0IsS0FBYixDQUFtQkYsR0FBbkIsR0FBeUIsS0FBS0EsR0FBTCxHQUFXLElBQXBDO0FBQ0Q7OztvQ0FDZWpCLEssRUFBTztBQUNyQk4sZ0JBQVVNLEtBQVY7QUFDQSxXQUFLb0IsTUFBTCxHQUFjcEIsTUFBTUcsT0FBTixHQUFnQixLQUFLRCxNQUFuQztBQUNBLFdBQUttQixNQUFMLEdBQWNyQixNQUFNSyxPQUFOLEdBQWdCLEtBQUtELE1BQW5DO0FBQ0EsV0FBS1csSUFBTCxJQUFhLEtBQUtLLE1BQWxCO0FBQ0EsV0FBS0gsR0FBTCxJQUFZLEtBQUtJLE1BQWpCO0FBQ0EsV0FBS25CLE1BQUwsR0FBY0YsTUFBTUcsT0FBcEI7QUFDQSxXQUFLQyxNQUFMLEdBQWNKLE1BQU1LLE9BQXBCO0FBQ0EsVUFBSSxLQUFLUyxXQUFULEVBQXNCLEtBQUtBLFdBQUwsQ0FBaUIsSUFBakIsRUFBdEIsS0FDSyxLQUFLUSxJQUFMO0FBQ047OztzQ0FDaUI7QUFDaEJWLGdDQUEwQixJQUExQjtBQUNEOzs7Ozs7SUFHVVcsZSxXQUFBQSxlO0FBQ1gsMkJBQVl4QixPQUFaLEVBQXFCQyxLQUFyQixFQUE0QmMsV0FBNUIsRUFBeUM7QUFBQTs7QUFDdkNwQixjQUFVTSxLQUFWO0FBQ0EsU0FBS0QsT0FBTCxHQUFlQSxPQUFmO0FBQ0EsU0FBS0csTUFBTCxHQUFjRixNQUFNRyxPQUFwQjtBQUNBLFNBQUtDLE1BQUwsR0FBY0osTUFBTUssT0FBcEI7QUFDQSxTQUFLbUIsQ0FBTCxHQUFTekIsUUFBUXlCLENBQVIsRUFBVDtBQUNBLFNBQUtDLENBQUwsR0FBUzFCLFFBQVEwQixDQUFSLEVBQVQ7QUFDQSxTQUFLWCxXQUFMLEdBQW1CQSxXQUFuQjtBQUNBSiwyQkFBdUIsSUFBdkI7QUFDRDs7OzsyQkFDTTtBQUNMLFdBQUtYLE9BQUwsQ0FBYXlCLENBQWIsQ0FBZSxLQUFLQSxDQUFwQjtBQUNBLFdBQUt6QixPQUFMLENBQWEwQixDQUFiLENBQWUsS0FBS0EsQ0FBcEI7QUFDRDs7O29DQUNlekIsSyxFQUFPO0FBQ3JCTixnQkFBVU0sS0FBVjtBQUNBLFdBQUt3QixDQUFMLElBQVV4QixNQUFNRyxPQUFOLEdBQWdCLEtBQUtELE1BQS9CO0FBQ0EsV0FBS3VCLENBQUwsSUFBVXpCLE1BQU1LLE9BQU4sR0FBZ0IsS0FBS0QsTUFBL0I7QUFDQSxXQUFLRixNQUFMLEdBQWNGLE1BQU1HLE9BQXBCO0FBQ0EsV0FBS0MsTUFBTCxHQUFjSixNQUFNSyxPQUFwQjtBQUNBLFVBQUksS0FBS1MsV0FBVCxFQUFzQixLQUFLQSxXQUFMLENBQWlCLElBQWpCLEVBQXRCLEtBQ0ssS0FBS1EsSUFBTDtBQUNOOzs7c0NBQ2lCO0FBQ2hCVixnQ0FBMEIsSUFBMUI7QUFDRDs7Ozs7O0FBR0gsSUFBSWMsZUFBZSxJQUFuQjtBQUNBLFNBQVNoQixzQkFBVCxDQUFnQ2lCLFFBQWhDLEVBQTBDO0FBQ3hDRCxrQkFBZ0JBLGFBQWFFLGVBQWIsRUFBaEI7QUFDQUYsaUJBQWVDLFFBQWY7QUFDRDtBQUNELFNBQVNmLHlCQUFULENBQW1DZSxRQUFuQyxFQUE2QztBQUMzQyxNQUFJRCxpQkFBaUJDLFFBQXJCLEVBQStCRCxlQUFlLElBQWY7QUFDaEM7QUFDREcsT0FBT0MsZ0JBQVAsQ0FBd0IsV0FBeEIsRUFBcUMsVUFBU2xDLENBQVQsRUFBWTtBQUMvQzhCLGtCQUFnQkEsYUFBYUssZUFBYixDQUE2Qm5DLENBQTdCLENBQWhCO0FBQ0QsQ0FGRDtBQUdBaUMsT0FBT0MsZ0JBQVAsQ0FBd0IsU0FBeEIsRUFBbUMsWUFBVztBQUM1Q0osa0JBQWdCQSxhQUFhRSxlQUFiLEVBQWhCO0FBQ0QsQ0FGRCIsImZpbGUiOiJldmVudC51dGlscy5qcyIsInNvdXJjZXNDb250ZW50IjpbIlxyXG5leHBvcnQgZnVuY3Rpb24gc3RvcEV2ZW50KGUpIHtcclxuICBpZiAoZS5zdG9wUHJvcGFnYXRpb24pIGUuc3RvcFByb3BhZ2F0aW9uKClcclxuICBpZiAoZS5wcmV2ZW50RGVmYXVsdCkgZS5wcmV2ZW50RGVmYXVsdCgpXHJcbiAgcmV0dXJuIGZhbHNlXHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBzdG9wUHJvcGFnYXRpb24oZSkge1xyXG4gIGlmIChlLnN0b3BQcm9wYWdhdGlvbikgZS5zdG9wUHJvcGFnYXRpb24oKVxyXG4gIHJldHVybiBmYWxzZVxyXG59XHJcblxyXG5leHBvcnQgY2xhc3MgSHRtbFNjcm9sbGluZ1JlYWN0aW9uIHtcclxuICBjb25zdHJ1Y3RvcihlbGVtZW50LCBldmVudCwgb25Nb3VzZVNjcm9sbCkge1xyXG4gICAgc3RvcEV2ZW50KGV2ZW50KVxyXG4gICAgdGhpcy5lbGVtZW50ID0gZWxlbWVudFxyXG4gICAgdGhpcy5tb3VzZVggPSBldmVudC5zY3JlZW5YXHJcbiAgICB0aGlzLm1vdXNlWSA9IGV2ZW50LnNjcmVlbllcclxuICAgIHRoaXMuc2Nyb2xsWCA9IGVsZW1lbnQuc2Nyb2xsTGVmdFxyXG4gICAgdGhpcy5zY3JvbGxZID0gZWxlbWVudC5zY3JvbGxUb3BcclxuICAgIHRoaXMub25Nb3VzZVNjcm9sbCA9IG9uTW91c2VTY3JvbGxcclxuICAgIHNldEN1cnJlbnRHcmFiUmVhY3Rpb24odGhpcylcclxuICB9XHJcbiAgc2Nyb2xsKCkge1xyXG4gICAgdGhpcy5lbGVtZW50LnNjcm9sbExlZnQgPSB0aGlzLnNjcm9sbFhcclxuICAgIHRoaXMuZWxlbWVudC5zY3JvbGxUb3AgPSB0aGlzLnNjcm9sbFlcclxuICB9XHJcbiAgaGFuZGxlTW91c2VNb3ZlKGV2ZW50KSB7XHJcbiAgICBzdG9wRXZlbnQoZXZlbnQpXHJcbiAgICB0aGlzLnNjcm9sbFggKz0gdGhpcy5tb3VzZVggLSBldmVudC5zY3JlZW5YXHJcbiAgICB0aGlzLnNjcm9sbFkgKz0gdGhpcy5tb3VzZVkgLSBldmVudC5zY3JlZW5ZXHJcbiAgICB0aGlzLm1vdXNlWCA9IGV2ZW50LnNjcmVlblhcclxuICAgIHRoaXMubW91c2VZID0gZXZlbnQuc2NyZWVuWVxyXG4gICAgaWYgKHRoaXMub25Nb3VzZVNjcm9sbCkgdGhpcy5vbk1vdXNlU2Nyb2xsKHRoaXMpXHJcbiAgICBlbHNlIHRoaXMuc2Nyb2xsKClcclxuICB9XHJcbiAgaGFuZGxlQ29tcGxldGVkKCkge1xyXG4gICAgcmVtb3ZlQ3VycmVudEdyYWJSZWFjdGlvbih0aGlzKVxyXG4gIH1cclxufVxyXG5cclxuZXhwb3J0IGNsYXNzIEh0bWxHcmFiUmVhY3Rpb24ge1xyXG4gIGNvbnN0cnVjdG9yKGVsZW1lbnQsIGV2ZW50LCBvbk1vdXNlR3JhYikge1xyXG4gICAgc3RvcEV2ZW50KGV2ZW50KVxyXG4gICAgdGhpcy5lbGVtZW50ID0gZWxlbWVudFxyXG4gICAgdGhpcy5tb3VzZVggPSBldmVudC5zY3JlZW5YXHJcbiAgICB0aGlzLm1vdXNlWSA9IGV2ZW50LnNjcmVlbllcclxuICAgIHRoaXMubGVmdCA9IGVsZW1lbnQub2Zmc2V0TGVmdFxyXG4gICAgdGhpcy50b3AgPSBlbGVtZW50Lm9mZnNldFRvcFxyXG4gICAgdGhpcy5vbk1vdXNlR3JhYiA9IG9uTW91c2VHcmFiXHJcbiAgICBzZXRDdXJyZW50R3JhYlJlYWN0aW9uKHRoaXMpXHJcbiAgfVxyXG4gIG1vdmUoKSB7XHJcbiAgICB0aGlzLmVsZW1lbnQuc3R5bGUubGVmdCA9IHRoaXMubGVmdCArIFwicHhcIlxyXG4gICAgdGhpcy5lbGVtZW50LnN0eWxlLnRvcCA9IHRoaXMudG9wICsgXCJweFwiXHJcbiAgfVxyXG4gIGhhbmRsZU1vdXNlTW92ZShldmVudCkge1xyXG4gICAgc3RvcEV2ZW50KGV2ZW50KVxyXG4gICAgdGhpcy5kZWx0YVggPSBldmVudC5zY3JlZW5YIC0gdGhpcy5tb3VzZVhcclxuICAgIHRoaXMuZGVsdGFZID0gZXZlbnQuc2NyZWVuWSAtIHRoaXMubW91c2VZXHJcbiAgICB0aGlzLmxlZnQgKz0gdGhpcy5kZWx0YVhcclxuICAgIHRoaXMudG9wICs9IHRoaXMuZGVsdGFZXHJcbiAgICB0aGlzLm1vdXNlWCA9IGV2ZW50LnNjcmVlblhcclxuICAgIHRoaXMubW91c2VZID0gZXZlbnQuc2NyZWVuWVxyXG4gICAgaWYgKHRoaXMub25Nb3VzZUdyYWIpIHRoaXMub25Nb3VzZUdyYWIodGhpcylcclxuICAgIGVsc2UgdGhpcy5tb3ZlKClcclxuICB9XHJcbiAgaGFuZGxlQ29tcGxldGVkKCkge1xyXG4gICAgcmVtb3ZlQ3VycmVudEdyYWJSZWFjdGlvbih0aGlzKVxyXG4gIH1cclxufVxyXG5cclxuZXhwb3J0IGNsYXNzIFNWR0dyYWJSZWFjdGlvbiB7XHJcbiAgY29uc3RydWN0b3IoZWxlbWVudCwgZXZlbnQsIG9uTW91c2VHcmFiKSB7XHJcbiAgICBzdG9wRXZlbnQoZXZlbnQpXHJcbiAgICB0aGlzLmVsZW1lbnQgPSBlbGVtZW50XHJcbiAgICB0aGlzLm1vdXNlWCA9IGV2ZW50LnNjcmVlblhcclxuICAgIHRoaXMubW91c2VZID0gZXZlbnQuc2NyZWVuWVxyXG4gICAgdGhpcy54ID0gZWxlbWVudC54KClcclxuICAgIHRoaXMueSA9IGVsZW1lbnQueSgpXHJcbiAgICB0aGlzLm9uTW91c2VHcmFiID0gb25Nb3VzZUdyYWJcclxuICAgIHNldEN1cnJlbnRHcmFiUmVhY3Rpb24odGhpcylcclxuICB9XHJcbiAgbW92ZSgpIHtcclxuICAgIHRoaXMuZWxlbWVudC54KHRoaXMueClcclxuICAgIHRoaXMuZWxlbWVudC55KHRoaXMueSlcclxuICB9XHJcbiAgaGFuZGxlTW91c2VNb3ZlKGV2ZW50KSB7XHJcbiAgICBzdG9wRXZlbnQoZXZlbnQpXHJcbiAgICB0aGlzLnggKz0gZXZlbnQuc2NyZWVuWCAtIHRoaXMubW91c2VYXHJcbiAgICB0aGlzLnkgKz0gZXZlbnQuc2NyZWVuWSAtIHRoaXMubW91c2VZXHJcbiAgICB0aGlzLm1vdXNlWCA9IGV2ZW50LnNjcmVlblhcclxuICAgIHRoaXMubW91c2VZID0gZXZlbnQuc2NyZWVuWVxyXG4gICAgaWYgKHRoaXMub25Nb3VzZUdyYWIpIHRoaXMub25Nb3VzZUdyYWIodGhpcylcclxuICAgIGVsc2UgdGhpcy5tb3ZlKClcclxuICB9XHJcbiAgaGFuZGxlQ29tcGxldGVkKCkge1xyXG4gICAgcmVtb3ZlQ3VycmVudEdyYWJSZWFjdGlvbih0aGlzKVxyXG4gIH1cclxufVxyXG5cclxubGV0IGdyYWJSZWFjdGlvbiA9IG51bGxcclxuZnVuY3Rpb24gc2V0Q3VycmVudEdyYWJSZWFjdGlvbihyZWFjdGlvbikge1xyXG4gIGdyYWJSZWFjdGlvbiAmJiBncmFiUmVhY3Rpb24uaGFuZGxlQ29tcGxldGVkKClcclxuICBncmFiUmVhY3Rpb24gPSByZWFjdGlvblxyXG59XHJcbmZ1bmN0aW9uIHJlbW92ZUN1cnJlbnRHcmFiUmVhY3Rpb24ocmVhY3Rpb24pIHtcclxuICBpZiAoZ3JhYlJlYWN0aW9uID09PSByZWFjdGlvbikgZ3JhYlJlYWN0aW9uID0gbnVsbFxyXG59XHJcbndpbmRvdy5hZGRFdmVudExpc3RlbmVyKFwibW91c2Vtb3ZlXCIsIGZ1bmN0aW9uKGUpIHtcclxuICBncmFiUmVhY3Rpb24gJiYgZ3JhYlJlYWN0aW9uLmhhbmRsZU1vdXNlTW92ZShlKVxyXG59KVxyXG53aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcihcIm1vdXNldXBcIiwgZnVuY3Rpb24oKSB7XHJcbiAgZ3JhYlJlYWN0aW9uICYmIGdyYWJSZWFjdGlvbi5oYW5kbGVDb21wbGV0ZWQoKVxyXG59KVxyXG4iXX0=