import React from 'react';
import { Modal, Button, Form, Input, Radio, DatePicker, Select } from 'antd';
import moment from 'moment';
const RangePicker = DatePicker.RangePicker;
const FormItem = Form.Item;
const RadioGroup = Radio.Group;

function disabledDate(current) {
  // Can not select days before today and today
  return current.valueOf() < moment(Date.now()).subtract(1, 'months') || current.valueOf() > Date.now();
}

class TheForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    componentDidMount() {
        var { formValues } = this.props.store;
        if(formValues) {
            var currentTime = moment().format('HH:mm:ss');
            var preDate = moment(formValues.range_time_picker[0]).format("YYYY-MM-DD");
            var nextDate = moment(formValues.range_time_picker[1]).format("YYYY-MM-DD");
            var preTime = `${preDate} ${currentTime}`;
            var nextTime = `${nextDate} ${currentTime}`;
            var range_time_picker = [moment(preTime), moment(nextTime)];
            formValues.range_time_picker = range_time_picker;
            this.props.form.setFieldsValue(formValues);
        }
    }

    render() {
        const { getFieldDecorator } = this.props.form;
        const formItemLayout = {
            labelCol: { span: 6 },
            wrapperCol: { span: 14 }
        };
        const state = this.state;
        return (
            <Form layout="horizontal">
                <FormItem
                    {...formItemLayout}
                    label="rc"
                >
                    {getFieldDecorator('rc', {
                        initialValue: '-',
                        rules: [{
                            required: true, message: 'Please input your rc!'
                        }]
                    })(
                        <Input />
                        )}
                </FormItem>
                <FormItem
                    {...formItemLayout}
                    label="net type"
                >
                    {getFieldDecorator('nettype', {
                        initialValue: '5'
                    })(
                        <RadioGroup>
                            <Radio value="0">2G</Radio>
                            <Radio value="2">3G</Radio>
                            <Radio value="3">wifi</Radio>
                            <Radio value="4">4G</Radio>
                            <Radio value="5">All</Radio>
                        </RadioGroup>
                        )}
                </FormItem>
                <FormItem
                    {...formItemLayout}
                    label="dev type"
                >
                    {getFieldDecorator('devtype', {
                        initialValue: '2'
                    })(
                        <RadioGroup>
                            <Radio value="0">IOS</Radio>
                            <Radio value="1">Android</Radio>
                            <Radio value="2">All</Radio>
                        </RadioGroup>
                        )}
                </FormItem>
                <FormItem
                    {...formItemLayout}
                    label="Time Range"
                >
                    {getFieldDecorator('range_time_picker', {
                        initialValue: [moment().subtract(7, 'days'), moment()],
                        rules: [{ type: 'array', required: true, message: 'Please select time!' }],
                    })(
                        <RangePicker disabledDate={disabledDate} showTime format="YYYY-MM-DD HH:mm:ss" ranges={{ Today: [moment(), moment()], 'This Week': [moment().subtract(7, 'days'), moment()] }} />
                        )}
                </FormItem>

            </Form>
        );
    }
};

const QueryInfoForm = Form.create()(TheForm);


export default class QueryInfoDialog extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            loading: false
        };
    }

    handleOk = () => {
        var theForm = this.refs['theForm'];
        var { actions, store } = this.props;
        theForm.validateFields((err, fieldsValue) => {
            if (err) {
                return;
            }
            this.setState({ loading: true });
            const rangeTimeValue = fieldsValue['range_time_picker'];
            const values = {
                ...fieldsValue,
                'range_time_picker': [
                    rangeTimeValue[0],
                    rangeTimeValue[1]
                ],
                moveWeek: 1
            };
            actions.handleQueryRealtimeRtt(values, () => {
                this.setState({ loading: false });
                actions.handleToggleDialog(false);
            }, () => {
                this.setState({ loading: false });
            });
        });
    };

    handleCancel = () => {
        var { actions } = this.props;
        actions.handleToggleDialog(false);
    };


    render() {
        var { actions, store } = this.props;
        var visible = store.isOpenDialog;

        return (
            <Modal
                visible={visible}
                title="Search Info"
                onOk={this.handleOk}
                onCancel={this.handleCancel}
                footer={[
                    <Button key="back" type="ghost" size="large" onClick={this.handleCancel}>Cancel</Button>,
                    <Button key="submit" type="primary" size="large" loading={this.state.loading} onClick={this.handleOk}>Search</Button>
                ]}>
                <QueryInfoForm ref="theForm" store={store} actions={actions}></QueryInfoForm>
            </Modal>
        );
    }

}
