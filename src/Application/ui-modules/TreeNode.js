/* eslint-disable guard-for-in */
/* eslint-disable import/no-namespace */
/* eslint-disable react/no-multi-comp */
/* eslint-disable one-var */

import React, { Component } from "react"

export type PropsType = {
  open?: boolean,
  largeOpen?: boolean,
  parameters: any,
  header: any,
  content: any | Function, // content: at Function.invoke(parameters) is Promise
}

export type StateType = {
  open: boolean,
}

export default class TreeNode extends Component<void, PropsType, void> {
  props: PropsType
  state: StateType
  componentWillMount() {
    this.setState({ open: this.props.open ? true : false })
  }
  shouldComponentUpdate(nextProps, nextState) {
    return nextProps || nextState
  }
  handleOpen = () => {
    this.setState({ open: !this.state.open })
  }
  handleUpdate = () => {
    this.forceUpdate()
  }
  render() {
    const { open } = this.state
    const { header, content, parameters, largeOpen } = this.props
    let childrenElement, headerElement, iconElement

    // Evaluate content rendering
    if (!content) {
      headerElement = <div className="flex-1">{header}</div>
      iconElement = (<span className="flex-no fa fa-circle-o icon-sm" style={ styles.tiny } />)
      childrenElement = null
    }
    else {
      let headerEvent
      if (open) {
        childrenElement = (content instanceof Function) ? content(parameters, this.handleOpen) : content
        if (childrenElement instanceof Promise) {
          iconElement = (<span className="flex-no fa fa-spinner fa-pulse no-padding margin-right icon-sm" />)
          childrenElement.then(this.handleUpdate)
          childrenElement = null
        }
        else {
          headerEvent = this.handleOpen
          iconElement = (<span className="flex-no fa fa-caret-down icon-sm cursor-pointer" onClick={ headerEvent } />)
          childrenElement = (<div className="margin-left-lg">{childrenElement}</div>)
        }
      }
      else {
        headerEvent = this.handleOpen
        iconElement = (<span className="flex-no fa fa-caret-right icon-sm cursor-pointer" onClick={ headerEvent } />)
        childrenElement = null
      }
      if (headerEvent && largeOpen) {
        headerElement = (<div className="flex-1 cursor-pointer" onClick={ headerEvent }>{header}</div>)
      }
      else {
        headerElement = (<div className="flex-1">{header}</div>)
      }
    }

    return (
      <div>
        <div className="flexbox-row">
          {iconElement}
          {headerElement}
        </div>
        {childrenElement}
      </div>)
  }
}

const styles = {
  tiny: {
    fontSize: 8,
    height: 8,
    paddingTop: 2,
    verticalAlign: "middle",
  },
}