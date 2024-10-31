const mongoose = require('mongoose');
const Product = require('../models/Product');
const ValidationContract = require('../validators/validator');
const Repository = require('../repository/repository')


exports.post = (req, res, next) => {
    /**
     * Observe a importação do ValidationContract logo acima, que vem do arquivo validators,
     * e abaixo determionamos as menssagem de aviso paraum pocivel erro ou não cumprimento dos requisitos
     */
    let contract = new ValidationContract();
    contract.hasMinLen(req.body.name, 1, "O campo name é obrigatorio no minimo 1 item!")
    contract.hasMinLen(req.body.sobrenome, 1, "O campo sobrenome é obrigatorio no minimo 1 item!")
    contract.hasMinLen(req.body.email, 1, "O campo email é obrigatorio no minimo 1 item!")
    contract.hasMinLen(req.body.password, 1, "O campo password é obrigatorio no minimo 1 item!")
    contract.hasMinLen(req.body.phone, 1, "O campo phone é obrigatorio no minimo 1 item!")
    contract.hasMinLen(req.body.cep, -1, "O campo cep é obrigatorio no minimo 1 item!")
    contract.hasMinLen(req.body.endereco1, 1, "O campo endereco1 é obrigatorio no minimo 1 item!")
    contract.hasMinLen(req.body.endereco2, 1, "O campo endereco2 é obrigatorio no minimo 1 item!")
    contract.hasMinLen(req.body.nacimento, 1, "O campo nacimento é obrigatorio no minimo 1 item!")
    contract.hasMinLen(req.body.cpf, 1, "O campo cpf é obrigatorio no minimo 1 item!")
    contract.hasMinLen(req.body.rendaMes, -1, "O campo rendaMes é obrigatorio no minimo 1 item!")
    

    if (!contract.isValid()) {
        res.status(400).send(contract.errors()).end();
        return;
    }
    Repository
        .create(req.body)
        .then(() => {
            res.status(201).send({message: 'Usuario cadastrado com sucesso!' })  
        }).catch((err) => {
            res.status(400).send(`Usuario ja existe ou ${err}`)
        })
};

exports.get = async(req, res, next) => {
    try {
        let data = await Repository.get()        
        res.status(200).send(data)  
    } catch (err) {
        res.status(400).send(`Houve um erro ${err}`)
    }
};

exports.getById = async(req, res, next) => {
    try{
        let data = await Repository.getBayId(req.params.id)
            res.status(200).send(data)  
        } catch (err) {
            res.status(400).send(`Esse usuario não existe ou foi apagado anteriormente!`)
        }
};

exports.put = async(req, res, next) => {
    try{
        let data = await Repository
        .update(req.params.id, req.body)
            res.status(201).send({
                message: "Usuario Atualizado com Sucesso!"
            })  
        } catch (err) {
            res.status(400).send(`Falha ao Atualiza o Ousuario ${err}`)
        }
};
  
exports.delete = async(req, res, next) => {
    try{
        let data = await Repository.delete(req.params.id)
        res.status(200).send({
            message: "Usuario Removido com Sucesso!"
        })  
    } catch (err) {
        res.status(400).send(`Falha ao Remover o usuario ${err}`)
    }
};