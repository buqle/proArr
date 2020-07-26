<template>
  <div >
    <response-head></response-head>
    <transition name="router-slid" mode="out-in">
      <keep-alive>
        <router-view v-if="$route.meta.keepAlive"/>
      </keep-alive>
    </transition>

    <transition name="router-slid" mode="out-in">
      <router-view v-if="!$route.meta.keepAlive"/>
    </transition>
  </div>
</template>

<script>
  import ResponseHead from '@/components/ResponseHead';
  import {mapState} from 'vuex';
    export default {
      components: {ResponseHead},
      computed:{
        ...mapState(['maxHeight'])
      },
    }
</script>

<style scoped>
.maxHeight{h:100vh;}
</style>
