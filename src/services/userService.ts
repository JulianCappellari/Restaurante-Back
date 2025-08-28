
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/User';
import { CreateUserDTO, UpdateUserDTO } from '../dto/user.dto';
import Address from '../models/Address';

const JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret';  // Cambia este valor en producción

// Registrar un nuevo usuario
export const registerUser = async (data: CreateUserDTO) => {
  try {
    const hashedPassword = await bcrypt.hash(data.password, 10);  // Encriptación de la contraseña
    const newUser = await User.create({
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
      phone: data.phone,
      password: hashedPassword,
      rol: data.rol,
      address: data.address ? Address.create(data.address) : undefined,
    });
    return newUser;
  } catch (error) {
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
      rol: user.rol,
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
  const user = await User.findByPk(id);
  if (!user) {
    throw new Error('Usuario no encontrado');
  }
  if (data.password) {
    data.password = await bcrypt.hash(data.password, 10);  // Encriptar la nueva contraseña
  }
  const updatedUser = await user.update(data);
  return updatedUser;
};

// Eliminar un usuario
export const deleteUser = async (id: number) => {
  const user = await User.findByPk(id);
  if (!user) {
    throw new Error('Usuario no encontrado');
  }
  await user.destroy();
};
