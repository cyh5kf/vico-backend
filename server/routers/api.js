var Router = require('koa-router'),
  jwtAuth = require('../middleware/jwtAuth'),
  login = require('./login'),
  realtimeRouter = require('./realtime'),
  dailyRouter = require('./daily');

const api = new Router({
  prefix: '/api'
})

//登录接口
api.get('/login/doLogin', login);

//获取实时状态信息
api.post('/realtime', jwtAuth, realtimeRouter.realtime);

//获取全部实时状态信息
api.get('/realtime/all', jwtAuth, realtimeRouter.realtimeAll);

//获取日状态信息
api.post('/daily', jwtAuth, dailyRouter.daily);

//获取全部日状态信息
api.get('/daily/all', jwtAuth, dailyRouter.dailyAll);

//获取实时延时丢包信息
api.post('/realtimertt', jwtAuth, realtimeRouter.realtimertt);

//获取全部实时延时丢包信息
api.get('/realtimertt/all', jwtAuth, realtimeRouter.realtimerttAll);

module.exports = api;
