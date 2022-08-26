const { request, response } = require('express')
const bcrypt = require('bcryptjs');
const User = require('../models/user');

const usuariosGet = async(req = request, res = response) => {
    const { limite = 5, desde = 0 } = req.query

    const query = { estado: true }

    const [total, users] = await Promise.all([
        User.countDocuments(query),
        User.find(query)
        .skip(desde)
        .limit(Number(limite))
    ])

    res.status(200).json({
        total,
        users
    })
}

const usuariosPost = async(req, res = response) => {

    const { nombre, correo, password, rol } = req.body
    const user = new User({ nombre, correo, password, rol })

    // encriptar password
    const salt = bcrypt.genSaltSync()
    user.password = bcrypt.hashSync(password, salt)

    await user.save()

    res.status(200).json({
        user
    })
}

const usuariosPut = async(req, res = response) => {
    const { id } = req.params
    const { password, google, correo, ...resto } = req.body

    //TODO: VALIDAR CONTRA BD

    if (password) {
        const salt = bcrypt.genSaltSync()
        resto.password = bcrypt.hashSync(password, salt)
    }

    const user = await User.findByIdAndUpdate(id, resto)

    res.status(200).json({
        user
    })
}

const usuariosPatch = (req, res = response) => {
    res.status(200).json({
        msg: 'Patch API - controlador'
    })
}

const usuariosDelete = async(req, res = response) => {
    const { id } = req.params

    const user = await User.findByIdAndUpdate(id, { estado: false })

    res.status(200).json({
        user
    })
}

module.exports = {
    usuariosGet,
    usuariosPost,
    usuariosPut,
    usuariosPatch,
    usuariosDelete
}