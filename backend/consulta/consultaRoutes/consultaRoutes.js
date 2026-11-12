const express = require('express');
const consultaController = require('../consulta-Controller/consultaController');
const { validarClienteConsulta } = require('../consultaMiddleware/consultaMiddleware');

const router = express.Router();
router.post('/', validarClienteConsulta, consultaController.criarConsulta);
router.get('/', consultaController.listarConsultas);
router.get('/cliente/:clienteId', validarClienteConsulta, consultaController.listarConsultas);

module.exports = router;