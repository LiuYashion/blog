> 我们不必纠结Lib和框架。复杂的能给出一整套解决方案的叫框架，专门解决一个问题的，叫lib库

### 创建组件
```js
//  无状态组件
const Number = ({ number }) => <p>{number}</p>;

//  类组件
class Container extends React.component {
  coustructor(){
    super();
    this.state = {
      number: 0
    }
  }
  handClick() {
    this.setState({number: this.state.number + 1})
  }
  render() {
    return (
      <div>
        <Title />
        <Number number={this.state.number} />
        <Button onClick={() => this.handClick()} />
      </div>
    )
  }
}
```

### 组件分类
- 展示组件： 负责界面的结构和样式，接收props，函数式声明
- 容器组件： 负责交互，业务逻辑，拥有自身的state，类组件，有生命周期

### Redux与状态管理
处理数据有3种方式：props/state/context

- props:  必须从父组件传递到子组件中使用
- state:  调用setState，会触发生命周期

关于redux，如果有两个组件需要使用同一数据，那么我们需要把一组数据提升到他们共同的父组件中保存。

- action
描述改变应用状态的方法

- reducer
根据现在的状态，返回一个新的状态

- store
存储状态


