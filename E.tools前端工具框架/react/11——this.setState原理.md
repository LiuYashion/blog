

https://juejin.im/post/599b8f066fb9a0247637d61b

# setState过程
调用setState的时候
ReactComponent就会把这个newstate存入自己的等待队列
查看自己是否正在批量更新之中
如果组件已经处于更新流，那么就把组件push进脏组件
如果没有处于更新之中，就遍历所有的脏组件，进行更新


# setState使用建议
setState用来设置state的子集，永远都只使用setState更改state。你应该将this.state视为不可变数据。
并不能保证this.state会被立即更新，因此在调用这个方法之后访问this.state可能会得到的是之前的值。
不能保证调用setState之后会同步运行，因为它们可能被批量更新，你可以提供可选的回调函数，在setState真正地完成了之后，回调函数将会被执行。


# setState实现

<!-- setState -->
```js

// 我们调用super()，本质上就是调用下面的方法
function ReactComponent(props, context, updater) {
  this.props = props;
  this.context = context;
  this.refs = emptyObject;
  this.updater = updater || ReactNoopUpdateQueue;
}
// 调用setState
ReactComponent.prototype.setState = function (partialState, callback) {
  this.updater.enqueueSetState(this, partialState);
  if (callback) {
    this.updater.enqueueCallback(this, callback);
  }
};

```

<!-- enqueueSetState -->
```js
var ReactUpdatedQueue = {
  enqueueSetState: function (publicInstance, partialState) {

    // 等同于获取react实例的内部表达，包含了内部属性
    // _pendingStateQueue 等待更新队列
    // _pendingCallbacks  更新回调队列
    var internalInstance = getInternalInstanceReadyForUpdate(publicInstance, 'setState');

    if (!internalInstance) {
      return;
    }

    var queue = internalInstance._pendingStateQueue || (internalInstance._pendingStateQueue = []);
    queue.push(partialState);

    enqueueUpdate(internalInstance);
  },
}
```



<!-- enqueueUpdate -->
```js
function enqueueUpdate(internalInstance) {
  ReactUpdates.enqueueUpdate(internalInstance);
}

var ReactUpdates = {
  enqueueUpdate: function enqueueUpdate(component) {
    ensureInjected(); 
    if (!batchingStrategy.isBatchingUpdates) {
      // 如果没有更新，就进行更新
      batchingStrategy.batchedUpdates(enqueueUpdate, component);
      return;
    }
    // 如果正在更新，就放入脏组件
    dirtyComponents.push(component);
  }
}
```





<!-- batchingStrategy -->
批量更新策略，
```js
var ReactDefaultBatchingStrategy = {
  isBatchingUpdates: false,
  batchedUpdates: function(callback, a, b, c, d, e) {
    var alreadyBatchingUpdates = ReactDefaultBatchingStrategy.isBatchingUpdates;
    ReactDefaultBatchingStrategy.isBatchingUpdates = true;
    if (alreadyBatchingUpdates) {
      callback(a, b, c, d, e);
    } else {
      transaction.perform(callback, null, a, b, c, d, e);
    }
  }
};
```




<!-- transaction -->
类似于下面，相当于对函数做了层层包装
- 通过transaction.perform调用
- 调用顺序：initialize；callback；close

```js
function preMethod(){
  console.log('per method excuted')
}

function Wrapper(callback){
  this.isBatchingUpdates = false
  this.callback = callback
}
Wrapper.prototype.initialize = function(){
  console.log('initialize')
  this.isBatchingUpdates = true
  this.callback.call(this)
  this.close()
}
Wrapper.prototype.close = function(){
  console.log('close')

  // flushBatchedUpdates 更新组件 
  ReactUpdates.flushBatchedUpdates.bind(ReactUpdates),

  this.isBatchingUpdates = false
}

var transaction = {
  perform: function(callback){
    return new Wrapper(callback)
  }
}

var foo = transaction.perform(preMethod)
foo.initialize()
```


# 更新组件
flushBatchedUpdates涉及到vitual到真实dom的映射
```js
//代码有省略
var flushBatchedUpdates = function() {
  while (dirtyComponents.length) {
    if (dirtyComponents.length) {
      var transaction = ReactUpdatesFlushTransaction.getPooled();
      transaction.perform(runBatchedUpdates, null, transaction);
      ReactUpdatesFlushTransaction.release(transaction);
    }
    //......
  }
}
```



# 总结
```js
this.setState({value: this.state.value + 1});
this.setState({value: this.state.value + 1});
```
这里调用了两次setState。
由于是批量更新，两次this.state.value的值其实是一样的，无法达到我们的目的。
所以文档中才有：
> 既没有说setState是同步更新或者是异步更新，只是模糊地说到，setState并不保证同步更新