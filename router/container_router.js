const express = require('express');
const { getContainer,getCategoriesInCommande,getCategoriesNoInCommande,addContainerProduct,updateQteProductContainer,updateConfirmedProduct,deleteContainerProduct, updateNoteContainer } = require('../controllers/container_cont');


const router = express.Router();
router.post('/getContainer',getContainer);
router.post('/getCategoriesInCommande',getCategoriesInCommande);
router.post('/getCategoriesNoInCommande',getCategoriesNoInCommande);
router.post('/addContainerProduct',addContainerProduct);
router.patch('/updateQteProductContainer',updateQteProductContainer);
router.patch('/updateConfirmedProduct',updateConfirmedProduct);
router.delete('/deleteContainerProduct',deleteContainerProduct);
router.patch('/updateNoteContainer',updateNoteContainer);







module.exports = router;