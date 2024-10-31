const express = require('express');
const router = express.Router();
const app = require('../app');
const controller = require('../controllers/product-controller');
const auth = require('../auth-service')

/**
 * Controle de rotas para administra as buscas, 
 * cadstros, atualizações e remoões de produtos.
 */
router.get('/', controller.get);
router.get('/admin/:id', controller.getById);
router.post('/', controller.post);
router.put('/:id', /*auth.authorize,*/ controller.put);
router.delete('/:id', controller.delete);
router.post('/auth', controller.autenticate)


module.exports = router;
