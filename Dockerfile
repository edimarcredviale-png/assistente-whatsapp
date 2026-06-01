FROM node:18-alpine

# Instalar dependências do sistema para Puppeteer
RUN apk add --no-cache \
    chromium \
    ca-certificates

WORKDIR /app

# Copiar arquivos
COPY package*.json ./
COPY bot-whatsapp-backend.js ./

# Instalar dependências
RUN npm install --production

# Criar diretórios necessários
RUN mkdir -p temp .wwebjs_cache .wwebjs_auth

# Expor porta
EXPOSE 3000

# Health check
HEALTHCHECK --interval=30s --timeout=10s --start-period=40s --retries=3 \
    CMD node -e "require('http').get('http://localhost:3000/api/status', (r) => {if (r.statusCode !== 200) throw new Error(r.statusCode)})"

# Iniciar bot
CMD ["npm", "start"]
