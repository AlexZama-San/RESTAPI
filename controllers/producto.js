const { response } = require('express');
const {Producto} = require('../models');

// crear producto = cualquier usuario con token valido
const crearProducto = async(req, res=response) => {
    const {nombre, precio, descripcion, categoria} = req.body;

    const productoDB = await Producto.findOne({nombre});

    if(productoDB){
        return res.status(400).json({
            msg: 'el producto ya existe'
        })
    }

    // generar data a guardar en la DB

    const data = {
        nombre,
        precio,
        descripcion,
        categoria,
        usuario: req.usuario._id
    }

    const producto = new Producto(data);

    // guardar en la DB

    await producto.save();

    res.status(201).json(producto)
}

// obtener productos - paginado = publico
const obtenerProductos = async(req, res=response) => {
    const {limite = 5, desde = 0} = req.query;
    // const {categoria} = req.body;

    const [total, productos] = await Promise.all([
        Producto.countDocuments({estado: true}),
        Producto.find({estado: true})
        .limit(Number(limite))
        .skip(Number(desde))
        .populate('categoria', 'nombre')
        .populate('usuario', 'nombre')
    ]);

    res.json({
        total,
        productos
    })
}

// obtener producto por id = publico
const obtenerProducto = async(req, res=response) => {
    const id = req.params.id 
    const producto = await Producto.findById(id)
    .populate('categoria', 'nombre')
    .populate('usuario', 'nombre')
    res.json(producto)
}

// actualizar producto por id = cualquir usuario con token valido
const actualizarProducto = async(req, res=response) => {
    const id = req.params.id;
    const {nombre,precio, descripcion, disponibilidad} = req.body;

    // generar data a guardar en la DB

    const data = {
        nombre,
        precio,
        descripcion,
        disponibilidad,
        usuario: req.usuario._id
    }

    // guardar en la DB

    const productoDB = await Producto.findByIdAndUpdate(id, data, {new: true});
    res.json({
        msg: 'producto actualizado',
        productoDB
    })
}

// borrar producto por id = admin
const borrarProducto = async(req, res=response) => {
    const id = req.params.id;
    const productoDB = await Producto.findByIdAndUpdate(id, {estado: false});
    res.json({
        msg: 'producto borrado',
        productoDB
    })
}


module.exports = {
    crearProducto,
    obtenerProductos,
    obtenerProducto,
    actualizarProducto,
    borrarProducto
}