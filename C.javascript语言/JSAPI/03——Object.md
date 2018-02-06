# 1.创建对象
对象是一个属性和方法的集合



## 1.1 创建方式
我们可以通过下面2种方法创建对象：构造函数，对象字面量
```js
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





## 1.2 属性类型
对象必定会有属性，属性类型分两种：数据属性，访问器属性




### 1.2.1 数据属性
数据属性一般用于存储值，数据属性有4个特性：
- [[Configurable]]：能否删除属性，修改属性特性
- [[Enumerable]]：能否被for-in遍历
- [[Writable]]：值能否被修改
- [[Value]]：数据值

如果我们要修改数据属性的特性，那就就需要：

```js
var person = {
  name:'tom'
};
Object.defineProperty(person, 'name', {
    writable: false
})

person.name = 'jery';
console.log(person.name); // tom

// 注意：一旦configurable设置为了false，就不能够再改回来，因为已经不允许修改属性了
```



### 1.2.2 访问器属性
访问器属性是set/get操作，访问器属性也有4个特性：
- [[Configurable]]：能否删除属性，修改属性特性
- [[Enumerbale]]：能否被for-in遍历
- [[Get]]读取属性时，调用的函数
- [[Set]]写入属性时，调用的函数
```js
var person = {
　_name: 'tom',
　_age: 20
};
Object.defineProperty(person, 'name', {
    get: function(){
      return this._name;
    },
    set: function(newName){
      this._name = newName
    }
})

var people = {
  _name: 'lora',
  _type: 'girl'
}
Object.defineProperty(people, 'name', {
  enumerable: true
})
for(let key in people){
  console.log(key) // _name _type name
}
```

## 1.3 一次定义多个属性
批次定义多个属性，_year和edition是数据属性，year是访问器属性
```js
var book = {}
Object.defineProperties(book, {
  _year: {
    value: 2004,
    writable:true //需要设置为可写的
  },
  edition:{
    value:0
  },
  year: {
    get: function(){
      return this._year
    },
    set: function(newVal){
      this._year = newVal
    }
  }
})
```


## 1.4 获取属性的特性
只能获取自身的实例属性，想访问原型属性的描述符，就必须在原型对象上使用
```js
Object.getOwnPropertyDescriptor(book, '_year')

// _year
{
  value: 2004,
  writable: false, 
  enumerable: false,
  configurable: false
}

// year
{
  enumerable: false, 
  configurable: false, 
  get: ƒ, 
  set: ƒ
}
```

