const multer = require('multer')    //clase 65 min 1:11:00
const fs = require('fs')    //File storage de node
const { v4: uuidv4 } = require('uuid') // clase 65 min 1:48:00
const Product = require('../schemas/product.schema')

// const checkImageExist = async(req,res)=>{ //Clase 67 min11  esto podria ir como un middleware
//     if(req.body.image){
//         const id = req.params.id
//         const product = Product.findById(id, {image})
//         if(req.body.image !== product.image){
//             return res.status(400).send('Error')
//         }
//         else{
//             req.body.image
//         }
//     }
// }

const storage = multer.diskStorage({
    destination: (req, file, callback) => {
        callback(null, 'public/upload/product')
    },
    filename: (req, file, callback) => {
        console.log(file.originalname, "LINEA24")
        const fileExt = file.originalname.split('.').at(-1); //extension del archivo clase 65 min 1:34:00

        console.log(fileExt, "LINEA27")

        // const fileNAme = req.body.image

        const fileName = `${uuidv4()}.${fileExt}`
        console.log(fileName, " + LINEA13")

        // if(!req.body.image){
        // }

        req.body.image = fileName

        callback(null, fileName)
    }
})

const uploadMulter = multer({
    storage,
    limits: { fileSize: 1024 * 1024 * 10 }, //lo limitas aca a 10 mb, porque multiplicas bytes, kb y mb
    fileFilter: (req, file, callback) => {    //filtras el tipo de archivo
        const type = file.mimetype.split('/')[0]
        type === 'image' ? callback(null, true) : callback(null, false) //clase65 min 1:43:00
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
    // checkImageExist,
    uploadProduct,
    uploadFile,
    getImage,
    getImages
}