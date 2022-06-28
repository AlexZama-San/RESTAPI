const {response} = require('express');

const usuariosGet = (req, res=response) => {
    const {nombre= 'no hay nombre',apellido= 'no hay apellido',apikey= null} = req.query
    res.json({
        message: 'get API - controlador',
        nombre,
        apellido,
        apikey
    })
  }

  const usuariosPut = (req, res=response) => {
    const id = req.params.id
    res.json({
        message: 'API PUT - controlador',
        id
    })
  }

  const usuariosPost=(req, res=response) => {
    const {nombre,edad} = req.body;
    res.status(201).json({
        message: 'API POST - controlador',
        nombre,
        edad
    })
  }

  const usuariosDelete=(req, res=response) => {
    res.json({
        message: 'API DELETE- controlador'
    })
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