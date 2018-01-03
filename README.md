
## 对于每个conncent组件
- childContextTypes
  给孩子的context类型
- contextTypes
  得到的context类型

## 针对第一次新建connect

```js

constructor(props, context) {
  this.state = {}
  this.store = undefined || context['store']
  //  context由redux提供
  this.propsMode = false
}
getChildContext() {
  return { 
    storeSubscription: undefined
  }
}
initSelector() {
  const sourceSelector = selectorFactory(this.store.dispatch, selectorFactoryOptions)

  this.selector = makeSelectorStateful(sourceSelector, this.store)
  this.selector.run(this.props)
}
```