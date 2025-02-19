# Usar una imagen base de Node.js
FROM node:20

# Crear y establecer el directorio de trabajo en el contenedor
WORKDIR /app

# Copiar el archivo package.json y package-lock.json (si existe)
COPY package*.json ./

# Instalar las dependencias de la aplicación
RUN npm install

# Copiar todo el código fuente del backend
COPY . .

# Exponer el puerto en el que la app estará escuchando
EXPOSE 5000

# Comando para ejecutar la aplicación
CMD ["npm", "start"]
