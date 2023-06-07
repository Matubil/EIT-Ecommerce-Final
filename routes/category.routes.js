const express = require('express')
const router = express.Router()
const categoryController = require('../controllers/category.controller.js')

//!las mias
// //Get all categories
// router.get('/category', categoryController.getCategories)
// //Create category
// router.post('/category', categoryController.addCategory)

//Update order
// router.put('/orders', ordersController.updateOrder)
//Delete order
// router.delete('/orders/:id', ordersController.deleteOrder)

//!como deberia de ser supongo
// obtener todas las categorias
router.get("/category",categoryController.getCategories)

//obtener un categoria por su id
router.get("/category/:id",categoryController.getCategory)

//agregar un categoria
router.post("/category",categoryController.addCategory)

//Borrar un categoria
router.delete("/category/:id",categoryController.deleteCategory)

//actualizar una categoria
router.put("/category/",categoryController.updateCategory)

module.exports = router