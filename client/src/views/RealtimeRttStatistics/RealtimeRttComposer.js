import React from 'react';
import {message} from 'antd';
import RealtimeRttView from './RealtimeRttView';
import {getRealtimeRttRequest, getRealtimeRttAllRequest} from 'api/RealtimeApi';
import { getXTimeData, getTimeWeek, getSelectTime, mergeRealtimeRttData } from 'utils/TimeFormat';

export default class RealtimeRttComposer extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            isOpenDialog: false,
            queryRealtimeRttData: null,
            spinLoading: false,
            formValues: null,
            x_filter_data1: null,
            x_filter_data2: null,
            x_week_data1: null,
            x_week_data2: null,
            isFilter: false,
            selectValue: 1
        }
    }
    
    componentWillMount() {
        (async () => {
            this.setState({spinLoading: true});
            const response = await getRealtimeRttAllRequest();
            const data = response.data;
            var startTime = new Date();
            const timeWeek = getTimeWeek();
            const timeData = getXTimeData(timeWeek);
            const mergeData = mergeRealtimeRttData(data, timeWeek);
            var endTime = new Date();
            var time = endTime.getTime() - startTime.getTime();
            console.log("Rtt-x:" + time);
            const x_week_data1 = timeData[0];
            const x_week_data2 = timeData[1];
            if(response.ok) {
                this.setState({
                    queryRealtimeRttData: mergeData,
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

    handleQueryRealtimeRtt = async (values, finished, stopLoading) => {
        this.setState({
            queryRealtimeRttData: null,
            spinLoading: true
        });
        const response = await getRealtimeRttRequest(values);
        const data = response.data;
        const timeSelect = getSelectTime(values);
        const timeData = getXTimeData(timeSelect);
        const mergeData = mergeRealtimeRttData(data, timeSelect);
        const x_filter_data1 = timeData[0];
        const x_filter_data2 = timeData[1];
        if(response.ok) {
           this.setState({
                queryRealtimeRttData: mergeData,
                spinLoading: false,
                formValues: values,
                x_filter_data1: x_filter_data1,
                x_filter_data2: x_filter_data2,
                isFilter: true
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
            queryRealtimeRttData: null,
            spinLoading: true
        });
        let response = await getRealtimeRttRequest(values);
        let data = response.data;
        const timeSelect = getSelectTime(values);
        const timeData = getXTimeData(timeSelect);
        const mergeData = mergeRealtimeRttData(data, timeSelect);
        const x_filter_data1 = timeData[0];
        const x_filter_data2 = timeData[1];
        if (response.ok) {
            this.setState({
                queryRealtimeRttData: mergeData,
                spinLoading: false,
                formValues: values,
                x_filter_data1: x_filter_data1,
                x_filter_data2: x_filter_data2,
                isFilter: true
            });
            message.success("query Successfully!");
        } else {
            message.error("query failed!");
        }
    }

    handleClickQueryAll = async (stopLoading) => {
        this.setState({
            queryRealtimeRttData: null,
            spinLoading: true
        });
        let response = await getRealtimeRttAllRequest();
        let data = response.data;
        var startTime = new Date();
        const timeWeek = getTimeWeek();
        const timeData = getXTimeData(timeWeek);
        const mergeData = mergeRealtimeRttData(data, timeWeek);
        var endTime = new Date();
        var time = endTime.getTime() - startTime.getTime();
        console.log("realtime-x:" + time);
        const x_week_data1 = timeData[0];
        const x_week_data2 = timeData[1];
        if(response.ok) {
            this.setState({
                queryRealtimeRttData: mergeData,
                spinLoading: false,
                isFilter: false,
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

    handleToggleDialog = (isShow)=> {
        this.setState({isOpenDialog: isShow});
    }

    handleSelectValue = (value) => {
        this.setState({ selectValue: value });
    }

    render() {
        return (
            <RealtimeRttView actions={this} store={this.state}/>
        )
    }

}
