const validarIdCliente = (req, res, next) => {
    const id = Number(req.params.id);
    if (!Number.isSafeInteger(id) || id < 1) {
        return res.status(400).json({ mensagem: 'Informe um ID de cliente válido.' });
    }

    req.params.id = String(id);
    next();
};

const validarAtualizacaoCliente = (req, res, next) => {
    const { nome } = req.body || {};
    const email = req.body?.email ?? req.body?.['e-mail'];
    if (typeof nome !== 'string' || !nome.trim() ||
        typeof email !== 'string' || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
        return res.status(400).json({
            mensagem: 'Informe um nome e um e-mail válido.'
        });
    }

    req.body = { nome: nome.trim(), email: email.trim().toLowerCase() };
    next();
};

module.exports = { validarIdCliente, validarAtualizacaoCliente };