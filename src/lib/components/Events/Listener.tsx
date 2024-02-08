import React from "react"
import Listenable from "../Events/listenable"

export type PropsType = {
   object: Listenable,
   onChange: Function | Array<Function | string>,
   onEvent: Function,
   children?: any
}

export default class Listener extends React.Component {
   props: PropsType

   constructor(props) {
      super(props)
      const { object } = props
      object && object.addEventListener(this.handleChange)
   }
   UNSAFE_componentWillReceiveProps (nextProps) {
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
