# 🎯 Setup do Bot WhatsApp - Passo a Passo

**Tempo total:** 20-30 minutos (primeira vez)

---

## ⚙️ Passo 1: Instalar Node.js

### 1.1 Fazer Download

Ir para: https://nodejs.org

**Escolha a versão LTS (recomendada):**
```
Procure por "LTS" - é a mais estável
Exemplo: v20.x.x LTS
```

### 1.2 Instalar

**Windows:**
- Duplo clique no arquivo `.msi`
- Clicar "Next" até terminar
- Reiniciar o computador

**Mac:**
- Duplo clique no arquivo `.pkg`
- Seguir instruções
- Pode precisar de senha

**Linux (Ubuntu/Debian):**
```bash
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt-get install -y nodejs
```

### 1.3 Verificar Instalação

Abra o **Terminal** (ou Prompt de Comando no Windows) e digite:

```bash
node --version
npm --version
```

**Resultado esperado:**
```
v20.x.x
10.x.x
```

Se aparecer versão, ✅ instalado com sucesso!

---

## 📁 Passo 2: Criar Pasta do Projeto

### 2.1 Criar a Pasta

Abra o **Terminal** (ou Prompt de Comando) e execute:

**Windows (Prompt de Comando):**
```bash
mkdir C:\Users\SeuUsuario\meu-assistente
cd C:\Users\SeuUsuario\meu-assistente
```

**Mac/Linux:**
```bash
mkdir ~/meu-assistente
cd ~/meu-assistente
```

### 2.2 Onde Copiar os Arquivos

Você agora tem uma pasta vazia:
```
meu-assistente/
```

**Copie os 8 arquivos que recebeu DENTRO dessa pasta:**
- ✅ `bot-whatsapp-backend.js`
- ✅ `package.json`
- ✅ `.env.example`
- ✅ `.gitignore`
- ✅ `Dockerfile`
- ✅ `README.md`
- ✅ `IMPLEMENTACAO.md`
- ✅ `API-EXEMPLOS.js`

**Estrutura final:**
```
meu-assistente/
├── bot-whatsapp-backend.js
├── package.json
├── .env.example
├── .gitignore
├── Dockerfile
├── README.md
├── IMPLEMENTACAO.md
├── API-EXEMPLOS.js
└── (arquivos que serão criados depois)
```

### 2.3 Renomear .env.example

Você precisa criar um arquivo chamado `.env` (sem "example"):

**Windows (no Explorer):**
1. Clique com botão direito em `.env.example`
2. Selecione "Renomear"
3. Mude para `.env`

**Mac/Linux (no Terminal):**
```bash
cp .env.example .env
```

✅ Agora você tem um arquivo `.env` na pasta

---

## 🔑 Passo 3: Obter API Keys

### 3.1 Chave OpenAI (para Whisper - Transcrição de Áudio)

#### Passo 1: Ir para OpenAI
```
https://platform.openai.com/api-keys
```

#### Passo 2: Fazer Login/Criar Conta
- Se tem conta: fazer login
- Se não tem: criar (email + senha)

#### Passo 3: Criar Chave
```
Botão: "Create new secret key"
↓
Copiar chave (aparece uma única vez!)
↓
Salvar em um lugar seguro
```

**Formato da chave:**
```
sk-proj-xxxxxxxxxxxxxxxxxx
```

**⚠️ IMPORTANTE:**
- Copie EXATAMENTE como aparece
- Não compartilhe com ninguém
- Não faça push no GitHub
- Se vazar, delete e crie outra

#### Passo 4: Verificar Saldo
```
https://platform.openai.com/account/billing/overview
```

Precisa ter **pelo menos R$10** de saldo.
- Se não tiver, adicione crédito

---

### 3.2 Chave Anthropic (para Claude - IA)

#### Passo 1: Ir para Anthropic
```
https://console.anthropic.com/api-keys
```

#### Passo 2: Fazer Login/Criar Conta
- Se tem conta: fazer login
- Se não tem: criar (email + senha)

#### Passo 3: Criar Chave
```
Botão: "Create Key"
↓
Nome: "Bot WhatsApp"
↓
Copiar chave
```

**Formato da chave:**
```
sk-ant-xxxxxxxxxxxxxxxx
```

**⚠️ IMPORTANTE:**
- Copie EXATAMENTE como aparece
- Não compartilhe com ninguém
- Se vazar, delete e crie outra

#### Passo 4: Verificar Saldo
```
https://console.anthropic.com/settings/usage
```

