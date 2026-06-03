require('dotenv').config();
const express = require('express');
const Anthropic = require('@anthropic-ai/sdk');

const app = express();
app.use(express.urlencoded({extended:false}));

const AUTHORIZED = ['+5519981838424', '+5519982295718'];
const port = process.env.PORT || 8080;

const client = new Anthropic({apiKey: process.env.ANTHROPIC_API_KEY});

app.get('/', (req,res) => res.json({status:'online', version:'4.0.0'}));

app.post('/webhook/whatsapp', async (req,res) => {
  try {
    const num = (req.body.From || '').replace('whatsapp:', '');
    const msg = (req.body.Body || '').trim();
    
    console.log(`📨 ${num}: ${msg}`);
    
    if (!AUTHORIZED.includes(num)) {
      console.log('⚠️ Não autorizado');
      return res.status(403).send('OK');
    }
    
    if (!msg) return res.status(400).send('OK');
    
    const reply = await client.messages.create({
      model: 'claude-haiku-4-5-20251001',
      max_tokens: 500,
      messages: [{role:'user', content:msg}]
    });
    
    const text = reply.content[0]?.text || 'Erro';
    console.log(`✅ Respondido`);
    return res.status(200).send('OK');
  } catch(e) {
    console.error('❌ Erro:', e.message);
    return res.status(500).send('OK');
  }
});

app.listen(port, () => {
  console.log(`✅ Bot rodando na porta ${port}`);
  console.log('🟢 PRONTO PARA PRODUÇÃO!');
});
