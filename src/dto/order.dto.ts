// DTO para la creación de una orden
export interface CreateOrderDTO {
  customerId: number;  // El ID del cliente que realiza la orden
  date: Date;          // La fecha de la orden
  state: 'preparation' | 'ready' | 'delivered';  // Estado de la orden
  total_amount: number;  // El monto total de la orden
}

// DTO para la actualización de una orden
export interface UpdateOrderDTO {
  customerId?: number;
  date?: Date;
  state?: 'preparation' | 'ready' | 'delivered';
  total_amount?: number;
}
