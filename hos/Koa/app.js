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

const proxyTable = {
  '/weixin_api': {
    target: 'http://llmk.csyaoly.com:3017/',
    changeOrigin: true
  },
  '/drugcloud_api': {
    target: 'http://test.csylcloud.com:18082/drugcloud_api',
    changeOrigin: true
  }
}

Object.keys(proxyTable).forEach((context) => {
  var options = proxyTable[context];
  app.use(proxy(context, options))
})

app.port = 3021; //KOA启动时的端口，也是前端界面需要访问的端口

app.listen(3021, () => { //监听刚才设定的端口
  console.log(`https://127.0.0.1:${app.port} 已经启动(时间：${new Date().toLocaleString()})...`); //打个桩，输出下lOG看看运行是否正常
});