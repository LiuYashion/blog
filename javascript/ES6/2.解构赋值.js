/**
 * @description 
 * 解构赋值定义
 * 允许按照一定模式，从数组和对象中提取值，对变量进行赋值，这被称为解构赋值
 */
let [head, ...tail] = [1, 2, 3, 4];
head // 1
tail // [2, 3, 4]

let [ , , third] = ["foo", "bar", "baz"];
third // "baz"

let [x, y, ...z] = ['a'];
x // "a"
y // undefined
z // []

var {x:y = 3} = {};
console.log(y);//对象没有x，输出默认值
var {x:y = 3} = {x: 5};
console.log(y);//对象有x，输出对于值









/**
 * @description 
 * 解构赋值用途
 */

//  1.交换值
let x = 1;
let y = 2;
[x, y] = [y, x];

//  2.方便取值,提取json数据
function example() {
  return [1, 2, 3];
}
let [a, b, c] = example();

function example() {
  return {
    foo: 1,
    bar: 2
  };
}
let { foo, bar:key } = example();
// foo, key - 1, 2


//  3.函数参数定义
function f([x, y, z]) { 
  // 参数是一组有次序的值
}
f([1, 2, 3]);


function f({x, y, z}) { 
  // 参数是一组无次序的值
}
f({z: 3, y: 2, x: 1});


//  4.函数默认值
function lyxFetch(url, {
  beforeSend = function () {},
  cache = true,
  complete = function () {},
  crossDomain = false,
  global = true,
  // ... more config
}) {
  // ... do stuff
};








/**
 * @description 
 * 解构赋值
 * 这是react-redux中的一段代码
 */
function createConnect({
  connectHOC = connectAdvanced,
  mapStateToPropsFactories = defaultMapStateToPropsFactories,
} = {}){}


// 我们来简化一下：
function createDummyA({a = 100}){
  console.log(a)
}
createDummyA({})

function createDummyB({b = 200} = {}){
  console.log(b)
}
createDummyB()





// // ## 解构参数,重新组合参数
// // ```js

// function wrapper(){
//   var cur = 'LYX'
//   var obj = { type: 'function' }
//   return connect({cur, ...obj})
// }

// function connect(arg){
//   console.log(arg)
// }

// wrapper()

// // //  { cur: "LYX", type: "function" }
// // ```


// // ## 解构参数,重新组合参数2
// // ```js

// function WrapFun(selector, {
//   displayName = 'LiuYaXiong',
// } = {}){
//   console.log(arguments)
// }

// WrapFun('SELECTOR', {
//   type: 'extra',
//   methodName: 'virctor',
// })
// // ```



// // ## 解构赋值
// // ```js



// function connect(propsA, {
//     pureProp = true,
//     ...extraOptions
//   } = {}){
//     console.log(1, arguments)
//     console.log(2, pureProp, extraOptions)
// }

// connect('Liu', {
//   pureProp: 'unknow',
//   extTag: 'tag'
// })

// //  1 ["Liu", { pureProp: "unknow", extTag: "tag" }...]
// //  2 unknow {extTag: "tag"}

// /**
//   通过上面的结果可以看出, arguments的结构很好理解, 即解构赋值并覆盖掉默认值
//   connect参数这种写法, [在设置了默认值的同时, 允许传入参数覆盖掉默认值]
//   注意一下extraOptions里面使用到的key被提取了出来, 只剩下了extTag

console.log('>> finished')
  
//  */

// // ```