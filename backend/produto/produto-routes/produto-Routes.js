const express = require('express');
const produtoController = require('../produto-controller/produto-Controller');
const {
    validarIdRegistro,
    validarDadosProduto
} = require('../produto-middleware/produto-Middleware');

const router = express.Router();

router.get('/', produtoController.listarProdutos);
router.get('/:id', validarIdRegistro, produtoController.buscarProduto);
router.post('/', validarDadosProduto, produtoController.criarProduto);
router.put('/:id', validarIdRegistro, validarDadosProduto, produtoController.atualizarProduto);
router.delete('/:id', validarIdRegistro, produtoController.excluirProduto);

module.exports = router;
