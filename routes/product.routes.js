const express = require('express'); //instancia la libreria
const router = express.Router() //de la libreria elige la funcion

const productController = require('./../controllers/product.controller')
const uploadController = require('../controllers/upload.controller')
const jwtVerify = require('../middlewares/jwtVerify')
const isAdmin = require('../middlewares/isAdmin')



//Obtener todos los productos
router.get('/products', productController.getAllProducts)

//Obtener todos los productos por categoria vemos si hacerla
//Obtener un producto especifico
router.get('/product/:id', productController.getProductById)

//Añadir un producto
router.post('/product', [jwtVerify, isAdmin], uploadController.uploadProduct, productController.addProduct)

//Modificar producto
router.put('/product/:id', [jwtVerify, isAdmin], uploadController.uploadProduct,  productController.updateProduct)
// router.put('/product/:id', [uploadController.checkImageExist, uploadController.uploadProduct], productController.updateProduct)

//Modificar la imagen del producto
// router.put('/product/image/:id', [uploadController.checkImageExist, uploadController.uploadProduct], productController.updateImage)


//Eliminar un producto, podes madnarlo asi /product/:nombreDeParam/:segundoParam ahi se manda 2 parametros
// router.delete('/product/:nombreDeParam/:segundoParam', productController.deleteProduct)
router.delete('/product/:id', [jwtVerify, isAdmin], productController.deleteProduct) //los 2 puntos antes del id, significa que va a ir variando esa variable, en este caso id, creo que indica, que le manda una variable/ un param, aunque lo que tiene de malo es que es muy fijo, entonces al enviarlo de una manera estricta no va a funcionar, ejemplo si pongo :id/:name y mando :name/:id no va funcionar, entonces en get product vamos a declarar la mejor manera que es una query param

//!como deberian de ser
//obtener un producto segun su id
// router.get("/products/:id",productosController.getProduct)

// //Agregar un producto
// router.post("/products",[jwtVerify, isAdmin],uploadController.uploadProduct,productosController.addProduct)

// //Borrar un producto
// router.delete("/products/:id",[jwtVerify, isAdmin],productosController.deleteProduct)

// //Actualizar un producto
// router.put("/products/:id",[jwtVerify, isAdmin],productosController.updateProduct)

// //Actualizar imagen del producto
// router.put("/products/:id/image",[jwtVerify,isAdmin],uploadController.uploadProduct,productosController.updateProduct)

module.exports = router;