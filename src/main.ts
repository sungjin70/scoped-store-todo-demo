import Vue from 'vue'
import App from './App.vue'
import router from './router'
import vuetify from './plugins/vuetify'
import ScopedStore from "vue-scoped-store";

Vue.config.productionTip = false

Vue.use(ScopedStore, {debug:process.env.NODE_ENV == 'development'});

new Vue({
  router,
  vuetify,
  render: h => h(App)
}).$mount('#app')
