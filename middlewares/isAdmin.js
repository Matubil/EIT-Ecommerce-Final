function isAdmin(req, res ,next){
    if(req.user.role !== 'ADMIN_ROLE'){
        return res.status(401).send({msg: 'No esta autorizado'})
    }

    next()
}

module.exports = isAdmin