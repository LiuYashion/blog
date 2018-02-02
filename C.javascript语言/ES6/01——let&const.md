## 函数立即执行表达式
其实就是函数立即执行表达式，也可以防止全局污染
```js
/** 如此包装的函数会被立即执行 */
for(var i = 0; i < 5; i++) {
  (function(i) {
    setTimeout(function() {
      console.log(i);  
    }, 1000);
  })(i)
}

/** 保证代码的$是入参jQuery */
(function($) { 
  /** ... */
})(jQuery);
```

----



## 1.0 作用域
传统作用域会有变量提升
```js

/** 1. b会被声明为全局变量 */
(function(){
  b = 100;
})();
console.log(b)  //b:100


/** 2. b的本质同上 */
(function(){
  var a = b = 3;
})();
console.log(a, b) //a:undefined, b:3


/** 3. b的声明被提前，只是没初始化 */
(function(){
  console.log( b)         //undefined
  console.log( fun2() )   //200
  console.log( fun1() )   //Uncaught TypeError
  
  var b = 100;

  // 函数表达式和普通变量声明一样，仅提升不初始化
  var fun1 = function(){
    return 100
  }
  // 函数声明会被提升可用
  function fun2(){
    return 200
  }
})();
```

## 2.0 块级作用域
块级作用域通过let const体现

### let
- let声明的变量只在块级({})有效，无变量提升，
- 暂时性死区
```js

/** 输出为1~5，for是一个块级作用域 */
for(let i = 0; i < 5; i++) {
  window.setTimeout(function() {
    window.console.log(i) 
  }, 1000)
}


/** 暂时性死区 */
var test = 1;
function func(){
  console.log(test);  //Uncaught ReferenceError
  let test = 2;
};
func();

```

### 对比一下两个循环
```js

/** var没有块级作用域，所以i在全局被赋值5次 */
for(var i = 0; i < 5; i++) {
  window.setTimeout(function() {
    window.console.log(i) 
  }, 1000)
}
console.log(i) //5


/** let有块级作用域 */
// for就是一个块级作用域
for(let i = 0; i < 5; i++) {
  window.setTimeout(function() {
    window.console.log(i) 
  }, 1000)
}
console.log(i) //Uncaught ReferenceError

```