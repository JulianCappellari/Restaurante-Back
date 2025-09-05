import { Router } from "express";
import { authMiddleware } from "../middleware/middlewareAuth"; // Middleware de autenticación
import { middlewareValidator } from "../middleware/middlewareValidator"; // Middleware adicional para validaciones, si es necesario
import { 
  createBookingController, deleteBookingController, getAllBookingsController, getBookingByIdController, updateBookingController 
} from "../controllers/reservaController";
import { createBooking, getBooking, cancelBooking } from "../controllers/bookingController";
import { 
  createInventoryController, deleteInventoryController, getAllInventoriesController, getInventoryByIdController, updateInventoryController 
} from '../controllers/inventoryController';
import { 
  createMenuController, deleteMenuItemController, getAllMenuItemsController, getMenuByIdController, updateMenuController 
} from '../controllers/menuController';
import { 
  createOrderController, deleteOrderController, getAllOrdersController, getOrderByIdController, getOrdersByCustomerIdController, updateOrderController 
} from '../controllers/orderController';
import { 
  createTableController, deleteTableController, getAllTablesController, getTableByIdController, updateTableController 
} from '../controllers/tableController';
import { deleteUserController, getUserByEmailController, updateUserController } from "../controllers/userController";
import {
  createTableSessionController,
  deleteTableSessionController,
  getActiveSessionsController,
  getSessionByIdController,
  getTableSessionsController,
  updateTableSessionController
} from '../controllers/tableSessionController';

import { 
  createAddressController,
  deleteAddressController,
  getAddressesByUserIdController,
  updateAddressController,
  getAddressesByIdController
} from '../controllers/addressController';

import { 
  createPaymentMethod, 
  getPaymentMethods, 
  getPaymentMethodsByUser, 
  updatePaymentMethod, 
  deletePaymentMethod 
} from '../controllers/paymentMethodController';


import { 
  getAllOrderItemsController, 
  createOrderItemController, 
  getOrderItemByIdController, 
  updateOrderItemController, 
  deleteOrderItemController 
} from '../controllers/orderItemController';

import { 
  createDishCustomizationController,
  getDishCustomizationsByMenuIdController,
  getDishCustomizationByIdController,
  updateDishCustomizationController,
  deleteDishCustomizationController
} from '../controllers/dishCustomizationController';
import { checkAvailability } from "../controllers/availabilityController";



const routerApp = Router();

// Rutas para los usuarios
routerApp.get('/users/:email',  getUserByEmailController);
routerApp.put('/users/:id', authMiddleware(['Administrator', 'Customer']), updateUserController);
routerApp.delete('/users/:id', authMiddleware(['Administrator']), deleteUserController);

// Rutas para Reservas
routerApp.post("/reservas", authMiddleware(['Administrator', 'Waiter']), createBookingController);  // Solo Administradores y Camareros pueden crear
routerApp.get("/reservas", getAllBookingsController);  // Accesible a todos
routerApp.get("/reservas/:id", getBookingByIdController);  // Accesible a todos
routerApp.put("/reservas/:id", authMiddleware(['Administrator', 'Waiter']), updateBookingController);  // Solo Administradores y Camareros pueden actualizar
routerApp.delete("/reservas/:id", authMiddleware(['Administrator']), deleteBookingController);  // Solo Administradores pueden eliminar

// Rutas para Inventarios
routerApp.post("/inventarios", authMiddleware(['Administrator']), createInventoryController);  // Solo Administradores pueden crear
routerApp.get("/inventarios", getAllInventoriesController);  // Accesible a todos
routerApp.get("/inventarios/:id", getInventoryByIdController);  // Accesible a todos
routerApp.put("/inventarios/:id", authMiddleware(['Administrator']), updateInventoryController);  // Solo Administradores pueden actualizar
routerApp.delete("/inventarios/:id", authMiddleware(['Administrator']), deleteInventoryController);  // Solo Administradores pueden eliminar

// Rutas para el Menú
routerApp.post("/menu", authMiddleware(['Administrator']), createMenuController);  // Solo Administradores pueden crear
routerApp.get("/menu", getAllMenuItemsController);  // Accesible a todos
routerApp.get("/menu/:id", getMenuByIdController);  // Accesible a todos
routerApp.put("/menu/:id", authMiddleware(['Administrator']), updateMenuController);  // Solo Administradores pueden actualizar
routerApp.delete("/menu/:id", authMiddleware(['Administrator']), deleteMenuItemController);  // Solo Administradores pueden eliminar

