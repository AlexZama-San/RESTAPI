const { response } = require("express");
const { Usuario, Producto, Categoria } = require("../models");
const { ObjectId } = require("mongoose").Types

const coleccionesPermitidas = ['usuarios', 'productos', 'categorias', 'roles'];

const buscarUsuarios = async (termino = '', res = response) => {
    const esID = ObjectId.isValid(termino);
    if (esID) {
        const usuario = await Usuario.findById(termino);
        return res.json({
            results: (usuario) ? [usuario] : []
        });
    }

    const regexp = new RegExp(termino, 'i');
    const usuarios = await Usuario.find({
        $or:[{nombre: regexp}, {email: regexp}],
        $and:[{estado: true}]
    })
    res.json({
        results: usuarios
    });
}
const buscarProductos = async (termino = '', res = response) => {
    const esID = ObjectId.isValid(termino);
    if (esID) {
        const producto = await Producto.findById(termino).populate('categoria');
        return res.json({
            results: (producto) ? [producto] : []
        });
    }

    const regexp = new RegExp(termino, 'i');
    const producto = await Producto.find({
        nombre: regexp,
        $and:[{estado: true}]
    })
    res.json({
        results: producto
    });
}
const buscarCategorias = async (termino = '', res = response) => {
    const esID = ObjectId.isValid(termino);
    if (esID) {
        const categoria = await Categoria.findById(termino);
        return res.json({
            results: (categoria) ? [categoria] : []
        });
    }

    const regexp = new RegExp(termino, 'i');
    const categoria = await Categoria.find({
        nombre: regexp,
        $and:[{estado: true}]
    })
    res.json({
        results: categoria
    });
}


const buscar = (req, res=response) => {
    const { coleccion, termino } = req.params;

    if (!coleccionesPermitidas.includes(coleccion)) {
        return res.status(400).json({
            ok: false,
            msg: `La colección ${coleccion} no existe`
        });
    }

    switch (coleccion) {
        case 'usuarios':
            buscarUsuarios(termino, res);
            break;
        case 'productos':
            buscarProductos(termino, res);
            break;
        case 'categorias':
            buscarCategorias(termino, res);
            break;
    
        default:
            res.status(500).json({
                msg: 'no se buscan los roles'
            })
            break;
    }

}



module.exports = {
    buscar
}