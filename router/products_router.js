const express = require('express');
const { getProducts,getProductsCategorieCommande, addProduct, updateProduct,deleteProduct, searchProduct } = require('../controllers/products_cont');


const router = express.Router();
router.get('/getProducts', getProducts);
router.post('/getProductsCategorieCommande', getProductsCategorieCommande);
router.post('/addProduct', addProduct);
router.patch('/updateProduct', updateProduct);
router.delete('/deleteProduct', deleteProduct);
router.post('/searchProduct', searchProduct);


module.exports = router;