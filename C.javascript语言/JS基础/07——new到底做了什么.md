# 当我们执行new的时候，到底发生了什么？

```js
function Person(name, age){
  this.name = name;
  this.age  = age;
  this.sayName = function(){
    alert(this.name)
  }
}

/** 执行下面代码 */
var person1 = new Person('Clay', 18)

/** 实际上执行的是 */
var person1 = new Object();  
person1.__proto__ = Person.prototype;
Person.call(person1, 'Clay', 18);
```


我们可以发现：构造函数没有显式创建对象，直接把属性复制给this，没有return。所以当我们通过new显式调用构造函数，会经历下面的过程：

- 创建一个新对象(Object的实例)
- 新对象的原型链指向了Person构造函数的原型
- 把构造函数Person的作用域赋给新对象(this就指向了该对象)，然后执行构造函数(Person内的代码，给this添加属性)
- 返回新对象(赋值给person1)

