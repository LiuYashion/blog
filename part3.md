
## 创建
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
> *一旦configurable设置为了false，就不能够再改回来，因为已经不允许修改属性了*

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
### 1.3 定义多个属性
批次定义多个属性，_year和edition是数据属性，year是访问器属性
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

### 1.4 获取属性的特性
只能获取自身的实例属性，想访问原型属性的描述符，就必须在原型对象上使用
```javascript
Object.getOwnPropertyDescriptor(object, key)
```


---
## 定义对象

从上面可以看出，每创建一个对象，都要手写很多代码，所以需要一种模式帮助我们创建对象
 
### 2.1 工厂模式
可以看出，工厂模式就是一个包装，尽管解决了创建问题，但是没解决对象的识别问题，我们不知道对象的类型（creatPerson）
```javascript
function creatPerson(name, age, job){
  var _p  = new Object();
  _p.name = name;
  _p.age  = age;
  _p.sayName = function(){
    alert(this.name, this.age)
  }
  return _p
}
var person1 = new creatPerson('lyx', 18, 'code')

// person1 instanceof creatPerson : false
```

### 2.2 构造函数模式
类似于Object，Array这种由运行环境提供的原生构造函数，我们也可以自己写自定义构造函数
```javascript
function Person(name, age){
  this.name = name;
  this.age  = age;
  this.sayName = function(){
    alert(this.name)
  }
}
var person1 = new Person('Clay', 18)

console.log( person1 instanceof Person )  // true  
console.log( person1 instanceof Object )  // true  
```

>  *当我们执行new的时候，到底发生了什么？*
> ```javascript
> var person1 = new Person('Clay', 18)
> 
> //JavaScript 实际上执行的是：
> var person1 = new Object();  
> person1.__proto__ = Person.prototype;
> Person.call(person1, 'Clay', 18);
> ```
> 
> *我们可以发现：构造函数没有显式创建对象，直接把属性复制给this，没有return。所以当我们通过> new显式调用构造函数，会经历下面的过程：*
> 
> - *创建一个新对象(Object的实例)*
> - *新对象的原型链指向了Person构造函数的原型*
> - *把构造函数Person的作用域赋给新对象(this就指向了该对象)，然后执行构造函数(Person内的代码，给this添加属性)*
> - *返回新对象(赋值给person1)*


### 2.2.1 关于构造函数
构造函数使用起来，和普通函数没有什么区别。同事构造函数还有一些问题：其生成的每个对象，sayName对应的function是2个不同的实例，下面的方法可行，但是sayName被放在全局作用域下，没有封装性可言：
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

> 由前面可知，object都会有一个constructor属性，这个属性指回构造函数，也就是Person
> ```javascript
> Person.constructor            //  ƒ Function(){}
> person1.constructor           //  ƒ Person(name, age){..}
> person1.__proto__.constructor //  ƒ Person(name, age){..}
> ```

## 2.0 先介绍一下prototype，__proto__，constructor
每个函数都有prototype，对象都有__proto__

创建函数的时候，js会自动为其添加prototype属性，值是一个空对象，既然是对象，那就会有constructor属性，这个属性要指回构造函数


### 2.3 原型模式
原型模式很好的解决了，function共享，代码不存放于全局的问题
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
> 原型链的涉及到继承，属性访问当前对象没有，就会顺着原型链访问

### 2.3.1 原型属性和实例属性
当我们设置实例上的属性name，即时设置为null，也无法访问到原型链中的同名属性，设置的同事就已经屏蔽了原型上的属性，除非delete实例上的这个属性


### 2.4 属性检测
```javascript
person1.hasOwnProperty('name')  // 自己的属性为true，来自原型的为false
'name' in person1               // 只要属性能够访问，就为true
```

> for-in，能遍历可枚举的实例属性和原型属性，所有开发人员定义的属性都是可枚举的


### 2.5 属性获取
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

//  可枚举属性
Object.keys(person1) // ["name"]
Object.keys(Person.prototype) // ["name", "age", "sayName"]
Object.keys(Person) // []

//  不可枚举属性
Object.getOwnPropertyNames(person1) // ["name", "age", "sayName"]
Object.getOwnPropertyNames(Person.prototype) // ["constructor", "name", "age", "sayName"]
Object.getOwnPropertyNames(Person) // ["length", "name", "arguments", "caller", "prototype"]
```


### 2.6 更简单的原型模式
每添加一个属性或者方法就要写，Person.prototype...，这样很繁杂，那就重新prototype吧
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
var person1 = new Person()
```

