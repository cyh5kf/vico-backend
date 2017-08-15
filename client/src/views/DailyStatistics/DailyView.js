import React from 'react';
import { Card, Button, Spin } from 'antd';
import QueryInfoDialog from './QueryInfoDialog';
import DailyTotalChart from './DailyTotalChart';
import DailyAcceptChart from './DailyAcceptChart';
import DailySuccessChart from './DailySuccessChart';
import DailyAverageChart from './DailyAverageChart';

export default class DailyView extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            btnLoading: false
        };
    }

    handleQueryAll = () => {
        let actions = this.props.actions;
        this.setState({ btnLoading: true });
        actions.handleClickQueryAll(() => {
            this.setState({ btnLoading: false });
        })
    }

    renderDailyChart = () => {
        const { actions, store } = this.props;
        const { queryDailyData } = store;
        if(queryDailyData) {
            return (
                <div>
                    <DailySuccessChart store={store} actions={actions}></DailySuccessChart>
                    <div className="clear20"></div>
                    <DailyTotalChart store={store} actions={actions}></DailyTotalChart>
                    <div className="clear20"></div>
                    <DailyAcceptChart store={store} actions={actions}></DailyAcceptChart>
                    <div className="clear20"></div>
                    <DailyAverageChart store={store} actions={actions}></DailyAverageChart>
                </div>
            )
        } else {
            return null;
        }
    }

    render() {
        const { actions, store } = this.props;
        const {spinLoading, queryDailyData, isOpenDialog} = store;
        return (
            <div className="dailyView">
                <Button type="primary" style={{ marginRight: '20px'}} onClick={() => { actions.handleToggleDialog(true) }}>Query Filter</Button>
                <Button type="primary" loading={this.state.btnLoading} onClick={() => { this.handleQueryAll() }}>Query All (one week)</Button>
                <div className="clear20"></div>
                {isOpenDialog? <QueryInfoDialog store={store} actions={actions} />: null}
                {
                    !queryDailyData? (
                        <Spin style={{width: '100%', height: '100%', marginTop: '100'}} size="large" tip="Loading..." spinning={spinLoading} ></Spin>
                    ): null
                }
                {this.renderDailyChart()}
            </div>
        );
    }
}
