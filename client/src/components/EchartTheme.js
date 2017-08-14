import moment from 'moment';

const option = {
    getTotalData: (data1, data2, x_data1, x_data2) => {
        let y_data1 = [];
        let y_data2 = [];
        var j = 0;
        for(var i = 0; i < x_data1.length; i ++) {
            let isHaveData = false;
            for (; j < data1.length; j ++) {
                var { tstamp, total } = data1[j];
                var tstampFormat = moment(tstamp).format("YYYY-MM-DD HH:mm");
                if(moment(tstampFormat).isSame(x_data1[i])) {
                    isHaveData = true;
                    y_data1.push(total);
                }
                if(moment(tstampFormat).isAfter(x_data1[i])) { //数据库取出来的数据是按照时间大小排序，后面的数据大于前面的数据，那么后面的数据中就必然没有与之前相同的数据，跳出循环，减少循环次数，同时从下一个开始比较，没必要从头开始
                    if(j > 0) j--;
                    break;
                }
            }
            if(!isHaveData) {
                y_data1.push('');
            }
        }
        var m = 0;
        for(var i = 0; i < x_data2.length; i ++) {
            let isHaveData = false;
            for (; m < data2.length; m ++) {
                var { tstamp, total } = data2[m];
                var tstampFormat = moment(tstamp).format("YYYY-MM-DD HH:mm");
                if(moment(tstampFormat).isSame(x_data2[i])) {
                    isHaveData = true;
                    y_data2.push(total);
                }
                if(moment(tstampFormat).isAfter(x_data2[i])) {
                    if(m > 0) m--;
                    break;
                }
            }
            if(!isHaveData) {
                y_data2.push('');
            }
        }

        return [x_data1, x_data2, y_data1, y_data2];
    },
    getAcceptData: (data1, data2, x_data1, x_data2) => {
        let y_data1 = [];
        let y_data2 = [];
        var j = 0;
        for(var i = 0; i < x_data1.length; i ++) {
            let isHaveData = false;
            for (; j < data1.length; j ++) {
                var { tstamp, total, accept} = data1[j];
                var tstampFormat = moment(tstamp).format("YYYY-MM-DD HH:mm");
                var acceptRate = (accept / total * 100).toFixed(1);
                if(moment(tstampFormat).isSame(x_data1[i])) {
                    isHaveData = true;
                    y_data1.push(acceptRate);
                }
                if(moment(tstampFormat).isAfter(x_data1[i])) {
                    if(j > 0) j--;
                    break;
                }
            }
            if(!isHaveData) {
                y_data1.push('');
            }
        }
        var m = 0;
        for(var i = 0; i < x_data2.length; i ++) {
            let isHaveData = false;
            for (; m < data2.length; m ++) {
                var { tstamp, total, accept} = data2[m];
                var tstampFormat = moment(tstamp).format("YYYY-MM-DD HH:mm");
                var acceptRate = (accept / total * 100).toFixed(1);
                if(moment(tstampFormat).isSame(x_data2[i])) {
                    isHaveData = true;
                    y_data2.push(acceptRate);
                }
                if(moment(tstampFormat).isAfter(x_data2[i])) {
                    if(m > 0) m--;
                    break;
                }
            }
            if(!isHaveData) {
                y_data2.push('');
            }
        }

        return [x_data1, x_data2, y_data1, y_data2];
    },
    getSuccessData: (data1, data2, x_data1, x_data2) => {
        let y_data1 = [];
        let y_data2 = [];
        var j = 0;
        for(var i = 0; i < x_data1.length; i ++) {
            let isHaveData = false;
            for (; j < data1.length; j ++) {
                var { tstamp, accept, failed} = data1[j];
                var tstampFormat = moment(tstamp).format("YYYY-MM-DD HH:mm");
                if(moment(tstampFormat).isSame(x_data1[i]) && accept !== 0) {
                    var successRate = ((1 - failed / accept) * 100).toFixed(1);
                    isHaveData = true;
                    y_data1.push(successRate);
                }
                if(moment(tstampFormat).isAfter(x_data1[i])) {
                    if(j > 0) j--;
                    break;
                }
            }
            if(!isHaveData) {
                y_data1.push('');
            }
        }
        var m = 0;
        for(var i = 0; i < x_data2.length; i ++) {
            let isHaveData = false;
            for (; m < data2.length; m ++) {
                var { tstamp, accept, failed} = data2[m];
                var tstampFormat = moment(tstamp).format("YYYY-MM-DD HH:mm");
                if(moment(tstampFormat).isSame(x_data2[i]) && accept !== 0) {
                    var successRate = ((1 - failed / accept) * 100).toFixed(1);
                    isHaveData = true;
                    y_data2.push(successRate);
                }
                if(moment(tstampFormat).isAfter(x_data2[i])) {
                    if(m > 0) m--;
                    break;
                }
            }
            if(!isHaveData) {
                y_data2.push('');
            }
        }
        return [x_data1, x_data2, y_data1, y_data2];
    },
    getAverageData: (data1, data2, x_data1, x_data2) => {
        let y_data1 = [];
        let y_data2 = [];
        var j = 0;
        for(var i = 0; i < x_data1.length; i ++) {
            let isHaveData = false;
            for (; j < data1.length; j ++) {
                var { tstamp, total, total_dur} = data1[j];
                var tstampFormat = moment(tstamp).format("YYYY-MM-DD HH:mm");
                var averageTime = (total_dur / total).toFixed(1);
                if(moment(tstampFormat).isSame(x_data1[i])) {
                    isHaveData = true;
                    y_data1.push(averageTime);
                }
                if(moment(tstampFormat).isAfter(x_data1[i])) {
                    if(j > 0) j--;
                    break;
                }
            }
            if(!isHaveData) {
                y_data1.push('');
            }
        }
        var m = 0;
        for(var i = 0; i < x_data2.length; i ++) {
            let isHaveData = false;
            for (; m < data2.length; m ++) {
                var { tstamp, total, total_dur} = data2[m];
                var tstampFormat = moment(tstamp).format("YYYY-MM-DD HH:mm");
                var averageTime = (total_dur / total).toFixed(1);
                if(moment(tstampFormat).isSame(x_data2[i])) {
                    isHaveData = true;
                    y_data2.push(averageTime);
                }
                if(moment(tstampFormat).isAfter(x_data2[i])) {
                    if(m > 0) m--;
                    break;
                }
            }
            if(!isHaveData) {
                y_data2.push('');
            }
        }

        return [x_data1, x_data2, y_data1, y_data2];
    },
    title: (text) => {
        return {
            text: text,
            x: 'center',
            align: 'right',
            top: 20
        }
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
    legendOne: (data) => {
        return {
            data: [data],
            left: '5%'
        }
    },
    legend: (data1, data2) => {
        return {
            data: [data1, data2],
            left: '5%'
        }
    },
    dataZoomOne: [
        {
            show: true,
            realtime: true,
            start: 0,
            end: 100,
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
            start: 0,
            end: 100
        }
    ],
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
    xAxisOne: (x) => {
        return [
            {
                type: 'category',
                boundaryGap: false,
                axisLine: {
                    onZero: false
                },
                data: x
            }
        ]
    },
    xAxis: (x1, x2) => {
        return [
            {
                type: 'category',
                boundaryGap: false,
                axisLine: {
                    onZero: false
                },
                data: x1
            },
            {
                type: 'category',
                boundaryGap: false,
                axisLine: {
                    onZero: false
                },
                data: x2
            }
        ]
    },
    yAxis: (name) => {
        return [
            {
                name: name,
                type: 'value',
                nameGap: 30
            }
        ]
    },
    seriesOne: (name, y) => {
        return [
            {
                name: name,
                type: 'line',
                animation: true,
                xAxisIndex: 0,
                lineStyle: {
                    normal: {
                        width: 2
                    }
                },
                data: y
            }
        ]
    },
    series: (name1, name2, y1, y2) => {
        return [
            {
                name: name1,
                type: 'line',
                animation: true,
                xAxisIndex: 0,
                lineStyle: {
                    normal: {
                        width: 2
                    }
                },
                data: y1
            },
            {
                name: name2,
                type: 'line',
                animation: true,
                xAxisIndex: 1,
                lineStyle: {
                    normal: {
                        width: 2
                    }
                },
                data: y2
            }
        ]
    }
}

export default option;