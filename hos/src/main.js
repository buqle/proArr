// The Vue build version to load with the `import` command

import Vue from 'vue'
import App from './App'
import router from './router/router-manage'
import Mint from 'mint-ui';
import 'mint-ui/lib/style.css'
import './css/public.css'
import jWeixin from 'weixin-js-sdk'

Vue.use(Mint);
//vuex
import Vstore from './store/index'
//icon
import './utils/iconFont'

import api from './api' // 导入api接口
import pin from './utils/pin' //导入埋点
Vue.prototype.$api = api;
Vue.prototype.$pin = pin;
Vue.prototype.jWeixin = jWeixin;

import format from 'vue-text-format';
Vue.use(format);
import 'echarts/lib/chart/map';
import 'echarts/lib/component/visualMap';
import 'echarts/lib/component/tooltip';
import 'echarts/map/js/world';

import VueLazyLoad from 'vue-lazyload';
import def_lazy_img from './assets/loading.gif';


Vue.use(VueLazyLoad,{
  preLoad: 1.3,
  attempt: 2,
  error:def_lazy_img,
  loading: def_lazy_img
});

Vue.config.productionTip = false;

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,store:Vstore,
  render:h=>h(App)
})
