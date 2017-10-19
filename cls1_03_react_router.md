### 从生命组件开始
同上，从最简单的一个组件开始，这里介绍如何将div更换为一个router组件
```javascript
import React from 'react';
import { render } from 'react-dom';

render(
  <div>I'm react dom</div>,
  document.getElementById('app')
);
```

### 组件写法
最快的就是函数式了，
```javascript
const Mycomponent=(props)=>(
  <div>
    <h2>props.match.params.topicId</h2>
  </div>
)

// 使用的时候直接渲染 <Mycomponent/> 即可
```
如果我们把文件分离开的话，这里对于export，import的具体用法可参见-----
```javascript
// Mycomponent.jsx
const Mycomponent=(props)=>(
  <div>
    <h2>props.match.params.topicId</h2>
  </div>
)
export default Mycomponent

//index.jsx
import React from 'react'
import { render } from 'react-dom';
import Mycomponent from './Mycomponent'
render(
  <Mycomponent/>,
  document.getElementById('example')
)
```

然后就是最常见的class声明方法
```javascript
import React from 'react'

export default class Mycomponent extends Rect.Component{
  render(){
    return (
      <div>
        <h2>this.props.match.params.topicId</h2>
      </div>
    )
  }
}
```

### 当react组件传入路由的时候
```javascript
const Mycomponent=(props)=>(
  <div>
    <h2>props.match.params.topicId</h2>
  </div>
)
// ...
<Route exact path="/" component={Mycomponent}></Route>
```
当把Mycomponent当做组件传入路由的时候，props参数会包含一些信息，比如根据路由匹配的参数
```javascript
<Route path="/:id" component={Child}/>

const Child = ({ match }) => (
  <div>
    <h3>ID: {match.params.id}</h3>
  </div>
)

// <Link to="/reacttraining">React Training</Link>
// dom中显示的是 reacttraining
```
上面匹配到的路由参数，将保存在props.match.params.id中


### withRouter组件
对于一些我们不想用<Route>渲染的，但是又想访问props.match，那么就可以用withRouter来渲染

此外，我们还可以包装路由，比如我们要对路由进行判断的时候，不妨就自己包装一层路由，PrivateRoute的参数用来解构赋值，取出了component和path

```javascript
<Route path="/login" component={Login}/>
<PrivateRoute path="/protected" component={Protected}/>

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route {...rest} render={props => (
    fakeAuth.isAuthenticated ? (
      <Component {...props}/>
    ) : (
      <Redirect to={{pathname: '/login',state: { from: props.location }}}/>
    )
  )}/>
)
```

### 路由判断
对于某些私有路由，我们可能只会在某些特定情况下才允许展示，比如登入登出的功能。登录时根据auth判断，这时就可以包装一层路由，增强阅读性；登出时，要做路由跳转，必然会操作history对象，这时候用withRouter包装一下组件，解构出history就行了

### Prompt
当用户切换页面的时候，Prompt组件用于给用户一些提示

### Switch
只渲染匹配到的第一个组件，孩子只能是Route或Redirect。当前面都没匹配到时，就渲染NoMatch
```javascript
<Switch>
  <Route path="/" exact component={Home}/>
  <Redirect from="/old-match" to="/will-match"/>
  <Route path="/will-match" component={WillMatch}/>
  <Route component={NoMatch}/>
</Switch>
```

### 路由配置
```javascript
──Tacos
    ├─Bus
    └─Cart
──Sandwiches
```
先定义好路由信息
```javascript
// routerConfig
var routes = [
  {
    path: '/sandwiches',
    component: Sandwiches
  },{
    path: '/tacos',
    component: Tacos,
    routes: [{
      path: '/tacos/bus',
      component: Bus
    },{
      path: '/taos/cart',
      component: Cart
    }]
  }
]
```
然后就写每个组件，叶子路由的组件比较简单，就一般的组件就行。对于父节点，再让RouteWithSubRoutes去生成Route
```javascript
const Main = () => (
  <h2>Main</h2>
)
```

对于父节点Route的生成，可以使用map，把routeConfig中对应的对象传进去，
```javascript
{routes.map((route, i) => (
  <RouteWithSubRoutes key={i} {...route}/>
))}

const RouteWithSubRoutes = (route) => (
  <Route path={route.path} render={props => (
    <route.component {...props} routes={route.routes}/>
  )}/>
)
```

### v3 & v4
对比：
```javascript
const App = () =>
<Router history={browserHistory}>
  <Route path="/" component={PrimaryLayout}>
    <IndexRoute component={HomePage} />
    <Route path="/user" component={UsersPage} />
  </Route>
</Router>;

render(<App />, document.getElementById("root"));
```

```javascript
const App = () =>
<BrowserRouter>
  <div className="primary-layout">
    <Link to="/">Home</Link>
    <Link to="/User">User</Link>
    <main>
      <Route path="/" exact component={HomePage} />
      <Route path="/user" component={UsersPage} />
    </main>
  </div>
</BrowserRouter>;

render(<App />, document.getElementById("root"));
```

可以发现，v3的router不在了。v3中我们给Router的是Route，而在v4中我们给BrowserRouter的是我们应用本身，前面也介绍了很多新的高阶组件

### 参数匹配
```javascript
<Route path={`${match.path}/:userId`} component={UserProfilePage}/>
```
这种写法可以自动匹配前面的路由，并且把后面匹配的字段，当做userId，传入给UserProfilePage。可以在UserProfilePage组件中通过 porps.match.params.userId访问到，能解构最好



### 路由设计
对于这组路由： /user/add；/user/5/edit；/user/5，路由顺序可以好好考量
```javascript
<Switch>
  <Route path={`${match.path}/add`} component={AddUserPage} />
  <Route path={`${match.path}/:userId/edit`} component={EditUserPage} />
  <Route path={`${match.path}/:userId`} component={UserProfilePage} />
</Switch>
```
Switch保证只会渲染匹配的第一个组件，排列好顺序可以保证路由按照我们想要的结果渲染


