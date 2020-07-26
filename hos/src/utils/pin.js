import localforage from 'localforage';
import device from "current-device";
import Linq from 'linq';

localforage.setDriver([localforage.LOCALSTORAGE, localforage.INDEXEDDB]);
let myDevice = getDevice();
let myOs = device.os;

function getDevice(){
  switch (device.type) {
    case 'mobile':
      return '移动端'
      break;
    case 'tablet':
      return '移动端'
      break;
    case 'desktop':
      return 'PC端'
      break;
    default:
      return '未知设备'
      break;
  }
}

//储存埋点信息
function savePin(arg) {
  /*
   * at:数据储存的时间，用来进行用户行为排序
   */
  if(arg) {
    arg.at = (new Date()).valueOf();
  }
  console.log(localStorage.getItem('wxOpenId'), 'PinGetOpenId');
  let savedData = [];
  localforage.getItem('csbr_pinData').then((res) => {
    if(res) {
      savedData = res;
    }
    savedData.push(arg);
    localforage.setItem('csbr_pinData', savedData);
  });
};

/*
 * type定义:
 * 2：初始登录埋点
 * 3：停留时长
 * 4：响应需求点击次数（按医院统计）
 * 5：拨打电话点击次数（按医院统计）
 * 6：查看盖章原文件点击次数（按医院统计）
 * 7：搜索关键字（按各关键词统计次数）
 * 8：地区筛选（按选择过的地区统计次数，可按用户去重）
 * 9：提交响应次数
 */


const pin = {
  //记录浏览用户，设备信息，所在地区
  pin_initiate(Vm) {
    //调用微信获取地理位置
    Vm.jWeixin.getLocation({
      type: 'wgs84', // gps坐标  百度地图api用的百度坐标可能有偏差
      success: function (res) {
        getCurrentCity(res.latitude, res.latitude); //根据经纬度获取城市
      }
    });
    //百度解析
    function getCurrentCity(longitude, latitude) { //获取当前城市,行政区 // 百度地图API功能
      let Area = '未知区域';
      let point = new BMap.Point(longitude, latitude);
      let gc = new BMap.Geocoder();
      gc.getLocation(point, function (rs) {
        if (rs) {
          let addComp = rs.addressComponents;
          //详细地址为省，市，行政区，街道，街道地址
          // address = addComp.province + ", " + addComp.city + ", " + addComp.district + ", " + addComp.street + ", " + addComp.streetNumber;
          Area = `${addComp.province},${addComp.city}`;
        }
        /*
         * type: 埋点数据类型
         * evice: 设备信息
         * location: 省市信息
         */
        let pinObject = {
          type: '2',
          device: `${myDevice},${myOs}`,
          province: Area.split(',')[0],
          city: Area.split(',')[1],
        }
        savePin(pinObject);
      });
    };
  },

  //记录页面停留时间
  pin_pageElapsed(druation, route) {
    /*
      * type: 埋点数据类型
      * name: 页面名称
      * path: 页面路径
      * elapsed：停留时长，毫秒级
      */
    let pinObject = {
      type: '3',
      name: route.name,
      path: route.path,
      elapsed: druation,
    }
    savePin(pinObject);
  },

  //记录需求相应次数
  pin_respond(args) {

    /*
     * type: 埋点数据类型
     * medName: 医院名称
     * infoGuid: 需求GUID
     */
    let pinObject = {
      type: '4',
      medname: args.medname,
      infoguid: args.guid
    }
    savePin(pinObject);
  },

  //拨打电话点击次数
  pin_makecall(args) {
    /*
     * type: 埋点数据类型
     * tel: 电话号码
     * medName: 医院名称
     * infoGuid: 需求GUID
     */
    let pinObject = {
      type: '5',
      tel: args.tel,
      medname: args.medname,
      infoguid: args.guid
    }
    savePin(pinObject);
  },

  //查看盖章原文件点击次数
  pin_viewVocument(args) {
    /*
     * type: 埋点数据类型
     * medname: 医院名称
     * infoGuid: 需求GUID
     */
    let pinObject = {
      type: '6',
      medname: args.medname,
      infoguid: args.guid
    }
    savePin(pinObject);
  },

  //搜索关键字
  pin_searchWord(args) {
    /*
     * type: 埋点数据类型
     * province: 省
     * city: 市
     */
    let pinObject = {
      type: '7',
      keyword: args,
    }
    savePin(pinObject);
  },

  //地区筛选
  pin_areaFilter(args) {
    /*
      * type: 埋点数据类型
      * province: 省
      * city: 市
      */
    let pinObject = {
      type: '8',
      province: args.province,
      city: args.city,
    }
    savePin(pinObject);
  },

  //记录响应提交操作
  pin_respondClick(args) {
    /*
      * type: 埋点数据类型
      * responder: 响应人
      * tel: 响应人手机号码
      * corpName: 响应人单位
      * guid: 相应的信息GUID
      */
    let pinObject = {
      type: '9',
      contacts: args.contacts,
      tel: args.tel,
      suppliername: args.supplierName,
      infoguid: args.saveList[0].guid,
    }
    savePin(pinObject);
  },

  //获取埋点数据
  postPin(vm) {
    localforage.getItem("csbr_pinData").then(async (data) => {
      /*
       * openid： 当前用户openid，在提交前统一附加
       */
      //先检查时候有待提交的数据
      if (data && data.length > 0) {
        let PostData = JSON.parse(JSON.stringify(data)),
          openid = localStorage.getItem("wxOpenId"),
          latestTime = Linq.from(PostData)
            .select(x => x.at)
            .orderByDescending()
            .toArray()[0];
        PostData.forEach(x => {
          x.openid = openid;
        });
        let query = {
          insertList: PostData
        };
        let res = await vm.$api.wx.eventInsert(query);
        //请求成功，则对比缓存的数据并进行清除
        if (res.errorCode == 0) {
          let newData = [];
          localforage.getItem("csbr_pinData").then(res => {
            res.forEach(x => {
              if (x.at > latestTime) {
                newData.push(x);
              }
            });
            localforage.setItem("csbr_pinData", newData);
          });
        } else {
          let fails = [];
          localforage.getItem("csbr_pindData_postFails").then(errorData => {
            let obj = {
              at: new Date().valueOf(),
              message: res.message || "未知错误"
            };
            if (errorData) {
              fails = errorData;
            }
            fails.push(obj);
            localforage.setItem("csbr_pindData_postFails", fails);
          });
        }
        //否则维持现有数据不变
      }
    });
  }
}

export default pin;