const OrderService = require('../services/OrderService');
const CreateOrderDto = require('../dto/CreateOrderDto');
const UpdateOrderStatusDto = require('../dto/UpdateOrderStatusDto');

class OrderController {

  async createOrder(req, res) {
    try {
      const { customerid, orderID, status } = req.body;
      
      const createOrderDto = new CreateOrderDto(customerid, orderID, status);
      const result = await OrderService.createOrder(createOrderDto);
      
      res.status(201).json(result);
    } catch (error) {
      console.error('Error in createOrder:', error);
      res.status(400).json({ 
        error: error.message,
        orderCreated: false 
      });
    }
  }

  async updateOrderStatus(req, res) {
    try {
      const { orderID, status } = req.body;
      
      const updateOrderStatusDto = new UpdateOrderStatusDto(orderID, status);
      const result = await OrderService.updateOrderStatus(updateOrderStatusDto);
      
      res.status(200).json(result);
    } catch (error) {
      console.error('Error in updateOrderStatus:', error);
      res.status(400).json({ 
        error: error.message,
        orderStatusUpdated: false 
      });
    }
  }

  async findOrderByCustomerId(req, res) {
    try {
      const { customerid } = req.body;
      
      const orders = await OrderService.findOrdersByCustomerId(customerid);
      
      res.status(200).json(orders);
    } catch (error) {
      console.error('Error in findOrderByCustomerId:', error);
      res.status(400).json({ 
        error: error.message 
      });
    }
  }
}

module.exports = new OrderController();