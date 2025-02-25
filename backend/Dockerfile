# Usamos la imagen oficial de Node.js
FROM node:18

# Definimos el directorio de trabajo en el contenedor
WORKDIR /app

# Copiamos los archivos necesarios
COPY package.json package-lock.json ./

# Instalamos las dependencias
RUN npm install && npm install -g nodemon

# Copiamos el resto del código del backend
COPY . .

# Exponemos el puerto en el que corre el backend
EXPOSE 3000

# Comando para ejecutar el backend
CMD ["npm", "run", "dev"]
# CMD ["npm", "start"]
