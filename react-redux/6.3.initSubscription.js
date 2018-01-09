/** 接着第一步sourceSelector */
/** 代码 */
initSubscription() {
  const parentSub = this.context['storeSubscription'];
  this.subscription = new Subscription(this.store, parentSub, this.onStateChange.bind(this))
  this.notifyNestedSubs = this.subscription.notifyNestedSubs.bind(this.subscription)
}
/** END */





/** 接着第一步sourceSelector */
/** 代码 */
this.subscription = new Subscription(this.store, parentSub, this.onStateChange.bind(this))
/** 帮助 */
(新建Subscription)
/** 实际调用 */
const CLEARED = null
const nullListeners = { notify() {} }

function createListenerCollection() {

  let current = []
  let next    = []

  return {

    //  重置
    clear() {
      next = CLEARED
      current = CLEARED
    },

    //  通知调用所有的监听方法
    notify() {
      const listeners = current = next
      for (let i = 0; i < listeners.length; i++) {
        listeners[i]()
      }
    },

    //  get
    get() {
      return next
    },

    //  订阅方法,返回的是取消订阅函数
    subscribe(listener) {
      let isSubscribed = true
      if (next === current) next = current.slice()
      next.push(listener)

      return function unsubscribe() {
        if (!isSubscribed || current === CLEARED) return
        isSubscribed = false

        if (next === current) next = current.slice()
        next.splice(next.indexOf(listener), 1)
      }
    }
  }
}

export default class Subscription {

  //  针对首次调用
  constructor(store, parentSub, onStateChange) {
    this.store          = store                  //  store
    this.parentSub      = null          //  父订阅  
    this.onStateChange  = onStateChange  //  state改变时的回调函数
    this.unsubscribe    = null             //  
    this.listeners      = notify(){}      //  


  }

  //  增加嵌套订阅
  addNestedSub(listener) {
    this.trySubscribe()
    return this.listeners.subscribe(listener)
  }

  //  通知嵌套订阅
  notifyNestedSubs() {
    this.listeners.notify()
  }

  //  是否订阅
  isSubscribed() {
    return Boolean(this.unsubscribe)
  }

  //  订阅
  trySubscribe() {
    if (!this.unsubscribe) {

      /** 
       * 针对首次调用
       * this.store.subscribe(this.onStateChange)
       * 即store监听了onStateChange
       * 
       * 针对后续调用
       * this.parentSub.addNestedSub(this.onStateChange)
       * 即
       */
      this.unsubscribe = this.parentSub ? this.parentSub.addNestedSub(this.onStateChange) : this.store.subscribe(this.onStateChange)
      
      /** 
       * 总结来说createListenerCollection
       * 就是返回一个对象
       * 它能够保存监听函数,同意调用函数
       */
      this.listeners = createListenerCollection()
    }
  }

  //  解除订阅
  tryUnsubscribe() {
    if (this.unsubscribe) {
      this.unsubscribe()
      this.unsubscribe = null
      this.listeners.clear()
      this.listeners = nullListeners
    }
  }
}
/** 最终结果 */

/** END */




/** 通知嵌套订阅 */
/** 代码 */
this.notifyNestedSubs = this.subscription.notifyNestedSubs.bind(this.subscription)
/** 帮助 */
(传入了selector, store)
/** 实际调用 */
this.notifyNestedSubs = this.listeners.notify().bind(this.subscription)
/** 最终结果 */
绑定了一个上下文,后续调用不会出错
/** END */