Precisa ter **pelo menos alguns dólares** de saldo.

---

## 📝 Passo 4: Preencher o .env

### 4.1 Abrir Arquivo .env

Abra o arquivo `.env` com um **editor de texto** (não Word!):
- Windows: Notepad
- Mac: TextEdit (salvar como .txt)
- Linux: nano ou gedit

```bash
# Comando para abrir:
nano .env  # ou
vim .env   # ou
code .env  # se tiver VS Code
```

### 4.2 Preencher com Suas Chaves

**Conteúdo atual do .env:**
```env
ANTHROPIC_API_KEY=sua_chave_anthropic_aqui
OPENAI_API_KEY=sua_chave_openai_aqui
PORT=3000
```

**Substituir por:**
```env
ANTHROPIC_API_KEY=sk-ant-xxxxxxxxxxxxxxxx
OPENAI_API_KEY=sk-proj-xxxxxxxxxxxxxxxx
PORT=3000
```

**Exemplo real (NÃO USAR ESSAS - FAZER COM SUAS!):**
```env
ANTHROPIC_API_KEY=sk-ant-vkGhzEu9kJl3mN2oP1qRs4tUvWxYz
OPENAI_API_KEY=sk-proj-abc123def456ghi789jkl012mno345
PORT=3000
```

### 4.3 Salvar Arquivo

- **Ctrl+S** (Windows/Linux)
- **Cmd+S** (Mac)

✅ Arquivo salvo!

**Para verificar:**
```bash
cat .env
```

Deve mostrar suas chaves (sem "sua_chave_aqui").

---

## 📦 Passo 5: Instalar Dependências

### 5.1 Comando

No **Terminal**, na pasta do projeto, execute:

```bash
npm install
```

### 5.2 O Que Está Acontecendo?

```
npm install
↓
Lê o arquivo package.json
↓
Faz download de 20+ dependências (300+ MB)
↓
Cria pasta node_modules/
↓
Pronto! (~3-5 minutos)
```

**Saída esperada:**
```
added 200 packages in 3m 45s
```

✅ Se não houver erro de cor vermelha, funcionou!

### 5.3 Se der erro "Legacy Peer Deps"

Se aparecer erro sobre dependências:

```bash
npm install --legacy-peer-deps
```

---

## 🤖 Passo 6: Iniciar o Bot

### 6.1 Comando

No **Terminal**, execute:

```bash
npm start
```

### 6.2 O Que Você Verá

**Primeira execução (pode demorar 30 segundos):**

```
✅ Banco de dados conectado
✅ Tabelas criadas/verificadas
🚀 API rodando em http://localhost:3000

📱 Escaneie este QR Code com seu WhatsApp:

█████████████████████████████
█ ▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀ █
█ ██ ██ ██ ██ ██ ██ ██ ██ █
█ ▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄ █
█████████████████████████████
```

✅ QR Code apareceu? Perfeito!

### 6.3 Se o Bot não Iniciar

**Erro: "Cannot find module"**
```bash
# Tente reinstalar:
rm -rf node_modules
npm install
npm start
```

**Erro: "Port 3000 already in use"**
```bash
# Mude a porta no .env:
PORT=3001
```

**Erro: "ENOENT: no such file or directory"**
```bash
# Verifique que está na pasta certa:
pwd  # mostra pasta atual
ls   # lista arquivos
```

---

## 📱 Passo 7: Conectar WhatsApp

### 7.1 Abra WhatsApp no Celular

Pegue seu **celular com WhatsApp instalado**.

### 7.2 Acesse Aparelhos Conectados

```
WhatsApp → Configurações
↓
Clique em seu nome (topo)
↓
Toque em "Aparelhos conectados"
↓
Clique em "Conectar um aparelho"
```

### 7.3 Escaneie o QR Code

1. Aponte a câmera do celular para o **QR Code no Terminal**
2. Espere confirmar

### 7.4 Pronto!

Você verá no Terminal:

```
✅ WhatsApp Bot conectado e pronto!
```

🎉 **Bot está online!**

### 7.5 Se não funcionar

**Problemas comuns:**

| Problema | Solução |
|----------|---------|
| QR Code desapareceu | Matar terminal (Ctrl+C) e rodar `npm start` novamente |
| Câmera não lê código | Aproximar mais, aumentar contraste |
| Aparelho já conectado | Desconectar outro primeiro em WhatsApp |
| Erro "Not authorized" | Fazer logout completo do WhatsApp e refazer |

---

## ✅ Passo 8: Testar Bot

