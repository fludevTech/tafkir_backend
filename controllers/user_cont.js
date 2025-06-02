const db = require('../config/db')

const { hashPassword } = require('../utils/auth_utils')
const bcrypt = require('bcrypt');

const getUsers = async (req, res) => {

    try {
        const users = await db.query(
            `select * from users 
            inner join wilaya 
            on users.idWilaya = wilaya.idWilaya 
            inner join roles
             on users.idRole = roles.idRole
             order by wilaya.labelWilaya ASC
             `
        );

        res.status(200).json({ success: true, statusCode: 200, data: users[0] })
    } catch (error) {
        res.status(404).json({
            success: false,
            statusCode: 404,
            message: '... خطأ في الإتصال'
        })
    }


};
///////
const userDetailes = async (req, res) => {
    const { idUser } = req.body;
    try {
        const user = await db.query(
            `select * from users 
            inner join wilaya 
            on users.idWilaya = wilaya.idWilaya 
            inner join roles
             on users.idRole = roles.idRole
             where idUser=?
             `
            , [idUser]);

        res.status(200).json({ success: true, statusCode: 200, data: user[0] })
    } catch (error) {
        res.status(404).json({
            success: false,
            statusCode: 404,
            message: '... خطأ في الإتصال'
        })
    }


};
///////
const loginUser = async (req, res) => {
    const { emailUser, passwordUser } = req.body;

    try {
        const user = await db.query(`select * from users
            inner join roles
            on users.idRole = roles.idRole
            where users.emailUser = ?
            `, [emailUser]);
        if (user[0].length == 0) {
            res.status(404).json({
                success: false,
                statusCode: 404,
                message: 'لا يوجد حساب مسجل ب هاذا الإيميل'
            })
        } else {
            bcrypt.compare(passwordUser, user[0][0]['passwordUser'], (err, result) => {
                if (result) {
                    res.status(200).json({ statusCode: 200, data: user[0] })
                } else {
                    res.status(404).json({
                        success: false,
                        statusCode: 404,
                        message: 'كلمة المرور خاطئة'
                    })
                }
            });
        }
    } catch (error) {
        res.status(404).json({
            success: false,
            statusCode: 404,
            message: '... خطأ في الإتصال'
        })
    }


};
////
const addUser = async (req, res) => {
    const { idUser, emailUser, passwordUser, userName, isActive, idWilaya, idRole } = req.body;
    try {

        const hashedPass = await hashPassword(passwordUser);
        const query = await db.query('insert into users (idUser,emailUser,passwordUser,UserName,isActive,idWilaya,idRole) VALUES (?,?,?,?,?,?,?)', [idUser, emailUser, hashedPass, userName, isActive, idWilaya, idRole]);
        if (query[0]['affectedRows'] > 0) {
            res.status(200).json({ success: true, statusCode: 200, message: 'تمت الإضافة بنجاح' });

        } else {
            res.status(404).json({
                success: false,
                statusCode: 404,
                message: 'خطأ في الإتصال'
            })
        }
    } catch (error) {
        if (error.code === 'ER_DUP_ENTRY') {
            return res.status(404).json({ success: false, statusCode: 404, error: 'Email already exists' });
        }
        return res.status(404).json({
            success: false,
            statusCode: 404,
            message: '... خطأ في الإتصال'
        })
    }


};

const updateUser = async (req, res) => {
    const { idUser, emailUser, userName, isActive, idWilaya, idRole } = req.body;
    try {
        const query = await db.query('update users set emailUser=?,userName=?,isActive=?,idWilaya=?,idRole=?  where idUser=?', [emailUser, userName, isActive, idWilaya, idRole, idUser]);
        if (query[0]['affectedRows'] > 0) {

            res.status(200).json({ success: true, statusCode: 200, message: 'تم التحديث بنجاح' });

        } else {
            res.status(404).json({
                success: false,
                statusCode: 404,
                message: 'خطأ في الإتصال'
            })
        }
    } catch (error) {
        res.status(404).json({
            success: false,
            statusCode: 404,
            message: '... خطأ في الإتصال'
        })
    }


};
const updatePasswordUser = async (req, res) => {
    const { idUser, passwordUser } = req.body;
    try {
        const hashedPass = await hashPassword(passwordUser);
        const query = await db.query('update users set passwordUser=?  where idUser=?', [hashedPass, idUser]);

        if (query[0]['affectedRows'] > 0) {
            res.status(200).json({ success: true, statusCode: 200, message: 'password Updated successfully' });

        } else {
            res.status(404).json({
                success: false,
                statusCode: 404,
                message: 'خطأ في الإتصال'
            })
        }
    } catch (error) {
        res.status(404).json({
            success: false,
            statusCode: 404,
            message: '... خطأ في الإتصال'
        })
    }


};
const deleteUser = async (req, res) => {
    const { idUser } = req.body;
    try {
        const query = await db.query('delete from users where idUser=?', [idUser]);

        if (query[0]['affectedRows'] > 0) {

            return res.status(200).json({ success: true, statusCode: 200, message: 'تم الحذف بنجاح' });
        }
        return res.status(404).json({
            success: false,
            statusCode: 404,
            message: 'خطأ في الإتصال'
        })
    } catch (error) {
        if (error.code == 'ER_ROW_IS_REFERENCED_2') {
            return res.status(404).json({
                success: false,
                statusCode: 404,
                message: 'user is referenced ...',
            });
        }
        return res.status(404).json({
            success: false,
            statusCode: 404,
            message: '... خطأ في الإتصال'
        })
    }
}
const isActiveUser = async (req, res) => {
    const { idUser } = req.body;
    try {
        const user = await db.query(
            `select isActive from users 
             where idUser=?
             `
            , [idUser]);

        return res.status(200).json({ success: true, statusCode: 200, data: user[0] })
    } catch (error) {
        res.status(404).json({
            success: false,
            statusCode: 404,
            message: '... خطأ في الإتصال'
        })
    }


};
module.exports = { getUsers, loginUser, addUser, updateUser, userDetailes, updatePasswordUser, isActiveUser, deleteUser };