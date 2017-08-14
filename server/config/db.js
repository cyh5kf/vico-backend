import Sequelize from 'sequelize';
import config from './config';

var db = new Sequelize(config.database, config.username, config.password, {
    host: config.host,
    dialect: 'mysql',
    port: config.port,
    pool: {
        max: 10,
        min: 0,
        idle: 10000
    }
});

export default db;
