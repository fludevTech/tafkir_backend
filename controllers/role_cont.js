const db = require('../config/db')

const getRoles = async (req, res) => {

    try {
        const roles = await db.query('select * from roles');

        res.json({ success: true, statusCode: 200, data: roles[0] })
    } catch (error) {
        res.status(404).json({
            success: false,
            statusCode: 404,
            message: '... خطأ في الإتصال'
        })
    }
};
///////
const addRole = async (req, res) => {
    const { idRole, labelRole } = req.body;
    try {
        const query = await db.query('insert into roles (idRole,labelRole) VALUES (?,?)', [idRole, labelRole]);
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
        res.status(404).json({
            success: false,
            statusCode: 404,
            message: '... خطأ في الإتصال'
        })
    }


};
const updateRole = async (req, res) => {
    const { idRole, labelRole } = req.body;
    try {
        const query = await db.query('update roles set labelRole=?  where idRole=?', [labelRole, idRole]);
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
const deleteRole = async (req, res) => {
    const { idRole } = req.body;
    try {
        const query = await db.query('delete from roles where idRole=?', [idRole]);
        if (query[0]['affectedRows'] > 0) {

            return res.status(200).json({ success: true, statusCode: 200, message: 'تم الحذف بنجاح' });

        }
        return  res.status(404).json({
                success: false,
                statusCode: 404,
                message: 'خطأ في الإتصال'
            })
    } catch (error) {
        if (error.code === 'ER_ROW_IS_REFERENCED_2') {
            res.status(404).json({
                success: false,
                statusCode: 404,
                message: 'role is referenced',
            })
        } else {
            res.status(404).json({
                success: false,
                statusCode: 404,
                message: '... خطأ في الإتصال'
            })
        }

    }


};

module.exports = { getRoles, addRole, updateRole, deleteRole };