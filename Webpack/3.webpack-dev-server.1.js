/**
 * webpack-dev-server启动方式
 */
var packageJson = {
  "scripts": {
    "build": "webpack-dev-server --hot --inline --config webpack.config.js"
  }
}

/**
 * proxy:
 * 
 * contentBase
 */
module.exports = {
  devServer:{
    contentBase: './build/',
    inline: true,       // 可以监控js变化
    hot: true,          // 热启动
    host:'localhost',
    proxy: {
      '/qqagent': {
        target: 'https://qq-ci.crfchina.com/',
        secure: false,
        changeOrigin: true
      }
    }
  }
}
