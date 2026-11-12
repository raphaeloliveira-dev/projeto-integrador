const validarClienteConsulta = (req, res, next) => {
    const body = req.body && typeof req.body === 'object' && !Array.isArray(req.body)
        ? req.body
        : {};
    req.body = body;

    const clienteId = Number(req.params.clienteId ?? body.cliente_id);
    if (!Number.isSafeInteger(clienteId) || clienteId < 1) {
        return res.status(400).json({ mensagem: 'Informe um ID de cliente válido.' });
    }

    if (req.params.clienteId !== undefined) {
        req.params.clienteId = String(clienteId);
    } else {
        body.cliente_id = clienteId;
    }

    if (body.descricao !== undefined &&
        (typeof body.descricao !== 'string' || body.descricao.length > 2000)) {
        return res.status(400).json({ mensagem: 'A descrição deve ter até 2000 caracteres.' });
    }

    next();
};

module.exports = { validarClienteConsulta };