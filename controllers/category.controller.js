const { responseCreator } = require('../utils/utils')
const Category = require('../schemas/category.schema')


async function getCategories(req, res) {
    try {
        const categories = await Category.find()
        if (!categories) {
            return responseCreator(res, 500, 'No se obtuvo ninguna categoria')

        }

        return responseCreator(res, 200, 'Categoria obtenida correctamente', categories)
    } catch (error) {
        console.log(error)
        return responseCreator(res, 500, 'No se obtuvo ninguna categoria')

    }

}


async function getCategory  (req, res)  {
    try {
        const idParam = req.params.id;
        if (!idParam) {
            return res.status(400).send({
                mgs: `Es necesario que mande ID`
            })
        }

        const product = await Product.findById(idParam);
        if (!product) {
            return res.status(404).send({
                mgs: `No se encontro el producto`
            })
        }
        res.status(200).send({
            msg: 'Producto encontrado',
            product
        });

    } catch (error) {
        return res.status(500).send({
            msg: 'Error al obtener el producto'
        });
    }


}

async function addCategory(req, res) {

    try {

        const category = new Category(req.body)

        const newCategory = await category.save()

        return responseCreator(res, 201, 'Categoria obtenida correctamente', {newCategory})

    } catch (error) {
        console.log(error)
        responseCreator(res, 500, 'No se pudo crear la categoria')
    }
}

async function deleteCategory (req, res){
    try {
        const id = req.params.id;
        const deleteCategory = await Product.findByIdAndDelete(id)

        if (!deleteCategory) {
            return res.status(404).send({ mgr: 'No se encontre la categoria' });
        }

        return res.status(200).send({
            msg: 'Categoria borrado correctamente',
            deleteCategory
        })

    } catch (error) {
        console.log(error)
        return res.status(500).send({
            msg: 'Error al borrar la categoria'
        });
    }
}

async function updateCategory(req, res) {
    try {
        const id = req.query.id;
        const data = req.body

        const newCategory = await Category.findByIdAndUpdate(id, data, { new: true })

        if (!newCategory) {
            return res.status(404).send({
                msg: `La categoria no se actualizo`
            })
        }


        return res.status(200).send({
            msg: 'Categoria actualizada',
            newCategory: newCategory
        })

    } catch (error) {
        console.log(error);
        return res.status(500).send({
            msg: `No se pudo actualizar la categoria`
        })
    }
}


module.exports = {
    getCategories,
    addCategory,
    getCategory,
    deleteCategory,
    updateCategory
}