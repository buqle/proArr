/**
 * @author BQL
 * @date 2020/2/4
 * @Description: 路由权限管理
*/
import {router} from "./index";
import store from '@/store'
import Vue from 'vue';
import pin from '@/utils/pin'

router.beforeEach((to, from ,next) => {
  let thisEnterTime = (new Date()).valueOf();
  if (store.state.prevEnterTime != 0) {
    let pageElapsed = thisEnterTime - store.state.prevEnterTime;
    pin.pin_pageElapsed(pageElapsed, from);
  }
  store.state.prevEnterTime = (new Date()).valueOf();
  next();
})

router.afterEach((to,from, next)=>{
  document.title=to.name;
  if(to.path!='/home'){
    window.scroll(0, 0);
  }
});

export  default router;
