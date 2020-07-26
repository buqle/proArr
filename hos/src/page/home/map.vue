/**
 * @author BQL
 * @date 2020/2/9
 * @Description: 需求地图
*/
<template>
    <div class="map">

      <v-loadmore :top-method="loadTop"  :bottom-all-loaded="allLoaded" ref="loadmore">
        <dl flexcont4 class="dl-top bgfff">
          <dt flexcont>
            <span bold style="color:#ff0000;">{{this.list.demands}}</span>
            医院需求
          </dt>
          <dt flexcont>
            <span bold style="color:#ff6600;">{{this.list.details}}</span>
            品规
          </dt>
          <dt flexcont>
            <span bold style="color: #000;">{{this.list.provinces}}</span>
            省份
          </dt>
        </dl>
        <dl flexcont4 class="bgfff" style="padding: 1vh 0;">
          <dt flexcont>
            <span bold style="color:#009933;">{{this.ylyData.MedCount || '-'}}</span>
            已受赠医院
          </dt>
          <dt flexcont>
            <span bold style="color:#49a9f0;">{{this.ylyData.DonorCount || '-'}}</span>
            捐赠人
          </dt>
          <dt flexcont>
            <span bold style="color: #4fa1a4;">{{((this.ylyData.SumAmount * 1) / 10000)| formatNum}}万</span>
            物资总金额
          </dt>
        </dl>


        <figure>
          <e-charts v-if="list"
                    ref="map"
                    :options="map"
                    :init-options="initOptions"
                    autoresize
          ></e-charts>
        </figure>
      </v-loadmore>

      <div class="bottom-box" flexcont>
        <!--<img src="../../assets/logo.png">-->
        <div class="pos-b" @click="showPic=true">捐赠<br>查询</div>
      </div>

      <div class="pick-bg" fixed-top v-if="showPic">
        <div flexcont2 flexcont class="imgs">
          <svg class="icon" aria-hidden="true" @click="showPic=false">
            <use xlink:href="#icon-guanbi"></use>
          </svg>

          <img src="../../assets/pic.png" alt="">
        </div>
      </div>

    </div>
</template>

<script>
  import buildMapData from '@/data/map'
  import { getNameByPinyin } from '@/data/zhen'
  import ECharts from '@/components/ECharts.vue'
  import {Loadmore} from 'mint-ui';

    export default {
      components: {
        ECharts,'v-loadmore':Loadmore
      },
      filters:{
        formatNum: function (val) {
          if(isNaN(val)) return '-';
          if (typeof (val) === 'number') {
            return (val).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,')
          } else {
            return '-'
          }
        }
      },
      data () {
        return {
          map: {},
          provinceName: '',
          initOptions: {
            renderer: 'canvas'
          },
          list:'',
          ylyData: {},
          allLoaded: false,
          scrollMode:"auto",
          showPic:false
        }
      },
      methods:{
        loadTop:function() {
          //下拉加载
          this.getData()
          this.$refs.loadmore.onTopLoaded();
        },
        async getData(){
          this.$store.state.loading=true;
          this.$store.state.loadingText='一大波数据来袭中...'
          let province = this.$route.path.substr(1)
          this.provinceName = getNameByPinyin(province)
          let mapList=await this.$api.home.getMapList({});
          this.list=mapList.data;
          const { map,} = buildMapData(this.provinceName,mapList.data.maps)
          this.map = map;
          
          if(process.env.NODE_ENV == 'production'){
            let ylyvisData = await this.$api.wx.getVisualData();
            this.ylyData = ylyvisData.Data;
          }
          
          this.$store.state.loading=false;
        }
      },
      async created () {
       this.getData();
      }
    }
</script>

<style scoped>
  .map{
    position:relative;mt:120px;bg:#efefef;h:100vh;
    dl{
      dt{flex-direction: column;justify-content: center;align-items: center;w:33%;fz:34px;c:#333;span{fz:42px;pb:10px;}
      }
    }
  .bottom-box{
    w:95%;m:0 auto;
    background: url("../../assets/logo.png");background-repeat: no-repeat;
    background-position: center;justify-content: flex-end;
    background-size: 40% 80%;
    mt:36px;b:1vh;t:auto;
  }
  }
  .pos-b{box-shadow:0px 3px 13px #333333;bdrs:50%;size:90px;bg:#ff6632;c:#fff;fz:26px;text-align: center;bd:2px solid #f0dcd6;display: flex;
    justify-content: center;
    align-items: center;}
  .imgs{img{size:100% 90%;}}
</style>
