### 事件流
事件流描述的是组件从页面中接受事件的顺序


```html
<!DOCTYPE html>
<html>
  <body>
    <div>click me</div>
  </body>
</html>
```


### 事件冒泡
由深层元素向上冒泡，最后冒到document

### 事件捕获
用document捕获，逐渐由由div捕获事件

### DOM事件流
三个阶段：捕获阶段（可以截获事件）；处于目标阶段；冒泡阶段（可以响应）

## 事件处理程序

### DOM0级事件处理
DOM0级方法被认为是元素的方法，因此this指向dom元素
```javascript
//  设置
document.getElementById('myBtn').onclick = function(){

}
//  取消
document.getElementById('myBtn').onclick = null
```

### DOM2级事件处理
DOM2级方法无法移除匿名函数
```javascript
//  true  在捕获阶段处理
//  false 在冒泡阶段处理
var handler = function(){

}
//  设置
document.getElementById('myBtn').addEventListener('click', handler， true)
//  取消
document.getElementById('myBtn').removeEventListener('click', handler, false)
```

## 事件对象
当在dom上触发某个事件的时候，会产生一个event对象

### DOM中的事件对象
浏览器会传入一个event对象到事件处理程序中
```javascript
//  设置
document.getElementById('myBtn').onclick = function(event){
  console.log(event.type) //  click
}
```

### 事件对象的属性
```javascript
$('#myBtn').onclick = function(event){
  event.bubbles           // 表明事件是否冒泡
  event.cancelable        // 表明是否可以取消事件的默认行为
  event.defaultPrevented  // 调用preventDefault就为true
  event.preventDefault()  // 取消事件的默认行为
  event.stopImmediatePropagation()  // 取消事件的就进一步捕获或冒泡，同事组织任何事件
  event.stopPropagation() // 取消事件的就进一步捕获或冒泡

}


```