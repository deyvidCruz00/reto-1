class OrderResponseDto {
  constructor(order) {
    this.customerID = order.customerID;
    this.orderID = order.orderID;
    this.status = order.status;
  }

  static fromOrder(order) {
    return new OrderResponseDto(order);
  }

  static fromOrders(orders) {
    return orders.map(order => new OrderResponseDto(order));
  }
}

module.exports = OrderResponseDto;