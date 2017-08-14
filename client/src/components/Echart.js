import React from 'react';
import echarts from 'echarts';

export default class EChart extends React.Component {
    constructor (props) {
        super(props);
    }

    componentDidMount () {
        this.drawChart();
    }

    componentDidUpdate (prevProps) {
        if (JSON.stringify(prevProps.options) !== JSON.stringify(this.props.options)) {
            this.drawChart();
        }
    }

    // componentWillUnmount () {
    //     let myChart = echarts.init(this.refs.chart);
    //     myChart.dispose();
    // }

    isEmptyObject (o) {
        for (let k in o) {
            return false
        }
        return true
    }

    drawChart=() => {
        let option = this.props.options;
        let refName = this.props.refName;
        let myChart = echarts.init(this.refs[refName]);
        if (this.isEmptyObject(option)) {
            myChart.showLoading('default', {
                text: 'Loading',
                color: '#2db7f5',
                textColor: '#2db7f5',
                maskColor: 'rgba(255, 255, 255, 0.8)',
                zlevel: 0
            });
        }
        else {
            myChart.hideLoading();
            myChart.setOption(option);
            window.addEventListener('resize', ()=> {
                myChart.resize();
            })
        }
    }

    render () {
        var _style = this.props.style || {height: 400};
        var refName = this.props.refName;

        return (
            <div ref={refName} style={_style}></div>
        )
    }
}

