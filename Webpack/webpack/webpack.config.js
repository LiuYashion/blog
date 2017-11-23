const CommonsChunkPlugin  = require("webpack/lib/optimize/CommonsChunkPlugin");
const HtmlWebpackPlugin   = require('html-webpack-plugin');
var path = require('path')

module.exports = {
    context: path.resolve(__dirname, './src'),
    entry: {
        main1: './main1.js'
    },
    output: {
        path: path.resolve(__dirname, './build'),
        publicPath: "/build/",
        filename: '[name].js'
    },
    plugins: [
        new CommonsChunkPlugin({
            name:'webpack-runtime',
            minChunks: 2
        }),
        new HtmlWebpackPlugin({
            title:'开发模式',
            filename: `./result.html`,
            template: `./index.html`,
            chunks: ['webpack-runtime'],
            inject: 'body',
            hash: true, 
            xhtml: true
        })
    ],
    // devServer:{
    //   contentBase: './build/',
    //   host: 'localhost',
    //   port: 8081,         // 默认8080
    //   inline: true,       // 可以监控js变化
    //   hot: true,          // 热启动
    //   compress: true,
    //   watchContentBase: false,
    // }
};

//  CommonsChunkPlugin的names不是瞎写的
//  


//  1.
//  注意此处CommonsChunkPlugin的调用顺序：
//  将index1和index2中被调用2次以上的模块单独提取出来，放到chunk.js中
//  然后将chunk.js中被依赖2次以上的模块，抽出来做common1.js
//  然后将common1.js中被依赖2次以上的模块，抽出来做common2.js

//  2.0
//  所以抽取度约高的代码，越要优先加载。common2中有webapck-running-time代码，所以必须被最先加载

//  3.
//  entry
