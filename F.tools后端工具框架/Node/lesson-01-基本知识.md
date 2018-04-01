## basic 

#### 命令行参数
```js
const args = process.argv.slice(2)
```

#### 模块分类
```js
const myFile = require('myFile')  // 1.0文件模块
const fs = require('fs')  // 2.0核心模块
const mysql = require('mysql')  // 3.0第三方模块
```

#### 一些变量
- module.parent
如果模块被引用，那么module.parent将指向引用它的模块；
- module.children
如果模块引用了其他模块，module.children将指向这些模块；


#### 手动实现require
```js
function $require(id){
  const fs = require('fs')
  const path = require('path')
  const fileName = path.join(__dirname, id)
  const dirName = path.dirname(fileName)

  let code = fs.readFileSync(fileName, 'utf8')
  let module = {
    id: id,
    exports:{}
  }
  let exports = module.exports
  code = `(function($require, module, exports, __dirname, __filename){
    ${code}
  })($require, module, exports, __dirname, __filename)`;

  eval(code)
  return module.exports
}
```



#### 常用模块
- fs
操作文件
- path
处理路径



#### 模块的缓存
require.catch，记录了node启动中使用所以的缓存；根据模块的路径，来作为缓存名；
- 删除缓存
delete require.cache[key]


#### 实现缓存
```js
function $require(id){
  const fs = require('fs')
  const path = require('path')
  const fileName = path.join(__dirname, id)
  const dirName = path.dirname(fileName)

  if($require.cache[fileName]){
    return $require.cache[fileName].exports;
  }

  let code = fs.readFileSync(fileName, 'utf8')
  let module = {
    id: id,
    exports:{}
  }
  let exports = module.exports

  $require.cache[fileName] = module

  code = `(function($require, module, exports, __dirname, __filename){
    ${code}
  })($require, module, exports, __dirname, __filename)`;

  eval(code)
  return module.exports
}
```

