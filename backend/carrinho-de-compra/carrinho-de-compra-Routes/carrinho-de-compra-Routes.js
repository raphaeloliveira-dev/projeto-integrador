const express = require('express');
const carrinhoController = require('../carrinho-de-compra-Controller/carrinho-de-compra-Controller');
const { validarClienteId } = require('../carrinho-de-compra-Middeware/carrinho-de-compra-Middleware');

const router = express.Router();
router.post('/', validarClienteId, carrinhoController.criarCarrinho);
router.get('/', carrinhoController.listarCarrinhos);
router.get('/cliente/:clienteId', validarClienteId, carrinhoController.listarCarrinhos);

module.exports = router;