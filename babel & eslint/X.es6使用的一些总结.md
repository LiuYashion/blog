# ES6
ES6提升开发效率而且官方支持，从提升技术先进性来说都是建议学习的

## Babel转义
部分浏览器对es6支持不友好，所以需要使用工具来降级为es5语法，这里介绍两款工具

- Babel
- Traceur



### babel-polyfill
babel默认是转换新的语法，不会转换新的api。诸如let const可以编译，但是generator promise等就不会。如果想实现编译，就得使用babel-polyfill，并保证babel-polyfill在执行其他脚本之前就执行。同时因为产出了es5代码，所以又要位于ES5垫片ES5-shim,ES5-sham之后

这里可以选择使用，因为有些api不是必要的，常用的let const 箭头函数等babel已经够用了

至于promise可以使用特定的polyfill来处理



### babel-runtime
包含babel用到的一些工具函数，这是专门抽取出来，防止多次引用造成重复。




### babel的部署和升级