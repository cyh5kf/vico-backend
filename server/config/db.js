var config = require('./config');
var mysql = require('mysql');

var pool = mysql.createPool({
    host: config.host,
    user: config.username,
    password: config.password,
    database: config.database,
    connectionLimit: 10,
    port: config.port
});

let query = function(sql, values) {

  return new Promise((resolve, reject) => {
    pool.getConnection(function(err, connection) {
      if (err) {
        resolve(err)
      } else {
        connection.query(sql, values, (err, results) => {

          if ( err ) {
            reject(err)
          } else {
            resolve(results)
          }
          connection.release()
        })
      }
    })
  })

}

module.exports = query;
