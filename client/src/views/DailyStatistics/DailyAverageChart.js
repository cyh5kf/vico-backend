import React from 'react';
import { Card, Button } from 'antd';
import Echart from 'components/Echart';
import moment from 'moment';
import option from 'components/EchartTheme';

export default class RealtimeAverageChart extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
        };
    }

    //根据筛选条件绘制表格，有一条线
    getFilterOption = () => {
        const { queryDailyData } = this.props.store,
            dailyDurationData = queryDailyData[1], //当前选择时间数据
            title = '日平均通话时长图',
            ytitle = '平均通话时长(秒)',
            mark = '平均通话时长';

        let x_time_data = [];
        let y_daily_data = [];
        for (let key of dailyDurationData) {
            var { tstamp, total, total_dur } = key;
            var tstampFormat = moment(tstamp).format("YYYY-MM-DD");
            var averageTime = (total_dur / total).toFixed(1);
            x_time_data.push(tstampFormat);
            y_daily_data.push(averageTime);
        }

        const setOption = {
            title: option.title(title),
            grid: option.grid,
            toolbox: option.toolbox,
            tooltip: option.tooltip,
            legend: option.legendOne(mark),
            dataZoom: option.dataZoomOne,
            xAxis: option.xAxisOne(x_time_data),
            yAxis: option.yAxis(ytitle),
            series: option.seriesOne(mark, y_daily_data)
        };
        return setOption;
    }

    //查询所有结果绘制表格，有两条线, 国内数据, 跨国数据
    getAllOption = () => {
        const { queryDailyData } = this.props.store,
            dailyInternalDurationData = queryDailyData[2], //国内数据
            dailyTransnationalDurationData = queryDailyData[3], //跨国数据
            title = '日平均通话时长图',
            ytitle = '平均通话时长(秒)',
            mark1 = '国内平均通话时长',
            mark2 = '跨国平均通话时长';

        let x_internal_data = [];
        let x_transnational_data = [];
        let y_internal_data = [];
        let y_transnational_data = [];
        for (let key of dailyInternalDurationData) {
            var { tstamp, total, total_dur } = key;
            var tstampFormat = moment(tstamp).format("YYYY-MM-DD");
            var averageTime = (total_dur / total).toFixed(1);
            x_internal_data.push(tstampFormat);
            y_internal_data.push(averageTime);
        }

        for (let key of dailyTransnationalDurationData) {
            var { tstamp, total, total_dur } = key;
            var tstampFormat = moment(tstamp).format("YYYY-MM-DD");
            var averageTime = (total_dur / total).toFixed(1);
            x_transnational_data.push(tstampFormat);
            y_transnational_data.push(averageTime);
        }


        const setOption = {
            title: option.title(title),
            grid: option.grid,
            toolbox: option.toolbox,
            tooltip: option.tooltip,
            legend: option.legend(mark1, mark2),
            dataZoom: option.dataZoom,
            xAxis: option.xAxis(x_internal_data, x_transnational_data),
            yAxis: option.yAxis(ytitle),
            series: option.series(mark1, mark2, y_internal_data, y_transnational_data)
        };

        return setOption;
    }

    render() {
        const { actions, store } = this.props;
        const { queryDailyData } = store;
        let setOption = null;
        if (queryDailyData.length === 2) {
            setOption = this.getFilterOption();
        } else {
            setOption = this.getAllOption();
        }

        return (
            <Card>
                <Echart refName="dailyAverageChart" options={setOption} style={{ height: 400 }}></Echart>
            </Card>
        );
    }
}
