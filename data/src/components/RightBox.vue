<template>
  <div class="right-warp">
    <div class="boxbor" mt20 height40>
      <p>本周消耗变化排名前十位药品</p>
      <dl>
        <dt flexcont>
          <span style="flex:1.5">药品</span>
          <span>消耗<i>万元</i></span>
          <span>变化率</span>
        </dt>
        <dd flexcont v-for="(item,index) in saleList"  :key="index" :class="{'bg-on':index%2===0}" >
          <span style="text-align: left;flex:1.5;">
             {{item.ctmmGenericName|readMore(6,'...')}}
          </span>
          <span>
            {{item.sales}}
          </span>
          <span>
            {{item.changeThan}}
          </span>
        </dd>
      </dl>
      <div absolute class="npart-bga"></div>
    </div>
    <div class="boxbor" mt20 style="height: 40.5vh">
      <p>供应商资质证照预警</p>
      <dl>
        <dt flexcont>
          <span style="flex:1.5">证照名称</span>
          <span>资质到期天数</span>
        </dt>
        <dd flexcont flexcont v-for="(item,index) in ficationsList"  :key="index" :class="{'bg-on':index%2===0}" >
          <span style="flex:1.5;text-align: left;">
            {{item.enterpriseName|readMore(8,'...')}}
          </span>
          <span>
            {{item.expriceDay}}
          </span>
        </dd>
      </dl>
      <div absolute class="npart-bga"></div>
    </div>
  </div>
</template>

<script>
    export default {
        data(){
          return{
            saleList:[],
            ficationsList:[]
          }
        },
        async created(){
          let getSaleList= await this.$api.base.drugSalesTop10Than({
            pageNo: 1,
            pageSize: 10
          });
            if(getSaleList.code==200){
              this.saleList=getSaleList.data
            }
          let getficationsListt= await this.$api.base.licExpriceInfo({
            pageNo: 1,
            pageSize: 10
          });
          if(getficationsListt.code==200){
            this.ficationsList=getficationsListt.data.list
          }
        }
    }
</script>

<style scoped>
  .right-warp{
    w:245px;
    dl{
      w:220px;m:0 auto;
      dt,dd{
        text-align: center;align-items: center;
        span{c:#bad9ee;fz:12px;i{fz:10px;}flex:1;}
      }
      dd{h:3.3vh;}
      dd.bg-on{background-image: linear-gradient(to right, #132a35 0%, #152a36 100%);}
    }
  }
</style>
