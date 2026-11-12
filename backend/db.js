const mariadb = require('mariadb');
const path = require('path');

require('dotenv').config({ path: path.join(__dirname, '.env') });

const pool = mariadb.createPool({
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || '',
    database: process.env.DB_NAME || 'projeto_integrador',
    port: Number(process.env.DB_PORT || 3306),
    connectionLimit: 5,
    acquireTimeout: 5000,
    connectTimeout: 5000
});

module.exports = pool;