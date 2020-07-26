<template>
   <div class="data-warp size-100vw">
     <!--<img src="@/assets/lodading.jpg" width="100%" height="100vh" v-if="start" id="box">-->
     <div>
       <Banner></Banner>
       <div aspectratio  w-1366-687 aspectratio aspect-ratio="1366/687">
         <div aspectratio-content>

           <img src="@/assets/content.png" absolute>
           <div flexcont class="warp" relative>
            <top-bar></top-bar>
            <center-box></center-box>
             <between-box></between-box>
           </div>
         </div>


       </div>
     </div>

   </div>
</template>

<script>
  import Banner from '@/components/Banner';
  import TopBar from './TopBar';
  import CenterBox from './Center';
  import BetweenBox from './Between';
    export default {
        name: "Index",
      components: {
        Banner,TopBar,CenterBox,BetweenBox
      },
      data () {
        return{
          start:true
        }
      },
      mounted(){

      },
      methods: {

      },
      created(){
          let _this=this;
          setTimeout(()=>{
            _this.start=false
          },1200)
      }
    }
</script>

<style scoped>

  [w-1366-687]{w:1366px;h:calc(100vh - 7vh);}
[w-1366-20]{w:100vw;h:2.5vh;}

  .warp{
    w:96vw;justify-content: space-around;m:10px auto 30px auto;flex-direction: column;

  }

  @keyframes fadeio{
    0% {
      opacity: 1;
    }
    50% {
      opacity: 50;
    }
    100% {
      opacity: 20;
    }
  }
  @-webkit-keyframes fadeio {
    /*设置内容由显示变为隐藏*/
    0% {
      opacity: 1;
    }
    50% {
      opacity: 50;
    }
    100% {
      opacity: 20;
    }
  }
  #box
  {-webkit-animation: fadeio 1s infinite;animation: fadeio 1s infinite;}
</style>
