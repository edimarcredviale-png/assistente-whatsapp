require('dotenv').config();
const express = require('express');
const { Pool } = require('pg');
const Anthropic = require('@anthropic-ai/sdk');

// ============================================
// CONFIGURAÇÃO BÁSICA
// ============================================

const app = express();
app.use(express.urlencoded({ extended: false }));

const PORT = process.env.PORT || 8080;
const AUTHORIZED = ['+5519981838424', '+5519982295718'];

// ============================================
// BANCO DE DADOS - PostgreSQL
// ============================================

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: process.env.DATABASE_URL ? { rejectUnauthorized: false } : false
});

// Inicializar tabelas
async function initDatabase() {
  try {
    await pool.query(`
      CREATE TABLE IF NOT EXISTS expenses (
        id SERIAL PRIMARY KEY,
        user_phone VARCHAR(20),
        description TEXT,
        amount DECIMAL(10, 2),
        category VARCHAR(50),
        date TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);

    await pool.query(`
      CREATE TABLE IF NOT EXISTS events (
        id SERIAL PRIMARY KEY,
        user_phone VARCHAR(20),
        title TEXT,
        description TEXT,
        event_date TIMESTAMP,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);

    console.log('✅ Banco de dados inicializado');
  } catch (error) {
    console.error('❌ Erro ao inicializar banco:', error.message);
  }
}

// ============================================
// CLIENTE ANTHROPIC (Claude)
// ============================================

const client = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY
});

// ============================================
// FUNÇÕES AUXILIARES
// ============================================

async function parseMessage(userPhone, message) {
  try {
    const response = await client.messages.create({
      model: 'claude-3-haiku-20240307',
      max_tokens: 1000,
      system: `Você é um assistente pessoal que ajuda a gerenciar despesas e agenda.
      
Quando o usuário mencionar uma despesa, responda em JSON assim:
{"type": "expense", "description": "descrição", "amount": 100, "category": "categoria"}

Quando mencionar um evento/tarefa, responda assim:
{"type": "event", "title": "título", "description": "descrição", "date": "2026-06-08T14:00"}

Quando for uma pergunta normal, responda assim:
{"type": "response", "message": "sua resposta aqui"}

Sempre responda em JSON válido.`,
      messages: [{ role: 'user', content: message }]
    });

    const text = response.content[0]?.text || '{}';
    
    try {
      return JSON.parse(text);
    } catch {
      return { type: 'response', message: text };
    }
  } catch (error) {
    console.error('❌ Erro ao processar com Claude:', error.message);
    return { type: 'response', message: 'Desculpe, houve um erro ao processar sua mensagem.' };
  }
}

async function saveExpense(userPhone, description, amount, category) {
  try {
    await pool.query(
      'INSERT INTO expenses (user_phone, description, amount, category) VALUES ($1, $2, $3, $4)',
      [userPhone, description, amount, category]
    );
    console.log(`✅ Despesa salva: ${description} - R$ ${amount}`);
  } catch (error) {
    console.error('❌ Erro ao salvar despesa:', error.message);
  }
}

async function saveEvent(userPhone, title, description, eventDate) {
  try {
    await pool.query(
      'INSERT INTO events (user_phone, title, description, event_date) VALUES ($1, $2, $3, $4)',
      [userPhone, title, description, eventDate]
    );
    console.log(`✅ Evento salvo: ${title}`);
  } catch (error) {
    console.error('❌ Erro ao salvar evento:', error.message);
  }
}

async function getExpensesSummary(userPhone, month) {
  try {
    const result = await pool.query(
      `SELECT category, SUM(amount) as total FROM expenses 
       WHERE user_phone = $1 AND EXTRACT(MONTH FROM date) = $2
       GROUP BY category`,
      [userPhone, month]
    );
    return result.rows;
  } catch (error) {
    console.error('❌ Erro ao buscar resumo:', error.message);
    return [];
  }
}

// ============================================
// ROTAS
// ============================================

app.get('/', (req, res) => {
  res.json({
    status: 'online',
    version: '4.0.0',
    features: ['despesas', 'agenda', 'tarefas']
  });
});

app.post('/webhook/whatsapp', async (req, res) => {
  try {
    const userPhone = (req.body.From || '').replace('whatsapp:', '');
    const message = (req.body.Body || '').trim();

    console.log(`📨 ${userPhone}: ${message}`);

    // Validar autorização
    if (!AUTHORIZED.includes(userPhone)) {
      console.log('⚠️ Usuário não autorizado');
      return res.status(403).send('OK');
    }

    if (!message) {
      return res.status(400).send('OK');
    }

    // Processar mensagem com Claude
    const parsed = await parseMessage(userPhone, message);

    // Salvar dados conforme tipo
    if (parsed.type === 'expense') {
      await saveExpense(
        userPhone,
        parsed.description,
        parsed.amount,
        parsed.category || 'Geral'
      );
    } else if (parsed.type === 'event') {
      await saveEvent(
        userPhone,
        parsed.title,
        parsed.description,
        parsed.date
      );
    }

    console.log(`✅ Processado: ${parsed.type}`);
    return res.status(200).send('OK');
  } catch (error) {
    console.error('❌ Erro no webhook:', error.message);
    return res.status(500).send('OK');
  }
});

// ============================================
// INICIAR SERVIDOR
// ============================================

async function start() {
  await initDatabase();

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`✅ Bot rodando na porta ${PORT}`);
    console.log('🟢 PRONTO PARA PRODUÇÃO!');
    console.log(`📱 Webhook: /webhook/whatsapp`);
  });
}

start().catch(error => {
  console.error('❌ Erro ao iniciar:', error);
  process.exit(1);
});
