const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const schema = new Schema({
    name: { 
        type: String,
        required: true
    },
    email : { 
        type: String, 
        required: true, 
        index:true, 
        unique:true,
        sparse:true,
        lowercase: true
    },
    password: { 
        type: String, 
        required:true,
        select: false
    },
    sobrenome:{
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    cep:{
        type: String,
        required: true
    },
    endereco1:{
        type: String,
        required: true
    },
    endereco2: {
        type: String,
        required: true
    },
    nacimento:{
        type: String,
        required: true
    },
    cpf:{
        type: String,
        required: true
    },
    rendaMes:{
        type: String,
        required: true
    }
})

module.exports = mongoose.model("Product", schema)