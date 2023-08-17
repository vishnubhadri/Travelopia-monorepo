const mysql = require('mysql2/promise');
 
const connection  = mysql.createPool({
    connectionLimit : 10, //important
    host     : 'localhost',
    user     : 'root',
    password : 'root',
    database : 'travelopia',
    debug    :  false
});


connection.getConnection((err,connection)=> {
    if(err)
    throw err;
    console.log('Database connected successfully');  })

module.exports= { connection };