// Rutas para Pedidos
routerApp.post("/orders", authMiddleware(['Administrator', 'Waiter', 'Customer']), createOrderController);  // Solo Administradores y Camareros pueden crear
routerApp.get("/orders", getAllOrdersController);  // Accesible a todos
routerApp.get("/orders/:id", getOrderByIdController);  // Accesible a todos
routerApp.put("/orders/:id", authMiddleware(['Administrator', 'Waiter', 'Customer']), updateOrderController);  // Solo Administradores y Camareros pueden actualizar
routerApp.delete("/orders/:id", authMiddleware(['Administrator']), deleteOrderController);  // Solo Administradores pueden eliminar
routerApp.get("/orders/customer/:customerId", getOrdersByCustomerIdController);  // Accesible a todos

// Rutas para Bookings (reservas)
routerApp.post('/bookings', authMiddleware(['Customer', 'Administrator']), createBooking);
routerApp.get('/bookings/:id', authMiddleware(['Customer', 'Administrator']), getBooking);
routerApp.put('/bookings/:id/cancel', authMiddleware(['Customer', 'Administrator']), cancelBooking);

// Rutas para Table Sessions
routerApp.get("/table-sessions/active", getActiveSessionsController);  // Accesible a todos
routerApp.get("/table-sessions/:id", getSessionByIdController);  // Accesible a todos
routerApp.post("/table-sessions", authMiddleware(['Administrator', 'Waiter']), createTableSessionController);
routerApp.put("/table-sessions/:id", authMiddleware(['Administrator', 'Waiter']), updateTableSessionController);
routerApp.delete("/table-sessions/:id", authMiddleware(['Administrator']), deleteTableSessionController);
routerApp.get("/tables/:tableId/sessions", getTableSessionsController);  // Accesible a todos

// Rutas para Mesas
routerApp.post("/tables", authMiddleware(['Administrator']), createTableController);  // Solo Administradores pueden crear
routerApp.get("/tables", getAllTablesController);  // Accesible a todos
routerApp.get("/tables/:id", getTableByIdController);  // Accesible a todos
routerApp.put("/tables/:id", authMiddleware(['Administrator']), updateTableController);  // Solo Administradores pueden actualizar
routerApp.delete("/tables/:id", authMiddleware(['Administrator']), deleteTableController);  // Solo Administradores pueden eliminar

// Rutas para Personalizaciones de Platos
routerApp.get("/menu/:menuId/customizations", getDishCustomizationsByMenuIdController);
routerApp.get("/customizations/:id", getDishCustomizationByIdController);
routerApp.post("/customizations", authMiddleware(['Administrator']), createDishCustomizationController);
routerApp.put("/customizations/:id", authMiddleware(['Administrator']), updateDishCustomizationController);
routerApp.delete("/customizations/:id", authMiddleware(['Administrator']), deleteDishCustomizationController);

routerApp.post('/availability/check', checkAvailability);

// Rutas para OrderItem
routerApp.post("/order-items", /* authMiddleware(['Administrator', 'Waiter']), */ createOrderItemController);
routerApp.get("/order-items", getAllOrderItemsController);
routerApp.get("/order-items/:id", getOrderItemByIdController);
routerApp.put("/order-items/:id", /* authMiddleware(['Administrator', 'Waiter']), */ updateOrderItemController);
routerApp.delete("/order-items/:id", /* authMiddleware(['Administrator', 'Waiter']), */ deleteOrderItemController);

// Rutas para Direcciones
routerApp.post('/addresses', authMiddleware(['Administrator', 'Customer']), createAddressController);
routerApp.get('/addresses/user/:userId', getAddressesByUserIdController);
routerApp.get('/addresses/:id', getAddressesByIdController);
routerApp.put('/addresses/:id', authMiddleware(['Administrator', 'Customer']), updateAddressController);
routerApp.delete('/addresses/:id', authMiddleware(['Administrator', 'Customer']), deleteAddressController);

// Rutas para Métodos de Pago
routerApp.post('/payment-methods', authMiddleware(['Customer', 'Administrator']), createPaymentMethod);
routerApp.put('/payment-methods/:id', authMiddleware(['Customer', 'Administrator']), updatePaymentMethod);
routerApp.delete('/payment-methods/:id', authMiddleware(['Customer', 'Administrator']), deletePaymentMethod);
routerApp.get('/payment-methods/:userId', authMiddleware(['Customer', 'Administrator']), getPaymentMethodsByUser);
routerApp.get('/payment-methods', authMiddleware(['Customer', 'Administrator']), getPaymentMethods);



export default routerApp;
