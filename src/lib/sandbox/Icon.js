import React, { Component } from "react"

export function __esSandboxExport(exports, sandbox) {

  const componentLibraries = {}

  type PropsType = {
    name: string,
  }

  function waitComponent() {
    return (<span className="fa fa-spin fa-spinner" />)
  }
  function errorComponent() {
    return (<span className="fa fa-exclamation" />)
  }
  function emptyComponent() {
    return null
  }

  class IconLibrary {
    deffered: Promise
    component: Component

    constructor(moduleId: string) {
      const module = sandbox.getModule(moduleId)
      const deffered = sandbox.installModule(module)
      if (deffered) {
        this.deffered = deffered.then((module) => {
          this.deffered = null
          return this.component = module.default || errorComponent
        }).catch(e => {
          this.deffered = null
          return this.component = errorComponent
        })
        this.component = waitComponent
      }
      else {
        this.component = module.default || errorComponent
      }
    }
  }

  exports.default = class extends Component<void, PropsType, void> {
    component: Component
    name: string

    componentWillMount() {
      this.updateIcon(this.props.name)
    }
    componentWillReceiveProps(nextProps) {
      if (this.props.name !== nextProps.name) {
        this.updateIcon(nextProps.name)
      }
    }
    updateIcon(name) {
      const parts = name && name.split(':')
      if (parts && parts.length > 1 && parts[0]) {

        // Find the icon library
        let library = componentLibraries[parts[0]]
        if (!library) {
          library = new IconLibrary(parts[0])
          componentLibraries[parts[0]] = library
        }

        // Get the icon component
        this.name = parts[1]
        this.component = library.component
        if (library.deffered) {
          library.deffered.then((component) => {
            this.component = component
            this.forceUpdate()
          })
        }
      }
      else {
        this.component = emptyComponent
      }
    }
    render() {
      return (<this.component {...this.props} name={this.name} />)
    }
  }
  exports.__esModule = true
}
