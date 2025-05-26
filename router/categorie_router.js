const express = require('express');
const { getCategories, addCategorie, updateCategorie, deleteCategorie } = require('../controllers/categorie_cont');


const router = express.Router();
router.get('/getCategories', getCategories);
router.post('/addCategorie', addCategorie);
router.patch('/updateCategorie', updateCategorie);
router.delete('/deleteCategorie', deleteCategorie);

module.exports = router;