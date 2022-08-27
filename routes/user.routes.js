const { Router } = require('express')
const { check } = require('express-validator');

const {
    esAdminRol,
    tieneRol,
    validarCampos,
    validarToken
} = require('../middlewares')

const { esRolValido, exiteEmail, existeUsuarioPorId } = require('../helpers/db-validators')

const {
    usuariosGet,
    usuariosPost,
    usuariosPut,
    usuariosPatch,
    usuariosDelete
} = require('../controllers/user.controller');

const router = Router()

router.get('/', usuariosGet)
router.post('/', [
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('password', 'El password debe ser de mas de 6 letras').isLength({ min: 6 }),
    check('correo', 'El correo no es valido').isEmail(),
    check('correo').custom(exiteEmail),
    // check('rol', 'No es un rol valido').isIn(['USER_ROLE', 'ADMIN_ROLE']),
    check('rol').custom(esRolValido),
    validarCampos
], usuariosPost)
router.put('/:id', [
    check('id', 'No es un ID valido').isMongoId(),
    check('id').custom(existeUsuarioPorId),
    check('rol').custom(esRolValido),
    validarCampos
], usuariosPut)
router.patch('/', usuariosPatch)
router.delete('/:id', [
    validarToken,
    // esAdminRol,
    tieneRol('ADMIN_ROLE', 'VENTAS_ROLE'),
    check('id', 'No es un ID valido').isMongoId(),
    check('id').custom(existeUsuarioPorId),
    validarCampos
], usuariosDelete)

module.exports = router