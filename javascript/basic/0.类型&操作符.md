# 基本概念
## script标签
执行脚本时,对html的解析会停止
- async（异步加载,及时执行）
  异步加载脚本，加载完成就执行
- defer（异步加载,延迟执行）
  异步加载脚本，但是会等到页面加载完成再执行


## 数据类型：
- 简单数据类型

  string number boolean undefined null (symbol)

- 复杂数据类型

  object


## typeof关键字
function在js中也是对象,通过typeof判断是对象是否是function

把null理解为是一个没有任何引用的空对象
```js
typeof null               // object
typeof function(){}       // function
typeof []                 // object
typeof Symbol()           // symbol
```



## String
用于表示字符串类型,如果想把某个值变成字符，可以使用 + ""操作

```js
//  toString除了null和undefined，其他都是一样的
var exp1 = 100
var exp2 = false
var exp3 = {}
var exp4 = function(){}
var exp5 = []
var exp6 = ['a','b']
var exp7 = null || undefined   

exp1.toString()        // 100
exp2.toString()        // false
exp3.toString()        // [object Object]
exp4.toString()        // function (){}
exp5.toString()        // ""
exp6.toString()        // a,b
exp7.toString()        // 报错

String( null )          //  null
String( undefined )     //  undefined
String( 100 )           //  100
String( false )         //  false
String( {} )            //  [object Object]
String( function(){} )  //  function (){}
String( [] )            //  ""
String( ['a','b'] )     //  a,b
```

## Number
用于表示整数或者浮点数，超出可表达范围会变成+-Infinity。
NaN表示非数值，isNaN()方法会先把变量转化成数值，再判断。

由下面可见，数值转换很复杂，而且不合理
```js
Number( "" )        //  0
Number( "0" )       //  0
Number( false )     //  0
Number( null )      //  0
Number( undefined ) //  NaN
Number( "444xx" )   //  NaN

parseInt( "0" )       //  0
parseInt( "" )        //  NaN
parseInt( "123abc" )  //  123

parseFloat( "0" )           //  0
parseFloat( "" )            //  NaN
parseFloat( "123abc" )      //  123
parseFloat( "12.12.12abc" ) //  12.12
```



## Boolean
注意bool值为false的若干类型
```js
//  这些bool为false
Boolean( "" )
Boolean( 0 )
Boolean( NaN )
Boolean( undefined )
Boolean( null )
```



## Undefined/Null
undefined表明变量申明了但是没有初始化.下面==相等的原因,只是类型转换的结果
```js
null == undefined //true
```



## Object
对象是一组数据和功能的集合，Object类型是所有它实例的基础
```js
var obj = {}

obj.constructor   
//  保存创建当前对象的函数：function Object() { [native code] }

obj.hasOwnProperty(propertyName)  
//  判断当前对象是否有属性（不包括原型）

obj.isPrototypeOf(object) 
//  用于检查传入对象是否是另一个对象的原型

obj.propertyIsEnumerable(propertyName)  
//  判断属性能否枚举

obj.toLocaleString()  
//  返回对象的字符串表示，和执行环境有关："[object Object]"

obj.toString()  
//  返回对象的字符串表示："[object Object]"

obj.valueOf() 
//  返回最适合该对象的原始值表示(字符串，数字，布尔值)：{}
```


# 布尔操作符
## 逻辑非: !
调用boolean()然后取反
```js
!""         //  true
!0          //  true
!null       //  true
!NaN        //  true
!undefined  //  true
![]         //  false
!{}         //  false
```

## 逻辑与: &&
就远原则，第一个为false，NaN，undefined，null那么就返回对应的
```js
false && true //  false
NaN   && true //  NaN
null  && true //  null
```

## 逻辑或: ||
就近原则，第一个为true就返回对应的，反之返回第二个
```js
true || false //  true
true || NaN   //  true
true || null  //  true
```

## 加减操作符/乘法运算符/除法操作符/相等比较符
计算包含NaN结果就为NaN(加减乘除都是),比较只要包含NaN比较就为false
```javascript
Infinity - Infinity //  NaN
Infinity * 0;       //  NaN
0/0;                //  NaN
x/0;                //  Infinity
null == undefined   //  true
```


## 全等比较符 ===
更加严格，不会转换类型比较






