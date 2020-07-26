<template>
  <div aspectratio class="banner" w-1366-60 aspectratio aspect-ratio="1366/60">
    <div aspectratio-content>
      <img src="@/assets/top_bg.png">
    </div>
    <p absolute>合肥京东方医院药品智慧供应链平台运营数据中心</p>
  </div>
</template>

<script>
    export default {
        name: "Banner"
    }
</script>

<style scoped>
  .banner p{
    t: 0px;fz:24px;c:#fff;w:100vw;lh:7vh;text-align: center;
    -webkit-animation:animations 2s ease-out infinite alternate;
    -moz-animation:animations 2s ease-out infinite alternate;
    -o-animation:animations 2s ease-out infinite alternate;
    -ms-animation:animations 2s ease-out infinite alternate;
    animation:animations 2s ease-out infinite alternate;
  }
  @keyframes animations {
    0% {
      opacity: .8;
      transform:scale(0.97) translate3d(0, 1.2vh, 0);
    }

    100% {
      opacity: 1;transform:;
      transform: none;
    }
  }
  [w-1366-60]{size:100vw 7vh;}
</style>
