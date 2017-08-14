import React from 'react';
import { Route, IndexRoute, IndexRedirect, browserHistory } from 'react-router';
import {message} from 'antd';
import LoginComposer from '../views/Login/LoginComposer';
import AppComposer from '../views/App/AppComposer';
import RealtimeComposer from '../views/RealtimeStatistics/RealtimeComposer';
import DailyComposer from '../views/DailyStatistics/DailyComposer';
import RealtimeRttComposer from '../views/RealtimeRttStatistics/RealtimeRttComposer';
import FetchUtils from '../utils/FetchUtils';
import LoginStore from '../stores/LoginStore';
import '../views/index.less';

const history = browserHistory;

FetchUtils.init(function(){
        message.error("Login information has expired, please login again.");
        history.push('/login');
});

const validateLogin = function (next, replace, callback) {
    var tokenInfo = LoginStore.getToken();
    if (!tokenInfo) {
        replace('/login');
    }
    callback()
};

const routes = 
  <Route path="/">
    <Route path="login" component={LoginComposer}/>
    <Route path="main" component={AppComposer} onEnter={validateLogin}>
        <Route path="home" component={RealtimeComposer}></Route>
        <Route path="daily" component={DailyComposer}></Route>
        <Route path="realtimertt" component={RealtimeRttComposer}></Route>
        <Route path="*" >
            <IndexRedirect to="/main/home"></IndexRedirect>
        </Route>
    </Route>
    <Route path="" >
        <IndexRedirect to="/login"></IndexRedirect>
    </Route>
    <Route path="*" >
        <IndexRedirect to="/login"></IndexRedirect>
    </Route>
  </Route>


export default routes;