import Koa from 'koa';
import cors from 'koa-cors';
import compress from 'koa-compress';
import json from 'koa-json';
import send from 'koa-send';
import koaStatic from 'koa-static';
import logger from 'koa-logger';
import convert from 'koa-convert';
import artTemplate from 'koa-artTemplate';
import bodyParser from 'koa-bodyparser';
import path from 'path';
import http from 'http';
import api from './routers/api';
import index from './routers/index';

const app = new Koa();

// 全局错误处理
app.use(async (ctx, next) => {
  try {
    await next()
  } catch (err) {
    console.log(`err: ${err}`);
    ctx.body = err
    ctx.status = err.status || 500
  }
})

// 设置Header
app.use(async (ctx, next) => {
  await next()
  ctx.set('X-Powered-By', 'Koa2')
})

// 设置gzip
app.use(compress({
  threshold: 2048,
  flush: require('zlib').Z_SYNC_FLUSH
}))

// 记录所用方式与时间
app.use(convert(logger()))

// 设置跨域
app.use(convert(cors()))

// 传输JSON
app.use(convert(json()))

// body解析
app.use(bodyParser())

// 设置渲染引擎
app.use(artTemplate(path.resolve(__dirname, 'views')))

// 静态文件夹指向前端打包生成文件夹，在请求 http://localhost:3001/main.css... 的时候就会去查找本地文件夹
app.use(convert(koaStatic(path.resolve(__dirname, '../client/dist'))))

// 发送文件，如HTML
app.use(async (ctx, next) => {
  ctx.send = send
  await next()
})

//api路由
app.use(api.routes());

//除去api请求之外的所有请求都返回index.html
app.use(index.routes());

const port = process.env.PORT || '3001';
app.listen(port);
console.log(`Server up and running! On port ${port}!`);