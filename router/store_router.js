const express = require('express');
const { getStorsWilaya, getStorsbyWilaya, addStore, updateStore, deleteStore } = require('../controllers/store_cont');



const router = express.Router();
router.get('/getStorsWilaya', getStorsWilaya);
router.post('/getStorsbyWilaya', getStorsbyWilaya);
router.post('/addStore', addStore);
router.patch('/updateStore', updateStore);
router.delete('/deleteStore', deleteStore);



module.exports = router;