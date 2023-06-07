const Product = require('./../schemas/product.schema');
const { responseCreator } = require('../utils/utils')

//! HACERLAS ASINCRONAS A CADA FUNCION

// const getAllProducts =  async (req, res) => { 
//     // !RECORDAR PONERLE UN TRYCATCH
//     const itemLimit = 5 //clase 64 min 2:18: 00 explica como limitar la cantidad de productos que trae, esto es lo de paginacion, osea cuantos productos se muestran por pagina
//     const itemSkip = itemLimit * (req.query.skip-1) // cuantos voy a saltear

//     // item a saltear = 5 * skip

//     const productos = await Product.find().limit(itemLimit).skip(itemSkip) //clase 64 min 2:28:00

//     // const [products, total] = await Promise.all([ // Clase 64 min 2:24:00 No siempre se usa, se usa para cuadno sabes que si o si va a volver una
//     //                                         Product.find().limit(5),
//     //                                         Product.countDocuments()                                          
//     //                                     ])

//     const total = await Product.countDocuments()
//         // res.status(200).send({
//         //     msg: 'Productos solicitados correctamente',
//         //     productos: productos
//         // });
//        return  responseCreator(res, 200, 'Productos obtenidos correctamente', {productos, total}) //es lo mimso que lo de arriba


// }
// function getAllProducts(req, res){ } //otra forma de declarar la funcion mas estilos C# pero en js 

async function getAllProducts(req, res) {

    try {
        const products = await Product.find().sort({ createdAt: 'asc' })
        // console.log(products)


        return responseCreator(res, 200, "Productos obtenidos correctamente",   {products});
    } catch (error) {
        console.log(error);
        return responseCreator(res, 500, "No se pudieron obtener los productos")
    }
}

async function getProductById(req, res) {
    try {
        const product = await Product.findById(req.params.id)

        // console.log(product)

        return responseCreator(res, 200, `Producto obtenido correctamente`, {product});
    } catch (error) {
        console.log(error);
        return responseCreator(res, 500, `Error al obtener el producto`)
    }
}

//joy, express validator, son un par de middleware que lo que hace, es que si no viene el objeto bien cargado como deberia, lo que pasa es que no se va a ejecutar la funcion sin siquiera.
async function addProduct(req, res) {
    // const product = new Product(req.body)

    // console.log(product)

    // product.save()
    //             .then(function(product){//para hacer la funcion asincrona tenemos que ponerle un .then() asi una vez que termina de ejecutar esta linea continua con la siguiente

    //                 // if(!product)    {
    //                 //     console.log(`No espero`)
    //                 //    return res.status(200).send(`Algo va a fallar`) //tenemos que ponerle return, para que ahi se corte la lectura, asi que recordar siempre el return
    //                 // }

    //                 console.log(`Termino el guardado del producto`)
    //                 return res.status(200).send({
    //                     msg: 'Productos guardado correctamente',
    //                     product
    //                 })

    //             }).catch(error => {

    //                 console.log(error);
    //                 return res.status(500).send(`El producto no se pudo guardar`)

    //             }) 
    //Error de que le mandamos un mensaje de mas 
    // console.log(`No espero`)
    // res.status(200).send(`Algo va a fallar`)



    console.log(req.body, "body")
    console.log(req.file, "body2")

    try {
        const product = new Product(req.body)
        // product.image = req.image.fileName    //clase 65 min 2:07:00
        await product.save()
        return responseCreator(res, 200, 'Producto agregado correctamente', {product})

    } catch (error) {
        console.log(error)
        responseCreator(res, 500, 'Error al agregar el producto', error)
    }


}

async function deleteProduct(req, res) {
    const id = req.params.id; //ese dia despues del param tiene que coincidir con el del routeo, osea los nombres tienen que coincidir

    Product.findByIdAndDelete(id)
        .then((deleted) => {

            if (!deleted) {
                return res.status(404).send({
                    msg: `No se encontro el producto a borrar`
                })
            }

            return res.status(200).send({
                msg: `Producto borrado correctamente`,
                deleted
            })

        }).catch(error => {
            console.log(error);
            return res.status(500).send({
                msg: `Error al borrar el producto`
            })
        })
}

async function updateProduct(req, res) {
    try {
        const id = req.params.id;
        const data = req.body

        if(!id) return responseCreator(res,404,"Error al obtener el producto")

        const updateProduct = await Product.findByIdAndUpdate(id, data, { new: true })

        if (!updateProduct) return res.status(404).send({msg: `Error al actualizar el producto`})
        

        return res.status(200).send({msg: 'Producto actualizado correctamente',newProduct: updateProduct})

    } catch (error) {
        console.log(error);
        return res.status(500).send({msg: `No se pudo actualizar el producto`})
    }
}

module.exports = {
    getAllProducts,
    addProduct,
    deleteProduct,
    getProductById,
    updateProduct
}