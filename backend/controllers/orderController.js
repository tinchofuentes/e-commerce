const { Order, OrderDetails, Product, User } = require("../models");

// Crear una nueva orden
const createOrder = async (req, res) => {
    try {
        const { products } = req.body; // Array de objetos con { productId, quantity }

        if (!products || products.length === 0) {
            return res.status(400).json({ message: "La orden debe contener al menos un producto." });
        }

        let totalPrice = 0;
        // Verificar que los productos existan y calcular el precio total
        for (const item of products) {
            const product = await Product.findByPk(item.productId);
            if (!product) {
                return res.status(400).json({ message: `Producto con ID ${item.productId} no encontrado.` });
            }
            totalPrice += product.price * item.quantity;
        }

        // Crear la orden
        const newOrder = await Order.create({
            userId: req.user.id,
            totalPrice,
        });

        // Crear los detalles de la orden
        for (const item of products) {
            await OrderDetails.create({
                orderId: newOrder.id,
                productId: item.productId,
                quantity: item.quantity,
                price: (await Product.findByPk(item.productId)).price,
            });
        }

        res.status(201).json(newOrder);
    } catch (error) {
        console.error('Error al crear la orden:', error);
        res.status(500).json({ message: 'Error al crear la orden', error: error.message });
    }
};

// Obtener todas las órdenes de un usuario
const getOrders = async (req, res) => {
    try {
        const orders = await Order.findAll({
            where: { userId: req.user.id },
            include: [
                {
                    model: OrderDetails,
                    include: [
                        {
                            model: Product,
                            attributes: ["id", "name", "price"], // Asegura que se incluyan solo los campos necesarios
                        },
                    ],
                },
                {
                    model: User,
                    attributes: ["id", "name", "email"], // Si quieres incluir el usuario
                },
            ],
        });
        res.json(orders);
    } catch (error) {
        res.status(500).json({ message: "Error al obtener las órdenes", error });
    }
};

// Obtener una orden por su ID
const getOrderById = async (req, res) => {
    try {
        const { id } = req.params;
        const order = await Order.findByPk(id, {
            include: [
                {
                    model: OrderDetails,
                    include: [Product],
                },
            ],
        });

        if (!order) {
            return res.status(404).json({ message: "Orden no encontrada." });
        }

        if (order.userId !== req.user.id) {
            return res.status(403).json({ message: "No tienes permiso para ver esta orden." });
        }

        res.json(order);
    } catch (error) {
        res.status(500).json({ message: "Error al obtener la orden", error });
    }
};

// Actualizar el estado de una orden
const updateOrderStatus = async (req, res) => {
    try {
        const { id } = req.params;
        const { status } = req.body;

        const validStatuses = ["pending", "completed", "canceled"];
        if (!validStatuses.includes(status)) {
            return res.status(400).json({ message: "Estado no válido." });
        }

        const order = await Order.findByPk(id);

        if (!order) {
            return res.status(404).json({ message: "Orden no encontrada." });
        }

        // Verificar que el usuario sea el propietario de la orden o un admin
        if (order.userId !== req.user.id && req.user.role !== "admin") {
            return res.status(403).json({ message: "No tienes permiso para actualizar esta orden." });
        }

        order.status = status;
        await order.save();

        res.json(order);
    } catch (error) {
        res.status(500).json({ message: "Error al actualizar el estado de la orden", error });
    }
};

// Eliminar una orden
const deleteOrder = async (req, res) => {
    try {
        const { id } = req.params;

        const order = await Order.findByPk(id);

        if (!order) {
            return res.status(404).json({ message: "Orden no encontrada." });
        }

        // Verificar que el usuario sea el propietario de la orden o un admin
        if (order.userId !== req.user.id && req.user.role !== "admin") {
            return res.status(403).json({ message: "No tienes permiso para eliminar esta orden." });
        }

        await order.destroy();
        res.json({ message: "Orden eliminada correctamente" });
    } catch (error) {
        res.status(500).json({ message: "Error al eliminar la orden", error });
    }
};

module.exports = { createOrder, getOrders, getOrderById, updateOrderStatus, deleteOrder };
