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
}

export default function WindowHeader(props: PropsType) {
  const { title, children, primary, danger, warning, success, info } = props

  const suffix
    = primary && "-primary"
    || danger && "-prdangerimary"
    || warning && "-warning"
    || success && "-success"
    || info && "-info"
    || "-default"

  return (<div>
    <div className={ "flexbox-row padding btn" + suffix }>
      <div className={ "flex-1 padding-left" }>{title}</div>
    </div>
    <div className="margin" >
      {children}
    </div>
  </div>)
}

