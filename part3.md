# 面向对象

## 概念
对象是一个无序属性的集合

# 创建对象
```
var personA  = new Object()
personA.name = 'Koa' 
personA.talk = function(){
    console.log( this.name )
}

var personB = {
    name: 'Von',
    talk: function(){
        console.log( this.name )
    }
}
```

# 属性类型
es有2种属性：数据属性，访问器属性

## 数据属性
数据属性有4个特性，

- [[Configurable]]能否删除属性，修改属性特性
- [[Enumerable]]能否被for-in遍历
- [[Writable]]值能否被修改
- [[Value]]数据值

要修改属性默认的特性，必须用
```
Object.defineProperty(object, key, {
    configurable: false
    ....
})

```
*一旦configurable设置为了false，就不能够再改回来*


## 访问器属性
访问器属性也有4个特性：

- [[Configurable]]
- [[Enumerbale]]
- [[Get]]读取属性时，调用的函数
- [[Set]]写入属性时，调用的函数





