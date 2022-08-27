const { response, request } = require('express')
const User = require('../models/user')
const bcryptjs = require('bcryptjs')
const { generarJWT } = require('../helpers/generar-jwt')
const { googleVerify } = require('../helpers/google-verify')

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


const googleSignIn = async(req, res = response) => {
    const { id_token } = req.body

    try {
        const { nombre, img, correo } = await googleVerify(id_token)

        let user = await User.findOne({ correo })

        if (!user) {
            //Tengo que crear el usuario
            const data = {
                nombre,
                correo,
                password: ':p',
                img,
                rol: "USER_ROLE",
                google: true
            }
            user = new User(data)
            await user.save()
        }

        if (!user.estado) {
            return res.status(401).json({
                msg: 'Hable con el administrador - usuario bloqueado'
            })
        }

        // Generar JWT
        const token = await generarJWT(user.id)

        res.status(200).json({
            user,
            token
        })
    } catch (error) {
        res.status(500).json({
            msg: error
        })
    }
}


module.exports = {
    login,
    googleSignIn
}