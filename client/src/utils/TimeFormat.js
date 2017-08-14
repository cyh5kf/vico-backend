import moment from 'moment';

//获取从最小时间到最大时间之间按不同时间间隔取的的所有时间点数据
export const getXTimeData = (time) => {
    var currentTime = time[0],
         lastTime = time[1],
         minTime1 = currentTime[0],
         maxTime1 = currentTime[1],
         minTime2 = lastTime[0],
         maxTime2 = lastTime[1],
         timeDuration = moment(maxTime1).diff(minTime1, 'days'), //计算该时间段共有多少天
         minTimeFormat1 = moment(minTime1).format("YYYY-MM-DD HH:mm"),
         minTimeFormat2 = moment(minTime2).format("YYYY-MM-DD HH:mm"),
         getMin = moment(minTimeFormat1).minutes(),  //取开始时间分钟数
         getS = getMin % 10,
         newMinTimeFormat1 = null,
         newMinTime1 = null,
         newMinTimeFormat2 = null,
         newMinTime2 = null;
    if(timeDuration <= 2) {
        if(getS < 5) {
            getMin  = getMin - getS; //分钟个位数小于5则减去个位数
        } else {
            getMin  = getMin - getS + 10; //分钟数个位数大于5则减去个位数并加上10分钟
        }
        newMinTimeFormat1 = moment(minTimeFormat1).minutes(getMin).format("YYYY-MM-DD HH:mm");
        newMinTime1 = moment(minTimeFormat1).minutes(getMin).valueOf();
        newMinTimeFormat2 = moment(minTimeFormat2).minutes(getMin).format("YYYY-MM-DD HH:mm");
        newMinTime2 = moment(minTimeFormat2).minutes(getMin).valueOf();
    } else {
        if (getMin < 30) { //小于半小时，则分钟归零
            newMinTimeFormat1 = moment(minTimeFormat1).minutes('00').format("YYYY-MM-DD HH:mm");
            newMinTime1 = moment(minTimeFormat1).minutes('00').valueOf();
            newMinTimeFormat2 = moment(minTimeFormat2).minutes('00').format("YYYY-MM-DD HH:mm");
            newMinTime2 = moment(minTimeFormat2).minutes('00').valueOf();
        } else { //大于半小时，则加一个小时，分钟归零
            newMinTimeFormat1 = moment(minTimeFormat1).add(1, 'h').minutes('00').format("YYYY-MM-DD HH:mm");
            newMinTime1 = moment(minTimeFormat1).add(1, 'h').minutes('00').valueOf();
            newMinTimeFormat2 = moment(minTimeFormat2).add(1, 'h').minutes('00').format("YYYY-MM-DD HH:mm");
            newMinTime2 = moment(minTimeFormat2).add(1, 'h').minutes('00').valueOf();
        }
    }
    var x1 = [];
    var x2 = [];
    x1.push(newMinTimeFormat1); //把开始时间放入数组
    x2.push(newMinTimeFormat2);
    if(timeDuration <= 2) {  //小于等于2天的时间，时间间隔为10分钟
        var timeLength = Math.floor((maxTime1 - minTime1) / (1000 * 60 * 10));
        for (var i = 1; i <= timeLength; i++) {
            newMinTime1 = moment(newMinTime1).add(10, 'minutes').format("YYYY-MM-DD HH:mm");
            x1.push(newMinTime1);
            newMinTime2 = moment(newMinTime2).add(10, 'minutes').format("YYYY-MM-DD HH:mm");
            x2.push(newMinTime2);
        }
    } else if (timeDuration > 2 && timeDuration <= 7) { //小于等于一周的时间，时间间隔为半小时
        var timeLength = Math.floor((maxTime1 - minTime1) / (1000 * 60 * 30));
        for (var i = 1; i <= timeLength; i++) {
            newMinTime1 = moment(newMinTime1).add(30, 'minutes').format("YYYY-MM-DD HH:mm");
            x1.push(newMinTime1);
            newMinTime2 = moment(newMinTime2).add(30, 'minutes').format("YYYY-MM-DD HH:mm");
            x2.push(newMinTime2);
        }
    } else if (timeDuration > 7 && timeDuration <= 14) { //小于等于两周的时间，时间间隔为一小时
        var timeLength = moment(maxTime1).diff(minTime1, 'h');
        for (var i = 1; i <= timeLength; i++) {
            newMinTime1 = moment(newMinTime1).add(1, 'h').format("YYYY-MM-DD HH:mm");
            x1.push(newMinTime1);
            newMinTime2 = moment(newMinTime2).add(1, 'h').format("YYYY-MM-DD HH:mm");
            x2.push(newMinTime2);
        }
    } else if (timeDuration > 14 && timeDuration <= 28) { //小于等于四周的时间，时间间隔为两小时
        var timeLength = Math.floor((maxTime1 - minTime1) / (1000 * 60 * 60 * 2));
        for (var i = 1; i <= timeLength; i++) {
            newMinTime1 = moment(newMinTime1).add(2, 'h').format("YYYY-MM-DD HH:mm");
            x1.push(newMinTime1);
            newMinTime2 = moment(newMinTime2).add(2, 'h').format("YYYY-MM-DD HH:mm");
            x2.push(newMinTime2);
        }
    } else if (timeDuration > 28) { //大于四周的时间，时间间隔为三小时
        var timeLength = Math.floor((maxTime1 - minTime1) / (1000 * 60 * 60 * 3));
        for (var i = 1; i <= timeLength; i++) {
            newMinTime1 = moment(newMinTime1).add(3, 'h').format("YYYY-MM-DD HH:mm");
            x1.push(newMinTime1);
            newMinTime2 = moment(newMinTime2).add(3, 'h').format("YYYY-MM-DD HH:mm");
            x2.push(newMinTime2);
        }
    }

    var x_data_min_array = [x1, x2];
    return x_data_min_array;

}

