require('dotenv').config();
const express = require('express');
const twilio = require('twilio');
const Anthropic = require('@anthropic-ai/sdk');

const anthropic = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

const app = express();
app.use(express.urlencoded({ extended: false }));

app.get('/', (req, res) => {
  res.json({ status: 'Bot Twilio WhatsApp rodando! ✅' });
});

app.post('/webhook', async (req, res) => {
  const incomingMessage = req.body.Body;
  const phoneNumber = req.body.From;
  console.log(`Mensagem de ${phoneNumber}: ${incomingMessage}`);

  try {
    const client = twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);

    const messageResponse = await anthropic.messages.create({
      model: 'claude-3-5-sonnet-20241022',
      max_tokens: 200,
      messages: [{ role: 'user', content: `Responda em português (máximo 2-3 frases): ${incomingMessage}` }]
    });

    await client.messages.create({
      from: `whatsapp:${process.env.TWILIO_WHATSAPP_NUMBER}`,
      to: phoneNumber,
      body: messageResponse.content[0].text
    });

    res.send('OK');
  } catch (error) {
    console.error('Erro:', error.message);
    res.status(500).send('Erro');
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, '0.0.0.0', () => console.log(`Bot rodando na porta ${PORT}`));
