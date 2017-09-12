var moment = require('moment'),
    query = require('../config/db');

const daily = async (ctx) => {
    let requstData = ctx.request.body;
    const {from_rc, to_rc, from_nettype, to_nettype, from_devtype, to_devtype, range_time_picker} = requstData;
    let queryCondition = {
        from_nettype: from_nettype,
        to_nettype: to_nettype,
        from_devtype: from_devtype,
        to_devtype: to_devtype,
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

    let promise_status = query(`SELECT * FROM daily_status WHERE ${_sql} AND tstamp BETWEEN ${range_time_picker[0]} AND ${range_time_picker[1]} ORDER BY tstamp ASC`);

    let promise_duration = query(`SELECT * FROM daily_duration WHERE ${_sql} AND tstamp BETWEEN ${range_time_picker[0]} AND ${range_time_picker[1]} ORDER BY tstamp ASC`);

    let response = await Promise.all([promise_status, promise_duration]);

    ctx.body = response;
}

const dailyAll = async (ctx) => {
    let current_week = moment().subtract(7, 'days').valueOf();
    let now = moment().valueOf();

    let daily_week_internal_status = query(`SELECT * FROM daily_status WHERE from_rc = '-' AND to_rc = '-' AND tstamp BETWEEN ${current_week} AND ${now} ORDER BY tstamp ASC`);

    let daily_week_transnational_status = query(`SELECT * FROM daily_status WHERE from_rc = '-' AND to_rc = '+' AND tstamp BETWEEN ${current_week} AND ${now} ORDER BY tstamp ASC`);

    let daily_week_internal_duration = query(`SELECT * FROM daily_duration WHERE from_rc = '-' AND to_rc = '-' AND tstamp BETWEEN ${current_week} AND ${now} ORDER BY tstamp ASC`);

    let daily_week_transnational_duration = query(`SELECT * FROM daily_duration WHERE from_rc = '-' AND to_rc = '+' AND tstamp BETWEEN ${current_week} AND ${now} ORDER BY tstamp ASC`);

    let response = await Promise.all([daily_week_internal_status, daily_week_transnational_status, daily_week_internal_duration, daily_week_transnational_duration]);
    
    ctx.body = response;
}

module.exports = {
    daily,
    dailyAll
}