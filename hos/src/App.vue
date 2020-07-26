<template>
  <div id="app" v-bind:style="{opacity:showPage?1:0}">
    <keep-alive>
      <router-view v-if="$route.meta.keepAlive"/>
    </keep-alive>
    <router-view v-if="!$route.meta.keepAlive"/>
    <Loading v-show="loading"></Loading>
  </div>
</template>

<script>
  import Loading from '@/components/Loading';
  import {mapState} from 'vuex';

  export default {
    components: { Loading },
    computed:{
      ...mapState(['loading'])
    },
    data(){
      return {
        showPage: false,
      }
    },
    methods:{
      //关于OPENDID的判断和获取
      gateWay(){
        if(process.env.NODE_ENV == 'development'){
          this.showPage = true;
          this.$pin.postPin(this);
          return true;
        }

        if(!localStorage.getItem('wxOpenId') || localStorage.getItem('wxOpenId') == '') { //没有缓存Openid需要去获取的情况
          let href = window.location.href; //通过当前地址判断是否是微信回调回来的链接。
          if(href.indexOf('code') > -1) { //如果地址包含CODE，则需要解析拿到CODE做请求去获取OPENID
            let codeStr = href.split('code=')[1];
            let code = codeStr.split('&state')[0];
            this.getWxOpenID(code);
          }
          else 
          {
            this.getWxCode(); //如果地址不包含CODE，则需要去获取CODE
          }
        } else { //缓存过OPENID直接显示页面，进行微信JSAPI授权
          this.showPage = true; //显示页面
          this.setWxConfig(); //进行JSAPI授权
        }
      },

      //获取微信CODE，去服务器获取授权链接
      async getWxCode(){
        let getCode = await this.$api.wx.getCode(); //获取授权链接
        if(getCode.ErrorMessage != '') {
          window.location.href = getCode.ErrorMessage; //拿到授权链接后进行重定向
        }
      },

      //获取OPENID
      async getWxOpenID(code){
        let query = {
          exchangeCode: code
        }
        let res = await this.$api.wx.getOpenID(query); //用CODE进行OPENID获取
        if(res.Data && res.Data.openid) {
          localStorage.setItem('wxOpenId', res.Data.openid); //设置OPENID缓存
          // console.log(localStorage.getItem('wxOpenId'), 'asyncopenid');
          this.setWxConfig(); //进行JSAPI授权
        }
        this.showPage = true; //这里是无论本次获取到OPENID没有，都会显示页面，避免页面堵塞
      },

      //开始异步操作
      //获取JSAPI权限并调用第一个埋点，这里已经与OPENID获取的步骤分离，属于异步进行，不会堵塞页面显示
      async setWxConfig() {
        let url = location.href;
        if (location.hash.length) {
          url = url.substr(0, url.indexOf(location.hash));
        }
        let request = {
            url: url
        };
        let getTicKet = await this.$api.wx.getTicket(request);
        if (getTicKet.IsSuccess == true) {
          let data = getTicKet.Data;
          //开始注册wx
          this.jWeixin.config({
            debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
            appId: data.appId, // 必填，公众号的唯一标识
            timestamp: data.timestamp, // 必填，生成签名的时间戳
            nonceStr: data.nonceStr, // 必填，生成签名的随机串
            signature: data.signature, // 必填，签名，见附录1
            jsApiList: [
                "getLocation",
            ]
          });
          this.jWeixin.error(function (res) {
  　　　　　　console.log(res);
    　　　　});
          this.$pin.pin_initiate(this);
        }
      },


      AttackDev(){
        //通过不断调用调试器达到让观察者的DEVTOOOL死循环甚至宕机来防范手动爬页面
        setTimeout(function() {
            while (true) {
              eval("debugger")
            }
        },1000);
      },
    },
    created(){
      this.gateWay();
      // this.getVisualData();
      //production
      // if(process.env.NODE_ENV == 'production'){
      //   this.AttackDev();
      // }
    },
  }
</script>

<style>
  .router-slid-enter-active, .router-slid-leave-active {
    transition: all .4s;
  }
  .router-slid-enter, .router-slid-leave-active {
    transform: translate3d(2rem, 0, 0);
    opacity: 0;
  }
</style>