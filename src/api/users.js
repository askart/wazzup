import http from "@/services/http"

export function get() {
  const path = "?rows=1000&id={index}&fullname={firstName}~{lastName}&company={business}&email={email}&uname={username}&address={addressObject}"
  return http.get(path)
}


export default {
  get,
}
