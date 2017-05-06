/* eslint-disable react/no-string-refs */
/* eslint-disable react-native/no-inline-styles */
import React, { Component } from "react"

import { PanelResizer } from "../kernel/FramePanels"

/** ******************************
*********************************
*** Window Split
*********************************
*********************************/

export type ItemSplitType = {
  content: React$Element<any>,
  size: number,
}

type PropsType = {
  items?: Array<ItemSplitType>,
  style?: Object | Array<any>,
}

type StateType = {
  sizes?: Array<number>,
}

export default class WindowSplit extends Component<void, PropsType, StateType> {
  props: PropsType
  state: any = {}

  componentWillMount() {
    const { items } = this.props
    this.setState({
      sizes: items.map(() => 100 / items.length),
    })
  }
  transformDelta(e) {
    return e.deltaY
  }
  handleResize = (index) => (delta) => {
    const sizes = this.state.sizes.slice()
    const csize = this.refs[index].clientHeight

    // Update sizes
    const size = sizes[index]
    delta = Math.max(size, 1) * delta / Math.max(csize, 1)
    sizes[index] += delta
    sizes[index + 1] -= delta

    // Normalize sizes
    const len = sizes.reduce((prev, sz) => prev + sz, 0)
    const factor = 100 / len
    sizes.forEach((sz, i) => sizes[i] *= factor)
    this.setState({ sizes })
  }
  render() {
    const { items } = this.props
    const { sizes } = this.state
    const contents = []
    let index = 0

    if (!items || !Array.isArray(items)) {
      console.error("Empty Collapsible Window is useless.")
      return null
    }

    while (index < items.length - 1) {
      const item = items[index]
      contents.push(<div
        key={ contents.length }
        ref={ index }
        style={{ overflow: "hidden", height: sizes[index] + "%" }}
                    >
        {item.content}
      </div>)
      contents.push(<PanelResizer
        key={ contents.length }
        onResize={ this.handleResize(index) }
        transformDelta={ this.transformDelta }
                    />)
      index++
    }

    const item = items[index]

    contents.push(<div
      key={ contents.length }
      ref={ index }
      style={{ overflow: "hidden", height: sizes[index] + "%" }}
                  >
      {item.content}
    </div>)

    return (<div className="WND_side_panel WND_side_panel_H" style={ styles.expense }>
      {contents}
    </div>)
  }
}

const styles = {
  expense: { width: "100%", height: "100%" },
}