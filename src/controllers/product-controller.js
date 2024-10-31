const mongoose = require('mongoose');
const Users = require('../models/users');
const ValidationContract = require('../validators/validator');
const Repository = require('../repository/repository')
const md5 = require('md5')
const auth = require('../auth-service')
require('../config/config')
//const fs = require('fs')

//var imageAsBase64 = fs.readFileSync('./your-image.png', 'base64');


exports.post = (req, res, next) => {

    //let imageAsBase64 = fs.readFileSync(req.body.imagem, 'base64')
    /**
     * Observe a importação do ValidationContract logo acima, que vem do arquivo validators,
     * e abaixo determionamos as menssagem de aviso paraum pocivel erro ou não cumprimento dos requisitos
     */
    let contract = new ValidationContract();
    contract.hasMinLen(req.body.name, 1, "O campo name é obrigatorio no minimo 1 item!")
    contract.hasMinLen(req.body.imagem, -1, "O campo imagem é obrigatorio no minimo 1 item!")
    contract.hasMinLen(req.body.email, 1, "O campo email é obrigatorio no minimo 1 item!")
    contract.hasMinLen(req.body.password, 1, "O campo password é obrigatorio no minimo 1 item!")
    contract.hasMinLen(req.body.phone, 1, "O campo phone é obrigatorio no minimo 1 item!")
    //contract.hasMinLen(req.body.cep, -1, "O campo cep é obrigatorio no minimo 1 item!")
    //contract.hasMinLen(req.body.endereco1, 1, "O campo endereco1 é obrigatorio no minimo 1 item!")
    //contract.hasMinLen(req.body.endereco2, 1, "O campo endereco2 é obrigatorio no minimo 1 item!")
    //contract.hasMinLen(req.body.nacimento, 1, "O campo nacimento é obrigatorio no minimo 1 item!")
    //contract.hasMinLen(req.body.cpf, 1, "O campo cpf é obrigatorio no minimo 1 item!")
    //contract.hasMinLen(req.body.rendaMes, -1, "O campo rendaMes é obrigatorio no minimo 1 item!")

    const users = {
        name: req.body.name,
        email: req.body.email,
        phone: req.body.phone,
        password: md5(req.body.password + TOKEN_KEY),
        imagem: req.body.imagem
    }

    const pst = {
        postTitle: req.body.postTitle,
        postWidguetEtitle: req.body.postWidguetEtitle,
        postWidguetE2: req.body.postWidguetE2,
        postWidguetE3: req.body.postWidguetE3,
        postWidguetE4: req.body.postWidguetE4,
        postWidguetDtitle: req.body.postWidguetDtitle,
        postWidguetD2: req.body.postWidguetD2,
        postWidguetD3: req.body.postWidguetD3,
        postWidguetD4: req.body.postWidguetD4
    }


    if (!contract.isValid()) {
        res.status(400).send(contract.errors()).end();
        return;
    }

    Repository
        .create({
            name: req.body.name,
            email: req.body.email,
            phone: req.body.phone,
            password: md5(req.body.password + TOKEN_KEY),
            imagem: req.body.imagem
        })
        .then(() => {
            res.status(201).send({ message: 'Usuario cadastrado com sucesso!' })
        }).catch((err) => {
            res.status(400).send(`Usuario ja existe ou ${err}`)
        })
};

exports.autenticate = async (req, res, next) => {

    try {
        const customer = await Repository
            .autenticate({
                email: req.body.email,
                password: md5(req.body.password + TOKEN_KEY)
            })
        console.log(customer)
        if (!customer) {
            res.status(404).send({
                message: 'Usuário ou senha invalidas'
            })
            return;
        }
        const token = await auth.generateToken({
            email: customer.email,
            name: customer.name
        })

        res.status(201).send({
            //token: token,
            data: {
                email: customer.email,
                name: customer.name,
                imagem: customer.imagem,
                token: token
            }
        })

    } catch (error) {

    }
};

exports.get = async (req, res, next) => {

    try {
        let data = await Repository.get()
        res.status(200).send(data)
    } catch (err) {
        res.status(400).send(`Houve um erro ${err}`)
    }
};

exports.getById = async (req, res, next) => {
    try {
        let data = await Repository.getBayId(req.params.id)
        res.status(200).send(data)
    } catch (err) {
        res.status(400).send(`Esse usuario não existe ou foi apagado anteriormente!`)
    }
};

exports.put = async (req, res, next) => {
    try {
        let data = await Repository
            .update(req.params.id, {
                name: req.body.name,
                email: req.body.email,
                phone: req.body.phone,
                password: md5(req.body.password + TOKEN_KEY),
                imagem: req.body.imagem
            })
        res.status(201).send({
            message: "Usuario Atualizado com Sucesso!"
        })
    } catch (err) {
        res.status(400).send(`Falha ao Atualiza o Ousuario ${err}`)
    }
};

exports.delete = async (req, res, next) => {
    try {
        let data = await Repository.delete(req.params.id)
        res.status(200).send({
            message: "Usuario Removido com Sucesso!"
        })
    } catch (err) {
        res.status(400).send(`Falha ao Remover o usuario ${err}`)
    }
};