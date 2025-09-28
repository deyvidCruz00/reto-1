class UpdateOrderStatusDto {
  constructor(orderID, status) {
    this.orderID = orderID;
    this.status = status;
  }

  validate() {
    const errors = [];
    
    if (!this.orderID || this.orderID.trim() === '') {
      errors.push('Order ID is required');
    }
    
    if (!this.status || !['Received', 'In progress', 'Sended'].includes(this.status)) {
      errors.push('Status must be one of: Received, In progress, Sended');
    }
    
    return {
      isValid: errors.length === 0,
      errors
    };
  }
}

module.exports = UpdateOrderStatusDto;