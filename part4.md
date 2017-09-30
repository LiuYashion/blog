
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
这里表明如下几个对象和概念

对象：
  - 变量对象：执行上下文的创建阶段
  - 活动对象：执行上下文的执行阶段，可以理解为被激活了的变量对象

概念：
  - 多个（执行上下文的变量对象构成的）链表就叫做作用域链
  - 闭包是（有权访问另一个函数作用域中变量的）函数和他的作用域的结合

阶段：
  - 函数创建：这时候根据上下文，就已经定义好了变量对象
  - 函数激活：这时候根据传入的参数，激活变量对象，使之变成活动对象

```javascript
function makeAdder(x) {
  return function(y) {
    return x + y;
  };
}

var add5 = makeAdder(5);
var add10 = makeAdder(10);

console.log(add5(2));  // 7
console.log(add10(2)); // 12
```
通过上面这段代码可以看出，5和10被保存在了闭包之中。add5和add10就是闭包，他们不仅保存了makeAdder中的匿名函数，还保存了不同的环境。

## 这样的原因是：
因为匿名函数对makeAdder的活动对象有引用，所以当makeAdder执行环境销毁的时候，他的活动对象却没有被销毁，所以这个活动对象依旧在内存中。从而形成了闭包。在调用函数的时候，根据传入的参数，我们会激活变量对象，所以add5和add10的激活出来的活动变量不同。


function createFunctions(){
var result = new Array();
for (var i=0; i < 10; i++){
result[i] = function(i){
return function(){
return i;

};
}(i);
}
return result;
}







