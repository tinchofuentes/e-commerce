const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../models/User');

// Generar un token
const generateToken = (user) => {
    return jwt.sign({ id: user.id, email: user.email, role: user.role }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRES_IN });
};

// Registro
const register = async (req, res) => {
    try {
        const { name, email, password, role } = req.body;

        // Verificar si el usuario ya existe
        let user = await User.findOne({ where: { email }, attributes: ['id', 'email', 'role'] });
        if (user) return res.status(400).json({ message: 'El usuario ya existe' });

        // Hashear la contraseña
        const hashedPassword = await bcrypt.hash(password, 10);

        // Crear usuario
        user = await User.create({ name, email, password: hashedPassword, role });

        // Generar token
        const token = generateToken(user);

        res.json({ token, user: { id: user.id, name:user.name, email: user.email, role: user.role } });
    } catch (error) {
        console.error('Error en el registro:', error);
        res.status(500).json({ message: 'Error en el servidor', error: error.message });
    }
};

// Login
const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ where: { email } });
        if (!user) return res.status(400).json({ message: 'El correo ingresado no se encuentra registrado' });

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ message: 'La contraseña ingresada es incorrecta' });

        const token = generateToken(user);

        res.json({ token, user: { id: user.id, email: user.email, role: user.role } });
    } catch (error) {
        res.status(500).json({ message: 'Error en el servidor' });
    }
};

module.exports = { register, login };