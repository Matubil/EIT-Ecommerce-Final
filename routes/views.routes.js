// Aca se va a definir las rutas de nuestras vistas 
const express = require('express')
const router = express.Router()
const viesController = require('../controllers/views.controllers.js')


//Definicion de todas las rutas vistas y sus respectivos controladores
router.get('/',(req, res) => res.render('index', {name: 'John Doe', title: 'Index template EJS'})) //el metodo render dice que archivo quiero cargar
router.get('/contact',(req, res) => res.render('contact')) 
router.get('/about-us',(req, res) => res.render('about-us')) 
router.get('/admin-products',(req, res) => res.render('admin-products')) //!CHEQUEAR SI LA PERSONA ESTA LOGUEADA ES UN ADMIN
router.get('/admin-user',(req, res) => res.render('admin-user')) //!CHEQUEAR SI LA PERSONA ESTA LOGUEADA ES UN ADMIN
router.get('/login',(req, res) => res.render('login')) 
router.get('/order-detail',(req, res) => res.render('order-detail')) 
router.get('/product-detail',(req, res) => res.render('product-detail')) 
router.get('/register',(req, res) => res.render('register')) 
router.get('/user-profile',(req, res) => res.render('user-profile')) 
//Server size rendering

module.exports = router