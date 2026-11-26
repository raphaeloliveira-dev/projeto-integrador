const assert = require('node:assert/strict');
const test = require('node:test');
const db = require('../../db');
const compraModels = require('../compra-Models/compraModels');
const compraController = require('./compraController');

test.after(async () => db.end());

function criarResposta() {
    return {
        statusCode: null,
        body: null,
        status(codigo) {
            this.statusCode = codigo;
            return this;
        },
        json(conteudo) {
            this.body = conteudo;
            return this;
        }
    };
}

test('finalizar compra rejeita CEP inválido sem processar o pedido', async () => {
    const finalizarOriginal = compraModels.finalizarCompra;
    let foiChamado = false;
    compraModels.finalizarCompra = async () => {
        foiChamado = true;
    };

    try {
        const resposta = criarResposta();
        await compraController.finalizarCompra({
            body: { cliente_id: 1, cep: '1234', itens: [{ id: 1, quantidade: 1 }] }
        }, resposta);

        assert.equal(resposta.statusCode, 400);
        assert.equal(foiChamado, false);
    } finally {
        compraModels.finalizarCompra = finalizarOriginal;
    }
});

test('finalizar compra retorna frete e total calculados pelo servidor', async () => {
    const finalizarOriginal = compraModels.finalizarCompra;
    let argumentos;
    compraModels.finalizarCompra = async (...valores) => {
        argumentos = valores;
        return {
            itens: [{ id: 2, nome: 'Camiseta', preco: 100, quantidade: 1, subtotal: 100 }],
            subtotal: 100,
            frete: 15.90,
            total: 115.90
        };
    };

    try {
        const resposta = criarResposta();
        await compraController.finalizarCompra({
            body: { cliente_id: 1, cep: '12345-678', itens: [{ id: 2, quantidade: 1 }] }
        }, resposta);

        assert.equal(resposta.statusCode, 201);
        assert.equal(resposta.body.frete, 15.90);
        assert.equal(resposta.body.total, 115.90);
        assert.deepEqual(resposta.body.itens, [{ id: 2, nome: 'Camiseta', preco: 100, quantidade: 1, subtotal: 100 }]);
        assert.deepEqual(argumentos, [1, [{ id: 2, quantidade: 1 }]]);
    } finally {
        compraModels.finalizarCompra = finalizarOriginal;
    }
});

test('finalizar compra grava subtotal mais frete usando preços do banco', async () => {
    const obterConexaoOriginal = db.getConnection;
    const totaisGravados = [];
    db.getConnection = async () => ({
        beginTransaction: async () => {},
        query: async (sql, parametros) => {
            if (sql.startsWith('SELECT')) {
                return [{ id: 2, nome: 'Camiseta', preco: '79.90', quantidade: 3 }];
            }
            if (sql.startsWith('INSERT INTO carrinho_de_compra')) {
                return { insertId: 10 };
            }
            if (sql.startsWith('INSERT INTO')) {
                totaisGravados.push(parametros[1]);
                return { insertId: totaisGravados.length + 10 };
            }
            return {};
        },
        commit: async () => {},
        rollback: async () => {},
        release: () => {}
    });

    try {
        const resultado = await compraModels.finalizarCompra(1, [{ id: 2, quantidade: 2 }]);

        assert.equal(resultado.subtotal, 159.8);
        assert.equal(resultado.frete, 15.90);
        assert.equal(resultado.total, 175.7);
        assert.deepEqual(totaisGravados, [175.7, 175.7, 175.7]);
        assert.deepEqual(resultado.itens, [{
            id: 2,
            nome: 'Camiseta',
            preco: 79.9,
            quantidade: 2,
            subtotal: 159.8
        }]);
    } finally {
        db.getConnection = obterConexaoOriginal;
    }
});
