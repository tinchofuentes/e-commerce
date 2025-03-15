require('dotenv').config();
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const { testConnection } = require('./config/database');

const app = express();

// Middleware para parsear JSON
app.use(express.json());
 // Middleware para logs de peticiones
app.use(morgan('dev'));
// Habilitar CORS temporalmente sin restricciones
//app.use(cors());
// Configurar CORS adecuadamente
app.use(cors({ origin: '*' }));

// Definir las diferentes rutas de la api
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/protected', require('./routes/protectedRoutes'));
app.use('/api/products', require('./routes/productRoutes'));

// Probar conexión a la base de datos
testConnection();

// Definir el puerto
const PORT = process.env.PORT || 5000;
// Definir credenciales de la base de datos
const DB_USER = process.env.DB_USER || 'root';
// const DB_PASSWORD = process.env.DB_PASSWORD || '';
const DB_NAME = process.env.DB_NAME || 'ecommerce';
// const JWT_SECRET = process.env.JWT_SECRET || 'default_secret';]

// Iniciar el servidor
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
    console.log(`Base de datos: ${DB_NAME} (Usuario: ${DB_USER})`);
});
