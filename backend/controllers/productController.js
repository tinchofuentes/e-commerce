const Product = require('../models/Product');

// Obtener todos los productos
const getProducts = async (req, res) => {
    try {
        const products = await Product.findAll();
        res.json(products);
    } catch (error) {
        res.status(500).json({ message: "Error al obtener productos", error });
    }
};

// Obtener un producto por su ID
const getProductById = async (req, res) => {
    try {
        const { id } = req.params;
        const product = await Product.findByPk(id);

        if (!product) {
            return res.status(404).json({ message: "Producto no encontrado" });
        }

        res.json(product);
    } catch (error) {
        res.status(500).json({ message: "Error al obtener producto", error });
    }
};

// Crear un nuevo producto
const createProduct = async (req, res) => {
    try {
        const { name, description, price, stock } = req.body;
        const newProduct = await Product.create({ name, description, price, stock });
        res.status(201).json(newProduct);
    } catch (error) {
        res.status(500).json({ message: "Error al crear producto", error });
    }
};

// Actualizar un producto existente
const updateProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, price, stock } = req.body;
        const product = await Product.findByPk(id);

        if (!product) {
            return res.status(404).json({ message: "Producto no encontrado" });
        }

        await product.update({ name, price, stock });
        res.json(product);
    } catch (error) {
        res.status(500).json({ message: "Error al actualizar producto", error });
    }
};

// Eliminar un producto
const deleteProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const product = await Product.findByPk(id);

        if (!product) {
            return res.status(404).json({ message: "Producto no encontrado" });
        }

        await product.destroy();
        res.json({ message: "Producto eliminado correctamente" });
    } catch (error) {
        res.status(500).json({ message: "Error al eliminar producto", error });
    }
};

module.exports = { getProducts, getProductById, createProduct, updateProduct, deleteProduct };
