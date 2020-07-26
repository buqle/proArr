<template>
  <div flexcont class="bgfff header-bar" fixed-top>
    <router-link tag="p" v-for="(item,index) in menuList"  flexcont flexcont2 :to="item.path" :class="{'active':($route.path===item.path)}" :key="index">
      {{item.title}}
    </router-link>
  </div >
</template>

<script>
  export default {
    data(){
      return{
        menuList:[{
          title:'需求地图',
          path:'/map'
        },
          {
            title:'医院需求清单',
            path:'/home'
          }
        ]
      }
    }
  }
</script>
<style>
  .header-bar{
    h:90px;z-index:200;
    .active{}
  }
</style>
