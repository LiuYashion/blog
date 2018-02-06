# Math对象
```js
Math.max()
Math.min()
Math.ceil()   //  进位
Math.round()  //  四舍五入
Math.floor()  //  舍位
Math.random() //  (0, 1)，

var values = [3, 45, 12, 456]


Math.max(-3, 5, 8, 100)       // 100
Math.max(...values)           // 456
Math.max.apply(Math, values)  // 456
```