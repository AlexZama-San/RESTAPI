const {response} = require('express');
const Usuario = require('../models/usuario')
const bcrypt = require('bcryptjs');


const usuariosGet = async (req, res=response) => {
    // const {nombre= 'no hay nombre',apellido= 'no hay apellido',apikey= null} = req.query
    const {limite = 5, desde = 0} = req.query

    const [total, usuarios] = await Promise.all([
      Usuario.countDocuments({estado: true}),
      Usuario.find({estado: true})
      .limit(Number(limite))
      .skip(Number(desde))
    ])
    res.json({
      total,
      usuarios
    })
  }

  const usuariosPut = async (req, res=response) => {
    const id = req.params.id
    const {_id, password,google, correo, ...resto} = req.body
    if (password){
      const salt = bcrypt.genSaltSync(15);
      resto.password = bcrypt.hashSync(password, salt);
    }
    const usuario = await Usuario.findByIdAndUpdate(id, resto)
    res.json(usuario)
  }

  const usuariosPost= async (req, res=response) => {


    const {nombre,correo,password,role} = req.body;
    const usuario = new Usuario({nombre,correo,password,role});

    const salt = await bcrypt.genSaltSync(15);
    usuario.password = await bcrypt.hashSync(password, salt);

    await usuario.save()
    res.status(201).json({
        message: 'API POST - controlador',
        usuario
    })

  }

  const usuariosDelete= async (req, res=response) => {
    const {id} = req.params
    // const usuario = await Usuario.findByIdAndDelete(id)
    const usuario = await Usuario.findByIdAndUpdate(id, {estado: false})
    res.json(usuario)
  }

  const usuariosPatch=(req, res=response) => {
    res.json({
        message: 'API PATCH- controlador'
    })
  }


module.exports = {
    usuariosGet,
    usuariosPut,
    usuariosPost,
    usuariosDelete,
    usuariosPatch
}