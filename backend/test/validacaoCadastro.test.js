const assert = require('node:assert/strict');
const test = require('node:test');
const { validarCadastro } = require('../cadastro/cadastro-Middleware/cadastroMiddleware');

const validar = (body) => {
    const req = { body };
    let status;
    let resposta;
    let avancou = false;
    const res = {
        status(codigo) {
            status = codigo;
            return this;
        },
        json(conteudo) {
            resposta = conteudo;
            return this;
        }
    };

    validarCadastro(req, res, () => {
        avancou = true;
    });

    return { req, status, resposta, avancou };
};

test('aceita o campo e-mail e o normaliza para email', () => {
    const resultado = validar({
        nome: 'Raphael',
        'e-mail': 'Pessoa@Exemplo.com',
        senha: 'senha-forte',
        endereco: 'Rua de teste',
        telefone: '11999999999'
    });

    assert.equal(resultado.avancou, true);
    assert.equal(resultado.req.body.email, 'pessoa@exemplo.com');
    assert.equal(Object.hasOwn(resultado.req.body, 'e-mail'), false);
});
