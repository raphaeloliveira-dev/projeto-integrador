const compraModels = require('../compra-Models/compraModels');

const finalizarCompra = async (req, res) => {
    const { cliente_id, itens } = req.body;

    if (!Number.isSafeInteger(Number(cliente_id)) || Number(cliente_id) < 1) {
        return res.status(400).json({ mensagem: 'Faça login para finalizar a compra.' });
    }

    if (!Array.isArray(itens) || itens.length === 0) {
        return res.status(400).json({ mensagem: 'O carrinho está vazio.' });
    }

    const itensValidos = itens.every((item) =>
        Number.isSafeInteger(Number(item.id)) &&
        Number(item.id) > 0 &&
        Number.isSafeInteger(Number(item.quantidade)) &&
        Number(item.quantidade) > 0
    );

    if (!itensValidos) {
        return res.status(400).json({ mensagem: 'Os itens do carrinho são inválidos.' });
    }

    try {
        const resultado = await compraModels.finalizarCompra(
            cliente_id,
            itens.map((item) => ({
                id: Number(item.id),
                quantidade: Number(item.quantidade)
            }))
        );
        res.status(201).json({
            mensagem: 'Compra registrada e nota fiscal emitida!',
            ...resultado
        });
    } catch (erro) {
        if (erro.message === 'Produto não encontrado.' ||
            erro.message.startsWith('Estoque insuficiente')) {
            return res.status(400).json({ mensagem: erro.message });
        }
        console.error('Erro ao finalizar compra:', erro);
        res.status(500).json({ mensagem: 'Erro ao finalizar compra.' });
    }
};

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

module.exports = { finalizarCompra, criarCompra, listarCompras, atualizarCompra, excluirCompra };