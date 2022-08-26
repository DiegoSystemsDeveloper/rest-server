const Role = require('../models/rol')
const User = require('../models/user')

const esRolValido = (async(rol = '') => {
    const existeRol = await Role.findOne({ rol })
    if (!existeRol) {
        throw new Error(`El rol ${rol} no esta registrado en la BD`)
    }
})

const exiteEmail = async(correo = '') => {
    const existeEmail = await User.findOne({ correo })
    if (existeEmail) {
        throw new Error(`El correo ${correo} ya esta en uso`)
    }
}

const existeUsuarioPorId = async(id = '') => {
    const existeUsuario = await User.findById(id)
    if (!existeUsuario) {
        throw new Error(`El id ${correo} no existe`)
    }
}

module.exports = {
    esRolValido,
    exiteEmail,
    existeUsuarioPorId
}