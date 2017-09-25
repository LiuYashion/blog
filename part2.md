# 引用类型
对象是某个特定引用类型的实例，新对象是通过new关键字，用构造函数创造出来的

# *Object引用类型*
创建一个对象可用2种方式：
- new 构造函数
- 对象字面量
```
var person  = new Object()
var person_ = {}
```

---
# *Array引用类型*
创建一个对象可用2种方式：
- new 构造函数
- 数组字面量
```
var colors  = new Array('red', 'brown')
var colors_ = ['red', 'brown']
```

array的一些属性：
- length：array.length不是只读的，可以指定数组长度，从末尾移除或添加数组
```
var array_ = [1, 2, 3]
array_[99] = 100
array_.length // 100，然而[3]~[98]其实都是undefined
```

数组的检测：
- 对于instanceof

  由于instanceof用于判断是否为实例，那么当环境中存在不同版本的Array构造函数，所以可以通过Array.isArray()来判断
```
// instanceof用于判断A是否为B的实例
function Foo(){} 
var foo = new Foo(); 
console.log(foo instanceof Foo) // true

console.log(Object instanceof Object);      //  true 
console.log(Function instanceof Function);  //  true 
console.log(Number instanceof Number);      //  false 
console.log(String instanceof String);      //  false 
console.log(Function instanceof Object);    //  true 

```

栈方法：
- push()  入栈
- pop() 出栈

队列方法：
- unshift() 入队
- shift() 出队

排序方法：
- reverse()
- sort()
```
var arr = [3, 6, 9, 10, 1]
arr.sort(function(item1, item2){
  return item1- item2
})
console.log(arr) // [1, 3, 6, 9, 10]
```

操作方法：
- concat(arg..)
```
var arr  = [1, 2, 3]
var arr_ = arr.concat(4, [1, 2])
// arr  [1, 2, 3]
// arr_ [1, 2, 3, 4, 1, 2]
```

- slice(start, end)
```
var arr  = [1, 2, 3, 4, 5]
var arr_ = arr.slice(1, 4)
var ar__ = arr.slice(1)
// arr  [1, 2, 3, 4, 5]
// arr_ [2, 3, 4]
// ar__ [2, 3, 4, 5]
```

- splice(start, length, insert)
  - 删除，length不传，默认截取至末尾
  ```
  var arr  = [1, 2, 3, 4, 5]
  var arr_ = arr.splice(1, 2)
  // arr  [1, 4, 5]
  // arr_ [2, 3]
  ```

  - 插入
  ```
  var arr  = [1, 2, 3]
  var arr_ = arr.splice(1, 0, 5, 6)
  console.log(arr, arr_)
  // arr  [1, 5, 6, 2, 3]
  // arr_ []
  ```

  - 替换，删除掉和替换同等长度的元素即可
  ```
  var arr  = [1, 2, 3]
  var arr_ = arr.splice(1, 2, 5, 6)
  console.log(arr, arr_)
  // arr  [1, 5, 6]
  // arr_ [2, 3]
  ```

位置方法：
检索value在数组中的位置，一个是顺序查找，一个是逆序查找
- indexOf(value)
- lastIndexOf(value)

迭代方法：

function(item, index, array)
- every()
  每个function返回true，结果才为true

- some()
  每个function返回true，结果才为true

- filter()
  返回return为true的item组成的新数组

- forEach()
  遍历每个item，没有返回值

- map()
  遍历每个item，return的值组成一个新数组


  
```
var arr = [1, 2, 3, 4, 5]

var everyResult = arr.filter((item, index, array)=>{
  return item%2
})

console.log(arr)          //  [1, 2, 3, 4, 5]
console.log(everyResult)  //  [1, 3, 5]


```


缩小方法：

- reduce()

  在最前面多了一个参数，先前操作的返回值，后面一样
```
var values = [1, 3, 5, 7, 9]
var sum = values.reduce(function(prev, item, index, array){
  console.log(prev, item, index, array)
  return prev + curr
})
console.log(sum)
```
- reduceRight()

  和上面的区别就是从右往左reduce

# *Date引用类型*
...

# *RegExp引用类型*


# *Function引用类型*

- 函数声明和函数表达式
- 函数可以作为值（return）
  
  下面两种申明方法没有明显差别（在作用域提升上，var的会优先声明，第二种会申明，同时完成初始化)
```
var sum = function(){

}

function sum(){

}
```

- 函数内部属性
  - arguments：类数组对象，里面存有函数传入的所有参数
    - arguments.callee：指向拥有这个arguments对象的函数，用于回调自身时解除耦合性。
    - arguments.callee.caller：保存的调用当前函数的函数的引用
    
  - this：this指向函数内部的环境对象，函数在运行之前都无法确定this会指向什么，函数名只是一个指针，指向一个内存地址

- 函数的属性
  - length：参数个数
  - prototype：保存自身实例方法的所在，该属性无法被枚举

- 函数的方法：3个都是给函数绑定上下文
  - call（this, num1, num2）
  - apply（this, [num1, num2]）
    
    上面2个，调用方时，传入上下文和参数
  - bind(this)
    
    给一个方法，绑定上下文

# *基本包装类型*
```
var str1 = "string~"
var str2 = str1.substring(2)
```
这里基本数据类型没有sbustring方法，所以代码执行时，相当于创建了一个临时对象
```
var str1 = new String(str1)
```

*不过一般不建议使用基本包装类型创建对象，这会让人不知道在操作基本数据类型还是object，要注意的是，使用new创建的都是object，使用转型函数创建的j基本数据不变
```
var value = "25"

var number = Number(value)
var object = new Number(value) 

// typeof number // number
// typeof object // object

```

# *Boolean引用类型*
...

# *Number引用类型*
- toFixed()
- toPrecision()
```
var num = 10.3423423
num.toFixed(3)      //  10.342
num.toPrecision(3)  //  10.3

```

# *String引用类型*

- 字符方法
  - charAt()
- 字符串操作方法
  - concat()
  - trim()
  - toLowerCase()
  - toUpperCase()
- 基于字符串创建新字符串
  - slice(start, end+1)
    
    如果是负数，那就加上字符串长度
  - substr()

    如果是负数，start加上字符串长度, end+1变成0
  - substring()

    如果是负数，变成0，总是小的靠前
- 字符串位置方法
  - indexOf(value, from)
  - lastIndexOf(value, from)
- 字符串匹配方法
  - search(/name/)
  - replace(/old/, /new/)只替换一个

    replace(/old/g, /new/)全局替换

  - split(string, length)将字符串切割成数组


# *单体内置对象*

- URL编码方法
  - encodeURL()
  - decodeURL()
  - encodeURLComponent()
  - decodeURLComponent()

- eval(string)
  
  能够把传入的string当做js代码执行，需要严格控制。

- Global对象：取决于js的运行环境，宿主环境提供的一个终极全局对象

- Window对象：web浏览器用来当做全局对象处理的对象，目前浏览器端，window对象除了扮演了global对象的角色之外，还承担了很承担了很多别的任务

# *Math对象*

- Math.max()
- Math.min()
- Math.ceil()   //  进位
- Math.round()  //  四舍五入
- Math.floor()  //  舍位
- Math.random() //  (0, 1)，

要找到数组中的最大值

```
var values = [3, 45, 12, 456]
Math.max.apply(Math, values)
```