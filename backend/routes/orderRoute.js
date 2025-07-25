const express = require("express");
const authMiddleware = require("../middleware/auth");
const {placeOrder, userOrders, listOrders, updateStatus} = require("../controllers/orderController");

const orderRouter = express.Router();

orderRouter.post("/place", authMiddleware, placeOrder);
orderRouter.post("/userOrders",authMiddleware, userOrders );
orderRouter.get("/list", listOrders);
orderRouter.post("/status",updateStatus);


module.exports = orderRouter;