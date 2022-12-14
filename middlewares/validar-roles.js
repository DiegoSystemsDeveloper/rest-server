const { request, response } = require("express")

const esAdminRol = (req = request, res = response, next) => {
    if (!req.user) {
        return res.status(500).json({
            msg: 'Se requiere validar el rol sin validar el token primero'
        })
    }

    const { rol, nombre } = req.user

    if (rol !== 'ADMIN_ROLE') {
        return res.status(401).json({
            msg: `${nombre} no es administrador - no puede hacer esto`
        })
    }

    next()
}

const tieneRol = (...roles) => {
    return (req = request, res = response, next) => {
        if (!req.user) {
            return res.status(500).json({
                msg: 'Se requiere validar el rol sin validar el token primero'
            })
        }

        if (!roles.includes(req.user.rol)) {
            return res.status(401).json({
                msg: `El servicio requiere uno de estos roles ${roles}`
            })
        }

        next()
    }
}

module.exports = {
    esAdminRol,
    tieneRol
}