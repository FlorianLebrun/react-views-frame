import { Component } from "react"

export type PropsType = {
  object: Listenable,
  onChange: Function | Array<Function | string>,
}

export default class Listener extends Component<void, Object, void> {
  props: Object

  componentWillMount() {
    const { object } = this.props
    object && object.addEventListener(this.handleChange)
  }
  componentWillReceiveProps(nextProps) {
    const nextObject = nextProps.object
    const prevObject = this.props.object
    if (nextObject !== prevObject) {
      prevObject && prevObject.removeEventListener(this.handleChange)
      nextObject && nextObject.addEventListener(this.handleChange)
    }
  }
  componentWillUnmount() {
    const { object } = this.props
    object && object.removeEventListener(this.handleChange)
  }
  handleChange = (type, data1, data2) => {
    if (type === "change") {
      const { onChange } = this.props
      onChange && onChange(data1, data2)
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
