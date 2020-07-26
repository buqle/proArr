// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import './css/public.css'
import scroll from 'vue-seamless-scroll'
Vue.use(scroll)
//import echarts from 'echarts'
Vue.prototype.$echarts = echarts
Vue.config.productionTip = false;
Vue.use(echarts)
//过滤字符长度
Vue.filter('readMore', function (text, length, suffix) {
  return text.substring(0, length) + suffix
})
//icon
import './utils/iconfont'
//axios
import axios from 'axios';//cnpm install axios qs -S

import api from './api' // 导入api接口
Vue.prototype.$api = api; // 将api挂载到vue的原型上
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
