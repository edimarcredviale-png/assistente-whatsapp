# 🔐 Guia de Segurança

## ⚠️ SITUAÇÃO CRÍTICA: Chaves Expostas no GitHub

Seu repositório teve chaves de API expostas. Este guia mostra como resolver.

---

## 🚨 PASSO 1: Revogar Chaves Antigas

### Anthropic API
1. Acesse https://console.anthropic.com/account/keys
2. Procure pela chave antiga (a que estava no `.env-old`)
3. Clique em "Revoke"
4. Confirme a revogação
5. **A chave antiga não funcionará mais**

### OpenAI API
1. Acesse https://platform.openai.com/account/api-keys
2. Procure pela chave antiga
3. Clique em "Delete"
4. Confirme a exclusão
5. **A chave antiga não funcionará mais**

---

## ✅ PASSO 2: Criar Novas Chaves

### Anthropic API
1. Acesse https://console.anthropic.com/account/keys
2. Clique em "Create Key"
3. Dê um nome: "Assistente WhatsApp - Railway"
4. Clique em "Create"
5. **Copie a chave** (você só vê uma vez!)
6. Salve em local seguro

### OpenAI API
1. Acesse https://platform.openai.com/account/api-keys
2. Clique em "Create new secret key"
3. Dê um nome: "Assistente WhatsApp - Railway"
4. Clique em "Create secret key"
5. **Copie a chave** (você só vê uma vez!)
6. Salve em local seguro

---

## 🧹 PASSO 3: Limpar Histórico do Git

### Verificar se há `.env-old` no repositório

```bash
cd /home/ubuntu/assistente-whatsapp
git log --all --full-history -- .env-old
```

Se retornar algo, o arquivo está no histórico.

### Opção A: BFG Repo-Cleaner (Recomendado)

```bash
# 1. Instalar BFG
brew install bfg  # macOS
# ou
apt-get install bfg  # Linux

# 2. Clonar repositório em espelho
git clone --mirror https://github.com/edimarcredviale-png/assistente-whatsapp.git

# 3. Remover arquivo do histórico
bfg --delete-files .env-old assistente-whatsapp.git

# 4. Fazer push forçado
cd assistente-whatsapp.git
git reflog expire --expire=now --all
git gc --prune=now --aggressive
git push --mirror

# 5. Limpar
cd ..
rm -rf assistente-whatsapp.git
```

### Opção B: git-filter-branch (Alternativa)

```bash
# 1. Clonar repositório
git clone https://github.com/edimarcredviale-png/assistente-whatsapp.git
cd assistente-whatsapp

# 2. Remover arquivo do histórico
git filter-branch --tree-filter 'rm -f .env-old' -- --all

# 3. Fazer push forçado
git push origin --force --all
git push origin --force --tags

# 4. Limpar referências
git reflog expire --expire=now --all
git gc --prune=now --aggressive
```

---

## 🔒 PASSO 4: Configurar Proteção

### .gitignore (Verificar)

Seu `.gitignore` deve conter:

```
.env
.env.local
.env-old
.env-backup
.env.*.local
```

Se não tiver, adicione agora.

### Proteger Branch no GitHub

1. Acesse https://github.com/edimarcredviale-png/assistente-whatsapp
2. Vá para **Settings** → **Branches**
3. Clique em **Add rule**
4. Branch name pattern: `main`
5. Ative **Require pull request reviews**
6. Ative **Require status checks to pass**
7. Clique em **Create**

---

## 🛡️ PASSO 5: Usar Secrets Manager

### GitHub Secrets (Recomendado)

1. Acesse https://github.com/edimarcredviale-png/assistente-whatsapp
2. Vá para **Settings** → **Secrets and variables** → **Actions**
3. Clique em **New repository secret**
4. Adicione cada variável:

| Nome | Valor |
|------|-------|
| `ANTHROPIC_API_KEY` | sk-ant-... |
| `OPENAI_API_KEY` | sk-... |
| `TWILIO_ACCOUNT_SID` | AC... |
| `TWILIO_AUTH_TOKEN` | seu_token |

### Railway Secrets

1. Acesse https://railway.app
2. Vá para seu projeto
3. Clique em **Variables**
4. Adicione cada variável (não no código!)

---

## 📋 CHECKLIST DE SEGURANÇA

| Item | Status |
|------|--------|
| Chaves antigas revogadas em Anthropic | ☐ |
| Chaves antigas revogadas em OpenAI | ☐ |
| Novas chaves criadas em Anthropic | ☐ |
| Novas chaves criadas em OpenAI | ☐ |
| `.env-old` removido do histórico Git | ☐ |
| `.gitignore` contém `.env` | ☐ |
| Variáveis adicionadas ao Railway | ☐ |
| Branch `main` protegido no GitHub | ☐ |
| Nenhuma chave no código | ☐ |
| Nenhuma chave em comentários | ☐ |

---

## ⚡ BOAS PRÁTICAS

### ✅ FAÇA ISSO

- ✅ Use `.env.example` como template
- ✅ Adicione variáveis ao Railway/GitHub Secrets
- ✅ Revogue chaves comprometidas imediatamente
- ✅ Use nomes descritivos para chaves
- ✅ Rotação regular de chaves (a cada 3 meses)
- ✅ Monitore uso de API em dashboards

### ❌ NÃO FAÇA ISSO

- ❌ Nunca commite `.env`
- ❌ Nunca coloque chaves em código
- ❌ Nunca compartilhe chaves por email/chat
- ❌ Nunca deixe chaves em histórico do Git
- ❌ Nunca use mesma chave em múltiplos projetos
- ❌ Nunca compartilhe `.env` com outros

---

## 🔍 VERIFICAÇÃO FINAL

### Verificar se há chaves no repositório

```bash
# Procurar por padrões de chaves
git log -p | grep -i "sk-ant-\|sk-\|ANTHROPIC\|OPENAI"

# Se retornar algo, há chaves expostas!
```

### Verificar se `.env` está protegido

```bash
# Confirmar que .env está em .gitignore
cat .gitignore | grep ".env"

# Confirmar que não há .env no Git
git ls-files | grep ".env"
# Não deve retornar nada
```

---

## 📞 SUPORTE

Se encontrar problemas:

1. **GitHub**: https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/managing-your-personal-access-tokens
2. **Anthropic**: https://support.anthropic.com
3. **OpenAI**: https://help.openai.com
4. **Railway**: https://railway.app/support

---

## 📝 NOTAS IMPORTANTES

- **Chaves revogadas não podem ser recuperadas** — se perder a nova chave, crie outra
- **Histórico do Git é permanente** — mesmo deletando um arquivo, ele fica no histórico
- **BFG Repo-Cleaner é mais seguro** que `git-filter-branch`
- **Sempre faça backup** antes de limpar histórico
- **Teste localmente** antes de fazer push forçado

---

**Versão:** 1.0  
**Atualizado:** Junho 2026  
**Status:** ✅ Crítico - Ação Necessária
