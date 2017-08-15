import React from 'react';
import { Card, Button, Spin, Menu, Dropdown, Icon, Select } from 'antd';
import QueryInfoDialog from './QueryInfoDialog';
import RealtimeTotalChart from './RealtimeTotalChart';
import RealtimeAcceptChart from './RealtimeAcceptChart';
import RealtimeSuccessChart from './RealtimeSuccessChart';
import RealtimeAverageChart from './RealtimeAverageChart';

export default class RealtimeView extends React.Component {

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
    
    renderSearchSearchOptions = () =>{
        const {formValues, selectValue} = this.props.store;
        const isShowDrop = formValues? true: false;
        let menuArray = [];
        for(var i = 1; i <= 50; i++) {
            menuArray.push(i);
        }

        var options = menuArray.map((value, index) => {
            return <Option key={index} value={value}>{value} week</Option>
        })

        return (
            <Select value={selectValue}
                    style={{ width: 100, marginRight: '20px' }}
                    showSearch={false}
                    disabled={!isShowDrop}
                    onChange={this.onChangeSelect}
            >
                {options}
            </Select>
        );

    };

    onChangeSelect = (e) => {
        const { actions, store } = this.props;
        let {formValues} = store;
        formValues.moveWeek = parseInt(e);
        actions.handleSelectValue(e);
        actions.handleQueryDropdown(formValues);
    };

    renderRealtimeChart = () => {
        const { actions, store } = this.props;
        const { queryRealtimeData } = store;
        if (queryRealtimeData) {
            if (queryRealtimeData.length === 4) {
                return (
                    <div>
                        <RealtimeSuccessChart refName="realtimeSuccessChart" store={store} actions={actions}></RealtimeSuccessChart>
                        <div className="clear20"></div>
                        <RealtimeTotalChart refName="realtimeTotalChart" store={store} actions={actions}></RealtimeTotalChart>
                        <div className="clear20"></div>
                        <RealtimeAcceptChart refName="realtimeAcceptChart" store={store} actions={actions}></RealtimeAcceptChart>
                        <div className="clear20"></div>
                        <RealtimeAverageChart refName="realtimeAverageChart" store={store} actions={actions}></RealtimeAverageChart>
                    </div>
                )
            } else {
                return(
                    <div>
                        <RealtimeSuccessChart refName="realtimeInternalSuccessChart" store={store} actions={actions}></RealtimeSuccessChart>
                        <div className="clear20"></div>
                        <RealtimeSuccessChart refName="realtimeTransnationalSuccessChart" store={store} actions={actions}></RealtimeSuccessChart>
                        <div className="clear20"></div>
                        <RealtimeTotalChart refName="realtimeInternalTotalChart" store={store} actions={actions}></RealtimeTotalChart>
                        <div className="clear20"></div>
                        <RealtimeTotalChart refName="realtimeTransnationalTotalChart" store={store} actions={actions}></RealtimeTotalChart>
                        <div className="clear20"></div>
                        <RealtimeAcceptChart refName="realtimeInternalAcceptChart" store={store} actions={actions}></RealtimeAcceptChart>
                        <div className="clear20"></div>
                        <RealtimeAcceptChart refName="realtimeTransnationalAcceptChart" store={store} actions={actions}></RealtimeAcceptChart>
                        <div className="clear20"></div>
                        <RealtimeAverageChart refName="realtimeInternalAverageChart" store={store} actions={actions}></RealtimeAverageChart>
                        <div className="clear20"></div>
                        <RealtimeAverageChart refName="realtimeTransnationalAverageChart" store={store} actions={actions}></RealtimeAverageChart>
                    </div>
                )
            }
        } else {
            return null;
        }

    }

    render() {
        const { actions, store } = this.props;
        const {spinLoading, queryRealtimeData, formValues, isOpenDialog} = store;
        
        return (
            <div className="realtimeView">
                <Button type="primary" style={{ marginRight: '20px' }} onClick={() => { actions.handleToggleDialog(true) }}>Query Filter</Button>
                {this.renderSearchSearchOptions()}
                <Button type="primary" loading={this.state.btnLoading} onClick={() => { this.handleQueryAll() }}>Query All (one week)</Button>
                <div className="clear20"></div>
                {isOpenDialog? <QueryInfoDialog store={store} actions={actions} />: null}
                {
                    !queryRealtimeData? (
                        <Spin style={{width: '100%', height: '100%', marginTop: '100'}} size="large" tip="Loading..." spinning={spinLoading} ></Spin>
                    ): null
                }
                {this.renderRealtimeChart()}
                
            </div>
        );
    }
}
