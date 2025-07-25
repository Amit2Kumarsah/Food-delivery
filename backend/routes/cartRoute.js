const express  = require("express");
const { addToCart, removeFromCart, getCart } = require("../controllers/cartController");
const authMiddleware = require("../middleware/auth");

const multer = require("multer");
const upload = multer();

const cartRouter = express.Router();

// ✅ All routes must start with '/' and all handlers must be functions
cartRouter.post('/add', authMiddleware, addToCart);
cartRouter.post('/remove',  authMiddleware, removeFromCart);  // fixed: added '/' before 'remove'
cartRouter.post('/get', authMiddleware, getCart);            // fixed: added '/' before 'get'

module.exports = cartRouter;
