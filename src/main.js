// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

import router from './router'
import Vuex from 'vuex'
import store from './store/index'

Vue.use(ElementUI)
Vue.use(Vuex)

Vue.config.productionTip = false

router.beforeEach((to, from, next) => {
  const Token = store.getters.TokenKey

  console.log(Token)

  if (to.matched.some(record => record.meta.LoginRequire)) {
    if (!Token) {
      next({
        name: 'Login'
      })
    } else {
      next()
    }
  } else {
    next()
  }
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
