const {response} = require('express');
const fs = require('fs');
const { subirArchivo } = require('../helpers');
const { Usuario, Producto } = require('../models');
const path = require('path');
const cloudinary = require('cloudinary');
cloudinary.config(process.env.CLOUDINARY_URL);



const cargarArchivo = async (req, res = response) => {
  

    try {
        // const nombre = await subirArchivo(req.files, ['txt','md'], 'textos');
        const nombre = await subirArchivo(req.files, undefined, 'imgs');
        res.json({
            nombre
        })
      
        
    } catch (err) {
        res.status(400).json(err);      
    }

}

const actualizarImagen = async (req, res = response) => {
    const { id, coleccion } = req.params;

    let modelo 
    
    switch (coleccion) {
        case 'usuarios':
            modelo = await Usuario.findById(id);
            if (!modelo) {
                res.status(404).json({
                    msg: 'No se encontro el usuario'
                })
                return;
            }
        break;
        case 'productos':
            modelo = await Producto.findById(id);
            if (!modelo) {
                res.status(404).json({
                    msg: 'No se encontro el producto'
                })
                return;
            }
            break;

        default:
            return res.status(500).json('esto no se valida jejejeje')
    }

    //limpiar imagenes previas
    
    if (modelo.avatar) {
        // borrar imagen anterior
        const pathImage = path.join(__dirname, '../uploads/', coleccion, modelo.avatar);
        if ( fs.existsSync(pathImage) ) {
            fs.unlinkSync(pathImage);
        }
    }


    const nombre = await subirArchivo(req.files, undefined, coleccion);

    modelo.avatar = nombre;

    await modelo.save();

    res.json({
        modelo
    })
}

const mostrarImagen = async (req, res = response) => {

    const { id, coleccion } = req.params;

    let modelo 
    
    switch (coleccion) {
        case 'usuarios':
            modelo = await Usuario.findById(id);
            if (!modelo) {
                res.status(404).json({
                    msg: 'No se encontro el usuario'
                })
                return;
            }
        break;
        case 'productos':
            modelo = await Producto.findById(id);
            if (!modelo) {
                res.status(404).json({
                    msg: 'No se encontro el producto'
                })
                return;
            }
            break;

        default:
            return res.status(500).json('esto no se valida jejejeje')
    }

    //limpiar imagenes previas
    
    if (modelo.avatar) {
        // borrar imagen anterior
        const pathImage = path.join(__dirname, '../uploads/', coleccion, modelo.avatar);
        if ( fs.existsSync(pathImage) ) {
            return res.sendFile(pathImage);
        }
    }


    const pathImage = path.join(__dirname, '../assets/','no-image.jpg');    
    res.sendFile(pathImage);

}

const actualizarImagenCloud = async (req, res = response) => {
    const { id, coleccion } = req.params;

    let modelo 
    
    switch (coleccion) {
        case 'usuarios':
            modelo = await Usuario.findById(id);
            if (!modelo) {
                res.status(404).json({
                    msg: 'No se encontro el usuario'
                })
                return;
            }
        break;
        case 'productos':
            modelo = await Producto.findById(id);
            if (!modelo) {
                res.status(404).json({
                    msg: 'No se encontro el producto'
                })
                return;
            }
            break;

        default:
            return res.status(500).json('esto no se valida jejejeje')
    }

    //limpiar imagenes previas
    
    if (modelo.avatar) {
        // borrar imagen anterior
        const nombreArr = modelo.avatar.split('/');
        const nombre = nombreArr[nombreArr.length - 1];
        const [public_ID] = nombre.split('.');
        console.log(public_ID);
        cloudinary.uploader.destroy(public_ID);
        
    }
    const {tempFilePath} = req.files.archivo;
    
    const {secure_url} = await cloudinary.uploader.upload(tempFilePath)
    modelo.avatar = secure_url;

    await modelo.save();

    res.json({
        modelo
    })
}

module.exports = {
    cargarArchivo,
    actualizarImagen,
    mostrarImagen,
    actualizarImagenCloud
}