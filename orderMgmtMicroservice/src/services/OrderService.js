const Order = require('../models/Order');
const CreateOrderDto = require('../dto/CreateOrderDto');
const UpdateOrderStatusDto = require('../dto/UpdateOrderStatusDto');
const OrderResponseDto = require('../dto/OrderResponseDto');

class OrderService {
  
  async createOrder(createOrderDto) {
    try {
      // Validar DTO
      const validation = createOrderDto.validate();
      if (!validation.isValid) {
        throw new Error(validation.errors.join(', '));
      }

      // Verificar si ya existe un pedido con el mismo orderID
      const existingOrder = await Order.findOne({ orderID: createOrderDto.orderID });
      if (existingOrder) {
        throw new Error('Order ID already exists');
      }

      // Crear el pedido
      const order = new Order({
        customerID: createOrderDto.customerID,
        orderID: createOrderDto.orderID,
        status: createOrderDto.status
      });

      await order.save();
      
      return { orderCreated: true };
    } catch (error) {
      console.error('Error creating order:', error);
      throw error;
    }
  }

  async updateOrderStatus(updateOrderStatusDto) {
    try {
      // Validar DTO
      const validation = updateOrderStatusDto.validate();
      if (!validation.isValid) {
        throw new Error(validation.errors.join(', '));
      }

      // Buscar y actualizar el pedido
      const order = await Order.findOne({ orderID: updateOrderStatusDto.orderID });
      if (!order) {
        throw new Error('Order not found');
      }

      order.status = updateOrderStatusDto.status;
      await order.save();

      return { orderStatusUpdated: true };
    } catch (error) {
      console.error('Error updating order status:', error);
      throw error;
    }
  }

  async findOrdersByCustomerId(customerID) {
    try {
      if (!customerID || customerID.trim() === '') {
        throw new Error('Customer ID is required');
      }

      const orders = await Order.find({ customerID: customerID });
      
      if (orders.length === 0) {
        return [];
      }

      // Convertir a DTOs de respuesta
      return OrderResponseDto.fromOrders(orders);
    } catch (error) {
      console.error('Error finding orders by customer ID:', error);
      throw error;
    }
  }
}

module.exports = new OrderService();