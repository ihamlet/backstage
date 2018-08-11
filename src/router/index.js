import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/components/Index'

import Login from '@/components/entry/Login'
import Register from '@/components/entry/Register'

import Layout from '@/components/pages/Layout'

import Basic from '@/components/pages/Settings/Basic'
import StoreInfo from '@/components/pages/Settings/main/StoreInfo'
import BasicSettings from '@/components/pages/Settings/main/BasicSettings'

import Commodity from '@/components/pages/Management/Commodity'
import ProductList from '@/components/pages/Management/main/ProductList'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '',
      name: 'Index',
      component: Index,
      children: [{
        path: '/',
        name: 'Layout',
        component: Layout,
        meta: {
          LoginRequire: true
        },
        children: [{
          path: '/',
          name: 'Basic',
          component: Basic,
          meta: {
            LoginRequire: true
          },
          children: [{
            path: '/',
            name: 'StoreInfo',
            component: StoreInfo,
            meta: {
              LoginRequire: true
            }
          }, {
            path: '/StoreInfo/BasicSettings',
            name: 'BasicSettings',
            component: BasicSettings,
            meta: {
              LoginRequire: true
            }
          }]
        }, {
          path: '/Commodity',
          name: 'Commodity',
          component: Commodity,
          meta: {
            LoginRequire: true
          },
          children: [{
            path: '/Commodity/ProductList',
            name: 'ProductList',
            component: ProductList,
            meta: {
              LoginRequire: true
            }
          }]
        }]
      }, {
        path: '/Login',
        name: 'Login',
        component: Login,
        meta: {
          LoginRequire: false
        }
      }, {
        path: '/Register',
        name: 'Register',
        component: Register,
        meta: {
          LoginRequire: false
        }
      }]
    }
  ]
})
