const { request, response } = require('express')

const usuariosGet = (req = request, res = response) => {
    const query = req.query
    res.status(200).json({
        msg: 'Get API - controlador',
        query
    })
}
const usuariosPost = (req, res = response) => {
    const body = req.body
    res.status(200).json({
        msg: 'Post API - controlador',
        body
    })
}
const usuariosPut = (req, res = response) => {
    const { id } = req.params
    res.status(200).json({
        msg: 'Put API - controlador',
        id
    })
}
const usuariosPatch = (req, res = response) => {
    res.status(200).json({
        msg: 'Patch API - controlador'
    })
}
const usuariosDelete = (req, res = response) => {
    res.status(200).json({
        msg: 'Delete API - controlador'
    })
}

module.exports = {
    usuariosGet,
    usuariosPost,
    usuariosPut,
    usuariosPatch,
    usuariosDelete
}