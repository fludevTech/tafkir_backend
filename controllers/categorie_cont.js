const db = require('../config/db')

const getCategories = async (req, res) => {

    try {
        const Categories = await db.query('select * from categories');
       
        res.json({ success: true, statusCode: 200, data: Categories[0] })
    } catch (error) {
        res.status(404).json({
            success: false,
            statusCode: 404,
            message: 'خطأ في الإتصال'
        })
    }
};
///////
const addCategorie = async (req, res) => {
    const { idCategorie, labelCategorie } = req.body;
    try {
        const query = await db.query('insert into categories (idCategorie,labelCategorie) VALUES (?,?)', [idCategorie, labelCategorie]);
        if (query[0]['affectedRows'] > 0) {
            res.status(200).json({ success: true, statusCode: 200, message: 'Categorie created successfully' });


        } else {
            res.status(404).json({
                success: false,
                statusCode: 404,
                message: 'خطأ في الإتصال'
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
const updateCategorie = async (req, res) => {
    const { idCategorie, labelCategorie } = req.body;
    try {
        const query = await db.query('update categories set labelCategorie=?  where idCategorie=?', [labelCategorie, idCategorie]);

        if (query[0]['affectedRows'] > 0) {
            res.status(200).json({ success: true, statusCode: 200, message: 'categorie Updated successfully' });

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
const deleteCategorie = async (req, res) => {
    const { idCategorie } = req.body;
    try {
        const query = await db.query('delete from categories where idCategorie=?', [idCategorie]);
        if (query[0]['affectedRows'] > 0) {

            return res.status(200).json({ success: true, statusCode: 200, message: 'categorie deleted successfully' });

        }
        return    res.status(404).json({
                success: false,
                statusCode: 404,
                message: 'خطأ في الإتصال'
            })
    } catch (error) {
        if (error.code === 'ER_ROW_IS_REFERENCED_2') {
            res.status(404).json({
                success: false,
                statusCode: 404,
                message: 'Categorie is referenced',
            })
        } else {
            res.status(404).json({
                success: false,
                statusCode: 404,
                message: 'error to delete Categorie',
            })
        }

    }


};

module.exports = { getCategories, addCategorie, updateCategorie, deleteCategorie };