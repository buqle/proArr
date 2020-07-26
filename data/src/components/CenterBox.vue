<template>
  <div class="center-warp">
    <div mt20 flexcont class="raduis-warp">
      <div class="boxbor raduis-box" flexcont>
        <p>本周药品总消耗</p>
        <dl>
          <dt><i>{{totalDrug.sales}}</i>&nbsp;万元</dt>
          <dd>{{totalDrug.ctmmTradeName}}</dd>
        </dl>
        <div absolute class="npart-bga"></div>
      </div>
      <div class="boxbor raduis-box2">
        <p>本周消耗排名前十位药品</p>
        <p>单位<i>（万元）</i></p>
        <div flexcont class="raduis-box-many" auto v-if="pieArr.length>0">
          <div  class="raduis" relative v-for="(item,index) in pieArr"  :key="index" flexcont>

            <dl absolute flexcont>
              <dd>{{item.sales}}</dd>
            </dl>
            <create-pie radius="40" :progress="item.sales/totalDrug.sales*100" stroke="4" ></create-pie>
            <div absolute style="bottom: 0;" v-if="item.ctmmGenericName.length>=8">{{item.ctmmGenericName|readMore(8,'')}}</div>
            <div absolute style="bottom: 0;" v-else>{{item.ctmmGenericName}}</div>
          </div>
        </div>

        <div flexcont class="raduis-box-many" auto v-else>

          <h4 style="text-align: center;width: 100%;font-size: 2.5vw;color: #95d3e1;font-weight: 500;">暂无本周药品消耗相关数据</h4>

        </div>


        <div absolute class="npart-bga"></div>
      </div>
      <div class="boxbor boxbors" height40>
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
    </div>

    <div class="line-warp" mt20 flexcont>
      <div class="boxbor line-box">
        <p>药品消耗额趋势</p>
        <Loading :dot-color-val="dotColor" :dot-nums="dotNums" :loading-radius-val="loadingRadius" :dot-radius-val="dotRadius" :style="changeStyle" v-show="loading"></Loading>
        <div class="name-tit">单位：元</div>
        <div id="drawLine" absolute>
        </div>
        <div absolute class="npart-bga"></div>
      </div>
      <div class="boxbor boxbors" style="height: 40.5vh" id="boxbors">
        <p>供应商资质证照预警</p>
        <dl>
          <dt flexcont>
            <span>证照名称</span>
            <span>资质到期天数</span>
          </dt>
          <dd flexcont v-for="(item,index) in ficationsList"  :key="index" :class="{'bg-on':index%2===0}" >
          <span style="flex:1.5;text-align: left;" v-if="item.enterpriseName.length>=12">
            {{item.enterpriseName|readMore(12,'...')}}
          </span>
          <span v-else>
            {{item.enterpriseName}}
          </span>
            <span>
            {{item.expriceDay}}
          </span>
          </dd>
        </dl>
        <div absolute class="npart-bga"></div>
      </div>
      <!--<div class="line-warp-right">
        <div class="boxbor line-box2">
          <p>本月院外取药</p>
          <dl flexcont class="dl-person">
            <dt>
              <img src="@/assets/person.png">
              <img src="@/assets/person.png">
              <img src="@/assets/person.png">
              <img src="@/assets/person.png">
              <img src="@/assets/person.png" style="margin-right: 0;">
            </dt>
            <dd>
              <i>1000</i>人次
            </dd>
          </dl>
          <dl flexcont class="dl-person dl-drug">
            <dt>
              <img src="@/assets/drug.png">
              <img src="@/assets/drug.png">
              <img src="@/assets/drug.png">
              <img src="@/assets/drug.png">
            </dt>
            <dd>
              <i>1000</i>万元
            </dd>
          </dl>
          <div absolute class="npart-bga"></div>
        </div>

        <div class="boxbor line-box3">
          <p>本月院外药品消耗前五名</p>
          <div id="drawBar" absolute></div>
          <div absolute class="npart-bga"></div>
        </div>
      </div>-->

    </div>

  </div>
</template>

