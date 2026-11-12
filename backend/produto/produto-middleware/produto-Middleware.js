const { validarIdRegistro } = require('../../middlewares/validacao');
const { normalizarProduto } = require('../produto-Utils/produto-Utils');

const validarDadosProduto = (req, res, next) => {
    const { nome, preco, quantidade } = req.body || {};
    const descricao = req.body?.descricao;
    const precoNumerico = typeof preco === 'number'
        ? preco
        : typeof preco === 'string' && /^\d+(?:\.\d{1,2})?$/.test(preco.trim())
            ? Number(preco)
            : NaN;
    const quantidadeNumerica = typeof quantidade === 'number'
        ? quantidade
        : typeof quantidade === 'string' && /^\d+$/.test(quantidade.trim())
            ? Number(quantidade)
            : NaN;

    if (typeof nome !== 'string' || !nome.trim() || nome.trim().length > 100) {
        return res.status(400).json({
            mensagem: 'O nome do produto é obrigatório e deve ter até 100 caracteres.'
        });
    }

    if (descricao !== undefined && descricao !== null &&
        (typeof descricao !== 'string' || descricao.length > 65535)) {
        return res.status(400).json({ mensagem: 'A descrição do produto é inválida.' });
    }

    if (!Number.isFinite(precoNumerico) || precoNumerico <= 0 ||
        precoNumerico > 99999999.99) {
        return res.status(400).json({
            mensagem: 'O preço deve ser maior que zero e ter no máximo duas casas decimais.'
        });
    }

    if (!Number.isSafeInteger(quantidadeNumerica) || quantidadeNumerica < 0) {
        return res.status(400).json({
            mensagem: 'A quantidade deve ser um número inteiro igual ou maior que zero.'
        });
    }

    req.body = normalizarProduto({
        nome,
        descricao,
        preco: precoNumerico,
        quantidade: quantidadeNumerica
    });
    next();
};

module.exports = { validarIdRegistro, validarDadosProduto };
