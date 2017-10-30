### JS调试
```js
try {

} catch(error) {

} finally {

}
```

### 抛出错误
当然我们还可以自定义错误
```js
throw new TypeError('unknown error')

function CrfError(message){
  this.name = 'CrfError'
  this.message = message
}
CrfError.prototype = new Error()

throw new CrfError('unknown')
```

### 常见错误类型
- 类型转换错误
- 数据类型错误
- 通信错误

### XHR
```js
var xhr = new XMLHttpRequest()
xhr.onreadystatechange = function(){
  // use xhr instead of this
}

//  启动请求，3是表示是否异步发送请求
xhr.open('get', 'exmaple.php', true)

xhr.timeout = 10000;
xhr.ontimeout = function(){

}

//  发送
xhr.send(null)

//  
xhr.getResponseHeader('header')
xhr.getAllResponseHeaders()
//  0 1 2 3 4，每次状态改变了都会触发readystatechange
xhr.status 
```


### GET请求
向服务器查询某些信息，必要的参数跟在url后面

### POST请求
向服务器发送应被保存的信息，

### FormData
```js
var data = new FormData()
data.append('name', 'LiuYaxiong')
```

## 跨域资共享

### CROS跨域资源共享
















