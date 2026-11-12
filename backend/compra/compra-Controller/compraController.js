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

const atualizarCompra = async (req, res) => {
    try {
        const resultado = await compraModels.atualizarCompra(req.params.id, req.body.total);
        if (resultado.affectedRows === 0) {
            return res.status(404).json({ mensagem: 'Compra não encontrada.' });
        }

        res.status(200).json({ mensagem: 'Compra atualizada com sucesso.' });
    } catch (erro) {
        console.error('Erro ao atualizar compra:', erro);
        res.status(500).json({ mensagem: 'Erro ao atualizar compra.' });
    }
};

const excluirCompra = async (req, res) => {
    try {
        const resultado = await compraModels.excluirCompra(req.params.id);
        if (resultado.affectedRows === 0) {
            return res.status(404).json({ mensagem: 'Compra não encontrada.' });
        }

        res.status(200).json({ mensagem: 'Compra excluída com sucesso.' });
    } catch (erro) {
        console.error('Erro ao excluir compra:', erro);
        res.status(500).json({ mensagem: 'Erro ao excluir compra.' });
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

module.exports = { criarCompra, listarCompras, atualizarCompra, excluirCompra };