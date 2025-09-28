# Usar la imagen oficial de Node.js como base
FROM node:18-alpine

# Establecer directorio de trabajo
WORKDIR /app

# Copiar package.json y package-lock.json
COPY package*.json ./

# Instalar dependencias
RUN npm install --production

# Copiar el código fuente
COPY . .

# Exponer el puerto
EXPOSE 3000

# Instalar curl para health checks
RUN apk add --no-cache curl

# Comando para ejecutar la aplicación
CMD ["node", "app.js"]