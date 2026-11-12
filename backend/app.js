const express = require('express');
const cors = require('cors');
const path = require('path');

const clienteRoutes = require('./cliente/routes-cliente/clienteRoutes');
const cadastroRoutes = require('./cadastro/cadastro-Routes/cadastroRoutes');
const carrinhoRoutes = require('./carrinho-de-compra/carrinho-de-compra-Routes/carrinho-de-compra-Routes');
const compraRoutes = require('./compra/compra-Routes/compraRoutes');
const consultaRoutes = require('./consulta/consultaRoutes/consultaRoutes');
const loginRoutes = require('./login/login-Routes/loginRoutes');
const notaFiscalRoutes = require('./nota-fiscal/noda-fiscal-routes/nota-fiscal-Routes');
const vendaRoutes = require('./venda/venda-Routes/vendaRoutes');

const app = express();
const frontendDir = path.join(__dirname, '..', 'frontend', 'src');

app.use(cors());
app.use(express.json({ limit: '100kb' }));
app.use(express.static(frontendDir));
app.use('/pages', express.static(path.join(frontendDir, 'pages')));
app.use('/formularios', express.static(path.join(frontendDir, 'formularios')));
app.use('/images', express.static(path.join(frontendDir, 'images')));

app.get('/', (req, res) => {
    if (req.accepts('html')) {
        return res.redirect('/pages/index.html');
    }

    res.status(200).json({ mensagem: 'API RecycleWear funcionando!' });
});

app.get('/index.html', (req, res) => res.redirect('/pages/index.html'));

const redirectToFormulario = (page) => (req, res) => {
    res.redirect(`/formularios/${page}.html`);
};

app.get(['/cadastro', '/pages/cadastro', '/frontend/src/pages/cadastro'], redirectToFormulario('cadastro'));
app.get(['/login', '/pages/login', '/frontend/src/pages/login'], redirectToFormulario('login'));

app.use('/api/clientes', clienteRoutes);
app.use('/cliente', clienteRoutes);
app.use('/clientes', clienteRoutes);
app.use('/api/cadastros', cadastroRoutes);
app.use('/cadastros', cadastroRoutes);
app.use('/cadastro', cadastroRoutes);
app.use('/api/carrinhos', carrinhoRoutes);
app.use('/carrinhos', carrinhoRoutes);
app.use('/api/carrinho-de-compra', carrinhoRoutes);
app.use('/carrinho-de-compra', carrinhoRoutes);
app.use('/api/compras', compraRoutes);
app.use('/compras', compraRoutes);
app.use('/compra', compraRoutes);
app.use('/api/consultas', consultaRoutes);
app.use('/consultas', consultaRoutes);
app.use('/consulta', consultaRoutes);
app.use('/api/login', loginRoutes);
app.use('/login', loginRoutes);
app.use('/api/notas-fiscais', notaFiscalRoutes);
app.use('/notas-fiscais', notaFiscalRoutes);
app.use('/api/nota-fiscal', notaFiscalRoutes);
app.use('/nota-fiscal', notaFiscalRoutes);
app.use('/api/vendas', vendaRoutes);
app.use('/vendas', vendaRoutes);
app.use('/venda', vendaRoutes);

app.use((req, res) => {
    res.status(404).json({ mensagem: 'Rota não encontrada.' });
});

app.use((erro, req, res, next) => {
    if (res.headersSent) {
        return next(erro);
    }

    console.error('Erro na API:', erro);
    res.status(500).json({ mensagem: 'Erro interno do servidor.' });
});

module.exports = app;
