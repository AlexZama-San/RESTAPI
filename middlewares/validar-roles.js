const {response} = require('express');
const esAdmin = (req, res = response, next) => {

    if ( !req.usuario) {
        return res.status(500).json({
            mensaje: 'LA VERIFICACION DEL TOKEN NO SE LLEVO A CABO'
        });
    }

    const usuarioAuth = req.usuario;
    if (usuarioAuth.role !== 'ADMIN_ROLE') {
        return res.status(401).json({
            mensaje: 'No tienes permiso para hacer esto'
        })
    }

    next()
}

const tieneRoleValido = (...roles) => {
    return (req, res = response, next) => {
        if ( !req.usuario) {
            return res.status(500).json({
                mensaje: 'LA VERIFICACION DEL TOKEN NO SE LLEVO A CABO'
            });
        }

        const usuarioAuth = req.usuario;
        if ( !roles.includes(usuarioAuth.role)) {
            return res.status(401).json({
                mensaje: `No tienes permiso para hacer esto, tu rol debe ser uno de los siguientes: ${roles}`
            })
        }

        next()
    }
}


module.exports = {
    esAdmin,
    tieneRoleValido
}