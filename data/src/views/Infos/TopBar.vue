<template>
    <div class="top-box" flexcont>
      <div class="left bet">
        <div class="boxbor lef-top" flexcont>
          <div class="period-box">
            <p>
              <svg class="icon" aria-hidden="true">
                <use xlink:href="#icon-Z"></use>
              </svg>
              当月入库数据
            </p>
            <dl flexcont>
              <Loading :dot-color-val="dotColor" :dot-nums="dotNums" :loading-radius-val="loadingRadius" :dot-radius-val="dotRadius" :style="changeStyle" v-show="loading"></Loading>
              <dd  v-for="(item,index) in wareHouseArr"  :key="index" >
                {{item.tit}}：<i>{{item.cont}}</i>
              </dd>
            </dl>
          </div>
          <div class="stock-box">
            <p>
              <svg class="icon" aria-hidden="true">
              <use xlink:href="#icon-tubiaozhizuomoban"></use>
            </svg>
              当月退货数据
            </p>
            <dl v-if="!backArr[0]&&!backArr[1]&&loading2" flexcont>
              <Loading :dot-color-val="dotColor" :dot-nums="dotNums" :loading-radius-val="loadingRadius" :dot-radius-val="dotRadius" :style="changeStyle" v-show="loading2"></Loading>
            </dl>
            <dl flexcont v-else>
              <dd>退库总单数：<i>{{backArr[0]}}单</i></dd>
              <dd style=" align-self: center;">退货总金额：<i>{{backArr[2].toFixed(2)}}元</i></dd>
              <dd>退库总品规数：<i>{{backArr[1]}}个</i></dd>
            </dl>
          </div>
          <div absolute class="npart-bga"></div>
        </div>
      </div>
      <div class="right">
        <div class="boxbor lef-top2">
          <p>
            <svg class="icon" aria-hidden="true">
              <use xlink:href="#icon-shujuji"></use>
            </svg>
            实时库存数据
          </p>
          <dl class="space-content">
            <Loading :dot-color-val="dotColor" :dot-nums="dotNums" :loading-radius-val="loadingRadius" :dot-radius-val="dotRadius" :style="changeStyle" v-if="loading3"></Loading>
            <dd  v-for="(item,index) in liveArr"  :key="index" v-else>
              <span>{{item.tit}}：<i>{{item.cont}}</i></span>
              <span>{{item.tit2}}：<i>{{item.money}}</i></span>
            </dd>
          </dl>
          <div absolute class="npart-bga"></div>
        </div>
      </div>

    </div>
</template>

<script>
  import Loading from '@/components/Loading';
    export default {
      components: {Loading},
        data(){
          return{
            wareHouseArr:[],
            backArr:[],
            amountDatas:[],
            sortDatas:[],
            liveArr:[],
            loadingRadius:110,
            dotRadius: 20,
            dotColor: '#ff3366',
            dotNums: 10,
            loading:true,
            loading2:true,
            loading3:true,
          }
        },
      computed: {
        changeStyle: function() {
          let rootEle = document.documentElement;
          rootEle.style.setProperty('--loadingRadius', `${this.loadingRadius}px`)
          rootEle.style.setProperty('--dotRadius', `${this.dotRadius}px`)
          rootEle.style.setProperty('--dotColor', this.dotColor)
        }
      },
      methods:{
        async getData1(){
          let getDatas= await this.$api.dataApi.inDataCount();
          if(getDatas.code==200){
            this.wareHouseArr=[
              {
                tit:'已入库总单数',
                cont:`${getDatas.data[0].data[0]}单`
              },
              {
                tit:'已入库总品规数',
                cont:`${getDatas.data[0].data[1]}个`
              },
              {
                tit:'已入库总金额',
                cont:`${getDatas.data[0].data[2]}元`
              },
              {
                tit:'待入库总单数',
                cont:`${getDatas.data[0].data[3]}单`
              }
            ]
            this.loading=false
          };
        },

        async getData2(){
          let getDatas2= await this.$api.dataApi.backDataCount();
          if(getDatas2.code==200){
            this.backArr=getDatas2.data[0].data;
            this.loading2=false
          };
        },

        async getData3(){
          let getDatas3= await this.$api.dataApi.storeDataCount();
          if(getDatas3.code==200){
            this.liveArr=[
              {
                tit:'全院品规数',
                cont:`${getDatas3.data[0].sortDatas[0].value}个`,
                money:`${getDatas3.data[0].amountDatas[0].value}元`,
                tit2:'全院库存金额'
              },
              {
                tit:'门诊药房品规数',
                cont:`${getDatas3.data[0].sortDatas[1].value}个`,
                money:`${getDatas3.data[0].amountDatas[1].value}元`,
                tit2:'门诊药房库存金额'
              },
              {
                tit:'住院药房品规数',
                cont:`${getDatas3.data[0].sortDatas[2].value}个`,
                money:`${getDatas3.data[0].amountDatas[2].value}元`,
                tit2:'住院药房库存金额'
              },
              {
                tit:'其他备药品规数',
                cont:`${getDatas3.data[0].sortDatas[3].value}个`,
                money:`${getDatas3.data[0].amountDatas[3].value}元`,
                tit2:'其他备药库存金额'
              },
            ];
            this.loading3=false
          };
        }

      },
      async created(){
        await this.getData1();
        await this.getData2();
        await this.getData3();
      }
    }
</script>

<style scoped>
  .top-box{
  .period-box{w:55%;}
  .stock-box{w:45%;}
  .period-box{.icon{size:30px;}}
  .left{
    w:57vw;

  }
  .right{w:37vw;}
  .lef-top,.lef-top2{size: 100%;}

  }
</style>
