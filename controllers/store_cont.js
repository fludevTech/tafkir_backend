const db = require('../config/db')
const getStorsbyWilaya = async (req, res) => {
    const { idWilaya } = req.body;

    try {
        const store = await db.query(
            `select * from store
             inner join wilaya 
            on store.idWilaya = wilaya.idWilaya
             where store.idWilaya=?
            `
            , [idWilaya]);

        res.json({ success: true, statusCode: 200, data: store[0] })
    } catch (error) {
        res.status(404).json({
            success: false,
            statusCode: 404,
            message: '... خطأ في الإتصال'
        })
    }
};

const getStorsWilaya = async (req, res) => {

    try {
        const store = await db.query(
            `select * from store
             inner join wilaya 
            on store.idWilaya = wilaya.idWilaya
            order by wilaya.labelWilaya ASC
            `);
        // if (store[0].length == 0) {
        //     return res.status(404).json({
        //         success: false,
        //         statusCode: 404,
        //         message: "no store Exist"

        //     })
        // }
        res.json({ success: true, statusCode: 200, data: store[0] })
    } catch (error) {

        res.status(404).json({
            success: false,
            statusCode: 404,
            message: '... خطأ في الإتصال'
        })
    }
};
///////
const addStore = async (req, res) => {
    const { idStore, nameStore, idWilaya } = req.body;
    try {
        const query = await db.query('insert into store (idStore,nameStore,idWilaya) VALUES (?,?,?)', [idStore, nameStore, idWilaya]);
        if (query[0]['affectedRows'] > 0) {
            res.status(200).json({ success: true, statusCode: 200, message: 'store created successfully' });

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
const updateStore = async (req, res) => {
    const { idStore, nameStore, idWilaya } = req.body;
    try {
        const query = await db.query('update store set nameStore=?,idWilaya=?  where idStore=?', [nameStore, idWilaya, idStore]);

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
const deleteStore = async (req, res) => {
    const { idStore } = req.body;
    try {
        const query = await db.query('delete from store where idStore=?', [idStore]);
        if (query[0]['affectedRows'] > 0) {

            return res.status(200).json({ success: true, statusCode: 200, message: 'تم الحذف بنجاح' });

        }
        return res.status(404).json({
            success: false,
            statusCode: 404,
            message: '... خطأ في الإتصال'
        })
    } catch (error) {
        if (error.code === 'ER_ROW_IS_REFERENCED_2') {
            res.status(404).json({
                success: false,
                statusCode: 404,
                message: 'store is referenced',
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

module.exports = { getStorsWilaya, getStorsbyWilaya, addStore, updateStore, deleteStore };