<script>
  import CreatePie from '@/components/CreatePie';
  import Loading from '@/components/Loading';

    export default {
      components: {CreatePie,Loading},
      computed: {
        changeStyle: function() {
          let rootEle = document.documentElement;
          rootEle.style.setProperty('--loadingRadius', `${this.loadingRadius}px`)
          rootEle.style.setProperty('--dotRadius', `${this.dotRadius}px`)
          rootEle.style.setProperty('--dotColor', this.dotColor)
        }
      },
      data(){
        return {
          progress:5.4/7.5*100,//消耗/总消耗，
          total:47,
          pieArr:[ ],
          totalDrug:{
            ctmmTradeName:'',
            sales:''
          },
          drugInfo:{

          },
          loadingRadius:100,
          dotRadius:16,
          dotColor: '#ff3366',
          dotNums: 10,
          loading:false,
          loading2:false,
          loading3:false,
          saleList:[],
          ficationsList:[]
        }
      },
      async created(){
        let total= await this.$api.base.totalDrugSales();
            if(total.code==200){
              this.totalDrug.ctmmTradeName=total.data.ctmmTradeName;
              this.totalDrug.sales=total.data.sales
            };
        let progress= await this.$api.base.drugSalesTop10();
        if(progress.code==200){
          this.pieArr=progress.data;
          this.drugInfo.ctmmTradeName=''

        };
        let getSaleList= await this.$api.base.drugSalesTop10Than({
          pageNo: 1,
          pageSize: 10
        });
        if(getSaleList.code==200){
          this.saleList=getSaleList.data;
        }
        let getficationsListt= await this.$api.base.licExpriceInfo({
          pageNo: 1,
          pageSize: 10
        });
        if(getficationsListt.code==200){
          this.ficationsList=getficationsListt.data.list
        }
      },
      methods:{

          async drawLine(){
            let myChart = this.$echarts.init(document.getElementById('drawLine'));

            this.loading=true
            let line= await this.$api.base.findDrugSales({queryType:1});
            this.loading=false;
            if(line.code==200){
              myChart.setOption({
                color:['#21bccd'],
                xAxis: {
                  type: 'category',
                  boundaryGap: ['20%', '20%'],
                  boundaryGap: false,
                  data:line.data[0].time,

                  axisTick:{
                    show:false
                  },
                  axisLabel:{
                    color:'#c2e2f7',
                    fontSize:10,
                    formatter: function (value, index) {
                      // 格式化成月/日，只在第一个刻度显示年份
                      var date = new Date(value);
                      var texts = [(date.getMonth() + 1), date.getDate()];
                      return texts.join('-');
                    }
                  },
                  axisLine:{
                    lineStyle:{
                      color:'#4fa1a4'
                    }
                  },
                },
                yAxis: {
                  type: 'value',
                  axisTick:{
                    show:false
                  },

                  splitLine:{
                    show:false
                  },
                  axisLabel:{
                    color:'#c2e2f7',
                    fontSize:10,
                    align:'center',
                    padding:[0,24, 0,0]
                  },
                  axisLine:{
                    lineStyle:{
                      color:'#4fa1a4'
                    }
                  },
                },
                series: [{
                  data: line.data[0].data,
                  type: 'line',
                  symbol:'none',//不显示圆点
                  name:'单位:件',
                  areaStyle: {
                    color:{
                      type: 'linear',
                      x: 0,
                      y: 0,
                      x2: 0,
                      y2: 1,
                      colorStops: [{
                        offset: 0, color: '#144353' ,// 0% 处的颜色
                      }, {
                        offset: 1, color: '#1e9bac' // 100% 处的颜色
                      }],
                      global: false // 缺省为 false
                    }
                  }
                }]
              });
            }

          },
          drawBar(){
            let myChart = this.$echarts.init(document.getElementById('drawBar'));
            myChart.setOption({
              tooltip : {
                trigger: 'axis',
                axisPointer : {            // 坐标轴指示器，坐标轴触发有效
                  type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
                }
              },

              xAxis : [
                {
                  type : 'category',
                  data : ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'],
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

                  },
                }
              ],
              yAxis : [
                {
                  type : 'value',
                  min: 0,
                  max: 60,
                  interval: 30,
                  splitLine:{
                    show:false
                  },
                  axisTick:{
                    show:false
                  },
                  axisLabel:{
                    color:'#c2e2f7',
                    fontSize:10,
                    align:'center',
                    padding:[0,10, 0,0]
                  },
                  axisLine:{
                    lineStyle:{
                      color:'#4fa1a4'
                    }
                  },
                }
              ],
              series : [
                {
                  name:'直接访问',
                  type:'bar',
                  barWidth: '50%',
                  data:[10, 52, 50,30,40],
                  itemStyle: {
                    normal: {
                      label: {
                        show: true,
                        position: 'top',
                        textStyle: {
                          color: '#fff',
                          fontSize:10,
                        }
                      },
                      color: new this.$echarts.graphic.LinearGradient(
                        0, 0, 0, 1,
                        [
                          {offset: 0, color: '#20b5c6'},
                          {offset: 0.5, color: '#1c8595'},
                          {offset: 1, color: '#143b4a'}
                        ]
                      )
                    },
                  }
                }
              ]
            })
          },
        },
        mounted(){
         // this.drawPie();
          this.progress;
          this.drawLine();
          this.drawBar();
          window.addEventListener('resize',()=>{
            this.$echarts.init(document.getElementById('drawLine')).resize();
            this.$echarts.init(document.getElementById('drawBar')).resize();

          })
        }
    }
