/**
 * @author BQL
 * @date 2020/2/4
 * @Description:前缀路径配置
*/

/*以下为后端本地环境部署路径*/
//export  const route=`http://6i3fx5.natappfree.cc/medicinal-supplier/weChat`;
let route=''
//判断开发环境or生产环境请求前缀
if (process.env.NODE_ENV == 'development') {
  route=`api`;//
}else {
   route = `https://llmr.csyaoly.com/drugcloud_api` //发版更改
  //  route = `http://test.csylcloud.com:18082/drugcloud_api` //发版更改
}
export {route}

