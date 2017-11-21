var CommonsChunkPlugin = require("webpack/lib/optimize/CommonsChunkPlugin");
var path = require('path')

module.exports = {
    context: path.resolve(__dirname, './src'),
    entry: {
        index1: './index1.js',
        index2: './index2.js',
        common1: ['./jquery'],  //  require('./tools.js')
        common2: ['./vue']
    },
    output: {
        path: path.resolve(__dirname, './build'),
        publicPath: "/dist/",
        filename: '[name].js'
    },
    plugins: [
        new CommonsChunkPlugin({
            name: ['chunk', 'common1', 'common2'],
            minChunks: 2
        })
    ]
};

//  注意此处CommonsChunkPlugin的调用顺序：
//  将index1和index2中被调用2次以上的模块单独提取出来，放到chunk.js中
//  然后将chunk.js中被依赖2次以上的模块，抽出来做common1.js
//  然后将common1.js中被依赖2次以上的模块，抽出来做common2.js


//  所以抽取度约高的代码，越要优先加载。



/**
 * CommonsChunkPlugin 构建独立模块
 * 
 * 1.   minChunks在没指明的情况下，默认是每个entry引用才抽取
 * 2.   new CommonsChunkPlugin({ name: 'vendor' }),
        new CommonsChunkPlugin({ name: 'manifest', chunks: ['vendor'] }),

        new webpack.optimize.CommonsChunkPlugin({
            names: ['vendor', 'manifest'],
        }),

        A: 先把公共代码抽到vendor.js，再从manifest中抽出vendor.js
        这样manifest里面就是运行时的代码了
        B：和A的效果一样
    
 *
 * 
 *
 */