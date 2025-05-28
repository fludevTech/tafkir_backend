const mysql = require('mysql2/promise');
require('dotenv').config();

const mySqlPool = mysql.createPool({
    host:process.env.DB_HOST,
    port:process.env.MYSQLPORT,
user:process.env.MYSQLUSER,
password:process.env.MYSQLPASSWORD,
database:process.env.MYSQL_DATABASE,    
//     host:'ballast.proxy.rlwy.net',
//     port:'57027',
// user:'root',
// password:'EwmnqMVbVRXhiCaDkoeftufhlMuruemU',
// database:'tafkir_db',
//    host:'localhost',
// user:'root',
// password:'',
// database:'tafkir',
});
module.exports=mySqlPool;
//mysql://root:CuIcPOkWlwGgeVcirGWrCpXVFsLHefLi@mainline.proxy.rlwy.net:28641/railway
//mysql://root:ITcPAMdrgSfBgKpRJIyzhbIUmnvmeydn@shortline.proxy.rlwy.net:35969/railway