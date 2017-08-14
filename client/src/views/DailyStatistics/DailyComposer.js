import React from 'react';
import {message} from 'antd';
import moment from 'moment';
import DailyView from './DailyView';
import {getDailyRequest, getDailyAllRequest} from 'api/DailyApi';

export default class DailyComposer extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            isOpenDialog: false,
            queryDailyData: null,
            spinLoading: false,
            formValues: null
        }
    }

    //把from_rc, to_rc, tstamp都相同的数据合并同时相关数据相加
    mergeData = (data) => {
        for(let arr of data) {
            var length = arr.length, i, j;
            var arrItem = arr[0];
            for (i = 0; i < length; i++) {
                for (j = i + 1; j < length; j++) {
                    if(arrItem.total_dur) { //包含total_dur属性，则执行duration数组合并操作
                        var from_rc = arr[i].from_rc,
                            to_rc = arr[i].to_rc,
                            tstampFormat = moment(arr[i].tstamp).format("YYYY-MM-DD"),
                            total = arr[i].total,
                            total_dur = arr[i].total_dur,
                            nextFrom_rc = arr[j].from_rc,
                            nextTo_rc = arr[j].to_rc,
                            nextTstampFormat = moment(arr[j].tstamp).format("YYYY-MM-DD"),
                            nextTotal = arr[j].total,
                            nextTotal_dur = arr[j].total_dur;
                        if (from_rc === nextFrom_rc && to_rc === nextTo_rc && moment(tstampFormat).isSame(nextTstampFormat)) {
                            arr[i].total = total + nextTotal;
                            arr[i].total_dur = total_dur + nextTotal_dur;
                            arr.splice(j,1);
                            j--;
                            length--;
                        }
                    } else {  //不包含total_dur属性，则执行status数组合并操作
                        var from_rc = arr[i].from_rc,
                            to_rc = arr[i].to_rc,
                            tstampFormat = moment(arr[i].tstamp).format("YYYY-MM-DD"),
                            total = arr[i].total,
                            accept = arr[i].accept,
                            failed = arr[i].failed,
                            wait_num = arr[i].wait_num,
                            wait_ms = arr[i].wait_ms,
                            nextFrom_rc = arr[j].from_rc,
                            nextTo_rc = arr[j].to_rc,
                            nextTstampFormat = moment(arr[j].tstamp).format("YYYY-MM-DD"),
                            nextTotal = arr[j].total,
                            nextAccept = arr[j].accept,
                            nextFailed = arr[j].failed,
                            nextWait_num = arr[j].wait_num,
                            nextWait_ms = arr[j].wait_ms;
                        if (from_rc === nextFrom_rc && to_rc === nextTo_rc && moment(tstampFormat).isSame(nextTstampFormat)) {
                            arr[i].total = total + nextTotal;
                            arr[i].accept = accept + nextAccept;
                            arr[i].failed = failed + nextFailed;
                            arr[i].wait_num = wait_num + nextWait_num;
                            arr[i].wait_ms = wait_ms + nextWait_ms;
                            arr.splice(j,1);
                            j--;
                            length--;
                        }
                    }

                    if(moment(nextTstampFormat).isAfter(moment(tstampFormat))) { //数据库取出来的数据是按照时间大小排序，后面的数据大于前面的数据，那么后面的数据中就必然没有与之前相同的数据，跳出循环，减少循环次数
                        break;
                    }
                    
                }
            }
        }
        return data;
    }

    componentWillMount() {
        (async () => {
            this.setState({spinLoading: true});
            let response = await getDailyAllRequest();
            let data = response.data;
            let mergeData = this.mergeData(data);
            if(response.ok) {
                this.setState({ 
                    queryDailyData: mergeData,
                    spinLoading: false
                 });
                message.success("query Successfully!");
            } else {
                message.error("query failed!");
            }
        })();
    }

    handleQueryDaily = async (values, finished, stopLoading) => {
        this.setState({
            queryDailyData: null,
            spinLoading: true
        });
        let response = await getDailyRequest(values);
        let data = response.data;
        let mergeData = this.mergeData(data);
        if(response.ok) {
            this.setState({ 
                queryDailyData: mergeData,
                spinLoading: false,
                formValues: values
            });
            finished();
            message.success("query Successfully!");
        } else {
            stopLoading();
            message.error("query failed!");
        }
    }

    handleClickQueryAll = async (stopLoading) => {
        this.setState({
            queryDailyData: null,
            spinLoading: true
        });
        let response = await getDailyAllRequest();
        let data = response.data;
        let mergeData = this.mergeData(data);
        if(response.ok) {
            this.setState({ 
                queryDailyData: mergeData,
                spinLoading: false
            });
            stopLoading();
            message.success("query Successfully!");
        } else {
            stopLoading();
            message.error("query failed!");
        }
    }

    handleToggleDialog = (isShow)=> {
        this.setState({isOpenDialog: isShow});
    }

    render() {
        return (
            <DailyView actions={this} store={this.state} />
        )
    }

}
