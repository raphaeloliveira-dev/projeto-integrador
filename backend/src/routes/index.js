const router = require('express').Router();

router.use('/clientes', require('./clienteRoutes'));
router.use('/carrinho', require('./carrinhoRoutes'));

module.exports = router;
