var moment = require('moment'),
    query = require('../config/db');

//根据筛选条件查询实时信息，两个时间段
const realtime = async (ctx) => {
    let requstData = ctx.request.body;
    const { from_rc, to_rc, from_nettype, to_nettype, from_devtype, to_devtype, range_time_picker, moveWeek } = requstData;
    const current_start_time = range_time_picker[0];
    const current_end_time = range_time_picker[1];

    const current_start_time_utc = moment(current_start_time).valueOf();
    const current_end_time_utc = moment(current_end_time).valueOf();
    const last_start_time_utc = moment(current_start_time).subtract(moveWeek, 'weeks').valueOf();
    const last_end_time_utc = moment(current_end_time).subtract(moveWeek, 'weeks').valueOf();
    let queryCondition = {
        from_nettype: from_nettype,
        to_nettype: to_nettype,
        from_devtype: from_devtype,
        to_devtype: to_devtype
    }
    if (from_nettype === "5") { //5表示查询全部
        delete queryCondition.from_nettype;
    }
    if (to_nettype === "5") { //5表示查询全部
        delete queryCondition.to_nettype;
    }
    if (from_devtype === "2") { //2表示查询全部
        delete queryCondition.from_devtype;
    }
    if (to_devtype === "2") { //2表示查询全部
        delete queryCondition.to_devtype;
    }

    let _sql = `from_rc = '${from_rc}' AND to_rc = '${to_rc}'`;
    for (let key in queryCondition) {
        if (queryCondition.hasOwnProperty(key)) {
            _sql += ` AND ${key} = ${queryCondition[key]}`;
        }
    }

    let current_time_promise_status = query(`SELECT * FROM realtime_status WHERE ${_sql} AND tstamp BETWEEN ${current_start_time_utc} AND ${current_end_time_utc} ORDER BY tstamp ASC`);

    let current_time_promise_duration = query(`SELECT * FROM realtime_duration WHERE ${_sql} AND tstamp BETWEEN ${current_start_time_utc} AND ${current_end_time_utc} ORDER BY tstamp ASC`);
    
    let last_time_promise_status = query(`SELECT * FROM realtime_status WHERE ${_sql} AND tstamp BETWEEN ${last_start_time_utc} AND ${last_end_time_utc} ORDER BY tstamp ASC`);
    
    let last_time_promise_duration = query(`SELECT * FROM realtime_duration WHERE ${_sql} AND tstamp BETWEEN ${last_start_time_utc} AND ${last_end_time_utc} ORDER BY tstamp ASC`);
    
    let response = await Promise.all([current_time_promise_status, current_time_promise_duration, last_time_promise_status, last_time_promise_duration]);

    ctx.body = response;
}

//查询一周内以及上一周全部实时信息
const realtimeAll = async (ctx) => {
    let current_week = moment().subtract(7, 'days').valueOf();
    let last_week = moment().subtract(14, 'days').valueOf();
    let now = moment().valueOf();

    let current_week_internal_status = query(`SELECT * FROM realtime_status WHERE from_rc = '-' AND to_rc = '-' AND tstamp BETWEEN ${current_week} AND ${now} ORDER BY tstamp ASC`);

    let current_week_transnational_status = query(`SELECT * FROM realtime_status WHERE from_rc = '-' AND to_rc = '+' AND tstamp BETWEEN ${current_week} AND ${now} ORDER BY tstamp ASC`);

    let current_week_internal_duration = query(`SELECT * FROM realtime_duration WHERE from_rc = '-' AND to_rc = '-' AND tstamp BETWEEN ${current_week} AND ${now} ORDER BY tstamp ASC`);

    let current_week_transnational_duration = query(`SELECT * FROM realtime_duration WHERE from_rc = '-' AND to_rc = '+' AND tstamp BETWEEN ${current_week} AND ${now} ORDER BY tstamp ASC`);

    let last_week_internal_status = query(`SELECT * FROM realtime_status WHERE from_rc = '-' AND to_rc = '-' AND tstamp BETWEEN ${last_week} AND ${current_week} ORDER BY tstamp ASC`);

    let last_week_transnational_status = query(`SELECT * FROM realtime_status WHERE from_rc = '-' AND to_rc = '+' AND tstamp BETWEEN ${last_week} AND ${current_week} ORDER BY tstamp ASC`);
    
    let last_week_internal_duration = query(`SELECT * FROM realtime_duration WHERE from_rc = '-' AND to_rc = '-' AND tstamp BETWEEN ${last_week} AND ${current_week} ORDER BY tstamp ASC`);

    let last_week_transnational_duration = query(`SELECT * FROM realtime_duration WHERE from_rc = '-' AND to_rc = '+' AND tstamp BETWEEN ${last_week} AND ${current_week} ORDER BY tstamp ASC`);
    
    let response = await Promise.all([current_week_internal_status, current_week_transnational_status, current_week_internal_duration, current_week_transnational_duration, last_week_internal_status, last_week_transnational_status, last_week_internal_duration, last_week_transnational_duration]);
    
    ctx.body = response;
}

//根据筛选条件查询实时延时和丢包信息，两个时间段
const realtimertt = async (ctx) => {
    const requstData = ctx.request.body;
    const { rc, nettype, devtype, range_time_picker, moveWeek } = requstData;
    const current_start_time = range_time_picker[0];
    const current_end_time = range_time_picker[1];

    const current_start_time_utc = moment(current_start_time).valueOf();
    const current_end_time_utc = moment(current_end_time).valueOf();
    const last_start_time_utc = moment(current_start_time).subtract(moveWeek, 'weeks').valueOf();
    const last_end_time_utc = moment(current_end_time).subtract(moveWeek, 'weeks').valueOf();
    let queryCondition = {
        nettype: nettype,
        devtype: devtype
    }
    if (nettype === "5") { //5表示查询全部
        delete queryCondition.nettype;
    }
    if (devtype === "2") { //0表示查询全部
        delete queryCondition.devtype;
    }

    let _sql = `rc = '${rc}'`;
    for (let key in queryCondition) {
        if (queryCondition.hasOwnProperty(key)) {
            _sql += ` AND ${key} = ${queryCondition[key]}`;
        }
    }

    let current_time_promise = query(`SELECT * FROM realtime_rtt WHERE ${_sql} AND tstamp BETWEEN ${current_start_time_utc} AND ${current_end_time_utc} ORDER BY tstamp ASC`);

    let last_time_promise = query(`SELECT * FROM realtime_rtt WHERE ${_sql} AND tstamp BETWEEN ${last_start_time_utc} AND ${last_end_time_utc} ORDER BY tstamp ASC`);

    let response = await Promise.all([current_time_promise, last_time_promise]);

    ctx.body = response;
}

//查询一周内以及上一周的全部实时延时和丢包信息
const realtimerttAll = async (ctx) => {
    let current_week = moment().subtract(7, 'days').valueOf();
    let last_week = moment().subtract(14, 'days').valueOf();
    let now = moment().valueOf();

    let current_week_promise = query(`SELECT * FROM realtime_rtt WHERE rc = '-' AND tstamp BETWEEN ${current_week} AND ${now} ORDER BY tstamp ASC`);

    let last_week_promise = query(`SELECT * FROM realtime_rtt WHERE rc = '-' AND tstamp BETWEEN ${last_week} AND ${current_week} ORDER BY tstamp ASC`);

    let response = await Promise.all([current_week_promise, last_week_promise]);

    ctx.body = response;
}

module.exports = {
    realtime,
    realtimeAll,
    realtimertt,
    realtimerttAll
}