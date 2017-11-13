## 高级技巧
### 安全的类型检测
因为某个对象可能是原生的，也可能是自定义的对象。所以检测数据类型十分重要
```js
Object.prototype.toString.call(value)
```

### 函数科里化
将一个使用多个参数的函数，转换成多个使用一个参数的函数，的技术

### 防止对象拓展
```js
var person = { name: 'LiuYaxiong' }
Object.preventExtensions(person)
```

### 具体还见js面向对象编程