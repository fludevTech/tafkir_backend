const db = require('../config/db')

const getCommandsStore = async (req, res) => {
    const { idStore, dateStart, dateEnd } = req.body;

    try {
        const commands = await db.query('select * from commande where dateCommande>=? and dateCommande<? and  idStore =? order by dateCommande Desc', [dateStart, dateEnd, idStore]);

        res.json({ success: true, statusCode: 200, data: commands[0] })
    } catch (error) {
        res.status(404).json({
            success: false,
            statusCode: 404,
            message: '... خطأ في الإتصال'
        })
    }
};
///////
const addCommande = async (req, res) => {
    const { idCommande, dateCommande, isCompleted, designationCommande, idStore, idUser } = req.body;
    try {
      const query =   await db.query('insert into commande (idCommande,dateCommande,isCompleted,designationCommande,idStore,idUser) VALUES (?,?,?,?,?,?)', [idCommande, dateCommande, isCompleted, designationCommande, idStore, idUser]);

        if (query[0]['affectedRows'] > 0) {
            res.status(200).json({ success: true, statusCode: 200, message: 'تمت العملية بنجاح' });

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
const updateCommandeStatus = async (req, res) => {
    const { idCommande, isCompleted } = req.body;
    try {
        const query = await db.query('update commande set isCompleted=?  where idCommande=?', [isCompleted, idCommande]);
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
const updateCommandeDesignation = async (req, res) => {
    const { idCommande, designationCommande } = req.body;
    try {
        const query = await db.query('update commande set designationCommande=?  where idCommande=?', [designationCommande, idCommande]);

        if (query[0]['affectedRows'] > 0) {
            res.status(200).json({ success: true, statusCode: 200, message: 'تم التحديث بنجاح' });
        }
        else {
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
const deleteCommande = async (req, res) => {
    const { idCommande } = req.body;
    try {
        const query = await db.query('delete from commande where idCommande=?', [idCommande]);

        if (query[0]['affectedRows'] > 0) {

            return res.status(200).json({ success: true, statusCode: 200, message: 'تمت العملية بنجاح' });
        }
        return res.status(404).json({
            success: false,
            statusCode: 404,
            message: 'خطأ في الإتصال'
        })

    } catch (error) {
        res.status(404).json({
            success: false,
            statusCode: 404,
            message: '... خطأ في الإتصال'
        })
    }


};
module.exports = { getCommandsStore, addCommande, updateCommandeStatus, updateCommandeDesignation, deleteCommande };