import Vue from 'vue';
import Vuex from 'vuex';
import actions from './actions'
import mutations from './mutations';


Vue.use(Vuex);
const state = {
  loading:false,
  loadingClass:false,
  loadingText:'登录中...',
  key:'medcsbr',
  prevEnterTime: 0,
  pageElapsed: 0,
};
export default new Vuex.Store({
  state,actions,mutations
})
