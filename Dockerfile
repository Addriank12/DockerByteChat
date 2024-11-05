# Usar una imagen base de Node.js
FROM node:20.17.0 AS build

# Crear el directorio de trabajo para Angular
WORKDIR /app/frontend

# Copiar los archivos package.json y package-lock.json de Angular
COPY FrontEnd/package*.json ./

# Instalar las dependencias de Angular
RUN npm install

# Copiar el resto de la aplicación Angular
COPY FrontEnd/ ./

# Construir la aplicación Angular
RUN npm run build --prod

# Crear el directorio de trabajo para el servidor Node.js
WORKDIR /app/backend

# Copiar los archivos package.json y package-lock.json del servidor Node.js
COPY Socket/package*.json ./

# Instalar las dependencias del servidor Node.js
RUN npm install -g http-server
RUN npm install

# Copiar el resto del código del servidor Node.js
COPY Socket ./

# Exponer los puertos necesarios
EXPOSE 80 3000

# Comando para iniciar ambos servidores
CMD ["sh", "-c", "node /app/backend/app.js & npx http-server /app/frontend/dist/byte-chat/browser -p 80"]
