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
```js
{
  type: 'INCREMENT',
  value: 1
}
```

- reducer
根据现在的状态，返回一个新的状态
```js
function counter(state = 0, action) {
  switch (action.type) {
    case 'INCREMENT':
      return state + action.value
    default:
      return state
  }
}
```

- store
存储状态
```js
const { createStore } = Redux;
const store = createStore(counter);
```

### react-redux
- Provider：为react传入store的组件
- connect：为组件提供dispatch和状态数据
- mapStateToProps：将redux中的状态数据映射到react
```js
const { Provider, connect } = ReactRedux;
const mapStateToProps = state => ({
  number: state
});


class Counter extends Component {
  constructor(props) {
    super(props);
  }

  handleClick() {
    // 在这里调用传入组件的 dispatch 方法
    this.props.dispatch({
      type: 'INCREMENT',
      value: 1
    });
  }

  render() {
    return (
      <div>
        <Title />
        <Number number={this.props.number} />
        <Button onClick={() => this.handleClick()} />
      </div>
    )
  }
}
/* 我们需要通过 connect 方法来包装一下 React 的 Counter 组件，使其获取到 Redux 的 store 当中的方法和数据 */
Counter = connect(mapStateToProps)(Counter);
```

### react-router
```js
<HashRouter>
    <div>
      <Route path='/:title?' component={App} />
    </div>
</HashRouter>

```

### 实录
