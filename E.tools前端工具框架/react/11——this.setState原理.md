

https://juejin.im/post/599b8f066fb9a0247637d61b
# setState背后的原理
调用setState的时候，ReactComponent就会把这个newstate存入自己的等待队列，查看自己是否正在批量更新之中
如果组件已经处于更新流，那么就把组件push进脏组件；如果没有处于更新之中，就遍历所有的脏组件，进行更新
```js

// react/lib/ReactComponent.js
ReactComponent.prototype.setState = function (partialState, callback) {
  //调用setState的时候，将partialState存入等待队列
  this.updater.enqueueSetState(this, partialState);
  if (callback) {
    this.updater.enqueueCallback(this, callback, 'setState');
  }
}

// react-dom/lib/ReactUpdateQueue.js
var ReactUpdateQueue = {
  enqueueSetState: function (publicInstance, partialState) {
      
    // 获取React Component的内部实例，在comp._reactInternalInstance属性上存储着
    var internalInstance = getInternalInstanceReadyForUpdate(publicInstance, 'setState');

    if (!internalInstance) {
      return;
    }

    // 将state插入到内部component实例的state队列中
    var queue = internalInstance._pendingStateQueue || (internalInstance._pendingStateQueue = []);
    queue.push(partialState);

    // 处理更新
    enqueueUpdate(internalInstance);
  }
}

function enqueueUpdate(internalInstance) {
  ReactUpdates.enqueueUpdate(internalInstance);
}

// ReactUpdates.js
function enqueueUpdate(component) {
  // 如果组件【没有】处于更新状态
  if (!batchingStrategy.isBatchingUpdates) {
    // 遍历更新脏组件，调用updateComponent，更新state
    batchingStrategy.batchedUpdates(enqueueUpdate, component);
    return;
  }

  // 如果正在更新中，那就只是保存组件，下次更新
  dirtyComponents.push(component);
}





// ReactDefaultBatchingStrategy
var ReactDefaultBatchingStrategy = {
  isBatchingUpdates: false,

  batchedUpdates: function (callback, a, b, c, d, e) {
    var alreadyBatchingUpdates = ReactDefaultBatchingStrategy.isBatchingUpdates;

    ReactDefaultBatchingStrategy.isBatchingUpdates = true;

    if (alreadyBatchingUpdates) {
      return callback(a, b, c, d, e);
    } else {
      return transaction.perform(callback, null, a, b, c, d, e);
    }
  }
};
// transaction
```