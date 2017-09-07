/* eslint-disable guard-for-in */
/* eslint-disable import/no-namespace */
/* eslint-disable react/no-multi-comp */
/* eslint-disable react-native/no-inline-styles */
import React, { Component } from "react"

export type ItemTabType = {
  icon?: string,
  title: string,
  content: React$Element<any>,
  onClick?: Function,
}

type PropsType = {
  items?: Array<ItemTabType>,
  style?: Object | Array<any>,
}

type StateType = {
  current: number,
  alreadyDisplayed: boolean[],
}

type BarPropsType = {
  items?: Array<ItemTabType>,
  current: number,
  onChange?: Function,
}

export class WindowTabsBar extends Component<void, BarPropsType, void> {
  props: BarPropsType
  handlePress = (index: number) => () => {
    this.props.onChange && this.props.onChange(index)
  }
  render() {
    const { items, current } = this.props
    return (<div style={ styles.titleBand } >
      {items && items.map((item, index) => {
        return (
          <span
            key={ index }
            className={ current === index ? "" : "btn-primary" }
            style={ current === index ? styles.activeTitle : styles.inactiveTitle }
            onClick={ this.handlePress(index) }
          >
            {item.icon && <span className={ "padding fa fa-" + item.icon } />}
            {item.title}
          </span>
        )
      })}
    </div>)
  }
}

export default class WindowTabs extends Component<void, PropsType, StateType> {
  props: PropsType
  state: StateType = {
    current: 0,
    alreadyDisplayed: [ true ],
  }
  handleTitlePress = (index: number) => {
    const alreadyDisplayed = [ ...this.state.alreadyDisplayed ]
    alreadyDisplayed[index] = true
    this.setState({
      current: index,
      alreadyDisplayed,
    })
  }
  render() {
    const { current } = this.state
    const { items } = this.props
    if (!items || !Array.isArray(items)) {
      console.error("Empty Collapsible Window is useless.")
      return null
    }
    return (<div style={{ display: "flex", flexDirection: "column", width: "100%", height: "100%" }}>
      <WindowTabsBar items={ items } current={ current } onChange={ this.handleTitlePress } />
      {items.map((item, index) => {
        if (this.state.alreadyDisplayed[index]) {
          return (<div key={ index } style={{ display: (index != current) && "none", flex: "1 1 auto" }} >
            {item.content}
          </div>)
        }
        else {
          return <div key={ index } style={{ display: "none" }} />
        }
      })}
    </div>)
  }
}

const styles = {
  activeTitle: {
    flexDirection: "row",
    flex: 1,
    padding: 5,
    userSelect: "none",
    cursor: "default",
  },
  inactiveTitle: {
    flexDirection: "row",
    flex: 1,
    padding: 5,
    userSelect: "none",
    cursor: "pointer",
  },
  titleBand: {
    flex: "0 0 auto",
    display: "flex",
    flexDirection: "row",
  },
  icon: {
    marginLeft: 5,
    marginRight: 5,
    width: 18,
  },
}
