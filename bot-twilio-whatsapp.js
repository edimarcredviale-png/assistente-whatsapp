require('dotenv').config();
const express = require('express');
const twilio = require('twilio');
const Anthropic = require('@anthropic-ai/sdk');

const client = twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);
const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY
});

const app = express();
app.use(express.urlencoded({ extended: false }));

app.get('/', (req, res) => {
  res.json({ status: 'Bot Twilio WhatsApp rodando! ✅' });
});

app.post('/webhook', async (req, res) => {
  const incomingMessage = req.body.Body;
  const phoneNumber = req.body.From;

  console.log(`[${new Date().toISOString()}] Mensagem: ${incomingMessage}`);

  try {
    const messageResponse = await anthropic.messages.create({
      model: 'claude-3-5-sonnet-20241022',
      max_tokens: 200,
      messages: [{role: 'user', content: `Responda em português (máximo 2-3 frases): ${incomingMessage}`}]
    });

    const response = messageResponse.content[0].text;

    await client.messages.create({
      from: `whatsapp:${process.env.TWILIO_WHATSAPP_NUMBER}`,
      to: phoneNumber,
      body: response
    });

    res.send('OK');
  } catch (error) {
    console.error('Erro:', error.message);
    res.status(500).send('Erro');
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`🤖 Bot rodando porta ${PORT}`));
