/**
 * @author BQL
 * @date 2020/2/5
 * @Description: 响应-详情
*/
<template>
    <div class="bgfff" style="min-height: 100vh;">

      <div v-if="okSub" flexcont4 class="ok-box">
        <svg class="icon" aria-hidden="true">
          <use :xlink:href="'#icon-xuanzhong'"></use>
        </svg>
        <p>提交成功</p>

        感谢您的响应，医院将第一时间收到您的信息
      </div>

      <div v-else class="details">
        <h4 class="tit-respone" width-most>
          需求物资清单
        </h4>
        <div class="show-data">
          <p  class="data-tit" flexcont>
            <span style="width: 40%">物资名称</span>
            <span style="width: 20%;justify-content: flex-end;">需求数量</span>
            <span style="width: 12%">单位</span>
            <span style="width: 28%;justify-content: flex-end;">响应数量</span>
          </p>
          <p  flexcont v-for="(goods,index) in list" :key="index">
            <span style="width: 40%">{{goods.goodsname}}</span>
            <span style="width: 20%; color: #19bc9b;justify-content: flex-end;"  v-if="goods.qty==999999.99">不限</span>
            <span style="width: 20%; color: #19bc9b;justify-content: flex-end;"  v-else v-format="'#,##'">{{goods.qty}}</span>
            <span style="width: 12%">{{goods.unitstyle}}</span>
            <span style="width: 28%;background: #fff;">
            <input type="number" placeholder="请填写响应数量" v-model="goods.responseqty">
          </span>
          </p>
        </div>
        <h4 class="tit-respone" width-most>
          物资提供方信息
        </h4>
        <div class="card-add">
          <p flexcont>
            <span flexcont>联系人<i>*</i></span>
            <input type="text"  placeholder="请输入联系人姓名" v-model="submitObjs.contacts">
          </p>
          <p flexcont>
            <span flexcont>联系电话<i>*</i></span>
            <input type="text"  placeholder="请输入联系电话" v-model="submitObjs.tel">
          </p>
          <p flexcont>
            <span flexcont>单位名称</span>
            <input type="text"  placeholder="企业捐赠请输入单位名称" v-model="submitObjs.supplierName">
          </p>
          <dl class="reg" flexcont4>
            <dt @click="submitObjs.onChek=!submitObjs.onChek">
              <svg class="icon" aria-hidden="true">
                <use :xlink:href="submitObjs.onChek?'#icon-xuanzhong':'#icon-xuanzhong1'"></use>
              </svg>
            </dt>
            <dd>
              若可长期供应，请勾选此选项自动注册成为医链云平台合作供应商，账号将通过短信发送至联系人手机
            </dd>

          </dl>
        </div>

      </div>
      <div style="height: 15vh" v-show="hideClass"></div>
      <div flexcont class="bottom bgfff" v-show="hideClass&&!okSub">
        <mt-button type="default"  @click="submitObj">提交</mt-button>
        <mt-button type="primary"  @click="$router.go(-1)">返回</mt-button>
      </div>

    </div>
</template>

<script>
  import {MessageBox} from 'mint-ui';
    export default {
      data(){
        return{
          flag: false,
          okSub:false,
          list:JSON.parse(this.$route.query.item).details,
          submitObjs:{
            supplierName:'',
            contacts:'',
            tel:'',
            supplierguid: '',
            onChek:true
          },
          hideClass: true,
          docmHeight: '0',  //默认屏幕高度
          showHeight:  '0',  //实时屏幕高度
        }
      },
      mounted() {
        // window.onresize监听页面高度的变化
        window.onresize = ()=>{
          return(()=>{
            if (!this.isResize) {
              //默认屏幕高度
              this.docmHeight=document.documentElement.clientHeight
              this.isResize = true
            }
            //实时屏幕高度
            this.showHeight = document.body.clientHeight
          })()
        }
        this.$pin.pin_respond(JSON.parse(this.$route.query.item));
      },
      methods:{
        async submitObj(){
          let res = this.list.filter((item) => {
            return item.responseqty&&item.responseqty>0;
          });
          if(res.length==0){
            MessageBox('请填写要响应的单据');
            return false;
          }else if(!this.submitObjs.contacts){
            MessageBox('请填写联系人');
            return false
          }else if(!this.submitObjs.tel){
            MessageBox('请填写联系电话');
            return false
          }
          if(this.flag){
            MessageBox('正在处理操作');
            return false;
          }
          this.flag=true;
          this.submitObjs.supplierName=!this.submitObjs.supplierName?this.submitObjs.contacts:this.submitObjs.supplierName
          //openid
          this.submitObjs.supplierguid = localStorage.getItem('wxOpenId');
          
          let saveList=[];
              saveList=this.list.map(item=>{
                return {
                  guid: item.guid,
                  rowno: item.rowno,
                  responseQty: item.responseqty?item.responseqty:0,
                  goodsname:item.goodsname
                }
              });
              if(this.submitObjs.onChek){
                let reg= await this.$api.home.register({
                  chinesename:this.submitObjs.supplierName,
                  mobiletel:this.submitObjs.tel,
                  linkman:this.submitObjs.contacts,
                  logonuser:this.submitObjs.tel
                });
                if(reg.errorCode==0){
                  MessageBox(reg.data)
                }
              }
          this.$pin.pin_respondClick({
            saveList,
            ...this.submitObjs
          });
          let submit=await this.$api.home.submitResponseForWx({
            saveList,
            ...this.submitObjs
          });
          this.flag=false;
          if(submit.errorCode==0){
           // MessageBox('响应成功');
            this.okSub=true
            setTimeout(() => {

              this.$router.go(-1);

            }, 4500);


          }
        }
      },
      watch:{
        showHeight:function() {

          if(this.docmHeight > this.showHeight){

            this.hideClass=false;


          }else{

            this.hideClass=true

          }

        }
      }
    }
</script>

<style scoped>
  .tit-respone{pt:18px;}
  .reg{
    bg:#fefcec;fz:28px;c:#ff8849;p:20px;
    dt{mr:10px;}
    .icon{size:34px;}
  }
  .show-data{
    input{border: none;bg:#fff;pl: 10px;w:100%;text-align: right;fz:24px;}m:20px auto;
    w:98vw;
   span{bg:#f2f2f2;}
  }
  .card-add{
    bdrs:18px;

    p:first-child{bdt:1px solid #ddd;mt:18px;}
    p{
      span{w:150px;align-items: center;}
      bdb:1px solid #ddd;p:20px 18px;fz:30px;
      i{fz:28px;c:red;ml:4px;}
    }
  input{fz:26px;flex: 1;}
  }

  .ok-box{
    justify-content:space-between;flex-direction: column;align-items:center;c:#999;fz:29px;pt:10vw;h:24vh;
      p{fz:40px;c:#000;}
    .icon{size:100px;}
  }

  .bottom{
    z-index:300;bg:#fff;
    .mint-button--default,.mint-button--primary{
      w:45vw;
    }
    .mint-button--primary {p:0;}
  }
  .bottom{justify-content: space-around;h:110px;align-items: center;}

</style>
