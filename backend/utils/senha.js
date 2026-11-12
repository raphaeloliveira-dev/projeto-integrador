const { promisify } = require('util');
const { randomBytes, scrypt: scryptCallback, timingSafeEqual } = require('crypto');

const scrypt = promisify(scryptCallback);

const criarHashSenha = async (senha) => {
    const salt = randomBytes(16).toString('hex');
    const hash = await scrypt(senha, salt, 64);
    return `scrypt$${salt}$${hash.toString('hex')}`;
};

const verificarSenha = async (senha, senhaArmazenada) => {
    if (typeof senhaArmazenada !== 'string') {
        return false;
    }

    const [algoritmo, salt, hashHex] = senhaArmazenada.split('$');
    if (algoritmo !== 'scrypt' || !salt || !hashHex || !/^[a-f0-9]{128}$/i.test(hashHex)) {
        return false;
    }

    const hashEsperado = Buffer.from(hashHex, 'hex');
    const hashRecebido = await scrypt(senha, salt, hashEsperado.length);
    return timingSafeEqual(hashEsperado, hashRecebido);
};

module.exports = { criarHashSenha, verificarSenha };
