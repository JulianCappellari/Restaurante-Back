// src/dto/user.dto.ts
import { CreateAddressDTO, UpdateAddressDTO } from './address.dto';

export interface CreateUserDTO {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  password: string;
  role: 'Administrator' | 'Waiter' | 'Customer' | 'Receptionist' | 'Chef';
  address?: Omit<CreateAddressDTO, 'userId'>;
}

export interface UpdateUserDTO {
  firstName?: string;
  lastName?: string;
  email?: string;
  phone?: string;
  password?: string;
  role?: 'Administrator' | 'Waiter' | 'Customer' | 'Receptionist' | 'Chef';
  address?: UpdateAddressDTO;
}
