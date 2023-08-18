const mysql = require('mysql2/promise');

const pool = mysql.createPool({
    host: config.database.host,
    user: config.database.password,
    password: config.database.password,
    database: config.database.database,
    waitForConnections: true,
    connectionLimit: 10,
    maxIdle: 10, // max idle connections, the default value is the same as `connectionLimit`
    idleTimeout: 60000, // idle connections timeout, in milliseconds, the default value 60000
    queueLimit: 0,
    enableKeepAlive: true,
    keepAliveInitialDelay: 0
});


const connection = pool.getConnection();


module.exports = { connection,pool };