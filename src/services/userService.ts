
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/User';
import { CreateUserDTO, UpdateUserDTO } from '../dto/user.dto';
import Address from '../models/Address';

const JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret';  // Cambia este valor en producción

// Registrar un nuevo usuario
export const registerUser = async (data: CreateUserDTO) => {
  const transaction = await User.sequelize!.transaction();
  try {
    const hashedPassword = await bcrypt.hash(data.password, 10);  // Encriptación de la contraseña
    
    // Create user first
    const newUser = await User.create({
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
      phone: data.phone,
      password: hashedPassword,
      role: data.role,
    }, { transaction });

    // Then create address if provided
    if (data.address) {
      await Address.create({
        ...data.address,
        userId: newUser.id,
      }, { transaction });
    }

    await transaction.commit();
    return newUser;
  } catch (error) {
    await transaction.rollback();
    throw new Error(`Error al registrar el usuario: ${error instanceof Error ? error.message : 'Error inesperado'}`);
  }
};

// Autenticación de usuario (login)
export const authenticateUser = async (email: string, password: string) => {
  const user = await User.findOne({ where: { email } });
  if (!user) {
    throw new Error('Usuario no encontrado');
  }
  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    throw new Error('Contraseña incorrecta');
  }
  const token = jwt.sign(
    {
      id: user.id,
      role: user.role,
      email: user.email, 
    },
    JWT_SECRET,
    { expiresIn: '1h' }
  );
  return { token };
};

// Obtener información del usuario
export const getUserByEmail = async (email: string) => {
  const user = await User.findOne({where: {email}});
  if (!user) {
    throw new Error('Usuario no encontrado');
  }
  return user;
};

// Actualizar información del usuario
export const updateUser = async (id: number, data: UpdateUserDTO) => {
  const transaction = await User.sequelize!.transaction();
  try {
    const user = await User.findByPk(id, { transaction });
    if (!user) {
      throw new Error('Usuario no encontrado');
    }

    // Update user fields
    if (data.password) {
      data.password = await bcrypt.hash(data.password, 10);  // Encriptar la nueva contraseña
    }
    
    // Remove address from data to avoid Sequelize errors
    const { address, ...userData } = data;
    const updatedUser = await user.update(userData, { transaction });

    // Update address if provided
    if (address) {
      const requiredFields = ['street', 'streetNumber', 'city', 'province', 'postalCode'] as const;
      const missingFields = requiredFields.filter(field => address[field] === undefined);
      
      if (missingFields.length > 0) {
        throw new Error(`Faltan campos requeridos para la dirección: ${missingFields.join(', ')}`);
      }
      
      const existingAddress = await Address.findOne({ where: { userId: id }, transaction });
      if (existingAddress) {
        await existingAddress.update({
          street: address.street!,
          streetNumber: address.streetNumber!,
          city: address.city!,
          province: address.province!,
          postalCode: address.postalCode!,
          floor: address.floor,
          apartment: address.apartment
        }, { transaction });
      } else {
        await Address.create({
          street: address.street!,
          streetNumber: address.streetNumber!,
          city: address.city!,
          province: address.province!,
          postalCode: address.postalCode!,
          floor: address.floor,
          apartment: address.apartment,
          userId: id
        }, { transaction });
      }
    }

    await transaction.commit();
    return updatedUser;
  } catch (error) {
    await transaction.rollback();
    throw error;
  }
};

// Eliminar un usuario
export const deleteUser = async (id: number) => {
  const transaction = await User.sequelize!.transaction();
  try {
    const user = await User.findByPk(id, { transaction });
    if (!user) {
      throw new Error('Usuario no encontrado');
    }
    
    // Delete associated address if it exists
    await Address.destroy({ where: { userId: id }, transaction });
    
    // Delete the user
    await user.destroy({ transaction });
    
    await transaction.commit();
  } catch (error) {
    await transaction.rollback();
    throw error;
  }
};
