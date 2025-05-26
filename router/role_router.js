const express = require('express');
const { getRoles, addRole, updateRole, deleteRole } = require('../controllers/role_cont');


const router = express.Router();
router.get('/getRoles', getRoles);
router.post('/addRole', addRole);
router.patch('/updateRole', updateRole);
router.delete('/deleteRole', deleteRole);

module.exports = router;