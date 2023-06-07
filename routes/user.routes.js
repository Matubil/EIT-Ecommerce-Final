const express = require('express');
const router = express.Router();
const userController = require('../controllers/user.controller')
const jwtVerify = require('../middlewares/jwtVerify')
const isAdmin = require('../middlewares/isAdmin')


//GET - Leer todos los usuarios
router.get('/users', [jwtVerify, isAdmin], userController.getAllUsers)
//!de prueba despues borrar
// router.get('/users', userController.getAllUsers)

//------------------------------------------------------------
//GET - Leer usuario
router.get('/users/:id', jwtVerify, userController.getUserById)
//!de prueba despues borrar
// router.get('/users/:id', userController.getUserById)

//POST - Crear usuario
router.post('/users', userController.postUser)

//POST - Login
router.post('/login', userController.login)

//DELETE - Borrar usuario
router.delete('/users/:id', [jwtVerify, isAdmin], userController.deleteUser)
//!de prueba despues borrar
// router.delete('/users/:id', userController.deleteUser)

//PUT - Actualizar usuario
router.put('/users/:id', jwtVerify, userController.updateUser)

//PUT - Actualizar Contraseña
router.put('users/:id/password', userController.updatePassword) //va a ser un endpoint especifico para cambiar el password



module.exports = router; // recordar exportarlo