const multer = require('multer');
const bucket = require('../config/firebase_config');
const path = require('path');
const { v4: uuidv4 } = require('uuid');
const fs = require('fs');



const uploadImage = async (req, res) => {
  const filePath = req.file.path;
  const fileName = `${uuidv4()}${path.extname(req.file.originalname)}`;
  const destination = `tafkir_images/${fileName}`;

  try {
    await bucket.upload(filePath, {
      destination,
      public: true,
      metadata: {
        contentType: req.file.mimetype,
      },
    });

    const file = bucket.file(destination);
    const publicUrl = `https://storage.googleapis.com/${bucket.name}/${file.name}`;
    res.status(200).json({ success: true, statusCode: 200, data: publicUrl });
    fs.unlinkSync(filePath);
  } catch (error) {
    fs.unlinkSync(filePath);
    res.status(404).json({
      success: false,
      statusCode: 404,
      message: '...خطأ في الإتصال'
    })
  }


};
const deleteImageProduct = async (req, res) => {
  try {
    const { imagePath } = req.body;
    await bucket.file(imagePath).delete();
    res.status(200).json({ success: true, statusCode: 200, message: 'تم الحذف بنجاح' });
  } catch (error) {
    res.status(404).json({
      success: false,
      statusCode: 404,
      message: '...خطأ في الإتصال'
    })
  }
};


module.exports = { uploadImage, deleteImageProduct }
