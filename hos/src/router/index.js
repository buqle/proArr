import Vue from 'vue'
import Router from 'vue-router'
const _imports=files=>()=>import(`@/page/${files}.vue`)

Vue.use(Router)

export const RouterMap=[
  {
    path:'/',
    name: '医院物资需求汇总',
    component: _imports('layouts/index'),
    redirect: '/map',
    children: [
      { path: 'home', component: _imports('home/index'), name: '医院物资需求汇总',},
      { path: 'map', component: _imports('home/map'), name: '医院物资需求地图',meta:{keepAlive:true}},
    ]
  },
  {
    path:'/details',
    name: '医院物资需求详情',
    component: _imports('home/datails'),

  },

]
export const router=new Router({
  routes:RouterMap
});
