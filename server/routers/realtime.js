import moment from 'moment';
import realtime_status_model from '../models/realtimeStatusModel';
import realtime_duration_model from '../models/realtimeDurationModel';
import realtime_rtt_model from '../models/realtimeRttModel';

//根据筛选条件查询实时信息，两个时间段
export const realtime = async (ctx) => {
    let requstData = ctx.request.body;
    const { from_rc, to_rc, from_nettype, to_nettype, from_devtype, to_devtype, range_time_picker, moveWeek } = requstData;
    const current_start_time = range_time_picker[0];
    const current_end_time = range_time_picker[1];

    const current_start_time_utc = moment(current_start_time).valueOf();
    const current_end_time_utc = moment(current_end_time).valueOf();
    const last_start_time_utc = moment(current_start_time).subtract(moveWeek, 'weeks').valueOf();
    const last_end_time_utc = moment(current_end_time).subtract(moveWeek, 'weeks').valueOf();
    let queryCondition = {
        from_rc: from_rc,
        to_rc: to_rc,
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
    let current_time_promise_status = await realtime_status_model.findAll({
        order: "tstamp ASC", //从小到大正序排序
        where: Object.assign({}, queryCondition, {
            tstamp: {
                $between: [current_start_time_utc, current_end_time_utc],
            }
        })
    });

    let current_time_promise_duration = await realtime_duration_model.findAll({
        order: "tstamp ASC",
        where: Object.assign({}, queryCondition, {
            tstamp: {
                $between: [current_start_time_utc, current_end_time_utc]
            }
        })
    });

    let last_time_promise_status = await realtime_status_model.findAll({
        order: "tstamp ASC",
        where: Object.assign({}, queryCondition, {
            tstamp: {
                $between: [last_start_time_utc, last_end_time_utc]
            }
        })
    });

    let last_time_promise_duration = await realtime_duration_model.findAll({
        order: "tstamp ASC",
        where: Object.assign({}, queryCondition, {
            tstamp: {
                $between: [last_start_time_utc, last_end_time_utc]
            }
        })
    });
    let response = [current_time_promise_status, current_time_promise_duration, last_time_promise_status, last_time_promise_duration];
    ctx.body = response;
}

//查询一周内以及上一周全部实时信息
export const realtimeAll = async (ctx) => {
    let current_week = moment().subtract(7, 'days').valueOf();
    let last_week = moment().subtract(14, 'days').valueOf();
    let now = moment().valueOf();
    let current_week_internal_status = await realtime_status_model.findAll({
        order: "tstamp ASC",
        where: {
            from_rc: '-',
            to_rc: '-',
            tstamp: {
                $between: [current_week, now],
            }
        }
    });
    let current_week_transnational_status = await realtime_status_model.findAll({
        order: "tstamp ASC",
        where: {
            from_rc: '-',
            to_rc: '+',
            tstamp: {
                $between: [current_week, now],
            }
        }
    });
    let current_week_internal_duration = await realtime_duration_model.findAll({
        order: "tstamp ASC",
        where: {
            from_rc: '-',
            to_rc: '-',
            tstamp: {
                $between: [current_week, now],
            }
        }
    });
    let current_week_transnational_duration = await realtime_duration_model.findAll({
        order: "tstamp ASC",
        where: {
            from_rc: '-',
            to_rc: '+',
            tstamp: {
                $between: [current_week, now],
            }
        }
    });
    let last_week_internal_status = await realtime_status_model.findAll({
        order: "tstamp ASC",
        where: {
            from_rc: '-',
            to_rc: '-',
            tstamp: {
                $between: [last_week, current_week],
            }
        }
    });
    let last_week_transnational_status = await realtime_status_model.findAll({
        order: "tstamp ASC",
        where: {
            from_rc: '-',
            to_rc: '+',
            tstamp: {
                $between: [last_week, current_week],
            }
        }
    });
    let last_week_internal_duration = await realtime_duration_model.findAll({
        order: "tstamp ASC",
        where: {
            from_rc: '-',
            to_rc: '-',
            tstamp: {
                $between: [last_week, current_week],
            }
        }
    });
    let last_week_transnational_duration = await realtime_duration_model.findAll({
        order: "tstamp ASC",
        where: {
            from_rc: '-',
            to_rc: '+',
            tstamp: {
                $between: [last_week, current_week],
            }
        }
    });
    let response = [current_week_internal_status, current_week_transnational_status, current_week_internal_duration, current_week_transnational_duration, last_week_internal_status, last_week_transnational_status, last_week_internal_duration, last_week_transnational_duration];
    ctx.body = response;
}

//根据筛选条件查询实时延时和丢包信息，两个时间段
export const realtimertt = async (ctx) => {
    const requstData = ctx.request.body;
    const { rc, nettype, devtype, range_time_picker, moveWeek } = requstData;
    const current_start_time = range_time_picker[0];
    const current_end_time = range_time_picker[1];

    const current_start_time_utc = moment(current_start_time).valueOf();
    const current_end_time_utc = moment(current_end_time).valueOf();
    const last_start_time_utc = moment(current_start_time).subtract(moveWeek, 'weeks').valueOf();
    const last_end_time_utc = moment(current_end_time).subtract(moveWeek, 'weeks').valueOf();
    let queryCondition = {
        rc: rc,
        nettype: nettype,
        devtype: devtype
    }
    if (nettype === "5") { //5表示查询全部
        delete queryCondition.nettype;
    }
    if (devtype === "2") { //0表示查询全部
        delete queryCondition.devtype;
    }
    let current_time_promise = await realtime_rtt_model.findAll({
        order: "tstamp ASC",
        where: Object.assign({}, queryCondition, {
            tstamp: {
                $between: [current_start_time_utc, current_end_time_utc],
            }
        })
    });

    let last_time_promise = await realtime_rtt_model.findAll({
        order: "tstamp ASC",
        where: Object.assign({}, queryCondition, {
            tstamp: {
                $between: [last_start_time_utc, last_end_time_utc],
            }
        })
    });

    let response = [current_time_promise, last_time_promise];

    ctx.body = response;
}

//查询一周内以及上一周的全部实时延时和丢包信息
export const realtimerttAll = async (ctx) => {
    let current_week = moment().subtract(7, 'days').valueOf();
    let last_week = moment().subtract(14, 'days').valueOf();
    let now = moment().valueOf();
    let current_week_promise = await realtime_rtt_model.findAll({
        order: "tstamp ASC",
        where: {
            rc: '-',
            tstamp: {
                $between: [current_week, now],
            }
        }
    });

    let last_week_promise = await realtime_rtt_model.findAll({
        order: "tstamp ASC",
        where: {
            rc: '-',
            tstamp: {
                $between: [last_week, current_week],
            }
        }
    });

    let response = [current_week_promise, last_week_promise];

    ctx.body = response;
}