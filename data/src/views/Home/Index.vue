<template>
   <div class="data-warp size-100vw">
     <Banner></Banner>
     <div aspectratio  w-1366-687 aspectratio aspect-ratio="1366/687">
       <div aspectratio-content>

         <img src="@/assets/content.png" absolute>
         <div flexcont class="warp" relative>
           <left-box></left-box>
          <center-box></center-box>
          <!--<right-box></right-box>-->
         </div>
       </div>


     </div>

   </div>
</template>

<script>
  import Banner from '@/components/Banner';
  import LeftBox from '@/components/LeftBox';
  import CenterBox from '@/components/CenterBox';
  import RightBox from '@/components/RightBox';
    export default {
        name: "Index",
      components: {
        Banner,LeftBox,CenterBox,RightBox
      },
      data () {
        return{
          size:'.8vw'
        }
      },
      mounted(){

      },
      methods: {

      }
    }
</script>

<style scoped>

  [w-1366-687]{w:1366px;h:calc(100vh - 7vh);}
[w-1366-20]{w:100vw;h:2.5vh;}

  .warp{
    w:96vw;justify-content: space-around;m:10px auto 30px auto;



  }

</style>
