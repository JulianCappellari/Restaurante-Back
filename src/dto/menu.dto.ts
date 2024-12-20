// DTO para la creación de un plato del menú
export interface CreateMenuDTO {
  nameDish: string;
  price: number;
  available: boolean;
  imageUrl?: string; // Hacemos que imageUrl sea opcional
}

// DTO para la actualización de un plato del menú
export interface UpdateMenuDTO {
  nameDish?: string;  // Campos opcionales para actualización parcial
  price?: number;
  available?: boolean;
  imageUrl?: string; // Hacemos que imageUrl sea opcional
}
