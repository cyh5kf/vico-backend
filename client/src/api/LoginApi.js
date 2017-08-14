import 'whatwg-fetch';
import LoginStore from '../stores/LoginStore';

//登录
export const loginRequest = async({email,password}) => {

    email = encodeURIComponent(email);
    password = encodeURIComponent(password);
    let url =  `/api/login/doLogin?email=${email}&passwd=${password}`;
    try {
        let response = await fetch(url);
        let data = await response.json();
        response.data = data;
        if (response.status == 200) {
            LoginStore.setToken(response.data);
        }else {
            LoginStore.setToken(null);
        }
        return response;
    } catch(e) {
        console.log(e);
    }
};
