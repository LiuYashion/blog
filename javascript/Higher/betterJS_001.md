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
原理是通过自定义的http头部，让浏览器与服务器进行沟通，从而决定响应的结果
```text
Origin: http://www.mozilla.com

Access-Control-Allow-Origin: http://www.mozilla.com
```
### JSONP
jsonp由2部分组成，回调函数和数据。
- script标签会返回一个函数，里面包含数据
- 返回函数和回调函数函数名相同，返回函数会带上data
- 当script加载完成后，就会执行回调函数
```js
function handlePesponse(response){
  alert('your ip address: ' + response.ip + ', city: ' + response.city + ' , ' + response.region_name)
}

var script = document.createElement('script')
script.src = 'http://freegeoip.net/json/?callback=handlePesponse'
document.body.insertBefore(script, document.body.firstChild)

//  返回值
//  handlePesponse({ip: "172.96.217.243", country_code: "US", country_name: "United States", region_code: "CA",…});
```

### Websocket

```js
var socket = new WebSocket('ws://www.example.com/server.php')
socket.send('hello world')
socket.onmessage = function(event){
  console.log(event.data)
}
//  onopen onerror onclose
```

## 安全
### CSRF 跨站点请求伪造











