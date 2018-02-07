# Promise


## 基本使用
```js
// 任何有promise的代码，都会等待其有结果了再执行
const promise = new Promise(function(resolve, reject) {
  if (/* 异步操作成功 */){
    resolve(value);
  } else {
    reject(error);
  }
});

promise.then(function(value) {
  // success
}, function(error) {
  // failure
});
```



## Promise.race
竞态。谁先完成
```js
const promise = new Promise((resolve, reject)=>{
  setTimeout(() => {
    reject('timeout1111') 
  }, 2000);
})

const advFetch = (requestPromise, timeout = 3000) => {
  let timeoutAction = null;
  const timerPromise = new Promise((resolve, reject) => {
    // promise里面的代码会立刻执行
    setTimeout(() => {
      reject('timeout') 
    }, timeout);
  });
  return Promise.race([requestPromise, timerPromise]);
};

advFetch(promise).then(res=>{
  console.log(res)
})
```






## Promise.resolve
将一个对象包装成promise对象
```js
const p = Promise.resolve($.ajax('/whatever.json'));
p.then(function () {
  // ...
});
```





## setTimeout和then
resolve是在event loop结束的时候执行，setTimeout是在下次event loop开始执行
```js
setTimeout(function () {
  console.log('three');
}, 0);

Promise.resolve().then(function () {
  console.log('two');
});

console.log('one');

// one
// two
// three
```






## Promise.try
传入方法，可以使用then来指定下一步流程
```js
const f = () => console.log('now');
Promise.try(f);
console.log('next');

```


