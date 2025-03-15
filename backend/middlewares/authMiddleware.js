const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
    let token = req.header('Authorization');

    if (!token) {
        return res.status(401).json({ message: 'Acceso denegado. Token no proporcionado.' });
    }

    // Si el token viene con el prefijo "Bearer ", lo eliminamos
    if (token.startsWith('Bearer ')) {
        token = token.split(' ')[1]; // Extraemos solo el token real
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded; // Adjunta los datos del usuario a la request
        next();
    } catch (error) {
        return res.status(401).json({ message: 'Token inválido.' });
    }
};

// isAdmin to handle products
const isAdmin = (req, res, next) => {
    if (!req.user || req.user.role !== "admin") {
        return res.status(403).json({ message: "Acceso denegado. Se requieren permisos de administrador." });
    }
    next();
};

module.exports = { verifyToken, isAdmin};