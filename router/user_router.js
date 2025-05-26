const express = require('express');
const { getUsers, loginUser, addUser, updateUser,userDetailes,updatePasswordUser, deleteUser, isActiveUser } = require('../controllers/user_cont');


const router = express.Router();
router.get('/getUsers', getUsers);
router.post('/loginUser', loginUser);
router.post('/addUser', addUser);
router.patch('/updateUser', updateUser);
router.patch('/updatePasswordUser', updatePasswordUser);
router.post('/userDetailes', userDetailes);
router.post('/isActiveUser',isActiveUser)
router.delete('/deleteUser', deleteUser);



module.exports = router;