"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const dbConfig_1 = __importDefault(require("../config/dbConfig"));
class PaymentMethod extends sequelize_1.Model {
}
PaymentMethod.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
    },
    name: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    cardHolderName: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true,
    },
    cardNumber: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true,
    },
    last4: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true,
    },
    expirationDate: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true,
    },
    cvv: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true,
    },
    status: {
        type: sequelize_1.DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true,
    },
    userId: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
    },
}, {
    sequelize: dbConfig_1.default,
    modelName: "PaymentMethod",
    tableName: "payment_methods",
    timestamps: false,
});
exports.default = PaymentMethod;
