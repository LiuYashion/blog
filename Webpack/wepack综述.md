## webpack
webpack是前端模块打包工具，webpack处理的时候，会动态创建一个依赖图谱，最终将这些模块打包到几个文件中。

## 依赖图谱
```js
module.exports = {
    entry: {
        main: './example3/main.js',
        main1: './example3/main1.js',
        common1:["jquery"],
        common2:["vue"]
    },
    output: {
        path: './dest/example3',
        filename: '[name].js'
    },
    plugins: [
        new CommonsChunkPlugin({
            name: ["chunk",'common1','common2'],
            minChunks:2
        })
    ]
};
```