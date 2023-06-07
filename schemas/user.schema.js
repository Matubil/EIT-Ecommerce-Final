const mongoose = require('mongoose')
const Schema = mongoose.Schema

const UserSchema = new Schema({
    fullname: { type: String, required: true, minLength: 5, maxLength: 150},
    email: {
        type: String,
        required: true,
        minLength: 6,
        maxLength: 40,
        unique: true, //antes de guardarlo va a verificar si se encuentra guardado
        index: true,    //indice de busqueda
        validate: {
            // Esta funcion de validacion se ejecutaran automaticamente cuando se intente guardar un documento en la  base de datos
            validator: function(value){
                return /^[\w-.]+@([\w-]+.)+[\w-]{2,4}$/.test(value)  
            },
            message: props => `${props.value} no es un mail válido`
        }
    },
    password: {type: String, required: true, minLength: 8, maxLength:150 },
    age: {type: Number, required:true, min:12, max: 120},

    role: {
        type: String,
        required: true,
        default: 'CLIENT_ROLE',
        enum: [
            'SUPERADMIN_ROLE',
            'ADMIN_ROLE',
            'USER_ROLE',
            'CLIENT_ROLE'
        ]},
    date: {type: Date},
    createdAt: {type: Date, default: Date.now},
})



module.exports = mongoose.model('User', UserSchema)