但是这里，我们相当于对Person.prototype进行了重写，这种z字面量创建的方式最终结果相同，然而漏了每个object都有的constructor属性，Person.prototype的constructor要指向构造函数Person

```javascript
Object.defineProperty(Person.prototype, 'constructor', {
  enumerable:false,
  value: Person
})
```

### 2.7 动态性问题
因为根据动态原型链访问，所以对于原型链的修改能够在实例上体现，但是如果我们整体重写了prototype，可能就会出现问题了
```javascript
function Person(){

}
var friendA = new Person()

Person.prototype.sayHi = function(){
  console.log('hi')
}
Person.prototype = {
  name: 'Clay',
  age: 19,
  sayName: function(){
    console.log(this.name)
  }
}
friendA.sayName() // error
```
这里sayHi可以继续访问，sayName不行，这样想：Person.prototype.sayHi使得我们向原型链中添加了sayHi方法，但是prototype的复写，并不会让复写对象被添加进去，仅仅只是指针指向的内存变了而已

### 2.8 原生对象的原型
Object，Array，String等，都是在其构造函数的原型上定义了方法，如Array.prototype的sort()

### 2.9 原型对象的问题
对象属性可能的取值，基本类型还好，引用类型的修改（function的重写，array的push）就会影响到所有实例了


### 那么，就组合使用构造函数模式和原型模式吧
构造函数（代码不能复用，函数不能共享），原型模式（引用类型共享），那就各取所长吧 
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

var personA = new Person('lyx', 20)
```
这样我们保证了：
- 方法是共享的，对于数组类型的修改，都是基于自身私有的，即：age，name，friend都是在实例上
- sayName是在原型链上，实现了方法共享


---
## 继承
新建对象的时候，我们知道，当前对象没找到属性时，会顺着原型链去访问。那既然这样，让超类的一个实例new SuperType()去做子类的原型SubType.prototype，这样基于该原型生成的子类实例，都能顺着原型链往超类访问了，也就实现了继承

这里再次说明一遍：
> *prototype是函数的属性，在一个函数声明的时候，es就会为其添加一个prototype属性，里面有constructor指向（构造）函数，当然，属性的值是一个对象，__proto__也就不用说了，指向了Object。当这个函数被当做构造函数使用的时候，也就是new，【当我们执行new的时候，到底发生了什么？】：我们把这个原型作为了新实例的超类，然后在新实例上调用了构造函数，也就是说：instance是SubType.prototype的子类，也就是new SuperType()的子类，也就是SuperType实例的子类*

### 1.1 原型链
```javascript
// 超类
function SuperType(){
  this.property = true
}
SuperType.prototype.getSuperValue = function(){
  return this.property
}
// 此时var superA = new SuperType()
// SuperType{
//   property:true,
//   __proto__:{
//     getSuperValue: f(),
//     constructor: SuperType
//     __proto__: Object
//   }
// }

// 子类
function SubType(){
  this.subproperty = false
}
SubType.prototype = new SuperType()
SubType.prototype.getSubValue = function(){
  return this.subproperty
}
// 此时var subA = new SubType()
// SuperType{
//   subproperty:false,
//   __proto__:{
//     getSubValue: f(),
//     __proto__: {
//      getSuperValue: f(),
//      constructor: SuperType
//     }
//   }
// }

var instance = new SubType()
console.log( instance.getSuperValue() ) // true
```
> *这里我们不难看出，SubType的原型，是SuperType的实例。在new的时候，会把构造函数的原型和实例通过原型链链接起来，所以SubType的实例，访问能通过原型链访问到SuperType的实例，从而实现继承。*
> 
> *当instanceof检测原型的时候，先访问SubType.prototype。constructor，如果依然没访问到，这时会顺着原型链继续访问，又会访问到new SuperType()，也就是SuperType的实例，这个实例可以通过supertype.__proto__访问到SuperType.prototype，也就能够访问到原型方法了*

```javascript
function SubType(){
  this.subproperty = false
}
```

### 1.2 默认的原型
instanceof

  用来测试实例与原型链中出现过的构造函数，~~改写constructor没有影响？~~
  ```javascript
  console.log( instance instanceof Object    ) true
  console.log( instance instanceof SuperType ) true
  console.log( instance instanceof SubType   ) true
  ```
isPrototypeOf()
  ```javascript
  console.log( Object.prototype.isPrototypeOf(instance)    ) true
  console.log( SuperType.prototype.isPrototypeOf(instance) ) true
  console.log( SubType.prototype.isPrototypeOf(instance)   ) true
  ```
  
### 1.3 原型链的问题
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

从上面可以知道，不同的实例，共享了new SubType()里面的引用类型（colors）


### 1.4 借用构造函数
> *函数只是一个在特定环境中执行代码的对象*

这里就相当于借用了SuperType的构造函数，即：在SubTypez中借用了SuperType中的代码。而且我们还可以在借用构造函数中，向超类的构造函数传递参数
```javascript
function SuperType(name){
  this.name   = name
  this.colors = ['red', 'blue', 'green', 'brown'];
}

