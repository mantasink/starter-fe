import Vue from 'vue'
import Vuex, { mapState } from 'vuex'
import Vuelidate from 'vuelidate'

import App from './App.vue'
import router from './router'
import store from './store'
import './registerServiceWorker'
import BootstrapVue from 'bootstrap-vue'

Vue.config.productionTip = false
Vue.use(BootstrapVue)
Vue.use(Vuex)
Vue.use(Vuelidate)

Vue.component('status-alert', () => import(/* webpackChunkName: 'status-alert' */ './components/StatusAlert'))
Vue.component('site-header', () => import(/* webpackChunkName: 'site-header' */ './components/SiteHeader'))

new Vue({
  router,
  store,
  computed: {
    ...mapState({
      token: 'token'
    })
  },
  mounted () {
    this.$store.dispatch('updateToken')
    this.$store.dispatch('updateAuthorizationHeader')
  },
  render: h => h(App)
}).$mount('#app')
