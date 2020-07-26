module.exports = {
  proxy: {
    '/api': {
      target: 'http://117.78.44.120:8080',  // 接口域名
      changeOrigin: true,
      pathRewrite: {
        '^/api': ''
      }
    }
  }
}
