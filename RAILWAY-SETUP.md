# 🚀 Guia de Deploy no Railway

## 📋 Pré-requisitos

- ✅ Conta no [Railway.app](https://railway.app)
- ✅ Repositório GitHub sincronizado
- ✅ Chaves de API (Anthropic, OpenAI, Twilio)
- ✅ Banco de dados PostgreSQL

---

## ✅ PASSO 1: Preparar Chaves de API

### 1.1 Revogar Chaves Antigas (CRÍTICO)

Se você já tinha chaves expostas no GitHub:

1. **Anthropic API**
   - Acesse https://console.anthropic.com/account/keys
   - Clique em "Revoke" na chave antiga
   - Crie uma **nova chave**
   - Copie e salve em local seguro

2. **OpenAI API**
   - Acesse https://platform.openai.com/account/api-keys
   - Clique em "Delete" na chave antiga
   - Crie uma **nova chave**
   - Copie e salve em local seguro

### 1.2 Guardar Chaves com Segurança

Você vai precisar dessas chaves em breve:
- `ANTHROPIC_API_KEY` = sk-ant-...
- `OPENAI_API_KEY` = sk-...
- `TWILIO_ACCOUNT_SID` = ACxxxxxxxx...
- `TWILIO_AUTH_TOKEN` = sua_token_aqui
- `TWILIO_WHATSAPP_NUMBER` = whatsapp:+55...

---

## ✅ PASSO 2: Criar Projeto no Railway

1. Acesse https://railway.app
2. Clique em **"New Project"**
3. Selecione **"Deploy from GitHub"**
4. Conecte sua conta GitHub (se não estiver conectada)
5. Selecione o repositório `assistente-whatsapp`
6. Clique em **"Deploy"**

Railway vai começar a fazer deploy automaticamente.

---

## ✅ PASSO 3: Configurar Banco de Dados

1. No painel do Railway, clique em **"+ New"**
2. Selecione **"Database"** → **"PostgreSQL"**
3. Aguarde o banco ser criado (2-3 minutos)
4. Railway vai adicionar automaticamente a variável `DATABASE_URL`

---

## ✅ PASSO 4: Adicionar Variáveis de Ambiente

1. No painel do Railway, vá para seu serviço `assistente-whatsapp`
2. Clique na aba **"Variables"**
3. Adicione cada variável:

| Variável | Valor |
|----------|-------|
| `ANTHROPIC_API_KEY` | sk-ant-... (sua chave) |
| `OPENAI_API_KEY` | sk-... (sua chave) |
| `TWILIO_ACCOUNT_SID` | ACxxxxxxxx |
| `TWILIO_AUTH_TOKEN` | sua_token |
| `TWILIO_WHATSAPP_NUMBER` | whatsapp:+55... |
| `NODE_ENV` | production |

**Nota:** `DATABASE_URL` já foi adicionada automaticamente pelo PostgreSQL.

---

## ✅ PASSO 5: Monitorar Deploy

1. Clique na aba **"Logs"**
2. Procure por estas mensagens:

```
✅ Banco de dados inicializado
✅ Bot rodando na porta 8080
🟢 PRONTO PARA PRODUÇÃO!
```

Se ver erros, procure por:
- `Error:` — erro de código
- `ECONNREFUSED` — erro de conexão com banco
- `undefined` — variável não configurada

---

## ✅ PASSO 6: Configurar Webhook Twilio

1. Acesse https://console.twilio.com
2. Vá para **WhatsApp** → **Sandbox** (ou produção)
3. Procure por "When a message comes in"
4. Coloque a URL do Railway:

```
https://seu-projeto-production-xxxx.up.railway.app/webhook/whatsapp
```

5. Clique em **"Save"**

---

## ✅ PASSO 7: Testar Bot

1. Envie uma mensagem de teste via WhatsApp
2. Verifique os logs no Railway
3. Você deve ver:

```
📨 +5519981838424: Testando
✅ Processado: response
```

---

## 🔍 Troubleshooting

### "No running instances"
- Verifique os logs para erros
- Confirme que `DATABASE_URL` está configurada
- Reinicie o serviço em Railway

### "Cannot find module"
- Execute `npm install` localmente
- Faça commit e push para GitHub
- Railway vai redeploy automaticamente

### "ECONNREFUSED" (erro de conexão com banco)
- Verifique que PostgreSQL foi criado
- Confirme que `DATABASE_URL` está correta
- Aguarde 1-2 minutos para o banco ficar pronto

### Bot não responde
- Verifique que `ANTHROPIC_API_KEY` está correta
- Confirme que números estão em `AUTHORIZED`
- Verifique webhook URL no Twilio

---

## 📊 Monitoramento Contínuo

### Verificar Status
```bash
# Acessar Railway
https://railway.app/project/beneficial-solace

# Ver logs em tempo real
Clique em "Logs" e procure por "✅" ou "❌"
```

### Atualizar Código
```bash
# Fazer mudanças localmente
git add .
git commit -m "Update: descrição da mudança"
git push origin main

# Railway detecta e faz deploy automaticamente
```

---

## 🔐 Segurança

### Checklist de Segurança
- ✅ Chaves antigas foram revogadas
- ✅ Novas chaves foram criadas
- ✅ `.env` não está no Git
- ✅ `.gitignore` contém `.env`
- ✅ Variáveis estão no Railway (não no código)
- ✅ `NODE_ENV=production`

### Nunca Faça Isso
- ❌ Não coloque chaves no código
- ❌ Não commite `.env`
- ❌ Não compartilhe chaves por email/chat
- ❌ Não deixe chaves em histórico do Git

---

## 📞 Suporte

Se tiver problemas:
1. Verifique os logs no Railway
2. Leia o arquivo `README.md`
3. Procure por erros específicos neste guia
4. Contacte o suporte do Railway

---

**Versão:** 1.0  
**Atualizado:** Junho 2026
