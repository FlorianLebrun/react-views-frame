// @flow

import React from "react"

type PropsType = {
  title: any,
  primary?: boolean,
  danger?: boolean,
  warning?: boolean,
  success?: boolean,
  info?: boolean,
  children?: any,
  onClick?: Function,
  addon?: any,
}

const handleClick = (props: PropsType) => (e: SyntheticEvent) => {
  const { onClick } = props
  onClick && onClick(e)
}

export default function WindowHeader(props: PropsType) {
  const { title, children, primary, danger, warning, success, info, addon } = props

  const suffix
    = primary && "-primary"
    || danger && "-prdangerimary"
    || warning && "-warning"
    || success && "-success"
    || info && "-info"
    || "-default"

  return (<div>
    <div className={ "flex-row padding btn" + suffix }>
      <div className={ "flex-1 padding-left" } onClick={ handleClick(props) }>{title}</div>
      { addon &&
        <div className={ "flex-0 padding-right" }>{addon}</div>
      }
    </div>
    <div className="margin" >
      {children}
    </div>
  </div>)
}

