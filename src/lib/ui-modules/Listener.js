import React from "react"
import { Component } from "react"

export default class Listener extends Component<void, Object, void> {
  props: Object

  componentWillMount() {
    const { value, onChange } = this.props
    value && onChange && value.listenState(onChange)
  }
  componentWillReceiveProps(nextProps) {
    const nextValue = nextProps.value
    const prevValue = this.props.value
    if (nextValue !== prevValue) {
      const nextChange = nextProps.onChange
      const prevChange = this.props.onChange
      prevValue && prevChange && prevValue.unlistenState(prevChange)
      nextValue && nextChange && nextValue.listenState(nextChange)
    }
  }
  componentWillUnmount() {
    const { value } = this.props
    value && value.unlistenState(this.handleChange)
  }
  render() {
    const { children } = this.props
    return children || null
  }
}