</script>

<style scoped>


  .center-warp{
    w:965px;
  #drawPies{
    size:100% 40vh;t:0;l:0;
  }

    .raduis-warp,.line-warp{justify-content: space-between;}
    .raduis-box,.raduis-box2{h:40vh;}
    .raduis-box{
      w:128px; flex-wrap: wrap;

      dl{
        text-align: center;w:90%;m:0 auto;c:#c2e2f7;
        dt{i{fz:25px;font-weight: 500;}fz:14px;bdb:2px solid #1a7080;pb:6px;}
        dd{fz:15px;lh:34px;}
      }
    }
    .raduis-box2{w:580px;    display: flex;
      flex-direction: column;}
    .line-box{
      w:450px;h:40.5vh;
      #drawLine{size:100% 40vh;ml:14px;t:3.5vh;}
    }

    .line-warp-right{
      dl{align-items: center;justify-content: space-around;}
      w:311px;h:40.5vh;
      .line-box2,.line-box3{h:19vh;}
      .line-box2{
        mb:2.5vh;
        .dl-person{
          bdb:1px solid #1b7385;w:95%;m:0 auto;p:.7vh 20px .5vh 20px;
          dt{
            img{size: 24px 32px;mr:6px;}w:164px;
          }
          dd{fz:12px;c:#c2e2f7;i{fz:20px;}}
        }
        .dl-person.dl-drug{
          bdb:none;
          dt{
          img{size: 33px 32px;mr:0px;}
          }
          }
      }
      #drawBar{
        size:297px 22vh;l:0;t:0vh;
      }
    }
    .raduis-box-many{flex-wrap: wrap;justify-content: space-around;w:100%;m:0 auto;align-content: center;}
  .raduis{
    size:114px 14vh;c:#c2e2f7;fz:.8vw;i{fz:10px;}align-items: center;align-content: center;    justify-content: center;
    dl{
      flex-direction: column;fz:14px;
      align-items: center;
      justify-content: center;
      dt{bdb:1px solid #1a7666;p:0 4px;}
    }
  }
  .boxbors dl{
    w:220px;m:0 auto;
  dt,dd{
    text-align: center;align-items: center;
  span{c:#bad9ee;fz:12px;i{fz:10px;}flex:1;}
  }
  dd{h:3.3vh;}
  dd.bg-on{background-image: linear-gradient(to right, #132a35 0%, #152a36 100%);}
  }
  #boxbors{
    w:490px;
    dl{
      width: 470px;
      dt span,dd span{display: inline-block;w:50%;fz:14px;}
    }
  }
  }
</style>
