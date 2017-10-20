### 从index.js开始(这里以SPA介绍)
---
webpack的配置已经完成，index.js入口文件代码如下：

index.js
```javascript
import React from 'react';
import { render } from 'react-dom';

render(
  <div>I'm react dom</div>,
  document.getElementById('app')
);
```
这样完成的就是一个最简单的渲染，就在#app里面渲染一个div

### react-router 3.x
对于老版本路由的写法如下，不赘述
```javascript
// App.jsx
import React, { Component } from 'react';
export default class App extends Component {
  render() {
    const { children } = this.props;
    return children;
  }
}

// idnex.js
<Router history={history}>
  <Route path="/" component={App}>
    <IndexRoute component={Home} />
    <Route path="success" component={Success} />
    <Route path="*" component={NotFoundPage} />
  </Route>
</Router>
```

### react-router 4.x
react-router 4.x新开了介绍，可见----->

