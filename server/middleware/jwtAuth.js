const jwt = require("jwt-simple");

module.exports = async(ctx, next) =>{
    const token = ctx.req.headers['x-access-token'];
    let email;
    if(token){
        try{
            var decoded = jwt.decode(token, 'jwtTokenSecret');
            if(decoded.exp < Date.now()){
                ctx.status = 401;
                ctx.body = 'token expired';
            }
            email = decoded.email;
        } catch(err){
            ctx.status = 401;
            ctx.body = 'token err';
        }
    } else {
        ctx.status = 401;
        ctx.body = 'no token';
    }
    ctx.state.email = email;
    await next();
}