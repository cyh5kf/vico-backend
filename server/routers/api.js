import Router from 'koa-router';
import jwtAuth from '../middleware/jwtAuth';
import login from './login';
import {realtime, realtimeAll, realtimertt, realtimerttAll} from './realtime';
import {daily, dailyAll} from './daily';

const api = new Router({
  prefix: '/api'
})

//登录接口
api.get('/login/doLogin', login);

//获取实时状态信息
api.post('/realtime', jwtAuth, realtime);

//获取全部实时状态信息
api.get('/realtime/all', jwtAuth, realtimeAll);

//获取日状态信息
api.post('/daily', jwtAuth, daily);

//获取全部日状态信息
api.get('/daily/all', jwtAuth, dailyAll);

//获取实时延时丢包信息
api.post('/realtimertt', jwtAuth, realtimertt);

//获取全部实时延时丢包信息
api.get('/realtimertt/all', jwtAuth, realtimerttAll);


export default api;
