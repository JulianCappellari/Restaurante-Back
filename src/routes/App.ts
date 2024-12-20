import { Router } from "express";
import { authMiddleware } from "../middleware/middlewareAuth"; // Middleware de autenticación
import { middlewareValidator } from "../middleware/middlewareValidator"; // Middleware adicional para validaciones, si es necesario
import { 
  createBookingController, deleteBookingController, getAllBookingsController, getBookingByIdController, updateBookingController 
} from "../controllers/reservaController";
import { 
  createInventoryController, deleteInventoryController, getAllInventoriesController, getInventoryByIdController, updateInventoryController 
} from '../controllers/inventoryController';
import { 
  createMenuController, deleteMenuItemController, getAllMenuItemsController, getMenuByIdController, updateMenuController 
} from '../controllers/menuController';
import { 
  createOrderController, deleteOrderController, getAllOrdersController, getOrderByIdController, updateOrderController 
} from '../controllers/orderController';
import { 
  createTableController, deleteTableController, getAllTablesController, getTableByIdController, updateTableController 
} from '../controllers/tableController';
import { deleteUserController, getUserByEmailController, updateUserController } from "../controllers/userController";

const routerApp = Router();

// Rutas para los usuarios
routerApp.get('/users/:email',  getUserByEmailController);
routerApp.put('/users/:id', authMiddleware(['Administrator']), updateUserController);
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
routerApp.post("/orders", authMiddleware(['Administrator', 'Waiter']), createOrderController);  // Solo Administradores y Camareros pueden crear
routerApp.get("/orders", getAllOrdersController);  // Accesible a todos
routerApp.get("/orders/:id", getOrderByIdController);  // Accesible a todos
routerApp.put("/orders/:id", authMiddleware(['Administrator', 'Waiter']), updateOrderController);  // Solo Administradores y Camareros pueden actualizar
routerApp.delete("/orders/:id", authMiddleware(['Administrator']), deleteOrderController);  // Solo Administradores pueden eliminar

// Rutas para Mesas
routerApp.post("/tables", authMiddleware(['Administrator']), createTableController);  // Solo Administradores pueden crear
routerApp.get("/tables", getAllTablesController);  // Accesible a todos
routerApp.get("/tables/:id", getTableByIdController);  // Accesible a todos
routerApp.put("/tables/:id", authMiddleware(['Administrator']), updateTableController);  // Solo Administradores pueden actualizar
routerApp.delete("/tables/:id", authMiddleware(['Administrator']), deleteTableController);  // Solo Administradores pueden eliminar

export default routerApp;
