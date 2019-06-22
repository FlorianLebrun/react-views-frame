
export function stopEvent(e) {
  if (e.stopPropagation) e.stopPropagation()
  if (e.preventDefault) e.preventDefault()
  return false
}

export function stopPropagation(e) {
  if (e.stopPropagation) e.stopPropagation()
  return false
}

export class HtmlScrollingReaction {
  constructor(element, event, onMouseScroll) {
    stopEvent(event)
    this.element = element
    this.mouseX = event.screenX
    this.mouseY = event.screenY
    this.scrollX = element.scrollLeft
    this.scrollY = element.scrollTop
    this.onMouseScroll = onMouseScroll
    setCurrentGrabReaction(this)
  }
  scroll() {
    this.element.scrollLeft = this.scrollX
    this.element.scrollTop = this.scrollY
  }
  handleMouseMove(event) {
    stopEvent(event)
    this.scrollX += this.mouseX - event.screenX
    this.scrollY += this.mouseY - event.screenY
    this.mouseX = event.screenX
    this.mouseY = event.screenY
    if (this.onMouseScroll) this.onMouseScroll(this)
    else this.scroll()
  }
  handleCompleted() {
    removeCurrentGrabReaction(this)
  }
}

export class HtmlGrabReaction {
  constructor(element, event, onMouseGrab) {
    stopEvent(event)
    this.element = element
    this.mouseX = event.screenX
    this.mouseY = event.screenY
    this.left = element.offsetLeft
    this.top = element.offsetTop
    this.onMouseGrab = onMouseGrab
    setCurrentGrabReaction(this)
  }
  move() {
    this.element.style.left = this.left + "px"
    this.element.style.top = this.top + "px"
  }
  handleMouseMove(event) {
    stopEvent(event)
    this.deltaX = event.screenX - this.mouseX
    this.deltaY = event.screenY - this.mouseY
    this.left += this.deltaX
    this.top += this.deltaY
    this.mouseX = event.screenX
    this.mouseY = event.screenY
    if (this.onMouseGrab) this.onMouseGrab(this)
    else this.move()
  }
  handleCompleted() {
    removeCurrentGrabReaction(this)
  }
}

export class SVGGrabReaction {
  constructor(element, event, onMouseGrab) {
    stopEvent(event)
    this.element = element
    this.mouseX = event.screenX
    this.mouseY = event.screenY
    this.x = element.x()
    this.y = element.y()
    this.onMouseGrab = onMouseGrab
    setCurrentGrabReaction(this)
  }
  move() {
    this.element.x(this.x)
    this.element.y(this.y)
  }
  handleMouseMove(event) {
    stopEvent(event)
    this.x += event.screenX - this.mouseX
    this.y += event.screenY - this.mouseY
    this.mouseX = event.screenX
    this.mouseY = event.screenY
    if (this.onMouseGrab) this.onMouseGrab(this)
    else this.move()
  }
  handleCompleted() {
    removeCurrentGrabReaction(this)
  }
}

let grabReaction = null
function setCurrentGrabReaction(reaction) {
  grabReaction && grabReaction.handleCompleted()
  grabReaction = reaction
}
function removeCurrentGrabReaction(reaction) {
  if (grabReaction === reaction) grabReaction = null
}
window.addEventListener("mousemove", function(e) {
  grabReaction && grabReaction.handleMouseMove(e)
})
window.addEventListener("mouseup", function() {
  grabReaction && grabReaction.handleCompleted()
})
