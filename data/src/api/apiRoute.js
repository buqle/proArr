/**
 * @author QER
 * @date 19/6/28
 * @Description: API前缀路径配置
*/

/*以下为后端本地环境部署路径*/
//export  const route=`http://6i3fx5.natappfree.cc/medicinal-supplier/weChat`;
let route=''
//判断开发环境or生产环境请求前缀
if (process.env.NODE_ENV == 'development') {
  route=`api/medicinal-web/a`;//
}else {
   //route=`http://ht.yao4pl.com/medicinal-supplier/weChat`//正式
   route=`http://192.168.2.111:7080/medicinal-web/a`//测试
}
export {route}
/*以下为测试环境部署路径*/
//export  const route=`http://60.174.197.140:9001/medicinal-supplier-T/weChat`
//export  const route=`medicinal-supplier-T/weChat`;
/*以下为正式环境部署路径*/
//export  const route=`http://60.174.197.140:9001/medicinal-supplier/weChat`
