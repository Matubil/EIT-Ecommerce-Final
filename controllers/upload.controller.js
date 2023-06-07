const multer = require('multer')    
const fs = require('fs')    //File storage de node
const { v4: uuidv4 } = require('uuid') 
const Product = require('../schemas/product.schema')


const storage = multer.diskStorage({
    destination: (req, file, callback) => {
        callback(null, 'public/upload/product')
    },
    filename: (req, file, callback) => {
        const fileExt = file.originalname.split('.').at(-1); //extension del archivo

        const fileName = `${uuidv4()}.${fileExt}`

        req.body.image = fileName

        callback(null, fileName)
    }
})

const uploadMulter = multer({
    storage,
    limits: { fileSize: 1024 * 1024 * 10 }, //lo limitas aca a 10 mb, porque multiplicas bytes, kb y mb
    fileFilter: (req, file, callback) => {    //filtras el tipo de archivo
        const type = file.mimetype.split('/')[0]
        type === 'image' ? callback(null, true) : callback(null, false) 
    }
})

const uploadProduct = uploadMulter.single('file');

const uploadFile = async (req, res) => {
    console.log(req.file, "uploadFile")
    const img = fs.readFileSync(req.file.path)
    const encode_img = img.toString('base64')
    if (!img) {
        const error = new Error(`Please upload a file`)
        error.httpStatusCode = 400
        return nextTick(error)
    }

    const newFile = new Upload({
        name: req.file.originalname,
        data: new Buffer.from(encode_img, 'base64'),
        contentType: req.file.mimetype
    })

    const fileUploaded = await newFiel.save()
    const id = newFile._id.toString()

    res.status(201).json({ message: 'File uploaded successfulyy', file: req.file.originalname, id })
}

async function getImage(req, res) {
    const file = await uploadFile.findById(req.params.id)

    res.status(200).send(file)
}

async function getImages(req, res) {
    const files = await uploadFile.find()

    res.status(200).send(files)
}

module.exports = {
    uploadProduct,
    uploadFile,
    getImage,
    getImages
}