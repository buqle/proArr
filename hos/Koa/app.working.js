const Koa = require('koa'); //KOA本体
const cors = require('koa2-cors'); //koa跨域组件
const proxy = require('koa-server-http-proxy'); //KOA代理中间件

const app = new Koa(); //启动KOA实例

//配置KOA跨域
app.use(cors({
  origin: '*', //允许所有
  exposeHeaders: ['WWW-Authenticate', 'Server-Authorization'], //为代理提供的配置
  maxAge: 300, //最大访问生命周期
  credentials: true, //是否需要权鉴
  allowMethods: ['GET', 'POST', 'PUT', 'DELETE'], //允许的访问方式
  allowHeaders: ['Content-Type', 'Authorization', 'Accept'], //允许的头部标识（内容类型，权限认证，接受类型）
}));

//配置中间件
app.use(proxy('/drugcloud_api', { //表示请求中包含‘/drugcloud_api’这一段就进行转发，转发时会继承需要访问的接口信息，只是将访问服务器替换成需要访问的其他服务器
  target: 'http://test.csylcloud.com:18082/drugcloud_api', //表示将要访问的目标服务器
  changeOrigin: true //是否为跨域，默认是
}))

app.port = 3021; //KOA启动时的端口，也是前端界面需要访问的端口

app.listen(3021, () => { //监听刚才设定的端口
  console.log(`https://127.0.0.1:${app.port} 已经启动(时间：${new Date().toLocaleString()})...`); //打个桩，输出下lOG看看运行是否正常
});