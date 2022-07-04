const { Router } = require('express');
const { check } = require('express-validator');
const { cargarArchivo, actualizarImagen, mostrarImagen, actualizarImagenCloud } = require('../controllers/uploads');
const { coleccionesPermitidas } = require('../helpers');
const { validarCampos } = require('../middlewares');
const { validarArchivo } = require('../middlewares/validar-archivo');


const router = Router();

router.post('/', validarArchivo, cargarArchivo)

router.put('/:coleccion/:id',[
    validarArchivo,
    check('id', 'El ID debe ser valido').isMongoId(),
    check('coleccion').custom( c => coleccionesPermitidas( c, ['usuarios', 'productos'] ) ),
    validarCampos
], actualizarImagenCloud)

router.get('/:coleccion/:id', [
    check('id', 'El ID debe ser valido').isMongoId(),
    check('coleccion').custom( c => coleccionesPermitidas( c, ['usuarios', 'productos'] ) ),
    validarCampos
], mostrarImagen)

module.exports = router