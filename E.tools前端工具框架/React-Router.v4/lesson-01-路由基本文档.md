## react-router v4 doc
[react-router文档链接](http://reacttraining.cn/web/guides/quick-start)


## 1.0 \<BrowserRouter>
使用HTML5的history api来保持UI和url的同步
- basename            //  string 服务器的二级（子）目录
- forceRefresh        //  boolean 导航过程中整个页面将会刷新
- getUserConfirmation //  function 导航确认方法
- keyLength           //  number location.key长度
```js
import { BrowserRouter } from 'react-router-dom'
<BrowserRouter basename='/src'>
  <App/>
</BrowserRouter>
```


## 2.0 \<HashRouter>
tbc


## 3.0 \<Link>
为您的应用提供声明式的、无障碍导航
- to //string类型直接跳转,也可以传object
```js
<Link to={{
  pathname: '/courses',
  search: '?sort=name',
  hash: '#the-hash',
  state: { fromDashboard: true }
}}/>
```


## 4.0 \<NavLink>
和Link类似，只是当路由匹配的时候，会给这个Link组件添加class
```js
<NavLink
  to="/faq"
  exact
  activeClassName="selected"
>FAQs</NavLink>
```


## 5.0 \<Prompt>
导航离开的时候作为提醒，添加在组件中
- message //string|function 返回一个字符串即可
- when  //boolean true才提示
```js
<Prompt 
  message={location => (
  `go to${location.pathname}?`
)}/>
```


## 6.0 \<Redirect>
用于重定向并替换掉当前目录，类似于服务端的重定向。注意这里没有component，还有render写法，重定向可以在方法中判断
```js
import { Route, Redirect } from 'react-router'
<Switch>
  <Route path="/index" exact  render={()=>(
    <Redirect to="/dashboard"/>
  )}/>
</Switch>
```




## 6.0 \<Route>
最重要的组件，render组件的三种渲染方式；在不同的情况下使用
```js
<Route component/>
<Route render/>
<Route children/>
```

### route参数
match，location，history是公共的参数，下面列举特有属性：

### component
当使用这个属性时，router会用React.createElement来创建组件，而不是render。这里如果提供内联函数，可能会触发额外的render
```js
<Route path="/user/:username" component={User}/>

const User = ({ match }) => {
  return <h1>Hello {match.params.username}!</h1>
}
```

### render
直接渲染组件最简单快捷
```js
<Route path="/home" render={() => <div>Home</div>}/>
```

方法包装,我们还可以包装路由，比如我们要对路由进行判断的时候，不妨就自己包装一层路由，PrivateRoute的参数用来解构赋值，取出了component和path
```js
<PrivateRoute path="/protected" component={Protected}/>

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route {...rest} render={props => (
    fakeAuth.isAuthenticated ? (
      <FadeIn>
        <Component {...props}/>
      </FadeIn>
    ) : (
      <Redirect to={{pathname: '/login',state: { from: props.location }}}/>
    )
  )}/>
)
```

### children
不论是否匹配，Animate都会被渲染，所以可以通过生命周期，来为其添加样式
```js
<Route children={({ match, ...rest }) => (
  <Animate>
    {match && <Something {...rest}/>}
  </Animate>
)}/>
```




## 7.0 \<Switch>
> Switch和直接使用若干Route的不同点？
Switch只会渲染其中的一个路由，按照顺序排列，组合出我们想要的效果


## 8.0 \<withRouter>
withRouter在每次路由改变时就会重新渲染，
```js
import {withRouter} from 'react-router-dom' ;
var  Test   = withRouter(
  ({history, location, match})=>{ 
    return <div>{location.pathname}</div> 
  }
)
```



## 9.0 location对象
location可以通过下面的方式获取
```js
<Route path="/user/:username" component={User}/>

<Route path="/home" render={({location}) => <div>Home</div>}/>

<Route path="/home" children={({ match, location, ...rest }) => (
  <Animate>
    {match && <Something {...rest}/>}
  </Animate>
)}/>
```

## X.0 tips
不建议直接操作history对象
[react-router todos链接](http://reacttraining.cn/web/example/basic)

