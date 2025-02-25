# Usamos la imagen oficial de Node.js
FROM node:18

# Definimos el directorio de trabajo
WORKDIR /app

# Copiamos los archivos necesarios
COPY package.json package-lock.json ./

# Instalamos las dependencias
RUN npm install

# Copiamos el código del frontend
COPY . .

# Construimos la aplicación
RUN npm run build

# Usamos una imagen de servidor web para servir la app
FROM nginx:alpine
COPY --from=0 /app/build /usr/share/nginx/html

# Exponemos el puerto en el que corre el frontend
EXPOSE 80

# Nginx ya tiene un CMD por defecto, no necesitamos definirlo.
