# Imagen base de Node.js
FROM node:20

# Establecer directorio de trabajo
WORKDIR /app

# Copiar archivos del frontend
COPY package*.json ./

# Instalar dependencias
RUN npm install

# Copiar el resto de los archivos
COPY . .

# Exponer el puerto
EXPOSE 5173

ENV HOST=0.0.0.0

# Comando para servir la aplicación
CMD ["npm", "run", "dev", "--", "--host", "0.0.0.0"]
