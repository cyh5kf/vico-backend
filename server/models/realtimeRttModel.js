import db from '../config/db';
import Sequelize from 'sequelize';

var realtime_rtt_model = db.define('realtime_rtt', {
    id: {
        type: Sequelize.BIGINT(20),
        primaryKey: true
    },
    rc: Sequelize.STRING(8),
    nettype: Sequelize.BOOLEAN(1),
    devtype: Sequelize.BOOLEAN(1),
    rtt: Sequelize.BIGINT(20),
    loss: Sequelize.BIGINT(20),
    count: Sequelize.BIGINT(20),
    tstamp: Sequelize.BIGINT(20)
}, {
    timestamps: false,
    tableName: 'realtime_rtt'
});

export default realtime_rtt_model;