
const fs = require('fs');

const logger = (ctx, next) => {
  console.log(`${Date.now()} ${ctx.request.method} ${ctx.request.url}`);
  next();
}

const main = ctx => {
  ctx.response.body = 'Hello World';
};

//  异步
fs.readFile('./demos/template.html', 'utf8');

//  
fs.createReadStream('./demos/template.html');

//  合成中间件
const middlewares = compose([logger, main]);
app.use(middlewares);

//  服务器内部错误
ctx.throw(500);

//  404
const main = ctx => {
  ctx.response.status = 404;
  ctx.response.body = 'Page Not Found';
};

//  处理错误中间件
//  这样报错就能够被统一捕获，不用每个try catch
const handler = async (ctx, next) => {
  try {
    await next();
  } catch (err) {
    ctx.response.status = err.statusCode || err.status || 500;
    ctx.response.body = {
      message: err.message
    };
  }
};

const main = ctx => {
  ctx.throw(500);
};

app.use(handler);
app.use(main);

//  error事件监听
app.on('error', (err, ctx) => {
  console.error('server error', err)
})

//  当错误被catch捕获，就不会再出发error事件
try {
  ctx.throw(500)
  await next();
} catch (err) {
  
}
//  所以这时候就要施放error
ctx.app.emit('error', err, ctx);


//  koa读写cookie
const Koa = require('koa')
const app = new Koa()

const main = function(ctx) {
  const n = Number(ctx.cookies.get('view') || 0) + 1;
  ctx.cookies.set('view', n)
  ctx.response.body = n + ' views'
}

app.use(main)
app.listen(3000)

//  请求校验与返回
//  koa-post用来从post请求体里面提取数据
const Koa = require('koa')
const KoaBody = require('koa-body')
const app = new Koa()

const main = async function(ctx) {
  const body = ctx.request.body
  if(!body.name){
    ctx.throw(400, 'faild:name is required')
    ctx.body = { name: body.name, 'test':'from Test' }
  }
}

app.use(koaBody())
app.use(main)
app.listen(3000)
