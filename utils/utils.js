//Esta se usaria para funciones que se usaria en bastantes partes

function responseCreator(res, code, msg, obj){
    return res.status(code).send({msg, ...obj }) 
}

module.exports = {
    responseCreator
}