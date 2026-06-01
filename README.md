# 🤖 Assistente Pessoal WhatsApp

Bot inteligente para gerenciar sua agenda, financeiro e tarefas via WhatsApp. Processa áudios, responde perguntas e armazena dados de forma persistente.

---

## ✨ Funcionalidades

### 📱 Entrada Múltipla
- ✅ Mensagens de texto
- ✅ Áudios (transcrição automática com Whisper)
- ✅ Processamento com IA (Claude)

### 📊 Tipos de Dados
- **Despesas** → "Gastei 85 em almoço no Café Real"
- **Eventos** → "Reunião com SGA amanhã às 14h"
- **Tarefas** → "Lembrar de estudar React"
- **Perguntas** → "Quanto gastei em combustível este mês?"

### 💾 Armazenamento
- SQLite local (sem dependências externas)
- Persistência completa de dados
- API REST para consultas

---

## 🚀 Setup Rápido (Local)

### Pré-requisitos
- Node.js 18+ instalado
- Conta Anthropic (Claude API)
- Conta OpenAI (Whisper API)
- WhatsApp instalado no seu celular

### Passo 1: Clonar/Baixar Arquivos

```bash
# Criar pasta
mkdir assistente-whatsapp
cd assistente-whatsapp

# Copiar os arquivos:
# - bot-whatsapp-backend.js
# - package.json
# - .env.example
```

### Passo 2: Instalar Dependências

```bash
npm install
```

⏳ **Primeira vez vai demorar** (especialmente `whatsapp-web.js` compilar). Isso é normal.

### Passo 3: Configurar Variáveis de Ambiente

```bash
# Copiar arquivo de exemplo
cp .env.example .env
```

Abrir `.env` e adicionar suas chaves:

```env
ANTHROPIC_API_KEY=sk-ant-xxx...
OPENAI_API_KEY=sk-xxx...
PORT=3000
```

**Onde pegar as chaves:**

#### 🔑 OpenAI (Whisper - Transcrição)
1. Ir para https://platform.openai.com/api-keys
2. Criar nova chave
3. Copiar e colar no `.env`
4. ⚠️ **Manter seguro!** Não compartilhe

#### 🔑 Anthropic (Claude - Processamento)
1. Ir para https://console.anthropic.com/
2. Criar nova chave
3. Copiar e colar no `.env`
4. ⚠️ **Manter seguro!** Não compartilhe

### Passo 4: Executar Bot

```bash
npm start
```

Você vai ver:

```
✅ Banco de dados conectado
✅ Tabelas criadas/verificadas
🚀 API rodando em http://localhost:3000

📱 Escaneie este QR Code com seu WhatsApp:
[QR CODE AQUI]
```

### Passo 5: Conectar WhatsApp

1. Abra WhatsApp no seu celular
2. Vá para: **Configurações → Aparelhos conectados → Conectar um aparelho**
3. Escaneie o QR Code no terminal
4. Pronto! 🎉

---

## 📝 Como Usar

### Exemplos de Mensagens

#### 💰 Registrar Despesa
```
"Gastei 85 em almoço no Café Real"
"50 reais no táxi"
"R$ 150 em combustível"
```

**Resposta esperada:**
```
💰 Despesa registrada!
"Gastei 85 em almoço no Café Real"
R$ 85,00
📁 Alimentação
```

#### 📅 Agendar Evento
```
"Reunião com pessoal do SGA amanhã às 14h"
"Churrasco no sábado"
"Dentista terça de manhã"
```

**Resposta esperada:**
```
📅 Evento adicionado!
"Reunião com pessoal do SGA"
2025-06-05 às 14:00
```

#### ✅ Adicionar Tarefa
```
"Lembrar de estudar React"
"Fazer relatório até quinta"
"Ligar para João"
```

**Resposta esperada:**
```
✅ Tarefa adicionada!
"Lembrar de estudar React"
```

#### ❓ Fazer Perguntas
```
"Quanto gastei este mês?"
"Quanto gastei em combustível?"
"Gastos em alimentação?"
"Total de gastos?"
```

**Resposta esperada:**
```
💰 Gastos deste mês: R$ 1.250,50
🚗 Combustível: R$ 350,00 (5 registros)
🍽️ Alimentação: R$ 425,75 (12 refeições)
```

### 🎙️ Áudio
```
Envie um áudio: "Gastei 85 reais em almoço no café real"
↓
Bot transcreve automaticamente
↓
Processa e registra
```

---

## 🌐 Deploy no Railway (Recomendado)

### Por que Railway?
- ✅ Grátis no tier inicial (depois $5-10/mês)
- ✅ Deploy automático (git push)
- ✅ Sempre online 24/7
- ✅ Gerencia variáveis de ambiente
- ✅ Logs em tempo real

