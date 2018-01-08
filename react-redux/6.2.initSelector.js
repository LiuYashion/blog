

/** 第一步调用selectorFactory */
/** 代码 */
const sourceSelector = selectorFactory(this.store.dispatch, selectorFactoryOptions)
/** 实际调用 */
export default function finalPropsSelectorFactory(dispatch, {
  initMapStateToProps,
  initMapDispatchToProps,
  initMergeProps,
  ...options
}) {
  //  调用了initMapStateToProps、initMapDispatchToProps方法
  //  总之是返回了一个proxy
  const mapStateToProps = initMapStateToProps(dispatch, options)
  const mapDispatchToProps = initMapDispatchToProps(dispatch, options)
  const mergeProps = initMergeProps(dispatch, options)

  if (process.env.NODE_ENV !== 'production') {
    verifySubselectors(mapStateToProps, mapDispatchToProps, mergeProps, options.displayName)
  }

  //  第一次调用：
  const selectorFactory = options.pure
    ? pureFinalPropsSelectorFactory
    : impureFinalPropsSelectorFactory

  return selectorFactory(
    mapStateToProps,
    mapDispatchToProps,
    mergeProps,
    dispatch,
    options
  )
}
/** 最终结果,针对第一次运行 */
const sourceSelector = function pureFinalPropsSelector(nextState, nextOwnProps) {
  return hasRunAtLeastOnce
    ? handleSubsequentCalls(nextState, nextOwnProps)
    : handleFirstCall(nextState, nextOwnProps)
}
/** END */





/** 其中调用了下面2个方法 */
/** 代码 */
const mapStateToProps = initMapStateToProps(dispatch, options)
const mapDispatchToProps = initMapDispatchToProps(dispatch, options)
/** 实际调用 */
return function initProxySelector(dispatch, { displayName }) {
  const proxy = function mapToPropsProxy(stateOrDispatch, ownProps) {
    return proxy.dependsOnOwnProps
      ? proxy.mapToProps(stateOrDispatch, ownProps)
      : proxy.mapToProps(stateOrDispatch)
  }

  // allow detectFactoryAndVerify to get ownProps
  proxy.dependsOnOwnProps = true

  proxy.mapToProps = function detectFactoryAndVerify(stateOrDispatch, ownProps) {
    proxy.mapToProps = mapToProps
    proxy.dependsOnOwnProps = getDependsOnOwnProps(mapToProps)
    let props = proxy(stateOrDispatch, ownProps)

    if (typeof props === 'function') {
      proxy.mapToProps = props
      proxy.dependsOnOwnProps = getDependsOnOwnProps(props)
      props = proxy(stateOrDispatch, ownProps)
    }

    if (process.env.NODE_ENV !== 'production') 
      verifyPlainObject(props, displayName, methodName)

    return props
  }

  return proxy
}
/** 最终结果 */
const mapStateToProps    = proxy
const mapDispatchToProps = proxy
/** END */


/** 接着第一步sourceSelector */
/** 代码 */
this.selector = makeSelectorStateful(sourceSelector, this.store)
/** 帮助 */
(传入了selector, store)
/** 实际调用 */
function makeSelectorStateful(sourceSelector, store) {
  const selector = {
    run: function runComponentSelector(props) {
      
    }
  }

  return selector
}
/** 最终结果 */
this.selector = selector
/** END */



/** 接着第一步sourceSelector */
/** 代码 */
this.selector.run(this.props)
/** 帮助 */
(传入了props, 在方法中比较了新旧props)
/** 实际调用 */
function runComponentSelector(props) {
  try {
    //  这里就是比较了props和state,并且整合
    const nextProps = sourceSelector(store.getState(), props)
    if (nextProps !== selector.props || selector.error) {
      selector.shouldComponentUpdate = true
      selector.props = nextProps
      selector.error = null
    }
  } catch (error) {
    selector.shouldComponentUpdate = true
    selector.error = error
  }
}

/** 最终结果 */
//  selector被的属性被更新
selector.shouldComponentUpdate
selector.props
selector.error
/** END */



/** 其中有一步调用了sourceSelector */
/** 代码 */
const nextProps = sourceSelector(store.getState(), props)

/** 帮助 */
(这里第一次调用和后续调用所用方法不同, 第一次调用是赋值, 第二次才做比较)
(这里我们就看第二次的)
/** 实际调用 */
function pureFinalPropsSelector(nextState, nextOwnProps) {
  return handleSubsequentCalls(nextState, nextOwnProps)
}
function handleSubsequentCalls(nextState, nextOwnProps) {
  // 具体的比较方法我们在这里不做理解,同意理解为
  var mergedProps = mergeProps(stateProps, dispatchProps, ownProps)
  return mergedProps
}
/** 最终结果 */
const nextProps = mergedProps;
/** END */


