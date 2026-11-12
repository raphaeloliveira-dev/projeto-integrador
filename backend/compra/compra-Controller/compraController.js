const compraModels = require('../compra-Models/compraModels');

const criarCompra = async (req, res) => {
    try {
        const id = await compraModels.criarCompra(req.body.cliente_id, req.body.total);
        res.status(201).json({ mensagem: 'Compra registrada com sucesso.', id });
    } catch (erro) {
        console.error('Erro ao registrar compra:', erro);
        res.status(500).json({ mensagem: 'Erro ao registrar compra.' });
    }
};

const listarCompras = async (req, res) => {
    try {
        const compras = req.params.clienteId
            ? await compraModels.listarComprasPorCliente(req.params.clienteId)
            : await compraModels.listarCompras();
        res.status(200).json(compras);
    } catch (erro) {
        console.error('Erro ao listar compras:', erro);
        res.status(500).json({ mensagem: 'Erro ao listar compras.' });
    }
};

module.exports = { criarCompra, listarCompras };