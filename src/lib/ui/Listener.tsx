import React from "react"
import Listenable from "../modules/listenable"
import EventEmitter from "../modules/event-emitter";

export type PropsType = {
  object: Listenable,
  onChange: Function | Array<Function | string>,
  onEvent: Function,
  children?: any
}

export default class Listener extends React.Component {
  props: PropsType

  componentWillMount() {
    const { object } = this.props
    object && EventEmitter.addEventListener.call(object, this.handleChange)
  }
  componentWillReceiveProps(nextProps) {
    const nextObject = nextProps.object
    const prevObject = this.props.object
    if (nextObject !== prevObject) {
      prevObject && EventEmitter.removeEventListener.call(prevObject, this.handleChange)
      nextObject && EventEmitter.addEventListener.call(nextObject, this.handleChange)
    }
  }
  componentWillUnmount() {
    const { object } = this.props
    object && EventEmitter.removeEventListener.call(object, this.handleChange)
  }
  handleChange = (type, data1, data2) => {
    if (type === "change") {
      const { onChange } = this.props
      onChange && (onChange as Function)(data1, data2)
    }
    else {
      const { onEvent } = this.props
      onEvent && onEvent(type, data1, data2)
    }
  }
  render() {
    return this.props.children || null
  }
}
