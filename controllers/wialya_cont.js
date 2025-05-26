const db = require('../config/db')

const getWilaya = async (req, res) => {

    try {
        const wilaya = await db.query('select * from wilaya');
        // if (wilaya[0].length == 0) {
        //     return res.status(404).json({
        //         success: false,
        //         statusCode: 404,

        //     })
        // }
        res.json({ success: true, statusCode: 200, data: wilaya[0] })
    } catch (error) {
        res.status(404).json({
            success: false,
            statusCode: 404,
            message: '... خطأ في الإتصال'
        })
    }
};
///////
const addWilaya = async (req, res) => {
    const { idWilaya, labelWilaya } = req.body;
    try {
        const query = await db.query('insert into wilaya (idWilaya,labelWilaya) VALUES (?,?)', [idWilaya, labelWilaya]);

        if (query[0]['affectedRows'] > 0) {
            res.status(200).json({ success: true, statusCode: 200, message: 'wilaya created successfully' });


        }
        else {
            res.status(404).json({
                success: false,
                statusCode: 404,
                message: '... خطأ في الإتصال'
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

const updateWilaya = async (req, res) => {
    const { idWilaya, labelWilaya } = req.body;
    try {
        const query = await db.query('update wilaya set labelWilaya=?  where idWilaya=?', [labelWilaya, idWilaya]);


        if (query[0]['affectedRows'] > 0) {
            res.status(200).json({ success: true, statusCode: 200, message: 'wilaya Updated successfully' });


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
const deleteWilaya = async (req, res) => {
    const { idWilaya } = req.body;
    try {
        const query = await db.query('delete from wilaya where idWilaya=?', [idWilaya]);
        if (query[0]['affectedRows'] > 0) {

            return res.status(200).json({ success: true, statusCode: 200, message: 'wilaya deleted successfully' });

        }
        return res.status(404).json({
            success: false,
            statusCode: 404,
            message: 'error to delete wilaya',
        })
    } catch (error) {
        if (error.code === 'ER_ROW_IS_REFERENCED_2') {
            res.status(404).json({
                success: false,
                statusCode: 404,
                message: 'wilaya is referenced',
            })
        } else {
            res.status(404).json({
                success: false,
                statusCode: 404,
                message: 'error to delete wilaya',
            })
        }

    }


};

module.exports = { getWilaya, addWilaya, updateWilaya, deleteWilaya };