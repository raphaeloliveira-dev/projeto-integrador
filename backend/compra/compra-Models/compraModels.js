const db = require('../../db');

const finalizarCompra = async (clienteId, itens) => {
    const conexao = await db.getConnection();

    try {
        await conexao.beginTransaction();
        let total = 0;
        const itensComprados = [];

        for (const item of itens) {
            const produtos = await conexao.query(
                'SELECT id, nome, preco, quantidade FROM produto WHERE id = ?',
                [item.id]
            );
            const produto = produtos[0];

            if (!produto) {
                throw new Error('Produto não encontrado.');
            }
            if (produto.quantidade < item.quantidade) {
                throw new Error(`Estoque insuficiente para ${produto.id}.`);
            }

            const preco = Number(produto.preco);
            const subtotal = Number((preco * item.quantidade).toFixed(2));
            total += subtotal;
            itensComprados.push({
                id: Number(produto.id),
                nome: produto.nome,
                preco,
                quantidade: item.quantidade,
                subtotal
            });
            await conexao.query(
                'UPDATE produto SET quantidade = quantidade - ? WHERE id = ?',
                [item.quantidade, item.id]
            );
        }

        const subtotal = Number(total.toFixed(2));
        const frete = 15.90;
        total = Number((total + frete).toFixed(2));
        const carrinho = await conexao.query(
            'INSERT INTO carrinho_de_compra (cliente_id) VALUES (?)',
            [clienteId]
        );
        const compra = await conexao.query(
            'INSERT INTO compra (cliente_id, total) VALUES (?, ?)',
            [clienteId, total]
        );
        await conexao.query(
            'INSERT INTO venda (cliente_id, total) VALUES (?, ?)',
            [clienteId, total]
        );
        const nota = await conexao.query(
            'INSERT INTO nota_fiscal (cliente_id, total) VALUES (?, ?)',
            [clienteId, total]
        );

        await conexao.commit();
        return {
            carrinhoId: Number(carrinho.insertId),
            compraId: Number(compra.insertId),
            notaFiscalId: Number(nota.insertId),
            itens: itensComprados,
            subtotal,
            frete,
            total
        };
    } catch (erro) {
        await conexao.rollback();
        throw erro;
    } finally {
        conexao.release();
    }
};

const criarCompra = async (clienteId, total) => {
    const resultado = await db.query(
        'INSERT INTO compra (cliente_id, total) VALUES (?, ?)',
        [clienteId, total]
    );
    return Number(resultado.insertId);
};

const listarCompras = async () => db.query(
    'SELECT id, cliente_id, data_compra, total FROM compra ORDER BY data_compra DESC'
);

const listarComprasPorCliente = async (clienteId) => db.query(
    `SELECT id, cliente_id, data_compra, total
     FROM compra WHERE cliente_id = ? ORDER BY data_compra DESC`,
    [clienteId]
);

const atualizarCompra = async (id, total) => {
    const resultado = await db.query('UPDATE compra SET total = ? WHERE id = ?', [total, id]);
    if (resultado.affectedRows > 0) {
        return resultado;
    }

    const existente = await db.query('SELECT id FROM compra WHERE id = ?', [id]);
    return { affectedRows: existente.length };
};

const excluirCompra = async (id) => db.query('DELETE FROM compra WHERE id = ?', [id]);

module.exports = {
    finalizarCompra,
    criarCompra,
    listarCompras,
    listarComprasPorCliente,
    atualizarCompra,
    excluirCompra
};