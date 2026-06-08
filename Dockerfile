FROM node:18-alpine

WORKDIR /app

# Copiar package.json e instalar dependências
COPY package*.json ./
RUN npm install --production

# Copiar código
COPY . .

# Expor porta dinâmica (Railway define via PORT env var)
EXPOSE 8080

# Comando de inicialização
CMD ["npm", "start"]
