"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authMiddleware = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret'; // Cambia este valor en producción
const authMiddleware = (roles) => {
    return (req, res, next) => {
        const token = req.header('Authorization')?.replace('Bearer ', '');
        console.log('Token recibido:', token); // Verifica si el token llega
        if (!token) {
            return res.status(401).json({ error: 'Acceso denegado. Token no proporcionado.' });
        }
        try {
            const decoded = jsonwebtoken_1.default.verify(token, JWT_SECRET);
            console.log('Token decodificado:', decoded); // Verifica el contenido del token decodificado
            if (roles.length && !roles.includes(decoded.rol)) {
                console.log('Acceso denegado, rol no permitido:', decoded.rol); // Verifica si el rol es el esperado
                return res.status(403).json({ error: 'Acceso denegado. No tienes permiso.' });
            }
            req.user = decoded;
            console.log('Usuario autenticado:', req.user); // Verifica que el usuario se ha asignado correctamente
            next();
        }
        catch (error) {
            console.log('Error en la verificación del token:', error); // Verifica si el error proviene de la verificación del token
            res.status(401).json({ error: 'Token inválido o expirado.' });
        }
    };
};
exports.authMiddleware = authMiddleware;
