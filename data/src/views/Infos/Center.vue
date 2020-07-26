<template>
  <div class="top-box" flexcont mt20>
    <div class="boxbor lef-top2 bet" >
      <p>
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-cs-kcyj-1"></use>
        </svg>
        库存近效期预警
      </p>

      <dl flexcont>
        <Loading :dot-color-val="dotColor" :dot-nums="dotNums" :loading-radius-val="loadingRadius" :dot-radius-val="dotRadius" :style="changeStyle" v-show="loading"></Loading>
        <dd  v-for="(item,index) in expiryArr"  :key="index" :class="{'self':index==1}" >
          <span>{{item.tit}}：<i>{{item.cont}}</i></span>
          <span>金额：<i>{{item.money}}</i></span>
        </dd>


      </dl>
      <div absolute class="npart-bga"></div>
    </div>
    <div class="boxbor lef-top2">
      <p>
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-cs-kcyj-1"></use>
        </svg>
        库存呆滞品预警
      </p>
      <dl class="space-content">
        <Loading :dot-color-val="dotColor" :dot-nums="dotNums" :loading-radius-val="loadingRadius" :dot-radius-val="dotRadius" :style="changeStyle" v-show="loading2"></Loading>
        <dd  v-for="(item,index) in dullArr"  :key="index">
          <span>{{item.tit}}：<i>{{item.cont}}</i></span>
          <span>金额：<i>{{item.money}}</i></span>
        </dd>
      </dl>
      <div absolute class="npart-bga"></div>
    </div>
    <div class="boxbor lef-top pic-box bet">
      <p>
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-yujing"></use>
        </svg>
        证照预警
      </p>
      <dl flexcont>
        <Loading :dot-color-val="dotColor" :dot-nums="dotNums" :loading-radius-val="loadingRadius" :dot-radius-val="dotRadius" :style="changeStyle" v-show="loading3"></Loading>
        <dd v-for="(item,index) in licArr"  :key="index">
          {{item.tit}}：<i>{{item.cont}}</i>
        </dd>
      </dl>
      <div absolute class="npart-bga"></div>
    </div>
  </div>
</template>

<script>
  import Loading from '@/components/Loading';
  export default {
    components: {Loading},
    computed: {
      changeStyle: function() {
        let rootEle = document.documentElement;
        rootEle.style.setProperty('--loadingRadius', `${this.loadingRadius}px`)
        rootEle.style.setProperty('--dotRadius', `${this.dotRadius}px`)
        rootEle.style.setProperty('--dotColor', this.dotColor)
      }
    },
    data(){
      return{
        expiryArr:[],
        dullArr:[],
        licArr:[],
        loadingRadius:110,
        dotRadius: 20,
        dotColor: '#ff3366',
        dotNums: 10,
        loading:true,
        loading2:true,
        loading3:true,
      }
    },
    async created(){
      let getDatas= await this.$api.dataApi.jxqDataCount();
      if(getDatas.code==200){
        this.expiryArr=[
          {
            tit:'临效期30天以下品规数',
            cont:`${getDatas.data[1].value[0]}个`,
            money:`${getDatas.data[0].value[0]}元`,
          },
          {
            tit:'临效期90天以下品规数',
            cont:`${getDatas.data[1].value[2]}个`,
            money:`${getDatas.data[0].value[2]}元`,
          }
          ,
          {
            tit:'临效期60天以下品规数',
            cont:`${getDatas.data[1].value[1]}个`,
            money:`${getDatas.data[0].value[1]}元`,
          }
        ];
        this.loading=false;
      };

      let getDatas2= await this.$api.dataApi.delayDataCount();
      if(getDatas2.code==200){
          this.dullArr=[
            {
              tit:'不动销库存180天以上品规数',
              cont:`${getDatas2.data[1].sortDatas[3]||0}个`,
              money:`${getDatas2.data[0].amountDatas[3]||0}元`,
            },
            {
              tit:'不动销库存90天以上品规数',
              cont:`${getDatas2.data[1].sortDatas[2]||0}个`,
              money:`${getDatas2.data[0].amountDatas[2]||0}元`,
            },
            {
              tit:'不动销库存60天以上品规数',
              cont:`${getDatas2.data[1].sortDatas[1]}个`,
              money:`${getDatas2.data[0].amountDatas[1]}元`,
            },
            {
              tit:'不动销库存30天以上品规数',
              cont:`${getDatas2.data[1].sortDatas[0]}个`,
              money:`${getDatas2.data[0].amountDatas[0]}元`,
            },
          ];
        this.loading2=false;
      };

      let getDatas3= await this.$api.dataApi.countDrugLic();
      if(getDatas3.code==200){
        this.licArr=[
          {
            tit:'已过期证照数量',
            cont:`${getDatas3.data[0].data[0]||0}个`,
          },
          {
            tit:'涉及品规数',
            cont:`${getDatas3.data[0].data[1]}个`,
          },
          {
            tit:'临效期30天证照数量',
            cont:`${getDatas3.data[0].data[2]}个`,
          },
          {
            tit:'涉及品规数',
            cont:`${getDatas3.data[0].data[3]}个`,
          },
        ];
        this.loading3=false;
      };

    }
  }
</script>

<style scoped>
  .top-box{
  .icon{size:18px;mr:4px;}
  .space-content{
    flex-direction: column;
    justify-content: center;
  }
  }
  .self{align-self: center}
</style>
