
const express = require('express');
const cors = require('cors');
require('dotenv').config();

const clienteRoutes = require('./routes/clienteRoutes');

const app = express();
const PORTA = 3000;

app.use(cors());
app.use(express.json());

// Rota inicial
app.get('/', (req, res) => {
    res.status(200).json({
        mensagem: 'API RecycleWear funcionando!'
    });
});

// Rotas de clientes
app.use('/api/clientes', clienteRoutes);

// Iniciar servidor
app.listen(PORTA, () => {
    console.log(`Servidor rodando na porta ${PORTA}`);
});
