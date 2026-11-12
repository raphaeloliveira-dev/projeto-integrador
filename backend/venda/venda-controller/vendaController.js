const vendaModels = require('../venda-cadastro/vendaModels');

const criarVenda = async (req, res) => {
    try {
        const id = await vendaModels.criarVenda(req.body.cliente_id, req.body.total);
        res.status(201).json({ mensagem: 'Venda registrada com sucesso.', id });
    } catch (erro) {
        console.error('Erro ao registrar venda:', erro);
        res.status(500).json({ mensagem: 'Erro ao registrar venda.' });
    }
};

const atualizarVenda = async (req, res) => {
    try {
        const resultado = await vendaModels.atualizarVenda(req.params.id, req.body.total);
        if (resultado.affectedRows === 0) {
            return res.status(404).json({ mensagem: 'Venda não encontrada.' });
        }

        res.status(200).json({ mensagem: 'Venda atualizada com sucesso.' });
    } catch (erro) {
        console.error('Erro ao atualizar venda:', erro);
        res.status(500).json({ mensagem: 'Erro ao atualizar venda.' });
    }
};

const excluirVenda = async (req, res) => {
    try {
        const resultado = await vendaModels.excluirVenda(req.params.id);
        if (resultado.affectedRows === 0) {
            return res.status(404).json({ mensagem: 'Venda não encontrada.' });
        }

        res.status(200).json({ mensagem: 'Venda excluída com sucesso.' });
    } catch (erro) {
        console.error('Erro ao excluir venda:', erro);
        res.status(500).json({ mensagem: 'Erro ao excluir venda.' });
    }
};

const listarVendas = async (req, res) => {
    try {
        const vendas = req.params.clienteId
            ? await vendaModels.listarVendasPorCliente(req.params.clienteId)
            : await vendaModels.listarVendas();
        res.status(200).json(vendas);
    } catch (erro) {
        console.error('Erro ao listar vendas:', erro);
        res.status(500).json({ mensagem: 'Erro ao listar vendas.' });
    }
};

module.exports = { criarVenda, listarVendas, atualizarVenda, excluirVenda };