const mongoose = require('mongoose');
const Product = require('../models/Product');

exports.get = async() => {
    const res = await Product
    .find({
    }, 'name sobrenome password email phone cep endereco1 endereco2 nacimento cpf rendaMes')
    return res;
}

exports.getBayId = async(id) => {
    const res = await Product.findById(id);
    return res;
}

exports.create = async(data) => {
    const product = new Product(data)
    await product.save();
}

exports.update = async(id, data) => {
    await Product
        .findByIdAndUpdate(id, {
            $set: {
                name: data.name,
                sobrenome: data.sobrenome,
                password: data.password,
                email: data.email,
                phone: data.phone,
                cep: data.cep,
                endereco1: data.endereco1,
                endereco2: data.endereco2,
                nacimento: data.nacimento,
                cpf: data.cpf,
                rendaMes: data.rendaMes
            }
        })
}

exports.delete = async(id) => {
    await Product
    .findByIdAndDelete(id);
}
