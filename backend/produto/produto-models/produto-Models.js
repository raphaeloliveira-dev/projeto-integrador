const db = require('../../db');

const listarProdutos = async () => db.query(
    `SELECT id, nome, descricao, preco, quantidade, data_cadastro
     FROM produto ORDER BY id`
);

const buscarProdutoPorId = async (id) => {
    const produtos = await db.query(
        `SELECT id, nome, descricao, preco, quantidade, data_cadastro
         FROM produto WHERE id = ?`,
        [id]
    );
    return produtos[0] || null;
};

const criarProduto = async ({ nome, descricao, preco, quantidade }) => {
    const resultado = await db.query(
        `INSERT INTO produto (nome, descricao, preco, quantidade)
         VALUES (?, ?, ?, ?)`,
        [nome, descricao, preco, quantidade]
    );
    return Number(resultado.insertId);
};

const atualizarProduto = async (id, { nome, descricao, preco, quantidade }) => {
    const resultado = await db.query(
        `UPDATE produto
         SET nome = ?, descricao = ?, preco = ?, quantidade = ?
         WHERE id = ?`,
        [nome, descricao, preco, quantidade, id]
    );
    if (resultado.affectedRows > 0) {
        return resultado;
    }

    const produto = await db.query('SELECT id FROM produto WHERE id = ?', [id]);
    return { affectedRows: produto.length };
};

const excluirProduto = async (id) => db.query(
    'DELETE FROM produto WHERE id = ?',
    [id]
);

module.exports = {
    listarProdutos,
    buscarProdutoPorId,
    criarProduto,
    atualizarProduto,
    excluirProduto
};