function SubType(){
  SuperType.call(this, 'pygz')
}

var instanceA = new SubType()
instanceA.colors.push('black')
//  colors: ["red", "blue", "green", "brown", "black"]

var instanceB = new SubType()
//  colors: ["red", "blue", "green", "brown"]
```




### 1.5 借用构造函数的问题
然后构造函数也是有问题的：
- 方法都写在构造函数中，所以函数虽一样但是都是不同实例（方法不共享）
- 因为借用了构造函数，所以SubType和SuperType没有联系，在超类型原型中定义的方法，子类型也就不可见了（无法访问超类的方法）

```javascript
function SuperType(name){
  this.name = name
  this.colors = ['red', 'blue', 'green', 'brown'];
  this.sayHi = function(){
    console.log('hi')
  }
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


### 2.1 组合继承
组合继承避免了原型链（array共享，传递参数）和借用构造函数（代码冗余，超类子类无联系）的缺点，结合了：
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
**鉴于组合式继承的优点，它成为了javascript中最常用的继承模式**


### 3.1 原型式继承
new F()的时候，相当生成了一个新对象，由F构造，对象原型链指向F.prototype，也就是obj，我们传入的对象

然而缺点显而易见，这个obj被当做原型共享，所以object里面的array数据也是共享的，一个实例push了，所有实例都会被影响
```javascript
function object(obj){
  function F(){}
  F.prototype = obj
  return new F()
}

// 这句代码和上面的效果一样
Object.create(obj)
```

### 4.1 寄生式继承
寄生模式主要考虑到对象不是自定义类型和构造函数的情况下（通过对象继承），完成继承，任何能够返回新对象的函数，都适用于这种模式，然而寄生式继承也是有不足的，它不能做到函数复用，这点和构造函数模式相似
```javascript
function createAnother(origin){
  var clone = Object.create(origin)
  clone.sayHi = function(){
    console.log('hi')
  }
  return clone
}
```

#### 这里再回顾一次new Person()的时候我们都做了什么
```javascript
function Person(){}
var person = new Object()
person._proto_ = Object.prototype
Person.call(person) 
```

### 5.1 寄生组合式继承
组合式继承作为最普遍的继承方式，也有一点自己的不足，就是在指定原型的时候，会执行一次超类的构造函数。


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

//组合继承生成的SubType实例结构：
{ //SubType
    age: 18,
    colors: ["red", "blue", "green", "brown"],
    name: 'LYX',
    _proto_:{ //SuperType
        colors: ["red", "blue", "green", "brown"],
        name: undefined,
        sayAge: function(){}
        _proto_:{ //Object
            sayName: function(){},
            constructor: SuperType(name){}
            _proto_: Object
        }
    }
}
```

然而对于寄生组合式继承

我们为了指定子类原型，而调用超类构造函数其实是没有必要的，我们不需要colors和name，我们使用超类原型的副本就行了（参考new，我们只需要新建对象，设置好原型链，并不需要call(person)）。我们可以复制一份SuperType.prototype，然后设置好constructor为SubType就行了

务必理解Object.create(target)，并非单纯的复制，而是创建一个object，它的原型链指向target
```javascript

function inheritPrototype(subType, superType){
  var prototype = Object.create(superType.prototype);
  prototype.constructor = subType;
  subType.prototype = prototype
}

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
inheritPrototype(SubType, SuperType)

SubType.prototype.sayAge = function(){
  console.log(this.age)
}

var instanceA = new SubType('LYX', 18)


//寄生组合式继承的SubType实例结构：
{ //SubType
    age: 18,
    colors: ["red", "blue", "green", "brown"],
    name: 'LYX',
    _proto_:{ //SuperType
        constructor: SuperType(name){}
        sayAge: function(){}
        _proto_:{ //Object
            sayName: function(){},
            _proto_: Object
        }
    }
}

```


*这样我们只用调用一次superType构造函数，就是在实例化对象的时候*


### 4.1 ES6继承方式
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