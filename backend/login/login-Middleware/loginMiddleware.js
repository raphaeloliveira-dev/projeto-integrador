const validarCredenciais = (req, res, next) => {
    const { email, senha } = req.body || {};

    if (typeof email !== 'string' || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim()) ||
        typeof senha !== 'string' || senha.length === 0) {
        return res.status(400).json({ mensagem: 'Informe um e-mail válido e uma senha.' });
    }

    req.body = { email: email.trim().toLowerCase(), senha };
    next();
};

module.exports = { validarCredenciais };