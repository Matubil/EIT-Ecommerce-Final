// const { use } = require('../routes/user.routes');
const User = require('../schemas/user.schema') //en JS se escriben las rutas asi porque js al tener express, te arrancan desde la carpeta de tu sistema, no de tu repo

const secret = process.env.JWT_SECRET
const { responseCreator } = require('../utils/utils') //esta forma va a ser con destructuracion
const bcrypt = require('bcrypt')
const saltRounds = 10; //quiere decir con cuanta complejidad vamos a hashear lo que queramos, un 10 esta bien y se puede mas, solamente que va a demorar mas
const jwt = require('jsonwebtoken')


async function postUser(req, res) {
    try {

        const user = new User(req.body)

        //Hasheamos el password con la libreria Bcyrpt
        const passwordHash = await bcrypt.hash(user.password, saltRounds)

        user.password = passwordHash;

        const newUser = await user.save()

        console.log(user)

        return res.status(201).send({
            msg: `Usuario creado correctamente`,
            user: newUser
        });

    } catch (error) {
        console.log(error);
        return res.status(500).send({
            msg: `Error al crear usuario`,
        })
    }
}

async function getUserById(req, res) {

    const id = req.params.id


    console.log("aca undef", req.user)

    if (req.user.role !== "ADMIN_ROLE" && req.user._id !== id) {   //pregunta si el rol del usuario logueado y el id de la persona es igual al que mando entonces puede obtener el usuario
        return responseCreator(res, 401, "No se puede obtener este usuario")
    }

    try {

        const user = await User.findById(id, { password: 0, __v: 0 }) //esta es otra forma de descartar el password

        if (!user) return responseCreator(res, 404, 'No se encontro el usuario')


        return responseCreator(res, 200, 'Usuario encontrado', { user })

    } catch (error) {
        console.log(error)
        return responseCreator(res, 500, 'Error al obtener el usuario')
    }
}

async function getAllUsers(req, res) {
    try {

        const users = await User.find();

        if (!users) return res.status(404).send({ msg: `No se encontraron usuarios` })

        return responseCreator(res, 200, 'Usuarios obtenidos correctamente', { users: users })

    } catch (error) {
        console.log(error);
        return responseCreator(res, 500, 'Error al obtener usuarios')
    }
}

async function deleteUser(req, res) {
    try {
        const id = req.params.id
        const deletedUser = await User.findByIdAndDelete(id)

        if (!deletedUser) return responseCreator(res, 404, 'No se encontro el usuario')

        return responseCreator(res, 200, 'Usuario borrado correctamente', { deleteUser })

    } catch (error) {  
        console.log(error)
        responseCreator(res, 500, 'No se pudo eliminar el usuario')
    }
}

const login = async (req, res) => {
    try {

        console.log(req.body)

        //email y contraseña
        const emailLogin = req.body.email;
        const passwordLogin = req.body.password;

        //Checkeo que me hayan enviado todos los datos requeridos para el login
        if (!emailLogin || !passwordLogin) {
            return res.status(400).send({ msg: `Datos del login incompletos` })
        }

        //Buscar si existe un usuario con dicho email
        const user = await User.findOne({ email: emailLogin })//Estoy buscando en los usuarios el usuario que tenga el mail que estoy enviando

        console.log(user)

        if (!user) {
            return res.status(404).send({ msg: `Datos de ingreso incorrecto` }) 
        }

        //Comprobamos si el usuario obtenido en su propiedad password coincide con el password que me envia el usuario en el login
        const result = bcrypt.compare(passwordLogin, user.password) //aca se compara las contras, la hasheada con la que recibo

        if (!result) {
            return res.status(404).send({ msg: `Datos de ingreso incorrecto` })
        }

        user.password = undefined //Lo que hacemos es que si mandamos los datos, que le lleguen como undefined

        const token = jwt.sign(user.toJSON(), secret) 

        console.log(token)

        return res.status(201).send({
            msg: `Login correcto`,
            user,
            token
        })

    } catch (error) {
        console.log(error);
        return res.status(500).send(`No se pudo realizar el login`)
    }
}

async function updateUser(req, res) {
    try {

        const id = req.params.id;

        if (req.user.role !== 'ADMIN_ROLE' && id !== req.user._id) {
            return responseCreator(res, 401, 'No tiene permiso para modificar')
        }

        const data = req.body
        data.password = undefined //para que no cambie la contraseña cuando es un update del usuario comunmente se la define asi, y para cambiar la contra o actualizarla, se hace una nueva funcion aparte

    
        const updatedUser = await User.findByIdAndUpdate(id, data, { new: true }) //lo que hace el true, es que si mi usuario se actualizo correctamente, me lo devuelve

        if (!updatedUser) return responseCreator(res, 404, 'No se encontro el usuario')


        return responseCreator(res, 200, 'Usuario actualizado correctamente', { updatedUser })

    } catch (error) {
        console.log(error)
        return responseCreator(res, 500, 'Error al actualizar el usuario')
    }
}

async function updatePassword(req, res) {
    try {
        const id = req.params.id
        const oldPassword = req.body.oldPassword;
        let newPassword = req.body.newPassword;

        const user = await User.findById(id)

        if (!user) responseCreator(res, 404, 'No se encontro el usuario')

        const pwdCompare = await bcrypt.compare(oldPassword, user.password)

        if (!pwdCompare) responseCreator(res, 404, 'No se pudo modificar la contraseña') //porque no coincide con la contraseña vieja

        newPassword = await bcrypt.hash(newPassword, saltRounds);

        await User.findByIdAndUpdate(id, { password: newPassword })

        return responseCreator(res, 200, 'Password actualizado correctamente!')


    } catch (error) {
        console.log(error)
        responseCreator(res, 500, 'No se pudo actualizar el usuario')
    }
}


module.exports = {
    postUser,
    getUserById,
    getAllUsers,
    deleteUser,
    login,
    updateUser,
    updatePassword
}