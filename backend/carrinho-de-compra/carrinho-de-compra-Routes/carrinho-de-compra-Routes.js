const express = require('express');
const carrinhoController = require('../carrinho-de-compra-Controller/carrinho-de-compra-Controller');
const { validarClienteId } = require('../carrinho-de-compra-Middeware/carrinho-de-compra-Middleware');
const { validarIdRegistro } = require('../../middlewares/validacao');

const router = express.Router();
router.post('/', validarClienteId, carrinhoController.criarCarrinho);
router.get('/', carrinhoController.listarCarrinhos);
router.get('/cliente/:clienteId', validarClienteId, carrinhoController.listarCarrinhos);
router.put('/:id', validarIdRegistro, validarClienteId, carrinhoController.atualizarCarrinho);
router.delete('/:id', validarIdRegistro, carrinhoController.excluirCarrinho);

module.exports = router;