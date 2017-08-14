import FetchUtils from 'utils/FetchUtils';

//根据筛选条件获取实时通话数据
export const getRealtimeRequest = function (data) {
    return FetchUtils.doPostRequest('/realtime', data);
};

//根据筛选条件获取实时通话数据
export const getRealtimeAllRequest = function () {
    return FetchUtils.doGetRequest('/realtime/all');
}

//根据筛选条件获取延时丢包数据
export const getRealtimeRttRequest = function (data) {
    return FetchUtils.doPostRequest('/realtimertt', data);
};

//根据筛选条件获取延时丢包数据
export const getRealtimeRttAllRequest = function () {
    return FetchUtils.doGetRequest('/realtimertt/all');
}