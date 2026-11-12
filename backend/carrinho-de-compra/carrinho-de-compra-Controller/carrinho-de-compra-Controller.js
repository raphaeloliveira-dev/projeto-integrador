const carrinhoModels = require('../carrinho-de-compra-Models/carrinho-de-compra-Models');

const criarCarrinho = async (req, res) => {
    try {
        const id = await carrinhoModels.criarCarrinho(req.body.cliente_id);
        res.status(201).json({ mensagem: 'Carrinho criado com sucesso.', id });
    } catch (erro) {
        console.error('Erro ao criar carrinho:', erro);
        res.status(500).json({ mensagem: 'Erro ao criar carrinho.' });
    }
};

const listarCarrinhos = async (req, res) => {
    try {
        const carrinhos = req.params.clienteId
            ? await carrinhoModels.listarCarrinhosPorCliente(req.params.clienteId)
            : await carrinhoModels.listarCarrinhos();
        res.status(200).json(carrinhos);
    } catch (erro) {
        console.error('Erro ao listar carrinhos:', erro);
        res.status(500).json({ mensagem: 'Erro ao listar carrinhos.' });
    }
};

module.exports = { criarCarrinho, listarCarrinhos };