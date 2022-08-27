const validaCampos = require('../middlewares/validar-campos')
const validaToken = require('../middlewares/validar-token');
const validaRoles = require('../middlewares/validar-roles');

module.exports = {
    ...validaCampos,
    ...validaToken,
    ...validaRoles
}