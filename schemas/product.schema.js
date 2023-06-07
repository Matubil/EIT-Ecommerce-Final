const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//definimos el objeto
const productSchema = new Schema({
    name: { type: String, required: true, minLength: 3, maxLength: 50},
    price: { type: Number, required: true, min: 0, max: 10000000},
    description: { type: String, required: true},
    image: { type: String, required: true},
    stock: {type: Number, required: true, default: 1},
    active: { type: Boolean, default: true, required: true},
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category',
        // required: true,
        default: '647ca624b4dac7eed8601873'
    },
    createdAt: {type: Number, default: Date.now},
    updateAt: {type: Date, default: Date.now}
});

//joy, express validator, son un par de middleware que lo que hace, es que si no viene el objeto bien cargado como deberia, lo que pasa es que no se va a ejecutar la funcion sin siquiera.

module.exports = mongoose.model('Product', productSchema); //coleccion products clase 51 min 2:18:00 'Product' lo va a convertir en min y le va a poner en plural en mongoDb a la tabla, por eso se crea la tabla asi