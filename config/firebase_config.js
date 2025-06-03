
require('dotenv').config();
const admin = require('firebase-admin');
const serveiceAcount = require('../bek_emb1.json')
console.log(process.env.PRIVATE_KEY.replace(/\\n/g, '\n'));
admin.initializeApp({
  credential: admin.credential.cert({
    project_id: process.env.PROJECT_ID,
    client_email: process.env.CLIENT_EMAIL,
    private_key:process.env.PRIVATE_KEY.replace(/\\n/g, '\n'),
  }),
  storageBucket: process.env.STORAGE_BUCKET,
});
// admin.initializeApp({  
//   credential: admin.credential.cert(
//  serveiceAcount),
//   storageBucket:"bekkai-emballage.appspot.com",
// });
const bucket = admin.storage().bucket();
module.exports = bucket;
