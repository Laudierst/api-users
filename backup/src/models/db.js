const mongoose = require('mongoose')

/**
 * Aqui estamos configurando a conecção da base de dados 
 * utilizando uma variavel de ambiente para mais segurança.
 */
mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
mongoose.set('useUnifiedTopology', true);
mongoose.connect(process.env.GET_DB_MONGO)

/**
 * E abaixo estamos utilizando o .then para acibir umamensage no console caso esteja fucionando corretamente 
 * e o .catch caso aconteca algum erro para mostra qual erro foi.
 */

.then(() => {
  console.log('A conecção com o mango foi bem sucedida OK!')
})
.catch((err) => {
  console.log('Houve um erro ao se conectar com o mongo '+err)
})