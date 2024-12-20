import { Request, Response } from 'express';
import { registerUser, authenticateUser, updateUser, deleteUser, getUserByEmail } from '../services/userService';
import { CreateUserDTO, UpdateUserDTO } from '../dto/user.dto';

// Registrar un nuevo usuario
export const registerUserController = async (req: Request, res: Response) => {
  try {
    const data: CreateUserDTO = req.body;
    const newUser = await registerUser(data);
    res.status(201).json(newUser);
  } catch (error) {
    res.status(500).json({ error: error instanceof Error ? error.message : 'Error inesperado' });
  }
};

// Autenticación de usuario (login)
export const loginUserController = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const { token } = await authenticateUser(email, password);
    res.status(200).json({ token });
  } catch (error) {
    res.status(401).json({ error: error instanceof Error ? error.message : 'Error inesperado' });
  }
};

// Obtener información del usuario
export const getUserByEmailController = async (req: Request, res: Response) => {
  const { email } = req.params;
  try {
    const user = await getUserByEmail(String(email));
    res.status(200).json(user);
  } catch (error) {
    res.status(404).json({ error: error instanceof Error ? error.message : 'Usuario no encontrado' });
  }
};

// Actualizar información del usuario
export const updateUserController = async (req: Request, res: Response) => {
  const { id } = req.params;
  const data: UpdateUserDTO = req.body;
  try {
    const updatedUser = await updateUser(Number(id), data);
    res.status(200).json(updatedUser);
  } catch (error) {
    res.status(500).json({ error: error instanceof Error ? error.message : 'Error inesperado' });
  }
};

// Eliminar un usuario
export const deleteUserController = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    await deleteUser(Number(id));
    res.status(200).json({ message: 'Usuario eliminado' });
  } catch (error) {
    res.status(500).json({ error: error instanceof Error ? error.message : 'Error inesperado' });
  }
};