//获取当前一周的开始时间和结束时间，上一周的开始时间和结束时间
export const getTimeWeek = () => {
    const current_week = moment().subtract(7, 'days').valueOf(),
        last_week = moment().subtract(14, 'days').valueOf(),
        now = moment().valueOf(),
        currentTime = [current_week, now],
        lastTime = [last_week, current_week],
        timeWeek = [currentTime, lastTime];

    return timeWeek;
}

//获取当前选择时间的开始时间和结束时间，以及往前平移的开始时间和结束时间
export const getSelectTime = (formValues) => {
    const { range_time_picker, moveWeek } = formValues,
        current_start_time = range_time_picker[0],
        current_end_time = range_time_picker[1],
        current_start_time_utc = moment(current_start_time).valueOf(),
        current_end_time_utc = moment(current_end_time).valueOf(),
        last_start_time_utc = moment(current_start_time).subtract(moveWeek, 'weeks').valueOf(),
        last_end_time_utc = moment(current_end_time).subtract(moveWeek, 'weeks').valueOf(),
        currentSelectTime = [current_start_time_utc, current_end_time_utc],
        lastSelectTime = [last_start_time_utc, last_end_time_utc],
        timeSelect = [currentSelectTime, lastSelectTime];

    return timeSelect;
}

//实时数据合并，把from_rc, to_rc, tstamp都相同的数据合并同时相关数据相加
export const mergeRealtimeData = (data, timeData) => {
    const currentTime = timeData[0],
        minTime1 = currentTime[0],
        maxTime1 = currentTime[1],
        timeDuration = moment(maxTime1).diff(minTime1, 'days'); //计算该时间段共有多少天
    for (let arr of data) {
        var length = arr.length, i, j;
        var arrItem = arr[0];
        for (i = 0; i < length; i++) {
            if(i === (length -1)) {  //当数据为最后一个时，不用去比较，直接格式化时间
                var tstamp = arr[i].tstamp;
                var getMin = moment(tstamp).minutes();
                if (timeDuration > 2 && timeDuration <= 7) { //小于等于一周的时间，时间间隔为半小时
                    if (getMin < 30) {
                        arr[i].tstamp = moment(arr[i].tstamp).set('minutes', '00').valueOf();
                    } else {
                        arr[i].tstamp = moment(arr[i].tstamp).set('minutes', 30).valueOf();
                    }
                } else if (timeDuration > 7 && timeDuration <= 14) { //小于等于两周的时间，时间间隔为一小时
                    arr[i].tstamp = moment(arr[i].tstamp).set('minutes', '00').valueOf();

                } else if (timeDuration > 14 && timeDuration <= 28) { //小于等于四周的时间，时间间隔为两小时
                    arr[i].tstamp = moment(arr[i].tstamp).set('minutes', '00').valueOf();

                } else if (timeDuration > 28) { //大于四周的时间，时间间隔为三小时
                    arr[i].tstamp = moment(arr[i].tstamp).set('minutes', '00').valueOf();
                }
                break;
            }
            for (j = i + 1; j < length; j++) {
                if (arrItem.total_dur) { //包含total_dur属性，则执行duration数组合并操作
                    var from_rc = arr[i].from_rc,
                        to_rc = arr[i].to_rc,
                        tstamp = arr[i].tstamp,
                        total = arr[i].total,
                        total_dur = arr[i].total_dur,
                        nextFrom_rc = arr[j].from_rc,
                        nextTo_rc = arr[j].to_rc,
                        nextTstamp = arr[j].tstamp,
                        nextTotal = arr[j].total,
                        nextTotal_dur = arr[j].total_dur;
                    if (timeDuration <= 2) { //小于等于一周的时间，时间间隔为10分钟
                        var tstampFormat = moment(tstamp).format("YYYY-MM-DD HH"),
                            nextTstampFormat = moment(nextTstamp).format("YYYY-MM-DD HH"),
                            getMin = moment(tstamp).minutes(), //分钟数十位相等则合并
                            nextGetMin = moment(nextTstamp).minutes();
                        if (from_rc === nextFrom_rc && to_rc === nextTo_rc && moment(tstampFormat).isSame(nextTstampFormat) && getMin === nextGetMin) {  //两个时间点处于同一10分钟内合并
                            arr[i].total = total + nextTotal;
                            arr[i].total_dur = total_dur + nextTotal_dur;
                            arr.splice(j, 1);
                            j--;
                            length--;
                        } else { //小时 不相等则跳出循环
                            break;
                        }
                    } else if (timeDuration > 2 && timeDuration <= 7) { //小于等于一周的时间，时间间隔为半小时
                        var tstampFormat = moment(tstamp).format("YYYY-MM-DD HH"),
                            nextTstampFormat = moment(nextTstamp).format("YYYY-MM-DD HH"),
                            getMin = moment(tstamp).minutes(), //小于30分，则数据合并为上一个整点，大于等于30分，则数据合并为30分钟这个点上
                            nextGetMin = moment(nextTstamp).minutes();
                        if (from_rc === nextFrom_rc && to_rc === nextTo_rc && moment(tstampFormat).isSame(nextTstampFormat) && getMin < 30 && nextGetMin < 30 || getMin >= 30 && nextGetMin >= 30) {  //两个时间点处于同一半小时内合并
                            arr[i].total = total + nextTotal;
                            arr[i].total_dur = total_dur + nextTotal_dur;
                            arr.splice(j, 1);
                            j--;
                            length--;
                        } else { //小时 不相等，则将第一个时间点置于整点或者半点
                            if (getMin < 30) {
                                arr[i].tstamp = moment(arr[i].tstamp).set('minutes', '00').valueOf();
                            } else {
                                arr[i].tstamp = moment(arr[i].tstamp).set('minutes', 30).valueOf();
                            }
                            break;
                        }
                    } else if (timeDuration > 7 && timeDuration <= 14) { //小于等于两周的时间，时间间隔为一小时
                        var tstampFormat = moment(tstamp).format("YYYY-MM-DD HH"),
                            nextTstampFormat = moment(nextTstamp).format("YYYY-MM-DD HH");
                        if (from_rc === nextFrom_rc && to_rc === nextTo_rc && moment(tstampFormat).isSame(nextTstampFormat)) { //小时相等合并
                            arr[i].total = total + nextTotal;
                            arr[i].total_dur = total_dur + nextTotal_dur;
                            arr.splice(j, 1);
                            j--;
                            length--;
                        } else {
                            arr[i].tstamp = moment(arr[i].tstamp).set('minutes', '00').valueOf();
                            break;
                        }

                    } else if (timeDuration > 14 && timeDuration <= 28) { //小于等于四周的时间，时间间隔为两小时
                        var tstampFormatDay = moment(tstamp).format("YYYY-MM-DD"),
                            nextTstampFormatDay = moment(nextTstamp).format("YYYY-MM-DD"),
                            getHours = moment(tstamp).hours(),
                            nextGetHours = moment(nextTstamp).hours();
                        if (from_rc === nextFrom_rc && to_rc === nextTo_rc && moment(tstampFormatDay).isSame(nextTstampFormatDay) && nextGetHours - getHours < 2) { //两个时间在两个小时之内合并
                            arr[i].total = total + nextTotal;
                            arr[i].total_dur = total_dur + nextTotal_dur;
                            arr.splice(j, 1);
                            j--;
                            length--;
                        } else {
                            arr[i].tstamp = moment(arr[i].tstamp).set('minutes', '00').valueOf();
                            break;
                        }

                    } else if (timeDuration > 28) { //大于四周的时间，时间间隔为三小时
                        var tstampFormatDay = moment(tstamp).format("YYYY-MM-DD"),
                            nextTstampFormatDay = moment(nextTstamp).format("YYYY-MM-DD"),
                            getHours = moment(tstamp).hours(),
                            nextGetHours = moment(nextTstamp).hours();
                        if (from_rc === nextFrom_rc && to_rc === nextTo_rc && moment(tstampFormatDay).isSame(nextTstampFormatDay) && nextGetHours - getHours < 3) { //两个时间在三个小时之内合并
                            arr[i].total = total + nextTotal;
                            arr[i].total_dur = total_dur + nextTotal_dur;
                            arr.splice(j, 1);
                            j--;
                            length--;
                        } else {
                            arr[i].tstamp = moment(arr[i].tstamp).set('minutes', '00').valueOf();
                            break;
                        }
                    }

                } else {  //不包含total_dur属性，则执行status数组合并操作
                    var from_rc = arr[i].from_rc,
                        to_rc = arr[i].to_rc,
                        tstamp = arr[i].tstamp,
                        total = arr[i].total,
                        accept = arr[i].accept,
                        failed = arr[i].failed,
                        wait_num = arr[i].wait_num,
                        wait_ms = arr[i].wait_ms,
                        nextFrom_rc = arr[j].from_rc,
                        nextTo_rc = arr[j].to_rc,
                        nextTstamp = arr[j].tstamp,
                        nextTotal = arr[j].total,
                        nextAccept = arr[j].accept,
                        nextFailed = arr[j].failed,
                        nextWait_num = arr[j].wait_num,
                        nextWait_ms = arr[j].wait_ms;
                    if (timeDuration <= 2) { //小于等于一周的时间，时间间隔为10分钟
                        var tstampFormat = moment(tstamp).format("YYYY-MM-DD HH"),
                            nextTstampFormat = moment(nextTstamp).format("YYYY-MM-DD HH"),
                            getMin = moment(tstamp).minutes(), //分钟数十位相等则合并
                            nextGetMin = moment(nextTstamp).minutes();
                            
                        if (from_rc === nextFrom_rc && to_rc === nextTo_rc && moment(tstampFormat).isSame(nextTstampFormat) && getMin === nextGetMin) {  //两个时间点处于同一10分钟内合并
                            arr[i].total = total + nextTotal;
                            arr[i].accept = accept + nextAccept;
                            arr[i].failed = failed + nextFailed;
                            arr[i].wait_num = wait_num + nextWait_num;
                            arr[i].wait_ms = wait_ms + nextWait_ms;
                            arr.splice(j, 1);
                            j--;
                            length--;
                        } else { //分钟十位数不相等，则跳出循环
                            break;
                        }
                    } else if (timeDuration > 2 && timeDuration <= 7) { //小于等于一周的时间，时间间隔为半小时
                        var tstampFormat = moment(tstamp).format("YYYY-MM-DD HH"),
                            nextTstampFormat = moment(nextTstamp).format("YYYY-MM-DD HH"),
                            getMin = moment(tstamp).minutes(), //小于30分，则数据合并为上一个整点，大于等于30分，则数据合并为30分钟这个点上
                            nextGetMin = moment(nextTstamp).minutes();
                        if (from_rc === nextFrom_rc && to_rc === nextTo_rc && moment(tstampFormat).isSame(nextTstampFormat) && getMin < 30 && nextGetMin < 30 || getMin >= 30 && nextGetMin >= 30) {  //两个时间点处于同一半小时内合并
                            arr[i].total = total + nextTotal;
                            arr[i].accept = accept + nextAccept;
                            arr[i].failed = failed + nextFailed;
                            arr[i].wait_num = wait_num + nextWait_num;
                            arr[i].wait_ms = wait_ms + nextWait_ms;
                            arr.splice(j, 1);
                            j--;
                            length--;
                        } else { //小时 不相等，则将第一个时间点置于整点或者半点
                            if (getMin < 30) {
                                arr[i].tstamp = moment(arr[i].tstamp).set('minutes', '00').valueOf();
                            } else {
                                arr[i].tstamp = moment(arr[i].tstamp).set('minutes', 30).valueOf();
                            }
                            break;
                        }
                    } else if (timeDuration > 7 && timeDuration <= 14) { //小于等于两周的时间，时间间隔为一小时
                        var tstampFormat = moment(tstamp).format("YYYY-MM-DD HH"),
                            nextTstampFormat = moment(nextTstamp).format("YYYY-MM-DD HH");
                        if (from_rc === nextFrom_rc && to_rc === nextTo_rc && moment(tstampFormat).isSame(nextTstampFormat)) { //小时相等合并
                            arr[i].total = total + nextTotal;
                            arr[i].accept = accept + nextAccept;
                            arr[i].failed = failed + nextFailed;
                            arr[i].wait_num = wait_num + nextWait_num;
                            arr[i].wait_ms = wait_ms + nextWait_ms;
                            arr.splice(j, 1);
                            j--;
                            length--;
                        } else {
                            arr[i].tstamp = moment(arr[i].tstamp).set('minutes', '00').valueOf();
                            break;
                        }

                    } else if (timeDuration > 14 && timeDuration <= 28) { //小于等于四周的时间，时间间隔为两小时
                        var tstampFormatDay = moment(tstamp).format("YYYY-MM-DD"),
                            nextTstampFormatDay = moment(nextTstamp).format("YYYY-MM-DD"),
                            getHours = moment(tstamp).hours(),
                            nextGetHours = moment(nextTstamp).hours();
                        if (from_rc === nextFrom_rc && to_rc === nextTo_rc && moment(tstampFormatDay).isSame(nextTstampFormatDay) && nextGetHours - getHours < 2) { //两个时间在两个小时之内合并
                            arr[i].total = total + nextTotal;
                            arr[i].accept = accept + nextAccept;
                            arr[i].failed = failed + nextFailed;
                            arr[i].wait_num = wait_num + nextWait_num;
                            arr[i].wait_ms = wait_ms + nextWait_ms;
                            arr.splice(j, 1);
                            j--;
                            length--;
                        } else {
                            arr[i].tstamp = moment(arr[i].tstamp).set('minutes', '00').valueOf();
                            break;
                        }

                    } else if (timeDuration > 28) { //大于四周的时间，时间间隔为三小时
                        var tstampFormatDay = moment(tstamp).format("YYYY-MM-DD"),
                            nextTstampFormatDay = moment(nextTstamp).format("YYYY-MM-DD"),
                            getHours = moment(tstamp).hours(),
                            nextGetHours = moment(nextTstamp).hours();
                        if (from_rc === nextFrom_rc && to_rc === nextTo_rc && moment(tstampFormatDay).isSame(nextTstampFormatDay) && nextGetHours - getHours < 3) { //两个时间在三个小时之内合并
                            arr[i].total = total + nextTotal;
                            arr[i].accept = accept + nextAccept;
                            arr[i].failed = failed + nextFailed;
                            arr[i].wait_num = wait_num + nextWait_num;
                            arr[i].wait_ms = wait_ms + nextWait_ms;
                            arr.splice(j, 1);
                            j--;
                            length--;
                        } else {
                            arr[i].tstamp = moment(arr[i].tstamp).set('minutes', '00').valueOf();
                            break;
                        }
                    }
                }

            }
        }
    }
    return data;
}




