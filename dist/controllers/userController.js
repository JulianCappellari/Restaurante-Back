"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteUserController = exports.updateUserController = exports.getUserByEmailController = exports.loginUserController = exports.registerUserController = void 0;
const userService_1 = require("../services/userService");
// Registrar un nuevo usuario
const registerUserController = async (req, res) => {
    try {
        const data = req.body;
        const newUser = await (0, userService_1.registerUser)(data);
        res.status(201).json(newUser);
    }
    catch (error) {
        res.status(500).json({ error: error instanceof Error ? error.message : 'Error inesperado' });
    }
};
exports.registerUserController = registerUserController;
// Autenticación de usuario (login)
const loginUserController = async (req, res) => {
    try {
        const { email, password } = req.body;
        const { token } = await (0, userService_1.authenticateUser)(email, password);
        res.status(200).json({ token });
    }
    catch (error) {
        res.status(401).json({ error: error instanceof Error ? error.message : 'Error inesperado' });
    }
};
exports.loginUserController = loginUserController;
// Obtener información del usuario
const getUserByEmailController = async (req, res) => {
    const { email } = req.params;
    try {
        const user = await (0, userService_1.getUserByEmail)(String(email));
        res.status(200).json(user);
    }
    catch (error) {
        res.status(404).json({ error: error instanceof Error ? error.message : 'Usuario no encontrado' });
    }
};
exports.getUserByEmailController = getUserByEmailController;
// Actualizar información del usuario
const updateUserController = async (req, res) => {
    const { id } = req.params;
    const data = req.body;
    try {
        const updatedUser = await (0, userService_1.updateUser)(Number(id), data);
        res.status(200).json(updatedUser);
    }
    catch (error) {
        res.status(500).json({ error: error instanceof Error ? error.message : 'Error inesperado' });
    }
};
exports.updateUserController = updateUserController;
// Eliminar un usuario
const deleteUserController = async (req, res) => {
    const { id } = req.params;
    try {
        await (0, userService_1.deleteUser)(Number(id));
        res.status(200).json({ message: 'Usuario eliminado' });
    }
    catch (error) {
        res.status(500).json({ error: error instanceof Error ? error.message : 'Error inesperado' });
    }
};
exports.deleteUserController = deleteUserController;
