const { responseCreator } = require('../utils/utils')
const Order = require('../schemas/order.schema')

async function createOrder(req, res) {

    try {
        const body = req.body

        const data = new Order(body)

        console.log(data)

        const newOrder = await data.save()

        responseCreator(res, 200, 'Orden creada correctamente', { newOrder })

    } catch (error) {
        console.log(error)
        responseCreator(res, 500, 'No se pudo crear la orden')

    }
}

async function getOrders(req, res) {

    try {

        const orders = await Order.find().populate('userId', { fullname: 1, email: 1 }).populate('products.productId', { name: 1, description: 1, image: 1 }) //Datos que me voy a traer del usuario

        // console.log(fullName)

        if (!orders) {
            return responseCreator(res, 404, 'No se encontraron ordenes')
        }

        return responseCreator(res, 200, 'Ordenes obtenidas correctamente', { orders })


    } catch (error) {
        console.log(error);
        return responseCreator(res, 500, 'No se pudieron obtener ordenes')
    }
}

async function getOrdersById(req, res) {

    try {
        const id = req.params.id

        if (!id) return responseCreator(res, 404, "Error al obtener el Id")

        const order = await Order.findById(id).populate('userId', { fullname: 1, email: 1 }).populate('products', { name: 1, description: 1, image: 1 }) //Datos que me voy a traer del usuario

        if (!order) {
            return responseCreator(res, 404, 'No se pudo obtener la orden')
        }

        console.log(order)

        return responseCreator(res, 200, `Orden obtenida correctamente`, { order });
    } catch (error) {
        console.log(error);
        return responseCreator(res, 500, 'No se pudo obtener orden')
    }
}

async function getUserOrders(req, res) {

    try {

        const usrID = req.params.id

        if (!usrID) {
            return responseCreator(res, 404, 'No se encontró el usuario')
        }

        const userOrders = await Order.find({ userId: usrID }).populate('userId', { fullName: 1, email: 1 }).populate('products.productId', { name: 1, description: 1, image: 1 })

        if (!userOrders) {
            return responseCreator(res, 404, 'No se encontraron ordenes')
        }


        return res.send(res, 200, `Ordenes de usuario ${userOrders[0].userID.fullName} obtenidas correctamente`, { userOrders });

    } catch (error) {
        console.log(error);
        return responseCreator(res, 500, 'No se pudieron obtener las ordenes')
    }
}

async function updateOrder(req, res) {
    try {
        const id = req.query.id;
        const data = req.body

        const newOrder = await Order.findByIdAndUpdate(id, data, { new: true })

        if (!newOrder) {
            return res.status(404).send({
                msg: `La Orden no se actualizo`
            })
        }


        return res.status(200).send({
            msg: 'Orden encontrada',
            newOrder: newOrder
        })

    } catch (error) {
        console.log(error);
        return res.status(500).send({
            msg: `No se pudo actualizar la orden`
        })
    }
}

async function deleteOrder(req, res) {
    try {
        const id = req.params.id
        const deletedOrder = await Order.findByIdAndDelete(id)

        if (!deletedOrder) return responseCreator(res, 404, 'No se encontro la orden')

        return responseCreator(res, 200, 'Orden borrado correctamente', { deleteOrder })

    } catch (error) {  
        console.log(error)
        responseCreator(res, 500, 'No se pudo eliminar la orden')
    }
}


module.exports = {
    createOrder,
    getOrders,
    getOrdersById,
    getUserOrders,
    updateOrder,
    deleteOrder
}