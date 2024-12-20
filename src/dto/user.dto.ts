// src/dto/user.dto.ts

export interface CreateUserDTO {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  rol: 'Administrator' | 'Waiter' | 'Customer';
}

export interface UpdateUserDTO {
  firstName?: string;
  lastName?: string;
  email?: string;
  password?: string;
  rol?: 'Administrator' | 'Waiter' | 'Customer';
}
