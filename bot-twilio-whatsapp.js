require('dotenv').config();
const { Client } = require('pg');

console.log('✅ Bot iniciando...');
console.log('📊 DATABASE_URL:', process.env.DATABASE_URL ? 'DEFINIDA' : 'INDEFINIDA');

const client = new Client({
  connectionString: process.env.DATABASE_URL
});

client.connect((err) => {
  if (err) {
    console.error('❌ Erro PostgreSQL:', err.message);
  } else {
    console.log('✅ ✅ ✅ Conectado ao PostgreSQL!');
  }
});

const app = require('express')();
const PORT = process.env.PORT || 8080;

app.get('/', (req, res) => {
  res.json({ status: 'online', version: '3.2.0', timestamp: new Date() });
});

app.listen(PORT, () => {
  console.log(`✅ ✅ ✅ Servidor rodando na porta ${PORT}`);
});
