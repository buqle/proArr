<template>
  <div class="left-warp">
    <div class="left-box boxbor" mt20>
      <p>药品库存情况汇总表</p>
      <Loading :dot-color-val="dotColor" :dot-nums="dotNums" :loading-radius-val="loadingRadius" :dot-radius-val="dotRadius" :style="changeStyle" v-show="loading"></Loading>
      <div id="myChart" absolute></div>
      <div absolute class="npart-bga"></div>
    </div>
    <div class="left-box boxbor" mt20>
      <p>每周药品库存金额变化趋势图<span style="font-size:.5vw ">(单位：万元)</span></p>
      <Loading :dot-color-val="dotColor" :dot-nums="dotNums" :loading-radius-val="loadingRadius" :dot-radius-val="dotRadius" :style="changeStyle" v-show="loading2"></Loading>
      <div id="line" absolute></div>
      <div absolute class="npart-bga"></div>
    </div>
    <div class="left-box boxbor" mt20>
      <p>每周药品库存品类变化趋势图<span style="font-size:.5vw ">(单位：种)</span></p>

      <Loading :dot-color-val="dotColor" :dot-nums="dotNums" :loading-radius-val="loadingRadius" :dot-radius-val="dotRadius" :style="changeStyle" v-show="loading3"></Loading>
      <div id="line2" absolute></div>
      <div absolute class="npart-bga"></div>
    </div>
  </div>
</template>

