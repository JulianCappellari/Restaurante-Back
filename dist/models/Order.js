"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// src/models/Order.ts
const sequelize_1 = require("sequelize");
const dbConfig_1 = __importDefault(require("../config/dbConfig"));
const User_1 = __importDefault(require("./User"));
const Address_1 = __importDefault(require("./Address"));
const OrderItem_1 = __importDefault(require("./OrderItem"));
const PaymentMethod_1 = __importDefault(require("./PaymentMethod"));
class Order extends sequelize_1.Model {
}
Order.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    customerId: {
        type: sequelize_1.DataTypes.INTEGER,
        references: {
            model: User_1.default,
            key: 'id',
        },
    },
    date: {
        type: sequelize_1.DataTypes.DATE,
        allowNull: false,
    },
    state: {
        type: sequelize_1.DataTypes.ENUM('received', 'preparing', 'ready', 'on_the_way', 'delivered'),
        allowNull: false,
    },
    total_amount: {
        type: sequelize_1.DataTypes.DECIMAL,
        allowNull: false,
    },
    deliveryType: {
        type: sequelize_1.DataTypes.ENUM('in_place', 'delivery'),
        allowNull: false,
    },
    addressId: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: true, // puede ser null si es 'in_place'
        references: {
            model: Address_1.default,
            key: 'id',
        },
    },
    paymentType: {
        type: sequelize_1.DataTypes.ENUM('cash', 'card', 'mp'),
        allowNull: false,
    },
    paymentMethodId: {
        type: sequelize_1.DataTypes.INTEGER.UNSIGNED,
        allowNull: true, // null si es efectivo
        references: {
            model: 'payment_methods', // o el nombre de tu tabla de métodos de pago
            key: 'id',
        },
    },
}, {
    sequelize: dbConfig_1.default,
    modelName: 'Order',
    tableName: 'orders',
});
Order.belongsTo(User_1.default, { foreignKey: 'customerId' });
Order.hasMany(OrderItem_1.default, { foreignKey: 'orderId', as: 'items' });
Order.belongsTo(PaymentMethod_1.default, { foreignKey: 'paymentMethodId' });
exports.default = Order;
