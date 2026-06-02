require('dotenv').config();
const express = require('express');
const twilio = require('twilio');
const Anthropic = require('@anthropic-ai/sdk');
const { Pool } = require('pg');

const app = express();
app.use(express.urlencoded({ extended: false }));

const anthropic = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false }
});

const AUTORIZADOS = {
  'whatsapp:+5519981838424': 'Edimar',
  'whatsapp:+5519982295718': 'Manuelly'
};

async function inicializarBanco() {
  await pool.query('CREATE TABLE IF NOT EXISTS gastos (id SERIAL PRIMARY KEY, valor NUMERIC, descricao TEXT, categoria TEXT, informado_por TEXT, criado_em TIMESTAMP DEFAULT NOW())');
  await pool.query('CREATE TABLE IF NOT EXISTS tarefas (id SERIAL PRIMARY KEY, descricao TEXT, concluida BOOLEAN DEFAULT FALSE, informado_por TEXT, criado_em TIMESTAMP DEFAULT NOW())');
  await pool.query('CREATE TABLE IF NOT EXISTS agenda (id SERIAL PRIMARY KEY, descricao TEXT, quando TEXT, informado_por TEXT, criado_em TIMESTAMP DEFAULT NOW())');
  console.log('Banco pronto.');
}

async function entenderMensagem(texto) {
  const prompt =
    'Voce e o cerebro de um assistente pessoal. Analise a mensagem e responda APENAS com um JSON valido, sem texto antes ou depois, sem markdown.\n\n' +
    'Mensagem: "' + texto + '"\n\n' +
    'Classifique a intencao e responda neste formato:\n' +
    '{\n' +
    '"intencao": "REGISTRAR_GASTO" ou "REGISTRAR_TAREFA" ou "REGISTRAR_AGENDA" ou "CONSULTAR" ou "CONVERSAR",\n' +
    '"valor": numero (so para gasto, senao null),\n' +
    '"descricao": "texto curto",\n' +
    '"categoria": "ex: combustivel, alimentacao (so para gasto, senao null)",\n' +
    '"quando": "data/hora se mencionada (so para agenda, senao null)",\n' +
    '"tipo_consulta": "gastos" ou "tarefas" ou "agenda" (so para CONSULTAR, senao null),\n' +
    '"resposta_conversa": "resposta amigavel (so para CONVERSAR, senao null)"\n' +
    '}';
  const resposta = await anthropic.messages.create({
    model: 'claude-haiku-4-5-20251001',
    max_tokens: 300,
    messages: [{ role: 'user', content: prompt }]
  });
  let txt = resposta.content[0].text.trim();
  txt = txt.replace(/[`][`][`]json/g, '').replace(/[`][`][`]/g, '').trim();
  return JSON.parse(txt);
}

async function consultarDados(tipo) {
  if (tipo === 'gastos') {
    const r = await pool.query('SELECT valor, descricao, categoria, informado_por FROM gastos ORDER BY criado_em DESC LIMIT 20');
    const total = await pool.query('SELECT COALESCE(SUM(valor),0) AS soma FROM gastos');
    if (r.rows.length === 0) return 'Nenhum gasto registrado ainda.';
    let txt = 'Total gasto: R$ ' + Number(total.rows[0].soma).toFixed(2) + '\n\nUltimos gastos:\n';
    r.rows.forEach(function(g) {
      txt += '- R$ ' + Number(g.valor).toFixed(2) + ' - ' + g.descricao + ' (' + (g.categoria || 'sem categoria') + ') - por ' + g.informado_por + '\n';
    });
    return txt;
  }
  if (tipo === 'tarefas') {
    const r = await pool.query('SELECT descricao, concluida, informado_por FROM tarefas ORDER BY criado_em DESC LIMIT 20');
    if (r.rows.length === 0) return 'Nenhuma tarefa registrada ainda.';
    let txt = 'Tarefas:\n';
    r.rows.forEach(function(t) {
      txt += (t.concluida ? '[x] ' : '[ ] ') + t.descricao + ' - por ' + t.informado_por + '\n';
    });
    return txt;
  }
  if (tipo === 'agenda') {
    const r = await pool.query('SELECT descricao, quando, informado_por FROM agenda ORDER BY criado_em DESC LIMIT 20');
    if (r.rows.length === 0) return 'Nenhum compromisso registrado ainda.';
    let txt = 'Agenda:\n';
    r.rows.forEach(function(a) {
      txt += '- ' + a.descricao + (a.quando ? ' (' + a.quando + ')' : '') + ' - por ' + a.informado_por + '\n';
    });
    return txt;
  }
  return 'Nao entendi o que consultar.';
}

app.post('/webhook', async (req, res) => {
  const de = req.body.From;
  const texto = req.body.Body;
  const twiml = new twilio.twiml.MessagingResponse();

  const nome = AUTORIZADOS[de];
  if (!nome) {
    twiml.message('Desculpe, voce nao tem autorizacao para usar este assistente.');
    res.type('text/xml').send(twiml.toString());
    return;
  }

  try {
    const r = await entenderMensagem(texto);
    if (r.intencao === 'REGISTRAR_GASTO') {
      await pool.query('INSERT INTO gastos (valor, descricao, categoria, informado_por) VALUES ($1,$2,$3,$4)', [r.valor, r.descricao, r.categoria, nome]);
      twiml.message('Gasto registrado: R$ ' + Number(r.valor).toFixed(2) + ' - ' + r.descricao + ' (informado por ' + nome + ')');
    } else if (r.intencao === 'REGISTRAR_TAREFA') {
      await pool.query('INSERT INTO tarefas (descricao, informado_por) VALUES ($1,$2)', [r.descricao, nome]);
      twiml.message('Tarefa registrada: ' + r.descricao);
    } else if (r.intencao === 'REGISTRAR_AGENDA') {
      await pool.query('INSERT INTO agenda (descricao, quando, informado_por) VALUES ($1,$2,$3)', [r.descricao, r.quando, nome]);
      twiml.message('Compromisso registrado: ' + r.descricao + (r.quando ? ' (' + r.quando + ')' : ''));
    } else if (r.intencao === 'CONSULTAR') {
      const resultado = await consultarDados(r.tipo_consulta);
      twiml.message(resultado);
    } else {
      twiml.message(r.resposta_conversa || 'Oi! Como posso ajudar?');
    }
  } catch (e) {
    console.error('Erro:', e);
    twiml.message('Tive um problema ao processar. Tente reformular a mensagem.');
  }
  res.type('text/xml').send(twiml.toString());
});

app.get('/', (req, res) => res.send('Assistente rodando!'));

const PORT = process.env.PORT || 8080;
inicializarBanco().then(function() {
  app.listen(PORT, '0.0.0.0', function() { console.log('Servidor na porta ' + PORT); });
}).catch(function(e) {
  console.error('Erro ao iniciar banco:', e);
  app.listen(PORT, '0.0.0.0', function() { console.log('Servidor na porta ' + PORT + ' (banco com erro)'); });
});
