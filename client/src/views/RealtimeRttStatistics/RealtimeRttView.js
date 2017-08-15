import React from 'react';
import { Card, Button, Spin, Menu, Dropdown, Icon, Select } from 'antd';
import QueryInfoDialog from './QueryInfoDialog';
import RealtimeRttChart from './RealtimeRttChart';

export default class RealtimeRttView extends React.Component {

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

    render() {
        const { actions, store } = this.props;
        const { queryRealtimeRttData, spinLoading, formValues, isOpenDialog } = store;
        
        return (
            <div className="realtimeRttView">
                <Button type="primary" style={{ marginRight: '20px'}} onClick={() => { actions.handleToggleDialog(true) }}>Query Filter</Button>
                {this.renderSearchSearchOptions()}
                <Button type="primary" loading={this.state.btnLoading} onClick={() => { this.handleQueryAll() }}>Query All (one week)</Button>
                <div className="clear20"></div>
                { isOpenDialog? <QueryInfoDialog store={store} actions={actions} />: null }
                {
                    !queryRealtimeRttData? (
                        <Spin style={{width: '100%', height: '100%', marginTop: '100'}} size="large" tip="Loading..." spinning={spinLoading} ></Spin>
                    ): null
                }
                {
                    queryRealtimeRttData ? <RealtimeRttChart store={store} actions={actions}></RealtimeRttChart> : null
                }
            </div>
        );
    }
}
