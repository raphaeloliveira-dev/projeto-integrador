const assert = require('node:assert/strict');
const test = require('node:test');
const { criarHashSenha, verificarSenha } = require('../utils/senha');

test('hash valida apenas a senha original', async () => {
    const hash = await criarHashSenha('senha-forte-123');

    assert.match(hash, /^scrypt\$[a-f0-9]{32}\$[a-f0-9]{128}$/);
    assert.equal(await verificarSenha('senha-forte-123', hash), true);
    assert.equal(await verificarSenha('outra-senha', hash), false);
});

test('hashes inválidos nunca autenticam', async () => {
    assert.equal(await verificarSenha('senha', 'texto sem formato'), false);
    assert.equal(await verificarSenha('senha', null), false);
});
