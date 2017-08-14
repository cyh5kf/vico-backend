import React from 'react';
import { message } from 'antd';
import RealtimeView from './RealtimeView';
import { getRealtimeRequest, getRealtimeAllRequest } from 'api/RealtimeApi';
import { getXTimeData, getTimeWeek, getSelectTime, mergeRealtimeData } from 'utils/TimeFormat';

export default class RealtimeComposer extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            isOpenDialog: false,
            queryRealtimeData: null,
            spinLoading: false,
            formValues: null,
            x_filter_data1: null,
            x_filter_data2: null,
            x_week_data1: null,
            x_week_data2: null,
            selectValue: 1
        }
    }
    
    componentWillMount() {
        (async () => {
            this.setState({ spinLoading: true });
            const response = await getRealtimeAllRequest();
            const data = response.data;
            var startTime = new Date();
            const timeWeek = getTimeWeek(); //取当前周起始时间和上一周起始时间
            const timeData = getXTimeData(timeWeek); //取x轴时间间隔数组
            const mergeData = mergeRealtimeData(data, timeWeek); //合并在同一时间间隔内的数据
            var endTime = new Date();
            var time = endTime.getTime() - startTime.getTime();
            console.log("realtime-x:" + time);
            const x_week_data1 = timeData[0];
            const x_week_data2 = timeData[1];
            if (response.ok) {
                this.setState({
                    queryRealtimeData: mergeData,
                    spinLoading: false,
                    x_week_data1: x_week_data1,
                    x_week_data2: x_week_data2
                });
                message.success("query Successfully!");
            } else {
                message.error("query failed!");
            }
        })();
    }

    handleQueryRealTime = async (values, finished, stopLoading) => {
        this.setState({
            queryRealtimeData: null,
            spinLoading: true
        });
        const response = await getRealtimeRequest(values);
        const data = response.data;
        var startTime = new Date();
        const timeSelect = getSelectTime(values); //取当前选择的起始时间和上一平移时间的起始时间
        const timeData = getXTimeData(timeSelect); //取x轴时间间隔数组
        const mergeData = mergeRealtimeData(data, timeSelect); //合并在同一时间间隔内的数据
        var endTime = new Date();
        var time = endTime.getTime() - startTime.getTime();
        console.log("realtime-x:" + time);
        const x_filter_data1 = timeData[0];
        const x_filter_data2 = timeData[1];
        if (response.ok) {
            this.setState({
                queryRealtimeData: mergeData,
                spinLoading: false,
                formValues: values,
                x_filter_data1: x_filter_data1,
                x_filter_data2: x_filter_data2
            });
            finished();
            this.handleSelectValue(1);
            message.success("query Successfully!");
        } else {
            stopLoading();
            message.error("query failed!");
        }
    }

    handleQueryDropdown= async (values) => {
        this.setState({
            queryRealtimeData: null,
            spinLoading: true
        });
        const response = await getRealtimeRequest(values);
        const data = response.data;
        var startTime = new Date();
        const timeSelect = getSelectTime(values);
        const timeData = getXTimeData(timeSelect);
        const mergeData = mergeRealtimeData(data, timeSelect);
        var endTime = new Date();
        var time = endTime.getTime() - startTime.getTime();
        console.log("realtime-x:" + time);
        const x_filter_data1 = timeData[0];
        const x_filter_data2 = timeData[1];
        if (response.ok) {
            this.setState({
                queryRealtimeData: mergeData,
                spinLoading: false,
                formValues: values,
                x_filter_data1: x_filter_data1,
                x_filter_data2: x_filter_data2
            });
            message.success("query Successfully!");
        } else {
            message.error("query failed!");
        }
    }

    handleClickQueryAll = async (stopLoading) => {
        this.setState({
            queryRealtimeData: null,
            spinLoading: true
        });
        let response = await getRealtimeAllRequest();
        let data = response.data;
        var startTime = new Date();
        const timeWeek = getTimeWeek(); //取当前周起始时间和上一周起始时间
        const timeData = getXTimeData(timeWeek); //取x轴时间间隔数组
        const mergeData = mergeRealtimeData(data, timeWeek); //合并在同一时间间隔内的数据
        var endTime = new Date();
        var time = endTime.getTime() - startTime.getTime();
        console.log("realtime-x:" + time);
        const x_week_data1 = timeData[0];
        const x_week_data2 = timeData[1];
        if (response.ok) {
            this.setState({
                queryRealtimeData: mergeData,
                spinLoading: false,
                x_week_data1: x_week_data1,
                x_week_data2: x_week_data2
            });
            stopLoading();
            this.handleSelectValue(1);
            message.success("query Successfully!");
        } else {
            stopLoading();
            message.error("query failed!");
        }
    }

    handleToggleDialog = (isShow) => {
        this.setState({ isOpenDialog: isShow });
    }

    handleSelectValue = (value) => {
        this.setState({ selectValue: value });
    }

    render() {
        return (
            <RealtimeView actions={this} store={this.state} />
        )
    }

}
