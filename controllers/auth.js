const { response, request } = require('express')
const User = require('../models/user')
const bcryptjs = require('bcryptjs')
const { generarJWT } = require('../helpers/generar-jwt')

const login = async(req = request, res = response) => {
    const { correo, password } = req.body

    const user = await User.findOne({ correo })

    //verificar si el email existe
    if (!user) {
        return res.status(400).json({
            msg: 'Usuario / password no son correctos - correo'
        })
    }

    // Verificar si el usuario esta activo
    if (!user.estado) {
        return res.status(400).json({
            msg: 'Usuario / password no son correctos - estado: false'
        })
    }

    // Verificar password
    const validPassword = bcryptjs.compareSync(password, user.password)
    if (!validPassword) {
        return res.status(400).json({
            msg: 'Usuario / password no son correctos - password'
        })
    }

    // Generar JWT
    const token = await generarJWT(user.id)

    res.status(200).json({
        user,
        token
    })
}

module.exports = {
    login
}