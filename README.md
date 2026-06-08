# 📱 Assistente WhatsApp - Despesas & Agenda

Bot inteligente para gerenciar sua agenda, financeiro e tarefas via WhatsApp usando Twilio e Claude AI.

---

## ✨ Funcionalidades

### 📊 Gerenciamento de Despesas
- ✅ Registrar gastos via mensagem: *"Gastei 85 em almoço"*
- ✅ Categorizar automaticamente: *Alimentação, Transporte, etc*
- ✅ Consultar resumo mensal: *"Quanto gastei em combustível?"*
- ✅ Persistência em PostgreSQL

### 📅 Agenda e Tarefas
- ✅ Criar eventos: *"Reunião amanhã às 14h"*
- ✅ Registrar tarefas: *"Lembrar de estudar React"*
- ✅ Consultar próximos eventos
- ✅ Sincronização automática

### 🤖 Inteligência Artificial
- ✅ Processamento com Claude 3.5 Sonnet
- ✅ Entendimento de linguagem natural
- ✅ Respostas contextualizadas
- ✅ Aprendizado contínuo

---

## 🚀 Deploy Rápido (Railway)

### Pré-requisitos
- ✅ Conta no [Railway.app](https://railway.app)
- ✅ Repositório GitHub
- ✅ Chaves de API (Anthropic, OpenAI, Twilio)

### Passo 1: Preparar Chaves
1. Revogue chaves antigas em:
   - https://console.anthropic.com/account/keys
   - https://platform.openai.com/account/api-keys
2. Crie novas chaves
3. Guarde em local seguro

### Passo 2: Deploy no Railway
1. Acesse https://railway.app
2. Clique em "New Project"
3. Selecione "Deploy from GitHub"
4. Escolha `assistente-whatsapp`
5. Clique em "Deploy"

### Passo 3: Configurar Banco de Dados
1. No Railway, clique em "+ New"
2. Selecione "Database" → "PostgreSQL"
3. Aguarde criação (2-3 minutos)

### Passo 4: Adicionar Variáveis
No painel do Railway, adicione:
```
ANTHROPIC_API_KEY = sk-ant-...
OPENAI_API_KEY = sk-...
TWILIO_ACCOUNT_SID = AC...
TWILIO_AUTH_TOKEN = seu_token
TWILIO_WHATSAPP_NUMBER = whatsapp:+55...
NODE_ENV = production
```

### Passo 5: Configurar Webhook Twilio
1. Acesse https://console.twilio.com
2. Vá para WhatsApp → Sandbox
3. Configure webhook para:
```
https://seu-projeto-production-xxxx.up.railway.app/webhook/whatsapp
```

### Passo 6: Testar
Envie uma mensagem via WhatsApp. Você deve receber resposta!

---

## 💻 Setup Local (Desenvolvimento)

### Pré-requisitos
- Node.js 18+
- PostgreSQL instalado
- Git

### Instalação

```bash
# 1. Clonar repositório
git clone https://github.com/edimarcredviale-png/assistente-whatsapp.git
cd assistente-whatsapp

# 2. Instalar dependências
npm install

# 3. Configurar variáveis
cp .env.example .env
# Editar .env com suas chaves

# 4. Criar banco de dados
createdb assistente

# 5. Executar
npm start
```

### Desenvolvimento com Nodemon
```bash
npm run dev
```

---

## 📖 Documentação

- **[RAILWAY-SETUP.md](./RAILWAY-SETUP.md)** — Guia completo de deploy
- **[API-EXEMPLOS.js](./API-EXEMPLOS.js)** — Exemplos de uso
- **[QUICK-REFERENCE.md](./QUICK-REFERENCE.md)** — Referência rápida

---

## 🔐 Segurança

### ⚠️ IMPORTANTE
- ✅ **Nunca** commite `.env` no Git
- ✅ **Sempre** use `.env.example` como template
- ✅ **Revogue** chaves antigas se expostas
- ✅ **Use** variáveis de ambiente em produção

### Checklist
- [ ] `.env` está em `.gitignore`
- [ ] Chaves antigas foram revogadas
- [ ] Novas chaves foram criadas
- [ ] Variáveis estão no Railway
- [ ] `NODE_ENV=production`

---

## 📊 Estrutura do Projeto

```
assistente-whatsapp/
├── bot-twilio-whatsapp.js      # ⭐ Arquivo principal
├── package.json                 # Dependências
├── Dockerfile                   # Container para Railway
├── .env.example                 # Template de variáveis
├── .gitignore                   # Segurança
├── README.md                    # Este arquivo
├── RAILWAY-SETUP.md             # Guia de deploy
└── API-EXEMPLOS.js              # Exemplos de uso
```

---

## 🛠️ Troubleshooting

### Bot não inicia
```
❌ Erro: Cannot find module 'pg'
✅ Solução: npm install
```

### Erro de conexão com banco
```
❌ Erro: ECONNREFUSED
✅ Solução: Verifique DATABASE_URL e PostgreSQL
```

### Chaves não funcionam
```
❌ Erro: Unauthorized
✅ Solução: Revogue chaves antigas e crie novas
```

### Webhook não responde
```
❌ Erro: 503 Service Unavailable
✅ Solução: Verifique logs no Railway
```

---

## 📞 Suporte

- **Railway**: https://railway.app/support
- **Twilio**: https://www.twilio.com/help
- **Anthropic**: https://support.anthropic.com
- **OpenAI**: https://help.openai.com

---

## 📝 Changelog

### v4.0.0 (Junho 2026)
- ✅ Integração com PostgreSQL
- ✅ Suporte a despesas e agenda
- ✅ Deploy automático no Railway
- ✅ Melhor tratamento de erros
- ✅ Documentação completa

### v3.0.0
- Versão anterior com Twilio básico

---

## 📄 Licença

MIT License - Veja LICENSE para detalhes

---

## 👨‍💼 Autor

**Edimar Gomes**  
Diretor Operacional - AEIG  
Especialista em tecnologia e inovação

---

**Última atualização:** Junho 2026  
**Status:** ✅ Pronto para Produção
