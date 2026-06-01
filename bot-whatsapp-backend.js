require('dotenv').config();
const { Client, LocalAuth } = require('whatsapp-web.js');
const qrcode = require('qrcode-terminal');
const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const axios = require('axios');
const FormData = require('form-data');
const Anthropic = require('@anthropic-ai/sdk');

const ANTHROPIC_API_KEY = process.env.ANTHROPIC_API_KEY;
const OPENAI_API_KEY = process.env.OPENAI_API_KEY;

if (!ANTHROPIC_API_KEY || !OPENAI_API_KEY) {
  console.error('❌ Faltam chaves');
  process.exit(1);
}

console.log('✅ Chaves carregadas');

const client = new Anthropic({ apiKey: ANTHROPIC_API_KEY });
const app = express();
const db = new sqlite3.Database('./assistente.db');

db.serialize(() => {
  db.run('CREATE TABLE IF NOT EXISTS expenses (id INTEGER PRIMARY KEY, description TEXT, amount REAL, category TEXT, date TEXT)');
  console.log('✅ BD pronto');
});

const whatsappClient = new Client({ authStrategy: new LocalAuth() });

whatsappClient.on('qr', (qr) => {
  console.log('\n📱 QR Code:\n');
  qrcode.generate(qr, { small: true });
});

whatsappClient.on('ready', () => console.log('✅ WhatsApp Bot online!'));

whatsappClient.initialize();

app.listen(3000, () => console.log('🚀 API: http://localhost:3000'));
