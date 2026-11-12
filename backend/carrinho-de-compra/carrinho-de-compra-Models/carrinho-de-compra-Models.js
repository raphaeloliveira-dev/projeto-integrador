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

module.exports = { criarCarrinho, listarCarrinhos, listarCarrinhosPorCliente };