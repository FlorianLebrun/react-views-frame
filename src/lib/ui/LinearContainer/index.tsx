import React from "react"
import { ResizableBorder } from "../ResizableBorder";
import "./index.css"

type DisplayItemType = {
  header?: any,
  content?: any,
}

type LayoutItemType = {
  size: number,
  [customKey: string]: any,
}

type LayoutType = LayoutItemType[]

type PropsType = {
  value: LayoutType,
  style?: any,
  className?: string,
  children: (item: LayoutItemType) => DisplayItemType;
  onChange?: (layout: LayoutType) => void,
  onNew?: (data: any) => { [customKey: string]: any },
}

const vertical = false
//const vertical = true

export default class LinearContainer extends React.Component {
  props: PropsType
  onResize = (delta) => {
  }
  onRelease = (delta) => {
    console.log(delta)
  }
  render() {
    const { value, children, style, className } = this.props
    if (value && children) {

      let sizeFactor = 0
      for (let i = 0; i < value.length; i++) {
        const { size } = value[i]
        sizeFactor += size ? size : 100
      }
      sizeFactor = 100 / sizeFactor

      const content = []
      for (let i = 0; i < value.length; i++) {
        const display = children(value[i])
        const { size } = value[i]
        content.push(<div key={i} ref={"items"} style={{ minHeight: (sizeFactor * (size ? size : 100)) + "%" }}>
          {i > 0 && <ResizableBorder vertical={vertical} onResize={this.onResize} onRelease={this.onRelease} />}
          <div>{display.header}</div>
          <div>{display.content}</div>
        </div>)
      }
      return (<div
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
