const jwt = require ('jsonwebtoken')
const secret = process.env.JWT_SECRET
const {responseCreator} = require('../utils/utils')


async function jwtVerify(req, res, next){//clase 62 2:09:00 next el middleware explicacion

    try{
        // console.log(req.headers.authorization)
        const token = req.headers.authorization
        const payload = jwt.verify(token, secret)

        // console.log(verify)

        req.user = payload //clase 63 29min lo que hace ahi es asignarle a la req.user los datos que tiene el token, que va a tener los datos el usuario pero encriptados

        next()

        // console.log(verify)

        // return responseCreator(res, 200, 'Token ok')
        
    } catch(error){
        console.log(error)
        responseCreator(res, 500, 'Error al ingresar, token no valido')
    }

}

module.exports = jwtVerify;