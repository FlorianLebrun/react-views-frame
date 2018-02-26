import React from "react"
import ReactDOM from "react-dom"

import { PluginInstance } from "../layout"

export default {
  name: "popup-addon",
  component: class extends PluginInstance {
    modalStack = []
    pluginWillMount() {
      this.application.popup = this.popup
    }
    popup = (renderer: Function, outsideReject): Promise => {
      return new Promise((resolve, reject) => {
        const htmlRoot = document.createElement("div")
        htmlRoot.style.position = "absolute"
        htmlRoot.style.left = "0px"
        htmlRoot.style.top = "0px"
        htmlRoot.style.zIndex = this.modalStack.length * 1000 + 1000
        document.body.appendChild(htmlRoot)

        function handleResolve(data) {
          document.body.removeChild(htmlRoot)
          resolve(data)
        }
        function handleReject(data) {
          document.body.removeChild(htmlRoot)
          reject(data)
        }
        function handleStopPropagation(evt) {
          evt.stopPropagation()
        }
        ReactDOM.render((
          <div>
            <div style={styles.backdrop} className="backdrop web-modal-dialog" />
            <div style={styles.vWrapper} onClick={outsideReject && handleReject} className="v-wrapper">
              <div style={styles.hWrapper} className="h-wrapper">
                <div className="modal-dialog" onClick={handleStopPropagation}>
                  <div className="modal-content">
                    <div className="modal-body">
                      {renderer(handleResolve, handleReject)}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ), htmlRoot)
      })
    }
  },
}

const styles = {
  backdropWrapper: {
    position: "fixed",
    height: "100%",
    width: "100%",
    zIndex: 999,
  },
  backdrop: {
    opacity: .5,
    position: "fixed",
    height: "100%",
    width: "100%",
    zIndex: 998,
    backgroundColor: "#333",
  },
  vWrapper: {
    position: "fixed",
    height: "100%",
    width: "100%",
    zIndex: 999,
    flexDirection: "row",
    justifyContent: "center",
  },
  hWrapper: {
    height: "100%",
    flexDirection: "column",
    justifyContent: "center",
  },
  modalDialog: {
    width: 600,
    marginTop: 30,
    marginBottom: 30,
  },
  modalContent: {
    marginLeft: "auto",
    marginRight: "auto",
    width: 600,
    boxShadow: "0 5px 15px rgba(0,0,0,.5)",
    zIndex: 99999999,
    backgroundColor: "white",
    padding: 3,
    borderWidth: 1,
    borderColor: "rgba(0,0,0,.2)",
    borderRadius: 6,
  },
  modalHeader: {
    padding: 10,
    borderBottomColor: "#e5e5e5",
    borderBottomWidth: 1,
    flex: 1,
    flexDirection: "row",
  },
  close: {
    cursor: "pointer",
  },
  modalBody: {
    position: "relative",
    padding: 10,
  },
  modalFooter: {
    padding: 10,
    alignItems: "flex-end",
    borderTopWidth: 1,
    borderColor: "#e5e5e5",
  },
}

