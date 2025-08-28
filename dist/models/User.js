"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const dbConfig_1 = __importDefault(require("../config/dbConfig"));
// La clase User extiende de Model y usa los tipos definidos
class User extends sequelize_1.Model {
}
User.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    firstName: {
        type: sequelize_1.DataTypes.STRING(255),
        allowNull: false
    },
    lastName: {
        type: sequelize_1.DataTypes.STRING(255),
        allowNull: false
    },
    email: {
        type: sequelize_1.DataTypes.STRING(255),
        allowNull: false,
        unique: true
    },
    phone: {
        type: sequelize_1.DataTypes.STRING(20),
        allowNull: false
    },
    password: {
        type: sequelize_1.DataTypes.STRING(255),
        allowNull: false
    },
    rol: {
        type: sequelize_1.DataTypes.ENUM('Administrator', 'Waiter', 'Customer'),
        allowNull: false
    },
}, {
    sequelize: dbConfig_1.default,
    modelName: 'User',
    tableName: 'Users',
});
exports.default = User;
