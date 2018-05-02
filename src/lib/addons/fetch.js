import { PluginInstance } from "../layout"

export default {
  name: "fetch-addon",
  component: class extends PluginInstance {
    endpoints: Array = null
    loginPromise: Promise = null
    enableLoginRecovery: boolean = true

    pluginWillMount(parameters: Object) {
      this.application.fetchAPI = this.fetchAPI.bind(this)
      this.endpoints = parameters.endpoints
    }
    fetchAPI(url, options) {
      let hasLoginRecovery = this.enableLoginRecovery && (!options || !options.noCredentials)

      const endpoint = this.endpoints.find(e => url.match(e.pattern))
      if (!endpoint) {
        throw new Error("no endpoint for " + url)
      }

      const request = Object.assign({}, options)
      request.headers = {
        "Accept": "application/json",
        ...request.headers,
      }
      if (request.body) {
        request.method = request.method || "POST"
        if (request.body instanceof File) {
          request.headers["Content-Type"] = request.body.type
        }
        else if (request.body instanceof Object) {
          request.headers["Content-Type"] = "application/json"
          request.body = JSON.stringify(request.body)
        }
        else if (!request.headers["Content-Type"]) {
          request.headers["Content-Type"] = "text/plain"
        }
      }
      else {
        request.method = request.method || "GET"
      }

      const response = (res) => {
        return new Promise((resolve, reject) => {

          const respondError = function (error) {
            reject({ status: res.status, headers: res.headers, error })
          }

          const contentType = res.headers && res.headers.get("content-type")
          const isJson = contentType && contentType.toLowerCase().indexOf("application/json") !== -1

          if (res.status >= 200 && res.status < 300) {
            if (endpoint.feedback) {
              endpoint.feedback(res, data)
            }
            if (res.status === 204) {
              resolve({ status: res.status, headers: res.headers, json: isJson ? {} : undefined })
            }
            else if (request.useBlob) {
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
              this.loginPromise = endpoint.login(request, res)
              if (!this.loginPromise) throw new Error()
            }
            this.loginPromise.then(() => {
              this.loginPromise = null
              hasLoginRecovery = false
              const data = { ...request }
              resolve(fetch(endpoint.prepare(url, data), data).then(response, response))
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

      const data = { ...request }
      return fetch(endpoint.prepare(url, data), data).then(response, response)
    }
  },
}