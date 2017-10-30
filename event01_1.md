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
DOM2级方法无法移除匿名函数，boolean是false时：冒泡获取，ture的时候：捕获获取
```javascript
//  true  在捕获阶段处理
//  false 在冒泡阶段处理
var handler = function(){

}
//  设置
document.getElementById('myBtn').addEventListener('click', handler， boolean)
//  取消
document.getElementById('myBtn').removeEventListener('click', handler, boolean)
```

```html
<div id="d1">
  1111111111
  <div id="d2">
    222222222
    <div id="d3">
      333333333
      <div id="d4">
        4444444444
      </div>
    </div>
  </div>
</div>
```
```javascript
var one   = document.getElementById('d1');
var two   = document.getElementById('d2');
var three = document.getElementById('d3');
var four  = document.getElementById('d4');

var useCapture = true; 

//  true为捕获获取   【父级元素先触发】
//  false为冒泡获取  【目标元素先触发】    

//  默认是false，冒泡获取
one.addEventListener('click', function() {
    console.log(`useCapture: ${useCapture}`, ' | from 1');
}, useCapture);
two.addEventListener('click', function() {
    console.log(`useCapture: ${useCapture}`, ' | from 2');
}, useCapture);
three.addEventListener('click', function() {
    console.log(`useCapture: ${useCapture}`, ' | from 3');
}, useCapture);
four.addEventListener('click', function() {
    console.log(`useCapture: ${useCapture}`, ' | from 4');
}, useCapture); 
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
  event.currentTarget     // 事件正在处理的程序
  event.target            // 事件的目标

  event.preventDefault()            // 取消事件的默认行为
  event.stopImmediatePropagation()  // 取消事件的就进一步捕获或冒泡，同事组织任何事件
  event.stopPropagation()           // 取消事件的就进一步捕获或冒泡
}
```
其中，当我们在documetn.body绑定了一个事件，然后点击上面一个没有事件绑定的按钮
- currentTarget：

指向this，即事件绑定的元素。即document.body，因为事件是绑定到body上面的。

- target：

事件真正的目标。即button，因为我们点击的是按钮。由于按钮上没有注册事件处理程序，cilck事件就冒泡到了document.body。事件在那里得到了处理。


### preventDefault()
比如我们要组织特定时间默认行为，比如想组织链接导航默认功能，那就通过onclick阻止，这样点击的时候就不会跳转了
```html
<a id='link' href="http://www.baidu.com">3333333333</a>
```
```javascript
document.getElementById('link').onclick = function(e){
  e.preventDefault()
}
```

### stopPropagation()
取消进一步的事件捕获或者冒泡，比如绑定在button上的事件，可以通过这个方法，避免传递到注册了这个方法的body，这样body就无法冒泡获取click事件了
```html
<a id='link' href="http://www.baidu.com">3333333333</a>
```
```javascript
document.getElementById('link').onclick = function(e){
  e.stopPropagation()
  console.log('click form link')
}
document.body.onclick = function(e){
  console.log('click form body', e.eventPhase)
}
```



## 事件类型

### UI事件
- load
- unload
- resize
- scroll

### 焦点事件
- blur      失去焦点 不会冒泡
- focus     获得焦点 不会冒泡
- focusin   获得焦点 会冒泡
- focusout  失去焦点 

### 鼠标和滚轮事件
- click
- dbclick
- mousedown   按下了鼠标按钮
- mouseenter  移到该元素触发(不冒泡，且后代无效)
- mouseleave  移出该元素触发(不冒泡，且后代无效)
- mousemove   在元素内部移动触发
- mouseout    移出该元素触发(后代有效)
- mouseover   移入边界触发(后代有效)
- mouseup     在用户施放鼠标按钮触发

- mousewheel  滚轮滚动的时候

### 坐标位置
页面坐标位置
- event.pageX
- event.pageY

客户端坐标位置
- event.clientX
- event.clientY

客户端坐标位置
- event.screenX
- event.screenY


## 键盘与文本事件

### 键盘事件
- keydown   按下任意键触发，长按重复触发
- keypress  按下字符键触发，长按重复出发
- keyup     当用户施放键盘的时候触发
- textInput 只在用户能够输入实际字符时触发

### 键码
回车：key 13

## HTML5事件

### beforeunload
在页面即将卸载时触发
```javascript
window.addEventListener('beforeunload', function(e){
  console.log('---')
  var message = '啊啊啊啊啊啊啊啊啊啊'
  e.returnValue = message
  return message
})
```


### DOMContentLoaded
页面已加载完毕就触发，
```javascript
window.addEventListener('DOMContentLoaded', function(e){
  //  do sth
})
```


### readystateChange
dom准备的几个就阶段
- loading
- loaded
- interactive
- complete

```javascript
document.addEventListener('readystatechange', function(e){
  console.log(document.readyState)
})
```


### hashChange
这个时间添加给window对象，event里面包含：oldURL, newURL, 
```javascript
window.addEventListener('hashchange', function(e){
  console.log(e)
})
```

### 事件委托
对时间处理过多的解决方案就是：事件委托。利用事件冒泡，只指定一个程序，来管理某一类型的所有事件。比如click，一直冒泡到document层次，这样我们可以为整个页面执行一个click事件，而不必给每一个元素绑定
```javascript
document.addEventListener('click', function(e){
  console.log(e.target)
  // switch...
})
```

### 移除事件处理程序









