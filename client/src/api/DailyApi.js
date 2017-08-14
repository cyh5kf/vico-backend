import FetchUtils from 'utils/FetchUtils';

//根据筛选条件获取表格数据
export const getDailyRequest = function (data) {
    return FetchUtils.doPostRequest('/daily', data);
};

//根据筛选条件获取表格数据
export const getDailyAllRequest = function () {
    return FetchUtils.doGetRequest('/daily/all');
}