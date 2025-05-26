const express = require('express');
const { getWilaya,addWilaya,updateWilaya, deleteWilaya } = require('../controllers/wialya_cont');
const router = express.Router();
router.get('/getWilaya',getWilaya);
router.post('/addWilaya',addWilaya);
router.patch('/updateWilaya',updateWilaya);
router.delete('/deleteWilaya',deleteWilaya);


module.exports = router;