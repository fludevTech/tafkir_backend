const mysql = require('mysql2/promise');
require('dotenv').config();

const mySqlPool = mysql.createPool({
    host:process.env.DB_HOST,
    port:process.env.MYSQLPORT,
user:process.env.MYSQLUSER,
password:process.env.MYSQLPASSWORD,
database:process.env.MYSQL_DATABASE,    
});
module.exports=mySqlPool;