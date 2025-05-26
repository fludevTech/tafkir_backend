const express = require('express');
const { getCommandsStore, addCommande, updateCommandeStatus, updateCommandeDesignation,deleteCommande } = require('../controllers/commande_cont');


const router = express.Router();
router.post('/getCommandsStore', getCommandsStore);
router.post('/addCommande', addCommande);
router.patch('/updateCommandeStatus', updateCommandeStatus)
router.patch('/updateCommandeDesignation',updateCommandeDesignation)
router.delete('/deleteCommande',deleteCommande)

 
module.exports = router;