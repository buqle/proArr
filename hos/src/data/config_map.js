export default function buildMapConfig (province, data) {

  return {
    title: {
      text: '需求医院数量',
      left:' 3%',
      bottom:0,
      show:true,
      textStyle: {
        color:'#666',
        fontSize: 12 ,
      }
    },
    tooltip:{
      show:true, //鼠标移入是否触发数据
      trigger: 'item', //出发方式
      formatter: function (value, index) {
        if(isNaN(value.value)){
          return `${value.name}:0家医院`
        }else {
          return `${value.name}:${value.value}家医院`
        }
      }
      //formatter:{b}：{c}家医院
    },
    visualMap: {
      show: true,
      type: 'piecewise',
      min: 0,
      max: 2000,
      align: 'right',
      top: province ? 0 : 'auto',
      right:province ? '3%' : 'auto',
      left:' 3%',
      bottom:'5%',
      hoverLink:true,
      inRange: {
        color: [
          '#f2ddd2',
          '#e9b090',
          '#DE8150',
          '#73240c'
        ]
      },
      pieces: [
        //{ min: 1000 },
        { min:31 },
        { min: 21, max: 30 },
        { min: 11, max: 20 },
        { min: 1, max: 10 }
      ],
      orient: province ? 'horizontal' : 'vertical',
      showLabel: true,
      itemWidth: 10,
      itemHeight: 10,
      textStyle: {
        fontSize: 10
      },
    },
    series: [{
      left: 'center',
      type: 'map',
      name: '确诊人数',
      label: {
        show: true,
        position: 'inside',
        fontSize: 6
      },
      mapType: province || 'china',
      itemStyle: {
        normal: {
          borderColor: '#666',

          areaColor: '#fff' ,
        }
      },
      nameMap:{

        selectedMode: 'single' ,
      },
      data,
      zoom: 1.2,
      roam: false,
      showLegendSymbol: false,

      emphasis: {

      },
      rippleEffect: {
        show: true,
        brushType: 'stroke',
        scale: 2.5,
        period: 4
      }
    }]
  }
}
