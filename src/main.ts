import Vue from 'vue'
import App from './App.vue'
import router from './router'
import vuetify from './plugins/vuetify'
import ScopedStore from "vue-scoped-store";

Vue.config.productionTip = false

//ScopedStore 플러그인 초기화, 개발 모드에서 콘솔 디버그 활성화.
//Install ScopedStore plugin with an option parameter activating debug information
Vue.use(ScopedStore, {debug:process.env.NODE_ENV == 'development'});

new Vue({
  router,
  vuetify,
  render: h => h(App)
}).$mount('#app')
