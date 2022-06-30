const Role = require('../models/Role');
const Usuario = require('../models/usuario')
const {response} = require('express');

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


module.exports = {
    esRolValido,
    existeEmail,
    existeUsuario
}

