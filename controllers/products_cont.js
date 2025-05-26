const db = require('../config/db')

const getProductsCategorieCommande = async (req, res) => {
    const { idCommande, idCategorie } = req.body
    try {
        const products = await db.query(`
            select * from products where idProduct not in
        (select idProduct from container where idCommande =? and idCategorie = ? )
            `, [idCommande, idCategorie]);
        res.json({ success: true, statusCode: 200, data: products[0] })
    } catch (error) {
          res.status(404).json({
                success: false,
                statusCode: 404,
                message: '... خطأ في الإتصال'
            })
    }
};
///////
const getProducts = async (req, res) => {
    try {
        const products = await db.query(`
            select * from products
            order by labelProduct ASC
            `);
        res.json({ success: true, statusCode: 200, data: products[0] })
    } catch (error) {
         res.status(404).json({
                success: false,
                statusCode: 404,
                message: '... خطأ في الإتصال'
            })
    }
};
//////
const addProduct = async (req, res) => {
    const { idProduct, labelProduct } = req.body;
    try {
    const query =    await db.query('insert into products (idProduct,labelProduct) VALUES (?,?)', [idProduct, labelProduct]);
  if (query[0]['affectedRows'] > 0) {
          res.status(200).json({ success: true, statusCode: 200, message: 'تمت الإضافة بنجاح' });

}else{
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
const updateProduct = async (req, res) => {
    const { idProduct, labelProduct } = req.body;
    try {
    const query =    await db.query('update products set labelProduct=?  where idProduct=?', [labelProduct, idProduct]);
  if (query[0]['affectedRows'] > 0) {
        res.status(200).json({ success: true, statusCode: 200, message: 'تم التحديث بنجاح' });
  
}else{
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
const deleteProduct = async (req, res) => {
    const { idProduct } = req.body;
    try {
        const query = await db.query('delete from products where idProduct=?', [idProduct]);
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

            return res.status(404).json({
                success: false,
                statusCode: 404,
                message: 'لا يمكن حذف المنتج',
            })
        }
        return  res.status(404).json({
                success: false,
                statusCode: 404,
                message: '... خطأ في الإتصال'
            })
    }


};
const searchProduct = async (req, res) => {
    const { labelProduct } = req.body;
    try {
        const products = await db.query(`SELECT * FROM products
WHERE labelProduct LIKE ?`, [`%${labelProduct}%`]);

        res.status(200).json({ success: true, statusCode: 200, data: products[0] });


    } catch (error) {

       res.status(404).json({
                success: false,
                statusCode: 404,
                message: '... خطأ في الإتصال'
            })
    }


};
module.exports = { getProducts, getProductsCategorieCommande, addProduct, updateProduct, deleteProduct, searchProduct };