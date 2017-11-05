/* eslint-disable react/no-string-refs */
import React, { Component } from "react"

import { PanelResizer } from "../addons/windows-frame/FramePanels"

/** ******************************
*********************************
*** Window Split
*********************************
*********************************/

export type ItemSplitType = {
  content: React$Element<any>,
  size: number,
  overflow: string,
}

type PropsType = {
  items?: Array<ItemSplitType>,
  style?: Object | Array<any>,
}

export default class Split extends Component<void, PropsType, void> {
  props: PropsType

  componentWillMount() {
    const { items } = this.props
    this.sizes = items.map((item) => item.size || 0)
    this.modes = items.map((item) => item.size !== undefined ? 1 : 0)
    this.styles = items.map((item) => ({ overflow: item.overflow || "auto" }))
    this.applySizes()
  }

  sizes: Array<number>
  modes: Array<number>
  styles: Array<Object>

  transformDelta(e) {
    return e.deltaY
  }
  handleResize = (index) => (delta) => {
    const { sizes, modes } = this
    if (modes[index] > 0) {
      const csize = this.refs[index].clientHeight

      // Update sizes
      const size = sizes[index]
      delta = Math.max(size, 1) * delta / Math.max(csize, 1)
      sizes[index] += delta
      sizes[index + 1] -= delta

      this.applySizes()
    }
  }
  handleCollapse = (index) => () => {
    const { modes } = this
    modes[index] = -modes[index]
    this.applySizes()
  }
  applySizes() {
    const { sizes, modes, styles } = this

    // Accumulate sizes
    let len = 0
    for (let i = 0; i < sizes.length; i++) {
      if (sizes[i] > 0) len += sizes[i]
    }

    // Normalize sizes
    const factor = len ? 100 / len : 1
    for (let i = 0; i < sizes.length; i++) {
      const mode = modes[i]
      sizes[i] *= factor
      if (mode > 0) {
        styles[i] = { ...styles[i], height: sizes[i] + "%" }
      }
      else if (mode < 0) {
        styles[i] = { ...styles[i], height: 0 }
      }
      else {
        styles[i] = { height: "auto" }
      }
    }

    // Update
    this.forceUpdate()
  }
  render() {
    const { items } = this.props
    const contents = []

    if (!items || !Array.isArray(items)) {
      console.error("Empty Collapsible Window is useless.")
      return null
    }

    const lastIndex = items.length - 1
    for (let i = 0; i <= lastIndex; i++) {
      const item = items[i]

      // Render header
      if (item.header) {
        contents.push(<div
          key={ contents.length }
          style={ styles.header }
          onClick={ this.handleCollapse(i) }
                      >
          {this.modes[i] > 0
            ? <span className="fa fa-fw fa-caret-right padding-xs" />
            : <span className="fa fa-fw fa-caret-down padding-xs" />
          }
          {item.header}
        </div>)
      }

      // Render content
      contents.push(<div
        key={ contents.length }
        ref={ i }
        style={ this.styles[i] }
                    >
        {item.content}
      </div>)

      // Render resizer
      if (i < lastIndex) {
        contents.push(<PanelResizer
          key={ contents.length }
          onResize={ this.handleResize(i) }
          transformDelta={ this.transformDelta }
                      />)
      }
    }

    return (<div className="WND_side_panel WND_side_panel_H width-100 height-100">
      {contents}
    </div>)
  }
}

const styles = {
  header: {
    cursor: "pointer",
    backgroundColor: "#234",
    borderBottom: "solid 1px #012",
    color: "#89a",
  },
}