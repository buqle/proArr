/**
 * @author QER
 * @date 2019/12/25
 * @Description: api
*/
import axios from '@/Utils/featch'
import {route} from './apiRoute'
const dataApi={
  //当月入库数据统计
  inDataCount(data){
    return new Promise((resolve,reject)=>{
      axios.get(`${route}/bigscreen/inDataCount`,data)
        .then(res=>{
          console.log(res);
          resolve(res)
        }).catch(err=>{
        reject(err)
      })
    });
  },
  //当月退货数据统计
  backDataCount(data){
    return new Promise((resolve,reject)=>{
      axios.get(`${route}/bigscreen/backDataCount`,data)
        .then(res=>{
          console.log(res);
          resolve(res)
        }).catch(err=>{
        reject(err)
      })
    });
  },

  //实时库存数据
  storeDataCount(data){
    return new Promise((resolve,reject)=>{
      axios.get(`${route}/bigscreen/storeDataCount`,data)
        .then(res=>{
          console.log(res);
          resolve(res)
        }).catch(err=>{
        reject(err)
      })
    });
  },

  //库存近效期预警
  jxqDataCount(data){
    return new Promise((resolve,reject)=>{
      axios.get(`${route}/bigscreen/jxqDataCount`,data)
        .then(res=>{
          console.log(res);
          resolve(res)
        }).catch(err=>{
        reject(err)
      })
    });
  },

  //库存呆滞预警
  delayDataCount(data){
    return new Promise((resolve,reject)=>{
      axios.get(`${route}/bigscreen/delayDataCount`,data)
        .then(res=>{
          console.log(res);
          resolve(res)
        }).catch(err=>{
        reject(err)
      })
    });
  },

  //证照预警
  countDrugLic(data){
    return new Promise((resolve,reject)=>{
      axios.get(`${route}/bigscreen/countDrugLic`,data)
        .then(res=>{
          console.log(res);
          resolve(res)
        }).catch(err=>{
        reject(err)
      })
    });
  },

  //消耗数据
  useDataCount(data){
    return new Promise((resolve,reject)=>{
      axios.get(`${route}/bigscreen/useDataCount`,data)
        .then(res=>{
          console.log(res);
          resolve(res)
        }).catch(err=>{
        reject(err)
      })
    });
  },

  //近一年业务数据
  yearDataCount(data){
    return new Promise((resolve,reject)=>{
      axios.get(`${route}/bigscreen/yearDataCount`,data)
        .then(res=>{
          console.log(res);
          resolve(res)
        }).catch(err=>{
        reject(err)
      })
    });
  },

  //top20
  drugSalesTop20(data){
    return new Promise((resolve,reject)=>{
      axios.get(`${route}/bigscreen/drugSalesTop10`,data)
        .then(res=>{
          console.log(res);
          resolve(res)
        }).catch(err=>{
        reject(err)
      })
    });
  },

  //医院结算数据
  settleDataCount(data){
    return new Promise((resolve,reject)=>{
      axios.get(`${route}/bigscreen/settleDataCount`,data)
        .then(res=>{
          console.log(res);
          resolve(res)
        }).catch(err=>{
        reject(err)
      })
    });
  },
}
export  default  dataApi;
