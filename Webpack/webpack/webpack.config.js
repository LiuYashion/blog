var CommonsChunkPlugin = require("webpack/lib/optimize/CommonsChunkPlugin");
var path = require('path')

module.exports = {
    context: path.resolve(__dirname, './src'),
    entry: {
        main1: './main1.js',
        main2: './main2.js',
        common1: ['./jquery'],  
        common2: ['./vue']
    },
    output: {
        path: path.resolve(__dirname, './build'),
        publicPath: "/dist/",
        filename: '[name].js'
    },
    plugins: [
        // new CommonsChunkPlugin({
        //     name: ['chunk', 'common1', 'common2'],
        //     minChunks: 2
        // })
        new CommonsChunkPlugin({
            name:'webpack-runtime',
            chunks: [ 'common1', 'common2'],
            minChunks: 2
        })
    ]
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
