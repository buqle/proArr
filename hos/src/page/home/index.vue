/**
 * @author BQL
 * @date 2020/2/4
 * @Description: 需求汇总首页
*/
<template>
    <div class="home-warp" >
      <div class="top-bar" :class="{'no-top':unTop}">
        <div  width-most  flexcont4 style="height: 100%">
          <p flexcont flexcont3>
            <span @click="onShow=true">{{myAddressProvince}} {{search.city}} </span>
            <svg class="icon" aria-hidden="true">
              <use xlink:href="#icon-jiantou9"></use>
            </svg>
          </p>
          <div class="search-bar" flexcont>
            <svg class="icon" aria-hidden="true" v-show="!search.info">
              <use xlink:href="#icon-sousuo"></use>
            </svg>
            <form action="javascript:return true;"  @submit.prevent class="search-form" >
              <input
                ref="searchInput"
                v-model="search.info"
                type="search"
                placeholder="搜索医院名称或需求物资名称"
                @keyup.13="changeNavigation"
              >
            </form>
            <svg class="icon icon-close" aria-hidden="true" @click="search.info=''">
              <use xlink:href="#icon-guanbi1"></use>
            </svg>
          </div>
        </div>

      </div>
      <div class="pick-bg" v-show="onShow"  flexcont style="align-items: flex-end;">
        <div style="width: 100%">
          <div class="picker-button" flexcont flexcont4>
            <span @click="onShow=false">取消</span>
            <p>选择地区</p>
            <span  @click="okCity">确定</span>
          </div>
          <mt-picker :slots="myAddressSlots" @change="onMyAddressChange"  value-key="province"></mt-picker>
        </div>
      </div>
      <div style="height: 30vw;" v-if="topShow" class="bgfff"></div>
      <div  v-infinite-scroll="loadMore"
            infinite-scroll-disabled="isMoreLoading"
            :infinite-scroll-immediate-check="true"
            infinite-scroll-distance="10"
        class="loadMore" style="padding-top: 25vw;" :class="{'zindexClass':onShow,'bgfff':list.length==0}">
        <div class="card-group bgfff"  v-for="(item,index) in list" :key="index">
          <div class="card-top-wrap">
            <div class="card-top1" bold>
              {{item.medname}}
            </div>

            <div class="card-top2" flexcont4>
              <span flexcont4>
                发布于 {{item.pubtime|Upper}}
                <i style="color:red;font-size: 3.3vw;">（有效）</i>
              </span>
              <p class="click-button bgfff" @click="showPic(item)" bold>查看盖章原文件</p>
              <!--<p>
                物资紧急度：
                <svg class="icon" aria-hidden="true">
                  <use xlink:href="#icon-huohua-"></use>
                </svg>
                <svg class="icon" aria-hidden="true">
                  <use xlink:href="#icon-huohua-"></use>
                </svg>

              </p>-->
            </div>
          </div>
          <div  class="card-top3" width-most>
            <p class="tit-respone">
              <span bold>需求物资清单</span>
              <i>（左右滑动查看更多信息）</i>
            </p>
            <div class="show-data">
              <p  class="data-tit " flexcont flexcont3>
                <span style="width: 35%">物资名称</span>
                <span style="width: 15%;justify-content: flex-end;">数量</span>
                <span style="width: 12%">单位</span>
                <span style="width: 20%">规格</span>
                <span style="width: 45%">执行标准</span>
                <span style="width: 40%">备注</span>
              </p>
              <p flexcont v-for="(details,index) in item.details" :key="index">
                <span style="width: 35%">{{details.goodsname}}</span>
                <span style="width: 15%; color: #4fa1a4;justify-content: flex-end;" v-if="details.qty==999999.99">不限</span>

                <span style="width: 15%; color: #4fa1a4;justify-content: flex-end;" v-else v-format="'#,##'">{{details.qty}}</span>
                <span style="width: 12%">{{details.unitstyle}}</span>
                <span style="width: 20%">{{details.goodsspec}}</span>
                <span style="width: 45%">{{details.executivestandard}}</span>
                <span style="width: 40%">{{details.note}}</span>
              </p>
            </div>
          </div>
          <div  class="card-top4" width-most>
            <h4 class="tit-respone">
              联系方式
            </h4>
            <div  flexcont class="list-info">
              <span>地&nbsp;&nbsp;&nbsp;址:&nbsp;</span>
              <p>
                {{item.address}}
              </p>
            </div>
            <div  v-if="item.contacts instanceof Array">
              <div  flexcont4 class="list-info"  v-for="(cc,indexs) in item.contacts" :key="indexs">
              <span>
                联系人:&nbsp;{{cc}}<i>/</i>
                <i v-if="item.contactsdept&&item.contactsdept.length>1">{{item.contactsdept}}</i>
                <i v-if="item.contactsdept&&item.contactsdept.length>1">/</i>
                {{item.tel[indexs]}}
              </span>

                <a class="click-button bgfff" bold  :href="'tel:' + item.tel[indexs]" v-on:click="pinCall(item)">拨打电话</a>
              </div>
            </div>
            <div v-else>
              <div  flexcont4 class="list-info">
              <span>
                联系人:&nbsp;{{item.contacts}} <i>/</i>
                 <i v-if="item.contactsdept&&item.contactsdept.length>1">{{item.contactsdept}}</i>
                <i v-if="item.contactsdept&&item.contactsdept.length>1">/</i>
                {{item.tel}}
              </span>

                <a class="click-button bgfff" bold  :href="'tel:' + item.tel" v-on:click="pinCall(item)">拨打电话</a>
              </div>
            </div>

            <mt-button type="default" size="large" @click="goDetails(item)">响应需求</mt-button>
          </div>
        </div>
        <div v-if="!noMore&&search.page>1" fixed-top style="bottom: 0;top: auto;text-align: center;font-size:4vw;padding: .6vh 0;" class="bgfff">向下滑动加载更多数据</div>
        <div v-if="noMore" class="loadingDom bgfff">
          <svg class="icon" aria-hidden="true">
            <use xlink:href="#icon-kulian"></use>
          </svg>
          <span v-if="list.length==0">暂无相关数据</span>
          <span v-else>数据已全部加载</span>
        </div>
      </div>

    <div v-if="imgs" class="pick-bg" fixed-top>
      <div flexcont2 flexcont class="imgs">
        <svg class="icon" aria-hidden="true" @click="imgs=''">
          <use xlink:href="#icon-guanbi"></use>
        </svg>
          <img v-lazy="imgs.original.path+imgs.original.name" alt="" :key="imgs.original.path">

      </div>
    </div>

    </div>
