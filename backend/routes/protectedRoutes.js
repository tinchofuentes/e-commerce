const express = require('express');
const { verifyToken } = require('../middlewares/authMiddleware');

const router = express.Router();

router.get('/profile', verifyToken, (req, res) => {
    res.json({ message: 'Accediste a una ruta protegida', user: req.user });
});

module.exports = router;
