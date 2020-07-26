import axios from 'axios';
import qs from 'qs';
import {MessageBox} from 'mint-ui';
//axios.defaults.withCredentials=true;//设置发送请求时带上cookie

//发送
axios.interceptors.request.use(config=>{
  return config
},err=>{
  return Promise.reject(err) //承诺被拒绝
});

//响应
axios.interceptors.response.use(respone=>respone,err=>Promise.resolve(err.response))//承诺被接受

//检查状态码
function checkStatus(res) {
  if(res.status == 200 ||res.status == 304){
    return res.data
  };
  return{
    code:0,
    msg:res.data.msg || res.statusText,
    data:res.statusText
  }
}
/*setTimeout(function () {

});
setTimeout(()=>foo='');*/

//检查code
function checkCode(res) {
  if (res.IsSuccess != undefined) {
    if(res.IsSuccess == false) {
      console.log(res);
    } 
  } else {
    if (res.errorCode != 0) {
      MessageBox(res.message);
      // throw new Error(res.msg)
      console.log(res.msg);
    }
  }
  return res;
}

export default {
  get(url,params){
    if(!url){
      return
    }else {
      return axios({
        method:'get',
        url,
        params,
        withCredentials: true,
        //timeout:300000
      }).then(checkStatus).then(checkCode)
    }
  },
  post(url,data){
    if(!url){
      return
    }else {
      return axios({
        method:'post',
        url:url,
        headers: {
          'Content-Type': 'application/json'
        },
        withCredentials: true,
        data:data,
      }).then(checkStatus).then(checkCode)
    }
  },
}