### Passo 1: Criar Conta Railway
1. Ir para https://railway.app
2. Fazer login com GitHub
3. Criar novo projeto

### Passo 2: Clonar Repositório GitHub
```bash
# Se não tiver git configurado, configure
git config --global user.name "Seu Nome"
git config --global user.email "seu@email.com"

# Criar repositório local
git init
git add .
git commit -m "Initial commit"

# Criar repositório no GitHub (opcional mas recomendado)
# Depois fazer:
# git remote add origin https://github.com/seuuser/assistente-whatsapp.git
# git push -u origin main
```

### Passo 3: Conectar ao Railway
1. Na Railway, clique em "New Project"
2. Selecione "Deploy from GitHub"
3. Selecione seu repositório
4. Clique em "Deploy"

### Passo 4: Adicionar Variáveis de Ambiente
1. No painel Railway, vá para "Variables"
2. Adicione:
   ```
   ANTHROPIC_API_KEY=sk-ant-xxx...
   OPENAI_API_KEY=sk-xxx...
   PORT=3000
   ```
3. Salve

### Passo 5: Ver Logs
```bash
# No terminal, você pode monitorar em tempo real:
railway logs
```

---

## 💾 Banco de Dados

Os dados são salvos automaticamente em `assistente.db` (SQLite).

### Estrutura

**expenses** (Despesas)
```
id | description | amount | category | date | created_at
```

**events** (Eventos)
```
id | title | description | event_date | event_time | category | created_at
```

**tasks** (Tarefas)
```
id | title | description | completed | due_date | category | created_at
```

### Fazer Backup
```bash
# Copiar arquivo do banco
cp assistente.db assistente.db.backup
```

### Restaurar Backup
```bash
# Copiar backup de volta
cp assistente.db.backup assistente.db
```

---

## 🔧 Troubleshooting

### ❌ "ANTHROPIC_API_KEY não está definida"
```bash
# Verificar se .env existe
ls -la | grep .env

# Se não existir, criar:
cp .env.example .env

# Editar .env com suas chaves
nano .env  # ou use seu editor
```

### ❌ "Erro ao transcrever áudio"
- Verificar se a chave OpenAI está correta
- Verificar se tem crédito (https://platform.openai.com/account/billing/overview)
- Arquivo de áudio muito grande? Tentar novamente

### ❌ "Erro ao conectar WhatsApp"
- Escanear QR Code novamente
- Verificar se seu WhatsApp está logado no celular
- Se trocar de dispositivo, refazer login

### ❌ "Erro de banco de dados"
- Deletar arquivo `assistente.db`
- Executar `npm start` novamente
- Novo banco será criado automaticamente

---

## 📊 API REST (Opcional)

Se quiser construir um dashboard, a API oferece:

### Status
```bash
GET http://localhost:3000/api/status
```

### Despesas do Mês
```bash
GET http://localhost:3000/api/expenses/month

Response:
{
  "total": "1250.50",
  "count": 8,
  "expenses": [...]
}
```

### Despesas por Categoria
```bash
GET http://localhost:3000/api/expenses/category/Combustível

Response:
{
  "category": "Combustível",
  "total": "350.00",
  "count": 5,
  "expenses": [...]
}
```

---

## 🔐 Segurança

### ✅ Boas Práticas
- Nunca compartilhe suas API keys
- Adicione `.env` ao `.gitignore` (já feito)
- Use a conta WhatsApp pessoal (é você)
- Atualize suas senhas regularmente

### ⚠️ Não faça isso
- ❌ Não compartilhe o `.env`
- ❌ Não faça commit do `.env` no GitHub
- ❌ Não revele suas chaves públicas
- ❌ Não use para comercializar (banco pessoal)

---

## 📈 Próximos Passos

### 1️⃣ Dashboard Web
Criar interface para visualizar dados:
```bash
npm install react tailwindcss
# Criar componentes de análise
```

### 2️⃣ Relatórios PDF
Gerar relatórios mensais automáticos

### 3️⃣ Grupos WhatsApp
Permitir comandos em grupos

### 4️⃣ Integração com APIs
- Google Calendar
- Notion
- Spreadsheets

---

## 📞 Suporte

Se tiver problemas:
1. Verificar `.env` está correto
2. Verificar logs no terminal
3. Verificar se APIs têm saldo
4. Resetar WhatsApp (escanear QR novamente)

---

## 📄 Licença

MIT - Use livremente

---

## 🎉 Pronto!

Agora você tem um assistente pessoal inteligente rodando 24/7 no WhatsApp.

**Próximos comandos:**
- Entrar em um grupo e convidar o bot
- Fazer perguntas sobre gastos
- Enviar áudios para transcrever
- Criar rotinas com tarefas recorrentes

Divirta-se! 🚀