// encapsulates the subscription logic for connecting a component to the redux store, as
// well as nesting subscriptions of descendant components, so that we can ensure the
// ancestor components re-render before descendants

const CLEARED = null
const nullListeners = { notify() {} }

function createListenerCollection() {
  // the current/next pattern is copied from redux's createStore code.
  // TODO: refactor+expose that code to be reusable here?
  let current = []
  let next = []

  return {
    clear() {
      next = CLEARED
      current = CLEARED
    },

    notify() {
      const listeners = current = next
      for (let i = 0; i < listeners.length; i++) {
        listeners[i]()
      }
    },

    get() {
      return next
    },

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
  constructor(store, parentSub, onStateChange) {
    //store
    this.store = store
    //父订阅
    this.parentSub = parentSub
    this.onStateChange = onStateChange
    this.unsubscribe = null
    this.listeners = nullListeners
  }

  //增加嵌套订阅
  addNestedSub(listener) {
    this.trySubscribe()
    return this.listeners.subscribe(listener)
  }

  //通知嵌套订阅
  notifyNestedSubs() {
    this.listeners.notify()
  }

  //是否订阅
  isSubscribed() {
    return Boolean(this.unsubscribe)
  }

  //订阅
  trySubscribe() {
    if (!this.unsubscribe) {
      this.unsubscribe = this.parentSub ? this.parentSub.addNestedSub(this.onStateChange) : this.store.subscribe(this.onStateChange)
      //  第一次：this.store.subscribe(this.onStateChange)
      
      this.listeners = createListenerCollection()
    }
  }

  //解除订阅
  tryUnsubscribe() {
    if (this.unsubscribe) {
      this.unsubscribe()
      this.unsubscribe = null
      this.listeners.clear()
      this.listeners = nullListeners
    }
  }
}

