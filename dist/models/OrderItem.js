"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const dbConfig_1 = __importDefault(require("../config/dbConfig"));
class OrderItem extends sequelize_1.Model {
    static associate(models) {
        OrderItem.hasMany(models.OrderItemCustomization, {
            foreignKey: 'order_item_id',
            as: 'customizations'
        });
    }
}
OrderItem.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    order_id: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: true,
        field: 'order_id',
        references: {
            model: 'orders',
            key: 'id',
        },
        onDelete: 'CASCADE',
    },
    menu_id: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: true,
        field: 'menu_id',
        references: {
            model: 'menus',
            key: 'id',
        },
        onDelete: 'SET NULL',
    },
    quantity: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
    },
    price: {
        type: sequelize_1.DataTypes.DECIMAL(10, 2),
        allowNull: false,
    },
    notes: {
        type: sequelize_1.DataTypes.STRING(255),
        allowNull: true,
    }
}, {
    sequelize: dbConfig_1.default,
    modelName: 'OrderItem',
    tableName: 'order_items',
    // Disable automatic timestamp handling for now
    timestamps: false,
    underscored: true,
    // Add these back when we've properly migrated the database
    // createdAt: 'created_at',
    // updatedAt: 'updated_at'
});
exports.default = OrderItem;
