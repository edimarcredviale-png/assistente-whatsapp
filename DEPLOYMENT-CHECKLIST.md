# ✅ Checklist de Deployment

## 🔐 SEGURANÇA (CRÍTICO)

### Chaves de API
- [ ] **Revogadas** chaves antigas em Anthropic
- [ ] **Revogadas** chaves antigas em OpenAI
- [ ] **Criadas** novas chaves em Anthropic
- [ ] **Criadas** novas chaves em OpenAI
- [ ] Chaves guardadas em local **seguro** (gerenciador de senhas)
- [ ] `.env` **não está** no Git
- [ ] `.env-old` **removido** do repositório
- [ ] `.gitignore` contém `.env`

### Histórico do Git
- [ ] Verificado que não há `.env` no histórico
- [ ] Verificado que não há chaves expostas
- [ ] Se houver, usar `git-filter-branch` ou `BFG Repo-Cleaner`

### Variáveis de Ambiente
- [ ] `ANTHROPIC_API_KEY` adicionada ao Railway
- [ ] `OPENAI_API_KEY` adicionada ao Railway
- [ ] `TWILIO_ACCOUNT_SID` adicionada ao Railway
- [ ] `TWILIO_AUTH_TOKEN` adicionada ao Railway
- [ ] `TWILIO_WHATSAPP_NUMBER` adicionada ao Railway
- [ ] `NODE_ENV=production` adicionada ao Railway

---

## 🚀 DEPLOYMENT (RAILWAY)

### Preparação
- [ ] Repositório GitHub sincronizado
- [ ] Todos os arquivos commitados
- [ ] Sem mudanças locais pendentes
- [ ] Branch `main` atualizado

### Banco de Dados
- [ ] PostgreSQL criado no Railway
- [ ] `DATABASE_URL` configurada automaticamente
- [ ] Conexão testada com sucesso
- [ ] Tabelas criadas automaticamente na primeira execução

### Serviço
- [ ] Projeto criado no Railway (`beneficial-solace`)
- [ ] Serviço `assistente-whatsapp` configurado
- [ ] Todas as variáveis de ambiente adicionadas
- [ ] Dockerfile está correto (porta 8080)
- [ ] `package.json` aponta para `bot-twilio-whatsapp.js`

### Deploy
- [ ] Deploy iniciado com sucesso
- [ ] Logs mostram "✅ Bot rodando na porta 8080"
- [ ] Logs mostram "🟢 PRONTO PARA PRODUÇÃO!"
- [ ] Sem erros de conexão com banco de dados
- [ ] Sem erros de módulos faltando

---

## 🔌 TWILIO (WEBHOOK)

### Configuração
- [ ] Conta Twilio criada/verificada
- [ ] WhatsApp Sandbox ativado (ou produção)
- [ ] Webhook URL configurado:
  ```
  https://seu-projeto-production-xxxx.up.railway.app/webhook/whatsapp
  ```
- [ ] Método HTTP: **POST**
- [ ] Webhook salvo com sucesso

### Teste
- [ ] Número de teste autorizado em `AUTHORIZED`
- [ ] Mensagem de teste enviada via WhatsApp
- [ ] Bot respondeu com sucesso
- [ ] Logs no Railway mostram a mensagem recebida

---

## 📊 FUNCIONALIDADES

### Despesas
- [ ] Mensagem: "Gastei 100 em almoço"
- [ ] Bot registra a despesa
- [ ] Dados persistem no PostgreSQL
- [ ] Categoria detectada automaticamente

### Agenda
- [ ] Mensagem: "Reunião amanhã às 14h"
- [ ] Bot registra o evento
- [ ] Dados persistem no PostgreSQL
- [ ] Data/hora parseadas corretamente

### Consultas
- [ ] Mensagem: "Quanto gastei este mês?"
- [ ] Bot responde com resumo
- [ ] Dados recuperados do banco

---

## 📈 MONITORAMENTO

### Logs
- [ ] Acessar Railway → Logs
- [ ] Procurar por erros (`❌`, `Error:`)
- [ ] Procurar por sucessos (`✅`, `OK`)
- [ ] Verificar timestamps das mensagens

### Performance
- [ ] Tempo de resposta < 2 segundos
- [ ] Sem timeouts
- [ ] Sem memory leaks
- [ ] CPU e memória normais

### Banco de Dados
- [ ] Conexão estável
- [ ] Queries executando corretamente
- [ ] Sem erros de constraint
- [ ] Dados sendo persistidos

---

## 🔄 ATUALIZAÇÕES

### Código
- [ ] Fazer mudanças localmente
- [ ] Testar com `npm run dev`
- [ ] Commit: `git commit -m "descrição"`
- [ ] Push: `git push origin main`
- [ ] Railway detecta e faz deploy automático

### Variáveis
- [ ] Alterar no Railway (não no `.env`)
- [ ] Salvar alterações
- [ ] Serviço reinicia automaticamente

---

## 🆘 TROUBLESHOOTING

### Se o bot não inicia
- [ ] Verificar logs no Railway
- [ ] Procurar por `Error:` ou `ECONNREFUSED`
- [ ] Confirmar que `DATABASE_URL` está configurada
- [ ] Confirmar que `ANTHROPIC_API_KEY` está configurada
- [ ] Tentar redeploy manual

### Se não conecta ao banco
- [ ] Verificar que PostgreSQL foi criado
- [ ] Confirmar que `DATABASE_URL` está correta
- [ ] Aguardar 1-2 minutos para o banco ficar pronto
- [ ] Tentar reconectar

### Se webhook não responde
- [ ] Verificar URL no Twilio
- [ ] Confirmar que URL está correta
- [ ] Testar com curl:
  ```bash
  curl https://seu-projeto-production-xxxx.up.railway.app/
  ```
- [ ] Deve retornar JSON com status

### Se bot não responde
- [ ] Verificar que número está em `AUTHORIZED`
- [ ] Confirmar que `ANTHROPIC_API_KEY` está correta
- [ ] Verificar logs para erros de API
- [ ] Tentar novamente após alguns segundos

---

## 📝 DOCUMENTAÇÃO

- [ ] README.md atualizado
- [ ] RAILWAY-SETUP.md completo
- [ ] Exemplos em API-EXEMPLOS.js
- [ ] Comentários no código

---

## 🎯 FINAL

- [ ] Tudo testado e funcionando
- [ ] Documentação completa
- [ ] Segurança verificada
- [ ] Pronto para produção

---

**Data de Conclusão:** _____/_____/_______  
**Responsável:** ________________________  
**Status:** ⬜ Não iniciado | 🟡 Em progresso | 🟢 Concluído

---

**Versão:** 1.0  
**Atualizado:** Junho 2026