### 8.1 Enviar Primeira Mensagem

Abra uma **conversa com você mesmo** no WhatsApp e envie:

```
Gastei 85 reais em almoço
```

### 8.2 Resposta Esperada

Em segundos, você receberá:

```
💰 Despesa registrada!
"Gastei 85 reais em almoço"
R$ 85,00
📁 Alimentação
```

✅ **BOT FUNCIONANDO!**

### 8.3 Mais Testes

**Testar evento:**
```
Reunião amanhã às 14h com o pessoal do SGA
```

**Testar tarefa:**
```
Lembrar de estudar React
```

**Testar pergunta:**
```
Quanto gastei este mês?
```

**Testar áudio:**
Envie um áudio dizendo:
```
"Gastei 50 reais em combustível"
```

---

## 🎉 Parabéns!

Se chegou aqui e tudo funcionou:

✅ Node.js instalado
✅ Pasta criada com arquivos
✅ API keys configuradas
✅ Dependências instaladas
✅ Bot rodando
✅ WhatsApp conectado
✅ Primeira mensagem processada

**Você tem um assistente pessoal 24/7!**

---

## 🔄 Manter Bot Rodando

### Opção 1: Terminal Aberto (Simples)

Deixar o terminal com `npm start` sempre aberto.

**Vantagem:** Fácil, sem configuração
**Desvantagem:** Para se fechar terminal

### Opção 2: PM2 (Recomendado para Windows/Mac)

```bash
# Instalar PM2 (uma única vez)
npm install -g pm2

# Iniciar bot
pm2 start bot-whatsapp-backend.js --name "assistente"

# Ver status
pm2 status

# Ver logs
pm2 logs assistente

# Iniciar com computador
pm2 startup
pm2 save
```

### Opção 3: Railway (Cloud - Melhor)

Para bot rodar 24/7 sem precisar de computador ligado:

1. Criar conta em https://railway.app
2. Conectar GitHub
3. Deploy automático

(Instruções detalhadas em README.md)

---

## 📊 Próximas Ações

### Hoje (Primeira Vez):
- [ ] Instalar Node.js
- [ ] Criar pasta
- [ ] Copiar arquivos
- [ ] Configurar .env
- [ ] `npm install`
- [ ] `npm start`
- [ ] Conectar WhatsApp
- [ ] Testar mensagens

### Amanhã (Depois de Funcionar):
- [ ] Testar mais exemplos
- [ ] Adicionar mais categorias
- [ ] Criar dashboard (opcional)
- [ ] Fazer deploy na cloud (opcional)

---

## 🆘 Precisa de Ajuda?

### Checklist de Debug

```
❓ Bot não inicia?
↓
1. Verificar se Node.js está instalado: node --version
2. Verificar se está na pasta certa: pwd
3. Verificar se tem package.json: ls
4. Tentar novamente: npm install && npm start

❓ Não aparece QR Code?
↓
1. Esperar 30 segundos
2. Matar bot: Ctrl+C
3. Rodar novamente: npm start

❓ API Keys não funcionam?
↓
1. Verificar se foram copiadas completas
2. Verificar se .env foi salvo
3. Verificar se tem saldo (OpenAI + Anthropic)
4. Recriar chaves novas

❓ WhatsApp não conecta?
↓
1. Logout do WhatsApp Desktop/Web
2. Matar bot: Ctrl+C
3. Deletar pasta: rm -rf .wwebjs_cache
4. Rodar novamente: npm start
5. Escanear QR Code novo
```

---

## 💡 Dicas Úteis

1. **Manter Terminal Aberto**
   - Minimize, não feche
   - Veja logs das mensagens em tempo real

2. **Checar Logs**
   - Terminal mostra tudo que o bot faz
   - Se der erro, aparece lá

3. **Reiniciar Bot**
   - Ctrl+C (parar)
   - `npm start` (iniciar novamente)

4. **Backup de Dados**
   ```bash
   cp assistente.db assistente.db.backup
   ```

5. **Ver Banco de Dados**
   - Arquivo: `assistente.db` (SQLite)
   - Você pode visualizar com programas como SQLiteStudio

---

## ✨ Parabéns Novamente!

Você agora tem um **bot WhatsApp inteligente** que:
- ✅ Recebe mensagens
- ✅ Transcreve áudios
- ✅ Entende com IA
- ✅ Salva dados
- ✅ Responde

**Divirta-se! 🚀**

Se tiver dúvidas durante o setup, avise para eu ajudar com os próximos passos!
