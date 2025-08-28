"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const dbConfig_1 = __importDefault(require("../config/dbConfig"));
class Address extends sequelize_1.Model {
}
Address.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    userId: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
    },
    street: {
        type: sequelize_1.DataTypes.STRING(255),
        allowNull: false,
    },
    streetNumber: {
        type: sequelize_1.DataTypes.STRING(10),
        allowNull: false,
    },
    city: {
        type: sequelize_1.DataTypes.STRING(100),
        allowNull: false,
    },
    province: {
        type: sequelize_1.DataTypes.STRING(100),
        allowNull: false,
    },
    postalCode: {
        type: sequelize_1.DataTypes.STRING(20),
        allowNull: false,
    },
    floor: {
        type: sequelize_1.DataTypes.STRING(10),
        allowNull: true,
    },
    apartment: {
        type: sequelize_1.DataTypes.STRING(10),
        allowNull: true,
    },
}, {
    sequelize: dbConfig_1.default,
    modelName: 'Address',
    tableName: 'Addresses',
});
exports.default = Address;
