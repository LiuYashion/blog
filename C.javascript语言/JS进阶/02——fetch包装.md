

## fetch包装
这里自己新建了一个promise，当超时未返回结果通过竞态返回它
```js
require('whatwg-fetch');

// 传入promise对象，超时时间
const _fetch = (requestPromise, timeout = 60000) => {
  //  用于在超时的时候，返回一个promise
  let timeoutAction = null;

  const timerPromise = new Promise((resolve, reject) => {
    timeoutAction = () => {
      reject('timeout');
    }
  });

  setTimeout(() => {
    timeoutAction()
  }, timeout);

  /** 竞态 */
  return Promise.race([requestPromise, timerPromise]);
};
```




## 状态检测
检查状态码
```js
function checkStatus(response) {
  if (response.status >= 200 && response.status < 300) {
    return response;
  } else {
    let error = new Error(response.statusText);
    error.response = response;
    error.body = response.json();
    throw error;
  }
}
```



## 错误提示

```js
function handleError(err, Toast, callback, fn) {

  if (err === 'timeout') {
    Toast.info('系统超时，请稍后再试');
  } else {
    let msg     = err && err.body;
    let status  = err && err.response && err.response.status;

    if(!fn){
      fn=()=>location.reload();
    }

    switch(status){
      case 400:
        break;
      case 401:
        if (Common.isCrfApp()) {
          location.href = '#Login';
        } else {
          CRFLogin.initialize(fn);
        }
        break;
      case 403:
        Toast.info('您没有权限做此操作，请返回重试！');
        break;
      case 404:
        Toast.info('资源已经移除，访问出错！');
        break;
      case 500:
      case 502:
      case 504:
        Toast.info('哎呀，服务器开小差了，请稍后再试吧!');
        break;
      default:
        msg && msg.then(data => {
          Toast.info(data.message);
        });
    }
    typeof callback==='function'&&callback();
  }

}
```