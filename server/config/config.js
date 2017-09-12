var config = {};
console.log(`env: ${process.env.NODE_ENV}`);
if (process.env.NODE_ENV === 'production') {
    config = {
        database: 'voipmonitordb', // 使用哪个数据库
        username: 'root', // 用户名
        password: '#f&^F@95m', // 口令
        host: '84.16.241.176', // 主机名
        port: '', // 端口号，MySQL默认3306
    };
} else {
    config = {
        database: 'voipmonitordb', // 使用哪个数据库
        username: 'monitoradmin', // 用户名
        password: 'Test.123', // 口令
        host: '118.89.19.175', // 主机名
        port: 3306, // 端口号，MySQL默认3306
    };
}

module.exports = config;