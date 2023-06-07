const express = require('express')
const router = express.Router()
const uploadController = require('../controllers/upload.controller')

//Cargar image de producto
router.post('/product/upload/image', uploadController.uploadProduct)

// router.get('/file/:id', uploadController.getImage)
// router.get('/files', uploadController.getImages)

module.exports = router

