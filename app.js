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
app.set('view engine', 'ejs') //clase 66 min 24
app.use(express.static("public")) //clase 66 min 1:24:25 se usa para compartir la carpeta public, ya se depreco un poco esta forma por los nuevos frameworks como nextjs entre otros

//Middilewares / son intermediarios, mirar hora 40-50min aprox, clase 21/3
app.use(express.json());//es un interpretador de archivos json
//Evitar CORS error
app.use(cors())
// app.use(express.urlencoded({extended: true}))
app.use(viewsRoutes) // Clase 66 min 35 explica porqué lo pone ahi
app.use('/api',[
                    productRoutes,
                    userRoutes,
                    orderRoutes,
                    categoryRoutes,
                ])

// app.get('/', (request, response) => { //lo mejor comunmente es armar las rutas primero, por eso es que esta antes de poner en marcha el servidor
//     response.send({
//         msg: 'Bienvenido a mi servidor express',
//         ok: true
//     })
// })

//Definir rutas a usar por mi app express
//si vamos a usar varias rutas lo mejor es usar un array de rutas
// app.use(productRoutes)
// app.use(userRoutes)
// app.use([
//     productRoutes,
//     userRoutes
// ])



module.exports = app //lo que estamos haciendo aca, es exportar mi app al index, ya que a este lo creamos para dejar mas limpio el index