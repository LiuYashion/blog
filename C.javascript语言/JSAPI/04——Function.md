# Function引用类型
创建函数的方法：函数表达式，函数声明

下面两种申明方法没有明显差别（在作用域提升上，var的会优先声明，第二种会申明，同时完成初始化)
```js
var sum = function(){}
function sum(){}
```




# 内部属性
其实就是作用域的活动对象
```js
var funtion = function(){
  arguments               
  // 类数组对象(有length和索引访问)，里面存有函数传入的所有参数
  arguments.callee        
  // 指向拥有这个arguments对象的函数，用于回调自身时解除耦合性。
  arguments.callee.caller 
  // 保存的调用当前函数的函数的引用
  this                    
  // this指向函数内部的环境对象，函数名只是个指针
}
```



# 函数属性
```js
var expFun = function(){}
expFun.length    //  参数个数
expFun.prototype //  指向自己的原型，该属性无法被枚举
```




# 借用方法
3个都能给函数绑定上下文
```js
var expFun = function(arg1, arg2){
  console.log(arg1, arg2)
}
expFun.call(this, 12, 34)
expFun.apply(this, [12, 34])
expFun.bind(this)
```





# 基本包装类型
基本类型调用方法

```js
var str1 = "string"
var str2 = str1.substring(2)
//这里基本数据类型没有sbustring方法，所以代码执行时，相当于创建了一个临时对象

var str1 = new String(str1)
var str2 = str1.substring(2)
str1 = null
```

不过一般不建议使用基本包装类型创建对象，这会让人不知道在操作基本数据类型还是object(因为typeof的结果都是object)

并且基本包装类型转换为bool值都为true。要注意的是，使用new创建的都是object，使用转型函数（Number(10)）创建的基本数据类型不变

```js
var value = "25"

var number1 = Number(value)
var number2 = new Number(value) 
// typeof number1   number
// typeof number2   object
```