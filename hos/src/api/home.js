/**
 * @author BQL
 * @date 2020/2/5
 * @Description: 响应api
*/
import axios from '@/Utils/featch'
import {route} from './apiRoute'
const home={
  //响应列表
  getDemandPublishList(data){
    return new Promise((resolve,reject)=>{
      axios.post(`${route}/supplier/demandpublish/getDemandPublishListForWx`,data)
        .then(res=>{
          //console.log(res);
          resolve(res)
        }).catch(err=>{
        reject(err)
      })
    });
  },
  //提交
  submitResponseForWx(data){
    return new Promise((resolve,reject)=>{
      axios.post(`${route}/supplier/demandpublish/submitResponseForWx`,data)
        .then(res=>{
          //console.log(res);
          resolve(res)
        }).catch(err=>{
        reject(err)
      })
    });
  },
  //地区
  getAreaList(data){
    return new Promise((resolve,reject)=>{
      axios.post(`${route}/supplier/demandpublish/getAreaList`,data)
        .then(res=>{
          // console.log(res);
          resolve(res)
        }).catch(err=>{
        reject(err)
      })
    });
  },
  //注册
  register(data){
    return new Promise((resolve,reject)=>{
      axios.post(`${route}/supplier/register/registerForWx`,data)
        .then(res=>{
          // console.log(res);
          resolve(res)
        }).catch(err=>{
        reject(err)
      })
    });
  },
  //需求地图
  getMapList(data){
    return new Promise((resolve,reject)=>{
      axios.post(`${route}/supplier/demandpublish/getMapList`,data)
        .then(res=>{
          //console.log(res);
          resolve(res)
        }).catch(err=>{
        reject(err)
      })
    });
  },
}
export default home
