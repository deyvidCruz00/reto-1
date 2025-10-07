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

  async getAllOrders() {
    try {
      const orders = await Order.find();
      
      if (orders.length === 0) {
        return [];
      }

      // Convertir a DTOs de respuesta
      return OrderResponseDto.fromOrders(orders);
    } catch (error) {
      console.error('Error getting all orders:', error);
      throw error;
    }
  }

  async getOrderById(orderID) {
  try {
    // Validar que se proporcione el orderID
    if (!orderID || orderID.trim() === '') {
      throw new Error('Order ID is required');
    }

    // ✅ CAMBIO PRINCIPAL: Usar findOne con orderID en lugar de findById
    const order = await Order.findOne({ orderID: orderID });
    
    // Verificar si se encontró la orden
    if (!order) {
      throw new Error('Order not found');
    }

    // ✅ CAMBIO: Usar fromOrders con array de una orden
    return OrderResponseDto.fromOrders([order])[0];
  } catch (error) {
    console.error('Error getting order by ID:', error);
    throw error;
  }
}
}

module.exports = new OrderService();