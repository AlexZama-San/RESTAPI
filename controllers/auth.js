const { response } = require("express");
const bcryptjs = require('bcryptjs');

const Usuario = require('../models/usuario');
const { generarJWT } = require("../helpers/generarJWT");


const login = async(req, res=response) => {

    const { correo, password } = req.body;

    try {

        const usuario = await Usuario.findOne({ correo });
        if (!usuario) {
            return res.status(400).json({
                msg: 'El correo es incorrecto o no existe'
            });
        }

        if (!usuario.estado) {
            return res.status(400).json({
                msg: 'El usuario no esta activo'
            });
        }

        const validPassword = bcryptjs.compareSync(password, usuario.password);
        if (!validPassword) {
            return res.status(400).json({
                msg: 'El password es incorrecto o no existe'
            });
        }

        const token = await generarJWT(usuario.id)


        res.json({
            message: 'Login correcto',
            usuario,
            token
        })
        
    } catch (error) {
        return res.status(500).json({
            msg: 'algo salio salio mal',
        })
    }

}


module.exports = {
    login
}