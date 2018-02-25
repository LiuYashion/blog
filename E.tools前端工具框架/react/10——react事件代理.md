


# 事件代理
react的事件并没有真的被绑定在组件上，而是使用了事件代理，事件被绑定在文档的根节点上。








## 事件触发的3个阶段
事件捕获 -> 事件处理 -> 事件冒泡

捕获由父级元素一直传递到发生元素，目标时间本身处理完成后，冒泡从子元素传递至父元素。正应为这个处理过程，让事件代理成为了可能。

本质即为：将子元素事件的处理委托给父元素，react把所有事件都绑定在document上，react的冒泡是模拟出来的，document上绑定了一个dispatchEvent，在里面一次回溯遍历父节点。







## react合成事件
这种在组件上绑定的事件叫组合事件，组合事件的冒泡只能阻止react模拟的冒泡，不能阻止真实的dom冒泡，
```js
handleClick(e){
  e.stopPropagation()
}
originCLick(){
  document.getElementById('id').addEventListener('click', function(){

  })
}
render(){
  return (
    <div onClick={this.handleClick.bind(this, 'clicker')}>
      
    </div>
  )
}
```

- e.stopPropagation
阻止继续向上冒泡，同层级依旧触发
- e.nativeEvent.stopImmediatePropagation
立即停止同级触发和冒泡




## 总结
对于 React 的合成事件对象 e 来说：
- e.stopPropagation → 用来阻止 React 模拟的事件冒泡
- e.stopImmediatePropagation → 没有这个函数
- e.nativeEvent.stopPropagation → 原生事件对象的用于阻止 DOM 事件的进一步捕获或者冒泡
- e.nativeEvent.stopImmediatePropagation → 原生事件对象的用于阻止 DOM 事件的进一步捕获或者冒泡，且该元素的后续绑定的相同事件类型的事件也被一并阻止。



