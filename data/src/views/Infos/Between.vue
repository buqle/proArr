<template>
  <div class="top-box" flexcont>
    <div class="left">
      <div class="boxbor lef-top" mt20 flexcont>
        <div class="period-box">
          <p>
            <svg class="icon" aria-hidden="true">
              <use xlink:href="#icon-yuanliaoxiaohao"></use>
            </svg>
            当月医院消耗数据
          </p>
          <dl class="space-content">
            <Loading :dot-color-val="dotColor" :dot-nums="dotNums" :loading-radius-val="loadingRadius" :dot-radius-val="dotRadius" :style="changeStyle" v-show="loading"></Loading>
            <dd   v-for="(item,index) in useArr"  :key="index">
              <span>{{item.tit}}：<i>{{item.cont}}</i></span>
              <span>{{item.tit2}}：<i>{{item.money}}</i></span>
            </dd>
          </dl>
        </div>
        <div class="stock-box bet">
          <p>
            <svg class="icon" aria-hidden="true">
              <use xlink:href="#icon-huiyifeijiesuan"></use>
            </svg>
            当月医院结算数据
          </p>
          <!--<dl v-if="!backArr[0]&&!backArr[1]&&loading2" flexcont>
            <Loading :dot-color-val="dotColor" :dot-nums="dotNums" :loading-radius-val="loadingRadius" :dot-radius-val="dotRadius" :style="changeStyle" v-show="loading2"></Loading>
          </dl>
          <dl flexcont v-else>
            <dd>当月已生成结算单金额：<i>&lt;!&ndash;{{backArr[0]}}&ndash;&gt;1810491.65
              元</i></dd>
            <dd style="align-self: center">历史未结算金额：<i>&lt;!&ndash;{{backArr[1]}}&ndash;&gt;347063.62
              元</i></dd>
            <dd>历史未结算品规数：<i>&lt;!&ndash;{{backArr[2]}}&ndash;&gt;400单</i></dd>
          </dl>-->
          <dl v-if="loading2" flexcont>
          <Loading :dot-color-val="dotColor" :dot-nums="dotNums" :loading-radius-val="loadingRadius" :dot-radius-val="dotRadius" :style="changeStyle" v-show="loading2"></Loading>
          </dl>
          <dl flexcont v-else>
            <dd>当月已生成结算单金额：<i><!--{{backArr[0]}}-->1810491.65
              元</i></dd>
            <dd style="align-self: center">历史未结算金额：<i><!--{{backArr[1]}}-->347063.62
              元</i></dd>
            <dd>历史未结算品规数：<i><!--{{backArr[2]}}-->400单</i></dd>
          </dl>
        </div>
        <div absolute class="npart-bga"></div>
      </div>
      <div class="boxbor lef-top2" mt20>
        <p>
          <svg class="icon" aria-hidden="true">
            <use xlink:href="#icon-shuju"></use>
          </svg>
          近一年业务数据趋势图
        </p>
        <Loading :dot-color-val="dotColor" :dot-nums="dotNums" :loading-radius-val="loadingRadius" :dot-radius-val="dotRadius" :style="changeStyle" v-show="loading3"></Loading>
        <div id="line" absolute></div>
        <div absolute class="npart-bga"></div>
      </div>
    </div>
    <div class="right">
      <div class="boxbor lef-top3" mt20>
        <p>
          <svg class="icon" aria-hidden="true">
            <use xlink:href="#icon-yuanliaoxiaohao"></use>
          </svg>
          当月消耗金额TOP20
        </p>
        <dl>
          <dd flexcont>
            <span style="width: 10%;text-align: center;">序号</span>
            <span style="width: 35%">品名</span>
            <span style="width: 35%">规格</span>
            <span style="width: 20%">金额</span>
          </dd>
         <div style="height: 23vh" v-if="loading4">
           <Loading :dot-color-val="dotColor" :dot-nums="dotNums" :loading-radius-val="loadingRadius" :dot-radius-val="dotRadius" :style="changeStyle" ></Loading>
         </div>
          <vue-seamless-scroll :data="drugArr" :class-option="classOption" class="table-content" v-else>
            <dd flexcont v-for="(item,index) in drugArr"  class="rowup" :class="{'bg-on':index%2===0}" :key="index">
            <span style="width: 10%;color: #fff;text-align: center;" relative>
              {{index+1}}
              <svg class="icon" aria-hidden="true" absolute v-if="index+1<=3">
                <use xlink:href="#icon-wangguan"></use>
              </svg>
            </span>
              <span style="width: 35%" v-if="item.ctmmGenericName.length>=12">{{item.ctmmGenericName|readMore(12,'')}}</span>
              <span style="width: 35%" v-else>{{item.ctmmGenericName}}</span>
              <span style="width: 35%" v-if="item.ctmmSpecification.length>=10">{{item.ctmmSpecification|readMore(10,'')}}</span>
              <span style="width: 35%" v-else>{{item.ctmmSpecification}}</span>
              <span style="width: 20%">{{item.sales.toFixed(2)}}</span>
            </dd>
          </vue-seamless-scroll>

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
        loadingRadius:110,
        dotRadius: 20,
        dotColor: '#ff3366',
        dotNums: 10,
        useArr:[],
        drugArr:[],
        expiryArr:[],
        backArr:[],
        loading:true,
        loading2:true,
        loading3:true,
        loading4:true,
      }
    },
    async created(){
      let getDatas3= await this.$api.dataApi.useDataCount();
      this.loading2=false
      if(getDatas3.code==200){
        let money=getDatas3.data[0].value;
        let count=getDatas3.data[1].sortDatas;
        this.useArr=[
          {
            tit:'总品规数',
            cont:`${count[0].value}个`,
            money:`${money[0].value.toFixed(2)}元`,
            tit2:'总消耗金额'
          },
          {
            tit:'住院医嘱数量',
            cont:`${count[2].value}个`,
            money:`${money[2].value.toFixed(2)}元`,
            tit2:'金额'
          },
          {
            tit:'门诊处方数量',
            cont:`${count[1].value}个`,
            money:`${money[1].value.toFixed(2)}元`,
            tit2:'金额'
          },
          {
            tit:'其他消耗数量',
            cont:`${count[3].value}个`,
            money:`${(money[0].value-money[2].value-money[1].value).toFixed(2)}元`,
            tit2:'金额'
          },
        ];
        this.loading=false
      };
      //结算
     /* let getDatas2= await this.$api.dataApi.settleDataCount();
      if(getDatas2.code==200){
        this.backArr=getDatas2.data[0].data;
        this.loading2=false
      };*/
      let getDatas4= await this.$api.dataApi.drugSalesTop20();
      if(getDatas4.code==200){
        this.drugArr=getDatas4.data;
        this.loading4=false;
      }
    },
    computed: {
      changeStyle: function() {
        let rootEle = document.documentElement;
        rootEle.style.setProperty('--loadingRadius', `${this.loadingRadius}px`)
        rootEle.style.setProperty('--dotRadius', `${this.dotRadius}px`)
        rootEle.style.setProperty('--dotColor', this.dotColor)
      },
      classOption () {
        return {
          singleHeight:`${3.6}vh`,
          waitTime: 2000,
          step: 0.5,
          hoverStop: false
        }
      }
    },
    mounted(){
      this.drawLine();
      window.addEventListener('resize',()=>{
        this.$echarts.init(document.getElementById('line')).resize();
      })
    },
    methods:{
      async drawLine(){
        let myLine = this.$echarts.init(document.getElementById('line'))
        let line= await this.$api.dataApi.yearDataCount();
        // 绘制图表
        if(line.code==200){
          myLine.setOption({
            color: ['#5182bb', '#be5150','#9cba5f','#8066a0'],
            tooltip: {
              trigger: 'axis',
              axisPointer: {
                type: 'cross',
                crossStyle: {
                  color: '#999'
                }
              },
              position: ['50%', '50%']
            },
            title:{
              show:false
            },
            legend: {
              //data:['库存总金额','在途金额','近效期金额'],
              padding:0,
              left:'center',
              top:'17%',
              itemGap:4,
              textStyle:{
                fontSize:13,
                padding:0,
              },
              data:[{
                name:'入库金额',
                textStyle:{
                  color:'#21bccd'
                }
              },{
                name:'退货金额',
                //icon: 'circle',
                textStyle:{
                  color:'#be5150'
                }
              },{
                name:'消耗金额',
                textStyle:{
                  color:'#9cba5f'
                }
              },{
                name:'结算金额',
                textStyle:{
                  color:'#8066a0'
                }
              }],

            },
            xAxis: [
              {
                type: 'category',
                data:line.data[0].dateDatas,
                axisPointer: {
                  type: 'shadow'
                },
                axisLine:{
                  lineStyle:{
                    color:'#4fa1a4'
                  }
                },
                axisTick:{
                  show:false
                },
                axisLabel:{
                  color:'#c2e2f7',
                  fontSize:10,
                },
              }
            ],
            yAxis: [
              {
                splitLine:{
                  show:true
                },
                axisLabel:{
                  color:'#c2e2f7',
                  fontSize:10,
                  align:'right',
                  padding:[0, 0, 0, 0]
                },
                axisLine:{

                  lineStyle:{
                    color:'#4fa1a4'
                  }
                },
                axisTick:{
                  show:false
                }
              },

            ],
            series: [
              {
                name:'入库金额',
                type:'bar',
                data:line.data[0].series[0].value
              },
              {
                name:'退货金额',
                type:'bar',
                data:line.data[0].series[1].value
              },
              {
                name:'消耗金额',
                type:'bar',
                data:line.data[0].series[2].value
              },
              {
                name:'结算金额',
                type:'bar',
                data:line.data[0].series[3].value
              },
            ]
          });
          this.loading3=false
        }


      },
    }
  }
</script>

<style scoped>
  .top-box{
    align-items: center;
  .lef-top{size: 100% auto;}
  .icon{size:22px;mr:4px;}
  .lef-top2{size:100% 26vh;}
  #line{size:100% 30vh;t:0vh;l:auto;r:0;}
  .lef-top3{
    size:100% 45.7vh;
    dl{w:100%;h:40vh;}
    .table-content{h:36vh;overflow: hidden;}
    dd{text-align: left;.icon{r:10px;t:-2px;size:16px;}h:3.6vh;}
    dd.bg-on{background-image: linear-gradient(to right, #3e688c 0%, #152a36 100%);}
  }
  .period-box{

  dl{display: flex;
    flex-direction: column;
    justify-content: center;}
  }
  }

</style>