</template>

<script>
  import { Picker,Search,Button,InfiniteScroll,MessageBox} from 'mint-ui';
  import {mapState} from 'vuex';
  export default {
    name: '',
    components: {
      'mt-picker': Picker,

    },
    props: {},
    data () {
      return {
        imgs:'',
        unTop:false,
        topShow:false,
        search:{
          pageSize: 10,
          page: 1,
          info: "",
          flag: "P2",
          province:'',
          city:'',
          supplierguid:''
        },
        total: 0, // 总条数
        totalPage: 1 ,// 总分页数,
        isLoading: false, // 加载中
        isMoreLoading: true, // 加载更多中
        noMore: false, // 是否还有更多
        list:[],
        loadingNow:false,
        onShow:false,
        myAddressSlots: [
          {
            flex: 1,
            defaultIndex: 1,
            values: [],    //省份数组
            className: 'slot1',
            textAlign: 'center'
          }, {
            divider: true,
            content: '-',
            className: 'slot2'
          }, {
            flex: 1,
            values: ['全部地区'],
            className: 'slot3',
            textAlign: 'center'
          },
          {
            divider: true,
            className: 'slot4'
          },

        ],
        myAddressProvince:'全部地区',
        myAddressCity:'',
        arr:[]
      }
    },
    created(){
      this.unTop=true
      this.getList();
      //this.getAreaList();
    },
    filters:{
      Upper(v) {
        return (v).substring(0,v.indexOf(" "))
      },
      '1000': function (val) {

        if (typeof (val) === 'number') {
          return (val).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,')
        }

      }
    },
    computed:{
      ...mapState(['loading'])
    },
    methods: {
      //pic
      showPic(item){
        this.$pin.pin_viewVocument(item);
        if(item.pictcontent){
          let pic=JSON.parse(item.pictcontent);
          this.imgs=pic[0]
        }else {
          MessageBox('抱歉，此医院暂未上传文件');
        }

      },
      okCity(){
        this.onShow=false;
        //this.okk=true;
        this.$pin.pin_areaFilter(this.search);
        this.changeNavigation();
      },

      changeNavigation(index) { // 切换标签页
        this.$refs.searchInput.blur();
        this.isMoreLoading = true
        this.search.page = 1 // 初始化
        this.totalPage = 1
        this.list = []
        this.noMore = false
        this.getList();
      },

      //获取列表
      async getList(type){
        if(this.search.info && this.search.info != '') {
          this.$pin.pin_searchWord(this.search.info);
        }
        this.$store.state.loading=true;
        this.$store.state.loadingText='一大波数据来袭中...'
        //openid
        this.search.supplierguid = localStorage.getItem('wxOpenId');

        let getGoodsList=await this.$api.home.getDemandPublishList({
          ...this.search
        });

        //list
        let lists=getGoodsList.data.list;
        if(lists.length==0){
          this.noMore=true;
        }
        if (type === 'loadMore') {
          this.list = this.list.concat(lists)
        } else {
          this.list = lists
        }

        this.total=getGoodsList.data.total;
        this.totalPage = Math.ceil(this.total/ this.search.pageSize)
       // console.log('总页数', Math.ceil(this.total / this.search.pageSize))
        this.isMoreLoading = false;
        this.$store.state.loading=false;
        this.list=this.list.map((item)=>{
          return {
            ...item,
            contacts:item.contacts&&item.contacts.indexOf('、')!=-1? item.contacts.split('、'):item.contacts,
            tel:item.tel&&item.tel.indexOf('、')!=-1?item.tel.split('、'):item.tel
          };
        });

      },
      loadMore() {
        this.search.page += 1;
        this.isMoreLoading = true;
        this.$store.state.loading=true;
        if (this.search.page > this.totalPage) { // 超过了分页
          this.noMore = true // 显示没有更多了
          this.$store.state.loading = false // 关闭加载中
          return false
        }
        this.getList('loadMore')
      },
      //获取地区
      async getAreaList(){
        let areaList=await this.$api.home.getAreaList({});
          let cc=areaList.data
            let ee =cc.map((item,index)=>{
              return item.province
            });

          this.myAddressSlots[0].values=areaList.data;
          this.myAddressSlots[0].values.unshift({
            province: "全部地区",
            city:[{
              city:'',
            }]
          })
      },
      //选择地区
      onMyAddressChange(picker, values,i) {

        if(values[0]&&this.onShow){
          let dd=[]
          dd=values[0].city.map((item,index)=>{

            return item.city!=''?`${item.city} ${item.number}`:item.city
          });
          picker.setSlotValues(1,dd);
          //picker.setSlotValues(2,this.myAddressSlots[1].values);
          this.myAddressProvince =values[0].province;
          console.log(values[1])
          this.myAddressCity = values[1]=='全部地区'||values[1]==undefined?'':values[1].substring(0,values[1].indexOf(" "))

          this.search.province=this.myAddressProvince=='全部地区'?'':this.myAddressProvince
          this.search.city = this.myAddressCity
        }else {
          picker.setSlotValues(1,'');
        }
      },

      //go details
      goDetails(item){
        this.$router.push({
          path:'/details',
          query:{
            item:JSON.stringify(item)
          }
        })
      },

      //拨打电话埋点
      pinCall(item){
        this.$pin.pin_makecall(item);
      }
    },
    mounted(){
      this.getAreaList()
      this.$nextTick(() => {
        console.log(this.myAddressSlots[0].defaultIndex)
        this.myAddressSlots[0].defaultIndex = 0
      });
    }
  }
