import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';

const JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret';  // Cambia este valor en producción

interface JwtPayloadWithInfo extends jwt.JwtPayload {
  id: number;
  rol: 'Administrator' | 'Waiter' | 'Customer';
  email: string;
}
declare global {
  namespace Express {
    interface Request {
      user?: JwtPayloadWithInfo;
    }
  }
}

export const authMiddleware = (roles: string[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const token = req.header('Authorization')?.replace('Bearer ', '');
    console.log('Token recibido:', token);  // Verifica si el token llega

    if (!token) {
      return res.status(401).json({ error: 'Acceso denegado. Token no proporcionado.' });
    }

    try {
      const decoded = jwt.verify(token, JWT_SECRET) as JwtPayloadWithInfo;
      console.log('Token decodificado:', decoded);  // Verifica el contenido del token decodificado

      if (roles.length && !roles.includes(decoded.rol)) {
        console.log('Acceso denegado, rol no permitido:', decoded.rol);  // Verifica si el rol es el esperado
        return res.status(403).json({ error: 'Acceso denegado. No tienes permiso.' });
      }

      req.user = decoded;
      console.log('Usuario autenticado:', req.user);  // Verifica que el usuario se ha asignado correctamente
      next();
    } catch (error) {
      console.log('Error en la verificación del token:', error);  // Verifica si el error proviene de la verificación del token
      res.status(401).json({ error: 'Token inválido o expirado.' });
    }
  };
};
