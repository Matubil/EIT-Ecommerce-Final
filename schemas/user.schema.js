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
                return /^[\w-.]+@([\w-]+.)+[\w-]{2,4}$/.test(value)    // email validator Regex, //!SE LLAMA EXPRESION REGULAR, CUANDO QUERAMOS BUSCAR ALGUNA HAY QUE PONER ESO        
            },
            message: props => `${props.value} no es un mail válido`
        }
    },
    password: {type: String, required: true, minLength: 8, maxLength:150 },
    age: {type: Number, required:true, min:12, max: 120},
    //! VER CLASE 67 min 4:20 que tiene un campo que se llama active: {type: Boolean ,default: true, required: true}
    /* y otro campo que va abajo de image y no esta el createdAt que es, esto es un extra como tambien los distintos roles 
    permissions:[
        {
            type:String,
            enum:[
                'read_products',
                'create_products',
                'update_products',
                'delete_products',
                'read_orders',
                'update_orders',
                'manage_users',
                'manage_roles',
            ],
        },
    ], */
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
    // gender: {type: String,  required: true, enum: ['masculino','femenino','otro']}
    date: {type: Date},
    // image: {type: String}, // default}: podemos poner esta propiedad con la ruta de una foto por defecto para ponerle una foto basica
    createdAt: {type: Date, default: Date.now},
    // secretAnswers: [  //?ver clase 62 min 1:25 - 1:35 parte de seguridad que se usa hoy en dia, se usa mas lo de recoveryCode, tambien clase 67 min 7 habla de seguridad
    //     {
    //         questionId: 'asdasdasd',
    //         asnwer: 'Kaise'
    //     }
    // ]
})

// questoins = [ //?ver clase 62 min 1:25 - 1:35 parte de seguridad que se usa hoy en dia, se usa mas lo de recoveryCode
//     {
//         id: 'asdasdasd', text: 'Cual es tu mascota favorita?'
//     }
// ]

module.exports = mongoose.model('User', UserSchema)
