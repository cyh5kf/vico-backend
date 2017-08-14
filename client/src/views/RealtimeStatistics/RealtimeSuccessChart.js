import React from 'react';
import { Card, Button } from 'antd';
import Echart from 'components/Echart';
import option from 'components/EchartTheme';
import _ from 'underscore';

export default class RealtimeSuccessChart extends React.Component {

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

    //根据筛选条件绘制表格，查询当前时间段和上一时间段的数据
    getFilterOption = () => {
        const { queryRealtimeData, x_filter_data1, x_filter_data2 } = this.props.store,
            currentRealtimeStatusData = queryRealtimeData[0], //当前选择时间数据
            lastRealtimeStatusData = queryRealtimeData[2], //相对于当前选择时间的上一个时间段数据
            optionData = option.getSuccessData(currentRealtimeStatusData, lastRealtimeStatusData, x_filter_data1, x_filter_data2),
            x_current_data = optionData[0],
            x_last_data = optionData[1],
            y_current_data = optionData[2],
            y_last_data = optionData[3],
            title = '实时通话成功率图',
            ytitle = '成功率(%)',
            mark1 = '当前时间段成功率',
            mark2 = '上一时间段成功率';

        const setOption = {
            title: option.title(title),
            grid: option.grid,
            toolbox: option.toolbox,
            tooltip: option.tooltip,
            legend: option.legend(mark1, mark2),
            dataZoom: option.dataZoom,
            xAxis: option.xAxis(x_current_data, x_last_data),
            yAxis: option.yAxis(ytitle),
            series: option.series(mark1, mark2, y_current_data, y_last_data)
        };
        return setOption;
    }

    //查询所有结果绘制表格，有两条线, 当前时间段国内数据, 上一时间段国内数据
    getAllInternalOption = () => {
        const { queryRealtimeData, x_week_data1, x_week_data2 } = this.props.store,
            currentInternalStatusData = queryRealtimeData[0], //当前选择时间国内数据
            lastInternalStatusData = queryRealtimeData[4], //上一个时间段国内数据
            optionData = option.getSuccessData(currentInternalStatusData, lastInternalStatusData, x_week_data1, x_week_data2),
            x_current_data = optionData[0],
            x_last_data = optionData[1],
            y_current_data = optionData[2],
            y_last_data = optionData[3],
            title = '实时通话国内成功率图',
            ytitle = '成功率(%)',
            mark1 = '当前时间段国内成功率',
            mark2 = '上一时间段国内成功率';

        const setOption = {
            title: option.title(title),
            grid: option.grid,
            toolbox: option.toolbox,
            tooltip: option.tooltip,
            legend: option.legend(mark1, mark2),
            dataZoom: option.dataZoom,
            xAxis: option.xAxis(x_current_data, x_last_data),
            yAxis: option.yAxis(ytitle),
            series: option.series(mark1, mark2, y_current_data, y_last_data)
        };

        return setOption;
    }

    //查询所有结果绘制表格，有两条线, 当前时间段跨国数据, 上一时间段跨国数据
    getAllTransnationalOption = () => {
        const { queryRealtimeData, x_week_data1, x_week_data2 } = this.props.store,
            currentTransnationalStatusData = queryRealtimeData[1], //当前选择时间跨国数据
            lastTransnationalStatusData = queryRealtimeData[5], //上一个时间段跨国数据
            optionData = option.getSuccessData(currentTransnationalStatusData, lastTransnationalStatusData, x_week_data1, x_week_data2),
            x_current_data = optionData[0],
            x_last_data = optionData[1],
            y_current_data = optionData[2],
            y_last_data = optionData[3],
            title = '实时通话跨国成功率图',
            ytitle = '成功率(%)',
            mark1 = '当前时间段跨国成功率',
            mark2 = '上一时间段跨国成功率';

        const setOption = {
            title: option.title(title),
            grid: option.grid,
            toolbox: option.toolbox,
            tooltip: option.tooltip,
            legend: option.legend(mark1, mark2),
            dataZoom: option.dataZoom,
            xAxis: option.xAxis(x_current_data, x_last_data),
            yAxis: option.yAxis(ytitle),
            series: option.series(mark1, mark2, y_current_data, y_last_data)
        };
  
        return setOption;
    }

    render() {
        const { actions, store, refName } = this.props;
        const { queryRealtimeData } = store;
        let setOption = null;
        var startTime = new Date();
        if (queryRealtimeData.length === 4) {
            setOption = this.getFilterOption();
        } else {
            if (refName === 'realtimeInternalSuccessChart') {
                setOption = this.getAllInternalOption();
            } else {
                setOption = this.getAllTransnationalOption();
            }
        }
        var endTime = new Date();
        var time = endTime.getTime() - startTime.getTime();
        console.log("success:" + time);
        return (
            <Card>
                <Echart refName={refName} options={setOption} style={{ height: 400 }}></Echart>
            </Card>
        );
    }
}
