"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const userController_1 = require("../controllers/userController");
const routerAuth = (0, express_1.Router)();
// Ruta para registrar un nuevo usuario
routerAuth.post('/register', userController_1.registerUserController);
// Ruta para iniciar sesión
routerAuth.post('/login', userController_1.loginUserController);
exports.default = routerAuth;
