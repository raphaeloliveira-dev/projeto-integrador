const assert = require('node:assert/strict');
const test = require('node:test');

const mocks = [
    ['../cliente/models-cliente/clienteModel', 'listarClientes'],
    ['../compra/compra-Models/compraModels', 'listarCompras'],
    ['../venda/venda-cadastro/vendaModels', 'listarVendas'],
    ['../consulta/consulta-Models/consultaModels', 'listarConsultas'],
    [
        '../carrinho-de-compra/carrinho-de-compra-Models/carrinho-de-compra-Models',
        'listarCarrinhos'
    ],
    ['../nota-fiscal/noda-fiscal-models/nota-fiscal-Models', 'listarNotasFiscais']
];

for (const [modulePath, method] of mocks) {
    require(modulePath)[method] = async () => [];
}

require('../cadastro/cadastro-Models/cadastroModels').cadastrarCadastro = async () => ({
    clienteId: 1,
    cadastroId: 1
});
require('../compra/compra-Models/compraModels').criarCompra = async (clienteId, total) => {
    assert.equal(clienteId, 1);
    assert.equal(total, 12.5);
    return 2;
};
require('../consulta/consulta-Models/consultaModels').listarConsultasPorCliente = async (id) => {
    assert.equal(id, '1');
    return [];
};

const app = require('../app');
const db = require('../db');

test('rotas de coleção, aliases e validações respondem corretamente', async (t) => {
    const server = app.listen(0);
    await new Promise((resolve) => server.once('listening', resolve));
    t.after(async () => {
        server.closeAllConnections();
        await new Promise((resolve, reject) => {
            server.close((erro) => erro ? reject(erro) : resolve());
        });
        await db.end();
    });

    const baseUrl = `http://127.0.0.1:${server.address().port}`;
    const rotasDeLeitura = [
        '/cliente',
        '/api/clientes',
        '/clientes',
        '/compra',
        '/api/compras',
        '/compras',
        '/venda',
        '/api/vendas',
        '/vendas',
        '/consulta',
        '/api/consultas',
        '/consultas',
        '/carrinho-de-compra',
        '/api/carrinhos',
        '/carrinhos',
        '/nota-fiscal',
        '/api/notas-fiscais',
        '/notas-fiscais'
    ];

    for (const rota of rotasDeLeitura) {
        const resposta = await fetch(`${baseUrl}${rota}`);
        assert.equal(resposta.status, 200, rota);
        assert.deepEqual(await resposta.json(), [], rota);
    }

    for (const [rota, dados] of [
        ['/venda', { cliente_id: 0, total: 0 }],
        ['/compra', { cliente_id: 0, total: 0 }],
        ['/nota-fiscal', { cliente_id: 0, total: 0 }],
        ['/carrinho-de-compra', { cliente_id: 0 }],
        ['/consulta', { cliente_id: 0 }]
    ]) {
        const resposta = await fetch(`${baseUrl}${rota}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(dados)
        });
        assert.equal(resposta.status, 400, rota);
    }

    const consultaCliente = await fetch(`${baseUrl}/consulta/cliente/1`);
    assert.equal(consultaCliente.status, 200);
    assert.deepEqual(await consultaCliente.json(), []);

    const compra = await fetch(`${baseUrl}/compra`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ cliente_id: '1', total: '12.50' })
    });
    assert.equal(compra.status, 201);

    const cadastro = await fetch(`${baseUrl}/cadastro`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            nome: 'Pessoa Teste',
            'e-mail': 'pessoa@example.com',
            senha: 'senha-forte-123',
            endereco: 'Rua de teste',
            telefone: '11999999999'
        })
    });
    assert.equal(cadastro.status, 201);

    const login = await fetch(`${baseUrl}/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: 'invalido', senha: '' })
    });
    assert.equal(login.status, 400);
});
