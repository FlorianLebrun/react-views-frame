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

      const request = Object.assign({ headers:{} }, options)
      if (options) {
        if (options.body instanceof Object) {
          request.headers["Content-Type"] = "application/json"
          request.body = JSON.stringify(options.body)
        }
        else if (options.body) {
          const contentType = options.headers["Content-Type"]
          if (!contentType) request.headers["Content-Type"] = "text/plain"
        }
        request.method = options.method || "GET"
        request.headers = Object.assign({ "Accept": "application/json" }, options.headers)
      }
      else {
        request.method = "GET"
        request.headers = { "Accept": "application/json" }
      }

      const response = (res) => {
        return new Promise((resolve, reject) => {

          const respondSuccess = function(json) {
            resolve({ status: res.status, headers: res.headers, json })
          }
          const respondError = function(error) {
            reject({ status: res.status, headers: res.headers, error })
          }

          if (res.status >= 200 && res.status < 300) {
            if (endpoint.feedback) {
              endpoint.feedback(res, data)
            }
            if (res.status === 204) {
              return respondSuccess({})
            }
            else {
              return res.json().then(respondSuccess, respondError)
            }
          }
          else if (res.status === 401 && hasLoginRecovery && endpoint.login) {
            if (!this.loginPromise) {
              this.loginPromise = endpoint.login(this.application)
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
          else if (res.json && res.json instanceof Function) {
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