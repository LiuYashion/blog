## webpack配置

## 前言
用于记录webpack中的一些配置项

## 配置
webapck.config.js

### devtool
```javascript
devtool: 'cheap-module-source-map',
```
用于提高debug效率，具体选择可见 https://doc.webpack-china.org/configuration/devtool/#devtool

### context
```javascript
context: path.resolve(__dirname, 'src'),
```
此处填写绝对路径，默认值为当前目录，作为entry和loader的起点目录。建议传一个值，这样能够使项目独立于当前执行目录

### target
```javascript
target: 'web',
```
webpack可以构建多种target项目，target不用，内部一些处理也会不用，默认是web

### entry
entry是项目开始编译的入口，可以是单入口和多入口

- 单入口
```javascript
entry: 'index.js',

entry: [
  './index.js',
  './pages/entry.1.js'
],
```
当传入一个数组的时候，将创建多个主动入口，然后将多个依赖文件一起注入，上面例子中，webpack将把index.js和entry.1.js一起注入，作为entry.1.js返回

- 多入口
```javascript
entry: {
  'index': './index.js',
  'entry1': './pages/entry.1.js',
},

entry: {
  pageOne: './src/pageOne/index.js',
  pageTwo: './src/pageTwo/index.js',
  pageThree: './src/pageThree/index.js'
}
```
如上面代码中，我们可以构建多页面应用。多页面应用就会涉及代码复用问题，我们可以用 CommonsChunkPlugin 提取公共代码， 具体使用见：webpack缓存的持久化

### output
```javascript
output: {
    publicPath: '',
    path: path.resolve(__dirname, './build'),
    // pathinfo: true,
    filename: '[name]/entry.[chunkhash].js',
    chunkFilename:'js/[name].chunk.js' //require.ensure
},
```
webpack可以构建多种target项目，target不用，内部一些处理也会不用，默认是web