//实时丢包延时合并，把from_rc, to_rc, tstamp都相同的数据合并同时相关数据相加
export const mergeRealtimeRttData = (data, timeData) => {
    const currentTime = timeData[0],
        minTime1 = currentTime[0],
        maxTime1 = currentTime[1],
        timeDuration = moment(maxTime1).diff(minTime1, 'days'); //计算该时间段共有多少天
    for (let arr of data) {
        var length = arr.length, i, j;
        for (i = 0; i < length; i++) {
            if(i === (length -1)) { //当数据为最后一个时，不用去比较，直接格式化时间
                var tstamp = arr[i].tstamp;
                var getMin = moment(tstamp).minutes();
                if (timeDuration > 2 && timeDuration <= 7) { //小于等于一周的时间，时间间隔为半小时
                    if (getMin < 30) {
                        arr[i].tstamp = moment(arr[i].tstamp).set('minutes', '00').valueOf();
                    } else {
                        arr[i].tstamp = moment(arr[i].tstamp).set('minutes', 30).valueOf();
                    }
                } else if (timeDuration > 7 && timeDuration <= 14) { //小于等于两周的时间，时间间隔为一小时
                    arr[i].tstamp = moment(arr[i].tstamp).set('minutes', '00').valueOf();

                } else if (timeDuration > 14 && timeDuration <= 28) { //小于等于四周的时间，时间间隔为两小时
                    arr[i].tstamp = moment(arr[i].tstamp).set('minutes', '00').valueOf();

                } else if (timeDuration > 28) { //大于四周的时间，时间间隔为三小时
                    arr[i].tstamp = moment(arr[i].tstamp).set('minutes', '00').valueOf();
                }
                break;
            }
            for (j = i + 1; j < length; j++) {
                var from_rc = arr[i].from_rc,
                    to_rc = arr[i].to_rc,
                    tstamp = arr[i].tstamp,
                    rtt = arr[i].rtt,
                    loss = arr[i].loss,
                    count = arr[i].count,
                    nextFrom_rc = arr[j].from_rc,
                    nextTo_rc = arr[j].to_rc,
                    nextTstamp = arr[j].tstamp,
                    nextRtt = arr[j].rtt,
                    nextLoss = arr[j].loss,
                    nextCount = arr[j].count;
                if (timeDuration <= 2) { //小于等于一周的时间，时间间隔为10分钟
                    var tstampFormat = moment(tstamp).format("YYYY-MM-DD HH"),
                        nextTstampFormat = moment(nextTstamp).format("YYYY-MM-DD HH"),
                        getMin = moment(tstamp).minutes(), //分钟数十位相等则合并
                        nextGetMin = moment(nextTstamp).minutes();
                        
                    if (from_rc === nextFrom_rc && to_rc === nextTo_rc && moment(tstampFormat).isSame(nextTstampFormat) && getMin === nextGetMin) {  //两个时间点处于同一10分钟内合并
                        arr[i].rtt = rtt + nextRtt;
                        arr[i].loss = loss + nextLoss;
                        arr[i].count = count + nextCount;
                        arr.splice(j, 1);
                        j--;
                        length--;
                    } else { //分钟十位数不相等，则跳出循环
                        break;
                    }
                } else if (timeDuration > 2 && timeDuration <= 7) { //小于等于一周的时间，时间间隔为半小时
                    var tstampFormat = moment(tstamp).format("YYYY-MM-DD HH"),
                        nextTstampFormat = moment(nextTstamp).format("YYYY-MM-DD HH"),
                        getMin = moment(tstamp).minutes(), //小于30分，则数据合并为上一个整点，大于等于30分，则数据合并为30分钟这个点上
                        nextGetMin = moment(nextTstamp).minutes();
                    if (from_rc === nextFrom_rc && to_rc === nextTo_rc && moment(tstampFormat).isSame(nextTstampFormat) && getMin < 30 && nextGetMin < 30 || getMin >= 30 && nextGetMin >= 30) {  //两个时间点处于同一半小时内合并
                        arr[i].rtt = rtt + nextRtt;
                        arr[i].loss = loss + nextLoss;
                        arr[i].count = count + nextCount;
                        arr.splice(j, 1);
                        j--;
                        length--;
                    } else { //小时 不相等，则将第一个时间点置于整点或者半点
                        if (getMin < 30) {
                            arr[i].tstamp = moment(arr[i].tstamp).set('minutes', '00').valueOf();
                        } else {
                            arr[i].tstamp = moment(arr[i].tstamp).set('minutes', 30).valueOf();
                        }
                        break;
                    }
                } else if (timeDuration > 7 && timeDuration <= 14) { //小于等于两周的时间，时间间隔为一小时
                    var tstampFormat = moment(tstamp).format("YYYY-MM-DD HH"),
                        nextTstampFormat = moment(nextTstamp).format("YYYY-MM-DD HH");
                    if (from_rc === nextFrom_rc && to_rc === nextTo_rc && moment(tstampFormat).isSame(nextTstampFormat)) { //小时相等合并
                        arr[i].rtt = rtt + nextRtt;
                        arr[i].loss = loss + nextLoss;
                        arr[i].count = count + nextCount;
                        arr.splice(j, 1);
                        j--;
                        length--;
                    } else {
                        arr[i].tstamp = moment(arr[i].tstamp).set('minutes', '00').valueOf();
                        break;
                    }

                } else if (timeDuration > 14 && timeDuration <= 28) { //小于等于四周的时间，时间间隔为两小时
                    var tstampFormatDay = moment(tstamp).format("YYYY-MM-DD"),
                        nextTstampFormatDay = moment(nextTstamp).format("YYYY-MM-DD"),
                        getHours = moment(tstamp).hours(),
                        nextGetHours = moment(nextTstamp).hours();
                    if (from_rc === nextFrom_rc && to_rc === nextTo_rc && moment(tstampFormatDay).isSame(nextTstampFormatDay) && nextGetHours - getHours < 2) { //两个时间在两个小时之内合并
                        arr[i].rtt = rtt + nextRtt;
                        arr[i].loss = loss + nextLoss;
                        arr[i].count = count + nextCount;
                        arr.splice(j, 1);
                        j--;
                        length--;
                    } else {
                        arr[i].tstamp = moment(arr[i].tstamp).set('minutes', '00').valueOf();
                        break;
                    }

                } else if (timeDuration > 28) { //大于四周的时间，时间间隔为三小时
                    var tstampFormatDay = moment(tstamp).format("YYYY-MM-DD"),
                        nextTstampFormatDay = moment(nextTstamp).format("YYYY-MM-DD"),
                        getHours = moment(tstamp).hours(),
                        nextGetHours = moment(nextTstamp).hours();
                    if (from_rc === nextFrom_rc && to_rc === nextTo_rc && moment(tstampFormatDay).isSame(nextTstampFormatDay) && nextGetHours - getHours < 3) { //两个时间在三个小时之内合并
                        arr[i].rtt = rtt + nextRtt;
                        arr[i].loss = loss + nextLoss;
                        arr[i].count = count + nextCount;
                        arr.splice(j, 1);
                        j--;
                        length--;
                    } else {
                        arr[i].tstamp = moment(arr[i].tstamp).set('minutes', '00').valueOf();
                        break;
                    }
                }
            }
        }
    }
    return data;
}