</script>

<style scoped>
  input[type=search]::-webkit-search-cancel-button{
    -webkit-appearance: none;
  }
  .home-warp{bg:#f5f5f9;}
  .zindexClass{position: fixed;w:100%;l:0;z-index: -999;}

  .card-top1,.top-bar,.card-top2{
    w:96vw;m:0 auto;
  }
  .card-top-wrap{bdb:1px solid #ddd;}
  .click-button{bd:1px solid #4fa1a4;bdrs:10px;p:8px 8px;fz:22px;c:#4fa1a4;}
  .card-group{
   p:20px 0;mb:16px;
    .card-top1{
      fz:34px;c:#666;
    }
    .card-top2{
      fz:24px;c:#999;m:18px auto;.icon{size:34px;}
    }
    .card-top3{
      mt:20px;
      .show-data{
        overflow-x: scroll;
          span{flex-shrink: 0;}
      }
    }
    .card-top4{
      mt:24px;
      .list-info{
        fz:26px;pb:14px;mt:20px;c:#333;align-items: center;
        span{fz:28px;}
      }
    }


  }

  .top-bar{
    background: #efeff4;position: fixed;top:90px;left: 0;width: 100%;z-index: 100;p:10px 0;justify-content: space-between;h:100px;
    .search-form{
      flex: 3;h:60px;lh:60px;
      input{w:100%;fz:30px;c:#333;pl:10px;}
    }
    p{
      span{fz:28px;pr:8px;c:#999;}
      .icon{c:#c2c2c7;size:34px;}
    }
    .search-bar{
      flex:1;bg:#fff;ml:26px;h:60px;bdrs:12px;p:0 8px;
      .icon{size: 34px;align-self: center;}
      .icon-close{size: 60px;fill: #ccc;}
    }

  }
  .pick-bg{bg:rgba(0, 0, 0, 0.66);h:100vh;position: fixed;l:0;b:0;w:100%;z-index: 100;}
.picker-button{mt:30vh;p:16px 10px;
  p{fz:28px;c:#000;}
  span{fz:34px;c:#19bc9b}
  }
  .imgs {
  img{max-width: 90%;max-height: 90%;}
  img[lazy="loading"]{size: 100px;d:block;}
  }
</style>
