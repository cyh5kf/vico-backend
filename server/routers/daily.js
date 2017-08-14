import moment from 'moment';
import daily_status_model from '../models/dailyStatusModel';
import daily_duration_model from '../models/dailyDurationModel';

export const daily = async (ctx) => {
    let requstData = ctx.request.body;
    const {from_rc, to_rc, from_nettype, to_nettype, from_devtype, to_devtype, range_time_picker} = requstData;
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
    let promise_status = await daily_status_model.findAll({
        order: "tstamp ASC",
        where: Object.assign({}, queryCondition, {
            tstamp: {
                $between: [range_time_picker[0], range_time_picker[1]],
            }
        })
    });

    let promise_duration = await daily_duration_model.findAll({
        order: "tstamp ASC",
        where: Object.assign({}, queryCondition, {
            tstamp: {
                $between: [range_time_picker[0], range_time_picker[1]],
            }
        })
    });

    let response = [promise_status, promise_duration];

    ctx.body = response;
}

export const dailyAll = async (ctx) => {
    let current_week = moment().subtract(7, 'days').valueOf();
    let now = moment().valueOf();
    let daily_week_internal_status = await daily_status_model.findAll({
        order: "tstamp ASC",
        where: {
            from_rc: '-',
            to_rc: '-',
            tstamp: {
                $between: [current_week, now],
            }
        }
    });

    let daily_week_transnational_status = await daily_status_model.findAll({
        order: "tstamp ASC",
        where: {
            from_rc: '-',
            to_rc: '+',
            tstamp: {
                $between: [current_week, now],
            }
        }
    });
    let daily_week_internal_duration = await daily_duration_model.findAll({
        order: "tstamp ASC",
        where: {
            from_rc: '-',
            to_rc: '-',
            tstamp: {
                $between: [current_week, now],
            }
        }
    });

    let daily_week_transnational_duration = await daily_duration_model.findAll({
        order: "tstamp ASC",
        where: {
            from_rc: '-',
            to_rc: '+',
            tstamp: {
                $between: [current_week, now],
            }
        }
    });

    let response = [daily_week_internal_status, daily_week_transnational_status, daily_week_internal_duration, daily_week_transnational_duration];
    
    ctx.body = response;
}