# 引用类型
对象是某个特定引用类型的实例，新对象是通过new关键字，用构造函数创造出来的

## *Object引用类型*
创建一个对象可用2种方式：
- new 构造函数
- 对象字面量
```
var person  = new Object()
var person_ = {}
```

---
## *Array引用类型*
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

console.log(ar_, arr__)

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
- every(function)
  每个function返回true，结果才为true
- filter()
  返回return为true的item组成的数组
- forEach()
  遍历每个item，没有返回值
- map()

- some()
  
```
var arr = [1, 2, 3, 4, 5]

var everyResult = arr.every((item, index, array)=>{
  return (item > 2)
})

```


