

/**
 * @param {webpack}
 * path:  文件输出路径;
 * publicPath:  指定所有资源(css/js/img)的基础路径;
 */




/**
 * @param {webpack-dev-middleware}
 * 定义:  webpack-dev-middleware是express的一个中间件;
 * 运作:  读取webpack.config,将文件输出到内存中,因此构建速度很快;
 *        webpack能把所有资源当做模块来处理,可以向客户端反馈各种资源,所以可以代替http服务器
 * 区别:  定制化程度更高;
 * 参数:  publicPath: 资源在内存输出的目录
 */
var server  = express()
var devMiddleware = require('webpack-dev-middleware')(compiler, {
  publicPath: /assets/,
  stats: {
    colors: true,
    chunks: false
  }
})
server.use(devMiddleware)
//  这样配置本地的访问地址就是http://xxx.com:8000/assets
//  因为输出文件的路径在/assets下



/**
 * @param {webpack-hot-middleware}
 * 定义: 结合webpack-dev-middleware的中间件；
 * 运作: 实现浏览器的无刷新更新（hot reload），HMR和热加载的区别是：热加载是刷新整个页面
 * 区别: 定制化成都差，很难编写后端服务，进行整合。
 */
var hotMiddleware = require('webpack-hot-middleware')(compiler)



/**
 * @param {webpack-dev-server}
 * 定义:  express + webpack-dev-middleware的中间件;
 * 运作:  同webpack-dev-middleware一样
 * 区别:  定制化成都差,很难编写后端服务,进行整合
 */



/**
 * @param {http-proxy-middleware}
 * 定义:  
 * 运作:  
 * 区别:  
 */
server.use(proxyMiddleware(context, options))










