
const { Router } = require('express');
const { check } = require('express-validator');
const {usuariosGet, usuariosPut, usuariosPost, usuariosDelete, usuariosPatch} = require('../controllers/user');
const { esRolValido, existeEmail, existeUsuario } = require('../helpers/db-validators');
const {validarCampos} = require('../middlewares/validar-campos');


const router = Router();

router.get('/', usuariosGet)

router.put('/:id',[
    check('id', 'no es un ID valido').isMongoId(),
    check('id').custom(existeUsuario),
    check('role').custom(esRolValido),
    validarCampos
], usuariosPut)

router.post('/',[
    check('nombre','El nombre es obligatorio').not().isEmpty(),
    check('correo', 'el correo no es valido').isEmail(),
    check('password', 'el password es obligatorio y debe tener mas de 6 caracteres').isLength({min: 6}),
    check('role').custom(esRolValido),
    check('correo').custom(existeEmail),
    validarCampos
] , usuariosPost)

router.delete('/:id',[
    check('id', 'no es un ID valido').isMongoId(),
    check('id').custom(existeUsuario),
    validarCampos
], usuariosDelete)

router.patch('/', usuariosPatch)





module.exports = router;


