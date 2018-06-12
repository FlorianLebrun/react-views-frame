import { PluginInstance } from "../layout"

function makeWebsocketUrl(url) {
  if (url[0] === '/') {
    url = window.location.origin + url
  }
  return url.replace("http", "ws")
}

const defaultEndPoint = {
  request(req, url, options): string {
    return url
  },
  websocket(url, options): string {
    return url
  },
  login(req, res, url, options): Promise {
    return null
  },
  feedback(req, res, url, options) {
  },
}

export default {
  name: "fetch-addon",
  component: class extends PluginInstance {
    router: Object = null
    loginPromise: Promise = null
    enableLoginRecovery: boolean = true

    pluginWillMount(parameters: Object) {
      this.application.fetchAPI = this.fetchAPI.bind(this)
      this.application.websocketAPI = this.websocketAPI.bind(this)
      this.resolveUrl = parameters.resolveUrl || this.resolveUrl
    }
    resolveEndPoint(url, options) {
      return defaultEndPoint
    }
    websocketAPI(url, options): WebSocket {
      const endpoint = this.resolveUrl("ws", url) || defaultEndPoint
      return new WebSocket(makeWebsocketUrl(endpoint.websocket(url, options)))
    }
    fetchAPI(url, options): Promise<Response> {
      let hasLoginRecovery = this.enableLoginRecovery && (!options || !options.noCredentials)
      const endpoint = this.resolveUrl("http", url) || defaultEndPoint

      const req = Object.assign({}, options)
      req.headers = {
        "Accept": "application/json",
        ...req.headers,
      }
      if (req.body) {
        req.method = req.method || "POST"
        if (req.body instanceof File) {
          req.headers["Content-Type"] = req.body.type
        }
        else if (req.body instanceof Object) {
          req.headers["Content-Type"] = "application/json"
          req.body = JSON.stringify(req.body)
        }
        else if (!req.headers["Content-Type"]) {
          req.headers["Content-Type"] = "text/plain"
        }
      }
      else {
        req.method = req.method || "GET"
      }

      function handleResponse(res) {
        return new Promise((resolve, reject) => {

          const respondError = function (error) {
            reject({ status: res.status, headers: res.headers, error })
          }

          const contentType = res.headers && res.headers.get("content-type")
          const isJson = contentType && contentType.toLowerCase().indexOf("application/json") !== -1

          if (res.status >= 200 && res.status < 300) {
            if (endpoint.feedback) {
              endpoint.feedback(req, res, url, options)
            }
            if (res.status === 204) {
              resolve({ status: res.status, headers: res.headers, json: isJson ? {} : undefined })
            }
            else if (req.useBlob) {
              return res.blob().then((blob) => {
                return resolve({ status: res.status, headers: res.headers, blob })
              }, respondError)
            }
            else {
              return res.text().then(function (text) {
                let json
                if (isJson) {
                  try { json = isJson && JSON.parse(text) }
                  catch (e) { return respondError(e) }
                }
                return resolve({ status: res.status, headers: res.headers, text, json })
              }, respondError)
            }
          }
          else if (res.status === 401 && hasLoginRecovery && endpoint.login) {
            if (!this.loginPromise) {
              this.loginPromise = endpoint.login(req, res, url, options)
              if (!this.loginPromise) throw new Error()
            }
            this.loginPromise.then(() => {
              this.loginPromise = null
              hasLoginRecovery = false
              resolve(fetch(endpoint.request(req, url, options), req).then(handleResponse, handleResponse))
            }, (error) => {
              this.loginPromise = null
              this.enableLoginRecovery = false
              respondError(error)
            })
          }
          else if (isJson && res.json instanceof Function) {
            return res.json().then(respondError, () => {
              this.enableLoginRecovery = false
              respondError(res.error)
            })
          }
          else {
            return respondError(res.error)
          }
        })
      }

      return fetch(endpoint.request(req, url, options), req).then(handleResponse, handleResponse)
    }
  },
}