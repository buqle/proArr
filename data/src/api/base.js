import axios from '@/Utils/featch'
import {route} from './apiRoute'
const base={
  //药品库存汇总情况
  totalDrugSumInfo(data){
    return new Promise((resolve,reject)=>{
      axios.get(`${route}/bigscreen/totalDrugSumInfo`,data)
        .then(res=>{
          console.log(res);
          resolve(res)
        }).catch(err=>{
        reject(err)
      })
    });
  },
  //每周药品库存品规变化趋势
  totalDrugStore(data){
    return new Promise((resolve,reject)=>{
      axios.get(`${route}/bigscreen/totalDrugStore`,data)
        .then(res=>{
          console.log(res);
          resolve(res)
        }).catch(err=>{
        reject(err)
      })
    });
  },
  //本周药品总消耗
  totalDrugSales(data){
    return new Promise((resolve,reject)=>{
      axios.get(`${route}/bigscreen/totalDrugSales`,data)
        .then(res=>{
          console.log(res);
          resolve(res)
        }).catch(err=>{
        reject(err)
      })
    });
  },
  //本周药品消耗排名前十
  drugSalesTop10(data){
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
  //药品消耗额趋势
  findDrugSales(data){
    return new Promise((resolve,reject)=>{
      axios.get(`${route}/bigscreen/findDrugSales`,data)
        .then(res=>{
          console.log(res);
          resolve(res)
        }).catch(err=>{
        reject(err)
      })
    });
  },
  //本周消耗变化排名前十
  drugSalesTop10Than(data){
    return new Promise((resolve,reject)=>{
      axios.get(`${route}/bigscreen/drugSalesTop10Than`,data)
        .then(res=>{
          console.log(res);
          resolve(res)
        }).catch(err=>{
        reject(err)
      })
    });
  },
  //供应商资质证照到期提醒
  licExpriceInfo(data){
    return new Promise((resolve,reject)=>{
      axios.get(`${route}/bigscreen/licExpriceInfo`,data)
        .then(res=>{
          console.log(res);
          resolve(res)
        }).catch(err=>{
        reject(err)
      })
    });
  },
}
export default base
