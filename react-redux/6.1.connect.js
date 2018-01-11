



/**
# 对于每个conncent组件
- childContextTypes
  给孩子的context类型
- contextTypes
  得到的context类型
- getChildContext()
  要传给孩子的值
*/

/** 针对最初代码 */
/** 代码 */
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Todo)
/** 帮助 */
TIP(info返回了被处理了的Todo组件){}
/** 实际调用 */
/** 最终结果 */
/** END */



/** 然后再导出为App，放在Provider下，而Provider提供了store（使用了context方式） */
/** 代码 */
const store = createStore(reducer)
render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
)
/** 帮助 */
TIP(info所以一开始odo的props中就有store属性){}
/** 实际调用 */
/**
/** END */


/** 针对第一次新建connect */
/** 代码 */
/** Provider提供 */
getChildContext() {
  return { 
    'store': createStore(reducer), 
    'storeSubscription': null 
  }
}
/** connect提供 */
constructor(props, context) {
  this.state = {}
  this.store = createStore(reducer)
  this.propsMode = false
  //  这里调用了2个方法
  this.initSelector()
  this.initSubscription()
}
getChildContext(){
  return { 
    'storeSubscription': null
  }
}
/** 帮助 */
TIP(info所以一开始，Todo的props中就有store属性){}
/** 实际调用 */
/**
/** END */



/** 参照: onStateChange.md */
/** 代码 */
onStateChange() {
  this.selector.run(this.props)

  if (!this.selector.shouldComponentUpdate) {
    this.notifyNestedSubs()
  } else {
    this.componentDidUpdate = this.notifyNestedSubsOnComponentDidUpdate
    this.setState(dummyState)
  }
}
/** 帮助 */
TIP(info进行props比较需要更新的时候就会触发更新){}
/** 实际调用 */
/**
/** END */




/** 参照: initSelector.md */
/** 代码 */
initSelector() {
  const sourceSelector = selectorFactory(this.store.dispatch, selectorFactoryOptions)
  this.selector = makeSelectorStateful(sourceSelector, this.store)
  this.selector.run(this.props)
}
/** 帮助 */
TIP(info结果: selector根据props和state被附上了不同的属性){}
/** 实际调用 */
/**
/** END */





/** 参照: initSubscription.md */
/** 代码 */
initSubscription() {
  if (!shouldHandleStateChanges) return
  const parentSub = (this.propsMode ? this.props : this.context)[subscriptionKey]
  this.subscription = new Subscription(this.store, parentSub, this.onStateChange.bind(this))
  this.notifyNestedSubs = this.subscription.notifyNestedSubs.bind(this.subscription)
}
/** 帮助 */
TIP(info结果: selector根据props和state被附上了不同的属性){}
/** 实际调用 */
/**
/** END */


/***************************************************************************************/

/** 回到这里, 按照生命周期调用 */
/** 代码 */
componentDidMount() {
  // 1.生成unsubscribe 2.生成listeners
  this.subscription.trySubscribe()
  // 1.和最近一次的props比较，并设置selector的属性
  this.selector.run(this.props)
  if (this.selector.shouldComponentUpdate) this.forceUpdate()
}
/** 帮助 */
/** 实际调用 */
/**
/** END */











/** 回到这里, 按照生命周期调用 */
/** 代码 */
componentDidMount() {
  // 1.生成unsubscribe 2.生成listeners
  this.subscription.trySubscribe()
  // 1.和最近一次的props比较，并设置selector的属性
  this.selector.run(this.props)
  // 1.第一次调用会更新
  if (this.selector.shouldComponentUpdate) this.forceUpdate()
}
/** 帮助 */
/** 实际调用 */
/**
/** END */






/** 当store中dispatch，导致store中的state改变，执行onStateChange */
/** 代码 */
onStateChange() {
  //  <App/>上面的props 
  this.selector.run(this.props)

  if (!this.selector.shouldComponentUpdate) {
    //不需要更新
    this.notifyNestedSubs()
  } else {
    //需要更新，就在更新后调用this.notifyNestedSubs()
    this.componentDidUpdate = this.notifyNestedSubsOnComponentDidUpdate
    this.setState(dummyState)
  }
}

this.notifyNestedSubs() 
// 这个方法即：调用listen里面所有的方法
// listener里面存放的是addNestedSub(listener)传入的listener
/** 帮助 */
/** 实际调用 */
/**
/** END */





/** 当store中dispatch，导致store中的state改变，执行onStateChange */
/** 代码 */
componentDidMount() {
  if (!shouldHandleStateChanges) return

  this.subscription.trySubscribe()
  this.selector.run(this.props)
  if (this.selector.shouldComponentUpdate) this.forceUpdate()
}
componentWillReceiveProps(nextProps) {
  this.selector.run(nextProps)
}
//........................................
/** 帮助 */
/** 实际调用 */
/**
/** END */