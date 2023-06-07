const express = require('express');
const app = express(); //hace una ejecucion del modulo express
const productRoutes = require('./routes/product.routes');
const userRoutes = require('./routes/user.routes'); //importante pasarle las rutas para saber a donde buscar las cosas
const orderRoutes = require('./routes/order.routes');
const categoryRoutes = require('./routes/category.routes');
//Rutas de las vistas
const viewsRoutes = require('./routes/views.routes')

const cors = require('cors')




//Cargar configuracion de plantillas de Javascript
app.set('view engine', 'ejs') 
app.use(express.static("public"))
//Middilewares 
app.use(express.json());//es un interpretador de archivos json
//Evitar CORS error
app.use(cors())
app.use(viewsRoutes) 
app.use('/api',[
                    productRoutes,
                    userRoutes,
                    orderRoutes,
                    categoryRoutes,
                ])

module.exports = app //lo que estamos haciendo aca, es exportar mi app al index, ya que a este lo creamos para dejar mas limpio el index