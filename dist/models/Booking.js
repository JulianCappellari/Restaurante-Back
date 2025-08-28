"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// src/models/Booking.ts
const sequelize_1 = require("sequelize");
const dbConfig_1 = __importDefault(require("../config/dbConfig"));
const User_1 = __importDefault(require("./User"));
class Booking extends sequelize_1.Model {
}
Booking.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    userId: {
        type: sequelize_1.DataTypes.INTEGER,
        references: {
            model: User_1.default,
            key: 'id',
        },
        allowNull: false
    },
    bookingDate: {
        type: sequelize_1.DataTypes.DATE,
        allowNull: false,
    },
    numberPeople: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
        validate: {
            min: 1
        }
    },
}, {
    sequelize: dbConfig_1.default,
    modelName: 'Booking',
    tableName: 'bookings',
});
Booking.belongsTo(User_1.default, { foreignKey: 'userId' });
exports.default = Booking;
