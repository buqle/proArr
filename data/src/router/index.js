import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)
const _imports=files=>()=>import(`@/views/${files}.vue`)
export default new Router({
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component:_imports('Infos/Index')
    },
    {
      path: '/center',
      name: 'HelloWorld',
      component:_imports('Home/Index')
    }
  ]
})
