import Vue from "vue"
import App from "@/App.vue"
import "@/ui"

new Vue({
  el: "#app",
  render: h => h(App),
})

if (module.hot) {
  module.hot.accept()
}
