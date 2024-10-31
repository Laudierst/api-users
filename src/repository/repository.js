const mongoose = require('mongoose');
const Users = require('../models/users');

exports.autenticate = async (data) => {
    const res = await Users
        .findOne({
            email: data.email,
            password: data.password
        })
    return res;
}

exports.get = async () => {
    const res = await Users
        .find({
        }, 'name email password imagem phone')
    return res;
}

exports.getBayId = async (id) => {
    const res = await Users.findById(id);
    return res;
}

exports.create = async (data) => {

    const product = new Users(data)
    await product.save();

}

exports.update = async (id, data) => {
    await Users
        .findByIdAndUpdate(id, {
            $set: {
                name: data.name,
                //sobrenome: data.sobrenome,
                password: data.password,
                email: data.email,
                phone: data.phone,
                imagem: data.imagem,
                //endereco1: data.endereco1,
                //endereco2: data.endereco2,
                //nacimento: data.nacimento,
                //cpf: data.cpf,
                //rendaMes: data.rendaMes
            }
        })
}

exports.delete = async (id) => {
    await Users
        .findByIdAndDelete(id);
}
