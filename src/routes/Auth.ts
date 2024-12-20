import { Router } from 'express';
import { registerUserController, loginUserController } from '../controllers/userController';

const routerAuth = Router();

// Ruta para registrar un nuevo usuario
routerAuth.post('/register', registerUserController);

// Ruta para iniciar sesión
routerAuth.post('/login', loginUserController);

export default routerAuth;
