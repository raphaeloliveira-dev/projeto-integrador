const validarCadastro = (req, res, next) => {
    const { nome, senha, endereco, telefone } = req.body || {};
    const email = req.body?.email ?? req.body?.['e-mail'];

    if (![nome, email, senha, endereco, telefone].every(
        (valor) => typeof valor === 'string' && valor.trim()
    )) {
        return res.status(400).json({
            mensagem: 'Nome, e-mail, senha, endereço e telefone são obrigatórios.'
        });
    }

    const emailNormalizado = email.trim();
    const formatoEmailValido = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailNormalizado);

    if (!formatoEmailValido) {
        return res.status(400).json({
            mensagem: 'Informe um e-mail válido.'
        });
    }

    if (senha.length < 8) {
        return res.status(400).json({
            mensagem: 'A senha deve ter pelo menos 8 caracteres.'
        });
    }

    req.body = {
        nome: nome.trim(),
        email: emailNormalizado.toLowerCase(),
        senha,
        endereco: endereco.trim(),
        telefone: telefone.trim()
    };

    next();
};

module.exports = { validarCadastro };