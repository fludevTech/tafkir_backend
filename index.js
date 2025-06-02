const express = require('express');
const app = express();
const mySqlPool = require('./config/db')
const usersRouter = require('./router/user_router');
const rolesRouter = require('./router/role_router');
const wilayaRouter = require('./router/wilaya_router');
const storeRouter = require('./router/store_router');
const commandeRouter = require('./router/commande_router');
const categorieRouter = require('./router/categorie_router');
const containerRouter = require('./router/container_router');
const productsRouter = require('./router/products_router');
const imagesRouter = require('./router/images_router');

const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());

const port = process.env.port || 3000;
app.use('/users', usersRouter);
app.use('/roles', rolesRouter);
app.use('/stors', storeRouter);
app.use('/wilaya', wilayaRouter);
app.use('/commands', commandeRouter);
app.use('/categories', categorieRouter);
app.use('/containers', containerRouter);
app.use('/products', productsRouter);
app.use('/images', imagesRouter);




mySqlPool.query('select 1').then(() => {
    console.log('mysql db connected elhamdolillah');
    app.listen(port, () => {
        console.log('succssfully connected  at port ' + `${port}`)
    })
}).catch((error) => {
    console.log(error);
})


