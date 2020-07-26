<template>
    <div class="loading" flexcont flexcont2 :class="{'loadingClass':loadingClass}" style="z-index: 300">
      <p>{{loadingText}}</p>
      <mt-spinner type="triple-bounce" :size="100"></mt-spinner>
    </div>
</template>

<script>
  import {Spinner } from 'mint-ui';
  import {mapState} from 'vuex';
    export default {
      computed:{
        ...mapState(['loadingText','loadingClass'])
      },
    }
</script>

<style scoped>
  .loading{
    position: fixed;size:100vw 100vh;background: #000;t:0px;l:0;opacity: .5;
    p{c: #cdcdcd;}
  }
  .loadingClass{
    size:100vw 100vh;t:0px;
  }
</style>
