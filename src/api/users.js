import http from "@/services/http"
const rows = require("response.json")

export function get() {
  if (process.env.NODE_ENV == "production") {
    const wait = ms => new Promise(resolve => setTimeout(resolve, ms));
    return wait(1 * 1000).then(() => rows)
  } else {
    const path = "?rows=1000&id={index}&fullname={firstName}~{lastName}&company={business}&email={email}&uname={username}&address={addressObject}"
    return http.get(path)
  }
}


export default {
  get,
}
