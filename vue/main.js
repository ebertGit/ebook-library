import Vue from "vue"
import vuetify from "./plugins/vuetify" // path to vuetify export

import Card from "./components/Card"
import AppBar from "./components/AppBar"

new Vue({
  el: "#app",
  vuetify: vuetify,
  components: {
    Card,
    AppBar
  },
  data: {
    message: "hello, webpack-vue."
  }
});
