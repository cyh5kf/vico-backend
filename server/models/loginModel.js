import db from '../config/db';
import Sequelize from 'sequelize';

var loginModel = db.define('login', {
    id: {
        type: Sequelize.BIGINT(20),
        primaryKey: true
    },
    email: Sequelize.STRING(100),
    password: Sequelize.BIGINT,
    createdAt: Sequelize.BIGINT,
    updatedAt: Sequelize.BIGINT
}, {
        timestamps: false,
        tableName: 'logins'
    });

export default loginModel;