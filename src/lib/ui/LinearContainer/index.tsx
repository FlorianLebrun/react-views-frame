import React from "react"

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
  children: (item: LayoutItemType) => DisplayItemType;
  onChange?: (layout: LayoutType) => void,
  onNew?: (data: any) => { [customKey: string]: any },
}

const vertical = 1

export default function LinearContainer(props: PropsType) {
  const { value, children, style } = props
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
      content.push(<div key={content.length} style={{ flex: 1, minHeight: (sizeFactor * (size ? size : 100)) + "%" }}>
        {i > 0 &&
          <div className="wfs-resizer-bar"><div /></div>
        }
        <div className={vertical ? "" : "transform-rotate-90"}>{display.header}</div>
        <div>{display.content}</div>
      </div>)
    }
    return (<div style={{ ...style, display: "flex", flexDirection: vertical ? "column" : "row", backgroundColor: "rgba(0,0,255,0.1)" }}>
      {content}
    </div>)
  }
}
