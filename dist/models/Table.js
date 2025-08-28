"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// src/models/Table.ts
const sequelize_1 = require("sequelize");
const dbConfig_1 = __importDefault(require("../config/dbConfig"));
class Table extends sequelize_1.Model {
}
Table.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    tableNum: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
    },
    ability: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
    },
    state: {
        type: sequelize_1.DataTypes.ENUM('available', 'reserved'),
        allowNull: false,
    },
}, {
    sequelize: dbConfig_1.default,
    modelName: 'Table',
    tableName: 'tables',
});
exports.default = Table;
