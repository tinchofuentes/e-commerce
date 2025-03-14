const express = require('express');
const authMiddleware = require('../middlewares/authMiddleware');

const router = express.Router();

router.get('/profile', authMiddleware, (req, res) => {
    res.json({ message: 'Accediste a una ruta protegida', user: req.user });
});

module.exports = router;
