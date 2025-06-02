const express = require('express');
const router = express.Router();
const multer = require('multer');
const { uploadImage, deleteImageProduct,  } = require('../controllers/image_cont');
const upload = multer({ dest: 'uploads/' });
router.post('/uploadImage',upload.single('image'),uploadImage);
router.delete('/deleteImageProduct',deleteImageProduct);


module.exports = router; 