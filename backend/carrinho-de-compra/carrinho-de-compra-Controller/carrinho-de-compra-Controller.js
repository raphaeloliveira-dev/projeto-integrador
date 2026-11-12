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

const atualizarCarrinho = async (req, res) => {
    try {
        const resultado = await carrinhoModels.atualizarCarrinho(
            req.params.id,
            req.body.cliente_id
        );
        if (resultado.affectedRows === 0) {
            return res.status(404).json({ mensagem: 'Carrinho não encontrado.' });
        }

        res.status(200).json({ mensagem: 'Carrinho atualizado com sucesso.' });
    } catch (erro) {
        console.error('Erro ao atualizar carrinho:', erro);
        res.status(500).json({ mensagem: 'Erro ao atualizar carrinho.' });
    }
};

const excluirCarrinho = async (req, res) => {
    try {
        const resultado = await carrinhoModels.excluirCarrinho(req.params.id);
        if (resultado.affectedRows === 0) {
            return res.status(404).json({ mensagem: 'Carrinho não encontrado.' });
        }

        res.status(200).json({ mensagem: 'Carrinho excluído com sucesso.' });
    } catch (erro) {
        console.error('Erro ao excluir carrinho:', erro);
        res.status(500).json({ mensagem: 'Erro ao excluir carrinho.' });
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

module.exports = {
    criarCarrinho,
    listarCarrinhos,
    atualizarCarrinho,
    excluirCarrinho
};