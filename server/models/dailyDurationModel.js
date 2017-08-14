import db from '../config/db';
import Sequelize from 'sequelize';

var daily_duration_model = db.define('daily_duration', {
    id: {
        type: Sequelize.BIGINT(20),
        primaryKey: true
    },
    from_rc: Sequelize.STRING(8),
    to_rc: Sequelize.STRING(8),
    from_nettype: Sequelize.BOOLEAN(1),
    to_nettype: Sequelize.BOOLEAN(1),
    from_devtype: Sequelize.BOOLEAN(1),
    to_devtype: Sequelize.BOOLEAN(1),
    total: Sequelize.BIGINT(20),
    total_dur: Sequelize.BIGINT(20),
    tstamp: Sequelize.BIGINT(20)
}, {
    timestamps: false,
    tableName: 'daily_duration'
});

export default daily_duration_model;