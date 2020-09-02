import axios from "axios"

const TIMEOUT = 8 * 60 * 1000


let api = axios.create({
  baseURL: SERVER_API_URL + "api/",
  timeout: TIMEOUT,
  responseType: "json",
  headers: {
    "Content-Type": "application/json",
  },
})
api.interceptors.request.use(function (config) {
  return config
}, function (error) {
  return Promise.reject(error)
})
api.interceptors.response.use(function (response) {
  return response
}, async function (error) {
  return Promise.reject(error)
})

export default {
  get(path) {
    return api.get(path)
      .then(function (response) {
        return response.data
      })
  },
}
