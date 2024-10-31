'use strict'
const jwt = require('jsonwebtoken')
require('./config/config')

exports.generateToken = async (data) => {
    return jwt.sign(data, TOKEN_KEY, { expiresIn: '1d' })
}

exports.decodeToken = async (token) => {
    let data = await jwt.verify(token, TOKEN_KEY)
    return data;
}

exports.authorize = function (req, res, next) {
    var token = req.body.token || req.query.token || req.headers['x-access-token'];

    if (!token) {
        res.status(401).json({
            message: 'Acesso Restrito'
        })
    } else {
        jwt.verify(token, TOKEN_KEY, function (error, decoded) {
            if (error) {
                res.status(401).json({
                    message: 'Token Inválido'
                })
            } else {
                next()
            }
        })
    }
}


