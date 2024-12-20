
// DTO para la creación de una mesa
export interface CreateTableDTO {
    tableNum: number;  // El número de la mesa
    ability: number;   // La capacidad de la mesa (cantidad de personas)
    state: 'available' | 'reserved';  // El estado de la mesa (disponible o reservada)
  }
  
  // DTO para la actualización de una mesa
  export interface UpdateTableDTO {
    tableNum?: number;  // Número de la mesa
    ability?: number;   // Capacidad de la mesa
    state?: 'available' | 'reserved';  // Estado de la mesa
  }
  