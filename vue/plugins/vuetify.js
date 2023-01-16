import '@mdi/font/css/materialdesignicons.css' // Ensure you are using css-loader
// import 'material-design-icons-iconfont/dist/material-design-icons.css'

import Vue from 'vue'
import Vuetify, { VApp, VMain } from 'vuetify/lib'
// If using vuetify-loader, it will be not necessary to import blow.
// see https://vuetifyjs.com/en/getting-started/installation/#webpack-install
// import 'vuetify/dist/vuetify.min.css'

Vue.use(Vuetify, {
  components: { VApp, VMain } // This option added for use <v-app> tag in index.ejs
})

export default new Vuetify({
  // icons: {
  //   iconfont: "mdi" // 默认值 - 仅用于展示目的
  // }
})