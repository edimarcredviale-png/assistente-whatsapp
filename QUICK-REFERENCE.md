# 🚀 QUICK REFERENCE - COLA RÁPIDA

**Imprima ou guarde este arquivo aberto!**

---

## 📋 COMANDOS ESSENCIAIS

### Navegar no Terminal
```bash
pwd                    # Mostra pasta atual
ls                     # Lista arquivos
cd pasta_nome          # Entra em pasta
cd ..                  # Volta uma pasta
clear                  # Limpa tela
```

### Node.js
```bash
node --version         # Verifica Node instalado
npm --version          # Verifica npm instalado
npm install            # Instala dependências
npm start              # Inicia bot
```

### Parar Bot
```
Ctrl+C                 # Ctrl+C no Windows/Mac/Linux
```

### Verificar Arquivos
```bash
cat .env               # Mostra conteúdo do .env
ls -la                 # Lista tudo incluindo .env
```

---

## 🔗 LINKS IMPORTANTES

### Instalar Node.js
```
https://nodejs.org
```

### OpenAI (Whisper)
```
API Keys:
https://platform.openai.com/api-keys

Saldo:
https://platform.openai.com/account/billing/overview

Documentação:
https://platform.openai.com/docs/guides/speech-to-text
```

### Anthropic (Claude)
```
API Keys:
https://console.anthropic.com/api-keys

Saldo/Uso:
https://console.anthropic.com/settings/usage

Documentação:
https://docs.anthropic.com/
```

### Railway (Deploy Cloud)
```
https://railway.app
```

---

## 📱 COMO CONECTAR WHATSAPP

```
1. WhatsApp → Configurações
2. Clique em seu NOME (topo)
3. "Aparelhos conectados"
4. "Conectar um aparelho"
5. Aponte câmera para QR Code
6. Pronto!
```

---

## 💬 EXEMPLOS DE MENSAGENS

### Despesa
```
"Gastei 85 em almoço"
"50 reais no táxi"
"R$ 150 combustível"
```

### Evento
```
"Reunião amanhã às 14h"
"Churrasco no sábado"
"Dentista terça"
```

### Tarefa
```
"Lembrar de estudar"
"Fazer relatório"
"Ligar para João"
```

### Pergunta
```
"Quanto gastei este mês?"
"Gastos em combustível?"
"Total?"
```

---

## ⚠️ ERROS COMUNS (Soluções Rápidas)

| Erro | Solução |
|------|---------|
| `Cannot find module` | `npm install` |
| `Port 3000 in use` | Mudar PORT no .env |
| QR Code desapareceu | `npm start` novamente |
| API Key não funciona | Verificar saldo, copiar exato |
| WhatsApp não conecta | Deletar `.wwebjs_cache`, escanear novo QR |

---

## 📊 ESTRUTURA PASTA

```
meu-assistente/
├── bot-whatsapp-backend.js   (código principal)
├── package.json               (dependências)
├── .env                       (suas chaves - NÃO COMPARTILHE!)
├── .gitignore                 (proteção)
├── Dockerfile                 (para cloud)
├── README.md                  (documentação)
├── node_modules/              (criada pelo npm)
└── assistente.db              (banco de dados - criado depois)
```

---

## 💾 BACKUPS E DADOS

### Fazer Backup
```bash
cp assistente.db assistente.db.backup
```

### Restaurar Backup
```bash
cp assistente.db.backup assistente.db
```

### Deletar Banco (Recomeçar)
```bash
rm assistente.db
npm start  # Cria novo banco
```

---

## 🔐 SEGURANÇA - NÃO FAÇA ISSO!

```
❌ Não compartilhe .env
❌ Não coloque chaves no GitHub
❌ Não revele ANTHROPIC_API_KEY
❌ Não revele OPENAI_API_KEY
❌ Não faça push de senha para Git
```

---

## 🎯 CHECKLIST RÁPIDO

- [ ] Node.js instalado
- [ ] Pasta criada
- [ ] Arquivos copiados
- [ ] `.env` preenchido
- [ ] `npm install` feito
- [ ] `npm start` rodando
- [ ] QR Code escaneado
- [ ] Primeira mensagem testada
- [ ] Bot respondeu ✅

---

## 🆘 PRECISA DE AJUDA?

### Terminal Não Abre?
```
Windows: Win+R → cmd
Mac: Cmd+Space → Terminal
Linux: Ctrl+Alt+T
```

### Não Consegue Achar Pasta?
```
Windows Explorer → C:\Users\SeuUsuario
Mac Finder → Cmd+Shift+G → ~/meu-assistente
Linux: File Manager → Home → meu-assistente
```

### Não Sabe Copiar Arquivo?
```
Windows: Ctrl+C → Ctrl+V
Mac: Cmd+C → Cmd+V
Linux: Ctrl+C → Ctrl+V
```

---

## 📈 CUSTOS MENSAIS

| Serviço | Uso | Custo |
|---------|-----|-------|
| OpenAI Whisper | 10h/mês | R$ 24 |
| Claude API | 1000 msgs | R$ 15 |
| Railway | 24/7 | R$ 20 |
| **TOTAL** | | **R$ 59** |

**Ou GRÁTIS se rodar no seu PC!**

---

## 🚀 PRÓXIMOS PASSOS

### Depois de Funcionar
1. Testar vários exemplos
2. Explorar dashboard web
3. Fazer deploy na cloud
4. Adicionar automações

### Problemas?
- Ver TROUBLESHOOTING em README.md
- Ver IMPLEMENTACAO.md completo
- Consultar este Quick Reference

---

## 📞 CONTATOS ÚTEIS

### Suporte APIs
- OpenAI: https://help.openai.com
- Anthropic: https://support.anthropic.com

### Comunidades
- OpenAI Forum: https://community.openai.com
- GitHub: Procure por "whatsapp-web.js"

---

## ✅ VOCÊ ESTÁ PRONTO!

Salve este arquivo e consulte sempre que precisar.

**Boa sorte! 🚀**

---

**Atualizado:** Junho 2025
**Versão:** 1.0
**Status:** ✅ PRONTO PARA USAR
