"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteUser = exports.updateUser = exports.getUserByEmail = exports.authenticateUser = exports.registerUser = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const User_1 = __importDefault(require("../models/User"));
const Address_1 = __importDefault(require("../models/Address"));
const JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret'; // Cambia este valor en producción
// Registrar un nuevo usuario
const registerUser = async (data) => {
    try {
        const hashedPassword = await bcryptjs_1.default.hash(data.password, 10); // Encriptación de la contraseña
        const newUser = await User_1.default.create({
            firstName: data.firstName,
            lastName: data.lastName,
            email: data.email,
            phone: data.phone,
            password: hashedPassword,
            rol: data.rol,
            address: data.address ? Address_1.default.create(data.address) : undefined,
        });
        return newUser;
    }
    catch (error) {
        throw new Error(`Error al registrar el usuario: ${error instanceof Error ? error.message : 'Error inesperado'}`);
    }
};
exports.registerUser = registerUser;
// Autenticación de usuario (login)
const authenticateUser = async (email, password) => {
    const user = await User_1.default.findOne({ where: { email } });
    if (!user) {
        throw new Error('Usuario no encontrado');
    }
    const isPasswordValid = await bcryptjs_1.default.compare(password, user.password);
    if (!isPasswordValid) {
        throw new Error('Contraseña incorrecta');
    }
    const token = jsonwebtoken_1.default.sign({
        id: user.id,
        rol: user.rol,
        email: user.email,
    }, JWT_SECRET, { expiresIn: '1h' });
    return { token };
};
exports.authenticateUser = authenticateUser;
// Obtener información del usuario
const getUserByEmail = async (email) => {
    const user = await User_1.default.findOne({ where: { email } });
    if (!user) {
        throw new Error('Usuario no encontrado');
    }
    return user;
};
exports.getUserByEmail = getUserByEmail;
// Actualizar información del usuario
const updateUser = async (id, data) => {
    const user = await User_1.default.findByPk(id);
    if (!user) {
        throw new Error('Usuario no encontrado');
    }
    if (data.password) {
        data.password = await bcryptjs_1.default.hash(data.password, 10); // Encriptar la nueva contraseña
    }
    const updatedUser = await user.update(data);
    return updatedUser;
};
exports.updateUser = updateUser;
// Eliminar un usuario
const deleteUser = async (id) => {
    const user = await User_1.default.findByPk(id);
    if (!user) {
        throw new Error('Usuario no encontrado');
    }
    await user.destroy();
};
exports.deleteUser = deleteUser;
