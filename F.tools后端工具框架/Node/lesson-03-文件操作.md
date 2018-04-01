## basic 
#### 切换node版本
npm config set prefix...命令
#### 内置模块
fs path http url querystring ...
#### 包
package



## 读取文件api
读取文件不指定编码类型,默认读buffer
```js
// 小文件
fs.readFile(doc, url, 'utf8', ()=>{

})
fs.readFileSync(doc, url, 'utf8', ()=>{
  
})
```



## Buffer缓冲区
数据容器

```js
var buffer = new Buffer(4);
buffer.writr('xxxxx')

```
