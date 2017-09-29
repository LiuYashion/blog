
## 函数
### 1.1 定义函数
- 函数声明（函数声明提升）
- 函数表达式

### 2.1 递归
前面讲过调用argument.callee来完成递归，如果在严格模式下不能调用callee，那么就：
```javascript
var factorial = function f(num){
  if(num == 1){
    return 1
  }else{
    return num * f(num -1)
  }
}
```

### 3.1 闭包


```javascript
function returnfunc (propertyName) {
  return function (obj) {            
    return obj[propertyName];         
  };
}

var savefunc = returnfunc("name");    
var result = savefunc({name:"Picasso"});
alert(result);                      

```






闭包是有权访问另一个函数作用域中变量的函数
> 多个执行上下文的变量对象构成的链表就叫做作用域链
### 3.1.1 没闭包的活动对象和变量对象
> 这里我们先来分析，声明并调用一个函数的时候，究竟发生了什么，先普及几个概念：
> - 活动对象：正在被执行和引用的对象
> - 变量对象：执行环境中包含所有变量和函数的对象
> - 作用域链：多个执行上下文的变量对象构成的链表就叫做作用域链
> - scope：保存当前上下文的变量对象
```javascript
function compare(value1, value2){
  if(value1 < value2){
    return -1
  }else if(value1 > value2){
    return 1
  }else{
    return 0
  }
}
var result = compare(5, 10)
```
> 当函数第一次被调用的时候，会：
> - 创建一个执行环境和相应的作用域链，并且把作用域链赋值给内部属性[[scope]]（1）
> - 使用this，arguments等参数，初始化函数的 *活动对象*

全局的对象变量始终存在，但是像compare()这样局部环境的变量对象，则只在函数执行的过程中存在，（1）中可知，创建compare()函数的时候，会为函数创建一个执行环境，然后构建起执行环境的作用域链，此后，作用域的前端又有了一个活动对象（因为有value1和value2），所以这里的活动对象和变量对象是一样的


### 3.1.1 有闭包的活动对象和变量对象
> 在函数A内部定义函数B，会把A的 *活动对象* 添加到B的作用域链，所以下面代码中，内部匿名函数的作用域链中，会包含createComparisonFunction的活动对象。

当匿名函数从createComparisonFunction中返回后，他的作用域链被初始化为活动对象，然后赋值给全局变量对象，这样匿名函数就能访问createComparisonFunction中定义的变量。

这时候虽然createComparisonFunction的执行环境的作用域链被销毁了，但是他的活动对象不会被销毁，因为匿名函数的作用域链仍然在引用这个活动对象，除非这个匿名函数被销毁了，才会施放内存

```javascript
function createComparisonFunction(propertyName){
  return function(object1, object2){
    var value1 = object1[propertyName]
    var value2 = object2[propertyName]
  }

  if(value1 < value2){
    return -1
  }else if(value1 > value2){
    return 1
  }else{
    return 0
  }
}
```