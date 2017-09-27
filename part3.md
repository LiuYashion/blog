## 面向对象
对象是一个无序属性的集合

### 1.1 创建对象
我们可以通过下面2种方法创建对象
- 构造函数
- 对象字面量
```javascript
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

### 1.2 属性类型
对象必定会有属性，es有2种属性：
- 数据属性
- 访问器属性

### 1.2.1 数据属性
比较常见的属性，数据属性有4个特性：
- [[Configurable]]能否删除属性，修改属性特性
- [[Enumerable]]能否被for-in遍历
- [[Writable]]值能否被修改
- [[Value]]数据值

如果我们要修改数据属性的特性，那就就需要：
> 一旦configurable设置为了false，就不能够再改回来，因为已经不允许修改属性了
```javascript
var person = {
  name:'tom'
};
Object.defineProperty(person, name, {
    writable: false
})

person.name = 'jery';
console.log(emp.name);
```


### 1.2.2 访问器属性
访问器属性也有4个特性：
- [[Configurable]]
- [[Enumerbale]]
- [[Get]]读取属性时，调用的函数
- [[Set]]写入属性时，调用的函数
```javascript
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

```
### 1.3定义多个属性

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



# 继承

## 原型链

```javascript
function SuperType(){
  this.property = true
}
SuperType.prototype.getSuperValue = function(){
  return this.property
}

function SubType(){
  this.subproperty = false
}
SubType.prototype = new SuperType()
SubType.prototype.getSubValue = function(){
  return this.subproperty
}

var instance = new SubType()
console.log( instance.getSuperValue() ) // true



```
上面修改的一个地方就是
```javascript
SubType.prototype = new SuperType()

// SubType.prototype === subtype1.__proto__
```



*SubType.prototype本来指向SubType的实例，经过修改之后，指向了SuperType的实例*

*也就是说，SuperType中的方法，也存在于SubType.prototype中，在确定继承关系后，我们再给SubType.prototype添加方法，就相当于在继承了SuperType的基础上，又添加了新方法*

*这时当instance访问一个方法的时候，先访问SubType.prototype，如果依然没访问到，这时会顺着原型链继续访问，又会访问到new SuperType()，也就是SuperType的实例，这个实例可以通过supertype.__proto__访问到SuperType.prototype，也就能够访问到原型方法了*



## 默认的原型
- instanceof

  用来测试实例与原型链中出现过的构造函数
  ```javascript
  console.log( instance instanceof Object    ) true
  console.log( instance instanceof SuperType ) true
  console.log( instance instanceof SubType   ) true
  ```
- isPrototypeOf()
  ```javascript
  console.log( Object.prototype.isPrototypeOf(instance)    ) true
  console.log( SuperType.prototype.isPrototypeOf(instance) ) true
  console.log( SubType.prototype.isPrototypeOf(instance)   ) true
  ```
  
## 原型链的问题
- 所有实例会共享其原型的引用类型属性
- 子类无法在不影响其他实例的条件下，给超类的构造函数传递参数

```javascript
function SuperType(){
  this.colors = ['red', 'blue', 'green', 'brown']
}
function SubType(){

}

SubType.prototype = new SuperType()

var instanceA = new SubType()
instanceA.colors.push('black')

console.log(instanceA.colors)
// ["red", "blue", "green", "brown", "black"]

var instanceB = new SubType()
console.log(instanceB.colors)

// ["red", "blue", "green", "brown", "black"]
```

从上面可以知道，不同的实例，共享了new SubType()里面的引用类型

## 借用构造函数的问题
- 方法都写在构造函数中，所以函数虽一样但是都是不同实例
- 在超类型原型中定义的方法，子类型也是不可见的，SubType和SuperType没有联系，也就访问不到了

```javascript
function SuperType(name){
  this.name = name
  this.colors = ['red', 'blue', 'green', 'brown'];
  
}
SuperType.prototype.sayHi = function(){
  console.log('hello~')
}

