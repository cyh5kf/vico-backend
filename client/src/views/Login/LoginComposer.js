import React from 'react';
import {message} from 'antd';
import LoginView from './LoginView';
import {loginRequest} from 'api/LoginApi';

export default class LoginComposer extends React.Component {

    static contextTypes = {
        router: React.PropTypes.object.isRequired
    };

    constructor(props) {
        super(props);
        this.state = {
            isLoading:false
        };
    }

    doLogin = async(values)=> {
        var router = this.context.router;
        this.setState({isLoading:true});
        let response = await loginRequest(values);
        let data = response.data;
        if(data) {
            this.setState({isLoading:false});
            setTimeout(()=>{
                if (response.status == 200) {
                    router.push('/main/home');
                    message.success('login successful!');
                }else {
                    message.error("Incorrect email or password , please try again.");
                }
            },10)
        } else {
            message.error("Login error , Please retry.");
            this.setState({isLoading:false});
        }
    };

    render() {
        return (
            <LoginView actions={this} store={this.state}/>
        );
    }
}
