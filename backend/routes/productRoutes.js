const express = require("express");
const { getProducts, createProduct, updateProduct, deleteProduct } = require("../controllers/productController");
const { isAdmin, verifyToken } = require("../middlewares/authMiddleware");

const router = express.Router();

router.get("/", getProducts);
router.post("/", verifyToken, isAdmin, createProduct);
router.put("/:id", verifyToken, isAdmin, updateProduct);
router.delete("/:id", verifyToken, isAdmin, deleteProduct);

module.exports = router;
