var query = require('../config/db'),
    jwt = require('jwt-simple'),
    moment = require('moment');

const login = async (ctx) => {
    let { email, passwd } = ctx.query;
    email = decodeURIComponent(email);
    passwd = decodeURIComponent(passwd);
    let _sql = `SELECT * FROM logins WHERE email='${email}'`;
    let data = await query(_sql);
    if (!data) {
        // incorrect username
        ctx.status = 404;
        ctx.body = "user does not exist";
    }

    if (passwd != data[0].password) {
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

module.exports = login;


