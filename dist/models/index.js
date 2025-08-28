"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderItemCustomization = exports.DishCustomization = exports.OrderItem = exports.PaymentMethod = exports.Address = exports.Inventory = exports.Menu = exports.Booking = exports.Order = exports.Table = exports.User = exports.Sequelize = exports.sequelize = void 0;
const sequelize_1 = require("sequelize");
Object.defineProperty(exports, "Sequelize", { enumerable: true, get: function () { return sequelize_1.Sequelize; } });
const dbConfig_1 = __importDefault(require("../config/dbConfig"));
// Importar modelos
const User_1 = __importDefault(require("./User"));
exports.User = User_1.default;
const Table_1 = __importDefault(require("./Table"));
exports.Table = Table_1.default;
const Order_1 = __importDefault(require("./Order"));
exports.Order = Order_1.default;
const Booking_1 = __importDefault(require("./Booking"));
exports.Booking = Booking_1.default;
const Menu_1 = __importDefault(require("./Menu"));
exports.Menu = Menu_1.default;
const Inventory_1 = __importDefault(require("./Inventory"));
exports.Inventory = Inventory_1.default;
const Address_1 = __importDefault(require("./Address"));
exports.Address = Address_1.default;
const PaymentMethod_1 = __importDefault(require("./PaymentMethod"));
exports.PaymentMethod = PaymentMethod_1.default;
const OrderItem_1 = __importDefault(require("./OrderItem"));
exports.OrderItem = OrderItem_1.default;
const DishCustomization_1 = __importDefault(require("./DishCustomization"));
exports.DishCustomization = DishCustomization_1.default;
const OrderItemCustomization_1 = __importDefault(require("./OrderItemCustomization"));
exports.OrderItemCustomization = OrderItemCustomization_1.default;
// Inicializar la conexión a la base de datos
const sequelize = new sequelize_1.Sequelize({
    dialect: 'mysql',
    host: dbConfig_1.default.host,
    port: dbConfig_1.default.port,
    database: dbConfig_1.default.database,
    username: dbConfig_1.default.username,
    password: dbConfig_1.default.password,
    logging: false,
});
exports.sequelize = sequelize;
// Inicializar modelos
const models = {
    User: User_1.default.initialize(sequelize),
    Table: Table_1.default.initialize(sequelize),
    Order: Order_1.default.initialize(sequelize),
    Booking: Booking_1.default.initialize(sequelize),
    Menu: Menu_1.default.initialize(sequelize),
    Inventory: Inventory_1.default.initialize(sequelize),
    Address: Address_1.default.initialize(sequelize),
    PaymentMethod: PaymentMethod_1.default.initialize(sequelize),
    OrderItem: OrderItem_1.default.initialize(sequelize),
    DishCustomization: DishCustomization_1.default.initialize(sequelize),
    OrderItemCustomization: OrderItemCustomization_1.default.initialize(sequelize),
};
// Importar y configurar asociaciones
require("./Associations");
// Asociar modelos
Object.values(models).forEach(model => {
    if (model.associate) {
        model.associate(models);
    }
});
exports.default = models;
