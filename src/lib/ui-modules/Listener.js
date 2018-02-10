import React from "react"
import { Component } from "react"

export default class Listener extends Component<void, Object, void> {
  props: Object

  componentWillMount() {
    const { value } = this.props
    value && value.listenState(this.handleChange)
  }
  componentWillReceiveProps(nextProps) {
    const nextValue = nextProps.value
    const prevValue = this.props.value
    if (nextValue !== prevValue) {
      prevValue && prevValue.unlistenState(this.handleChange)
      nextValue && nextValue.listenState(this.handleChange)
    }
  }
  componentWillUnmount() {
    const { value } = this.props
    value && value.unlistenState(this.handleChange)
  }
  handleChange = (value) => {
    const { onChange } = this.props
    onChange && onChange(value)
    this.forceUpdate()
  }
  render() {
    const { children } = this.props
    if (children instanceof Function) {
      return children(this.props)
    }
    else if (Array.isArray(children)) {
      return (<React.Fragment>
        {children}
      </React.Fragment>)
    }
    else {
      return children
    }
  }
}
