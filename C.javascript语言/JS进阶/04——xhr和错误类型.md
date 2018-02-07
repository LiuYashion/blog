## JS调试
```js
try {

} catch(error) {

} finally {

}
```

## 抛出错误
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


## XHR
手写一个XMLHttpRequeste
```js
var xhr = new XMLHttpRequest()
xhr.onreadystatechange = function(){
  console.log(xhr)
}

//  定义请求，bool值是表示是否异步发送请求
xhr.open('get', 'exmaple.php', true)

xhr.timeout = 10000;
xhr.ontimeout = function(){

}

//  发送
xhr.send(null)

xhr.getResponseHeader('header')
xhr.getAllResponseHeaders()
xhr.status 
```



## FormData
```js
var data = new FormData()
data.append('name', 'LiuYaxiong')
```






# 4. Websocket

```js
var socket = new WebSocket('ws://www.example.com/server.php')
socket.send('hello world')
socket.onmessage = function(event){
  console.log(event.data)
}
//  onopen onerror onclose
```







# 5. 安全
## CSRF跨站点请求伪造











