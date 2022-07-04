const { Router } = require('express');
const { check } = require('express-validator');
const { crearProducto, obtenerProductos, obtenerProducto, actualizarProducto, borrarProducto, } = require('../controllers/producto');
const { existeProducto, existeCategoria } = require('../helpers/db-validators');

const {validarCampos, validarJWT, esAdmin } = require('../middlewares')


const router = Router();
// obtener todos los producctos - paginado - publico
router.get('/',[
], obtenerProductos)

// obtener un producto por id = publico
router.get('/:id',[
    check('id', 'El id es obligatorio').not().isEmpty(),
    check('id').custom(existeProducto),
    validarCampos
], obtenerProducto)

// crear nuevo producto = cualquir usuario con token valido
router.post('/',[
    validarJWT,
    check('nombre','El nombre es obligatorio').not().isEmpty(),
    check('categoria', 'La categoria es obligatoria').not().isEmpty(),
    check('categoria').custom(existeCategoria),
    validarCampos
], crearProducto)

// actualizar producto por id = cualquir usuario con token valido
router.put('/:id',[
    check('id', 'El id es obligatorio').not().isEmpty(),
    check('íd').custom(existeProducto),
    validarJWT,
    validarCampos
], actualizarProducto)

// borrar producto por id = admin
router.delete('/:id',[
    validarJWT,
    esAdmin,
    check('id', 'El id es obligatorio').not().isEmpty(),
    check('id').custom(existeProducto),
    validarCampos
], borrarProducto)

module.exports = router
