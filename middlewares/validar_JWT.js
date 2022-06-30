const {response, request} = require('express');
const jwt = require('jsonwebtoken');
const usuario = require('../models/usuario');

const validarJWT = async (req = request, res = response, next) => {

    const token = req.header('x-token')
    
    if (!token) {
        return res.status(401).json({
            mensaje: 'No hay token'
        });
    }

    
    try {

        const {uid} = jwt.verify(token, process.env.SECRET_KEY)

        const usuarioAuth = await usuario.findById(uid)

        if (!usuarioAuth) {
            return res.status(401).json({
                mensaje: 'Token no valido'
            })
        }


        if (!usuarioAuth.estado){
            return res.status(401).json({
                mensaje: 'Token no valido'
            })
        }
        req.usuario = usuarioAuth
        
        next();
    } catch (error) {
        console.log(error);
        res.status(401).json({
            mensaje: 'Token no valido'
        })
    }

}


module.exports = { 
    validarJWT
}