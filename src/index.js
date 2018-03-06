/* eslint-disable no-unused-vars */
import 'es6-promise/auto'
import Vue from 'vue'
import VueRouter from 'vue-router'
import configRouter from './route-config'
import * as wdui from 'wdui' //整体引入
import 'wdui/lib/styles/theme-default/index.css' //引入样式文件
import './assets/reset.css'
import './assets/iconfont/iconfont.css'
// import './assets/green.scss'
import './assets/blue.scss'
import utils from './util/util'

Vue.use(wdui)
Vue.use(VueRouter)
// Vue.use(utils)

const router = new VueRouter(configRouter)
const app = new Vue({
  el: '#app',
  router: router,
  render(h) {
    return (<router-view></router-view>)
  }
})
