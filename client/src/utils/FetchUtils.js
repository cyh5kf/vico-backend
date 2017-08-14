import 'whatwg-fetch';
import {message} from 'antd';
import LoginStore from '../stores/LoginStore';

export const GET_URL_PREFIX = function(){
  return '/api';
};


class FetchUtils {

    init(checkTokenRequest) {
        //用于遇到异常情况后检查Token是否已过期
        this.checkTokenRequest = checkTokenRequest;
    }

    doGetRequest(url) {
        return this._doGetRequest('get', url, null);
    }

    doPostRequest(url, data) {
        return this._doRequest('post', url, data);
    }

    doPutRequest(url, data){
        return this._doRequest('put', url, data);
    }

    doDeleteRequest(url, data){
        return this._doRequest('delete', url, data);
    }

    getRequestURL(url){
        url = GET_URL_PREFIX() + url;
        return url;
    }

    async _doGetRequest(method, url, data) {

        url = GET_URL_PREFIX() + url;
        let checkTokenRequest = this.checkTokenRequest;
        let token = LoginStore.getToken();
        let response = await fetch(url, {
            method: method,
            headers: { 'x-access-token': token}
        })
        let responseJson = await response.json();
        response.data = responseJson;
        let status = response.status;
        if(response.ok) {
            return response;
        }
        if (status === 404) {
            message.error("404 URL  :  " + url);
        } else if (status === 401) {
            //用户token不合法
            checkTokenRequest && checkTokenRequest();
        }else {
            message.error("Error Code :" + status);
        }
        let error = new Error(response.statusText)
        error.response = response
        throw error
    }

    async _doRequest(method, url, data) {

        url = GET_URL_PREFIX() + url;
        let checkTokenRequest = this.checkTokenRequest;
        let token = LoginStore.getToken();
        let response = await fetch(url, {
            method: method,
            body: JSON.stringify(data),
            headers: {
                'x-access-token': token,
                 'Content-Type': 'application/json'
                }
        })
        let responseJson = await response.json();
        response.data = responseJson;
        let status = response.status;
        if(response.ok) {
            return response;
        }
        if (status === 404) {
            message.error("404 URL  :  " + url);
        } else if (status === 401) {
            //用户token不合法
            checkTokenRequest && checkTokenRequest();
        }else {
            message.error("Error Code :" + status);
        }
        let error = new Error(response.statusText)
        error.response = response
        throw error
    }

}


export default new FetchUtils();