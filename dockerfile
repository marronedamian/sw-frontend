# Etapa de build
FROM --platform=linux/amd64 node:20.11.1-bullseye AS builder

WORKDIR /app

# Copia los archivos de dependencias
COPY package*.json ./

# Copia el resto del código fuente
COPY . .

# Instala las dependencias de la aplicación
RUN npm install  

# Compila el código TypeScript
RUN npm run build

# Exponer el puerto para Next.js
EXPOSE 3020

# Ejecutar la aplicación
CMD ["npm", "run", "start"]