function SubType(){
  SuperType.call(this)
}

var instanceA = new SubType()
instanceA.colors.push('black')
//  colors: ["red", "blue", "green", "brown", "black"]

var instanceB = new SubType()
//  colors: ["red", "blue", "green", "brown"]

```

所以我们需要：

# *组合继承*
组合继承避免了原型链和借用构造函数的缺点，结合了：
- 原型链，实现了原型属性和方法（name，sayName）的继承
- 借用构造函数，实现了对实例属性（colors）的继承
- 而且使用instanceof，inPropertyOf也能够识别构造函数
```javascript
function SuperType(name){
  this.name = name
  this.colors = ['red', 'blue', 'green', 'brown'];
  
}
SuperType.prototype.sayName = function(){
  console.log(this.name)
}

function SubType(name, age){
  SuperType.call(this, name)
  this.age = age
}
SubType.prototype = new SuperType()
SubType.prototype.sayAge = function(){
  console.log(this.age)
}

var instanceA = new SubType('LYX', 18)
instanceA.colors.push('black')
//  age:    18
//  name:   'LYX'
//  colors: ["red", "blue", "green", "brown", "black"]

var instanceB = new SubType('PYGZ', 22)
//  age:    22
//  name:   'PYGZ'
//  colors: ["red", "blue", "green", "brown"]

```

# *原型式继承*
在object内部，先创建了一个临时构造函数F()，然后把obj设置为它的原型，然后返回了构造函数F()的实例，这个新实例，相当于obj的浅复制

*然而缺点显而易见，这个obj被当做原型共享，所以object里面的array数据也是共享的，一个实例push了，所有实例都会被影响*
```javascript
function object(obj){
  function F(){}
  F.prototype = obj
  return new F()
}

// 同理的还有es5中的一个语法来规范原型式继承
Object.create(obj)
```

# *寄生式继承*
寄生模式主要考虑到对象不是自定义类型和构造函数的情况下，完成继承，任何能够返回新对象的函数，都适用于这种模式
```javascript
function createAnother(origin){
  var clone = Object.create(origin)
  clone.sayHi = function(){
    console.log('hi')
  }
  return clone
}
```

# *寄生组合式继承*
我们不必为了指定子类型的原型而调用超类构造函数，我们需要的其实只是超类原型的一个副本，所以我们可以这样

- 使用寄生式来继承超类型的原型（获得一个副本）
- 然后再把结果赋给子类型的原型

```javascript

function inheritPrototype(subType, superType){
  var prototype = Obejct.create(superType);
  prototype.constructor = subType;
  subType.prototype = prototype
}


function SuperType(name){
  this.name = name
  this.colors = ['red', 'blue']
}
SuperType.prototype.sayHi = function(){
  console.log('Hi')
}

function SubType(name, age){
  SuperType.call(this, name)
  this.age = age
}

// SubType.prototype = new superType()
// 如果调用上面的，我们会执行2次new superType()，从而给SubType原型添加上name和color
// 其实这些是不需要的
inheritPrototype(SubType, SuperType)

SubType.prototype.sayAge = function(){
  console.log(this.name)
}

```
*这样我们只用调用一次superType构造函数，就是在实例化对象的时候*


# ES6继承方式
比较简单直观，从例子可以看出，能够覆盖父类方法，并且能够访问到父类方法
```javascript

  class Parents{
    constructor(name){
      this.name = name
    }
    parent(){
      console.log('parents: ', this.name)
    }
    sayName(){
      console.log('parents: ', this.name)
    }
  }

  class Child extends Parents{
    constructor(name, parentName){
      super(parentName) // 表示调用父类的constructor
      this.name = name
    }
    sayName(){
      console.log('child：', this.name)
    }
  }

  const child = new Child('son', 'father')
  child.sayName() //  child： son
  child.parent()  //  parents:  son

  const parent = new Parents('father')
  parent.sayName() // parents:  father
```