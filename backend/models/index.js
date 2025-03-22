const { sequelize } = require("../config/database");
const Product = require("./Product");
const User = require("./User");
const Order = require("./Order");
const OrderDetails = require("./OrderDetails");

// Definir relaciones
User.hasMany(Order, { foreignKey: "userId" });
Order.belongsTo(User, { foreignKey: "userId" });

Order.hasMany(OrderDetails, { foreignKey: "orderId", onDelete: "CASCADE", onUpdate: "CASCADE" });
OrderDetails.belongsTo(Order, { foreignKey: "orderId", onDelete: "CASCADE", onUpdate: "CASCADE" });

Product.hasMany(OrderDetails, { foreignKey: "productId", onDelete: "CASCADE", onUpdate: "CASCADE" });
OrderDetails.belongsTo(Product, { foreignKey: "productId", onDelete: "CASCADE", onUpdate: "CASCADE" });

module.exports = {
  sequelize,
  Product,
  User,
  Order,
  OrderDetails,
};