<script>
  import Loading from '@/components/Loading';
  export default {
    components: {Loading},
    data () {
      return{
        size:`${0.6}vw`,
        samilsize:`${0.4}vw`,
        titSize:`${1}vw`,
        setPie:{
          countData:[

          ],
          priceData:[

          ]
        },
        loadingRadius:110,
        dotRadius: 20,
        dotColor: '#ff3366',
        dotNums: 10,
        loading:false,
        loading2:false,
        loading3:false,
      }
    },
    mounted(){
      this.drawPie();
      this.drawLine();
      this.drawLine2();
      window.addEventListener('resize',()=>{
        this.$echarts.init(document.getElementById('myChart')).resize();
        this.$echarts.init(document.getElementById('line')).resize();
        this.$echarts.init(document.getElementById('line2')).resize()
      })
      //window.addEventListener("resize", this.chart.resize);
    },
    created(){
      //this.getPie()
     /* setInterval(()=>{
        this.getPie()
      },3000)*/
    },
    computed: {
      changeStyle: function() {
        let rootEle = document.documentElement;
        rootEle.style.setProperty('--loadingRadius', `${this.loadingRadius}px`)
        rootEle.style.setProperty('--dotRadius', `${this.dotRadius}px`)
        rootEle.style.setProperty('--dotColor', this.dotColor)
      }
    },
    methods: {
      async drawPie(){
        // 基于准备好的dom，初始化echarts实例
        let myChart = this.$echarts.init(document.getElementById('myChart'))
        myChart.setOption({
          color: ['#196e7e', '#569e4f','#92a738'],
          tooltip: {
            show:false
          },
          title:{
            show:false
          }
        });
        this.loading=true
        // 绘制图表
        let pie= await this.$api.base.totalDrugSumInfo({type:2});
        if(pie.code==200){
          this.setPie.countData = pie.data[0].countData.map(item => ({
            value:item.value, name:item.name
          }));
          this.setPie.priceData = pie.data[0].priceData.map(item => ({
            value:item.value, name:item.name
          }));

        }
        this.loading=false
        myChart.setOption({
          series: [
            {
              type:'pie',

              selectedMode: 'single',
              hoverAnimation:false,
              radius: [0, '40%'],
              label: {
                normal: {
                  position: 'inner',
                  fontSize: this.size,
                  formatter(v) {
                    let text = v.name
                    return text.length < 2
                      ? text
                      : `${text.slice(0,2)}\n${text.slice(2)}`
                  }
                }
              },
              labelLine: {
                normal: {
                  show: false
                }
              },
              data:this.setPie.priceData
            },
            {
              type:'pie',
              radius: [50, '50%'],
              label: {
                normal: {
                  align:'left',
                  verticalAlign:'top',
                  fontSize:this.samilsize,
                  formatter: '{b}' + '\n\r' + '{c}' + '\n\r' + '({d}%)',
                }
              },
              labelLine: {
                normal: {
                  length:5,
                  length2:10
                },
              },
              data:this.setPie.countData
            }
          ]
        });
      },

     async drawLine(){
        let myLine = this.$echarts.init(document.getElementById('line'))
        // 绘制图表
       this.loading2=true
        let line= await this.$api.base.totalDrugStore({type:1});
        if(line.code==200){
          this.loading2=false
          myLine.setOption({
            color: ['#196e7e', '#92a738','#f87003'],
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
              itemWidth:10,
              left:'center',
              top:'17%',
              itemGap:4,
              textStyle:{
                fontSize:13,
                padding:0,
              },
              data:[{
                name:'库存总金额',
                icon: 'circle',
                textStyle:{
                  color:'#21bccd'
                }
              },{
                name:'近效期金额',
                icon: 'circle',
                textStyle:{
                  color:'#cdaf21'
                }
              }],

            },
            xAxis: [
              {
                type: 'category',
                data:line.data[0].data,
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
                  formatter: function (value, index) {
                    // 格式化成月/日，只在第一个刻度显示年份
                    var date = new Date(value);
                    var texts = [(date.getMonth() + 1), date.getDate()];
                    return texts.join('.');
                  }
                },
              }
            ],
            yAxis: [
              {
                splitLine:{
                  show:false
                },
                axisLabel:{
                  color:'#c2e2f7',
                  fontSize:10,
                  align:'center',
                  padding:[0, 14, 0, 0]
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
                name:'库存总金额',
                type:'bar',
                data:line.data[0].series[0].data
              },
              {
                name:'近效期金额',
                type:'bar',
                data:line.data[0].series[1].data
              },
              {
                name:'库存总金额s',
                type:'line',
                symbol:'none',//不显示圆点
                data:line.data[0].series[0].data
              },
            ]
          });
        }

      },

      async drawLine2(){
        let myLine = this.$echarts.init(document.getElementById('line2'))

        this.loading3=true;
        let line= await this.$api.base.totalDrugStore({type:2});
        // 绘制图表
        if(line.code==200){
          this.loading3=false
          myLine.setOption({
            color: ['#196e7e', '#92a738','#f87003'],
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
            title:{show:false },
            legend: {
              //data:['库存总金额','在途金额','近效期金额'],
              padding:0,
              itemWidth:12,
              left:'center',
              top:'16%',
              itemGap:4,
              textStyle:{
                fontSize:12,
              },
              data:[{
                name:'库存品规数',
                icon: 'circle',
                textStyle:{
                  color:'#21bccd',
                }
              },{
                name:'在途品规数',
                icon: 'circle',
                textStyle:{
                  color:'#cdaf21'
                }
              }],

              //top:14+'vw'
            },
            xAxis: [
              {
                type: 'category',
                data:line.data[0].data,
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
                  formatter: function (value, index) {
                    // 格式化成月/日，只在第一个刻度显示年份
                    var date = new Date(value);
                    var texts = [(date.getMonth() + 1), date.getDate()];
                    return texts.join('.');
                  }
                },
              }
            ],
            yAxis: [
              {
                type: 'value',
                splitLine:{
                  show:false
                },
                splitNumber: 4,
                axisLabel:{
                  color:'#c2e2f7',
                  fontSize: 10,
                  align:'center',
                  padding:[0, 14, 0, 0]
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
                name:'库存品规数',
                type:'bar',
                data:line.data[0].series[0].data
              },
              {
                name:'在途品规数',
                type:'bar',
                data:line.data[0].series[2].data
              },
              {
                name:'库存品规数s',
                type:'line',
                symbol:'none',//不显示圆点
                data:line.data[0].series[0].data
              },
            ]
          });
        }


      }

    }
  }
</script>

<style scoped>
  #myChart{size:300px 25vh;l:0;t:4vh;}
  #line,#line2{w:95%;h:29vh;t:0vh;l:auto;r:0;}
  .left-warp{
    w:300px;
  .left-box{
    h:26vh;


  }

  }
</style>
