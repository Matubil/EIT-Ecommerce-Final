const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const orderSchema = new Schema({
    products: [
        {
            productId:{ type: Schema.Types.ObjectId, ref:"Product", require: true}, // con el ID me traigo todos los datos del producto. El nombre Product como lo tenemos definido en product schema
            quantity: { type: Number, required: true, min:1 },
            price: { type: Number, required: true }
        }
    ],
    total: { type: Number, required: true, min: 1},
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true},
    createdAt: { type: Date, required: true, default: Date.now},
    updateAt:{type:Date , required:true,default: Date.now},    //Cuando se modifico seria esto
    status: { type: String, enum: ['onhold', 'inprogress', 'done' ], default: 'onhold' }
    // metodo de pago
    // estado del pago
    // direccion de delivery
})

module.exports = mongoose.model('Order', orderSchema)