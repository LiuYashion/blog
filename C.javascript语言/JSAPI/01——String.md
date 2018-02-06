
# String引用类型

## 索引方法
```js
var str = 'Hello World'
str.charAt(1) // e
```

## 操作方法
```js
var str = '   Hello World'
str.concat('!!!') // '   Hello World!!!'
str.trim()        // 'Hello World'
str.toLowerCase() // 'hello world'
str.toUpperCase() // 'HELLO WORLD'
```



## 创建方法
```js
var str = 'Hello World'
str.slice(1, 2) //  e
str.slice(1,-2) //  ello Wor

str.substr(1, 2) //  el
str.substr(-3,2) //  rl
//如果是负数，start加上字符串长度, end+1变成0

str.substring(1, 4) // ell
str.substring(1,-4) // H
//如果是负数，变成0，总是小的靠前
```

    
## 位置方法
```js
var str = 'Hello World'
str.indexOf(value, from)
str.lastIndexOf(value, from)
```


## 匹配方法
```js
var str = 'Hello World'
str.search(/orld/)          // 7
str.replace(/old/, /new/)   // 只替换一个
str.replace(/old/g, /new/)  // 全局替换
str.split('o', 2)           // ["Hell", " W"] 只取前两个
```