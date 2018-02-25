
//  js一直没有模块体系，在es6之前，社区中有了CommonJS和AMD。
//  在es6中，实现了模块功能，可以完全代替前面两种规范
//  

/**
 * module.export && export
 */
//  【module.exports 初始值为一个空对象 {}】
//  【exports 是指向的 module.exports 的引用】
//  【import 返回的是 module.exports 而不是 exports】
//  【所以，可以给exports添加属性，但是不能直接覆盖】


//  下面2种import的方法，都是需要知道module.exports里面的属性值
/**
 * 【A】解构赋值，对应exports.cube
 */
import {cube} from '../../static/tools.js'
/**
 * 【B】解构赋值，同上，只是改名为rename
 */
import {cube as rename} from '../../static/tools.js'



//  下面2中import方法，不需要知道属性名，他们是通过export default导出的
/**
 * 【C】这里引用的是export default暴露出来的部分，如果使用export，会报undefined
 */
import cube from '../../static/tools.js'

/**
 * 【D】这里把所有exports，module.exports，default暴露出来的都放到all里面
 */
import * as all from '../../static/tools.js'

/**
 * 默认暴露出去的，【C】种可命名（cube）引用
 */
export default function(){
  console.log('__')
};
export function fun(){
  console.log('__')
};
export default 10080;
export var a = 10080;

/**
 * 对于require和import
 */
//  require使用简单，module.exports暴露什么就引用什么
    

