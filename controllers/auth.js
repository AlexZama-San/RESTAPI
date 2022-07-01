const { response } = require("express");
const bcryptjs = require('bcryptjs');

const Usuario = require('../models/usuario');
const { generarJWT } = require("../helpers/generarJWT");
const { googleVerify } = require("../helpers/google-verify");


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

const googleSingIn = async(req, res=response) => {
    const {Gid_token} = req.body;


    try {

        const {name, email, picture} = await googleVerify(Gid_token)
        
        let usuario = await Usuario.findOne({ correo: email });
        if (!usuario) {
            //crear usuario de google
            const data = {
                nombre: name,
                correo: email,
                password: ':P',
                avatar: picture,
                google: true

            }
            usuario = new Usuario(data);
            await usuario.save();
        }

        //el usuario en DB no esta activo
        if (!usuario.estado) {
            return res.status(401).json({
                msg: 'El usuario no esta activo, hable con el administrador'
            });
        }

        const token = await generarJWT(usuario.id)
        
        res.json({
            usuario,
            token
        })
    } catch (error) {
        res.status(400).json({
            msg: 'algo salio salio mal',
            ok: false
        })
    }
    
}


module.exports = {
    login,
    googleSingIn
}