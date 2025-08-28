"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DishCustomization = exports.PaymentMethod = exports.Menu = exports.OrderItem = exports.Order = exports.Address = exports.User = void 0;
const User_1 = __importDefault(require("./User"));
exports.User = User_1.default;
const Address_1 = __importDefault(require("./Address"));
exports.Address = Address_1.default;
const Order_1 = __importDefault(require("./Order"));
exports.Order = Order_1.default;
const OrderItem_1 = __importDefault(require("./OrderItem"));
exports.OrderItem = OrderItem_1.default;
const Menu_1 = __importDefault(require("./Menu"));
exports.Menu = Menu_1.default;
const PaymentMethod_1 = __importDefault(require("./PaymentMethod"));
exports.PaymentMethod = PaymentMethod_1.default;
const DishCustomization_1 = __importDefault(require("./DishCustomization"));
exports.DishCustomization = DishCustomization_1.default;
// Relaciones
User_1.default.hasMany(Address_1.default, {
    foreignKey: 'userId',
    as: 'addresses',
    onDelete: 'CASCADE',
});
Address_1.default.belongsTo(User_1.default, {
    foreignKey: 'userId',
    as: 'user',
});
Order_1.default.belongsTo(Address_1.default, { foreignKey: 'addressId', as: 'deliveryAddress' });
// Menu and DishCustomization relationships
Menu_1.default.hasMany(DishCustomization_1.default, {
    foreignKey: 'menuId',
    as: 'customizations',
    onDelete: 'CASCADE',
});
DishCustomization_1.default.belongsTo(Menu_1.default, {
    foreignKey: 'menuId',
    as: 'menu',
});
OrderItem_1.default.belongsTo(Order_1.default, { foreignKey: 'orderId' });
OrderItem_1.default.belongsTo(Menu_1.default, { foreignKey: 'menuId' });
Order_1.default.belongsTo(PaymentMethod_1.default, { foreignKey: 'paymentMethodId' });
