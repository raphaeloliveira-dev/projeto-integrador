const produtoModels = require('../produto-models/produto-Models');

const listarProdutos = async (req, res) => {
    try {
        const produtos = await produtoModels.listarProdutos();
        res.status(200).json(produtos);
    } catch (erro) {
        console.error('Erro ao listar produtos:', erro);
        res.status(500).json({ mensagem: 'Erro ao listar produtos.' });
    }
};

const buscarProduto = async (req, res) => {
    try {
        const produto = await produtoModels.buscarProdutoPorId(req.params.id);
        if (!produto) {
            return res.status(404).json({ mensagem: 'Produto não encontrado.' });
        }

        res.status(200).json(produto);
    } catch (erro) {
        console.error('Erro ao buscar produto:', erro);
        res.status(500).json({ mensagem: 'Erro ao buscar produto.' });
    }
};

const criarProduto = async (req, res) => {
    try {
        const id = await produtoModels.criarProduto(req.body);
        res.status(201).json({
            mensagem: 'Produto cadastrado com sucesso.',
            id
        });
    } catch (erro) {
        console.error('Erro ao cadastrar produto:', erro);
        res.status(500).json({ mensagem: 'Erro ao cadastrar produto.' });
    }
};

const atualizarProduto = async (req, res) => {
    try {
        const resultado = await produtoModels.atualizarProduto(req.params.id, req.body);
        if (resultado.affectedRows === 0) {
            return res.status(404).json({ mensagem: 'Produto não encontrado.' });
        }

        res.status(200).json({ mensagem: 'Produto atualizado com sucesso.' });
    } catch (erro) {
        console.error('Erro ao atualizar produto:', erro);
        res.status(500).json({ mensagem: 'Erro ao atualizar produto.' });
    }
};

const excluirProduto = async (req, res) => {
    try {
        const resultado = await produtoModels.excluirProduto(req.params.id);
        if (resultado.affectedRows === 0) {
            return res.status(404).json({ mensagem: 'Produto não encontrado.' });
        }

        res.status(200).json({ mensagem: 'Produto excluído com sucesso.' });
    } catch (erro) {
        console.error('Erro ao excluir produto:', erro);
        res.status(500).json({ mensagem: 'Erro ao excluir produto.' });
    }
};

module.exports = {
    listarProdutos,
    buscarProduto,
    criarProduto,
    atualizarProduto,
    excluirProduto,
    get: listarProdutos,
    getById: buscarProduto,
    post: criarProduto,
    put: atualizarProduto,
    deletar: excluirProduto
};
