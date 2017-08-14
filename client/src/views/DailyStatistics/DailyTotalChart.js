import React from 'react';
import { Card, Button } from 'antd';
import Echart from 'components/Echart';
import moment from 'moment';
import option from 'components/EchartTheme';

export default class RealtimeTotalChart extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
        };
    }

    //根据筛选条件绘制表格，有一条线
    getFilterOption = () => {
        const { queryDailyData } = this.props.store,
            dailyStatusData = queryDailyData[0], //当前选择时间数据
            title = '日总拨打数图',
            ytitle = '总拨打数',
            mark = '总拨打数';

        let x_time_data = [];
        let y_daily_data = [];
        for (let key of dailyStatusData) {
            var { tstamp, total } = key;
            var tstampFormat = moment(tstamp).format("YYYY-MM-DD");
            x_time_data.push(tstampFormat);
            y_daily_data.push(total);
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
            title = '日总拨打数图',
            ytitle = '总拨打数',
            mark1 = '国内总拨打数',
            mark2 = '跨国总拨打数';

        let x_internal_data = [];
        let x_transnational_data = [];
        let y_internal_data = [];
        let y_transnational_data = [];
        for (let key of dailyInternalStatusData) {
            var { tstamp, total } = key;
            var tstampFormat = moment(tstamp).format("YYYY-MM-DD");
            x_internal_data.push(tstampFormat);
            y_internal_data.push(total);
        }

        for (let key of dailyTransnationalStatusData) {
            var { tstamp, total } = key;
            var tstampFormat = moment(tstamp).format("YYYY-MM-DD");
            x_transnational_data.push(tstampFormat);
            y_transnational_data.push(total);
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
                <Echart refName="dailyTotalChart" options={setOption} style={{ height: 400 }}></Echart>
            </Card>
        );
    }
}
