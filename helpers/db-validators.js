
const {response} = require('express');
const { Categoria,Role,Usuario } = require('../models');

const esRolValido = async (rol='')=>{
    console.log(rol);
    const role = await Role.findOne({rol})
    console.log(role);
    if(!role){
        throw new Error('El rol no existe')
    }
}

const existeEmail = async (correo = '', res=response)=>{
    const emailexiste = await Usuario.findOne({correo});
    if(emailexiste){
        throw new Error('El correo ya existe')
    }
}

const existeUsuario = async (id)=>{
    const existeUser= await Usuario.findById(id);
    if(!existeUser){
        throw new Error('El usuario no existe')
    }
}

const existeCategoria = async (id)=>{
    const existeCategoria= await Categoria.findById(id);
    if(!existeCategoria){
        throw new Error('La categoria no existe')
    }
}

const existeProducto = async (id)=>{
    const existeProducto= await Producto.findById(id);
    if(!existeProducto){
        throw new Error('El producto no existe')
    }
}

const coleccionesPermitidas = async (coleccion='', colecciones = [])=>{
    const incluida = colecciones.includes(coleccion);
    if(!incluida){
        throw new Error(`La coleccion ${coleccion} no es valida`)
    }

    return true
}


module.exports = {
    esRolValido,
    existeEmail,
    existeUsuario,
    existeCategoria,
    existeProducto,
    coleccionesPermitidas
}

