const express = require('express');
const OrderController = require('../controllers/OrderController');

const router = express.Router();

// Crear pedido - POST /order/createorder
router.post('/createorder', OrderController.createOrder);

// Actualizar estado del pedido - POST /order/updateorderstatus  
router.post('/updateorderstatus', OrderController.updateOrderStatus);

// Buscar pedido por id de cliente - POST /order/findorderbycustomerid
router.post('/findorderbycustomerid', OrderController.findOrderByCustomerId);

// Obtener todas las órdenes - GET /order/
router.get('/orders', OrderController.getAllOrders);

// Obtener una orden por ID - GET /order/:orderID
router.get('/orders/:orderID', OrderController.getOrderById);

module.exports = router;