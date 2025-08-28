"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const middlewareAuth_1 = require("../middleware/middlewareAuth"); // Middleware de autenticación
const reservaController_1 = require("../controllers/reservaController");
const inventoryController_1 = require("../controllers/inventoryController");
const menuController_1 = require("../controllers/menuController");
const orderController_1 = require("../controllers/orderController");
const tableController_1 = require("../controllers/tableController");
const userController_1 = require("../controllers/userController");
const addressController_1 = require("../controllers/addressController");
const paymentMethodController_1 = require("../controllers/paymentMethodController");
const orderItemController_1 = require("../controllers/orderItemController");
const dishCustomizationController_1 = require("../controllers/dishCustomizationController");
const routerApp = (0, express_1.Router)();
// Rutas para los usuarios
routerApp.get('/users/:email', userController_1.getUserByEmailController);
routerApp.put('/users/:id', (0, middlewareAuth_1.authMiddleware)(['Administrator', 'Customer']), userController_1.updateUserController);
routerApp.delete('/users/:id', (0, middlewareAuth_1.authMiddleware)(['Administrator']), userController_1.deleteUserController);
// Rutas para Reservas
routerApp.post("/reservas", (0, middlewareAuth_1.authMiddleware)(['Administrator', 'Waiter']), reservaController_1.createBookingController); // Solo Administradores y Camareros pueden crear
routerApp.get("/reservas", reservaController_1.getAllBookingsController); // Accesible a todos
routerApp.get("/reservas/:id", reservaController_1.getBookingByIdController); // Accesible a todos
routerApp.put("/reservas/:id", (0, middlewareAuth_1.authMiddleware)(['Administrator', 'Waiter']), reservaController_1.updateBookingController); // Solo Administradores y Camareros pueden actualizar
routerApp.delete("/reservas/:id", (0, middlewareAuth_1.authMiddleware)(['Administrator']), reservaController_1.deleteBookingController); // Solo Administradores pueden eliminar
// Rutas para Inventarios
routerApp.post("/inventarios", (0, middlewareAuth_1.authMiddleware)(['Administrator']), inventoryController_1.createInventoryController); // Solo Administradores pueden crear
routerApp.get("/inventarios", inventoryController_1.getAllInventoriesController); // Accesible a todos
routerApp.get("/inventarios/:id", inventoryController_1.getInventoryByIdController); // Accesible a todos
routerApp.put("/inventarios/:id", (0, middlewareAuth_1.authMiddleware)(['Administrator']), inventoryController_1.updateInventoryController); // Solo Administradores pueden actualizar
routerApp.delete("/inventarios/:id", (0, middlewareAuth_1.authMiddleware)(['Administrator']), inventoryController_1.deleteInventoryController); // Solo Administradores pueden eliminar
// Rutas para el Menú
routerApp.post("/menu", (0, middlewareAuth_1.authMiddleware)(['Administrator']), menuController_1.createMenuController); // Solo Administradores pueden crear
routerApp.get("/menu", menuController_1.getAllMenuItemsController); // Accesible a todos
routerApp.get("/menu/:id", menuController_1.getMenuByIdController); // Accesible a todos
routerApp.put("/menu/:id", (0, middlewareAuth_1.authMiddleware)(['Administrator']), menuController_1.updateMenuController); // Solo Administradores pueden actualizar
routerApp.delete("/menu/:id", (0, middlewareAuth_1.authMiddleware)(['Administrator']), menuController_1.deleteMenuItemController); // Solo Administradores pueden eliminar
// Rutas para Pedidos
routerApp.post("/orders", (0, middlewareAuth_1.authMiddleware)(['Administrator', 'Waiter', 'Customer']), orderController_1.createOrderController); // Solo Administradores y Camareros pueden crear
routerApp.get("/orders", orderController_1.getAllOrdersController); // Accesible a todos
routerApp.get("/orders/:id", orderController_1.getOrderByIdController); // Accesible a todos
routerApp.put("/orders/:id", (0, middlewareAuth_1.authMiddleware)(['Administrator', 'Waiter', 'Customer']), orderController_1.updateOrderController); // Solo Administradores y Camareros pueden actualizar
routerApp.delete("/orders/:id", (0, middlewareAuth_1.authMiddleware)(['Administrator']), orderController_1.deleteOrderController); // Solo Administradores pueden eliminar
routerApp.get("/orders/customer/:customerId", orderController_1.getOrdersByCustomerIdController); // Accesible a todos
// Rutas para Mesas
routerApp.post("/tables", (0, middlewareAuth_1.authMiddleware)(['Administrator']), tableController_1.createTableController); // Solo Administradores pueden crear
routerApp.get("/tables", tableController_1.getAllTablesController); // Accesible a todos
routerApp.get("/tables/:id", tableController_1.getTableByIdController); // Accesible a todos
routerApp.put("/tables/:id", (0, middlewareAuth_1.authMiddleware)(['Administrator']), tableController_1.updateTableController); // Solo Administradores pueden actualizar
routerApp.delete("/tables/:id", (0, middlewareAuth_1.authMiddleware)(['Administrator']), tableController_1.deleteTableController); // Solo Administradores pueden eliminar
// Rutas para Personalizaciones de Platos
routerApp.get("/menu/:menuId/customizations", dishCustomizationController_1.getDishCustomizationsByMenuIdController);
routerApp.get("/customizations/:id", dishCustomizationController_1.getDishCustomizationByIdController);
routerApp.post("/customizations", (0, middlewareAuth_1.authMiddleware)(['Administrator']), dishCustomizationController_1.createDishCustomizationController);
routerApp.put("/customizations/:id", (0, middlewareAuth_1.authMiddleware)(['Administrator']), dishCustomizationController_1.updateDishCustomizationController);
routerApp.delete("/customizations/:id", (0, middlewareAuth_1.authMiddleware)(['Administrator']), dishCustomizationController_1.deleteDishCustomizationController);
// Rutas para OrderItem
routerApp.post("/order-items", /* authMiddleware(['Administrator', 'Waiter']), */ orderItemController_1.createOrderItemController);
routerApp.get("/order-items", orderItemController_1.getAllOrderItemsController);
routerApp.get("/order-items/:id", orderItemController_1.getOrderItemByIdController);
routerApp.put("/order-items/:id", /* authMiddleware(['Administrator', 'Waiter']), */ orderItemController_1.updateOrderItemController);
routerApp.delete("/order-items/:id", /* authMiddleware(['Administrator', 'Waiter']), */ orderItemController_1.deleteOrderItemController);
// Rutas para Direcciones
routerApp.post('/addresses', (0, middlewareAuth_1.authMiddleware)(['Administrator', 'Customer']), addressController_1.createAddressController);
routerApp.get('/addresses/user/:userId', addressController_1.getAddressesByUserIdController);
routerApp.get('/addresses/:id', addressController_1.getAddressesByIdController);
routerApp.put('/addresses/:id', (0, middlewareAuth_1.authMiddleware)(['Administrator', 'Customer']), addressController_1.updateAddressController);
routerApp.delete('/addresses/:id', (0, middlewareAuth_1.authMiddleware)(['Administrator', 'Customer']), addressController_1.deleteAddressController);
// Rutas para Métodos de Pago
routerApp.post('/payment-methods', (0, middlewareAuth_1.authMiddleware)(['Customer', 'Administrator']), paymentMethodController_1.createPaymentMethod);
routerApp.put('/payment-methods/:id', (0, middlewareAuth_1.authMiddleware)(['Customer', 'Administrator']), paymentMethodController_1.updatePaymentMethod);
routerApp.delete('/payment-methods/:id', (0, middlewareAuth_1.authMiddleware)(['Customer', 'Administrator']), paymentMethodController_1.deletePaymentMethod);
routerApp.get('/payment-methods/:userId', (0, middlewareAuth_1.authMiddleware)(['Customer', 'Administrator']), paymentMethodController_1.getPaymentMethodsByUser);
routerApp.get('/payment-methods', (0, middlewareAuth_1.authMiddleware)(['Customer', 'Administrator']), paymentMethodController_1.getPaymentMethods);
exports.default = routerApp;
