// DTO para la creación de un inventario
export interface CreateInventoryDTO {
  name: string;
  amount: number;
  minimumThreshold: number;
}

// DTO para la actualización de un inventario
export interface UpdateInventoryDTO {
  name?: string;  // Campos opcionales para actualización parcial
  amount?: number;
  minimumThreshold?: number;
}
