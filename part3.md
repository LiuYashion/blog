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
```javascript
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
```javascript
Object.defineProperty(object, key, {
    get: function(){
      return this._year
    },
    set: function(newVal){
      this._year = newVal
    }
})

```
## 定义多个属性

```javascript
Object.defineProperties(book, {
  _year: {
    value: 2004
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

## 读取属性的特性
这个key只能调用自己的实例属性，想访问原型属性的描述符，就必须在原型对象上使用
```javascript
Object.getOwnPropertyDescriptor(object, key)
```

## 定义对象
从上面可以看出，每创建一个对象，都要手写很多代码，So：

- 工厂模式

  尽管解决了创建问题，但是没解决对象的识别问题，我们不知道对象的类型
```javascript
function creatPerson(name, age, job){
  var _p  = new Person();
  _p.name = name;
  _p.age  = age;
  _p.sayName = function(){
    alert(this.name, this.age)
  }
  return _p
}
```

- 构造函数模式

  Object，Array这种原生构造函数，是由运行环境提供，我们也可以自己写自定义构造函数

```javascript
  function Person(name, age){
    this.name = name;
    this.age  = age;
    this.sayName = function(){
      alert(this.name)
    }
  }

  var person1 = new Person('Clay', 18)
```
*对比发现，构造函数没有显式创建对象，直接把属性复制给this，没有return，当我们通过new 显式调用构造函数，会经历下面的过程*

- *创建一个新对象*
- *把构造函数的作用域赋给新对象*
- *执行构造函数*
- *返回新对象*

*由前面可知，object都会有一个constructor属性，保存创建当前对象的函数，也就是Person*

```javascript
console.log( person instanceof Person )  // true  
console.log( person instanceof Object )  // true  
```

## 关于构造函数

- 使用构造函数
  
  构造函数使用起来，和普通函数没有什么区别

- 构造函数的问题

  其生成的每个对象，sayName对应的function是2个不同的实例，下面的方法可行，但是sayName被放在全局作用域下，没有封装性可言

  ```javascript
  function Person(name, age){
    this.name = name;
    this.age  = age;
    this.sayName = sayName
  }
  function sayName(){
    alert(this.name)
  }
  var person1 = new Person('Clay', 18)
  ```

## 原型模式
原型模式很好的解决了这个问题
```javascript
  function Person(){

  }

  Person.prototype.name = 'Clay'
  Person.prototype.age  = 18
  Person.prototype.sayName = function(){
    console.log(this.name)
  }


  var person1 = new Person()

  // person1.__proto__ === Person.prototype
  // person1.__proto__.constructor === Person
  // Person.prototype.isPrototypeOf(person1) 
```
*原型链的关系需要好好理解*

当我们修改了实例上的属性name，即时设置为null，也无法访问到原型链中的同名属性，除非delete实例上的这个属性


## 属性检测
- 自己的属性为true，来自原型的为false
  ```javascript
  person1.hasOwnProperty('name') 
  ```

- 只要属性能够访问，就为true
  ```javascript
  console.log( 'name' in person1 )
  ```

- for-in，能遍历可枚举的实例属性和原型属性，所有开发人员定义的属性都是可枚举的


## 属性获取

```javascript
function Person(){

}

Person.prototype.name = 'Clay'
Person.prototype.age  = 18
Person.prototype.sayName = function(){
  console.log(this.name)
}

var person1 = new Person()
person1.name = 'Lyx'

```
可枚举属性
```javascript

Object.keys(person1)
// ["name"]

Object.keys(Person.prototype)
// ["name", "age", "sayName"]

Object.keys(Person)
// []
```

不可枚举属性
```javascript
Object.getOwnPropertyNames(person1)
// ["name", "age", "sayName"]

Object.getOwnPropertyNames(Person.prototype)
// ["constructor", "name", "age", "sayName"]

Object.getOwnPropertyNames(Person)
// ["length", "name", "arguments", "caller", "prototype"]
```


## 更简单的原型模式
```javascript
function Person(){

}
Person.prototype = {
  name: 'Clay',
  age: 19,
  sayName: function(){
    console.log(this.name)
  }
}
```
但是这里，我们相当于对Person.prototype进行了重写，以前Person.prototype存储了Person，考虑到不能枚举，可以如下补充

```javascript
Object.defineProperty(Person.prototype, 'constructor', {
  enumerable:false,
  value: Person
})
```

## 动态性问题
因为根据动态原型链访问，所以对于原型链的修改能够在实例上体现，但是如果我们整体重写了prototype，实例就无法通过__proto__访问到了

*person1.__proto__ === Person.prototype*

```javascript
var friend = new Person()
Person.prototype.sayHi = function(){
  console.log('hi')
}
friend.sayHi() // fine

Person.prototype = {
  name: 'Clay',
  age: 19,
  sayName: function(){
    console.log(this.name)
  }
}
```

## 原生对象的原型
Object，Array，String等，都是在其构造函数的原型(就是它的prototype)上定义了方法，如Array.prototype的sort()

## 原型对象的问题
对象属性可能的取值，基本类型还好，引用类型的修改（function的重写，array的push）就会影响到所有实例了

## 那么，就组合使用构造函数模式和原型模式吧
```javascript
function Person(name, age){
  this.name = name
  this.age  = age
  this.friends = ['Allen', 'Cindy']
}

Person.prototype = {
  constructot: Person,
  sayName: function(){
    console.log(this.name)
  }
}
```
这样我们保证了方法是共享的，对于数组类型的修改，都是基于自身私有的

```



