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

### react-router 4.x
---
不过一般是用这个渲染App的Container，里面实现路由切换：




index.js

4.x版本的略有不同，不过这样排版感觉会更合理
```javascript
import React from 'react';
import { render } from 'react-dom';
import { HashRouter } from 'react-router-dom';
import { default as App } from './js/index';
render(
  <HashRouter>
    <App />
  </HashRouter>,
  document.getElementById('app')
);
```



app.js

这里引用了刚才定义的route，并且由Router包裹起来，
```javascript
import React from 'react';
import routes from './routes.jsx';
import {Router} from 'react-router';

import '../styles/app.scss';
const Root = ({ history }) => (
  <Router history={history} routes={routes} />
);

export default Root;
```




routes.jsx

这里我们使用react-router渲染了一个路由组件，结构如下：根路由下面有若干路由写法

todo[react嵌套路由]
```javascript
import React from 'react';
import { Route, IndexRoute } from 'react-router';

import {
  App,
  Home,
  Success,
  NotFoundPage,
} from './containers';

export default (
  <Route path="/" component={App}>
    <IndexRoute component={Home} />
    <Route path="success" component={Success} />
    <Route path="*" component={NotFoundPage} />
  </Route>
);

```