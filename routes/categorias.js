const { Router } = require('express');
const { check } = require('express-validator');
const { crearCategoria, obtenerCategorias, obtenerCategoria, actualizarCategoria, borrarCategoria } = require('../controllers/categorias');
const { existeCategoria } = require('../helpers/db-validators');



const {validarCampos, validarJWT, esAdmin } = require('../middlewares')


const router = Router();

// obtener todas las categorias = publico
router.get('/', obtenerCategorias)

// obtener una categoria por id = publico
router.get('/:id',[
    check('id').custom(existeCategoria),
    validarCampos
], obtenerCategoria)

// crear nueva categoria = cualquir usuario con token valido
router.post('/',[
    validarJWT,
    check('nombre','El nombre es obligatorio').not().isEmpty(),
    validarCampos
], crearCategoria)

// actualizar categoria por id = cualquir usuario con token valido
router.put('/:id',[
    validarJWT,
    check('id').custom(existeCategoria),
    validarCampos
], actualizarCategoria)

// borrar categoria por id = admin
router.delete('/:id',[
    validarJWT,
    check('id').custom(existeCategoria),
    esAdmin,
    validarCampos
], borrarCategoria)

module.exports = router
