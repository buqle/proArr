/**
 * @author BQL
 * @date 2020/2/5
 * @Description: 响应api
 */
import axios from '@/Utils/featch'
import Vstore from '../store/index'
import {route} from './apiRoute'
const md5 = require("js-md5");

const wx = {
  //获取CODE
  getCode() {
    return new Promise((resolve, reject) => {
        let url = window.location.host + '/#/',
            params = {
              url: encodeURIComponent(`${window.location.protocol}//${url}`)
            };
      axios.post(`https://llmr.csyaoly.com/weixin_api/api/webchart/getMiniAppIndexou`, params)
        .then(res => {
          resolve(res)
        }).catch(err => {
          reject(err)
        })
    });
  },
  //获取OPENID
  getOpenID(data) {
    return new Promise((resolve, reject) => {
      axios.post(`https://llmr.csyaoly.com/weixin_api/api/webchart/getMiniAppOpenId`, data)
        .then(res => {
          resolve(res)
        }).catch(err => {
          reject(err)
        })
    });
  },
  //获取OPENID
  getTicket(data) {
    return new Promise((resolve, reject) => {
      axios.post(`https://llmr.csyaoly.com/weixin_api/api/webchart/getTicKet`, data)
        .then(res => {
          resolve(res)
        }).catch(err => {
          reject(err)
        })
    });
  },
  //获取可视化数据
  getVisualData() {
      let ts = (new Date()).valueOf(),
          key = Vstore.state.key,
          tkt = md5(`${key.substr(4, key.length)}${key.substr(0, 4)}${ts}`).toUpperCase(),
          postKey = `${tkt.substr(11, tkt.length)}${tkt.substr(4, 4)}${tkt.substr(0, 7)}.${ts}`,
          query = {
            t:postKey
          };
    return new Promise((resolve, reject) => {
      axios.post(`https://llmr.csyaoly.com/weixin_api/api/webchart/GetVisualData`, query)
        .then(res => {
          //console.log(res);
          resolve(res)
        }).catch(err => {
          reject(err)
        })
    });
  },
  //需求地图
  eventInsert(data) {
    return new Promise((resolve, reject) => {
      axios.post(`${route}/supplier/demandpublish/eventInsert`, data)
        .then(res => {
          //console.log(res);
          resolve(res)
        }).catch(err => {
          reject(err)
        })
    });
  },
}
export default wx