// src/dto/user.dto.ts



export interface CreateUserDTO {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  password: string;
  rol: 'Administrator' | 'Waiter' | 'Customer';
  // address?: AddressDTO;
}

export interface UpdateUserDTO {
  firstName?: string;
  lastName?: string;
  email?: string;
  phone?: string;
  password?: string;
  rol?: 'Administrator' | 'Waiter' | 'Customer';
  // address?: AddressDTO;
}
