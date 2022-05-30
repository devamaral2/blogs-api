const mysql = require('mysql2/promise');
require('dotenv').config(); // não se esqueça de configurar suas variáveis de ambiente aqui na configuração

const connection = mysql.createPool({
  host: process.env.HOSTNAME,
  user: 'root',
  password: 'password',
  database: 'blogs-api-dev',
});

module.exports = connection;