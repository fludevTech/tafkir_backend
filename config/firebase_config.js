// firebaseConfig.js
const admin = require('firebase-admin');
const serviceAccount = require('../bekkai-emballage-firebase-adminsdk-eb0ef-25c3a07a96.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  storageBucket: 'bekkai-emballage.appspot.com',
});

const bucket = admin.storage().bucket();
module.exports = bucket;
