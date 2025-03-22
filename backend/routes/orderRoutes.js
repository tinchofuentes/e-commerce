const express = require('express');
const { orderValidationRules } = require('../middlewares/validators');
const { validate } = require('express-validator');
const { verifyToken, isAdmin } = require('../middlewares/authMiddleware');
const {
    createOrder,
    getOrders,
    getOrderById,
    updateOrderStatus,
    deleteOrder,
} = require('../controllers/orderController');

const router = express.Router();

// Crear una nueva orden
router.post('/', verifyToken, orderValidationRules, validate, (req, res, next) => {
    // Si hay errores de validación, detendremos el flujo y responderemos con los errores
    if (req.errors) {
        return res.status(400).json({ errors: req.errors });
    }
    next();
}, createOrder);

// Obtener todas las órdenes de un usuario
router.get('/', verifyToken, getOrders);

// Obtener una orden por ID
router.get('/:id', verifyToken, getOrderById);

// Actualizar el estado de una orden
router.put('/:id/status', verifyToken, isAdmin, updateOrderStatus);

// Eliminar una orden
router.delete('/:id', verifyToken, isAdmin, deleteOrder);

module.exports = router;
