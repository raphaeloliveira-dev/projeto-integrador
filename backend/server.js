
const express = require('express');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

const clienteRoutes = require('./routes/clienteRoutes');

const app = express();
const PORTA = process.env.PORT || 3000;
const rootDir = path.join(__dirname, '..');
const frontendDir = path.join(__dirname, '../frontend/src');

app.use(cors());
app.use(express.json());
app.use(express.static(rootDir));

app.use('/frontend', express.static(frontendDir));
app.use('/pages', express.static(path.join(frontendDir, 'pages')));
app.use('/formularios', express.static(path.join(frontendDir, 'formularios')));
app.use('/images', express.static(path.join(frontendDir, 'images')));

// Rota inicial
app.get('/', (req, res) => {
    if (req.accepts('html')) {
        return res.redirect('/pages/index.html');
    }

    res.status(200).json({
        mensagem: 'API RecycleWear funcionando!'
    });
});

app.get('/index.html', (req, res) => {
    res.redirect('/pages/index.html');
});

const redirectToFormulario = (page) => (req, res) => {
    res.redirect(`/formularios/${page}.html`);
};

app.get('/cadastro', redirectToFormulario('cadastro'));
app.get('/login', redirectToFormulario('login'));
app.get('/pages/cadastro', redirectToFormulario('cadastro'));
app.get('/pages/login', redirectToFormulario('login'));
app.get('/frontend/src/pages/cadastro', redirectToFormulario('cadastro'));
app.get('/frontend/src/pages/login', redirectToFormulario('login'));

// Rotas de clientes
app.use('/api/clientes', clienteRoutes);

// Iniciar servidor
app.listen(PORTA, () => {
    console.log(`Servidor rodando na porta ${PORTA}`);
});