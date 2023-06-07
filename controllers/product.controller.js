const Product = require('./../schemas/product.schema');
const { responseCreator } = require('../utils/utils')

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

async function addProduct(req, res) {

    try {
        const product = new Product(req.body)
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