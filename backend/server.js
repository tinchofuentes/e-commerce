require('dotenv').config();
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');

const app = express();

// Definir el puerto
const PORT = process.env.PORT || 5000;

// Middleware para parsear JSON
app.use(express.json());
 // Middleware para logs de peticiones
app.use(morgan('dev'));
// Habilitar CORS temporalmente sin restricciones
app.use(cors());

// Endpoint de prueba
app.get('/ping', (req, res) => {
    res.send('pong');
});

// Iniciar el servidor
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
