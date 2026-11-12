const normalizarProduto = ({ nome, descricao, preco, quantidade }) => ({
    nome: nome.trim(),
    descricao: typeof descricao === 'string' && descricao.trim()
        ? descricao.trim()
        : null,
    preco: typeof preco === 'number' ? preco : Number(preco.trim()),
    quantidade: typeof quantidade === 'number' ? quantidade : Number(quantidade.trim())
});

module.exports = { normalizarProduto };