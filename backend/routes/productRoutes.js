const express = require("express");
const { productValidationRules } = require('../middlewares/validators');
const { validate } = require('express-validator');
const { getProducts, getProductById, createProduct, updateProduct, deleteProduct } = require("../controllers/productController");
const { isAdmin, verifyToken } = require("../middlewares/authMiddleware");

const router = express.Router();

// Obtener todos los productos
router.get("/", getProducts);

// Obtener un producto por ID
router.get("/:id", getProductById);

// Crear un nuevo producto (requiere autenticación y ser admin)
router.post("/", verifyToken, isAdmin, productValidationRules, validate, (req, res, next) => {
    if (req.errors) {
        return res.status(400).json({ errors: req.errors });
    }
    next();
}, createProduct);

// Actualizar un producto (requiere autenticación y ser admin)
router.put("/:id", verifyToken, isAdmin, productValidationRules, validate, (req, res, next) => {
    if (req.errors) {
        return res.status(400).json({ errors: req.errors });
    }
    next();
}, updateProduct);

// Eliminar un producto (requiere autenticación y ser admin)
router.delete("/:id", verifyToken, isAdmin, deleteProduct);

module.exports = router;
