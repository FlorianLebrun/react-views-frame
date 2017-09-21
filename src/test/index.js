import React, { Component } from "react"
import ReactDOM from "react-dom"
import Application from "./app"
import "./DevTextPlugin"

export default class SplashBackground extends Component {
  style = {
    body: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      height: "100%",
    },
    title: {
      color: "#012",
      fontFamily: "Consolas",
      textShadow: "5px 5px 5px #abc",
      borderTop: "2px solid #012",
      padding: 20,
    },
  }
  render() {
    return (<div style={ this.style.body }>
      <h1 style={ this.style.title }>
        {"{ react-application-frame }"}
      </h1>
    </div>)
  }
}

Application.configureLayout({
  splashComponent: SplashBackground,
  displayLayout: {
    "#": {
      type: "#",
      child: "left",
    },
    "left": {
      type: "side-left",
      child: "bottom",
      size: 30,
    },
    "bottom": {
      type: "side-bottom",
      child: "right",
      size: 30,
    },
    "right": {
      type: "side-right",
      child: "center",
      size: 30,
    },
    "center": {
      type: "center-top",
      menu: true,
    },
  },
})

ReactDOM.render(Application.renderDisplayFrame(), document.getElementById("root"))
