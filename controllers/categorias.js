const { response } = require('express');
const { Categoria } = require('../models');



const crearCategoria = async(req, res=response) => {
    const nombre = req.body.nombre.toUpperCase();

    const categoriaDB= await Categoria.findOne({nombre});

    if(categoriaDB){
        return res.status(400).json({
            msg: 'la categoria ya existe'
        })
    }

    // generar data a guardar en la DB

    const data = {
        nombre,
        usuario: req.usuario._id
    }

    const categoria = new Categoria(data);

    // guardar en la DB

    await categoria.save();

    res.status(201).json(categoria)
}

// obtenerCategorias - paginado - total - populate

const obtenerCategorias = async(req, res=response) => {
    const {limite = 5, desde = 0} = req.query;


    const [total, categorias] = await Promise.all([
        Categoria.countDocuments({estado: true}),
        Categoria.find({estado: true})
        .limit(Number(limite))
        .skip(Number(desde))
        .populate('usuario', 'nombre email')
    ]);

    res.json({
        total,
        categorias
    })

}

// obtenerCategoria - populate {}
const obtenerCategoria = async(req, res=response) => {
    const id = req.params.id
    const categoria = await Categoria.findById(id)
    .populate('usuario');
    if(!categoria){
        return res.status(404).json({
            msg: 'la categoria no existe'
        })
    }
    res.json(categoria)
}


// actualizarCategoria
const actualizarCategoria = async(req, res=response) => {
    const id = req.params.id
    const {_id, ...resto} = req.body;
    resto.nombre = resto.nombre.toUpperCase()
    const categoriaUp = await Categoria.findByIdAndUpdate(id, resto, {new: true})
    if(!categoriaUp){
        return res.status(404).json({
            msg: 'la categoria no existe'
        })
    }
    res.status(200).json(categoriaUp)
}

// borrarCategoria - estado = false - admin
const borrarCategoria = async(req, res=response) => {
    const id = req.params.id
    const categoria = await Categoria.findByIdAndUpdate(id, {estado: false}, {new: true})
    if(!categoria){
        return res.status(404).json({
            msg: 'la categoria no existe'
        })
    }
    res.status(200).json(categoria)
}

module.exports = {
    crearCategoria,
    obtenerCategorias,
    obtenerCategoria,
    actualizarCategoria,
    borrarCategoria

}