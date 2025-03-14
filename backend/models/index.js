const { sequelize } = require("../config/database");
const Product = require("./Product");
const User = require("./User");
const Order = require("./Order");
const OrderDetails = require("./OrderDetails");

// Definir relaciones
User.hasMany(Order, { foreignKey: "userId" });
Order.belongsTo(User, { foreignKey: "userId" });

Order.hasMany(OrderDetails, { foreignKey: "orderId" });
OrderDetails.belongsTo(Order, { foreignKey: "orderId" });

Product.hasMany(OrderDetails, { foreignKey: "productId" });
OrderDetails.belongsTo(Product, { foreignKey: "productId" });

module.exports = {
  sequelize,
  Product,
  User,
  Order,
  OrderDetails,
};
