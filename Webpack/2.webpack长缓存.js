
/**
 * 多配置webpack-merge
 */





/**
 * webpack中的持久缓存
 */



//  为什么要利用持久化缓存？
/**
 * 利用好了缓存浏览器缓存机制，我们可能更快的获取到静态资源，传统的加随机数后缀只能防止使用缓存
 */



//  如何利用持久化缓存？
/**
 * 利用hash文件名
 */



//  webpack生成hash值有2种方式
//  第一种是每次编译生成的，每个chunk都会被打上这个hash，第二个是对每个文件的内容摘要生成的hash，不同的资源打上不同的hash
/**
 * 所有chunks的hash：[hash]
 * 每个chunk计算hash：[chunkhash]
 */



//  webpack里面的hash生成：
/**
 * js：[chunkhash]由webpack计算
 * css：[contenthash]由webpack/extract-text-webpack-plugin计算
 * imgs/fonts：[hash]由webpack/file-loader计算
 */



//  仍然会存在对的一些问题
/**
 * 由于模块间的依赖关系，当修改了一个文件a，其chunkhash改变，
 * 那么将导致引用文件a的文件b内容改变，文件b的chunkhash也改变了
 */


//  这里就涉及到了一个概念：webpack runtime
/**
 * 可以理解为，打包完运行时必须的代码，里面会包含chunkID，chunkhash等对象，
 * 可见这段代中引用的文件名会随着文件的改动而改变
 */

//  关于webpack runtime的功能：
/**
 * webpackJsonp：模块读取函数通过，调用__webpack_require__
 * __webpack_require__：模块初始化执行函数
 * 加载异步chunk：用于require.ensure加载的chunk，异步chunk由webpackJsonp加载
 * 对export default进行一些处理
 */

 
 // 【所以在这里我们要做的就是：**生成稳定的hash，避免连带改动**】


 
 // 如何生成稳定的模块id?



//  如何避免频繁的chunk内容改动？
//  一般情况下，我们不用追求持久化更新，常规配置即可
//  当业务增加的时候，我们想把公共模块都提取到wendor中，然鹅这样并不能较好的持久化缓存，所以我们再次细分一下：

/**
 * 库和工具（libs）：react/vue/redux/whatwg-fetch
 * UI库和工具（vendor）：UI组件/私有工具/语法polyfill/页面初始化脚本
 * 低频库（chunk）：echart/jssdk/省市json
 * 业务模块（entries）：业务逻辑模块/view
 */

/**
 * 那这时候我们来理清一下划分思路：
 * 1.我们可以通过设置多个entry来分离模块
 * 2.通过代码分割
 *     require.ensure
 *     require
 *     import
 */

//  提取频繁公用的模块，将webpack-runtime构建为内联script
//  这里要用到Commons-chunk-plugin，设置minChunks，对于持久化缓存，只需要通过这个把文件打包到lib/vendor中即可
new webpack.optimize.CommonsChunkPlugin({  
    names: ['manifest', 'libs', 'vendor'].reverse()
})

//  这里的manifest只是特定的名字，既然webpack runtime是公共的，那么其打包出来的代码就会叫做manifest，当然这个文件可以被直接写成内联


