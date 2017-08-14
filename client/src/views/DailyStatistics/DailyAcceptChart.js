import React from 'react';
import { Card, Button } from 'antd';
import Echart from 'components/Echart';
import moment from 'moment';
import option from 'components/EchartTheme';

export default class RealtimeAcceptChart extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
        };
    }

    //根据筛选条件绘制表格，有一条线
    getFilterOption = () => {
        const { queryDailyData } = this.props.store,
            dailyStatusData = queryDailyData[0], //当前选择时间数据
            title = '日接通率图',
            ytitle = '接通率(%)',
            mark = '接通率';

        let x_time_data = [];
        let y_daily_data = [];
        for (let key of dailyStatusData) {
            var { tstamp, total, accept } = key;
            var tstampFormat = moment(tstamp).format("YYYY-MM-DD");
            var acceptRate = (accept / total * 100).toFixed(1);
            x_time_data.push(tstampFormat);
            y_daily_data.push(acceptRate);
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
            dailyInternalStatusData = queryDailyData[0], //国内数据
            dailyTransnationalStatusData = queryDailyData[1], //跨国数据
            title = '日接通率图',
            ytitle = '接通率(%)',
            mark1 = '国内接通率',
            mark2 = '跨国接通率';

        let x_internal_data = [];
        let x_transnational_data = [];
        let y_internal_data = [];
        let y_transnational_data = [];
        for (let key of dailyInternalStatusData) {
            var { tstamp, total, accept } = key;
            var tstampFormat = moment(tstamp).format("YYYY-MM-DD");
            var acceptRate = (accept / total * 100).toFixed(1);
            x_internal_data.push(tstampFormat);
            y_internal_data.push(acceptRate);
        }

        for (let key of dailyTransnationalStatusData) {
            var { tstamp, total, accept } = key;
            var tstampFormat = moment(tstamp).format("YYYY-MM-DD");
            var acceptRate = (accept / total * 100).toFixed(1);
            x_transnational_data.push(tstampFormat);
            y_transnational_data.push(acceptRate);
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
                <Echart refName="dailyAcceptChart" options={setOption} style={{ height: 400 }}></Echart>
            </Card>
        );
    }
}
