import loginModel from '../models/loginModel';
import jwt from 'jwt-simple';
import moment from 'moment';

const login = async (ctx) => {
    const { email, passwd } = ctx.query;
    let data = await loginModel.findOne({where: {email: email}});
    if (!data) {
        // incorrect username
        ctx.status = 404;
        ctx.body = "user does not exist";
    }

    if (passwd != data.password) {
        // incorrect password
        ctx.status = 401;
        ctx.body = "Incorrect password";
    }
    let expires = moment().add(7, 'days').valueOf();
    let token = jwt.encode({
        email: email,
        exp: expires
    }, 'jwtTokenSecret');
    let responseData = {
        token: token
    }
    ctx.body = responseData;
}

export default login;

