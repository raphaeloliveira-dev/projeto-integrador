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

module.exports = { criarVenda, listarVendas };