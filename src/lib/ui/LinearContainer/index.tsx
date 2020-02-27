import React from "react"
import { ResizableBorder } from "../ResizableBorder";
import "./index.css"

type DisplayItemType = {
  key?: string,
  header?: any,
  content?: any,
}

type LayoutItemType = {
  size: number,
  [customProperty: string]: any,
}

type LayoutType = LayoutItemType[]

type PropsType = {
  value: LayoutType,
  vertical?: boolean,
  style?: any,
  className?: string,
  children: (item: LayoutItemType) => DisplayItemType;
  onChange?: (layout: LayoutType) => void,
  onNew?: (data: any) => { [customKey: string]: any },
}

export default class LinearContainer extends React.Component {
  props: PropsType
  delta: number = 0.0

  onResize = (i_1) => (gap) => {
    const { value, vertical } = this.props
    const container = this.refs.container as HTMLElement
    const container_size = vertical ? container.clientWidth : container.clientHeight
    if (container_size < 1) return

    const i_0 = i_1 - 1;
    const size_0 = value[i_0].size ? value[i_0].size : 100.0
    const size_1 = value[i_1].size ? value[i_1].size : 100.0
    const size_factor = this.getSizeFactor()
    this.delta -= 100.0 * gap / (size_factor * container_size)

    const items = this.refs as any as HTMLElement[]
    if (vertical) {
      items[i_0].style.minWidth = (size_factor * (size_0 - this.delta)) + "%"
      items[i_1].style.minWidth = (size_factor * (size_1 + this.delta)) + "%"
    }
    else {
      items[i_0].style.minHeight = (size_factor * (size_0 - this.delta)) + "%"
      items[i_1].style.minHeight = (size_factor * (size_1 + this.delta)) + "%"
    }
  }
  onRelease = (i_1) => () => {
    const { value, onChange } = this.props
    const new_value = [...value]
    const i_0 = i_1 - 1;
    new_value[i_0] = {
      ...new_value[i_0],
      size: value[i_0].size - this.delta,
    }
    new_value[i_1] = {
      ...new_value[i_1],
      size: value[i_1].size + this.delta,
    }
    this.delta = 0.0
    onChange(new_value)
  }
  getSizeFactor() {
    const { value } = this.props
    let sizes_sum = 0
    for (let i = 0; i < value.length; i++) {
      const { size } = value[i]
      sizes_sum += size ? size : 100.0
    }
    return 100.0 / sizes_sum
  }
  render() {
    const { value, vertical, children, style, className, onChange } = this.props
    if (value && children) {

      const content = []
      const size_factor = this.getSizeFactor()
      for (let i = 0; i < value.length; i++) {
        const display = children(value[i])
        const { size } = value[i]
        let style
        if (vertical) {
          style = { minWidth: (size_factor * (size ? size : 100.0)) + "%" }
        }
        else {
          style = { minHeight: (size_factor * (size ? size : 100.0)) + "%" }
        }
        if (i > 0) {
          if (onChange) {
            content.push(<ResizableBorder
              key={content.length}
              vertical={vertical}
              onResize={this.onResize(i)}
              onRelease={this.onRelease(i)}
            />)
          }
          else content.push(<ResizableBorder key={content.length} />)
        }
        content.push(<div key={display.key || content.length} ref={i as any} style={style}>
          <div>{display.header}</div>
          <div>{display.content}</div>
        </div>)
      }
      return (<div
        ref="container"
        className={(vertical ? className_V : className_H) + (className || "")}
        style={style}
      >
        {content}
      </div>)
    }
  }
}

const className_V = "wfs-linear-container vertical "
const className_H = "wfs-linear-container horizontal "
