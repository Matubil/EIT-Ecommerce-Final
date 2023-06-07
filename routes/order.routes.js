const express = require('express')
const router = express.Router()
const ordersController = require('../controllers/order.controller')
const jwtVerify = require('../middlewares/jwtVerify')
const isAdmin = require('../middlewares/isAdmin')

//Get all orders
router.get('/orders', [jwtVerify, isAdmin], ordersController.getOrders)
//Get order by ID
router.get('/orders/:id', ordersController.getOrdersById)
//Get user order
router.get('/orders/:idUser/user', ordersController.getUserOrders)
//Create order
router.post('/orders', ordersController.createOrder)
//Update order
router.put('/orders/:id', ordersController.updateOrder)
//Delete order
router.delete('/orders/:id', ordersController.deleteOrder)

//!como deberian de ser

//obtener todas las ordenes
// router.get("/orders/:idUser/user",orderController.getOrders)

// //obtener una Orden por su id
// router.get("/orders/:id",orderController.getOrder)

// //agregar una Orden
// router.post("/orders",orderController.addOrder)

// //Borrar una Orden
// router.delete("/orders/:id",orderController.deleteOrder)

// //actualizar una order
// router.put("/orders/",orderController.updateOrder)


module.exports = router