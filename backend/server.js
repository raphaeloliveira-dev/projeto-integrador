
const express = require('express');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

const clienteRoutes = require('./routes/clienteRoutes');

const app = express();
const PORTA = process.env.PORT || 3000;
const frontendDir = path.join(__dirname, '../frontend/src');

app.use(cors());
app.use(express.json());

app.use('/frontend', express.static(frontendDir));
app.use('/pages', express.static(path.join(frontendDir, 'pages')));
app.use('/formularios', express.static(path.join(frontendDir, 'formularios')));

// Rota inicial
app.get('/', (req, res) => {
    if (req.accepts('html')) {
        return res.sendFile(path.join(frontendDir, 'pages', 'index.html'));
    }

    res.status(200).json({
        mensagem: 'API RecycleWear funcionando!'
    });
});

app.get('/index.html', (req, res) => {
    res.sendFile(path.join(frontendDir, 'pages', 'index.html'));
});

// Rotas de clientes
app.use('/api/clientes', clienteRoutes);

// Iniciar servidor
app.listen(PORTA, () => {
    console.log(`Servidor rodando na porta ${PORTA}`);
});
