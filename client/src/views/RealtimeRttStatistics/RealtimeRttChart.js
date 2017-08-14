import React from 'react';
import { Card, Button } from 'antd';
import moment from 'moment';
import Echart from 'components/Echart';
import _ from 'underscore';

export default class RealtimeRttChart extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
        };
    }

    shouldComponentUpdate(nextProps, nextState) {
        if (_.isEqual(this.props, nextProps) || !_.isEmpty(this.props)) {
            return false
        }
        return true
    }

    getOption = () => {
        const { queryRealtimeRttData, isFilter, x_filter_data1, x_filter_data2, x_week_data1, x_week_data2 } = this.props.store;
        const currentRealtimeRttData = queryRealtimeRttData[0];
        const lastRealtimeRttData = queryRealtimeRttData[1];
        let y_current_rtt_data = [];
        let y_last_rtt_data = [];
        let y_current_loss_data = [];
        let y_last_loss_data = [];
        let x_current_realtime_data = null;
        let x_last_realtime_data = null;
        if(isFilter) { //筛选条件查询
            x_current_realtime_data = x_filter_data1;
            x_last_realtime_data = x_filter_data2;
        } else {    //查询最近一周全部
            x_current_realtime_data = x_week_data1;
            x_last_realtime_data = x_week_data2;
        }
        var j = 0
        for(var i = 0; i < x_current_realtime_data.length; i ++) {
            let isHaveData = false;
            for (; j < currentRealtimeRttData.length; j ++) {
                var { tstamp, rtt, loss, count } = currentRealtimeRttData[j],
                     tstampFormat = moment(tstamp).format("YYYY-MM-DD HH:mm"),
                     rttRate = (rtt / count).toFixed(1), //平均延时时长(毫秒)
                     lossRate = (loss / count).toFixed(1); //丢包率
                if(moment(tstampFormat).isSame(x_current_realtime_data[i])) {
                    isHaveData = true;
                    y_current_rtt_data.push(rttRate);
                    y_current_loss_data.push(lossRate);
                }
                if(moment(tstampFormat).isAfter(x_current_realtime_data[i])) {
                    if(j > 0) j--;
                    break;
                }
            }
            if(!isHaveData) {
                y_current_rtt_data.push('');
                y_current_loss_data.push('');
            }
        }

        var m = 0;
        for(var i = 0; i < x_last_realtime_data.length; i ++) {
            let isHaveData = false;
            for (; m < lastRealtimeRttData.length; m ++) {
                var { tstamp, rtt, loss, count } = lastRealtimeRttData[m],
                     tstampFormat = moment(tstamp).format("YYYY-MM-DD HH:mm"),
                     rttRate = (rtt / count).toFixed(1), //平均延时时长(毫秒)
                     lossRate = (loss / count).toFixed(1); //丢包率
                if(moment(tstampFormat).isSame(x_last_realtime_data[i])) {
                    isHaveData = true;
                    y_last_rtt_data.push(rttRate);
                    y_last_loss_data.push(lossRate);
                }
                if(moment(tstampFormat).isAfter(x_last_realtime_data[i])) {
                    if(m > 0) m--;
                    break;
                }
            }
            if(!isHaveData) {
                y_last_rtt_data.push('');
                y_last_loss_data.push('');
            }
        }

        let option = {
            title: {
                text: '实时延时丢包图',
                x: 'center',
                align: 'right',
                top: 20
            },
            grid: {
                top: 80,
                bottom: 80
            },
            toolbox: {
                feature: {
                    dataZoom: {
                        yAxisIndex: 'none'
                    },
                    restore: {},
                    saveAsImage: {}
                }
            },
            tooltip: {
                trigger: 'axis',
                axisPointer: {
                    type: 'cross',
                    animation: true,
                    label: {
                        backgroundColor: '#505765'
                    }
                }
            },
            legend: {
                data:['当前平均延时时长', '当前丢包率', '上一时间段平均延时时长', '上一时间段丢包率'],
                left: 'left'
            },
            dataZoom: [
                {
                    show: true,
                    realtime: true,
                    start: 0,
                    end: 100,
                    xAxisIndex: [0, 1],
                    handleIcon: 'M10.7,11.9v-1.3H9.3v1.3c-4.9,0.3-8.8,4.4-8.8,9.4c0,5,3.9,9.1,8.8,9.4v1.3h1.3v-1.3c4.9-0.3,8.8-4.4,8.8-9.4C19.5,16.3,15.6,12.2,10.7,11.9z M13.3,24.4H6.7V23h6.6V24.4z M13.3,19.6H6.7v-1.4h6.6V19.6z',
                    handleSize: '80%',
                    handleStyle: {
                        color: '#fff',
                        shadowBlur: 3,
                        shadowColor: 'rgba(0, 0, 0, 0.6)',
                        shadowOffsetX: 2,
                        shadowOffsetY: 2
                    }
                },
                {
                    type: 'inside',
                    realtime: true,
                    xAxisIndex: [0, 1],
                    start: 0,
                    end: 100
                }
            ],
            xAxis: [
                {
                    type: 'category',
                    boundaryGap: false,
                    axisLine: { onZero: false },
                    data: x_current_realtime_data
                },
                {
                    type: 'category',
                    boundaryGap: false,
                    axisLine: { onZero: false },
                    data: x_last_realtime_data
                }
            ],
            yAxis: [
                {
                    name: '平均延时时长(毫秒)',
                    type: 'value',
                    nameGap: 30,
                },
                {
                    name: '丢包率(%)',
                    type: 'value',
                    max: 100,
                    nameGap: 30,
                }
            ],
            series: [
                {
                    name: '当前平均延时时长',
                    type: 'line',
                    animation: true,
                    xAxisIndex: 0,
                    yAxisIndex: 0,
                    lineStyle: {
                        normal: {
                            width: 2
                        }
                    },
                    data: y_current_rtt_data
                },
                {
                    name: '当前丢包率',
                    type: 'line',
                    animation: true,
                    yAxisIndex: 1,
                    xAxisIndex: 0,
                    lineStyle: {
                        normal: {
                            width: 2
                        }
                    },
                    data: y_current_loss_data
                },
                             {
                    name: '上一时间段平均延时时长',
                    type: 'line',
                    animation: true,
                    xAxisIndex: 1,
                    yAxisIndex: 0,
                    lineStyle: {
                        normal: {
                            width: 2
                        }
                    },
                    data: y_last_rtt_data
                },
                {
                    name: '上一时间段丢包率',
                    type: 'line',
                    animation: true,
                    yAxisIndex:1,
                    xAxisIndex: 1,
                    lineStyle: {
                        normal: {
                            width: 2
                        }
                    },
                    data: y_last_loss_data
                }
            ]
        };
        return option;
    }

    render() {
        const { actions, store } = this.props;
        var startTime = new Date();
        const option = this.getOption();
        var endTime = new Date();
        var time = endTime.getTime() - startTime.getTime();
        console.log("Rtt:" + time);
        return (
            <Card>
                <Echart refName="RealtimeRttChart" options={option} style={{ height: 400 }}></Echart>
            </Card>
        );
    }
}
