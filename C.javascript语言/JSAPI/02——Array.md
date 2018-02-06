
# Array引用类型
创建一个对象可用2种方式：new 构造函数，数组字面量
```js
var colors = new Array('red', 'brown')
var colors = ['red', 'brown']
```

# 属性和判断
## 1.array.length
不是只读的，可以指定数组长度，从末尾移除或添加数组
```js
var array = [1, 2, 3]
array[99] = 100
array.length // 100，然而[3]~[98]其实都是undefined
```

## 2.Array.isArray()
可以通过Array.isArray()来判断是否为数组
```js
Array.isArray([]) // true
```

## 3.array.indexOf(value) | array.lastIndexOf(value)
检索value在数组中的位置，一个是顺序查找，一个是逆序查找








# 数组操作
## 1.array.push()，array.pop() 
尾部出入
```js
var array = [1,2,3]
array.push(10)          // [1, 2, 3, 10]
var item = array.pop()  // 10 [1, 2, 3]
```

## 2.array.unshift()，array.shift() 
头部出入
```js
var array = [1,2,3]
array.unshift(10)         // [10, 1, 2, 3]
var item = array.shift()  // 10 [1, 2, 3]
```

## 3.array.reverse()，array.sort() 
排序方法
```js
// return true升序
var arr = [3, 6, 9, 10, 1]
arr.sort(function(item1, item2){
  return item1- item2
})
arr         // [1, 3, 6, 9, 10]
arr.reverse // [10, 9, 6, 3, 1]
```

## 4.array.concat(args)
数组拼接
```js
var arr  = [1, 2, 3]
var arr_ = arr.concat(4, [1, [2, 3]])
// arr  [1, 2, 3]
// arr_ [1, 2, 3, 4, 1, [2, 3]]
```

## 5.array.slice(start, end)
按开始，结束截取（原数组不变）
```js
var arr  = [1, 2, 3, 4, 5]
var arr_ = arr.slice(1, 4)
var ar__ = arr.slice(1)
// arr  [1, 2, 3, 4, 5]
// arr_ [2, 3, 4]
// ar__ [2, 3, 4, 5]
```


## 6.array.splice(start, length, insert)；
按开始，长度截取（原数组改变）
```js
/** length不传，默认截取至末尾 */
var arr  = [1, 2, 3, 4, 5]
var arr_ = arr.splice(1, 2)
// arr  [1, 4, 5]
// arr_ [2, 3]


/** 使用适当参数能够实现插入效果 */
var arr  = [1, 2, 3]
var arr_ = arr.splice(1, 0, 5, 6)
console.log(arr, arr_)
// arr  [1, 5, 6, 2, 3]
// arr_ []


/** 使用适当参数能够实现替换效果 */
var arr  = [1, 2, 3]
var arr_ = arr.splice(1, 2, 5, 6)
console.log(arr, arr_)
// arr  [1, 5, 6]
// arr_ [2, 3]
```





# 数组迭代
这些方法都不改变原数组，这些都是es5方法

## 1.array.every((item, index, array)=>{})
每个function返回true，结果才为true

## 2.array.some((item, index, array)=>{})
function返回包含true，结果就为true

## 3.array.filter((item, index, array)=>{})
返回return为true的item组成的新数组

## 4.array.forEach((item, index, array)=>{})
遍历每个item，没有返回值，也无法break

## 5.array.map((item, index, array)=>{})
遍历每个item，return的值组成一个新数组

```js
var arr = [1, 2, 3, 4, 5]
var everyResult = arr.filter((item, index, array)=>{
  return item%2
})
console.log(arr)          //  [1, 2, 3, 4, 5]
console.log(everyResult)  //  [1, 3, 5]
```


# 数组递归

## 1.array.reduce((prev, item, index, array)=>{})
在最前面加了一个参数，表示上一次调用的结果。
```js
var array = [1, 2, 3]
var sum = array.reduce(function(prev, curr, index, array){
  return (prev + curr)*2
})
console.log(sum) // 18
// ((1+2)*2+3)*2
```

## 2.array.reduceRight((prev, item, index, array)=>{})
和上面的区别就是从右往左reduce

