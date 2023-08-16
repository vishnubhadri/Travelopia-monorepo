const mysql = require('mysql2');
const session = require('express-mysql-session');

// Create a connection pool
const pool = mysql.createPool({
    host: 'your-hostname',
    user: 'your-username',
    password: 'your-password',
    database: 'your-database',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});


// Create a MySQL session store for Express
const sessionStore = new session({
    expiration: 3600000,
    createDatabaseTable: true,
    schema: {
        tableName: 'sessions',
        columnNames: {
            session_id: 'session_id',
            expires: 'expires',
            data: 'data'
        }
    }
}, pool);

module.exports = {
    pool,
    sessionStore
};
