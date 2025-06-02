const db = require('../config/db')

const getContainer = async (req, res) => {
    const { idCommande, idCategorie } = req.body
    try {
        const commandeCategorie = await db.query(
            `
            select * from container 
             inner join commande 
            on container.idCommande = commande.idCommande 
            inner join categories
             on container.idCategorie = categories.idCategorie
              inner join products
             on container.idProduct = products.idProduct
             where container.idCommande =?and container.idCategorie=? 
            `, [idCommande, idCategorie]);
        res.json({ success: true, statusCode: 200, data: commandeCategorie[0] })
    } catch (error) {
        res.status(404).json({
            success: false,
            statusCode: 404,
            message: '... خطأ في الإتصال'
        })
    }
};
const getCategoriesInCommande = async (req, res) => {
    const { idCommande } = req.body
    try {
        const commandeCategorie = await db.query(
            `
        select * from categories
         where idCategorie in (
         select idCategorie
        from container
         where idCommande = ? ) 
            `, [idCommande]);
        res.json({ success: true, statusCode: 200, data: commandeCategorie[0] })
    } catch (error) {
        res.status(404).json({
            success: false,
            statusCode: 404,
            message: '... خطأ في الإتصال'
        })
    }
};
const getCategoriesNoInCommande = async (req, res) => {
    const { idCommande } = req.body
    try {
        const commandeCategorie = await db.query(
            `
        select * from categories
         where idCategorie not in (
         select idCategorie
        from container
         where idCommande = ? ) 
            `, [idCommande]);
        res.json({ success: true, statusCode: 200, data: commandeCategorie[0] })
    } catch (error) {
        res.status(404).json({
            success: false,
            statusCode: 404,
            message: '... خطأ في الإتصال'
        })
    }
};

const addContainerProduct = async (req, res) => {
    const { idCommande, idCategorie, idProduct, qteProduct,note, isConfirmed } = req.body;
    try {
        const query = await db.query('insert into container (idCommande, idCategorie,idProduct,qteProduct,note,isConfirmed) VALUES (?,?,?,?,?,?)', [idCommande, idCategorie, idProduct, qteProduct,note, isConfirmed]);
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
const updateQteProductContainer = async (req, res) => {
    const { idCommande, idCategorie, idProduct, qteProduct } = req.body;
    try {
        const query = await db.query('update container set qteProduct=?  where idCommande=? and idCategorie=? and idProduct=?', [qteProduct, idCommande, idCategorie, idProduct]);

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
        });
    }
};
const updateConfirmedProduct = async (req, res) => {
    const { idCommande, idCategorie, idProduct, isConfirmed } = req.body;
    try {
      const query =   await db.query('update container set isConfirmed=?  where idCommande=? and idCategorie=? and idProduct=?', [isConfirmed, idCommande, idCategorie, idProduct]);

  if (query[0]['affectedRows'] > 0) {
      res.status(200).json({ success: true, statusCode: 200, message: 'تم التجديث بنجاح' });

  }else{
     res.status(404).json({
            success: false,
            statusCode: 404,
            message:'خطأ في الإتصال'
        })
  }
    } catch (error) {
        res.status(404).json({
            success: false,
            statusCode: 404,
            message: '... خطأ في الإتصال'
        })
    }
}
const updateNoteContainer = async (req, res) => {
    const { idCommande, idCategorie, idProduct, note } = req.body;
    try {
      const query=   await db.query('update container set note=?  where idCommande=? and idCategorie=? and idProduct=?', [note, idCommande, idCategorie, idProduct]);
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
const deleteContainerProduct = async (req, res) => {
    const { idCommande, idCategorie, idProduct } = req.body;
    try {
        const query = await db.query('delete from container where idCommande=? and idCategorie=? and idProduct=?', [idCommande, idCategorie, idProduct]);

        if (query[0]['affectedRows'] > 0) {

            return res.status(200).json({ success: true, statusCode: 200, message: 'تم الحذف بنجاح' });
        }
        return res.status(404).json({
            success: false,
            statusCode: 404,
            message:'خطأ في تحديث المنتج' ,
        })
    } catch (error) {
        res.status(404).json({
            success: false,
            statusCode: 404,
            message: '... خطأ في الإتصال'
        })
    }
}
module.exports = { getCategoriesInCommande, getCategoriesNoInCommande, getContainer, updateNoteContainer, addContainerProduct, updateQteProductContainer, updateConfirmedProduct, deleteContainerProduct };