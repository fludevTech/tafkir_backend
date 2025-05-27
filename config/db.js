const mysql = require('mysql2/promise');


const mySqlPool = mysql.createPool({
    host:'ballast.proxy.rlwy.net',
    port:'57027',
user:'root',
password:'EwmnqMVbVRXhiCaDkoeftufhlMuruemU',
database:'tafkir_db',
});
module.exports=mySqlPool;
//mysql://root:CuIcPOkWlwGgeVcirGWrCpXVFsLHefLi@mainline.proxy.rlwy.net:28641/railway
//mysql://root:ITcPAMdrgSfBgKpRJIyzhbIUmnvmeydn@shortline.proxy.rlwy.net:35969/railway