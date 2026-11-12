const validarClienteId = (req, res, next) => {
    const origem = req.params.clienteId === undefined
        ? req.body?.cliente_id
        : req.params.clienteId;
    const clienteId = Number(origem);

    if (!Number.isSafeInteger(clienteId) || clienteId < 1) {
        return res.status(400).json({ mensagem: 'Informe um ID de cliente válido.' });
    }

    if (req.params.clienteId !== undefined) {
        req.params.clienteId = String(clienteId);
    } else {
        req.body.cliente_id = clienteId;
    }

    next();
};

const validarMovimentacao = (req, res, next) => {
    const valor = req.body?.total;
    const total = typeof valor === 'number'
        ? valor
        : typeof valor === 'string' && /^\d+(?:\.\d{1,2})?$/.test(valor.trim())
            ? Number(valor)
            : NaN;

    if (!Number.isFinite(total) || total <= 0 || total > 99999999.99) {
        return res.status(400).json({ mensagem: 'Informe um total válido e maior que zero.' });
    }

    req.body.total = total;
    next();
};

module.exports = { validarClienteId, validarMovimentacao };
