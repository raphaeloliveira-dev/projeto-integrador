const db = require('../../db');

const criarCarrinho = async (clienteId) => {
    const resultado = await db.query(
        'INSERT INTO carrinho_de_compra (cliente_id) VALUES (?)',
        [clienteId]
    );
    return Number(resultado.insertId);
};

const listarCarrinhos = async () => db.query(
    'SELECT id, cliente_id, data_criacao FROM carrinho_de_compra ORDER BY data_criacao DESC'
);

const listarCarrinhosPorCliente = async (clienteId) => db.query(
    `SELECT id, cliente_id, data_criacao
     FROM carrinho_de_compra WHERE cliente_id = ? ORDER BY data_criacao DESC`,
    [clienteId]
);

const atualizarCarrinho = async (id, clienteId) => {
    const resultado = await db.query(
        'UPDATE carrinho_de_compra SET cliente_id = ? WHERE id = ?',
        [clienteId, id]
    );
    if (resultado.affectedRows > 0) {
        return resultado;
    }

    const existente = await db.query('SELECT id FROM carrinho_de_compra WHERE id = ?', [id]);
    return { affectedRows: existente.length };
};

const excluirCarrinho = async (id) => db.query(
    'DELETE FROM carrinho_de_compra WHERE id = ?',
    [id]
);

module.exports = {
    criarCarrinho,
    listarCarrinhos,
    listarCarrinhosPorCliente,
    atualizarCarrinho,
    excluirCarrinho
};